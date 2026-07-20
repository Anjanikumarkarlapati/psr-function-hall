import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Book a Function Hall in Khammam',
  description:
    'Book Pasumarthy Banquet Hall in Khammam for weddings, receptions, engagements, birthdays, baby showers, corporate events and family celebrations.',
  path: '/book',
  imageAlt: 'Book Pasumarthy Banquet Hall in Khammam',
});

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
