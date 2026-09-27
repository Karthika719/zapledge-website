# Zapledge Website — Architecture & Technical Design Documentation

This document provides a comprehensive technical breakdown of the Zapledge International website codebase, built on **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 1. 📁 Folder Structure

### Project Tree Overview

```text
zapledge-website/
├── public/                          # Static public assets served at root
│   ├── images/
│   │   ├── about/                   # Visuals for About section (e.g. connectivity network map)
│   │   ├── clients/                 # Partner and client brand logos for logo loop/ticker
│   │   ├── company_logo/            # Full Zapledge brand assets & variations
│   │   ├── industries/              # Visual assets for industry sectors
│   │   ├── services/                # Imagery for service capability cards
│   │   └── zapledge/                # Primary mark (icon.png) and lockup (logo.png)
│   └── ...
├── src/
│   ├── app/                         # Next.js 16+ App Router pages, layouts, and metadata
│   │   ├── about/                   # /about page & layout metadata
│   │   ├── careers/                 # /careers page & layout metadata
│   │   ├── case-study/              # /case-study page & layout metadata
│   │   ├── contact/                 # /contact page & layout metadata
│   │   ├── faq/                     # /faq dedicated page & layout metadata
│   │   ├── industries/              # /industries dedicated page & layout metadata
│   │   ├── privacy/                 # /privacy policy legal page
│   │   ├── services/                # /services dedicated page & layout metadata
│   │   ├── terms/                   # /terms of service legal page
│   │   ├── favicon.ico              # Browser icon
│   │   ├── globals.css              # Global styles, Tailwind v4 @import, CSS variables
│   │   ├── layout.tsx               # Root HTML/Body shell, font definitions
│   │   ├── loading.tsx              # Root fallback loading skeleton
│   │   ├── not-found.tsx            # Custom 404 handler
│   │   ├── page.tsx                 # Root landing page (aggregates core sections)
│   │   ├── robots.ts                # Dynamic robots.txt generation
│   │   └── sitemap.ts               # Dynamic sitemap.xml generation
│   ├── components/                  # Application components
│   │   ├── ui/                      # Reusable, domain-agnostic UI primitives
│   │   │   ├── AnimatedButton.tsx   # Interactive button with motion & variants
│   │   │   ├── DepthCarousel.tsx    # Layered 3D carousel widget
│   │   │   ├── LogoLoop.tsx         # Infinite scrolling partner/client marquee
│   │   │   ├── LogoLoop.css         # Keyframe animations for marquee
│   │   │   ├── SpotlightCard.tsx    # Cursor-following radial spotlight container
│   │   │   ├── SpotlightCard.css    # Spotlight hover styles
│   │   │   └── Tooltip.tsx          # Accessible floating tooltip helper
│   │   ├── AboutSection.tsx         # About company narrative & connectivity visual
│   │   ├── CtaContactSection.tsx    # Bottom CTA and contact card section
│   │   ├── FaqSection.tsx           # Dark navy accordion FAQ with JSON-LD schema
│   │   ├── Footer.tsx               # Global footer with copyright and legal links
│   │   ├── HeroSection.tsx          # Carousel-enabled Hero with event announcements
│   │   ├── HomeCTASection.tsx       # Alternate standalone CTA component
│   │   ├── IndustriesSection.tsx    # Tabbed interactive industry showcases (SVG scenes)
│   │   ├── IndustriesSection.css    # Keyframe animations for industry SVG diagrams
│   │   ├── NavBar.tsx               # Top floating capsule navigation & mobile drawer
│   │   ├── TrustedBySection.tsx     # Client credibility proof with dual logo loops
│   │   ├── WhatWeDoSection.tsx      # 4-card interactive capability grid
│   │   └── WhyZapledgeSection.tsx   # Sticky value proposition split-layout
│   ├── hooks/                       # Custom React hooks (contains .gitkeep placeholder)
│   └── styles/
│       ├── theme.ts                 # Centralized JavaScript/TypeScript design tokens
│       └── reference/               # Prompt and styling reference notes
├── Design.md                        # Master brand guidelines and layout decisions
├── AGENTS.md                        # Next.js agent execution rules
├── eslint.config.mjs                # ESLint configuration
├── next.config.ts                   # Next.js build configuration (Turbopack, React Compiler)
├── package.json                     # Project manifest and scripts
├── postcss.config.mjs               # PostCSS configuration for Tailwind v4
├── README.md                        # Project introductory readme
└── tsconfig.json                    # TypeScript compiler configuration
```

### Major Folder Roles

* **`src/app/`**: Implements the Next.js App Router paradigm. Houses route handlers, nested layouts, page components, static metadata handlers (`robots.ts`, `sitemap.ts`), and global styling (`globals.css`).
* **`src/components/`**: Houses large composite page sections (e.g. `HeroSection`, `IndustriesSection`, `FaqSection`) which structure content and local state.
* **`src/components/ui/`**: Houses atomized, reusable UI components (e.g. `AnimatedButton`, `LogoLoop`, `SpotlightCard`) with encapsulated styling and interaction logic.
* **`src/styles/`**: Defines design tokens in `theme.ts` (colors, typography, elevation, shadows, radii) exported for consumption in components.
* **`src/hooks/`**: Designated for reusable custom state and browser event hooks (currently reserved with `.gitkeep`).
* **`public/`**: Unprocessed static media assets organized cleanly by category (`clients`, `services`, `industries`, `zapledge`).

---

## 2. 🎨 Design System

### Token Architecture & Theme Location

The design system is structured across three synchronized layers:

1. **`Design.md`**: Authoritative brand guide defining color semantics, contrast rules, typography weights, and structural constraints.
2. **`src/styles/theme.ts`**: TypeScript-typed token registry exporting structured objects: `colors`, `typography`, `navigation`, `radii`, and `shadows`.
3. **`src/app/globals.css`**: Tailwind CSS v4 `@theme` block and root CSS variables bridging TypeScript tokens to utility classes (`--color-accent`, `--color-navy`, etc.).

### Token Specifications

| Category | Token Name | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Colors** | `accent` | `#0033FF` | Primary interactive royal blue (buttons, links, active tabs) |
| | `accentDark` | `#0022CC` | Pressed / hover active state for primary buttons |
| | `accentOnDark` | `#5C7CFF` | Graphic tints and glowing indicators on dark navy surfaces |
| | `navy` | `#00003C` | Deep Navy (headings, dark section fills, footers) |
| | `white` | `#FFFFFF` | Pure white canvas, card surfaces, and text on dark |
| | `offWhite` | `#FAFAFA` | Neutral section backgrounds (`light-section-tint`) |
| **Body Text** | `textPrimary` | `#333333` | Primary high-contrast body copy |
| | `textSecondary` | `#555555` | Subtitles, descriptive text, inactive tab labels |
| **Borders & Rules** | `border` | `#E5E5E5` | Default 1px low-contrast structural dividers |
| **Tints & Glows** | `accentGlow` | `rgba(0, 51, 255, 0.15)` | Diffused cursor spotlights and background glow |
| | `accentSoft` | `rgba(0, 51, 255, 0.05)` | Subtle pill badge background tints |
| | `ctaGradient` | `90deg, #0033FF, #00003C` | Primary high-priority action button gradient |
| **Typography** | `fontFamily` | `Inter, system-ui, sans-serif` | Universal typography via Google font variable `--font-inter` |
| | `weights` | `400, 600, 700, 800` | Regular body, semibold badges/tabs, extrabold headlines |
| | `tracking` | `-0.04em` to `+0.1em` |Authoritative tight headline tracking / wide uppercase badges |
| **Radii** | `sm`, `md`, `cardLg`, `full` | `8px`, `12px`, `24px`, `9999px` | Buttons (8px), small cards (16px), large containers (24px) |
| **Elevation** | `shadows.glow` | `0 0 25px rgba(0, 51, 255, 0.15)` | Photonic glow for interactive CTA elements |

---

## 3. 🧩 Components Architecture

The component hierarchy divides cleanly into **Layouts**, **Feature Sections**, and **Atomic UI Primitives**:

```
[ RootLayout (src/app/layout.tsx) ]
       │
       ├── [ NavBar (Floating Inset Header + Mobile Drawer) ]
       │
       └── [ Page Route (e.g. src/app/page.tsx) ]
             ├── [ HeroSection ] ──────────► uses [ AnimatedButton ]
             ├── [ AboutSection ]
             ├── [ WhatWeDoSection ] ──────► uses [ Next/Image, Next/Link ]
             ├── [ IndustriesSection ] ────► uses [ SVG Animation Stage ]
             ├── [ WhyZapledgeSection ] ───► uses [ Sticky Anchor Layout ]
             ├── [ TrustedBySection ] ─────► uses [ LogoLoop UI Primitive ]
             ├── [ FaqSection ] ───────────► uses [ JSON-LD FAQPage Schema ]
             └── [ CtaContactSection ] ────► uses [ AnimatedButton ]
       │
       └── [ Footer (Global Persistent Footer) ]
```

### Key Component Catalog

#### A. Layout & Navigation
* **`NavBar.tsx`**: Dual-mode floating navigation.
  * *Desktop (`md+`)*: 72px floating capsule with glassmorphism backdrop (`bg-white/80 backdrop-blur-md`), multi-tier hover menus for Services and Industries, and persistent CTA.
  * *Mobile (`< md`)*: Top bar with brand logo + hamburger trigger that opens a slide-over drawer with full accordion sub-navigation and consultation action.
* **`Footer.tsx`**: Static dark-navy footer providing legal navigation (`/privacy`, `/terms`) and copyright notices.

#### B. Page Section Components
* **`HeroSection.tsx`**: Themeable rotating carousel. Slide 1 preserves authoritative brand messaging; subsequent slides support timed event and webinar announcements with accessible keyboard and pause controls.
* **`WhatWeDoSection.tsx`**: Interactive 4-column capability showcase. Employs a hover-activated white panel slide-up revealing deep service descriptions over dark imagery cards.
* **`IndustriesSection.tsx`**: Tabbed sector showcase pairing vertical interactive tabs with an animated SVG stage demonstrating domain-specific technology pipelines (e.g. automated inventory tracking for Manufacturing Tech).
* **`WhyZapledgeSection.tsx`**: Asymmetric 2-column layout pairing a sticky left value proposition anchor (`sticky top-[110px]`) with a scrolling right list of 5 editorial pillar cards.
* **`TrustedBySection.tsx`**: Proof section utilizing multi-column animated `LogoLoop` marquees framed by corner brackets.
* **`FaqSection.tsx`**: Deep Navy (`#00003C`) accordion with single-open state management, solid-vs-dashed left border transitions, and embedded `schema.org/FAQPage` structured data.
* **`CtaContactSection.tsx`**: High-conversion bottom panel pairing direct email/phone contact information with inquiry routing.

#### C. UI Components (`src/components/ui/`)
* **`AnimatedButton.tsx`**: Polymorphic button/link supporting gradient, primary, and secondary visual styles with subtle scale transforms on hover.
* **`LogoLoop.tsx`**: Double-buffered continuous CSS marquee with linear keyframe animation and configurable speed/direction.
* **`SpotlightCard.tsx`**: Radial gradient spotlight overlay tracking mouse coordinates for tactile enterprise card hover states.

---

## 4. 📄 Routing & Page Architecture (App Router)

The application leverages Next.js App Router for static pre-rendering, search engine discoverability, and route-level metadata.

### Route Catalog

| Route Path | Type | Render Strategy | Primary Function |
| :--- | :--- | :--- | :--- |
| **`/`** | Root Page | Static (`SSG`) | Comprehensive homepage aggregating all major feature sections |
| **`/about`** | Subpage | Static (`SSG`) | Extended company history, mission, and leadership footprint |
| **`/services`** | Subpage | Static (`SSG`) | Deep architectural breakdowns of AI consulting, engineering, and automation |
| **`/industries`** | Subpage | Static (`SSG`) | Detailed industry vertical use cases and client sector roadmaps |
| **`/contact`** | Subpage | Static (`SSG`) | Consultation scheduling, inquiry form, and corporate communication channels |
| **`/faq`** | Subpage | Static (`SSG`) | Dedicated standalone FAQ page |
| **`/careers`** | Subpage | Static (`SSG`) | Open engineering, consulting, and AI architecture roles |
| **`/case-study`** | Subpage | Static (`SSG`) | Enterprise deployment results and client transformation case references |
| **`/privacy`** | Legal | Static (`SSG`) | Enterprise data protection, GDPR/DPDP policy guidelines |
| **`/terms`** | Legal | Static (`SSG`) | Service agreements and terms of engagement |
| **`/robots.txt`** | System | Dynamic (`robots.ts`) | Crawl directives and sitemap reference |
| **`/sitemap.xml`**| System | Dynamic (`sitemap.ts`) | Dynamic search engine indexing schema with priorities |
| **`/_not-found`** | System | Static (`not-found.tsx`)| Custom branded 404 recovery page |

### Metadata & Shell Hierarchy

1. **Root Shell (`src/app/layout.tsx`)**: Configures global Inter font loading, global styling imports, and the base HTML document structure.
2. **Subpage Layouts (`src/app/*/layout.tsx`)**: Provide targeted SEO metadata (`title`, `description`, OpenGraph tags) specific to each domain (e.g. Services, Industries, Careers) while inheriting the global shell.
3. **Global Loading State (`src/app/loading.tsx`)**: Built-in suspense fallback for smooth route transitions.

---

## 5. ⚙️ Utilities, Helpers & Logic

### Current Status

* **`src/styles/theme.ts`**: Central store for style constants and theme definitions.
* **`src/app/sitemap.ts` & `src/app/robots.ts`**: Dynamic Next.js metadata utility handlers generating search engine feeds.
* **`src/hooks/`**: Reserved for custom React hooks (e.g. `useScrollPosition`, `useMediaQuery`, `useClickOutside`).
* **`src/lib/`**: Not yet created. Utility functions (formatting, class merging, validation) are currently placed inline or within component files.

---

## 6. 🚀 Issues, Observations & Architectural Recommendations

### 1. Centralize Utility Functions (`src/lib/utils.ts`)
* **Observation**: Class name concatenation is performed using template literals across several components.
* **Recommendation**: Introduce a standard `cn()` helper leveraging `clsx` and `tailwind-merge` in `src/lib/utils.ts` to manage conditional classes cleanly and prevent Tailwind class precedence conflicts.

### 2. Standardize Shared Section Header Component
* **Observation**: Sections (`WhatWeDoSection`, `IndustriesSection`, `FaqSection`, `WhyZapledgeSection`) repeatedly implement identical eyebrow pinging badges and headline typography patterns in their JSX.
* **Recommendation**: Extract a reusable `<SectionHeader eyebrow="..." title="..." centered={true} />` component under `src/components/ui/SectionHeader.tsx` to ensure uniform typographic hierarchy and eliminate markup duplication.

### 3. Replace Hardcoded Navigation Links with Centralized Route Map
* **Observation**: URLs like `/services#transformation` or `/contact` are hardcoded in `NavBar.tsx`, `WhatWeDoSection.tsx`, and `Footer.tsx`.
* **Recommendation**: Create a `src/lib/routes.ts` or `src/constants/navigation.ts` file holding typed route definitions and anchor links to ensure single-source-of-truth route refactoring.

### 4. Optimize Image Elements in `TrustedBySection` and `LogoLoop`
* **Observation**: The logo marquee components currently utilize raw `<img>` tags, triggering Next.js LCP warnings during build.
* **Recommendation**: Migrate client logos to `next/image` with proper `sizes` and `loading="lazy"` attributes or custom SVG loader wrappers to optimize Core Web Vitals.

### 5. Transition Subpage Placeholders to Production Component Layouts
* **Observation**: Subpages such as `/services`, `/industries`, `/careers`, and `/case-study` contain placeholder text.
* **Recommendation**: Populate dedicated subpage layouts reusing modular sections (`CtaContactSection`, `FaqSection`, capability drill-down cards) when production copy is finalized.

---

## 7. Verification & Build Integrity

* **TypeScript Compilation**: `npx tsc --noEmit` exits with **0 errors**.
* **Linter Validation**: `npm run lint` passes cleanly.
* **Production Build**: `next build` (Next.js 16 with Turbopack) compiles all 15 static routes with complete static page pre-rendering.

