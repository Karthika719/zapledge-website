import React from 'react';
import { approach } from '@/content/services/ai-automation';
import ClickStack from '@/components/ClickStack';

export const Process: React.FC = () => (
  <ClickStack
    label={approach.label}
    headline={approach.headline}
    intro={approach.intro}
    items={approach.phases.map(({ number, title, body }) => ({ number, title, body }))}
  />
);

export default Process;
