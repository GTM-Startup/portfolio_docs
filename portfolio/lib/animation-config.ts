import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language for the site.
 * Restrained easing, short distances, no bouncing or looping effects.
 */

export const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const transition: Transition = {
  duration: 0.7,
  ease: EASE_OUT_SOFT,
};

export const transitionFast: Transition = {
  duration: 0.35,
  ease: EASE_OUT_SOFT,
};

/** Standard section reveal: small upward travel, fade, soft easing. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT_SOFT },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_SOFT },
  },
};

/** Viewport trigger used by <Reveal /> — fires once, slightly before centre. */
export const viewport = {
  once: true,
  margin: "0px 0px -12% 0px",
} as const;
