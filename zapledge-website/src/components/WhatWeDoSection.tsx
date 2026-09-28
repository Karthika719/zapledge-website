"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './WhatWeDoSection.css';

interface ServiceItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  largeWord: string;
  wordScale: number;
  accent: string;
  body: string;
  href: string;
  image: string;
  alt: string;
}

const services: ServiceItem[] = [
  {
    id: 'transform',
    number: '01',
    badge: 'Advise & Transform',
    title: 'AI Transformation & Consulting',
    largeWord: 'Transformation',
    wordScale: 0.88,
    accent: '#0B3BFF',
    body: 'Not sure where to start with AI? We help you identify where it can create real business value, assess your readiness, and build a practical roadmap for adoption.',
    href: '/services/ai-transformation-consulting',
    image: '/images/services/Transform.png',
    alt: 'AI Transformation & Consulting',
  },
  {
    id: 'build',
    number: '02',
    badge: 'Build',
    title: 'AI Engineering',
    largeWord: 'Engineering',
    wordScale: 1,
    accent: '#7C5CFF',
    body: 'Already know what you need? We design and build production-ready AI applications, agents, and enterprise systems that work with your real data and workflows.',
    href: '/services/ai-engineering',
    image: '/images/services/Build.png',
    alt: 'AI Engineering',
  },
  {
    id: 'automate',
    number: '03',
    badge: 'Automate',
    title: 'AI Automation',
    largeWord: 'Automation',
    wordScale: 1,
    accent: '#22C3EE',
    body: 'Tired of repetitive manual work? We automate processes, documents, approvals, and everyday tasks, keeping people in control where judgment matters.',
    href: '/services/ai-automation ',
    image: '/images/services/Automate.png',
    alt: 'AI Automation',
  },
  {
    id: 'connect',
    number: '04',
    badge: 'Connect & Optimize',
    title: 'IoT & Intelligent Operations',
    largeWord: 'Operations',
    wordScale: 1,
    accent: '#EC4899',
    body: 'Need visibility into machines and physical operations? We connect equipment and sensors to intelligent software for real-time insight and predictive alerts.',
    href:  '/services/iot-intelligent-operations',
    image: '/images/services/Connect.png',
    alt: 'IoT & Intelligent Operations',
  },
];

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value));

export const WhatWeDoSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const desktopTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabletTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Mobile carousel — independent of `activeIndex` (which only drives the
  // desktop/tablet crossfade), since the carousel keeps all four slides in
  // the DOM at once and tracks its own current slide via scroll position.
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const carouselTrackRef = useRef<HTMLUListElement>(null);
  const carouselSlideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const mobileDotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = useCallback((index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveIndex((prev) => {
      if (index === prev) return prev;
      setSlideDirection(index > prev ? 'forward' : 'backward');
      return index;
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        handleSelect(index);
      }, 140);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const scrollToSlide = (index: number) => {
    const slide = carouselSlideRefs.current[index];
    if (!slide) return;
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    slide.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  };

  const goToSlide = (index: number) => {
    setMobileActiveIndex(index);
    scrollToSlide(index);
  };

  const focusTab = (index: number) => {
    const desktopEl = desktopTabRefs.current[index];
    if (desktopEl && desktopEl.offsetParent !== null) {
      desktopEl.focus();
      return;
    }
    const tabletEl = tabletTabRefs.current[index];
    if (tabletEl && tabletEl.offsetParent !== null) {
      tabletEl.focus();
      return;
    }
    const dotEl = mobileDotRefs.current[index];
    if (dotEl && dotEl.offsetParent !== null) {
      goToSlide(index);
      dotEl.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (activeIndex + 1) % services.length;
      handleSelect(next);
      focusTab(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = (activeIndex - 1 + services.length) % services.length;
      handleSelect(next);
      focusTab(next);
    }
  };

  // Measure the stage's rendered content width in real pixels, so the
  // knockout offset (word-left − img-left) can be computed as pure px
  // arithmetic instead of relying on nested "%" custom-property reuse,
  // which resolves against whichever element ultimately consumes it.
  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section) return;

    const update = () => {
      section.style.setProperty('--wwd-content-w', `${stage.clientWidth}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    window.addEventListener('resize', update);
    document.fonts?.ready?.then(update).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Desktop viewport-fit: solve --stage-h so the active service + full
  // nav row are visible without scrolling once the stage clears the navbar.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mq = window.matchMedia('(min-width: 1024px)');

    const siteNavHeight = () => {
      const header = document.querySelector('body > header');
      return header ? header.getBoundingClientRect().height : 96;
    };
    const stageToNavGap = (vh: number) => (vh <= 720 ? 20 : vh <= 820 ? 32 : 50);
    // Standard desktop section bottom padding (112px / lg:py-28)
    const bottomPadding = 112;

    const update = () => {
      if (!mq.matches) return;
      const vh = window.innerHeight;
      const navH = desktopNavRef.current?.getBoundingClientRect().height ?? 104;
      const siteNavH = siteNavHeight();
      section.style.setProperty('--site-nav-h', `${siteNavH}px`);

      const availableHeight = vh - siteNavH;
      const raw = availableHeight - stageToNavGap(vh) - navH - bottomPadding - 16;
      const stageH = clamp(380, raw, 560);
      section.style.setProperty('--stage-h', `${stageH}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    if (desktopNavRef.current) ro.observe(desktopNavRef.current);
    window.addEventListener('resize', update);
    mq.addEventListener('change', update);
    document.fonts?.ready?.then(update).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      mq.removeEventListener('change', update);
    };
  }, []);

  // Sync the pagination dots to whichever slide is actually centered as the
  // person swipes the mobile carousel (native scroll, not a JS-driven drag).
  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setMobileActiveIndex(idx);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );

    const slides = carouselSlideRefs.current.filter((el): el is HTMLLIElement => el !== null);
    slides.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderWordLayer = (isKnockout: boolean) => (
    <div className={`wwd-word-layer ${isKnockout ? 'wwd-word-layer--knockout' : ''}`} aria-hidden="true">
      {services.map((svc, idx) => {
        const isCurrent = activeIndex === idx;
        return (
          <div
            key={svc.id}
            data-service={svc.id}
            className="wwd-word-item"
            style={{
              opacity: isCurrent ? 1 : 0,
              transform: isCurrent
                ? 'translateY(0)'
                : slideDirection === 'forward'
                ? 'translateY(-26px)'
                : 'translateY(26px)',
            }}
          >
            <span
              className="wwd-word"
              data-word={svc.id}
              style={{ '--word-scale': svc.wordScale } as React.CSSProperties}
            >
              {svc.largeWord}
            </span>
            {/* <span className={`wwd-index ${isKnockout ? 'wwd-index--knockout' : ''}`}>
              ({svc.number})
            </span> */}
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      aria-labelledby="wwd-heading"
      className="wwd-section w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 relative light-section-tint border-b border-[#E5E5E5]/80"
      onKeyDown={handleKeyDown}
    >
      <div className="wwd-container">
        {/* Header block: label, headline, intro — in normal flow, no fixed height */}
        <div className="wwd-header">
          <div className="wwd-header-left">
            <p className="wwd-label">
              <span className="wwd-label-dot" aria-hidden="true" />
              What We Do
            </p>
            <h2 id="wwd-heading" className="wwd-headline">
              Our AI Services: Consulting, Engineering, Automation  Intelligent Operations
            </h2>
          </div>
          <div className="wwd-header-right">
            <p className="wwd-intro">
              From identifying the right AI opportunity to building and implementing the solution, we support businesses at every stage.
            </p>
          </div>
        </div>

        {/* Stage: relative, margin-top after header. Word/image positioned from its own corner. */}
        <div className="wwd-stage" ref={stageRef}>
          <div className="wwd-visual">
            {renderWordLayer(false)}

            <div className="wwd-image">
              {services.map((svc, idx) => {
                const isCurrent = activeIndex === idx;
                return (
                  <div
                    key={svc.id}
                    data-service={svc.id}
                    className="wwd-image-item"
                    style={{
                      opacity: isCurrent ? 1 : 0,
                      transform: isCurrent ? 'scale(1)' : 'scale(1.06)',
                      pointerEvents: isCurrent ? 'auto' : 'none',
                    }}
                  >
                    <Image
                      src={svc.image}
                      alt={svc.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 494px, 673px"
                      priority={idx === 1}
                      loading={idx === 1 ? 'eager' : 'lazy'}
                      draggable={false}
                      className="object-cover"
                    />
                  </div>
                );
              })}

              {renderWordLayer(true)}

              <div className="wwd-pill">
                <span
                  className="wwd-pill-dot"
                  style={{ backgroundColor: services[activeIndex].accent }}
                  aria-hidden="true"
                />
                <span className="wwd-pill-label">{services[activeIndex].badge}</span>
              </div>
            </div>
          </div>

          <div className="wwd-copy">
            {services.map((svc, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <div
                  key={svc.id}
                  data-service={svc.id}
                  id={`service-panel-${idx}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-desktop-${idx}`}
                  className="wwd-copy-item"
                  data-current={isCurrent}
                  aria-hidden={!isCurrent}
                >
                  <h3 className="wwd-service-name">{svc.title}</h3>
                  <p className="wwd-service-desc">{svc.body}</p>
                  <Link
                    href={svc.href}
                    tabIndex={isCurrent ? 0 : -1}
                    className="wwd-learn-more"
                  >
                    <span>Learn more</span>
                    <span className="wwd-learn-more-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation: normal flow after the stage. Never absolutely positioned. */}
        <div className="wwd-nav">
          {/* Desktop: 4 equal columns, one shared sliding indicator */}
          <div
            ref={desktopNavRef}
            role="tablist"
            aria-label="Service navigation"
            className="wwd-nav-desktop"
          >
            <div
              className="wwd-nav-indicator"
              aria-hidden="true"
              style={{ transform: `translateX(calc(${activeIndex} * (100% + 32px)))` }}
            />
            {services.map((svc, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={svc.id}
                  ref={(el) => { desktopTabRefs.current[idx] = el; }}
                  id={`service-tab-desktop-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${idx}`}
                  tabIndex={0}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  onFocus={() => handleSelect(idx)}
                  className="wwd-tab wwd-tab--desktop"
                  data-active={isActive}
                >
                  {/* <span className="wwd-tab-number">({svc.number})</span> */}
                  <span className="wwd-tab-title">{svc.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tablet: 2x2 grid, one shared sliding indicator */}
          <div role="tablist" aria-label="Service navigation" className="wwd-nav-tablet">
            <div
              className="wwd-nav-indicator"
              aria-hidden="true"
              style={{
                transform: `translate(calc(${activeIndex % 2} * (100% + 24px)), calc(${Math.floor(activeIndex / 2)} * 96px))`,
              }}
            />
            {services.map((svc, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={svc.id}
                  ref={(el) => { tabletTabRefs.current[idx] = el; }}
                  id={`service-tab-tablet-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${idx}`}
                  tabIndex={0}
                  onClick={() => handleSelect(idx)}
                  className="wwd-tab wwd-tab--tablet"
                  data-active={isActive}
                >
                  <span className="wwd-tab-number">({svc.number})</span>
                  <span className="wwd-tab-title">{svc.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: swipeable carousel — replaces the desktop/tablet stage + nav
            entirely below 768px. All four slides stay mounted; native
            overflow-x + scroll-snap gives manual swipe/touch for free. */}
        <div
          className="wwd-carousel-mobile"
          role="region"
          aria-roledescription="carousel"
          aria-label="Our services"
        >
          <ul className="wwd-carousel-track" ref={carouselTrackRef}>
            {services.map((svc, idx) => (
              <li
                key={svc.id}
                ref={(el) => { carouselSlideRefs.current[idx] = el; }}
                data-index={idx}
                id={`mobile-slide-${idx}`}
                className="wwd-carousel-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${services.length}: ${svc.title}`}
              >
                <div className="wwd-carousel-image">
                  <Image
                    src={svc.image}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 767px) 100vw"
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="object-cover"
                  />
                </div>
                <h3 className="wwd-service-name">{svc.title}</h3>
                <p className="wwd-service-desc">{svc.body}</p>
                <Link href={svc.href} className="wwd-learn-more">
                  <span>Learn more</span>
                  <span className="wwd-learn-more-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="wwd-carousel-dots" role="tablist" aria-label="Service navigation">
            {services.map((svc, idx) => {
              const isActive = mobileActiveIndex === idx;
              return (
                <button
                  key={svc.id}
                  ref={(el) => { mobileDotRefs.current[idx] = el; }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`mobile-slide-${idx}`}
                  aria-label={svc.title}
                  className="wwd-carousel-dot"
                  data-active={isActive}
                  onClick={() => goToSlide(idx)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
