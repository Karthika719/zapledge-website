"use client";

import React from 'react';

/* Conceptual visuals for the Retail Tech bottleneck section.
   Each shows POS & Online Feed → AI / Automation → Store Coordination → Unified Commerce.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['POS & Online Feed', 'AI / Automation', 'Store Coordination', 'Unified Commerce'];
const D = 8; // seconds per loop

const css = `
@keyframes rt-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes rt-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes rt-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes rt-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.rt-chip { animation: rt-chip ${D}s linear infinite; }
.rt-row  { animation: rt-row ${D}s linear infinite; }
.rt-in   { animation: rt-in ${D}s ease-out infinite both; }
.rt-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: rt-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .rt-chip, .rt-row, .rt-in, .rt-fill { animation:none !important; }
  .rt-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
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

    {/* POS & Online Feed → AI / Automation → Store Coordination → Unified Commerce */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="rt-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
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
      className={`rt-fill h-full rounded-full ${tone}`}
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

/* 01 — Replenishment Alerts & Stock Transfer Suggestions */
const ReplenishmentTransfers: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { name: 'Heritage Knitwear · Navy / L', status: 'Reorder triggered · 18 units', tone: 'ok' as const, from: 0.2, to: 0.95 },
      { name: 'Artisan Denim · Slim Fit 32', status: 'Transfer suggested · Soho → Uptown', tone: 'info' as const, from: 0.3, to: 0.85 },
      { name: 'Canvas Weekend Duffel · Olive', status: 'Demand spike forecast (+40%)', tone: 'warn' as const, from: 0.4, to: 0.9 },
    ].map((l, i) => (
      <div key={l.name} className="rt-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-bold text-[#00003C] truncate pr-2">{l.name}</span>
          <Pill tone={l.tone}>{l.status.split('·')[0].trim()}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">{l.status}</p>
        <Bar from={l.from} to={l.to} />
      </div>
    ))}
    <div className="rt-in rounded-xl border border-[#0033FF]/20 bg-[#F3F5FF] px-3 py-2.5" style={d(1.4)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-[#00003C]">Zero Stock-Out Guesswork</span>
        <span className="text-[10px] font-semibold text-emerald-700">✓ Pattern-backed replenishing</span>
      </div>
      <p className="text-[11px] text-[#45455A]">
        Automated alerts suggest transfers and order quantities before shelves empty or capital gets locked in excess inventory.
      </p>
    </div>
  </div>
);

/* 02 — Unified Omnichannel Order Management */
const OmnichannelOrderSync: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-2.5 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Cross-channel inventory synchronization</span>
        <span className="text-[11px] font-semibold text-emerald-600">99.8% accurate stock count</span>
      </div>
      <Bar from={0.65} to={0.99} tone="bg-emerald-500" />
    </div>
    <div className="space-y-2">
      {[
        { id: 'ORD-8412', desc: 'Online Order · Fulfill from Store #1 (BOPIS Pickup)', sla: 'Packed & ready in 15 mins', tone: 'ok' as const },
        { id: 'POS-7391', desc: 'In-Store Checkout · Register #2 (Westside)', sla: 'Web stock deducted instantly', tone: 'ok' as const },
        { id: 'RET-2019', desc: 'Cross-Store Return · Online purchase returned in-store', sla: 'Auto-credited to customer card', tone: 'info' as const },
      ].map((order, i) => (
        <div
          key={order.id}
          className="rt-row flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(1.5 + i * 1.5)}
        >
          <span className="text-xs font-mono font-bold text-[#0033FF] shrink-0">{order.id}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#00003C] truncate">{order.desc}</p>
            <p className="text-[10px] text-[#666666]">{order.sla}</p>
          </div>
          <Pill tone={order.tone}>{order.tone === 'ok' ? 'Synced' : 'Processed'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 03 — Customer Support Copilot & Product Discovery */
const CustomerSupportCopilot: React.FC = () => (
  <div>
    <div className="flex justify-end mb-2.5">
      <p className="rt-in max-w-[88%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[12px] font-medium px-3.5 py-2">
        Is the Organic Cotton Trench Coat available in Tan (Size S) at the Downtown store?
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      <div className="rt-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-1.5" style={d(0.6)}>
        <span className="text-xs font-bold text-[#00003C]">Retail Support Copilot</span>
        <span className="text-xs font-bold text-emerald-700">Instant real-time lookup</span>
      </div>
      <div className="rt-in p-2.5 rounded-lg bg-white border border-[#E5E5E5]" style={d(1.2)}>
        <p className="text-[11px] text-[#45455A] leading-relaxed">
          <strong className="text-[#00003C]">Assistant:</strong> “Yes! 2 in stock at Downtown (Rack 4B). Would you like to reserve one for in-store pickup today, or deliver to your address by tomorrow?”
        </p>
      </div>
      <div className="rt-in flex items-center justify-between rounded-lg bg-[#F3F5FF] border border-[#0033FF]/20 px-3 py-1.5" style={d(1.8)}>
        <span className="text-[11px] font-semibold text-[#0033FF]">Routine inquiries automated</span>
        <span className="text-[11px] font-bold text-[#00003C]">Staff freed for high-touch service</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {['Order status lookup', 'Live store stock check', 'Zero manual ticket backlog'].map((t, i) => (
        <span
          key={t}
          className="rt-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* 04 — Natural-Language Sales & Promotion Analytics */
const NaturalLanguageRetailAnalytics: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-3 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Query: “Top 3 sell-through items and promo margins last weekend”</span>
        <span className="text-[10px] font-mono text-[#0033FF] font-semibold">Instant Query</span>
      </div>
      <p className="text-[11px] text-[#45455A] leading-relaxed">
        “1. Cashmere Crew (+42% sell-through), 2. Silk Scarves (+34% attached to loyalty bundle), 3. Canvas Tote (+28%). Promo margin held steady at 62.4% across channels.”
      </p>
    </div>
    <div className="space-y-2">
      {[
        { task: 'Cross-channel sales consolidation', meta: 'POS register + Shopify order records unified', tone: 'ok' as const },
        { task: 'Promotion effectiveness audit', meta: 'Weekend loyalty code drove 68% repeat shoppers', tone: 'ok' as const },
        { task: 'Three-system spreadsheet export eliminated', meta: 'Saved manager 4 hours of weekly reporting', tone: 'info' as const },
      ].map((item, i) => (
        <div
          key={item.task}
          className="rt-row flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
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

const TITLES = [
  'Replenishment alerts & stock transfers',
  'Unified omnichannel order sync',
  'Support copilot & product discovery',
  'Natural-language retail analytics',
];
const BODIES = [ReplenishmentTransfers, OmnichannelOrderSync, CustomerSupportCopilot, NaturalLanguageRetailAnalytics];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
