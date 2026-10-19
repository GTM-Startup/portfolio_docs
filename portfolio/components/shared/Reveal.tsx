"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { viewport } from "@/lib/animation-config";

type Tag = "div" | "section" | "article" | "li" | "header" | "figure";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds when several Reveals follow each other. */
  delay?: number;
  /** Distance travelled, in pixels. */
  y?: number;
  as?: Tag;
};

/**
 * Viewport-triggered entrance used across the site.
 * Falls back to static content when the user prefers reduced motion.
 */
export function Reveal({ children, className = "", delay = 0, y = 26, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const transition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay };
  const initial = { opacity: 0, y };
  const whileInView = { opacity: 1, y: 0 };

  switch (as) {
    case "section":
      return (
        <motion.section className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
          {children}
        </motion.section>
      );
    case "article":
      return (
        <motion.article className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
          {children}
        </motion.article>
      );
    case "li":
      return (
        <motion.li className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
          {children}
        </motion.li>
      );
    case "header":
      return (
        <motion.header className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
          {children}
        </motion.header>
      );
    case "figure":
      return (
        <motion.figure className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
          {children}
        </motion.figure>
      );
    default:
      return (
        <motion.div className={className} initial={initial} whileInView={whileInView} viewport={viewport} transition={transition}>
          {children}
        </motion.div>
      );
  }
}
