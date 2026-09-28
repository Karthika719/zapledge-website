import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is AI Automation? A Practical Business Guide | Zapledge',
  description:
    "AI automation combines machine learning and automation to handle tasks traditional software can't. Here's what it actually means for your business.",
};

export default function WhatIsAIAutomationPage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-[75vh] pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00003C]">
          What Is AI Automation? A Practical Business Guide
        </h1>
        <p className="text-sm sm:text-base text-[#555555] mt-4">
          This article is currently being prepared for publication.
        </p>
      </div>
    </div>
  );
}
