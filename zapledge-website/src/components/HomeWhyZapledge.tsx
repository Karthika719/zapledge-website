"use client";

import React from 'react';
import GradientCarousel, { GradientCarouselItem } from '@/components/GradientCarousel';

// Same content the homepage's Why Zapledge section has always shown —
// only the rendering component changed (sticky-list -> gradient carousel).
const items: GradientCarouselItem[] = [
  {
    number: '01',
    title: 'Customized, not one-size-fits-all',
    body: 'We understand your business processes before recommending a solution.',
  },
  {
    number: '02',
    title: 'Industry-aware',
    body: 'Solutions shaped around your industry, business processes, and real-world requirements.',
  },
  {
    number: '03',
    title: 'Practical over trendy',
    body: 'We focus on measurable improvements, not AI for its own sake.',
  },
  {
    number: '04',
    title: 'Built to scale',
    body: 'Solutions designed to grow alongside your business.',
  },
  {
    number: '05',
    title: 'End-to-end capability',
    body: 'Strategy, engineering, automation, and connected operations under one team.',
  },
];

export const HomeWhyZapledge: React.FC = () => (
  <GradientCarousel
    label="Why Zapledge"
    headline="Why Choose Zapledge for Practical AI Solutions"
    intro=""
    items={items}
  />
);

export default HomeWhyZapledge;
