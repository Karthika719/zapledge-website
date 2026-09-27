import { Metadata } from 'next';
import { aiAutomationMeta } from '@/content/services/ai-automation';
import Hero from '@/components/services/ai-automation/Hero';
import Overview from '@/components/services/ai-automation/Overview';
import Capabilities from '@/components/services/ai-automation/Capabilities';
import Process from '@/components/services/ai-automation/Process';
import WhyZapledge from '@/components/services/ai-automation/WhyZapledge';
import Outcomes from '@/components/services/ai-automation/Outcomes';
import Faq from '@/components/services/ai-automation/Faq';
import CTA from '@/components/services/ai-automation/CTA';

export const metadata: Metadata = {
  title: aiAutomationMeta.title,
  description: aiAutomationMeta.description,
};

export default function AIAutomationPage() {
  return (
    <main className="w-full min-h-screen bg-white text-[#00003C]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Overview Section */}
      <Overview />

      {/* 3. Capabilities Section */}
      <Capabilities />

      {/* 5. Process / How We Work Section */}
      <Process />

      {/* 6. Why Zapledge / Differentiators Section */}
      <WhyZapledge />

      {/* 7. Outcomes Section */}
      <Outcomes />

      {/* 8. FAQ Section */}
      <Faq />

      {/* 9. Let's Talk CTA Section */}
      <CTA />
    </main>
  );
}
