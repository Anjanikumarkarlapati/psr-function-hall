import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, WHATSAPP_NUMBERS } from '@/lib/data';
import { decodeNumber } from '@/lib/obfuscate';
import { createPageMetadata } from '@/lib/seo';
import { CategoryDetailClient } from './CategoryDetailClient';

interface PageProps {
  params: { categoryId: string };
}

export const dynamicParams = true;

export function generateStaticParams() {
  return CATEGORIES.map(({ id }) => ({ categoryId: id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = CATEGORIES.find(({ id }) => id === params.categoryId);

  if (!category) return {};

  return createPageMetadata({
    title: `${category.name} Venue in Khammam`,
    description: category.subtitle,
    path: `/events/${category.id}`,
    image: category.cover,
    imageAlt: `${category.name} setup at Pasumarthy Banquet Hall in Khammam`,
  });
}

export default function CategoryDetailPage({ params }: PageProps) {
  const category = CATEGORIES.find(({ id }) => id === params.categoryId);
  if (!category) notFound();

  const others = CATEGORIES.filter(({ id }) => id !== category.id).slice(0, 4);
  const message = encodeURIComponent(
    `Hello, I would like to enquire about a ${category.name} booking at Pasumarthy Banquet Hall.`
  );
  const whatsappHref = `https://wa.me/${decodeNumber(
    WHATSAPP_NUMBERS[0].number
  )}?text=${message}`;

  return (
    <CategoryDetailClient
      category={category}
      others={others}
      whatsappHref={whatsappHref}
    />
  );
}
