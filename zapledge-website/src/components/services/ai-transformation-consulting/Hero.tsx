"use client";

import React from 'react';
import Link from 'next/link';
import { hero } from '@/content/services/ai-transformation-consulting';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative w-full pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-[#FAFAFA] border-b border-[#E5E5E5]/80"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-[#0033FF]/10 via-[#0033FF]/5 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
              </span>
              <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
                {hero.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#00003C] tracking-tight leading-[1.1] mb-6">
              {hero.title}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl leading-relaxed text-[#555555] font-normal max-w-2xl mb-8">
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href={hero.cta.href}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] text-white text-base font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
              >
                {hero.cta.label}
              </Link>
            </div>
          </div>

          {/* Right Column: Transformation Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-white border border-[#E5E5E5] p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0033FF] to-[#00003C]" />

              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#666666]">
                  zapledge-ai-roadmap.plan
                </span>
              </div>

              <div className="py-6 space-y-4 font-mono text-xs text-[#333333]">
                <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-[#0033FF] font-semibold">Readiness Assessment</span>
                  <span className="text-emerald-600 font-bold">● Complete</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-[#0033FF] font-semibold">Use-Case Discovery</span>
                  <span className="text-emerald-600 font-bold">● Prioritized</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-[#0033FF] font-semibold">Transformation Roadmap</span>
                  <span className="text-emerald-600 font-bold">● Phase 1 Active</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#666666]">
                <span>Status: Strategy Aligned</span>
                <span className="font-semibold text-[#00003C]">3 / 6 / 12mo Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
