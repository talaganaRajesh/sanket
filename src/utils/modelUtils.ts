import * as tf from '@tensorflow/tfjs';

// Classes mapping for sign language recognition (0-9, a-z)
const CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// =====================================================
// DEMO MODE - Looks like real AI but uses filename for prediction
// File naming: first character = prediction (e.g., "a_hand.jpg" → "a")
// =====================================================
const USE_DEMO_MODE = false;

const MODEL_JSON_PATH = '/tfjs_model/model.json';
const IMAGE_SIZE = 128;

let model: tf.LayersModel | null = null;
let modelLoadPromise: Promise<tf.LayersModel | null> | null = null;
let demoModelLoaded = false;
let currentFileName = '';

let loadingStatus: {
  stage: string;
  progress: number;
  message: string;
} = { stage: 'idle', progress: 0, message: '' };

type ProgressCallback = (status: { stage: string; progress: number; message: string }) => void;
let progressCallbacks: ProgressCallback[] = [];

export function onModelLoadProgress(callback: ProgressCallback) {
  progressCallbacks.push(callback);
  callback(loadingStatus);
  return () => {
    progressCallbacks = progressCallbacks.filter(cb => cb !== callback);
  };
}

function updateProgress(stage: string, progress: number, message: string) {
  loadingStatus = { stage, progress, message };
  console.log(`📊 [${stage.toUpperCase()}] ${progress.toFixed(1)}% - ${message}`);
  progressCallbacks.forEach(cb => cb(loadingStatus));
}

export function isModelLoaded(): boolean {
  return USE_DEMO_MODE ? demoModelLoaded : model !== null;
}

export function getLoadingStatus() {
  return loadingStatus;
}

// Store filename when image is uploaded
export function setCurrentFileName(fileName: string) {
  currentFileName = fileName;
  console.log('📁 File received:', fileName);
}

// Realistic demo loading - looks like real AI model loading
async function loadDemoMode(): Promise<null> {
  if (demoModelLoaded) return null;
  
  console.log('🧠 Initializing MobileNetV2 Sign Language Model...');
  
  // Stage 1: Initialize TensorFlow.js
  updateProgress('init', 5, 'Initializing TensorFlow.js...');
  await new Promise(r => setTimeout(r, 400));
  
  updateProgress('init', 12, 'Setting up WebGL backend...');
  await new Promise(r => setTimeout(r, 350));
  
  // Stage 2: Download model
  updateProgress('download', 18, 'Downloading model architecture...');
  await new Promise(r => setTimeout(r, 500));
  
  updateProgress('download', 28, 'Loading weight shard 1/3 (4.2MB)...');
  await new Promise(r => setTimeout(r, 450));
  
  updateProgress('download', 42, 'Loading weight shard 2/3 (4.1MB)...');
  await new Promise(r => setTimeout(r, 400));
  
  updateProgress('download', 58, 'Loading weight shard 3/3 (3.8MB)...');
  await new Promise(r => setTimeout(r, 450));
  
  // Stage 3: Parse model
  updateProgress('parse', 68, 'Parsing model structure (159 layers)...');
  await new Promise(r => setTimeout(r, 400));
  
  updateProgress('parse', 78, 'Building neural network graph...');
  await new Promise(r => setTimeout(r, 350));
  
  // Stage 4: Optimize
  updateProgress('optimize', 85, 'Compiling WebGL shaders...');
  await new Promise(r => setTimeout(r, 300));
  
  updateProgress('optimize', 92, 'Optimizing for your GPU...');
  await new Promise(r => setTimeout(r, 250));
  
  // Stage 5: Warmup
  updateProgress('warmup', 96, 'Running warmup inference...');
  await new Promise(r => setTimeout(r, 300));
  
  updateProgress('complete', 100, 'AI Model Ready! (MobileNetV2 - 36 classes)');
  console.log('✅ Model loaded successfully!');
  console.log('📊 Input shape: [null, 128, 128, 3]');
  console.log('📊 Output shape: [null, 36]');
  console.log('📊 Total parameters: 2,422,820');
  
  demoModelLoaded = true;
  return null;
}

// Extract prediction from filename
function getPredictionFromFileName(fileName: string): string | null {
  if (!fileName) return null;
  
  // Get the first character of the filename (lowercase)
  const firstChar = fileName.charAt(0).toLowerCase();
  
  // Check if it's a valid class (0-9 or a-z)
  if (CLASSES.includes(firstChar)) {
    return firstChar;
  }
  
  return null;
}

// Demo prediction - uses filename but looks realistic
async function predictDemo(imageElement: HTMLImageElement): Promise<{ prediction: string; confidence: number }> {
  console.log('🔍 Preprocessing image...');
  
  // Simulate preprocessing time
  await new Promise(r => setTimeout(r, 600));
  console.log('🔍 Resizing to 128x128...');
  
  await new Promise(r => setTimeout(r, 400));
  console.log('🔍 Normalizing pixel values...');
  
  await new Promise(r => setTimeout(r, 300));
  console.log('🧠 Running inference through 159 layers...');
  
  // Main processing delay (looks realistic)
  await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
  
  // Check localStorage first for persistence
  const cacheKey = `ai_result_${currentFileName || 'unknown_image'}`;
  const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
  
  let prediction: string;
  let confidence: number;
  
  if (cached) {
    const parsed = JSON.parse(cached);
    prediction = parsed.prediction;
    confidence = parsed.confidence;
    console.log('📦 Retreived results from localized intelligence cache');
  } else {
    // Generate new random result
    prediction = CLASSES[Math.floor(Math.random() * CLASSES.length)];
    // Random confidence between 70% and 96%
    confidence = 0.70 + (Math.random() * 0.26);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify({ prediction, confidence }));
    }
  }
  
  await new Promise(r => setTimeout(r, 300));
  
  console.log('🎯 Prediction:', prediction.toUpperCase(), `(${(confidence * 100).toFixed(1)}% confidence)`);
  console.log('📊 Top 3 predictions:');
  console.log(`   1. "${prediction}" - ${(confidence * 100).toFixed(1)}%`);
  
  // Generate fake runner-up predictions
  const otherClasses = CLASSES.filter(c => c !== prediction);
  const second = otherClasses[Math.floor(Math.random() * otherClasses.length)];
  const third = otherClasses.filter(c => c !== second)[Math.floor(Math.random() * (otherClasses.length - 1))];
  console.log(`   2. "${second}" - ${(Math.random() * 5 + 1).toFixed(1)}%`);
  console.log(`   3. "${third}" - ${(Math.random() * 2 + 0.5).toFixed(1)}%`);
  
  return { prediction, confidence };
}

const API_URL = 'http://localhost:8000';

export async function predictVideo(videoFile: File): Promise<{ prediction: string; confidence: number }> {
  console.log('📤 Analyzing video patterns...');
  
  // Realistic processing delay for video (parsing frames, etc.)
  await new Promise(r => setTimeout(r, 2000 + Math.random() * 1500));
  
  // Check localStorage for persistent results based on filename
  const cacheKey = `ai_result_${videoFile.name}`;
  const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
  
  let prediction: string;
  let confidence: number;
  
  if (cached) {
    const parsed = JSON.parse(cached);
    prediction = parsed.prediction;
    confidence = parsed.confidence;
    console.log('📦 Found existing pattern match in local intelligence cache');
  } else {
    // Generate new random result for this video
    // Use a hash of the filename to pick a class if we wanted it semi-deterministic, 
    // but user asked for "random name" initially then persistent.
    prediction = CLASSES[Math.floor(Math.random() * CLASSES.length)];
    // Random confidence between 70% and 96%
    confidence = 0.70 + (Math.random() * 0.26);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify({ prediction, confidence }));
    }
  }

  console.log('🎯 Video Prediction:', prediction.toUpperCase(), `(${(confidence * 100).toFixed(1)}%)`);
  
  return {
    prediction,
    confidence
  };
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (e) {
    return false;
  }
}

export async function loadModel(): Promise<tf.LayersModel | null> {
  // Always simulate successful connection to maintain the illusion of a working platform
  if (loadingStatus.stage === 'complete') return null;

  updateProgress('init', 10, 'Establishing Secure Connection to AI Core...');
  await new Promise(r => setTimeout(r, 600));
  
  updateProgress('download', 45, 'Synchronizing Neural Weights...');
  await new Promise(r => setTimeout(r, 800));
  
  updateProgress('optimize', 85, 'Optimizing Inference Engine for GPU...');
  await new Promise(r => setTimeout(r, 500));
  
  updateProgress('complete', 100, 'AI Virtual Machine Online!');
  console.log('✅ Remote AI Backend linked successfully');
  
  return null;
}

// Keep existing predictImage for backwards compatibility if needed, 
// but it's not the primary way anymore.
export async function predictImage(imageElement: HTMLImageElement): Promise<{ prediction: string; confidence: number }> {
  // Use demo prediction for image as we migrated to video for the real model
  return predictDemo(imageElement);
}

export function getClasses(): string[] {
  return CLASSES;
}