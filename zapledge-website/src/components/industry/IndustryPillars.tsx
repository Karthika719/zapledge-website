"use client";

import React, { useState } from 'react';

export interface Pillar {
  title: string;
  body: string;
  icon: React.ReactNode;
}

export interface IndustryPillarsProps {
  label: string;
  intro: string;
  pillars: Pillar[];
  closing?: string;
  /** Short caption on the rail, e.g. "Manufacturing operating layer". */
  layerLabel?: string;
}

export const IndustryPillars: React.FC<IndustryPillarsProps> = ({
  label,
  intro,
  pillars,
  closing,
  layerLabel,
}) => {
  const [active, setActive] = useState(0);
  const current = pillars[active];
  const num = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <section
      aria-labelledby="industry-pillars-heading"
      className="w-full relative overflow-hidden text-[#00003C] px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-24"
      style={{
        background:
          'radial-gradient(560px 420px at 0% 0%, rgba(0,51,255,0.06), transparent 70%), linear-gradient(180deg, #F3F5FF 0px, #FFFFFF 360px)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl">
          <h2
            id="industry-pillars-heading"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 text-xs font-bold tracking-wider text-[#0033FF] uppercase mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#0033FF]" />
            {label}
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed text-[#45455A] font-medium">{intro}</p>
        </div>

        {/* Desktop: connected rail + detail panel */}
        <div className="hidden lg:block mt-12 rounded-3xl border border-[#0033FF]/15 bg-white/70 p-8">
          {layerLabel && (
            <p className="text-[11px] font-bold tracking-wider uppercase text-[#6B6B80] mb-6">
              {layerLabel}
            </p>
          )}

          <div role="tablist" aria-label={label} className="relative grid grid-cols-5">
            {/* connecting line through node centres */}
            <span
              aria-hidden="true"
              className="absolute top-[19px] left-[10%] right-[10%] h-px bg-[#0033FF]/25"
            />
            {pillars.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.title}
                  type="button"
                  role="tab"
                  id={`pillar-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="pillar-panel"
                  tabIndex={isActive ? 0 : -1}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + pillars.length) % pillars.length;
                      document.getElementById(`pillar-tab-${next}`)?.focus();
                    }
                  }}
                  className="group relative flex flex-col items-center text-center px-2 outline-none"
                >
                  <span
                    className={`relative z-10 w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center text-[13px] font-bold transition-all duration-200 motion-reduce:transition-none group-focus-visible:ring-2 group-focus-visible:ring-[#0033FF]/40 group-focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-[#0033FF] border-[#0033FF] text-white scale-110'
                        : 'bg-white border-[#0033FF]/40 text-[#0033FF]'
                    }`}
                  >
                    {num(i)}
                  </span>
                  <span
                    className={`mt-3 text-[15px] leading-snug font-bold tracking-tight transition-colors duration-200 motion-reduce:transition-none ${
                      isActive ? 'text-[#0033FF]' : 'text-[#00003C]/70'
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            id="pillar-panel"
            role="tabpanel"
            aria-labelledby={`pillar-tab-${active}`}
            className="relative mt-8 rounded-2xl bg-[#F3F5FF] border border-[#0033FF]/10 px-8 py-7"
          >
            {/* pointer to the active node */}
            <span
              aria-hidden="true"
              className="absolute -top-[7px] w-3.5 h-3.5 rotate-45 bg-[#F3F5FF] border-l border-t border-[#0033FF]/10 transition-[left] duration-200 motion-reduce:transition-none"
              style={{ left: `calc(${active * 20 + 10}% - 7px)` }}
            />
            <div key={active} className="grid grid-cols-12 gap-8 items-start pillar-fade">
              <div className="col-span-4 flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#0033FF] text-white flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-current [&>svg]:fill-none [&>svg]:stroke-[1.8]">
                  {current.icon}
                </span>
                <h3 className="text-xl font-extrabold tracking-tight leading-tight">{current.title}</h3>
              </div>
              <p className="col-span-8 text-[16.5px] leading-relaxed text-[#45455A]">{current.body}</p>
            </div>
          </div>

          {closing && (
            <p className="mt-6 pt-5 border-t border-[#0033FF]/15 text-base font-semibold text-[#00003C]">
              {closing}
            </p>
          )}
        </div>

        {/* Mobile / tablet: stacked, tap to reveal */}
        <div className="lg:hidden mt-10">
          <ol className="list-none p-0 m-0">
            {pillars.map((p, i) => {
              const isActive = i === active;
              const isLast = i === pillars.length - 1;
              return (
                <li key={p.title} className="relative flex gap-4">
                  <div aria-hidden="true" className="relative w-8 shrink-0">
                    {!isLast && <span className="absolute left-[15px] top-8 bottom-0 w-[1.5px] bg-[#0033FF]/20" />}
                    <span
                      className={`absolute top-3 left-0 w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold transition-colors duration-200 motion-reduce:transition-none ${
                        isActive
                          ? 'bg-[#0033FF] border-[#0033FF] text-white'
                          : 'bg-white border-[#0033FF]/40 text-[#0033FF]'
                      }`}
                    >
                      {num(i)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pb-3">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`pillar-m-${i}`}
                      onClick={() => setActive(i)}
                      className="w-full min-h-12 py-3 flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#0033FF]/40 rounded-lg"
                    >
                      <span
                        className={`flex-1 text-lg font-bold tracking-tight leading-snug ${
                          isActive ? 'text-[#0033FF]' : 'text-[#00003C]'
                        }`}
                      >
                        {p.title}
                      </span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className={`w-5 h-5 shrink-0 stroke-[#0033FF] fill-none stroke-2 transition-transform duration-200 motion-reduce:transition-none ${
                          isActive ? 'rotate-180' : ''
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div
                      id={`pillar-m-${i}`}
                      hidden={!isActive}
                      className="pb-2 text-[15px] leading-relaxed text-[#45455A]"
                    >
                      {p.body}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {closing && (
            <p className="mt-4 pt-5 border-t border-[#0033FF]/15 text-base font-semibold text-[#00003C]">
              {closing}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pillar-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .pillar-fade { animation: pillar-fade 200ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .pillar-fade { animation: none; } }
      `}</style>
    </section>
  );
};

export default IndustryPillars;
