'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Phone, ArrowRight, Clock, MapPin } from 'lucide-react';
import { MENU_ITEMS, MENU_2_EXTRAS, ADDRESS, WHATSAPP_NUMBERS } from '@/lib/data';
import { decodeNumber, decodeDisplayNumber } from '@/lib/obfuscate';
import { glass } from '@/styles/glass';
import { GlassCard } from '@/components/GlassCard';
import { GoldRule } from '@/components/GoldRule';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { useTranslation } from '@/lib/i18n';

export default function MenuPage() {
  const { t } = useTranslation();
  const allItems = [...MENU_ITEMS, ...MENU_2_EXTRAS];

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Header */}
      <div className="relative overflow-hidden h-[180px] sm:h-[240px]">
        <Image
          src="/images/hall-bg.png"
          alt=""
          fill
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 120%, #d4aa4c 0%, transparent 60%)',
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-end text-center px-3 sm:px-4 pb-5 sm:pb-8">
          <GlassCard
            variant="gold"
            className="inline-block text-gold text-[9px] tracking-[0.35em] sm:tracking-[0.52em] uppercase px-3 py-1.5 mb-2 sm:mb-5"
          >
            {t.menu.label}
          </GlassCard>
          <h1 className="text-[22px] sm:text-[46px] md:text-6xl text-white font-light leading-tight font-display">
            {t.menu.heading.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-gold font-semibold italic">
              {t.menu.heading.split(' ').slice(-1)[0]}
            </span>
          </h1>
          <div className="flex items-center gap-2 mt-2 sm:mt-4 text-silver text-[11px] sm:text-sm">
            <Leaf size={12} className="text-green-400/70" />
            {t.menu.vegNote}
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Package Legend */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                label: t.menu.menu1Label,
                count: t.menu.menu1Count,
                desc: t.menu.menu1Desc,
                extra: null,
              },
              {
                label: t.menu.menu2Label,
                count: t.menu.menu2Count,
                desc: t.menu.menu2Desc,
                extra: t.menu.menu2Extra,
              },
            ].map((pkg, i) => (
              <GlassCard
                key={i}
                variant="dark"
                className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 bg-gold/15 border border-gold/30 text-gold font-bold text-xs sm:text-sm font-display">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white/85 text-[14px] sm:text-[15px] font-medium font-display">
                      {pkg.label}
                    </span>
                    <span className="text-gold text-[9px] sm:text-[10px] tracking-wide px-2 py-0.5 bg-gold/10 border border-gold/25">
                      {pkg.count}
                    </span>
                    {pkg.extra && (
                      <span className="text-green-400 text-[8px] sm:text-[9px] tracking-wide px-2 py-0.5 bg-green-400/8 border border-green-400/20">
                        {pkg.extra}
                      </span>
                    )}
                  </div>
                  <p className="text-silver text-[11px] sm:text-xs leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Combined Menu Card */}
          <GlassCard variant="dark" className="overflow-hidden">
            {/* Header */}
            <div
              className="px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3"
              style={{ borderBottom: '1px solid rgba(212,170,76,0.14)' }}
            >
              <div>
                <div className="text-gold text-[9px] tracking-[0.35em] sm:tracking-[0.45em] uppercase mb-1">
                  {t.menu.fullMenuLabel}
                </div>
                <h2 className="text-lg sm:text-2xl text-white font-light font-display">
                  {t.menu.fullMenuHeading}
                </h2>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-silver">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gold/60" />
                  {t.menu.legend1}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                  {t.menu.legend2}
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-3.5">
                {allItems.map((item, i) => {
                  const isExtra = MENU_2_EXTRAS.includes(item);
                  const translatedName = t.menu.items[item] || item;
                  return (
                    <div key={i} className="flex items-center gap-3 py-0.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isExtra ? 'bg-green-400/70' : 'bg-gold/45'
                        }`}
                      />
                      <span
                        className={`text-[13px] sm:text-[13px] leading-snug ${
                          isExtra
                            ? 'text-green-300/80 font-medium'
                            : 'text-silver'
                        }`}
                      >
                        {translatedName}
                      </span>
                      {isExtra && (
                        <span className="text-[8px] sm:text-[9px] text-green-400/70 px-1.5 py-0.5 border border-green-400/20 tracking-wide shrink-0">
                          M2
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Note */}
              <div
                className="mt-8 pt-6 flex items-start gap-3"
                style={{ borderTop: '1px solid rgba(212,170,76,0.1)' }}
              >
                <div className="w-[2px] h-10 bg-green-400/40 shrink-0 mt-0.5" />
                <p className="text-silver text-xs leading-relaxed">
                  {t.menu.note}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Contact CTA */}
          <GlassCard variant="dark" className="relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 100%, #d4aa4c 0%, transparent 65%)',
              }}
            />
            <div className="relative p-5 sm:p-8 md:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-8 h-[1px] bg-gold/40 mx-auto mb-5" />
                <GlassCard
                  variant="gold"
                  className="inline-block text-gold text-[9px] tracking-[0.5em] uppercase px-3 py-1.5 mb-4"
                >
                  {t.menu.ctaLabel}
                </GlassCard>
                <h3 className="text-xl sm:text-3xl md:text-4xl text-white font-light mb-2 sm:mb-3 font-display leading-tight">
                  {t.menu.ctaHeading1}
                  <br />
                  <span className="text-gold font-semibold italic">
                    {t.menu.ctaHeading2}
                  </span>
                </h3>
                <p className="text-silver text-[12px] sm:text-[14px] leading-relaxed max-w-md mx-auto px-2 sm:px-0">
                  {t.menu.ctaDesc}
                </p>
                <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-5" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const number = decodeNumber(WHATSAPP_NUMBERS[0].number);
                    const msg = 'Hello, I would like to know more about the menu and packages at Pasumarthi Banquet Hall.';
                    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="group flex flex-col items-center gap-3 px-6 py-5 sm:py-6 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#19a34d] text-white transition-all cursor-pointer touch-manipulation"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-white/25 text-white">
                    <WhatsAppIcon size={18} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-white font-display">
                      {t.menu.whatsappBtn}
                    </div>
                    <div className="text-[11px] mt-0.5 text-white/70">
                      {t.menu.whatsappSubtext}
                    </div>
                  </div>
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const phone = decodeDisplayNumber(ADDRESS.phone1);
                    window.open(`tel:${phone.replace(/\s/g, '')}`);
                  }}
                  className="group flex flex-col items-center gap-3 px-6 py-5 sm:py-6 text-gold hover:border-gold/50 active:bg-gold/10 transition-all cursor-pointer touch-manipulation"
                  style={glass.gold as React.CSSProperties}
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/35 text-gold">
                    <Phone size={17} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-gold font-display">
                      {t.menu.callBtn}
                    </div>
                    <div className="text-[11px] mt-0.5 text-silver">
                      Tap to call
                    </div>
                  </div>
                </a>

                <Link
                  href="/book"
                  className="group flex flex-col items-center gap-3 px-6 py-5 sm:py-6 text-gold hover:border-gold/50 active:bg-gold/10 transition-all touch-manipulation"
                  style={glass.gold as React.CSSProperties}
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/35 text-gold">
                    <ArrowRight size={17} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-gold font-display">
                      {t.menu.bookBtn}
                    </div>
                    <div className="text-[11px] mt-0.5 text-silver">
                      {t.menu.bookSubtext}
                    </div>
                  </div>
                </Link>
              </div>

              <div className="text-center text-silver text-xs flex flex-col sm:flex-row items-center justify-center gap-2">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} className="text-gold/60" />
                  {t.addressInfo.timings}
                </span>
                <span className="hidden sm:inline mx-2 text-gold/20">|</span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-gold/60" />
                  Nizampet, Khammam, Telangana
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
