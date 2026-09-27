"use client";

import React from 'react';
import { FAQSection, FAQItem } from '@/components/FaqSection';
import { faq } from '@/content/services/ai-automation';

export const Faq: React.FC = () => {
  const faqItems: FAQItem[] = faq.items.map((item, index) => ({
    id: String(index + 1).padStart(2, '0'),
    question: item.question,
    answer: item.answer,
    plainAnswer: item.answer,
  }));

  return (
    <FAQSection
      sectionId="ai-automation-faq"
      eyebrow={faq.label}
      heading={faq.headline}
      items={faqItems}
    />
  );
};

export default Faq;
