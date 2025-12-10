// Script to convert Keras 3 model.json to TensorFlow.js compatible format
const fs = require('fs');
const path = require('path');

const MODEL_PATH = path.join(__dirname, 'public', 'tfjs_model', 'model.json');
const BACKUP_PATH = path.join(__dirname, 'public', 'tfjs_model', 'model.json.backup');

console.log('🔄 Converting Keras 3 model to TensorFlow.js format...\n');

// Read the model
const modelJSON = JSON.parse(fs.readFileSync(MODEL_PATH, 'utf8'));

// Backup original
fs.writeFileSync(BACKUP_PATH, JSON.stringify(modelJSON, null, 2));
console.log('📦 Created backup at model.json.backup\n');

// Function to convert keras_tensor references to array format
function convertKeraTensorToArray(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.class_name === '__keras_tensor__' && obj.config && obj.config.keras_history) {
      return obj.config.keras_history;
    }
    if (Array.isArray(obj)) {
      return obj.map(convertKeraTensorToArray);
    }
  }
  return obj;
}

// Function to convert inbound_nodes from Keras 3 format to TF.js format
function convertInboundNodes(nodes) {
  if (!nodes || !Array.isArray(nodes)) return nodes;
  
  return nodes.map(node => {
    if (node && typeof node === 'object' && !Array.isArray(node)) {
      // Keras 3 format: {args: [...], kwargs: {...}}
      if (node.args !== undefined) {
        const args = node.args;
        
        // Handle single tensor argument
        if (args && typeof args === 'object' && args.class_name === '__keras_tensor__') {
          const history = args.config.keras_history;
          return [[history[0], history[1], history[2], {}]];
        }
        
        // Handle array of tensor arguments (for Add, Concatenate, etc.)
        if (Array.isArray(args)) {
          if (args.length === 1 && Array.isArray(args[0])) {
            // Array of tensors for merge layers
            const tensorList = args[0];
            const converted = tensorList.map(tensor => {
              if (tensor && tensor.class_name === '__keras_tensor__') {
                const history = tensor.config.keras_history;
                return [history[0], history[1], history[2], {}];
              }
              return tensor;
            });
            return [converted];
          } else if (args[0] && args[0].class_name === '__keras_tensor__') {
            // Single tensor in array
            const history = args[0].config.keras_history;
            return [[history[0], history[1], history[2], {}]];
          }
        }
      }
    }
    return node;
  });
}

// Patch the model topology
const topology = modelJSON.modelTopology;
if (topology && topology.model_config && topology.model_config.config) {
  const config = topology.model_config.config;
  
  // Process each layer
  if (config.layers && Array.isArray(config.layers)) {
    console.log(`🔧 Processing ${config.layers.length} layers...\n`);
    
    config.layers = config.layers.map((layer, idx) => {
      // Fix InputLayer
      if (layer.class_name === 'InputLayer' && layer.config) {
        if (layer.config.batch_shape && !layer.config.batch_input_shape) {
          layer.config.batch_input_shape = layer.config.batch_shape;
          delete layer.config.batch_shape;
          console.log(`  ✓ Fixed InputLayer: ${layer.name}`);
        }
      }
      
      // Fix inbound_nodes
      if (layer.inbound_nodes && layer.inbound_nodes.length > 0) {
        layer.inbound_nodes = convertInboundNodes(layer.inbound_nodes);
      }
      
      // Remove dtype policy objects (Keras 3 specific)
      if (layer.config && layer.config.dtype && typeof layer.config.dtype === 'object') {
        layer.config.dtype = layer.config.dtype.config?.name || 'float32';
      }
      
      return layer;
    });
  }
}

// Write the patched model
fs.writeFileSync(MODEL_PATH, JSON.stringify(modelJSON));
console.log('\n✅ Model converted successfully!');
console.log('📁 Output: public/tfjs_model/model.json');
console.log('\n🚀 You can now restart the dev server and test the model.');
