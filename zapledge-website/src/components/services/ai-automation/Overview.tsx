import React from 'react';
import { intro } from '@/content/services/ai-automation';
import { ServiceIntro } from '@/components/ServiceIntro';

export const Overview: React.FC = () => (
  <ServiceIntro
    eyebrow={intro.eyebrow}
    statement={intro.statement}
    body={intro.body}
    highlights={intro.highlights}
    note={intro.note}
  />
);

export default Overview;
