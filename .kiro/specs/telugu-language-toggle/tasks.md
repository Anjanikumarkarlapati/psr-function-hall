# Tasks: Telugu Language Toggle

## Task 1: Create i18n Type System and Translation Dictionaries

- [ ] 1.1 Create `lib/i18n/types.ts` with `Locale` type and `TranslationDictionary` interface covering all sections (navbar, home, menu, events, book, footer)
- [ ] 1.2 Create `lib/i18n/en.ts` with complete English translation dictionary implementing `TranslationDictionary`
- [ ] 1.3 Create `lib/i18n/te.ts` with complete Telugu translation dictionary implementing `TranslationDictionary`
- [ ] 1.4 Create `lib/i18n/index.ts` with re-exports of types, dictionaries, and utilities

## Task 2: Implement Language Context Provider and Hook

- [ ] 2.1 Create `lib/i18n/LanguageProvider.tsx` with React Context providing `locale` state and `toggleLanguage` function
- [ ] 2.2 Implement localStorage read on mount (default to "en" if absent or invalid)
- [ ] 2.3 Implement localStorage write on locale change and dynamic `document.documentElement.lang` update
- [ ] 2.4 Create `lib/i18n/useTranslation.ts` hook returning `{ t, locale, toggleLanguage }` with English fallback for missing keys
- [ ] 2.5 Create `app/providers.tsx` client component wrapping children with `LanguageProvider`
- [ ] 2.6 Update `app/layout.tsx` to wrap children with `Providers` component and load Noto Sans Telugu font via `next/font/google`

## Task 3: Add Language Toggle Button to Navbar

- [ ] 3.1 Add `LanguageToggle` button component inside `components/Navbar.tsx` showing "తె" (when en) or "En" (when te)
- [ ] 3.2 Style the toggle with gold accent, consistent spacing, and proper placement (next to nav links on desktop, inside mobile menu on mobile)
- [ ] 3.3 Add `aria-label` ("Switch to Telugu" / "Switch to English") for accessibility

## Task 4: Translate Navigation and Footer Components

- [ ] 4.1 Update `components/Navbar.tsx` to use `useTranslation()` for nav link labels and brand subtitle (keep "Pasumarthi" in English)
- [ ] 4.2 Update `components/Footer.tsx` to use `useTranslation()` for section headings, nav links, tagline, and copyright text

## Task 5: Translate Home Page Content

- [ ] 5.1 Convert `app/page.tsx` to a client component (or create a client wrapper) and integrate `useTranslation()` for hero section text
- [ ] 5.2 Translate marquee items, "Our Story" section, stat cards, and feature cards
- [ ] 5.3 Translate events preview section labels and headings (category names/titles from dictionary)
- [ ] 5.4 Translate reviews section heading and CTA section text

## Task 6: Translate Menu Page Content

- [ ] 6.1 Convert `app/menu/page.tsx` to use `useTranslation()` for page heading, description, and section labels
- [ ] 6.2 Translate menu item names using the `menu.items` dictionary mapping
- [ ] 6.3 Translate package descriptions, legend labels, notes, and CTA section text

## Task 7: Translate Events Pages Content

- [ ] 7.1 Update `app/events/page.tsx` to use `useTranslation()` for page heading, subtitle, and category names/titles
- [ ] 7.2 Update `app/events/[categoryId]/page.tsx` to use `useTranslation()` for category title, subtitle, quote, and gallery labels

## Task 8: Translate Booking Page Content

- [ ] 8.1 Update `app/book/page.tsx` to use `useTranslation()` for page heading and description
- [ ] 8.2 Update `components/BookingForm.tsx` to use `useTranslation()` for all form labels, placeholders, event type options, submit button, success message, and contact info section

## Task 9: Telugu Font and Rendering

- [ ] 9.1 Configure Noto Sans Telugu font in layout with CSS variable `--font-telugu`
- [ ] 9.2 Add CSS rules to apply Telugu font family when `[lang="te"]` is set on the HTML element
- [ ] 9.3 Verify Telugu glyphs render correctly (no overlap, proper line height) and adjust font-size if needed for legibility

## Task 10: Testing

- [ ] 10.1 Write property-based tests for dictionary completeness (all English keys exist in Telugu)
- [ ] 10.2 Write property-based tests for locale persistence round trip (store → read = same value)
- [ ] 10.3 Write property-based tests for toggle involution (toggle twice = original state)
- [ ] 10.4 Write property-based tests for fallback behavior (missing Telugu key returns English value)
- [ ] 10.5 Write unit tests for LanguageProvider (default state, toggle click, localStorage integration)
- [ ] 10.6 Write unit tests for Navbar toggle button rendering and aria-label correctness
