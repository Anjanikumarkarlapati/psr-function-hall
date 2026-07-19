'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock, ExternalLink, Navigation, LoaderCircle } from 'lucide-react';
import {
  ADDRESS,
  GOOGLE_MAPS_DIRECTIONS_URL,
  MAP_VIEWS,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsViewUrl,
} from '@/lib/data';
import { openPhoneDialer } from '@/lib/obfuscate';
import { useTranslation } from '@/lib/i18n';
import { glass } from '@/styles/glass';

export function MapSection() {
  const [activeView, setActiveView] = useState<'map' | 'satellite' | 'street'>(
    'satellite'
  );
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [directionsStatus, setDirectionsStatus] = useState<string | null>(null);
  const { t, locale } = useTranslation();
  const activeMap = MAP_VIEWS.find((view) => view.id === activeView) ?? MAP_VIEWS[1];
  const activeMapUrl = getGoogleMapsViewUrl(activeView);
  const loadingLabel = locale === 'te' ? 'మ్యాప్ లోడ్ అవుతోంది…' : 'Loading map…';
  const locatingLabel =
    locale === 'te' ? 'మీ ప్రస్తుత స్థానాన్ని గుర్తిస్తోంది…' : 'Finding your current location…';
  const directionsLabel =
    locale === 'te'
      ? 'మీ ప్రస్తుత స్థానం నుండి దిశలు'
      : 'Directions from current location';

  const selectView = (view: 'map' | 'satellite' | 'street') => {
    if (view === activeView) return;
    setIsMapLoaded(false);
    setActiveView(view);
  };

  const handleDirections = () => {
    const mapsWindow = window.open('', '_blank');
    if (mapsWindow) {
      mapsWindow.opener = null;
      mapsWindow.document.title = locatingLabel;
      mapsWindow.document.body.textContent = locatingLabel;
      mapsWindow.document.body.style.cssText =
        'margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0908;color:#d4aa4c;font:16px system-ui,sans-serif';
    }

    const navigateToMaps = (url: string) => {
      if (mapsWindow && !mapsWindow.closed) {
        mapsWindow.location.replace(url);
      } else {
        window.location.assign(url);
      }
    };

    if (!navigator.geolocation) {
      setDirectionsStatus(
        locale === 'te'
          ? 'GPS అందుబాటులో లేదు. Google Maps ప్రస్తుత స్థానాన్ని ఉపయోగిస్తోంది.'
          : 'GPS is unavailable. Google Maps will use your current location.'
      );
      navigateToMaps(GOOGLE_MAPS_DIRECTIONS_URL);
      return;
    }

    setIsLocating(true);
    setDirectionsStatus(locatingLabel);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setIsLocating(false);
        setDirectionsStatus(
          locale === 'te' ? 'Google Mapsలో మార్గం తెరవబడుతోంది…' : 'Opening your route in Google Maps…'
        );
        navigateToMaps(
          getGoogleMapsDirectionsUrl({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })
        );
      },
      () => {
        setIsLocating(false);
        setDirectionsStatus(
          locale === 'te'
            ? 'స్థాన అనుమతి లభించలేదు. Google Maps ప్రస్తుత స్థానాన్ని ఉపయోగిస్తోంది.'
            : 'Location permission was unavailable. Google Maps will use your current location.'
        );
        navigateToMaps(GOOGLE_MAPS_DIRECTIONS_URL);
      },
      {
        enableHighAccuracy: true,
        timeout: 12_000,
        maximumAge: 60_000,
      }
    );
  };

  // Check if venue is currently open (10 AM - 10 PM IST, every day)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const checkOpen = () => {
      const now = new Date();
      // Convert to IST (UTC+5:30)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 5.5 * 3600000);
      const hour = ist.getHours();
      setIsOpen(hour >= 10 && hour < 22);
    };
    checkOpen();
    const interval = setInterval(checkOpen, 60000); // re-check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 sm:py-24 lg:py-28 px-3 sm:px-5 lg:px-8 bg-black/[0.64]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(212,170,76,0.09),transparent_30%)]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-3 sm:mb-4">
            {t.map.label}
          </p>
          <h2 className="text-[24px] sm:text-[34px] md:text-4xl text-cream font-light mb-3 sm:mb-4 font-display">
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
          <div
            className="glass-surface overflow-hidden rounded-2xl"
            style={glass.dark as React.CSSProperties}
          >
            {/* Responsive, keyboard-accessible map view tabs */}
            <div
              className="grid grid-cols-3 border-b border-gold/15 bg-black/[0.35]"
              role="tablist"
              aria-label={locale === 'te' ? 'మ్యాప్ వీక్షణ' : 'Map view'}
            >
              {MAP_VIEWS.map((view) => (
                <button
                  key={view.id}
                  id={`map-tab-${view.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeView === view.id}
                  aria-controls="venue-map-panel"
                  onClick={() => selectView(view.id)}
                  className={`min-w-0 px-1 py-3 text-[9px] leading-tight tracking-[0.08em] uppercase transition-colors touch-manipulation sm:px-3 sm:py-3.5 sm:text-[11px] sm:tracking-[0.18em] ${
                    activeView === view.id
                      ? 'border-b-2 border-gold bg-gold/10 text-gold'
                      : 'border-b-2 border-transparent text-cream/60 hover:bg-white/[0.03] hover:text-cream active:text-cream'
                  }`}
                >
                  <span className="block truncate">{view.label}</span>
                </button>
              ))}
            </div>

            {/* One active embed keeps network use low and works with touch gestures. */}
            <div
              id="venue-map-panel"
              role="tabpanel"
              aria-labelledby={`map-tab-${activeView}`}
              className="relative h-[280px] w-full bg-dark sm:h-[360px] lg:h-[460px]"
            >
              {!isMapLoaded && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-dark-surface px-5 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
                  <span className="text-xs tracking-wide text-cream/65">{loadingLabel}</span>
                  <a
                    href={activeMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gold underline underline-offset-4"
                  >
                    {t.map.openInGoogleMaps}
                  </a>
                </div>
              )}
              <iframe
                key={activeMap.id}
                src={activeMap.src}
                className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
                  isMapLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ border: 0 }}
                loading="lazy"
                title={`${t.navbar.brandName} ${t.home.heroBanquetHall} — ${activeMap.label}`}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="fullscreen"
                allowFullScreen
                onLoad={() => setIsMapLoaded(true)}
              />
            </div>

            {/* Footer bar */}
            <div className="bg-black/[0.35] border-t border-gold/10 px-3 sm:px-5 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-cream/75 text-[10px] sm:text-[11px]">
                {activeView === 'street'
                  ? t.map.footerStreet
                  : activeView === 'satellite'
                  ? t.map.footerSatellite
                  : t.map.footerMap}
              </span>
              <a
                href={activeMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-[11px] flex items-center gap-1 hover:underline shrink-0 touch-manipulation py-1"
              >
                {t.map.openInGoogleMaps} <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div
            className="glass-surface overflow-hidden rounded-2xl flex flex-col"
            style={glass.dark as React.CSSProperties}
          >
            <div className="border-b border-gold/12 px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-[radial-gradient(circle,rgba(201,168,76,0.09),transparent_68%)] shadow-[inset_0_0_18px_rgba(201,168,76,0.04)]">
                  <Image
                    src="/images/brand-mark.svg"
                    alt=""
                    width={256}
                    height={256}
                    aria-hidden="true"
                    className="h-12 w-12 object-contain drop-shadow-[0_2px_6px_rgba(201,168,76,0.2)]"
                  />
                </div>
                <div>
                  <div className="text-gold text-lg font-semibold font-display">
                    {t.navbar.brandName} {t.home.heroBanquetHall}
                  </div>
                  <div className="text-cream/[0.55] text-[10px] tracking-[0.22em] uppercase mt-1">
                    Khammam · Telangana
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-4 sm:space-y-5 flex-1">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 border border-gold/25 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-gold" />
                </div>
                <div>
                  <div className="text-cream/60 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                    {t.common.address}
                  </div>
                  <div className="text-cream/75 text-[13px] leading-relaxed">
                    {t.addressInfo.line1},<br />
                    {t.addressInfo.line2},<br />
                    {t.addressInfo.line3},<br />
                    {t.addressInfo.state}
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-gold/8" />

              {/* Phone numbers */}
              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-gold/25">
                  <Phone size={13} className="text-gold" />
                </span>
                <div>
                  <span className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-cream/60">
                    {t.common.phone}
                  </span>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => openPhoneDialer(ADDRESS.phone1)}
                      aria-label={locale === 'te' ? 'ప్రధాన నంబర్‌కు కాల్ చేయండి' : 'Call primary phone number'}
                      className="group block w-full touch-manipulation text-left active:scale-[0.99]"
                    >
                      <span className="block text-[13px] text-gold/80 underline decoration-dotted underline-offset-4 transition-colors group-hover:text-gold">
                        {locale === 'te' ? 'నంబర్ 1 — కాల్ చేయండి' : 'Number 1 — Tap to call'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openPhoneDialer(ADDRESS.phone2)}
                      aria-label={locale === 'te' ? 'రెండవ నంబర్‌కు కాల్ చేయండి' : 'Call secondary phone number'}
                      className="group block w-full touch-manipulation text-left active:scale-[0.99]"
                    >
                      <span className="block text-[13px] text-gold/80 underline decoration-dotted underline-offset-4 transition-colors group-hover:text-gold">
                        {locale === 'te' ? 'నంబర్ 2 — కాల్ చేయండి' : 'Number 2 — Tap to call'}
                      </span>
                    </button>
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
                  <div className="text-cream/60 text-[10px] tracking-[0.2em] uppercase mb-1.5">
                    {t.common.hours}
                  </div>
                  <div className="text-cream/75 text-[13px]">
                    {t.addressInfo.timings}
                  </div>
                  <div className="inline-flex items-center gap-1.5 mt-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-400'}`} />
                    <span className={`text-[11px] ${isOpen ? 'text-green-500/70' : 'text-red-400/70'}`}>
                      {isOpen ? t.common.openNow : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-gold/8" />

              {/* Explore buttons */}
              <div>
                <div className="text-cream/60 text-[10px] tracking-[0.2em] uppercase mb-3">
                  {t.common.explore}
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {MAP_VIEWS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => selectView(v.id)}
                      aria-pressed={activeView === v.id}
                      className={`min-w-0 rounded-md border px-1 py-2.5 text-[9px] leading-tight tracking-wide transition-all touch-manipulation sm:px-2 sm:text-[10px] ${
                        activeView === v.id
                          ? 'border-gold/60 bg-gold/10 text-gold'
                          : 'border-gold/15 text-cream/60 hover:border-gold/35 hover:text-cream'
                      }`}
                    >
                      <span className="block truncate">
                        {v.label === 'Satellite / 3D' ? t.map.view3d : v.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-2">
              <button
                type="button"
                onClick={handleDirections}
                disabled={isLocating}
                aria-label={directionsLabel}
                className="flex w-full touch-manipulation items-center justify-center gap-2 bg-gold py-3.5 text-xs font-bold uppercase tracking-widest text-dark transition-colors hover:bg-gold-bright active:bg-gold-bright disabled:cursor-wait disabled:opacity-75 sm:py-3"
              >
                {isLocating ? (
                  <LoaderCircle size={14} className="animate-spin" />
                ) : (
                  <Navigation size={13} />
                )}
                {isLocating ? locatingLabel : directionsLabel}
              </button>
              {directionsStatus && (
                <p
                  className="px-2 text-center text-[10px] leading-relaxed text-cream/55"
                  role="status"
                  aria-live="polite"
                >
                  {directionsStatus}
                </p>
              )}
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
