import { Metadata } from 'next';
import { iotIntelligentOperationsMeta } from '@/content/services/iot-intelligent-operations';
import Hero from '@/components/services/iot-intelligent-operations/Hero';
import Overview from '@/components/services/iot-intelligent-operations/Overview';
import Capabilities from '@/components/services/iot-intelligent-operations/Capabilities';
import Process from '@/components/services/iot-intelligent-operations/Process';
import WhyZapledge from '@/components/services/iot-intelligent-operations/WhyZapledge';
import Outcomes from '@/components/services/iot-intelligent-operations/Outcomes';
import Faq from '@/components/services/iot-intelligent-operations/Faq';
import CTA from '@/components/services/iot-intelligent-operations/CTA';

export const metadata: Metadata = {
  title: iotIntelligentOperationsMeta.title,
  description: iotIntelligentOperationsMeta.description,
};

export default function IoTIntelligentOperationsPage() {
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
