"use client";

import React from 'react';
import { ProblemSolutionSection } from '@/components/industry/ProblemSolutionSection';
import { BottleneckVisual } from '@/components/industry/marinetech/BottleneckVisuals';
import { bottlenecks } from '@/content/industries/marinetech';

const items = bottlenecks.items.map(({ title, body }) => ({ problem: title, solution: body }));

export const Bottlenecks: React.FC = () => (
  <ProblemSolutionSection
    title={bottlenecks.title}
    intro={bottlenecks.intro}
    items={items}
    closing={bottlenecks.closing}
    renderVisual={(i) => <BottleneckVisual index={i} />}
  />
);

export default Bottlenecks;
