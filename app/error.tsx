'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-display text-gold mb-4">
          Something went wrong
        </h2>
        <p className="text-cream/60 mb-8 text-sm">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 border border-gold/50 text-gold text-sm tracking-wide hover:border-gold hover:bg-gold/10 transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-cream/20 text-cream/60 text-sm tracking-wide hover:border-cream/40 hover:text-cream/80 transition-all"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
