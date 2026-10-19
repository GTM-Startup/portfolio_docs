import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { benefits } from "@/lib/project-data";

/** Compact design-system specimen used as the section's supporting visual. */
function SpecimenCard() {
  return (
    <Reveal delay={0.15} className="rounded-[16px] border border-line bg-white p-5 shadow-[0_1px_2px_rgba(22,19,29,0.05),0_24px_50px_-34px_rgba(22,19,29,0.4)]">
      <p className="label-mono text-ink-faint">Design system specimen</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-[10px] border border-line bg-paper/50 p-3.5">
          <p className="label-mono text-ink-faint">Type</p>
          <p className="mt-1 font-display text-3xl leading-none font-medium tracking-[-0.04em] text-ink">Aa</p>
          <p className="mt-2 text-[11px] leading-snug text-ink-soft">
            Space display
            <br />
            Inter body
          </p>
        </div>

        <div className="rounded-[10px] border border-line bg-paper/50 p-3.5">
          <p className="label-mono text-ink-faint">Controls</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex h-7 items-center rounded-[7px] bg-violet px-3 text-[11px] font-medium text-white">
              Primary
            </span>
            <span className="inline-flex h-7 items-center rounded-[7px] border border-line-strong px-3 text-[11px] font-medium text-ink">
              Secondary
            </span>
            <span className="inline-flex h-5 w-9 items-center rounded-full bg-violet px-0.5" aria-hidden="true">
              <span className="block size-4 translate-x-4 rounded-full bg-white shadow-sm" />
            </span>
          </div>
        </div>

        <div className="rounded-[10px] border border-line bg-paper/50 p-3.5">
          <p className="label-mono text-ink-faint">Color</p>
          <div className="mt-2.5 flex gap-2">
            {[
              { className: "bg-violet", label: "Electric violet" },
              { className: "bg-lime", label: "Lime" },
              { className: "bg-ink", label: "Ink" },
              { className: "bg-paper border border-line", label: "Paper" },
            ].map((swatch) => (
              <span key={swatch.label} className={`block size-7 rounded-[6px] ${swatch.className}`} title={swatch.label}>
                <span className="sr-only">{swatch.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[10px] border border-line bg-paper/50 p-3.5">
          <p className="label-mono text-ink-faint">Data</p>
          <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="mt-2 h-7 w-full" aria-hidden="true">
            <path
              d="M0 24 L14 20 L28 22 L42 13 L56 15 L70 8 L84 10 L100 3"
              fill="none"
              stroke="var(--color-violet)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
            <span className="block h-full w-[68%] rounded-full bg-ink/70" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Benefits() {
  return (
    <section aria-label="Why work with us" className="border-y border-line bg-paper-2 py-20 md:py-28 lg:py-36">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            label="BUILT WITH INTENTION"
            title="Your idea deserves more than a template."
            description="Four commitments that shape how every engagement runs."
          />
          <div className="mt-10">
            <SpecimenCard />
          </div>
        </div>

        <ol className="lg:pt-2">
          {benefits.map((b, i) => (
            <Reveal
              as="li"
              key={b.number}
              delay={i * 0.08}
              className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-line pt-7 pb-7 last:border-b"
            >
              <span className="label-mono pt-1.5 text-violet">{b.number}</span>
              <div>
                <h3 className="font-display text-[clamp(1.3rem,1.9vw,1.65rem)] leading-snug font-medium tracking-[-0.025em] text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {b.title}
                </h3>
                <p className="mt-2.5 max-w-[440px] text-[1rem] leading-relaxed text-ink-soft">
                  {b.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
