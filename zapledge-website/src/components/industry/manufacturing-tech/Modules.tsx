"use client";

import React from 'react';
import { CapabilitiesIndex, Item } from '@/components/CapabilitiesIndex';
import { modules } from '@/content/industries/manufacturing-tech';

const icons: React.ReactNode[] = [
  // Sales & Customer Operations
  <svg viewBox="0 0 24 24" key="sales">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
  </svg>,
  // Production & Planning
  <svg viewBox="0 0 24 24" key="prod">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  // Supply Chain & Inventory
  <svg viewBox="0 0 24 24" key="sc">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
  // Quality & Dispatch
  <svg viewBox="0 0 24 24" key="qd">
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" strokeLinejoin="round" />
    <path d="M8.5 12l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Management Visibility
  <svg viewBox="0 0 24 24" key="mv">
    <path d="M3 20h18M6 20v-7M11 20V6M16 20v-10M21 20v-4" strokeLinecap="round" />
  </svg>,
];

const items: Item[] = modules.items.map((m, i) => ({ ...m, icon: icons[i] }));

export const Modules: React.FC = () => (
  <CapabilitiesIndex
    label={modules.label}
    headline={modules.headline}
    headlineAccent={modules.headlineAccent}
    intro={modules.intro}
    items={items}
  />
);

export default Modules;
