# Implementation Tasks

## Phase 1: Project Setup & Configuration

- [x] 1.1 Initialize Next.js 14+ project with App Router (`npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router, src directory disabled)
- [x] 1.2 Configure `next.config.ts` with image remote patterns for `images.unsplash.com`
- [x] 1.3 Set up Tailwind CSS 4 with custom theme tokens (gold, dark, silver, cream colors) in `app/globals.css`
- [x] 1.4 Configure `next/font` with display and body font families, exporting CSS variables `--font-display` and `--font-body` in `app/layout.tsx`
- [x] 1.5 Install minimal dependencies: `lucide-react`, `fast-check` (dev)
- [x] 1.6 Remove/ignore old Vite project files (this task only sets up the new Next.js project structure)

## Phase 2: Glassmorphism Style System

- [x] 2.1 Create `styles/glass.ts` exporting the typed `glass` object with all 5 variants (dark, gold, silver, light, chip) matching the design spec
- [x] 2.2 Create `GlassCard` reusable component that applies a variant's styles with optional className merging

## Phase 3: Data Layer

- [x] 3.1 Create `lib/data.ts` with all static data: `CATEGORIES`, `MENU_ITEMS`, `MENU_2_EXTRAS`, `REVIEWS`, `ADDRESS`, `WHATSAPP_NUMBER`, `EVENT_TYPES`, `MAP_VIEWS` — ported from existing `App.tsx`
- [x] 3.2 Create `lib/whatsapp.ts` with the pure `buildWhatsAppUrl` function extracted from the existing form submission logic
- [x] 3.3 Add TypeScript interfaces: `Category`, `Review`, `Address`, `MapView`, `WhatsAppFormData`

## Phase 4: Shared Components

- [x] 4.1 Create `components/GoldRule.tsx` (server component) — decorative gold divider
- [x] 4.2 Create `components/icons/WhatsAppIcon.tsx` (server component) — inline SVG
- [x] 4.3 Create `components/RotatedPhoto.tsx` (server component) — 90° CW rotation-corrected image using next/image
- [x] 4.4 Create `components/ReviewCard.tsx` (server component) — single review in glass-dark card
- [x] 4.5 Create `components/StatCard.tsx` (server component) — numeric stat with label
- [x] 4.6 Create `components/CategoryCard.tsx` (server component) — event category image card with hover effects and Link
- [x] 4.7 Create `components/Navbar.tsx` (client component) — fixed glassmorphic nav with mobile hamburger toggle, uses `usePathname()` for active state and `Link` for navigation
- [x] 4.8 Create `components/Footer.tsx` (server component) — contact info, navigation links, copyright
- [x] 4.9 Create `components/MapSection.tsx` (client component) — three-tab iframe switcher with glassmorphic info card

## Phase 5: Root Layout

- [x] 5.1 Implement `app/layout.tsx` with font loading, global metadata (title, description, OG tags), Navbar, Footer, and `<main>` wrapper
- [x] 5.2 Create `app/not-found.tsx` for custom 404 page with glassmorphic styling

## Phase 6: Home Page (`/`)

- [x] 6.1 Create `app/page.tsx` with server-rendered home page structure
- [x] 6.2 Implement Hero section — parallax background, gradient overlay, glass-dark content card with venue name, tagline, CTAs
- [x] 6.3 Implement Marquee strip — gold gradient bar with scrolling venue highlights
- [x] 6.4 Implement About section — stat cards (glass-dark) + feature cards (glass-dark) in two-column layout over parallax background
- [x] 6.5 Integrate MapSection component
- [x] 6.6 Implement Events Preview grid — featured category row + second row with glass chip labels and hover-reveal links
- [x] 6.7 Implement Decoration Gallery section — RotatedPhoto grid with glass chip captions + CTA tile
- [x] 6.8 Implement Reviews section — ReviewCard grid with source badges and external links
- [x] 6.9 Implement CTA section — glass-dark card with "Book via WhatsApp" button over parallax background

## Phase 7: Menu Page (`/menu`)

- [x] 7.1 Create `app/menu/page.tsx` with page metadata
- [x] 7.2 Implement hero header with glass-gold label and parallax background
- [x] 7.3 Implement package legend — two glass-dark cards for Menu 1 and Menu 2 with visual differentiation
- [x] 7.4 Implement combined menu card — glass-dark container with color-coded item grid (gold dots for shared, green for Menu-2 exclusive)
- [x] 7.5 Implement "Connect With Us" section — WhatsApp (green), Call, and Book buttons in glass panels

## Phase 8: Events Page (`/events`)

- [x] 8.1 Create `app/events/page.tsx` with page metadata
- [x] 8.2 Implement category grid using CategoryCard component — responsive grid with glassmorphic gradient overlays and hover border animations

## Phase 9: Category Detail Page (`/events/[categoryId]`)

- [x] 9.1 Create `app/events/[categoryId]/page.tsx` with dynamic metadata and `generateStaticParams`
- [x] 9.2 Implement cover hero with breadcrumb navigation, title block, and quote
- [x] 9.3 Implement description section with booking CTAs (gold button + WhatsApp button)
- [x] 9.4 Create `components/GalleryUpload.tsx` (client component) — file input, object URL creation, responsive image grid with "Add More" tile
- [x] 9.5 Implement "Other Events" strip — filtered category links excluding current

## Phase 10: Booking Page (`/book`)

- [x] 10.1 Create `app/book/page.tsx` with page metadata
- [x] 10.2 Create `components/BookingForm.tsx` (client component) — controlled form with all fields, validation, and WhatsApp submission
- [x] 10.3 Integrate `buildWhatsAppUrl` from `lib/whatsapp.ts` into form submit handler
- [x] 10.4 Implement confirmation notice display after successful WhatsApp open
- [x] 10.5 Implement contact info section below form (phone, address, hours, external links)

## Phase 11: Performance & SEO

- [x] 11.1 Add `priority` prop to above-the-fold hero `Image` components on home and menu pages
- [x] 11.2 Add `loading="lazy"` to Google Maps iframes in MapSection
- [x] 11.3 Add `will-change: transform` or CSS `contain: paint` to glassmorphic elements for backdrop-filter performance
- [x] 11.4 Add per-route metadata using Next.js Metadata API (title, description, openGraph) for all 5 routes
- [x] 11.5 Copy static images from `src/imports/` to `public/images/` and update references

## Phase 12: Accessibility

- [x] 12.1 Add semantic HTML elements: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, proper heading hierarchy
- [x] 12.2 Add ARIA attributes: `aria-label` on Navbar toggle, `aria-current` on active nav link, `aria-expanded` on mobile menu
- [x] 12.3 Ensure all interactive elements are keyboard-focusable with visible focus indicators
- [~] 12.4 Verify color contrast on glassmorphic backgrounds meets WCAG AA 4.5:1 for body text

## Phase 13: Testing

- [~] 13.1 Set up Vitest with React Testing Library for unit/component tests
- [ ] 13.2 Write property-based tests for `buildWhatsAppUrl` using fast-check (3 properties, 100+ iterations each)
  - [~] 13.2.1 Property 1: URL contains all required fields when decoded
  - [~] 13.2.2 Property 2: Encode/decode round-trip preserves message content
  - [~] 13.2.3 Property 3: Optional empty fields are excluded from message
- [~] 13.3 Write unit tests for `lib/data.ts` integrity (all categories have IDs, no empty names)
- [~] 13.4 Write unit tests for `styles/glass.ts` (all variants export valid properties)
- [~] 13.5 Write component tests for BookingForm (form validation, submit behavior)
- [~] 13.6 Write smoke tests verifying each route renders without errors
