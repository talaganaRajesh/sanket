'use client';

import React from 'react';
import Link from 'next/link';

const MegaFooter = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Neural Engine', href: '/technology' },
        { name: 'Sign Library', href: '/features' },
        { name: 'Real-time API', href: '/technology' },
        { name: 'Security Protocol', href: '/features' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Our Mission', href: '/about' },
        { name: 'Research Lab', href: '/about' },
        { name: 'Careers', href: '/about' },
        { name: 'Press Kit', href: '/about' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/technology' },
        { name: 'Community', href: '/contact' },
        { name: 'Help Center', href: '/contact' },
        { name: 'Status', href: '/technology' },
      ],
    },
  ];

  return (
    <footer className="relative py-32 overflow-hidden bg-white border-t border-black/5">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-20">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-10 group/logo">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform group-hover/logo:rotate-12">
                <div className="w-6 h-6 bg-white rounded-md rotate-45 transform transition-all group-hover/logo:scale-110"></div>
              </div>
              <span className="text-4xl font-outfit font-black text-black tracking-tighter italic uppercase">
                Sanket
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium italic lowercase">
              Bridging the gap between human kinetic language and digital neural processing through spatiotemporal feature extraction.
            </p>
            
            <div className="mt-12 flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-500 group">
                  <div className="w-2 h-2 bg-black rounded-full group-hover:bg-white animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-12 italic">
                {section.title}
              </h3>
              <ul className="space-y-6">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest hover:text-black transition-colors relative group/link"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover/link:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
        ))}
        
        {/* Contact/Newsletter Column */}
        <div className="md:col-span-1">
          <h3 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-12 italic">
            Connect
          </h3>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-loose mb-8">
            Stay updated with our neural progress.
          </p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="NETWORK_ID@MAIL"
              className="w-full bg-black/5 border border-black/5 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black/20 transition-all italic"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-black text-white px-4 rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              Sync
            </button>
          </div>
        </div>
        </div>
      </div>

      <div className="mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] italic">
            © SANKET-SYSTEMS 2026 / ALL SEQUENCES RESERVED
          </div>
          <div className="text-[8px] font-bold text-zinc-200 uppercase tracking-widest italic">
            Protocol: 0x882_Alpha / Latency: 4ms / Region: Global-Node-01
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/terms" className="text-[10px] font-black text-zinc-300 hover:text-black transition-colors uppercase tracking-widest italic">
            Rights
          </Link>
          <Link href="/privacy" className="text-[10px] font-black text-zinc-300 hover:text-black transition-colors uppercase tracking-widest italic">
            Privacy
          </Link>
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-black/10 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MegaFooter;
