import React from 'react';
import Link from 'next/link';
import { hero } from '@/content/industries/construction';

const STAGES = [
  { name: 'Lead & Estimation', status: 'Bid locked', detail: 'Tender BOQ & budget baseline' },
  { name: 'Award & Project Setup', status: 'Milestones set', detail: 'Phase schedule & cost codes locked' },
  { name: 'Planning & Procurement', status: 'RFQs active', detail: 'Material requisitions & delivery slots' },
  { name: 'Site Execution & Logs', status: 'Field live', detail: 'Mobile daily logs & progress photos' },
  { name: 'Billing & Variation Audit', status: 'Reconciled', detail: 'Documented signoffs & milestone billing' },
];

const CYCLE = 10; // seconds for one pass through all stages

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative w-full pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 lg:pb-24 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-[#FAFAFA] border-b border-[#E5E5E5]/80"
    >
      <style>{`
        @keyframes ct-row {
          0%, 20% { background-color: rgba(0,51,255,0.06); border-color: rgba(0,51,255,0.28); }
          22%, 100% { background-color: #ffffff; border-color: #E5E5E5; }
        }
        @keyframes ct-node {
          0%, 20% { background-color: #0033FF; box-shadow: 0 0 0 4px rgba(0,51,255,0.18); }
          22%, 100% { background-color: #ffffff; box-shadow: none; }
        }
        @keyframes ct-status {
          0%, 20% { color: #0033FF; }
          22%, 100% { color: #666666; }
        }
        @keyframes ct-bar {
          0% { transform: scaleX(0.08); }
          100% { transform: scaleX(1); }
        }
        .ct-row, .ct-node, .ct-status { animation-duration: ${CYCLE}s; animation-iteration-count: infinite; animation-timing-function: linear; }
        .ct-row { animation-name: ct-row; }
        .ct-node { animation-name: ct-node; }
        .ct-status { animation-name: ct-status; }
        .ct-bar { transform-origin: left; animation: ct-bar ${CYCLE}s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ct-row, .ct-node, .ct-status, .ct-bar { animation: none !important; }
          .ct-bar { transform: scaleX(0.6); }
          .ct-row-2 { background-color: rgba(0,51,255,0.06) !important; border-color: rgba(0,51,255,0.28) !important; }
          .ct-node-2 { background-color: #0033FF !important; }
        }
      `}</style>

      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-[#0033FF]/10 via-[#0033FF]/5 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
              </span>
              <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#00003C] tracking-tight leading-[1.1] mb-5">
              {hero.title}
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed text-[#555555] font-normal max-w-2xl mb-4">
              {hero.subheadline}
            </p>

            <p className="text-base leading-relaxed text-[#555555] max-w-2xl mb-8">
              {hero.description}
            </p>

            <Link
              href={hero.cta.href}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] text-white text-base font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
            >
              {hero.cta.label}
            </Link>
          </div>

          {/* Right Column: connected construction operations concept */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="w-full max-w-md rounded-3xl bg-white border border-[#E5E5E5] p-5 sm:p-6 shadow-xl relative overflow-hidden"
              role="img"
              aria-label="Concept view of connected construction operations: Lead & Estimation, Award & Setup, Planning & Procurement, Site Execution, Billing & Variations"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0033FF] to-[#00003C]" />

              <div className="flex items-center justify-between pb-3">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#00003C]">
                  Project execution flow
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  Site-to-Office Sync
                </span>
              </div>

              {/* Overall progress */}
              <div className="h-1.5 w-full rounded-full bg-[#0033FF]/10 overflow-hidden mb-4">
                <div className="ct-bar h-full rounded-full bg-gradient-to-r from-[#0033FF] to-[#00003C]" />
              </div>

              <ol className="relative space-y-2" aria-hidden="true">
                <span className="absolute left-[19px] top-6 bottom-6 w-px bg-[#0033FF]/20" />
                {STAGES.map((s, i) => (
                  <li
                    key={s.name}
                    className={`ct-row ${i === 2 ? 'ct-row-2' : ''} relative flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5`}
                    style={{ animationDelay: `${(i * CYCLE) / STAGES.length}s` }}
                  >
                    <span
                      className={`ct-node ${i === 2 ? 'ct-node-2' : ''} relative z-10 flex h-4 w-4 shrink-0 rounded-full border-2 border-white bg-white`}
                      style={{ animationDelay: `${(i * CYCLE) / STAGES.length}s` }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#00003C] truncate">{s.name}</p>
                      <p className="text-[10px] text-[#666666] truncate">{s.detail}</p>
                    </div>
                    <span
                      className="ct-status text-[11px] font-semibold shrink-0"
                      style={{ animationDelay: `${(i * CYCLE) / STAGES.length}s` }}
                    >
                      {s.status}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="pt-3 mt-3 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] text-[#666666]">
                <span>Connected project tracks</span>
                <span className="font-semibold text-[#0033FF]">Built for field adoption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
