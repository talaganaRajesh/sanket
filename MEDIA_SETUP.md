# Media Files Setup

## Required Media Files

To complete the sign language conversion demo, you need to add the following files:

### Videos
- `public/videos/demo-sign-language.mp4`
  - This should be a video of someone using sign language
  - Will autoplay in the hero section to demonstrate the concept
  - Recommended: 30-60 seconds, showing clear sign language gestures

### Audio
- `public/audio/sample-output.mp3`
  - This is the dummy audio file that gets "generated" when users upload videos
  - Should contain clear English speech
  - Example content: "Hello, how are you today? I hope you are having a wonderful day. Thank you for using our sign language conversion service."

## Where to Find Sample Files

### For Demo Video:
1. Search for "sign language video" on free stock video sites like:
   - Pexels.com
   - Unsplash.com (videos section)
   - Pixabay.com
2. Or create a simple video of someone doing basic sign language gestures

### For Audio:
1. Use text-to-speech tools like:
   - Google Text-to-Speech
   - Microsoft Azure Speech Service (free tier)
   - Amazon Polly (free tier)
2. Or record yourself speaking the sample text clearly

## Alternative Quick Setup

If you want to test immediately without custom media:

1. **For video**: The Hero component includes fallback UI that shows when no video is found
2. **For audio**: You can use any .mp3 file you have, just rename it to `sample-output.mp3`

## File Format Requirements

- **Video**: MP4 format recommended for best browser compatibility
- **Audio**: MP3 format for wide browser support
- **Size**: Keep video under 10MB for good loading performance
- **Duration**: 30-60 seconds for demo video, 10-30 seconds for audio

Once you add these files, the prototype will be fully functional!