import { Metadata } from 'next';
import Hero from '@/components/industry/construction/Hero';
import Software from '@/components/industry/construction/Software';
import CaseStudy from '@/components/industry/construction/CaseStudy';
import Bottlenecks from '@/components/industry/construction/Bottlenecks';
import Modules from '@/components/industry/construction/Modules';
import Workflow from '@/components/industry/construction/Workflow';
import Faq from '@/components/industry/construction/Faq';
import CTA from '@/components/industry/construction/CTA';
export const metadata: Metadata = {
  title: 'AI-Powered Construction Software & Automation | Zapledge',
  description:
    'Zapledge builds AI-powered construction software for project planning, procurement, site tracking, quality, and billing. Get a free consultation.',
};

export default function ConstructionPage() {
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
