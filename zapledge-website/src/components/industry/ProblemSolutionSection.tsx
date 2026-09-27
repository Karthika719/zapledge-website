"use client";

import React, { useState } from 'react';

export interface ProblemSolutionItem {
  problem: string;
  solution: string;
}

export interface ProblemSolutionSectionProps {
  title: string;
  intro: string;
  items: ProblemSolutionItem[];
  closing?: string;
  /** Renders the visual for the active item. Remounted on change so animations restart. */
  renderVisual: (index: number) => React.ReactNode;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({
  title,
  intro,
  items,
  closing,
  renderVisual,
}) => {
  const [active, setActive] = useState(0);
  const num = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <section
      aria-labelledby="problem-solution-heading"
      className="w-full bg-white text-[#00003C] px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 border-b border-[#E5E5E5]/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2
            id="problem-solution-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.15] mb-4"
          >
            {title}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#555555]">{intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Problem list: all four always visible */}
          <ol className="lg:col-span-6 list-none p-0 m-0 flex flex-col gap-3">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.problem}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`w-full text-left flex gap-4 rounded-2xl border px-5 py-5 transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]/50 ${
                      isActive
                        ? 'border-[#0033FF]/30 bg-[#F3F5FF]'
                        : 'border-transparent bg-transparent hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 w-8 h-8 shrink-0 rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold transition-colors duration-200 motion-reduce:transition-none ${
                        isActive
                          ? 'bg-[#0033FF] border-[#0033FF] text-white'
                          : 'bg-white border-[#0033FF]/30 text-[#0033FF]/70'
                      }`}
                    >
                      {num(i)}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block text-lg sm:text-xl font-bold tracking-tight leading-snug transition-colors duration-200 motion-reduce:transition-none ${
                          isActive ? 'text-[#00003C]' : 'text-[#00003C]/55'
                        }`}
                      >
                        {item.problem}
                      </span>
                      <span
                        className={`block mt-2 text-[15px] leading-relaxed transition-colors duration-200 motion-reduce:transition-none ${
                          isActive ? 'text-[#45455A]' : 'text-[#45455A]/60'
                        }`}
                      >
                        {item.solution}
                      </span>
                    </span>
                  </button>

                  {/* Mobile / tablet: visual sits directly under the active item */}
                  {isActive && (
                    <div className="lg:hidden mt-3">{renderVisual(i)}</div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Desktop: sticky visual */}
          <div className="hidden lg:block lg:col-span-6 sticky top-28">
            <div key={active}>{renderVisual(active)}</div>
          </div>
        </div>

        {closing && (
          <p className="mt-12 lg:mt-16 pt-6 border-t border-[#0033FF]/15 max-w-3xl text-base sm:text-lg font-semibold leading-relaxed text-[#00003C]">
            {closing}
          </p>
        )}
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
