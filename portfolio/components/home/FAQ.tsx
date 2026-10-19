"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { EASE_OUT_SOFT } from "@/lib/animation-config";
import { faqs } from "@/lib/project-data";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section aria-label="Frequently asked questions" className="py-20 md:py-28 lg:py-36">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-mono flex items-center gap-3 text-ink-soft">
            <span className="inline-block h-[7px] w-[7px] rounded-[1px] bg-violet" aria-hidden="true" />
            QUESTIONS, ANSWERED
          </p>
          <h2 className="display-lg mt-6 text-ink">
            Before you
            <br />
            get in touch.
          </h2>
          <p className="body-lg mt-6 max-w-[380px] text-ink-soft">
            Straight answers to the things founders and teams usually ask us first.
          </p>
        </div>

        <Reveal>
          <div className="border-t border-line">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;

              return (
                <div key={faq.question} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
                    >
                      <span
                        className={`font-display text-[1.05rem] leading-snug font-medium tracking-[-0.015em] transition-colors duration-200 sm:text-[1.15rem] ${
                          isOpen ? "text-violet" : "text-ink group-hover:text-violet-deep"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-300 ${
                          isOpen
                            ? "rotate-45 border-violet bg-violet text-white"
                            : "border-line-strong text-ink group-hover:border-ink"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.35,
                          ease: EASE_OUT_SOFT,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[620px] pb-6 pr-10 text-[1rem] leading-relaxed text-ink-soft">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
