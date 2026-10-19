"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { processSteps } from "@/lib/project-data";

/**
 * Four-step timeline. A progress line fills as the section scrolls
 * (horizontal on desktop, vertical on smaller screens) — no timers,
 * no auto-advance, fully reversible with scroll direction.
 */
export function Process() {
  const rootRef = useRef<HTMLOListElement>(null);
  const hFillRef = useRef<HTMLSpanElement>(null);
  const vFillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      if (!hFillRef.current || !rootRef.current) return;
      gsap.fromTo(
        hFillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            end: "bottom 78%",
            scrub: 0.5,
          },
        },
      );
    });

    media.add("(max-width: 1023px)", () => {
      if (!vFillRef.current || !rootRef.current) return;
      gsap.fromTo(
        vFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 68%",
            end: "bottom 82%",
            scrub: 0.5,
          },
        },
      );
    });

    return () => media.revert();
  }, []);

  return (
    <section id="process" aria-label="How we work" className="py-20 md:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          label="FROM FIRST CONVERSATION TO LAUNCH"
          title="A clear path from idea to execution."
          description="Four steps, each with something concrete at the end of it. No black boxes between the first call and the release."
        />

        <ol ref={rootRef} className="relative mt-14 grid grid-cols-1 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* Desktop: horizontal progress line */}
          <span className="absolute top-[13px] right-0 left-0 hidden lg:block" aria-hidden="true">
            <span className="block h-px w-full bg-line" />
            <span
              ref={hFillRef}
              className="absolute inset-0 block h-px w-full scale-x-0 bg-violet"
            />
          </span>

          {/* Mobile / tablet: vertical progress line */}
          <span className="absolute top-1 bottom-6 left-[13px] w-px bg-line lg:hidden" aria-hidden="true">
            <span ref={vFillRef} className="absolute inset-0 block w-full scale-y-0 bg-violet" />
          </span>

          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              delay={i * 0.1}
              className="relative border-t border-line pt-8 pb-10 first:border-t-0 first:pt-0 lg:border-t-0 lg:pt-0 lg:pb-0"
            >
              <span
                className="absolute top-0 left-0 flex size-[26px] items-center justify-center rounded-full border border-line-strong bg-paper lg:relative lg:block"
                aria-hidden="true"
              >
                <span className="block size-[9px] rounded-full bg-violet" />
              </span>

              <div className="pl-10 lg:pt-3 lg:pl-0">
                <p className="label-mono text-ink-faint">Step {step.number}</p>
                <h3 className="mt-2.5 font-display text-[1.4rem] leading-tight font-medium tracking-[-0.025em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[300px] text-[0.98rem] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
                <div className="mt-5 border-l-2 border-violet/70 pl-4">
                  <p className="label-mono text-ink-faint">Deliverable</p>
                  <p className="mt-1.5 text-[0.92rem] leading-snug text-ink">{step.deliverable}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
