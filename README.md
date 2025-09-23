# sanket - AI-Powered Sign Language to Audio Converter

A modern, responsive Next.js application that converts sign language videos into English audio using AI technology. This is a front-end prototype built for demonstration purposes with a simulated backend.

![sanket Demo](https://via.placeholder.com/800x400/10B981/FFFFFF?text=sanket+Demo)

## 🚀 Features

- **Modern UI/UX**: Clean, minimal design with professional typography
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Video Upload**: Drag-and-drop or click to upload sign language videos
- **Real-time Processing**: Simulated AI processing with loading indicators
- **Audio Playback**: Custom audio player with waveform animation
- **Transcription Display**: Shows converted text alongside audio
- **Dummy Backend**: Simulated API responses for demonstration

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
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
│   │       └── route.ts          # Dummy API endpoint
│   ├── globals.css               # Global styles & animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main homepage
├── components/
│   ├── Navbar.tsx                # Navigation component
│   ├── Hero.tsx                  # Hero section with demo video
│   ├── VideoUpload.tsx           # Upload interface
│   └── AudioPlayer.tsx           # Audio playback with waveform
public/
├── videos/                       # Demo videos (add your own)
└── audio/                        # Sample audio files (add your own)
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd your-project-directory
   npm install
   ```

2. **Add media files** (see [MEDIA_SETUP.md](MEDIA_SETUP.md)):
   - Add demo video: `public/videos/demo-sign-language.mp4`
   - Add sample audio: `public/audio/sample-output.mp3`

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**: Navigate to `http://localhost:3000`

## 🎯 Core Components

### Navbar
- Clean logo design with "sanket" branding
- Login button with hover effects
- Fully responsive navigation

### Hero Section
- Left: Autoplay demo video showing sign language
- Right: Compelling copy about AI conversion
- Call-to-action buttons
- Feature highlights with checkmarks

### Video Upload
- Drag-and-drop interface
- File type validation (video files only)
- Upload progress indicator
- Video preview before processing

### Audio Player
- Custom-designed player with waveform animation
- Play/pause controls
- Progress tracking and seeking
- Download functionality
- Transcription display

## 🔧 API Endpoints

### POST /api/upload
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
