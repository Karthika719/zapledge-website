// ANTIGRAVITY_PERSISTENCE_TEST_3
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import './IndustriesSection.css';

interface PrimaryIndustry {
  id: string;
  name: string;
}

const PRIMARY_INDUSTRIES: PrimaryIndustry[] = [
  { id: 'manufacturing', name: 'Manufacturing Tech' },
  { id: 'fintech', name: 'FinTech' },
  { id: 'wealthtech', name: 'WealthTech' },
  { id: 'healthtech', name: 'HealthTech' },
];

interface SecondaryIndustry {
  id: string;
  name: string;
  image: string;
}

const SECONDARY_INDUSTRIES: SecondaryIndustry[] = [
  { id: 'edtech', name: 'EdTech', image: '/images/industries/edutech.png' },
  { id: 'marinetech', name: 'MarineTech', image: '/images/industries/infrastructure.png' },
  { id: 'construction', name: 'Construction', image: '/images/industries/photo_construction.png' },
  { id: 'retail', name: 'Retail', image: '/images/industries/retail.png' },
];

const ManufacturingScene: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg
    className={`ind-scene s1 ${isActive ? 'is-active' : ''}`}
    viewBox="0 0 640 400"
    focusable="false"
    aria-hidden="true"
  >
    {/* Shelving frame */}
    <path className="faint" d="M80 62 V372 M560 62 V372 M80 62 H560" />
    <line className="shelf" x1="80" y1="150" x2="560" y2="150" />
    <line className="shelf" x1="80" y1="255" x2="560" y2="255" />
    <line className="shelf" x1="80" y1="360" x2="560" y2="360" />

    {/* Stock boxes (3 shelves x 5) with level bars; middle shelf box is low stock */}
    <rect x="112" y="94" width="64" height="56" rx="6" />
    <rect className="level" x="122" y="110" width="44" height="30" rx="3" />
    <rect x="200" y="94" width="64" height="56" rx="6" />
    <rect className="level" x="210" y="106" width="44" height="34" rx="3" />
    <rect x="288" y="94" width="64" height="56" rx="6" />
    <rect className="level" x="298" y="114" width="44" height="26" rx="3" />
    <rect x="376" y="94" width="64" height="56" rx="6" />
    <rect className="level" x="386" y="108" width="44" height="32" rx="3" />
    <rect x="464" y="94" width="64" height="56" rx="6" />
    <rect className="level" x="474" y="112" width="44" height="28" rx="3" />

    <rect x="112" y="199" width="64" height="56" rx="6" />
    <rect className="level" x="122" y="211" width="44" height="34" rx="3" />
    <rect x="200" y="199" width="64" height="56" rx="6" />
    <rect className="level" x="210" y="217" width="44" height="28" rx="3" />
    <rect className="low" x="288" y="199" width="64" height="56" rx="6" />
    <rect className="level low-level" x="298" y="237" width="44" height="8" rx="3" />
    <rect x="376" y="199" width="64" height="56" rx="6" />
    <rect className="level" x="386" y="215" width="44" height="30" rx="3" />
    <rect x="464" y="199" width="64" height="56" rx="6" />
    <rect className="level" x="474" y="213" width="44" height="32" rx="3" />

    <rect x="112" y="304" width="64" height="56" rx="6" />
    <rect className="level" x="122" y="324" width="44" height="26" rx="3" />
    <rect x="200" y="304" width="64" height="56" rx="6" />
    <rect className="level" x="210" y="318" width="44" height="32" rx="3" />
    <rect x="288" y="304" width="64" height="56" rx="6" />
    <rect className="level" x="298" y="320" width="44" height="30" rx="3" />
    <rect x="376" y="304" width="64" height="56" rx="6" />
    <rect className="level" x="386" y="316" width="44" height="34" rx="3" />
    <rect x="464" y="304" width="64" height="56" rx="6" />
    <rect className="level" x="474" y="322" width="44" height="28" rx="3" />

    {/* Counted ticks: appear as scan line passes each column */}
    <circle className="tick" cx="144" cy="78" r="4.5" style={{ '--d': '0.86s' } as React.CSSProperties} />
    <circle className="tick" cx="232" cy="78" r="4.5" style={{ '--d': '1.55s' } as React.CSSProperties} />
    <circle className="tick" cx="320" cy="78" r="4.5" style={{ '--d': '2.24s' } as React.CSSProperties} />
    <circle className="tick" cx="408" cy="78" r="4.5" style={{ '--d': '2.93s' } as React.CSSProperties} />
    <circle className="tick" cx="496" cy="78" r="4.5" style={{ '--d': '3.62s' } as React.CSSProperties} />

    <circle className="tick" cx="144" cy="183" r="4.5" style={{ '--d': '0.86s' } as React.CSSProperties} />
    <circle className="tick" cx="232" cy="183" r="4.5" style={{ '--d': '1.55s' } as React.CSSProperties} />
    <circle className="tick" cx="408" cy="183" r="4.5" style={{ '--d': '2.93s' } as React.CSSProperties} />
    <circle className="tick" cx="496" cy="183" r="4.5" style={{ '--d': '3.62s' } as React.CSSProperties} />

    <circle className="tick" cx="144" cy="288" r="4.5" style={{ '--d': '0.86s' } as React.CSSProperties} />
    <circle className="tick" cx="232" cy="288" r="4.5" style={{ '--d': '1.55s' } as React.CSSProperties} />
    <circle className="tick" cx="320" cy="288" r="4.5" style={{ '--d': '2.24s' } as React.CSSProperties} />
    <circle className="tick" cx="408" cy="288" r="4.5" style={{ '--d': '2.93s' } as React.CSSProperties} />
    <circle className="tick" cx="496" cy="288" r="4.5" style={{ '--d': '3.62s' } as React.CSSProperties} />

    {/* Scan line sweeping left to right */}
    <g className="scan">
      <rect className="band" x="-30" y="62" width="30" height="310" />
      <line className="gold" x1="0" y1="62" x2="0" y2="372" />
    </g>

    {/* Low-stock label */}
    <g className="flag">
      <rect className="gold-fill" x="254" y="156" width="132" height="36" rx="18" />
      <text x="320" y="180.5" textAnchor="middle">Low stock</text>
    </g>
  </svg>
);

const FinTechScene: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg
    className={`ind-scene s2 ${isActive ? 'is-active' : ''}`}
    viewBox="0 0 640 400"
    focusable="false"
    aria-hidden="true"
  >
    <line className="faint" x1="40" y1="110" x2="600" y2="110" />
    <line className="faint" x1="40" y1="170" x2="600" y2="170" />
    <line className="faint" x1="40" y1="230" x2="600" y2="230" />
    <line className="faint" x1="40" y1="290" x2="600" y2="290" />
    <line x1="40" y1="320" x2="600" y2="320" />
    <path
      className="chart"
      pathLength={1}
      d="M60 280 L120 250 L180 264 L240 216 L300 232 L360 172 L420 190 L470 98 L520 206 L580 170"
    />
    <g className="mark">
      <line className="gold dashed" x1="470" y1="116" x2="470" y2="320" />
      <circle className="gold-fill" cx="470" cy="98" r="7" />
      <circle className="gold ping" cx="470" cy="98" r="16" />
      <line className="gold" x1="446" y1="68" x2="459" y2="86" />
      <rect className="gold-fill" x="214" y="46" width="232" height="38" rx="19" />
      <text x="330" y="72" textAnchor="middle">Unusual transaction</text>
    </g>
    <line className="stream" x1="40" y1="356" x2="600" y2="356" />
  </svg>
);

const WealthTechScene: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg
    className={`ind-scene s3 ${isActive ? 'is-active' : ''}`}
    viewBox="0 0 640 400"
    focusable="false"
    aria-hidden="true"
  >
    <g transform="rotate(-90 190 200)">
      <circle className="seg a" cx="190" cy="200" r="90" pathLength={100} />
      <circle className="seg b gold" cx="190" cy="200" r="90" pathLength={100} />
      <circle className="seg c" cx="190" cy="200" r="90" pathLength={100} />
    </g>
    <circle className="faint dashed" cx="190" cy="200" r="52" />
    <rect className="faint" x="350" y="160" width="240" height="16" rx="8" />
    <rect className="faint" x="350" y="192" width="240" height="16" rx="8" />
    <rect className="faint" x="350" y="224" width="240" height="16" rx="8" />
    <rect
      className="bar bar-a"
      x="350"
      y="160"
      width="240"
      height="16"
      rx="8"
      style={{ fill: 'var(--on-ink-soft)', stroke: 'none' }}
    />
    <rect
      className="bar bar-b"
      x="350"
      y="192"
      width="240"
      height="16"
      rx="8"
      style={{ fill: 'var(--gold)', stroke: 'none' }}
    />
    <rect
      className="bar bar-c"
      x="350"
      y="224"
      width="240"
      height="16"
      rx="8"
      style={{ fill: 'rgba(238,241,242,0.4)', stroke: 'none' }}
    />
  </svg>
);

const HealthTechScene: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg
    className={`ind-scene s4 ${isActive ? 'is-active' : ''}`}
    viewBox="0 0 640 400"
    focusable="false"
    aria-hidden="true"
  >
    <path
      className="ecg"
      pathLength={1}
      d="M40 200 H120 L140 200 L156 150 L176 250 L198 100 L218 200 H250 L266 182 L282 200 H340"
    />
    <line className="link gold dashed" x1="344" y1="200" x2="380" y2="200" />
    <rect x="380" y="84" width="200" height="232" rx="14" />
    <rect className="row gold-fill" x="404" y="112" width="90" height="10" rx="5" />
    <rect
      className="row"
      x="404"
      y="150"
      width="150"
      height="10"
      rx="5"
      style={{ fill: 'var(--on-ink-soft)', stroke: 'none' }}
    />
    <rect
      className="row"
      x="404"
      y="176"
      width="120"
      height="10"
      rx="5"
      style={{ fill: 'var(--on-ink-soft)', stroke: 'none' }}
    />
    <rect
      className="row"
      x="404"
      y="202"
      width="150"
      height="10"
      rx="5"
      style={{ fill: 'var(--on-ink-soft)', stroke: 'none' }}
    />
    <rect
      className="row"
      x="404"
      y="228"
      width="96"
      height="10"
      rx="5"
      style={{ fill: 'var(--on-ink-soft)', stroke: 'none' }}
    />
    <g className="done">
      <circle className="gold" cx="480" cy="282" r="14" />
      <path className="gold" d="M472 282 L478 288 L489 275" />
    </g>
  </svg>
);

export const IndustriesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [tappedSecondary, setTappedSecondary] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pause animation when the section is not in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selectIndustry = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePointerEnter = (index: number, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (typeof window !== 'undefined' && !window.matchMedia('(min-width: 1024px)').matches) return;

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      selectIndustry(index);
    }, 90);
  };

  const handlePointerLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (index + 1) % PRIMARY_INDUSTRIES.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + PRIMARY_INDUSTRIES.length) % PRIMARY_INDUSTRIES.length;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      selectIndustry(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-labelledby="industries-heading"
      className="w-full scroll-mt-[72px] py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 relative light-section-tint border-b border-[#E5E5E5]/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        {/* Section Header: Compact on desktop */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#0033FF]">
              INDUSTRIES
            </span>
          </div>

          {/* Headline */}
          <h2
            id="industries-heading"
            className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-extrabold text-[#00003C] tracking-tighter leading-[1.12]"
          >
            AI Solutions Across Industries
          </h2>
        </div>

        {/* 2-Column Responsive Layout: Stacked (< lg) & Side-by-Side (lg+) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Vertical List of 4 Primary Industries */}
          <div
            className="order-2 lg:order-1 lg:col-span-5 flex flex-col border-l-2 border-[#E5E5E5]"
            role="tablist"
            aria-orientation="vertical"
            aria-label="Industries list"
          >
            {PRIMARY_INDUSTRIES.map((industry, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={industry.id} className="relative">
                  {/* Sliding active indicator bar in brand accent #0033FF */}
                  <span
                    className={`absolute -left-[2px] top-0 bottom-0 w-[2px] bg-[#0033FF] transition-transform duration-300 ease-out origin-top ${isActive ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    aria-hidden="true"
                  />

                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`industry-tab-${industry.id}`}
                    aria-selected={isActive}
                    aria-current={isActive ? 'true' : undefined}
                    aria-controls={`industry-scene-${industry.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectIndustry(index)}
                    onPointerEnter={(e) => handlePointerEnter(index, e)}
                    onPointerLeave={handlePointerLeave}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-full text-left py-2.5 sm:py-3.5 lg:py-2.5 xl:py-3 pl-5 sm:pl-7 pr-4 rounded-r-xl transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF] focus-visible:outline-offset-4 group cursor-pointer"
                  >
                    <span
                      className={`block font-bold tracking-tight leading-[1.14] transition-colors duration-200 text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] 2xl:text-[44px] ${isActive
                        ? 'text-[#00003C]'
                        : 'text-[#555555] group-hover:text-[#00003C] group-focus-visible:text-[#00003C]'
                        }`}
                    >
                      {industry.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Stage with 4 SVG Scenes */}
          <div className="order-1 lg:order-2 lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
            <div
              className={`ind-stage w-full max-w-[580px] xl:max-w-[640px] max-h-[290px] xl:max-h-[350px] 2xl:max-h-[400px] aspect-[8/5] shadow-lg shadow-[#00003C]/5 ${isPaused ? 'is-paused' : ''
                }`}
              aria-hidden="true"
            >
              <ManufacturingScene isActive={activeIndex === 0} />
              <FinTechScene isActive={activeIndex === 1} />
              <WealthTechScene isActive={activeIndex === 2} />
              <HealthTechScene isActive={activeIndex === 3} />
            </div>
          </div>
        </div>

        {/* Secondary Industries & Mission Statement Footer */}
        <div className="mt-6 lg:mt-8 pt-4 lg:pt-5 border-t border-[#E5E5E5]/80">
          <ul
            className="flex flex-nowrap items-start gap-2 sm:gap-3 lg:gap-4 w-full list-none m-0 p-0"
            role="list"
            aria-label="Additional industries we serve"
          >
            {SECONDARY_INDUSTRIES.map((sec) => {
              const isTapped = tappedSecondary === sec.id;
              return (
                <li
                  key={sec.id}
                  className={`sec-ind-cell group flex-1 min-w-0 transition-[flex-grow] duration-500 ease-out hover:grow-[1.6] focus-within:grow-[1.6] ${isTapped ? 'grow-[1.6]' : 'grow'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setTappedSecondary((prev) => (prev === sec.id ? null : sec.id))}
                    onBlur={() => setTappedSecondary((prev) => (prev === sec.id ? null : prev))}
                    className={`sec-ind-item relative block w-full overflow-hidden rounded-2xl text-left outline-none transition-[height,transform,box-shadow] duration-500 ease-out hover:h-40 sm:hover:h-44 lg:hover:h-48 focus-visible:h-40 sm:focus-visible:h-44 lg:focus-visible:h-48 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(0,0,60,0.28)] focus-visible:shadow-[0_16px_32px_-16px_rgba(0,0,60,0.28)] focus-visible:ring-2 focus-visible:ring-[#0033FF] focus-visible:ring-offset-2 ${isTapped ? 'h-40 sm:h-44 lg:h-48 -translate-y-0.5 shadow-[0_16px_32px_-16px_rgba(0,0,60,0.28)]' : 'h-14 sm:h-14 lg:h-16'
                      }`}
                    aria-pressed={isTapped}
                  >
                    {/* Always-visible thumbnail; the photo itself zooms in
                        slightly as the item expands on hover/focus/tap */}
                    <span className="absolute inset-0 rounded-2xl overflow-hidden" aria-hidden="true">
                      <Image
                        src={sec.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 45vw, 20vw"
                        className={`object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-within:scale-110 ${isTapped ? 'scale-110' : 'scale-100'
                          }`}
                      />
                      {/* Subtle scrim for label legibility only — image stays natural, no heavy overlay */}
                      <span
                        className={`absolute inset-0 bg-gradient-to-b from-[#00003C]/85 to-[#00003C]/20 transition-opacity duration-500 ease-out opacity-85 group-hover:opacity-95 group-focus-within:opacity-95 ${isTapped ? 'opacity-95' : ''
                          }`}
                      />
                    </span>

                    {/* Label */}
                    <span className="relative z-10 block px-3 sm:px-4 pt-2.5 sm:pt-3 text-sm sm:text-lg lg:text-xl xl:text-[22px] font-bold tracking-tight leading-tight break-words text-white">
                      {sec.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 lg:mt-4 text-base leading-relaxed text-[#555555] max-w-[640px] font-normal">
            We also serve these sectors as part of our broader mission to make practical AI accessible across industries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
