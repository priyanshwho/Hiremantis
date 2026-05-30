'use client';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayClassName?: string;
}

interface HlsEvent {
  type: string;
  data?: Record<string, unknown>;
}

interface HlsErrorData {
  type: string;
  details: string;
  fatal: boolean;
}

interface HlsPlayer {
  loadSource(url: string): void;
  attachMedia(video: HTMLVideoElement): void;
  on(event: string, callback: (event: HlsEvent, data?: HlsErrorData) => void): void;
  destroy(): void;
}

declare global {
  interface Window {
    Hls: {
      isSupported(): boolean;
      new (config?: Record<string, unknown>): {
        loadSource(url: string): void;
        attachMedia(video: HTMLVideoElement): void;
        on(event: string, callback: (event: HlsEvent, data?: HlsErrorData) => void): void;
        destroy(): void;
      };
    };
  }
}

export function VideoBackground({
  src,
  className = '',
  overlayClassName = 'bg-black/40 dark:bg-black/50',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const videoEl = video;

    let hlsInstance: HlsPlayer | null = null;
    let isDisposed = false;

    const initializeVideo = async () => {
      try {
        // Try native HLS support first (Safari/iOS)
        if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
          videoEl.src = src;
          videoEl.play().catch((err) => console.log('Play error:', err));
          return;
        }

        // Load HLS.js for other browsers
        if (typeof window === 'undefined') return;

        if (window.Hls === undefined) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
          script.async = true;
          script.onload = () => {
            if (!isDisposed) setupHls();
          };
          script.onerror = () => console.error('Failed to load HLS.js');
          document.head.appendChild(script);
        } else {
          setupHls();
        }

        function setupHls() {
          if (window.Hls && window.Hls.isSupported()) {
            hlsInstance = new window.Hls({
              debug: false,
              enableWorker: true,
              lowLatencyMode: false,
            });

            hlsInstance.loadSource(src);
            hlsInstance.attachMedia(videoEl);

            hlsInstance.on('hlsManifestParsed', () => {
              if (isDisposed) return;
              console.log('HLS manifest parsed, starting playback');
              videoEl.play().catch((err) => console.log('Play error:', err));
            });

            hlsInstance.on('hlsError', (_event: HlsEvent, data?: HlsErrorData) => {
              console.error('HLS error:', data);
            });
          } else if (videoEl.canPlayType('video/mp4')) {
            // Fallback to direct video URL
            videoEl.src = src;
            videoEl.play().catch((err) => console.log('Play error:', err));
          }
        }
      } catch (error) {
        console.error('Error initializing video:', error);
      }
    };

    initializeVideo();

    return () => {
      isDisposed = true;
      hlsInstance?.destroy();
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 z-0 h-full w-full object-cover ${className}`}
      />
      <div className={`absolute inset-0 z-[1] ${overlayClassName}`}></div>
    </>
  );
}
