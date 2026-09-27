import { Metadata } from 'next';
import { aiTransformationConsultingMeta } from '@/content/services/ai-transformation-consulting';
import Hero from '@/components/services/ai-transformation-consulting/Hero';
import Overview from '@/components/services/ai-transformation-consulting/Overview';
import Capabilities from '@/components/services/ai-transformation-consulting/Capabilities';
import Process from '@/components/services/ai-transformation-consulting/Process';
import WhyZapledge from '@/components/services/ai-transformation-consulting/WhyZapledge';
import Outcomes from '@/components/services/ai-transformation-consulting/Outcomes';
import Faq from '@/components/services/ai-transformation-consulting/Faq';
import CTA from '@/components/services/ai-transformation-consulting/CTA';

export const metadata: Metadata = {
  title: aiTransformationConsultingMeta.title,
  description: aiTransformationConsultingMeta.description,
};

export default function AITransformationConsultingPage() {
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
