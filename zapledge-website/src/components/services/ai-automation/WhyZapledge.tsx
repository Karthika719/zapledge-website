import React from 'react';
import { differentiators } from '@/content/services/ai-automation';
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
      sectionId="ai-automation-why-zapledge"
      label={differentiators.label}
      headline={differentiators.headline}
      intro={differentiators.intro}
      items={items}
    />
  );
};

export default WhyZapledge;
