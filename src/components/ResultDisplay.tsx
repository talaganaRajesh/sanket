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
    <section className="bg-zinc-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden border border-zinc-100 flex flex-col md:flex-row">
          
          {/* Left Side: Preview */}
          <div className="w-full md:w-5/12 bg-black flex items-center justify-center relative min-h-[400px]">
            {isCached && (
              <div className="absolute top-6 left-6 z-20 bg-blue-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.15em] shadow-lg flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Cached Result
              </div>
            )}
            <div className="absolute top-6 right-6 z-20 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.15em] shadow-lg">
              AI-Analyzed
            </div>
            
            {isVideo ? (
              <video 
                src={imageUrl} 
                controls 
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={imageUrl}
                alt="Analyzed sign language"
                width={800}
                height={600}
                className="w-full h-full object-contain opacity-90"
              />
            )}
            
            {/* Visual scan effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-scan-line"></div>
          </div>

          {/* Right Side: Details */}
          <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-gradient-to-br from-white to-zinc-50">
            <div className="mb-10 text-center md:text-left">
              <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 block">
                Recognition Success
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight leading-none">
                Detected Word
              </h2>
              
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-black text-white px-8 md:px-12 py-6 md:py-8 rounded-3xl inline-block shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex-shrink-0 max-w-full">
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter break-words uppercase">
                    {prediction}
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Confidence Meter */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-zinc-100">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Match Accuracy</p>
                    <span className="text-3xl font-black text-black">{(confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                    {confidence >= 0.9 ? 'High Precision' : 'Accurate Match'}
                  </div>
                </div>
                
                <div className="bg-zinc-100 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out delay-500"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-xs font-medium text-zinc-500">
                    Neural weights verified against 1024-dim features.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                >
                  Analyze New Video
                </button>
                <button
                  onClick={() => {
                    const text = `Sanket AI Recognition: "${prediction}" (${(confidence * 100).toFixed(1)}% confidence)`;
                    navigator.clipboard.writeText(text);
                    alert('Result copied to clipboard!');
                  }}
                  className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  Share Result
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer info badge */}
        <div className="mt-10 bg-blue-50/50 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-blue-900 leading-relaxed">
            <strong className="block mb-1">Architecture Information</strong>
            This detection utilized the <span className="font-bold underline decoration-blue-300 underline-offset-2">Spatio-Temporal I3D Neural Architecture</span> optimized for real-time sign language conversion. Performance may vary based on lighting and gesture speed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResultDisplay;
