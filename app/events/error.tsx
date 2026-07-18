'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EventsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Auto-recover from chunk load / navigation errors
    if (
      error.message?.includes('ChunkLoadError') ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('dynamically imported module') ||
      error.name === 'ChunkLoadError'
    ) {
      window.location.reload();
      return;
    }

    console.error('Events error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-display text-gold mb-4">
          Page Not Found
        </h2>
        <p className="text-cream/60 mb-8 text-sm">
          This event category could not be loaded. Please try again or browse our events.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => reset()}
            className="px-6 py-3 border border-gold/50 text-gold text-sm tracking-wide hover:border-gold hover:bg-gold/10 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/events"
            className="px-6 py-3 border border-cream/20 text-cream/60 text-sm tracking-wide hover:border-cream/40 hover:text-cream/80 transition-all"
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
