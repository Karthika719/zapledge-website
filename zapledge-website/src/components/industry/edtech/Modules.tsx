"use client";

import React from 'react';
import { IndustryModuleIndex } from '@/components/industry/IndustryModuleIndex';
import { moduleIndex } from '@/content/industries/edtech';

export const Modules: React.FC = () => (
  <IndustryModuleIndex
    id="edtech-modules"
    heading={moduleIndex.heading}
    intro={moduleIndex.intro}
    modules={moduleIndex.modules}
  />
);

export default Modules;
