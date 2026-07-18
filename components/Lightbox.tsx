'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * Fullscreen image lightbox with:
 * - Swipe left/right to navigate (mobile)
 * - Pinch-to-zoom (mobile)
 * - Double-tap to zoom (mobile)
 * - Keyboard navigation (desktop)
 * - Zoom in/out buttons
 * - Proper fullscreen on all devices
 */
export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Touch state
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef<number>(0);
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const translateStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    if (zoom > 1) return; // Don't navigate when zoomed
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  }, [images.length, zoom]);

  const goPrev = useCallback(() => {
    if (zoom > 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length, zoom]);

  const resetZoom = () => {
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z * 1.5, 4));
  };

  const handleZoomOut = () => {
    const newZoom = zoom / 1.5;
    if (newZoom <= 1) {
      resetZoom();
    } else {
      setZoom(newZoom);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, onClose]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      const dist = getTouchDistance(e.touches);
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = zoom;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };

      // Double-tap detection
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        // Double tap — toggle zoom
        if (zoom > 1) {
          resetZoom();
        } else {
          setZoom(2.5);
        }
        lastTapRef.current = 0;
        touchStartRef.current = null;
        return;
      }
      lastTapRef.current = now;

      // If zoomed, allow panning
      if (zoom > 1) {
        isDraggingRef.current = true;
        dragStartRef.current = { x: touch.clientX, y: touch.clientY };
        translateStartRef.current = { ...translate };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      // Pinch zoom
      const dist = getTouchDistance(e.touches);
      const scale = dist / pinchStartDistRef.current;
      const newZoom = Math.min(Math.max(pinchStartZoomRef.current * scale, 1), 4);
      setZoom(newZoom);
      if (newZoom <= 1) {
        setTranslate({ x: 0, y: 0 });
      }
      e.preventDefault();
    } else if (e.touches.length === 1 && isDraggingRef.current && zoom > 1) {
      // Pan while zoomed
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      setTranslate({
        x: translateStartRef.current.x + dx,
        y: translateStartRef.current.y + dy,
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    pinchStartDistRef.current = null;

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }

    if (!touchStartRef.current) return;
    if (zoom > 1) return; // Don't swipe when zoomed

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const elapsed = Date.now() - touchStartRef.current.time;

    // Horizontal swipe detection
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && elapsed < 400) {
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex flex-col select-none"
      style={{ height: '100dvh' }}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen image viewer"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3 sm:px-5 py-3 bg-gradient-to-b from-black/70 to-transparent"
        style={{
          paddingTop: 'calc(0.75rem + env(safe-area-inset-top))',
          paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
          paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
        }}
      >
        <span className="text-white/60 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 text-white/60 hover:text-white active:text-white transition-colors touch-manipulation"
            aria-label="Zoom out"
            disabled={zoom <= 1}
          >
            <ZoomOut size={20} className={zoom <= 1 ? 'opacity-30' : ''} />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 text-white/60 hover:text-white active:text-white transition-colors touch-manipulation"
            aria-label="Zoom in"
            disabled={zoom >= 4}
          >
            <ZoomIn size={20} className={zoom >= 4 ? 'opacity-30' : ''} />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white active:text-white transition-colors touch-manipulation"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 min-h-0 flex items-center justify-center overflow-hidden relative"
        style={{
          paddingTop: 'calc(4rem + env(safe-area-inset-top))',
          paddingRight: 'max(0.5rem, env(safe-area-inset-right))',
          paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
          paddingLeft: 'max(0.5rem, env(safe-area-inset-left))',
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom}) translate(${translate.x / zoom}px, ${translate.y / zoom}px)`,
            width: '100%',
            height: '100%',
          }}
          draggable={false}
        />
        {/* Logo watermark — bottom right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none select-none z-10">
          <div className="bg-black/50 backdrop-blur-[3px] rounded-md p-1.5 sm:p-2">
            <img
              src="/images/logo.png"
              alt=""
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-75"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Navigation arrows (desktop & tablet) */}
      {images.length > 1 && zoom <= 1 && (
        <>
          <button
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 text-white/70 hover:text-white transition-all touch-manipulation"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 text-white/70 hover:text-white transition-all touch-manipulation"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Bottom hint (mobile) */}
      <div
        className="absolute bottom-4 inset-x-0 text-center pointer-events-none sm:hidden"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <span className="text-white/30 text-[11px] tracking-wide">
          Swipe to navigate · Double-tap to zoom
        </span>
      </div>
    </div>
  );
}

function getTouchDistance(touches: React.TouchList): number {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
