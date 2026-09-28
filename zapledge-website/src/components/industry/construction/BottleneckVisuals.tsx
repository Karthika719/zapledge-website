"use client";

import React from 'react';

/* Conceptual visuals for the Construction Tech bottleneck section.
   Each shows Site Field Logs → AI / Automation → Project Office → Commercial Sync.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['Site Field Logs', 'AI / Automation', 'Project Office', 'Commercial Sync'];
const D = 8; // seconds per loop

const css = `
@keyframes ct-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes ct-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes ct-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes ct-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.ct-chip { animation: ct-chip ${D}s linear infinite; }
.ct-row  { animation: ct-row ${D}s linear infinite; }
.ct-in   { animation: ct-in ${D}s ease-out infinite both; }
.ct-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: ct-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .ct-chip, .ct-row, .ct-in, .ct-fill { animation:none !important; }
  .ct-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
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

    {/* Site Field Logs → AI / Automation → Project Office → Commercial Sync */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="ct-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
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
      className={`ct-fill h-full rounded-full ${tone}`}
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

/* 01 — Simple Daily Site Logs & AI Consolidation */
const SiteLogsConsolidation: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-3 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Daily Log · Sector 4 Tower B</span>
        <span className="text-[10px] font-mono text-[#0033FF] font-semibold">AI Consolidated</span>
      </div>
      <p className="text-[11px] text-[#45455A] leading-relaxed">
        “Foundation slab pour completed: 42 personnel on site, 3 batch trucks, 180m³ concrete placed. 6 geotagged inspection photos linked to QA file.”
      </p>
    </div>
    <div className="space-y-2">
      {[
        { task: 'Scattered WhatsApp updates eliminated', meta: 'Single consolidated briefing sent to PM at 17:30', tone: 'ok' as const },
        { task: 'Geotagged site photo capture', meta: 'Rebar placement verified before pour inspection', tone: 'info' as const },
        { task: 'Labour & plant hours synchronized', meta: 'Auto-posted to project costing ledger', tone: 'ok' as const },
      ].map((item, i) => (
        <div
          key={item.task}
          className="ct-row flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
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

/* 02 — Automated RFQ & Procurement Approval Routing */
const ProcurementApprovalRouting: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-2.5 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Procurement turnaround velocity</span>
        <span className="text-[11px] font-semibold text-emerald-600">88% Faster RFQ cycle</span>
      </div>
      <Bar from={0.4} to={0.94} tone="bg-emerald-500" />
    </div>
    <div className="space-y-2">
      {[
        { id: 'RFQ-509', desc: 'Structural Rebar Grade 60 (85 tonnes)', sla: 'Auto-routed: Approved by Commercial Lead', tone: 'ok' as const },
        { id: 'RFQ-502', desc: 'Ready-Mix Concrete C35/45 (240m³)', sla: '3-vendor comparison matrix compiled', tone: 'ok' as const },
        { id: 'RFQ-498', desc: 'Tower Crane Lease Extension (4 weeks)', sla: 'Threshold review: Pending Director signoff', tone: 'warn' as const },
      ].map((rfq, i) => (
        <div
          key={rfq.id}
          className="ct-row flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(1.5 + i * 1.5)}
        >
          <span className="text-xs font-mono font-bold text-[#0033FF] shrink-0">{rfq.id}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#00003C] truncate">{rfq.desc}</p>
            <p className="text-[10px] text-[#666666]">{rfq.sla}</p>
          </div>
          <Pill tone={rfq.tone}>{rfq.tone === 'ok' ? 'Approved' : 'In Review'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 03 — Subcontractor Variation Approval Trail */
const VariationApprovalTrail: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { name: 'VO #208 · HVAC Ducting Relocation L3', status: 'Digitally signed', tone: 'ok' as const, from: 0.5, to: 0.98 },
      { name: 'VO #204 · Foundation Soil Stabilization', status: 'QS cost assessment approved', tone: 'ok' as const, from: 0.4, to: 0.9 },
      { name: 'VO #199 · Glazing Specification Upgrade', status: 'Client PM review queued', tone: 'info' as const, from: 0.2, to: 0.75 },
    ].map((l, i) => (
      <div key={l.name} className="ct-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-bold text-[#00003C] truncate pr-2">{l.name}</span>
          <Pill tone={l.tone}>{l.status.split('·')[0].trim()}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">{l.status}</p>
        <Bar from={l.from} to={l.to} />
      </div>
    ))}
    <div className="ct-in rounded-xl border border-[#0033FF]/20 bg-[#F3F5FF] px-3 py-2.5" style={d(1.4)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-[#00003C]">Zero Disputed Variations</span>
        <span className="text-[10px] font-semibold text-emerald-700">✓ Immutable audit trail</span>
      </div>
      <p className="text-[11px] text-[#45455A]">
        Changes recorded and approved on site with photo evidence; zero surprise disputes at final account.
      </p>
    </div>
  </div>
);

/* 04 — Milestone Escalation & Progress Insights */
const MilestoneEscalationInsights: React.FC = () => (
  <div>
    <div className="flex justify-end mb-2.5">
      <p className="ct-in max-w-[88%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[12px] font-medium px-3.5 py-2">
        Precast concrete panel delivery delay detected (+36 hrs) · Sequence adjustment advised
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      <div className="ct-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-1.5" style={d(0.6)}>
        <span className="text-xs font-bold text-[#00003C]">Schedule Delay Escalation</span>
        <span className="text-xs font-bold text-emerald-700">Early flag 12 days prior</span>
      </div>
      <div className="ct-in p-2.5 rounded-lg bg-white border border-[#E5E5E5]" style={d(1.2)}>
        <p className="text-[11px] text-[#45455A] leading-relaxed">
          <strong className="text-[#00003C]">Insight &amp; Remediation:</strong> Electrical conduit rough-in auto-rescheduled forward; prevented 14-man subcontractor crew standing time.
        </p>
      </div>
      <div className="ct-in flex items-center justify-between rounded-lg bg-[#F3F5FF] border border-[#0033FF]/20 px-3 py-1.5" style={d(1.8)}>
        <span className="text-[11px] font-semibold text-[#0033FF]">Overdue task escalated</span>
        <span className="text-[11px] font-bold text-[#00003C]">Milestone critical path secured</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {['Overdue task alerts', 'Critical path protection', 'Zero surprise delays'].map((t, i) => (
        <span
          key={t}
          className="ct-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const TITLES = [
  'Daily site logs & report consolidation',
  'RFQ & procurement approval routing',
  'Variation approval trail',
  'Milestone escalation & progress insights',
];
const BODIES = [SiteLogsConsolidation, ProcurementApprovalRouting, VariationApprovalTrail, MilestoneEscalationInsights];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
