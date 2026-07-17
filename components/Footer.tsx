import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import { ADDRESS } from '@/lib/data';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Footer() {
  return (
    <footer className="py-16 px-4 bg-dark-card">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="text-gold text-2xl font-bold mb-1 font-display">
            Pasumarthi
          </div>
          <div className="text-cream/22 text-[9px] tracking-[0.28em] uppercase mb-5">
            Banquet Hall
          </div>
          <p className="text-cream/28 text-sm leading-relaxed">
            One of the finest banquet halls in Khammam — where every celebration
            becomes an extraordinary memory.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-cream/45 text-[10px] font-semibold tracking-[0.28em] uppercase mb-5">
            Contact
          </h4>
          <div className="space-y-3.5 text-cream/35 text-[13px]">
            <div className="flex items-start gap-3">
              <MapPin size={12} className="text-gold mt-[3px] shrink-0" />
              <span className="leading-relaxed">
                {ADDRESS.line1},<br />
                {ADDRESS.line2},<br />
                {ADDRESS.line3},<br />
                {ADDRESS.state}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={12} className="text-gold shrink-0" />
              <span>{ADDRESS.phone1}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={12} className="text-gold shrink-0" />
              <span>{ADDRESS.timings}</span>
            </div>
            <div className="flex items-center gap-3">
              <WhatsAppIcon size={12} />
              <span>WhatsApp Booking Available</span>
            </div>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="text-cream/45 text-[10px] font-semibold tracking-[0.28em] uppercase mb-5">
            Navigate
          </h4>
          <div className="space-y-3 text-cream/35 text-[13px]">
            <Link
              href="/"
              className="block hover:text-gold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="block hover:text-gold transition-colors"
            >
              Veg Menu
            </Link>
            <Link
              href="/events"
              className="block hover:text-gold transition-colors"
            >
              Events & Decorations
            </Link>
            <Link
              href="/book"
              className="block hover:text-gold transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href={ADDRESS.justdial}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-gold transition-colors"
            >
              JustDial Listing
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 border-t border-gold/8 text-center text-cream/15 text-xs">
        © 2025 Pasumarthi Banquet Hall · All rights reserved · Khammam,
        Telangana
      </div>
    </footer>
  );
}
