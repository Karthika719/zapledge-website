"use client";

import React from 'react';

export interface ValuePillar {
  id: string;
  number: string;
  title: string;
  description: string;
}

const defaultValuePillars: ValuePillar[] = [
  {
    id: 'customized',
    number: '01',
    title: 'Customized, not one-size-fits-all',
    description: 'We understand your business processes before recommending a solution.',
  },
  {
    id: 'industry-aware',
    number: '02',
    title: 'Industry-aware',
    description: 'Solutions shaped around your industry, business processes, and real-world requirements.',
  },
  {
    id: 'practical',
    number: '03',
    title: 'Practical over trendy',
    description: 'We focus on measurable improvements, not AI for its own sake.',
  },
  {
    id: 'scalable',
    number: '04',
    title: 'Built to scale',
    description: 'Solutions designed to grow alongside your business.',
  },
  {
    id: 'end-to-end',
    number: '05',
    title: 'End-to-end capability',
    description: 'Strategy, engineering, automation, and connected operations under one team.',
  },
];

export interface WhyZapledgeSectionProps {
  sectionId?: string;
  label?: string;
  headline?: string;
  /** Optional — the original design has no intro paragraph slot; only
      rendered when provided, so pages with their own intro copy keep it. */
  intro?: string;
  items?: ValuePillar[];
}

export const WhyZapledgeSection: React.FC<WhyZapledgeSectionProps> = ({
  sectionId = 'why-zapledge',
  label = 'Why Zapledge',
  headline = 'Why Choose Zapledge for Practical AI Solutions',
  intro,
  items = defaultValuePillars,
}) => {
  return (
    <section
      id={sectionId}
      aria-label={label}
      className="w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 relative light-section-tint border-b border-[#E5E5E5]/80"
    >
      {/* Ambient background light accents (contained to prevent overflow without breaking sticky) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 -left-40 w-96 h-96 bg-[#0033FF]/[0.03] rounded-full blur-3xl pointer-events-none"
        />
        <div
          className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#00003C]/[0.02] rounded-full blur-3xl pointer-events-none"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 2-Column Strategic Split Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Sticky Anchor Headline & Positioning */}
          <div className="lg:col-span-5 lg:sticky lg:top-[110px] self-start pt-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
              </span>
              <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
                {label}
              </span>
            </div>

            {/* Main Display Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#00003C] tracking-tight leading-[1.14] max-w-xl lg:max-w-none">
              {headline}
            </h2>

            {intro && (
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#555555] max-w-xl lg:max-w-none">
                {intro}
              </p>
            )}
          </div>

          {/* RIGHT COLUMN: 5 Horizontally Stacked Cards */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {items.map((pillar) => (
              <article
                key={pillar.id}
                className="group bg-white rounded-2xl border border-[#E5E5E5]/90 p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(0,0,60,0.04)] hover:shadow-[0_12px_30px_-4px_rgba(0,51,255,0.08),0_4px_12px_-2px_rgba(0,0,60,0.03)] hover:border-[#0033FF]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  {/* Editorial Number */}
                  <div className="flex-shrink-0 w-12 sm:w-14 flex items-center justify-center pt-0.5 select-none">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#00003C]/30 group-hover:text-[#0033FF] transition-colors font-sans">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#00003C] group-hover:text-[#0033FF] transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#555555] mt-1.5 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyZapledgeSection;
