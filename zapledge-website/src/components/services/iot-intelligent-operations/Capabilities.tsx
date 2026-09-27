"use client";

import React from 'react';
import { capabilities } from '@/content/services/iot-intelligent-operations';
import { CapabilitiesIndex, Item, Example } from '@/components/CapabilitiesIndex';

// Icons, one per capability, in the source's 01-09 order.
const icons: React.ReactNode[] = [
  // 01 Industrial IoT Solutions (connected sensor chip)
  <svg viewBox="0 0 24 24" key="01">
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </svg>,
  // 02 Connected Machine Systems (grid of linked assets)
  <svg viewBox="0 0 24 24" key="02">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
  </svg>,
  // 03 IoT Data Collection (funnel)
  <svg viewBox="0 0 24 24" key="03">
    <path d="M4 4h16l-6 8v6l-4 2v-8z" />
  </svg>,
  // 04 Real-Time Monitoring (live monitor)
  <svg viewBox="0 0 24 24" key="04">
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 18v3" />
    <path d="M6 12l3-3 2 2 4-5 3 4" />
  </svg>,
  // 05 Production & Operations Dashboards (bar chart)
  <svg viewBox="0 0 24 24" key="05">
    <path d="M3 3v18h18" />
    <rect x="7" y="12" width="3" height="6" />
    <rect x="12" y="8" width="3" height="10" />
    <rect x="17" y="14" width="3" height="4" />
  </svg>,
  // 06 Equipment & Machine Monitoring (gauge)
  <svg viewBox="0 0 24 24" key="06">
    <path d="M4 15a8 8 0 1 1 16 0" />
    <path d="M12 15l3-4" />
    <circle cx="12" cy="15" r="1" />
  </svg>,
  // 07 Predictive Alerts & Intelligence (bell)
  <svg viewBox="0 0 24 24" key="07">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>,
  // 08 IoT + AI Integration (device + spark)
  <svg viewBox="0 0 24 24" key="08">
    <rect x="3" y="4" width="9" height="9" rx="2" />
    <path d="M17.5 5.5l1.2 2.4 2.4 1.2-2.4 1.2-1.2 2.4-1.2-2.4-2.4-1.2 2.4-1.2z" />
    <path d="M7.5 13v6M4 16h7" />
  </svg>,
  // 09 Intelligent Operations Platforms (unified layers)
  <svg viewBox="0 0 24 24" key="09">
    <path d="M12 2l9 5-9 5-9-5z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 17l9 5 9-5" />
  </svg>,
];

// Short flow-step labels for the capabilities whose content file entry
// includes an illustrative example, derived from that same example text.
const exampleSteps: Record<string, Pick<Example, 'steps' | 'highlightIndex'>> = {
  '01': {
    steps: ['Runtime', 'Stopped', 'Output', 'Energy'],
    highlightIndex: 1,
  },
  '05': {
    steps: ['Owner View', 'Manager View', 'Supervisor View'],
    highlightIndex: 1,
  },
};

const items: Item[] = capabilities.items.map((item, idx) => {
  const flow = exampleSteps[item.number];
  const example: Example | undefined =
    item.example && flow
      ? {
          steps: flow.steps,
          highlightIndex: flow.highlightIndex,
          caption: item.example,
        }
      : undefined;

  return {
    title: item.title,
    body: item.body,
    icon: icons[idx],
    example,
  };
});

// The content headline ends in "Capabilities"; split it so the trailing
// word can be rendered in accent color without altering the text.
const ACCENT_WORD = 'Capabilities';
const headline = capabilities.headline.endsWith(ACCENT_WORD)
  ? capabilities.headline.slice(0, -ACCENT_WORD.length).trim()
  : capabilities.headline;
const headlineAccent = capabilities.headline.endsWith(ACCENT_WORD)
  ? ACCENT_WORD
  : '';

export const Capabilities: React.FC = () => {
  return (
    <CapabilitiesIndex
      label={capabilities.label}
      headline={headline}
      headlineAccent={headlineAccent}
      intro={capabilities.intro}
      items={items}
    />
  );
};

export default Capabilities;
