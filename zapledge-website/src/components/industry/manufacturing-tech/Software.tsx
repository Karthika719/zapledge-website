import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/manufacturing-tech';

const icons: React.ReactNode[] = [
  // ERP & Operations
  <svg viewBox="0 0 24 24" key="erp">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  // Factory Visibility
  <svg viewBox="0 0 24 24" key="vis">
    <path d="M3 20h18M5 20V10l5 3V10l5 3V6h4v14" strokeLinejoin="round" />
  </svg>,
  // Supply Chain
  <svg viewBox="0 0 24 24" key="sc">
    <rect x="2" y="2" width="8" height="8" rx="2" />
    <rect x="14" y="14" width="8" height="8" rx="2" />
    <path d="M10 6h4a2 2 0 0 1 2 2v6" />
  </svg>,
  // Quality
  <svg viewBox="0 0 24 24" key="q">
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" strokeLinejoin="round" />
    <path d="M8.5 12l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Customer & Sales
  <svg viewBox="0 0 24 24" key="cs">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
  </svg>,
];

const pillars = software.pillars.map((p, i) => ({ ...p, icon: icons[i] }));

export const Software: React.FC = () => (
  <IndustryPillars
    label={software.label}
    intro={software.intro}
    pillars={pillars}
    closing={software.closing}
    layerLabel="One connected operating layer"
  />
);

export default Software;
