export const hero = {
  eyebrow: 'Industries → FinTech',
  title: 'AI-Powered FinTech Software & Compliance Automation',
  subheadline: 'Secure digital financial workflows, built for audit, not just speed.',
  description:
    'Zapledge builds the software, automation, and AI systems that connect fintech operations end to end, from onboarding and KYC through payments, lending, and compliance reporting. Every workflow is built with role-based access, audit trails, and human checkpoints in place from day one, so automation strengthens your compliance position instead of working around it.',
  cta: { label: 'Get Free Consultation →', href: 'https://buildit3.com/contact' },
};

export const software = {
  label: "What Zapledge's FinTech Software Includes",
  intro:
    "Fintech operations run on trust as much as they run on transactions. What usually slows a growing fintech down isn't a single broken process, it's onboarding, risk, and compliance all pulling in different directions without a shared system. Here's where we connect them.",
  pillars: [
    {
      title: 'Digital Onboarding',
      body: "Application journeys, KYC document capture, verification integrations, case management, and approval workflows, so a new customer isn't stuck waiting on a manual document check.",
    },
    {
      title: 'Payments & Transaction Operations',
      body: 'Payment orchestration, transaction state tracking, exception handling, settlement support, and reconciliation workflows built to catch mismatches before they become a monthly scramble.',
    },
    {
      title: 'Lending & Credit Workflows',
      body: 'Application intake, eligibility rules, document collection, underwriting support, approval, disbursal, and collections workflows, connected end to end instead of living in separate tools.',
    },
    {
      title: 'Risk & Compliance',
      body: 'Case management, AML/KYC workflow support, rule engines, alerts, evidence trails, and compliance reporting support, built so an auditor can follow the trail without a scramble.',
    },
    {
      title: 'Customer Operations',
      body: 'Service desk, CRM, notifications, dispute and case workflows, and self-service portals, so customer issues get tracked and resolved instead of lost in email.',
    },
  ],
  closing:
    'Together, these five pillars keep onboarding, money movement, lending, and compliance operating as one connected system rather than five tools an ops team has to reconcile by hand.',
};

export const whyChoose = {
  label: 'Why Fintech Teams Choose Zapledge',
  intro:
    "Compliance officers and risk leads don't evaluate a vendor on speed alone, they need to know the system is auditable, documented, and built with controls from the start.",
  title: 'Built With Compliance in Mind, Not Bolted On After',
  body:
    'Every workflow we build includes role-based access, maker-checker approvals, and immutable-style audit logs by default. That means when your compliance team needs to answer “who approved this, and when,” the answer is already in the system, not something someone has to reconstruct from memory or email threads.',
  cta: { label: 'Get Free Consultation →', href: 'https://buildit3.com/contact' },
  controls: [
    {
      label: 'Role-Based Access',
      detail: 'Fine-grained permissions and segregation of duties across all modules.',
    },
    {
      label: 'Maker-Checker Approvals',
      detail: 'Dual authorization for all sensitive approvals, payments, and policy changes.',
    },
    {
      label: 'Immutable Audit Trails',
      detail: 'Tamper-evident logs recording every action, state transition, and decision timestamp.',
    },
  ],
};

export const bottlenecks = {
  title: 'Common FinTech Bottlenecks We Solve',
  intro:
    'These are the problems we hear most often from compliance leads, risk teams, and operations managers before we start working together, and how we address each one.',
  items: [
    {
      title: '“Customers are dropping off during onboarding.”',
      body: "We build multi-step digital onboarding with document capture, verification status tracking, and an AI onboarding assistant that helps customers understand exactly what's needed and why, cutting the confusion that causes people to abandon the process halfway through.",
    },
    {
      title: '“Compliance reporting eats up days every month.”',
      body: "We automate periodic compliance report preparation and give your team natural-language search over approved operational data, so answering a regulator's question doesn't mean pulling records from five different systems by hand.",
    },
    {
      title: '“Reconciliation exceptions pile up faster than we can clear them.”',
      body: 'We set up automated reconciliation support with exception queues and alerts, plus rule-based case assignment by type, risk level, and SLA, so nothing sits unresolved because nobody was assigned to it.',
    },
    {
      title: '“We can\'t tell which transactions are actually risky until it\'s too late.”',
      body: 'We layer in AI-assisted transaction anomaly detection and a fraud investigation copilot that summarizes cases for faster review, so your risk team spends time on the transactions that actually need a human decision, not manually screening everything.',
    },
  ],
  closing:
    "Each of these fixes plugs into the same underlying system, with the same audit trail, so solving one bottleneck doesn't create a new compliance blind spot.",
};

export const moduleIndex = {
  heading: 'What Modules Are Included in a FinTech Build',
  intro:
    'A typical fintech engagement draws from these module groups, scoped to what your operation actually needs rather than deployed all at once.',
  modules: [
    {
      id: 'onboarding-compliance',
      number: '01',
      title: 'Onboarding & Compliance',
      description:
        'Customer onboarding, KYC and verification workflow, and compliance case management, so identity checks and regulatory record-keeping run as one connected process.',
      image: {
        src: '/images/industry-details/fintech/01-onboarding-compliance.webp',
        alt: 'Onboarding & Compliance module preview: KYC verification workflow and compliance case management',
      },
    },
    {
      id: 'lending-risk',
      number: '02',
      title: 'Lending & Risk',
      description:
        'Loan and credit applications, a configurable risk and rule engine, fraud case management, and collections workflow, covering the full credit lifecycle from application to recovery.',
      image: {
        src: '/images/industry-details/fintech/02-lending-risk.webp',
        alt: 'Lending & Risk module preview: loan application pipeline and configurable risk rule engine',
      },
    },
    {
      id: 'payments-operations',
      number: '03',
      title: 'Payments & Operations',
      description:
        'Payments and transaction processing plus reconciliation, built to flag mismatches automatically instead of surfacing them at month-end close.',
      image: {
        src: '/images/industry-details/fintech/03-payments-operations.webp',
        alt: 'Payments & Operations module preview: transaction processing and automated reconciliation ledger',
      },
    },
    {
      id: 'customer-reporting',
      number: '04',
      title: 'Customer & Reporting',
      description:
        'Customer service CRM and finance and management analytics, so support teams and leadership are both working from the same operational picture.',
      image: {
        src: '/images/industry-details/fintech/04-customer-reporting.webp',
        alt: 'Customer & Reporting module preview: customer service CRM and financial analytics dashboard',
      },
    },
  ],
};

export const workflow = {
  title: 'How FinTech Workflow Automation Works',
  intro:
    'We map this against how your operation actually runs, including your existing compliance obligations, before we build anything.',
  steps: [
    {
      title: 'Lead & Application',
      body: "A prospect's application enters the system and routes to the right onboarding flow automatically, based on product type and risk tier.",
    },
    {
      title: 'Identity & Document Collection',
      body: 'KYC documents are captured and verified, with automated reminders sent for anything missing so onboarding doesn\'t stall on a forgotten upload.',
    },
    {
      title: 'Verification & Rule Checks',
      body: 'Identity and eligibility checks run against your configured rules, with results logged for audit before the application moves forward.',
    },
    {
      title: 'Review & Approval',
      body: 'Applications route to the right reviewer with maker-checker approval built in, so no decision is made and confirmed by the same person.',
    },
    {
      title: 'Transaction & Disbursal',
      body: 'Approved transactions or disbursals process through orchestrated payment workflows, with exception handling built in for anything that doesn\'t clear cleanly.',
    },
    {
      title: 'Monitoring & Reconciliation',
      body: 'Transactions are monitored for anomalies and reconciled automatically, with exceptions routed to the right queue instead of sitting unassigned.',
    },
    {
      title: 'Exception Handling & Reporting',
      body: 'Flagged cases move through investigation workflows, and compliance reports generate on schedule, keeping your audit trail current without manual compilation.',
    },
  ],
};

export const faq = {
  label: 'FinTech FAQs',
  headline: 'Frequently Asked Questions About FinTech Software & Automation',
  items: [
    {
      question: 'Will this help us meet regulatory and compliance requirements, not just automate our work?',
      answer:
        'Yes. Every workflow we build includes role-based access, audit trails, maker-checker approvals, and evidence logging by default. Automation is built around your compliance obligations, not layered on top as an afterthought.',
    },
    {
      question: 'Is our customer and transaction data secure, and where is it stored?',
      answer:
        "Data security and residency are core requirements we scope with you upfront, not an afterthought. We'll discuss storage location, access controls, and data handling terms in writing before any project starts, so your compliance team can review them before work begins.",
    },
    {
      question: 'Can Zapledge integrate with our existing core banking, lending, or payment systems instead of replacing them?',
      answer:
        'Yes. We connect at the API and data layer so your existing core systems, payment gateways, or lending platforms stay in place where it makes sense, and we build around the gaps rather than forcing a full replacement.',
    },
    {
      question: 'Does AI make lending or approval decisions on its own?',
      answer:
        'No. AI is used to summarize, flag, and support decisions, underwriting summaries, anomaly signals, document extraction, but final approval decisions stay with your team, with human checkpoints built into the workflow.',
    },
    {
      question: 'How much does a fintech automation project with Zapledge cost?',
      answer:
        "Pricing depends on the modules and scope you need. A single automation, like reconciliation exception handling, costs far less than a full onboarding-to-collections build. We'll give you a clear cost picture before any work starts.",
    },
    {
      question: 'How long does a typical fintech project take?',
      answer:
        'It depends on scope, but we work in phases (discover, prioritize, architect, build) so you see working modules going live before the entire system is finished, and your compliance team can review each phase as it ships.',
    },
    {
      question: 'Can this actually help reduce onboarding drop-off?',
      answer:
        "That's one of the most common reasons fintechs come to us. Faster document capture, clearer verification status, and an AI assistant guiding customers through what's needed all reduce the friction that causes people to abandon onboarding midway.",
    },
    {
      question: 'What happens after launch? Do we need our own team to maintain it?',
      answer:
        "No. Zapledge provides ongoing optimization and support after deployment, so you're not left maintaining a custom system on your own.",
    },
  ],
};

export const cta = {
  label: "Let's Talk",
  headline: "Ready to Fix What's Slowing Down Your Compliance and Ops Teams?",
  body: "Tell us where onboarding, compliance, or reconciliation is slowing your team down. We'll map the process and show you exactly where automation and AI can help, without cutting corners on audit and control.",
  primaryCta: { label: 'Request a Quote →', href: 'https://buildit3.com/contact' },
  emails: ['sales@zapledge.com', 'info@zapledge.com'],
};
