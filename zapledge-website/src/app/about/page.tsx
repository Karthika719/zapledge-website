import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import OurPrinciples from '@/components/about/OurPrinciples';
import WhereWereGoing from '@/components/about/WhereWereGoing';
import TrustedBy from '@/components/about/TrustedBy';
import Testimonial from '@/components/about/Testimonial';
import AboutFaq from '@/components/about/AboutFaq';
import FinalCta from '@/components/about/FinalCta';
export const metadata: Metadata = {
  title: 'About Zapledge | AI Consulting & Engineering in Kochi',
  description: 'Zapledge is an AI consulting and engineering company based in Kochi, Kerala, founded in 2025, helping Indian businesses build practical AI solutions.',
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
