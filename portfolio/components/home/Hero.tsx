"use client";

import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/shared/Button";
import { EASE_OUT_SOFT, staggerChild, staggerParent } from "@/lib/animation-config";
import { siteConfig } from "@/lib/site-config";
import { HeroComposition } from "./HeroComposition";

const headlineLine = {
  hidden: { y: "112%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT_SOFT } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Scroll-linked shift of the composition as the hero leaves the viewport.
  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      if (!compositionRef.current || !sectionRef.current) return;
      gsap.fromTo(
        compositionRef.current,
        { scale: 1, y: 0 },
        {
          scale: 0.955,
          y: -34,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });

    return () => media.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} aria-label="Introduction" className="relative overflow-hidden">
      {/* Structural grid, faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        aria-hidden="true"
      >
        <div className="grid-overlay absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-12 pb-16 sm:px-8 lg:px-10 lg:pt-16 lg:pb-24">
        <motion.div
          variants={staggerParent}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          className="max-w-[900px]"
        >
          <motion.p variants={staggerChild} className="label-mono flex items-center gap-3 text-ink-soft">
            <span className="inline-block h-[7px] w-[7px] rounded-[1px] bg-violet" aria-hidden="true" />
            {siteConfig.label}
          </motion.p>

          <h1 className="display-xl mt-7 text-ink">
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <motion.span variants={headlineLine} className="block">
                Your idea.
              </motion.span>
            </span>
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <motion.span variants={headlineLine} className="block">
                Our craft.
              </motion.span>
            </span>
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <motion.span variants={headlineLine} className="block text-violet">
                Something real.
              </motion.span>
            </span>
          </h1>

          <motion.p variants={staggerChild} className="body-lg mt-7 max-w-[540px] text-ink-soft">
            We design and build digital products that turn ambitious ideas into tools your business
            can actually use.
          </motion.p>

          <motion.div variants={staggerChild} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={siteConfig.cta.href} size="lg">
              Let&apos;s Build Something
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/#capabilities" variant="secondary" size="lg">
              Explore What We Build
            </ButtonLink>
          </motion.div>
        </motion.div>

        <div ref={compositionRef} className="mt-12 origin-top lg:mt-16">
          <HeroComposition />
        </div>
      </div>
    </section>
  );
}
