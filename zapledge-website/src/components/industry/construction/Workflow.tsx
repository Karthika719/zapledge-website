import React from 'react';
import { IndustryWorkflow } from '@/components/industry/IndustryWorkflow';
import { workflow } from '@/content/industries/construction';

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
  // 01 Lead & Estimation
  <Row key="1">
    <Node delay={0}>Tender enquiry</Node>
    <Link />
    <Node delay={1.2}>BOQ &amp; cost codes</Node>
    <Link />
    <Node delay={2.4}>Estimate locked</Node>
  </Row>,

  // 02 Award & Project Setup
  <div key="2" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Bid awarded</Node>
      <Link />
      <Node delay={1.2}>Milestones initialized</Node>
    </div>
    <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700">
      <span aria-hidden="true">✓</span> Budgets mapped directly from estimate
    </div>
  </div>,

  // 03 Planning & Procurement
  <div key="3" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-between text-[11px] text-[#666666] mb-0.5">
      <span>Schedule &amp; material orders</span>
      <span className="text-[#0033FF] font-semibold">Tied to site</span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>RFQs dispatched</Node>
      <Link />
      <Node delay={1.8}>PO delivery scheduled</Node>
    </div>
  </div>,

  // 04 Site Execution
  <div key="4" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#00003C]">Field progress sync</span>
      <span className="text-[10px] font-bold rounded-full bg-[#0033FF]/10 text-[#0033FF] px-2 py-0.5">
        Live Feed
      </span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Daily mobile logs</Node>
      <Link />
      <Node delay={1.5}>Progress photos tagged</Node>
    </div>
  </div>,

  // 05 Quality & Safety
  <div key="5" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-[#00003C]">Quality &amp; safety checks</span>
      <span className="text-emerald-700 font-bold">In-flow logging</span>
    </div>
    <Bar to={0.92} />
    <span className="text-[11px] text-[#666666]">Integrated checks without extra compliance friction</span>
  </div>,

  // 06 Billing & Variations
  <Row key="6">
    <Node delay={0}>Variation logged</Node>
    <Link />
    <Node delay={1.2}>Digital approval</Node>
    <Link />
    <Node delay={2.4}>Dispute-free billing</Node>
  </Row>,

  // 07 Handover & Closeout
  <div key="7" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-[#00003C]">Project closeout pack</span>
      <span className="text-emerald-700 font-bold">Audit-ready</span>
    </div>
    <Bar to={0.97} />
    <span className="text-[11px] text-[#666666]">Built on verified photos, approvals, and signoffs</span>
  </div>,
];

const steps = workflow.steps.map((s, i) => ({ ...s, visual: visuals[i] }));

export const Workflow: React.FC = () => (
  <>
    <style>{css}</style>
    <IndustryWorkflow
      id="construction-workflow"
      title={workflow.title}
      intro={workflow.intro}
      steps={steps}
    />
  </>
);

export default Workflow;
