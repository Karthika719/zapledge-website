import { Metadata } from 'next';
import Hero from '@/components/industry/marinetech/Hero';
import Software from '@/components/industry/marinetech/Software';
import CaseStudy from '@/components/industry/marinetech/CaseStudy';
import Bottlenecks from '@/components/industry/marinetech/Bottlenecks';
import Modules from '@/components/industry/marinetech/Modules';
import Workflow from '@/components/industry/marinetech/Workflow';
import Faq from '@/components/industry/marinetech/Faq';
import CTA from '@/components/industry/marinetech/CTA';
export const metadata: Metadata = {
  title: 'AI-Powered MarineTech Software & Fleet Automation | Zapledge',
  description:
    'Zapledge builds AI-powered marinetech software for fleet visibility, maintenance, crew compliance, and port-call coordination. Get a free consultation.',
};

export default function MarineTechPage() {
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
