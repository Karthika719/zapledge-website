import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/edtech';

const icons: React.ReactNode[] = [
  // Admissions & CRM
  <svg viewBox="0 0 24 24" key="admissions-crm">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6M22 11h-6" strokeLinecap="round" />
  </svg>,
  // Learning Management
  <svg viewBox="0 0 24 24" key="lms">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="9" y1="7" x2="15" y2="7" strokeLinecap="round" />
    <line x1="9" y1="11" x2="13" y2="11" strokeLinecap="round" />
  </svg>,
  // Assessment Intelligence
  <svg viewBox="0 0 24 24" key="assessment">
    <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" />
    <path d="M7 16h6M7 12h3" strokeLinecap="round" />
  </svg>,
  // Finance & Operations
  <svg viewBox="0 0 24 24" key="finance-ops">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <path d="M6 15h2M10 15h4" strokeLinecap="round" />
  </svg>,
  // AI Learning Experience
  <svg viewBox="0 0 24 24" key="ai-learning">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
];

const pillars = software.pillars.map((p, i) => ({ ...p, icon: icons[i] }));

export const Software: React.FC = () => (
  <IndustryPillars
    label={software.label}
    intro={software.intro}
    pillars={pillars}
    closing={software.closing}
    layerLabel="One connected learning operating layer"
  />
);

export default Software;
