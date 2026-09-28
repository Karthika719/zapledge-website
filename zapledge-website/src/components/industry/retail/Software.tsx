import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/retail';

const icons: React.ReactNode[] = [
  // Commerce & POS
  <svg viewBox="0 0 24 24" key="commerce-pos">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <path d="M6 16h2M10 16h6" strokeLinecap="round" />
  </svg>,
  // Inventory & Supply Chain
  <svg viewBox="0 0 24 24" key="inventory-supply">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
  // Customer Intelligence
  <svg viewBox="0 0 24 24" key="customer-intel">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
  </svg>,
  // Omnichannel Operations
  <svg viewBox="0 0 24 24" key="omnichannel">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
  // AI Retail Intelligence
  <svg viewBox="0 0 24 24" key="retail-ai">
    <path d="M3 3v18h18" strokeLinecap="round" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const pillars = software.pillars.map((p, i) => ({ ...p, icon: icons[i] }));

export const Software: React.FC = () => (
  <IndustryPillars
    label={software.label}
    intro={software.intro}
    pillars={pillars}
    closing={software.closing}
    layerLabel="One connected retail operating layer"
  />
);

export default Software;
