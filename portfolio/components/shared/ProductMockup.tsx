import { useId } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronDown,
  CircleCheck,
  FileText,
  FolderKanban,
  Home,
  LayoutGrid,
  LayoutList,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Target,
  Upload,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { MockupVariant } from "@/lib/project-data";
import {
  adminMetrics,
  adminRows,
  analyticsKpis,
  appName,
  activityBars,
  crmActivity,
  crmClients,
  crmName,
  crmPipeline,
  funnelSteps,
  portfolioProjects,
  revenueSeries,
  workspaceActivity,
  workspaceMetrics,
  workspaceTasks,
} from "@/lib/mock-data";

/* ==================================================================
   Primitives
================================================================== */

export function Avatar({ initials, className = "" }: { initials: string; className?: string }) {
  return (
    <span
      className={`inline-flex size-[1.7em] shrink-0 items-center justify-center rounded-full border border-violet/25 bg-violet/10 text-[0.68em] font-semibold text-violet-deep ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

const statusTone: Record<string, string> = {
  Done: "bg-lime/45 border-lime text-ink",
  Approved: "bg-lime/45 border-lime text-ink",
  Won: "bg-lime/45 border-lime text-ink",
  "In progress": "bg-violet/10 border-violet/30 text-violet-deep",
  Negotiation: "bg-violet/10 border-violet/30 text-violet-deep",
  Qualified: "bg-violet/10 border-violet/30 text-violet-deep",
  "In review": "bg-violet-light/20 border-violet-light/50 text-violet-deep",
  Proposal: "bg-violet-light/20 border-violet-light/50 text-violet-deep",
  Escalated: "bg-violet-light/20 border-violet-light/50 text-violet-deep",
  Pending: "bg-violet-light/20 border-violet-light/50 text-violet-deep",
  Backlog: "bg-ink/[0.05] border-line text-ink-soft",
  Discovery: "bg-ink/[0.05] border-line text-ink-soft",
};

export function StatusPill({ status }: { status: string }) {
  const tone = statusTone[status] ?? "bg-ink/[0.05] border-line text-ink-soft";
  return (
    <span
      className={`inline-flex items-center gap-[0.35em] whitespace-nowrap rounded-full border px-[0.6em] py-[0.12em] text-[0.72em] font-medium ${tone}`}
    >
      <span className="size-[0.38em] rounded-full bg-current opacity-70" aria-hidden="true" />
      {status}
    </span>
  );
}

function Chart({ data, className = "h-[7em]" }: { data: number[]; className?: string }) {
  const rawId = useId();
  const gid = `area-${rawId.replace(/[:]/g, "")}`;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 37 - ((v - min) / (max - min || 1)) * 31;
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const area = `${line} L100 40 L0 40 Z`;

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-violet)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--color-violet)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[10, 20, 30].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--color-line)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--color-violet)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="1.6" fill="var(--color-violet)" />
    </svg>
  );
}

function Bars({ data, accentFrom = -1, className = "h-[5.5em]" }: { data: number[]; accentFrom?: number; className?: string }) {
  return (
    <div className={`flex w-full items-end gap-[0.4em] ${className}`} aria-hidden="true">
      {data.map((v, i) => (
        <span
          key={i}
          style={{ height: `${v}%` }}
          className={`flex-1 rounded-[0.2em] ${i >= accentFrom ? "bg-violet" : "bg-violet/20"}`}
        />
      ))}
    </div>
  );
}

function SearchPill({ label = "Search" }: { label?: string }) {
  return (
    <span className="flex items-center gap-[0.45em] rounded-[0.45em] border border-line bg-paper px-[0.6em] py-[0.35em] text-[0.78em] text-ink-faint">
      <Search className="size-[1em]" aria-hidden="true" />
      {label}
    </span>
  );
}

function GhostButton({ children, icon: Icon }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <span className="inline-flex items-center gap-[0.4em] rounded-[0.45em] border border-line bg-white px-[0.7em] py-[0.4em] text-[0.78em] font-medium text-ink">
      {Icon ? <Icon className="size-[1em]" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

function PrimaryButton({ children, icon: Icon }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <span className="inline-flex items-center gap-[0.4em] rounded-[0.45em] bg-violet px-[0.75em] py-[0.4em] text-[0.78em] font-medium text-white">
      {Icon ? <Icon className="size-[1em]" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

function MetricCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="mk-card-soft flex flex-col gap-[0.15em] px-[0.7em] py-[0.55em]">
      <span className="text-[0.72em] text-ink-faint">{label}</span>
      <span className="text-[1.3em] leading-tight font-semibold tracking-[-0.02em]">{value}</span>
      {delta ? <span className="text-[0.68em] font-medium text-violet-deep">{delta}</span> : null}
    </div>
  );
}

function Chrome({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mk-window flex h-full flex-col">
      <div className="flex items-center gap-[0.55em] border-b border-line bg-paper px-[1em] py-[0.6em]">
        <span className="flex gap-[0.35em]" aria-hidden="true">
          <span className="block size-[0.5em] rounded-full bg-ink/20" />
          <span className="block size-[0.5em] rounded-full bg-ink/15" />
          <span className="block size-[0.5em] rounded-full bg-ink/10" />
        </span>
        <span className="ml-[0.4em] min-w-0 flex-1 truncate rounded-[0.35em] border border-line bg-white px-[0.7em] py-[0.15em] text-[0.75em] text-ink-faint">
          {label}
        </span>
        <MoreHorizontal className="size-[1em] text-ink-faint" aria-hidden="true" />
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

type NavItem = { label: string; icon: LucideIcon };

function Sidebar({ brand, items, active }: { brand: string; items: NavItem[]; active: string }) {
  return (
    <aside className="flex w-[9em] shrink-0 flex-col gap-[0.2em] border-r border-line bg-paper/70 p-[0.7em]">
      <div className="mb-[0.6em] flex items-center gap-[0.4em] px-[0.3em]">
        <span className="block size-[0.85em] rounded-[0.18em] bg-violet" aria-hidden="true" />
        <span className="text-[0.8em] font-semibold tracking-[-0.02em]">{brand}</span>
      </div>
      {items.map(({ label, icon: Icon }) => {
        const isActive = label === active;
        return (
          <span
            key={label}
            className={`flex items-center gap-[0.5em] rounded-[0.4em] px-[0.5em] py-[0.38em] text-[0.8em] ${
              isActive
                ? "border border-line bg-white font-semibold text-ink shadow-[0_0.1em_0.2em_rgba(22,19,29,0.05)]"
                : "border border-transparent text-ink-faint"
            }`}
          >
            <Icon className="size-[1em]" aria-hidden="true" />
            <span className="truncate">{label}</span>
          </span>
        );
      })}
      <div className="mt-auto flex items-center gap-[0.45em] rounded-[0.4em] border border-line bg-white px-[0.5em] py-[0.4em]">
        <Avatar initials="AM" />
        <span className="min-w-0">
          <span className="block truncate text-[0.72em] font-semibold">Amara M.</span>
          <span className="block truncate text-[0.65em] text-ink-faint">Admin</span>
        </span>
      </div>
    </aside>
  );
}

function PanelHeader({ title, meta, action }: { title: string; meta?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[0.6em] border-b border-line px-[0.8em] py-[0.55em]">
      <span className="flex items-baseline gap-[0.5em]">
        <span className="text-[0.85em] font-semibold">{title}</span>
        {meta ? <span className="text-[0.68em] text-ink-faint">{meta}</span> : null}
      </span>
      {action}
    </div>
  );
}

/* ==================================================================
   Variant: business workspace (management system overview)
================================================================== */

function WorkspaceMock() {
  return (
    <Chrome label={`${appName} — Overview`}>
      <div className="flex h-full">
        <Sidebar
          brand="northwind"
          active="Overview"
          items={[
            { label: "Overview", icon: LayoutGrid },
            { label: "Projects", icon: FolderKanban },
            { label: "Team", icon: Users },
            { label: "Reports", icon: BarChart3 },
            { label: "Settings", icon: Settings },
          ]}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[0.7em] bg-white p-[0.9em]">
          <div className="flex items-center justify-between gap-[0.6em]">
            <div className="min-w-0">
              <p className="truncate text-[1.05em] font-semibold tracking-[-0.02em]">Good morning, Amara</p>
              <p className="text-[0.72em] text-ink-faint">Thursday, 14 May — 4 tasks need attention</p>
            </div>
            <div className="flex shrink-0 items-center gap-[0.5em]">
              <SearchPill label="Search…" />
              <PrimaryButton icon={Plus}>New task</PrimaryButton>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-[0.5em]">
            {workspaceMetrics.map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} delta={m.delta} />
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-[0.6em]">
            <div className="mk-card flex flex-col">
              <PanelHeader
                title="Tasks this week"
                meta="5 open"
                action={<GhostButton icon={SlidersHorizontal}>Filter</GhostButton>}
              />
              <div className="flex flex-col">
                {workspaceTasks.map((t) => (
                  <div
                    key={t.title}
                    className="flex items-center gap-[0.6em] border-b border-line px-[0.8em] py-[0.52em] last:border-b-0"
                  >
                    <span
                      className={`block size-[0.9em] shrink-0 rounded-[0.2em] border ${
                        t.status === "Done" ? "border-violet bg-violet" : "border-line-strong bg-white"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate text-[0.8em] font-medium">{t.title}</span>
                    <StatusPill status={t.status} />
                    <Avatar initials={t.owner} className="hidden sm:inline-flex" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mk-card flex flex-col">
              <PanelHeader title="Recent activity" />
              <div className="flex flex-col gap-[0.6em] px-[0.8em] py-[0.65em]">
                {workspaceActivity.map((a) => (
                  <div key={a.what} className="flex gap-[0.5em]">
                    <Avatar initials={a.who} />
                    <p className="min-w-0 text-[0.75em] leading-snug text-ink-soft">
                      <span className="font-semibold text-ink">{a.who}</span> {a.what}
                      <span className="mt-[0.15em] block text-[0.85em] text-ink-faint">{a.when}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* ==================================================================
   Variant: CRM
================================================================== */

function CrmMock() {
  return (
    <Chrome label={`${crmName} — Clients`}>
      <div className="flex h-full">
        <Sidebar
          brand="meridian"
          active="Contacts"
          items={[
            { label: "Contacts", icon: Users },
            { label: "Pipeline", icon: LayoutList },
            { label: "Activity", icon: Activity },
            { label: "Reports", icon: BarChart3 },
            { label: "Settings", icon: Settings },
          ]}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[0.7em] bg-white p-[0.9em]">
          <div className="flex items-center justify-between gap-[0.6em]">
            <div className="min-w-0">
              <p className="text-[1.05em] font-semibold tracking-[-0.02em]">Clients</p>
              <p className="text-[0.72em] text-ink-faint">21 open deals — updated 12 minutes ago</p>
            </div>
            <div className="flex shrink-0 items-center gap-[0.45em]">
              <GhostButton icon={ChevronDown}>All stages</GhostButton>
              <GhostButton icon={SlidersHorizontal}>Filters</GhostButton>
              <PrimaryButton icon={Plus}>Add client</PrimaryButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[0.5em]">
            <MetricCard label="Pipeline value" value="$207k" delta="+18% this quarter" />
            <MetricCard label="Open deals" value="21" delta="6 proposal stage" />
            <MetricCard label="Win rate" value="34%" delta="+3 pts" />
          </div>

          <div className="grid grid-cols-[1.35fr_1fr] gap-[0.6em]">
            <div className="mk-card flex flex-col">
              <PanelHeader title="All clients" meta="6 shown" action={<SearchPill label="Find a client…" />} />
              <div className="grid grid-cols-[1.6fr_0.9fr_0.7fr] gap-[0.5em] border-b border-line px-[0.8em] py-[0.4em] text-[0.65em] font-medium tracking-[0.08em] text-ink-faint uppercase">
                <span>Client</span>
                <span>Stage</span>
                <span className="text-right">Value</span>
              </div>
              {crmClients.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-[1.6fr_0.9fr_0.7fr] items-center gap-[0.5em] border-b border-line px-[0.8em] py-[0.5em] text-[0.8em] last:border-b-0"
                >
                  <span className="flex min-w-0 items-center gap-[0.5em]">
                    <Avatar initials={c.contact.slice(0, 1)} />
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{c.name}</span>
                      <span className="block truncate text-[0.85em] text-ink-faint">{c.contact}</span>
                    </span>
                  </span>
                  <span>
                    <StatusPill status={c.stage} />
                  </span>
                  <span className="text-right font-semibold">{c.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[0.6em]">
              <div className="mk-card">
                <PanelHeader title="Pipeline" meta="$207k" />
                <div className="grid grid-cols-2 gap-[0.45em] p-[0.6em]">
                  {crmPipeline.map((s) => (
                    <div key={s.stage} className="mk-card-soft px-[0.55em] py-[0.45em]">
                      <span className="flex items-center justify-between text-[0.68em] text-ink-faint">
                        {s.stage}
                        <span className="font-semibold text-ink">{s.count}</span>
                      </span>
                      <span className="mt-[0.1em] block text-[0.85em] font-semibold">{s.total}</span>
                      <span className="mt-[0.35em] block truncate rounded-[0.3em] border border-line bg-white px-[0.4em] py-[0.2em] text-[0.65em] text-ink-soft">
                        {s.cards[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mk-card flex-1">
                <PanelHeader title="Follow-ups" meta="This week" />
                <div className="flex flex-col">
                  {crmActivity.map((a) => (
                    <div key={a.what} className="flex gap-[0.5em] border-b border-line px-[0.7em] py-[0.45em] last:border-b-0">
                      <span className="mt-[0.45em] size-[0.4em] shrink-0 rounded-full bg-violet" aria-hidden="true" />
                      <span className="min-w-0 text-[0.72em] leading-snug text-ink-soft">
                        <span className="block font-medium text-ink">{a.what}</span>
                        <span className="text-ink-faint">{a.when}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* ==================================================================
   Variant: administration system (tables + statuses)
================================================================== */

function AdminMock() {
  const columns = "grid-cols-[0.75fr_1.7fr_0.9fr_0.85fr_0.55fr]";
  return (
    <Chrome label="Northwind Admin — Records">
      <div className="flex h-full">
        <Sidebar
          brand="northwind"
          active="Records"
          items={[
            { label: "Dashboard", icon: LayoutGrid },
            { label: "Records", icon: FileText },
            { label: "Approvals", icon: CircleCheck },
            { label: "People", icon: Users },
            { label: "Reports", icon: BarChart3 },
          ]}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[0.7em] bg-white p-[0.9em]">
          <div className="flex items-center justify-between gap-[0.6em]">
            <div className="min-w-0">
              <p className="text-[1.05em] font-semibold tracking-[-0.02em]">Records</p>
              <p className="text-[0.72em] text-ink-faint">Sync completed 2 minutes ago</p>
            </div>
            <div className="flex shrink-0 items-center gap-[0.45em]">
              <GhostButton>Export</GhostButton>
              <PrimaryButton icon={Plus}>New record</PrimaryButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[0.5em]">
            {adminMetrics.map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} delta={m.trend} />
            ))}
          </div>

          <div className="flex items-center gap-[0.45em]">
            <SearchPill label="Search records…" />
            <GhostButton icon={ChevronDown}>All statuses</GhostButton>
            <GhostButton icon={ChevronDown}>Any owner</GhostButton>
            <GhostButton icon={SlidersHorizontal}>Columns</GhostButton>
          </div>

          <div className="mk-card flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className={`grid ${columns} gap-[0.5em] border-b border-line bg-paper px-[0.8em] py-[0.4em] text-[0.65em] font-medium tracking-[0.08em] text-ink-faint uppercase`}>
              <span>ID</span>
              <span>Record</span>
              <span>Status</span>
              <span>Owner</span>
              <span className="text-right">Updated</span>
            </div>
            {adminRows.map((r) => (
              <div
                key={r.id}
                className={`grid ${columns} items-center gap-[0.5em] border-b border-line px-[0.8em] py-[0.5em] text-[0.78em] last:border-b-0`}
              >
                <span className="font-mono text-[0.9em] text-ink-faint">{r.id}</span>
                <span className="truncate font-medium">{r.name}</span>
                <span>
                  <StatusPill status={r.status} />
                </span>
                <span className="truncate text-ink-soft">{r.owner}</span>
                <span className="text-right text-ink-faint">{r.updated}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* ==================================================================
   Variant: custom web application (portal)
================================================================== */

function AppMock() {
  const progress = [
    { name: "Client onboarding", owner: "Dana H.", pct: 72 },
    { name: "Billing migration", owner: "Omar R.", pct: 45 },
    { name: "Support portal", owner: "June P.", pct: 88 },
  ];
  return (
    <Chrome label="Beacon — Projects">
      <div className="flex h-full">
        <Sidebar
          brand="beacon"
          active="Home"
          items={[
            { label: "Home", icon: Home },
            { label: "Projects", icon: FolderKanban },
            { label: "Files", icon: FileText },
            { label: "Invoices", icon: Wallet },
            { label: "Settings", icon: Settings },
          ]}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-[0.7em] bg-white p-[0.9em]">
          <div className="flex items-center justify-between gap-[0.6em]">
            <div className="min-w-0">
              <p className="text-[0.7em] text-ink-faint">Home / Projects</p>
              <p className="text-[1.05em] font-semibold tracking-[-0.02em]">Projects</p>
            </div>
            <div className="flex shrink-0 items-center gap-[0.45em]">
              <SearchPill />
              <PrimaryButton icon={Plus}>New project</PrimaryButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[0.5em]">
            <MetricCard label="Active projects" value="9" delta="3 due this week" />
            <MetricCard label="Files shared" value="214" delta="+18 this month" />
            <MetricCard label="Awaiting you" value="5" delta="2 approvals" />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-[0.6em]">
            <div className="mk-card flex flex-col">
              <PanelHeader title="Active projects" meta="By completion" />
              <div className="flex flex-col gap-[0.7em] px-[0.8em] py-[0.7em]">
                {progress.map((p) => (
                  <div key={p.name}>
                    <div className="flex items-baseline justify-between text-[0.78em]">
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-ink-faint">{p.pct}%</span>
                    </div>
                    <div className="mt-[0.35em] flex items-center gap-[0.5em]">
                      <span className="h-[0.4em] flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
                        <span className="block h-full rounded-full bg-violet" style={{ width: `${p.pct}%` }} />
                      </span>
                      <Avatar initials={p.owner.slice(0, 2)} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-line px-[0.8em] py-[0.5em] text-[0.72em] text-ink-faint">
                View all 9 projects
                <ArrowUpRight className="size-[1em]" aria-hidden="true" />
              </div>
            </div>

            <div className="flex flex-col gap-[0.6em]">
              <div className="mk-card">
                <PanelHeader title="Quick actions" />
                <div className="flex flex-col px-[0.6em] py-[0.5em]">
                  {[Mail, Upload, Users].map((Icon, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-[0.5em] rounded-[0.35em] px-[0.4em] py-[0.38em] text-[0.78em] text-ink-soft"
                    >
                      <Icon className="size-[1em] text-violet" aria-hidden="true" />
                      {["Message the team", "Upload a file", "Invite a client"][i]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mk-card flex-1">
                <PanelHeader title="Notifications" meta="2 new" />
                <div className="flex flex-col gap-[0.5em] px-[0.7em] py-[0.6em]">
                  <p className="flex gap-[0.45em] text-[0.72em] leading-snug text-ink-soft">
                    <Bell className="mt-[0.15em] size-[1em] shrink-0 text-violet" aria-hidden="true" />
                    Dana approved the onboarding spec
                  </p>
                  <p className="flex gap-[0.45em] text-[0.72em] leading-snug text-ink-soft">
                    <Target className="mt-[0.15em] size-[1em] shrink-0 text-violet" aria-hidden="true" />
                    Support portal reached 88% completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* ==================================================================
   Variant: analytics dashboard
================================================================== */

function AnalyticsMock() {
  return (
    <Chrome label="Pulse Analytics — Revenue">
      <div className="flex flex-col gap-[0.7em] bg-white p-[0.9em]">
        <div className="flex items-center justify-between gap-[0.6em]">
          <div className="min-w-0">
            <p className="text-[1.05em] font-semibold tracking-[-0.02em]">Revenue overview</p>
            <p className="text-[0.72em] text-ink-faint">Rolling 12 months — all segments</p>
          </div>
          <div className="flex shrink-0 items-center gap-[0.45em]">
            <GhostButton icon={ChevronDown}>Last 12 months</GhostButton>
            <GhostButton icon={SlidersHorizontal}>Compare</GhostButton>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[0.5em]">
          {analyticsKpis.map((k) => (
            <MetricCard key={k.label} label={k.label} value={k.value} delta={k.change} />
          ))}
        </div>

        <div className="mk-card">
          <PanelHeader title="Monthly revenue" meta="USD, thousands" action={<GhostButton icon={MoreHorizontal}> </GhostButton>} />
          <div className="px-[0.8em] pt-[0.6em] pb-[0.45em]">
            <Chart data={revenueSeries} className="h-[7.5em]" />
            <div className="mt-[0.3em] flex justify-between text-[0.62em] text-ink-faint">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[0.6em]">
          <div className="mk-card">
            <PanelHeader title="Weekly activity" meta="Sessions" />
            <div className="px-[0.8em] py-[0.65em]">
              <Bars data={activityBars} accentFrom={8} className="h-[4.5em]" />
            </div>
          </div>
          <div className="mk-card">
            <PanelHeader title="Conversion funnel" meta="Last 30 days" />
            <div className="flex flex-col gap-[0.4em] px-[0.8em] py-[0.6em]">
              {funnelSteps.map((f, i) => (
                <div key={f.label} className="flex items-center gap-[0.5em] text-[0.7em]">
                  <span className="w-[4.5em] shrink-0 text-ink-faint">{f.label}</span>
                  <span className="h-[0.55em] flex-1 overflow-hidden rounded-full bg-ink/[0.06]">
                    <span
                      className={`block h-full rounded-full ${i === funnelSteps.length - 1 ? "bg-lime" : "bg-violet"}`}
                      style={{ width: `${f.value}%` }}
                    />
                  </span>
                  <span className="w-[2.4em] shrink-0 text-right font-semibold">{f.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

/* ==================================================================
   Variant: editorial portfolio website
================================================================== */

function PortfolioMock() {
  return (
    <div className="mk-window flex h-full flex-col bg-white">
      <div className="flex items-center justify-between gap-[0.6em] border-b border-line px-[1.1em] py-[0.7em]">
        <span className="font-display text-[0.95em] font-semibold tracking-[-0.03em]">atelier.</span>
        <span className="flex items-center gap-[1em] text-[0.75em] text-ink-soft">
          <span className="font-medium text-ink">Work</span>
          <span>Studio</span>
          <span>Journal</span>
          <span>Contact</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-[0.9em] px-[1.1em] py-[1.1em]">
        <div className="flex items-end justify-between gap-[1em]">
          <h3 className="font-display text-[2.5em] leading-[1.02] font-medium tracking-[-0.04em]">
            Design for
            <br />
            public life.
          </h3>
          <p className="max-w-[12em] pb-[0.4em] text-[0.72em] leading-relaxed text-ink-soft">
            A studio practice spanning research, identity and wayfinding for civic spaces.
          </p>
        </div>

        <div className="relative h-[8.5em] overflow-hidden rounded-[0.5em] bg-paper-2" aria-hidden="true">
          <span className="absolute inset-y-0 left-0 block w-[34%] bg-violet" />
          <span className="absolute top-[16%] left-[24%] block size-[5.2em] rounded-full border-[0.3em] border-ink" />
          <span className="absolute right-[6%] bottom-0 block h-[42%] w-[26%] bg-lime" />
          <span className="absolute top-[22%] right-[14%] block h-[36%] w-[14%] bg-paper" />
        </div>

        <div className="flex flex-col">
          {portfolioProjects.map((p) => (
            <div
              key={p.title}
              className="flex items-center justify-between gap-[0.8em] border-t border-line py-[0.55em] text-[0.8em]"
            >
              <span className="font-medium">{p.title}</span>
              <span className="text-[0.8em] text-ink-faint">{p.tag}</span>
              <span className="text-ink-faint">{p.year}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line bg-paper px-[1.1em] py-[0.6em] text-[0.75em]">
        <span className="text-ink-faint">Selected work — 2024–2026</span>
        <span className="flex items-center gap-[0.35em] font-medium text-ink">
          View full portfolio
          <ArrowUpRight className="size-[1em]" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ==================================================================
   Variant: digital storefront
================================================================== */

function StorefrontMock() {
  const products = [
    { name: "Stoneware pour-over", material: "Glazed ceramic", price: "$48" },
    { name: "Linen field apron", material: "Washed flax", price: "$64" },
    { name: "Brass timer", material: "Solid brass", price: "$38" },
  ];
  return (
    <div className="mk-window flex h-full flex-col bg-white">
      <div className="flex items-center justify-between gap-[0.6em] border-b border-line px-[1.2em] py-[0.75em]">
        <span className="font-display text-[1em] font-semibold tracking-[-0.03em]">forma.</span>
        <span className="flex items-center gap-[1.1em] text-[0.78em] text-ink-soft">
          <span>Shop</span>
          <span>Collections</span>
          <span>Journal</span>
          <span>About</span>
          <span className="flex items-center gap-[0.35em] font-medium text-ink">
            <ShoppingCart className="size-[1em]" aria-hidden="true" />
            Cart (2)
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-[1em] px-[1.2em] py-[1.2em]">
        <div className="flex items-end justify-between gap-[1.2em]">
          <h3 className="max-w-[9em] font-display text-[2.7em] leading-[1.01] font-medium tracking-[-0.04em]">
            Objects for slow mornings.
          </h3>
          <div className="flex shrink-0 flex-col items-end gap-[0.6em] pb-[0.3em]">
            <p className="max-w-[11em] text-right text-[0.72em] leading-relaxed text-ink-soft">
              Small-batch kitchenware, built to be used every day.
            </p>
            <PrimaryButton>Shop the collection</PrimaryButton>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[0.6em]">
          <div className="relative h-[6.5em] overflow-hidden rounded-[0.45em] bg-paper-2" aria-hidden="true">
            <span className="absolute top-[18%] left-1/2 block size-[3.4em] -translate-x-1/2 rounded-full bg-violet/85" />
            <span className="absolute bottom-0 left-0 block h-[26%] w-full bg-violet/15" />
          </div>
          <div className="relative h-[6.5em] overflow-hidden rounded-[0.45em] bg-ink" aria-hidden="true">
            <span className="absolute top-[20%] left-[18%] block h-[55%] w-[26%] rounded-[0.25em] bg-lime" />
            <span className="absolute top-[20%] right-[18%] block h-[55%] w-[26%] rounded-[0.25em] bg-paper" />
          </div>
          <div className="relative h-[6.5em] overflow-hidden rounded-[0.45em] bg-paper-2" aria-hidden="true">
            <span className="absolute inset-x-[24%] top-[16%] block h-[58%] rounded-[0.3em] bg-violet/70" />
            <span className="absolute bottom-[8%] left-1/2 block h-[8%] w-[44%] -translate-x-1/2 rounded-full bg-ink/20" />
          </div>
        </div>

        <div className="flex flex-col">
          {products.map((p) => (
            <div key={p.name} className="flex items-center justify-between gap-[0.8em] border-t border-line py-[0.5em] text-[0.8em]">
              <span className="font-medium">{p.name}</span>
              <span className="text-[0.9em] text-ink-faint">{p.material}</span>
              <span className="font-semibold">{p.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-[0.8em] bg-ink px-[1.2em] py-[0.7em] text-paper">
        <span className="text-[0.8em] font-medium">New here? Take $10 off your first order.</span>
        <span className="rounded-[0.45em] bg-lime px-[0.8em] py-[0.35em] text-[0.78em] font-semibold text-ink">
          Claim the offer
        </span>
      </div>
    </div>
  );
}

/* ==================================================================
   Variant: MVP / startup product (mobile + desktop family)
================================================================== */

function PhoneScreen({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="mk-window flex w-[8.2em] shrink-0 flex-col bg-white" role="img" aria-label={label}>
      <div className="flex items-center justify-between px-[0.7em] pt-[0.5em] pb-[0.2em] text-[0.6em] text-ink-faint">
        <span>9:41</span>
        <span className="mx-auto block h-[0.3em] w-[2.4em] rounded-full bg-ink/15" aria-hidden="true" />
        <span>100%</span>
      </div>
      <div className="flex flex-1 flex-col gap-[0.5em] p-[0.6em]">{children}</div>
    </div>
  );
}

function MvpMock() {
  return (
    <div className="flex items-stretch gap-[0.9em]">
      <div className="min-w-0 flex-1">
        <Chrome label="Loop — Rentals">
          <div className="flex flex-col gap-[0.6em] bg-white p-[0.8em]">
            <div className="flex items-center justify-between">
              <span className="text-[0.9em] font-semibold tracking-[-0.02em]">Today’s rentals</span>
              <PrimaryButton icon={Plus}>New</PrimaryButton>
            </div>
            <div className="grid grid-cols-3 gap-[0.45em]">
              <MetricCard label="Out" value="14" />
              <MetricCard label="Due today" value="5" />
              <MetricCard label="Overdue" value="1" />
            </div>
            <div className="mk-card flex flex-col">
              {[
                { n: "Kestrel — e-bike", s: "In progress" },
                { n: "Alder — cargo trailer", s: "Pending" },
                { n: "Fieldnote — camera kit", s: "Done" },
              ].map((r) => (
                <div key={r.n} className="flex items-center justify-between gap-[0.5em] border-b border-line px-[0.7em] py-[0.45em] text-[0.75em] last:border-b-0">
                  <span className="truncate font-medium">{r.n}</span>
                  <StatusPill status={r.s} />
                </div>
              ))}
            </div>
            <div className="mk-card-soft flex items-center gap-[0.5em] px-[0.6em] py-[0.45em] text-[0.7em] text-ink-soft">
              <Activity className="size-[1em] text-violet" aria-hidden="true" />
              Sync healthy — last update 2 minutes ago
            </div>
          </div>
        </Chrome>
      </div>

      <PhoneScreen label="MVP mobile — home feed">
        <div className="flex items-center justify-between">
          <span className="text-[0.8em] font-semibold">loop</span>
          <Avatar initials="JR" />
        </div>
        <div className="rounded-[0.5em] bg-violet p-[0.6em] text-white">
          <p className="text-[0.62em] opacity-80">Next booking</p>
          <p className="text-[0.85em] font-semibold">Sat, 10:00 — e-bike</p>
        </div>
        {["City loop ride", "Weekend cargo", "Camera walk"].map((t) => (
          <span key={t} className="flex items-center gap-[0.45em] rounded-[0.45em] border border-line px-[0.5em] py-[0.4em] text-[0.68em]">
            <span className="block size-[1.4em] rounded-[0.25em] bg-paper-2" aria-hidden="true" />
            <span className="truncate font-medium">{t}</span>
          </span>
        ))}
        <span className="mt-auto flex justify-around border-t border-line pt-[0.5em] text-ink-faint" aria-hidden="true">
          <Home className="size-[1em] text-violet" />
          <LayoutList className="size-[1em]" />
          <Bell className="size-[1em]" />
          <Settings className="size-[1em]" />
        </span>
      </PhoneScreen>

      <PhoneScreen label="MVP mobile — onboarding">
        <div className="flex h-full flex-col gap-[0.55em]">
          <div className="relative h-[5.5em] overflow-hidden rounded-[0.5em] bg-paper-2" aria-hidden="true">
            <span className="absolute inset-y-0 left-0 block w-[46%] bg-violet" />
            <span className="absolute top-[24%] right-[14%] block size-[2.6em] rounded-full border-[0.25em] border-ink" />
          </div>
          <p className="font-display text-[1em] leading-tight font-semibold tracking-[-0.03em]">
            Rent less.
            <br />
            Own the weekend.
          </p>
          <p className="text-[0.65em] leading-relaxed text-ink-soft">
            Book gear from people nearby in under a minute.
          </p>
          <span className="mt-auto rounded-[0.45em] bg-violet px-[0.6em] py-[0.45em] text-center text-[0.7em] font-medium text-white">
            Get started
          </span>
          <span className="mx-auto flex gap-[0.3em]" aria-hidden="true">
            <span className="block size-[0.35em] rounded-full bg-violet" />
            <span className="block size-[0.35em] rounded-full bg-ink/15" />
            <span className="block size-[0.35em] rounded-full bg-ink/15" />
          </span>
        </div>
      </PhoneScreen>
    </div>
  );
}

/* ==================================================================
   Public API
================================================================== */

const variants: Record<MockupVariant, () => React.ReactElement> = {
  workspace: WorkspaceMock,
  crm: CrmMock,
  admin: AdminMock,
  app: AppMock,
  analytics: AnalyticsMock,
  portfolio: PortfolioMock,
  storefront: StorefrontMock,
  mvp: MvpMock,
};

type ProductMockupProps = {
  variant: MockupVariant;
  className?: string;
  /** Accessible description of what the mockup depicts. */
  alt: string;
};

/**
 * Reusable product interface mockup. All interfaces share one sample-data
 * family and one type scale so the set reads as a single product family.
 */
export function ProductMockup({ variant, className = "", alt }: ProductMockupProps) {
  const Variant = variants[variant];
  return (
    <div className={`mk ${className}`}>
      <div className="mk-root" role="img" aria-label={alt}>
        <Variant />
      </div>
    </div>
  );
}
