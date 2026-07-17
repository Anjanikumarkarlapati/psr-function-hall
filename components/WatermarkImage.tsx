'use client';

import React from 'react';

interface WatermarkImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Additional classes for the wrapper container */
  wrapperClassName?: string;
}

/**
 * Standalone PSR watermark badge — place inside any `relative` container.
 */
export function PsrWatermark() {
  return (
    <div className="absolute bottom-2 right-2 pointer-events-none select-none z-10">
      <span className="inline-block px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] text-white/70 bg-black/40 backdrop-blur-[2px] rounded-sm uppercase">
        PSR
      </span>
    </div>
  );
}

/**
 * Image component with a professional "PSR" watermark overlay in the bottom-right corner.
 * Wraps a standard <img> element and adds a CSS-based watermark.
 */
export function WatermarkImage({
  wrapperClassName = '',
  className = '',
  alt,
  ...imgProps
}: WatermarkImageProps) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <img alt={alt} className={className} {...imgProps} />
      <PsrWatermark />
    </div>
  );
}
