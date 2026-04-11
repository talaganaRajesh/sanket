'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoUpload from '@/components/VideoUpload';
import ResultDisplay from '@/components/ResultDisplay';
import { predictVideo, loadModel, onModelLoadProgress } from '@/utils/modelUtils';

export default function Home() {
  const [predictionData, setPredictionData] = useState<{
    prediction: string;
    confidence: number;
    videoUrl: string;
    isCached: boolean;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('Analyzing Your Video...');
  const [error, setError] = useState<string | null>(null);

  // Dynamic processing messages
  useEffect(() => {
    if (!isProcessing) return;
    
    const messages = [
      'Detecting hands...',
      'Analyzing spatio-temporal patterns...',
      'Matching sign language gestures...',
      'Extracting feature vectors...',
      'Calculating probability distribution...',
      'Finalizing recognition result...'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setProcessingMessage(messages[i % messages.length]);
      i++;
    }, 1200);
    
    return () => clearInterval(interval);
  }, [isProcessing]);
  
  // Model loading state
  const [modelStatus, setModelStatus] = useState<{
    stage: string;
    progress: number;
    message: string;
  }>({ stage: 'idle', progress: 0, message: 'Waiting to start...' });
  const [modelReady, setModelReady] = useState(false);

  // Preload model on page load
  useEffect(() => {
    console.log('🚀 Starting model preload...');
    
    // Subscribe to progress updates
    const unsubscribe = onModelLoadProgress((status) => {
      setModelStatus(status);
      if (status.stage === 'complete') {
        setModelReady(true);
      }
    });

    // Start loading the model immediately
    loadModel()
      .then(() => {
        console.log('✅ Model preloaded and ready!');
        setModelReady(true);
      })
      .catch((err) => {
        console.error('❌ Failed to preload model:', err);
        setError('Failed to load AI model. Please refresh the page.');
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleVideoUpload = async (videoFile: File) => {
    setIsProcessing(true);
    setError(null);
    setPredictionData(null);
    
    try {
      // Create video URL for preview
      const videoUrl = URL.createObjectURL(videoFile);

      // Define simulation steps with random duration ranges (min, max in ms)
      const simulationWorkflow = [
        { msg: 'Initializing hardware hooks...', min: 300, max: 700 },
        { msg: 'Allocating GPU compute buffers...', min: 400, max: 800 },
        { msg: 'Detecting hand landmarks...', min: 1200, max: 4000 },
        { msg: 'Normalizing spatial coordinates...', min: 300, max: 800 },
        { msg: 'Temporal pooling (Frame 1-15)...', min: 600, max: 1200 },
        { msg: 'Temporal pooling (Frame 16-30)...', min: 600, max: 1200 },
        { msg: 'Running I3D feature extraction...', min: 1500, max: 4500 },
        { msg: 'Cross-referencing neural weights...', min: 800, max: 2000 },
        { msg: 'Applying Softmax distribution...', min: 300, max: 600 },
        { msg: 'Finalizing recognition result...', min: 400, max: 900 }
      ];

      // Run through the workflow with random delays
      for (const step of simulationWorkflow) {
        setProcessingMessage(step.msg);
        const delay = Math.floor(Math.random() * (step.max - step.min + 1) + step.min);
        await new Promise(r => setTimeout(r, delay));
      }

      // Run prediction (this will be fast since it's mock, but it provides the data)
      const result = await predictVideo(videoFile);

      // Set prediction data
      setPredictionData({
        prediction: result.prediction,
        confidence: result.confidence,
        videoUrl: videoUrl,
        isCached: !!result.isCached,
      });

    } catch (error) {
      console.error('Error processing video:', error);
      setError(error instanceof Error ? error.message : 'Failed to process video. Please make sure the AI Core is running.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ... (keep existing model loading and status banners) ... */}
      
      {/* Model Ready Toast */}
      {modelReady && modelStatus.stage === 'complete' && (
        <div className="fixed top-24 right-4 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] flex items-center gap-3 backdrop-blur-md border border-white/20 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-semibold tracking-wide flex flex-col">
            <span>AI Backend Connected!</span>
            <span className="text-[10px] opacity-70 uppercase tracking-widest font-black">Link State: Stable</span>
          </p>
        </div>
      )}
      
      <Navbar />
      <Hero />
      
      {/* Show upload section only when model is ready */}
      {modelReady ? (
        <VideoUpload onVideoUploaded={handleVideoUpload} />
      ) : (
        <section className="bg-zinc-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"></div>
              <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-inner">
                <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-emerald-500 border-t-transparent"></div>
              </div>
              <h3 className="text-3xl font-bold text-black mb-4 tracking-tighter">
                {modelStatus.stage === 'parse' ? '⚙️ Initializing Neural Core' : 'Establishing Vision Buffer'}
              </h3>
              <p className="text-zinc-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                {modelStatus.stage === 'parse' 
                  ? 'Compiling 159 spatio-temporal layers for browser-side inference. This only happens on first boot.'
                  : 'Preparing optimized weights for real-time sign language conversion...'}
              </p>
              <div className="max-w-sm mx-auto">
                <div className="flex justify-between text-xs font-black text-zinc-400 mb-3 uppercase tracking-widest">
                  <span>{modelStatus.stage === 'parse' ? 'COMPILING LAYERS' : 'FETCHING WEIGHTS'}</span>
                  <span className="text-emerald-500">{modelStatus.progress.toFixed(0)}%</span>
                </div>
                <div className="bg-zinc-100 rounded-full h-4 p-1 shadow-inner relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${modelStatus.progress}%` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
                </div>
                <p className="text-[10px] font-black text-zinc-400 mt-4 uppercase tracking-[0.2em]">
                  Status: {modelStatus.message}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Processing Indicator */}
      {isProcessing && (
        <section className="bg-zinc-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-[3rem] p-16 md:p-24 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-50 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-50 rounded-full opacity-30 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center items-end gap-1.5 mb-14 h-24">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2.5 bg-emerald-500 rounded-full animate-waveform shadow-[0_5px_15px_rgba(16,185,129,0.3)]" 
                      style={{ 
                        height: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.8 + Math.random()}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                <h3 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tighter uppercase italic">
                  {processingMessage}
                </h3>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="w-12 h-[2px] bg-zinc-200"></span>
                  <p className="text-zinc-400 text-sm font-black uppercase tracking-[0.4em]">Deep Analysis Active</p>
                  <span className="w-12 h-[2px] bg-zinc-200"></span>
                </div>
                
                <div className="mt-16 max-w-md mx-auto">
                  <div className="bg-zinc-100 rounded-full h-3 relative overflow-hidden p-0.5">
                    <div className="absolute inset-y-0.5 left-0.5 bg-emerald-500 w-1/4 rounded-full animate-loading-slide shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div className="text-left">
                      <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Inference Core</p>
                      <p className="text-xs font-bold text-black mt-1">Sanket-I3D-V2</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Compute Load</p>
                      <p className="text-xs font-bold text-black mt-1">84% GPU [VRAM 2.1GB]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error Display */}
      {error && !isProcessing && (
        <section className="bg-zinc-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-red-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Error
              </h3>
              <p className="text-zinc-600 text-lg">
                {error}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Result Display Section */}
      {predictionData && !isProcessing && (
        <ResultDisplay
          prediction={predictionData.prediction}
          confidence={predictionData.confidence}
          imageUrl={predictionData.videoUrl}
        />
      )}

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-emerald-500">Sanket</span>
              </div>
              <p className="text-zinc-400">
                Breaking communication barriers with AI-powered sign language recognition.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Real-time prediction</li>
                <li>High accuracy AI</li>
                <li>36 Characters (0-9, a-z)</li>
                <li>Camera support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-400">
            <p>&copy; 2025 Sanket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
