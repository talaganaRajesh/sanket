🤟 Sanket - AI-Powered Sign Language Recognition

An AI-powered web application for real-time sign language recognition using deep learning, computer vision, pose estimation, and temporal sequence modeling. The system is trained on the WLASL (Word-Level American Sign Language) Dataset and combines RGB video understanding with skeleton pose analysis for robust sign recognition.

🌐 Live Demo: https://sanket-sih.vercel.app/

✨ Features
📸 Video/Image-Based Recognition - Upload sign language gestures for prediction
🤖 Dual-Stream AI Architecture - RGB + Skeleton Pose fusion
🧠 Attention-Based Temporal Learning - MultiHeadAttention + BiLSTM
🔤 Word-Level Sign Recognition - Trained using WLASL benchmark dataset
⚡ Real-Time Predictions - Fast browser-based inference
🎨 Modern Responsive UI - Built with React and Tailwind CSS
🔒 Privacy-First Processing - AI inference handled efficiently
📊 Transfer Learning Pipeline - Progressive unfreezing strategy for stable training
📚 Dataset Used — WLASL

After analyzing around 30 research papers published between 2020 and 2025, we selected the WLASL Dataset because it is one of the most widely used benchmark datasets in sign language recognition research.

Why WLASL?
✅ Standard benchmark dataset in research
✅ Large number of word-level sign classes
✅ Real-world variations in videos
✅ Well-annotated and structured dataset
✅ Enables fair comparison with existing research works

Using WLASL allows our work to remain aligned with modern research trends and comparable to state-of-the-art approaches.

🧠 Model Architecture

The proposed model follows a dual-stream deep learning architecture that processes:

Raw RGB video frames
Skeleton pose/keypoint data

Both streams are processed independently and later fused for temporal understanding.

🖼️ RGB Stream

The RGB branch uses MobileNetV2 as a feature extractor.

Each video clip contains 16 frames
Frames are processed using TimeDistributed(MobileNetV2)
MobileNetV2 extracts a compact 96-dimensional feature vector per frame

This branch captures:

Hand shape
Appearance
Fine-grained gesture details
Texture and visual context
🦴 Pose Stream

The pose branch processes skeleton keypoint coordinates.

A lightweight dense network converts pose coordinates into:
96-dimensional features per frame

This branch focuses on:

Motion trajectory
Hand-body movement patterns
Structural gesture information
Robustness against lighting/background changes
🔗 Feature Fusion

The outputs of both branches are fused:

RGB Output Shape → (16, 96)
Pose Output Shape → (16, 96)

After concatenation:

Joint Representation → (16, 192)

This combined representation contains both appearance and motion information.

🎯 MultiHeadAttention Layer

A MultiHeadAttention layer is applied across the temporal sequence.

This enables the model to:

Learn which frames are most important
Focus on peak gesture moments
Reduce importance of transitional/noisy frames

The attention block is followed by:

Residual Connection (Add)
LayerNormalization

This transformer-style design stabilizes training and improves temporal learning.

🔄 Bidirectional LSTM

The attended sequence is passed through a Bidirectional LSTM.

Why Bidirectional?

Sign language contains contextual dependencies in both directions:

Earlier gestures depend on later motion
Temporal context improves sign disambiguation

The BiLSTM processes the sequence:

Forward
Backward

and merges both representations into a single feature vector representing the entire sign clip.

🚀 Transfer Learning Strategy

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
🛡️ Regularization Techniques

To reduce overfitting, multiple regularization methods are used:

✅ Dropout
✅ BatchNormalization
✅ L2 Kernel Regularization
✅ SpatialDropout1D
✅ recurrent_dropout inside LSTM
SpatialDropout1D

Instead of dropping individual features, entire temporal steps are dropped, which creates a stronger constraint for sequence learning.

📈 Optimization & Training
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
Prevents exploding gradients
Especially important for recurrent networks
🔀 Data Augmentation

Data augmentation is applied at three levels:

1️⃣ Spatial Augmentation
Horizontal flipping
Brightness jitter
Contrast jitter

Improves robustness to camera/environment variation.

2️⃣ Temporal Augmentation
Random frame dropping (up to 4 frames)
Speed perturbation
Resampling between 0.75× – 1.25×

Helps the model handle varying signing speeds.

3️⃣ Cross-Sample Augmentation — Mixup

Mixup combines:

Two video clips
Their labels

This forces the model to learn smoother probabilistic boundaries and reduces overfitting.

🛠️ Tech Stack
Framework: Next.js 15.5.7
UI: React 19 + Tailwind CSS v4
AI Framework: TensorFlow.js
Language: TypeScript
Model Backbone: MobileNetV2
Sequence Modeling: MultiHeadAttention + BiLSTM
📁 Project Structure
sanket/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ImageUpload.tsx
│   │   └── ResultDisplay.tsx
│   └── utils/
│       └── modelUtils.ts
├── public/
│   └── tfjs_model/
├── package.json
├── next.config.ts
└── README.md
🚀 Quick Start
Prerequisites
Node.js 18+
npm or yarn
Installation
npm install
Run Development Server
npm run dev

Open:

http://localhost:3000
📝 Available Scripts
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
📊 Performance
⚡ Inference Time: ~100–300ms
📦 Lightweight deployment
🌐 Browser Support:
Chrome
Firefox
Safari
Edge
📱 Mobile Support:
iOS Safari
Chrome Android
🚀 Deployment
Vercel (Recommended)
Push project to GitHub
Import into Vercel
Deploy automatically
Build for Production
npm run build
npm run start
🤝 Contributing

Contributions are welcome!

Fork the repository
Create a feature branch
git checkout -b feature/AmazingFeature
Commit your changes
git commit -m "Add AmazingFeature"
Push to GitHub
git push origin feature/AmazingFeature
Open a Pull Request
📄 License

This project is licensed under the MIT License.

🙏 Acknowledgments
WLASL Dataset contributors
TensorFlow.js team
MobileNetV2 research authors
Next.js and React communities
Research papers published between 2020–2025 on sign language recognition
🔮 Future Improvements
🎥 Real-time webcam inference
☁️ Cloud-based model deployment
🌍 Multi-language sign recognition
📱 Mobile application support
🧠 Transformer-based temporal encoders
🔊 Sign-to-speech conversion
📝 Sentence-level recognition
❤️ Vision

Built with the vision of improving accessibility, inclusion, and communication through AI-powered sign language understanding.
