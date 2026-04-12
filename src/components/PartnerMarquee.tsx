'use client';

import React from 'react';

const PartnerMarquee = () => {
  const partners = [
    'Neural-X', 'GestureSync', 'Ocular Systems', 'Kinetic AI', 'SignStream', 
    'Vector Labs', 'Linguistic-7', 'Axon Dynamics', 'Optic Link', 'Morphic'
  ];

  return (
    <section className="py-24 bg-zinc-50 border-y border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
        <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em] italic">
          Powering Global Accessibility Standards
        </h2>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex whitespace-nowrap gap-20 items-center">
          {[...partners, ...partners].map((partner, i) => (
            <div 
              key={i} 
              className="text-3xl md:text-5xl font-outfit font-black text-black/10 transition-colors hover:text-black uppercase italic tracking-tighter"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnerMarquee;
