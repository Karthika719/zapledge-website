/**
 * Zapledge International Pvt Ltd — Design Tokens
 * Centralized theme tokens matching DESIGN.md
 */

export const colors = {
  // Brand Colors (authoritative)
  accent: '#0033FF', // Bright Blue (primary accent)
  accentDark: '#0022CC', // Accent Dark (hover/pressed states)
  accentOnDark: '#5C7CFF', // Lighter accent tint for graphics on dark/navy backgrounds
  navy: '#00003C', // Deep Navy — text/accent only, no longer a section fill for Hero/CTA
  white: '#FFFFFF',
  offWhite: '#FAFAFA', // Section backgrounds

  // Body Text
  textPrimary: '#333333',
  textSecondary: '#555555',
  textMuted: '#555555',

  // Structural & Borders
  border: '#E5E5E5',
  background: '#FFFFFF',

  // Hero + CTA/Contact — no longer navy fill
  heroBackground: 'linear-gradient(135deg, #FFFFFF 0%, rgba(0, 51, 255, 0.10) 100%)',
  ctaSectionBackground: 'rgba(0, 51, 255, 0.04)',
  ctaCardBackground: '#FFFFFF',
  ctaCardBorder: '#E5E5E5',

  // UNCHANGED — still navy, still used elsewhere (footer, FAQ if dark variant kept, etc.)
  footerBackground: '#00003C',
  darkSectionBackground: '#00003C',
  faqBackground: '#00003C',

  // Tints, Glows & Gradients
  accentGlow: 'rgba(0, 51, 255, 0.15)',
  accentSoft: 'rgba(0, 51, 255, 0.05)',
  lightSectionTint: 'rgba(0, 51, 255, 0.04)',
  ctaGradient: 'linear-gradient(90deg, #0033FF 0%, #00003C 100%)',

  // Text colors for Hero/CTA now that backgrounds are light instead of navy
  heroTextPrimary: '#00003C',
  heroTextSecondary: '#555555',
  ctaTextPrimary: '#00003C',
  ctaTextSecondary: '#555555',
} as const;

export const typography = {
  fontFamily: "var(--font-inter), 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  weights: {
    regular: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
  },
  lineHeights: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export const navigation = {
  height: '72px',
  background: '#FFFFFF',
  backgroundScroll: 'rgba(255, 255, 255, 0.80)',
  backdropBlur: '12px',
  focusOutline: 'rgba(0, 51, 255, 0.12)',
} as const;

export const radii = {
  none: '0px',
  sm: '8px',
  md: '12px',
  cardSm: '16px',
  cardMd: '20px',
  cardLg: '24px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
  glow: '0 0 25px rgba(0, 51, 255, 0.15)',
} as const;

export const theme = {
  colors,
  typography,
  navigation,
  radii,
  shadows,
} as const;

export default theme;