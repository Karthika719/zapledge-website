"use client";

import React from 'react';
import Link from 'next/link';
import { cta } from '@/content/industries/construction';

export const CTA: React.FC = () => {
  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="bg-[#FAFAFA] bg-[radial-gradient(90%_80%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] px-6 pt-16 pb-[72px] md:bg-[radial-gradient(70%_90%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] md:px-14 md:pt-[88px] md:pb-24 lg:bg-[radial-gradient(55%_90%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] lg:px-24 lg:pt-[104px] lg:pb-28 border-b border-[#E5E5E5]/80"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 text-center md:gap-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-[7px] md:px-4 md:py-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0033FF]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#00003C] md:text-xs">
            {cta.label}
          </span>
        </div>

        <h2
          id="cta-title"
          className="m-0 text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#00003C] md:text-[38px] md:leading-[1.12] md:tracking-[-0.03em] lg:text-[46px] lg:leading-[1.1]"
        >
          {cta.headline}
        </h2>

        <p className="m-0 max-w-[640px] text-[16px] leading-[1.65] font-semibold text-[#00003C] md:text-lg">
          {cta.body}
        </p>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={cta.primaryCta.href}
            className="w-full sm:w-auto rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] px-8 py-[17px] text-center text-base font-bold text-white transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0033FF]"
          >
            {cta.primaryCta.label}
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-[#E5E5E5] flex flex-wrap items-center justify-center gap-4 text-sm text-[#666666]">
          <span>Email us directly:</span>
          {cta.emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="font-medium text-[#0033FF] hover:underline underline-offset-4"
            >
              {email}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;
