/**
 * AI Automation Service Detail Content.
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

export const aiAutomationMeta = {
  title: 'AI Automation Services | Zapledge',
  description:
    'Remove the repetitive work slowing your team down, from documents and approvals to everyday follow-ups. Zapledge AI Automation team in Kochi, Kerala.',
} as const;

export const hero = {
  eyebrow: 'Automate',
  title: 'AI Automation Services',
  subheadline:
    'Remove the repetitive work slowing your team down, from documents and approvals to everyday follow-ups.',
  cta: {
    label: 'Get in Touch',
    href: '/contact',
  },
} as const;

export const intro = {
  eyebrow: 'Remove the Repetitive Work Slowing Your Team Down',
  statement:
    "Every business has work that shouldn't need a person doing it manually: data entry, follow-ups, approvals, and moving information between systems.",
  body: "Zapledge's AI Automation services take that repetitive, decision-heavy work off your team's plate, using AI only where real intelligence is needed and keeping people in control where judgment matters.",
  highlights: [
    'using AI only where real intelligence is needed',
    'keeping people in control where judgment matters',
  ],
  note: 'This is where we start when you already know exactly which manual process needs to go.',
} as const;

export const capabilities = {
  label: "What's Included",
  headline: 'Business Process & Workflow Automation Capabilities',
  intro: 'Every automation project draws from the same core capabilities below, combined to match the process you want to fix.',
  items: [
    {
      number: '01',
      title: 'Business Process Automation',
      body: 'We automate multi-step business processes using rules, APIs, and integrations, applying AI only where genuine understanding or judgment is required, not layered on for its own sake.',
    },
    {
      number: '02',
      title: 'AI Workflow Automation',
      body: 'AI used inside your workflows to understand unstructured information, make contextual classifications, and trigger the right next action, turning inboxes and forms into starting points for automated processes.',
      example:
        'Illustrative example: an incoming email automatically understood, classified as a sales enquiry, converted into a CRM lead, and assigned to the right person. This is illustrative of the workflow pattern, not a completed Zapledge project.',
    },
    {
      number: '03',
      title: 'Document & Data Automation',
      body: 'Automated reading, extraction, validation, and data entry from invoices, purchase orders, RFQs, contracts, and forms, with exceptions routed to a person only when they genuinely need review.',
      example:
        'Illustrative example, relevant to FinTech or Manufacturing: a supplier invoice read automatically, matched against a purchase order, and entered into your system, with mismatches flagged. This is illustrative only.',
    },
    {
      number: '04',
      title: 'Intelligent Approvals & Routing',
      body: 'Requests automatically routed to the right approver based on policy, amount, context, and risk, with anomalies flagged before they become costly mistakes.',
    },
    {
      number: '05',
      title: 'CRM & ERP Automation',
      body: 'Repetitive activity removed from your core business systems: automatically creating records, updating statuses, generating follow-up tasks, and connecting the steps that come next.',
    },
    {
      number: '06',
      title: 'AI-Powered Task Automation',
      body: "Individual, recurring tasks such as summaries, reporting, first drafts, comparisons, and routine analysis, automated so your team's time goes toward decisions, not repetition.",
    },
    {
      number: '07',
      title: 'RPA + AI Automation',
      body: 'Robotic process automation combined with AI understanding, especially useful where legacy systems lack modern APIs, so a robot performs the clicks while AI interprets the content and validates the result.',
    },
    {
      number: '08',
      title: 'Workflow Orchestration',
      body: 'Multiple applications, APIs, databases, AI models, and human approvals coordinated as one reliable end-to-end process, with visibility into what happens at every step.',
    },
    {
      number: '09',
      title: 'Operational Automation Solutions',
      body: 'End-to-end automation across an entire operational area, not just a single task, combining workflows, systems, intelligence, and management visibility into one connected solution.',
    },
  ] as CapabilityBlock[],
} as const;

export const approach = {
  label: 'How We Work',
  headline: 'Our AI Automation Process',
  intro: "Here's how we take a manual process from bottleneck to automated, without losing control over what matters.",
  phases: [
    {
      number: '01',
      phase: 'Phase 1',
      title: 'Map the Process',
      body: 'We identify which manual steps, approvals, and handoffs are actually creating delay, before deciding what to automate.',
    },
    {
      number: '02',
      phase: 'Phase 2',
      title: 'Design the Automation',
      body: 'We decide what can run on rules alone, where AI understanding is genuinely needed, and where a person needs to stay in control.',
    },
    {
      number: '03',
      phase: 'Phase 3',
      title: 'Build & Connect',
      body: 'We automate the workflow and connect it across your existing systems, such as CRM, ERP, and document sources, rather than building it in isolation.',
    },
    {
      number: '04',
      phase: 'Phase 4',
      title: 'Monitor & Refine',
      body: 'We track exceptions and results after launch, then use what we learn to refine the workflow or expand automation to the next process.',
    },
  ] as ProcessPhase[],
} as const;

export const differentiators = {
  label: 'Why Zapledge',
  headline: 'Why Choose Zapledge for AI Automation',
  intro: "Here's what makes our approach to business process and workflow automation different.",
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
  headline: 'AI Automation Outcomes',
  intro: "Here's what businesses typically gain from this service.",
  items: [
    {
      number: '01',
      title: 'Faster quotations',
      body: 'Turn multi-day quoting cycles into a matter of hours, not days.',
    },
    {
      number: '02',
      title: 'Fewer manual tasks',
      body: 'Free your team from repetitive data entry and follow-ups.',
    },
    {
      number: '03',
      title: 'Lower cost',
      body: "Reduce operational overhead by automating the steps that don't need a person.",
    },
    {
      number: '04',
      title: 'More visibility',
      body: 'See exactly where a process stands, instead of chasing updates across systems.',
    },
  ] as ServiceOutcome[],
} as const;

export const faq = {
  label: 'FAQs',
  headline: 'Frequently Asked Questions About AI Automation',
  intro: 'Common questions about how our business process and workflow automation works.',
  items: [
    {
      question: "What's the difference between AI Automation and AI Engineering?",
      answer:
        'AI Engineering is the build layer: designing and developing the AI applications, agents, and systems your business needs. AI Automation is the automate layer: using those capabilities and your existing tools to remove repetitive manual work from workflows. Many engagements use both together.',
    },
    {
      question: 'Will automation replace jobs on my team, or just remove repetitive work?',
      answer:
        "Our automation is built to remove repetitive, low-judgment work such as data entry and follow-ups, while keeping people in control wherever approval, judgment, or exceptions genuinely matter. The goal is freeing your team's time, not replacing their decisions.",
    },
    {
      question: 'Can you automate processes that involve our legacy software without modern APIs?',
      answer:
        "Yes. Our RPA + AI Automation service combines robotic process automation for screen-level actions with AI for understanding and validation, which is especially useful when legacy systems don't offer modern APIs to integrate with directly.",
    },
    {
      question: 'Can automation handle unstructured documents like invoices and RFQs?',
      answer:
        'Yes. Document & Data Automation covers reading, extraction, validation, and data entry from invoices, purchase orders, RFQs, contracts, and forms, with anything that genuinely needs a human eye routed for review.',
    },
    {
      question: 'Do you automate CRM and ERP tasks specifically?',
      answer:
        'Yes. CRM & ERP Automation removes repetitive activity from your core business systems: automatically creating records, updating statuses, and generating follow-up tasks across sales, operations, finance, and other functions.',
    },
    {
      question: 'How do approvals stay in human control when a process is automated?',
      answer:
        'Through Intelligent Approvals & Routing, requests are automatically routed to the right approver based on policy, amount, context, and risk, with anomalies flagged for review rather than approved automatically.',
    },
  ] as ServiceFaq[],
} as const;

export const cta = {
  label: "Let's Talk",
  headline: 'Get Started With AI Automation in Kochi, Kerala',
  body: "Which manual process is costing your team the most time? Let's talk about automating it.",
  supporting:
    "Whether you're automating a single manual process or an entire operational workflow, Zapledge's AI automation team in Kochi, Kerala can help you find the right starting point and grow from there.",
  primaryCta: {
    label: 'Get in Touch',
    href: '/contact',
  },
  emails: ['sales@zapledge.com', 'info@zapledge.com'],
} as const;
