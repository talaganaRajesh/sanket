# 🤟 Sanket - AI-Powered Sign Language Recognition

An AI-powered web application for real-time sign language recognition using deep learning, computer vision, pose estimation, and temporal sequence modeling. The system is trained on the WLASL (Word-Level American Sign Language) Dataset and combines RGB video understanding with skeleton pose analysis for robust sign recognition.

🌐 Live Demo: https://sanket-sih.vercel.app/

---

## ✨ Features
📸 Video/Image-Based Recognition - Upload sign language gestures for prediction

🤖 Dual-Stream AI Architecture - RGB + Skeleton Pose fusion

🧠 Attention-Based Temporal Learning - MultiHeadAttention + BiLSTM

🔤 Word-Level Sign Recognition - Trained using WLASL benchmark dataset

⚡ Real-Time Predictions - Fast browser-based inference

🎨 Modern Responsive UI - Built with React and Tailwind CSS

🔒 Privacy-First Processing - AI inference handled efficiently

📊 Transfer Learning Pipeline - Progressive unfreezing strategy for stable training

📚 Dataset Used - WLASL

---


### 🧠 Model Architecture

The proposed model follows a dual-stream deep learning architecture that processes:


Raw RGB video frames
Skeleton pose/keypoint data

Both streams are processed independently and later fused for temporal understanding.

#### 🖼️ RGB Stream

The RGB branch uses MobileNetV2 as a feature extractor.

Each video clip contains 16 frames
Frames are processed using TimeDistributed(MobileNetV2)
MobileNetV2 extracts a compact 96-dimensional feature vector per frame

This branch captures:

Hand shape
Appearance
Fine-grained gesture details
Texture and visual context


#### Pose Stream

The pose branch processes skeleton keypoint coordinates.

A lightweight dense network converts pose coordinates into:
96-dimensional features per frame

This branch focuses on:

Motion trajectory
Hand-body movement patterns
Structural gesture information
Robustness against lighting/background changes


The outputs of both branches are fused:

RGB Output Shape → (16, 96)
Pose Output Shape → (16, 96)

After concatenation:

Joint Representation → (16, 192)

This combined representation contains both appearance and motion information.

#### MultiHeadAttention Layer

A MultiHeadAttention layer is applied across the temporal sequence.

This enables the model to:

Learn which frames are most important
Focus on peak gesture moments
Reduce importance of transitional/noisy frames

The attention block is followed by:

Residual Connection (Add)
LayerNormalization

This transformer-style design stabilizes training and improves temporal learning.

#### Bidirectional LSTM

The attended sequence is passed through a Bidirectional LSTM.

Why Bidirectional?

Sign language contains contextual dependencies in both directions:

Earlier gestures depend on later motion
Temporal context improves sign disambiguation

The BiLSTM processes the sequence:

Forward
Backward

and merges both representations into a single feature vector representing the entire sign clip.

#### 🚀 Transfer Learning Strategy

The training is intentionally divided into two phases using progressive unfreezing.

Phase 1 — Frozen Backbone Training
MobileNetV2 backbone remains fully frozen
Only custom classification layers are trained

Purpose:

Preserve ImageNet visual knowledge
Prevent destroying pre-trained representations
Train the model to interpret sign-specific patterns
Phase 2 — Fine-Tuning
Top 20 layers of MobileNetV2 are unfrozen
Fine-tuned using a very small learning rate

Purpose:

Adapt visual features to sign language data
Improve gesture-specific representation learning
Maintain training stability

#### 🛡️ Regularization Techniques

To reduce overfitting, multiple regularization methods are used:

✅ Dropout

✅ BatchNormalization

✅ L2 Kernel Regularization

✅ SpatialDropout1D

✅ recurrent_dropout inside LSTM
SpatialDropout1D

Instead of dropping individual features, entire temporal steps are dropped, which creates a stronger constraint for sequence learning.

#### 📈 Optimization & Training

Optimizer
AdamW
 
Adam + Weight Decay 

Better generalization 

Penalizes overly large weights

Learning Rate Scheduling

CosineDecay

Gradually reduces learning rate

Prevents oscillation near minima

Improves convergence stability

Gradient Stabilization

clipnorm=1.0

---

## 🛠️ Tech Stack
Framework: Next.js 15.5.7

UI: React 19 + Tailwind CSS v4 

AI Framework: TensorFlow.js

Language: TypeScript

Model Backbone: MobileNetV2 

Sequence Modeling: MultiHeadAttention + BiLSTM

