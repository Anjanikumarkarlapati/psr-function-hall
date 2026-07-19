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
    <div className="fixed bottom-[calc(18px+56px+12px)] right-[18px] z-[9999] pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:left-6 sm:right-auto sm:pb-0">
      <button
        type="button"
        onClick={() => openPhoneDialer(ADDRESS.phone1)}
        aria-label={label}
        title={label}
        className="group flex h-14 w-14 touch-manipulation items-center justify-center rounded-full border-0 bg-gold-light text-dark shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-[250ms] ease-[ease] hover:scale-[1.08] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:border sm:border-gold-bright/50 sm:shadow-[0_12px_30px_rgba(40,29,8,0.34),inset_0_1px_0_rgba(255,255,255,0.28)] sm:hover:scale-100 sm:hover:bg-gold-bright sm:active:-translate-y-px sm:active:scale-[0.98]"
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
