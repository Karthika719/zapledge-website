"use client";

import React from 'react';
import { FAQSection, FAQItem } from '@/components/FaqSection';
import { faq } from '@/content/industries/construction';

export const Faq: React.FC = () => {
  const faqItems: FAQItem[] = faq.items.map((item, index) => ({
    id: String(index + 1).padStart(2, '0'),
    question: item.question,
    answer: item.answer,
    plainAnswer: item.answer,
  }));

  return (
    <FAQSection
      sectionId="construction-faq"
      eyebrow={faq.label}
      heading={faq.headline}
      items={faqItems}
    />
  );
};

export default Faq;
