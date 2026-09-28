import { Metadata } from 'next';
import Hero from '@/components/industry/fintech/Hero';
import Software from '@/components/industry/fintech/Software';
import CaseStudy from '@/components/industry/fintech/CaseStudy';
import Bottlenecks from '@/components/industry/fintech/Bottlenecks';
import Modules from '@/components/industry/fintech/Modules';
import Workflow from '@/components/industry/fintech/Workflow';
import Faq from '@/components/industry/fintech/Faq';
import CTA from '@/components/industry/fintech/CTA';
export const metadata: Metadata = {
  title: 'AI-Powered FinTech Software & Compliance Automation',
  description:
    'Zapledge builds AI-powered fintech software for onboarding, payments, lending, and compliance automation, built for audit-ready operations. Get a free consultation.',
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
