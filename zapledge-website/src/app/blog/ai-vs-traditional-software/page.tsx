import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI vs Traditional Software: What's Different? | Zapledge",
  description:
    "Traditional software follows fixed rules. AI software learns from data and adapts. Here's what that actually means for your business systems.",
};

export default function AIVsTraditionalSoftwarePage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-[75vh] pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00003C]">
          AI vs Traditional Software: What&apos;s Different?
        </h1>
        <p className="text-sm sm:text-base text-[#555555] mt-4">
          This article is currently being prepared for publication.
        </p>
      </div>
    </div>
  );
}
