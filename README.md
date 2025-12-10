# 🤟 Sanket - Sign Language Recognition

An AI-powered web application that recognizes American Sign Language (ASL) characters from images in real-time. Upload or capture photos to get instant character recognition powered by a trained TensorFlow.js model.

## ✨ Features

- 📸 **Image Upload & Camera Capture** - Upload images or take photos directly
- 🤖 **AI-Powered Recognition** - Deep learning model with MobileNetV2 architecture  
- 🔤 **36 Characters** - Recognizes 0-9 and a-z
- ⚡ **Real-time Predictions** - Instant results with confidence scores
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔒 **Privacy-First** - All AI processing happens in your browser

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

1. **Upload an Image** - Click "Choose Image" or drag & drop a photo of sign language gesture
2. **Or Use Camera** - Switch to "Camera" tab and click a photo directly
3. **Get Results** - View the predicted character with confidence score

## 🧠 Model Details

- **Architecture**: MobileNetV2 with custom classification head
- **Input Size**: 128x128x3 RGB images
- **Output**: 36 classes (0-9, a-z)
- **Framework**: TensorFlow.js (browser-based inference)
- **Model Files**: Located in `public/tfjs_model/`
  - `model.json` - Model architecture
  - `group1-shard*.bin` - Model weights (3 files)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.7 (App Router with Turbopack)
- **UI**: React 19.1.0, Tailwind CSS v4
- **AI**: TensorFlow.js 4.22.0
- **Language**: TypeScript
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
sanket/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main application page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── Hero.tsx              # Hero section
│   │   ├── ImageUpload.tsx       # Image upload & camera
│   │   └── ResultDisplay.tsx     # Prediction results
│   └── utils/
│       └── modelUtils.ts         # TensorFlow.js model handling
├── public/
│   └── tfjs_model/              # TensorFlow.js model files
│       ├── model.json
│       ├── group1-shard1of3.bin
│       ├── group1-shard2of3.bin
│       └── group1-shard3of3.bin
├── package.json
├── next.config.ts
└── README.md
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server (with Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Color Palette

- **Primary**: Emerald (#10B981)
- **Secondary**: Zinc (#3F3F46)
- **Background**: White (#FFFFFF)
- **Accent**: Blue (#3B82F6)
- **Text**: Black (#000000)

## 🔧 Model Configuration

The model configuration is handled in `src/utils/modelUtils.ts`:
- **Image Preprocessing**: Resize to 128x128, normalize to [0, 1]
- **Model Loading**: From `/tfjs_model/model.json`
- **Prediction**: Softmax output with confidence scores
- **Classes**: 36-character array mapping indices to labels

## 📊 Performance

- **Inference Time**: ~100-300ms per image (browser-dependent)
- **Model Size**: ~14MB (compressed)
- **Supported Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Support**: ✅ iOS Safari, Chrome Android

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the production version:
```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- TensorFlow.js team for the ML framework
- MobileNetV2 architecture
- Next.js and React teams

---

**Made with ❤️ for breaking communication barriers**

## 🔮 Future Backend Integration

This prototype is designed for easy backend integration:

1. **Replace API route**: Update `/api/upload/route.ts` with real AI processing
2. **Add authentication**: Implement user login/signup
3. **File storage**: Add cloud storage for uploaded videos
4. **Real AI**: Connect to sign language recognition APIs
5. **Database**: Store conversion history and user data

### Suggested Backend Technologies:
- **AI/ML**: TensorFlow.js, OpenCV, or cloud AI services
- **Storage**: AWS S3, Google Cloud Storage, or Cloudinary
- **Database**: PostgreSQL, MongoDB, or Firebase
- **Authentication**: NextAuth.js, Auth0, or Firebase Auth

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **Docker**: Use the included Next.js Docker configuration
- **Traditional hosting**: Build static export with `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design inspiration**: Modern accessibility tools and AI interfaces
- **Icons**: Heroicons for beautiful SVG icons
- **Fonts**: Google Fonts for typography
- **Framework**: Next.js team for the amazing framework

---

**Built with ❤️ for accessibility and inclusion**

For questions or support, please open an issue in the repository.
