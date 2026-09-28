import React from 'react';
import { IndustryPillars } from '@/components/industry/IndustryPillars';
import { software } from '@/content/industries/construction';

const icons: React.ReactNode[] = [
  // Project Management
  <svg viewBox="0 0 24 24" key="project-mgmt">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="14" x2="14" y2="14" strokeLinecap="round" />
    <line x1="8" y1="18" x2="11" y2="18" strokeLinecap="round" />
  </svg>,
  // Site Operations
  <svg viewBox="0 0 24 24" key="site-ops">
    <path d="M2 18h20M4 18V8a8 8 0 0 1 16 0v10" strokeLinecap="round" />
    <path d="M12 2v6" strokeLinecap="round" />
    <line x1="9" y1="18" x2="9" y2="14" strokeLinecap="round" />
    <line x1="15" y1="18" x2="15" y2="14" strokeLinecap="round" />
  </svg>,
  // Procurement & Materials
  <svg viewBox="0 0 24 24" key="procurement">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>,
  // Subcontractor & Commercial
  <svg viewBox="0 0 24 24" key="subcontractor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
  </svg>,
  // AI Project Intelligence
  <svg viewBox="0 0 24 24" key="project-ai">
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
    layerLabel="One connected construction operating layer"
  />
);

export default Software;
