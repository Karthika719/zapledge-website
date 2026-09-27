import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import OurPrinciples from '@/components/about/OurPrinciples';
import WhereWereGoing from '@/components/about/WhereWereGoing';
import TrustedBy from '@/components/about/TrustedBy';
import Testimonial from '@/components/about/Testimonial';
import AboutFaq from '@/components/about/AboutFaq';
import FinalCta from '@/components/about/FinalCta';
import { aboutMeta } from '@/content/about';

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

// Navbar and the curtain → footer reveal come from the root layout.
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurPrinciples />
      <WhereWereGoing />
      <TrustedBy />
      <Testimonial />
      <AboutFaq />
      <FinalCta />
    </>
  );
}
