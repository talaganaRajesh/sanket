'use client';

import React from 'react';

const Hero = () => {
  const scrollToUpload = () => {
    const uploadSection = document.querySelector('#upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
              Recognize <br />
              <span className="text-emerald-500">Sign Language</span>{' '}
              Instantly
            </h1>
            
            <p className="mt-6 text-lg lg:text-xl text-zinc-600 leading-relaxed">
              Upload or capture a photo of sign language gestures and get instant AI-powered character recognition for letters and numbers.
            </p>
            
            <div className="mt-8">
              <button 
                onClick={scrollToUpload}
                className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
              >
                Try Now
              </button>
            </div>

            {/* Feature Points */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-zinc-700 font-medium">Instant Recognition</span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-zinc-700 font-medium">36 Characters (0-9, a-z)</span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative order-1  lg:order-2">
            <div className="relative aspect-video bg-zinc-100 rounded-xl overflow-hidden shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/sanketh_hero_video.mp4" type="video/mp4" />
                {/* Fallback for when video isn't available */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-zinc-600 font-medium">Demo Sign Language Video</p>
                    <p className="text-sm text-zinc-500 mt-1">Add your video to /public/videos/</p>
                  </div>
                </div>
              </video>
              
              {/* Overlay Text */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <div className="p-6 text-white">
                  <div className="bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm font-medium">AI Demo</p>
                    <p className="text-xs opacity-90">Sign language being converted to audio</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;