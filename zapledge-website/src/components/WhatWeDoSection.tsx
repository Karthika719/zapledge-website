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
    href: '/services/ai-engineering',
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
    href: '/services#service-software',
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
    href: '/services#service-automation',
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
    href: '/services#service-cloud',
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
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  const focusTab = (index: number) => {
    const candidates = [
      desktopTabRefs.current[index],
      tabletTabRefs.current[index],
      mobileTabRefs.current[index],
    ];
    candidates.find((el) => el && el.offsetParent !== null)?.focus();
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
    const mq = window.matchMedia('(min-width: 1200px)');

    const siteNavHeight = () => {
      const header = document.querySelector('body > header');
      return header ? header.getBoundingClientRect().height : 96;
    };
    const stageToNavGap = (vh: number) => (vh <= 720 ? 20 : vh <= 820 ? 32 : 50);
    const bottomPadding = (vh: number) => clamp(24, vh * 0.04, 64);

    const update = () => {
      if (!mq.matches) return;
      const vh = window.innerHeight;
      const navH = desktopNavRef.current?.getBoundingClientRect().height ?? 104;
      const siteNavH = siteNavHeight();
      section.style.setProperty('--site-nav-h', `${siteNavH}px`);

      const availableHeight = vh - siteNavH;
      const raw = availableHeight - stageToNavGap(vh) - navH - bottomPadding(vh) - 16;
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
      className="wwd-section"
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

          {/* Mobile: vertical list, left sliding bar */}
          <div role="tablist" aria-label="Service navigation" className="wwd-nav-mobile">
            <div
              className="wwd-nav-mobile-bar"
              aria-hidden="true"
              style={{ transform: `translateY(calc(${activeIndex} * 56px))` }}
            />
            {services.map((svc, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={svc.id}
                  ref={(el) => { mobileTabRefs.current[idx] = el; }}
                  id={`service-tab-mobile-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${idx}`}
                  tabIndex={0}
                  onClick={() => handleSelect(idx)}
                  className="wwd-tab wwd-tab--mobile"
                  data-active={isActive}
                >
                  <span className="wwd-tab-number">({svc.number})</span>
                  <span className="wwd-tab-title">{svc.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
