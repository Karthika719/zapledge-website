import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/fintech';

const icons: React.ReactNode[] = [
  // Digital Onboarding
  <svg viewBox="0 0 24 24" key="onboard">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="2.5" />
    <path d="M6 16c0-1.8 1.5-3 3-3s3 1.2 3 3M15 9h3M15 13h2" strokeLinecap="round" />
  </svg>,
  // Payments & Transaction Operations
  <svg viewBox="0 0 24 24" key="pay">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4M16 15h2" strokeLinecap="round" />
  </svg>,
  // Lending & Credit Workflows
  <svg viewBox="0 0 24 24" key="lend">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Risk & Compliance
  <svg viewBox="0 0 24 24" key="risk">
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" strokeLinejoin="round" />
    <path d="M8.5 12l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Customer Operations
  <svg viewBox="0 0 24 24" key="ops">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8M8 13h5" strokeLinecap="round" />
  </svg>,
];

const pillars = software.pillars.map((p, i) => ({ ...p, icon: icons[i] }));

export const Software: React.FC = () => (
  <IndustryPillars
    label={software.label}
    intro={software.intro}
    pillars={pillars}
    closing={software.closing}
    layerLabel="One connected fintech operating layer"
  />
);

export default Software;
