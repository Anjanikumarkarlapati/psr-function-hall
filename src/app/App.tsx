import { useState, useRef } from "react";
import hallImage from "@/imports/Screenshot_2026-07-16_214621-2.png";
import {
  MapPin, Phone, Menu as MenuIcon, X, Camera,
  Leaf, Star, CheckCircle, Clock, ExternalLink, ArrowRight, ArrowLeft,
} from "lucide-react";

const WHATSAPP_NUMBER = "919999999999"; // Replace with owner's number

const ADDRESS = {
  line1: "4th Floor, Koppu Naresh Complex, Wyra Rd",
  line2: "Above Avantara, Opp. Babu Rao Complex",
  line3: "B K Bazar Colony, Nizampet, Khammam",
  state: "Telangana 507001, India",
  full: "4th Floor, Koppu Naresh Complex, Wyra Rd, Above Avantara, Opp. Babu Rao Complex, B K Bazar Colony, Nizampet, Khammam, Telangana 507001",
  phone1: "+91 87428 87428",
  timings: "Mon – Sun  ·  9:00 AM – 9:00 PM",
  justdial: "https://www.justdial.com/Khammam/Pasumarthi-Banquet-Hall-Above-Avantara-Opposite-Babu-Rao-Compex-B-K-Bazar-Colony/9999P8742-8742-250125012404-V8A9_BZDET",
  gmaps: "https://www.google.com/maps/place/Pasumarthi+Banquet+hall/@17.2500476,80.1448094,17z",
};

const REVIEWS = [
  { name: "Ramesh Yadav", event: "Wedding Reception", rating: 5, date: "March 2025", source: "Google", text: "Excellent hall! The marble interiors and chandelier lighting made our wedding reception absolutely stunning. The staff was very cooperative and the food quality was top notch. Highly recommend for any grand occasion." },
  { name: "Priya Laxmi", event: "Engagement Ceremony", rating: 5, date: "January 2025", source: "JustDial", text: "We had our engagement ceremony here and it was a dream come true. The decoration team did a fabulous job with the floral arrangements. The hall is spacious, well air-conditioned, and the location on Wyra Road is very convenient." },
  { name: "Suresh Babu", event: "Birthday Party", rating: 4, date: "February 2025", source: "Google", text: "Booked the hall for my daughter's birthday party. The ambience is royal and the catering was delicious. Overall a wonderful experience and great value for money." },
  { name: "Kavitha Reddy", event: "Wedding", rating: 5, date: "December 2024", source: "JustDial", text: "Perfect venue for a wedding. The team managed everything professionally from decoration to catering. Guests were very impressed by the marble flooring and the grand stage setup." },
  { name: "Nagarjun Goud", event: "Anniversary Celebration", rating: 5, date: "November 2024", source: "Google", text: "Celebrated our 25th anniversary here. The management went above and beyond to make it special. The hall looks even more beautiful than the photos. Very satisfied with the service and food quality." },
  { name: "Sravani Devi", event: "Seemantham", rating: 4, date: "October 2024", source: "JustDial", text: "Hosted our Seemantham function here. The venue is beautiful and the staff was very helpful in setting up traditional decorations. The food was absolutely delicious and guests loved it." },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "home" | "menu" | "categories" | "book" | "category";

type NavState = { page: Page; categoryId?: string };

type Category = {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  quote: string;
  cover: string;
  images: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const MENU_ITEMS = [
  "Mango Dal", "Aloo Tomato Curry", "Bendi Peanut Fry", "White Rice",
  "Veg Biryani", "Gravy", "Raitha", "Sambar", "Gongura Chatney",
  "Mango Pickle", "Palli Podi", "Karam Podi", "Putnala Podi", "Kandipodi",
  "Ghee", "Curd", "Papad", "Green Salad", "Vanilla Ice Cream",
  "Sweet Pan", "Purnam Sweet", "Mirchi Bajji", "Mineral Water",
];

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "wedding",
    name: "Weddings & Receptions",
    title: "A Celebration Worthy of Your Love",
    subtitle: "Grand wedding setups crafted with floral mandaps, silk drapes, and chandelier-lit elegance for your most treasured day.",
    quote: "The greatest thing you will ever learn is just to love and be loved in return.",
    cover: "",
    images: [
    ],
  },
  {
    id: "engagement",
    name: "Engagement Ceremony",
    title: "Celebrate the Beginning of Forever",
    subtitle: "Elegant engagement decorations crafted for unforgettable first promises.",
    quote: "Every love story begins with a beautiful promise.",
    cover: "",
    images: [
    ],
  },
  {
    id: "ring",
    name: "Ring Ceremony",
    title: "Where Two Hearts Become One",
    subtitle: "Sophisticated ring ceremony décor designed with elegance and charm.",
    quote: "A ring is the smallest circle with the biggest meaning.",
    cover: "",
    images: [],
  },
  {
    id: "birthday-boys",
    name: "Birthday Party — Boys",
    title: "Epic Adventures Start Here",
    subtitle: "Superhero, jungle, racing, and space-themed birthday celebrations.",
    quote: "Every birthday is another adventure waiting to happen.",
    cover: "",
    images: [
    ],
  },
  {
    id: "birthday-girls",
    name: "Birthday Party — Girls",
    title: "Dreams, Sparkles & Smiles",
    subtitle: "Princess, unicorn, Barbie, butterfly, and fairy-themed birthday decorations.",
    quote: "Make every birthday magical and unforgettable.",
    cover: "",
    images: [],
  },
  {
    id: "anniversary",
    name: "Anniversary",
    title: "Celebrating Love Through the Years",
    subtitle: "Romantic anniversary setups for every milestone of your journey together.",
    quote: "Love grows stronger with every passing year.",
    cover: "",
    images: [],
  },
  {
    id: "babyshower",
    name: "Baby Shower",
    title: "Welcoming a Little Miracle",
    subtitle: "Beautiful baby shower decorations filled with warmth and joy.",
    quote: "Tiny feet leave the biggest footprints in our hearts.",
    cover: "",
    images: [],
  },
  {
    id: "naming",
    name: "Naming Ceremony",
    title: "A Beautiful Beginning",
    subtitle: "Celebrate your baby's first milestone with elegant decorations.",
    quote: "Every name carries a story waiting to be written.",
    cover: "",
    images: [],
  },
  {
    id: "housewarming",
    name: "Housewarming",
    title: "Turning a House Into a Home",
    subtitle: "Traditional and modern décor for your special Gruhapravesam celebration.",
    quote: "Home is where beautiful memories begin.",
    cover: "",
    images: [],
  },
  {
    id: "retirement",
    name: "Retirement Party",
    title: "Celebrating a Lifetime of Achievements",
    subtitle: "Honor years of dedication with a memorable retirement celebration.",
    quote: "Retirement is not the end — it is the beginning of a new adventure.",
    cover: "",
    images: [],
  },
];

// ─── WhatsApp Icon ─────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.785.476 3.549 1.38 5.094L2 22l5.025-1.321A10.003 10.003 0 0 0 12.004 22C17.531 22 22 17.523 22 12.004S17.531 2 12.004 2zm0 18.182a8.181 8.181 0 0 1-4.17-1.143l-.3-.178-3.081.809.82-3.001-.196-.309A8.128 8.128 0 0 1 3.822 12c0-4.517 3.667-8.182 8.182-8.182S20.182 7.483 20.182 12c0 4.517-3.665 8.182-8.178 8.182z" />
    </svg>
  );
}

// ─── Gold Rule ────────────────────────────────────────────────────────────────

function GoldRule() {
  return (
    <div className="flex items-center gap-3 justify-center my-2">
      <div className="h-[1px] w-12 bg-[#c9a84c]/40" />
      <div className="w-1 h-1 rounded-full bg-[#c9a84c]/70" />
      <div className="h-[1px] w-12 bg-[#c9a84c]/40" />
    </div>
  );
}

// ─── Map Section ──────────────────────────────────────────────────────────────

const MAP_VIEWS = [
  { id: "map",       label: "Map",          src: "https://maps.google.com/maps?q=17.2500476,80.1448094&z=17&output=embed" },
  { id: "satellite", label: "Satellite / 3D", src: "https://maps.google.com/maps?q=17.2500476,80.1448094&z=19&t=k&output=embed" },
  { id: "street",    label: "Street View",  src: "https://www.google.com/maps/embed?pb=!4v1!6m8!1m7!1sNTAjy8eZjPwuVA6HgqwrAQ!2m2!1d17.250169!2d80.1449225!3f221.69!4f0!5f0.7820865974627469" },
];

function FindUsSection() {
  const [activeView, setActiveView] = useState<"map" | "satellite" | "street">("satellite");
  const current = MAP_VIEWS.find((v) => v.id === activeView)!;

  return (
    <section className="py-28 px-4 bg-[#060504]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase mb-4">Location</p>
          <h2 className="text-[34px] sm:text-4xl text-[#f5f0e8] font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}>
            Find Us in Khammam
          </h2>
          <GoldRule />
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Map panel */}
          <div className="border border-[#c9a84c]/18 overflow-hidden">
            <div className="bg-[#0d0b09] border-b border-[#c9a84c]/15 flex">
              {MAP_VIEWS.map((v) => (
                <button key={v.id} onClick={() => setActiveView(v.id as typeof activeView)}
                  className={`flex-1 py-3.5 text-[11px] tracking-[0.22em] uppercase transition-all ${
                    activeView === v.id
                      ? "text-[#c9a84c] bg-[#c9a84c]/8 border-b-2 border-[#c9a84c]"
                      : "text-[#f5f0e8]/40 hover:text-[#f5f0e8]/65 border-b-2 border-transparent"
                  }`}>
                  {v.label}
                </button>
              ))}
            </div>

            <div className="relative" style={{ height: "460px" }}>
              {MAP_VIEWS.map((v) => (
                <iframe key={v.id} src={v.src} width="100%" height="100%"
                  style={{ border: 0, position: "absolute", inset: 0,
                    opacity: activeView === v.id ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: activeView === v.id ? "auto" : "none" }}
                  loading="lazy" title={`Pasumarthi Banquet Hall — ${v.label}`} allowFullScreen />
              ))}
            </div>

            <div className="bg-[#0d0b09] border-t border-[#c9a84c]/10 px-5 py-3 flex items-center justify-between">
              <span className="text-[#f5f0e8]/30 text-[11px]">
                {activeView === "street" ? "Google Street View · Wyra Rd, Khammam"
                  : activeView === "satellite" ? "Google Satellite · 3D aerial view"
                  : "Google Maps · Nizampet, Khammam"}
              </span>
              <a href={ADDRESS.gmaps} target="_blank" rel="noopener noreferrer"
                className="text-[#c9a84c] text-[11px] flex items-center gap-1 hover:underline shrink-0">
                Open in Google Maps <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Info card */}
          <div className="border border-[#c9a84c]/18 bg-[#0d0b09] flex flex-col">
            <div className="border-b border-[#c9a84c]/12 px-6 py-5">
              <div className="text-[#c9a84c] text-lg font-bold"
                style={{ fontFamily: "var(--font-display)" }}>
                Pasumarthi Banquet Hall
              </div>
              <div className="text-[#f5f0e8]/30 text-[10px] tracking-[0.22em] uppercase mt-1">
                Khammam · Telangana
              </div>
            </div>

            <div className="px-6 py-6 space-y-5 flex-1">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 border border-[#c9a84c]/25 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-[#f5f0e8]/35 text-[10px] tracking-[0.2em] uppercase mb-1.5">Address</div>
                  <div className="text-[#f5f0e8]/60 text-[13px] leading-relaxed">
                    {ADDRESS.line1},<br />{ADDRESS.line2},<br />{ADDRESS.line3},<br />{ADDRESS.state}
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-[#c9a84c]/8" />
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 border border-[#c9a84c]/25 flex items-center justify-center shrink-0">
                  <Phone size={13} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-[#f5f0e8]/35 text-[10px] tracking-[0.2em] uppercase mb-1.5">Phone</div>
                  <div className="text-[#f5f0e8]/60 text-[13px]">{ADDRESS.phone1}</div>
                </div>
              </div>
              <div className="h-[1px] bg-[#c9a84c]/8" />
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 border border-[#c9a84c]/25 flex items-center justify-center shrink-0">
                  <Clock size={13} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-[#f5f0e8]/35 text-[10px] tracking-[0.2em] uppercase mb-1.5">Hours</div>
                  <div className="text-[#f5f0e8]/60 text-[13px]">{ADDRESS.timings}</div>
                  <div className="inline-flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-green-500/70 text-[11px]">Open Now</span>
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-[#c9a84c]/8" />
              <div>
                <div className="text-[#f5f0e8]/35 text-[10px] tracking-[0.2em] uppercase mb-3">Explore</div>
                <div className="grid grid-cols-3 gap-2">
                  {MAP_VIEWS.map((v) => (
                    <button key={v.id} onClick={() => setActiveView(v.id as typeof activeView)}
                      className={`py-2 text-[10px] tracking-wide border transition-all ${
                        activeView === v.id
                          ? "border-[#c9a84c]/60 bg-[#c9a84c]/10 text-[#c9a84c]"
                          : "border-[#c9a84c]/15 text-[#f5f0e8]/35 hover:border-[#c9a84c]/35 hover:text-[#f5f0e8]/55"
                      }`}>
                      {v.label === "Satellite / 3D" ? "3D View" : v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 space-y-2">
              <a href={ADDRESS.gmaps} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#c9a84c] text-[#0a0908] text-xs font-bold tracking-widest uppercase hover:bg-[#d4b558] transition-colors">
                <MapPin size={13} /> Get Directions
              </a>
              <a href={ADDRESS.justdial} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-[#c9a84c]/30 text-[#c9a84c] text-xs tracking-widest uppercase hover:border-[#c9a84c]/60 hover:bg-[#c9a84c]/5 transition-all">
                <ExternalLink size={12} /> JustDial Listing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ nav, onNav }: { nav: NavState; onNav: (n: NavState) => void }) {
  const [open, setOpen] = useState(false);
  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Menu", page: "menu" },
    { label: "Events", page: "categories" },
    { label: "Book Now", page: "book" },
  ];
  const activePage = nav.page === "category" ? "categories" : nav.page;

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0a0908]/95 backdrop-blur-lg border-b border-[#c9a84c]/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
        <button onClick={() => onNav({ page: "home" })} className="text-left shrink-0">
          <div className="text-[#c9a84c] font-bold text-[22px] leading-none tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}>Pasumarthi</div>
          <div className="text-[#f5f0e8]/30 text-[9px] tracking-[0.32em] uppercase mt-[3px]">
            Banquet Hall · Khammam
          </div>
        </button>

        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button key={l.page} onClick={() => onNav({ page: l.page })}
              className={`px-5 py-2 text-[13px] tracking-wide transition-all ${
                activePage === l.page ? "text-[#c9a84c]" : "text-[#f5f0e8]/50 hover:text-[#f5f0e8]/80"
              } ${l.page === "book"
                ? "ml-3 border border-[#c9a84c]/50 hover:border-[#c9a84c] hover:bg-[#c9a84c]/8 text-[#c9a84c]"
                : ""}`}>
              {l.label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-[#f5f0e8]/50 hover:text-[#c9a84c] transition-colors"
          onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0d0b09] border-t border-[#c9a84c]/10">
          {links.map((l) => (
            <button key={l.page} onClick={() => { onNav({ page: l.page }); setOpen(false); }}
              className={`block w-full text-left px-7 py-4 text-sm border-b border-[#c9a84c]/5 transition-colors ${
                activePage === l.page ? "text-[#c9a84c]" : "text-[#f5f0e8]/50 hover:text-[#c9a84c]"
              }`}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Shared Footer ────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (n: NavState) => void }) {
  return (
    <footer className="py-16 px-4 bg-[#060504]">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="text-[#c9a84c] text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-display)" }}>Pasumarthi</div>
          <div className="text-[#f5f0e8]/22 text-[9px] tracking-[0.28em] uppercase mb-5">Banquet Hall</div>
          <p className="text-[#f5f0e8]/28 text-sm leading-relaxed">
            One of the finest banquet halls in Khammam — where every celebration becomes an extraordinary memory.
          </p>
        </div>
        <div>
          <h4 className="text-[#f5f0e8]/45 text-[10px] font-semibold tracking-[0.28em] uppercase mb-5">Contact</h4>
          <div className="space-y-3.5 text-[#f5f0e8]/35 text-[13px]">
            <div className="flex items-start gap-3">
              <MapPin size={12} className="text-[#c9a84c] mt-[3px] shrink-0" />
              <span className="leading-relaxed">
                {ADDRESS.line1},<br />{ADDRESS.line2},<br />{ADDRESS.line3},<br />{ADDRESS.state}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={12} className="text-[#c9a84c] shrink-0" />
              <span>{ADDRESS.phone1}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={12} className="text-[#c9a84c] shrink-0" />
              <span>{ADDRESS.timings}</span>
            </div>
            <div className="flex items-center gap-3">
              <WhatsAppIcon size={12} />
              <span>WhatsApp Booking Available</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-[#f5f0e8]/45 text-[10px] font-semibold tracking-[0.28em] uppercase mb-5">Navigate</h4>
          <div className="space-y-3 text-[#f5f0e8]/35 text-[13px]">
            {([["Home","home"],["Veg Menu","menu"],["Events & Decorations","categories"],["Book Appointment","book"]] as [string,Page][])
              .map(([label, p]) => (
                <button key={p} onClick={() => onNav({ page: p })}
                  className="block hover:text-[#c9a84c] transition-colors text-left">{label}</button>
            ))}
            <a href={ADDRESS.justdial} target="_blank" rel="noopener noreferrer"
              className="block hover:text-[#c9a84c] transition-colors">JustDial Listing</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 border-t border-[#c9a84c]/8 text-center text-[#f5f0e8]/15 text-xs">
        © 2025 Pasumarthi Banquet Hall · All rights reserved · Khammam, Telangana
      </div>
    </footer>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

// Glassmorphism style helpers (home page + menu page)
const glass = {
  dark: {
    background: "rgba(6,5,4,0.62)",
    backdropFilter: "blur(30px) saturate(1.4)",
    WebkitBackdropFilter: "blur(30px) saturate(1.4)",
    border: "1px solid rgba(212,170,76,0.16)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)",
  },
  gold: {
    background: "rgba(212,170,76,0.10)",
    backdropFilter: "blur(22px) saturate(1.3)",
    WebkitBackdropFilter: "blur(22px) saturate(1.3)",
    border: "1px solid rgba(212,170,76,0.35)",
    boxShadow: "0 4px 24px rgba(212,170,76,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
  },
  silver: {
    background: "rgba(168,165,160,0.07)",
    backdropFilter: "blur(20px) saturate(1.2)",
    WebkitBackdropFilter: "blur(20px) saturate(1.2)",
    border: "1px solid rgba(168,165,160,0.22)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
  },
  light: {
    background: "rgba(245,240,232,0.05)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(245,240,232,0.12)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)",
  },
  chip: {
    background: "rgba(6,5,4,0.68)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(212,170,76,0.30)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
  },
} as const;

function HomePage({ onNav }: { onNav: (n: NavState) => void }) {
  const hallBg = {
    backgroundImage: `url(${hallImage})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={hallBg} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

        {/* Glass content card */}
        <div className="relative z-10 text-center px-10 py-12 mx-4 max-w-2xl w-full"
          style={glass.dark}>
          {/* Top gold accent line */}
          <div className="w-12 h-[1px] bg-[#d4aa4c] mx-auto mb-6" />
          <p className="text-[#d4aa4c]/80 text-[10px] tracking-[0.65em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="text-[56px] sm:text-7xl text-white font-light leading-[0.95] mb-1"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
            Pasumarthi
          </h1>
          <h2 className="text-[56px] sm:text-7xl text-[#d4aa4c] font-semibold leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
            Banquet Hall
          </h2>
          <GoldRule />
          <p className="text-white/50 text-[15px] mt-5 mb-9 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}>
            One of the finest banquet halls in Khammam — where every celebration becomes a cherished memory.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNav({ page: "book" })}
              className="px-9 py-3.5 bg-[#d4aa4c] text-[#0a0908] font-bold tracking-widest text-[11px] uppercase hover:bg-[#e0b85a] transition-colors">
              Book an Event
            </button>
            <button onClick={() => onNav({ page: "menu" })}
              className="px-9 py-3.5 text-[#d4aa4c] text-[11px] tracking-widest uppercase transition-all"
              style={glass.silver}>
              View Menu
            </button>
          </div>
          <div className="w-12 h-[1px] bg-[#d4aa4c]/30 mx-auto mt-8" />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-10 bg-[#d4aa4c]" />
          <span className="text-[#d4aa4c] text-[9px] tracking-[0.5em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────── */}
      <div className="py-3 overflow-hidden" style={{ background: "linear-gradient(90deg, #b8903a, #d4aa4c, #e8c870, #d4aa4c, #b8903a)" }}>
        <div className="flex gap-10 text-[#0a0908] text-[10px] tracking-[0.28em] uppercase font-bold whitespace-nowrap justify-center flex-wrap px-4">
          {["Finest Banquet Hall in Khammam", "Marble Interiors", "Exquisite Cuisine", "All Celebrations", "Nizampet · Khammam", "Silver Curtains · Crystal Chandelier"].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="inline-block w-1 h-1 rounded-full bg-[#0a0908]/35" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── About — hall image bg, glass panels ───────────────────── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0" style={hallBg} />
        <div className="absolute inset-0 bg-black/82" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left — text + stats */}
          <div>
            <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-6"
              style={glass.gold}>Our Story</span>
            <h2 className="text-[38px] sm:text-5xl text-white font-light leading-[1.08] mb-7"
              style={{ fontFamily: "var(--font-display)" }}>
              One of the Finest<br />
              <span className="text-[#d4aa4c] font-semibold italic">Banquet Halls</span><br />
              in Khammam
            </h2>
            <div className="space-y-3 text-[#a8a5a0] leading-relaxed text-[15px] mb-10">
              <p>Pasumarthi Banquet Hall stands as one of Khammam's most distinguished celebration venues. Our stunning marble floors, crystal chandelier, and silver-draped walls create an atmosphere of timeless elegance.</p>
              <p>From intimate family gatherings to grand wedding receptions, we offer customisable spaces, exquisite cuisine, and dedicated event coordination for every unforgettable moment.</p>
            </div>

            {/* Glass stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {[{ n: "200+", l: "Events Hosted" }, { n: "400+", l: "Guests Capacity" }, { n: "5+", l: "Years Service" }].map((s) => (
                <div key={s.l} className="p-5 text-center" style={glass.dark}>
                  <div className="text-[32px] text-[#d4aa4c] font-semibold leading-none mb-1"
                    style={{ fontFamily: "var(--font-display)" }}>{s.n}</div>
                  <div className="text-[#a8a5a0] text-[10px] tracking-wide leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — glass feature cards */}
          <div className="space-y-3 md:pt-[70px]">
            {[
              { title: "Grand Marble Interiors", desc: "Pristine marble floors, silver curtains, and a stunning crystal chandelier create an atmosphere of royalty." },
              { title: "Exquisite Catering", desc: "From savoury mains to traditional sweets — every dish is prepared with the finest ingredients." },
              { title: "Dedicated Event Team", desc: "Our coordinators handle décor, catering, and logistics so you can focus entirely on celebrating." },
              { title: "All Occasion Venue", desc: "Weddings, engagements, birthdays, namings — we set the perfect stage for every milestone." },
            ].map((f, i) => (
              <div key={i} className="p-5 flex gap-4 items-start" style={glass.dark}>
                <div className="w-[2px] h-8 bg-[#d4aa4c]/50 shrink-0 mt-1" />
                <div>
                  <div className="text-white/85 text-[15px] font-medium mb-1"
                    style={{ fontFamily: "var(--font-display)" }}>{f.title}</div>
                  <div className="text-[#a8a5a0] text-[13px] leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Find Us ───────────────────────────────────────────────── */}
      <FindUsSection />

      {/* ── Events preview ────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0d0b09]">
        <div className="max-w-7xl mx-auto">
          {/* Glass heading panel */}
          <div className="text-center mb-16">
            <div className="inline-block px-10 py-8 mb-4" style={glass.dark}>
              <span className="block text-[#d4aa4c] text-[9px] tracking-[0.48em] uppercase mb-3">We Host</span>
              <h2 className="text-[34px] sm:text-4xl text-white font-light leading-tight"
                style={{ fontFamily: "var(--font-display)" }}>
                Every Occasion,<br /><span className="text-[#d4aa4c] font-semibold italic">Every Joy</span>
              </h2>
              <GoldRule />
              <p className="text-[#a8a5a0] text-sm mt-3 max-w-sm leading-relaxed">
                From intimate namings to grand wedding receptions — we set the stage for every milestone.
              </p>
            </div>
          </div>

          {/* Featured row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
            <button onClick={() => onNav({ page: "category", categoryId: INITIAL_CATEGORIES[0].id })}
              className="group relative col-span-2 lg:col-span-2 overflow-hidden bg-[#111]" style={{ height: "360px" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                {/* Glass label chip */}
                <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.38em] uppercase px-2.5 py-1 mb-3"
                  style={{ background: "rgba(8,7,6,0.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(212,170,76,0.3)" }}>
                  {INITIAL_CATEGORIES[0].name}
                </span>
                <h3 className="text-white text-2xl font-light leading-snug mb-3"
                  style={{ fontFamily: "var(--font-display)" }}>{INITIAL_CATEGORIES[0].title}</h3>
                <div className="flex items-center gap-2 text-[#d4aa4c]/0 group-hover:text-[#d4aa4c] transition-all duration-300">
                  <span className="text-[11px] tracking-widest uppercase">View Gallery</span>
                  <ArrowRight size={12} />
                </div>
              </div>
              <div className="absolute inset-0 border border-[#d4aa4c]/0 group-hover:border-[#d4aa4c]/25 transition-all duration-500" />
            </button>

            <div className="col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INITIAL_CATEGORIES.slice(1, 4).map((cat) => (
                <button key={cat.id} onClick={() => onNav({ page: "category", categoryId: cat.id })}
                  className="group relative overflow-hidden bg-[#111]" style={{ height: "360px" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.35em] uppercase px-2 py-0.5 mb-2"
                      style={{ background: "rgba(8,7,6,0.6)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(212,170,76,0.25)" }}>
                      {cat.name}
                    </span>
                    <h3 className="text-white text-base font-light leading-snug mb-2.5"
                      style={{ fontFamily: "var(--font-display)" }}>{cat.title}</h3>
                    <div className="flex items-center gap-1.5 text-[#d4aa4c]/0 group-hover:text-[#d4aa4c] transition-all duration-300">
                      <span className="text-[10px] tracking-widest uppercase">Gallery</span>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-[#d4aa4c]/0 group-hover:border-[#d4aa4c]/22 transition-all duration-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INITIAL_CATEGORIES.slice(4).map((cat) => (
              <button key={cat.id} onClick={() => onNav({ page: "category", categoryId: cat.id })}
                className="group relative overflow-hidden bg-[#111]" style={{ height: "200px" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <div className="text-white/55 text-[10px] leading-snug group-hover:text-[#d4aa4c]/80 transition-colors duration-300">{cat.name}</div>
                  <div className="mt-1.5 text-[#d4aa4c]/0 group-hover:text-[#d4aa4c]/70 transition-all duration-300">
                    <ArrowRight size={10} />
                  </div>
                </div>
                <div className="absolute inset-0 border border-[#d4aa4c]/0 group-hover:border-[#d4aa4c]/18 transition-all duration-500" />
              </button>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => onNav({ page: "categories" })}
              className="inline-flex items-center gap-3 px-8 py-3.5 text-[#d4aa4c] text-[11px] tracking-[0.3em] uppercase hover:border-[#d4aa4c]/60 transition-all"
              style={glass.gold}>
              Explore All Events & Galleries <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Decoration Gallery ────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0" style={hallBg} />
        <div className="absolute inset-0 bg-black/86" />

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-5"
              style={glass.gold}>In-House Work</span>
            <h2 className="text-[32px] sm:text-4xl text-white font-light mb-3"
              style={{ fontFamily: "var(--font-display)" }}>
              Decorations <span className="text-[#d4aa4c] font-semibold italic">Available</span>
            </h2>
            <GoldRule />
            <p className="text-[#a8a5a0] text-sm mt-4 max-w-sm mx-auto leading-relaxed">
              Every setup is crafted in-house — stages, floral arrangements, and themed décor for any occasion.
            </p>
          </div>

          {/* Uniform grid — 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { alt: "Floral arch and candle event setup",  cat: "Floral & Arches",   label: "Creative Event Setup" },
              { alt: "Reception stage decoration",          cat: "Reception",          label: "Reception Decoration" },
              { alt: "Grand stage with floral wreath",      cat: "Stage",              label: "Grand Stage Setup" },
              { alt: "Themed event arrangement",            cat: "Themed Décor",       label: "Themed Arrangement" },
              { alt: "Banquet hall decoration",             cat: "Hall Décor",         label: "Banquet Décor" },
            ].map((d, i) => (
              <div key={i} className="group relative overflow-hidden bg-[#111]"
                style={{ height: "280px" }}>
                {/* Hover shimmer */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.35em] uppercase px-2 py-0.5 mb-2"
                    style={glass.chip}>{d.cat}</span>
                  <div className="text-white/85 text-[14px] font-light leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}>{d.label}</div>
                </div>
              </div>
            ))}

            {/* CTA tile — same height as photo cells */}
            <div className="relative flex flex-col items-center justify-center text-center p-8 gap-5"
              style={{ height: "280px", ...glass.dark }}>
              <div className="w-8 h-[1px] bg-[#d4aa4c]/40" />
              <div>
                <div className="text-white/75 text-[16px] font-light mb-1"
                  style={{ fontFamily: "var(--font-display)" }}>All Décor Done In-House</div>
                <div className="text-[#a8a5a0] text-xs leading-relaxed">
                  Stage, floral, lighting &amp; themed setups — customised for you.
                </div>
              </div>
              <button onClick={() => onNav({ page: "book" })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4aa4c] text-[#0a0908] font-bold text-[10px] tracking-widest uppercase hover:bg-[#e0b85a] transition-colors">
                Book a Decoration <ArrowRight size={12} />
              </button>
              <div className="w-8 h-[1px] bg-[#d4aa4c]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0a0908]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-5"
              style={glass.gold}>What Guests Say</span>
            <h2 className="text-[34px] sm:text-4xl text-[#f5f0e8] font-light mb-3"
              style={{ fontFamily: "var(--font-display)" }}>
              Reviews &amp; <span className="text-[#d4aa4c] font-semibold italic">Experiences</span>
            </h2>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={13} className="text-[#d4aa4c]" fill="#d4aa4c" />)}
              <span className="text-[#a8a5a0] text-xs ml-2.5">4.8 / 5 · Google & JustDial</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-7 flex flex-col gap-4 hover:border-[#d4aa4c]/35 transition-all"
                style={{ ...glass.dark, transition: "border-color 0.3s" }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-white/85 text-sm font-medium" style={{ fontFamily: "var(--font-display)" }}>{r.name}</div>
                    <div className="text-[#d4aa4c]/60 text-xs mt-0.5 tracking-wide">{r.event}</div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 shrink-0 tracking-wider uppercase text-[#d4aa4c]/55"
                    style={{ border: "1px solid rgba(212,170,76,0.22)" }}>{r.source}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={11} className="text-[#d4aa4c]" fill="#d4aa4c" />)}
                  {Array.from({ length: 5 - r.rating }).map((_, j) => <Star key={j} size={11} className="text-[#d4aa4c]/20" />)}
                </div>
                <p className="text-[#a8a5a0] text-sm leading-relaxed flex-1 italic">"{r.text}"</p>
                <div className="text-white/20 text-xs">{r.date}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center flex items-center justify-center gap-6">
            <a href={ADDRESS.gmaps} target="_blank" rel="noopener noreferrer"
              className="text-[#d4aa4c] text-sm hover:underline flex items-center gap-1.5">
              <ExternalLink size={13} /> View on Google Maps
            </a>
            <a href={ADDRESS.justdial} target="_blank" rel="noopener noreferrer"
              className="text-[#d4aa4c] text-sm hover:underline flex items-center gap-1.5">
              <ExternalLink size={13} /> View on JustDial
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0" style={hallBg} />
        <div className="absolute inset-0 bg-black/72" />
        {/* Gold shimmer overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at center, #d4aa4c 0%, transparent 70%)" }} />
        <div className="relative max-w-xl mx-auto text-center">
          <div className="px-10 py-12 mx-4" style={glass.dark}>
            <div className="w-10 h-[1px] bg-[#d4aa4c]/50 mx-auto mb-6" />
            <p className="text-[#d4aa4c]/70 text-[9px] tracking-[0.5em] uppercase mb-4">Reserve Your Date</p>
            <h2 className="text-4xl sm:text-5xl text-white font-light mb-2"
              style={{ fontFamily: "var(--font-display)" }}>Ready to Create</h2>
            <h2 className="text-4xl sm:text-5xl text-[#d4aa4c] font-semibold italic mb-6"
              style={{ fontFamily: "var(--font-display)" }}>Memories?</h2>
            <p className="text-[#a8a5a0] text-[15px] mb-10 leading-relaxed">
              Book your event today — our team will take care of every last detail.
            </p>
            <button onClick={() => onNav({ page: "book" })}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#d4aa4c] text-[#0a0908] font-bold tracking-widest text-[11px] uppercase hover:bg-[#e0b85a] transition-colors">
              <WhatsAppIcon size={16} /> Book via WhatsApp
            </button>
            <div className="w-10 h-[1px] bg-[#d4aa4c]/30 mx-auto mt-8" />
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  );
}

// ─── Menu Page ────────────────────────────────────────────────────────────────

const MENU_2_EXTRAS = ["Chicken Biryani"];
const WELCOME_DRINK = "Welcome Drink";
const SNACKS = "Snacks";

function MenuPage({ onNav }: { onNav: (n: NavState) => void }) {
  const allItems = [...MENU_ITEMS, WELCOME_DRINK, SNACKS, ...MENU_2_EXTRAS];
  const hallBg = {
    backgroundImage: `url(${hallImage})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="min-h-screen bg-[#0a0908]">
      {/* ── Hero header ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <div className="absolute inset-0" style={hallBg} />
        <div className="absolute inset-0 bg-black/75" />
        {/* gold shimmer */}
        <div className="absolute inset-0 opacity-8"
          style={{ background: "radial-gradient(ellipse at 50% 120%, #d4aa4c 0%, transparent 60%)" }} />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-8">
          <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.52em] uppercase px-3 py-1.5 mb-5"
            style={glass.gold}>Our Offerings</span>
          <h1 className="text-[46px] sm:text-6xl text-white font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}>
            Pure Veg <span className="text-[#d4aa4c] font-semibold italic">Menu</span>
          </h1>
          <div className="flex items-center gap-2 mt-4 text-[#a8a5a0] text-sm">
            <Leaf size={13} className="text-green-400/70" />
            100% Pure Vegetarian · Finest Quality Ingredients
          </div>
        </div>
      </div>

      <div className="px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* ── Unified menu card ──────────────────────────────────── */}
          <div style={glass.dark} className="overflow-hidden">
            {/* Card header */}
            <div className="px-8 py-6 flex items-center justify-between flex-wrap gap-3"
              style={{ borderBottom: "1px solid rgba(212,170,76,0.14)" }}>
              <div>
                <div className="text-[#d4aa4c] text-[9px] tracking-[0.45em] uppercase mb-1">Complete Listing</div>
                <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-display)" }}>
                  Full Menu — All Items
                </h2>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#a8a5a0]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#d4aa4c]/60" />
                  Veg
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                  Selectable
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  Non Veg
                </div>
              </div>
            </div>

            {/* Items grid */}
            <div className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3.5">
                {allItems.map((item, i) => {
                  const isNonVeg = MENU_2_EXTRAS.includes(item);
                  const isWelcomeDrink = item === WELCOME_DRINK;
                  const isSnacks = item === SNACKS;
                  const isGreen = isWelcomeDrink || isSnacks;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isNonVeg ? "bg-red-400/70" : isGreen ? "bg-green-400/70" : "bg-[#d4aa4c]/45"}`} />
                      <span className={`text-[13px] leading-snug ${isNonVeg ? "text-red-300/80 font-medium" : isGreen ? "text-green-300/80 font-medium" : "text-[#a8a5a0]"}`}>
                        {item}
                      </span>
                      {isNonVeg && (
                        <span className="text-[9px] text-red-400/70 px-1.5 py-0.5 border border-red-400/20 tracking-wide shrink-0">Non Veg</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Note */}
              <div className="mt-8 pt-6 flex items-start gap-3"
                style={{ borderTop: "1px solid rgba(212,170,76,0.1)" }}>
                <div className="w-[2px] h-10 bg-[#d4aa4c]/40 shrink-0 mt-0.5" />
                <p className="text-[#a8a5a0] text-xs leading-relaxed">
                  Welcome drinks and snacks can be selected — contact us.
                </p>
              </div>
            </div>
          </div>

          {/* ── For more details — Contact Us ───────────────────────── */}
          <div className="relative overflow-hidden" style={glass.dark}>
            {/* Subtle gold glow */}
            <div className="absolute inset-0 pointer-events-none opacity-15"
              style={{ background: "radial-gradient(ellipse at 50% 100%, #d4aa4c 0%, transparent 65%)" }} />

            <div className="relative p-8 sm:p-10">
              <div className="text-center mb-8">
                <div className="w-8 h-[1px] bg-[#d4aa4c]/40 mx-auto mb-5" />
                <span className="inline-block text-[#d4aa4c] text-[9px] tracking-[0.5em] uppercase px-3 py-1.5 mb-4"
                  style={glass.gold}>Want to Know More?</span>
                <h3 className="text-3xl sm:text-4xl text-white font-light mb-3"
                  style={{ fontFamily: "var(--font-display)" }}>
                  For More Menu Details<br />
                  <span className="text-[#d4aa4c] font-semibold italic">Connect With Us</span>
                </h3>
                <p className="text-[#a8a5a0] text-[14px] leading-relaxed max-w-md mx-auto">
                  Our team will walk you through the full menu, seasonal specials, custom packages, and pricing — just reach out.
                </p>
                <div className="w-8 h-[1px] bg-[#d4aa4c]/30 mx-auto mt-5" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "WhatsApp Us", sub: "Instant reply, 9AM–9PM", icon: <WhatsAppIcon size={18} />, action: () => {
                    const msg = "Hello, I would like to know more about the menu and packages at Pasumarthi Banquet Hall.";
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
                  }, primary: true },
                  { label: "Call Us", sub: ADDRESS.phone1, icon: <Phone size={17} />, action: () => window.open(`tel:${ADDRESS.phone1.replace(/\s/g,"")}`) },
                  { label: "Book an Event", sub: "Reserve your date", icon: <ArrowRight size={17} />, action: () => onNav({ page: "book" }) },
                ].map((c, i) => (
                  <button key={i} onClick={c.action}
                    className={`group flex flex-col items-center gap-3 px-6 py-6 transition-all ${
                      c.primary
                        ? "bg-[#25D366] hover:bg-[#20bd5a] text-white"
                        : "text-[#d4aa4c] hover:border-[#d4aa4c]/50"
                    }`}
                    style={c.primary ? {} : glass.gold}>
                    <div className={`w-10 h-10 flex items-center justify-center border ${
                      c.primary ? "border-white/25 text-white" : "border-[#d4aa4c]/35 text-[#d4aa4c]"
                    }`}>
                      {c.icon}
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold tracking-wide ${c.primary ? "text-white" : "text-[#d4aa4c]"}`}
                        style={{ fontFamily: "var(--font-display)" }}>{c.label}</div>
                      <div className={`text-[11px] mt-0.5 ${c.primary ? "text-white/70" : "text-[#a8a5a0]"}`}>{c.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center text-[#a8a5a0] text-xs flex items-center justify-center gap-2">
                <Clock size={11} className="text-[#d4aa4c]/60" />
                {ADDRESS.timings}
                <span className="mx-2 text-[#d4aa4c]/20">|</span>
                <MapPin size={11} className="text-[#d4aa4c]/60" />
                Nizampet, Khammam, Telangana
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

// ─── Categories Page ──────────────────────────────────────────────────────────

function CategoriesPage({ categories, onNav }: {
  categories: Category[];
  onNav: (n: NavState) => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0908]">
      <div className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase mb-5">We Host</p>
            <h1 className="text-[42px] sm:text-5xl text-[#f5f0e8] font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}>Events & Decorations</h1>
            <GoldRule />
            <p className="text-[#f5f0e8]/35 text-sm mt-5">
              Select any event to explore its dedicated gallery and add your decoration photos
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button key={cat.id}
                onClick={() => onNav({ page: "category", categoryId: cat.id })}
                className="group relative overflow-hidden text-left h-80 flex flex-col justify-end bg-[#111] border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10" />
                <div className="relative p-6">
                  <div className="text-[#c9a84c] text-[9px] tracking-[0.4em] uppercase mb-2 opacity-80">{cat.name}</div>
                  <h3 className="text-white text-xl font-bold leading-snug mb-2"
                    style={{ fontFamily: "var(--font-display)" }}>{cat.title}</h3>
                  <p className="text-white/40 text-[11px] italic leading-relaxed line-clamp-1 mb-4">"{cat.quote}"</p>
                  <div className="flex items-center gap-2 text-[#c9a84c]/70 text-[11px] group-hover:text-[#c9a84c] transition-colors">
                    <span className="tracking-wider">View Gallery</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

// ─── Category Detail Page ─────────────────────────────────────────────────────

function CategoryDetailPage({ category, categories, onNav, onUpdateCategory }: {
  category: Category;
  categories: Category[];
  onNav: (n: NavState) => void;
  onUpdateCategory: (id: string, images: string[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newUrls = files.map((f) => URL.createObjectURL(f));
    onUpdateCategory(category.id, [...category.images, ...newUrls]);
    e.target.value = "";
  };

  // Other categories for the "You may also like" strip (exclude current)
  const others = categories.filter((c) => c.id !== category.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0908]">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[420px] flex flex-col justify-end overflow-hidden bg-[#111]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-black/50 to-black/20" />

        {/* Breadcrumb */}
        <div className="absolute top-[88px] left-0 right-0 px-6 sm:px-10">
          <button onClick={() => onNav({ page: "categories" })}
            className="inline-flex items-center gap-2 text-[#f5f0e8]/45 hover:text-[#c9a84c] text-xs tracking-wide transition-colors">
            <ArrowLeft size={13} /> All Events
          </button>
        </div>

        {/* Title block */}
        <div className="relative px-6 sm:px-10 pb-14 max-w-4xl">
          <div className="text-[#c9a84c] text-[10px] tracking-[0.45em] uppercase mb-3">{category.name}</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}>{category.title}</h1>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-10 bg-[#c9a84c]/50" />
            <p className="text-white/50 text-sm italic">"{category.quote}"</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        {/* Subtitle + CTA row */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start mb-16 pb-16 border-b border-[#c9a84c]/10">
          <div>
            <p className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase mb-3">About This Event</p>
            <p className="text-[#f5f0e8]/60 text-[16px] leading-relaxed max-w-xl">{category.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <button onClick={() => onNav({ page: "book" })}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#c9a84c] text-[#0a0908] font-bold text-xs tracking-widest uppercase hover:bg-[#d4b558] transition-colors whitespace-nowrap">
              Book This Event
            </button>
            <button onClick={() => onNav({ page: "book" })}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-bold text-xs tracking-widest uppercase hover:bg-[#20bd5a] transition-colors">
              <WhatsAppIcon size={14} /> WhatsApp
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase mb-1">Decoration Gallery</p>
              <h2 className="text-2xl text-[#f5f0e8] font-bold"
                style={{ fontFamily: "var(--font-display)" }}>
                {category.images.length > 0
                  ? `${category.images.length} Photo${category.images.length !== 1 ? "s" : ""}`
                  : "Add Your First Photo"}
              </h2>
            </div>
            <button onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-[#c9a84c] text-xs border border-[#c9a84c]/35 hover:border-[#c9a84c]/70 hover:bg-[#c9a84c]/5 px-4 py-2.5 transition-all">
              <Camera size={13} /> Add Photos
            </button>
          </div>

          <input type="file" accept="image/*" multiple className="hidden"
            ref={fileInputRef} onChange={handleImageUpload} />

          {category.images.length === 0 ? (
            <div className="border border-dashed border-[#c9a84c]/18 py-24 text-center cursor-pointer hover:border-[#c9a84c]/40 transition-colors"
              onClick={() => fileInputRef.current?.click()}>
              <Camera size={36} className="text-[#c9a84c]/25 mx-auto mb-4" />
              <p className="text-[#f5f0e8]/30 text-base mb-1">No decoration photos yet</p>
              <p className="text-[#c9a84c]/40 text-sm">Click to upload photos for {category.name}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.images.map((img, idx) => (
                <div key={idx} className="group relative aspect-[4/3] overflow-hidden">
                  <img src={img} alt={`${category.name} decoration ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
              {/* Add more tile */}
              <button onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/3] border border-dashed border-[#c9a84c]/20 flex flex-col items-center justify-center gap-2 text-[#c9a84c]/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors">
                <Camera size={22} />
                <span className="text-[11px] tracking-wide">Add More</span>
              </button>
            </div>
          )}
        </div>

        {/* Other events */}
        {others.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#f5f0e8]/60 text-xs tracking-[0.3em] uppercase">Other Events</h3>
              <button onClick={() => onNav({ page: "categories" })}
                className="text-[#c9a84c] text-xs hover:underline flex items-center gap-1">
                View All <ArrowRight size={11} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {others.map((cat) => (
                <button key={cat.id}
                  onClick={() => onNav({ page: "category", categoryId: cat.id })}
                  className="group relative h-36 overflow-hidden text-left bg-[#111] border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <div className="text-white/55 text-[10px] tracking-wide leading-snug group-hover:text-[#c9a84c] transition-colors">
                      {cat.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer onNav={onNav} />
    </div>
  );
}

// ─── Book Page ────────────────────────────────────────────────────────────────

const EVENT_TYPES = [
  "Wedding / Reception", "Engagement Ceremony", "Ring Ceremony",
  "Birthday Party (Boys)", "Birthday Party (Girls)", "Anniversary Celebration",
  "Baby Shower / Seemantham", "Naming Ceremony", "Housewarming / Gruhapravesam",
  "Retirement Party", "Family Reunion", "Marriage", "Other",
];

function BookPage({ onNav }: { onNav: (n: NavState) => void }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", event: "", guests: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `*New Booking Request — Pasumarthi Banquet Hall*`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : null,
      `*Event:* ${form.event}`,
      `*Date:* ${form.date}`,
      `*Guests:* ${form.guests}`,
      form.message ? `\n*Special Requests:*\n${form.message}` : null,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const inputClass = "w-full bg-[#111009] border border-[#c9a84c]/15 text-[#f5f0e8] text-[13px] px-4 py-3.5 focus:outline-none focus:border-[#c9a84c]/50 placeholder:text-[#f5f0e8]/15 transition-colors";
  const labelClass = "block text-[#f5f0e8]/40 text-[10px] tracking-[0.28em] uppercase mb-2";

  return (
    <div className="min-h-screen bg-[#0a0908]">
      <div className="py-24 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase mb-5">Reserve Your Date</p>
            <h1 className="text-[42px] sm:text-5xl text-[#f5f0e8] font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}>Book an Appointment</h1>
            <GoldRule />
            <p className="text-[#f5f0e8]/35 text-sm leading-relaxed max-w-sm mx-auto mt-5">
              Fill in your details below. Your request will open directly in WhatsApp — just send it to reach our team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="border border-[#c9a84c]/12 bg-[#0d0b09] p-8 space-y-5">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" required value={form.name} onChange={update("name")} placeholder="Your full name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input type="tel" required value={form.phone} onChange={update("phone")} placeholder="+91 XXXXX XXXXX" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" value={form.email} onChange={update("email")} placeholder="Optional" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Event Type *</label>
              <select required value={form.event} onChange={update("event")} className={`${inputClass} appearance-none`}>
                <option value="" disabled>Select event type</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Event Date *</label>
              <input type="date" required value={form.date} onChange={update("date")}
                min={new Date().toISOString().split("T")[0]} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Number of Guests *</label>
              <input type="number" required value={form.guests} onChange={update("guests")}
                placeholder="e.g. 200" min="1" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Special Requests</label>
              <textarea value={form.message} onChange={update("message")}
                placeholder="Decoration theme, menu preference, special arrangements…"
                rows={4} className={`${inputClass} resize-none`} />
            </div>
            <button type="submit"
              className="w-full py-4 bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold tracking-widest text-xs uppercase transition-colors flex items-center justify-center gap-3">
              <WhatsAppIcon size={18} /> Send Booking Request via WhatsApp
            </button>
            {sent && (
              <div className="flex items-center gap-2 text-green-400/80 text-sm justify-center pt-1">
                <CheckCircle size={15} /> WhatsApp opened — send the message to confirm your booking.
              </div>
            )}
          </form>

          <div className="mt-10 text-center text-[#f5f0e8]/28 text-[13px] space-y-2.5">
            <div>Prefer to call? <span className="text-[#c9a84c]">{ADDRESS.phone1}</span></div>
            <div className="flex items-start justify-center gap-2 max-w-xs mx-auto">
              <MapPin size={12} className="text-[#c9a84c] mt-[3px] shrink-0" />
              <span className="leading-relaxed text-xs">{ADDRESS.full}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs">
              <Clock size={11} className="text-[#c9a84c]" /> <span>{ADDRESS.timings}</span>
            </div>
            <div className="flex items-center justify-center gap-5 pt-1">
              <a href={ADDRESS.gmaps} target="_blank" rel="noopener noreferrer"
                className="text-[#c9a84c] hover:underline text-xs flex items-center gap-1">
                <ExternalLink size={11} /> Google Maps
              </a>
              <a href={ADDRESS.justdial} target="_blank" rel="noopener noreferrer"
                className="text-[#c9a84c] hover:underline text-xs flex items-center gap-1">
                <ExternalLink size={11} /> JustDial
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [nav, setNav] = useState<NavState>({ page: "home" });
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const onNav = (n: NavState) => {
    setNav(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onUpdateCategory = (id: string, images: string[]) => {
    setCategories((cats) => cats.map((c) => c.id === id ? { ...c, images } : c));
  };

  const activeCategory = categories.find((c) => c.id === nav.categoryId);

  return (
    <div className="min-h-screen bg-[#0a0908]">
      <Navbar nav={nav} onNav={onNav} />
      <div className="pt-[68px]">
        {nav.page === "home" && <HomePage onNav={onNav} />}
        {nav.page === "menu" && <MenuPage onNav={onNav} />}
        {nav.page === "categories" && <CategoriesPage categories={categories} onNav={onNav} />}
        {nav.page === "category" && activeCategory && (
          <CategoryDetailPage
            category={activeCategory}
            categories={categories}
            onNav={onNav}
            onUpdateCategory={onUpdateCategory}
          />
        )}
        {nav.page === "book" && <BookPage onNav={onNav} />}
      </div>
    </div>
  );
}
