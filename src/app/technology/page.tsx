'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MegaFooter from '@/components/MegaFooter';

const TechnologyPage = () => {
  const steps = [
    { id: 1, title: 'Layer 01: Voxelization', desc: 'converts raw video streams into 4d tensors, preserving temporal persistence between frames.' },
    { id: 2, title: 'Layer 02: Kinematic Extraction', desc: 'highly-specialized filters detect skeletal joints and trajectory vectors in parallel.' },
    { id: 3, title: 'Layer 03: Latent Synthesis', desc: 'maps physical motion to semantic latent space for high-accuracy lexical decoding.' }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-48 pb-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="text-[12px] font-black text-zinc-500 uppercase tracking-[0.8em] mb-12 italic">Deep Logic</h2>
          <h1 className="text-7xl md:text-9xl font-outfit font-black text-white tracking-tighter leading-[0.85] uppercase italic mb-16">
            Neural <br /> <span className="text-zinc-700">Arch</span>
          </h1>
        </div>
      </section>

      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            <div>
              <h3 className="text-4xl font-outfit font-black text-black mb-12 uppercase italic tracking-tighter">S-I3D <br /> <span className="text-zinc-300">Framework</span></h3>
              <p className="text-xl text-zinc-500 font-medium leading-relaxed italic lowercase mb-10">
                the spatiotemporal inflated 3d convolutional network represents a paradigm shift in kinetic recognition.
              </p>
              
              <div className="space-y-12">
                 {steps.map((step) => (
                   <div key={step.id} className="group">
                      <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-4 italic">{step.title}</h4>
                      <p className="text-sm text-zinc-400 font-medium italic lowercase leading-relaxed">{step.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="bg-black rounded-[4rem] p-12 md:p-20 relative overflow-hidden group">
               <div className="absolute inset-0 grid-bg opacity-10"></div>
               <div className="relative z-10 font-mono text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest">
                  <div className="text-white mb-6 italic">{"// BOOTING_SANKET_KERNEL"}</div>
                  <div className="mb-2 transition-all group-hover:text-white">init_tensor_stream() ... OK</div>
                  <div className="mb-2 transition-all group-hover:text-white">load_si3d_weights(v2.4.8) ... OK</div>
                  <div className="mb-2 transition-all group-hover:text-white">sync_neural_lattice() ... [98.2%]</div>
                  <div className="mb-8 transition-all group-hover:text-white">latency_check() ... 4.2ms</div>
                  
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/5 mt-10">
                     <div className="text-white mb-4 italic">API_ACCESS_PROTOCOL</div>
                     <code className="lowercase text-zinc-400 block whitespace-pre">
{`const client = new SanketNode({
  api_key: 'sk_live_xxxx',
  region: 'v-node-01'
});

const result = await client.analyze(stream);`}
                     </code>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-zinc-50 border-t border-black/5">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-[10px] font-black text-black uppercase tracking-[0.6em] italic mb-24 text-center">Protocol Specs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
               <div>
                  <div className="text-4xl font-outfit font-black text-black mb-2 italic">25.4M</div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Parameters</div>
               </div>
               <div>
                  <div className="text-4xl font-outfit font-black text-black mb-2 italic">4.2ms</div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Inference Time</div>
               </div>
               <div>
                  <div className="text-4xl font-outfit font-black text-black mb-2 italic">1024-D</div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Latent Space</div>
               </div>
               <div>
                  <div className="text-4xl font-outfit font-black text-black mb-2 italic">v2.4.x</div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Core Version</div>
               </div>
            </div>
         </div>
      </section>

      <MegaFooter />
    </main>
  );
};

export default TechnologyPage;
