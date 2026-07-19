'use client';

import { useState, lazy, Suspense } from 'react';
import Image from 'next/image';
import { PsrWatermark } from '@/components/WatermarkImage';
import { useTranslation } from '@/lib/i18n';

const Lightbox = lazy(() => import('@/components/Lightbox').then(m => ({ default: m.Lightbox })));

interface GalleryUploadProps {
  categoryName: string;
  initialImages: string[];
}

export function GalleryUpload({ categoryName, initialImages }: GalleryUploadProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  if (initialImages.length === 0) return null;

  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-6 sm:mb-8">
        <p className="text-gold text-[10px] tracking-[0.38em] uppercase mb-1">
          {t.gallery.decorationGallery}
        </p>
        <h2 className="text-xl sm:text-2xl text-cream font-light font-display">
          {initialImages.length} {initialImages.length !== 1 ? t.gallery.photosCount : t.gallery.photoCount}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {initialImages.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            onClick={() => setLightboxIndex(idx)}
          >
            <Image
              src={img}
              alt={`${categoryName} decoration ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <PsrWatermark />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            images={initialImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        </Suspense>
      )}
    </div>
  );
}
