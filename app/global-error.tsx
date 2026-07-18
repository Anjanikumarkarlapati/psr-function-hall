'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0908] text-[#faf7f0] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <h2 className="text-2xl mb-4" style={{ color: '#c9a84c' }}>
            Something went wrong
          </h2>
          <p className="text-[#faf7f0]/60 mb-8 text-sm">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 text-sm tracking-wide transition-all"
            style={{
              border: '1px solid rgba(201, 168, 76, 0.5)',
              color: '#c9a84c',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
