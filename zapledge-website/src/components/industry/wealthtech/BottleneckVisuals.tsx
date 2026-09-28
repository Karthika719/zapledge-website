"use client";

import React from 'react';

/* Conceptual visuals for the WealthTech bottleneck section.
   Each shows Advisor context → AI / Automation → Action item → Client outcome.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['Advisor context', 'AI / Automation', 'Action item', 'Advisor call'];
const D = 8; // seconds per loop

const css = `
@keyframes wt-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes wt-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes wt-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes wt-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.wt-chip { animation: wt-chip ${D}s linear infinite; }
.wt-row  { animation: wt-row ${D}s linear infinite; }
.wt-in   { animation: wt-in ${D}s ease-out infinite both; }
.wt-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: wt-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .wt-chip, .wt-row, .wt-in, .wt-fill { animation:none !important; }
  .wt-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
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

    {/* Advisor context → AI / Automation → Action item → Advisor call */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="wt-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
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
      className={`wt-fill h-full rounded-full ${tone}`}
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

/* 01 — Admin Automation & Review Reminders */
const AdminTaskAutomation: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { title: 'Annual Portfolio Review · Sterling Trust', meta: 'Scheduled automatically', tone: 'ok' as const, from: 0.3, to: 0.9 },
      { title: 'Cash Rebalance Follow-Up · Dr. Thorne', meta: 'Task created post-meeting', tone: 'info' as const, from: 0.2, to: 0.8 },
      { title: 'Beneficiary Mandate Renewal', meta: 'Triggered 30 days prior', tone: 'warn' as const, from: 0.4, to: 0.6 },
    ].map((item, i) => (
      <div key={item.title} className="wt-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#00003C] truncate max-w-[210px] sm:max-w-none">{item.title}</span>
          <Pill tone={item.tone}>{item.meta}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">Follow-up execution</p>
        <Bar from={item.from} to={item.to} />
      </div>
    ))}
    <div className="wt-in rounded-xl border border-[#0033FF]/20 bg-[#F3F5FF] px-3 py-2" style={d(1.4)}>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-bold text-[#00003C]">Zero missed client touchpoints</span>
        <span className="text-emerald-700 font-bold">✓ 100% tracked</span>
      </div>
    </div>
  </div>
);

/* 02 — Meeting-Note Summarization & Extraction */
const MeetingNotesExtraction: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-3 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Meeting: Katherine Howard · 42 mins</span>
        <span className="text-[10px] font-mono text-[#0033FF] font-semibold">AI Processed</span>
      </div>
      <p className="text-[11px] text-[#45455A] leading-relaxed">
        “Discussed tax-efficient rebalancing before year-end, expanding 529 education fund, and reviewed conservative bond laddering.”
      </p>
    </div>
    <div className="space-y-2">
      {[
        { act: 'Run 529 plan projection comparison', assign: 'Task queued for advisor review', tone: 'ok' as const },
        { act: 'Draft tax-loss harvest schedule', assign: 'Proposal draft ready', tone: 'info' as const },
        { act: 'Update client risk profile notes', assign: 'Synced to CRM', tone: 'ok' as const },
      ].map((a, i) => (
        <div
          key={a.act}
          className="wt-row flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
          style={d(1.0 + i * 1.0)}
        >
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-bold text-[#00003C] truncate">{a.act}</p>
            <p className="text-[10px] text-[#666666]">{a.assign}</p>
          </div>
          <Pill tone={a.tone}>{a.tone === 'ok' ? 'Tracked' : 'Draft'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 03 — Advisor Copilot Prep Before Calls */
const AdvisorCopilot: React.FC = () => (
  <div>
    <div className="flex justify-end mb-2.5">
      <p className="wt-in max-w-[88%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[12px] font-medium px-3.5 py-2">
        Pull client &amp; portfolio briefing for Dr. Thorne before our 2 PM call
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      <div className="wt-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-1.5" style={d(0.6)}>
        <span className="text-xs font-bold text-[#00003C]">Total Portfolio</span>
        <span className="text-xs font-bold text-emerald-700">$4.20M · +9.4% YTD</span>
      </div>
      <div className="wt-in p-2.5 rounded-lg bg-white border border-[#E5E5E5]" style={d(1.2)}>
        <p className="text-[11px] text-[#45455A] leading-relaxed">
          <strong className="text-[#00003C]">Key Context:</strong> Sold dental clinic last month · $650K cash surplus ready for yield deployment. Granddaughter started college.
        </p>
      </div>
      <div className="wt-in flex items-center justify-between rounded-lg bg-[#F3F5FF] border border-[#0033FF]/20 px-3 py-1.5" style={d(1.8)}>
        <span className="text-[11px] font-semibold text-[#0033FF]">Prep time saved</span>
        <span className="text-[11px] font-bold text-[#00003C]">Shrunk from 60m → 4m</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {['Approved internal data', 'Advisor briefing card', 'Zero hallucination'].map((t, i) => (
        <span
          key={t}
          className="wt-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* 04 — Compliance & Disclosure Tracking */
const ComplianceDisclosures: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-2.5 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Compliance attestation coverage</span>
        <span className="text-[11px] font-semibold text-emerald-600">100% on schedule</span>
      </div>
      <Bar from={0.65} to={0.98} tone="bg-emerald-500" />
    </div>
    <ol className="relative space-y-2 list-none p-0 m-0">
      <span className="absolute left-[19px] top-6 bottom-6 w-px bg-[#0033FF]/20" />
      {[
        { item: 'Form ADV Delivery & Acknowledgment', tag: 'Archived', tone: 'ok' as const },
        { item: 'Suitability Review Checkpoint', tag: 'Verified', tone: 'ok' as const },
        { item: 'Complex Product Disclosure', tag: 'Signed', tone: 'ok' as const },
      ].map((dItem, i) => (
        <li
          key={dItem.item}
          className="wt-row relative flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(i * 1.5)}
        >
          <span className="relative z-10 w-2.5 h-2.5 rounded-full border-2 border-[#0033FF] bg-white shrink-0" />
          <span className="flex-1 text-xs font-semibold text-[#00003C] truncate">{dItem.item}</span>
          <Pill tone={dItem.tone}>{dItem.tag}</Pill>
        </li>
      ))}
    </ol>
  </div>
);

const TITLES = [
  'Task automation & reminders',
  'Meeting note intelligence',
  'Advisor prep copilot',
  'Disclosure & suitability trail',
];
const BODIES = [AdminTaskAutomation, MeetingNotesExtraction, AdvisorCopilot, ComplianceDisclosures];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
