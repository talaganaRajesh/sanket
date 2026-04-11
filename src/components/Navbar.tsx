'use client';

import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-8 left-0 right-0 z-40 px-4 group">
      <div className="max-w-7xl mx-auto">
        <div className="glass lg:rounded-full rounded-[2rem] px-8 py-4 flex items-center justify-between border border-black/5 shadow-2xl transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-12">
              <div className="w-5 h-5 bg-white rounded-sm rotate-45 transform transition-all group-hover:scale-110"></div>
            </div>
            <span className="text-2xl font-outfit font-black text-black tracking-tighter italic uppercase">
              Sanket
            </span>
          </div>

          {/* Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-12">
            {['Architecture', 'Research', 'Security'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-[0.3em] transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-black hover:after:w-full after:transition-all"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            Access Core
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;