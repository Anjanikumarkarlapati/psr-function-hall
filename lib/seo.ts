import type { Metadata } from 'next';

export const SITE_NAME = 'Pasumarthy Banquet Hall';
export const SITE_URL = 'https://www.psrfunctionhallkhammam.in';
export const DEFAULT_TITLE =
  'Pasumarthy Banquet Hall | Premium Function Hall in Khammam';
export const DEFAULT_DESCRIPTION =
  'Pasumarthy Banquet Hall is one of the best banquet and function halls in Khammam for weddings, receptions, engagements, birthday parties, baby showers, corporate events and family celebrations.';
export const DEFAULT_OG_IMAGE =
  '/images/gallery/wedding-stage-floral-arch.jpg';

export const SEO_KEYWORDS = [
  'Function Hall Khammam',
  'Banquet Hall Khammam',
  'Wedding Hall Khammam',
  'Marriage Hall Khammam',
  'Reception Hall Khammam',
  'Birthday Party Hall Khammam',
  'Event Venue Khammam',
];

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE_NAME} event venue in Khammam`,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EventVenue'],
  '@id': `${SITE_URL}/#event-venue`,
  name: SITE_NAME,
  url: SITE_URL,
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  description: DEFAULT_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Khammam',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
};
