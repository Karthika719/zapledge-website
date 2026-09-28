import React from 'react';
import { IndustryWorkflow } from '@/components/industry/IndustryWorkflow';
import { workflow } from '@/content/industries/edtech';

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
  // 01 Lead & Counselling
  <Row key="1">
    <Node delay={0}>Enquiry in CRM</Node>
    <Link />
    <Node delay={1.2}>Counsellor assigned</Node>
    <Link />
    <Node delay={2.4}>Follow-up queued</Node>
  </Row>,

  // 02 Admission & Batch Allocation
  <div key="2" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Admission confirmed</Node>
      <Link />
      <Node delay={1.2}>Batch &amp; seat allocated</Node>
    </div>
    <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700">
      <span aria-hidden="true">✓</span> Timetable &amp; welcome sent automatically
    </div>
  </div>,

  // 03 Learning Delivery
  <div key="3" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-between text-[11px] text-[#666666] mb-0.5">
      <span>Classes, syllabus &amp; assignments</span>
      <span className="text-[#0033FF] font-semibold">Active</span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>LMS delivery</Node>
      <Link />
      <Node delay={1.8}>Attendance auto-captured</Node>
    </div>
  </div>,

  // 04 Attendance & Assessments
  <div key="4" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#00003C]">Unified learning feed</span>
      <span className="text-[10px] font-bold rounded-full bg-[#0033FF]/10 text-[#0033FF] px-2 py-0.5">
        Synced
      </span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Attendance records</Node>
      <Link />
      <Node delay={1.5}>Test scores linked</Node>
    </div>
  </div>,

  // 05 Performance Analysis
  <div key="5" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-[#00003C]">Learner insights</span>
      <span className="text-emerald-700 font-bold">Concept gaps flagged</span>
    </div>
    <Bar to={0.88} />
    <span className="text-[11px] text-[#666666]">Actionable starting point prepared for faculty review</span>
  </div>,

  // 06 Intervention
  <Row key="6">
    <Node delay={0}>At-risk trigger</Node>
    <Link />
    <Node delay={1.2}>Counsellor task</Node>
    <Link />
    <Node delay={2.4}>Proactive mentor call</Node>
  </Row>,

  // 07 Renewal & Completion
  <div key="7" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-[#00003C]">Course completion &amp; renewal</span>
      <span className="text-emerald-700 font-bold">Data-backed</span>
    </div>
    <Bar to={0.96} />
    <span className="text-[11px] text-[#666666]">Conversations backed by verified attendance and test data</span>
  </div>,
];

const steps = workflow.steps.map((s, i) => ({ ...s, visual: visuals[i] }));

export const Workflow: React.FC = () => (
  <>
    <style>{css}</style>
    <IndustryWorkflow
      id="edtech-workflow"
      title={workflow.title}
      intro={workflow.intro}
      steps={steps}
    />
  </>
);

export default Workflow;
