"use client";

import React from 'react';
import { overview } from '@/content/services/iot-intelligent-operations';

export const Overview: React.FC = () => {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 light-section-tint border-b border-[#E5E5E5]/80"
    >
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl border border-[#0033FF]/15 bg-white p-8 sm:p-12 lg:p-14 shadow-[0_12px_40px_rgba(0,0,60,0.04)] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0033FF] via-[#5C7CFF] to-[#00003C]" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
              {overview.label}
            </span>
          </div>

          <h2
            id="overview-heading"
            className="text-xl sm:text-2xl lg:text-[30px] font-bold text-[#00003C] leading-[1.25] tracking-tight mb-6"
          >
            {overview.body}
          </h2>

          <div className="pt-6 border-t border-[#E5E5E5]/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-base sm:text-lg font-medium text-[#0033FF] leading-relaxed">
              {overview.supporting}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
