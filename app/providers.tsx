'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';

function ChunkErrorHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Handle chunk load errors globally (happens after new Vercel deployments
    // when the browser has cached old JS chunk references)
    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes('ChunkLoadError') ||
        event.message?.includes('Loading chunk') ||
        event.message?.includes('Failed to fetch dynamically imported module')
      ) {
        // Prevent the error from showing
        event.preventDefault();
        // Do a full page reload to get fresh chunks
        window.location.reload();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || String(event.reason);
      if (
        message.includes('ChunkLoadError') ||
        message.includes('Loading chunk') ||
        message.includes('Failed to fetch dynamically imported module')
      ) {
        event.preventDefault();
        window.location.reload();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [router]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ChunkErrorHandler>{children}</ChunkErrorHandler>
    </LanguageProvider>
  );
}
