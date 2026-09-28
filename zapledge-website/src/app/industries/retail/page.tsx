import { Metadata } from 'next';
import Hero from '@/components/industry/retail/Hero';
import Software from '@/components/industry/retail/Software';
import CaseStudy from '@/components/industry/retail/CaseStudy';
import Bottlenecks from '@/components/industry/retail/Bottlenecks';
import Modules from '@/components/industry/retail/Modules';
import Workflow from '@/components/industry/retail/Workflow';
import Faq from '@/components/industry/retail/Faq';
import CTA from '@/components/industry/retail/CTA';
import { hero } from '@/content/industries/retail';

export const metadata: Metadata = {
  title: 'Retail Tech Software & Inventory Automation',
  description: hero.subheadline,
};

export default function RetailTechPage() {
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
