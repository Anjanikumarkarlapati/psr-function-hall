'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/data';
import { GalleryUpload } from '@/components/GalleryUpload';
import { WatermarkImage } from '@/components/WatermarkImage';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { useTranslation } from '@/lib/i18n';

interface CategoryDetailClientProps {
  category: Category;
  others: Category[];
  whatsappHref: string;
}

export function CategoryDetailClient({
  category,
  others,
  whatsappHref,
}: CategoryDetailClientProps) {
  const { t } = useTranslation();
  const catTranslation = t.events.categories[category.id];

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero */}
      <div className="relative h-[55vh] sm:h-[70vh] min-h-[360px] sm:min-h-[420px] flex flex-col justify-end overflow-hidden">
        {category.cover ? (
          <WatermarkImage
            src={category.cover}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover"
            wrapperClassName="absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 bg-dark-card" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-black/50 to-black/20" />

        {/* Breadcrumb — positioned below navbar */}
        <div className="absolute top-[68px] sm:top-[76px] left-0 right-0 px-4 sm:px-6 md:px-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-cream/45 hover:text-gold active:text-gold text-xs tracking-wide transition-colors py-2 touch-manipulation"
          >
            <ArrowLeft size={13} /> {t.events.backToEvents}
          </Link>
        </div>

        {/* Title */}
        <div className="relative px-4 sm:px-6 md:px-10 pb-6 sm:pb-14 max-w-4xl">
          <div className="text-gold text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.45em] uppercase mb-2 sm:mb-3">
            {catTranslation?.name || category.name}
          </div>
          <h1 className="text-[22px] sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-2 sm:mb-4 font-display">
            {catTranslation?.title || category.title}
          </h1>
          <div className="flex items-start gap-2 sm:gap-4">
            <div className="h-[1px] w-6 sm:w-10 bg-gold/50 mt-2 shrink-0" />
            <p className="text-white/50 text-[11px] sm:text-sm italic leading-relaxed">
              &ldquo;{catTranslation?.quote || category.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-16">
        {/* Subtitle + CTA */}
        <div className="grid md:grid-cols-[1fr_auto] gap-5 sm:gap-8 items-start mb-8 sm:mb-16 pb-8 sm:pb-16 border-b border-gold/10">
          <div>
            <p className="text-gold text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.38em] uppercase mb-2 sm:mb-3">
              {t.events.aboutEvent}
            </p>
            <p className="text-cream/60 text-[13px] sm:text-[16px] leading-relaxed max-w-xl">
              {catTranslation?.subtitle || category.subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-4 sm:py-3.5 bg-gold text-dark font-bold text-[11px] sm:text-xs tracking-widest uppercase hover:bg-gold-bright active:bg-gold-bright transition-colors whitespace-nowrap touch-manipulation"
            >
              {t.events.bookThisEvent}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-4 sm:py-3.5 bg-[#25D366] text-white font-bold text-[11px] sm:text-xs tracking-widest uppercase hover:bg-[#20bd5a] active:bg-[#19a34d] transition-colors touch-manipulation"
            >
              <WhatsAppIcon size={14} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Gallery (client component) */}
        <GalleryUpload
          categoryName={catTranslation?.name || category.name}
          initialImages={category.images}
        />

        {/* Other Events */}
        {others.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h3 className="text-cream/60 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                {t.events.otherEvents}
              </h3>
              <Link
                href="/events"
                className="text-gold text-xs hover:underline flex items-center gap-1 py-1 touch-manipulation"
              >
                {t.events.viewAll} <ArrowRight size={11} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              {others.map((cat) => {
                const otherTranslation = t.events.categories[cat.id];
                return (
                  <Link
                    key={cat.id}
                    href={`/events/${cat.id}`}
                    className="group relative h-32 sm:h-36 overflow-hidden text-left bg-dark-card border border-gold/10 hover:border-gold/30 active:border-gold/40 transition-all touch-manipulation"
                  >
                    {cat.cover && (
                      <WatermarkImage
                        src={cat.cover}
                        alt={cat.name}
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        wrapperClassName="absolute inset-0"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
                    <div className="absolute bottom-0 left-0 p-3">
                      <div className="text-white/55 text-[10px] sm:text-[11px] tracking-wide leading-snug group-hover:text-gold transition-colors">
                        {otherTranslation?.name || cat.name}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
