import React from 'react';
import { IndustryCaseStudy } from '@/components/industry/IndustryCaseStudy';
import { caseStudy } from '@/content/industries/manufacturing-tech';

const Arrow: React.FC = () => (
  <>
    <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden lg:block w-7 h-7 shrink-0 stroke-[#5C7CFF] fill-none stroke-2 self-center">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <svg aria-hidden="true" viewBox="0 0 24 24" className="lg:hidden w-6 h-6 stroke-[#5C7CFF] fill-none stroke-2 self-center">
      <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

const ColumnLabel: React.FC<{ n: string; children: React.ReactNode; tone?: 'muted' | 'accent' | 'onBlue' }> = ({ n, children, tone = 'accent' }) => (
  <p className={`text-[11px] font-bold tracking-wider uppercase mb-4 ${tone === 'muted' ? 'text-white/50' : tone === 'onBlue' ? 'text-[#0033FF]' : 'text-[#5C7CFF]'}`}>
    {n} · {children}
  </p>
);

export const CaseStudy: React.FC = () => (
  <IndustryCaseStudy
    label={caseStudy.label}
    title={caseStudy.title}
    body={caseStudy.body}
    ctaText={caseStudy.cta.label}
    ctaHref={caseStudy.cta.href}
    theme="light"
  >
    
  </IndustryCaseStudy>
);

export default CaseStudy;
