'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Technology', href: '/technology' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 group">
      <div className="max-w-7xl mx-auto">
        <div className="glass lg:rounded-full rounded-3xl px-8 py-5 flex items-center justify-between border border-black/5 shadow-2xl transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group/logo">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover/logo:rotate-12">
              <div className="w-5 h-5 bg-white rounded-sm rotate-45 transform transition-all group-hover/logo:scale-110"></div>
            </div>
            <span className="text-2xl font-outfit font-black text-black tracking-tighter italic uppercase">
              Sanket
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-black ${
                  pathname === link.href ? 'text-black' : 'text-zinc-400'
                } relative group/link`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover/link:w-full ${
                  pathname === link.href ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* CTA & Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest italic">System v2.4 Active</span>
            </div>
            
            <Link 
              href="/#upload-section"
              className="bg-black text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-2"
            >
              <span>Launch</span>
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;