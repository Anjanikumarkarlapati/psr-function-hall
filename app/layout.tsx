import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Cinzel_Decorative, Montserrat, Noto_Sans_Telugu } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CallFloat } from '@/components/CallFloat';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  localBusinessJsonLd,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';
import { Providers } from './providers';
import './globals.css';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '700', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-telugu',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0a0908',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: '/images/brand-mark.svg', type: 'image/svg+xml' }],
    shortcut: [{ url: '/images/brand-mark.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/images/brand-mark.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1280,
        height: 591,
        alt: `${SITE_NAME}, a premium function hall in Khammam`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = JSON.stringify(localBusinessJsonLd).replace(
    /</g,
    '\\u003c'
  );

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${montserrat.variable} ${notoTelugu.variable}`}
    >
      <head>
        <script
          id="local-business-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-dark text-cream font-body"
      >
        <Providers>
          <Navbar />
          <main className="pt-[60px] sm:pt-[68px]">{children}</main>
          <Footer />
          <CallFloat />
          <WhatsAppFloat />
        </Providers>
        <GoogleAnalytics gaId="G-KQFXL5N1R3" />
      </body>
    </html>
  );
}
