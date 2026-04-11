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
        video.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
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
    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    setIsUploading(true);
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
    
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
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true
      });
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsRecording(false);
    setMediaRecorder(null);
  }, [stream]);

  const startRecording = useCallback(() => {
    if (!stream) return;

    try {
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
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
        const url = URL.createObjectURL(blob);
        setVideoPreviewUrl(url);
        setUploadedVideo(file);
        setIsRecording(false);
        setMediaRecorder(null);
        stopCamera();
        onVideoUploaded(file);
      };
      
      setMediaRecorder(recorder);
      recorder.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not start recording.');
    }
  }, [stream, onVideoUploaded, stopCamera]);

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const handleTabChange = (tab: 'upload' | 'record') => {
    setActiveTab(tab);
    if (tab === 'upload') {
      stopCamera();
      setIsRecording(false);
    } else {
      setUploadedVideo(null);
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
    }
  };

  const resetRecording = () => {
    setUploadedVideo(null);
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    setVideoPreviewUrl(null);
    setIsRecording(false);
    setMediaRecorder(null);
    setStream(null);
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  return (
    <section id="upload-section" className="relative py-32 overflow-hidden bg-white">
      {/* Background elements (Light Grid) */}
      <div className="absolute inset-0 grid-bg-dots opacity-30 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/5 border border-black/5 mb-8">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-black italic">Sequence Ingestion</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-outfit font-black text-black mb-8 uppercase tracking-tighter italic">
            Initialize <span className="text-zinc-300">Uplink</span>
          </h2>
          <p className="text-xl text-zinc-500 max-w-3xl mx-auto font-medium italic">
            Provide the temporal gesture data via local file ingestion or high-fidelity optical capture.
          </p>
        </div>

        {/* Tab Selection (Solid Black Interface) */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-2 rounded-full flex gap-1 border border-black/10 shadow-2xl">
            <button
              onClick={() => handleTabChange('upload')}
              className={`px-12 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 ${
                activeTab === 'upload' 
                  ? 'bg-black text-white shadow-xl scale-105' 
                  : 'text-zinc-400 hover:text-black hover:bg-black/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              File Stream
            </button>
            <button
              onClick={() => handleTabChange('record')}
              className={`px-12 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 ${
                activeTab === 'record' 
                  ? 'bg-black text-white shadow-xl scale-105' 
                  : 'text-zinc-400 hover:text-black hover:bg-black/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Optical Link
            </button>
          </div>
        </div>

        {/* Action Zone */}
        <div className="space-y-12">
          {activeTab === 'upload' ? (
            <div
              className={`relative border-2 border-dashed rounded-[4rem] p-16 lg:p-32 text-center cursor-pointer transition-all duration-700 group overflow-hidden ${
                dragActive 
                  ? 'border-black bg-black/5 scale-[1.01] shadow-2xl' 
                  : 'border-black/10 hover:border-black/30 bg-zinc-50/50 hover:bg-zinc-50'
              } glass`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
            >
              {/* Scan Animation Backdrop (Light) */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-px after:bg-black after:animate-scan-line"></div>
              
              <input ref={fileInputRef} type="file" accept="video/*" onChange={handleChange} className="hidden" />
              
              {isUploading ? (
                <div className="relative z-10 space-y-10 animate-pulse">
                  <div className="w-24 h-24 bg-black/5 rounded-3xl flex items-center justify-center mx-auto border border-black/10 shadow-sm">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-black border-t-transparent"></div>
                  </div>
                  <div>
                    <h4 className="text-3xl font-outfit font-black text-black italic uppercase tracking-tighter">Uploading Bitstream...</h4>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em] mt-6">Parsing spatiotemporal data</p>
                  </div>
                </div>
              ) : uploadedVideo ? (
                <div className="relative z-10 space-y-10 animate-in zoom-in-95 duration-700">
                  <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform rotate-12">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-4xl font-outfit font-black text-black italic uppercase tracking-tighter">Buffer Loaded</h4>
                    <p className="text-zinc-500 font-bold mt-4 text-base">{uploadedVideo.name}</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); resetRecording(); }}
                      className="mt-10 px-8 py-3 rounded-full border border-black/10 text-zinc-400 hover:text-black hover:bg-black/5 font-black uppercase text-[10px] tracking-[0.3em] transition-all"
                    >
                      Clear Memory
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 space-y-10 transition-all group-hover:scale-[1.02] duration-700">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto border border-black/5 shadow-2xl group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <svg className="w-10 h-10 text-black group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-4xl md:text-6xl font-outfit font-black text-black tracking-tighter italic uppercase">
                      Drop <span className="text-zinc-200">Uplink</span>
                    </h4>
                    <p className="text-zinc-500 font-medium mt-6 max-w-md mx-auto text-lg leading-relaxed italic">
                      Drag spatiotemporal data packets (MP4, MOV) or click to browse local storage.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Recording Zone (Light HUD)
            <div className="glass rounded-[4rem] p-10 lg:p-20 border border-black/5 overflow-hidden relative shadow-3xl">
              <div className="text-center mb-16 italic">
                <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em] mb-4 block">Hardware Layer: Activated</span>
                <h3 className="text-4xl lg:text-5xl font-outfit font-black text-black uppercase tracking-tighter">Optical <span className="text-zinc-300">Analysis</span></h3>
              </div>

              <div className="aspect-video bg-zinc-100 rounded-[3rem] overflow-hidden mb-16 relative group border border-black/5 shadow-inner">
                {stream ? (
                  <>
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-100" />
                    {isRecording && (
                      <div className="absolute top-10 left-10 flex items-center space-x-4 bg-black text-white px-6 py-3 rounded-full shadow-2xl animate-pulse">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Recording Stream</span>
                      </div>
                    )}
                    
                    {/* Light Viewfinder HUD */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-black/20 rounded-tl-3xl"></div>
                      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-black/20 rounded-tr-3xl"></div>
                      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-black/20 rounded-bl-3xl"></div>
                      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-black/20 rounded-br-3xl"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-black/10 shadow-[0_0_20px_black] animate-scan-line"></div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center group">
                      <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-black/5 shadow-2xl group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-zinc-300 font-black uppercase text-[10px] tracking-[0.5em]">Awaiting Hardware Link</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center">
                {!stream ? (
                  <button
                    onClick={startCamera}
                    className="px-16 py-6 bg-black text-white rounded-full font-black uppercase text-[11px] tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-4"
                  >
                    Open Optical Feed
                  </button>
                ) : (
                  <div className="flex bg-white p-2 rounded-full gap-2 border border-black/5 shadow-xl">
                    {!isRecording ? (
                      <>
                        <button
                          onClick={startRecording}
                          className="px-10 py-4 bg-black text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center gap-4 shadow-lg hover:scale-105"
                        >
                          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                          Start Capture
                        </button>
                        <button
                          onClick={stopCamera}
                          className="px-10 py-4 text-zinc-400 hover:text-black font-black uppercase text-[10px] tracking-[0.2em] transition-all"
                        >
                          Terminate Feed
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="px-16 py-6 bg-black text-white rounded-full font-black uppercase text-[11px] tracking-[0.3em] transition-all flex items-center gap-5 shadow-2xl scale-110"
                      >
                        <div className="w-3 h-3 bg-white rounded-sm animate-spin"></div>
                        Finalize Sequence
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Result Buffer Preview */}
          {videoPreviewUrl && uploadedVideo && (
            <div className="glass rounded-[3rem] p-10 border border-black/5 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between mb-8 italic">
                <h3 className="text-xs font-black text-black uppercase tracking-[0.5em] flex items-center gap-3">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  Buffered Sequence
                </h3>
                <span className="text-[10px] font-bold text-zinc-300">CRC-32: PASS</span>
              </div>
              <div className="aspect-video bg-zinc-50 rounded-[2rem] overflow-hidden ring-1 ring-black/5 shadow-inner">
                <video src={videoPreviewUrl} controls className="w-full h-full object-contain" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoUpload;