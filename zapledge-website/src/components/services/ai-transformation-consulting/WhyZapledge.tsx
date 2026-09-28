import React from 'react';
import { differentiators } from '@/content/services/ai-transformation-consulting';
import { WhyZapledgeSection, ValuePillar } from '@/components/WhyZapledgeSection';

export const WhyZapledge: React.FC = () => {
  const items: ValuePillar[] = differentiators.features.map(({ number, title, body }) => ({
    id: number,
    number,
    title,
    description: body,
  }));

  return (
    <WhyZapledgeSection
      sectionId="ai-transformation-consulting-why-zapledge"
      label={differentiators.label}
      headline={differentiators.headline}
      intro={differentiators.intro}
      items={items}
    />
  );
};

export default WhyZapledge;
