'use client';

import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-24">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Background Video (Lightly desaturated, but clear) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10 scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hand-gestures-of-a-person-in-a-sign-language-40748-large.mp4" type="video/mp4" />
        </video>
        {/* White wash overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full border border-black/5 mb-10 animate-float shadow-xl">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-black uppercase tracking-[0.4em] italic">
            Neural Signal Link Active
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black text-black mb-10 tracking-tighter leading-[0.9] uppercase italic">
          Precision <br />
          <span className="text-zinc-300">Gestures</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xl text-zinc-500 mb-14 font-medium leading-relaxed italic">
          A high-fidelity spatiotemporal AI core designed to translate complex 
          human sign signals into neural text outputs with zero-latency precision.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-black text-white px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            <span className="relative z-10">Initialize Sequence</span>
            <div className="absolute inset-0 bg-zinc-800 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
          
          <button className="glass px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.3em] text-black border border-black/10 hover:bg-black/5 transition-all">
            Technical Specs
          </button>
        </div>

        {/* HUD Elements (Light) */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block animate-float">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-px w-8 bg-black/10"></div>
                <div className="text-[8px] font-black text-zinc-300 uppercase tracking-widest italic">Signal Layer 0{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;