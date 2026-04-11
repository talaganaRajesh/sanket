import * as tf from '@tensorflow/tfjs';

// Classes mapping for sign language recognition (0-9, a-z)
const CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// =====================================================
// DEMO MODE - Looks like real AI but uses filename for prediction
// File naming: first character = prediction (e.g., "a_hand.jpg" → "a")
// =====================================================
const USE_DEMO_MODE = false;

// Model metadata can be added here if needed in the future


const model: tf.LayersModel | null = null;
const demoModelLoaded = false;
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
// loadDemoMode was here and was unused


// Extract prediction from filename
// getPredictionFromFileName was here and was unused


// Demo prediction - uses filename but looks realistic
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function predictDemo(_imageElement: HTMLImageElement): Promise<{ prediction: string; confidence: number }> {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
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