'use client';

import React from 'react';

const ImpactMetrics = () => {
  const metrics = [
    { label: 'Avg Latency', value: '4ms', sub: 'Neural Processing Time' },
    { label: 'Recognition Acc', value: '98.8%', sub: 'S-I3D Precision Index' },
    { label: 'Supported Lexicon', value: '14k+', sub: 'Unique Gestural Signs' },
    { label: 'Global Nodes', value: '62', sub: 'Distributed AI Backbone' },
  ];

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-transparent to-transparent"></div>
        <div className="grid-bg opacity-30 h-full w-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:separator">
          {metrics.map((metric, i) => (
            <div key={metric.label} className="text-center md:text-left group">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-6 italic">
                {metric.label}
              </p>
              <h3 className="text-6xl md:text-7xl font-outfit font-black text-white italic tracking-tighter mb-4 transition-transform group-hover:scale-105 duration-500">
                {metric.value}
              </h3>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">
                {metric.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @media (min-width: 768px) {
          .separator > div:not(:last-child) {
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            padding-right: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ImpactMetrics;
