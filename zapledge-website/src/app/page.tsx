"use client";

import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import IndustriesSection from '@/components/IndustriesSection';
import WhyZapledgeSection from '@/components/WhyZapledgeSection';
import { TrustedBySection } from '@/components/TrustedBySection';
import FaqSection from '@/components/FaqSection';
import HomeCTASection from '@/components/HomeCTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <IndustriesSection />
      <WhyZapledgeSection />
      <TrustedBySection />
      <FaqSection />
      <HomeCTASection />
    </>
  );
}
