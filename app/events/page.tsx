import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { GoldRule } from '@/components/GoldRule';

export const metadata: Metadata = {
  title: 'Events & Decorations',
  description:
    'Explore our event categories — weddings, engagements, birthdays, anniversaries, and more. View decoration galleries at Pasumarthi Banquet Hall.',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5">
              We Host
            </p>
            <h1 className="text-[42px] sm:text-5xl text-cream font-bold mb-4 font-display">
              Events & Decorations
            </h1>
            <GoldRule />
            <p className="text-cream/35 text-sm mt-5">
              Select any event to explore its dedicated gallery and add your
              decoration photos
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/events/${cat.id}`}
                className="group relative overflow-hidden text-left h-80 flex flex-col justify-end"
              >
                <Image
                  src={cat.cover}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10" />
                {cat.images.length > 0 && (
                  <div className="absolute top-4 right-4 bg-gold text-dark text-[10px] font-bold px-2.5 py-1 tracking-wide">
                    {cat.images.length}{' '}
                    {cat.images.length === 1 ? 'Photo' : 'Photos'}
                  </div>
                )}
                <div className="relative p-6">
                  <div className="text-gold text-[9px] tracking-[0.4em] uppercase mb-2 opacity-80">
                    {cat.name}
                  </div>
                  <h3 className="text-white text-xl font-bold leading-snug mb-2 font-display">
                    {cat.title}
                  </h3>
                  <p className="text-white/40 text-[11px] italic leading-relaxed line-clamp-1 mb-4">
                    &ldquo;{cat.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 text-gold/70 text-[11px] group-hover:text-gold transition-colors">
                    <span className="tracking-wider">View Gallery</span>
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
