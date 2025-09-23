'use client';

import React, { useState, useRef } from 'react';

interface VideoUploadProps {
  onVideoUploaded: (videoFile: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Check if file is video
    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    setIsUploading(true);
    setUploadedVideo(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      onVideoUploaded(file);
    }, 1500);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="upload-section" className="bg-zinc-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Upload Your Sign Language Video
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Drop your video file below and our AI will convert the sign language into English audio instantly.
          </p>
        </div>

        {/* Upload Area */}
        <div className="space-y-8">
          <div
            className={`upload-area relative border-2 border-dashed rounded-xl p-8 lg:p-12 text-center cursor-pointer transition-all duration-300 ${
              dragActive 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-zinc-300 bg-white hover:border-emerald-400 hover:bg-emerald-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleChange}
              className="hidden"
            />
            
            {isUploading ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-emerald-600">Uploading...</p>
                  <p className="text-sm text-zinc-500">Processing your video</p>
                </div>
              </div>
            ) : uploadedVideo ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-emerald-600">Video Uploaded Successfully!</p>
                  <p className="text-sm text-zinc-500">{uploadedVideo.name}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedVideo(null);
                      setVideoPreviewUrl(null);
                      if (videoPreviewUrl) {
                        URL.revokeObjectURL(videoPreviewUrl);
                      }
                    }}
                    className="mt-2 text-zinc-400 hover:text-zinc-600 text-sm underline"
                  >
                    Upload different video
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-zinc-700">
                    Drag and drop your video here, or click to browse
                  </p>
                  <p className="text-sm text-zinc-500 mt-2">
                    Supports MP4, MOV, AVI and other video formats
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Maximum file size: 100MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Video Preview */}
          {videoPreviewUrl && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
              <h3 className="text-lg font-semibold text-black mb-4">Video Preview</h3>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={videoPreviewUrl}
                  controls
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
                <span>File: {uploadedVideo?.name}</span>
                <span>Size: {uploadedVideo ? (uploadedVideo.size / (1024 * 1024)).toFixed(2) : 0} MB</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoUpload;