import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { GalleryUpload } from '@/components/GalleryUpload';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

interface PageProps {
  params: { categoryId: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ categoryId: cat.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = CATEGORIES.find((c) => c.id === params.categoryId);
  if (!category) return { title: 'Not Found' };
  return {
    title: category.name,
    description: category.subtitle,
  };
}

export default function CategoryDetailPage({ params }: PageProps) {
  const category = CATEGORIES.find((c) => c.id === params.categoryId);
  if (!category) notFound();

  const others = CATEGORIES.filter((c) => c.id !== category.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[420px] flex flex-col justify-end overflow-hidden">
        <Image
          src={category.cover}
          alt={category.title}
          fill
          className="object-cover scale-[1.03]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-black/50 to-black/20" />

        {/* Breadcrumb */}
        <div className="absolute top-[20px] left-0 right-0 px-6 sm:px-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-cream/45 hover:text-gold text-xs tracking-wide transition-colors"
          >
            <ArrowLeft size={13} /> All Events
          </Link>
        </div>

        {/* Title */}
        <div className="relative px-6 sm:px-10 pb-14 max-w-4xl">
          <div className="text-gold text-[10px] tracking-[0.45em] uppercase mb-3">
            {category.name}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-4 font-display">
            {category.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-10 bg-gold/50" />
            <p className="text-white/50 text-sm italic">
              &ldquo;{category.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        {/* Subtitle + CTA */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start mb-16 pb-16 border-b border-gold/10">
          <div>
            <p className="text-gold text-[10px] tracking-[0.38em] uppercase mb-3">
              About This Event
            </p>
            <p className="text-cream/60 text-[16px] leading-relaxed max-w-xl">
              {category.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/book"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-dark font-bold text-xs tracking-widest uppercase hover:bg-gold-bright transition-colors whitespace-nowrap"
            >
              Book This Event
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-bold text-xs tracking-widest uppercase hover:bg-[#20bd5a] transition-colors"
            >
              <WhatsAppIcon size={14} /> WhatsApp
            </Link>
          </div>
        </div>

        {/* Gallery (client component) */}
        <GalleryUpload
          categoryName={category.name}
          initialImages={category.images}
        />

        {/* Other Events */}
        {others.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-cream/60 text-xs tracking-[0.3em] uppercase">
                Other Events
              </h3>
              <Link
                href="/events"
                className="text-gold text-xs hover:underline flex items-center gap-1"
              >
                View All <ArrowRight size={11} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {others.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/events/${cat.id}`}
                  className="group relative h-36 overflow-hidden text-left"
                >
                  <Image
                    src={cat.cover}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <div className="text-white/55 text-[10px] tracking-wide leading-snug group-hover:text-gold transition-colors">
                      {cat.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
