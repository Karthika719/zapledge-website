import { Metadata } from 'next';
import Hero from '@/components/industry/edtech/Hero';
import Software from '@/components/industry/edtech/Software';
import CaseStudy from '@/components/industry/edtech/CaseStudy';
import Bottlenecks from '@/components/industry/edtech/Bottlenecks';
import Modules from '@/components/industry/edtech/Modules';
import Workflow from '@/components/industry/edtech/Workflow';
import Faq from '@/components/industry/edtech/Faq';
import CTA from '@/components/industry/edtech/CTA';
export const metadata: Metadata = {
  title: 'AI-Powered EdTech Software & Learning Operations | Zapledge',
  description:
    'Zapledge builds AI-powered edtech software for admissions, learning management, assessments, and fees, with teachers always in the loop. Get a free consultation.',
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
