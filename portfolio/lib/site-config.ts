/**
 * Central site configuration.
 *
 * Contact details are intentionally left unconfigured — replace the
 * placeholder values below when the studio supplies real details.
 * Nothing in this file should describe invented people, addresses,
 * phone numbers or social profiles.
 */

export const siteConfig = {
  name: "ideaforge",
  tagline: "From idea to impact.",
  positioning: "We turn ambitious ideas into digital products built for the real world.",
  description:
    "Ideaforge is an independent digital product studio. We design and build CRMs, management systems, dashboards, websites and web applications for founders, startups and growing businesses.",
  label: "INDEPENDENT DIGITAL PRODUCT STUDIO",

  contact: {
    // Configuration placeholders — deliberately not invented.
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    social: [] as { label: string; url: string | null }[],
  },

  navigation: [
    { label: "What We Build", href: "/#capabilities" },
    { label: "Our Approach", href: "/#process" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Let's Talk", href: "/contact" },

  /** Anchored sections targeted by the homepage navigation. */
  anchors: {
    capabilities: "capabilities",
    process: "process",
    work: "work",
    about: "about",
    contact: "contact",
  },
} as const;

export type SiteConfig = typeof siteConfig;
