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
        {/* Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black text-black mb-10 tracking-tighter leading-[0.9] uppercase italic">
          Precision <br />
          <span className="text-zinc-300">Gestures</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xl text-zinc-500 mb-14 font-medium leading-relaxed italic">
          High-fidelity sign language translation powered by advanced neural architecture.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-black text-white px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-zinc-800 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
        </div>
      </div>

    </section>
  );
};

export default Hero;