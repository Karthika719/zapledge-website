import { Metadata } from 'next';
import Hero from '@/components/industry/healthtech/Hero';
import Software from '@/components/industry/healthtech/Software';
import CaseStudy from '@/components/industry/healthtech/CaseStudy';
import Bottlenecks from '@/components/industry/healthtech/Bottlenecks';
import Modules from '@/components/industry/healthtech/Modules';
import Workflow from '@/components/industry/healthtech/Workflow';
import Faq from '@/components/industry/healthtech/Faq';
import CTA from '@/components/industry/healthtech/CTA';
export const metadata: Metadata = {
  title: 'AI-Powered HealthTech Software & Patient Ops | Zapledge',
  description:
    'Zapledge builds AI-powered healthtech software for patient scheduling, records, billing, and admin workflows, keeping clinical decisions with providers.',
};

export default function HealthTechPage() {
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
