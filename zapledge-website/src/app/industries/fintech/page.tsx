import { Metadata } from 'next';
import Hero from '@/components/industry/fintech/Hero';
import Software from '@/components/industry/fintech/Software';
import CaseStudy from '@/components/industry/fintech/CaseStudy';
import Bottlenecks from '@/components/industry/fintech/Bottlenecks';
import Modules from '@/components/industry/fintech/Modules';
import Workflow from '@/components/industry/fintech/Workflow';
import Faq from '@/components/industry/fintech/Faq';
import CTA from '@/components/industry/fintech/CTA';
import { hero } from '@/content/industries/fintech';

export const metadata: Metadata = {
  title: 'FinTech Software & Compliance Automation',
  description: hero.subheadline,
};

export default function FinTechPage() {
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
