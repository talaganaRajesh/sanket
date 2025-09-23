'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  transcription?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, transcription }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Waveform bars for animation
  const waveformBars = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Generated Audio
          </h2>
          <p className="text-lg text-zinc-600">
            Your sign language video has been converted to English audio
          </p>
        </div>

        {/* Transcription Display */}
        {transcription && (
          <div className="bg-zinc-50 rounded-xl p-6 mb-8 border border-zinc-200">
            <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Transcription
            </h3>
            <p className="text-zinc-700 leading-relaxed text-lg">
              &ldquo;{transcription}&rdquo;
            </p>
          </div>
        )}

        {/* Audio Player */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200">
          <audio ref={audioRef} src={audioSrc} preload="metadata" />
          
          {/* Waveform Visualization */}
          <div className="flex items-center justify-center space-x-1 mb-8">
            {waveformBars.map((bar) => (
              <div
                key={bar}
                className={`waveform-bar bg-emerald-500 w-2 rounded-full ${
                  isPlaying ? 'h-8' : 'h-4'
                } transition-all duration-200`}
                style={{
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Play/Pause Button */}
            <div className="flex justify-center">
              <button
                onClick={togglePlayPause}
                className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10B981 0%, #10B981 ${
                      duration ? (currentTime / duration) * 100 : 0
                    }%, #e4e4e7 ${
                      duration ? (currentTime / duration) * 100 : 0
                    }%, #e4e4e7 100%)`,
                  }}
                />
              </div>
              
              {/* Time Display */}
              <div className="flex justify-between text-sm text-zinc-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Additional Controls */}
            <div className="flex justify-center space-x-4">
              <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              
              <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              
              <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 text-center">
          <a
            href={audioSrc}
            download="converted-audio.mp3"
            className="inline-flex items-center space-x-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Audio</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;