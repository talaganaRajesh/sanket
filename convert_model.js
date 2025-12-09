// Node.js script to convert Keras .h5 model to TensorFlow.js format
// This creates model.json and binary weight files that can be used in the browser

const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs');

async function convertModel() {
  try {
    console.log('🔄 Loading Keras model from model.h5...\n');
    
    // Load the Keras model
    const model = await tf.loadLayersModel('file://./model.h5');
    
    console.log('✅ Model loaded successfully!\n');
    console.log('Model Summary:');
    model.summary();
    
    // Create output directory
    const outputPath = path.join(__dirname, 'public', 'tfjs_model');
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    console.log('\n🔄 Converting to TensorFlow.js format...\n');
    
    // Save in TensorFlow.js format
    await model.save(`file://${outputPath}`);
    
    console.log('✅ Conversion complete!\n');
    console.log(`📁 Model files saved to: ${outputPath}/`);
    console.log('\n📝 Files created:');
    console.log('   - model.json (model architecture)');
    console.log('   - weights.bin (model weights)\n');
    console.log('🚀 You can now use the model in your web application!');
    console.log('   Load it from: /tfjs_model/model.json\n');
    
  } catch (error) {
    console.error('❌ Error converting model:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. model.h5 file exists in the project root');
    console.error('   2. The file is a valid Keras model');
    console.error('   3. @tensorflow/tfjs-node is installed\n');
    process.exit(1);
  }
}

convertModel();
