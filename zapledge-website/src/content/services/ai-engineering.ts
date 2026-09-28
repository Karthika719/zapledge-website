/**
 * AI Engineering Service Detail Content.
 * Text is verbatim from the approved brief; do not rewrite, paraphrase, or add claims here.
 */

export interface CapabilityBlock {
  number: string;
  title: string;
  body: string;
  example?: string;
}

export interface ProcessPhase {
  number: string;
  phase: string;
  title: string;
  body: string;
}

export interface DifferentiatorFeature {
  number: string;
  title: string;
  body: string;
}

export interface ServiceOutcome {
  number: string;
  title: string;
  body: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export const aiEngineeringMeta = {
  title: 'AI Engineering Services | Zapledge',
  description:
    'Design and build production-ready AI applications, agents, and systems that work with your real data and existing workflows. Zapledge AI Engineering team in Kochi, Kerala.',
} as const;

export const hero = {
  eyebrow: 'Build',
  title: 'AI Engineering Services',
  subheadline:
    'Design and build production-ready AI applications, agents, and systems that work with your real data and existing workflows.',
  cta: {
    label: 'Get in Touch',
    href: '/contact',
  },
} as const;

export const intro = {
  eyebrow: 'Building Production-Ready AI for Real Business Workflows',
  statement:
    'Once you know the AI capability you need, someone has to build it: securely, at the right scale, and connected to the systems you already run on.',
  body: "Zapledge's AI Engineering team designs and builds the applications, agents, integrations, and data infrastructure that turn an AI idea into working software.",
  note: 'This is where we start when you already have a defined AI product or system requirement.',
} as const;

export const capabilities = {
  label: "What's Included",
  headline: 'AI Application, Agent & Systems Engineering Capabilities',
  intro: "Every build draws from the same core capabilities below, combined to match what you're trying to create.",
  items: [
    {
      number: '01',
      title: 'AI Application Development',
      body: 'We design and develop complete software applications where AI is a core capability, not an add-on chat box, built around the end-to-end user experience and workflow your business actually needs.',
      example:
        'Illustrative example: an AI quotation application that accepts an RFQ, extracts specifications, checks historical pricing, and prepares a draft estimate for review. This is illustrative of the kind of system we build, not a completed Zapledge project.',
    },
    {
      number: '02',
      title: 'AI Agent Development',
      body: 'We build controlled AI agents that reason over your data, use approved tools, and take actions within defined boundaries, with clear rules on what they can access and where human approval is required.',
    },
    {
      number: '03',
      title: 'Generative AI Solutions',
      body: 'Generative AI applied to your business content: documents, reports, responses, and knowledge, to accelerate reading, writing, summarizing, and analysis that would otherwise take hours.',
      example:
        'Illustrative example, relevant to WealthTech or FinTech businesses: extracting deadlines, terms, and risk factors from a lengthy contract or report into a structured summary for faster review. This is illustrative only.',
    },
    {
      number: '04',
      title: 'Enterprise AI Systems',
      body: 'Larger AI systems that connect departments, data sources, and applications, with security, role-based access, and shared intelligence built in from the start, not bolted on afterward.',
    },
    {
      number: '05',
      title: 'AI Workflow Systems',
      body: 'Software workflows that combine AI understanding, business rules, system actions, and human approvals, so intelligence and control work together rather than in isolation.',
    },
    {
      number: '06',
      title: 'AI API & Model Integrations',
      body: 'Rather than rebuilding from scratch, we integrate the right AI models and APIs into your existing applications, balancing capability, cost, security, and latency for your specific use case.',
    },
    {
      number: '07',
      title: 'AI Data Pipelines & Knowledge Systems',
      body: "The ingestion, cleaning, indexing, and access-control layer that gives AI reliable access to your company's information, so answers are grounded in your actual data, with source references your team can trust.",
      example:
        'Illustrative example, relevant to HealthTech or Manufacturing: connecting product documents, SOPs, manuals, and historical records into a system employees can query directly. This is illustrative only.',
    },
    {
      number: '08',
      title: 'Custom AI Software Development',
      body: "Bespoke AI software built around a problem, industry process, or competitive advantage unique to your business, when an off-the-shelf tool simply won't fit.",
    },
    {
      number: '09',
      title: 'AI System Integration',
      body: 'We connect new AI capability to the systems you already rely on: ERP, CRM, databases, cloud platforms, IoT, or legacy software, so AI isn\'t isolated from the rest of your operations.',
    },
  ] as CapabilityBlock[],
} as const;

export const approach = {
  label: 'How We Work',
  headline: 'Our AI Engineering Process',
  intro: "From architecture to production, here's how we take an AI system from idea to something your team actually uses.",
  phases: [
    {
      number: '01',
      phase: 'Phase 1',
      title: 'Design & Architect',
      body: 'We define the system architecture, data flows, and technology choices upfront, so the build is grounded in your real requirements and constraints, not assumptions.',
    },
    {
      number: '02',
      phase: 'Phase 2',
      title: 'Build & Integrate',
      body: 'We develop the application, agent, or system, and connect it to your existing ERP, CRM, or data sources, rather than building it as an isolated tool.',
    },
    {
      number: '03',
      phase: 'Phase 3',
      title: 'Test & Validate',
      body: 'We validate the system against real data and real workflows before rollout, so what launches actually reflects how your business works.',
    },
    {
      number: '04',
      phase: 'Phase 4',
      title: 'Deploy & Support',
      body: 'We launch the system into production and provide ongoing integration support as your data, tools, and requirements evolve.',
    },
  ] as ProcessPhase[],
} as const;

export const differentiators = {
  label: 'Why Zapledge',
  headline: 'Why Choose Zapledge for AI Engineering',
  intro: "Here's what makes our approach to AI application and systems engineering different.",
  features: [
    {
      number: '01',
      title: 'Customized, not one-size-fits-all',
      body: 'We understand your business processes before recommending a solution.',
    },
    {
      number: '02',
      title: 'Industry-aware',
      body: 'Solutions shaped for the realities of Manufacturing, FinTech, WealthTech, HealthTech, and beyond.',
    },
    {
      number: '03',
      title: 'Practical over trendy',
      body: 'We focus on measurable improvements, not AI for its own sake.',
    },
    {
      number: '04',
      title: 'Built to scale',
      body: 'Solutions designed to grow alongside your business.',
    },
    {
      number: '05',
      title: 'End-to-end capability',
      body: 'Strategy, engineering, automation, and connected operations, under one team.',
    },
  ] as DifferentiatorFeature[],
} as const;

export const outcomes = {
  label: 'Outcomes',
  headline: 'AI Engineering Outcomes',
  intro: "Here's what businesses typically gain from this service.",
  items: [
    {
      number: '01',
      title: 'Better decisions',
      body: 'Systems grounded in your real data give your team something reliable to act on, not a guess.',
    },
    {
      number: '02',
      title: 'Scalable operations',
      body: 'Applications and integrations built to grow with your business, not systems you outgrow in a year.',
    },
    {
      number: '03',
      title: 'Lower cost',
      body: 'The right-sized build, whether that\'s integrating an existing model or building something custom, avoids paying for complexity you don\'t need.',
    },
    {
      number: '04',
      title: 'More visibility',
      body: 'Connected systems and knowledge pipelines mean information stops living in silos across your business.',
    },
  ] as ServiceOutcome[],
} as const;

export const faq = {
  label: 'FAQs',
  headline: 'Frequently Asked Questions About AI Engineering',
  intro: 'Common questions about how our AI application and systems engineering work.',
  items: [
    {
      question: "What's the difference between AI Engineering and AI Automation?",
      answer:
        'AI Engineering is the build layer: designing and developing the AI applications, agents, and systems your business needs. AI Automation is the automate layer: using those capabilities and your existing tools to remove repetitive manual work from workflows. Many engagements use both together.',
    },
    {
      question: 'Do you build custom AI applications, or just integrate existing tools?',
      answer:
        'Both, depending on what fits. We integrate leading AI models and APIs into your existing applications where that\'s the faster, more cost-effective path, and build custom AI software when your process or requirements are unique enough to justify it.',
    },
    {
      question: 'Can you connect a new AI system to our existing ERP or CRM?',
      answer:
        'Yes. AI System Integration is a core part of this service: connecting new AI capability to the systems you already rely on, including ERP, CRM, databases, cloud platforms, IoT, and legacy software, so AI isn\'t isolated from the rest of your operations.',
    },
    {
      question: 'Do you build AI agents that can take actions, or just answer questions?',
      answer:
        'We build both. Our AI Agent Development service covers agents that reason over your data and take actions within clearly defined boundaries, with rules on what they can access and where human approval is required before anything happens.',
    },
    {
      question: 'How do you handle our company data when building an AI system?',
      answer:
        'Through AI Data Pipelines & Knowledge Systems, we build the ingestion, cleaning, indexing, and access-control layer that gives AI reliable access to your information, so answers are grounded in your actual data with source references your team can trust.',
    },
    {
      question: 'Can you integrate AI models like GPT or Gemini into our existing software?',
      answer:
        'Yes. AI API & Model Integrations is one of our core capabilities: integrating the right AI models and APIs into your existing applications rather than rebuilding from scratch, balanced against your requirements for cost, security, and latency.',
    },
  ] as ServiceFaq[],
} as const;

export const cta = {
  label: "Let's Talk",
  headline: 'Get Started With AI Engineering in Kochi, Kerala',
  body: "Have an AI system in mind? Let's talk about how to build it right.",
  supporting:
    "Whether you need a single AI application built or a full enterprise AI system engineered from the ground up, Zapledge's AI engineering team in Kochi, Kerala can help you find the right starting point and grow from there.",
  primaryCta: {
    label: 'Get in Touch',
    href: '/contact',
  },
  emails: ['sales@zapledge.com', 'info@zapledge.com'],
} as const;
