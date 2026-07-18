'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import { ADVERTISEMENTS } from '@/lib/data';
import { GoldRule } from '@/components/GoldRule';
import { PsrWatermark } from '@/components/WatermarkImage';
import { Lightbox } from '@/components/Lightbox';
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
// Every gallery photo appears exactly once so section counts and lightbox order stay reliable.
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
      en: 'A full view of the air-conditioned hall, guest seating, aisle and stage.',
      te: 'ఎయిర్ కండిషన్డ్ హాల్, అతిథుల సీటింగ్, నడక మార్గం మరియు స్టేజ్ యొక్క పూర్తి దృశ్యం.',
    },
    images: ['/images/gallery/wedding-hall-seating.jpg'],
  },
];

const ALL_IMAGES = MEDIA_SECTIONS.flatMap((section) => section.images);

// All videos available
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

/** Video tile with lazy loading and hover-to-play */
function VideoTile({ video, onPlay }: { video: typeof VIDEOS[number]; onPlay: (src: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden cursor-pointer h-[200px] sm:h-[260px] touch-manipulation active:scale-[0.98] transition-transform rounded-xl"
      style={glass.dark as React.CSSProperties}
      onClick={() => onPlay(video.src)}
      onMouseOver={() => videoRef.current?.play()}
      onMouseOut={() => {
        const el = videoRef.current;
        if (el) { el.pause(); el.currentTime = 0; }
      }}
    >
      {isVisible && (
        <video
          ref={videoRef}
          src={video.src}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {!isVisible && (
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surface to-dark-card" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gold/20 border border-gold/40 group-hover:bg-gold/30 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
          <Play size={24} className="text-gold ml-0.5" fill="currentColor" />
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4">
        <span
          className="inline-block text-gold text-[9px] tracking-[0.35em] uppercase px-2.5 py-1 rounded-md"
          style={glass.chip as React.CSSProperties}
        >
          {video.label}
        </span>
      </div>
      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-500 rounded-xl" />
    </div>
  );
}

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
    <div className="min-h-screen bg-dark">
      <div className="pt-16 pb-12 sm:py-20 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-14">
            <p className="text-gold text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4">
              {t.events.label}
            </p>
            <h1 className="text-[26px] sm:text-[40px] md:text-5xl text-cream font-bold mb-3 sm:mb-4 font-display leading-tight">
              {t.events.heading}
            </h1>
            <GoldRule />
            <p className="text-cream/40 text-[13px] sm:text-sm mt-3 sm:mt-4 max-w-md mx-auto leading-relaxed px-4 sm:px-0">
              {t.events.subtitle}
            </p>
          </div>

          {/* Section navigation */}
          <nav
            aria-label={locale === 'te' ? 'గ్యాలరీ విభాగాలు' : 'Gallery sections'}
            className="mb-10 sm:mb-14"
          >
            <div className="flex flex-wrap justify-center gap-2 px-2">
              {MEDIA_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-lg border border-gold/20 px-3.5 py-2 text-[10px] tracking-[0.12em] text-cream/60 transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold sm:text-[11px]"
                >
                  {section.title[locale]} ({section.images.length})
                </a>
              ))}
            </div>
          </nav>

          {/* Galleries organized by the visible event or setup in each photo */}
          <div className="space-y-14 sm:space-y-20">
            {MEDIA_SECTIONS.map((section, sectionIndex) => (
              <section
                id={section.id}
                key={section.id}
                className="scroll-mt-24"
                aria-labelledby={`${section.id}-heading`}
              >
                <div className="mb-5 flex flex-col gap-3 border-b border-gold/10 pb-5 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.38em] text-gold/70">
                      {locale === 'te' ? `విభాగం ${sectionIndex + 1}` : `Collection ${sectionIndex + 1}`}
                    </p>
                    <h2
                      id={`${section.id}-heading`}
                      className="font-display text-xl font-semibold text-cream sm:text-3xl"
                    >
                      {section.title[locale]}
                    </h2>
                    <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-cream/45 sm:text-sm">
                      {section.description[locale]}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-gold/60">
                    {section.images.length} {locale === 'te' ? 'ఫోటోలు' : section.images.length === 1 ? 'Photo' : 'Photos'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                  {section.images.map((img, imageIndex) => (
                    <button
                      key={img}
                      type="button"
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-dark-card text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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
                      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Videos Section */}
          <div className="mt-14 sm:mt-20">
            <div className="text-center mb-8 sm:mb-12">
              <div className="w-10 h-[1px] bg-gold/40 mx-auto mb-4" />
              <p className="text-gold text-[10px] tracking-[0.45em] uppercase mb-2">
                {locale === 'te' ? 'వీడియోలు' : 'Videos'}
              </p>
              <h2 className="text-xl sm:text-2xl text-cream/80 font-light font-display">
                {locale === 'te' ? 'హాల్ టూర్ & ఈవెంట్ హైలైట్స్' : 'Hall Tour & Event Highlights'}
              </h2>
              <p className="text-cream/40 text-[13px] sm:text-sm mt-3 max-w-md mx-auto leading-relaxed">
                {locale === 'te'
                  ? 'మా బ్యాంక్వెట్ హాల్ యొక్క అందం మరియు గొప్పతనాన్ని చూడండి'
                  : 'Experience the beauty and grandeur of our banquet hall'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {VIDEOS.map((video) => (
                <VideoTile key={video.id} video={video} onPlay={setActiveVideo} />
              ))}
            </div>
          </div>

          {/* Advertisements Section */}
          {ADVERTISEMENTS.length > 0 && (
            <div className="mt-14 sm:mt-20">
              <div className="text-center mb-8 sm:mb-10">
                <div className="w-10 h-[1px] bg-gold/40 mx-auto mb-4" />
                <p className="text-gold text-[10px] tracking-[0.45em] uppercase mb-2">
                  {locale === 'te' ? 'ప్రకటనలు' : 'Advertisements'}
                </p>
                <h2 className="text-xl sm:text-2xl text-cream/80 font-light font-display">
                  {locale === 'te' ? 'మా సేవలు & ప్యాకేజీలు' : 'Our Services & Packages'}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {ADVERTISEMENTS.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden border border-gold/15 hover:border-gold/30 transition-all cursor-pointer rounded-xl"
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quotes Section */}
          <div className="mt-16 sm:mt-24">
            <div className="text-center mb-10">
              <div className="w-10 h-[1px] bg-gold/40 mx-auto mb-4" />
              <p className="text-gold text-[10px] tracking-[0.45em] uppercase">
                {locale === 'te' ? 'ప్రేరణ' : 'Inspiration'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
              {QUOTES.map((q, i) => (
                <div
                  key={i}
                  className="border border-gold/10 bg-dark-surface/50 p-5 sm:p-8 text-center hover:border-gold/25 transition-all rounded-xl"
                >
                  <div className="text-gold/30 text-2xl sm:text-3xl font-display mb-2 sm:mb-3">&ldquo;</div>
                  <p className="text-cream/70 text-[13px] sm:text-[15px] leading-relaxed italic mb-3 sm:mb-4 font-display">
                    {locale === 'te' ? q.te : q.en}
                  </p>
                  <p className="text-cream/25 text-[10px] sm:text-xs leading-relaxed">
                    {locale === 'te' ? q.en : q.te}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allLightboxImages}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}

      {/* Fullscreen Video Modal */}
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
    </div>
  );
}
