'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUploaded: (imageFile: File) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploadedImage(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
    
    // Send to parent component for processing
    onImageUploaded(file);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Camera Functions
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      setStream(mediaStream);
      setIsCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob and create file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            handleFile(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="upload-section" className="bg-zinc-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-black mb-3">
            Upload Sign Language Photo
          </h2>
          <p className="text-lg text-zinc-600">
            Upload an image or capture a photo to detect the sign language character
          </p>
          <p className="text-sm text-emerald-600 mt-2 font-medium">
            ✨ Video feature coming soon!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm inline-flex">
            <button
              onClick={() => {
                setActiveTab('upload');
                stopCamera();
              }}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'upload'
                  ? 'bg-emerald-500 text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              Upload Photo
            </button>
            <button
              onClick={() => setActiveTab('camera')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'camera'
                  ? 'bg-emerald-500 text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              Take Photo
            </button>
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-zinc-200">
            {!imagePreviewUrl ? (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-zinc-300 hover:border-emerald-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="mb-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-zinc-500 mb-6">
                    or click to browse from your device
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <button
                  onClick={onButtonClick}
                  disabled={isProcessing}
                  className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Choose Image
                </button>

                <p className="text-sm text-zinc-400 mt-4">
                  Supported formats: JPG, PNG, GIF (Max 10MB)
                </p>
              </div>
            ) : (
              <div>
                <div className="relative mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreviewUrl}
                    alt="Uploaded preview"
                    className="w-full max-h-96 object-contain rounded-lg bg-zinc-100"
                  />
                  {!isProcessing && (
                    <button
                      onClick={resetUpload}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {uploadedImage && (
                  <div className="text-center">
                    <p className="text-zinc-600">
                      <span className="font-medium">File:</span> {uploadedImage.name}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {(uploadedImage.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Camera Tab */}
        {activeTab === 'camera' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-zinc-200">
            {!isCameraActive ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Take a Photo
                </h3>
                <p className="text-zinc-500 mb-6">
                  Use your camera to capture a sign language gesture
                </p>
                <button
                  onClick={startCamera}
                  disabled={isProcessing}
                  className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Camera
                </button>
              </div>
            ) : (
              <div>
                <div className="relative mb-6 bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={capturePhoto}
                    disabled={isProcessing}
                    className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    📸 Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-zinc-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageUpload;
