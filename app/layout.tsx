import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Noto_Sans_Telugu } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { Providers } from './providers';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://psr-function-hall.vercel.app'
  ),
  title: {
    default: 'Pasumarthy Banquet Hall — Premium Venue in Khammam',
    template: '%s | Pasumarthy Banquet Hall',
  },
  description:
    'Premium banquet hall for weddings, receptions, engagements, birthdays, and all celebrations. 400+ guest capacity with in-house decoration and vegetarian catering in Khammam, Telangana.',
  keywords: [
    'banquet hall khammam',
    'wedding venue khammam',
    'pasumarthi banquet hall',
    'function hall khammam',
    'reception hall telangana',
  ],
  icons: {
    icon: '/images/brand-mark.svg',
    shortcut: '/images/brand-mark.svg',
    apple: '/images/brand-mark.svg',
  },
  openGraph: {
    title: 'Pasumarthi Banquet Hall — Premium Venue in Khammam',
    description:
      'A distinguished celebration venue for weddings, receptions, engagements, birthdays, and family events in Khammam.',
    type: 'website',
    images: [
      {
        url: '/images/brand-mark.svg',
        width: 256,
        height: 256,
        alt: 'PSR Pasumarthy Banquet Hall crest',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable} ${notoTelugu.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-dark text-cream font-body">
        <Providers>
          <Navbar />
          <main className="pt-[60px] sm:pt-[68px]">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
