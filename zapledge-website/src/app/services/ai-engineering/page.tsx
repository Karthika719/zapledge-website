import { Metadata } from 'next';
import { aiEngineeringMeta } from '@/content/services/ai-engineering';
import Hero from '@/components/services/ai-engineering/Hero';
import Overview from '@/components/services/ai-engineering/Overview';
import Capabilities from '@/components/services/ai-engineering/Capabilities';
import Process from '@/components/services/ai-engineering/Process';
import WhyZapledge from '@/components/services/ai-engineering/WhyZapledge';
import Outcomes from '@/components/services/ai-engineering/Outcomes';
import Faq from '@/components/services/ai-engineering/Faq';
import CTA from '@/components/services/ai-engineering/CTA';

export const metadata: Metadata = {
  title: aiEngineeringMeta.title,
  description: aiEngineeringMeta.description,
};

export default function AIEngineeringPage() {
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
