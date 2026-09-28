import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/marinetech';

const icons: React.ReactNode[] = [
  // Fleet & Vessel Operations
  <svg viewBox="0 0 24 24" key="fleet-ops">
    <path d="M2 20a6 6 0 0 0 10 0 6 6 0 0 0 10 0" strokeLinecap="round" />
    <path d="M4 17l1.5-6h13l1.5 6" strokeLinejoin="round" />
    <path d="M12 4v7M9 7l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Maintenance & Assets
  <svg viewBox="0 0 24 24" key="maintenance">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
  // Crew & Compliance Workflows
  <svg viewBox="0 0 24 24" key="crew-compliance">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Port & Service Coordination
  <svg viewBox="0 0 24 24" key="port-coordination">
    <circle cx="12" cy="5" r="3" />
    <line x1="12" y1="22" x2="12" y2="8" strokeLinecap="round" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" strokeLinecap="round" />
  </svg>,
  // Marine Intelligence
  <svg viewBox="0 0 24 24" key="marine-intel">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>,
];

const pillars = software.pillars.map((p, i) => ({ ...p, icon: icons[i] }));

export const Software: React.FC = () => (
  <IndustryPillars
    label={software.label}
    intro={software.intro}
    pillars={pillars}
    closing={software.closing}
    layerLabel="One connected fleet operating layer"
  />
);

export default Software;
