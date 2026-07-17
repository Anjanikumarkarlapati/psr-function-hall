'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { ADDRESS, MAP_VIEWS } from '@/lib/data';
import { ProtectedPhone } from './ProtectedPhone';
import { useTranslation } from '@/lib/i18n';

export function MapSection() {
  const [activeView, setActiveView] = useState<'map' | 'satellite' | 'street'>(
    'satellite'
  );
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-28 px-3 sm:px-4 bg-dark-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-3 sm:mb-4">
            {t.map.label}
          </p>
          <h2 className="text-[24px] sm:text-[34px] md:text-4xl text-cream font-bold mb-3 sm:mb-4 font-display">
            {t.map.heading}
          </h2>
          <div className="flex items-center gap-3 justify-center my-2">
            <div className="h-[1px] w-12 bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/70" />
            <div className="h-[1px] w-12 bg-gold/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3 sm:gap-6 items-start">
          {/* Map Panel */}
          <div className="border border-gold/[0.18] overflow-hidden">
            {/* Tab bar */}
            <div className="bg-dark-surface border-b border-gold/15 flex">
              {MAP_VIEWS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id)}
                  className={`flex-1 py-3.5 text-[11px] tracking-[0.22em] uppercase transition-all ${
                    activeView === v.id
                      ? 'text-gold bg-gold/8 border-b-2 border-gold'
                      : 'text-cream/40 hover:text-cream/65 border-b-2 border-transparent'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Iframe container — only render the active iframe */}
            <div className="relative h-[240px] sm:h-[360px] lg:h-[460px]">
              {MAP_VIEWS.filter((v) => v.id === activeView).map((v) => (
                <iframe
                  key={v.id}
                  src={v.src}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    position: 'absolute',
                    inset: 0,
                  }}
                  loading="lazy"
                  title={`Pasumarthi Banquet Hall — ${v.label}`}
                  allowFullScreen
                />
              ))}
            </div>

            {/* Footer bar */}
            <div className="bg-dark-surface border-t border-gold/10 px-3 sm:px-5 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-cream/30 text-[10px] sm:text-[11px]">
                {activeView === 'street'
                  ? t.map.footerStreet
                  : activeView === 'satellite'
                  ? t.map.footerSatellite
                  : t.map.footerMap}
              </span>
              <a
                href={ADDRESS.gmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-[11px] flex items-center gap-1 hover:underline shrink-0 touch-manipulation py-1"
              >
                {t.map.openInGoogleMaps} <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div className="border border-gold/[0.18] bg-dark-surface flex flex-col">
            <div className="border-b border-gold/12 px-4 sm:px-6 py-4 sm:py-5">
              <div className="text-gold text-lg font-bold font-display">
                Pasumarthi Banquet Hall
              </div>
              <div className="text-cream/30 text-[10px] tracking-[0.22em] uppercase mt-1">
                Khammam · Telangana
              </div>
            </div>

            <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-4 sm:space-y-5 flex-1">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 border border-gold/25 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-gold" />
                </div>
                <div>
                  <div className="text-cream/35 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                    {t.common.address}
                  </div>
                  <div className="text-cream/60 text-[13px] leading-relaxed">
                    {t.addressInfo.line1},<br />
                    {t.addressInfo.line2},<br />
                    {t.addressInfo.line3},<br />
                    {t.addressInfo.state}
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-gold/8" />

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 border border-gold/25 flex items-center justify-center shrink-0">
                  <Phone size={13} className="text-gold" />
                </div>
                <div>
                  <div className="text-cream/35 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                    {t.common.phone}
                  </div>
                  <div className="text-cream/60 text-[13px]">
                    <ProtectedPhone encoded={ADDRESS.phone1} className="text-[13px] text-cream/60" />
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-gold/8" />

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 border border-gold/25 flex items-center justify-center shrink-0">
                  <Clock size={13} className="text-gold" />
                </div>
                <div>
                  <div className="text-cream/35 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                    {t.common.hours}
                  </div>
                  <div className="text-cream/60 text-[13px]">
                    {t.addressInfo.timings}
                  </div>
                  <div className="inline-flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-green-500/70 text-[11px]">
                      {t.common.openNow}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-gold/8" />

              {/* Explore buttons */}
              <div>
                <div className="text-cream/35 text-[10px] tracking-[0.2em] uppercase mb-3">
                  {t.common.explore}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MAP_VIEWS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveView(v.id)}
                      className={`py-2 text-[10px] tracking-wide border transition-all ${
                        activeView === v.id
                          ? 'border-gold/60 bg-gold/10 text-gold'
                          : 'border-gold/15 text-cream/35 hover:border-gold/35 hover:text-cream/55'
                      }`}
                    >
                      {v.label === 'Satellite / 3D' ? t.map.view3d : v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-2">
              <a
                href={ADDRESS.gmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 sm:py-3 bg-gold text-dark text-xs font-bold tracking-widest uppercase hover:bg-gold-bright active:bg-gold-bright transition-colors touch-manipulation"
              >
                <MapPin size={13} /> {t.common.getDirections}
              </a>
              <a
                href={ADDRESS.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 sm:py-3 border border-gold/30 text-gold text-xs tracking-widest uppercase hover:border-gold/60 hover:bg-gold/5 active:bg-gold/10 transition-all touch-manipulation"
              >
                <ExternalLink size={12} /> {t.common.justdialListing}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
