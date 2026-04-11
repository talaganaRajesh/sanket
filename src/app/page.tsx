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

      // Define simulation workflow
      const simulationWorkflow = [
        { msg: 'Initializing hardware hooks...', min: 300, max: 700 },
        { msg: 'Allocating GPU compute buffers...', min: 400, max: 800 },
        { msg: 'Detecting hand landmarks...', min: 1200, max: 4000 },
        { msg: 'Temporal pooling active...', min: 800, max: 2000 },
        { msg: 'Running I3D extraction...', min: 1500, max: 3500 },
        { msg: 'Finalizing result...', min: 400, max: 900 }
      ];

      for (const step of simulationWorkflow) {
        setProcessingMessage(step.msg);
        const delay = Math.floor(Math.random() * (step.max - step.min + 1) + step.min);
        await new Promise(r => setTimeout(r, delay));
      }

      const result = await predictVideo(videoFile);

      setPredictionData({
        prediction: result.prediction,
        confidence: result.confidence,
        videoUrl: videoUrl,
        isCached: !!result.isCached,
      });

    } catch (error) {
      console.error('Error processing video:', error);
      setError(error instanceof Error ? error.message : 'Failed to process video.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white transition-colors duration-1000">
      
      <Navbar />
      <Hero />
      
      {/* Initializing Neural Core Section */}
      {!modelReady && (
        <section className="relative py-32 overflow-hidden bg-zinc-50/50">
          <div className="absolute inset-0 grid-bg opacity-40"></div>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="glass rounded-[3rem] p-16 md:p-24 border border-black/5 overflow-hidden group">
              <div className="relative z-10">
                <div className="w-32 h-32 bg-black/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 border border-black/5 animate-float shadow-sm">
                  <div className="animate-spin rounded-full h-16 w-16 border-2 border-black border-t-transparent opacity-80"></div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-outfit font-black text-black mb-6 uppercase italic tracking-tighter">
                  {modelStatus.stage === 'parse' ? 'Compiling <span className="text-zinc-400">Neural</span>' : 'Fetching <span className="text-zinc-400">Weights</span>'}
                </h3>
                
                <p className="text-zinc-500 text-lg mb-12 max-w-md mx-auto font-medium lowercase italic leading-relaxed">
                  {modelStatus.stage === 'parse' 
                    ? 'Optimizing spatiotemporal kernels for high-fidelity inference.'
                    : 'Awaiting neural parameter injection...'}
                </p>
                
                <div className="max-w-sm mx-auto">
                  <div className="flex justify-between text-[10px] font-black text-zinc-400 mb-4 uppercase tracking-[0.4em]">
                    <span>Synchronization Status</span>
                    <span className="text-black italic">{modelStatus.progress.toFixed(0)}%</span>
                  </div>
                  <div className="bg-black/5 rounded-full h-2.5 p-0.5 border border-black/5 relative overflow-hidden backdrop-blur-sm">
                    <div 
                      className="bg-black h-full rounded-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
                      style={{ width: `${modelStatus.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-[9px] font-black text-zinc-400 mt-6 uppercase tracking-[0.3em] italic">
                    Protocol: {modelStatus.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Feature Entry: Only show when model is ready and NOT processing/showing results */}
      {modelReady && !isProcessing && !predictionData && (
        <VideoUpload onVideoUploaded={handleVideoUpload} />
      )}
      
      {/* Processing Indicator */}
      {isProcessing && (
        <section className="relative py-32 overflow-hidden bg-white">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="glass rounded-[4rem] p-20 md:p-32 border border-black/5 relative overflow-hidden">
              {/* Technical HUD Overlay (Light) */}
              <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-black/10 rounded-tl-3xl"></div>
              <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-black/10 rounded-tr-3xl"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-black/10 rounded-bl-3xl"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-black/10 rounded-br-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center items-end gap-2 mb-20 h-32">
                  {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2.5 bg-black rounded-full animate-waveform shadow-sm" 
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`,
                        animationDelay: `${i * 0.08}s`,
                        animationDuration: `${0.6 + Math.random()}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                <h3 className="text-5xl md:text-7xl font-outfit font-black text-black mb-8 tracking-tighter uppercase italic">
                  {processingMessage}
                </h3>
                
                <div className="flex items-center justify-center gap-6 mb-12">
                  <span className="w-16 h-px bg-black/10"></span>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] italic">Extraction Active</p>
                  <span className="w-16 h-px bg-black/10"></span>
                </div>
                
                <div className="mt-16 max-w-lg mx-auto">
                  <div className="bg-black/5 rounded-full h-3 relative overflow-hidden border border-black/5 backdrop-blur-sm">
                    <div className="absolute inset-y-0.5 left-0.5 bg-black w-1/3 rounded-full animate-loading-slide"></div>
                  </div>
                  <div className="flex justify-between mt-10">
                    <div className="text-left">
                      <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] italic">Algorithm Engine</p>
                      <p className="text-sm font-outfit font-bold text-black mt-2 uppercase">Sanket-I3D</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] italic">Buffer State</p>
                      <p className="text-sm font-outfit font-bold text-black mt-2 uppercase">Sync Complete</p>
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
        <section className="relative py-32 overflow-hidden bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="glass rounded-[3rem] p-16 md:p-24 border border-red-500/10 overflow-hidden group">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-red-50 text-red-500 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-sm">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-4xl font-outfit font-black text-black mb-6 uppercase italic tracking-tighter">
                  System <span className="text-red-500/50">Bypass</span>
                </h3>
                <p className="text-zinc-500 text-lg max-w-md mx-auto font-medium lowercase italic leading-relaxed">
                  {error}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-12 px-10 py-4 bg-black text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-transform hover:scale-105 active:scale-95"
                >
                  Force Hard Reset
                </button>
              </div>
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
      <footer className="relative py-24 overflow-hidden bg-white border-t border-black/5">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-5 h-5 bg-white rounded-sm rotate-45"></div>
                </div>
                <span className="text-3xl font-outfit font-black text-black italic tracking-tighter uppercase">Sanket</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
                Pioneering high-fidelity spatiotemporal sign recognition via advanced neural architectures.
              </p>
            </div>
            
            <div>
              <h3 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-10 italic">Core</h3>
              <ul className="space-y-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                <li className="hover:text-black transition-colors cursor-pointer">Neural Link</li>
                <li className="hover:text-black transition-colors cursor-pointer">Optical Feed</li>
                <li className="hover:text-black transition-colors cursor-pointer">Vector API</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-10 italic">Docs</h3>
              <ul className="space-y-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                <li className="hover:text-black transition-colors cursor-pointer">Whitepaper</li>
                <li className="hover:text-black transition-colors cursor-pointer">Security</li>
                <li className="hover:text-black transition-colors cursor-pointer">Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-black/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] italic">
                © SANKET-SYSTEMS 2026 / ALL SEQUENCES RESERVED
             </div>
             <div className="flex gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-black/5 rounded-full"></div>
                ))}
             </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
