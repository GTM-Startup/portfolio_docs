import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondaryDark" | "lime";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  ariaLabel?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-violet text-white border border-violet hover:bg-violet-deep hover:border-violet-deep shadow-[0_1px_2px_rgba(22,19,29,0.16),0_14px_30px_-18px_rgba(91,50,255,0.85)] hover:shadow-[0_1px_2px_rgba(22,19,29,0.2),0_18px_36px_-18px_rgba(91,50,255,0.95)] hover:-translate-y-px active:translate-y-0",
  secondary:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink/[0.04]",
  secondaryDark:
    "border border-line-dark text-paper hover:border-white/55 hover:bg-white/[0.06]",
  lime: "bg-lime text-ink border border-lime hover:brightness-[1.06] hover:-translate-y-px active:translate-y-0",
};

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-7 text-[0.9375rem] sm:h-[3.25rem] sm:px-8 sm:text-base",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
