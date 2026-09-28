"use client";

import React from 'react';
import Link from 'next/link';
import { clinicalBoundaries } from '@/content/industries/healthtech';

export const CaseStudy: React.FC = () => {
  return (
    <section
      id="clinical-boundaries"
      aria-labelledby="clinical-boundaries-heading"
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
            {clinicalBoundaries.label}
          </span>
        </div>

        {/* Section Title */}
        <h2
          id="clinical-boundaries-heading"
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#00003C] tracking-tight leading-[1.15] max-w-3xl mb-5"
        >
          {clinicalBoundaries.title}
        </h2>

        {/* Subhead / intro */}
        <p className="text-base sm:text-lg leading-relaxed max-w-3xl text-[#45455A] mb-10 lg:mb-12">
          {clinicalBoundaries.intro}
        </p>

        {/* 2-Column Content + Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Key Principles */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-[#333333] font-normal">
              {clinicalBoundaries.body}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {clinicalBoundaries.principles.map((ctrl) => (
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
                href={clinicalBoundaries.cta.href}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
              >
                {clinicalBoundaries.cta.label}
              </Link>
            </div>
          </div>

          {/* Right Column: Clinical Boundaries Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className="w-full max-w-lg rounded-3xl bg-white border border-[#E5E5E5] p-6 shadow-xl relative overflow-hidden"
              role="img"
              aria-label="Conceptual diagram of Clinical Boundaries and Administrative Scope Architecture"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0033FF] to-[#00003C]" />

              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#00003C] block">
                    Operational Scope Architecture
                  </span>
                  <span className="text-[11px] text-[#666666]">
                    Protocol #MED-SCOPED · HIPAA &amp; Privacy Aligned
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Boundary Guard Active
                </span>
              </div>

              {/* Scope Blocks */}
              <div className="py-5 space-y-3">
                {/* Permitted: Admin AI */}
                <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#00003C]">1. Administrative AI Scope (Automated)</span>
                    <span className="text-[10px] font-mono text-[#0033FF] font-semibold">Active</span>
                  </div>
                  <ul className="text-[11px] text-[#555555] space-y-1 pl-3 list-disc">
                    <li>Intake forms, scheduling reminders, and insurance verification</li>
                    <li>Routine meeting note summarization and structured document extraction</li>
                    <li>Billing exception routing and revenue cycle task creation</li>
                  </ul>
                </div>

                {/* Boundary Line */}
                <div className="relative py-1 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-[#0033FF]/40" />
                  </div>
                  <span className="relative z-10 px-3 py-0.5 rounded-full bg-[#00003C] text-[10px] font-bold text-white tracking-wider uppercase">
                    Strict Boundary · Zero Clinical Autonomy
                  </span>
                </div>

                {/* Clinician Responsibility */}
                <div className="p-3.5 rounded-xl bg-[#F3F5FF] border border-[#0033FF]/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#00003C]">2. Clinical Decision-Making (100% Provider-Owned)</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold">Physician Autonomy</span>
                  </div>
                  <p className="text-[11px] text-[#45455A] leading-relaxed">
                    Patient diagnosis, treatment protocols, surgical decisions, and medication orders stay entirely with licensed clinicians. No automated clinical calls.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] text-[#666666]">
                <span>Administrative load cut · Clinical autonomy preserved</span>
                <span className="font-semibold text-emerald-700">✓ Patient-first</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
