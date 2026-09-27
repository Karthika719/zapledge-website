"use client";

import React from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export interface CaseStudyMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface IndustryCaseStudyProps {
  label?: string;
  title: string;
  headlineAccent?: string;
  clientName?: string;
  clientIndustry?: string;
  challenge?: string;
  solution?: string;
  metrics?: CaseStudyMetric[];
  /** Short narrative shown under the title (used with `children` visual). */
  body?: string;
  /** Custom visual rendered full-width below the header instead of the challenge/solution layout. */
  children?: React.ReactNode;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  /** Optional CSS background for the section (defaults to solid navy). */
  background?: string;
  /** Header colour scheme; `light` renders on a light surface. */
  theme?: 'dark' | 'light';
  ctaHref?: string;
  ctaText?: string;
}

export const IndustryCaseStudy: React.FC<IndustryCaseStudyProps> = ({
  label = "ENTERPRISE IMPACT STORY",
  title,
  headlineAccent,
  clientName,
  clientIndustry,
  challenge,
  solution,
  metrics = [],
  body,
  background,
  theme = 'dark',
  children,
  quote,
  ctaHref = "/contact",
  ctaText = "Discuss Your Enterprise Transformation",
}) => {
  const light = theme === 'light';
  return (
    <section
      aria-labelledby="case-study-heading"
      className={`w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 ${light ? 'bg-[#F3F5FF] text-[#00003C] border-b border-[#E5E5E5]/80' : 'bg-[#00003C] text-white'} relative overflow-hidden`}
      style={background ? { background } : undefined}
    >
      {/* Background Accent Glow */}
      <div
        className={`absolute top-0 right-0 w-[600px] h-[600px] ${light ? 'bg-[#0033FF]/8' : 'bg-[#0033FF]/15'} rounded-full blur-[120px] pointer-events-none`}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Eyebrow Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${light ? 'bg-[#0033FF]/5 border-[#0033FF]/15' : 'bg-white/10 border-white/20'} border mb-6`}>
          <span className={`w-2 h-2 rounded-full ${light ? 'bg-[#0033FF]' : 'bg-[#5C7CFF]'}`} />
          <span className={`text-xs font-bold tracking-wider uppercase ${light ? 'text-[#0033FF]' : 'text-[#5C7CFF]'}`}>
            {label}
          </span>
        </div>

        {/* Section Title */}
        <h2
          id="case-study-heading"
          className={`text-3xl sm:text-4xl lg:text-[42px] font-extrabold ${light ? 'text-[#00003C]' : 'text-white'} tracking-tight leading-[1.15] max-w-3xl ${body ? 'mb-5' : 'mb-12'}`}
        >
          {title} {headlineAccent && <span className={light ? 'text-[#0033FF]' : 'text-[#5C7CFF]'}>{headlineAccent}</span>}
        </h2>

        {body && (
          <div className="mb-10 lg:mb-12 flex flex-col items-start gap-6">
            <p className={`text-base sm:text-lg leading-relaxed max-w-3xl ${light ? 'text-[#45455A]' : 'text-white/80'}`}>{body}</p>
            <AnimatedButton href={ctaHref} variant="gradient" size="md" className="self-start shrink-0">
              {ctaText}
            </AnimatedButton>
          </div>
        )}

        {children}

        {challenge && solution && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Challenge & Solution Story */}
          <div className="lg:col-span-7 space-y-8">
            {/* Client Tag */}
            <div className="flex items-center gap-3 text-sm text-[#5C7CFF] font-semibold tracking-wide uppercase">
              <span>{clientName}</span>
              <span>•</span>
              <span className="text-white/70">{clientIndustry}</span>
            </div>

            {/* Challenge Block */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-[#5C7CFF] uppercase tracking-wider mb-2">
                The Enterprise Challenge
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                {challenge}
              </p>
            </div>

            {/* Solution Block */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
                Zapledge AI Solution
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                {solution}
              </p>
            </div>

            {/* Optional Quote */}
            {quote && (
              <blockquote className="border-l-4 border-[#0033FF] pl-6 py-2 italic text-white/90">
                <p className="text-lg font-normal mb-3">&ldquo;{quote.text}&rdquo;</p>
                <cite className="not-italic text-sm font-semibold text-[#5C7CFF] block">
                  {quote.author} — <span className="text-white/70 font-normal">{quote.role}</span>
                </cite>
              </blockquote>
            )}
          </div>

          {/* Right Column: Outcomes & Metrics Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                Verified Outcomes
              </h3>

              <div className="space-y-6">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#5C7CFF] tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-base font-semibold text-white mt-1">
                      {metric.label}
                    </span>
                    {metric.detail && (
                      <span className="text-xs text-white/60 mt-0.5">
                        {metric.detail}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Link */}
            {ctaHref && (
              <div className="pt-8 mt-8 border-t border-white/10">
                <AnimatedButton href={ctaHref} variant="gradient" size="md" className="w-full">
                  {ctaText}
                </AnimatedButton>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default IndustryCaseStudy;
