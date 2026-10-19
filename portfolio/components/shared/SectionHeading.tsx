import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  label: string;
  /** Line breaks are preserved — use "\n" between headline lines. */
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** Optional content rendered under the description (e.g. a note). */
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  tone = "light",
  align = "left",
  children,
  className = "",
}: SectionHeadingProps) {
  const labelColor = tone === "light" ? "text-ink-soft" : "text-paper-soft";
  const titleColor = tone === "light" ? "text-ink" : "text-paper";
  const bodyColor = tone === "light" ? "text-ink-soft" : "text-paper-soft";
  const marker = tone === "light" ? "bg-violet" : "bg-lime";

  return (
    <Reveal className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <p className={`label-mono flex items-center gap-3 ${labelColor} ${align === "center" ? "justify-center" : ""}`}>
        <span className={`inline-block h-[7px] w-[7px] rounded-[1px] ${marker}`} aria-hidden="true" />
        {label}
      </p>
      <h2 className={`display-lg mt-6 whitespace-pre-line ${titleColor}`}>{title}</h2>
      {description ? (
        <p className={`body-lg mt-6 max-w-2xl ${bodyColor} ${align === "center" ? "mx-auto" : ""}`}>{description}</p>
      ) : null}
      {children}
    </Reveal>
  );
}
