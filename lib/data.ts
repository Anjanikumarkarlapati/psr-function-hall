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

export const WHATSAPP_NUMBER = '919999999999';

export const ADDRESS: Address = {
  line1: '4th Floor, Koppu Naresh Complex, Wyra Rd',
  line2: 'Above Avantara, Opp. Babu Rao Complex',
  line3: 'B K Bazar Colony, Nizampet, Khammam',
  state: 'Telangana 507001, India',
  full: '4th Floor, Koppu Naresh Complex, Wyra Rd, Above Avantara, Opp. Babu Rao Complex, B K Bazar Colony, Nizampet, Khammam, Telangana 507001',
  phone1: '+91 92081 08108',
  timings: 'Mon – Sun  ·  10:00 AM – 10:00 PM',
  justdial:
    'https://www.justdial.com/Khammam/Pasumarthi-Banquet-Hall-Above-Avantara-Opposite-Babu-Rao-Compex-B-K-Bazar-Colony/9999P8742-8742-250125012404-V8A9_BZDET',
  gmaps: 'https://www.google.com/maps/place/Pasumarthi+Banquet+hall/@17.2500476,80.1448094,17z',
};

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

export const MENU_2_EXTRAS: string[] = ['Welcome Drink', 'Chicken Biryani'];

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
    cover: 'https://images.unsplash.com/photo-1772127822562-a898d9f5733c?w=1200&h=700&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1587271636175-90d58cdad458?w=800&h=550&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1772127822552-ce9ef537bdcf?w=800&h=550&fit=crop&auto=format',
    ],
  },
  {
    id: 'engagement',
    name: 'Engagement Ceremony',
    title: 'Celebrate the Beginning of Forever',
    subtitle: 'Elegant engagement decorations crafted for unforgettable first promises.',
    quote: 'Every love story begins with a beautiful promise.',
    cover: 'https://images.unsplash.com/photo-1746044159204-1c0dc41802ea?w=1200&h=700&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1745573674471-e057af420757?w=800&h=550&fit=crop&auto=format',
    ],
  },
  {
    id: 'ring',
    name: 'Ring Ceremony',
    title: 'Where Two Hearts Become One',
    subtitle: 'Sophisticated ring ceremony décor designed with elegance and charm.',
    quote: 'A ring is the smallest circle with the biggest meaning.',
    cover: 'https://images.unsplash.com/photo-1767986012147-352900f75221?w=1200&h=700&fit=crop&auto=format',
    images: [],
  },
  {
    id: 'birthday-boys',
    name: 'Birthday Party — Boys',
    title: 'Epic Adventures Start Here',
    subtitle: 'Superhero, jungle, racing, and space-themed birthday celebrations.',
    quote: 'Every birthday is another adventure waiting to happen.',
    cover: 'https://images.unsplash.com/photo-1741969494307-55394e3e4071?w=1200&h=700&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1560128411-79892dd93bf8?w=800&h=550&fit=crop&auto=format',
    ],
  },
  {
    id: 'birthday-girls',
    name: 'Birthday Party — Girls',
    title: 'Dreams, Sparkles & Smiles',
    subtitle: 'Princess, unicorn, Barbie, butterfly, and fairy-themed birthday decorations.',
    quote: 'Make every birthday magical and unforgettable.',
    cover: 'https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?w=1200&h=700&fit=crop&auto=format',
    images: [],
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    title: 'Celebrating Love Through the Years',
    subtitle: 'Romantic anniversary setups for every milestone of your journey together.',
    quote: 'Love grows stronger with every passing year.',
    cover: 'https://images.unsplash.com/photo-1560505605-f300b17028d6?w=1200&h=700&fit=crop&auto=format',
    images: [],
  },
  {
    id: 'babyshower',
    name: 'Baby Shower',
    title: 'Welcoming a Little Miracle',
    subtitle: 'Beautiful baby shower decorations filled with warmth and joy.',
    quote: 'Tiny feet leave the biggest footprints in our hearts.',
    cover: 'https://images.unsplash.com/photo-1635927300503-05044fadd0bb?w=1200&h=700&fit=crop&auto=format',
    images: [],
  },
  {
    id: 'naming',
    name: 'Naming Ceremony',
    title: 'A Beautiful Beginning',
    subtitle: 'Celebrate your baby\'s first milestone with elegant decorations.',
    quote: 'Every name carries a story waiting to be written.',
    cover: 'https://images.unsplash.com/photo-1771769076330-c424547f5c1c?w=1200&h=700&fit=crop&auto=format',
    images: [],
  },
  {
    id: 'housewarming',
    name: 'Housewarming',
    title: 'Turning a House Into a Home',
    subtitle: 'Traditional and modern décor for your special Gruhapravesam celebration.',
    quote: 'Home is where beautiful memories begin.',
    cover: 'https://images.unsplash.com/photo-1759477274116-e3cb02d2b9d8?w=1200&h=700&fit=crop&auto=format',
    images: [],
  },
  {
    id: 'retirement',
    name: 'Retirement Party',
    title: 'Celebrating a Lifetime of Achievements',
    subtitle: 'Honor years of dedication with a memorable retirement celebration.',
    quote: 'Retirement is not the end — it is the beginning of a new adventure.',
    cover: 'https://images.unsplash.com/photo-1560128411-79892dd93bf8?w=1200&h=700&fit=crop&auto=format',
    images: [],
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
    src: 'https://maps.google.com/maps?q=17.2500476,80.1448094&z=17&output=embed',
  },
  {
    id: 'satellite',
    label: 'Satellite / 3D',
    src: 'https://maps.google.com/maps?q=17.2500476,80.1448094&z=19&t=k&output=embed',
  },
  {
    id: 'street',
    label: 'Street View',
    src: 'https://www.google.com/maps/embed?pb=!4v1!6m8!1m7!1sNTAjy8eZjPwuVA6HgqwrAQ!2m2!1d17.250169!2d80.1449225!3f221.69!4f0!5f0.7820865974627469!8i16384',
  },
];
