import React from 'react';
import { intro } from '@/content/services/ai-transformation-consulting';
import { ServiceIntro } from '@/components/ServiceIntro';

export const Overview: React.FC = () => (
  <ServiceIntro
    eyebrow={intro.eyebrow}
    statement={intro.statement}
    statementEmphasis={intro.statementEmphasis}
    body={intro.body}
    highlights={intro.highlights}
    note={intro.note}
  />
);

export default Overview;
