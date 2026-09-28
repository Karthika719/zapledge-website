"use client";

import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import IndustriesSection from '@/components/IndustriesSection';
import HomeWhyZapledge from '@/components/HomeWhyZapledge';
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
      <HomeWhyZapledge />
      <TrustedBySection />
      <FaqSection />
      <HomeCTASection />
    </>
  );
}
