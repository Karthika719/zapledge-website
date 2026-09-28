"use client";

import React from 'react';

/* Conceptual visuals for the FinTech bottleneck section.
   Each shows Business data → AI / Automation → Insight → Action.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['Financial data', 'AI / Automation', 'Risk check', 'Action'];
const D = 8; // seconds per loop

const css = `
@keyframes fin-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes fin-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes fin-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes fin-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.fin-chip { animation: fin-chip ${D}s linear infinite; }
.fin-row  { animation: fin-row ${D}s linear infinite; }
.fin-in   { animation: fin-in ${D}s ease-out infinite both; }
.fin-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: fin-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .fin-chip, .fin-row, .fin-in, .fin-fill { animation:none !important; }
  .fin-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
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

    {/* Financial data → AI / Automation → Risk check → Action */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="fin-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
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
      className={`fin-fill h-full rounded-full ${tone}`}
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

/* 01 — Digital Onboarding Assistant */
const OnboardingDropOff: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { name: 'ID Document OCR', status: 'Verified', tone: 'ok' as const, from: 0.3, to: 0.95 },
      { name: 'Facial Liveness Check', status: 'Passed', tone: 'ok' as const, from: 0.4, to: 0.9 },
      { name: 'Proof of Address', status: 'Assisted', tone: 'info' as const, from: 0.2, to: 0.8 },
    ].map((l, i) => (
      <div key={l.name} className="fin-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#00003C]">{l.name}</span>
          <Pill tone={l.tone}>{l.status}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">Verification status</p>
        <Bar from={l.from} to={l.to} />
      </div>
    ))}
    <div className="fin-in rounded-xl border border-[#0033FF]/20 bg-[#F3F5FF] px-3 py-2.5" style={d(1.4)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-[#00003C]">AI Onboarding Assistant</span>
        <span className="text-[10px] font-semibold text-[#0033FF]">Active</span>
      </div>
      <p className="text-[11px] text-[#45455A]">
        “Utility bill recognized — address match confirmed with zero manual review needed.”
      </p>
    </div>
  </div>
);

/* 02 — Compliance Reporting & NL Search */
const ComplianceReporting: React.FC = () => (
  <div>
    <div className="flex justify-end mb-3">
      <p className="fin-in max-w-[90%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[13px] font-medium px-3.5 py-2.5">
        Summarize quarterly SAR filings & high-risk alerts
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2 mb-3">
      {[
        { report: 'AML / SAR Quarterly Package', status: 'Auto-compiled', tone: 'ok' as const },
        { report: 'Sanction Screening Trail', status: 'Zero false-negatives', tone: 'ok' as const },
        { report: 'Regulator Evidence Log', status: 'Export ready', tone: 'info' as const },
      ].map((r, i) => (
        <div
          key={r.report}
          className="fin-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
          style={d(0.8 + i * 0.6)}
        >
          <span className="text-xs font-bold text-[#00003C]">{r.report}</span>
          <Pill tone={r.tone}>{r.status}</Pill>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap gap-2">
      {['Natural-language search', 'Automated report builder', 'Audit trail export'].map((t, i) => (
        <span
          key={t}
          className="fin-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* 03 — Reconciliation Exception Queue */
const ReconciliationExceptions: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-[#00003C]">Auto-reconciled volume</span>
        <span className="text-[11px] font-semibold text-emerald-600">99.4% cleared</span>
      </div>
      <Bar from={0.7} to={0.99} tone="bg-emerald-500" />
    </div>
    <div className="space-y-2">
      {[
        { id: 'MIS-402', desc: 'Gateway mismatch · $1,420', sla: '2h SLA', tone: 'warn' as const },
        { id: 'TIM-118', desc: 'Timing difference · $850', sla: 'Auto-cleared', tone: 'ok' as const },
        { id: 'FEE-089', desc: 'Fee variance · merchant #883', sla: 'Assigned Ops', tone: 'info' as const },
      ].map((e, i) => (
        <div
          key={e.id}
          className="fin-row flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(1.5 + i * 1.5)}
        >
          <span className="text-xs font-mono font-bold text-[#0033FF] shrink-0">{e.id}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#00003C] truncate">{e.desc}</p>
          </div>
          <Pill tone={e.tone}>{e.sla}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 04 — Transaction Anomaly & Fraud Copilot */
const FraudCopilot: React.FC = () => (
  <div>
    <div className="flex justify-end mb-3">
      <p className="fin-in max-w-[85%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[13px] font-medium px-3.5 py-2.5">
        Why is transaction #TX-9021 flagged?
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      <div className="fin-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2" style={d(0.6)}>
        <span className="text-xs font-bold text-[#00003C]">Anomaly Score</span>
        <span className="text-xs font-bold text-red-600">94 / 100 · High Risk</span>
      </div>
      <div className="fin-in p-2.5 rounded-lg bg-white border border-[#E5E5E5]" style={d(1.2)}>
        <p className="text-[11px] text-[#45455A] leading-relaxed">
          <strong className="text-[#00003C]">Pattern:</strong> Rapid velocity spike — 4 transfers totaling $38,000 to new offshore beneficiary within 90 seconds.
        </p>
      </div>
      <div className="fin-in flex items-center justify-between rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5" style={d(1.8)}>
        <span className="text-[11px] font-semibold text-amber-800">Recommendation</span>
        <span className="text-[11px] font-bold text-amber-900">Hold for Maker-Checker</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {['Anomaly detection', 'Fraud investigation copilot', 'Maker-checker hold'].map((t, i) => (
        <span
          key={t}
          className="fin-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const TITLES = [
  'Digital onboarding',
  'Compliance automation',
  'Automated reconciliation',
  'Transaction anomaly copilot',
];
const BODIES = [OnboardingDropOff, ComplianceReporting, ReconciliationExceptions, FraudCopilot];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
