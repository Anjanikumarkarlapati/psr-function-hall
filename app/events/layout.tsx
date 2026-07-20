import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Events at Our Function Hall in Khammam',
  description:
    'Explore weddings, receptions, engagements, birthday parties, baby showers and family celebrations hosted at Pasumarthi Banquet Hall in Khammam.',
  path: '/events',
  imageAlt: 'Events at Pasumarthi Banquet Hall in Khammam',
});

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
