// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  quote: string;
  cover: string;
  images: string[];
}

export interface Review {
  name: string;
  event: string;
  rating: number;
  date: string;
  source: 'Google' | 'JustDial';
  text: string;
}

export interface Address {
  line1: string;
  line2: string;
  line3: string;
  state: string;
  full: string;
  phone1: string;
  phone2: string;
  timings: string;
  justdial: string;
  gmaps: string;
}

export interface MapView {
  id: 'map' | 'satellite' | 'street';
  label: string;
  src: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * WhatsApp numbers stored in obfuscated form to prevent bot scraping.
 * Use decodeNumber() from '@/lib/obfuscate' to get the actual values at runtime.
 */
export const WHATSAPP_NUMBERS = [
  { label: 'ODAxODAgMTgwMjkgMTkr', number: 'ODAxODAxODAyOTE5' },
  { label: 'NzcwMzcgNjYwMzcgMTkr', number: 'NzcwMzc2NjAzNzE5' },
] as const;

/** @deprecated Use WHATSAPP_NUMBERS instead */
export const WHATSAPP_NUMBER = WHATSAPP_NUMBERS[0].number;

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export const VENUE_LOCATION: GeoCoordinates = {
  latitude: 17.2500476,
  longitude: 80.1448094,
} as const;

const formatCoordinates = ({ latitude, longitude }: GeoCoordinates) =>
  `${latitude},${longitude}`;

const VENUE_COORDINATES = formatCoordinates(VENUE_LOCATION);

/** Opens the exact venue pin rather than starting a directions journey. */
export const GOOGLE_MAPS_PLACE_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_COORDINATES)}`;

/**
 * Builds a driving route to the venue. When an origin is unavailable, Google
 * Maps resolves the visitor's current device location itself.
 */
export function getGoogleMapsDirectionsUrl(origin?: GeoCoordinates) {
  const params = new URLSearchParams({
    api: '1',
    destination: VENUE_COORDINATES,
    travelmode: 'driving',
    dir_action: 'navigate',
  });

  if (origin) params.set('origin', formatCoordinates(origin));

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** Opens the selected Google Maps mode centered on the same venue pin. */
export function getGoogleMapsViewUrl(view: MapView['id']) {
  const params = new URLSearchParams({ api: '1' });

  if (view === 'street') {
    params.set('map_action', 'pano');
    params.set('viewpoint', VENUE_COORDINATES);
    params.set('heading', '221.69');
    params.set('pitch', '0');
    params.set('fov', '80');
  } else {
    params.set('map_action', 'map');
    params.set('center', VENUE_COORDINATES);
    params.set('zoom', view === 'satellite' ? '19' : '18');
    params.set('basemap', view === 'satellite' ? 'satellite' : 'roadmap');
  }

  return `https://www.google.com/maps/@?${params.toString()}`;
}

export const GOOGLE_MAPS_DIRECTIONS_URL = getGoogleMapsDirectionsUrl();

export const ADDRESS: Address = {
  line1: '4th Floor, Koppu Naresh Complex, Wyra Rd',
  line2: 'Above Avantara, Opp. Babu Rao Complex',
  line3: 'B K Bazar Colony, Nizampet, Khammam',
  state: 'Telangana 507001, India',
  full: '4th Floor, Koppu Naresh Complex, Wyra Rd, Above Avantara, Opp. Babu Rao Complex, B K Bazar Colony, Nizampet, Khammam, Telangana 507001',
  phone1: 'ODAxODAgMTgwMjkgMTkr', // obfuscated — use decodeDisplayNumber()
  phone2: 'NzcwMzcgNjYwMzcgMTkr', // obfuscated — use decodeDisplayNumber()
  timings: 'Mon – Sun  ·  10:00 AM – 10:00 PM',
  justdial:
    'https://www.justdial.com/Khammam/Pasumarthi-Banquet-Hall-Above-Avantara-Opposite-Babu-Rao-Compex-B-K-Bazar-Colony/9999P8742-8742-250125012404-V8A9_BZDET',
  gmaps: GOOGLE_MAPS_PLACE_URL,
};

// ─── Advertisements / Pamphlets ───────────────────────────────────────────────

export const ADVERTISEMENTS: string[] = [
  '/images/gallery/poster-telugu.jpg',
  '/images/gallery/poster-english.jpg',
];

// ─── Menu ─────────────────────────────────────────────────────────────────────

export const MENU_ITEMS: string[] = [
  'Mango Dal',
  'Aloo Tomato Curry',
  'Bendi Peanut Fry',
  'White Rice',
  'Veg Biryani',
  'Gravy',
  'Raitha',
  'Sambar',
  'Gongura Chatney',
  'Mango Pickle',
  'Palli Podi',
  'Karam Podi',
  'Putnala Podi',
  'Kandipodi',
  'Ghee',
  'Curd',
  'Papad',
  'Green Salad',
  'Vanilla Ice Cream',
  'Sweet Pan',
  'Purnam Sweet',
  'Mirchi Bajji',
  'Mineral Water',
];

export const MENU_2_EXTRAS: string[] = ['Chicken Biryani', 'Mutton Curry'];

export const WELCOME_DRINK: string = 'Welcome Drink';

export const SNACKS: string = 'Snacks';

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const REVIEWS: Review[] = [
  {
    name: 'Ramesh Yadav',
    event: 'Wedding Reception',
    rating: 5,
    date: 'March 2025',
    source: 'Google',
    text: 'Excellent hall! The marble interiors and chandelier lighting made our wedding reception absolutely stunning. The staff was very cooperative and the food quality was top notch. Highly recommend for any grand occasion.',
  },
  {
    name: 'Priya Laxmi',
    event: 'Engagement Ceremony',
    rating: 5,
    date: 'January 2025',
    source: 'JustDial',
    text: 'We had our engagement ceremony here and it was a dream come true. The decoration team did a fabulous job with the floral arrangements. The hall is spacious, well air-conditioned, and the location on Wyra Road is very convenient.',
  },
  {
    name: 'Suresh Babu',
    event: 'Birthday Party',
    rating: 4,
    date: 'February 2025',
    source: 'Google',
    text: 'Booked the hall for my daughter\'s birthday party. The ambience is royal and the catering was delicious. Overall a wonderful experience and great value for money.',
  },
  {
    name: 'Kavitha Reddy',
    event: 'Wedding',
    rating: 5,
    date: 'December 2024',
    source: 'JustDial',
    text: 'Perfect venue for a wedding. The team managed everything professionally from decoration to catering. Guests were very impressed by the marble flooring and the grand stage setup.',
  },
  {
    name: 'Nagarjun Goud',
    event: 'Anniversary Celebration',
    rating: 5,
    date: 'November 2024',
    source: 'Google',
    text: 'Celebrated our 25th anniversary here. The management went above and beyond to make it special. The hall looks even more beautiful than the photos. Very satisfied with the service and food quality.',
  },
  {
    name: 'Sravani Devi',
    event: 'Seemantham',
    rating: 4,
    date: 'October 2024',
    source: 'JustDial',
    text: 'Hosted our Seemantham function here. The venue is beautiful and the staff was very helpful in setting up traditional decorations. The food was absolutely delicious and guests loved it.',
  },
];

// ─── Event Categories ─────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    id: 'wedding',
    name: 'Weddings & Receptions',
    title: 'A Celebration Worthy of Your Love',
    subtitle:
      'Grand wedding setups crafted with floral mandaps, silk drapes, and chandelier-lit elegance for your most treasured day.',
    quote: 'The greatest thing you will ever learn is just to love and be loved in return.',
    cover: '/images/gallery/wedding-stage-floral-arch.jpg',
    images: [
      '/images/gallery/wedding-stage-floral-arch.jpg',
      '/images/gallery/wedding-hall-seating.jpg',
      '/images/gallery/wedding-traditional-mandap.jpg',
      '/images/gallery/wedding-traditional-mandap-closeup.jpg',
      '/images/gallery/wedding-modern-minimalist.jpg',
      '/images/gallery/wedding-white-floral-arch.jpg',
      '/images/gallery/wedding-colorful-traditional.jpg',
      '/images/gallery/wedding-white-green-elegant.jpg',
      '/images/gallery/wedding-better-together.jpg',
      '/images/gallery/wedding-premium-gold-floral.jpg',
      '/images/gallery/wedding-colorful-garland-circle.jpg',
      '/images/gallery/wedding-hanging-wisteria.jpg',
      '/images/gallery/wedding-double-gold-frame.jpg',
      '/images/gallery/wedding-white-green-candles.jpg',
      '/images/gallery/wedding-green-arch-gold.jpg',
      '/images/gallery/wedding-pink-drapes-stage.jpg',
      '/images/gallery/wedding-green-yellow-stage.jpg',
      '/images/gallery/wedding-peach-elegant.jpg',
      '/images/gallery/wedding-golden-sofa-red.jpg',
      '/images/gallery/wedding-white-curtain-floral.jpg',
      '/images/gallery/wedding-pink-gold-arch.jpg',
      '/images/gallery/wedding-golden-ornate-stage.jpg',
    ],
  },
  {
    id: 'engagement',
    name: 'Engagement Ceremony',
    title: 'Celebrate the Beginning of Forever',
    subtitle: 'Elegant engagement decorations crafted for unforgettable first promises.',
    quote: 'Every love story begins with a beautiful promise.',
    cover: '/images/gallery/wedding-better-together.jpg',
    images: [
      '/images/gallery/wedding-better-together.jpg',
      '/images/gallery/wedding-premium-gold-floral.jpg',
      '/images/gallery/wedding-modern-minimalist.jpg',
    ],
  },
  {
    id: 'ring',
    name: 'Ring Ceremony',
    title: 'Where Two Hearts Become One',
    subtitle: 'Sophisticated ring ceremony décor designed with elegance and charm.',
    quote: 'A ring is the smallest circle with the biggest meaning.',
    cover: '/images/gallery/wedding-double-gold-frame.jpg',
    images: [
      '/images/gallery/wedding-double-gold-frame.jpg',
      '/images/gallery/wedding-hanging-wisteria.jpg',
    ],
  },
  {
    id: 'birthday-boys',
    name: 'Birthday Party — Boys',
    title: 'Epic Adventures Start Here',
    subtitle: 'Superhero, jungle, racing, and space-themed birthday celebrations.',
    quote: 'Every birthday is another adventure waiting to happen.',
    cover: '/images/gallery/birthday-boss-baby-theme.jpg',
    images: [
      '/images/gallery/birthday-boss-baby-theme.jpg',
    ],
  },
  {
    id: 'birthday-girls',
    name: 'Birthday Party — Girls',
    title: 'Dreams, Sparkles & Smiles',
    subtitle: 'Princess, unicorn, Barbie, butterfly, and fairy-themed birthday decorations.',
    quote: 'Make every birthday magical and unforgettable.',
    cover: '/images/gallery/babyshower-flower-cart.jpg',
    images: [
      '/images/gallery/babyshower-flower-cart.jpg',
      '/images/gallery/naming-ceremony-colorful.jpg',
    ],
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    title: 'Celebrating Love Through the Years',
    subtitle: 'Romantic anniversary setups for every milestone of your journey together.',
    quote: 'Love grows stronger with every passing year.',
    cover: '/images/gallery/wedding-white-floral-arch.jpg',
    images: [
      '/images/gallery/wedding-white-floral-arch.jpg',
      '/images/gallery/wedding-colorful-garland-circle.jpg',
    ],
  },
  {
    id: 'babyshower',
    name: 'Baby Shower',
    title: 'Welcoming a Little Miracle',
    subtitle: 'Beautiful baby shower decorations filled with warmth and joy.',
    quote: 'Tiny feet leave the biggest footprints in our hearts.',
    cover: '/images/gallery/babyshower-ceremony.jpg',
    images: [
      '/images/gallery/babyshower-ceremony.jpg',
      '/images/gallery/babyshower-rangoli-balloons.jpg',
      '/images/gallery/babyshower-flower-cart.jpg',
    ],
  },
  {
    id: 'naming',
    name: 'Naming Ceremony',
    title: 'A Beautiful Beginning',
    subtitle: 'Celebrate your baby\'s first milestone with elegant decorations.',
    quote: 'Every name carries a story waiting to be written.',
    cover: '/images/gallery/naming-ceremony-colorful.jpg',
    images: [
      '/images/gallery/naming-ceremony-colorful.jpg',
      '/images/gallery/naming-ceremony-rangoli.jpg',
    ],
  },
  {
    id: 'housewarming',
    name: 'Housewarming',
    title: 'Turning a House Into a Home',
    subtitle: 'Traditional and modern décor for your special Gruhapravesam celebration.',
    quote: 'Home is where beautiful memories begin.',
    cover: '/images/gallery/housewarming-orange-floral.jpg',
    images: [
      '/images/gallery/housewarming-orange-floral.jpg',
      '/images/gallery/housewarming-gold-drapes.jpg',
      '/images/gallery/housewarming-traditional-golden.jpg',
      '/images/gallery/wedding-traditional-mandap.jpg',
      '/images/gallery/wedding-traditional-mandap-closeup.jpg',
    ],
  },
  {
    id: 'retirement',
    name: 'Retirement Party',
    title: 'Celebrating a Lifetime of Achievements',
    subtitle: 'Honor years of dedication with a memorable retirement celebration.',
    quote: 'Retirement is not the end — it is the beginning of a new adventure.',
    cover: '/images/gallery/wedding-hall-seating.jpg',
    images: [
      '/images/gallery/wedding-hall-seating.jpg',
      '/images/gallery/wedding-white-green-candles.jpg',
    ],
  },
];

// ─── Event Types (for booking form) ──────────────────────────────────────────

export const EVENT_TYPES: string[] = [
  'Wedding / Reception',
  'Engagement Ceremony',
  'Ring Ceremony',
  'Birthday Party (Boys)',
  'Birthday Party (Girls)',
  'Anniversary Celebration',
  'Baby Shower / Seemantham',
  'Naming Ceremony',
  'Housewarming / Gruhapravesam',
  'Retirement Party',
  'Family Reunion',
  'Marriage',
  'Other',
];

// ─── Map Views ────────────────────────────────────────────────────────────────

export const MAP_VIEWS: MapView[] = [
  {
    id: 'map',
    label: 'Map',
    src: `https://maps.google.com/maps?q=${VENUE_COORDINATES}&z=17&output=embed`,
  },
  {
    id: 'satellite',
    label: 'Satellite / 3D',
    src: `https://maps.google.com/maps?q=${VENUE_COORDINATES}&z=19&t=k&output=embed`,
  },
  {
    id: 'street',
    label: 'Street View',
    src: 'https://www.google.com/maps/embed?pb=!4v1!6m8!1m7!1sNTAjy8eZjPwuVA6HgqwrAQ!2m2!1d17.250169!2d80.1449225!3f221.69!4f0!5f0.7820865974627469!8i16384',
  },
];
