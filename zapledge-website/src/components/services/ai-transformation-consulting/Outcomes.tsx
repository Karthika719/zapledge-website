"use client";

import React from 'react';
import { outcomes } from '@/content/services/ai-transformation-consulting';

export const Outcomes: React.FC = () => {
  return (
    <section
      id="outcomes"
      aria-labelledby="outcomes-heading"
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 relative bg-white border-b border-[#E5E5E5]/80"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-4 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
              {outcomes.label}
            </span>
          </div>

          <h2
            id="outcomes-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#00003C] tracking-tight leading-[1.15] mb-5 sm:mb-6"
          >
            {outcomes.headline}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#555555] font-normal">
            {outcomes.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {outcomes.items.map((item) => (
            <div
              key={item.number}
              className="flex flex-col justify-between rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5]/90 p-6 sm:p-7 hover:border-[#0033FF]/40 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#0033FF]">
                    {item.number}
                  </span>
                  <div className="h-1 w-8 bg-[#0033FF]/20 rounded-full" />
                </div>

                <h3 className="text-xl font-bold text-[#00003C] tracking-tight leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#555555]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
