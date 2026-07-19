'use client';

import { PhoneCall } from 'lucide-react';
import { ADDRESS } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';
import { openPhoneDialer } from '@/lib/obfuscate';

/** Opens the device's native dialer with the primary venue number prefilled. */
export function CallFloat() {
  const { locale } = useTranslation();
  const label = locale === 'te' ? 'బ్యాంక్వెట్ హాల్‌కు కాల్ చేయండి' : 'Call the banquet hall';

  return (
    <div className="fixed bottom-0 left-4 z-50 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6 sm:left-6 sm:pb-0">
      <button
        type="button"
        onClick={() => openPhoneDialer(ADDRESS.phone1)}
        aria-label={label}
        title={label}
        className="group flex h-14 w-14 touch-manipulation items-center justify-center rounded-full border border-gold-bright/50 bg-gold-light text-dark shadow-[0_12px_30px_rgba(40,29,8,0.34),inset_0_1px_0_rgba(255,255,255,0.28)] transition-[transform,background-color] duration-200 hover:bg-gold-bright active:-translate-y-px active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      >
        <PhoneCall
          size={25}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:scale-105"
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}
