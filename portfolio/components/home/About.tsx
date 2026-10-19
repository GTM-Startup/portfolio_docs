import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { approachPoints } from "@/lib/project-data";

/**
 * Typography-led section with a custom abstract visual: the studio's
 * transformation — an idea resolving into structure, then into a
 * working product. No stock photography, no invented team members.
 */
function TransformationDiagram() {
  return (
    <Reveal delay={0.15} className="rounded-[20px] border border-line-dark bg-indigo-2 p-6 sm:p-8">
      <p className="label-mono text-paper-soft/70">How an idea becomes a product</p>

      <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-4">
        {/* idea */}
        <div className="flex flex-1 flex-col items-center gap-3 text-center">
          <span className="flex size-16 items-center justify-center rounded-full border border-dashed border-violet-light/70">
            <span className="block size-3 rounded-full bg-violet-light" />
          </span>
          <span className="label-mono text-paper-soft">01 Idea</span>
        </div>

        <span className="hidden self-center border-t border-dashed border-paper-soft/40 sm:block sm:w-6" aria-hidden="true" />

        {/* structure */}
        <div className="flex flex-1 flex-col items-center gap-3 text-center">
          <span className="flex size-16 items-center justify-center rounded-[14px] border border-dashed border-paper-soft/60 p-3">
            <span className="grid h-full w-full grid-cols-2 gap-1">
              <span className="block rounded-[3px] bg-paper/25" />
              <span className="block rounded-[3px] bg-paper/25" />
              <span className="block rounded-[3px] bg-paper/25" />
              <span className="block rounded-[3px] bg-lime/70" />
            </span>
          </span>
          <span className="label-mono text-paper-soft">02 Structure</span>
        </div>

        <span className="hidden self-center border-t border-dashed border-paper-soft/40 sm:block sm:w-6" aria-hidden="true" />

        {/* product */}
        <div className="flex flex-1 flex-col items-center gap-3 text-center">
          <span className="block size-16 overflow-hidden rounded-[14px] border border-paper/30 bg-white p-2">
            <span className="flex h-full flex-col gap-1">
              <span className="block h-2 w-2/3 rounded-full bg-violet" />
              <span className="block h-1.5 w-full rounded-full bg-ink/15" />
              <span className="block h-1.5 w-5/6 rounded-full bg-ink/15" />
              <span className="mt-auto block h-3 w-full rounded-[3px] bg-ink/[0.07]" />
            </span>
          </span>
          <span className="label-mono text-paper-soft">03 Product</span>
        </div>
      </div>

      <div className="mt-7 border-t border-line-dark pt-5">
        <p className="text-[0.95rem] leading-relaxed text-paper-soft">
          Ideas rarely arrive finished. Our job is to give them structure — then build the thing
          until it works for the people it was meant for.
        </p>
      </div>
    </Reveal>
  );
}

export function About() {
  return (
    <section id="about" aria-label="About the studio" className="bg-indigo py-20 text-paper md:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              label="SMALL TEAM. SERIOUS CRAFT."
              title="Good products come from understanding the people who use them."
              description="Ideaforge is an independent studio. You work directly with the people designing and building your product — no account layers, no handoffs. We ask the early questions, share work in progress, and keep every technical decision explainable."
            />
          </div>

          <TransformationDiagram />
        </div>

        <ol className="mt-14 lg:mt-20">
          {approachPoints.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              delay={i * 0.07}
              className="grid gap-x-10 gap-y-2 border-t border-line-dark py-6 last:border-b md:grid-cols-[0.8fr_1.2fr] lg:py-7"
            >
              <div className="flex items-baseline gap-4">
                <span className="label-mono text-lime">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[clamp(1.2rem,1.7vw,1.5rem)] font-medium tracking-[-0.02em] text-paper">
                  {point.title}
                </h3>
              </div>
              <p className="max-w-[560px] text-[1rem] leading-relaxed text-paper-soft md:pt-1">
                {point.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
