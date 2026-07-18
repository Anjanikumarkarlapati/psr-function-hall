'use client';

import { useState, lazy, Suspense } from 'react';
import Image from 'next/image';
import { CATEGORIES, ADVERTISEMENTS } from '@/lib/data';
import { GoldRule } from '@/components/GoldRule';
import { PsrWatermark } from '@/components/WatermarkImage';
import { VideoGallery } from '@/components/VideoGallery';
import { useTranslation } from '@/lib/i18n';

const Lightbox = lazy(() => import('@/components/Lightbox').then(m => ({ default: m.Lightbox })));

// Collect all unique images from all categories, excluding pamphlets
function getAllImages(): string[] {
  const seen = new Set<string>(ADVERTISEMENTS);
  const all: string[] = [];
  for (const cat of CATEGORIES) {
    for (const img of cat.images) {
      if (!seen.has(img)) {
        seen.add(img);
        all.push(img);
      }
    }
  }
  return all;
}

const QUOTES = [
  {
    en: 'Every celebration deserves a stage as grand as the love behind it.',
    te: 'ప్రతి వేడుక దాని వెనుక ఉన్న ప్రేమంత గొప్ప వేదికను అర్హిస్తుంది.',
  },
  {
    en: 'Where dreams meet elegance, memories are born.',
    te: 'కలలు సొగసును కలిసే చోట, జ్ఞాపకాలు పుడతాయి.',
  },
  {
    en: 'A perfect venue transforms moments into timeless treasures.',
    te: 'ఒక పరిపూర్ణ వేదిక క్షణాలను కాలాతీత నిధులుగా మారుస్తుంది.',
  },
  {
    en: 'The beauty of togetherness shines brightest in the right setting.',
    te: 'కలిసి ఉండటం యొక్క అందం సరైన వాతావరణంలో ప్రకాశవంతంగా మెరుస్తుంది.',
  },
  {
    en: 'Every flower, every light — placed with love for your special day.',
    te: 'ప్రతి పువ్వు, ప్రతి దీపం — మీ ప్రత్యేక రోజు కోసం ప్రేమతో అమర్చబడింది.',
  },
  {
    en: 'Celebrations are the poetry of life — let us write yours beautifully.',
    te: 'వేడుకలు జీవితపు కవిత్వం — మీది అందంగా రాయనివ్వండి.',
  },
  {
    en: 'In every decoration, there is a story waiting to unfold.',
    te: 'ప్రతి అలంకరణలో, విప్పుకోవడానికి ఎదురుచూస్తున్న ఒక కథ ఉంది.',
  },
  {
    en: 'Your joy is our purpose, your smile is our reward.',
    te: 'మీ ఆనందమే మా లక్ష్యం, మీ చిరునవ్వే మా బహుమానం.',
  },
];

export default function EventsPage() {
  const { t, locale } = useTranslation();
  const allImages = getAllImages();
  const allLightboxImages = [...allImages, ...ADVERTISEMENTS];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allLightboxImages.length);
    }
  };
  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allLightboxImages.length) % allLightboxImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="pt-16 pb-12 sm:py-20 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-14">
            <p className="text-gold text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4">
              {t.events.label}
            </p>
            <h1 className="text-[26px] sm:text-[40px] md:text-5xl text-cream font-bold mb-3 sm:mb-4 font-display leading-tight">
              {t.events.heading}
            </h1>
            <GoldRule />
            <p className="text-cream/40 text-[13px] sm:text-sm mt-3 sm:mt-4 max-w-md mx-auto leading-relaxed px-4 sm:px-0">
              {t.events.subtitle}
            </p>
          </div>

          {/* Gallery Grid */}
          {allImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-dark-card rounded-xl"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={img}
                    alt={`Gallery photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <PsrWatermark />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-cream/30 text-lg mb-2">{t.events.noPhotos}</p>
              <p className="text-cream/20 text-sm">{t.gallery.clickToUpload}</p>
            </div>
          )}

          {/* Advertisements Section */}
          {ADVERTISEMENTS.length > 0 && (
            <div className="mt-14 sm:mt-20">
              <div className="text-center mb-8 sm:mb-10">
                <div className="w-10 h-[1px] bg-gold/40 mx-auto mb-4" />
                <p className="text-gold text-[10px] tracking-[0.45em] uppercase mb-2">
                  {locale === 'te' ? 'ప్రకటనలు' : 'Advertisements'}
                </p>
                <h2 className="text-xl sm:text-2xl text-cream/80 font-light font-display">
                  {locale === 'te' ? 'మా సేవలు & ప్యాకేజీలు' : 'Our Services & Packages'}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {ADVERTISEMENTS.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden border border-gold/15 hover:border-gold/30 transition-all cursor-pointer rounded-xl"
                    onClick={() => openLightbox(allImages.length + idx)}
                  >
                    <Image
                      src={img}
                      alt={`Advertisement ${idx + 1}`}
                      width={600}
                      height={800}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <PsrWatermark />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Gallery Section */}
          <div className="mt-14 sm:mt-20">
            <VideoGallery />
          </div>

          {/* Quotes Section */}
          <div className="mt-16 sm:mt-24">
            <div className="text-center mb-10">
              <div className="w-10 h-[1px] bg-gold/40 mx-auto mb-4" />
              <p className="text-gold text-[10px] tracking-[0.45em] uppercase">
                {locale === 'te' ? 'ప్రేరణ' : 'Inspiration'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
              {QUOTES.map((q, i) => (
                <div
                  key={i}
                  className="border border-gold/10 bg-dark-surface/50 p-5 sm:p-8 text-center hover:border-gold/25 transition-all"
                >
                  <div className="text-gold/30 text-2xl sm:text-3xl font-display mb-2 sm:mb-3">&ldquo;</div>
                  <p className="text-cream/70 text-[13px] sm:text-[15px] leading-relaxed italic mb-3 sm:mb-4 font-display">
                    {locale === 'te' ? q.te : q.en}
                  </p>
                  <p className="text-cream/25 text-[10px] sm:text-xs leading-relaxed">
                    {locale === 'te' ? q.en : q.te}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            images={allLightboxImages}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        </Suspense>
      )}
    </div>
  );
}
