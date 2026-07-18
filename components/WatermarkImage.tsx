'use client';

import Image, { type ImageProps } from 'next/image';

interface WatermarkImageProps extends Omit<ImageProps, 'fill'> {
  /** Additional classes for the wrapper container. */
  wrapperClassName?: string;
}

/**
 * Standalone logo watermark — place inside any `relative` container.
 * Uses the current vector brand mark, so the overlay stays sharp without
 * downloading another raster logo on every gallery page.
 */
export function PsrWatermark() {
  return (
    <div className="absolute bottom-2 right-2 pointer-events-none select-none z-10">
      <div className="rounded-sm bg-black/45 p-1 backdrop-blur-[2px]">
        <Image
          src="/images/brand-mark.svg"
          alt=""
          width={32}
          height={32}
          className="h-6 w-6 object-contain opacity-80 sm:h-8 sm:w-8"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/**
 * Responsive Next.js image with the PSR watermark overlaid. `fill` keeps this
 * compatible with full-bleed heroes and card thumbnails while allowing Next.js
 * to serve right-sized AVIF/WebP variants.
 */
export function WatermarkImage({
  wrapperClassName = '',
  className = '',
  alt,
  sizes = '100vw',
  ...imageProps
}: WatermarkImageProps) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <Image
        alt={alt}
        className={className}
        fill
        sizes={sizes}
        {...imageProps}
      />
      <PsrWatermark />
    </div>
  );
}
