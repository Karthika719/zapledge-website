import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Zapledge International Pvt Ltd.',
};

export default function TermsPage() {
  return (
    <div className="w-full bg-white min-h-[75vh] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00003C] mb-6">
          Terms of Service
        </h1>
        <p className="text-xs text-[#555555] mb-8">
          Last updated: September 2026
        </p>

        <div className="space-y-6 text-sm text-[#555555] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#00003C] mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website operated by Zapledge International Pvt Ltd, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#00003C] mb-2">2. Intellectual Property</h2>
            <p>
              All trademarks, logos, service marks, and proprietary content displayed on this website are property of Zapledge International Pvt Ltd.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
