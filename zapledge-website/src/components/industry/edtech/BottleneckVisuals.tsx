"use client";

import React from 'react';

/* Conceptual visuals for the EdTech bottleneck section.
   Each shows Enquiry/Student context → AI / Automation → Faculty Review → Learning Success.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['Enquiry & Student', 'AI / Automation', 'Faculty Review', 'Learning Success'];
const D = 8; // seconds per loop

const css = `
@keyframes et-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes et-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes et-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes et-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.et-chip { animation: et-chip ${D}s linear infinite; }
.et-row  { animation: et-row ${D}s linear infinite; }
.et-in   { animation: et-in ${D}s ease-out infinite both; }
.et-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: et-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .et-chip, .et-row, .et-in, .et-fill { animation:none !important; }
  .et-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
}
`;

const d = (s: number) => ({ animationDelay: `${s}s` });

const Frame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div
    className="w-full rounded-3xl bg-white border border-[#E5E5E5] p-5 sm:p-6 shadow-lg relative overflow-hidden"
    role="img"
    aria-label={`Concept visual: ${title}`}
  >
    <style>{css}</style>
    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0033FF] to-[#00003C]" />
    <div className="flex items-center justify-between mb-4">
      <span className="text-[11px] font-bold tracking-wider uppercase text-[#00003C]">{title}</span>
      <span className="text-[11px] font-semibold text-[#0033FF]">Concept view</span>
    </div>

    {/* Enquiry & Student → AI / Automation → Faculty Review → Learning Success */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="et-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
            style={d(i * 2)}
          >
            {f}
          </span>
          {i < FLOW.length - 1 && <span className="hidden sm:inline text-[#0033FF]/50 text-[11px]">›</span>}
        </React.Fragment>
      ))}
    </div>

    <div aria-hidden="true" className="min-h-[250px]">{children}</div>
  </div>
);

const Bar: React.FC<{ from: number; to: number; tone?: string }> = ({ from, to, tone = 'bg-[#0033FF]' }) => (
  <div className="h-1.5 w-full rounded-full bg-[#0033FF]/10 overflow-hidden">
    <div
      className={`et-fill h-full rounded-full ${tone}`}
      style={{ ['--from' as string]: from, ['--to' as string]: to } as React.CSSProperties}
    />
  </div>
);

const Pill: React.FC<{ tone: 'ok' | 'warn' | 'info'; children: React.ReactNode }> = ({ tone, children }) => (
  <span
    className={`text-[10px] font-bold rounded-full px-2 py-0.5 whitespace-nowrap ${
      tone === 'ok'
        ? 'bg-emerald-50 text-emerald-700'
        : tone === 'warn'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-[#0033FF]/10 text-[#0033FF]'
    }`}
  >
    {children}
  </span>
);

/* 01 — Lead Follow-Up & Counsellor Copilot */
const LeadCounsellorFollowup: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { name: 'Rohan K. · Foundation Batch', status: 'Follow-up scheduled', tone: 'ok' as const, from: 0.3, to: 0.95 },
      { name: 'Ananya S. · NEET Intensive', status: 'Brochure delivered', tone: 'info' as const, from: 0.4, to: 0.8 },
      { name: 'Kavya M. · Grade 10 Olympiad', status: 'Counsellor queued', tone: 'ok' as const, from: 0.2, to: 0.9 },
    ].map((l, i) => (
      <div key={l.name} className="et-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#00003C]">{l.name}</span>
          <Pill tone={l.tone}>{l.status}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">Enquiry progression score</p>
        <Bar from={l.from} to={l.to} />
      </div>
    ))}
    <div className="et-in rounded-xl border border-[#0033FF]/20 bg-[#F3F5FF] px-3 py-2.5" style={d(1.4)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-[#00003C]">Zero Cold Leads</span>
        <span className="text-[10px] font-semibold text-emerald-700">✓ On-schedule routing</span>
      </div>
      <p className="text-[11px] text-[#45455A]">
        Automated follow-up reminders trigger with student context; no lead forgotten on a sticky note.
      </p>
    </div>
  </div>
);

/* 02 — Parent Updates & Session Recaps */
const ParentUpdatesRecap: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-3 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Session Recap · Calculus Batch B</span>
        <span className="text-[10px] font-mono text-[#0033FF] font-semibold">Teacher Reviewed</span>
      </div>
      <p className="text-[11px] text-[#45455A] leading-relaxed">
        “Aarav completed today&apos;s problem set (8/10 accuracy on differentiation). Faculty note: Chain rule review practice generated for home study.”
      </p>
    </div>
    <div className="space-y-2">
      {[
        { task: 'Two-line faculty note parsed', meta: 'Converted to structured parent update', tone: 'ok' as const },
        { task: 'Faculty verification check', meta: 'Approved in 1-click before sending', tone: 'info' as const },
        { task: 'Delivered via Parent Portal & WhatsApp', meta: '4.9★ Parent engagement rating', tone: 'ok' as const },
      ].map((item, i) => (
        <div
          key={item.task}
          className="et-row flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
          style={d(1.0 + i * 1.0)}
        >
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-bold text-[#00003C] truncate">{item.task}</p>
            <p className="text-[10px] text-[#666666]">{item.meta}</p>
          </div>
          <Pill tone={item.tone}>{item.tone === 'ok' ? 'Automated' : 'Verified'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 03 — At-Risk Learner Insights & Interventions */
const AtRiskStudentInsights: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-2.5 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Intervention detection rate</span>
        <span className="text-[11px] font-semibold text-emerald-600">Early flag 14 days before exams</span>
      </div>
      <Bar from={0.65} to={0.96} tone="bg-emerald-500" />
    </div>
    <div className="space-y-2">
      {[
        { id: 'STU-182', desc: 'Attendance drop below 75% (2 consecutive missed classes)', sla: 'Assigned: Counsellor Call', tone: 'warn' as const },
        { id: 'STU-176', desc: 'Physics kinematics score dip (-18%)', sla: 'Personalized practice set dispatched', tone: 'ok' as const },
        { id: 'STU-164', desc: 'Doubt escalation: Organic chemistry reaction mechanisms', sla: 'Queued: Mentor Q&A Slot', tone: 'info' as const },
      ].map((student, i) => (
        <div
          key={student.id}
          className="et-row flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(1.5 + i * 1.5)}
        >
          <span className="text-xs font-mono font-bold text-[#0033FF] shrink-0">{student.id}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#00003C] truncate">{student.desc}</p>
            <p className="text-[10px] text-[#666666]">{student.sla}</p>
          </div>
          <Pill tone={student.tone}>{student.tone === 'ok' ? 'Resolved' : 'Task Active'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 04 — Automated Fee Reminders & Receipts */
const AutomatedFeeCollection: React.FC = () => (
  <div>
    <div className="flex justify-end mb-2.5">
      <p className="et-in max-w-[88%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[12px] font-medium px-3.5 py-2">
        Quarterly installment reminder dispatched: Term 2 Fees · Batch IIT-2026
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      <div className="et-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-1.5" style={d(0.6)}>
        <span className="text-xs font-bold text-[#00003C]">Scheduled Invoicing</span>
        <span className="text-xs font-bold text-emerald-700">97.2% on-time fee collection</span>
      </div>
      <div className="et-in p-2.5 rounded-lg bg-white border border-[#E5E5E5]" style={d(1.2)}>
        <p className="text-[11px] text-[#45455A] leading-relaxed">
          <strong className="text-[#00003C]">Invoice #INV-2041:</strong> Auto-reminders sent via WhatsApp &amp; Email 5 days and 1 day prior. Instant digital tax receipt and portal credit upon settlement.
        </p>
      </div>
      <div className="et-in flex items-center justify-between rounded-lg bg-[#F3F5FF] border border-[#0033FF]/20 px-3 py-1.5" style={d(1.8)}>
        <span className="text-[11px] font-semibold text-[#0033FF]">Zero phone calls needed</span>
        <span className="text-[11px] font-bold text-[#00003C]">Reconciled to accounting ledger</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {['Scheduled reminders', 'Automated tax receipts', 'Zero manual phone chasing'].map((t, i) => (
        <span
          key={t}
          className="et-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const TITLES = [
  'Lead follow-up & counsellor copilot',
  'Parent updates & session recaps',
  'At-risk student insights',
  'Automated fee collection',
];
const BODIES = [LeadCounsellorFollowup, ParentUpdatesRecap, AtRiskStudentInsights, AutomatedFeeCollection];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
