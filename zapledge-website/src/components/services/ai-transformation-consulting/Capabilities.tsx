"use client";

import React from 'react';
import { capabilities } from '@/content/services/ai-transformation-consulting';
import { CapabilitiesIndex, Item, Example } from '@/components/CapabilitiesIndex';

// Icons, one per capability, in the source's 01-14 order.
const icons: React.ReactNode[] = [
  // 01 AI Transformation Strategy (compass)
  <svg viewBox="0 0 24 24" key="01">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>,
  // 02 AI Readiness & Maturity Assessment (clipboard check)
  <svg viewBox="0 0 24 24" key="02">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
    <path d="M9 14l2 2 4-4" />
  </svg>,
  // 03 AI Use-Case Discovery (search)
  <svg viewBox="0 0 24 24" key="03">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>,
  // 04 AI Strategy & Consulting (lightbulb)
  <svg viewBox="0 0 24 24" key="04">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
  </svg>,
  // 05 Business Process Redesign (loop / redesign)
  <svg viewBox="0 0 24 24" key="05">
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>,
  // 06 AI Feasibility Assessment (balance scale)
  <svg viewBox="0 0 24 24" key="06">
    <path d="M12 3v18" />
    <path d="M5 7l-3 6a3 3 0 0 0 6 0z" />
    <path d="M19 7l-3 6a3 3 0 0 0 6 0z" />
    <path d="M5 7h14" />
    <path d="M9 21h6" />
  </svg>,
  // 07 AI Technology Advisory (stacked layers)
  <svg viewBox="0 0 24 24" key="07">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>,
  // 08 AI Adoption & Implementation Planning (calendar)
  <svg viewBox="0 0 24 24" key="08">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>,
  // 09 Enterprise AI Adoption (team / users)
  <svg viewBox="0 0 24 24" key="09">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // 10 AI Consulting for Manufacturing (factory)
  <svg viewBox="0 0 24 24" key="10">
    <path d="M3 21V10l6 4v-4l6 4v-4l6 4v7z" />
    <path d="M3 21h18" />
    <rect x="7" y="15" width="2" height="3" />
    <rect x="13" y="15" width="2" height="3" />
  </svg>,
  // 11 AI Consulting for SMEs & Mid-Market Businesses (storefront)
  <svg viewBox="0 0 24 24" key="11">
    <path d="M3 9l1-5h16l1 5" />
    <path d="M4 9v10a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1V9" />
    <path d="M3 9h18" />
  </svg>,
  // 12 AI Transformation Roadmap (map)
  <svg viewBox="0 0 24 24" key="12">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <path d="M9 3v15M15 6v15" />
  </svg>,
  // 13 AI ROI & Value Assessment (trending up)
  <svg viewBox="0 0 24 24" key="13">
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="14 7 21 7 21 14" />
  </svg>,
  // 14 AI Governance & Implementation Planning (shield)
  <svg viewBox="0 0 24 24" key="14">
    <path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7z" />
  </svg>,
];

// Short flow-step labels for the capabilities whose content file entry
// includes an illustrative example, derived from that same example text.
const exampleSteps: Record<string, Pick<Example, 'steps' | 'highlightIndex'>> = {
  '01': {
    steps: ['Quoting', 'Output', 'Inventory', 'Servicing'],
    highlightIndex: 1,
  },
  '10': {
    steps: ['Production Delay', 'Floor Visibility', 'Shortage Alert'],
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
