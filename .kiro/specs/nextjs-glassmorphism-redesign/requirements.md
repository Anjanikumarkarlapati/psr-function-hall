# Requirements Document

## Introduction

This document specifies requirements for redesigning the Pasumarthi Banquet Hall website from a Vite + React single-page application to a Next.js (App Router) project with glassmorphism as the primary design language throughout all pages and components. The redesign preserves all existing features, content, and branding while leveraging Next.js capabilities (server-side rendering, file-based routing, image optimization) and applying a cohesive glassmorphism visual system.

## Glossary

- **Application**: The Next.js web application for Pasumarthi Banquet Hall
- **Glassmorphism_System**: The set of reusable glass-style CSS utilities comprising semi-transparent backgrounds, backdrop-filter blur, subtle borders, and layered box-shadows applied consistently across all UI surfaces
- **App_Router**: The Next.js App Router (app/ directory) providing file-based routing, server components, and layouts
- **Navigation_Bar**: The persistent fixed-position top navigation component
- **Hero_Section**: The full-viewport introductory section on the home page featuring parallax background imagery and glassmorphic content overlay
- **Menu_Page**: The page displaying the vegetarian catering menu with package details
- **Events_Page**: The page listing all event categories with cover images and navigation to individual galleries
- **Category_Detail_Page**: The page for a specific event category showing its gallery, description, and booking CTAs
- **Booking_Page**: The page containing the WhatsApp booking form
- **Footer**: The persistent bottom component with contact information, navigation links, and business details
- **Image_Optimizer**: The Next.js Image component providing automatic responsive sizing, lazy loading, and format optimization
- **WhatsApp_Integration**: The feature that constructs a pre-filled WhatsApp message from form data and opens it in the user's WhatsApp client
- **Map_Section**: The embedded Google Maps section with switchable map, satellite, and street view tabs
- **Decoration_Gallery**: The section displaying in-house decoration photos with rotation correction for portrait-shot images
- **Reviews_Section**: The section displaying customer reviews from Google and JustDial sources

## Requirements

### Requirement 1: Next.js App Router Project Structure

**User Story:** As a developer, I want the project built with Next.js App Router, so that I benefit from server-side rendering, file-based routing, and optimized builds.

#### Acceptance Criteria

1. THE Application SHALL use Next.js 14+ with the App Router (app/ directory structure)
2. THE Application SHALL define routes as: `/` (home), `/menu` (menu), `/events` (categories listing), `/events/[categoryId]` (category detail), and `/book` (booking form)
3. THE Application SHALL implement a root layout providing shared Navigation_Bar, Footer, font loading, and metadata
4. THE Application SHALL use the Next.js Image component (Image_Optimizer) for all raster images to provide automatic lazy loading, responsive srcsets, and format optimization
5. THE Application SHALL configure Tailwind CSS 4 with custom theme extensions for the gold (#c9a84c / #d4aa4c), dark background (#0a0908), silver, and warm neutral color tokens
6. THE Application SHALL load custom fonts via next/font (display and body families) using CSS custom properties (--font-display, --font-body)

### Requirement 2: Glassmorphism Design System

**User Story:** As a user, I want the entire website to use a cohesive glassmorphism visual language, so that the experience feels modern, premium, and visually unified.

#### Acceptance Criteria

1. THE Glassmorphism_System SHALL define five reusable glass variants: dark, gold, silver, light, and chip — each specifying background rgba, backdrop-filter blur+saturate, border rgba, and box-shadow values
2. THE Glassmorphism_System SHALL apply the dark variant (rgba(6,5,4,0.62), blur 30px, saturate 1.4, gold-tinted border at 16% opacity) to primary content cards, stat cards, feature cards, review cards, and navigation overlays
3. THE Glassmorphism_System SHALL apply the gold variant (rgba(212,170,76,0.10), blur 22px, saturate 1.3, gold border at 35% opacity) to accent labels, section tags, and secondary action buttons
4. THE Glassmorphism_System SHALL apply the chip variant (rgba(6,5,4,0.68), blur 14px, gold border at 30% opacity) to floating category labels and small tag elements
5. THE Glassmorphism_System SHALL apply backdrop-filter to the Navigation_Bar (blur-lg on dark semi-transparent background) so it remains legible over scrolling content
6. WHILE a user scrolls on any page, THE Navigation_Bar SHALL maintain its glassmorphic backdrop-filter effect without flickering or performance degradation

### Requirement 3: Home Page

**User Story:** As a visitor, I want to see an impressive landing page with glassmorphic overlays on rich imagery, so that I immediately understand the venue's premium quality.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a full-viewport background image with parallax (background-attachment: fixed) and a glassmorphic dark-variant content card centered over a gradient overlay
2. THE Hero_Section SHALL contain the venue name ("Pasumarthi Banquet Hall"), a tagline, and two CTA buttons ("Book an Event" as primary gold button, "View Menu" as silver glass-variant button)
3. WHEN the home page loads, THE Application SHALL render a gold-gradient marquee strip below the hero displaying venue highlights as scrolling text
4. THE Application SHALL render an "About" section with glassmorphic stat cards (200+ Events Hosted, 300+ Guest Capacity, 10+ Years Service) and feature cards describing hall amenities
5. THE Application SHALL render the Map_Section with three switchable tabs (Map, Satellite/3D, Street View) using embedded Google Maps iframes and a glassmorphic info card showing address, phone, hours, and navigation links
6. THE Application SHALL render an events preview grid showing category cover images with glassmorphic label chips and hover-reveal gallery links
7. THE Application SHALL render the Decoration_Gallery section with rotation-corrected local photos and glassmorphic captions
8. THE Application SHALL render the Reviews_Section displaying customer reviews in glassmorphic dark-variant cards with star ratings, source badges, and review text

### Requirement 4: Menu Page

**User Story:** As a visitor, I want to browse the vegetarian menu with clear package differentiation, so that I can understand catering options before booking.

#### Acceptance Criteria

1. THE Menu_Page SHALL display a hero header with glassmorphic gold-variant label and page title over a parallax background
2. THE Menu_Page SHALL present two menu packages (Menu 1: 23 dishes, Menu 2: 25 dishes + Welcome Drink) in glassmorphic dark-variant cards with visual differentiation
3. THE Menu_Page SHALL list all menu items in a glassmorphic card grid with color-coded indicators distinguishing items common to both menus from Menu-2-exclusive items
4. THE Menu_Page SHALL include a "For More Details — Connect With Us" section with WhatsApp, Call, and Book action buttons in glassmorphic panels

### Requirement 5: Events and Category Pages

**User Story:** As a visitor, I want to browse event categories and their decoration galleries, so that I can see what the venue offers for my type of celebration.

#### Acceptance Criteria

1. THE Events_Page SHALL display all event categories (Weddings, Engagement, Ring Ceremony, Birthday Boys, Birthday Girls, Anniversary, Baby Shower, Naming Ceremony, Housewarming, Retirement) as image cards with glassmorphic gradient overlays and hover-state border animations
2. WHEN a user selects a category, THE Application SHALL navigate to the Category_Detail_Page showing a full-height cover hero, breadcrumb navigation, event description, booking CTAs, and decoration photo gallery
3. THE Category_Detail_Page SHALL allow users to upload decoration photos via a file input and display them in a responsive grid
4. THE Category_Detail_Page SHALL display an "Other Events" strip at the bottom linking to related categories

### Requirement 6: Booking Page with WhatsApp Integration

**User Story:** As a visitor, I want to fill out a booking form that sends my details via WhatsApp, so that I can quickly connect with the venue team.

#### Acceptance Criteria

1. THE Booking_Page SHALL present a form with fields: Full Name (required), Phone (required), Email (optional), Event Type (required, dropdown of predefined types), Event Date (required, date picker with min=today), Number of Guests (required), and Special Requests (optional textarea)
2. WHEN the user submits the form, THE WhatsApp_Integration SHALL construct a formatted message containing all form fields and open `https://wa.me/{number}?text={encodedMessage}` in a new tab
3. WHEN WhatsApp is opened successfully, THE Booking_Page SHALL display a confirmation notice indicating the user should send the message in WhatsApp
4. THE Booking_Page SHALL display venue contact information (phone, address, hours, Google Maps link, JustDial link) below the form

### Requirement 7: Responsive Design and Accessibility

**User Story:** As a user on any device, I want the website to be fully responsive and accessible, so that I can use it comfortably regardless of screen size or assistive technology.

#### Acceptance Criteria

1. THE Application SHALL implement responsive breakpoints for mobile (< 640px), tablet (640px–1024px), and desktop (> 1024px) using Tailwind's responsive prefixes
2. THE Navigation_Bar SHALL collapse into a mobile hamburger menu on screens narrower than 768px, with the mobile menu using a glassmorphic backdrop
3. THE Application SHALL provide sufficient color contrast (minimum WCAG AA 4.5:1 for body text) between text and glassmorphic backgrounds
4. THE Application SHALL use semantic HTML elements (nav, main, section, article, footer, headings) and appropriate ARIA attributes for interactive components
5. THE Application SHALL support keyboard navigation for all interactive elements including navigation links, form fields, buttons, and gallery uploads

### Requirement 8: Performance and SEO Optimization

**User Story:** As the business owner, I want the website to load fast and rank well in search engines, so that potential customers can find and access the venue information quickly.

#### Acceptance Criteria

1. THE Application SHALL render the home page with server-side rendering for initial HTML delivery containing all critical content
2. THE Application SHALL generate appropriate metadata (title, description, Open Graph tags) for each route using Next.js Metadata API
3. THE Application SHALL use Next.js Image component with priority loading for above-the-fold hero images and lazy loading for below-fold images
4. THE Application SHALL apply CSS containment or will-change hints on glassmorphic elements to optimize backdrop-filter rendering performance
5. IF a Google Maps iframe is below the viewport fold, THEN THE Application SHALL lazy-load the iframe to reduce initial page weight
