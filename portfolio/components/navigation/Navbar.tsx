"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/shared/Button";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/lib/site-config";
import { MobileMenu } from "./MobileMenu";

const SPY_SECTION_IDS = ["capabilities", "process", "work", "about"] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  // Background + border transition after leaving the top of the page.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y < 420) setActiveSection(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — only meaningful on the homepage. The active id is kept in
  // state and *derived* per pathname rather than reset inside an effect.
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const id of SPY_SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  const active = pathname === "/" ? activeSection : null;
  const headerSurface = open
    ? "border-line bg-paper"
    : scrolled
      ? "border-line bg-paper/85 backdrop-blur-md"
      : "border-transparent bg-transparent";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${headerSurface}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[76px] lg:px-10">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {siteConfig.navigation.map((link) => {
            const isActive = link.href.startsWith("/#") && active === link.href.slice(2);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
                  isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 block h-[2px] rounded-full bg-violet"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ButtonLink href={siteConfig.cta.href} className="hidden sm:inline-flex" ariaLabel="Let's Talk — start a project">
            {siteConfig.cta.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line-strong text-ink transition-colors hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
