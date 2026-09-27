# Zapledge International — Visual Design System & Pattern Reference

> **Notice**: This document serves as the authoritative, empirical design system reference for the Zapledge International website codebase. All future feature implementations, service detail pages, and UI enhancements **MUST** reference and adhere to the specifications documented here.

---

## 1. Brand & Visual Identity

### A. Color Architecture
Zapledge's color system is directly derived from its two-tone brand logomark: a hexagonal outline mark in **Deep Navy (`#00003C`)** containing an inner stylized "Z" chevron in **Bright Blue (`#0033FF`)**.

| Token Name | Hex / Value | CSS Variable / Tailwind | Usage Context |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `#0033FF` | `--color-accent` | Primary brand callouts, active indicators, eyebrow text, hover states |
| **Accent Dark** | `#0022CC` | `--color-accent-dark` | Hover / pressed states for primary buttons |
| **Accent On Dark** | `#5C7CFF` | `--color-accent-on-dark` | High-contrast accent links & graphic details on navy backgrounds |
| **Deep Navy** | `#00003C` | `--color-navy` | Text primary headings, dark brand cards, footer background, curtain backdrop |
| **Pure White** | `#FFFFFF` | `--color-white` | Primary card fills, curtain main wrapper, navigation bar background |
| **Off White** | `#FAFAFA` | `--color-off-white` | Alternating section fills, secondary card surfaces |
| **Text Primary** | `#333333` / `#00003C` | `--color-text-primary` | Main body copy (`#333333`), section headlines (`#00003C`) |
| **Text Muted** | `#555555` | `--color-text-secondary` | Subheadlines, paragraph text, secondary labels |
| **Border Subtle** | `#E5E5E5` | `--color-border` / `border-[#E5E5E5]` | Card borders, section separators, navigation container borders |

### B. Tints & Accent Overlays
- **Accent Soft Background**: `rgba(0, 51, 255, 0.05)` — Used for pill badges, tag fills, and active tab highlights.
- **Accent Glow**: `rgba(0, 51, 255, 0.15)` — Used for mouse-follow spotlights, card hover halos, and focus rings.
- **Light Section Tint**: `radial-gradient(circle at 50% 0%, rgba(0, 51, 255, 0.04) 0%, rgba(255, 255, 255, 0) 70%), #FFFFFF` — Applied to light sections to eliminate flat white starkness while remaining subtle.

### C. Gradient Definitions
1. **Brand CTA Gradient**: `linear-gradient(90deg, #0033FF 0%, #00003C 100%)`
   - Used for primary CTA buttons, high-impact action badges, and accent gradient bars.
2. **Radial Section Spotlight**: `radial-gradient(90% 80% at 50% 0%, rgba(0, 51, 255, 0.12), rgba(0, 51, 255, 0) 70%)`
   - Used for top-of-section background highlights (e.g. `HomeCTASection`, service detail CTAs).
3. **Quiet Navy Footer Gradient**: `linear-gradient(180deg, #00003C 0%, #0a1a4d 40%, #1a2f7a 100%)`
   - Used exclusively for the reveal footer, maintaining depth without harsh solid black.

---

## 2. Typography System

### A. Font Family
- **Primary Font**: `Inter` (via Google Fonts / Next.js font configuration).
- **Fallback Stack**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`.
- **CSS Variable**: `--font-inter` / `font-sans`.

### B. Type Hierarchy & Responsive Scale

| Role | Font Weight | Mobile Size | Tablet Size | Desktop Size | Letter Spacing | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `800` (Extrabold) | `32px–40px` (`text-4xl`) | `44px–52px` (`text-5xl`) | `54px–64px` (`text-[54px]`) | `-0.03em` (`tracking-tight`) | `1.1` |
| **Section H2** | `800` (Extrabold) | `28px–32px` (`text-3xl`) | `36px–40px` (`text-4xl`) | `42px–46px` (`text-[42px]`) | `-0.025em` (`tracking-tight`) | `1.15` |
| **Subhead / Card H3** | `700` (Bold) | `18px–20px` (`text-lg`) | `20px–22px` (`text-xl`) | `22px–24px` (`text-[22px]`) | `-0.015em` (`tracking-tight`) | `1.25–1.35` |
| **Body Paragraph** | `400` (Regular) | `14px–15px` (`text-sm`) | `15px–16px` (`text-base`) | `16px–18px` (`text-lg`) | `normal` | `1.6–1.65` |
| **Eyebrow / Badge** | `700` (Bold) | `11px` (`text-[11px]`) | `12px` (`text-xs`) | `12px` (`text-xs`) | `+0.08em` (`tracking-wider`) | `1.0` |

### C. Sizing Mechanics
Typography sizes are enforced via **Tailwind responsive breakpoint prefixes** (`sm:`, `md:`, `lg:`, `xl:`) combined with strict max-widths on container headings (e.g. `max-w-3xl` or `max-w-4xl`) to prevent long unreadable line lengths.

---

## 3. Layout & Container Architecture

### A. Horizontal Grid Boundaries
- **Maximum Container Widths**:
  - `max-w-7xl` (1280px) — Standard section container (e.g., `WhatWeDoSection`, `IndustriesSection`, `Capabilities`).
  - `max-w-6xl` (1152px) — Dedicated hero & narrative container.
  - `max-w-5xl` (1024px) / `max-w-3xl` (768px) — Centered text blocks, overview cards, and FAQ regions.
  - `max-w-[1440px]` — Footer width container.
- **Page Horizontal Padding**:
  - Desktop: `px-12 lg:px-16`
  - Tablet: `px-8 md:px-12`
  - Mobile: `px-6`

### B. Vertical Section Padding
- **Standard Major Sections**: `py-20 sm:py-24 lg:py-28`
- **Compact Bands & Interstitials**: `py-16 sm:py-20 lg:py-24`
- **Hero Top Padding**: `pt-32 sm:pt-36 lg:pt-40` (accounting for the `72px` floating fixed navigation bar).

### C. Main Curtain Layout Pattern (`data-reveal-curtain`)
The site uses a layered "curtain reveal" layout architecture:
1. `<main data-reveal-curtain>`:
   - Position: `relative z-10`
   - Background: `#FFFFFF`
   - Bottom Radius: `rounded-b-[28px] md:rounded-b-[40px] lg:rounded-b-[48px]`
   - Shadow: `shadow-[0_40px_80px_rgba(0,0,30,var(--curtain-shadow,0))]`
2. `<footer>`:
   - Position: `sticky bottom-0 z-0`
   - As the main curtain scrolls up, the footer is progressively revealed underneath.

---

## 4. Component Language & Visual Tokens

### A. Navigation Bar (`src/components/NavBar.tsx`)
- **Structure**: Floating 72px capsule bar mounted inside fixed header with `pointer-events-none` container and `pointer-events-auto` inner capsule bar.
- **Background**:
  - Default: `bg-white border border-[#E5E5E5] shadow-sm`
  - Scrolled (>20px): `bg-white/80 backdrop-blur-md border-[#E5E5E5] shadow-lg shadow-[#00003C]/5`
- **Radius**: `rounded-2xl` (16px).
- **Mega Menu Dropdowns**: `bg-white/95 backdrop-blur-md border border-[#E5E5E5] rounded-2xl shadow-xl shadow-[#00003C]/8`.
- **Mobile Menu**: Full-height drawer panel sliding in from right (`animate-in slide-in-from-right duration-300`) with semi-transparent dark backdrop (`bg-[#00003C]/60 backdrop-blur-sm`).

### B. Buttons & Call-to-Actions (`src/components/ui/AnimatedButton.tsx`)
- **Primary Action Button**:
  - Shape: Full pill (`rounded-full`).
  - Fill: `bg-[linear-gradient(90deg,#0033FF,#00003C)]` or solid `#0033FF`.
  - Typography: White text (`#FFFFFF`), `font-bold`, `text-sm` or `text-base`.
  - Hover: `hover:-translate-y-px hover:opacity-90` with shadow transition.
- **Secondary / Outline Button**:
  - Shape: Full pill (`rounded-full`).
  - Fill: `bg-white` or `bg-[#FAFAFA]`, border `border-[#E5E5E5]`.
  - Typography: Text `#00003C`, `font-bold`.
  - Hover: `hover:border-[#0033FF]/30 hover:text-[#0033FF]`.

### C. Cards & Feature Blocks
- **Card Radius Hierarchy**:
  - Small Cards / Badges: `rounded-xl` (12px)
  - Medium Feature Cards: `rounded-2xl` (16px)
  - Large Editorial Cards / Container Wrappers: `rounded-3xl` (24px)
- **Interactive Service Cards (`WhatWeDoSection.tsx`)**:
  - Dimensions: Fixed height `h-[360px] sm:h-[380px]`.
  - Background: Image with dark gradient overlay (`bg-[#00003C]`, gradient from `#00003C` to transparent).
  - Hover Interaction: White panel slides up from bottom (`translate-y-full opacity-0` -> `translate-y-0 opacity-100` in 300ms ease-out).
- **Feature Cards (`WhyZapledgeSection.tsx` & `Capabilities.tsx`)**:
  - Fill: `bg-white` or `bg-[#FAFAFA]`, border `border-[#E5E5E5]/90`.
  - Hover: `hover:border-[#0033FF]/40 hover:shadow-[0_12px_30px_-4px_rgba(0,51,255,0.08)]`.

### D. Eyebrow Badges & Status Pills
- **Badge Shape**: Full pill (`rounded-full`).
- **Badge Fills**: `bg-[#0033FF]/5 border border-[#0033FF]/15`.
- **Text Styling**: `text-xs font-bold tracking-wider text-[#0033FF] uppercase`.
- **Pulse Indicator**: Live animated pinging dot (`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75`).

### E. FAQ Accordion (`src/components/FaqSection.tsx`)
- **Container**: Border-left indicator (`border-l border-dashed border-[#00003C]/30` when closed -> `border-l border-solid border-[#00003C]` when open).
- **Header**: Button with question title and 20x20px square icon box.
- **Chevron Rotation**: 180° rotation transform on expand.
- **Answer Panel Animation**: CSS Grid transition (`grid-rows-[0fr] opacity-0` -> `grid-rows-[1fr] opacity-100` in 300ms).

---

## 5. Motion & Animation Principles

1. **Sliding Panels & Hover Transitions**:
   - Duration: `300ms`
   - Easing: `ease-out` / `cubic-bezier(0.16, 1, 0.3, 1)`
   - Property constraints: `transform`, `opacity`, `border-color`, `box-shadow` (avoid animating height/width directly).
2. **Continuous Logo Marquee (`TrustedBySection.tsx`)**:
   - CSS Keyframes: Infinite linear translation with gradient mask edges (`mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`).
3. **SVG Data Scenes (`IndustriesSection.tsx`)**:
   - Keyframe pulse effects (`stroke-dashoffset` data pulse animation).
   - Interactive tab switching between 4 custom SVG vector scenes (Manufacturing, FinTech, WealthTech, HealthTech).
4. **Footer Curtain Reveal (`useFooterReveal.ts`)**:
   - Driven by scroll position calculation in `requestAnimationFrame` without React state re-renders per frame.
   - Updates CSS custom properties (`--reveal-dim`, `--row1-o`, `--row1-y`, `--curtain-shadow`).

---

## 6. Overall Visual Character

The Zapledge visual identity is:
- **Enterprise-Grade & Credible**: Styled like a serious B2B AI consulting/engineering firm (similar in caliber to Accenture/HCLTech), not a trendy consumer AI gimmick.
- **Clean & Editorial**: High contrast navy/white structure, ample whitespace, rounded card geometries.
- **No Generic AI Clichés**: **Zero** floating stock brains, robot hands, holograms, or generic sci-fi particles. All visuals represent real systems architecture, data pipelines, workflow automation, and structured software logic.

---

## 7. Responsive Breakpoint Guidelines

| Breakpoint | Width Boundary | Typical Layout Adaptation |
| :--- | :--- | :--- |
| **Mobile (`default`)** | `< 640px` | Single-column vertical stacks, 100% full-width buttons, hamburger menu overlay |
| **Small Tablet (`sm:`)** | `>= 640px` | 2-column card grids, horizontal button groups |
| **Large Tablet (`md:`)** | `>= 768px` | Navbar desktop menu visible, expanded 2-column editorial splits |
| **Desktop (`lg:`)** | `>= 1024px` | 3 or 4-column card grids, 12-column complex grids, side-by-side SVG stage displays |
| **Wide Desktop (`xl:`)** | `>= 1280px` | Max container width constraint (`1280px`), extra padding |

---

## 8. Reusable Component Registry

The following table lists existing components that **MUST** be reused on future pages:

| Component Name | File Location | Purpose & Function | Reusability Guidance |
| :--- | :--- | :--- | :--- |
| `NavBar` | `src/components/NavBar.tsx` | Global top floating navigation capsule & drawer | Managed automatically via `RootLayout`. |
| `Footer` | `src/components/Footer.tsx` | Global curtain reveal footer | Managed automatically via `RootLayout`. |
| `AnimatedButton` | `src/components/ui/AnimatedButton.tsx` | Standard brand CTA button (pill style) | **Reuse** for all primary & secondary CTAs. |
| `FAQSection` | `src/components/FaqSection.tsx` | Accessible expandable accordion FAQ with schema | **Reuse** for all FAQ sections across pages. |
| `WhatWeDoSection` | `src/components/WhatWeDoSection.tsx` | 4-card service overview with sliding panels | **Reuse** for service overview representations. |
| `IndustriesSection` | `src/components/IndustriesSection.tsx` | 2-column SVG industry interactive stage | **Reuse** for industry sector presentations. |
| `WhyZapledgeSection` | `src/components/WhyZapledgeSection.tsx` | 5-card differentiator block | **Reuse** or adapt for value proposition sections. |
| `TrustedBySection` | `src/components/TrustedBySection.tsx` | Continuous scrolling logo marquee | **Reuse** for social proof / client logos. |
| `HomeCTASection` | `src/components/HomeCTASection.tsx` | "Let's Talk" bottom CTA banner | **Reuse** or mirror style for page bottom CTAs. |
| `ChatWidget` | `src/components/ChatWidget.tsx` | Floating AI assistant widget | Managed automatically via `RootLayout`. |

---

## 9. Design Tokens Reference (`src/styles/theme.ts`)

```typescript
export const colors = {
  accent: '#0033FF',
  accentDark: '#0022CC',
  accentOnDark: '#5C7CFF',
  navy: '#00003C',
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  textPrimary: '#333333',
  textSecondary: '#555555',
  border: '#E5E5E5',
  ctaGradient: 'linear-gradient(90deg, #0033FF 0%, #00003C 100%)',
  accentGlow: 'rgba(0, 51, 255, 0.15)',
  accentSoft: 'rgba(0, 51, 255, 0.05)',
  lightSectionTint: 'rgba(0, 51, 255, 0.04)',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  cardSm: '16px',
  cardMd: '20px',
  cardLg: '24px',
  full: '9999px',
} as const;
```

---

## 10. Patterns Future Pages Should Follow

1. **Standard Page Section Structure**:
   - Section wrapper: `<section id="..." className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 relative bg-white border-b border-[#E5E5E5]/80">`
   - Inner container: `<div className="max-w-7xl mx-auto">`
   - Header block: Centered, eyebrow badge -> H2 headline (`text-3xl sm:text-4xl lg:text-[42px]`) -> subheadline paragraph (`max-w-2xl` or `max-w-3xl`).
2. **Hero Structure**:
   - Top padding `pt-32 sm:pt-36 lg:pt-40` to clear floating navbar.
   - Clear H1 headline with controlled max width (`max-w-2xl` or `max-w-3xl`) to prevent awkward line breaks.
   - Primary capsule CTA button + optional secondary anchor link button.
3. **Card Grids**:
   - 1 column on mobile (`grid-cols-1`), 2 columns on tablet (`md:grid-cols-2`), 3 or 4 columns on desktop (`lg:grid-cols-3` or `lg:grid-cols-4`).
   - Gap spacing `gap-6 lg:gap-8`.

---

## 11. Patterns Future Work Should Avoid (Anti-Patterns)

- ❌ **Do NOT introduce secondary design systems**: Do not install third-party UI component libraries (Chakra, MUI, Mantine) or competing color tokens.
- ❌ **Do NOT use generic AI stock images**: Avoid floating brains, glowing robot hands, sci-fi particle grids, or generic stock photos.
- ❌ **Do NOT alter brand colors**: Never introduce random primary blues (e.g. `#1D4ED8`, `#3B82F6`) or substitute dark navy (`#00003C`) with pitch black (`#000000`).
- ❌ **Do NOT break curtain layout**: Always ensure new pages are wrapped inside the `<main data-reveal-curtain>` container provided by `RootLayout`.
- ❌ **Do NOT create duplicate UI components**: Always check the Reusable Component Registry before building new accordions, buttons, or navbar elements.
