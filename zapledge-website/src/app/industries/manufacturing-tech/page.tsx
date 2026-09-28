import { Metadata } from 'next';
import Hero from '@/components/industry/manufacturing-tech/Hero';
import Software from '@/components/industry/manufacturing-tech/Software';
import CaseStudy from '@/components/industry/manufacturing-tech/CaseStudy';
import Bottlenecks from '@/components/industry/manufacturing-tech/Bottlenecks';
import Modules from '@/components/industry/manufacturing-tech/Modules';
import Workflow from '@/components/industry/manufacturing-tech/Workflow';
import Faq from '@/components/industry/manufacturing-tech/Faq';
import CTA from '@/components/industry/manufacturing-tech/CTA';
export const metadata: Metadata = {
  title: 'AI-Powered Manufacturing Software & Automation | Zapledge',
  description:
    'Zapledge builds AI-powered manufacturing software and automation, connecting ERP, production planning, quality, and dispatch in one system. Get a free consultation.',
};

export default function ManufacturingTechPage() {
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
