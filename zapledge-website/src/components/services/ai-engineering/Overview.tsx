import React from 'react';
import { intro } from '@/content/services/ai-engineering';
import { ServiceIntro } from '@/components/ServiceIntro';

export const Overview: React.FC = () => (
  <ServiceIntro
    eyebrow={intro.eyebrow}
    statement={intro.statement}
    body={intro.body}
    note={intro.note}
  />
);

export default Overview;
