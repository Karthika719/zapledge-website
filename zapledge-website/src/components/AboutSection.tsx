"use client";

import React from 'react';
import Image from 'next/image';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Zapledge"
      className="w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 relative light-section-tint border-b border-[#E5E5E5]/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Two-Column Grid: Left Text, Right Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Details */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Section Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
              </span>
              <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
                About Zapledge
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#00003C] tracking-tight leading-[1.18] mb-6">
              AI Consulting &amp; Solutions Company in Kochi, Kerala
            </h2>

            {/* Body Copy */}
            <div className="space-y-4 text-base sm:text-[16.5px] leading-relaxed text-[#555555] font-normal">
              <p>
                Zapledge is a Kochi-based AI consulting, engineering, automation, and IoT company, founded in 2025. We&apos;re a focused team of around 20 people who believe AI should be practical, useful, and aligned with real business needs. We help businesses identify where AI can create value, then design and implement solutions that improve efficiency, customer experience, decision-making, and growth.
              </p>
              <p>
                We&apos;re an India-first company, built in Kerala and working across India&apos;s growing technology landscape, with plans to extend into the UAE, Saudi Arabia, Qatar, and other GCC markets as we grow.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Graphic Block */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#00003C] border border-[#00003C]/80 shadow-2xl p-5 sm:p-6 text-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,60,0.2)]">
              {/* Header Status Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0033FF] ring-4 ring-[#0033FF]/30" />
                  <span className="text-[10.5px] font-bold tracking-wider uppercase text-slate-300">
                    Geographic &amp; Operational Footprint
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9.5px] font-semibold text-emerald-300 uppercase tracking-wider">
                    Active Operations
                  </span>
                </div>
              </div>

              {/* Main 3D Connectivity Visual */}
              <div className="relative z-10 w-full rounded-2xl overflow-hidden border border-white/15 h-[260px] sm:h-[280px] bg-black/40 group">
                <Image
                  src="/images/about/connectivity.png"
                  alt="Zapledge technological connectivity from Kochi, India to UAE, Saudi Arabia, and Qatar"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={false}
                />
              </div>

              {/* Footprint Metrics Row */}
              <div className="relative z-10 grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10 text-center sm:text-left">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    2025
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-1">
                    Founded
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    ~20
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-1">
                    Team Strength
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    4
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-1">
                    Core Practices
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
