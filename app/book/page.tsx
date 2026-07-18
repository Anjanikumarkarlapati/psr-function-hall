'use client';

import dynamic from 'next/dynamic';
import { GoldRule } from '@/components/GoldRule';
import { useTranslation } from '@/lib/i18n';

const BookingForm = dynamic(
  () =>
    import('@/components/BookingForm').then(({ BookingForm }) => BookingForm),
  {
    loading: () => (
      <div className="h-[500px] animate-pulse border border-gold/12 bg-dark-surface" />
    ),
  }
);

export default function BookPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dark">
      <div className="pt-20 pb-12 sm:py-24 px-3 sm:px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-7 sm:mb-12">
            <p className="text-gold text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] uppercase mb-4 sm:mb-5">
              {t.book.label}
            </p>
            <h1 className="text-[26px] sm:text-[42px] md:text-5xl text-cream font-bold mb-3 sm:mb-4 font-display leading-tight">
              {t.book.heading}
            </h1>
            <GoldRule />
            <p className="text-cream/35 text-[13px] sm:text-sm leading-relaxed max-w-sm mx-auto mt-4 sm:mt-5 px-4 sm:px-0">
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
