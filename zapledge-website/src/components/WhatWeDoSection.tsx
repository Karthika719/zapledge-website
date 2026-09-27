"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  largeWord: string;
  accent: string;
  body: string;
  linkText: string;
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
    accent: '#0B3BFF',
    body: 'Not sure where to start with AI? We help you identify where it can create real business value, assess your readiness, and build a practical roadmap for adoption.',
    linkText: 'Learn more →',
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
    accent: '#7C5CFF',
    body: 'Already know what you need? We design and build production-ready AI applications, agents, and enterprise systems that work with your real data and workflows.',
    linkText: 'Learn more →',
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
    accent: '#22C3EE',
    body: 'Tired of repetitive manual work? We automate processes, documents, approvals, and everyday tasks, keeping people in control where judgment matters.',
    linkText: 'Learn more →',
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
    accent: '#EC4899',
    body: 'Need visibility into machines and physical operations? We connect equipment and sensors to intelligent software for real-time insight and predictive alerts.',
    linkText: 'Learn more →',
    href: '/services#service-cloud',
    image: '/images/services/Connect.png',
    alt: 'IoT & Intelligent Operations',
  },
];

export const WhatWeDoSection: React.FC = () => {
  // Default active is 02 (index 1: AI Engineering)
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure rendered header height dynamically
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current && sectionRef.current) {
        const h = headerRef.current.offsetHeight;
        sectionRef.current.style.setProperty('--wwd-header-h', `${h}px`);
      }
    };

    updateHeaderHeight();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      observer = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      observer.observe(headerRef.current);
    }

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        updateHeaderHeight();
      });
    }

    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleSelect = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (index !== activeIndex) {
      setSlideDirection(index > activeIndex ? 'forward' : 'backward');
      setActiveIndex(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    // Only apply hover intent delay on devices with hover capability
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        handleSelect(index);
      }, 130);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Keyboard navigation for tablist
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleSelect((activeIndex + 1) % services.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSelect((activeIndex - 1 + services.length) % services.length);
    }
  };

  /**
   * Renders the ORIGINAL large Outfit 300 typography with slide crossfade animation.
   * Shared between the background navy layer and the photo's optical knockout white layer.
   */
  const renderWordLayer = (isKnockout: boolean) => (
    <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
      {services.map((svc, idx) => {
        const isCurrent = activeIndex === idx;

        // ORIGINAL large typography scale preserved:
        // Transformation: up to 176px
        // Engineering / Automation / Operations: up to 200px
        const wordSizeClass =
          svc.largeWord === 'Transformation'
            ? 'text-[clamp(34px,11vw,59px)] md:text-[clamp(90px,12vw,116px)] xl:text-[clamp(140px,12.2vw,176px)]'
            : svc.largeWord === 'Engineering'
            ? 'text-[clamp(42px,13.5vw,74px)] md:text-[clamp(110px,14.5vw,146px)] xl:text-[clamp(160px,13.8vw,200px)]'
            : svc.largeWord === 'Automation'
            ? 'text-[clamp(44px,14vw,77px)] md:text-[clamp(115px,15vw,150px)] xl:text-[clamp(160px,13.8vw,200px)]'
            : 'text-[clamp(46px,14.5vw,80px)] md:text-[clamp(115px,15vw,150px)] xl:text-[clamp(160px,13.8vw,200px)]';

        return (
          <div
            key={svc.id}
            className="col-start-1 row-start-1 flex items-end select-none pointer-events-none"
            style={{
              opacity: isCurrent ? 1 : 0,
              transform: isCurrent
                ? 'translateY(0)'
                : slideDirection === 'forward'
                ? 'translateY(-24px)'
                : 'translateY(24px)',
              transition:
                'opacity 0.45s ease, transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)',
              visibility: isCurrent ? 'visible' : 'hidden',
            }}
            aria-hidden="true"
          >
            <span
              className={`font-light leading-[0.86] tracking-[-0.035em] whitespace-nowrap ${
                isKnockout ? 'text-white' : 'text-[#0A0B3D]'
              } ${wordSizeClass}`}
              style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
            >
              {svc.largeWord}
            </span>
            {/* Top-aligned index shown on tablet and desktop, hidden on mobile */}
            <span
              className={`hidden md:inline-block font-semibold self-start ml-2 md:ml-2.5 xl:ml-3 mt-1 md:mt-1.5 text-[15px] xl:text-[18px] leading-none ${
                isKnockout ? 'text-white' : 'text-[#0B3BFF]'
              }`}
              style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
            >
              ({svc.number})
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      aria-label="What We Do"
      className="w-full pt-4 pb-5 sm:pt-5 sm:pb-6 xl:pt-5 xl:pb-5 relative bg-[#F7F8FD] border-b border-[#E5E5E5]/80 overflow-hidden"
      onKeyDown={handleKeyDown}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          #what-we-do * {
            animation: none !important;
            transition-duration: 0.01ms !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* 1280px Centered Content Container with tight side paddings */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 xl:px-8 flex flex-col">
        {/* 1. Existing Section Header (Unchanged content with tightened vertical gaps) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-0">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-2 sm:mb-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#0033FF] uppercase">
              What We Do
            </span>
          </div>

          {/* Section Headline */}
          <h2
            className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-extrabold text-[#00003C] tracking-tight leading-[1.18] mb-1.5 sm:mb-2"
            style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
          >
            Our AI Services: Consulting, Engineering, Automation &amp; Intelligent Operations
          </h2>

          {/* Section Intro */}
          <p className="text-sm sm:text-base leading-relaxed text-[#555555] font-normal m-0 max-w-2xl mx-auto">
            From identifying the right AI opportunity to building and implementing the solution, we support businesses at every stage.
          </p>
        </div>

        {/* 2. Stage: Starts immediately below header with compact gap */}
        <div className="relative mt-2.5 sm:mt-3 xl:mt-3.5 xl:min-h-[448px] flex flex-col">
          {/* Visual Composition Block (Word + Photo + Knockout Layer) */}
          <div className="relative h-[270px] md:h-[400px] xl:absolute xl:inset-0 xl:h-full xl:pointer-events-none">
            {/* Background Navy Word Layer (ORIGINAL 214px height preserved) */}
            <div
              className="absolute top-0 left-[-2px] w-full h-[80px] md:h-[148px] xl:left-[-4px] xl:w-[1300px] xl:h-[214px] pointer-events-none select-none z-0 overflow-visible"
              aria-hidden="true"
            >
              {renderWordLayer(false)}
            </div>

            {/* Service Image Container with Sub-pixel Optical Knockout:
                - Wide editorial panel: 690px wide × 420px high (aspect ~1.64:1)
                - Placed at top: 24px, left: 526px (inside 1216px inner container)
                - Rounded corners: 22px
            */}
            <div className="absolute top-[38px] left-[36px] w-[calc(100%-36px)] h-[220px] rounded-[16px] md:top-[64px] md:left-[240px] md:w-[calc(100%-240px)] md:max-w-[480px] md:h-[320px] md:rounded-[20px] xl:top-[24px] xl:left-[526px] xl:w-[690px] xl:h-[420px] xl:rounded-[22px] overflow-hidden bg-[#0A0B3D] pointer-events-auto shadow-[0_16px_44px_-12px_rgba(10,11,61,0.22)]">
              {/* Stacked Crossfading Photos */}
              <div className="relative w-full h-full">
                {services.map((svc, idx) => {
                  const isCurrent = activeIndex === idx;
                  return (
                    <div
                      key={svc.id}
                      className="absolute inset-0"
                      style={{
                        opacity: isCurrent ? 1 : 0,
                        transform: isCurrent ? 'scale(1)' : 'scale(1.05)',
                        transition:
                          'opacity 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        pointerEvents: isCurrent ? 'auto' : 'none',
                      }}
                    >
                      <Image
                        src={svc.image}
                        alt={svc.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 690px"
                        priority={idx === 1}
                        loading={idx === 1 ? 'eager' : 'lazy'}
                        draggable={false}
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Optical Knockout Layer: Exact duplicate word rendered in WHITE over the photo
                  Calculated to match the background word to the exact sub-pixel:
                  - Desktop xl: left: -(526 - (-4)) = -530px, top: -24px, width: 1300px, height: 214px
                  - Tablet md: left: -(240 - (-2)) = -242px, top: -64px, height: 148px
                  - Mobile: left: -(36 - (-2)) = -38px, top: -38px, height: 80px
              */}
              <div
                className="absolute pointer-events-none select-none z-10 left-[-38px] top-[-38px] w-full h-[80px] md:left-[-242px] md:top-[-64px] md:h-[148px] xl:left-[-530px] xl:top-[-24px] xl:w-[1300px] xl:h-[214px]"
                aria-hidden="true"
              >
                {renderWordLayer(true)}
              </div>

              {/* Bottom-right Tag Pill (ORIGINAL preserved) */}
              <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 xl:bottom-4 xl:right-4 z-20 flex items-center h-[29px] xl:h-[30px] px-3.5 rounded-full bg-white/92 backdrop-blur-sm shadow-sm select-none">
                <span
                  className="w-[6px] h-[6px] rounded-full shrink-0 mr-1.5 transition-colors duration-300"
                  style={{ backgroundColor: services[activeIndex].accent }}
                />
                <span
                  className="text-[10.5px] xl:text-[11px] font-bold tracking-[0.08em] text-[#0A0B3D] uppercase"
                  style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                >
                  {services[activeIndex].badge}
                </span>
              </div>
            </div>
          </div>

          {/* Copy Block: Left column on desktop (≥ 1280px), normal flow below image on mobile/tablet */}
          <div className="mt-4 md:mt-5 xl:mt-0 xl:pt-[200px] xl:w-[500px] xl:max-w-[500px] relative z-10">
            <div className="grid grid-cols-1 grid-rows-1">
              {services.map((svc, idx) => {
                const isCurrent = activeIndex === idx;
                return (
                  <div
                    key={svc.id}
                    id={`service-panel-${idx}`}
                    role="tabpanel"
                    aria-labelledby={`service-tab-${idx}`}
                    className="col-start-1 row-start-1 flex flex-col items-start"
                    style={{
                      opacity: isCurrent ? 1 : 0,
                      transform: isCurrent ? 'translateY(0)' : 'translateY(8px)',
                      visibility: isCurrent ? 'visible' : 'hidden',
                      pointerEvents: isCurrent ? 'auto' : 'none',
                      transition: isCurrent
                        ? 'opacity 0.4s ease 0.06s, transform 0.4s ease 0.06s, visibility 0s linear 0s'
                        : 'opacity 0.4s ease 0s, transform 0.4s ease 0s, visibility 0s linear 0.4s',
                    }}
                    aria-hidden={!isCurrent}
                  >
                    {/* Full service title */}
                    <h3
                      className="text-[21px] sm:text-[24px] md:text-[26px] xl:text-[29px] font-bold text-[#0A0B3D] leading-[1.2] m-0"
                      style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                    >
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14.5px] sm:text-[16px] md:text-[17px] xl:text-[17.5px] leading-[1.55] text-[#3E4260] max-w-[490px] mt-2 sm:mt-2.5 xl:mt-2.5 m-0">
                      {svc.body}
                    </p>

                    {/* Learn more link */}
                    <Link
                      href={svc.href}
                      tabIndex={isCurrent ? 0 : -1}
                      className="inline-flex items-center gap-[8px] hover:gap-[14px] transition-all duration-200 text-[14.5px] sm:text-[15.5px] xl:text-[16px] font-semibold text-[#0B3BFF] hover:text-[#0022CC] min-h-[36px] mt-3 sm:mt-3.5 xl:mt-3 outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-4 rounded-sm"
                    >
                      <span>Learn more</span>
                      <span aria-hidden="true" className="transition-transform duration-200">
                        →
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Navigation: Repositioned close below the stage so all 4 items are visible in viewport */}
        <div className="mt-3 sm:mt-3.5 xl:mt-3.5">
          {/* Desktop Navigation (≥ 1280px): 4 Columns with One Shared Moving Indicator */}
          <div
            role="tablist"
            aria-label="Service navigation"
            className="hidden xl:block relative"
          >
            {/* Background 2px track lines */}
            <div className="grid grid-cols-4 gap-8 pointer-events-none">
              {services.map((svc) => (
                <div key={`track-${svc.id}`} className="h-[2px] bg-[#E1E4F2] w-full" />
              ))}
            </div>

            {/* Moving 3.5px Active Blue Indicator Bar */}
            <div
              className="absolute top-0 left-0 h-[3.5px] -translate-y-[1px] rounded-full bg-[#0B3BFF] pointer-events-none"
              style={{
                width: 'calc((100% - 3 * 32px) / 4)',
                transform: `translateX(calc(${activeIndex} * (100% + 32px)))`,
                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />

            {/* 4 Interactive Tab Buttons */}
            <div className="grid grid-cols-4 gap-8">
              {services.map((svc, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={svc.id}
                    id={`service-tab-${idx}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`service-panel-${idx}`}
                    tabIndex={0}
                    onClick={() => handleSelect(idx)}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleSelect(idx)}
                    className="group min-h-[62px] xl:min-h-[66px] pt-2 xl:pt-2.5 pb-1 text-left cursor-pointer border-none bg-transparent outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-4 rounded-sm flex flex-col justify-start"
                  >
                    {/* Index Number */}
                    <span
                      className={`text-[12.5px] xl:text-[13.5px] font-semibold transition-colors duration-200 ${
                        isActive
                          ? 'text-[#0B3BFF]'
                          : 'text-[#6B7090] group-hover:text-[#0A0B3D]'
                      }`}
                      style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                    >
                      ({svc.number})
                    </span>

                    {/* Full Title */}
                    <span
                      className={`text-[15.5px] xl:text-[17.5px] font-semibold leading-[1.25] mt-0.5 transition-colors duration-200 ${
                        isActive
                          ? 'text-[#0A0B3D]'
                          : 'text-[#4B4F6B] group-hover:text-[#0A0B3D]'
                      }`}
                      style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                    >
                      {svc.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tablet Navigation (768px – 1279px): 2 × 2 Grid with Moving Indicator */}
          <div
            role="tablist"
            aria-label="Service navigation"
            className="hidden md:block xl:hidden relative"
          >
            {/* Background 2x2 Tracks */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 pointer-events-none">
              {services.map((svc) => (
                <div key={`tab-track-${svc.id}`} className="h-[2px] bg-[#E1E4F2] w-full" />
              ))}
            </div>

            {/* Tablet Sliding Indicator */}
            <div
              className="absolute top-0 left-0 h-[3.5px] -translate-y-[1px] rounded-full bg-[#0B3BFF] pointer-events-none"
              style={{
                width: 'calc((100% - 24px) / 2)',
                transform: `translate(calc(${activeIndex % 2} * (100% + 24px)), ${
                  Math.floor(activeIndex / 2) * 72
                }px)`,
                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />

            {/* 2x2 Tab Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {services.map((svc, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={svc.id}
                    id={`service-tab-${idx}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`service-panel-${idx}`}
                    tabIndex={0}
                    onClick={() => handleSelect(idx)}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleSelect(idx)}
                    className="min-h-[68px] pt-2 pb-1 text-left cursor-pointer border-none bg-transparent outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-4 rounded-sm flex items-start gap-2.5"
                  >
                    <span
                      className={`text-[13.5px] font-semibold shrink-0 transition-colors ${
                        isActive ? 'text-[#0B3BFF]' : 'text-[#6B7090]'
                      }`}
                      style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                    >
                      ({svc.number})
                    </span>
                    <span
                      className={`text-[16.5px] font-semibold leading-[1.25] transition-colors ${
                        isActive ? 'text-[#0A0B3D]' : 'text-[#4B4F6B]'
                      }`}
                      style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                    >
                      {svc.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation (< 768px): Vertical List of 4 Rows with Left Sliding Bar */}
          <div
            role="tablist"
            aria-label="Service navigation"
            className="block md:hidden relative rounded-[12px] overflow-hidden border border-[#E1E4F2] bg-[#F7F8FD]"
          >
            {/* Sliding 3.5px × 48px Blue Bar on the Left */}
            <div
              className="absolute left-0 top-0 w-[3.5px] h-[48px] bg-[#0B3BFF] rounded-r pointer-events-none z-10"
              style={{
                transform: `translateY(${activeIndex * 48}px)`,
                transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />

            {/* 4 Vertical Rows */}
            <div className="flex flex-col">
              {services.map((svc, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={svc.id}
                    id={`service-tab-${idx}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`service-panel-${idx}`}
                    tabIndex={0}
                    onClick={() => handleSelect(idx)}
                    className={`h-[48px] min-h-[48px] px-3.5 flex items-center gap-2.5 text-left border-b border-[#E1E4F2] last:border-b-0 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-2 transition-colors ${
                      isActive ? 'bg-white' : 'bg-transparent active:bg-white/60'
                    }`}
                  >
                    <span
                      className={`text-[12.5px] font-semibold transition-colors ${
                        isActive ? 'text-[#0B3BFF]' : 'text-[#6B7090]'
                      }`}
                      style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                    >
                      ({svc.number})
                    </span>
                    <span
                      className={`text-[15px] font-semibold leading-tight truncate transition-colors ${
                        isActive ? 'text-[#0A0B3D]' : 'text-[#4B4F6B]'
                      }`}
                      style={{ fontFamily: "'Outfit', var(--font-inter), sans-serif" }}
                    >
                      {svc.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
