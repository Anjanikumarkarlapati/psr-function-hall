'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';
import { CATEGORIES, REVIEWS, ADDRESS } from '@/lib/data';
import { glass } from '@/styles/glass';
import { GlassCard } from '@/components/GlassCard';
import { GoldRule } from '@/components/GoldRule';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { useTranslation } from '@/lib/i18n';

const VideoGallery = dynamic(() => import('@/components/VideoGallery').then(m => ({ default: m.VideoGallery })), { ssr: false });
const MapSection = dynamic(() => import('@/components/MapSection').then(m => ({ default: m.MapSection })), { ssr: false });

const HALL_BG = '/images/hall-bg.jpg';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-3 sm:px-4 py-16 sm:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
          style={{ backgroundImage: `url(${HALL_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

        <GlassCard
          variant="dark"
          className="relative z-10 text-center px-4 sm:px-10 py-8 sm:py-12 max-w-2xl w-full"
        >
          <div className="w-12 h-[1px] bg-gold-light mx-auto mb-5 sm:mb-6" />
          <p className="text-gold-light/80 text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.65em] uppercase mb-3 sm:mb-4">
            {t.home.heroWelcome}
          </p>
          <h1 className="text-[30px] sm:text-[56px] md:text-7xl text-white font-light leading-[0.95] mb-1 font-display tracking-wide">
            Pasumarthi
          </h1>
          <h2 className="text-[28px] sm:text-[56px] md:text-7xl text-gold-light font-semibold leading-[0.95] mb-5 sm:mb-6 font-display tracking-wide">
            {t.home.heroBanquetHall}
          </h2>
          <GoldRule />
          <p className="text-white/50 text-[12px] sm:text-[15px] mt-4 sm:mt-5 mb-6 sm:mb-9 leading-relaxed font-body px-2 sm:px-0">
            {t.home.heroTagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="w-full sm:w-auto px-7 sm:px-9 py-4 sm:py-3.5 bg-gold-light text-dark font-bold tracking-widest text-[11px] uppercase hover:bg-gold-bright transition-colors text-center touch-manipulation"
            >
              {t.home.heroBookBtn}
            </Link>
            <Link
              href="/menu"
              className="w-full sm:w-auto px-7 sm:px-9 py-4 sm:py-3.5 text-gold-light text-[11px] tracking-widest uppercase transition-all text-center touch-manipulation"
              style={glass.silver as React.CSSProperties}
            >
              {t.home.heroMenuBtn}
            </Link>
          </div>
          <div className="w-12 h-[1px] bg-gold-light/30 mx-auto mt-6 sm:mt-8" />
        </GlassCard>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-6 sm:h-10 bg-gold-light" />
          <span className="text-gold-light text-[8px] sm:text-[9px] tracking-[0.5em] uppercase">
            {t.home.scroll}
          </span>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────── */}
      <div
        className="py-3 overflow-hidden"
        style={{
          background:
            'linear-gradient(90deg, #b8903a, #d4aa4c, #e8c870, #d4aa4c, #b8903a)',
        }}
      >
        <div className="flex gap-4 sm:gap-10 text-dark text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.28em] uppercase font-bold whitespace-nowrap justify-center flex-wrap px-3 sm:px-4">
          {t.home.marquee.map((text, i) => (
            <span key={i} className="flex items-center gap-2 sm:gap-3">
              <span className="inline-block w-1 h-1 rounded-full bg-dark/35" />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ── About Section ────────────────────────────────────────── */}
      <section className="relative py-14 sm:py-28 px-3 sm:px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
          style={{ backgroundImage: `url(${HALL_BG})` }}
        />
        <div className="absolute inset-0 bg-black/82" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left — text + stats */}
          <div>
            <GlassCard
              variant="gold"
              className="inline-block text-gold text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-5 sm:mb-6"
            >
              {t.home.aboutLabel}
            </GlassCard>
            <h2 className="text-[24px] sm:text-[38px] md:text-5xl text-white font-light leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-7 font-display">
              {t.home.aboutHeading1}
              <br />
              <span className="text-gold font-semibold italic">
                {t.home.aboutHeading2}
              </span>
              <br />
              {t.home.aboutHeading3}
            </h2>
            <div className="space-y-3 text-silver leading-relaxed text-[13px] sm:text-[15px] mb-6 sm:mb-10">
              <p>{t.home.aboutDesc1}</p>
              <p>{t.home.aboutDesc2}</p>
            </div>

            {/* Glass stat cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {t.home.stats.map((s) => (
                <GlassCard
                  key={s.label}
                  variant="dark"
                  className="p-2.5 sm:p-5 text-center"
                >
                  <div className="text-[20px] sm:text-[32px] text-gold font-semibold leading-none mb-1 font-display">
                    {s.number}
                  </div>
                  <div className="text-silver text-[8px] sm:text-[10px] tracking-wide leading-snug">
                    {s.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="space-y-2.5 sm:space-y-3 md:pt-[70px]">
            {t.home.features.map((f, i) => (
              <GlassCard
                key={i}
                variant="dark"
                className="p-4 sm:p-5 flex gap-3 sm:gap-4 items-start"
              >
                <div className="w-[2px] h-8 bg-gold/50 shrink-0 mt-1" />
                <div>
                  <div className="text-white/85 text-[14px] sm:text-[15px] font-medium mb-1 font-display">
                    {f.title}
                  </div>
                  <div className="text-silver text-[12px] sm:text-[13px] leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Gallery ────────────────────────────────────── */}
      <VideoGallery />

      {/* ── Find Us (Map Section) ────────────────────────────────── */}
      <MapSection />

      {/* ── Events Preview ───────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-3 sm:px-4 bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          {/* Glass heading */}
          <div className="text-center mb-8 sm:mb-16">
            <GlassCard
              variant="dark"
              className="inline-block px-5 sm:px-10 py-5 sm:py-8 mb-4"
            >
              <span className="block text-gold text-[9px] tracking-[0.48em] uppercase mb-3">
                {t.home.eventsLabel}
              </span>
              <h2 className="text-[22px] sm:text-[34px] md:text-4xl text-white font-light leading-tight font-display">
                {t.home.eventsHeading1}
                <br />
                <span className="text-gold font-semibold italic">
                  {t.home.eventsHeading2}
                </span>
              </h2>
              <GoldRule />
              <p className="text-silver text-xs sm:text-sm mt-3 max-w-sm leading-relaxed">
                {t.home.eventsSubtitle}
              </p>
            </GlassCard>
          </div>

          {/* Featured row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
            <Link
              href={`/events/${CATEGORIES[0].id}`}
              className="group relative col-span-1 sm:col-span-2 lg:col-span-2 overflow-hidden bg-dark-card h-[220px] sm:h-[280px]"
            >
              {CATEGORIES[0].cover && (
                <Image
                  src={CATEGORIES[0].cover}
                  alt={CATEGORIES[0].name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-left">
                <span
                  className="inline-block text-gold text-[9px] tracking-[0.38em] uppercase px-2.5 py-1 mb-2 sm:mb-3"
                  style={glass.chip as React.CSSProperties}
                >
                  {t.events.categories[CATEGORIES[0].id]?.name || CATEGORIES[0].name}
                </span>
                <h3 className="text-white text-lg sm:text-2xl font-light leading-snug mb-2 sm:mb-3 font-display">
                  {t.events.categories[CATEGORIES[0].id]?.title || CATEGORIES[0].title}
                </h3>
                <div className="flex items-center gap-2 text-gold sm:text-gold/0 sm:group-hover:text-gold transition-all duration-300">
                  <span className="text-[11px] tracking-widest uppercase">
                    {t.home.viewGallery}
                  </span>
                  <ArrowRight size={12} />
                </div>
              </div>
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-500" />
            </Link>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {CATEGORIES.slice(1, 4).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/events/${cat.id}`}
                  className="group relative overflow-hidden bg-dark-card h-[180px] sm:h-[280px]"
                >
                  {cat.cover && (
                    <Image
                      src={cat.cover}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-left">
                    <span
                      className="inline-block text-gold text-[8px] sm:text-[9px] tracking-[0.35em] uppercase px-2 py-0.5 mb-1.5 sm:mb-2"
                      style={glass.chip as React.CSSProperties}
                    >
                      {t.events.categories[cat.id]?.name || cat.name}
                    </span>
                    <h3 className="text-white text-sm sm:text-base font-light leading-snug mb-1.5 sm:mb-2.5 font-display">
                      {t.events.categories[cat.id]?.title || cat.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gold sm:text-gold/0 sm:group-hover:text-gold transition-all duration-300">
                      <span className="text-[10px] tracking-widest uppercase">
                        {t.home.viewGallery}
                      </span>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/[0.22] transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {CATEGORIES.slice(4).map((cat) => (
              <Link
                key={cat.id}
                href={`/events/${cat.id}`}
                className="group relative overflow-hidden bg-dark-card h-[130px] sm:h-[160px]"
              >
                {cat.cover && (
                  <Image
                    src={cat.cover}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-left">
                  <div className="text-white/55 text-[10px] leading-snug group-hover:text-gold/80 transition-colors duration-300">
                    {t.events.categories[cat.id]?.name || cat.name}
                  </div>
                  <div className="mt-1 sm:mt-1.5 text-gold/0 group-hover:text-gold/70 transition-all duration-300">
                    <ArrowRight size={10} />
                  </div>
                </div>
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/[0.18] transition-all duration-500" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 text-gold text-[11px] tracking-[0.3em] uppercase hover:border-gold/60 transition-all touch-manipulation"
              style={glass.gold as React.CSSProperties}
            >
              {t.home.exploreAll} <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 bg-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <GlassCard
              variant="gold"
              className="inline-block text-gold text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-5"
            >
              {t.home.reviewsLabel}
            </GlassCard>
            <h2 className="text-[26px] sm:text-[34px] md:text-4xl text-cream font-light mb-3 font-display">
              {t.home.reviewsHeading}{' '}
              <span className="text-gold font-semibold italic">
                {t.home.reviewsSubheading}
              </span>
            </h2>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={13}
                  className="text-gold"
                  fill="#c9a84c"
                />
              ))}
              <span className="text-silver text-xs ml-2.5">
                4.8 / 5 · Google & JustDial
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <GlassCard
                key={i}
                variant="dark"
                className="p-7 flex flex-col gap-4 hover:border-gold/35 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-white/85 text-sm font-medium font-display">
                      {r.name}
                    </div>
                    <div className="text-gold/60 text-xs mt-0.5 tracking-wide">
                      {r.event}
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 shrink-0 tracking-wider uppercase text-gold/55 border border-gold/[0.22]">
                    {r.source}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={11}
                      className="text-gold"
                      fill="#c9a84c"
                    />
                  ))}
                  {Array.from({ length: 5 - r.rating }).map((_, j) => (
                    <Star key={`e${j}`} size={11} className="text-gold/20" />
                  ))}
                </div>
                <p className="text-silver text-sm leading-relaxed flex-1 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="text-white/20 text-xs">{r.date}</div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-10 text-center flex items-center justify-center gap-6">
            <a
              href={ADDRESS.gmaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm hover:underline flex items-center gap-1.5"
            >
              <ExternalLink size={13} /> {t.map.openInGoogleMaps}
            </a>
            <a
              href={ADDRESS.justdial}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm hover:underline flex items-center gap-1.5"
            >
              <ExternalLink size={13} /> {t.common.justdialListing}
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
          style={{ backgroundImage: `url(${HALL_BG})` }}
        />
        <div className="absolute inset-0 bg-black/72" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              'radial-gradient(ellipse at center, #d4aa4c 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-xl mx-auto text-center">
          <GlassCard variant="dark" className="px-5 sm:px-10 py-10 sm:py-12 mx-2 sm:mx-4">
            <div className="w-10 h-[1px] bg-gold/50 mx-auto mb-6" />
            <p className="text-gold/70 text-[9px] tracking-[0.5em] uppercase mb-4">
              {t.home.ctaLabel}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-light mb-2 font-display">
              {t.home.ctaHeading1}
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-gold font-semibold italic mb-6 font-display">
              {t.home.ctaHeading2}
            </h2>
            <p className="text-silver text-[14px] sm:text-[15px] mb-8 sm:mb-10 leading-relaxed">
              {t.home.ctaDesc}
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-gold text-dark font-bold tracking-widest text-[11px] uppercase hover:bg-gold-bright transition-colors"
            >
              <WhatsAppIcon size={16} /> {t.home.ctaBtn}
            </Link>
            <div className="w-10 h-[1px] bg-gold/30 mx-auto mt-8" />
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
