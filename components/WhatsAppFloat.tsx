'use client';

import { useState, useEffect, useRef } from 'react';
import { WHATSAPP_NUMBERS } from '@/lib/data';
import { decodeNumber } from '@/lib/obfuscate';
import { useTranslation } from '@/lib/i18n';

export function WhatsAppFloat() {
  const { locale } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getMessage = () =>
    locale === 'te'
      ? 'నమస్కారం, పసుమర్తి బ్యాంక్వెట్ హాల్ బుకింగ్ గురించి విచారించాలనుకుంటున్నాను.'
      : 'Hello, I would like to enquire about booking Pasumarthi Banquet Hall.';

  const getUrl = (index: number) => {
    const number = decodeNumber(WHATSAPP_NUMBERS[index].number);
    return `https://wa.me/${number}?text=${encodeURIComponent(getMessage())}`;
  };

  // Close menu when tapping outside (important for mobile)
  useEffect(() => {
    if (!showMenu) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Popup with both number options */}
      {showMenu && (
        <div className="bg-[#1a1a1a] border border-gold/20 rounded-xl shadow-2xl shadow-black/50 p-4 space-y-2.5 mb-1">
          <p className="text-cream/60 text-[11px] tracking-wider uppercase text-center px-2 font-medium">
            {locale === 'te' ? 'మెసేజ్ పంపండి' : 'Send message to'}
          </p>
          {WHATSAPP_NUMBERS.map((_, index) => (
            <a
              key={index}
              href={getUrl(index)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-[#25D366] hover:bg-[#1eb85a] active:bg-[#19a34d] text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap touch-manipulation"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="white" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.785.476 3.549 1.38 5.094L2 22l5.025-1.321A10.003 10.003 0 0 0 12.004 22C17.531 22 22 17.523 22 12.004S17.531 2 12.004 2zm0 18.182a8.181 8.181 0 0 1-4.17-1.143l-.3-.178-3.081.809.82-3.001-.196-.309A8.128 8.128 0 0 1 3.822 12c0-4.517 3.667-8.182 8.182-8.182S20.182 7.483 20.182 12c0 4.517-3.665 8.182-8.178 8.182z" />
              </svg>
              {locale === 'te' ? `నంబర్ ${index + 1}` : `Number ${index + 1}`}
            </a>
          ))}
          <p className="text-cream/30 text-[10px] text-center pt-1">
            {locale === 'te'
              ? 'దయచేసి రెండు నంబర్లకు పంపండి'
              : 'Please send to both numbers'}
          </p>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1eb85a] active:bg-[#19a34d] shadow-lg shadow-black/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 touch-manipulation"
      >
        <svg width={28} height={28} viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.785.476 3.549 1.38 5.094L2 22l5.025-1.321A10.003 10.003 0 0 0 12.004 22C17.531 22 22 17.523 22 12.004S17.531 2 12.004 2zm0 18.182a8.181 8.181 0 0 1-4.17-1.143l-.3-.178-3.081.809.82-3.001-.196-.309A8.128 8.128 0 0 1 3.822 12c0-4.517 3.667-8.182 8.182-8.182S20.182 7.483 20.182 12c0 4.517-3.665 8.182-8.178 8.182z" />
        </svg>
      </button>
    </div>
  );
}
