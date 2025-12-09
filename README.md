# Sanket - AI-Powered Sign Language Recognition

A modern, responsive Next.js application that recognizes sign language gestures from photos using AI technology. Upload or capture images to get instant character recognition powered by a trained TensorFlow.js model.

![Sanket Demo](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Sanket+Demo)

## 🚀 Features

- **Modern UI/UX**: Clean, minimal design with professional typography
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Image Upload**: Drag-and-drop or click to upload sign language photos
- **Camera Support**: Capture photos directly from your camera
- **AI Recognition**: Real-time character detection using TensorFlow.js
- **36 Characters**: Supports digits (0-9) and letters (a-z)
- **Confidence Scores**: Shows prediction confidence for transparency
- **Client-side Processing**: Privacy-focused - all AI runs in your browser

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI/ML**: TensorFlow.js
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Fonts**: Inter (Google Fonts)
- **Icons**: Heroicons (embedded SVG)

## 🎨 Design System

- **Colors**: 
  - Primary: White (#FFFFFF) & Black (#000000)
  - Accent: Emerald (#10B981)
  - Grays: Zinc color palette
- **Typography**: Inter font family for modern, readable text
- **Components**: Modular, reusable React components
- **Animations**: Smooth transitions and micro-interactions

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.ts          # Image upload API
│   ├── globals.css               # Global styles & animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main homepage
├── components/
│   ├── Navbar.tsx                # Navigation component
│   ├── Hero.tsx                  # Hero section
│   ├── ImageUpload.tsx           # Upload & camera interface
│   ├── ResultDisplay.tsx         # Prediction results display
│   └── AudioPlayer.tsx           # (Legacy - for future video feature)
├── utils/
│   └── modelUtils.ts             # TensorFlow.js model utilities
public/
├── tfjs_model/                   # Converted TensorFlow.js model
│   ├── model.json                # Model architecture
│   └── group1-shard*.bin         # Model weights
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Python 3.7+ (for model conversion)
- TensorFlow and TensorFlowJS converter

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd your-project-directory
   npm install
   ```

2. **Convert your model** (IMPORTANT):
   
   Your `model.h5` file needs to be converted to TensorFlow.js format:
   
   ```bash
   # Install Python dependencies
   pip install tensorflowjs tensorflow
   
   # Run the conversion script
   python convert_model.py
   ```
   
   This will create `public/tfjs_model/` with the converted model files.
   
   See [MODEL_CONVERSION.md](MODEL_CONVERSION.md) for detailed instructions.

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**: Navigate to `http://localhost:3000`

## 🎯 Core Components

### Navbar
- Clean logo design with "Sanket" branding
- Login button with hover effects
- Fully responsive navigation

### Hero Section
- Compelling copy about AI sign language recognition
- Call-to-action buttons
- Feature highlights with checkmarks
- Coming soon notice for video feature

### Image Upload
- Dual mode: Upload or Camera
- Drag-and-drop interface
- File type validation (image files only)
- Camera capture with real-time preview
- Image preview before processing

### Result Display
- Large, clear prediction display
- Confidence score with visual progress bar
- Side-by-side image and result view
- Copy result functionality
- Try another image button

## 🔧 API Endpoints

### POST /api/upload

Handles image uploads and returns image data for client-side processing.

**Request**: FormData with `image` file

**Response**:
```json
{
  "success": true,
  "imageData": "data:image/jpeg;base64,...",
  "message": "Image received, ready for processing"
}
```

### GET /api/upload
Simulates video processing and returns dummy audio data.

**Response**:
```json
{
  "success": true,
  "audioUrl": "/audio/sample-output.mp3",
  "transcription": "Sample transcription text...",
  "processingTime": "2.3 seconds",
  "confidence": 0.95
}
```

## 🎨 Customization

### Colors
Update colors in `src/app/globals.css`:
```css
:root {
  --accent: #10B981; /* Change accent color */
  --background: #ffffff;
  --foreground: #000000;
}
```

### Typography
Modify fonts in `src/app/layout.tsx`:
```tsx
import { Inter } from "next/font/google";
// Change to your preferred Google Font
```

### Branding
Update logo and branding in `src/components/Navbar.tsx`:
```tsx
<div className="text-2xl font-bold text-black">
  Your<span className="text-emerald-500">Brand</span>
</div>
```

## 📱 Mobile Responsiveness

- **Mobile-first approach**: Designed for mobile, enhanced for desktop
- **Breakpoints**: Uses Tailwind's responsive utilities (sm, md, lg, xl)
- **Touch-friendly**: Large tap targets and intuitive gestures
- **Optimized layouts**: Stacked layouts on mobile, side-by-side on desktop

## ⚡ Performance Features

- **Next.js optimization**: Automatic code splitting and optimization
- **Image optimization**: Next.js Image component for optimized loading
- **Lazy loading**: Components load when needed
- **Minimal JavaScript**: Efficient bundle size with tree shaking

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
