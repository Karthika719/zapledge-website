# DESIGN.md — Zapledge International Pvt Ltd

## Brand Overview
Zapledge International is a B2B AI consulting, engineering, and automation company. The visual identity should feel confident, enterprise-grade, and technically credible — closer to a serious enterprise-tech/consulting brand than a creative agency. Clean, precise, no playful or decorative flourishes.

## Logo
- Hexagonal outline mark in Deep Navy (#00003C), containing a stylized angular "Z" formed from a bold diagonal arrow/chevron shape in Bright Blue (#0033FF).
- The logo's two-tone construction (navy outer hex + blue inner Z) is the direct source of the brand's two primary colors below — every screen should feel like a natural extension of this mark.
- Logo works on both white and dark backgrounds; on dark navy backgrounds, ensure sufficient contrast is preserved for the outer hex outline.

## Brand Colors (authoritative — do not substitute or invent alternate shades)
- Bright Blue (primary accent): #0033FF
- Deep Navy (primary dark / text / footer): #00003C
- White: #FFFFFF
- Off White (section backgrounds): #FAFAFA
- Body Text — Primary: #333333
- Body Text — Secondary/Muted: #555555
- Border: #E5E5E5
- Accent Dark (hover/pressed states): #0022CC
- CTA Gradient: linear-gradient(90deg, #0033FF 0%, #00003C 100%)
- Accent Glow (used for soft glow/spotlight effects): rgba(0, 51, 255, 0.15)
- Accent Soft (used for subtle tinted backgrounds/badges): rgba(0, 51, 255, 0.05)

## Typography
- Font family: Inter (Google Fonts), with system-ui / -apple-system / sans-serif as fallback stack.
- Weight range used: 400 (body), 600 (subheadings/labels), 700–800 (headlines/emphasis).
- Headlines: bold (700–800), tight letter-spacing (tracking-tight), high visual weight.
- Body copy: regular weight (400), comfortable line-height (relaxed, ~1.6), sized for easy scanning — this is a B2B site read by business decision-makers, not a dense technical document.
- Small labels/eyebrows/tags: semibold (600), uppercase, wide letter-spacing (tracking-wide) for a structured, technical feel.

## Navigation
- Height: 72px
- Background: white (#FFFFFF) at all times, including when placed over the dark Hero section below — floating/inset white bar, never navy or transparent-dark.
- Background on scroll: white at 80% opacity with backdrop blur (rgba(255, 255, 255, 0.80))
- Focus outline color: rgba(0, 51, 255, 0.12)

## Hero Section Background (decision)
- The Hero section uses a Deep Navy (#00003C) solid background (or the CTA gradient at a subtle angle for added depth — flat navy is the safer default) — NOT white, unlike the rest of the page's lighter sections. This ties the Hero visually to the dark card treatments already used in WhatWeDo and Industries, rather than leaving it as an isolated white section.
- All Hero text (eyebrow, headline, subheadline, body) switches to white for legibility against navy.
- The word "Possibilities" (or any single emphasized word in the headline) stays in Bright Blue (#0033FF) — this reads even more strikingly against navy than it did against white.
- The eyebrow/tag badge ("Where Ideas Meet Intelligence") must be restyled for the dark background: use a white or light-opacity-white badge background (e.g. rgba(255, 255, 255, 0.1)) with white text and a white/light border — the previous light-blue-tinted badge treatment (designed for a white background) does not carry over.
- The navbar stays white/light per the Navigation section above, floating over this dark Hero — this is an intentional contrast, not an inconsistency.

## Light Section Background Treatment (standard — applies to all light/white sections)
- Light sections do NOT use flat white or flat off-white as a plain solid fill. Instead, use a very subtle tinted gradient wash — a soft diagonal or radial gradient from white (#FFFFFF) into a barely-visible tint of Bright Blue at low opacity (roughly rgba(0, 51, 255, 0.04), the "Accent Soft" token) — similar to how premium enterprise-tech sites (e.g. HCLTech) use soft tinted washes instead of flat white.
- The tint must stay subtle — barely noticeable at a glance, adding a sense of considered depth rather than reading as a visible color. It should never compete with content or feel like a "blue section."
- This treatment applies to every light-background section across the site (About, Trusted By, FAQ, footer/CTA, etc.) — not just one section — so the whole site shares this same quiet texture instead of alternating between flat white and flat off-white.
- This is distinct from and complements the Hero's solid Deep Navy background above — the two together create the site's light/dark rhythm: dark, high-impact Hero, then a consistent softly-tinted light treatment for every section after it.

## Structural Reference (LAYOUT/STRUCTURE ONLY — NOT BRAND OR COLOR)
Reference site: https://www.hcltech.com/

Use HCLTech's site ONLY for the following structural/interaction patterns — do NOT carry over its color palette, typography, or any HCLTech branding:
- **Navbar structure**: horizontal top nav with dropdown/mega-menu behavior on hover for primary nav items, utility icons (search, region/language selector) on the right, prominent CTA button, sticky/fixed on scroll with the blur-background treatment defined above.
- **Homepage carousel/highlights structure**: horizontal card-based highlight section near the top of the homepage, mixing different content types in a consistent card shape, with clear CTAs per card ("Learn more"-style links). STATUS: deferred — Zapledge does not yet have highlights content (press mentions, case studies, announcements) to populate this. For now, the Hero section serves as the static first slide/entry point; the full rotating highlights carousel will be built later once real content exists. Do not add carousel/rotation behavior to the Hero itself in the meantime — it remains a single static message.
- **"Global Recognition" style section pattern**: two-column layout (headline + supporting text on one side, a moving/animated logo or badge display on the other) — used as the structural reference for Zapledge's "Trusted By" section specifically.

All colors, logo, typography, and card content styling in these patterns must follow the Zapledge brand section above, never HCLTech's actual visual treatment.

## Component & Styling Conventions (established for this project)
- Rounded corners on cards: 16–24px depending on card size (larger cards get larger radii).
- Cards with background imagery use a bottom-gradient overlay (Deep Navy fading to transparent) for text legibility, rather than a heavy full-card tint — the image should remain the dominant visual.
- Interactive cards may use a cursor-tracking "spotlight" glow effect (soft radial gradient in Bright Blue, low-medium opacity, following mouse position) for a premium, tactile feel on hover — reserved for primary/priority-tier content, not applied uniformly to every element.
- Lower-priority/secondary content uses visibly smaller sizing, dimmer/no glow effects, and more muted image treatment — hierarchy is communicated through scale and intensity, not through a completely different visual language.
- Moving/scrolling elements (logo strips, marquees) use smooth continuous animation with fade-out edges (fading to the section's background color) rather than hard clipping.
- Buttons and primary CTAs favor the brand gradient (linear-gradient(90deg, #0033FF 0%, #00003C 100%)) or solid Bright Blue with white text.
- Avoid heavy drop shadows or skeuomorphic effects — shadows should be subtle and used sparingly for depth cues only.

## Tone
Professional, precise, confident. Practical over trendy — avoid gimmicky animation or decoration that doesn't serve legibility or hierarchy. This is a technical B2B brand; it should read as credible and serious, similar in spirit to enterprise IT/consulting brands, while staying visually distinct through the blue/navy palette and the angular logo motif.

## Content Integrity Rules
- Never fabricate statistics, client names, testimonials, awards, certifications, case study results, or capabilities that haven't been explicitly provided as approved content.
- Where real content is not yet available (e.g. client logos, case studies, press mentions), use clearly neutral, generic placeholder content — not invented substitutes that could be mistaken for real claims. Flag placeholder sections explicitly so they're easy to find and replace later.
- Use only the exact copy provided for a given section; do not add extra marketing language, additional headlines, or embellishment beyond what's specified.

## Interaction & Responsive Principles
- Any hover-triggered interaction (reveal panels, spotlight glow, etc.) must have a defined touch/mobile equivalent — typically tap-to-toggle — since hover does not exist on touch devices. Design both states explicitly, not just the desktop hover state.
- Priority/emphasized content generally stacks single-column full-width on mobile; secondary/lower-emphasis content can use a more compact grid (e.g. 2x2) on mobile to preserve the size contrast that signals hierarchy on desktop.
- Avoid layouts that rely on horizontal overlap, stacking, or peeking (cards layered behind other cards) — these do not adapt well to narrow viewports and have been deliberately avoided in this project's section designs.
- All interactive elements must have a visible focus state for keyboard navigation, using the focus outline color defined under Navigation (rgba(0, 51, 255, 0.12)) as the general pattern.

## Icon & Component Sourcing
- Use a single consistent icon library across the entire site once one is chosen — do not mix icon sets between sections.
- Reusable interactive components (e.g. spotlight-glow cards, logo marquees) should be sourced once and reused consistently across sections that need the same effect, rather than reimplementing similar behavior differently in each section.