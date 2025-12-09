# 🚀 EASIEST WAY - Google Colab (2 Minutes!)

## No Python or Visual Studio needed on your computer!

### Step 1: Open Google Colab
Go to: **https://colab.research.google.com/**

### Step 2: Create New Notebook
Click: **File → New Notebook**

### Step 3: Copy This Code

Create **3 cells** and paste each code block:

#### Cell 1: Install converter
```python
!pip install tensorflowjs
```

#### Cell 2: Upload and convert
```python
from google.colab import files

# Upload your model.h5
print("📤 Click 'Choose Files' and select model.h5")
uploaded = files.upload()

# Convert to TensorFlow.js
!tensorflowjs_converter --input_format=keras --output_format=tfjs_graph_model model.h5 tfjs_model

print("\n✅ Conversion complete!")
```

#### Cell 3: Download converted model
```python
# Zip and download
!zip -r tfjs_model.zip tfjs_model
files.download('tfjs_model.zip')

print("\n📥 Download started! Check your browser downloads.")
```

### Step 4: Run the Cells
- Click each cell and press **Shift+Enter**
- Or click the Play ▶️ button on the left of each cell
- When prompted, upload your `model.h5` file

### Step 5: Extract Files
1. Find `tfjs_model.zip` in your downloads
2. Extract it
3. Copy the `tfjs_model` folder to: `D:\SIH\sanket\public\`

Your folder structure should look like:
```
D:\SIH\sanket\
└── public\
    └── tfjs_model\
        ├── model.json
        └── group1-shard1of1.bin
```

### Step 6: Run Your App!
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## ✅ That's It!

Your app is now fully functional with AI predictions!

---

## 🎬 What You'll See

1. Upload or capture a sign language image
2. AI processes it in 1-2 seconds
3. See the predicted character (0-9, a-z)
4. View confidence score

---

## ❓ Troubleshooting

### Colab says "File not found"?
- Make sure you uploaded the file in Cell 2
- Check that it's named exactly `model.h5`

### Download doesn't start?
- Check browser popup blocker
- Allow downloads from Google Colab

### App still says "Model not found"?
- Verify files are in `public/tfjs_model/`
- Check that `model.json` exists
- Restart dev server: `npm run dev`

---

## 🎉 Success!

You now have a fully working sign language recognition system running entirely in the browser with AI!
