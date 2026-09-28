'use client';

import { useState } from 'react';
import type { FAQItem } from '@/content/blog';

export default function BlogFaqAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      id="faqs"
      aria-labelledby="faq-section-heading"
      className="scroll-mt-28 my-12"
    >
      <h2
        id="faq-section-heading"
        className="text-2xl sm:text-[28px] font-extrabold text-[#00003C] tracking-tight mb-6"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#0033FF]/40 bg-white shadow-md shadow-[#0033FF]/5'
                  : 'border-[#E5E5E5] bg-white hover:border-[#0033FF]/30'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0033FF]"
              >
                <span className="text-base sm:text-lg font-bold text-[#00003C] leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? 'bg-[#0033FF] text-white rotate-180'
                      : 'bg-[#FAFAFA] text-[#00003C] border border-[#E5E5E5]'
                  }`}
                  aria-hidden="true"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  className="px-5 pb-6 sm:px-6 sm:pb-7 text-[#555555] text-[15.5px] leading-relaxed border-t border-[#E5E5E5]/70 pt-4"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
