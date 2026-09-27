"use client";

import React, { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import './IndustryModuleIndex.css';

export type IndustryModule = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  /** Optional dot colour; defaults cycle blue, violet, cyan, pink. */
  accent?: string;
  /** Optional preview tilt in degrees; defaults cycle -3, 2.5, -2, 3, -2.5. */
  rotation?: number;
};

export type IndustryModuleIndexProps = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** Must work for any count from 3 to 8, not just 5. */
  modules: IndustryModule[];
  defaultActive?: number;
  /** Section anchor / id prefix for internal ARIA wiring. */
  id?: string;
};

const DEFAULT_ACCENTS = ['#0B3BFF', '#7C5CFF', '#22C3EE', '#EC4899'];
const DEFAULT_ROTATIONS = [-3, 2.5, -2, 3, -2.5];

const ArrowIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3.5 10h13M11 5.5 16.5 10 11 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IndustryModuleIndex: React.FC<IndustryModuleIndexProps> = ({
  eyebrow = 'MODULES',
  heading,
  intro,
  modules,
  defaultActive = 1,
  id = 'industry-modules',
}) => {
  const clampedDefault = Math.min(Math.max(defaultActive, 0), Math.max(modules.length - 1, 0));
  const [activeIndex, setActiveIndex] = useState<number>(clampedDefault);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number>(clampedDefault);

  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileHeaderRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const previewId = `${id}-preview`;
  const headingId = `${id}-heading`;

  const accentFor = useCallback(
    (m: IndustryModule, idx: number) => m.accent ?? DEFAULT_ACCENTS[idx % DEFAULT_ACCENTS.length],
    []
  );
  const rotationFor = useCallback(
    (m: IndustryModule, idx: number) => m.rotation ?? DEFAULT_ROTATIONS[idx % DEFAULT_ROTATIONS.length],
    []
  );

  const activeAccent = useMemo(
    () => accentFor(modules[activeIndex], activeIndex),
    [modules, activeIndex, accentFor]
  );
  const activeRotation = useMemo(
    () => rotationFor(modules[activeIndex], activeIndex),
    [modules, activeIndex, rotationFor]
  );

  const focusRow = (idx: number) => {
    rowRefs.current[idx]?.focus();
  };

  const handleRowKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = (idx + 1) % modules.length;
    else if (e.key === 'ArrowUp') next = (idx - 1 + modules.length) % modules.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = modules.length - 1;

    if (next !== null) {
      e.preventDefault();
      setActiveIndex(next);
      focusRow(next);
    }
  };

  const toggleMobile = (idx: number) => {
    setMobileOpenIndex((prev) => {
      const willOpen = prev === idx ? -1 : idx;
      return willOpen;
    });

    // Scroll the newly opened row into view only if its header is off-screen.
    requestAnimationFrame(() => {
      const header = mobileHeaderRefs.current[idx];
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const offScreen = rect.top < 0 || rect.bottom > window.innerHeight;
      if (offScreen) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        header.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      }
    });
  };

  return (
    <section id={id} aria-labelledby={headingId} className="imi-section">
      <div className="imi-container">
        <div className="imi-header">
          <div className="imi-header-left">
            <p className="imi-eyebrow">
              <span className="imi-eyebrow-dot" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id={headingId} className="imi-heading">{heading}</h2>
          </div>
          {intro && (
            <div className="imi-header-right">
              <p className="imi-intro">{intro}</p>
            </div>
          )}
        </div>

        {/* Desktop / tablet (>= 768px... actually >=1024px, see CSS): vertical tab
            list with one shared floating preview. Hidden below 1024px via CSS. */}
        <div
          className="imi-list-wrap"
          role="tablist"
          aria-orientation="vertical"
          aria-label={`${heading} modules`}
          style={{ '--active-index': activeIndex } as React.CSSProperties}
        >
          {modules.map((m, idx) => {
            const isActive = idx === activeIndex;
            const accent = accentFor(m, idx);
            return (
              <button
                key={m.id}
                ref={(el) => { rowRefs.current[idx] = el; }}
                type="button"
                role="tab"
                id={`${id}-tab-${idx}`}
                aria-selected={isActive}
                aria-controls={previewId}
                tabIndex={isActive ? 0 : -1}
                className="imi-row"
                data-active={isActive}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleRowKeyDown(e, idx)}
              >
                <span className="imi-row-divider-active" aria-hidden="true" />
                <span className="imi-number" aria-hidden="true">
                  <span
                    className="imi-number-dot"
                    style={{ backgroundColor: isActive ? accent : undefined }}
                  />
                  {m.number}
                </span>
                <span className="imi-name">{m.title}</span>
                <span className="imi-desc" aria-hidden={!isActive}>
                  {m.description}
                </span>
                <span className="imi-arrow" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </button>
            );
          })}

          {/* One shared floating preview for the whole list */}
          <div
            id={previewId}
            role="tabpanel"
            aria-label={`${modules[activeIndex].title} preview`}
            className="imi-preview"
            style={{ '--rotation': `${activeRotation}deg` } as React.CSSProperties}
          >
            {modules.map((m, idx) => (
              <div key={m.id} className="imi-preview-image" data-active={idx === activeIndex}>
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  fill
                  sizes="(max-width: 1199px) 420px, 520px"
                  priority={idx === clampedDefault}
                  loading={idx === clampedDefault ? 'eager' : 'lazy'}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / small-tablet (< 1024px): expandable disclosure list, one open at a time */}
        <div className="imi-accordion">
          {modules.map((m, idx) => {
            const isOpen = idx === mobileOpenIndex;
            const rotation = rotationFor(m, idx);
            return (
              <div key={m.id} className="imi-accordion-item" data-open={isOpen}>
                <h3 className="imi-accordion-heading">
                  <button
                    ref={(el) => { mobileHeaderRefs.current[idx] = el; }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-mobile-panel-${idx}`}
                    className="imi-accordion-trigger"
                    onClick={() => toggleMobile(idx)}
                  >
                    <span className="imi-accordion-number">{m.number}</span>
                    <span className="imi-accordion-name">{m.title}</span>
                    <span className="imi-accordion-arrow" data-open={isOpen} aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={`${id}-mobile-panel-${idx}`} className="imi-accordion-panel">
                    <div className="imi-accordion-image" style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}>
                      <Image
                        src={m.image.src}
                        alt={m.image.alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 560px"
                        className="object-cover"
                      />
                    </div>
                    <p className="imi-accordion-desc">{m.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryModuleIndex;
