import React from 'react';
import { IndustryWorkflow } from '@/components/industry/IndustryWorkflow';
import { workflow } from '@/content/industries/wealthtech';

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
  // 01 Prospect & Onboarding
  <Row key="1">
    <Node delay={0}>Prospect intake</Node>
    <Link />
    <Node delay={1.2}>Digital questionnaire</Node>
    <Link />
    <Node delay={2.4}>Structured onboarding</Node>
  </Row>,

  // 02 Identity & Suitability
  <div key="2" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Identity verification</Node>
      <Link />
      <Node delay={1.2}>Suitability capture</Node>
    </div>
    <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700">
      <span aria-hidden="true">✓</span> Logged for compliance audit
    </div>
  </div>,

  // 03 Account & Portfolio Setup
  <div key="3" className="min-h-[76px] flex flex-col justify-center gap-2.5">
    <div className="flex items-center justify-between text-[11px] text-[#666666] mb-0.5">
      <span>Account configuration</span>
      <span className="text-[#0033FF] font-semibold">Goal-based</span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Portfolio model</Node>
      <Link />
      <Node delay={1.8}>Client mandate mapped</Node>
    </div>
  </div>,

  // 04 Advisor Service & Meetings
  <div key="4" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#00003C]">Meeting intelligence</span>
      <span className="text-[10px] font-bold rounded-full bg-[#0033FF]/10 text-[#0033FF] px-2 py-0.5">
        Copilot active
      </span>
    </div>
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Node delay={0}>Client conversation</Node>
      <Link />
      <Node delay={1.5}>Follow-ups extracted</Node>
    </div>
  </div>,

  // 05 Review Cycle
  <div key="5" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-[#00003C]">Scheduled review cadence</span>
      <span className="text-emerald-700 font-bold">Auto-reminders active</span>
    </div>
    <Bar to={0.88} />
    <span className="text-[11px] text-[#666666]">Reviews queued on schedule without manual tracking</span>
  </div>,

  // 06 Reporting & Communication
  <Row key="6">
    <Node delay={0}>Report drafted</Node>
    <Link />
    <Node delay={1.2}>Advisor approved</Node>
    <Link />
    <Node delay={2.4}>Delivered to client</Node>
  </Row>,

  // 07 Ongoing Monitoring
  <div key="7" className="min-h-[76px] flex flex-col justify-center gap-2">
    <div className="flex items-center justify-between text-[11px]">
      <span className="font-semibold text-[#00003C]">Continuous monitoring</span>
      <span className="text-amber-700 font-bold">Signal flagged</span>
    </div>
    <Bar to={0.95} />
    <span className="text-[11px] text-[#666666]">Alert surfaced for advisor review · No automated changes</span>
  </div>,
];

const steps = workflow.steps.map((s, i) => ({ ...s, visual: visuals[i] }));

export const Workflow: React.FC = () => (
  <>
    <style>{css}</style>
    <IndustryWorkflow
      id="wealthtech-workflow"
      title={workflow.title}
      intro={workflow.intro}
      steps={steps}
    />
  </>
);

export default Workflow;
