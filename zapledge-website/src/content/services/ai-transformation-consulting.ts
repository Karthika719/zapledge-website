/**
 * AI Transformation & Consulting Service Detail Content.
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

export const aiTransformationConsultingMeta = {
  title: 'AI Transformation & Consulting Services | Zapledge',
  description:
    'From AI strategy to business transformation: identify where AI creates value, and build a practical, measurable path to adoption. Zapledge AI consulting team in Kochi, Kerala.',
} as const;

export const hero = {
  eyebrow: 'Advise & Transform',
  title: 'AI Transformation & Consulting Services',
  subheadline:
    'From AI strategy to business transformation: identify where AI creates value, and build a practical, measurable path to adoption.',
  cta: {
    label: 'Get in Touch',
    href: '/contact',
  },
} as const;

export const overview = {
  label: 'From AI Strategy to Business Transformation',
  body: "You know AI can improve how your business runs, but knowing where to start, what's realistic, and how to get your organization ready is the harder part. Zapledge's AI Transformation & Consulting services combine strategic advice with practical, hands-on transformation, helping you understand where AI creates value, prepare the right foundations, redesign how work happens, and implement AI in a structured, measurable way.",
  supporting:
    'This is where most engagements begin, especially for businesses that want a company-wide AI journey rather than a single tool.',
} as const;

export const capabilities = {
  label: "What's Included",
  headline: 'AI Strategy, Readiness & Transformation Capabilities',
  intro: 'Every engagement draws from the same core capabilities below, combined to match where your business is starting from.',
  items: [
    {
      number: '01',
      title: 'AI Transformation Strategy',
      body: 'We study your business and define a clear, business-aligned direction for AI, not a random list of technologies. Our strategy work answers where AI can create the most value, which departments or processes to prioritize, and what leadership should expect at each stage.',
      example:
        'Illustrative example: for a manufacturing business, this might mean phasing in quotation automation, production intelligence, inventory forecasting, and predictive maintenance in a sequence that matches operational priorities. This is illustrative of our methodology, not a completed Zapledge project.',
    },
    {
      number: '02',
      title: 'AI Readiness & Maturity Assessment',
      body: 'Before recommending any AI initiative, we assess whether your data, systems, processes, infrastructure, and team are actually ready to support it, so you build on solid ground instead of a premature promise.',
    },
    {
      number: '03',
      title: 'AI Use-Case Discovery',
      body: 'We systematically identify the real business problems AI can solve inside your organization, then prioritize them by impact, feasibility, and ROI, so early efforts land on the opportunities most likely to succeed.',
    },
    {
      number: '04',
      title: 'AI Strategy & Consulting',
      body: 'Expert guidance on where and how AI can support your goals: whether to build or buy, what to automate first, and how AI can fit into the software you already use, without pushing unnecessary complexity.',
    },
    {
      number: '05',
      title: 'Business Process Redesign',
      body: 'Automating a broken process just makes it broken faster. We redesign workflows around AI, automation, and better decision paths so the underlying process becomes genuinely faster and simpler, not just digitized.',
    },
    {
      number: '06',
      title: 'AI Feasibility Assessment',
      body: 'Before you invest significantly, we evaluate whether an AI idea is technically, operationally, financially, and data-wise realistic, so you invest with confidence, not guesswork.',
    },
    {
      number: '07',
      title: 'AI Technology Advisory',
      body: "Choosing between models, platforms, and architectures shouldn't be a guessing game. We advise on the right technology decisions, including cloud versus private deployment, integration approach, and cost-versus-performance trade-offs, matched to your requirements.",
    },
    {
      number: '08',
      title: 'AI Adoption & Implementation Planning',
      body: 'We turn AI ambitions into a phased, practical plan, with priorities, dependencies, timelines, owners, training needs, and measurable outcomes for the next 3, 6, and 12 months.',
    },
    {
      number: '09',
      title: 'Enterprise AI Adoption',
      body: "Technology succeeding in a pilot means little if teams don't actually use it. We help drive adoption across departments through training, governance, integration, and change management, so AI becomes part of daily work rather than a side project.",
    },
    {
      number: '10',
      title: 'AI Consulting for Manufacturing',
      body: 'Applying AI consulting specifically to manufacturing challenges: production planning, quality, maintenance, inventory, procurement, and supply chain visibility.',
      example:
        'Illustrative example: a manufacturer facing production delays may benefit less from advanced prediction and more from better shop-floor visibility and earlier material-shortage detection. This kind of practical diagnosis is what this service is built around, and is illustrative rather than a completed Zapledge project.',
    },
    {
      number: '11',
      title: 'AI Consulting for SMEs & Mid-Market Businesses',
      body: 'We tailor our approach for smaller teams, tighter budgets, and simpler tech stacks, helping you find the smallest high-value starting point without over-engineering the solution.',
    },
    {
      number: '12',
      title: 'AI Transformation Roadmap',
      body: 'A structured, phased plan connecting your business priorities, AI use cases, technology, process changes, adoption activities, investment, and expected outcomes, so transformation happens in a sequence that makes sense.',
    },
    {
      number: '13',
      title: 'AI ROI & Value Assessment',
      body: "We help measure whether AI is genuinely creating value, using before-and-after metrics on cost, productivity, cycle time, and error reduction, so you know what's working and what deserves further investment.",
    },
    {
      number: '14',
      title: 'AI Governance & Implementation Planning',
      body: 'Defining how AI should be controlled and rolled out: policies, security, data access, human oversight, and phased KPIs, so your organization scales AI responsibly.',
    },
  ] as CapabilityBlock[],
} as const;

export const approach = {
  label: 'How We Work',
  headline: 'Our AI Consulting & Transformation Process',
  intro: 'Consulting engagements may end at Plan. Transformation engagements continue through implementation, adoption, and scale.',
  phases: [
    {
      number: '01',
      phase: 'Phase 1',
      title: 'Understand & Assess',
      body: 'We start by understanding your business and assessing your current readiness: your data, systems, processes, and team, so any recommendation is grounded in reality, not assumptions.',
    },
    {
      number: '02',
      phase: 'Phase 2',
      title: 'Recommend & Plan',
      body: 'We recommend the right direction for your business and turn it into a practical, phased plan, with clear priorities, timelines, and expected outcomes.',
    },
    {
      number: '03',
      phase: 'Phase 3',
      title: 'Redesign & Implement',
      body: 'Where transformation is needed, we redesign the underlying workflow around AI and automation, then implement the change in your business, not just on paper.',
    },
    {
      number: '04',
      phase: 'Phase 4',
      title: 'Adopt, Measure & Scale',
      body: "We help drive adoption across your team, measure the results against real before-and-after metrics, and scale what's working to the next phase of your roadmap.",
    },
  ] as ProcessPhase[],
} as const;

export const differentiators = {
  label: 'Why Zapledge',
  headline: 'Why Choose Zapledge for AI Transformation & Consulting',
  intro: "Here's what makes our approach to AI transformation and consulting different.",
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
  headline: 'AI Transformation & Consulting Outcomes',
  intro: "Here's what businesses typically gain from this service.",
  items: [
    {
      number: '01',
      title: 'Better decisions',
      body: "See what's happening across your business as it happens, instead of relying on guesswork.",
    },
    {
      number: '02',
      title: 'Lower cost',
      body: 'Reduce operational overhead by prioritizing the AI initiatives that actually move the needle.',
    },
    {
      number: '03',
      title: 'Scalable operations',
      body: 'Build a roadmap that grows with your business instead of locking you into a single tool.',
    },
    {
      number: '04',
      title: 'Measurable business growth',
      body: 'Track real impact through clear, before-and-after metrics, not vague promises.',
    },
  ] as ServiceOutcome[],
} as const;

export const faq = {
  label: 'FAQs',
  headline: 'Frequently Asked Questions About AI Transformation & Consulting',
  intro: 'Common questions about how our AI transformation and consulting engagements work.',
  items: [
    {
      question: 'What is the difference between AI consulting and AI transformation?',
      answer:
        'AI consulting focuses on understanding your business, assessing options, and recommending a direction, sometimes ending with recommendations alone. AI transformation goes further: it includes redesigning processes, implementing the change, driving adoption, and measuring results over time.',
    },
    {
      question: 'Do I need to know exactly what AI solution I want before contacting Zapledge?',
      answer:
        "No. If you're not sure where to start, that's exactly what this service is for. We typically begin with a readiness assessment and use-case discovery to identify the right opportunities before recommending any specific solution.",
    },
    {
      question: 'What happens during an AI readiness assessment?',
      answer:
        'We evaluate your data, systems, processes, infrastructure, and team readiness to identify what foundation needs to be in place before any AI initiative can succeed, and recommend the practical next steps.',
    },
    {
      question: 'Can small and mid-sized businesses benefit from AI consulting?',
      answer:
        "Yes. Our approach for SMEs and mid-market businesses is built around practical, cost-conscious starting points, avoiding over-engineered solutions that don't match your team's size or budget.",
    },
    {
      question: 'How long does an AI transformation roadmap take to build?',
      answer: '[NEEDS CLIENT INPUT: typical engagement timelines]',
    },
    {
      question: 'How is progress or success measured?',
      answer:
        'Through our AI ROI & Value Assessment service, we track before-and-after metrics such as cost, productivity, cycle time, and error reduction, so you can see whether an initiative is creating real value.',
    },
  ] as ServiceFaq[],
} as const;

export const cta = {
  label: "Let's Talk",
  headline: 'Get Started With AI Transformation & Consulting in Kochi, Kerala',
  body: "Whether you know exactly what you need or you're still figuring out where AI fits, we're happy to have that conversation.",
  supporting:
    "Whether you're exploring AI consulting for the first time or ready to build a full AI transformation roadmap, Zapledge's team in Kochi, Kerala can help you find the right starting point and grow from there.",
  primaryCta: {
    label: 'Get in Touch',
    href: '/contact',
  },
  emails: ['sales@zapledge.com', 'info@zapledge.com'],
} as const;
