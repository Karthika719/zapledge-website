import React from 'react';
import { IndustryWorkflow } from '@/components/industry/IndustryWorkflow';
import { workflow } from '@/content/industries/manufacturing-tech';

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

const Node: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <span
    className={`wf-hl inline-flex items-center justify-center rounded-lg border border-[#E5E5E5] bg-white px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#00003C] whitespace-nowrap ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </span>
);

const Link: React.FC = () => (
  <span aria-hidden="true" className="wf-arr text-[#0033FF]/60 text-xs px-0.5 shrink-0">→</span>
);

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col items-center justify-center gap-0 min-h-[76px] [&_.wf-arr]:rotate-90 [&_.wf-arr]:leading-none [&_.wf-arr]:py-0.5">{children}</div>
);

const Bar: React.FC<{ to: number }> = ({ to }) => (
  <div className="h-1.5 w-full rounded-full bg-[#0033FF]/10 overflow-hidden">
    <div className="wf-bar h-full rounded-full bg-[#0033FF]" style={{ ['--to' as string]: to } as React.CSSProperties} />
  </div>
);

const visuals: React.ReactNode[] = [
  // 01 Enquiry & Quotation
  <Row key="1">
    <Node delay={0}>Enquiry</Node><Link />
    <Node delay={1.2}>Routed to team</Node><Link />
    <Node delay={2.4}>Draft quotation</Node>
  </Row>,
  // 02 Sales Order & Production Planning
  <div key="2" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Sales order</Node><Link />
      <Node delay={1.2}>Work order</Node>
    </div>
    <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700">
      <span aria-hidden="true">✓</span> Material availability checked
    </div>
  </div>,
  // 03 Procurement & Material Issue
  <div key="3" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div>
      <div className="flex justify-between text-[11px] text-[#666666] mb-1"><span>Stock level</span><span className="text-amber-600 font-semibold">Threshold</span></div>
      <Bar to={0.3} />
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Procurement trigger</Node><Link />
      <Node delay={1.8}>Approval</Node>
    </div>
  </div>,
  // 04 Work Order Execution
  <div key="4" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#00003C]">Work order</span>
      <span className="text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">In production</span>
    </div>
    <Bar to={0.65} />
    <span className="text-[11px] text-[#666666]">Real-time tracking</span>
  </div>,
  // 05 Quality Control
  <div key="5" className="min-h-[76px] flex flex-col justify-center gap-1.5">
    {[
      ['QC checkpoint', 'ok'],
      ['QC checkpoint', 'ok'],
      ['Exception logged', 'warn'],
    ].map(([l, t], i) => (
      <div key={i} className="flex items-center justify-between rounded-lg border border-[#E5E5E5] bg-white px-2.5 py-1">
        <span className="text-[11px] sm:text-xs font-semibold text-[#00003C]">{l}</span>
        <span className={`text-[10px] font-bold ${t === 'ok' ? 'text-emerald-600' : 'text-amber-600'}`}>{t === 'ok' ? '✓' : '⚑ Tracked'}</span>
      </div>
    ))}
  </div>,
  // 06 Finished Goods & Dispatch
  <Row key="6">
    <Node delay={0}>Finished goods</Node><Link />
    <Node delay={1.2}>Dispatch</Node><Link />
    <Node delay={2.4}>Customer update</Node>
  </Row>,
  // 07 Invoice & Service Follow-Up
  <Row key="7">
    <Node delay={0}>Invoice</Node><Link />
    <Node delay={1.2}>Order closed</Node><Link />
    <Node delay={2.4}>Service history</Node>
  </Row>,
];

const steps = workflow.steps.map((s, i) => ({ ...s, visual: visuals[i] }));

export const Workflow: React.FC = () => (
  <>
    <style>{css}</style>
    <IndustryWorkflow id="manufacturing-workflow" title={workflow.title} intro={workflow.intro} steps={steps} />
  </>
);

export default Workflow;
