"use client";

import React from 'react';
import Link from 'next/link';
import { advisorControl } from '@/content/industries/wealthtech';

export const CaseStudy: React.FC = () => {
  return (
    <section
      id="advisor-control"
      aria-labelledby="advisor-control-heading"
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#F3F5FF] text-[#00003C] border-b border-[#E5E5E5]/80 relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0033FF]/8 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#0033FF]" />
          <span className="text-xs font-bold tracking-wider uppercase text-[#0033FF]">
            {advisorControl.label}
          </span>
        </div>

        {/* Section Title */}
        <h2
          id="advisor-control-heading"
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#00003C] tracking-tight leading-[1.15] max-w-3xl mb-5"
        >
          {advisorControl.title}
        </h2>

        {/* Subhead / intro */}
        <p className="text-base sm:text-lg leading-relaxed max-w-3xl text-[#45455A] mb-10 lg:mb-12">
          {advisorControl.intro}
        </p>

        {/* 2-Column Content + Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Key Controls */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-[#333333] font-normal">
              {advisorControl.body}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {advisorControl.guardrails.map((ctrl) => (
                <div
                  key={ctrl.label}
                  className="rounded-2xl bg-white border border-[#E5E5E5] p-4 shadow-sm hover:border-[#0033FF]/30 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-[#0033FF]" />
                    <h3 className="text-sm font-bold text-[#00003C] leading-snug">
                      {ctrl.label}
                    </h3>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {ctrl.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={advisorControl.cta.href}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
              >
                {advisorControl.cta.label}
              </Link>
            </div>
          </div>

          {/* Right Column: Advisor Review Workbench Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className="w-full max-w-lg rounded-3xl bg-white border border-[#E5E5E5] p-6 shadow-xl relative overflow-hidden"
              role="img"
              aria-label="Conceptual diagram of Advisor Workbench and Draft Review protocol"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0033FF] to-[#00003C]" />

              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#00003C] block">
                    Advisor Review Workbench
                  </span>
                  <span className="text-[11px] text-[#666666]">
                    Client: Marcus &amp; Sarah Sterling · Portfolio ID #PF-9102
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Advisor Review Required
                </span>
              </div>

              {/* Draft Output Box */}
              <div className="py-5 space-y-3">
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#00003C]">AI Synthesis · Portfolio Rebalancing Brief</span>
                    <span className="text-[10px] font-mono text-[#0033FF] font-semibold">Draft Mode</span>
                  </div>
                  <p className="text-[12px] text-[#45455A] leading-relaxed">
                    “Based on Q3 target allocation rules and approved internal research: Recommend +4% allocation to Core Dividend ETF, funded from short-duration cash yield reserves.”
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-[#666666]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0033FF]" />
                    <span>Source: Approved Wealth Investment Policy #W-2026</span>
                  </div>
                </div>

                {/* Advisor Action Bar */}
                <div className="p-3.5 rounded-xl bg-[#F3F5FF] border border-[#0033FF]/15 flex items-center justify-between gap-3">
                  <div className="text-[11px]">
                    <span className="font-bold text-[#00003C] block">Advisor Authorization</span>
                    <span className="text-[#555555]">Zero unsanctioned communications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-white text-[11px] font-semibold text-[#00003C]">
                      Edit
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#0033FF] text-white text-[11px] font-bold">
                      Approve &amp; Send
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] text-[#666666]">
                <span>Every client-facing decision stays with your advisor</span>
                <span className="font-semibold text-emerald-700">✓ Full control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
