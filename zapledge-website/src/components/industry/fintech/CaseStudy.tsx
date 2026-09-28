"use client";

import React from 'react';
import Link from 'next/link';
import { whyChoose } from '@/content/industries/fintech';

export const CaseStudy: React.FC = () => {
  return (
    <section
      id="compliance"
      aria-labelledby="compliance-heading"
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
            {whyChoose.label}
          </span>
        </div>

        {/* Section Title */}
        <h2
          id="compliance-heading"
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#00003C] tracking-tight leading-[1.15] max-w-3xl mb-5"
        >
          {whyChoose.title}
        </h2>

        {/* Subhead / intro */}
        <p className="text-base sm:text-lg leading-relaxed max-w-3xl text-[#45455A] mb-10 lg:mb-12">
          {whyChoose.intro}
        </p>

        {/* 2-Column Content + Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Key Controls */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-[#333333] font-normal">
              {whyChoose.body}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {whyChoose.controls.map((ctrl) => (
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
                href={whyChoose.cta.href}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
              >
                {whyChoose.cta.label}
              </Link>
            </div>
          </div>

          {/* Right Column: Maker-Checker & Immutable Audit Ledger Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className="w-full max-w-lg rounded-3xl bg-white border border-[#E5E5E5] p-6 shadow-xl relative overflow-hidden"
              role="img"
              aria-label="Conceptual diagram of Maker-Checker approval and tamper-evident audit logging"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0033FF] to-[#00003C]" />

              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#00003C] block">
                    Audit & Control Architecture
                  </span>
                  <span className="text-[11px] text-[#666666]">
                    Workflow #WF-84920 · Disbursal & State Change
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Audit Ready
                </span>
              </div>

              {/* Approval chain */}
              <div className="py-5 space-y-3">
                {/* Maker */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
                  <span className="mt-0.5 w-7 h-7 rounded-full bg-[#0033FF]/10 text-[#0033FF] text-xs font-bold flex items-center justify-center shrink-0">
                    M
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00003C]">Step 1: Maker Initiation</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-semibold">14:24:08 UTC</span>
                    </div>
                    <p className="text-[11px] text-[#555555] mt-0.5">
                      Loan officer verified applicant score & submitted for dual sign-off
                    </p>
                  </div>
                </div>

                {/* Checker */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]">
                  <span className="mt-0.5 w-7 h-7 rounded-full bg-[#0033FF] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    C
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00003C]">Step 2: Checker Approval</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-semibold">14:26:30 UTC</span>
                    </div>
                    <p className="text-[11px] text-[#555555] mt-0.5">
                      Risk officer independently validated KYC rules & confirmed disbursal
                    </p>
                  </div>
                </div>
              </div>

              {/* Immutable log hash box */}
              <div className="p-3.5 rounded-xl bg-[#F3F5FF] border border-[#0033FF]/15">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-[#00003C]">Immutable Audit Ledger</span>
                  <span className="font-mono text-[#0033FF] text-[10px]">SHA-256 Verified</span>
                </div>
                <p className="font-mono text-[10px] text-[#45455A] truncate">
                  blk_8f29c4d93021 · hash: 7e9b...a3f1 · signed: cert_zap_prod
                </p>
                <div className="mt-2 pt-2 border-t border-[#0033FF]/10 flex items-center justify-between text-[10px] text-[#555555]">
                  <span>Who approved, when, and rule parameters verified</span>
                  <span className="text-emerald-700 font-semibold">✓ Non-repudiable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
