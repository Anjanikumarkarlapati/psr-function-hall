/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows production validation to avoid colliding with a running dev server.
  distDir: process.env.NEXT_DIST_DIR || '.next',
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
  // Handle chunk load errors after new deployments (stale JS chunks)
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Security & performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Cache static assets aggressively
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
        // Cache fonts
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
