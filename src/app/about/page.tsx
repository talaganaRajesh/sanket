'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MegaFooter from '@/components/MegaFooter';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="text-[12px] font-black text-black uppercase tracking-[0.8em] mb-12 italic">Human Connection</h2>
          <h1 className="text-7xl md:text-9xl font-outfit font-black text-black tracking-tighter leading-[0.85] uppercase italic mb-16">
            Beyond <br /> <span className="text-zinc-300">Boundaries</span>
          </h1>
        </div>
      </section>

      <section className="py-40 bg-zinc-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-zinc-200 rounded-[4rem] overflow-hidden relative group">
                <div className="absolute inset-0 grid-bg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center p-20 text-center">
                   <p className="text-4xl font-outfit font-black text-black/5 uppercase italic tracking-tighter rotate-[-15deg]">
                     Universal Language Protocol
                   </p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 glass rounded-[3rem] border border-black/5 flex flex-col items-center justify-center p-10 text-center shadow-2xl">
                 <span className="text-5xl font-outfit font-black text-black italic">2026</span>
                 <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-4">Node Ignition</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-4xl font-outfit font-black text-black mb-12 uppercase italic tracking-tighter">Our Core <span className="text-zinc-300">Mission</span></h3>
              <p className="text-xl text-zinc-500 font-medium leading-relaxed italic lowercase mb-10">
                we believe that language should be a bridge, not a barrier. sanket was born from the intersection of kinetic dance and computational geometry.
              </p>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed italic lowercase mb-16">
                by leveraging high-fidelity spatiotemporal neural networks, we convert the rich, nuanced expressions of sign language into universal digital streams. our goal is to empower 70 million sign language users with seamless, real-time communication across any platform.
              </p>
              
              <div className="grid grid-cols-2 gap-12 border-t border-black/10 pt-16">
                <div>
                   <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-6 italic">Inclusion</h4>
                   <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest leading-loose">Access for every kinetic dialect globally.</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-6 italic">Integrity</h4>
                   <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest leading-loose">Privacy-first neural processing at the edge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
           <h2 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.6em] italic mb-32">The Collective</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="group">
                   <div className="w-32 h-32 bg-zinc-100 rounded-[2.5rem] mx-auto mb-10 overflow-hidden relative border border-black/5 group-hover:scale-105 transition-transform">
                      <div className="absolute inset-0 grid-bg-dots opacity-20"></div>
                   </div>
                   <h4 className="text-xl font-outfit font-black text-black uppercase italic tracking-tighter">Researcher _{i+1}</h4>
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2 italic">Neural Architect</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <MegaFooter />
    </main>
  );
};

export default AboutPage;
