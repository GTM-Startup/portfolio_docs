"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useId, useRef, useState } from "react";
import { ProductMockup } from "@/components/shared/ProductMockup";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EASE_OUT_SOFT } from "@/lib/animation-config";
import { showcases } from "@/lib/project-data";

const alts: Record<string, string> = {
  workspace: "Business workspace interface with sidebar, dashboard overview, tasks and activity",
  crm: "CRM platform with client list, search, sales pipeline and follow-up activity",
  storefront: "Editorial storefront website with large typography, product sections and call to action",
};

export function ProductShowcase() {
  const [activeId, setActiveId] = useState(showcases[0].id);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useReducedMotion();
  const baseId = useId();

  const active = showcases.find((s) => s.id === activeId) ?? showcases[0];

  const select = (index: number) => {
    const next = (index + showcases.length) % showcases.length;
    setActiveId(showcases[next].id);
    tabsRef.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        select(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        select(index - 1);
        break;
      case "Home":
        event.preventDefault();
        select(0);
        break;
      case "End":
        event.preventDefault();
        select(showcases.length - 1);
        break;
    }
  };

  return (
    <section aria-label="The products we bring to life" className="relative overflow-hidden bg-night text-paper">
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true">
        <div className="grid-overlay-dark absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 md:py-28 lg:px-10 lg:py-36">
        <SectionHeading
          tone="dark"
          label="BUILT FOR REAL WORK"
          title={"Not just a pretty interface.\nA product that does the job."}
          description="Three examples of the kinds of deliverables clients can expect — explore each one below."
        />

        {/* Selector ------------------------------------------------- */}
        <Reveal className="mt-10 lg:mt-12">
          <div
            role="tablist"
            aria-label="Product examples"
            className="flex flex-wrap gap-2.5"
          >
            {showcases.map((s, i) => {
              const selected = s.id === active.id;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(s.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative rounded-[10px] border px-4 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${
                    selected
                      ? "border-white/40 bg-white/10 text-paper"
                      : "border-line-dark text-paper-soft hover:border-white/30 hover:text-paper"
                  }`}
                >
                  {s.tab}
                  {selected ? (
                    <span className="absolute inset-x-4 -bottom-px block h-[2px] rounded-full bg-lime" aria-hidden="true" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel ----------------------------------------------------- */}
        <div className="mt-10 lg:mt-14">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${active.id}`}
              tabIndex={0}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
              className="grid items-center gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14"
            >
              <ProductMockup variant={active.variant} alt={alts[active.id] ?? active.title} />

              <div>
                <h3 className="font-display text-[clamp(1.5rem,2.3vw,2.05rem)] leading-tight font-medium tracking-[-0.025em] text-paper">
                  {active.title}
                </h3>
                <p className="body-lg mt-4 text-paper-soft">{active.description}</p>
                <ul className="mt-7 flex flex-col gap-3.5">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[0.95rem] text-paper">
                      <span className="mt-[3px] flex size-4 shrink-0 items-center justify-center rounded-full bg-lime/20 text-lime">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="label-mono mt-8 text-paper-soft/70">Illustrative product concept</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
