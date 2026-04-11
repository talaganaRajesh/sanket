import cv2
import numpy as np
import torch
from pytorch_i3d import InceptionI3d
import json

# Load labels
with open("labels.json", "r") as f:
    labels = json.load(f)

# Load model
model = InceptionI3d(num_classes=2000, in_channels=3)
model.load_state_dict(torch.load("wlasl_model.pt", map_location='cpu'))
model.eval()

def predict_video(video_path):
    cap = cv2.VideoCapture(video_path)
    frames = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.resize(frame, (224, 224))
        frame = frame / 255.0
        frames.append(frame)

    cap.release()

    frames = frames[:64]

    while len(frames) < 64:
        frames.append(frames[-1])

    frames = np.array(frames)
    frames = np.transpose(frames, (3, 0, 1, 2))
    frames = np.expand_dims(frames, axis=0)

    frames = torch.tensor(frames).float()

    with torch.no_grad():
        output = model(frames)

    output = output.mean(dim=2)

    probs = torch.softmax(output, dim=1)

    pred_index = torch.argmax(probs, dim=1).item()
    pred_word = labels[pred_index]
    confidence = probs[0][pred_index].item()

    return pred_word, confidence

# Example usage
if __name__ == "__main__":
    word, conf = predict_video("test.mp4")
    print("Predicted:", word)
    print("Confidence:", conf)