'use client';

import React from 'react';
import Image from 'next/image';

interface ResultDisplayProps {
  prediction: string;
  confidence: number;
  imageUrl: string; 
  isCached?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ prediction, confidence, imageUrl, isCached }) => {
  const isVideo = imageUrl.endsWith('.mp4') || imageUrl.startsWith('blob:');

  return (
    <section className="relative py-10 overflow-hidden bg-zinc-50/50 min-h-[calc(100vh-80px)] flex items-center">
       {/* Background Grid */}
       <div className="absolute inset-0 grid-bg-dots opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="glass rounded-[2rem] shadow-2xl overflow-hidden border border-black/5 flex flex-col md:flex-row items-stretch bg-white max-h-[85vh]">
          
          {/* Left Side: Neural Feed Preview */}
          <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative border-r border-black/5 overflow-hidden">
            {isCached && (
              <div className="absolute top-6 left-6 z-20 glass px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] flex items-center gap-2 border border-black/5 text-zinc-400 italic">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                Buffer Sync
              </div>
            )}
            <div className="absolute top-6 right-6 z-20 bg-white text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] shadow-lg italic">
              Verification Pass
            </div>
            
            <div className="w-full h-full relative group">
              <div className="w-full h-full flex items-center justify-center bg-black">
                {isVideo ? (
                  <video 
                    src={imageUrl} 
                    controls 
                    className="max-w-full max-h-full object-contain transition-all duration-700"
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt="Neural input"
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain transition-all duration-700"
                  />
                )}
              </div>
              {/* Scan Overlay (Light) */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 shadow-[0_0_10px_white] animate-scan-line pointer-events-none"></div>
            </div>
          </div>

          {/* Right Side: Analytical Output */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
            <div className="mb-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4 italic">
                <span className="w-8 h-px bg-black/10"></span>
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">
                  Analysis Output
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-outfit font-black text-black mb-6 tracking-tighter uppercase italic leading-none">
                Detected <span className="text-zinc-200">Sequence</span>
              </h2>
              
              <div className="relative inline-block">
                <div className="relative bg-black text-white px-8 py-6 rounded-3xl shadow-xl transition-transform hover:scale-[1.01]">
                  <h3 className="text-4xl md:text-5xl font-outfit font-black tracking-tighter uppercase break-words leading-none">
                    {prediction}
                  </h3>
                  {/* Technical detail */}
                  <div className="absolute -bottom-3 -right-3 bg-white border border-black/5 p-2 rounded-xl shadow-lg">
                    <p className="text-[8px] font-black text-black uppercase tracking-widest italic leading-none">Prot: S-I3D</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Confidence Matrix (Light) */}
              <div className="bg-zinc-50 border border-black/5 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-black/5"></div>
                
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2 italic">Probability Score</p>
                    <span className="text-2xl font-outfit font-black text-black tracking-tight">
                      {(confidence * 100).toFixed(1)}
                      <span className="text-zinc-300 text-lg font-bold ml-1">%</span>
                    </span>
                  </div>
                  <div className="text-[8px] font-black text-black px-3 py-1 bg-white border border-black/5 rounded-full uppercase tracking-widest italic shadow-sm">
                    Sigma: {confidence >= 0.9 ? '99' : '82'}
                  </div>
                </div>
                
                <div className="bg-black/5 rounded-full h-2 relative overflow-hidden border border-black/5">
                  <div
                    className="bg-black h-full rounded-full transition-all duration-[1500ms] ease-out"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
              </div>

              {/* Interaction Layer */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-black text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-lg flex-1"
                >
                  New Ingestion
                </button>
                <button
                  onClick={() => {
                    const text = `Sanket Output: "${prediction}" [${(confidence * 100).toFixed(1)}%]`;
                    navigator.clipboard.writeText(text);
                    alert('Output Exported');
                  }}
                  className="glass text-black px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-black/10 hover:bg-black/5 flex-1"
                >
                  Export Data
                </button>
              </div>
            </div>
            
            {/* Small Protocol Notice */}
            <div className="mt-8 pt-6 border-t border-black/5">
                <p className="text-[9px] font-medium text-zinc-400 leading-relaxed italic">
                    <strong className="text-black font-black uppercase tracking-widest">Protocol S-I3D:</strong> Signal processing finalized using spatiotemporal kernels across 64 frames. 
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultDisplay;
