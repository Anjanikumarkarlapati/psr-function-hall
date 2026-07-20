'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, PartyPopper } from 'lucide-react';
import { WHATSAPP_NUMBERS } from '@/lib/data';
import { decodeNumber } from '@/lib/obfuscate';

export function BirthdayOfferBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const whatsappUrl = `https://wa.me/${decodeNumber(
    WHATSAPP_NUMBERS[0].number
  )}?text=${encodeURIComponent(
    'Hello, I would like to know more about your special birthday offers at Pasumarthy Banquet Hall.'
  )}`;

  return (
    <aside
      className="birthday-offer-position fixed left-3 right-3 z-50 w-auto animate-fade-in-up sm:left-auto sm:right-6 sm:w-[calc(100vw-3rem)] sm:max-w-xl lg:right-8 lg:w-[36rem]"
      role="status"
      aria-live="polite"
      aria-label="Birthday special offer"
    >
      <div className="birthday-offer-surface relative overflow-hidden rounded-2xl border border-white/20">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute right-1 top-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-cream/80 transition-colors hover:bg-black/65 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-2 sm:top-2"
          aria-label="Close birthday offer notification"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="flex min-w-0">
          <div className="relative min-h-[148px] w-[clamp(5.75rem,28vw,7rem)] flex-shrink-0 sm:min-h-[154px] sm:w-44 md:w-48 lg:w-[12.5rem]">
            <Image
              src="/images/gallery/birthday-boss-baby-theme.jpg"
              alt="Birthday party decoration with balloons and stage setup"
              fill
              sizes="(max-width: 639px) 28vw, (max-width: 1023px) 176px, 200px"
              className="rounded-l-2xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/10 to-transparent" />

            <div className="absolute left-2 top-2 flex max-w-[calc(100%-1rem)] items-center gap-1 rounded-full bg-gold/90 px-1.5 py-1 sm:left-3 sm:top-3 sm:gap-1.5 sm:px-2.5">
              <PartyPopper size={11} className="flex-none text-dark sm:h-3 sm:w-3" aria-hidden="true" />
              <span className="truncate text-[7px] font-bold uppercase leading-none tracking-wider text-dark sm:text-[10px]">
                Special Offer
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1 px-3 py-3 pr-12 sm:px-5 sm:py-4 sm:pr-14 lg:px-6 lg:py-5 lg:pr-16">
            <h3 className="mb-1 pr-1 font-display text-[12px] font-semibold leading-tight text-gold-light sm:mb-1.5 sm:text-[16px] lg:text-[17px]">
              Special Offers for Birthdays!
            </h3>
            <p className="mb-2 line-clamp-2 text-[10px] leading-relaxed text-cream/75 sm:mb-3 sm:line-clamp-none sm:text-[12px] lg:text-[13px]">
              Contact us for exclusive birthday celebration packages and decorations.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gold/90 px-2.5 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-dark transition-colors hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright sm:w-auto sm:px-4 sm:text-[11px] sm:tracking-[0.15em]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="flex-none"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.146.56 4.158 1.54 5.9L0 24l6.305-1.654A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.834-.53-5.445-1.455l-.39-.232-4.05 1.063 1.08-3.95-.254-.404A9.72 9.72 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
