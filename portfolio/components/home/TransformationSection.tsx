"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_SOFT } from "@/lib/animation-config";

const word = {
  hidden: { opacity: 0.16, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_SOFT } },
};

const group = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

function Line({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={word} className="mr-[0.26em] inline-block">
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Transition between hero and capabilities: large typographic statement
 * with a progressive word reveal as the section enters the viewport.
 */
export function TransformationSection() {
  const reduced = useReducedMotion();

  return (
    <section aria-label="Where ideas come from" className="relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-[1020px]">
          <motion.h2
            variants={group}
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -25% 0px" }}
            className="font-display text-[clamp(1.95rem,3.9vw,3.35rem)] leading-[1.14] font-medium tracking-[-0.03em] text-ink"
          >
            <Line text="Every great product starts with" />
            <Line text="a problem worth solving." />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.15 }}
            className="body-lg mt-8 max-w-[640px] text-ink-soft"
          >
            Maybe it&apos;s a business process that takes too long. An idea that deserves its own
            platform. Or a product you&apos;ve wanted to launch for years.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.3 }}
            className="mt-10 max-w-[720px] border-l-2 border-violet pl-6 font-display text-[clamp(1.35rem,2.1vw,1.9rem)] leading-snug font-medium tracking-[-0.02em] text-ink"
          >
            We help turn that starting point into{" "}
            <span className="text-violet">something tangible.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
