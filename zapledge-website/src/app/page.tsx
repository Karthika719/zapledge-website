import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import IndustriesSection from '@/components/IndustriesSection';
import HomeWhyZapledge from '@/components/HomeWhyZapledge';
import { TrustedBySection } from '@/components/TrustedBySection';
import FaqSection from '@/components/FaqSection';
import HomeCTASection from '@/components/HomeCTASection';

export const metadata: Metadata = {
  title: 'Zapledge International Pvt Ltd | AI Consulting, AI Solutions, Automation & IoT | Kochi, Kerala',
  description: 'Zapledge International Pvt Ltd helps businesses solve real business challenges with practical AI: consulting, engineering, automation, and intelligent operations. Based in Kochi, Kerala.',
};

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
