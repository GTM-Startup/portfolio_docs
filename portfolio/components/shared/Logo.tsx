import Link from "next/link";

type LogoProps = {
  className?: string;
  /** "ink" for light surfaces, "paper" for dark surfaces. */
  tone?: "ink" | "paper";
  href?: string;
  markOnly?: boolean;
};

/**
 * ideaforge wordmark with a simple geometric mark:
 * a half-disc (the idea) resolving into a structured block (the product).
 */
export function Logo({ className = "", tone = "ink", href = "/", markOnly = false }: LogoProps) {
  const wordColor = tone === "ink" ? "text-ink" : "text-paper";

  const mark = (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={`h-[26px] w-[26px] shrink-0 ${tone === "ink" ? "text-ink" : "text-paper"}`}
    >
      <path d="M14 1 A13 13 0 0 0 14 27 Z" fill="var(--color-violet)" />
      <path
        d="M16 1 h7 a4 4 0 0 1 4 4 v18 a4 4 0 0 1 -4 4 h-7 Z"
        fill="currentColor"
      />
    </svg>
  );

  if (markOnly) return mark;

  return (
    <Link
      href={href}
      aria-label="ideaforge — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      {mark}
      <span
        className={`font-display text-[1.35rem] leading-none font-medium tracking-[-0.045em] ${wordColor} transition-opacity duration-300 group-hover:opacity-70`}
      >
        ideaforge
      </span>
    </Link>
  );
}
