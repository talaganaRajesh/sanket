'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MegaFooter from '@/components/MegaFooter';

const PricingPage = () => {
  const tiers = [
    {
      name: 'Neural Node',
      price: '$0',
      desc: 'For individual researchers and hobbyists.',
      features: ['100 Analysis Units / mo', 'Basic S-I3D Engine', 'Standard Latency', 'Community Access'],
      cta: 'Initialize'
    },
    {
      name: 'Synapse Pro',
      price: '$49',
      desc: 'For professional developers and translators.',
      features: ['Unlimited Units', 'Premium S-I3D v2.4', 'Prioritized Latency (4ms)', 'Direct API Access', 'Custom Lexicon Mapping'],
      cta: 'Ascend Pro',
      popular: true
    },
    {
      name: 'Entity Ultra',
      price: 'Custom',
      desc: 'For large organizations and gov hubs.',
      features: ['Dedicated AI Cluster', 'On-Premise Deployment', 'SLA Guarantee', 'Neural Training Support', 'White-label Interface'],
      cta: 'Talk to Sales'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h2 className="text-[12px] font-black text-black uppercase tracking-[0.8em] mb-12 italic">Economic Model</h2>
          <h1 className="text-7xl md:text-9xl font-outfit font-black text-black tracking-tighter leading-[0.85] uppercase italic mb-16">
            Scale your <br /> <span className="text-zinc-300">Sync</span>
          </h1>
        </div>
      </section>

      <section className="py-40 bg-zinc-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {tiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`glass p-12 md:p-16 rounded-[3rem] border ${
                  tier.popular ? 'border-black shadow-2xl relative z-10 scale-105 bg-white' : 'border-black/5 bg-white/50'
                } transition-all duration-500 hover:shadow-2xl group`}
              >
                {tier.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-widest italic">
                    Most Synced
                  </div>
                )}
                
                <h3 className="text-2xl font-outfit font-black text-black mb-4 uppercase italic tracking-tighter">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-outfit font-black text-black italic tracking-tighter">{tier.price}</span>
                  <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">/ Epoch</span>
                </div>
                <p className="text-zinc-500 text-sm font-medium mb-12 italic lowercase leading-relaxed">
                  {tier.desc}
                </p>
                
                <div className="space-y-6 mb-16">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-center gap-4 group/item">
                      <div className="w-1.5 h-1.5 bg-black rounded-full transition-all group-hover/item:scale-150"></div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover/item:text-black transition-colors">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 ${
                  tier.popular ? 'bg-black text-white' : 'bg-black/5 text-black hover:bg-black hover:text-white'
                }`}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MegaFooter />
    </main>
  );
};

export default PricingPage;
