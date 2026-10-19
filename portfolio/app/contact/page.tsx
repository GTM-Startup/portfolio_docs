import type { Metadata } from "next";
import { ProjectInquiryForm } from "@/components/contact/ProjectInquiryForm";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us what you're imagining — the idea, the problem, or the opportunity you're exploring. Start a project inquiry with ideaforge.",
};

const nextSteps = [
  {
    number: "01",
    title: "We read the whole thing",
    body: "Every inquiry is read by the people who would do the work — not a screening layer.",
  },
  {
    number: "02",
    title: "We come back with questions",
    body: "Expect a reply that digs into scope, users and constraints — or an honest no if we're not the right fit for it.",
  },
  {
    number: "03",
    title: "We shape the first phase",
    body: "If it fits, we define a small first phase with clear deliverables before anything bigger is committed.",
  },
];

export default function ContactPage() {
  return (
    <section aria-label="Start a project" className="py-14 md:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="label-mono flex items-center gap-3 text-ink-soft">
              <span className="inline-block h-[7px] w-[7px] rounded-[1px] bg-violet" aria-hidden="true" />
              START A PROJECT
            </p>

            <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.15rem)] leading-[1.03] font-medium tracking-[-0.035em] text-ink">
              Tell us what
              <br />
              you&apos;re imagining.
            </h1>

            <p className="body-lg mt-6 max-w-[460px] text-ink-soft">
              You don&apos;t need a complete specification. Start with the idea, the problem, or the
              opportunity you&apos;re exploring.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="mt-10 border-t border-line">
              {nextSteps.map((step) => (
                <li key={step.number} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-5">
                  <span className="label-mono pt-1 text-violet">{step.number}</span>
                  <div>
                    <h2 className="font-display text-[1.05rem] font-medium tracking-[-0.015em] text-ink">
                      {step.title}
                    </h2>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-soft">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-[12px] border border-line bg-paper-2/70 p-4">
              <p className="label-mono text-ink-faint">Direct contact</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                Email address — not yet configured. Until a real address is supplied, this form is
                the only channel in.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ProjectInquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
