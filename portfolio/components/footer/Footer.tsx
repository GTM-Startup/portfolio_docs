import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/lib/site-config";
import { capabilities } from "@/lib/project-data";

export function Footer() {
  const year = 2026; // Static value — `new Date()` is not allowed during prerendering.

  return (
    <footer className="border-t border-line-dark bg-night text-paper">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Brand */}
          <div className="max-w-[340px]">
            <Logo tone="paper" />
            <p className="mt-5 font-display text-[1.35rem] leading-snug font-medium tracking-[-0.02em] text-paper">
              From idea to impact.
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-paper-soft">
              An independent digital product studio. We turn ambitious ideas into tools your
              business can actually use.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="label-mono text-paper-soft/70">Navigate</p>
            <ul className="mt-5 flex flex-col gap-3">
              {siteConfig.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-paper-soft transition-colors duration-200 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Capabilities */}
          <nav aria-label="Capabilities">
            <p className="label-mono text-paper-soft/70">Capabilities</p>
            <ul className="mt-5 flex flex-col gap-3">
              {capabilities.map((c) => (
                <li key={c.id}>
                  <Link
                    href="/#capabilities"
                    className="text-[0.95rem] text-paper-soft transition-colors duration-200 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — configuration placeholders, intentionally unfilled */}
          <div>
            <p className="label-mono text-paper-soft/70">Contact</p>
            <div className="mt-5 flex flex-col gap-3 text-[0.95rem]">
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-[10px] bg-violet px-4 py-2.5 font-medium text-white transition-colors duration-300 hover:bg-violet-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
              >
                Start a project
              </Link>
              <p className="text-paper-soft">
                Email{" "}
                <span className="text-paper-soft/60 italic">— not yet configured</span>
              </p>
              <p className="text-paper-soft">
                Phone{" "}
                <span className="text-paper-soft/60 italic">— not yet configured</span>
              </p>
              <p className="text-[0.85rem] leading-relaxed text-paper-soft/70">
                Real contact details and social profiles will be published here as soon as they&apos;re
                supplied. Until then, the inquiry form is the way in.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line-dark pt-7">
          <p className="text-[0.85rem] text-paper-soft/80">
            © {year} ideaforge. All rights reserved.
          </p>
          <p className="label-mono text-paper-soft/60">From idea to impact.</p>
        </div>
      </div>
    </footer>
  );
}
