/**
 * IoT & Intelligent Operations Service Detail Content.
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

export const iotIntelligentOperationsMeta = {
  title: 'IoT & Intelligent Operations Services | Zapledge',
  description:
    'Connect your machines and physical operations to intelligent software, and turn raw signals into real-time visibility and predictive alerts. Zapledge IoT team in Kochi, Kerala.',
} as const;

export const hero = {
  eyebrow: 'Connect & Optimize',
  title: 'IoT & Intelligent Operations Services',
  subheadline:
    'Connect your machines and physical operations to intelligent software, and turn raw signals into real-time visibility and predictive alerts.',
  cta: {
    label: 'Get in Touch',
    href: '/contact',
  },
} as const;

export const overview = {
  label: 'Connect Your Physical Operations to Intelligent Software',
  body: "If you don't know what's happening on your factory floor or with your equipment right now, decisions get made on guesswork instead of data. Zapledge's IoT & Intelligent Operations services connect machines, sensors, and physical environments into software, turning raw signals into real-time visibility, dashboards, and predictive alerts.",
  supporting: 'This is where we start when your challenge depends on machines, sensors, or physical operations.',
} as const;

export const capabilities = {
  label: "What's Included",
  headline: 'IoT, Monitoring & Intelligent Operations Capabilities',
  intro: 'Every deployment draws from the same core capabilities below, combined to match how much of your operation is already connected.',
  items: [
    {
      number: '01',
      title: 'Industrial IoT Solutions',
      body: 'Connecting industrial equipment, sensors, PLCs, and physical assets to digital systems, so operational data is captured and usable instead of living in manual logs.',
      example:
        'Illustrative example: connecting a set of production machines so runtime, downtime, output, and energy data become available digitally. This is illustrative of the outcome, not a completed Zapledge project.',
    },
    {
      number: '02',
      title: 'Connected Machine Systems',
      body: 'Multiple machines or production assets brought into one centralized system, where status and performance can be viewed together instead of checked one by one.',
    },
    {
      number: '03',
      title: 'IoT Data Collection',
      body: 'Structured, real-time capture of data from sensors, equipment, and industrial environments, the foundation that monitoring, dashboards, and predictive intelligence are all built on.',
    },
    {
      number: '04',
      title: 'Real-Time Monitoring',
      body: 'Current operating conditions made visible to your team, without manual checks or phone calls, so issues surface the moment they matter, not after the fact.',
    },
    {
      number: '05',
      title: 'Production & Operations Dashboards',
      body: 'Raw operational data converted into clear KPIs, trends, and management views, showing target versus actual production, utilization, downtime by reason, and orders at risk.',
      example:
        'Illustrative example, relevant to Manufacturing: a dashboard giving an owner, manager, and supervisor each the view they need to make faster decisions. This is illustrative only.',
    },
    {
      number: '06',
      title: 'Equipment & Machine Monitoring',
      body: 'Detailed tracking of individual asset health, utilization, and operating condition, so you know whether a machine is running efficiently or heading toward a problem.',
    },
    {
      number: '07',
      title: 'Predictive Alerts & Intelligence',
      body: 'Moving beyond fixed thresholds by analyzing patterns and trends to catch anomalies and early warning signs, flagging a likely issue before it becomes a breakdown.',
    },
    {
      number: '08',
      title: 'IoT + AI Integration',
      body: 'Physical-world IoT data combined with AI models to detect patterns, predict issues, and recommend actions, connecting machine data with the rest of your operational picture.',
    },
    {
      number: '09',
      title: 'Intelligent Operations Platforms',
      body: 'A central platform unifying machine data, production systems, maintenance, quality, inventory, and AI insights, one connected view instead of scattered systems and spreadsheets.',
    },
  ] as CapabilityBlock[],
} as const;

export const approach = {
  label: 'How We Work',
  headline: 'Our IoT & Intelligent Operations Process',
  intro: "Here's how we take your operations from disconnected to fully visible and predictive.",
  phases: [
    {
      number: '01',
      phase: 'Phase 1',
      title: 'Connect & Collect',
      body: 'We connect your equipment, sensors, and physical assets, and begin capturing structured, real-time data as the foundation for everything else.',
    },
    {
      number: '02',
      phase: 'Phase 2',
      title: 'Monitor & Visualize',
      body: 'We turn that data into real-time monitoring and dashboards your team can actually use, without manual checks or phone calls.',
    },
    {
      number: '03',
      phase: 'Phase 3',
      title: 'Detect & Predict',
      body: 'We layer in AI to catch anomalies and early warning signs, flagging likely issues before they turn into breakdowns.',
    },
    {
      number: '04',
      phase: 'Phase 4',
      title: 'Unify & Optimize',
      body: 'We bring machine data, operations, and AI insights together into one connected platform, so decisions are based on the full picture.',
    },
  ] as ProcessPhase[],
} as const;

export const differentiators = {
  label: 'Why Zapledge',
  headline: 'Why Choose Zapledge for IoT & Intelligent Operations',
  intro: "Here's what makes our approach to connected operations different.",
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
  headline: 'IoT & Intelligent Operations Outcomes',
  intro: "Here's what businesses typically gain from this service.",
  items: [
    {
      number: '01',
      title: 'Lower downtime',
      body: 'Catch equipment and process issues before they turn into breakdowns.',
    },
    {
      number: '02',
      title: 'More visibility',
      body: "Understand exactly what's happening across your machines and operations, in real time.",
    },
    {
      number: '03',
      title: 'Better decisions',
      body: "See what's happening across your business as it happens, instead of relying on guesswork.",
    },
    {
      number: '04',
      title: 'Scalable operations',
      body: 'Start with a few connected machines and expand to a full operations platform as you grow.',
    },
  ] as ServiceOutcome[],
} as const;

export const faq = {
  label: 'FAQs',
  headline: 'Frequently Asked Questions About IoT & Intelligent Operations',
  intro: 'Common questions about connecting your machines and operations to intelligent software.',
  items: [
    {
      question: "What's the difference between IoT & Intelligent Operations and AI Automation?",
      answer:
        'IoT & Intelligent Operations focuses on connecting physical equipment and operations to software, so you get visibility and predictive intelligence from machine data. AI Automation focuses on business workflows and processes, such as documents, approvals, and CRM tasks. The two are often used together: IoT provides the data, automation acts on it.',
    },
    {
      question: 'Do we need to already have sensors installed, or can you help us set that up?',
      answer:
        'We can help with both. Industrial IoT Solutions and IoT Data Collection cover connecting equipment, sensors, and physical assets from the ground up, so operational data becomes available digitally instead of living in manual logs.',
    },
    {
      question: 'Can you connect machines that use different systems or protocols?',
      answer:
        'Connected Machine Systems is built to bring multiple machines and production assets into one centralized system, so status and performance can be viewed together even when the underlying equipment differs.',
    },
    {
      question: 'What kind of alerts can the system generate?',
      answer:
        'Through Real-Time Monitoring and Predictive Alerts & Intelligence, the system can surface current operating conditions immediately and flag abnormal patterns or early warning signs before they turn into a breakdown, rather than waiting for a fixed threshold to be crossed.',
    },
    {
      question: 'Do we need in-house data science expertise to use this?',
      answer:
        'No. Production & Operations Dashboards are built to give an owner, manager, and supervisor each the view they need in plain, actionable terms, without requiring your team to interpret raw data themselves.',
    },
    {
      question: 'Can this integrate with our existing production or business systems?',
      answer:
        'Yes. IoT + AI Integration and Intelligent Operations Platforms are designed to unify machine data with the rest of your operational picture, including production systems, maintenance, quality, and inventory, into one connected view.',
    },
  ] as ServiceFaq[],
} as const;

export const cta = {
  label: "Let's Talk",
  headline: 'Get Started With IoT & Intelligent Operations in Kochi, Kerala',
  body: "Ready to see what's really happening in your operations? Let's talk.",
  supporting:
    "Whether you're connecting a single machine or unifying visibility across multiple sites, Zapledge's IoT and intelligent operations team in Kochi, Kerala can help you find the right starting point and grow from there.",
  primaryCta: {
    label: 'Get in Touch',
    href: '/contact',
  },
  emails: ['sales@zapledge.com', 'info@zapledge.com'],
} as const;
