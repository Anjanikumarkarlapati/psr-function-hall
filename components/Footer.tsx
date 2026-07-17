'use client';

import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { ADDRESS } from '@/lib/data';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ProtectedPhone } from './ProtectedPhone';
import { useTranslation } from '@/lib/i18n';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-10 sm:py-16 px-3 sm:px-4 bg-dark-card">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
        {/* Brand */}
        <div>
          <div className="text-gold text-2xl font-bold mb-1 font-display">
            Pasumarthi
          </div>
          <div className="text-cream/22 text-[9px] tracking-[0.28em] uppercase mb-4 sm:mb-5">
            {t.navbar.subtitle}
          </div>
          <p className="text-cream/28 text-[13px] sm:text-sm leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-cream/45 text-[10px] font-semibold tracking-[0.28em] uppercase mb-4 sm:mb-5">
            {t.footer.contactHeading}
          </h4>
          <div className="space-y-3 sm:space-y-3.5 text-cream/35 text-[13px]">
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
              <ProtectedPhone encoded={ADDRESS.phone1} showIcon className="text-[13px]" />
            </div>
            <div className="flex items-center gap-3">
              <ProtectedPhone encoded={ADDRESS.phone2} showIcon className="text-[13px]" />
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
          <h4 className="text-cream/45 text-[10px] font-semibold tracking-[0.28em] uppercase mb-4 sm:mb-5">
            {t.footer.navigateHeading}
          </h4>
          <div className="space-y-2.5 sm:space-y-3 text-cream/35 text-[13px]">
            <Link href="/" className="block hover:text-gold active:text-gold transition-colors py-0.5 touch-manipulation">
              {t.navbar.home}
            </Link>
            <Link href="/menu" className="block hover:text-gold active:text-gold transition-colors py-0.5 touch-manipulation">
              {t.navbar.menu}
            </Link>
            <Link href="/events" className="block hover:text-gold active:text-gold transition-colors py-0.5 touch-manipulation">
              {t.navbar.events}
            </Link>
            <Link href="/book" className="block hover:text-gold active:text-gold transition-colors py-0.5 touch-manipulation">
              {t.navbar.bookNow}
            </Link>
            <a
              href={ADDRESS.justdial}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-gold active:text-gold transition-colors py-0.5 touch-manipulation"
            >
              {t.common.justdialListing}
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-5 sm:pt-6 border-t border-gold/8 text-center text-cream/15 text-[11px] sm:text-xs">
        {t.footer.copyright}
      </div>
    </footer>
  );
}
