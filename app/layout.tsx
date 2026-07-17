import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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

export const metadata: Metadata = {
  title: {
    default: 'Pasumarthi Banquet Hall — Premium Venue in Khammam',
    template: '%s | Pasumarthi Banquet Hall',
  },
  description:
    'Premium banquet hall for weddings, receptions, engagements, birthdays, and all celebrations. 300+ guest capacity with in-house decoration and vegetarian catering in Khammam, Telangana.',
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-dark text-cream font-body">
        <Navbar />
        <main className="pt-[68px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
