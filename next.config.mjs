/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Skip ESLint during builds (run separately via `npm run lint`)
  // Avoids ESLint 9 vs Next 14 integration conflict
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep production builds separate from the development compiler cache.
  // This prevents build validation from invalidating chunks used by `next dev`.
  distDir:
    process.env.NEXT_DIST_DIR ||
    (process.env.NODE_ENV === 'production' ? '.next-build' : '.next'),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Serve optimized images in modern formats
    formats: ['image/avif', 'image/webp'],
    // Minimize image sizes served to clients
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Keep generated AVIF/WebP variants warm across repeat visits.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Enable gzip/brotli compression for faster transfers
  compress: true,
  // Strict mode for catching issues early
  reactStrictMode: true,
  // Improve cold start and reduce bundle size
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Security & performance headers
  async headers() {
    return [
      // Never cache route HTML in development. This keeps server markup and
      // client chunks from different hot-reload revisions from being combined.
      ...(!isProduction
        ? [
            {
              source: '/:path*',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'no-store, max-age=0, must-revalidate',
                },
              ],
            },
          ]
        : []),
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache images and static files for 1 year
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: isProduction
              ? 'public, max-age=31536000, immutable'
              : 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
