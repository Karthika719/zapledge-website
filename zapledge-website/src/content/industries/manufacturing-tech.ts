export const hero = {
  eyebrow: 'Industries → Manufacturing Tech',
  title: 'AI-Powered Manufacturing Software & Automation',
  subheadline: 'Connected operations, engineered for clarity, from enquiry to dispatch.',
  description:
    "Zapledge builds the software, automation, and AI systems that connect manufacturing operations end to end, from enquiry and production planning through quality control and dispatch. Instead of running your factory across disconnected spreadsheets, ERPs, and WhatsApp updates, you get one system that shows what's happening on the floor in real time and automates the handoffs in between.",
  cta: { label: 'Get Free Consultation →', href: 'https://buildit3.com/contact' },
};

export const software = {
  label: "What Zapledge's Manufacturing Software Includes",
  intro:
    "Every manufacturing business runs on the same basic chain: orders come in, materials get planned, products get made, quality gets checked, goods go out. What usually breaks isn't the chain itself, it's the handoffs between each link. Here's where we connect them.",
  pillars: [
    {
      title: 'Manufacturing ERP & Operations',
      body: 'Order management, BOM (bill of materials), routing, production planning, work orders, inventory, procurement, quality, and dispatch, all working from the same data instead of five disconnected tools.',
    },
    {
      title: 'Factory Visibility',
      body: "Shop-floor dashboards that show machine and line status, production progress, downtime, and material consumption as they happen, not in next week's report.",
    },
    {
      title: 'Supply Chain Control',
      body: 'Vendor management, purchase workflows, inward inspection, and batch or lot traceability, so you know exactly where every material came from and where it went.',
    },
    {
      title: 'Quality & Compliance',
      body: 'Inspection plans, QC checkpoints, non-conformance tracking workflows, and audit-ready records built into the process instead of bolted on afterward.',
    },
    {
      title: 'Customer & Sales Visibility',
      body: "CRM, quotations, order confirmation, and production status your customers can actually see, so \u201cwhere's my order\u201d stops being a phone call.",
    },
  ],
  closing:
    'Together, these five pillars form one connected operating layer rather than five separate systems you have to reconcile manually.',
};

export const caseStudy = {
  label: 'Manufacturing Case Study: Real-Time Production Tracking',
  title: 'Transforming Manual Production Tracking into a Real-Time Operational System',
  body: 'A manufacturing client came to us with production tracking, QA, and order records spread across manual logs and disconnected spreadsheets. We built a real-time operational system covering production tracking, QA automation, and order centralization. Result: significantly improved visibility across the shop floor within 4 to 6 months.',
  cta: { label: 'Read the full case study →', href: '/case-study' },
  before: ['Manual logs', 'Disconnected spreadsheets', 'Fragmented production, QA, and order records'],
  transformation: ['Real-time production tracking', 'QA automation', 'Order centralization'],
  result: { headline: 'Significantly improved visibility', duration: '4–6 months' },
};

export const bottlenecks = {
  title: 'Common Manufacturing Bottlenecks We Solve',
  intro:
    'These are the problems we hear most often from plant managers, production planners, and quality leads before we start working together, and how we address each one.',
  items: [
    {
      title: "\u201cI can't tell what's happening on the floor right now.\u201d",
      body: 'We build shop-floor dashboards with machine and line status, downtime capture, and material consumption tracking, so your plant manager gets production visibility without walking the floor to check.',
    },
    {
      title: "\u201cWe're always either short on stock or overstocked.\u201d",
      body: 'We set up automated procurement triggers based on stock or planned production thresholds, route purchase approvals by amount or material type, and track batch and lot numbers end to end. Fewer surprises for your buyers, faster sign-offs, full traceability.',
    },
    {
      title: '\u201cQuality issues get lost between departments.\u201d',
      body: "We build QC checkpoints, exception logging, and CAPA-style action tracking directly into the workflow, so a defect your quality lead flags can't quietly disappear before someone follows up.",
    },
    {
      title: '\u201cNobody can tell me which orders are delayed, or why.\u201d',
      body: 'We layer in an AI copilot for your production planners, so they can ask \u201cwhich orders are delayed and why\u201d in plain language instead of opening six spreadsheets. Document AI handles purchase orders, invoices, and inspection reports automatically, demand forecasting flags replenishment needs before they become a problem, and predictive maintenance signals flag machine issues before they cause downtime.',
    },
  ],
  closing:
    "Each of these fixes plugs into the same underlying system, so solving one bottleneck doesn't create a new disconnected tool to manage.",
};

// Data for the reusable <IndustryModuleIndex> component (see
// src/components/industry/IndustryModuleIndex.tsx). Descriptions are the
// exact existing copy carried over unchanged from the previous `items[].body`
// values above this file's history; only the field name (`body` -> `description`)
// and the added id/number/image fields are new.
export const moduleIndex = {
  heading: 'What Modules Are Included in a Manufacturing Build',
  intro:
    'A typical manufacturing engagement draws from these module groups, scoped to what your operation actually needs rather than deployed all at once.',
  modules: [
    {
      id: 'sales-customer-operations',
      number: '01',
      title: 'Sales & Customer Operations',
      description: 'CRM & enquiries, quotations, sales orders, and customer-facing order status, so your sales and service teams work from one record instead of chasing updates across departments.',
      image: {
        src: '/images/industry-details/manufacturing-tech/01-sales-customer-operations.webp',
        alt: 'Sales & Customer Operations module preview: sales orders list with open enquiries, quotations sent, and order status',
      },
    },
    {
      id: 'production-planning',
      number: '02',
      title: 'Production & Planning',
      description: 'BOM and routing, production planning software, work order management, and maintenance and asset tracking, keeping the shop floor and the planning desk in sync.',
      image: {
        src: '/images/industry-details/manufacturing-tech/02-production-planning.webp',
        alt: 'Production & Planning module preview: weekly production schedule and work order routing',
      },
    },
    {
      id: 'supply-chain-inventory',
      number: '03',
      title: 'Supply Chain & Inventory',
      description: 'Procurement, vendor management, and inventory and warehouse management, built around real stock levels rather than end-of-week counts.',
      image: {
        src: '/images/industry-details/manufacturing-tech/03-supply-chain-inventory.webp',
        alt: 'Supply Chain & Inventory module preview: live stock levels by material and open purchase orders',
      },
    },
    {
      id: 'quality-dispatch',
      number: '04',
      title: 'Quality & Dispatch',
      description: "A full quality management system (QMS) alongside dispatch and logistics, and customer service/AMC, so a product doesn't leave the building without a clean paper trail behind it.",
      image: {
        src: '/images/industry-details/manufacturing-tech/04-quality-dispatch.webp',
        alt: 'Quality & Dispatch module preview: QC checkpoint pipeline from incoming inspection to dispatch',
      },
    },
    {
      id: 'management-visibility',
      number: '05',
      title: 'Management Visibility',
      description: 'Dashboards that roll all of the above into one view for whoever needs to see the whole operation at a glance.',
      image: {
        src: '/images/industry-details/manufacturing-tech/05-management-visibility.webp',
        alt: 'Management Visibility module preview: plant overview dashboard with OEE, on-time delivery, and order status',
      },
    },
  ],
};

export const workflow = {
  title: 'How Manufacturing Workflow Automation Works',
  intro:
    'We map this against how your operation actually runs before we build anything, not a generic template we expect you to adapt to. That mapping is where the Discovery phase of our engagement starts.',
  steps: [
    {
      title: 'Enquiry & Quotation',
      body: 'Leads and enquiries route to the right team automatically, with draft quotations generated from standardized inputs so pricing goes out faster.',
    },
    {
      title: 'Sales Order & Production Planning',
      body: 'Confirmed orders convert into a production plan and work order, checked against material availability before anything moves to the floor.',
    },
    {
      title: 'Procurement & Material Issue',
      body: 'When stock or planned production crosses a set threshold, procurement triggers automatically, with purchase approvals routed by amount or material type.',
    },
    {
      title: 'Work Order Execution',
      body: 'Work orders move through production with real-time tracking, so status is visible without someone walking the floor to check.',
    },
    {
      title: 'Quality Control',
      body: 'QC checkpoints and exception logging catch issues before finished goods move forward, with non-conformance actions tracked, not lost in email.',
    },
    {
      title: 'Finished Goods & Dispatch',
      body: 'Completed goods move to dispatch and logistics, with milestone updates sent to customers automatically.',
    },
    {
      title: 'Invoice & Service Follow-Up',
      body: 'Orders close out with invoicing and, where relevant, AMC or service history tracking, keeping the customer relationship going past delivery.',
    },
  ],
};

export const faq = {
  label: 'FAQs',
  headline: 'Frequently Asked Questions About Manufacturing Tech',
  items: [
    {
      question: 'Can Zapledge integrate with our existing ERP instead of replacing it?',
      answer:
        'Yes. Most manufacturing clients already have systems worth keeping. We connect at the API and data layer so your existing ERP, accounting, or inventory tools stay in place where it makes sense, and we build around the gaps rather than forcing a full rip-and-replace.',
    },
    {
      question: "Do we need years of historical data before AI features like demand forecasting are useful?",
      answer:
        "Some history helps accuracy, but we scope AI use cases like forecasting or predictive maintenance to the data you actually have, not the data you'd ideally have. We'll tell you upfront if a use case isn't reliable yet with your current data.",
    },
    {
      question: 'How much does a manufacturing automation project with Zapledge cost?',
      answer:
        "Pricing depends on the modules and scope you need. A single automation, like procurement alerts, costs far less than a full ERP build. We scope every engagement around your actual priorities first, so you're not paying for capability you won't use, and you'll get a clear cost picture before any work starts.",
    },
    {
      question: 'Is our production and business data safe with Zapledge?',
      answer:
        "Yes. Your production data, supplier information, and business records stay under your control. We don't use your data to train tools for other clients, and access is scoped by role so only the right people see the right information. We're happy to put data handling terms in writing before the project starts.",
    },
    {
      question: 'How long does a typical manufacturing operations project take?',
      answer:
        'It depends on scope, but we work in phases (discover, prioritize, architect, build) so you see working modules going live before the entire system is finished, rather than waiting months for a single big-bang launch.',
    },
    {
      question: 'Does this work for a single-site factory, or only multi-plant manufacturers?',
      answer:
        'Both. The same modules, production tracking, inventory, QC, dispatch, scale down to a single site just as well as they scale up across multiple plants.',
    },
    {
      question: 'Is this the same as generic production tracking software?',
      answer:
        'Not quite. Off-the-shelf production tracking software gives you visibility alone. Zapledge builds full manufacturing operations management: production tracking plus procurement, quality, dispatch, and AI, all connected as one system rather than a single tool bolted onto your existing setup.',
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
  headline: "Ready to Fix What's Slowing Down Your Floor?",
  body: "Tell us what's slowing down your production floor. We'll map the process and show you exactly where automation and AI can help.",
  primaryCta: { label: 'Request a Quote →', href: '/contact' },
  emails: ['sales@zapledge.com', 'info@zapledge.com'],
};
