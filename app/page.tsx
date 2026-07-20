'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';
import { CATEGORIES, REVIEWS, ADDRESS } from '@/lib/data';
import { glass } from '@/styles/glass';
import { GlassCard } from '@/components/GlassCard';
import { GoldRule } from '@/components/GoldRule';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { MapSection } from '@/components/MapSection';
import { VideoGallery } from '@/components/VideoGallery';
import { Lightbox } from '@/components/Lightbox';
import { BirthdayOfferBanner } from '@/components/BirthdayOfferBanner';
import { useTranslation } from '@/lib/i18n';

// Flat list of all category images for the lightbox
const ALL_CATEGORY_IMAGES = CATEGORIES.flatMap((c) => c.images);

const HALL_BG = '/images/hall-bg.png';

export default function HomePage() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Opens lightbox at the first image of the clicked category
  function openCategory(categoryId: string) {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return;
    const firstImage = cat.images[0];
    const idx = ALL_CATEGORY_IMAGES.indexOf(firstImage);
    setLightboxIndex(idx >= 0 ? idx : 0);
  }

  return (
    <div className="relative">
      {/* Optimized once by Next.js, then reused behind all transparent sections. */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={HALL_BG}
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>
      <div className="fixed inset-0 -z-10 bg-black/75" />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-3 sm:px-5 lg:px-8 py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/75" />
        <div className="absolute left-1/2 top-[42%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[110px] sm:h-[34rem] sm:w-[34rem]" />

        <GlassCard
          variant="dark"
          className="relative z-10 w-full max-w-[calc(100vw-1.5rem)] sm:max-w-2xl overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] px-4 sm:px-10 lg:px-14 py-10 sm:py-14 text-center"
        >
          {/* WELCOME TO */}
          <p className="font-body text-gold-light text-[11px] sm:text-[13px] tracking-[0.3em] sm:tracking-[0.45em] uppercase mb-5 sm:mb-7">
            {t.home.heroWelcome}
          </p>

          {/* PSR Crest */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <Image
              src="/images/brand-mark.svg"
              alt="PSR Crest"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20 opacity-90"
            />
          </div>

          {/* PASUMARTHI — Cinzel Decorative */}
          <h1 className="font-display text-[34px] sm:text-[56px] md:text-[68px] font-bold leading-[1.05] tracking-wide text-cream drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] uppercase">
            Pasumarthi
          </h1>

          {/* BANQUET HALL — Montserrat */}
          <p className="font-body text-[16px] sm:text-[22px] md:text-[26px] font-light leading-[1.3] tracking-[0.25em] sm:tracking-[0.35em] text-cream/90 mt-1 sm:mt-2 uppercase">
            {t.home.heroBanquetHall}
          </p>

          <GoldRule />

          {/* Tagline */}
          <p className="text-cream/65 text-[13px] sm:text-[15px] mt-5 sm:mt-6 mb-7 sm:mb-10 leading-relaxed font-body italic px-4 sm:px-6 max-w-md mx-auto">
            {t.home.heroTagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-3.5 bg-gold-light text-dark font-bold tracking-[0.2em] text-[11px] sm:text-[12px] uppercase rounded-sm hover:bg-gold-bright active:scale-[0.98] transition-all text-center touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
            >
              {t.home.heroBookBtn}
            </Link>
            <Link
              href="/menu"
              className="glass-surface glass-interactive w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-3.5 text-cream/90 text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-center border border-cream/40 hover:border-cream/60 rounded-sm touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
            >
              {t.home.heroMenuBtn}
            </Link>
          </div>

          {/* Amenities & Parking */}
          <div className="mt-6 sm:mt-8 w-full max-w-sm mx-auto sm:max-w-none">
            {/* Amenity badges row */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.05] px-3 py-1.5 sm:px-4 sm:py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gold-light" aria-hidden="true">
                  <rect x="1" y="3" width="22" height="18" rx="2" />
                  <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                </svg>
                <span className="font-body text-[10px] sm:text-[11px] text-cream/80 tracking-wider uppercase whitespace-nowrap">
                  Free Parking
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.05] px-3 py-1.5 sm:px-4 sm:py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gold-light" aria-hidden="true">
                  <path d="M8 16a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4" />
                  <path d="M5 20v-4" />
                  <path d="M19 20v-4" />
                  <path d="M12 20v-8" />
                  <path d="M9 4h6" />
                  <path d="M12 4v4" />
                </svg>
                <span className="font-body text-[10px] sm:text-[11px] text-cream/80 tracking-wider uppercase whitespace-nowrap">
                  Fully AC
                </span>
              </div>
            </div>

            {/* Parking floor cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-gold/[0.04] px-3 py-3 sm:px-4 sm:py-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gold-light mb-1.5 sm:mb-2" aria-hidden="true">
                  <path d="M5 17h14M5 17v-5l1-4h12l1 4v5M5 17H3m16 0h2M7 14h.01M17 14h.01M9 9h6" />
                </svg>
                <span className="font-body text-[10px] sm:text-[11px] text-cream/60 tracking-wide uppercase">Cars</span>
                <span className="font-body text-[14px] sm:text-[16px] text-gold-light font-bold mt-0.5 tabular-nums">Floor -2</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-gold/20 bg-gold/[0.04] px-3 py-3 sm:px-4 sm:py-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gold-light mb-1.5 sm:mb-2" aria-hidden="true">
                  <path d="M5 18v-1a4 4 0 0 1 4-4h0" />
                  <circle cx="9" cy="18" r="1" />
                  <circle cx="17" cy="18" r="1" />
                  <path d="M14 18h-4M9 13V9l3-3 5 3v4" />
                </svg>
                <span className="font-body text-[10px] sm:text-[11px] text-cream/60 tracking-wide uppercase">Bikes</span>
                <span className="font-body text-[14px] sm:text-[16px] text-gold-light font-bold mt-0.5 tabular-nums">Floor -1</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
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
        <div className="flex gap-4 sm:gap-10 text-dark text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.28em] uppercase font-bold whitespace-nowrap animate-marquee sm:animate-none sm:justify-center sm:flex-wrap px-3 sm:px-4">
          {t.home.marquee.map((text, i) => (
            <span key={i} className="flex items-center gap-2 sm:gap-3">
              <span className="inline-block w-1 h-1 rounded-full bg-dark/35" />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ── About Section ────────────────────────────────────────── */}
      <section className="defer-render relative py-14 sm:py-24 lg:py-28 px-3 sm:px-5 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(212,170,76,0.08),transparent_34%)]" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left — text + stats */}
          <div>
            <GlassCard
              variant="gold"
              className="inline-block rounded-lg text-gold-light text-[10px] tracking-[0.32em] sm:tracking-[0.42em] uppercase px-3 py-1.5 mb-5 sm:mb-6"
            >
              {t.home.aboutLabel}
            </GlassCard>
            <h2 className="text-[24px] sm:text-[38px] md:text-5xl text-cream font-light leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-7 font-display text-balance">
              {t.home.aboutHeading1}
              <br />
              <span className="text-gold font-semibold italic">
                {t.home.aboutHeading2}
              </span>
              <br />
              {t.home.aboutHeading3}
            </h2>
            <div className="max-w-[62ch] space-y-3 text-silver leading-relaxed text-[14px] sm:text-[15px] mb-6 sm:mb-10">
              <p>{t.home.aboutDesc1}</p>
              <p>{t.home.aboutDesc2}</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {t.home.stats.map((s) => (
                <div
                  key={s.label}
                  className="border border-gold/25 rounded-lg p-2.5 sm:p-5 text-center bg-dark-card"
                >
                  <div className="text-[20px] sm:text-[32px] text-gold-light font-semibold leading-none mb-1.5 font-display tabular-nums">
                    {s.number}
                  </div>
                  <div className="text-silver text-[9px] sm:text-[10px] tracking-wide leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="space-y-2.5 sm:space-y-3 md:pt-[70px]">
            {t.home.features.map((f, i) => (
              <div
                key={i}
                className="border border-gold/15 rounded-lg p-4 sm:p-5 flex gap-3 sm:gap-4 items-start bg-dark-card"
              >
                <div className="w-[2px] self-stretch rounded-full bg-gold shrink-0" />
                <div>
                  <div className="text-gold-light text-[15px] sm:text-[16px] font-semibold mb-1 font-display">
                    {f.title}
                  </div>
                  <div className="text-silver text-[13px] leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Gallery ────────────────────────────────────── */}
      <VideoGallery />

      {/* ── Find Us (Map Section) ────────────────────────────────── */}
      <MapSection />

      {/* ── Events Preview ───────────────────────────────────────── */}
      <section className="defer-render relative overflow-hidden py-14 sm:py-24 px-3 sm:px-5 lg:px-8 bg-black/65">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(212,170,76,0.08),transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto">
          {/* Glass heading */}
          <div className="text-center mb-8 sm:mb-14">
            <GlassCard
              variant="dark"
              className="inline-block overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] px-5 sm:px-10 py-5 sm:py-8 mb-4"
            >
              <span className="block text-gold-light text-[10px] tracking-[0.32em] sm:tracking-[0.42em] uppercase mb-3">
                {t.home.eventsLabel}
              </span>
              <h2 className="text-[24px] sm:text-[34px] md:text-4xl text-cream font-light leading-tight font-display text-balance">
                {t.home.eventsHeading1}
                <br />
                <span className="text-gold-light font-semibold italic">
                  {t.home.eventsHeading2}
                </span>
              </h2>
              <GoldRule />
              <p className="text-cream/70 text-[13px] sm:text-sm mt-3 max-w-sm leading-relaxed">
                {t.home.eventsSubtitle}
              </p>
            </GlassCard>
          </div>

          {/* Featured row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
            <button
              type="button"
              onClick={() => openCategory(CATEGORIES[0].id)}
              className="group relative col-span-1 sm:col-span-2 lg:col-span-2 w-full overflow-hidden bg-dark-card h-[200px] sm:h-[280px] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold text-left touch-manipulation"
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
                  className="glass-surface inline-block rounded-md text-gold-light text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 mb-2 sm:mb-3"
                  style={glass.chip as React.CSSProperties}
                >
                  {t.events.categories[CATEGORIES[0].id]?.name || CATEGORIES[0].name}
                </span>
                <h3 className="text-gold-light text-lg sm:text-2xl font-light leading-snug mb-2 sm:mb-3 font-display">
                  {t.events.categories[CATEGORIES[0].id]?.title || CATEGORIES[0].title}
                </h3>
                <div className="flex items-center gap-2 text-gold sm:text-gold/0 sm:group-hover:text-gold transition-all duration-300">
                  <span className="text-[11px] tracking-widest uppercase">
                    {t.home.viewGallery}
                  </span>
                  <ArrowRight size={12} />
                </div>
              </div>
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-500 rounded-xl" />
            </button>

            <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {CATEGORIES.slice(1, 4).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => openCategory(cat.id)}
                  className="group relative w-full overflow-hidden bg-dark-card h-[160px] sm:h-[280px] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold text-left touch-manipulation"
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
                      className="glass-surface inline-block rounded-md text-gold-light text-[9px] tracking-[0.28em] uppercase px-2 py-0.5 mb-1.5 sm:mb-2"
                      style={glass.chip as React.CSSProperties}
                    >
                      {t.events.categories[cat.id]?.name || cat.name}
                    </span>
                    <h3 className="text-gold-light text-sm sm:text-base font-light leading-snug mb-1.5 sm:mb-2.5 font-display">
                      {t.events.categories[cat.id]?.title || cat.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gold sm:text-gold/0 sm:group-hover:text-gold transition-all duration-300">
                      <span className="text-[10px] tracking-widest uppercase">
                        {t.home.viewGallery}
                      </span>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/[0.22] transition-all duration-500 rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {CATEGORIES.slice(4).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => openCategory(cat.id)}
                className="group relative w-full overflow-hidden bg-dark-card h-[130px] sm:h-[160px] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold text-left touch-manipulation"
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
                  <div className="text-cream/70 text-[10px] leading-snug group-hover:text-gold/80 transition-colors duration-300">
                    {t.events.categories[cat.id]?.name || cat.name}
                  </div>
                  <div className="mt-1 sm:mt-1.5 text-gold/70 sm:text-gold/0 sm:group-hover:text-gold/70 transition-all duration-300">
                    <ArrowRight size={10} />
                  </div>
                </div>
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/[0.18] transition-all duration-500 rounded-xl" />
              </button>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/events"
              className="glass-surface glass-interactive inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 text-gold-light font-semibold text-[11px] tracking-[0.24em] sm:tracking-[0.3em] uppercase touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
              style={glass.gold as React.CSSProperties}
            >
              {t.home.exploreAll} <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="defer-render relative overflow-hidden py-16 sm:py-24 px-3 sm:px-5 lg:px-8 bg-black/72">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(212,170,76,0.06),transparent_32%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <GlassCard
              variant="gold"
              className="inline-block rounded-lg text-gold-light text-[10px] tracking-[0.32em] sm:tracking-[0.42em] uppercase px-3 py-1.5 mb-5"
            >
              {t.home.reviewsLabel}
            </GlassCard>
            <h2 className="text-[24px] sm:text-[34px] md:text-4xl text-cream font-light mb-3 font-display text-balance">
              {t.home.reviewsHeading}{' '}
              <span className="text-gold-light font-semibold italic">
                {t.home.reviewsSubheading}
              </span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={13}
                  className="text-gold"
                  fill="#c9a84c"
                />
              ))}
              <span className="text-cream/[0.65] text-xs ml-2.5">
                4.8 / 5 · Google & JustDial
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {REVIEWS.map((r, i) => (
              <GlassCard
                key={i}
                variant="dark"
                className="glass-interactive overflow-hidden rounded-2xl p-5 sm:p-7 flex flex-col gap-3 sm:gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-gold-light text-sm font-medium font-display">
                      {r.name}
                    </div>
                    <div className="text-gold-light/80 text-xs mt-0.5 tracking-wide">
                      {r.event}
                    </div>
                  </div>
                  <span className="rounded-md text-[9px] px-2 py-0.5 shrink-0 tracking-wider uppercase text-gold-light/80 border border-gold/[0.28] bg-gold/[0.06]">
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
                <p className="text-cream/75 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="text-cream/[0.45] text-xs">{r.date}</div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
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
      <section className="relative py-16 sm:py-24 lg:py-28 px-3 sm:px-5 overflow-hidden">        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, #d4aa4c 0%, transparent 66%)',
          }}
        />
        <div className="relative max-w-xl mx-auto text-center">
          <GlassCard variant="dark" className="overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] px-5 sm:px-10 py-9 sm:py-12">
            <div className="w-10 h-[1px] bg-gold/60 mx-auto mb-6" />
            <p className="text-gold-light text-[10px] tracking-[0.32em] sm:tracking-[0.44em] uppercase mb-4">
              {t.home.ctaLabel}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl text-cream font-light mb-2 font-display">
              {t.home.ctaHeading1}
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl text-gold-light font-semibold italic mb-5 sm:mb-6 font-display">
              {t.home.ctaHeading2}
            </h2>
            <p className="text-cream/75 text-[14px] sm:text-[15px] mb-7 sm:mb-10 leading-relaxed px-2 sm:px-0">
              {t.home.ctaDesc}
            </p>
            <Link
              href="/book"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-gold text-dark font-bold tracking-widest text-[11px] uppercase hover:bg-gold-bright active:scale-[0.98] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
            >
              <WhatsAppIcon size={16} /> {t.home.ctaBtn}
            </Link>
            <div className="w-10 h-[1px] bg-gold/40 mx-auto mt-8" />
          </GlassCard>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={ALL_CATEGORY_IMAGES}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* ── Birthday Offer Notification ──────────────────────────── */}
      <BirthdayOfferBanner />
    </div>
  );
}
