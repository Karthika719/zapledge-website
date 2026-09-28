"use client";

import React from 'react';

/* Conceptual visuals for the HealthTech bottleneck section.
   Each shows Patient/Clinical context → AI / Automation → Action item → Care support.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['Health records', 'AI / Automation', 'Queue routing', 'Care support'];
const D = 8; // seconds per loop

const css = `
@keyframes ht-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes ht-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes ht-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes ht-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.ht-chip { animation: ht-chip ${D}s linear infinite; }
.ht-row  { animation: ht-row ${D}s linear infinite; }
.ht-in   { animation: ht-in ${D}s ease-out infinite both; }
.ht-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: ht-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .ht-chip, .ht-row, .ht-in, .ht-fill { animation:none !important; }
  .ht-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
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

    {/* Health records → AI / Automation → Queue routing → Care support */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="ht-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
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
      className={`ht-fill h-full rounded-full ${tone}`}
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

/* 01 — Referral Tracking & Reminders */
const ReferralReminders: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { name: 'Cardiology Referral · Dr. Mercer', status: 'Booked', tone: 'ok' as const, from: 0.3, to: 0.95 },
      { name: 'Physical Therapy Follow-Up', status: 'Reminder sent', tone: 'info' as const, from: 0.4, to: 0.8 },
      { name: 'MRI Pre-Authorization Check', status: 'Auth verified', tone: 'ok' as const, from: 0.2, to: 0.9 },
    ].map((l, i) => (
      <div key={l.name} className="ht-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#00003C]">{l.name}</span>
          <Pill tone={l.tone}>{l.status}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">Referral sequence progress</p>
        <Bar from={l.from} to={l.to} />
      </div>
    ))}
    <div className="ht-in rounded-xl border border-[#0033FF]/20 bg-[#F3F5FF] px-3 py-2.5" style={d(1.4)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-[#00003C]">Zero Lost Referrals</span>
        <span className="text-[10px] font-semibold text-emerald-700">✓ Automated follow-up</span>
      </div>
      <p className="text-[11px] text-[#45455A]">
        Patient confirmations triggered automatically; no referrals dropped between departments.
      </p>
    </div>
  </div>
);

/* 02 — Document Summarization & Admin Copilot */
const DocumentAdminCopilot: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-3 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Intake Packet · Patient #PT-4091</span>
        <span className="text-[10px] font-mono text-[#0033FF] font-semibold">Processed</span>
      </div>
      <p className="text-[11px] text-[#45455A] leading-relaxed">
        “8-page specialist intake form parsed: Demographics, insurance card OCR, and routine allergy history populated into structured records.”
      </p>
    </div>
    <div className="space-y-2">
      {[
        { task: 'Insurance eligibility verified', meta: 'Real-time 270/271 check', tone: 'ok' as const },
        { task: 'Routine phone triage summary', meta: 'Draft note for nurse review', tone: 'info' as const },
        { task: 'Administrative paperwork', meta: '65% manual time eliminated', tone: 'ok' as const },
      ].map((item, i) => (
        <div
          key={item.task}
          className="ht-row flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
          style={d(1.0 + i * 1.0)}
        >
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-bold text-[#00003C] truncate">{item.task}</p>
            <p className="text-[10px] text-[#666666]">{item.meta}</p>
          </div>
          <Pill tone={item.tone}>{item.tone === 'ok' ? 'Automated' : 'Draft'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 03 — Claims Exception Routing & Billing */
const ClaimsExceptionRouting: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-2.5 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Clean claims pass rate</span>
        <span className="text-[11px] font-semibold text-emerald-600">97.8% auto-cleared</span>
      </div>
      <Bar from={0.7} to={0.98} tone="bg-emerald-500" />
    </div>
    <div className="space-y-2">
      {[
        { id: 'CLM-841', desc: 'Missing referral authorization', sla: 'Assigned: Billing Team A', tone: 'warn' as const },
        { id: 'CLM-838', desc: 'Subscriber ID format mismatch', sla: 'Auto-corrected & resubmitted', tone: 'ok' as const },
        { id: 'CLM-829', desc: 'Secondary payer coordination', sla: 'Queued: Revenue Specialist', tone: 'info' as const },
      ].map((claim, i) => (
        <div
          key={claim.id}
          className="ht-row flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(1.5 + i * 1.5)}
        >
          <span className="text-xs font-mono font-bold text-[#0033FF] shrink-0">{claim.id}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#00003C] truncate">{claim.desc}</p>
            <p className="text-[10px] text-[#666666]">{claim.sla}</p>
          </div>
          <Pill tone={claim.tone}>{claim.tone === 'ok' ? 'Resolved' : 'In Queue'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 04 — Authorized Natural-Language Records Search */
const NaturalLanguageRecordsSearch: React.FC = () => (
  <div>
    <div className="flex justify-end mb-2.5">
      <p className="ht-in max-w-[88%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[12px] font-medium px-3.5 py-2">
        Find cardiology consult notes and last lipid panel for patient #PT-8421
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      <div className="ht-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-1.5" style={d(0.6)}>
        <span className="text-xs font-bold text-[#00003C]">Search Response Time</span>
        <span className="text-xs font-bold text-emerald-700">0.38s · Authorized match</span>
      </div>
      <div className="ht-in p-2.5 rounded-lg bg-white border border-[#E5E5E5]" style={d(1.2)}>
        <p className="text-[11px] text-[#45455A] leading-relaxed">
          <strong className="text-[#00003C]">Cardiology Outpatient Summary (June 2026):</strong> Stable sinus rhythm, continued atorvastatin 20mg. LabCorp panel (Aug 2026): LDL 82 mg/dL.
        </p>
      </div>
      <div className="ht-in flex items-center justify-between rounded-lg bg-[#F3F5FF] border border-[#0033FF]/20 px-3 py-1.5" style={d(1.8)}>
        <span className="text-[11px] font-semibold text-[#0033FF]">Role access verified</span>
        <span className="text-[11px] font-bold text-[#00003C]">Access logged for audit</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {['Authorized access only', 'HIPAA-aligned records search', 'Zero clinical diagnosis'].map((t, i) => (
        <span
          key={t}
          className="ht-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const TITLES = [
  'Referral & appointment routing',
  'Administrative paperwork copilot',
  'Claims exception routing',
  'Authorized records search',
];
const BODIES = [ReferralReminders, DocumentAdminCopilot, ClaimsExceptionRouting, NaturalLanguageRecordsSearch];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
