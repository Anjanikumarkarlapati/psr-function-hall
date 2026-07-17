'use client';

import { GoldRule } from '@/components/GoldRule';
import { BookingForm } from '@/components/BookingForm';
import { useTranslation } from '@/lib/i18n';

export default function BookPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-dark">
      <div className="py-16 sm:py-24 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5">
              {t.book.label}
            </p>
            <h1 className="text-[32px] sm:text-[42px] md:text-5xl text-cream font-bold mb-4 font-display">
              {t.book.heading}
            </h1>
            <GoldRule />
            <p className="text-cream/35 text-sm leading-relaxed max-w-sm mx-auto mt-5">
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
