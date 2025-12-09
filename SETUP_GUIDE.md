# 🎬 SETUP INSTRUCTIONS - VISUAL GUIDE

## Step-by-Step Setup (Follow in Order)

---

### STEP 1: Install Node Dependencies ✅

```bash
npm install
```

**What this does**: Installs TensorFlow.js and other required packages

**Time**: ~1-2 minutes

---

### STEP 2: Convert Your Model 🔄 (MOST IMPORTANT!)

```bash
# First, install Python packages (only needed once)
pip install tensorflowjs tensorflow

# Then convert your model.h5
python convert_model.py
```

**What this does**: 
- Reads your `model.h5` file
- Converts it to TensorFlow.js format
- Creates `public/tfjs_model/` folder with:
  - `model.json` (architecture)
  - `group1-shard1of1.bin` (or similar - weights)

**Time**: ~30 seconds

**You'll see**:
```
Model loaded successfully!

Model Summary:
... (your model architecture) ...

Converting to TensorFlow.js format...

✅ Conversion complete!
Model files saved to: public/tfjs_model/
```

---

### STEP 3: Verify Model Files Exist 📂

Check that these files were created:

```
public/
└── tfjs_model/
    ├── model.json          ← Should exist
    └── group1-shard*.bin   ← Should exist (one or more files)
```

**If files don't exist**: Step 2 failed. Check error messages.

---

### STEP 4: Start the App 🚀

```bash
npm run dev
```

**You'll see**:
```
  ▲ Next.js 15.5.4
  - Local:        http://localhost:3000

 ✓ Starting...
 ✓ Ready in 2.3s
```

---

### STEP 5: Open in Browser 🌐

Go to: **http://localhost:3000**

**You should see**:
- Green "Sanket" logo at top
- Hero section with "Recognize Sign Language Instantly"
- Blue notice: "🎬 Video feature coming soon!"
- Upload section with two tabs: "Upload Photo" and "Take Photo"

---

### STEP 6: Test the App 🧪

**Option A: Upload a photo**
1. Click "Upload Photo" tab
2. Drag & drop an image OR click "Choose Image"
3. Wait for processing (~1-2 seconds)
4. See prediction result with confidence score

**Option B: Use camera**
1. Click "Take Photo" tab
2. Click "Start Camera"
3. Allow camera permissions
4. Position your hand for sign language
5. Click "📸 Capture Photo"
6. See prediction result

---

## 🎯 Expected Result

After uploading/capturing:

```
┌─────────────────────────────────┐
│  Prediction Result              │
│                                 │
│  [Your Image]    ┃  Detected:  │
│                  ┃              │
│                  ┃     A        │
│                  ┃              │
│                  ┃  Confidence: │
│                  ┃   95.3%      │
│                  ┃  ▓▓▓▓▓▓▓░░   │
└─────────────────────────────────┘
```

---

## ❌ Common Errors & Fixes

### Error: "Failed to load AI model"

**Cause**: Model not converted or files missing

**Fix**:
1. Check `public/tfjs_model/model.json` exists
2. Run `python convert_model.py` again
3. Check for Python errors during conversion

---

### Error: Camera not accessible

**Cause**: Browser permissions or HTTPS required

**Fix**:
- Allow camera in browser permissions
- Use `localhost` (already doing this) or HTTPS
- Try a different browser

---

### Error: Module not found

**Cause**: Dependencies not installed

**Fix**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Error: Port 3000 already in use

**Fix**:
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart
npm run dev
```

---

## 📊 Model Requirements Checklist

Make sure your `model.h5`:

- ✅ Is a Keras/TensorFlow model
- ✅ Was trained on 36 classes (0-9, a-z)
- ✅ Outputs predictions in the same order as CLASSES array
- ✅ Accepts RGB images (3 channels)
- ✅ Can handle any input size (we resize to 224x224)

If your model has different specs, edit `src/utils/modelUtils.ts`

---

## 🔍 Testing Tips

**Good test images should have**:
- ✅ Clear hand gesture
- ✅ Good lighting
- ✅ Plain background (preferred)
- ✅ Hand centered in frame
- ✅ High contrast

**Avoid**:
- ❌ Blurry images
- ❌ Dark/shadowy photos
- ❌ Cluttered backgrounds
- ❌ Partially visible gestures

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ No console errors in browser (F12 to check)
2. ✅ "Model loaded successfully" in console
3. ✅ Upload shows preview immediately
4. ✅ Processing completes in 1-3 seconds
5. ✅ Prediction displays with confidence score
6. ✅ Confidence is reasonable (>50% for good images)

---

## 📞 Still Having Issues?

1. Check browser console (F12 → Console tab)
2. Look for red error messages
3. Read the error carefully
4. Check the relevant documentation:
   - Model issues → MODEL_CONVERSION.md
   - Setup issues → QUICK_START.md
   - General info → README.md

---

**You're all set!** Follow the steps above and you'll have a working sign language recognition app. 🚀
