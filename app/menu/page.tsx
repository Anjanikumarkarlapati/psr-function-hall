'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight, Clock, MapPin } from 'lucide-react';
import { MENU_ITEMS, MENU_2_EXTRAS, WELCOME_DRINK, SNACKS, ADDRESS, WHATSAPP_NUMBERS } from '@/lib/data';
import { decodeNumber, openPhoneDialer } from '@/lib/obfuscate';
import { glass } from '@/styles/glass';
import { GlassCard } from '@/components/GlassCard';
import { GoldRule } from '@/components/GoldRule';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { useTranslation } from '@/lib/i18n';

export default function MenuPage() {
  const { t, locale } = useTranslation();
  const allItems = [...MENU_ITEMS, WELCOME_DRINK, SNACKS, ...MENU_2_EXTRAS];

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/hall-bg.png"
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>
      <div className="fixed inset-0 -z-10 bg-black/70" />

      {/* Hero Header */}
      <header className="relative flex h-[280px] sm:h-[360px] items-center justify-center overflow-hidden px-3 sm:px-5 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/70" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[90px] sm:h-[28rem] sm:w-[28rem]" />
        <GlassCard
          variant="dark"
          className="relative w-full max-w-2xl overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] px-5 py-7 sm:px-10 sm:py-9 text-center"
        >
          <GlassCard
            variant="gold"
            className="inline-block rounded-lg text-gold-light text-[10px] tracking-[0.32em] sm:tracking-[0.46em] uppercase px-3 py-1.5 mb-3 sm:mb-5"
          >
            {t.menu.label}
          </GlassCard>
          <h1 className="text-[28px] sm:text-[46px] md:text-6xl text-cream font-light leading-tight font-display text-balance">
            {t.menu.heading.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-gold-light font-semibold italic">
              {t.menu.heading.split(' ').slice(-1)[0]}
            </span>
          </h1>
          <GoldRule />
          <div className="flex flex-col items-center gap-2 mt-3 sm:mt-4 text-cream/75 text-[12px] sm:text-sm">
            <span>Finest Quality Ingredients</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-green-400 rounded-sm flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                Veg
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 border-2 border-red-400 rounded-sm flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                </span>
                Non-Veg
              </span>
            </div>
          </div>
        </GlassCard>
      </header>

      <section className="relative overflow-hidden px-3 sm:px-5 lg:px-8 py-10 sm:py-16 bg-black/65">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,170,76,0.08),transparent_28%)]" />
        <div className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8">

          {/* Unified Menu Card */}
          <GlassCard variant="dark" className="overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem]">
            {/* Header */}
            <div className="px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gold/[0.16] bg-white/[0.025]">
              <div>
                <div className="text-gold-light text-[10px] tracking-[0.3em] sm:tracking-[0.42em] uppercase mb-1">
                  {t.menu.fullMenuLabel}
                </div>
                <h2 className="text-xl sm:text-2xl text-gold-light font-light font-display">
                  {t.menu.fullMenuHeading}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-cream/85">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gold/80 shadow-[0_0_10px_rgba(212,170,76,0.45)]" />
                  Veg
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400/80 shadow-[0_0_10px_rgba(74,222,128,0.35)]" />
                  Selectable
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.35)]" />
                  Non Veg
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-3.5">
                {allItems.map((item, i) => {
                  const isNonVeg = MENU_2_EXTRAS.includes(item);
                  const isWelcomeDrink = item === WELCOME_DRINK;
                  const isSnacks = item === SNACKS;
                  const isGreen = isWelcomeDrink || isSnacks;
                  const translatedName = t.menu.items[item] || item;
                  return (
                    <div key={i} className="flex min-h-10 items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-gold/15 hover:bg-white/[0.04]">
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isNonVeg ? 'bg-red-400/90' : isGreen ? 'bg-green-400/90' : 'bg-gold/80'
                        }`}
                      />
                      <span
                        className={`text-[13px] leading-snug ${
                          isNonVeg
                            ? 'text-red-200 font-medium'
                            : isGreen
                            ? 'text-green-200 font-medium'
                            : 'text-cream/90'
                        }`}
                      >
                        {translatedName}
                      </span>
                      {isNonVeg && (
                        <span className="ml-auto rounded-md text-[9px] text-red-300 px-1.5 py-0.5 border border-red-400/30 bg-red-400/[0.08] tracking-wide shrink-0">
                          Non Veg
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Note */}
              <div className="mt-7 pt-6 flex items-start gap-3 border-t border-gold/15">
                <div className="w-[2px] h-10 rounded-full bg-gradient-to-b from-gold/80 to-gold/10 shrink-0 mt-0.5" />
                <p className="text-cream/80 text-[13px] leading-relaxed">
                  Welcome drinks and snacks can be selected — contact us.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Contact CTA */}
          <GlassCard variant="dark" className="relative overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem]">
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 100%, #d4aa4c 0%, transparent 65%)',
              }}
            />
            <div className="relative p-5 sm:p-8 md:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-8 h-[1px] bg-gold/50 mx-auto mb-5" />
                <GlassCard
                  variant="gold"
                  className="inline-block rounded-lg text-gold-light text-[10px] tracking-[0.32em] sm:tracking-[0.44em] uppercase px-3 py-1.5 mb-4"
                >
                  {t.menu.ctaLabel}
                </GlassCard>
                <h3 className="text-2xl sm:text-3xl md:text-4xl text-cream font-light mb-2 sm:mb-3 font-display leading-tight text-balance">
                  {t.menu.ctaHeading1}
                  <br />
                  <span className="text-gold-light font-semibold italic">
                    {t.menu.ctaHeading2}
                  </span>
                </h3>
                <p className="text-cream/75 text-[13px] sm:text-[14px] leading-relaxed max-w-md mx-auto px-2 sm:px-0">
                  {t.menu.ctaDesc}
                </p>
                <div className="w-8 h-[1px] bg-gold/40 mx-auto mt-5" />
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
                  className="group flex flex-col items-center gap-3 rounded-xl px-6 py-5 sm:py-6 bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white transition-all cursor-pointer touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-white/25 text-white">
                    <WhatsAppIcon size={18} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-white font-display">
                      {t.menu.whatsappBtn}
                    </div>
                    <div className="text-[11px] mt-0.5 text-white/80">
                      {t.menu.whatsappSubtext}
                    </div>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => openPhoneDialer(ADDRESS.phone1)}
                  aria-label={locale === 'te' ? 'ప్రధాన నంబర్‌కు కాల్ చేయండి' : 'Call primary phone number'}
                  className="glass-surface glass-interactive group flex flex-col items-center gap-3 rounded-xl px-6 py-5 sm:py-6 text-gold-light cursor-pointer touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
                  style={glass.gold as React.CSSProperties}
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/35 text-gold">
                    <Phone size={17} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-gold font-display">
                      {t.menu.callBtn}
                    </div>
                    <div className="text-[11px] mt-0.5 text-cream/70">
                      {locale === 'te' ? 'కాల్ చేయడానికి నొక్కండి' : 'Tap to call'}
                    </div>
                  </div>
                </button>

                <Link
                  href="/book"
                  className="glass-surface glass-interactive group flex flex-col items-center gap-3 rounded-xl px-6 py-5 sm:py-6 text-gold-light touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
                  style={glass.gold as React.CSSProperties}
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/35 text-gold">
                    <ArrowRight size={17} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-gold font-display">
                      {t.menu.bookBtn}
                    </div>
                    <div className="text-[11px] mt-0.5 text-cream/70">
                      {t.menu.bookSubtext}
                    </div>
                  </div>
                </Link>
              </div>

              <div className="text-center text-cream/80 text-xs flex flex-col sm:flex-row items-center justify-center gap-2">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} className="text-gold" />
                  {t.addressInfo.timings}
                </span>
                <span className="hidden sm:inline mx-2 text-gold/40">|</span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-gold" />
                  Nizampet, Khammam, Telangana
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
