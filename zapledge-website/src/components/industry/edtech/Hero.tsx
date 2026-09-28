import React from 'react';
import Link from 'next/link';
import { hero } from '@/content/industries/edtech';

const STAGES = [
  { name: 'Lead & Counselling', status: 'Enquiry routed', detail: 'Instant follow-up & counsellor context' },
  { name: 'Admission & Batch', status: 'Seat allocated', detail: 'Automated welcome & timetable' },
  { name: 'Learning Delivery', status: 'In progress', detail: 'LMS classes, content & live attendance' },
  { name: 'Assessment & Insights', status: 'Reviewed', detail: 'Practice questions & early flags' },
  { name: 'Fee Invoicing & Updates', status: 'Reconciled', detail: 'Scheduled receipts & parent recaps' },
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
        @keyframes et-row {
          0%, 20% { background-color: rgba(0,51,255,0.06); border-color: rgba(0,51,255,0.28); }
          22%, 100% { background-color: #ffffff; border-color: #E5E5E5; }
        }
        @keyframes et-node {
          0%, 20% { background-color: #0033FF; box-shadow: 0 0 0 4px rgba(0,51,255,0.18); }
          22%, 100% { background-color: #ffffff; box-shadow: none; }
        }
        @keyframes et-status {
          0%, 20% { color: #0033FF; }
          22%, 100% { color: #666666; }
        }
        @keyframes et-bar {
          0% { transform: scaleX(0.08); }
          100% { transform: scaleX(1); }
        }
        .et-row, .et-node, .et-status { animation-duration: ${CYCLE}s; animation-iteration-count: infinite; animation-timing-function: linear; }
        .et-row { animation-name: et-row; }
        .et-node { animation-name: et-node; }
        .et-status { animation-name: et-status; }
        .et-bar { transform-origin: left; animation: et-bar ${CYCLE}s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .et-row, .et-node, .et-status, .et-bar { animation: none !important; }
          .et-bar { transform: scaleX(0.6); }
          .et-row-2 { background-color: rgba(0,51,255,0.06) !important; border-color: rgba(0,51,255,0.28) !important; }
          .et-node-2 { background-color: #0033FF !important; }
        }
      `}</style>

      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-[#0033FF]/10 via-[#0033FF]/5 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-center">
          {/* Left Column */}
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
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

          
        </div>
      </div>
    </section>
  );
};

export default Hero;
