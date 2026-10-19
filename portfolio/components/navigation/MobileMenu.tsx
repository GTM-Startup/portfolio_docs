"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ButtonLink } from "@/components/shared/Button";
import { siteConfig } from "@/lib/site-config";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when the route changes and lock scrolling while open.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    // Remember what opened the menu so focus can be returned on close.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep Tab focus inside the dialog while it is open.
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  // Render into a portal so no ancestor with a transform, filter, or
  // backdrop-blur can become the containing block for this fixed panel.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper outline-none lg:hidden"
          initial={{ opacity: 0, y: reduced ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
            {siteConfig.navigation.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduced ? 0 : 0.05 + i * 0.045,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between border-b border-line py-4 font-display text-[1.6rem] font-medium tracking-[-0.03em] text-ink transition-colors hover:text-violet"
                >
                  {link.label}
                  <ArrowUpRight className="size-5 text-ink-faint" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}

            <ButtonLink
              href={siteConfig.cta.href}
              size="lg"
              className="mt-7 w-full"
              onClick={onClose}
            >
              {siteConfig.cta.label}
            </ButtonLink>

            <p className="label-mono mt-8 pb-6 text-ink-faint">{siteConfig.label}</p>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
