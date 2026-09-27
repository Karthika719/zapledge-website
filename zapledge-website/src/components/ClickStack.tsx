"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";

export type ClickStackItem = {
  number: string;
  title: string;
  body: string;
};

export type ClickStackProps = {
  label: string;
  headline: string;
  intro: string;
  items: ClickStackItem[];
};

const VISIBLE_DEPTH = 3;
const EXIT_MS = 280;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ClickStack: React.FC<ClickStackProps> = ({ label, headline, intro, items }) => {
  const total = items.length;
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<number | null>(null);
  const headingId = useId();
  const stackId = useId();

  useEffect(() => () => {
    if (exitTimer.current) window.clearTimeout(exitTimer.current);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (total === 0 || exiting) return;
      setActive(((index % total) + total) % total);
    },
    [total, exiting],
  );

  const next = useCallback(() => {
    if (total < 2 || exiting) return;
    if (prefersReducedMotion()) {
      setActive((a) => (a + 1) % total);
      return;
    }
    // Lift the top card out first, then send it to the back of the stack.
    setExiting(true);
    exitTimer.current = window.setTimeout(() => {
      setActive((a) => (a + 1) % total);
      setExiting(false);
    }, EXIT_MS);
  }, [total, exiting]);

  const prev = useCallback(() => goTo(active - 1), [goTo, active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        goTo(0);
        break;
      case "End":
        e.preventDefault();
        goTo(total - 1);
        break;
    }
  };

  if (total === 0) return null;

  const current = items[active];

  return (
    <section
      aria-labelledby={headingId}
      className="light-section-tint w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden border-b border-border-subtle/80"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Header */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/5 border border-accent/15 mb-5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-bold tracking-wider text-accent uppercase">{label}</span>
          </div>

          <h2
            id={headingId}
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-navy tracking-tight leading-[1.18] mb-5"
          >
            {headline}
          </h2>

          <p className="text-base sm:text-[16.5px] leading-relaxed text-text-secondary max-w-xl">{intro}</p>

          {/* Step index: jump directly to any card */}
          <ol className="mt-8 lg:mt-10 hidden sm:flex flex-col gap-1 max-w-md" aria-label="Steps">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.number}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-controls={stackId}
                    aria-current={isActive ? "step" : undefined}
                    className={`group w-full flex items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 motion-reduce:transition-none ${
                      isActive ? "bg-white shadow-[0_4px_16px_-4px_rgba(0,0,60,0.08)]" : "hover:bg-white/60"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-wider tabular-nums transition-colors motion-reduce:transition-none ${
                        isActive ? "text-accent" : "text-ink-muted group-hover:text-accent"
                      }`}
                    >
                      {item.number}
                    </span>
                    <span
                      className={`text-[15px] font-semibold transition-colors motion-reduce:transition-none ${
                        isActive ? "text-navy" : "text-ink-muted group-hover:text-navy"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-0.5 rounded-full bg-accent transition-all duration-300 motion-reduce:transition-none ${
                        isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Stack */}
        <div className="lg:col-span-7 w-full max-w-xl mx-auto lg:max-w-none">
          <div
            id={stackId}
            role="group"
            aria-roledescription="card stack"
            aria-label={`${headline}: step ${active + 1} of ${total}`}
            tabIndex={0}
            onClick={next}
            onKeyDown={onKeyDown}
            className="relative grid cursor-pointer select-none rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
            style={{ paddingBottom: `${Math.min(total - 1, VISIBLE_DEPTH) * 16}px` }}
          >
            {items.map((item, i) => {
              const pos = (i - active + total) % total;
              const isTop = pos === 0;
              const depth = Math.min(pos, VISIBLE_DEPTH);
              const hidden = pos > VISIBLE_DEPTH;
              const isLeaving = isTop && exiting;

              const transform = isLeaving
                ? "translate3d(0, -28px, 0) rotate(-4deg) scale(1.02)"
                : `translate3d(0, ${depth * 16}px, 0) scale(${1 - depth * 0.05})`;

              return (
                <article
                  key={item.number}
                  aria-hidden={!isTop}
                  inert={!isTop}
                  className={`[grid-area:1/1] origin-bottom rounded-3xl border p-7 sm:p-9 lg:p-10 flex flex-col transition-[transform,opacity,background-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isTop
                      ? "bg-white border-border-subtle shadow-[0_24px_48px_-16px_rgba(0,0,60,0.16),0_4px_12px_-4px_rgba(0,0,60,0.05)]"
                      : "bg-lavender border-accent/10 shadow-[0_8px_24px_-12px_rgba(0,0,60,0.10)]"
                  }`}
                  style={{
                    transform,
                    zIndex: isLeaving ? total + 1 : total - pos,
                    opacity: hidden || isLeaving ? 0 : 1,
                    transitionDuration: isLeaving ? `${EXIT_MS}ms` : undefined,
                  }}
                >
                  <div className={`flex flex-col h-full ${isTop ? "" : "opacity-0"}`}>
                    <div className="flex items-center justify-between mb-8 sm:mb-10">
                      <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-accent/15 tabular-nums leading-none">
                        {item.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-ink-muted uppercase tabular-nums">
                        {i + 1} / {total}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-[22px] lg:text-2xl font-bold text-navy tracking-tight leading-snug mb-4">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-text-secondary">{item.body}</p>

                    {/* {total > 1 && (
                      <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-accent">
                       
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-none stroke-current stroke-2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )} */}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Controls */}
          {total > 1 && (
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {items.map((item, i) => (
                  <span
                    key={item.number}
                    className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                      i === active ? "w-6 bg-accent" : "w-1.5 bg-accent/20"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-controls={stackId}
                  aria-label="Previous step"
                  className="h-11 w-11 rounded-full border border-border-subtle bg-white text-navy flex items-center justify-center hover:border-accent hover:text-accent transition-colors motion-reduce:transition-none"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-controls={stackId}
                  aria-label="Next step"
                  className="h-11 w-11 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-dark transition-colors motion-reduce:transition-none"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Step {active + 1} of {total}: {current.title}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClickStack;
