export const hero = {
  eyebrow: 'Industries → HealthTech',
  title: 'AI-Powered HealthTech Software & Patient Operations',
  subheadline: 'Administrative support that reduces paperwork, clinical decisions stay with your providers.',
  description:
    'Zapledge builds the software, automation, and AI systems that connect patient registration, scheduling, records, and billing for healthcare organizations. AI is scoped to administrative and operational work, document summarization, scheduling, communication drafts, never to diagnosis or clinical decision-making, which stays entirely with your clinical staff.',
  cta: { label: 'Get Free Consultation →', href: 'https://buildit3.com/contact' },
};

export const software = {
  label: "What Zapledge's HealthTech Software Includes",
  intro:
    "Healthcare operations run on two things at once: patient care and the paperwork that supports it. What usually slows a clinic or provider group down isn't clinical skill, it's registration, records, referrals, and billing living in disconnected systems. Here's where we connect them.",
  pillars: [
    {
      title: 'Patient Experience',
      body: "Registration, appointments, communication, portals, forms, billing support, and service workflows, so a patient's journey doesn't restart at every touchpoint.",
    },
    {
      title: 'Provider Operations',
      body: 'Scheduling, work queues, notes support, referral tracking, care coordination, and operational dashboards, keeping providers focused on patients instead of admin.',
    },
    {
      title: 'Health Records & Documents',
      body: 'Structured records, document management, search, forms, and controlled access, so the right information is findable by the right person, quickly.',
    },
    {
      title: 'Revenue Cycle Support',
      body: 'Eligibility and document workflows, billing support, claims-related tasking, and exception queues, reducing the manual chase behind every claim.',
    },
    {
      title: 'AI & Decision Support',
      body: 'Administrative copilots, document intelligence, summarization, and workflow assistance, always with human review, never replacing clinical judgment.',
    },
  ],
  closing:
    'Together, these five pillars keep patient experience, provider operations, records, and billing connected, so administrative work supports care instead of competing with it for time.',
};

export const clinicalBoundaries = {
  label: 'Where Zapledge Draws the Line on AI in Healthcare',
  intro:
    "AI in healthcare earns trust by staying in its lane. Here's how we scope it on every build.",
  title: 'Administrative Support, Not Clinical Decisions',
  body:
    'Every AI capability we build, document summarization, scheduling assistance, communication drafts, call summarization, is scoped to administrative and operational work. Diagnosis, treatment decisions, and clinical judgment stay entirely with your providers. Nothing we build makes a clinical call on its own.',
  cta: { label: 'Get Free Consultation →', href: 'https://buildit3.com/contact' },
  principles: [
    {
      label: 'Strict Administrative Scope',
      detail: 'Automations handle intake, scheduling, billing queues, and routine communication drafts only.',
    },
    {
      label: 'Provider-Owned Care',
      detail: 'Diagnostic evaluations, treatment plans, and prescription orders remain 100% human clinician calls.',
    },
    {
      label: 'Data Privacy & Audit Trails',
      detail: 'Role-based access, HIPAA-aligned security protocols, and immutable access logging on all patient records.',
    },
  ],
};

export const bottlenecks = {
  title: 'Common HealthTech Bottlenecks We Solve',
  intro:
    'These are the problems we hear most often from practice administrators, providers, and front-office teams before we start working together, and how we address each one.',
  items: [
    {
      title: '“Patients wait too long, and referrals get lost between departments.”',
      body: 'We automate appointment reminders and confirmations plus referral follow-up sequences, so a referral moves forward automatically instead of depending on someone remembering to chase it.',
    },
    {
      title: '“Our staff spend hours on documentation instead of patients.”',
      body: 'We build document summarization and structured extraction into the workflow, plus an administrative copilot for routine notes and call summaries, cutting the paperwork load without touching clinical documentation itself.',
    },
    {
      title: '“Billing and claims paperwork keeps piling up.”',
      body: 'We route billing exceptions automatically and generate administrative reports on schedule, so claims issues get flagged and assigned instead of sitting in a queue nobody owns.',
    },
    {
      title: '“We can\'t quickly find information across patient records.”',
      body: 'We build natural-language search over authorized records, so staff can find what they need in seconds instead of digging through folders or asking around.',
    },
  ],
  closing:
    'Each of these fixes plugs into the same underlying system, with access controls and audit trails built in, so faster administration never comes at the cost of patient data protection.',
};

export const moduleIndex = {
  heading: 'What Modules Are Included in a HealthTech Build',
  intro:
    'A typical healthtech engagement draws from these module groups, scoped to what your organization actually needs rather than deployed all at once.',
  modules: [
    {
      id: 'patient-experience',
      number: '01',
      title: 'Patient Experience',
      description:
        'Patient onboarding, patient portal, and CRM and service desk, so patients have one consistent way to interact with your organization.',
      image: {
        src: '/images/industry-details/manufacturing-tech/01-sales-customer-operations.webp',
        alt: 'Patient Experience module preview: digital registration, patient portal, and support desk',
      },
    },
    {
      id: 'provider-scheduling',
      number: '02',
      title: 'Provider & Scheduling',
      description:
        'Provider portal, appointment and scheduling, and referral workflow, keeping provider time and referral status visible in one place.',
      image: {
        src: '/images/industry-details/manufacturing-tech/02-production-planning.webp',
        alt: 'Provider & Scheduling module preview: multi-specialty calendar and referral tracking queue',
      },
    },
    {
      id: 'records-revenue',
      number: '03',
      title: 'Records & Revenue',
      description:
        'Medical document management and billing and claims support workflow, connecting clinical documentation and revenue cycle work.',
      image: {
        src: '/images/industry-details/manufacturing-tech/04-quality-dispatch.webp',
        alt: 'Records & Revenue module preview: structured document management and claims exception pipeline',
      },
    },
    {
      id: 'operations-visibility',
      number: '04',
      title: 'Operations Visibility',
      description:
        'Inventory and pharmacy operations support plus operations analytics, giving administrators a clear view of the organization beyond patient care alone.',
      image: {
        src: '/images/industry-details/manufacturing-tech/05-management-visibility.webp',
        alt: 'Operations Visibility module preview: clinic throughput, pharmacy inventory, and resource metrics',
      },
    },
  ],
};

export const workflow = {
  title: 'How HealthTech Workflow Automation Works',
  intro:
    'We map this against how your organization actually operates, including your existing data protection obligations, before we build anything.',
  steps: [
    {
      title: 'Registration & Intake',
      body: "A patient's registration and intake information enters the system once and flows through to scheduling, records, and billing automatically.",
    },
    {
      title: 'Appointment & Referral',
      body: 'Appointments and referrals are scheduled and tracked, with automated reminders reducing no-shows and follow-up sequences keeping referrals moving.',
    },
    {
      title: 'Document Capture',
      body: 'Forms and documents are captured and tagged for search, with missing-document alerts sent before a gap becomes a delay.',
    },
    {
      title: 'Provider & Operations Workflow',
      body: 'Provider work queues and care coordination tasks are routed by specialty, team, or SLA, so nothing waits on someone remembering to assign it.',
    },
    {
      title: 'Service Delivery',
      body: 'Care is delivered with administrative support running in the background, scheduling, notes support, and communication, not in the clinical decision itself.',
    },
    {
      title: 'Billing & Follow-Up',
      body: 'Claims and billing move through exception queues automatically, with discharge or service follow-up workflows keeping patients informed.',
    },
    {
      title: 'Reporting',
      body: 'Administrative and operational reports generate on schedule, giving leadership visibility without pulling staff off patient-facing work.',
    },
  ],
};

export const faq = {
  label: 'HealthTech FAQs',
  headline: 'Frequently Asked Questions About HealthTech',
  items: [
    {
      question: 'Does this AI make diagnostic or clinical decisions?',
      answer:
        'No. Every AI capability we build is scoped to administrative and operational work, scheduling, document summarization, communication drafts. Diagnosis and clinical decisions stay entirely with your providers, with human review built into every workflow that touches patient care.',
    },
    {
      question: 'Is patient data kept private and secure?',
      answer:
        "Yes. Access is scoped by role, and we discuss data storage, access controls, and data protection terms in writing before any project starts, so your team can review them against your organization's regulatory obligations upfront.",
    },
    {
      question: 'Can Zapledge integrate with our existing patient records or EHR system?',
      answer:
        'Yes. We connect at the API and data layer so your existing patient records, EHR, or billing systems stay in place where it makes sense, and we build around the gaps rather than forcing a full replacement.',
    },
    {
      question: 'Will this actually reduce staff paperwork, or just add another tool?',
      answer:
        'The goal is the former. Automated reminders, document summarization, and administrative copilots are built to cut the manual documentation and follow-up load, not add a new system your staff has to maintain on top of everything else.',
    },
    {
      question: 'How much does a healthtech automation project with Zapledge cost?',
      answer:
        "Pricing depends on the modules and scope you need. A single automation, like appointment reminders or referral tracking, costs far less than a full patient-to-billing build. We'll give you a clear cost picture before any work starts.",
    },
    {
      question: 'How long does a typical healthtech project take?',
      answer:
        'It depends on scope, but we work in phases (discover, prioritize, architect, build) so you see working modules going live before the entire system is finished, rather than waiting months for a single launch.',
    },
    {
      question: 'Does this work for a single clinic, or only large hospital networks?',
      answer:
        'Both. The same modules, registration, scheduling, records, billing, scale down to a single clinic just as well as they scale up across a multi-location provider group.',
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
  headline: 'Ready to Reduce the Administrative Load on Your Team?',
  body: 'Tell us where scheduling, records, or billing is slowing your team down. We\'ll map the process and show you exactly where automation and AI can help, with clinical decisions always staying with your providers.',
  primaryCta: { label: 'Request a Quote →', href: 'https://buildit3.com/contact' },
  emails: ['sales@zapledge.com', 'info@zapledge.com'],
};
