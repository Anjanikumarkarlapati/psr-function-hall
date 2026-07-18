'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import { ADDRESS } from '@/lib/data';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProtectedPhone } from './ProtectedPhone';
import { useTranslation } from '@/lib/i18n';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-10 sm:py-16 px-4 sm:px-4 bg-dark-card">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 mb-8 sm:mb-12">
        {/* Brand */}
        <div>
          <Link
            href="/"
            aria-label="Pasumarthy Banquet Hall — home"
            className="group inline-block mb-4 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-4 focus-visible:ring-offset-dark-card"
          >
            <Image
              src="/images/brand-lockup.svg"
              alt="Pasumarthy Banquet Hall"
              width={760}
              height={220}
              className="h-auto w-[180px] sm:w-[240px] drop-shadow-[0_3px_12px_rgba(201,168,76,0.15)] transition-[filter] duration-300 group-hover:brightness-110"
            />
          </Link>
          <p className="max-w-xs text-cream/35 text-[12px] sm:text-sm leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-cream/45 text-[10px] font-semibold tracking-[0.22em] sm:tracking-[0.28em] uppercase mb-4 sm:mb-5">
            {t.footer.contactHeading}
          </h4>
          <div className="space-y-3.5 sm:space-y-3.5 text-cream/35 text-[12px] sm:text-[13px]">
            <div className="flex items-start gap-3">
              <MapPin size={12} className="text-gold mt-[3px] shrink-0" />
              <span className="leading-relaxed">
                {t.addressInfo.line1},<br />
                {t.addressInfo.line2},<br />
                {t.addressInfo.line3},<br />
                {t.addressInfo.state}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ProtectedPhone encoded={ADDRESS.phone1} showIcon className="text-[12px] sm:text-[13px]" />
            </div>
            <div className="flex items-center gap-3">
              <ProtectedPhone encoded={ADDRESS.phone2} showIcon className="text-[12px] sm:text-[13px]" />
            </div>
            <div className="flex items-center gap-3">
              <Clock size={12} className="text-gold shrink-0" />
              <span>{t.addressInfo.timings}</span>
            </div>
            <div className="flex items-center gap-3">
              <WhatsAppIcon size={12} />
              <span>{t.footer.whatsappBooking}</span>
            </div>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="text-cream/45 text-[10px] font-semibold tracking-[0.22em] sm:tracking-[0.28em] uppercase mb-4 sm:mb-5">
            {t.footer.navigateHeading}
          </h4>
          <div className="space-y-1 sm:space-y-3 text-cream/35 text-[13px]">
            <Link href="/" className="block hover:text-gold active:text-gold transition-colors py-2 sm:py-0.5 touch-manipulation">
              {t.navbar.home}
            </Link>
            <Link href="/menu" className="block hover:text-gold active:text-gold transition-colors py-2 sm:py-0.5 touch-manipulation">
              {t.navbar.menu}
            </Link>
            <Link href="/events" className="block hover:text-gold active:text-gold transition-colors py-2 sm:py-0.5 touch-manipulation">
              {t.navbar.events}
            </Link>
            <Link href="/book" className="block hover:text-gold active:text-gold transition-colors py-2 sm:py-0.5 touch-manipulation">
              {t.navbar.bookNow}
            </Link>
            <a
              href={ADDRESS.justdial}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-gold active:text-gold transition-colors py-2 sm:py-0.5 touch-manipulation"
            >
              {t.common.justdialListing}
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-5 sm:pt-6 border-t border-gold/8 text-center text-cream/15 text-[10px] sm:text-xs">
        {t.footer.copyright}
      </div>
    </footer>
  );
}
