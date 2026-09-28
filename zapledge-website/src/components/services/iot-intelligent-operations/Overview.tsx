import React from 'react';
import { intro } from '@/content/services/iot-intelligent-operations';
import { ServiceIntro } from '@/components/ServiceIntro';

export const Overview: React.FC = () => (
  <ServiceIntro
    eyebrow={intro.eyebrow}
    statement={intro.statement}
    statementEmphasis={intro.statementEmphasis}
    body={intro.body}
    note={intro.note}
  />
);

export default Overview;
