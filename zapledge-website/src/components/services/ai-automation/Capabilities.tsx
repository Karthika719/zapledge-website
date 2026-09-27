"use client";

import React from 'react';
import { capabilities } from '@/content/services/ai-automation';
import { CapabilitiesIndex, Item, Example } from '@/components/CapabilitiesIndex';

// Icons, one per capability, in the source's 01-09 order.
const icons: React.ReactNode[] = [
  // 01 Business Process Automation (settings / rules engine)
  <svg viewBox="0 0 24 24" key="01">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>,
  // 02 AI Workflow Automation (inbox understood -> routed)
  <svg viewBox="0 0 24 24" key="02">
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <polyline points="22 6 12 13 2 6" />
  </svg>,
  // 03 Document & Data Automation
  <svg viewBox="0 0 24 24" key="03">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>,
  // 04 Intelligent Approvals & Routing
  <svg viewBox="0 0 24 24" key="04">
    <path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>,
  // 05 CRM & ERP Automation (connected systems)
  <svg viewBox="0 0 24 24" key="05">
    <rect x="2" y="2" width="8" height="8" rx="2" />
    <rect x="14" y="2" width="8" height="8" rx="2" />
    <rect x="14" y="14" width="8" height="8" rx="2" />
    <rect x="2" y="14" width="8" height="8" rx="2" />
  </svg>,
  // 06 AI-Powered Task Automation (checklist)
  <svg viewBox="0 0 24 24" key="06">
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />
  </svg>,
  // 07 RPA + AI Automation (robot)
  <svg viewBox="0 0 24 24" key="07">
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <circle cx="9" cy="13" r="1" />
    <circle cx="15" cy="13" r="1" />
    <path d="M9 17h6" />
    <path d="M12 8V4" />
    <circle cx="12" cy="3" r="1" />
  </svg>,
  // 08 Workflow Orchestration (hub / connected nodes)
  <svg viewBox="0 0 24 24" key="08">
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <path d="M12 7v4M12 11 5 17M12 11l7 6" />
  </svg>,
  // 09 Operational Automation Solutions (end-to-end system)
  <svg viewBox="0 0 24 24" key="09">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
];

// Short flow-step labels for the capabilities whose content file entry
// includes an illustrative example, derived from that same example text.
const exampleSteps: Record<string, Pick<Example, 'steps' | 'highlightIndex'>> = {
  '02': {
    steps: ['Email Received', 'Classify Enquiry', 'Create CRM Lead', 'Assign Owner'],
    highlightIndex: 1,
  },
  '03': {
    steps: ['Invoice Received', 'Extract & Match PO', 'Enter in System', 'Flag Mismatches'],
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
