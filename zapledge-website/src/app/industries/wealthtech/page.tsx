import { Metadata } from 'next';
import Hero from '@/components/industry/wealthtech/Hero';
import Software from '@/components/industry/wealthtech/Software';
import CaseStudy from '@/components/industry/wealthtech/CaseStudy';
import Bottlenecks from '@/components/industry/wealthtech/Bottlenecks';
import Modules from '@/components/industry/wealthtech/Modules';
import Workflow from '@/components/industry/wealthtech/Workflow';
import Faq from '@/components/industry/wealthtech/Faq';
import CTA from '@/components/industry/wealthtech/CTA';
import { hero } from '@/content/industries/wealthtech';

export const metadata: Metadata = {
  title: 'WealthTech Software & Advisor Tools',
  description: hero.subheadline,
};

export default function WealthTechPage() {
  return (
    <main className="w-full min-h-screen bg-white text-[#00003C]">
      <Hero />
      <Software />
      <CaseStudy />
      <Bottlenecks />
      <Modules />
      <Workflow />
      <Faq />
      <CTA />
    </main>
  );
}
