import React from 'react';
import { differentiators } from '@/content/services/ai-automation';
import GradientCarousel from '@/components/GradientCarousel';

export const WhyZapledge: React.FC = () => (
  <GradientCarousel
    label={differentiators.label}
    headline={differentiators.headline}
    intro={differentiators.intro}
    items={differentiators.features.map(({ number, title, body }) => ({ number, title, body }))}
  />
);

export default WhyZapledge;
