import { Metadata } from 'next';
import Hero from '@/components/industry/wealthtech/Hero';
import Software from '@/components/industry/wealthtech/Software';
import CaseStudy from '@/components/industry/wealthtech/CaseStudy';
import Bottlenecks from '@/components/industry/wealthtech/Bottlenecks';
import Modules from '@/components/industry/wealthtech/Modules';
import Workflow from '@/components/industry/wealthtech/Workflow';
import Faq from '@/components/industry/wealthtech/Faq';
import CTA from '@/components/industry/wealthtech/CTA';
export const metadata: Metadata = {
  title: 'AI-Powered WealthTech Software & Advisor Tools | Zapledge',
  description:
    'Zapledge builds AI-powered wealthtech software for client onboarding, portfolios, research, and compliance, with advisors always in control. Get a free consultation.',
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
