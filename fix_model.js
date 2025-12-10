// Comprehensive Keras 3 to TensorFlow.js model converter
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'public', 'tfjs_model', 'model.json');
const BACKUP_PATH = path.join(__dirname, 'public', 'tfjs_model', 'model.json.keras3backup');

console.log('🔄 Converting Keras 3 model to TensorFlow.js format (v2)...\n');

// Read the original backup or current model
let modelJSON;
if (fs.existsSync(BACKUP_PATH)) {
  console.log('📦 Loading from backup...');
  modelJSON = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));
} else {
  modelJSON = JSON.parse(fs.readFileSync(MODEL_PATH, 'utf8'));
  // Create backup
  fs.writeFileSync(BACKUP_PATH, JSON.stringify(modelJSON, null, 2));
  console.log('📦 Created backup at model.json.keras3backup\n');
}

// Function to extract keras_history from tensor reference
function extractKerasHistory(tensorRef) {
  if (tensorRef && typeof tensorRef === 'object') {
    if (tensorRef.class_name === '__keras_tensor__' && tensorRef.config) {
      return tensorRef.config.keras_history;
    }
  }
  return null;
}

// Function to convert a single inbound node from Keras 3 format
function convertInboundNode(node) {
  if (!node || typeof node !== 'object') return node;
  
  // Already in array format (TF.js compatible)
  if (Array.isArray(node)) return node;
  
  // Keras 3 format: {args: [...], kwargs: {...}}
  if (node.args !== undefined) {
    const args = node.args;
    
    // Single tensor argument: {class_name: '__keras_tensor__', config: {keras_history: [name, idx, tensor_idx]}}
    if (args && args.class_name === '__keras_tensor__') {
      const history = extractKerasHistory(args);
      if (history) {
        return [[history[0], history[1], history[2], {}]];
      }
    }
    
    // Array argument
    if (Array.isArray(args)) {
      // Check if it's a list of tensors (for merge layers like Add, Concatenate)
      if (args.length === 1 && Array.isArray(args[0])) {
        // [[tensor1, tensor2, ...]] format
        const tensorList = args[0];
        const converted = tensorList.map(t => {
          const history = extractKerasHistory(t);
          if (history) {
            return [history[0], history[1], history[2], {}];
          }
          return t;
        });
        return [converted];
      }
      
      // Single tensor wrapped in array
      if (args.length >= 1 && args[0] && args[0].class_name === '__keras_tensor__') {
        const history = extractKerasHistory(args[0]);
        if (history) {
          return [[history[0], history[1], history[2], {}]];
        }
      }
    }
  }
  
  return node;
}

// Process the model topology
const topology = modelJSON.modelTopology;
if (topology && topology.model_config && topology.model_config.config) {
  const config = topology.model_config.config;
  
  if (config.layers && Array.isArray(config.layers)) {
    console.log(`🔧 Processing ${config.layers.length} layers...\n`);
    
    let fixedCount = 0;
    
    config.layers = config.layers.map((layer, idx) => {
      let modified = false;
      
      // Fix InputLayer - convert batch_shape to batch_input_shape
      if (layer.class_name === 'InputLayer' && layer.config) {
        if (layer.config.batch_shape && !layer.config.batch_input_shape) {
          layer.config.batch_input_shape = layer.config.batch_shape;
          delete layer.config.batch_shape;
          modified = true;
        }
      }
      
      // Fix dtype - convert object to string
      if (layer.config && layer.config.dtype && typeof layer.config.dtype === 'object') {
        layer.config.dtype = layer.config.dtype.config?.name || 'float32';
        modified = true;
      }
      
      // Fix inbound_nodes
      if (layer.inbound_nodes && Array.isArray(layer.inbound_nodes) && layer.inbound_nodes.length > 0) {
        const originalNodes = JSON.stringify(layer.inbound_nodes);
        layer.inbound_nodes = layer.inbound_nodes.map(convertInboundNode);
        if (JSON.stringify(layer.inbound_nodes) !== originalNodes) {
          modified = true;
        }
      }
      
      if (modified) {
        fixedCount++;
      }
      
      return layer;
    });
    
    console.log(`  ✓ Fixed ${fixedCount} layers`);
  }
}

// Write the converted model (minified for faster loading)
fs.writeFileSync(MODEL_PATH, JSON.stringify(modelJSON));

console.log('\n✅ Model converted successfully!');
console.log('📁 Output: public/tfjs_model/model.json');

// Verify the conversion
const verifyModel = JSON.parse(fs.readFileSync(MODEL_PATH, 'utf8'));
const firstLayer = verifyModel.modelTopology.model_config.config.layers[0];
const secondLayer = verifyModel.modelTopology.model_config.config.layers[1];

console.log('\n📋 Verification:');
console.log('  First layer (InputLayer):', firstLayer.class_name);
console.log('  Has batch_input_shape:', !!firstLayer.config.batch_input_shape);
console.log('  Second layer inbound_nodes format:', JSON.stringify(secondLayer.inbound_nodes).substring(0, 100));

console.log('\n🚀 Restart the dev server and test!');
