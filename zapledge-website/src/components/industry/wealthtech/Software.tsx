import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/wealthtech';

const icons: React.ReactNode[] = [
  // Client & Advisor Experience
  <svg viewBox="0 0 24 24" key="client-exp">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" strokeLinecap="round" />
  </svg>,
  // Portfolio Operations
  <svg viewBox="0 0 24 24" key="portfolio">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>,
  // Research & Intelligence
  <svg viewBox="0 0 24 24" key="research">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 7h6M9 11h4" strokeLinecap="round" />
  </svg>,
  // Compliance Workflow Support
  <svg viewBox="0 0 24 24" key="compliance">
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Management & Analytics
  <svg viewBox="0 0 24 24" key="analytics">
    <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
    <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" />
    <path d="M2 20h20" strokeLinecap="round" />
  </svg>,
];

const pillars = software.pillars.map((p, i) => ({ ...p, icon: icons[i] }));

export const Software: React.FC = () => (
  <IndustryPillars
    label={software.label}
    intro={software.intro}
    pillars={pillars}
    closing={software.closing}
    layerLabel="One connected wealth management operating layer"
  />
);

export default Software;
