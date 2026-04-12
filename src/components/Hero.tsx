'use client';

import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-24">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Decorative Technical HUD */}
      <div className="absolute top-40 left-12 hidden lg:block">
        <div className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.5em] rotate-90 origin-left italic">
          [ NODE_SYNC_ACTIVE ]
        </div>
      </div>
      <div className="absolute bottom-40 right-12 hidden lg:block">
        <div className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.5em] -rotate-90 origin-right italic">
          [ LATENCY_0.004MS ]
        </div>
      </div>

      {/* HUD Corners */}
      <div className="absolute top-32 left-12 w-12 h-12 border-t-2 border-l-2 border-black/5 rounded-tl-2xl hidden lg:block"></div>
      <div className="absolute top-32 right-12 w-12 h-12 border-t-2 border-r-2 border-black/5 rounded-tr-2xl hidden lg:block"></div>
      <div className="absolute bottom-32 left-12 w-12 h-12 border-b-2 border-l-2 border-black/5 rounded-bl-2xl hidden lg:block"></div>
      <div className="absolute bottom-32 right-12 w-12 h-12 border-b-2 border-r-2 border-black/5 rounded-br-2xl hidden lg:block"></div>

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
        <div className="flex justify-center items-center gap-4 mb-12">
           <span className="w-12 h-px bg-black/5"></span>
           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em] italic">v2.4 Neural Release</span>
           <span className="w-12 h-px bg-black/5"></span>
        </div>
        
        {/* Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black text-black mb-10 tracking-tighter leading-[0.85] uppercase italic">
          Precision <br />
          <span className="text-zinc-200">Kinetic</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xl text-zinc-500 mb-16 font-medium leading-relaxed italic lowercase">
          high-fidelity sign language translation powered by advanced spatiotemporal architectures.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button 
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-black text-white px-16 py-6 rounded-full font-black uppercase text-[11px] tracking-[0.4em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10">Initialize Sync</span>
            <div className="absolute inset-0 bg-zinc-800 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
          
          <div className="flex items-center gap-4">
             <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-black italic">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
             </div>
             <div className="text-left">
                <div className="text-[10px] font-black text-black uppercase tracking-widest italic">14k+ Signs</div>
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest italic">In Database</div>
             </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;