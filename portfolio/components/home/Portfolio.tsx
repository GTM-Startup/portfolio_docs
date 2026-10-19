import { ProductMockup } from "@/components/shared/ProductMockup";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects, type Project } from "@/lib/project-data";

const alts: Record<string, string> = {
  crm: "Client management platform preview with records, pipeline and detail panel",
  admin: "Administration system preview with records table and status indicators",
  portfolio: "Editorial portfolio website preview with oversized typography",
  analytics: "Analytics dashboard preview with KPIs, charts and funnel",
  app: "Web application preview with navigation and content panels",
  workspace: "Business workspace preview with tasks and activity",
  storefront: "Storefront website preview with product sections",
  mvp: "Desktop and mobile screens from one product family",
};

const plates: Record<Project["variant"], string> = {
  crm: "bg-white border-line",
  admin: "bg-indigo border-indigo",
  portfolio: "bg-paper-2 border-line",
  analytics: "bg-night border-night",
  app: "bg-white border-line",
  workspace: "bg-white border-line",
  storefront: "bg-paper-2 border-line",
  mvp: "bg-indigo border-indigo",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      as="article"
      delay={index * 0.08}
      className={`group col-span-12 ${project.span} flex flex-col`}
    >
      <div
        className={`relative overflow-hidden rounded-[18px] border p-4 transition-shadow duration-500 sm:p-6 lg:p-7 ${plates[project.variant]}`}
      >
        <span className="absolute top-4 right-4 z-10 translate-y-1 rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-ink-soft uppercase opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          Concept
        </span>
        <div className="origin-center transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <ProductMockup variant={project.variant} alt={alts[project.variant] ?? project.title} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-t border-line pt-4">
        <div className="min-w-0">
          <p className="label-mono text-ink-faint">{project.category}</p>
          <h3 className="mt-2 font-display text-[clamp(1.35rem,2vw,1.7rem)] font-medium tracking-[-0.03em] text-ink">
            {project.title}
          </h3>
          <p className="mt-2 max-w-[520px] text-[0.97rem] leading-relaxed text-ink-soft">
            {project.description}
          </p>
        </div>
        <p className="shrink-0 text-right text-[12px] leading-relaxed text-ink-faint">
          {project.technologies.join(" · ")}
        </p>
      </div>
    </Reveal>
  );
}

export function Portfolio() {
  return (
    <section id="work" aria-label="Selected work" className="py-20 md:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          label="SELECTED WORK"
          title={"Different challenges.\nThoughtful solutions."}
          description="Each concept below was designed around a specific operational problem — the kind of challenge we take on."
        >
          <p className="label-mono mt-6 text-ink-faint">
            Illustrative concepts — not deployed client work.
          </p>
        </SectionHeading>

        <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-14 lg:mt-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
