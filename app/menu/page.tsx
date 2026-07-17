import type { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, Phone, ArrowRight, Clock, MapPin } from 'lucide-react';
import { MENU_ITEMS, MENU_2_EXTRAS, ADDRESS, WHATSAPP_NUMBER } from '@/lib/data';
import { glass } from '@/styles/glass';
import { GlassCard } from '@/components/GlassCard';
import { GoldRule } from '@/components/GoldRule';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export const metadata: Metadata = {
  title: 'Pure Veg Menu',
  description:
    'Complete vegetarian menu with 23+ dishes including biryanis, curries, sweets, and refreshments at Pasumarthi Banquet Hall, Khammam.',
};

const HALL_BG =
  '/images/hall.png';

export default function MenuPage() {
  const allItems = [...MENU_ITEMS, ...MENU_2_EXTRAS];

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Header */}
      <div className="relative overflow-hidden" style={{ height: '320px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HALL_BG})` }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 120%, #d4aa4c 0%, transparent 60%)',
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-8">
          <GlassCard
            variant="gold"
            className="inline-block text-gold text-[9px] tracking-[0.52em] uppercase px-3 py-1.5 mb-5"
          >
            Our Offerings
          </GlassCard>
          <h1 className="text-[46px] sm:text-6xl text-white font-light leading-tight font-display">
            Pure Veg <span className="text-gold font-semibold italic">Menu</span>
          </h1>
          <div className="flex items-center gap-2 mt-4 text-silver text-sm">
            <Leaf size={13} className="text-green-400/70" />
            100% Pure Vegetarian · Finest Quality Ingredients
          </div>
        </div>
      </div>

      <div className="px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Package Legend */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                label: 'Menu 1',
                count: '23 Dishes',
                desc: 'Complete vegetarian spread — all dishes listed below without extras.',
                extra: null,
              },
              {
                label: 'Menu 2',
                count: '25 Dishes + Welcome Drink',
                desc: 'Everything in Menu 1, plus Welcome Drink & Chicken Biryani.',
                extra: 'Includes extras',
              },
            ].map((pkg, i) => (
              <GlassCard
                key={i}
                variant="dark"
                className="p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-gold/15 border border-gold/30 text-gold font-bold text-sm font-display">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white/85 text-[15px] font-medium font-display">
                      {pkg.label}
                    </span>
                    <span className="text-gold text-[10px] tracking-wide px-2 py-0.5 bg-gold/10 border border-gold/25">
                      {pkg.count}
                    </span>
                    {pkg.extra && (
                      <span className="text-green-400 text-[9px] tracking-wide px-2 py-0.5 bg-green-400/8 border border-green-400/20">
                        {pkg.extra}
                      </span>
                    )}
                  </div>
                  <p className="text-silver text-xs leading-relaxed">
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
              className="px-8 py-6 flex items-center justify-between flex-wrap gap-3"
              style={{ borderBottom: '1px solid rgba(212,170,76,0.14)' }}
            >
              <div>
                <div className="text-gold text-[9px] tracking-[0.45em] uppercase mb-1">
                  Complete Listing
                </div>
                <h2 className="text-2xl text-white font-light font-display">
                  Full Menu — All Items
                </h2>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-silver">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gold/60" />
                  Menu 1 &amp; 2
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                  Menu 2 only
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3.5">
                {allItems.map((item, i) => {
                  const isExtra = MENU_2_EXTRAS.includes(item);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isExtra ? 'bg-green-400/70' : 'bg-gold/45'
                        }`}
                      />
                      <span
                        className={`text-[13px] leading-snug ${
                          isExtra
                            ? 'text-green-300/80 font-medium'
                            : 'text-silver'
                        }`}
                      >
                        {item}
                      </span>
                      {isExtra && (
                        <span className="text-[9px] text-green-400/70 px-1.5 py-0.5 border border-green-400/20 tracking-wide shrink-0">
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
                  Items marked{' '}
                  <span className="text-green-300/80 font-medium">M2</span> are
                  exclusive to Menu 2 — Welcome Drink is served on arrival and
                  Chicken Biryani replaces or accompanies the standard rice
                  course. Contact us to discuss customisation.
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
            <div className="relative p-8 sm:p-10">
              <div className="text-center mb-8">
                <div className="w-8 h-[1px] bg-gold/40 mx-auto mb-5" />
                <GlassCard
                  variant="gold"
                  className="inline-block text-gold text-[9px] tracking-[0.5em] uppercase px-3 py-1.5 mb-4"
                >
                  Want to Know More?
                </GlassCard>
                <h3 className="text-3xl sm:text-4xl text-white font-light mb-3 font-display">
                  For More Menu Details
                  <br />
                  <span className="text-gold font-semibold italic">
                    Connect With Us
                  </span>
                </h3>
                <p className="text-silver text-[14px] leading-relaxed max-w-md mx-auto">
                  Our team will walk you through the full menu, seasonal
                  specials, custom packages, and pricing — just reach out.
                </p>
                <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-5" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hello, I would like to know more about the menu and packages at Pasumarthi Banquet Hall.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 px-6 py-6 bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-white/25 text-white">
                    <WhatsAppIcon size={18} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-white font-display">
                      WhatsApp Us
                    </div>
                    <div className="text-[11px] mt-0.5 text-white/70">
                      Instant reply, 9AM–9PM
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${ADDRESS.phone1.replace(/\s/g, '')}`}
                  className="group flex flex-col items-center gap-3 px-6 py-6 text-gold hover:border-gold/50 transition-all"
                  style={glass.gold as React.CSSProperties}
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/35 text-gold">
                    <Phone size={17} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-gold font-display">
                      Call Us
                    </div>
                    <div className="text-[11px] mt-0.5 text-silver">
                      {ADDRESS.phone1}
                    </div>
                  </div>
                </a>

                <Link
                  href="/book"
                  className="group flex flex-col items-center gap-3 px-6 py-6 text-gold hover:border-gold/50 transition-all"
                  style={glass.gold as React.CSSProperties}
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/35 text-gold">
                    <ArrowRight size={17} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold tracking-wide text-gold font-display">
                      Book an Event
                    </div>
                    <div className="text-[11px] mt-0.5 text-silver">
                      Reserve your date
                    </div>
                  </div>
                </Link>
              </div>

              <div className="text-center text-silver text-xs flex items-center justify-center gap-2">
                <Clock size={11} className="text-gold/60" />
                {ADDRESS.timings}
                <span className="mx-2 text-gold/20">|</span>
                <MapPin size={11} className="text-gold/60" />
                Nizampet, Khammam, Telangana
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
