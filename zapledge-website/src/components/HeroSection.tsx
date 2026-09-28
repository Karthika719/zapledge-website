"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import AnimatedButton from './ui/AnimatedButton';
import { colors, typography, radii } from '@/styles/theme';

/**
 * Slide layout variants:
 * - 'centered'  (default) Stacked, centered copy over the section background.
 * - 'split'     Two columns: left-aligned copy + visual (imageUrl). Stacks on mobile.
 * - 'fullbleed' imageUrl fills the slide card, with a navy/accent scrim under centered copy.
 */
export type SlideLayout = 'centered' | 'split' | 'fullbleed';

export interface SlideTheme {
  backgroundColor?: string;
  backgroundImage?: string;
  heroTextPrimary?: string;
  heroTextSecondary?: string;
  textPrimary?: string;
  accent?: string;
  accentSoft?: string;
  accentGlow?: string;
  badgeBg?: string;
  badgeBorder?: string;
  badgeText?: string;
}

export interface HeroSlideData {
  id: string;
  type: 'hero';
  badge: string;
  title: React.ReactNode;
  subheadline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  layout?: SlideLayout;
  imageUrl?: string;
  theme?: SlideTheme;
}

export interface EventSlideData {
  id: string;
  type: 'event';
  badge: string;
  title: string;
  description: string;
  dateOrLocation?: string;
  ctaText: string;
  ctaHref: string;
  layout?: SlideLayout;
  imageUrl?: string;
  theme?: SlideTheme;
}

export type SlideData = HeroSlideData | EventSlideData;

/**
 * =========================================================================
 * SLIDE DATA (Hero + Announcements Carousel)
 * -------------------------------------------------------------------------
 * PLACEHOLDER EVENT DATA NOTE:
 * Slide 1 contains the authoritative Hero section content.
 * Slides 2 & 3 are MOCK / PLACEHOLDER event announcements to verify carousel
 * functionality. Replace these mock entries with real conferences, webinars,
 * or announcements prior to production launch.
 *
 * LAYOUTS: Omit `layout` for the default centered layout. Set
 * `layout: 'split' | 'fullbleed'` with an `imageUrl` (e.g. '/images/...')
 * to use the image-driven layouts. Remote image URLs must be allowed in
 * next.config `images.remotePatterns`.
 * =========================================================================
 */
const SLIDES: SlideData[] = [
  {
    id: 'hero-main',
    type: 'hero',
    badge: 'Where Ideas Meet Intelligence',
    title: (
      <>
        AI Solutions That Turn Business Challenges Into{' '}
        <span
          className="font-black drop-shadow-[0_0_20px_rgba(0,51,255,0.25)]"
          style={{ color: colors.accent }}
        >
          Possibilities
        </span>
      </>
    ),
    subheadline:
      'Practical AI solutions that help businesses solve problems, improve operations, and work smarter - from identifying the right opportunity to building and implementing the solution.',
    description:
      'We help businesses use AI to solve real operational challenges across customer service, sales, communication, internal processes, decision-making, and everyday workflows.',
    ctaText: 'Get Free Consultation',
    ctaHref: '/contact',
    // Inherits default global theme tokens
  },
  {
    id: 'mock-event-1',
    type: 'event',
    badge: 'UPCOMING EVENT',
    title: 'Sample Webinar: AI Readiness for Enterprise Teams',
    description:
      'Join our team for a practical walkthrough of AI adoption strategies, evaluation frameworks, and implementation roadmaps designed for business leaders.',
    dateOrLocation: 'Coming Soon • Online Live Session',
    ctaText: 'Register Interest',
    ctaHref: '/contact',
    layout: 'split',
    imageUrl: '/images/carousel-test/5b9c63dc-bf1a-41b3-ad7b-c924314c3e96.png',
  },
  {
    id: 'mock-event-2',
    type: 'event',
    badge: 'ANNOUNCEMENT',
    title: 'Sample Launch: New AI Governance Framework',
    description:
      "We're expanding our AI Governance & Implementation Planning service to help enterprises scale AI safely with continuous compliance, safety guards, and operational auditability.",
    dateOrLocation: 'Available Now',
    ctaText: 'Learn More',
    ctaHref: '/services#transformation',
    layout: 'fullbleed',
    imageUrl:
      '/images/carousel-test/professional-online-business-webinar-banner-with-blue-theme-modern-design-and-placeholder-for-speaker-information-and-event-details-vector.jpg',
  },
];

const AUTO_ROTATE_INTERVAL_MS = 7000;

// Floor height for the slides stack. All slides share one grid cell, so the stack grows to the tallest
// slide and every layout stretches to that same height (no layout shift, independent of section min-height).
const SLIDE_MIN_HEIGHT = 'min-h-[440px] sm:min-h-[460px]';

// Fullbleed scrim: navy fade for legibility + faint accent tint, derived from theme tokens (8-digit hex alpha)
const FULLBLEED_SCRIM = `linear-gradient(to top, ${colors.navy}E6 0%, ${colors.navy}A6 55%, ${colors.navy}59 100%), linear-gradient(135deg, ${colors.accent}33 0%, transparent 60%)`;

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = SLIDES.length;
  const hasMultipleSlides = totalSlides > 1;
  const containerRef = useRef<HTMLElement | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Handle keyboard navigation (Left/Right Arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultipleSlides) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Auto-rotate timer with reduced motion support
  useEffect(() => {
    if (!hasMultipleSlides || isPaused) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_ROTATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [hasMultipleSlides, isPaused, totalSlides]);

  // Resolve theme tokens for current active slide (with fallback to global tokens)
  const activeSlide = SLIDES[currentIndex];
  const activeTheme = activeSlide?.theme;

  const currentBgColor = activeTheme?.backgroundColor || '#F5F7FF';
  const currentBgImage =
    activeTheme?.backgroundImage ||
    'radial-gradient(circle 700px at 15% 10%, rgba(0, 51, 255, 0.16) 0%, transparent 60%), radial-gradient(circle 800px at 85% 90%, rgba(0, 51, 255, 0.12) 0%, transparent 60%), radial-gradient(ellipse 900px 580px at 50% 46%, rgba(0, 51, 255, 0.08) 0%, transparent 70%)';
  const currentTextPrimary = activeTheme?.heroTextPrimary || colors.heroTextPrimary;
  const currentTextSecondary = activeTheme?.heroTextSecondary || colors.heroTextSecondary;
  const currentBodyText = activeTheme?.textPrimary || colors.textPrimary;
  const currentAccent = activeTheme?.accent || colors.accent;
  const currentBadgeBg = activeTheme?.badgeBg || colors.accentSoft;
  const currentBadgeBorder = activeTheme?.badgeBorder || 'rgba(0, 51, 255, 0.15)';
  const currentBadgeText = activeTheme?.badgeText || colors.accent;

  // -------------------------------------------------------------------------
  // Shared slide content blocks (reused across all three layouts).
  // `onDark` swaps light-background tokens for ones legible over the fullbleed scrim.
  // -------------------------------------------------------------------------
  const renderBadge = (slide: SlideData, onDark = false) => {
    const dotColor = slide.theme?.accent || (onDark ? colors.accentOnDark : currentAccent);

    return (
      <div
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold tracking-wider uppercase shadow-sm transition-colors mb-6 sm:mb-8"
        style={{
          backgroundColor: slide.theme?.badgeBg || (onDark ? colors.accentGlow : currentBadgeBg),
          borderColor: slide.theme?.badgeBorder || (onDark ? colors.accentOnDark : currentBadgeBorder),
          borderWidth: '1px',
          borderStyle: 'solid',
          color: slide.theme?.badgeText || (onDark ? colors.white : currentBadgeText),
        }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80"
            style={{ backgroundColor: dotColor }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: dotColor }}
          />
        </span>
        <span>{slide.badge}</span>
      </div>
    );
  };

  const renderTitle = (slide: SlideData, { onDark = false, compact = false } = {}) => (
    <h1
      className={`text-4xl sm:text-5xl ${compact ? '' : 'lg:text-6xl'} font-extrabold tracking-tight leading-[1.12] max-w-4xl mb-6`}
      style={{ color: slide.theme?.heroTextPrimary || (onDark ? colors.white : currentTextPrimary) }}
    >
      {slide.title}
    </h1>
  );

  const renderSubheadline = (slide: SlideData, onDark = false) =>
    slide.type === 'hero' ? (
      <p
        className="text-lg sm:text-xl max-w-3xl font-normal leading-relaxed text-balance mb-4"
        style={{ color: slide.theme?.textPrimary || (onDark ? colors.white : currentBodyText) }}
      >
        {slide.subheadline}
      </p>
    ) : slide.dateOrLocation ? (
      <div
        className={`inline-flex items-center gap-2 text-sm sm:text-base font-semibold px-3.5 py-1.5 rounded-lg mb-4 shadow-xs backdrop-blur-sm transition-colors ${
          onDark
            ? 'bg-white/15 border border-white/20 text-white'
            : 'bg-white/70 border border-[#E5E5E5] text-[#00003C]'
        }`}
      >
        <svg
          className="w-4 h-4 shrink-0"
          style={{ color: onDark ? colors.accentOnDark : currentAccent }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{slide.dateOrLocation}</span>
      </div>
    ) : null;

  const renderDescription = (slide: SlideData, onDark = false) => (
    <p
      className="text-sm sm:text-base max-w-2xl leading-relaxed text-balance mb-10"
      style={{ color: slide.theme?.heroTextSecondary || (onDark ? `${colors.white}D9` : currentTextSecondary) }}
    >
      {slide.description}
    </p>
  );

  const renderCta = (slide: SlideData, align: 'center' | 'start' = 'center') => (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto ${align === 'start' ? 'justify-start' : 'justify-center'
        }`}
    >
      <AnimatedButton
        href={slide.ctaHref}
        variant="gradient"
        size="lg"
        className="shadow-[0_0_25px_rgba(0,51,255,0.3)] hover:shadow-[0_0_35px_rgba(0,51,255,0.5)] font-semibold text-base px-8 py-4 w-full sm:w-auto"
        icon={
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M14 5l7 7m0 0l-7 7m7-7H3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        {slide.ctaText}
      </AnimatedButton>
    </div>
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Announcements and Hero"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative min-h-[92vh] flex flex-col justify-between items-center pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-6 overflow-hidden select-none transition-colors duration-700 outline-none focus-visible:ring-2 focus-visible:ring-[#0033FF]/20"
      style={{
        backgroundColor: currentBgColor,
        backgroundImage: currentBgImage,
        color: currentTextPrimary,
        fontFamily: typography.fontFamily,
      }}
    >
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${currentIndex + 1} of ${totalSlides}: ${typeof activeSlide.title === 'string' ? activeSlide.title : activeSlide.badge
          }`}
      </div>

      {/* Ambient Depth Background Layers */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Core Radiant Spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[840px] h-[520px] rounded-full blur-[100px] transition-colors duration-700"
          style={{ backgroundColor: colors.accentSoft }}
        />
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[260px] rounded-full blur-[60px] transition-colors duration-700"
          style={{ backgroundColor: colors.accentSoft }}
        />

        {/* Ambient Neural Depth Rings */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle 380px at 50% 48%, transparent 98%, rgba(0, 0, 60, 0.03) 99%, transparent 100%), radial-gradient(circle 580px at 50% 48%, transparent 98.4%, rgba(0, 0, 60, 0.02) 99.2%, transparent 100%), radial-gradient(circle 780px at 50% 48%, transparent 98.8%, rgba(0, 51, 255, 0.05) 99.4%, transparent 100%)',
          }}
        />
      </div>

      {/* Edge-to-edge fullbleed slide background image & overlay for Slide 3 */}
      {SLIDES.map((slide, index) => {
        if (slide.layout !== 'fullbleed' || !slide.imageUrl) return null;
        const isActive = index === currentIndex;
        return (
          <div
            key={`fullbleed-bg-${slide.id}`}
            aria-hidden="true"
            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt=""
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Scrim overlay for text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: FULLBLEED_SCRIM }}
            />
          </div>
        );
      })}

      {/* ========================================================================= */}
      {/* SLIDES STACK CONTAINER                                                    */}
      {/* ========================================================================= */}
      <div className={`relative z-20 w-full max-w-5xl mx-auto text-center grid my-auto ${SLIDE_MIN_HEIGHT}`}>
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          const layout: SlideLayout = slide.layout ?? 'centered';

          let content: React.ReactNode;

          if (layout === 'split') {
            // SPLIT: left-aligned copy + visual. Image stretches to the text column's height (stacks below on mobile).
            content = (
              <div className="flex-1 w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 text-left">
                <div className="flex-1 flex flex-col items-start justify-center">
                  {renderBadge(slide)}
                  {renderTitle(slide, { compact: true })}
                  {renderSubheadline(slide)}
                  {renderDescription(slide)}
                  {renderCta(slide, 'start')}
                </div>
                <div
                  className="relative flex-1 w-full min-h-[260px] sm:min-h-[340px] lg:min-h-0 self-stretch overflow-hidden shadow-sm"
                  style={{ borderRadius: radii.cardLg, backgroundColor: colors.accentSoft }}
                >
                  {slide.imageUrl && (
                    <Image
                      src={slide.imageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      priority={index === 0}
                      className="object-cover object-center"
                    />
                  )}
                </div>
              </div>
            );
          } else if (layout === 'fullbleed') {
            // FULLBLEED: copy centered over the edge-to-edge section background image.
            content = (
              <div className="w-full flex flex-col items-center justify-center text-center">
                {renderBadge(slide, true)}
                {renderTitle(slide, { onDark: true })}
                {renderSubheadline(slide, true)}
                {renderDescription(slide, true)}
                {renderCta(slide)}
              </div>
            );
          } else {
            // CENTERED (default): original layout.
            content = (
              <>
                {renderBadge(slide)}
                {renderTitle(slide)}
                {renderSubheadline(slide)}
                {renderDescription(slide)}
                {renderCta(slide)}
              </>
            );
          }

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}`}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 relative w-full flex flex-col items-center justify-center transition-all duration-700 ease-out ${isActive
                  ? 'opacity-100 translate-y-0 z-10 pointer-events-auto'
                  : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* CAROUSEL NAVIGATION CONTROLS (Rendered ONLY when 2+ slides exist)         */}
      {/* ========================================================================= */}
      {hasMultipleSlides && (
        <div className="relative z-30 flex items-center justify-center gap-2 mt-8">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const isFullBleedActive = activeSlide?.layout === 'fullbleed';

            return (
              <button
                key={`dot-${slide.id}`}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.badge}`}
                aria-current={isActive ? 'true' : undefined}
                className={`transition-all duration-300 rounded-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/30 ${isActive
                    ? 'w-7 h-2.5 shadow-xs'
                    : 'w-2.5 h-2.5 opacity-40 hover:opacity-80'
                  }`}
                style={{
                  backgroundColor: isActive
                    ? colors.accent
                    : isFullBleedActive
                    ? colors.white
                    : colors.navy,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Subtle Bottom Ambient Transition Line */}
      <div
        className="w-full h-px pointer-events-none mt-8 sm:mt-10"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, ${colors.accentGlow}, transparent)`,
        }}
      />
    </section>
  );
};

export default HeroSection;