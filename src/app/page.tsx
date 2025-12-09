'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ImageUpload from '@/components/ImageUpload';
import ResultDisplay from '@/components/ResultDisplay';
import { predictImage } from '@/utils/modelUtils';

export default function Home() {
  const [predictionData, setPredictionData] = useState<{
    prediction: string;
    confidence: number;
    imageUrl: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    setIsProcessing(true);
    setError(null);
    setPredictionData(null);

    try {
      // Create image URL for preview
      const imageUrl = URL.createObjectURL(imageFile);

      // Load image to HTML element for TensorFlow.js
      const img = new Image();
      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Run prediction
      const result = await predictImage(img);

      // Set prediction data
      setPredictionData({
        prediction: result.prediction,
        confidence: result.confidence,
        imageUrl: imageUrl,
      });

    } catch (error) {
      console.error('Error processing image:', error);
      setError(error instanceof Error ? error.message : 'Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <ImageUpload onImageUploaded={handleImageUpload} isProcessing={isProcessing} />
      
      {/* Processing Indicator */}
      {isProcessing && (
        <section className="bg-zinc-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-zinc-200">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Analyzing Your Image
              </h3>
              <p className="text-zinc-600 text-lg">
                Our AI is detecting the sign language character...
              </p>
              <div className="mt-6 bg-zinc-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-zinc-500 mt-2">
                This usually takes a few seconds
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Error Display */}
      {error && !isProcessing && (
        <section className="bg-zinc-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-red-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Error
              </h3>
              <p className="text-zinc-600 text-lg">
                {error}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Result Display Section */}
      {predictionData && !isProcessing && (
        <ResultDisplay
          prediction={predictionData.prediction}
          confidence={predictionData.confidence}
          imageUrl={predictionData.imageUrl}
        />
      )}

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-emerald-500">Sanket</span>
              </div>
              <p className="text-zinc-400">
                Breaking communication barriers with AI-powered sign language recognition.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Real-time prediction</li>
                <li>High accuracy AI</li>
                <li>36 Characters (0-9, a-z)</li>
                <li>Camera support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-400">
            <p>&copy; 2025 Sanket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
