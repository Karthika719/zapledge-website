import React from 'react';
import { IndustryWorkflow } from '@/components/industry/IndustryWorkflow';
import { workflow } from '@/content/industries/fintech';

/* Conceptual mini-visuals, one per workflow stage. Motion runs only while the
   card is hovered or focused and is disabled under prefers-reduced-motion. */

const css = `
@keyframes wf-hl { 0%,30% { background:#0033FF; color:#fff; border-color:#0033FF; } 36%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes wf-fill { 0% { transform:scaleX(.2); } 80%,100% { transform:scaleX(var(--to,.7)); } }
.wf-bar { transform-origin:left; transform:scaleX(var(--to,.7)); }
.wf-card:hover .wf-hl, .wf-card:focus-visible .wf-hl { animation: wf-hl 3.6s linear infinite; }
.wf-card:hover .wf-bar, .wf-card:focus-visible .wf-bar { animation: wf-fill 3.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .wf-card .wf-hl, .wf-card .wf-bar { animation:none !important; } }
`;

const Node: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <span
    className={`wf-hl inline-flex items-center justify-center rounded-lg border border-[#E5E5E5] bg-white px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#00003C] whitespace-nowrap ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </span>
);

const Link: React.FC = () => (
  <span aria-hidden="true" className="wf-arr text-[#0033FF]/60 text-xs px-0.5 shrink-0">
    →
  </span>
);

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col items-center justify-center gap-0 min-h-[76px] [&_.wf-arr]:rotate-90 [&_.wf-arr]:leading-none [&_.wf-arr]:py-0.5">
    {children}
  </div>
);

const Bar: React.FC<{ to: number }> = ({ to }) => (
  <div className="h-1.5 w-full rounded-full bg-[#0033FF]/10 overflow-hidden">
    <div
      className="wf-bar h-full rounded-full bg-[#0033FF]"
      style={{ ['--to' as string]: to } as React.CSSProperties}
    />
  </div>
);

const visuals: React.ReactNode[] = [
  // 01 Lead & Application
  <Row key="1">
    <Node delay={0}>Application intake</Node>
    <Link />
    <Node delay={1.2}>Product & risk routing</Node>
    <Link />
    <Node delay={2.4}>Onboarding flow</Node>
  </Row>,

  // 02 Identity & Document Collection
  <div key="2" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>KYC document capture</Node>
      <Link />
      <Node delay={1.2}>Verification check</Node>
    </div>
    <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700">
      <span aria-hidden="true">✓</span> Automated missing upload reminders
    </div>
  </div>,

  // 03 Verification & Rule Checks
  <div key="3" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-between text-[11px] text-[#666666] mb-0.5">
      <span>Rule engine evaluation</span>
      <span className="text-emerald-700 font-semibold">100% rules checked</span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Identity & AML checks</Node>
      <Link />
      <Node delay={1.8}>Audit trail logged</Node>
    </div>
  </div>,

  // 04 Review & Approval
  <div key="4" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#00003C]">Maker-checker control</span>
      <span className="text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">
        Dual sign-off
      </span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Maker review</Node>
      <Link />
      <Node delay={1.5}>Checker approval</Node>
    </div>
  </div>,

  // 05 Transaction & Disbursal
  <div key="5" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#00003C]">Payment orchestration</span>
      <span className="text-[10px] font-bold rounded-full bg-[#0033FF]/10 text-[#0033FF] px-2 py-0.5">
        Settling
      </span>
    </div>
    <Bar to={0.75} />
    <span className="text-[11px] text-[#666666]">Exception handling & state tracking</span>
  </div>,

  // 06 Monitoring & Reconciliation
  <div key="6" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-[#00003C]">Anomaly monitor</span>
      <span className="text-emerald-600 font-bold">Auto-reconciled</span>
    </div>
    <Bar to={0.96} />
    <span className="text-[11px] text-[#666666]">Exceptions routed to dedicated queue</span>
  </div>,

  // 07 Exception Handling & Reporting
  <Row key="7">
    <Node delay={0}>Flagged case review</Node>
    <Link />
    <Node delay={1.2}>Investigation workflow</Node>
    <Link />
    <Node delay={2.4}>Compliance report filed</Node>
  </Row>,
];

const steps = workflow.steps.map((s, i) => ({ ...s, visual: visuals[i] }));

export const Workflow: React.FC = () => (
  <>
    <style>{css}</style>
    <IndustryWorkflow
      id="fintech-workflow"
      title={workflow.title}
      intro={workflow.intro}
      steps={steps}
    />
  </>
);

export default Workflow;
