import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/shared/Button";

export function FinalCTA() {
  return (
    <section aria-label="Start a project" className="relative overflow-hidden bg-night text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
        aria-hidden="true"
      >
        <div className="grid-overlay-dark absolute inset-0" />
      </div>
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet/[0.16] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-24 text-center sm:px-8 md:py-32 lg:px-10 lg:py-40">
        <Reveal>
          <h2 className="display-xl mx-auto max-w-[900px]">
            <span className="block">Have an idea?</span>
            <span className="block">
              Let&apos;s make it <span className="text-lime">real.</span>
            </span>
          </h2>

          <p className="body-lg mx-auto mt-8 max-w-[520px] text-paper-soft">
            Tell us what you&apos;re thinking about. We&apos;ll help you figure out what it could
            become.
          </p>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" size="lg" variant="primary">
              Let&apos;s Talk About Your Idea
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/#capabilities" size="lg" variant="secondaryDark">
              Explore What We Build
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
