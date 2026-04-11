import os
import cv2
import numpy as np
import torch
import torch.nn.functional as F
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import shutil
import tempfile
from pytorch_i3d import InceptionI3d

app = FastAPI()

# Enable CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load labels
LABELS_PATH = os.path.join(os.path.dirname(__file__), "labels.json")
try:
    with open(LABELS_PATH, "r") as f:
        labels = json.load(f)
except Exception as e:
    print(f"Error loading labels: {e}")
    labels = []

# Load model
MODEL_DIR = os.path.join(os.path.dirname(__file__), "asl_model")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

model = InceptionI3d(num_classes=2000, in_channels=3)
try:
    # Point torch.load to the directory or file
    model.load_state_dict(torch.load(MODEL_DIR, map_location=device))
    model.to(device)
    model.eval()
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")

def preprocess_video(video_path, num_frames=64):
    cap = cv2.VideoCapture(video_path)
    frames = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Resize to 224x224 as required by I3D
        frame = cv2.resize(frame, (224, 224))
        # Convert BGR (OpenCV) to RGB
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = frame / 255.0
        frames.append(frame)

    cap.release()

    if not frames:
        return None

    # Sample frames to exactly `num_frames`
    if len(frames) > num_frames:
        indices = np.linspace(0, len(frames) - 1, num_frames, dtype=int)
        frames = [frames[i] for i in indices]
    else:
        while len(frames) < num_frames:
            frames.append(frames[-1])

    frames = np.array(frames)
    # Reorder dimensions for PyTorch: (Batch, Channels, Temporal, Height, Width)
    frames = np.transpose(frames, (3, 0, 1, 2))
    frames = np.expand_dims(frames, axis=0)

    return torch.tensor(frames).float().to(device)

@app.post("/predict")
async def predict(video: UploadFile = File(...)):
    # Save uploaded video to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp_file:
        shutil.copyfileobj(video.file, tmp_file)
        tmp_path = tmp_file.name

    try:
        # Preprocess
        input_tensor = preprocess_video(tmp_path)
        if input_tensor is None:
            raise HTTPException(status_code=400, detail="Could not process video")

        # Inference
        with torch.no_grad():
            output = model(input_tensor)

        # Average logits over temporal dimension (if applicable)
        if len(output.shape) == 3:
            output = output.mean(dim=2)

        probs = torch.softmax(output, dim=1)
        confidence, pred_index = torch.max(probs, dim=1)
        
        pred_index = pred_index.item()
        confidence = confidence.item()
        pred_word = labels[pred_index] if pred_index < len(labels) else "Unknown"

        return {
            "prediction": pred_word,
            "confidence": confidence,
            "index": pred_index
        }

    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup temp file
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
