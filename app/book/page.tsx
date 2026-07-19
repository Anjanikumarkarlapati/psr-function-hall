'use client';

import Image from 'next/image';
import { GoldRule } from '@/components/GoldRule';
import { BookingForm } from '@/components/BookingForm';
import { useTranslation } from '@/lib/i18n';

export default function BookPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hall background — same fixed layer as homepage */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/hall-bg.png"
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>
      <div className="fixed inset-0 -z-10 bg-black/80" />

      <div className="relative pt-20 pb-12 sm:py-24 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-7 sm:mb-12">
            <p className="text-gold-light text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] uppercase mb-4 sm:mb-5">
              {t.book.label}
            </p>
            <h1 className="text-[26px] sm:text-[42px] md:text-5xl text-cream font-light mb-3 sm:mb-4 font-display leading-tight">
              {t.book.heading}
            </h1>
            <GoldRule />
            <p className="text-cream/75 text-[13px] sm:text-sm leading-relaxed max-w-sm mx-auto mt-4 sm:mt-5 px-4 sm:px-0">
              {t.book.description}
            </p>
          </div>

          {/* Booking Form (client component) */}
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
