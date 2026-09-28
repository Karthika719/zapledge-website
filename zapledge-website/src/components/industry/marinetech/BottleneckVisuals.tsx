"use client";

import React from 'react';

/* Conceptual visuals for the MarineTech bottleneck section.
   Each shows Vessel Telemetry → AI / Automation → Shore Coordination → Fleet Visibility.
   All motion is CSS; it is switched off under prefers-reduced-motion. */

const FLOW = ['Vessel Telemetry', 'AI / Automation', 'Shore Coordination', 'Fleet Visibility'];
const D = 8; // seconds per loop

const css = `
@keyframes mt-chip { 0%,22% { background:#0033FF; color:#fff; border-color:#0033FF; } 26%,100% { background:#fff; color:#00003C; border-color:#E5E5E5; } }
@keyframes mt-row { 0%,22% { background:rgba(0,51,255,.07); border-color:rgba(0,51,255,.3); } 26%,100% { background:#fff; border-color:#E5E5E5; } }
@keyframes mt-in { 0% { opacity:0; transform:translateY(6px); } 6%,95% { opacity:1; transform:none; } 100% { opacity:0; } }
@keyframes mt-fill { 0% { transform:scaleX(var(--from,.1)); } 70%,100% { transform:scaleX(var(--to,1)); } }
.mt-chip { animation: mt-chip ${D}s linear infinite; }
.mt-row  { animation: mt-row ${D}s linear infinite; }
.mt-in   { animation: mt-in ${D}s ease-out infinite both; }
.mt-fill { transform-origin:left; transform:scaleX(var(--to,1)); animation: mt-fill ${D}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .mt-chip, .mt-row, .mt-in, .mt-fill { animation:none !important; }
  .mt-chip:nth-child(1) { background:#0033FF; color:#fff; border-color:#0033FF; }
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

    {/* Vessel Telemetry → AI / Automation → Shore Coordination → Fleet Visibility */}
    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-1 mb-5" aria-hidden="true">
      {FLOW.map((f, i) => (
        <React.Fragment key={f}>
          <span
            className="mt-chip sm:flex-1 min-w-0 text-center truncate rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1 text-[10px] sm:text-[11px] font-semibold"
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
      className={`mt-fill h-full rounded-full ${tone}`}
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

/* 01 — Operational Dashboard & Voyage Summary Copilot */
const FleetSummaryCopilot: React.FC = () => (
  <div className="space-y-2.5">
    {[
      { name: 'MV Pacific Pioneer · Singapore → Rotterdam', status: 'On schedule · ETA Oct 14', tone: 'ok' as const, from: 0.4, to: 0.95 },
      { name: 'MT Atlantic Trader · Houston → Antwerp', status: 'Weather routed · ETA Oct 18', tone: 'info' as const, from: 0.3, to: 0.82 },
      { name: 'MV Nordic Star · Yokohama Anchorage', status: 'Berth confirmed · Agent ready', tone: 'ok' as const, from: 0.2, to: 0.9 },
    ].map((l, i) => (
      <div key={l.name} className="mt-in rounded-xl border border-[#E5E5E5] px-3 py-2.5" style={d(i * 0.4)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-bold text-[#00003C] truncate pr-2">{l.name}</span>
          <Pill tone={l.tone}>{l.status.split('·')[0].trim()}</Pill>
        </div>
        <p className="text-[11px] text-[#666666] mb-1.5">{l.status}</p>
        <Bar from={l.from} to={l.to} />
      </div>
    ))}
    <div className="mt-in rounded-xl border border-[#0033FF]/20 bg-[#F3F5FF] px-3 py-2.5" style={d(1.4)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-[#00003C]">Daily Fleet Briefing Auto-Generated</span>
        <span className="text-[10px] font-semibold text-emerald-700">✓ Shore sync complete</span>
      </div>
      <p className="text-[11px] text-[#45455A]">
        Shore superintendents review 1 unified dashboard instead of making 14 individual status calls.
      </p>
    </div>
  </div>
);

/* 02 — Certificate Expiry Alerts & Document AI */
const CertificateExpiryTracking: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-3 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">SMC Certificate · MV Pacific Pioneer</span>
        <span className="text-[10px] font-mono text-[#0033FF] font-semibold">AI Extracted</span>
      </div>
      <p className="text-[11px] text-[#45455A] leading-relaxed">
        “Safety Management Certificate (SMC) scanned &amp; parsed: Flag State Marshall Islands. Expiry flagged: 42 days remaining. Class surveyor audit booked.”
      </p>
    </div>
    <div className="space-y-2">
      {[
        { task: 'Crew STCW endorsements', meta: 'Chief Engineer renewal alert sent 60 days ahead', tone: 'ok' as const },
        { task: 'International Oil Pollution Prevention (IOPP)', meta: 'Audited & validated with DNV registry', tone: 'ok' as const },
        { task: 'Port State Control (PSC) readiness pack', meta: 'Auto-compiled for Rotterdam arrival', tone: 'info' as const },
      ].map((item, i) => (
        <div
          key={item.task}
          className="mt-row flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-2"
          style={d(1.0 + i * 1.0)}
        >
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-xs font-bold text-[#00003C] truncate">{item.task}</p>
            <p className="text-[10px] text-[#666666]">{item.meta}</p>
          </div>
          <Pill tone={item.tone}>{item.tone === 'ok' ? 'Verified' : 'Ready'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 03 — Maintenance Due Alerts & Predictive Signals */
const MaintenanceDueSignals: React.FC = () => (
  <div>
    <div className="rounded-xl border border-[#E5E5E5] px-3 py-2.5 mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold text-[#00003C]">Preventive work order compliance</span>
        <span className="text-[11px] font-semibold text-emerald-600">98.4% planned completion</span>
      </div>
      <Bar from={0.7} to={0.98} tone="bg-emerald-500" />
    </div>
    <div className="space-y-2">
      {[
        { id: 'WO-8802', desc: 'Main Engine Cylinder #4 Overhaul', sla: 'Due in 48 running hrs · Spares on board', tone: 'warn' as const },
        { id: 'WO-8794', desc: 'Auxiliary Generator #2 Lube Oil Filter', sla: 'Completed & logged by 2nd Engineer', tone: 'ok' as const },
        { id: 'WO-8761', desc: 'Sea Water Cooling Pump Vibration Signal', sla: 'Predictive inspection scheduled at next port', tone: 'info' as const },
      ].map((wo, i) => (
        <div
          key={wo.id}
          className="mt-row flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white px-3 py-2.5"
          style={d(1.5 + i * 1.5)}
        >
          <span className="text-xs font-mono font-bold text-[#0033FF] shrink-0">{wo.id}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#00003C] truncate">{wo.desc}</p>
            <p className="text-[10px] text-[#666666]">{wo.sla}</p>
          </div>
          <Pill tone={wo.tone}>{wo.tone === 'ok' ? 'Closed' : 'Scheduled'}</Pill>
        </div>
      ))}
    </div>
  </div>
);

/* 04 — Port-Call Preparation & Agent Coordination */
const PortCallCoordination: React.FC = () => (
  <div>
    <div className="flex justify-end mb-2.5">
      <p className="mt-in max-w-[88%] rounded-2xl rounded-br-md bg-[#00003C] text-white text-[12px] font-medium px-3.5 py-2">
        Port call checklist initialized: Port of Antwerp · Berth 402 · Inbound MV Nordic Star
      </p>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-[#E5E5E5] bg-[#FAFAFA] p-3 space-y-2">
      <div className="mt-in flex items-center justify-between rounded-lg bg-white border border-[#E5E5E5] px-3 py-1.5" style={d(0.6)}>
        <span className="text-xs font-bold text-[#00003C]">Port Agent Coordination</span>
        <span className="text-xs font-bold text-emerald-700">100% Milestones Tracked</span>
      </div>
      <div className="mt-in p-2.5 rounded-lg bg-white border border-[#E5E5E5]" style={d(1.2)}>
        <p className="text-[11px] text-[#45455A] leading-relaxed">
          <strong className="text-[#00003C]">Checklist Call #ANT-2026:</strong> Bunkering slot confirmed, pilotage booked for 06:00 UTC, and technical spares delivery cleared through customs.
        </p>
      </div>
      <div className="mt-in flex items-center justify-between rounded-lg bg-[#F3F5FF] border border-[#0033FF]/20 px-3 py-1.5" style={d(1.8)}>
        <span className="text-[11px] font-semibold text-[#0033FF]">Zero last-minute scramble</span>
        <span className="text-[11px] font-bold text-[#00003C]">Tasks assigned by role &amp; port</span>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {['Port checklists', 'Agent milestones', 'Zero manual reassembly'].map((t, i) => (
        <span
          key={t}
          className="mt-in rounded-full border border-dashed border-[#0033FF]/40 px-2.5 py-1 text-[11px] font-semibold text-[#0033FF]"
          style={d(2.6 + i * 0.4)}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const TITLES = [
  'Fleet summary copilot & voyage visibility',
  'Certificate expiry alerts & document AI',
  'Maintenance due alerts & predictive signals',
  'Port-call preparation & agent coordination',
];
const BODIES = [FleetSummaryCopilot, CertificateExpiryTracking, MaintenanceDueSignals, PortCallCoordination];

export const BottleneckVisual: React.FC<{ index: number }> = ({ index }) => {
  const Body = BODIES[index];
  return (
    <Frame title={TITLES[index]}>
      <Body />
    </Frame>
  );
};

export default BottleneckVisual;
