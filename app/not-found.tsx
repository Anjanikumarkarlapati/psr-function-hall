import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { GoldRule } from '@/components/GoldRule';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <GlassCard variant="dark" className="text-center px-10 py-12 max-w-md w-full">
        <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-6" />
        <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4">
          404
        </p>
        <h1 className="text-4xl text-white font-light mb-2 font-display">
          Page Not Found
        </h1>
        <GoldRule />
        <p className="text-silver text-sm mt-5 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-8 py-3.5 bg-gold text-dark font-bold tracking-widest text-[11px] uppercase hover:bg-gold-bright transition-colors"
        >
          Back to Home
        </Link>
        <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-8" />
      </GlassCard>
    </div>
  );
}
