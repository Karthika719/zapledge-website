/**
 * About Zapledge page copy. Text is verbatim from the approved brief;
 * do not rewrite, reorder or add claims here.
 */

/** Emphasis applied to one run of text inside a sentence. */
export type Emphasis = 'accent' | 'accentBold' | 'navyBold' | 'navySemibold';

/** A sentence made of plain strings and emphasised runs. */
export type RichText = ReadonlyArray<string | { text: string; emphasis: Emphasis }>;

export interface NumberedItem {
  number: string;
  title: string;
  body: string;
}

export interface AboutFaqItem {
  question: string;
  answer: string;
}

export const CONTACT_URL = 'https://buildit3.com/contact';

export const aboutMeta = {
  title: 'About Zapledge: AI Consulting & Engineering Company',
  description:
    "Zapledge is an AI consulting, engineering, automation, and IoT company based in Kochi, Kerala, founded in 2025. We're a focused team of around 20 people who believe AI should be practical, useful, and aligned with real business needs, not a feature bolted on for its own sake. We're an India-first company, built in Kerala and working across India's growing technology landscape, with plans to extend into the UAE, Saudi Arabia, Qatar, and other GCC markets as we grow.",
} as const;

export const hero = {
  eyebrow: 'About Zapledge',
  title: ['About Zapledge: AI Consulting & ', { text: 'Engineering Company', emphasis: 'accent' }] as RichText,
  statement: ['We engineer ', { text: 'clarity', emphasis: 'accent' }, ' into complexity.'] as RichText,
  body: aboutMeta.description,
  cta: { label: 'Work With Zapledge', href: CONTACT_URL },
} as const;

export const story = {
  title: 'Our Story',
  intro: [
    'Zapledge was built on a simple observation: most software vendors only build what is asked. ',
    { text: "We believe that's not enough.", emphasis: 'accentBold' },
  ] as RichText,
  research: {
    title: ['We Research Before We Build'] as RichText,
    body: [
      "Instead of simply executing requirements, we embed into businesses, research their operations department by department, and uncover the deeper inefficiencies that often go unseen. Especially in industries like manufacturing, where a large share of workflows still operate manually, the real opportunity isn't digitization alone. ",
      { text: "It's intelligent transformation.", emphasis: 'navyBold' },
    ] as RichText,
  },
  elevate: {
    title: [
      'Technology Should ',
      { text: 'Elevate Operations', emphasis: 'accent' },
      ', Not Replicate Inefficiencies',
    ] as RichText,
    body: [
      "We don't just implement systems. We rethink how operations should work in a connected, AI-driven future. As our leadership team puts it: ",
      {
        text: "automation is not about replacing people, it's about removing friction so businesses can operate with confidence, clarity, and control.",
        emphasis: 'navySemibold',
      },
      ' Our role is to make sure technology becomes a ',
      { text: 'multiplier, not a bottleneck.', emphasis: 'accentBold' },
    ] as RichText,
  },
} as const;

export const principles = {
  title: 'Our Principles',
  intro: 'Four principles guide how we approach every engagement, from the first discovery call to long-term support.',
  items: [
    {
      number: '01',
      title: 'Research Before Code',
      body: 'We believe deep operational understanding must come before development. Every solution begins with investigation, not assumption.',
    },
    {
      number: '02',
      title: 'Build Beyond the Brief',
      body: 'Clients come with requirements. We return with expanded vision, advanced features, and strategic opportunities they may not have considered.',
    },
    {
      number: '03',
      title: 'Product-Level Engineering',
      body: 'Every system is built with long-term scalability, reliability, and architectural discipline, even if it starts as a single module.',
    },
    {
      number: '04',
      title: 'Empower Through Clarity',
      body: 'The systems we design give leaders confidence: clear data, clear visibility, clear decisions.',
    },
  ] satisfies NumberedItem[],
} as const;

export const future = {
  title: "Where We're Going",
  intro: [
    'Our long-term mission is to modernize operational industries, especially manufacturing, and introduce structured, intelligent systems where manual chaos still dominates. ',
    { text: "We're building toward three things at once.", emphasis: 'accentBold' },
  ] as RichText,
  items: [
    {
      number: '01',
      title: 'A Global Automation Partner',
      body: 'For ambitious enterprises ready to move beyond point solutions toward connected, intelligent operations.',
    },
    {
      number: '02',
      title: 'An AI-First Engineering Firm',
      body: 'Redefining workflow intelligence rather than treating AI as an add-on feature.',
    },
    {
      number: '03',
      title: 'A Product-Driven Company',
      body: 'Developing next-generation IoT and AI systems built for long-term scale, not just a single engagement.',
    },
  ] satisfies NumberedItem[],
} as const;

export const trustedBy = {
  title: ['Trusted by Businesses ', { text: 'Across India', emphasis: 'accent' }] as RichText,
  body: [
    'We partner with forward-thinking enterprises and growth-stage companies across ',
    { text: 'manufacturing, retail, and construction', emphasis: 'navyBold' },
    ' to deliver scalable AI solutions.',
  ] as RichText,
} as const;

export const testimonial = {
  title: 'What Our Clients Say',
  quote: [
    { text: '“', emphasis: 'accent' },
    'Zapledge helped us ',
    { text: 'cut order-to-fulfilment time in half', emphasis: 'accent' },
    '. The team understood our operations deeply and built something that actually works in the real world.',
    { text: '”', emphasis: 'accent' },
  ] as RichText,
  role: 'Operations Lead, ',
  company: 'Winpro (Manufacturing)',
} as const;

export const aboutFaq = {
  title: 'About Zapledge FAQs',
  items: [
    {
      question: 'Where is Zapledge based?',
      answer:
        "Zapledge International Pvt Ltd is based in Kochi, Kerala, India. We're an India-first company, with plans to extend into the UAE, Saudi Arabia, Qatar, and other GCC markets as we grow.",
    },
    {
      question: 'When was Zapledge founded?',
      answer: 'Zapledge was founded in 2025 as a focused AI consulting, engineering, automation, and IoT company.',
    },
    {
      question: 'How big is the Zapledge team?',
      answer:
        "We're a focused team of around 20 people, small enough to embed deeply with every client, large enough to deliver production-ready systems.",
    },
    {
      question: 'What industries does Zapledge work with?',
      answer:
        'We work across Manufacturing Tech, FinTech, WealthTech, HealthTech, EdTech, MarineTech, Construction Tech, and Retail Tech, with particular depth in manufacturing and operational industries where manual workflows still dominate.',
    },
    {
      question: 'What does Zapledge actually deliver, consulting or working software?',
      answer:
        'Both. Our services span AI Transformation & Consulting, AI Engineering, AI Automation, Custom Software Development, Cloud Migration & DevOps, and Data & Analytics, so we can advise on strategy and build the production system itself.',
    },
    {
      question: 'How do we start working with Zapledge?',
      answer:
        "Tell us the workflow that's slowing your business down. We'll help map the process, identify the automation opportunities, and design the right AI-enabled system around it, starting with a free consultation.",
    },
  ] satisfies AboutFaqItem[],
} as const;

export const finalCta = {
  title: [
    'If Your Ambition Is Global, Your Technology Should Be ',
    { text: 'Ready for It', emphasis: 'accent' },
  ] as RichText,
  body: "We're not here to be another development agency. We're here to modernize operations, introduce intelligence into manual industries, and build systems that help businesses grow without operational friction.",
  cta: { label: 'Discuss Your Domain Architecture', href: CONTACT_URL },
} as const;
