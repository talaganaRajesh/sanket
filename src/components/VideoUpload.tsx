'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface VideoUploadProps {
  onVideoUploaded: (videoFile: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUploaded }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'record'>('upload');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect to handle video stream changes
  useEffect(() => {
    if (stream && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;
      
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded, attempting to play...');
        video.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Cleanup function
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [stream]);

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

  // Video Recording Functions
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      });
      
      console.log('Camera stream obtained:', mediaStream);
      console.log('Video tracks:', mediaStream.getVideoTracks());
      console.log('Audio tracks:', mediaStream.getAudioTracks());
      
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsRecording(false);
    setMediaRecorder(null);
  };

  const startRecording = useCallback(() => {
    if (!stream) return;

    try {
      // Try different mimeTypes for better compatibility
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'video/mp4';
          }
        }
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const file = new File([blob], `recorded-video-${Date.now()}.webm`, { type: 'video/webm' });
        
        // Create preview URL
        const url = URL.createObjectURL(blob);
        setVideoPreviewUrl(url);
        setUploadedVideo(file);
        
        // Clean up recording state
        setRecordedChunks([]);
        setIsRecording(false);
        setMediaRecorder(null);
        
        // Stop camera after recording
        stopCamera();
        
        // Process the recorded video
        onVideoUploaded(file);
      };
      
      setMediaRecorder(recorder);
      setRecordedChunks(chunks);
      recorder.start(1000); // Record in 1 second chunks
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not start recording. Please try again.');
    }
  }, [stream, onVideoUploaded]);

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const handleTabChange = (tab: 'upload' | 'record') => {
    setActiveTab(tab);
    // Clean up when switching tabs
    if (tab === 'upload') {
      stopCamera();
      setIsRecording(false);
    } else {
      // Reset upload state
      setUploadedVideo(null);
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
      setVideoPreviewUrl(null);
    }
  };

  const resetRecording = () => {
    setUploadedVideo(null);
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoPreviewUrl(null);
    setIsRecording(false);
    setMediaRecorder(null);
    setStream(null);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <section id="upload-section" className="bg-zinc-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Upload or Record Your Sign Language Video
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Choose to upload an existing video or record a new one directly in your browser. Our AI will convert the sign language into English audio instantly.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-zinc-200">
            <button
              onClick={() => handleTabChange('upload')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'upload' 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-zinc-800'
              }`}
            >
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Video
            </button>
            <button
              onClick={() => handleTabChange('record')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'record' 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-zinc-800'
              }`}
            >
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Record Video
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-8">
          {activeTab === 'upload' ? (
            // Upload Area
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
              ) : uploadedVideo && activeTab === 'upload' ? (
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
          ) : (
            // Recording Area
            !uploadedVideo ? (
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-zinc-200">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-zinc-800 mb-2">Record Your Sign Language</h3>
                  <p className="text-zinc-600">Use your camera to record sign language directly</p>
                </div>

                {/* Camera View */}
                <div className="aspect-video bg-zinc-900 rounded-lg overflow-hidden mb-6 relative">
                  {stream ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay={true}
                        muted={true}
                        playsInline={true}
                        controls={false}
                        width="100%"
                        height="100%"
                        className="w-full h-full object-cover mirror"
                        style={{ backgroundColor: '#000' }}
                        onCanPlay={() => {
                          console.log('Video can play');
                        }}
                        onPlaying={() => {
                          console.log('Video is playing');
                        }}
                        onWaiting={() => {
                          console.log('Video is waiting');
                        }}
                        onError={(e) => {
                          console.error('Video error:', e);
                        }}
                        onLoadStart={() => {
                          console.log('Video load start');
                        }}
                        onLoadedData={() => {
                          console.log('Video loaded data');
                        }}
                      />
                      {isRecording && (
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium">Recording...</span>
                        </div>
                      )}
                      {/* Debug info overlay */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        Stream: {stream ? 'Active' : 'None'}
                        {stream && ` | Tracks: ${stream.getTracks().length}`}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-zinc-400 text-sm">Click "Start Camera" to begin</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center space-x-4">
                  {!stream ? (
                    <button
                      onClick={startCamera}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Start Camera</span>
                    </button>
                  ) : (
                    <div className="flex space-x-4">
                      {!isRecording ? (
                        <>
                          <button
                            onClick={startRecording}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                          >
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <span>Start Recording</span>
                          </button>
                          <button
                            onClick={stopCamera}
                            className="px-6 py-3 bg-zinc-500 hover:bg-zinc-600 text-white rounded-lg font-medium transition-colors duration-200"
                          >
                            Stop Camera
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={stopRecording}
                          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-900 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                          <span>Stop Recording</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Recording Instructions */}
                {stream && !isRecording && (
                  <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-900 mb-1">Recording Tips</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Ensure good lighting on your hands and face</li>
                          <li>• Keep your hands clearly visible in the camera frame</li>
                          <li>• Sign at a natural pace for best accuracy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Recording Success State
              <div className="bg-white rounded-xl p-8 lg:p-12 text-center shadow-sm border border-zinc-200">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-emerald-600">Video Recorded Successfully!</p>
                    <p className="text-sm text-zinc-500">{uploadedVideo?.name}</p>
                    <button 
                      onClick={resetRecording}
                      className="mt-2 text-zinc-400 hover:text-zinc-600 text-sm underline"
                    >
                      Record another video
                    </button>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Video Preview (shown for both upload and recorded videos) */}
          {videoPreviewUrl && uploadedVideo && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
              <h3 className="text-lg font-semibold text-black mb-4">
                {activeTab === 'upload' ? 'Uploaded Video Preview' : 'Recorded Video Preview'}
              </h3>
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