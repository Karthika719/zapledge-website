"use client";

import React from 'react';

/* Conceptual visuals for the Manufacturing bottleneck section.
   Each shows Business data → AI / Automation → Insight → Action.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['Business data', 'AI / Automation', 'Insight', 'Action'];
const D = 8; // seconds per loop

const css = `
@keyframes bn-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes bn-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes bn-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes bn-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.bn-chip { animation: bn-chip ${D}s linear infinite; }
.bn-row  { animation: bn-row ${D}s linear infinite; }
.bn-in   { animation: bn-in ${D}s ease-out infinite both; }
.bn-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: bn-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .bn-chip, .bn-row, .bn-in, .bn-fill { animation:none !important; }
  .bn-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
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

    {/* Business data → AI/Automation → Insight → Action */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="bn-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
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
      className={`bn-fill h-full rounded-full ${tone}`}
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

/* 01 — Production visibility */
const ProductionVisibility: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { name: 'Line A', status: 'Running', tone: 'ok' as const, from: 0.3, to: 0.8 },
      { name: 'Line B', status: 'Running', tone: 'ok' as const, from: 0.5, to: 0.9 },
      { name: 'Line C', status: 'Downtime', tone: 'warn' as const, from: 0.4, to: 0.4 },
    ].map((l, i) => (
      <div key={l.name} className="bn-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#00003C]">{l.name}</span>
          <Pill tone={l.tone}>{l.status}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">Production progress</p>
        <Bar from={l.from} to={l.to} tone={l.tone === 'warn' ? 'bg-amber-400' : 'bg-[#0033FF]'} />
      </div>
    ))}
    <div className="bn-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(1.6)}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] text-[#666666]">Material consumption</span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Real-time status
        </span>
      </div>
      <Bar from={0.15} to={0.6} />
    </div>
  </div>
);

/* 02 — Inventory & procurement */
const InventoryProcurement: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-[#00003C]">Stock level</span>
        <span className="text-[11px] text-[#666666]">Reorder threshold</span>
      </div>
      <div className="relative">
        <Bar from={0.85} to={0.2} />
        <span className="absolute -top-1 bottom-[-4px] w-px bg-amber-500" style={{ left: '35%' }} />
      </div>
      <div className="relative h-4 mt-1">
        <span className="absolute text-[10px] font-semibold text-amber-600 -translate-x-1/2" style={{ left: '35%' }}>
          ▲ threshold
        </span>
      </div>
    </div>
    <div className="space-y-2">
      {['Procurement trigger', 'Approval', 'Purchase order'].map((s, i) => (
        <div
          key={s}
          className="bn-row flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(2 + i * 2)}
        >
          <span className="w-6 h-6 rounded-full bg-[#0033FF]/10 text-[#0033FF] text-[11px] font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <span className="text-sm font-semibold text-[#00003C]">{s}</span>
        </div>
      ))}
    </div>
  </div>
);

/* 03 — Quality */
const Quality: React.FC = () => (
  <ol className="relative space-y-2 list-none p-0 m-0">
    <span className="absolute left-[19px] top-6 bottom-6 w-px bg-[#0033FF]/20" />
    {[
      { label: 'QC checkpoint', tag: 'Inspected', tone: 'info' as const },
      { label: 'Issue / non-conformance', tag: 'Logged', tone: 'warn' as const },
      { label: 'Action tracking', tag: 'Assigned', tone: 'info' as const },
      { label: 'Resolution', tag: 'Closed', tone: 'ok' as const },
    ].map((s, i) => (
      <li
        key={s.label}
        className="bn-row relative flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-3"
        style={d(i * 2)}
      >
        <span className="relative z-10 w-3 h-3 rounded-full border-2 border-[#0033FF] bg-white shrink-0" />
        <span className="flex-1 text-sm font-semibold text-[#00003C]">{s.label}</span>
        <Pill tone={s.tone}>{s.tag}</Pill>
      </li>
    ))}
  </ol>
);

/* 04 — AI production copilot */
const Copilot: React.FC = () => (
  <div>
    <div className="flex justify-end mb-3">
      <p className="bn-in max-w-[85%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[13px] font-medium px-3.5 py-2.5">
        Which orders are delayed and why?
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      {[
        { o: 'Order A', why: 'Material shortage', c: 'bg-amber-400' },
        { o: 'Order B', why: 'Machine downtime', c: 'bg-red-400' },
        { o: 'Order C', why: 'QC hold', c: 'bg-[#0033FF]' },
      ].map((r, i) => (
        <div
          key={r.o}
          className="bn-in flex items-center gap-3 rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
          style={d(0.8 + i * 0.8)}
        >
          <span className={`h-2 w-2 rounded-full ${r.c}`} />
          <span className="text-sm font-bold text-[#00003C]">{r.o}</span>
          <span className="ml-auto text-[13px] text-[#45455A]">{r.why}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {['Document AI', 'Demand forecasting', 'Predictive maintenance'].map((t, i) => (
        <span
          key={t}
          className="bn-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(3.2 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const TITLES = ['Production visibility', 'Inventory & procurement', 'Quality', 'AI production copilot'];
const BODIES = [ProductionVisibility, InventoryProcurement, Quality, Copilot];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
