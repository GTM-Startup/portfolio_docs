"use client";

import { motion, useReducedMotion } from "motion/react";
import { ProductMockup } from "@/components/shared/ProductMockup";
import { EASE_OUT_SOFT } from "@/lib/animation-config";

const panel = {
  hidden: { opacity: 0, y: 30, scale: 0.975 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const group = {
  hidden: {},
  visible: { transition: { delayChildren: 0.45, staggerChildren: 0.14 } },
};

const panelTransition = { duration: 0.85, ease: EASE_OUT_SOFT };

/**
 * Overlapping interface previews: one large workspace, an analytics
 * dashboard and a portfolio site, tied together with thin connecting
 * lines and geometric nodes.
 *
 * Desktop uses a single grid cell for all panels — they overlap through
 * their own widths and offsets, so every window keeps its natural height.
 */
export function HeroComposition({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const initial = reduced ? "visible" : "hidden";

  return (
    <div className={`relative ${className}`}>
      {/* The one gradient reserved for the hero. */}
      <div
        className="pointer-events-none absolute top-[10%] left-1/2 hidden h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-violet/[0.13] blur-[110px] md:block"
        aria-hidden="true"
      />

      {/* Connecting geometry */}
      <span
        className="absolute -top-4 right-0 left-0 hidden border-t border-dashed border-line-strong md:block"
        aria-hidden="true"
      />
      <span
        className="absolute -top-4 bottom-16 left-[5%] hidden border-l border-dashed border-line-strong md:block"
        aria-hidden="true"
      />
      <span
        className="absolute -top-4 left-[5%] hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet md:block"
        aria-hidden="true"
      />
      <span
        className="absolute right-[3%] bottom-[6%] hidden size-2.5 border border-ink/50 bg-paper md:block"
        aria-hidden="true"
      />

      {/* Mobile / small tablet: stacked, fully legible */}
      <motion.div className="grid gap-4 md:hidden" variants={group} initial={initial} animate="visible">
        <motion.div variants={panel} transition={panelTransition}>
          <ProductMockup
            variant="workspace"
            alt="Business workspace dashboard showing projects, tasks and team activity"
          />
        </motion.div>
        <motion.div variants={panel} transition={panelTransition}>
          <ProductMockup
            variant="analytics"
            alt="Analytics dashboard with revenue chart, KPIs and conversion funnel"
          />
        </motion.div>
        <motion.div variants={panel} transition={panelTransition}>
          <ProductMockup variant="portfolio" alt="Editorial portfolio website preview" />
        </motion.div>
      </motion.div>

      {/* Desktop: asymmetric overlapping composition */}
      <motion.div
        className="relative hidden grid-cols-1 md:grid"
        variants={group}
        initial={initial}
        animate="visible"
      >
        {/* Central application preview */}
        <motion.div
          variants={panel}
          transition={panelTransition}
          className="col-start-1 row-start-1 z-10 mt-6 w-[64%] justify-self-center"
        >
          <ProductMockup
            variant="workspace"
            alt="Business workspace dashboard showing projects, tasks and team activity"
          />
        </motion.div>

        {/* Analytics — overlaps the top right */}
        <motion.div
          variants={panel}
          transition={panelTransition}
          className="col-start-1 row-start-1 z-20 -mt-8 w-[34%] translate-x-[4%] justify-self-end"
        >
          <ProductMockup
            variant="analytics"
            alt="Analytics dashboard with revenue chart, KPIs and conversion funnel"
          />
        </motion.div>

        {/* Portfolio — overlaps the bottom left */}
        <motion.div
          variants={panel}
          transition={panelTransition}
          className="col-start-1 row-start-1 z-20 -mb-10 w-[36%] -translate-x-[6%] translate-y-[36%] self-end justify-self-start"
        >
          <ProductMockup variant="portfolio" alt="Editorial portfolio website preview" />
        </motion.div>

        {/* Small floating CRM detail card — the fourth interface in the story */}
        <motion.div
          variants={panel}
          transition={panelTransition}
          className="absolute right-[4%] bottom-[-18px] z-30 hidden w-[230px] rounded-[14px] border border-line bg-white p-4 shadow-[0_1px_2px_rgba(22,19,29,0.08),0_28px_60px_-30px_rgba(22,19,29,0.5)] lg:block lg:w-[250px]"
        >
          <p className="label-mono text-ink-faint">Follow-ups today</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {[
              { name: "Harlow & Co.", status: "Proposal" },
              { name: "Ridgeway Logistics", status: "Negotiation" },
              { name: "Fieldnote Media", status: "Discovery" },
            ].map((row) => (
              <li key={row.name} className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-medium text-ink">{row.name}</span>
                <span className="shrink-0 rounded-full border border-violet/30 bg-violet/10 px-2 py-0.5 text-[10.5px] font-medium text-violet-deep">
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
