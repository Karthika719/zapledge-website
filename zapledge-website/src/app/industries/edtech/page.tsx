import { Metadata } from 'next';
import Hero from '@/components/industry/edtech/Hero';
import Software from '@/components/industry/edtech/Software';
import CaseStudy from '@/components/industry/edtech/CaseStudy';
import Bottlenecks from '@/components/industry/edtech/Bottlenecks';
import Modules from '@/components/industry/edtech/Modules';
import Workflow from '@/components/industry/edtech/Workflow';
import Faq from '@/components/industry/edtech/Faq';
import CTA from '@/components/industry/edtech/CTA';
import { hero } from '@/content/industries/edtech';

export const metadata: Metadata = {
  title: 'EdTech Software & Learning Operations',
  description: hero.subheadline,
};

export default function EdTechPage() {
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
