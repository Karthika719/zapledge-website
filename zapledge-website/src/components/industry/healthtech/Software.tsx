import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/healthtech';

const icons: React.ReactNode[] = [
  // Patient Experience
  <svg viewBox="0 0 24 24" key="patient-exp">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6M22 11h-6" strokeLinecap="round" />
  </svg>,
  // Provider Operations
  <svg viewBox="0 0 24 24" key="provider-ops">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M12 14v4M10 16h4" strokeLinecap="round" />
  </svg>,
  // Health Records & Documents
  <svg viewBox="0 0 24 24" key="records">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" strokeLinecap="round" />
    <line x1="9" y1="15" x2="15" y2="15" strokeLinecap="round" />
  </svg>,
  // Revenue Cycle Support
  <svg viewBox="0 0 24 24" key="revenue">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <path d="M6 15h2M10 15h4" strokeLinecap="round" />
  </svg>,
  // AI & Decision Support
  <svg viewBox="0 0 24 24" key="decision-support">
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const pillars = software.pillars.map((p, i) => ({ ...p, icon: icons[i] }));

export const Software: React.FC = () => (
  <IndustryPillars
    label={software.label}
    intro={software.intro}
    pillars={pillars}
    closing={software.closing}
    layerLabel="One connected healthcare operating layer"
  />
);

export default Software;
