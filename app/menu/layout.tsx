import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Vegetarian Catering Menu in Khammam',
  description:
    'View the vegetarian catering menu for weddings, receptions and celebrations at Pasumarthi Banquet Hall, a premium function hall in Khammam.',
  path: '/menu',
  imageAlt: 'Vegetarian catering at Pasumarthi Banquet Hall in Khammam',
});

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
