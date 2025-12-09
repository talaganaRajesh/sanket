'use client';

import React from 'react';
import Image from 'next/image';

interface ResultDisplayProps {
  prediction: string;
  confidence: number;
  imageUrl: string;
  isDemoMode?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ prediction, confidence, imageUrl, isDemoMode = false }) => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isDemoMode && (
          <div className="mb-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-yellow-900 font-semibold mb-1">🎭 DEMO MODE - Random Prediction</p>
                <p className="text-yellow-800 text-sm">
                  This is a sample result for testing. To get real AI predictions, convert your model.h5 file using{' '}
                  <span className="font-mono bg-yellow-100 px-1 rounded">CONVERT_WITH_COLAB.md</span> (takes 2 minutes!)
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Prediction Result
            </h2>
            <p className="text-zinc-600">
              AI has analyzed your sign language gesture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image Preview */}
            <div className="order-2 md:order-1">
              <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-emerald-200">
                <Image
                  src={imageUrl}
                  alt="Analyzed sign language"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain bg-zinc-100"
                />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Analyzed
                </div>
              </div>
            </div>

            {/* Prediction Details */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <div className="mb-6">
                <p className="text-sm font-medium text-zinc-600 uppercase tracking-wide mb-2">
                  Detected Character
                </p>
                <div className="inline-block">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-8xl font-bold rounded-2xl shadow-2xl px-12 py-8 mb-4">
                    {prediction.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-zinc-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-zinc-600">Confidence</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="bg-zinc-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  {confidence >= 0.9 ? 'Excellent match!' : confidence >= 0.7 ? 'Good match' : 'Fair match'}
                </p>
              </div>

              {/* Info */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-blue-800">
                    This prediction is based on our AI model trained on sign language gestures
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
            >
              Try Another Image
            </button>
            <button
              onClick={() => {
                const text = `Sign Language Detection: "${prediction.toUpperCase()}" with ${(confidence * 100).toFixed(1)}% confidence`;
                navigator.clipboard.writeText(text);
                alert('Result copied to clipboard!');
              }}
              className="bg-white text-emerald-600 border-2 border-emerald-500 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
            >
              Copy Result
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultDisplay;
