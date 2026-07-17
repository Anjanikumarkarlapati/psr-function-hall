import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, ExternalLink, Leaf } from 'lucide-react';
import { CATEGORIES, REVIEWS, ADDRESS } from '@/lib/data';
import { glass } from '@/styles/glass';
import { GlassCard } from '@/components/GlassCard';
import { GoldRule } from '@/components/GoldRule';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { MapSection } from '@/components/MapSection';

const HALL_BG = '/images/hall.png';

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HALL_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

        <GlassCard
          variant="dark"
          className="relative z-10 text-center px-10 py-12 mx-4 max-w-2xl w-full"
        >
          <div className="w-12 h-[1px] bg-gold-light mx-auto mb-6" />
          <p className="text-gold-light/80 text-[10px] tracking-[0.65em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="text-[56px] sm:text-7xl text-white font-light leading-[0.95] mb-1 font-display tracking-wide">
            Pasumarthi
          </h1>
          <h2 className="text-[56px] sm:text-7xl text-gold-light font-semibold leading-[0.95] mb-6 font-display tracking-wide">
            Banquet Hall
          </h2>
          <GoldRule />
          <p className="text-white/50 text-[15px] mt-5 mb-9 leading-relaxed font-body">
            One of the finest banquet halls in Khammam — where every celebration
            becomes a cherished memory.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="px-9 py-3.5 bg-gold-light text-dark font-bold tracking-widest text-[11px] uppercase hover:bg-gold-bright transition-colors"
            >
              Book an Event
            </Link>
            <Link
              href="/menu"
              className="px-9 py-3.5 text-gold-light text-[11px] tracking-widest uppercase transition-all"
              style={glass.silver as React.CSSProperties}
            >
              View Menu
            </Link>
          </div>
          <div className="w-12 h-[1px] bg-gold-light/30 mx-auto mt-8" />
        </GlassCard>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-10 bg-gold-light" />
          <span className="text-gold-light text-[9px] tracking-[0.5em] uppercase">
            Scroll
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
        <div className="flex gap-10 text-dark text-[10px] tracking-[0.28em] uppercase font-bold whitespace-nowrap justify-center flex-wrap px-4">
          {[
            'Finest Banquet Hall in Khammam',
            'Marble Interiors',
            'Exquisite Cuisine',
            'All Celebrations',
            'Nizampet · Khammam',
            'Silver Curtains · Crystal Chandelier',
          ].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="inline-block w-1 h-1 rounded-full bg-dark/35" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── About Section ────────────────────────────────────────── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HALL_BG})` }}
        />
        <div className="absolute inset-0 bg-black/82" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left — text + stats */}
          <div>
            <GlassCard
              variant="gold"
              className="inline-block text-gold text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-6"
            >
              Our Story
            </GlassCard>
            <h2 className="text-[38px] sm:text-5xl text-white font-light leading-[1.08] mb-7 font-display">
              One of the Finest
              <br />
              <span className="text-gold font-semibold italic">
                Banquet Halls
              </span>
              <br />
              in Khammam
            </h2>
            <div className="space-y-3 text-silver leading-relaxed text-[15px] mb-10">
              <p>
                Pasumarthi Banquet Hall stands as one of Khammam&apos;s most
                distinguished celebration venues. Our stunning marble floors,
                crystal chandelier, and silver-draped walls create an atmosphere
                of timeless elegance.
              </p>
              <p>
                From intimate family gatherings to grand wedding receptions, we
                offer customisable spaces, exquisite cuisine, and dedicated event
                coordination for every unforgettable moment.
              </p>
            </div>

            {/* Glass stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: '200+', l: 'Events Hosted' },
                { n: '300+', l: 'Guests Capacity' },
                { n: '10+', l: 'Years Service' },
              ].map((s) => (
                <GlassCard
                  key={s.l}
                  variant="dark"
                  className="p-5 text-center"
                >
                  <div className="text-[32px] text-gold font-semibold leading-none mb-1 font-display">
                    {s.n}
                  </div>
                  <div className="text-silver text-[10px] tracking-wide leading-snug">
                    {s.l}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="space-y-3 md:pt-[70px]">
            {[
              {
                title: 'Grand Marble Interiors',
                desc: 'Pristine marble floors, silver curtains, and a stunning crystal chandelier create an atmosphere of royalty.',
              },
              {
                title: 'Exquisite Catering',
                desc: 'From savoury mains to traditional sweets — every dish is prepared with the finest ingredients.',
              },
              {
                title: 'Dedicated Event Team',
                desc: 'Our coordinators handle décor, catering, and logistics so you can focus entirely on celebrating.',
              },
              {
                title: 'All Occasion Venue',
                desc: 'Weddings, engagements, birthdays, namings — we set the perfect stage for every milestone.',
              },
            ].map((f, i) => (
              <GlassCard
                key={i}
                variant="dark"
                className="p-5 flex gap-4 items-start"
              >
                <div className="w-[2px] h-8 bg-gold/50 shrink-0 mt-1" />
                <div>
                  <div className="text-white/85 text-[15px] font-medium mb-1 font-display">
                    {f.title}
                  </div>
                  <div className="text-silver text-[13px] leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Find Us (Map Section) ────────────────────────────────── */}
      <MapSection />

      {/* ── Events Preview ───────────────────────────────────────── */}
      <section className="py-24 px-4 bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          {/* Glass heading */}
          <div className="text-center mb-16">
            <GlassCard
              variant="dark"
              className="inline-block px-10 py-8 mb-4"
            >
              <span className="block text-gold text-[9px] tracking-[0.48em] uppercase mb-3">
                We Host
              </span>
              <h2 className="text-[34px] sm:text-4xl text-white font-light leading-tight font-display">
                Every Occasion,
                <br />
                <span className="text-gold font-semibold italic">
                  Every Joy
                </span>
              </h2>
              <GoldRule />
              <p className="text-silver text-sm mt-3 max-w-sm leading-relaxed">
                From intimate namings to grand wedding receptions — we set the
                stage for every milestone.
              </p>
            </GlassCard>
          </div>

          {/* Featured row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
            <Link
              href={`/events/${CATEGORIES[0].id}`}
              className="group relative col-span-2 lg:col-span-2 overflow-hidden"
              style={{ height: '360px' }}
            >
              <Image
                src={CATEGORIES[0].cover}
                alt={CATEGORIES[0].name}
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                <span
                  className="inline-block text-gold text-[9px] tracking-[0.38em] uppercase px-2.5 py-1 mb-3"
                  style={glass.chip as React.CSSProperties}
                >
                  {CATEGORIES[0].name}
                </span>
                <h3 className="text-white text-2xl font-light leading-snug mb-3 font-display">
                  {CATEGORIES[0].title}
                </h3>
                <div className="flex items-center gap-2 text-gold/0 group-hover:text-gold transition-all duration-300">
                  <span className="text-[11px] tracking-widest uppercase">
                    View Gallery
                  </span>
                  <ArrowRight size={12} />
                </div>
              </div>
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-500" />
            </Link>

            <div className="col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CATEGORIES.slice(1, 4).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/events/${cat.id}`}
                  className="group relative overflow-hidden"
                  style={{ height: '360px' }}
                >
                  <Image
                    src={cat.cover}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <span
                      className="inline-block text-gold text-[9px] tracking-[0.35em] uppercase px-2 py-0.5 mb-2"
                      style={glass.chip as React.CSSProperties}
                    >
                      {cat.name}
                    </span>
                    <h3 className="text-white text-base font-light leading-snug mb-2.5 font-display">
                      {cat.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gold/0 group-hover:text-gold transition-all duration-300">
                      <span className="text-[10px] tracking-widest uppercase">
                        Gallery
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.slice(4).map((cat) => (
              <Link
                key={cat.id}
                href={`/events/${cat.id}`}
                className="group relative overflow-hidden"
                style={{ height: '200px' }}
              >
                <Image
                  src={cat.cover}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <div className="text-white/55 text-[10px] leading-snug group-hover:text-gold/80 transition-colors duration-300">
                    {cat.name}
                  </div>
                  <div className="mt-1.5 text-gold/0 group-hover:text-gold/70 transition-all duration-300">
                    <ArrowRight size={10} />
                  </div>
                </div>
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/[0.18] transition-all duration-500" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 px-8 py-3.5 text-gold text-[11px] tracking-[0.3em] uppercase hover:border-gold/60 transition-all"
              style={glass.gold as React.CSSProperties}
            >
              Explore All Events & Galleries <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <GlassCard
              variant="gold"
              className="inline-block text-gold text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-5"
            >
              What Guests Say
            </GlassCard>
            <h2 className="text-[34px] sm:text-4xl text-cream font-light mb-3 font-display">
              Reviews &amp;{' '}
              <span className="text-gold font-semibold italic">
                Experiences
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
              <ExternalLink size={13} /> View on Google Maps
            </a>
            <a
              href={ADDRESS.justdial}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm hover:underline flex items-center gap-1.5"
            >
              <ExternalLink size={13} /> View on JustDial
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
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
          <GlassCard variant="dark" className="px-10 py-12 mx-4">
            <div className="w-10 h-[1px] bg-gold/50 mx-auto mb-6" />
            <p className="text-gold/70 text-[9px] tracking-[0.5em] uppercase mb-4">
              Reserve Your Date
            </p>
            <h2 className="text-4xl sm:text-5xl text-white font-light mb-2 font-display">
              Ready to Create
            </h2>
            <h2 className="text-4xl sm:text-5xl text-gold font-semibold italic mb-6 font-display">
              Memories?
            </h2>
            <p className="text-silver text-[15px] mb-10 leading-relaxed">
              Book your event today — our team will take care of every last
              detail.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-dark font-bold tracking-widest text-[11px] uppercase hover:bg-gold-bright transition-colors"
            >
              <WhatsAppIcon size={16} /> Book via WhatsApp
            </Link>
            <div className="w-10 h-[1px] bg-gold/30 mx-auto mt-8" />
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
