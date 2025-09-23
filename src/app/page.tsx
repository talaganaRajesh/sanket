'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoUpload from '@/components/VideoUpload';
import AudioPlayer from '@/components/AudioPlayer';

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [audioData, setAudioData] = useState<{
    audioUrl: string;
    transcription: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVideoUpload = async (videoFile: File) => {
    setUploadedVideo(videoFile);
    setIsProcessing(true);

    try {
      // Create FormData to send the video file
      const formData = new FormData();
      formData.append('video', videoFile);

      // Call our dummy API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setAudioData({
          audioUrl: result.audioUrl,
          transcription: result.transcription,
        });
      } else {
        console.error('Upload failed:', result.error);
        // In a real app, you'd show an error message to the user
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <VideoUpload onVideoUploaded={handleVideoUpload} />
      
      {/* Processing Indicator */}
      {isProcessing && (
        <section className="bg-zinc-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-zinc-200">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Processing Your Video
              </h3>
              <p className="text-zinc-600 text-lg">
                Our AI is analyzing the sign language and converting it to audio...
              </p>
              <div className="mt-6 bg-zinc-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-zinc-500 mt-2">
                This usually takes 2-5 seconds
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Audio Player Section */}
      {audioData && !isProcessing && (
        <AudioPlayer 
          audioSrc={audioData.audioUrl}
          transcription={audioData.transcription}
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
                Breaking communication barriers with AI-powered sign language translation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Real-time conversion</li>
                <li>High accuracy AI</li>
                <li>Multiple sign languages</li>
                <li>Audio transcription</li>
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
