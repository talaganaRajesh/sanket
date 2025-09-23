'use client';

import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-black">
                <span className="text-emerald-500">Sanket</span>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="flex items-center space-x-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all duration-200">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;