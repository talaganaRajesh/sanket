'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MegaFooter from '@/components/MegaFooter';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Temporal Voxel Analysis',
      desc: 'Our proprietary S-I3D model analyzes 3D cubes of video data, capturing both spatial hand shapes and temporal motion dynamics.',
      icon: '01'
    },
    {
      title: 'Neural Skeletal Mapping',
      desc: 'Real-time extraction of 21 key points per hand, providing sub-millimeter precision even in low-light environments.',
      icon: '02'
    },
    {
      title: 'Contextual Decoding',
      desc: 'Advanced NLP layers interpret signs within the context of the sentence, resolving ambiguities common in regional dialects.',
      icon: '03'
    },
    {
      title: 'Edge-Link Sync',
      desc: 'Optimized model weights allow for local processing, ensuring data privacy and ultra-low latency without cloud round-trips.',
      icon: '04'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-[12px] font-black text-black uppercase tracking-[0.8em] mb-12 italic">Precision Core</h2>
            <h1 className="text-7xl md:text-9xl font-outfit font-black text-black tracking-tighter leading-[0.85] uppercase italic mb-16">
              Neural <br /> <span className="text-zinc-300">Dimensions</span>
            </h1>
            <p className="text-xl text-zinc-500 font-medium max-w-xl leading-relaxed italic lowercase">
              exploring the high-fidelity capabilities of the sanket recognition engine.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-40 bg-zinc-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="flex items-start gap-10">
                  <div className="text-5xl font-outfit font-black text-black/10 transition-colors group-hover:text-black italic">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-outfit font-black text-black mb-8 uppercase italic tracking-tighter">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-500 text-lg leading-relaxed font-medium italic lowercase">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interaction Showcase */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-block px-12 py-32 glass rounded-[4rem] border border-black/5 w-full bg-white relative overflow-hidden group">
            <div className="absolute inset-0 grid-bg-dots opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-outfit font-black text-black mb-12 uppercase italic tracking-tighter">
                Ready for <span className="text-zinc-300">Integration?</span>
              </h2>
              <button className="bg-black text-white px-16 py-6 rounded-full text-xs font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-2xl">
                Open Access Protocol
              </button>
            </div>
          </div>
        </div>
      </section>

      <MegaFooter />
    </main>
  );
};

export default FeaturesPage;
