import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/shared/Button";
import { ProductMockup } from "@/components/shared/ProductMockup";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { capabilities, type Capability, type MockupVariant } from "@/lib/project-data";

const [featured, crm, management, websites, dashboards, mvp] = capabilities;

const alts: Record<MockupVariant, string> = {
  app: "Web application interface with sidebar navigation, progress panels and notifications",
  crm: "CRM dashboard with client records, pipeline stages, filters and follow-up activity",
  admin: "Administration interface with summary metrics, filters and a status table",
  portfolio: "Editorial portfolio website with large typography and a project index",
  analytics: "Analytics dashboard with KPIs, revenue chart, activity bars and conversion funnel",
  workspace: "Business workspace with dashboard overview, tasks and recent activity",
  storefront: "Digital storefront website with editorial typography and product sections",
  mvp: "Product family showing desktop and mobile application screens",
};

function CapabilityText({ item, tone = "light" }: { item: Capability; tone?: "light" | "dark" }) {
  const heading = tone === "light" ? "text-ink" : "text-paper";
  const body = tone === "light" ? "text-ink-soft" : "text-paper-soft";
  const marker = tone === "light" ? "text-ink-faint" : "text-paper-soft/70";

  return (
    <div>
      <p className={`label-mono ${marker}`}>
        {item.index} <span className="mx-1.5 opacity-50">/</span> 06
      </p>
      <h3 className={`display-md mt-4 ${heading}`}>{item.title}</h3>
      <p className={`body-lg mt-4 max-w-[470px] ${body}`}>{item.description}</p>
    </div>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" aria-label="What we build" className="border-t border-line py-20 md:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          label="OUR CAPABILITIES"
          title={"Different ideas.\nBuilt around what you need."}
          description="From a focused website to a complete business platform, we build digital products around real problems and real workflows."
        >
          <p className="label-mono mt-6 text-ink-faint">
            Interface previews are illustrative concepts built for this site.
          </p>
        </SectionHeading>

        {/* Featured capability -------------------------------------- */}
        <Reveal className="mt-14 grid items-center gap-10 border-t border-line pt-14 lg:mt-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <CapabilityText item={featured} />
            <ButtonLink href="/contact" variant="secondary" className="mt-8">
              Discuss a web application
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ProductMockup variant="app" alt={alts.app} />
        </Reveal>

        {/* Dark band: CRM + management systems ---------------------- */}
        <Reveal className="mt-16 rounded-[24px] bg-indigo p-6 text-paper sm:p-10 lg:mt-24 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <CapabilityText item={crm} tone="dark" />
            </div>
            <ProductMockup variant="crm" alt={alts.crm} />
          </div>

          <div className="mt-12 grid items-center gap-10 border-t border-line-dark pt-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <CapabilityText item={management} tone="dark" />
            </div>
            <ProductMockup variant="admin" alt={alts.admin} className="lg:order-1" />
          </div>
        </Reveal>

        {/* Alternating rows on paper -------------------------------- */}
        <Reveal className="mt-16 grid items-center gap-10 border-t border-line pt-14 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <CapabilityText item={websites} />
          </div>
          <ProductMockup variant="portfolio" alt={alts.portfolio} className="lg:order-1" />
        </Reveal>

        <Reveal className="mt-14 grid items-center gap-10 border-t border-line pt-14 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <CapabilityText item={dashboards} />
          </div>
          <ProductMockup variant="analytics" alt={alts.analytics} />
        </Reveal>

        {/* MVP — smaller closing block ------------------------------- */}
        <Reveal className="mt-14 border-t border-line pt-14 lg:mt-20">
          <div className="grid items-end gap-6 lg:grid-cols-2">
            <CapabilityText item={mvp} />
            <p className="body-lg hidden max-w-[430px] text-ink-soft lg:block">
              One coherent product family — desktop, mobile and everything in between — released in
              focused increments instead of one enormous launch.
            </p>
          </div>
          <div className="mt-8 rounded-[18px] border border-line bg-white/70 p-4 sm:p-6 lg:p-8">
            <ProductMockup variant="mvp" alt={alts.mvp} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
