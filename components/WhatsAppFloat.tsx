'use client';

import { useEffect, useRef, useState } from 'react';
import { WHATSAPP_NUMBERS } from '@/lib/data';
import { decodeNumber } from '@/lib/obfuscate';
import { useTranslation } from '@/lib/i18n';
import { WhatsAppIcon } from './WhatsAppIcon';

const MENU_ID = 'whatsapp-contact-menu';

export function WhatsAppFloat() {
  const { locale } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstContactRef = useRef<HTMLAnchorElement>(null);

  const getMessage = () =>
    locale === 'te'
      ? 'నమస్కారం, పసుమర్తి బ్యాంక్వెట్ హాల్ బుకింగ్ గురించి విచారించాలనుకుంటున్నాను.'
      : 'Hello, I would like to enquire about booking Pasumarthy Banquet Hall.';

  const getUrl = (index: number) => {
    const number = decodeNumber(WHATSAPP_NUMBERS[index].number);
    return `https://wa.me/${number}?text=${encodeURIComponent(getMessage())}`;
  };

  useEffect(() => {
    if (!showMenu) return;

    const focusFrame = window.requestAnimationFrame(() => {
      firstContactRef.current?.focus();
    });

    const handleOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handleOutsidePress);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('pointerdown', handleOutsidePress);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMenu]);

  const openLabel = locale === 'te' ? 'WhatsAppలో సంప్రదించండి' : 'Contact us on WhatsApp';
  const closeLabel = locale === 'te' ? 'WhatsApp ఎంపికలను మూసివేయండి' : 'Close WhatsApp options';

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[18px] right-[18px] z-[9999] flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:right-6 sm:pb-0"
    >
      {showMenu && (
        <div
          id={MENU_ID}
          role="menu"
          aria-label={locale === 'te' ? 'WhatsApp సంప్రదింపు ఎంపికలు' : 'WhatsApp contact options'}
          className="w-[min(20rem,calc(100vw-1.5rem))] max-h-[min(70dvh,28rem)] origin-bottom-right space-y-2 overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-dark-surface/95 p-3.5 text-cream shadow-[0_18px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:w-[19rem] sm:p-4"
        >
          <div className="flex items-center gap-3 border-b border-white/[0.08] px-1 pb-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#128C4A] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
              <WhatsAppIcon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-cream">
                {locale === 'te' ? 'WhatsApp బుకింగ్' : 'WhatsApp booking'}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-cream/50">
                {locale === 'te' ? 'సంప్రదింపును ఎంచుకోండి' : 'Choose a booking contact'}
              </p>
            </div>
          </div>

          {WHATSAPP_NUMBERS.map((_, index) => (
            <a
              key={index}
              ref={index === 0 ? firstContactRef : undefined}
              href={getUrl(index)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setShowMenu(false)}
              className="flex min-h-14 touch-manipulation items-center gap-3 rounded-xl border border-white/10 bg-[#128C4A] px-4 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-[transform,background-color] duration-200 hover:bg-[#0f7e43] active:-translate-y-px active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <WhatsAppIcon size={23} className="shrink-0" />
              <span className="min-w-0 text-left">
                <span className="block text-sm font-semibold leading-tight">
                  {locale === 'te' ? `బుకింగ్ టీమ్ ${index + 1}` : `Booking team ${index + 1}`}
                </span>
                <span className="mt-1 block text-[10px] leading-tight text-white/70">
                  {locale === 'te' ? 'WhatsAppలో తెరవండి' : 'Open in WhatsApp'}
                </span>
              </span>
            </a>
          ))}

          <p className="px-2 pt-0.5 text-center text-[10px] leading-relaxed text-cream/[0.38]">
            {locale === 'te'
              ? 'వేగవంతమైన స్పందన కోసం రెండు టీమ్‌లను ప్రయత్నించండి'
              : 'Try either team for the fastest response'}
          </p>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setShowMenu((current) => !current)}
        aria-label={showMenu ? closeLabel : openLabel}
        aria-expanded={showMenu}
        aria-controls={MENU_ID}
        aria-haspopup="menu"
        className="whatsapp-fab group relative flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-[250ms] ease-[ease] hover:scale-[1.08] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:h-12 sm:w-auto sm:min-w-[7.5rem] sm:gap-2 sm:rounded-full sm:border sm:border-white/20 sm:bg-[#128C4A] sm:px-4 sm:shadow-[0_12px_30px_rgba(5,35,18,0.34),inset_0_1px_0_rgba(255,255,255,0.22)] sm:hover:scale-100 sm:hover:bg-[#0f7e43] sm:active:-translate-y-px sm:active:scale-[0.98]"
      >
        <WhatsAppIcon size={20} className="h-5 w-5 shrink-0" />
        <span className="hidden whitespace-nowrap text-[12px] font-bold tracking-wide sm:inline">
          {showMenu ? (locale === 'te' ? 'మూసివేయి' : 'Close') : 'WhatsApp'}
        </span>
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 hidden h-3.5 w-3.5 rounded-full border-[3px] border-dark bg-gold-bright sm:block"
        />
      </button>
    </div>
  );
}
