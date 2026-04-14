import cv2
import numpy as np
import torch
from pytorch_i3d import InceptionI3d
import json
import sys

# Load labels
with open("labels.json", "r") as f:
    labels = json.load(f)

# Determine device (GPU if available, else CPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Load model
print(f"Loading model with {len(labels)} classes...")
model = InceptionI3d(num_classes=len(labels), in_channels=3)

# Try loading the model with correct filename
try:
    state_dict = torch.load("asl_model.pt", map_location=device)
    model.load_state_dict(state_dict)
    print("✅ Model loaded successfully from asl_model.pt")
except FileNotFoundError:
    print("❌ Error: asl_model.pt not found!")
    sys.exit(1)

model.to(device)
model.eval()

def predict_video(video_path):
    """
    Predict sign language from a video file.
    
    Args:
        video_path: Path to the video file
    
    Returns:
        Tuple of (predicted_label, confidence_score)
    """
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print(f"❌ Error: Cannot open video file {video_path}")
        return None, None
    
    frames = []
    frame_count = 0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"📹 Video has {total_frames} frames")
    
    # Calculate frame skip to extract 64 frames from entire video
    frame_skip = max(1, total_frames // 64)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_count % frame_skip == 0:
            # Resize to 224x224
            frame = cv2.resize(frame, (224, 224))
            # Convert BGR to RGB
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # Normalize to 0-1
            frame = frame.astype(np.float32) / 255.0
            frames.append(frame)
            
            if len(frames) == 64:
                break
        
        frame_count += 1
    
    cap.release()
    
    print(f"📽️  Extracted {len(frames)} frames")
    
    # Pad with last frame if needed
    if len(frames) < 64:
        if frames:
            last_frame = frames[-1]
            while len(frames) < 64:
                frames.append(last_frame)
        else:
            print("❌ Error: No frames extracted from video")
            return None, None
    
    # Convert to numpy array
    frames = np.array(frames)  # Shape: (64, 224, 224, 3)
    
    # Transpose to (C, T, H, W)
    frames = np.transpose(frames, (3, 0, 1, 2))  # Shape: (3, 64, 224, 224)
    
    # Add batch dimension
    frames = np.expand_dims(frames, axis=0)  # Shape: (1, 3, 64, 224, 224)
    
    # Convert to tensor
    frames = torch.tensor(frames).float().to(device)
    
    print("🧠 Running inference...")
    
    with torch.no_grad():
        output = model(frames)
    
    # Average pooling over temporal dimension
    output = output.mean(dim=2)
    
    # Get probabilities
    probs = torch.softmax(output, dim=1)
    
    # Get top 5 predictions
    top_probs, top_indices = torch.topk(probs, k=5, dim=1)
    
    print("\n📊 Top 5 Predictions:")
    for i in range(5):
        idx = top_indices[0][i].item()
        prob = top_probs[0][i].item()
        print(f"  {i+1}. {labels[idx]}: {prob:.2%}")
    
    # Get best prediction
    pred_index = torch.argmax(probs, dim=1).item()
    pred_word = labels[pred_index]
    confidence = probs[0][pred_index].item()
    
    return pred_word, confidence

# Example usage
if __name__ == "__main__":
    if len(sys.argv) > 1:
        video_file = sys.argv[1]
    else:
        video_file = "test.mp4"
    
    print(f"\n🎥 Processing video: {video_file}\n")
    word, conf = predict_video(video_file)
    
    if word and conf:
        print(f"\n✅ Result:")
        print(f"   Predicted: {word}")
        print(f"   Confidence: {conf:.2%}\n")
    else:
        print(f"\n❌ Prediction failed\n")