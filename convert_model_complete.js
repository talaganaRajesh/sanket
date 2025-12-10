// Complete Keras 3 to TensorFlow.js Model Converter
// This script fully converts the model.json from Keras 3 format to TF.js compatible format

const fs = require('fs');
const path = require('path');

const MODEL_DIR = path.join(__dirname, 'public', 'tfjs_model');
const MODEL_PATH = path.join(MODEL_DIR, 'model.json');
const BACKUP_PATH = path.join(MODEL_DIR, 'model_original.json');

console.log('🔄 Complete Keras 3 to TensorFlow.js Conversion\n');

// Read model
let modelJSON;
if (fs.existsSync(BACKUP_PATH)) {
  modelJSON = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));
  console.log('📦 Using original backup');
} else {
  modelJSON = JSON.parse(fs.readFileSync(MODEL_PATH, 'utf8'));
  fs.writeFileSync(BACKUP_PATH, JSON.stringify(modelJSON, null, 2));
  console.log('📦 Created backup: model_original.json');
}

// Helper to convert keras tensor to inbound node format
function convertKerasTensor(tensor) {
  if (tensor && tensor.class_name === '__keras_tensor__' && tensor.config) {
    const h = tensor.config.keras_history;
    return [h[0], h[1], h[2], {}];
  }
  return null;
}

// Convert all inbound nodes in a layer
function convertInboundNodes(nodes) {
  if (!nodes || !Array.isArray(nodes)) return [];
  
  const result = [];
  for (const node of nodes) {
    if (node && typeof node === 'object' && !Array.isArray(node) && node.args !== undefined) {
      // Keras 3 format
      const args = node.args;
      
      if (args && args.class_name === '__keras_tensor__') {
        // Single tensor input
        const converted = convertKerasTensor(args);
        if (converted) result.push([converted]);
      } else if (Array.isArray(args) && args.length > 0) {
        if (Array.isArray(args[0])) {
          // Array of tensors (merge layers)
          const tensorList = args[0].map(t => convertKerasTensor(t)).filter(Boolean);
          result.push([tensorList]);
        } else if (args[0] && args[0].class_name === '__keras_tensor__') {
          // Single tensor in array
          const converted = convertKerasTensor(args[0]);
          if (converted) result.push([converted]);
        }
      }
    } else if (Array.isArray(node)) {
      // Already in TF.js format
      result.push(node);
    }
  }
  return result;
}

// Process the model
const topology = modelJSON.modelTopology;
const config = topology.model_config.config;
const layers = config.layers;

console.log(`\n🔧 Converting ${layers.length} layers...\n`);

let converted = 0;
for (let i = 0; i < layers.length; i++) {
  const layer = layers[i];
  let changed = false;
  
  // Fix InputLayer
  if (layer.class_name === 'InputLayer' && layer.config) {
    if (layer.config.batch_shape) {
      layer.config.batch_input_shape = layer.config.batch_shape;
      delete layer.config.batch_shape;
      changed = true;
    }
  }
  
  // Fix dtype objects
  if (layer.config && layer.config.dtype && typeof layer.config.dtype === 'object') {
    layer.config.dtype = 'float32';
    changed = true;
  }
  
  // Fix inbound_nodes
  if (layer.inbound_nodes && layer.inbound_nodes.length > 0) {
    const hasKeras3Format = layer.inbound_nodes.some(n => 
      n && typeof n === 'object' && !Array.isArray(n) && n.args !== undefined
    );
    
    if (hasKeras3Format) {
      layer.inbound_nodes = convertInboundNodes(layer.inbound_nodes);
      changed = true;
    }
  }
  
  if (changed) converted++;
}

console.log(`✅ Converted ${converted} layers\n`);

// Save
fs.writeFileSync(MODEL_PATH, JSON.stringify(modelJSON));
console.log('💾 Saved: public/tfjs_model/model.json');

// Verify
console.log('\n📋 Verification:');
const check = JSON.parse(fs.readFileSync(MODEL_PATH, 'utf8'));
const l0 = check.modelTopology.model_config.config.layers[0];
const l1 = check.modelTopology.model_config.config.layers[1];
console.log(`  InputLayer has batch_input_shape: ${!!l0.config.batch_input_shape}`);
console.log(`  Second layer inbound_nodes: ${JSON.stringify(l1.inbound_nodes)}`);

console.log('\n✅ Done! Restart dev server and test.');
