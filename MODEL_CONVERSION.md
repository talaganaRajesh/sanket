# Model Conversion Instructions

## Converting model.h5 to TensorFlow.js Format

Before running the application, you need to convert your Keras model to TensorFlow.js format.

### Prerequisites

Install the required Python packages:

```bash
pip install tensorflowjs tensorflow
```

### Conversion Steps

1. Make sure `model.h5` is in the root directory of the project

2. Run the conversion script:

```bash
python convert_model.py
```

3. The script will create a `public/tfjs_model/` directory containing:
   - `model.json` - Model architecture
   - `group1-shard*.bin` - Model weights

### Using the Converted Model

The application is already configured to load the model from `/tfjs_model/model.json`.

After conversion, update the model loading path in `src/utils/modelUtils.ts` if needed:

```typescript
model = await tf.loadLayersModel('/tfjs_model/model.json');
```

### Troubleshooting

If you encounter any issues:

1. **Model input size**: Check your model's expected input size. The default is 224x224. If your model expects a different size, update line 29 in `src/utils/modelUtils.ts`:
   ```typescript
   .resizeNearestNeighbor([YOUR_SIZE, YOUR_SIZE])
   ```

2. **Classes mismatch**: Ensure the CLASSES array in `src/utils/modelUtils.ts` matches your model's output order.

3. **Memory issues**: If the browser runs out of memory, try reducing the image size or using a smaller model.

## Running the Application

After converting the model:

```bash
npm run dev
```

Visit `http://localhost:3000` and try uploading a sign language image!
