# Quick Start Guide - Sanket Sign Language Recognition

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Convert Your Model

**IMPORTANT**: The app needs the model in TensorFlow.js format, not .h5

```bash
# Install Python dependencies (one-time)
pip install tensorflowjs tensorflow

# Convert model.h5 to TensorFlow.js format
python convert_model.py
```

This creates `public/tfjs_model/model.json` and weight files.

### Step 3: Run the App
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📸 How to Use

1. **Upload Tab**: 
   - Drag & drop an image
   - Or click to browse files
   
2. **Camera Tab**:
   - Click "Start Camera"
   - Position your hand for sign language
   - Click "Capture Photo"

3. **View Results**:
   - See predicted character (0-9, a-z)
   - Check confidence score
   - Try another image or copy results

---

## 🎯 Supported Characters

The model recognizes **36 characters**:
- **Digits**: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- **Letters**: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z

---

## ⚠️ Troubleshooting

### Model not loading?
✅ **Solution**: Make sure you ran `python convert_model.py` and the files exist in `public/tfjs_model/`

### Camera not working?
✅ **Solution**: 
- Grant camera permissions in your browser
- Use HTTPS or localhost (cameras require secure context)

### Poor predictions?
✅ **Solution**:
- Ensure good lighting
- Center the hand gesture in frame
- Try different backgrounds
- Make sure gesture is clear and distinct

### Build errors?
✅ **Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

---

## 🔄 Model Input Requirements

The current implementation expects:
- **Input size**: 224x224 pixels (automatically resized)
- **Color mode**: RGB (3 channels)
- **Normalization**: Pixel values scaled to [0, 1]
- **Output**: 36 classes (matching CLASSES array)

If your model has different requirements, edit `src/utils/modelUtils.ts`:

```typescript
// Line 29: Adjust image size
.resizeNearestNeighbor([YOUR_SIZE, YOUR_SIZE])

// Line 5: Adjust class mapping if needed
const CLASSES = [...your classes...];
```

---

## 📝 Next Steps

- ✅ Test with various sign language images
- 📊 Monitor confidence scores for accuracy
- 🎥 Wait for video feature (coming soon!)
- 🚀 Deploy to production (Vercel, Netlify, etc.)

---

## 🤝 Need Help?

1. Check [MODEL_CONVERSION.md](MODEL_CONVERSION.md) for model issues
2. Check [README.md](README.md) for detailed documentation
3. Verify your model was trained on the same 36 classes

---

**Ready to try?** Run `npm run dev` and visit http://localhost:3000! 🎉
