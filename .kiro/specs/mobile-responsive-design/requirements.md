# Requirements Document

## Introduction

This feature ensures the Pasumarthi Banquet Hall website is fully responsive and mobile-friendly across all pages and components. The site is built with Next.js, Tailwind CSS, and a glassmorphism design system. While some Tailwind responsive prefixes are already in place, there are gaps — fixed-height event cards that overflow on small screens, a marquee strip that wraps awkwardly, hero buttons that stack poorly, the booking form needing better touch targets, the lightbox needing swipe support, and the menu page's multi-column grid collapsing unevenly. All pages (Home, Events, Menu, Book) plus shared components (Navbar, Footer, BookingForm, GlassCard, GlassDatePicker) must render well and be usable at 320px–768px viewport widths.

## Glossary

- **Site**: The Pasumarthi Banquet Hall Next.js web application
- **Navbar**: The fixed top navigation bar (`components/Navbar.tsx`) with logo, desktop links, and mobile hamburger menu
- **Footer**: The bottom footer (`components/Footer.tsx`) with brand info, contact details, and navigation links
- **Hero**: The full-screen opening section of the Home page (`app/page.tsx`) with background image, glass card, and CTA buttons
- **Marquee**: The gold scrolling strip on the Home page that lists amenity highlights
- **EventGrid**: The image grid layout on the Home page Events Preview section with featured and secondary rows
- **GalleryGrid**: The photo grid on the Events page (`app/events/page.tsx`)
- **Lightbox**: The full-screen image viewer overlay on the Events page with prev/next navigation
- **BookingForm**: The enquiry form component (`components/BookingForm.tsx`) with name, phone, event type, date, guests fields
- **GlassDatePicker**: The custom date picker component (`components/GlassDatePicker.tsx`)
- **MenuPage**: The catering menu page (`app/menu/page.tsx`) with package cards and menu item grid
- **GlassCard**: The reusable glassmorphism card component (`components/GlassCard.tsx`)
- **WhatsAppFloat**: The floating WhatsApp button (`components/WhatsAppFloat.tsx`)
- **Breakpoint_Mobile**: Viewport width below 640px (Tailwind `sm` breakpoint)
- **Breakpoint_Tablet**: Viewport width 640px–1023px (Tailwind `sm` to `lg`)
- **Touch_Target**: An interactive element meeting the minimum 44×44px tap area recommended by WCAG 2.5.5

## Requirements

### Requirement 1: Viewport Meta and Base Mobile Configuration

**User Story:** As a mobile visitor, I want the site to render at the correct scale on my device, so that text and layout are not zoomed out or clipped.

#### Acceptance Criteria

1. THE Site SHALL include a `<meta name="viewport" content="width=device-width, initial-scale=1">` tag in the HTML `<head>` element
2. THE Site SHALL prevent horizontal scrolling at all viewport widths from 320px to 1440px
3. WHEN a user focuses an input field on iOS, THE Site SHALL prevent the browser from zooming in (font-size of 16px or greater on all inputs)
4. THE Site SHALL apply `overflow-x: hidden` to both `html` and `body` elements to prevent horizontal overflow

---

### Requirement 2: Navbar Mobile Behaviour

**User Story:** As a mobile visitor, I want to navigate the site easily on a small screen, so that I can reach any page without horizontal scrolling or tiny tap targets.

#### Acceptance Criteria

1. WHEN the viewport width is below 640px, THE Navbar SHALL display a hamburger icon button in place of the desktop navigation links
2. WHEN the hamburger button is tapped, THE Navbar SHALL expand a vertical dropdown menu containing all navigation links and the language toggle
3. WHEN a navigation link in the mobile menu is tapped, THE Navbar SHALL close the dropdown and navigate to the selected page
4. THE Navbar hamburger button SHALL meet the Touch_Target minimum of 44×44px
5. WHEN the viewport width is 640px or above, THE Navbar SHALL display the desktop horizontal navigation links and hide the hamburger button
6. THE Navbar logo text SHALL remain fully visible and untruncated at all viewport widths from 320px upward

---

### Requirement 3: Hero Section Responsiveness

**User Story:** As a mobile visitor, I want the homepage hero section to look polished and be fully usable on a small screen, so that the first impression of the venue is professional.

#### Acceptance Criteria

1. WHEN the viewport width is below 640px, THE Hero glass card SHALL have reduced horizontal padding (minimum 16px each side) so it does not overflow the screen
2. THE Hero heading text SHALL scale down proportionally using responsive font sizes (`text-[36px]` at mobile, `text-[56px]` at sm and above) without overflowing or truncating
3. THE Hero CTA buttons SHALL stack vertically in a column layout at Breakpoint_Mobile and display side by side at Breakpoint_Tablet and above
4. WHEN the viewport width is below 640px, THE Hero SHALL use `bg-attachment: scroll` instead of `bg-fixed` to prevent iOS parallax rendering issues
5. THE scroll indicator at the bottom of the Hero SHALL be visible and correctly positioned at all viewport widths

---

### Requirement 4: Home Page Marquee Strip

**User Story:** As a mobile visitor, I want the gold marquee strip to display cleanly without wrapping or overflowing, so that the page looks polished on small screens.

#### Acceptance Criteria

1. WHEN the viewport width is below 640px, THE Marquee items SHALL display in a single horizontally scrollable row without wrapping to a second line
2. THE Marquee strip SHALL not cause horizontal page scroll (it SHALL be contained within `overflow-hidden`)
3. THE Marquee animation SHALL run smoothly on mobile devices without frame drops

---

### Requirement 5: About Section and Stats Grid

**User Story:** As a mobile visitor, I want to read the about section and stats clearly on a small screen, so that I understand the venue's offering.

#### Acceptance Criteria

1. WHEN the viewport width is below 768px, THE About section's two-column `md:grid-cols-2` layout SHALL collapse to a single-column stack
2. THE Stats grid (three stat cards) SHALL remain in a three-column layout at Breakpoint_Mobile using compact sizing, without overflowing
3. THE Feature cards on the right column SHALL stack below the left column text on Breakpoint_Mobile without overlapping content
4. ALL text in the About section SHALL be legible at minimum 13px rendered size on Breakpoint_Mobile

---

### Requirement 6: Home Page Events Preview Grid

**User Story:** As a mobile visitor, I want to browse the events preview grid easily on a small screen, so that I can see the types of events the hall hosts.

#### Acceptance Criteria

1. WHEN the viewport width is below 640px, THE EventGrid featured row (the large card plus three smaller cards) SHALL collapse to a single-column vertical stack
2. WHEN the viewport width is below 640px, THE EventGrid secondary row (6 thumbnail cards at `lg:grid-cols-6`) SHALL display as a 2-column grid
3. THE fixed-height event cards SHALL maintain legible overlay text at all viewport widths without text overflow
4. THE hover states on EventGrid cards SHALL be replaced by visible static states (showing the category name and arrow) on touch-only devices, so content is discoverable without hover

---

### Requirement 7: Events Gallery Page

**User Story:** As a mobile visitor, I want to view the photo gallery and use the lightbox on a small screen, so that I can browse event decoration photos.

#### Acceptance Criteria

1. WHEN the viewport width is below 640px, THE GalleryGrid SHALL display in a 2-column layout (currently `grid-cols-2` at base, which is already correct — SHALL be verified maintained)
2. THE GalleryGrid images SHALL maintain their `aspect-[4/3]` ratio at all viewport widths to prevent layout shift
3. THE Lightbox close button and navigation arrows SHALL be positioned and sized to meet the Touch_Target minimum of 44×44px on Breakpoint_Mobile
4. WHEN the Lightbox is open on a mobile device, THE Lightbox SHALL display the image at maximum available viewport size without overflowing or requiring pinch-to-zoom for the whole image
5. THE Lightbox image counter SHALL be visible above the device's safe area (accounting for bottom browser chrome)
6. THE Quotes section grid SHALL collapse to a single column at Breakpoint_Mobile
7. THE Advertisements grid SHALL display as a single column at Breakpoint_Mobile

---

### Requirement 8: Booking Form

**User Story:** As a mobile visitor, I want to fill in and submit the booking enquiry form on my phone, so that I can request a date without needing a desktop.

#### Acceptance Criteria

1. THE BookingForm container SHALL be full-width on Breakpoint_Mobile with horizontal padding of at least 16px
2. ALL input fields (text, tel, number, select) in THE BookingForm SHALL have a minimum font-size of 16px to prevent iOS auto-zoom on focus
3. THE BookingForm submit button and WhatsApp send buttons SHALL meet the Touch_Target minimum of 44px height
4. THE GlassDatePicker SHALL be fully operable on a touchscreen — the calendar popup SHALL be large enough to tap individual day cells (minimum 36×36px per cell)
5. WHEN the form submission is successful, THE BookingForm SHALL display the WhatsApp send buttons stacked vertically and full-width on Breakpoint_Mobile so they are easy to tap
6. THE contact info section below THE BookingForm SHALL be readable and not overflow at Breakpoint_Mobile
7. WHEN the viewport width is below 640px, THE Book page header text SHALL use a font size no larger than 36px to prevent overflow

---

### Requirement 9: Menu Page Responsiveness

**User Story:** As a mobile visitor, I want to read the full catering menu and contact the hall on a small screen, so that I can evaluate the menu before booking.

#### Acceptance Criteria

1. WHEN the viewport width is below 640px, THE MenuPage hero header fixed height of 240px SHALL remain sufficient to display the heading without clipping
2. WHEN the viewport width is below 640px, THE MenuPage package legend cards SHALL stack to a single column
3. WHEN the viewport width is below 640px, THE MenuPage menu items grid SHALL display in a single column (instead of 2 or 3 columns) so item names are not truncated
4. THE MenuPage contact CTA section (WhatsApp, Call, Book buttons) SHALL stack to a single column at Breakpoint_Mobile with full-width buttons
5. THE MenuPage address and timings line SHALL wrap cleanly on Breakpoint_Mobile without overflowing or requiring horizontal scroll

---

### Requirement 10: Footer Responsiveness

**User Story:** As a mobile visitor, I want to read the footer contact information and links clearly on a small screen, so that I can find the venue address and phone numbers.

#### Acceptance Criteria

1. WHEN the viewport width is below 640px, THE Footer three-column grid (`sm:grid-cols-3`) SHALL collapse to a single-column stack with adequate vertical spacing between sections
2. ALL text in THE Footer SHALL be legible at a minimum of 12px rendered size on Breakpoint_Mobile
3. THE Footer navigation links SHALL meet the Touch_Target minimum of 44px height on Breakpoint_Mobile
4. THE Footer brand name and subtitle SHALL render on separate lines without truncation at 320px viewport width

---

### Requirement 11: WhatsApp Floating Button

**User Story:** As a mobile visitor, I want the floating WhatsApp button to be accessible without blocking page content, so that I can contact the hall at any point while browsing.

#### Acceptance Criteria

1. THE WhatsAppFloat button SHALL be positioned in the bottom-right corner with sufficient margin from the screen edge (minimum 16px) on all viewport sizes
2. THE WhatsAppFloat button SHALL meet the Touch_Target minimum of 44×44px on Breakpoint_Mobile
3. THE WhatsAppFloat button SHALL not overlap or obscure the BookingForm submit button or other primary CTAs when the user is interacting with them
4. WHERE the device has a bottom safe area inset (e.g. iPhone home indicator), THE WhatsAppFloat button SHALL be positioned above that inset

---

### Requirement 12: Typography Scaling

**User Story:** As a mobile visitor, I want all text to be readable at its natural size, so that I don't need to pinch-zoom to read content.

#### Acceptance Criteria

1. THE Site SHALL use relative or responsive font sizes such that body text renders at a minimum of 13px on Breakpoint_Mobile
2. THE Site heading font sizes SHALL scale down gracefully using Tailwind responsive prefixes so no heading overflows its container at 320px viewport width
3. THE Site SHALL not use fixed `px` font sizes larger than the container width that would cause text overflow on Breakpoint_Mobile
4. WHEN the language is set to Telugu, THE Site SHALL apply the Noto Sans Telugu font and maintain legible line heights on Breakpoint_Mobile

---

### Requirement 13: Touch Interactions and Accessibility

**User Story:** As a mobile visitor using touch, I want all interactive elements to be easy to tap and provide clear feedback, so that the site is comfortable and accessible to use.

#### Acceptance Criteria

1. THE Site SHALL ensure all interactive elements (links, buttons, form controls) have a minimum tap area of 44×44px on Breakpoint_Mobile
2. WHEN a button or link is tapped on a touch device, THE Site SHALL provide visible state feedback (active/pressed state) within 100ms
3. THE Lightbox navigation arrows SHALL be operable via swipe gestures on touch devices in addition to tap
4. THE Site SHALL not rely solely on hover states to reveal content or navigation options on touch devices
5. THE Site SHALL maintain correct focus order when the Navbar mobile menu is open, so keyboard and assistive technology users can navigate the menu items in sequence
