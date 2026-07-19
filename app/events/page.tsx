'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { ADVERTISEMENTS } from '@/lib/data';
import { GoldRule } from '@/components/GoldRule';
import { GlassCard } from '@/components/GlassCard';
import { PsrWatermark } from '@/components/WatermarkImage';
import { Lightbox } from '@/components/Lightbox';
import { VideoPreviewTile } from '@/components/VideoPreviewTile';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { useTranslation } from '@/lib/i18n';
import { glass } from '@/styles/glass';

type LocalizedCopy = {
  en: string;
  te: string;
};

type MediaSection = {
  id: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
  images: string[];
};

// Visual groupings based on what each photograph actually shows.
const MEDIA_SECTIONS: MediaSection[] = [
  {
    id: 'weddings-receptions',
    title: { en: 'Weddings & Receptions', te: 'వివాహాలు & రిసెప్షన్లు' },
    description: {
      en: 'Grand floral arches, ornate seating and full-stage décor for wedding celebrations.',
      te: 'వివాహ వేడుకల కోసం భారీ పూల ఆర్చ్‌లు, అలంకార సీటింగ్ మరియు పూర్తి స్టేజ్ డెకర్.',
    },
    images: [
      '/images/gallery/wedding-stage-floral-arch.jpg',
      '/images/gallery/wedding-colorful-garland-circle.jpg',
      '/images/gallery/wedding-colorful-traditional.jpg',
      '/images/gallery/wedding-golden-ornate-stage.jpg',
      '/images/gallery/wedding-golden-sofa-red.jpg',
      '/images/gallery/wedding-hanging-wisteria.jpg',
      '/images/gallery/wedding-peach-elegant.jpg',
      '/images/gallery/wedding-pink-drapes-stage.jpg',
      '/images/gallery/wedding-pink-gold-arch.jpg',
      '/images/gallery/wedding-premium-gold-floral.jpg',
      '/images/gallery/wedding-white-green-elegant.jpg',
    ],
  },
  {
    id: 'engagements',
    title: { en: 'Engagements & Couple Celebrations', te: 'నిశ్చితార్థాలు & జంట వేడుకలు' },
    description: {
      en: 'Romantic, contemporary and elegant backdrops for engagements, ring ceremonies and anniversaries.',
      te: 'నిశ్చితార్థాలు, రింగ్ వేడుకలు మరియు వార్షికోత్సవాల కోసం అందమైన ఆధునిక బ్యాక్‌డ్రాప్‌లు.',
    },
    images: [
      '/images/gallery/wedding-better-together.jpg',
      '/images/gallery/wedding-double-gold-frame.jpg',
      '/images/gallery/wedding-green-arch-gold.jpg',
      '/images/gallery/wedding-modern-minimalist.jpg',
      '/images/gallery/wedding-white-curtain-floral.jpg',
      '/images/gallery/wedding-white-floral-arch.jpg',
      '/images/gallery/wedding-white-green-candles.jpg',
    ],
  },
  {
    id: 'baby-naming',
    title: { en: 'Baby Shower & Naming Ceremonies', te: 'సీమంతం & నామకరణ వేడుకలు' },
    description: {
      en: 'Mother-and-baby themes, decorated cradles, balloon installations and ceremonial flower paths.',
      te: 'తల్లి-బిడ్డ థీమ్‌లు, అలంకరించిన ఊయలలు, బెలూన్ డెకర్ మరియు పూల వేడుక మార్గాలు.',
    },
    images: [
      '/images/gallery/babyshower-ceremony.jpg',
      '/images/gallery/babyshower-flower-cart.jpg',
      '/images/gallery/babyshower-rangoli-balloons.jpg',
      '/images/gallery/housewarming-gold-drapes.jpg',
      '/images/gallery/naming-ceremony-colorful.jpg',
      '/images/gallery/naming-ceremony-rangoli.jpg',
    ],
  },
  {
    id: 'birthdays',
    title: { en: 'Birthday Celebrations', te: 'పుట్టినరోజు వేడుకలు' },
    description: {
      en: 'Character themes, photo backdrops and balloon styling created for milestone birthdays.',
      te: 'ప్రత్యేక పుట్టినరోజుల కోసం క్యారెక్టర్ థీమ్‌లు, ఫోటో బ్యాక్‌డ్రాప్‌లు మరియు బెలూన్ అలంకరణలు.',
    },
    images: ['/images/gallery/birthday-boss-baby-theme.jpg'],
  },
  {
    id: 'traditional',
    title: { en: 'Traditional & Housewarming Ceremonies', te: 'సాంప్రదాయ & గృహప్రవేశ వేడుకలు' },
    description: {
      en: 'Deity displays, banana-leaf styling, marigold florals and ceremonial mandap arrangements.',
      te: 'దేవతా అలంకరణలు, అరటి ఆకుల డెకర్, బంతిపూల అలంకరణలు మరియు సాంప్రదాయ మండపాలు.',
    },
    images: [
      '/images/gallery/housewarming-orange-floral.jpg',
      '/images/gallery/housewarming-traditional-golden.jpg',
      '/images/gallery/wedding-green-yellow-stage.jpg',
      '/images/gallery/wedding-traditional-mandap.jpg',
      '/images/gallery/wedding-traditional-mandap-closeup.jpg',
    ],
  },
  {
    id: 'venue',
    title: { en: 'Hall & Venue', te: 'హాల్ & వేదిక' },
    description: {
      en: 'A full view of our fully air-conditioned (AC) hall, guest seating, aisle and stage.',
      te: 'మా పూర్తి ఎయిర్ కండిషన్డ్ (AC) హాల్, అతిథుల సీటింగ్, నడక మార్గం మరియు స్టేజ్ యొక్క పూర్తి దృశ్యం.',
    },
    images: ['/images/gallery/wedding-hall-seating.jpg'],
  },
];

const ALL_IMAGES = MEDIA_SECTIONS.flatMap((section) => section.images);

const VIDEOS = [
  { id: 1, src: '/videos/hall-tour-1.mp4', label: 'Hall Interior' },
  { id: 2, src: '/videos/hall-tour-2.mp4', label: 'Grand Setup' },
  { id: 3, src: '/videos/hall-tour-3.mp4', label: 'Event Decoration' },
  { id: 4, src: '/videos/hall-tour-4.mp4', label: 'Venue Overview' },
  { id: 5, src: '/videos/hall-tour-5.mp4', label: 'Celebration Moments' },
];

const QUOTES = [
  {
    en: 'Every celebration deserves a stage as grand as the love behind it.',
    te: 'ప్రతి వేడుక దాని వెనుక ఉన్న ప్రేమంత గొప్ప వేదికను అర్హిస్తుంది.',
  },
  {
    en: 'Where dreams meet elegance, memories are born.',
    te: 'కలలు సొగసును కలిసే చోట, జ్ఞాపకాలు పుడతాయి.',
  },
  {
    en: 'A perfect venue transforms moments into timeless treasures.',
    te: 'ఒక పరిపూర్ణ వేదిక క్షణాలను కాలాతీత నిధులుగా మారుస్తుంది.',
  },
  {
    en: 'The beauty of togetherness shines brightest in the right setting.',
    te: 'కలిసి ఉండటం యొక్క అందం సరైన వాతావరణంలో ప్రకాశవంతంగా మెరుస్తుంది.',
  },
  {
    en: 'Every flower, every light — placed with love for your special day.',
    te: 'ప్రతి పువ్వు, ప్రతి దీపం — మీ ప్రత్యేక రోజు కోసం ప్రేమతో అమర్చబడింది.',
  },
  {
    en: 'Celebrations are the poetry of life — let us write yours beautifully.',
    te: 'వేడుకలు జీవితపు కవిత్వం — మీది అందంగా రాయనివ్వండి.',
  },
  {
    en: 'In every decoration, there is a story waiting to unfold.',
    te: 'ప్రతి అలంకరణలో, విప్పుకోవడానికి ఎదురుచూస్తున్న ఒక కథ ఉంది.',
  },
  {
    en: 'Your joy is our purpose, your smile is our reward.',
    te: 'మీ ఆనందమే మా లక్ష్యం, మీ చిరునవ్వే మా బహుమానం.',
  },
];

export default function EventsPage() {
  const { t, locale } = useTranslation();
  const allImages = ALL_IMAGES;
  const allLightboxImages = [...allImages, ...ADVERTISEMENTS];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    const index = allLightboxImages.indexOf(image);
    if (index !== -1) setLightboxIndex(index);
  };
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="relative">
      {/* Hall background — same fixed layer as homepage */}
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
      <div className="fixed inset-0 -z-10 bg-black/75" />

      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section className="relative min-h-[50svh] flex items-center justify-center overflow-hidden px-3 sm:px-5 lg:px-8 py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/75" />
        <div className="absolute left-1/2 top-[42%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[110px] sm:h-[28rem] sm:w-[28rem]" />

        <GlassCard
          variant="dark"
          className="relative z-10 w-full max-w-[calc(100vw-1.5rem)] sm:max-w-2xl overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] px-5 sm:px-10 lg:px-14 py-8 sm:py-12 text-center"
        >
          <div className="w-12 h-[1px] bg-gold-light mx-auto mb-5 sm:mb-7" />
          <p className="text-gold-light text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4">
            {t.events.label}
          </p>
          <h1 className="font-display text-[28px] sm:text-[48px] md:text-6xl font-light leading-[1.08] tracking-tight text-cream drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)]">
            {t.events.heading}
          </h1>
          <GoldRule />
          <p className="text-cream/70 text-[13px] sm:text-[15px] mt-4 sm:mt-5 leading-relaxed font-body px-2 sm:px-0 max-w-md mx-auto">
            {t.events.subtitle}
          </p>

          {/* AC Function Hall badge */}
          <div className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-full bg-gold/[0.06]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gold-light"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/><circle cx="12" cy="12" r="4"/></svg>
            <span className="text-gold-light text-[11px] sm:text-xs tracking-[0.18em] uppercase font-semibold">
              {locale === 'te' ? 'AC ఫంక్షన్ హాల్' : 'AC Function Hall'}
            </span>
          </div>

          <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-6 sm:mt-8" />
        </GlassCard>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-6 sm:h-10 bg-gold-light" />
          <span className="text-gold-light text-[8px] sm:text-[9px] tracking-[0.5em] uppercase">
            {locale === 'te' ? 'క్రిందకు స్క్రోల్ చేయండి' : 'Scroll'}
          </span>
        </div>
      </section>

      {/* ── Section Navigation ────────────────────────────────────── */}
      <section className="relative py-8 sm:py-12 px-3 sm:px-5 lg:px-8 overflow-hidden bg-black/65">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,170,76,0.06),transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto">
          <nav
            aria-label={locale === 'te' ? 'గ్యాలరీ విభాగాలు' : 'Gallery sections'}
          >
            <div className="flex flex-wrap justify-center gap-2 px-2">
              {MEDIA_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="glass-surface glass-interactive rounded-lg px-3.5 py-2.5 text-[10px] tracking-[0.12em] text-cream/80 transition-all hover:text-gold-light sm:text-[11px]"
                  style={glass.chip as React.CSSProperties}
                >
                  {section.title[locale]} ({section.images.length})
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* ── Gallery Sections ──────────────────────────────────────── */}
      <section className="defer-render relative overflow-hidden py-14 sm:py-24 px-3 sm:px-5 lg:px-8 bg-black/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(212,170,76,0.08),transparent_34%)]" />
        <div className="relative max-w-7xl mx-auto space-y-16 sm:space-y-24">
          {MEDIA_SECTIONS.map((section, sectionIndex) => (
            <div
              id={section.id}
              key={section.id}
              className="scroll-mt-24"
              aria-labelledby={`${section.id}-heading`}
            >
              {/* Section header styled like homepage about/events sections */}
              <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <GlassCard
                    variant="gold"
                    className="inline-block rounded-lg text-gold-light text-[9px] tracking-[0.32em] sm:tracking-[0.42em] uppercase px-3 py-1.5 mb-3 sm:mb-4"
                  >
                    {locale === 'te' ? `విభాగం ${sectionIndex + 1}` : `Collection ${sectionIndex + 1}`}
                  </GlassCard>
                  <h2
                    id={`${section.id}-heading`}
                    className="font-display text-[22px] sm:text-[34px] md:text-4xl font-light text-cream leading-tight"
                  >
                    {section.title[locale]}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-silver sm:text-[14px]">
                    {section.description[locale]}
                  </p>
                </div>
                <span
                  className="glass-surface shrink-0 rounded-md px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold/90"
                  style={glass.chip as React.CSSProperties}
                >
                  {section.images.length} {locale === 'te' ? 'ఫోటోలు' : section.images.length === 1 ? 'Photo' : 'Photos'}
                </span>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                {section.images.map((img, imageIndex) => (
                  <button
                    key={img}
                    type="button"
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-dark-card text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    style={glass.dark as React.CSSProperties}
                    onClick={() => openLightbox(img)}
                    aria-label={`${section.title[locale]} ${imageIndex + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${section.title[locale]} — ${imageIndex + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <PsrWatermark />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-0 rounded-xl border border-gold/0 transition-colors duration-300 group-hover:border-gold/25" />
                  </button>
                ))}
              </div>

              {/* Divider between sections */}
              {sectionIndex < MEDIA_SECTIONS.length - 1 && (
                <div className="mt-12 sm:mt-16 flex items-center gap-4 justify-center">
                  <div className="h-[1px] w-16 bg-gold/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                  <div className="h-[1px] w-16 bg-gold/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Videos Section ────────────────────────────────────────── */}
      <section className="defer-render relative overflow-hidden py-14 sm:py-24 px-3 sm:px-5 lg:px-8 bg-dark-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(212,170,76,0.08),transparent_30%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <GlassCard
              variant="gold"
              className="inline-block rounded-lg text-gold-light text-[9px] tracking-[0.32em] sm:tracking-[0.42em] uppercase px-3 py-1.5 mb-4 sm:mb-5"
            >
              {locale === 'te' ? 'వీడియోలు' : 'Videos'}
            </GlassCard>
            <h2 className="text-[24px] sm:text-[34px] md:text-4xl text-cream font-light mb-3 font-display text-balance">
              {locale === 'te' ? 'హాల్ టూర్ &' : 'Hall Tour &'}{' '}
              <span className="text-gold-light font-semibold italic">
                {locale === 'te' ? 'ఈవెంట్ హైలైట్స్' : 'Event Highlights'}
              </span>
            </h2>
            <GoldRule />
            <p className="text-silver text-[13px] sm:text-sm mt-4 max-w-md mx-auto leading-relaxed">
              {locale === 'te'
                ? 'మా బ్యాంక్వెట్ హాల్ యొక్క అందం మరియు గొప్పతనాన్ని చూడండి'
                : 'Experience the beauty and grandeur of our banquet hall'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {VIDEOS.map((video) => (
              <VideoPreviewTile
                key={video.id}
                video={video}
                onPlay={setActiveVideo}
                className="h-[200px] sm:h-[260px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Advertisements Section ────────────────────────────────── */}
      {ADVERTISEMENTS.length > 0 && (
        <section className="defer-render relative overflow-hidden py-14 sm:py-24 px-3 sm:px-5 lg:px-8 bg-black/72">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(212,170,76,0.06),transparent_32%)]" />
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <GlassCard
                variant="gold"
                className="inline-block rounded-lg text-gold-light text-[9px] tracking-[0.32em] sm:tracking-[0.42em] uppercase px-3 py-1.5 mb-4 sm:mb-5"
              >
                {locale === 'te' ? 'ప్రకటనలు' : 'Advertisements'}
              </GlassCard>
              <h2 className="text-[24px] sm:text-[34px] md:text-4xl text-cream font-light mb-3 font-display text-balance">
                {locale === 'te' ? 'మా' : 'Our'}{' '}
                <span className="text-gold-light font-semibold italic">
                  {locale === 'te' ? 'సేవలు & ప్యాకేజీలు' : 'Services & Packages'}
                </span>
              </h2>
              <GoldRule />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {ADVERTISEMENTS.map((img, idx) => (
                <GlassCard
                  key={idx}
                  variant="dark"
                  className="glass-interactive overflow-hidden rounded-2xl cursor-pointer"
                >
                  <div
                    className="group relative"
                    onClick={() => openLightbox(img)}
                  >
                    <Image
                      src={img}
                      alt={`Advertisement ${idx + 1}`}
                      width={600}
                      height={800}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <PsrWatermark />
                    <div className="pointer-events-none absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all rounded-2xl" />
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Quotes / Inspiration Section ──────────────────────────── */}
      <section className="defer-render relative overflow-hidden py-16 sm:py-24 px-3 sm:px-5 lg:px-8 bg-black/65">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(212,170,76,0.06),transparent_36%)]" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <GlassCard
              variant="gold"
              className="inline-block rounded-lg text-gold-light text-[9px] tracking-[0.32em] sm:tracking-[0.42em] uppercase px-3 py-1.5 mb-4 sm:mb-5"
            >
              {locale === 'te' ? 'ప్రేరణ' : 'Inspiration'}
            </GlassCard>
            <h2 className="text-[24px] sm:text-[34px] md:text-4xl text-cream font-light mb-3 font-display text-balance">
              {locale === 'te' ? 'వేడుకల' : 'Words That'}{' '}
              <span className="text-gold-light font-semibold italic">
                {locale === 'te' ? 'ప్రేరణలు' : 'Inspire'}
              </span>
            </h2>
            <GoldRule />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {QUOTES.map((q, i) => (
              <GlassCard
                key={i}
                variant="dark"
                className="glass-interactive overflow-hidden rounded-2xl p-5 sm:p-8 text-center"
              >
                <div className="text-gold/50 text-2xl sm:text-3xl font-display mb-2 sm:mb-3">&ldquo;</div>
                <p className="text-cream/90 text-[13px] sm:text-[15px] leading-relaxed italic mb-3 sm:mb-4 font-display">
                  {locale === 'te' ? q.te : q.en}
                </p>
                <p className="text-cream/45 text-[10px] sm:text-xs leading-relaxed">
                  {locale === 'te' ? q.en : q.te}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-3 sm:px-5 overflow-hidden">
        <div className="absolute inset-0 bg-black/70" />
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
              {locale === 'te' ? 'బుకింగ్ చేయండి' : 'Book Your Event'}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl text-cream font-light mb-2 font-display">
              {locale === 'te' ? 'మీ వేడుకను' : 'Make Your'}
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl text-gold-light font-semibold italic mb-5 sm:mb-6 font-display">
              {locale === 'te' ? 'ప్రత్యేకంగా చేయండి' : 'Celebration Special'}
            </h2>
            <p className="text-cream/75 text-[14px] sm:text-[15px] mb-7 sm:mb-10 leading-relaxed px-2 sm:px-0">
              {locale === 'te'
                ? 'మీ ప్రత్యేక వేడుక కోసం మా AC బ్యాంక్వెట్ హాల్‌ను ఇప్పుడే బుక్ చేసుకోండి'
                : 'Reserve our fully air-conditioned premium banquet hall for your special celebration today'}
            </p>
            <Link
              href="/book"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-gold text-dark font-bold tracking-widest text-[11px] uppercase hover:bg-gold-bright active:scale-[0.98] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
            >
              <WhatsAppIcon size={16} /> {locale === 'te' ? 'ఇప్పుడు బుక్ చేయండి' : 'Book Now'}
            </Link>
            <div className="w-10 h-[1px] bg-gold/40 mx-auto mt-8" />
          </GlassCard>
        </div>
      </section>

      {/* ── Video Modal ───────────────────────────────────────────── */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white active:text-white transition-colors z-10 p-2 touch-manipulation"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          >
            <X size={28} />
          </button>
          <video
            src={activeVideo}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allLightboxImages}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
