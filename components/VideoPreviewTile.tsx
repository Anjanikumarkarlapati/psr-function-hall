'use client';

import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { glass } from '@/styles/glass';

export interface PreviewVideo {
  id: number;
  src: string;
  label: string;
}

interface VideoPreviewTileProps {
  video: PreviewVideo;
  onPlay: (src: string) => void;
  className?: string;
}

/**
 * Video preview tile that:
 * - Always renders the <video> element so the browser can preload metadata/first frame
 * - Forces the browser to actually decode and paint that first frame (see the
 *   loadeddata/seek workaround below) so every tile shows a real thumbnail,
 *   not just the first video on the page
 * - Plays the video on mouse hover (desktop) and reveals it with opacity
 * - Touch/keyboard users go straight to the full-screen player
 */
export function VideoPreviewTile({
  video,
  onPlay,
  className = 'h-[180px] sm:h-[240px]',
}: VideoPreviewTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Chromium/Safari do not paint a visible frame for `preload="metadata"`
  // videos until playback starts or the element is explicitly seeked — in
  // practice only the first <video> on the page tends to get an automatic
  // frame. Forcing a tiny seek once data is available makes every tile show
  // a real thumbnail. The moov atom sits before mdat in these files, so the
  // seek only pulls a small byte range near the start, not the whole file.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleLoadedData = () => {
      if (el.currentTime === 0) {
        try {
          el.currentTime = 0.05;
        } catch {
          // Some browsers throw if the media isn't seekable yet — ignored,
          // frameReady still flips so the placeholder fades regardless.
        }
      }
      setFrameReady(true);
    };

    el.addEventListener('loadeddata', handleLoadedData);
    return () => el.removeEventListener('loadeddata', handleLoadedData);
  }, []);

  // Play/pause the video based on hover state
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isHovered) {
      // Seek to start each time so the preview always begins fresh
      el.currentTime = 0;
      el.play().catch(() => {
        // Autoplay blocked — silent fail, tile still shows the static frame.
      });
    } else {
      el.pause();
    }
  }, [isHovered]);

  return (
    <button
      type="button"
      className={`group relative w-full overflow-hidden rounded-xl text-left touch-manipulation active:scale-[0.98] transition-transform ${className}`}
      style={glass.dark as React.CSSProperties}
      onClick={() => {
        setIsHovered(false);
        onPlay(video.src);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setIsHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setIsHovered(false);
      }}
      onPointerCancel={() => setIsHovered(false)}
      aria-label={`Play ${video.label}`}
    >
      {/* Video is always mounted so the browser preloads metadata + first frame */}
      <video
        ref={videoRef}
        src={video.src}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isHovered ? 'opacity-80' : frameReady ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Dark placeholder shown only until the first real frame has decoded */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-dark-surface to-dark-card transition-opacity duration-300 ${
          frameReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold/30 sm:h-14 sm:w-14">
          <Play size={20} className="ml-0.5 text-gold sm:ml-1" fill="currentColor" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <span
          className="inline-block rounded-md px-2.5 py-1 text-[9px] uppercase tracking-[0.35em] text-gold"
          style={glass.chip as React.CSSProperties}
        >
          {video.label}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-gold/0 transition-colors duration-300 group-hover:border-gold/25" />
    </button>
  );
}
