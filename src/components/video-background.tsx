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

    const initializeVideo = async () => {
      try {
        // Try native HLS support first (Safari/iOS)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
          video.play().catch((err) => console.log('Play error:', err));
          return;
        }

        // Load HLS.js for other browsers
        if (typeof window === 'undefined') return;

        if (window.Hls === undefined) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
          script.async = true;
          script.onload = () => setupHls();
          script.onerror = () => console.error('Failed to load HLS.js');
          document.head.appendChild(script);
        } else {
          setupHls();
        }

        function setupHls() {
          if (window.Hls && window.Hls.isSupported()) {
            const hls = new window.Hls({
              debug: false,
              enableWorker: true,
              lowLatencyMode: false,
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on('hlsManifestParsed', () => {
              console.log('HLS manifest parsed, starting playback');
              video.play().catch((err) => console.log('Play error:', err));
            });

            hls.on('hlsError', (_event: HlsEvent, data: HlsErrorData) => {
              console.error('HLS error:', data);
            });
          } else if (video.canPlayType('video/mp4')) {
            // Fallback to direct video URL
            video.src = src;
            video.play().catch((err) => console.log('Play error:', err));
          }
        }
      } catch (error) {
        console.error('Error initializing video:', error);
      }
    };

    initializeVideo();

    return () => {
      // Cleanup if needed
      video.pause();
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className={`absolute inset-0 z-0 h-full w-full object-cover ${className}`}
      />
      <div className={`absolute inset-0 z-1 ${overlayClassName}`}></div>
    </>
  );
}
