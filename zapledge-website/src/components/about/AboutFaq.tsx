import FAQSection, { type FAQItem } from '@/components/FaqSection';
import { aboutFaq } from '@/content/about';

const items: FAQItem[] = aboutFaq.items.map((item, i) => ({
  id: String(i + 1).padStart(2, '0'),
  question: item.question,
  answer: item.answer,
  plainAnswer: item.answer,
}));

/** The homepage FAQ accordion (and its FAQPage JSON-LD) with About data. */
export default function AboutFaq() {
  return <FAQSection items={items} heading={aboutFaq.title} sectionId="about-faq" defaultOpenIndex={0} />;
}
