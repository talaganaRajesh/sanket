'use client';

import React from 'react';

const ProcessProtocol = () => {
  const steps = [
    {
      id: '01',
      title: 'T-Voxelization',
      desc: 'Video frames are decomposed into temporal voxels for volumetric analysis.',
      detail: 'Temporal dimension: 16-frame window / Resolution: 224x224'
    },
    {
      id: '02',
      title: 'Neural Mapping',
      desc: 'Advanced S-I3D layers extract deep spatial features from kinetic gestures.',
      detail: 'Model: Inflated 3D ConvNet / Parameter Count: 25.4M'
    },
    {
      id: '03',
      title: 'Vector Synthesis',
      desc: 'Extracted features are mapped to a multi-dimensional lexical vector space.',
      detail: 'Space: 1024-D Latent Representation / Loss: Triplet-S'
    },
    {
      id: '04',
      title: 'Output Generation',
      desc: 'High-fidelity natural language is synthesized from the vector stream.',
      detail: 'Decoding: Beam Search w/ 5-gram Neural Smoothing'
    }
  ];

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full grid-bg-dots opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black text-black uppercase tracking-[0.6em] mb-8 italic">Operating Model</h2>
            <h3 className="text-6xl md:text-8xl font-outfit font-black text-black leading-[0.9] tracking-tighter uppercase italic">
              Universal <br /> <span className="text-zinc-200">Protocol</span>
            </h3>
          </div>
          <p className="text-zinc-500 text-lg font-medium max-w-sm italic lowercase leading-relaxed">
            the architectural sequence that powers our real-time recognition engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <div key={step.id} className="relative group">
              <div className="text-[120px] font-outfit font-black text-black/5 absolute -top-24 -left-6 group-hover:text-black/10 transition-colors pointer-events-none">
                {step.id}
              </div>
              <div className="relative pt-12">
                <div className="w-12 h-0.5 bg-black mb-10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                <h4 className="text-xl font-outfit font-black text-black mb-4 uppercase italic tracking-tighter">{step.title}</h4>
                <p className="text-zinc-500 text-sm font-medium mb-8 leading-relaxed italic lowercase">
                  {step.desc}
                </p>
                <div className="bg-black/5 p-4 rounded-xl border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-normal">
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessProtocol;
