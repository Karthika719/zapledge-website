import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Zapledge International Pvt Ltd.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full bg-white min-h-[75vh] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00003C] mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#555555] mb-8">
          Last updated: September 2026
        </p>

        <div className="space-y-6 text-sm text-[#555555] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#00003C] mb-2">1. Overview</h2>
            <p>
              Zapledge International Pvt Ltd (&quot;Zapledge&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and confidentiality of individuals and enterprise clients.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#00003C] mb-2">2. Information We Collect</h2>
            <p>
              We collect information provided directly by you when submitting inquiries or communicating with our team.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#00003C] mb-2">3. Enterprise Data Confidentiality</h2>
            <p>
              Enterprise datasets, models, and architecture designs shared under non-disclosure agreements are handled under strict controls.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
