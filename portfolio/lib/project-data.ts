/**
 * All homepage copy and structured content lives here, clearly separated
 * from reusable UI components.
 *
 * NOTE: every project in `projects` is an *illustrative product concept*,
 * not deployed client work. The `concept: true` flag drives the on-page
 * labelling.
 */

export type MockupVariant =
  | "app"
  | "crm"
  | "admin"
  | "portfolio"
  | "analytics"
  | "workspace"
  | "storefront"
  | "mvp";

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export type Capability = {
  id: string;
  index: string;
  title: string;
  description: string;
  variant: MockupVariant;
};

export const capabilities: Capability[] = [
  {
    id: "web-apps",
    index: "01",
    title: "Custom web applications",
    description:
      "Turn your concept into a web application designed around your users, workflows, and goals.",
    variant: "app",
  },
  {
    id: "crm",
    index: "02",
    title: "CRM and client management",
    description:
      "Bring customer relationships, sales pipelines, and business information into one organized workspace.",
    variant: "crm",
  },
  {
    id: "management",
    index: "03",
    title: "Management systems",
    description:
      "Replace scattered spreadsheets and manual processes with software built around the way your business operates.",
    variant: "admin",
  },
  {
    id: "websites",
    index: "04",
    title: "Websites and portfolios",
    description:
      "Build a distinctive online presence that communicates your value and gives your work the attention it deserves.",
    variant: "portfolio",
  },
  {
    id: "dashboards",
    index: "05",
    title: "Dashboards and analytics",
    description:
      "Make complex information easier to understand with dashboards that help teams monitor progress and make decisions.",
    variant: "analytics",
  },
  {
    id: "mvp",
    index: "06",
    title: "MVPs and startup products",
    description:
      "Validate your idea with a focused first version, then create a foundation that can evolve with your business.",
    variant: "mvp",
  },
];

/* ------------------------------------------------------------------ */
/* Product showcase (tabbed)                                           */
/* ------------------------------------------------------------------ */

export type Showcase = {
  id: string;
  tab: string;
  title: string;
  description: string;
  variant: MockupVariant;
  bullets: string[];
};

export const showcases: Showcase[] = [
  {
    id: "workspace",
    tab: "The business workspace",
    title: "A management system your team can actually run on",
    description:
      "Dashboards, projects and day-to-day activity in one interface — structured around how the business already works.",
    variant: "workspace",
    bullets: ["Dashboard overview", "Task and project tracking", "Recent activity", "Summary metrics"],
  },
  {
    id: "crm",
    tab: "The client relationship platform",
    title: "Every client relationship in one organized place",
    description:
      "Records, pipelines and follow-ups connected, with the detail a sales conversation needs one click away.",
    variant: "crm",
    bullets: ["Client list and search", "Sales pipeline", "Contact detail panel", "Follow-up activity"],
  },
  {
    id: "storefront",
    tab: "The digital storefront",
    title: "An editorial website built to hold attention",
    description:
      "Large typography, deliberate imagery and a clear path to action — a presence that carries the brand.",
    variant: "storefront",
    bullets: ["Editorial typography", "Project and product sections", "Clear navigation", "Strong calls to action"],
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  deliverable: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your idea, your users, and the problem you want to solve.",
    deliverable: "A clearer product direction and initial scope.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We shape the experience, define the important workflows, and turn the concept into a usable interface.",
    deliverable: "Wireframes, user flows, and visual design.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop the product, connect the pieces, and refine the experience around real use cases.",
    deliverable: "A functional implementation aligned with the agreed scope.",
  },
  {
    number: "04",
    title: "Launch and evolve",
    description:
      "We prepare the product for release and identify the next improvements based on your goals.",
    deliverable: "A launch-ready product and a path for future development.",
  },
];

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

export type Benefit = {
  number: string;
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    number: "01",
    title: "Built around your needs",
    description:
      "We design around your workflows, not around a rigid off-the-shelf template.",
  },
  {
    number: "02",
    title: "Design and development together",
    description:
      "The experience and the implementation are considered together from the beginning.",
  },
  {
    number: "03",
    title: "Focused on useful outcomes",
    description:
      "We prioritize what your product needs to accomplish, not just how it looks.",
  },
  {
    number: "04",
    title: "Designed to evolve",
    description:
      "We build with a clear structure so the product can grow as your needs change.",
  },
];

/* ------------------------------------------------------------------ */
/* Selected work — illustrative concepts                               */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  variant: MockupVariant;
  concept: true;
  /** Tailwind classes controlling the editorial grid proportions. */
  span: string;
  aspect: string;
};

export const projects: Project[] = [
  {
    slug: "meridian-crm",
    title: "Meridian",
    category: "Client management platform",
    description:
      "A relationship workspace for service businesses: pipelines, contact histories and follow-up reminders in one interface.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    variant: "crm",
    concept: true,
    span: "lg:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    slug: "northwind-admin",
    title: "Northwind",
    category: "Administration system",
    description:
      "Records, permissions, approvals and reporting for a school — replacing a spread of disconnected spreadsheets.",
    technologies: ["Next.js", "Role-based access", "Reporting"],
    variant: "admin",
    concept: true,
    span: "lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "atelier-portfolio",
    title: "Atelier",
    category: "Personal portfolio",
    description:
      "An editorial portfolio for a designer: oversized type, considered pacing, and case studies that read like stories.",
    technologies: ["Next.js", "Motion", "MDX"],
    variant: "portfolio",
    concept: true,
    span: "lg:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "pulse-analytics",
    title: "Pulse",
    category: "Analytics dashboard",
    description:
      "A monitoring surface for operations teams — KPIs, cohorts and anomaly alerts that stay readable under pressure.",
    technologies: ["Next.js", "D3", "Streaming data"],
    variant: "analytics",
    concept: true,
    span: "lg:col-span-7",
    aspect: "aspect-[16/10]",
  },
];

/* ------------------------------------------------------------------ */
/* About approach points                                               */
/* ------------------------------------------------------------------ */

export const approachPoints: { title: string; description: string }[] = [
  {
    title: "Direct collaboration",
    description: "You work with the people designing and building the product — no layers in between.",
  },
  {
    title: "Clear communication",
    description: "Plain updates on what is happening, what is next, and what needs your decision.",
  },
  {
    title: "Thoughtful problem-solving",
    description: "We question the brief before we design it, so the product solves the right problem.",
  },
  {
    title: "Technical craftsmanship",
    description: "Structured, readable implementations that stay maintainable after launch.",
  },
  {
    title: "Iterative development",
    description: "Small, reviewable increments — you see the product take shape as it is built.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "What kinds of products can you build?",
    answer:
      "Web applications, CRM and client management tools, internal administration systems, dashboards and analytics interfaces, booking platforms, websites and portfolios, and MVPs for early-stage products. If it lives in the browser and serves a real workflow, it is worth a conversation.",
  },
  {
    question: "Can you help me turn an early idea into a working MVP?",
    answer:
      "Yes. Early ideas are a large part of what we do. We help you narrow the concept to the smallest version that proves the point, design it, and build it as a foundation that can grow rather than a throwaway prototype.",
  },
  {
    question: "Can you build a CRM or internal management system?",
    answer:
      "Yes. CRMs and internal management systems are core work for us — records, pipelines, permissions, approval flows and reporting, structured around how your team actually operates.",
  },
  {
    question: "Do I need technical knowledge to start?",
    answer:
      "No. Bring the idea and the problem. We handle the technical decisions, explain them in plain language, and make sure you understand the trade-offs behind anything that affects scope or cost.",
  },
  {
    question: "How does the project process work?",
    answer:
      "Four steps: discover, design, build, and launch. We start by understanding the problem, shape the experience and interfaces, develop in reviewable increments, then prepare for release and plan what comes next.",
  },
  {
    question: "Can you work with an existing application?",
    answer:
      "Yes. We can extend, restructure or redesign an existing product. We start by reading the codebase and the current experience, then propose the smallest set of changes that moves it forward.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch is a milestone, not the end. We identify the next improvements based on your goals and can continue developing the product with you — or hand over clear documentation so your team can take it further.",
  },
];

/* ------------------------------------------------------------------ */
/* Form options                                                        */
/* ------------------------------------------------------------------ */

export const productTypes = [
  "Website or portfolio",
  "CRM",
  "Management system",
  "Dashboard",
  "Custom web application",
  "MVP",
  "Other",
] as const;

export const projectStages = [
  "Exploring an idea",
  "Planning the product",
  "Ready to start design",
  "Ready to start development",
  "Improving an existing product",
] as const;
