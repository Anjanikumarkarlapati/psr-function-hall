import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: {
    default: 'Pasumarthi Banquet Hall — Premium Venue in Khammam',
    template: '%s | Pasumarthi Banquet Hall',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoTelugu.variable}`}>
      <body className="min-h-screen bg-dark text-cream font-body">
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
