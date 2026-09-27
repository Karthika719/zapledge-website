"use client";

import React, { useState, useRef, useCallback } from 'react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  plainAnswer: string; // for JSON-LD schema
}

const faqData: FAQItem[] = [
  {
    id: '01',
    question: 'What Does Zapledge Do?',
    answer:
      'Zapledge helps businesses identify and solve real business challenges using practical AI solutions across operations, customer service, sales, communication, internal workflows, and more.',
    plainAnswer:
      'Zapledge helps businesses identify and solve real business challenges using practical AI solutions across operations, customer service, sales, communication, internal workflows, and more.',
  },
  {
    id: '02',
    question: "What's The Difference Between AI Automation And AI Engineering?",
    answer: (
      <div className="space-y-4 sm:space-y-6">
        <p>
          AI Engineering is the build layer: designing and developing the AI applications, agents, and systems your business needs.
        </p>
        <p>
          AI Automation is the application layer: using AI capabilities and your existing tools to improve and streamline workflows. Many engagements use both together.
        </p>
      </div>
    ),
    plainAnswer:
      'AI Engineering is the build layer: designing and developing the AI applications, agents, and systems your business needs. AI Automation is the application layer: using AI capabilities and your existing tools to improve and streamline workflows. Many engagements use both together.',
  },
  {
    id: '03',
    question: 'How Do I Know If AI Is The Right Fit For My Business?',
    answer:
      "If you're not sure where AI fits, that's exactly what our AI Transformation & Consulting service is for. We identify practical use cases, assess readiness, and recommend where AI can create real business value before moving into implementation.",
    plainAnswer:
      "If you're not sure where AI fits, that's exactly what our AI Transformation & Consulting service is for. We identify practical use cases, assess readiness, and recommend where AI can create real business value before moving into implementation.",
  },
  {
    id: '04',
    question: "What If Our Data Or Systems Aren't Ready For AI Yet?",
    answer:
      "That's common, and it isn't a blocker. Our AI Readiness & Maturity Assessment evaluates your data, systems, and processes first and recommends the right foundational steps before building more advanced AI solutions.",
    plainAnswer:
      "That's common, and it isn't a blocker. Our AI Readiness & Maturity Assessment evaluates your data, systems, and processes first and recommends the right foundational steps before building more advanced AI solutions.",
  },
  {
    id: '05',
    question: 'Which Industries Does Zapledge Work With?',
    answer:
      'We work across Manufacturing Tech, FinTech, WealthTech, HealthTech, EdTech, MarineTech, Construction, Retail, and other business sectors where AI can create practical value.',
    plainAnswer:
      'We work across Manufacturing Tech, FinTech, WealthTech, HealthTech, EdTech, MarineTech, Construction, Retail, and other business sectors where AI can create practical value.',
  },
  {
    id: '06',
    question: 'Where Is Zapledge Based, And Which Regions Do You Serve?',
    answer:
      'Zapledge is based in Kochi, Kerala, India. We are an India-first company, with plans to expand into the UAE, Saudi Arabia, Qatar, and other GCC markets.',
    plainAnswer:
      'Zapledge is based in Kochi, Kerala, India. We are an India-first company, with plans to expand into the UAE, Saudi Arabia, Qatar, and other GCC markets.',
  },
  {
    id: '07',
    question: 'How Does Zapledge Handle Data Security And Governance?',
    answer:
      'Our AI Governance & Implementation Planning service helps define how AI should be controlled during rollout, including data access, security, human oversight, and phased accountability, so AI is adopted responsibly and effectively.',
    plainAnswer:
      'Our AI Governance & Implementation Planning service helps define how AI should be controlled during rollout, including data access, security, human oversight, and phased accountability, so AI is adopted responsibly and effectively.',
  },
  {
    id: '08',
    question: 'How Do I Get Started?',
    answer: (
      <span>
        Reach out to us at{' '}
        <a
          href="mailto:sales@zapledge.com"
          className="text-[#0033FF] underline underline-offset-4 decoration-[#0033FF]/50 hover:decoration-[#0033FF] transition-colors"
        >
          sales@zapledge.com
        </a>{' '}
        or{' '}
        <a
          href="mailto:info@zapledge.com"
          className="text-[#0033FF] underline underline-offset-4 decoration-[#0033FF]/50 hover:decoration-[#0033FF] transition-colors"
        >
          info@zapledge.com
        </a>
        , and we&apos;ll set up a conversation to understand your business needs.
      </span>
    ),
    plainAnswer:
      "Reach out to us at sales@zapledge.com or info@zapledge.com, and we'll set up a conversation to understand your business needs.",
  },
];

export interface FAQSectionProps {
  items?: FAQItem[];
  heading?: React.ReactNode;
  eyebrow?: string;
  sectionId?: string;
  defaultOpenIndex?: number | null;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  items = faqData,
  heading = <>Frequently Asked Questions About Zapledge&apos;s AI Solutions</>,
  eyebrow = 'FAQs',
  sectionId = 'faq',
  defaultOpenIndex = null,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = items.length;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        buttonRefs.current[(index + 1) % total]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        buttonRefs.current[(index - 1 + total) % total]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        buttonRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        buttonRefs.current[total - 1]?.focus();
        break;
      default:
        break;
    }
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.plainAnswer,
      },
    })),
  };

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className="relative w-full light-section-tint text-[#00003C] py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-[72px] border-b border-[#E5E5E5]/80 overflow-hidden select-none"
    >
      {/* Ambient background light accents matching WhyZapledgeSection */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 -left-40 w-96 h-96 bg-[#0033FF]/[0.03] rounded-full blur-3xl pointer-events-none"
        />
        <div
          className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#00003C]/[0.02] rounded-full blur-3xl pointer-events-none"
        />
      </div>

      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson).replace(/</g, '\\u003c') }}
      />

      {/* Main Centered Max Width Container */}
      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header: Matching Why Zapledge / What We Do / Industries pattern */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-4 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Section Headline */}
          <h2
            id={`${sectionId}-heading`}
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#00003C] tracking-tight leading-[1.18]"
          >
            {heading}
          </h2>
        </div>

        {/* Content Area: Centered on screen */}
        <div className="w-full flex justify-center">
          <div
            className="w-full max-w-3xl flex flex-col space-y-6 sm:space-y-7 lg:space-y-[30px]"
            role="region"
            aria-label="Frequently Asked Questions list"
          >
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const buttonId = `${sectionId}-trigger-${index}`;
              const panelId = `${sectionId}-panel-${index}`;

              return (
                <div
                  key={item.id}
                  className={`relative pl-2 sm:pl-[8px] flex flex-col justify-start transition-all duration-300 ${
                    isOpen ? 'border-l border-solid border-[#00003C]' : 'border-l border-dashed border-[#00003C]/30'
                  }`}
                >
                  {/* Interactive Question Header */}
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFAQ(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="group w-full pt-4 sm:pt-[18px] pb-1 flex items-center justify-between text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0033FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm transition-colors"
                  >
                    <span className="text-[14px] sm:text-[15px] font-bold text-[#00003C] tracking-wider pr-4 leading-snug group-hover:text-[#0033FF] transition-colors">
                      {item.question}
                    </span>

                    {/* Square 20x20px Icon Box with Up/Down Chevron */}
                    <div
                      className={`w-5 h-5 min-w-[20px] border flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:border-[#0033FF] group-hover:text-[#0033FF] ${
                        isOpen ? 'text-[#0033FF] border-[#0033FF]' : 'text-[#00003C] border-[#00003C]/40'
                      }`}
                      aria-hidden="true"
                    >
                      {/* Chevron: points UP when collapsed, rotated 180 (points DOWN) when expanded */}
                      <svg
                        className={`w-[10px] h-[10px] stroke-current stroke-[1.5] fill-none transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        viewBox="0 0 10 10"
                      >
                        <path d="M2 6.5L5 3.5L8 6.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {/* Animated Answer Panel */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-300 ease-out select-text ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-6 sm:mt-8 lg:mt-[50px] pb-4 sm:pb-6'
                        : 'grid-rows-[0fr] opacity-0 mt-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#00003C] leading-snug sm:leading-[1.25] pr-2">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export const FaqSection = FAQSection;
export default FAQSection;
