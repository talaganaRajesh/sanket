import * as tf from '@tensorflow/tfjs';

// Classes mapping
const CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let model: tf.LayersModel | null = null;
let useDemoMode = false;

export async function loadModel(): Promise<tf.LayersModel | null> {
  if (!model && !useDemoMode) {
    try {
      // Load the model from the public directory
      // Make sure to convert model.h5 to TensorFlow.js format first
      // See MODEL_CONVERSION.md or CONVERT_WITH_COLAB.md for instructions
      model = await tf.loadLayersModel('/tfjs_model/model.json');
      console.log('✅ Model loaded successfully');
      console.log('Model input shape:', model.inputs[0].shape);
    } catch (error) {
      console.warn('⚠️ Model not found - Running in DEMO MODE');
      console.warn('📖 To use real AI predictions, convert your model.h5 file');
      console.warn('📘 See CONVERT_WITH_COLAB.md for the easiest method (2 minutes)');
      useDemoMode = true;
    }
  }
  return model;
}

export async function predictImage(imageElement: HTMLImageElement): Promise<{ prediction: string; confidence: number }> {
  try {
    const loadedModel = await loadModel();

    // DEMO MODE: If model not loaded, return demo prediction
    if (!loadedModel || useDemoMode) {
      console.log('🎭 DEMO MODE: Showing sample prediction');
      console.log('📖 Convert your model using CONVERT_WITH_COLAB.md for real predictions');
      
      // Return a random demo prediction for testing UI
      const demoIndex = Math.floor(Math.random() * CLASSES.length);
      const demoConfidence = 0.75 + Math.random() * 0.24; // Random confidence 75-99%
      
      return {
        prediction: CLASSES[demoIndex],
        confidence: demoConfidence,
      };
    }

    // REAL MODE: Use actual model prediction
    // Preprocess the image
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224]) // Resize to model input size
      .toFloat()
      .div(tf.scalar(255.0)) // Normalize to [0, 1]
      .expandDims(); // Add batch dimension

    // Make prediction
    const predictions = loadedModel!.predict(tensor) as tf.Tensor;
    const predictionData = await predictions.data();

    // Get the class with highest probability
    const maxIndex = predictionData.indexOf(Math.max(...Array.from(predictionData)));
    const confidence = predictionData[maxIndex];
    const predictedClass = CLASSES[maxIndex];

    // Clean up tensors
    tensor.dispose();
    predictions.dispose();

    return {
      prediction: predictedClass,
      confidence: confidence,
    };
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
}

export function getClasses(): string[] {
  return CLASSES;
}
