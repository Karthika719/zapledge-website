"use client";

import React from 'react';
import { capabilities } from '@/content/services/ai-engineering';
import { CapabilitiesIndex, Item, Example } from '@/components/CapabilitiesIndex';

// Icons, one per capability, in the source's 01-09 order.
const icons: React.ReactNode[] = [
  // 01 AI Application Development
  <svg viewBox="0 0 24 24" key="01">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  // 02 AI Agent Development
  <svg viewBox="0 0 24 24" key="02">
    <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z" />
    <circle cx="9" cy="15" r="1" />
    <circle cx="15" cy="15" r="1" />
  </svg>,
  // 03 Generative AI Solutions
  <svg viewBox="0 0 24 24" key="03">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>,
  // 04 Enterprise AI Systems
  <svg viewBox="0 0 24 24" key="04">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
  // 05 AI Workflow Systems
  <svg viewBox="0 0 24 24" key="05">
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <path d="M7 11v4a2 2 0 0 0 2 2h4" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
  </svg>,
  // 06 AI API & Model Integrations
  <svg viewBox="0 0 24 24" key="06">
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
  </svg>,
  // 07 AI Data Pipelines & Knowledge Systems
  <svg viewBox="0 0 24 24" key="07">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </svg>,
  // 08 Custom AI Software Development
  <svg viewBox="0 0 24 24" key="08">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  // 09 AI System Integration
  <svg viewBox="0 0 24 24" key="09">
    <rect x="2" y="2" width="8" height="8" rx="2" />
    <rect x="14" y="2" width="8" height="8" rx="2" />
    <rect x="14" y="14" width="8" height="8" rx="2" />
    <rect x="2" y="14" width="8" height="8" rx="2" />
  </svg>,
];

// Short flow-step labels for the capabilities whose content file entry
// includes an illustrative example, derived from that same example text.
const exampleSteps: Record<string, Pick<Example, 'steps' | 'highlightIndex'>> = {
  '01': {
    steps: ['RFQ Received', 'Extract Specs', 'Check History', 'Draft Estimate'],
    highlightIndex: 1,
  },
  '03': {
    steps: ['Upload Report', 'Extract Terms', 'Risk Summary'],
    highlightIndex: 1,
  },
  '07': {
    steps: ['Ingest Documents', 'Index & Tag', 'Employee Query'],
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

// The content headline is one string ending in "Capabilities"; split it so
// the trailing word can be rendered in accent color without altering the text.
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
