"use client";

import { Check, Copy, Mail, Pencil, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/shared/Button";
import { siteConfig } from "@/lib/site-config";
import { productTypes, projectStages } from "@/lib/project-data";

type Values = {
  name: string;
  email: string;
  company: string;
  type: string;
  stage: string;
  description: string;
};

type FieldKey = keyof Values;
type Errors = Partial<Record<FieldKey, string>>;

const emptyValues: Values = {
  name: "",
  email: "",
  company: "",
  type: "",
  stage: "",
  description: "",
};

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That doesn’t look like a valid email address.";
  }

  if (!values.type) {
    errors.type = "Choose the type of product you have in mind.";
  }

  if (!values.stage) {
    errors.stage = "Choose the stage you’re at right now.";
  }

  if (!values.description.trim()) {
    errors.description = "Tell us a little about the idea, problem or opportunity.";
  } else if (values.description.trim().length < 20) {
    errors.description = "A few more sentences will help — at least 20 characters.";
  }

  return errors;
}

const fieldBase =
  "w-full rounded-[10px] border bg-white px-4 py-3 text-[0.95rem] text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-ink-faint focus:outline-none focus:border-violet focus:ring-4 focus:ring-violet/15";

const fieldOk = "border-line-strong";
const fieldError = "border-alert focus:border-alert focus:ring-alert/15";

type FieldProps = {
  id: FieldKey;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
};

function Field({ id, label, error, optional, children }: FieldProps) {
  return (
    <div className={id === "description" || id === "company" ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.875rem] font-medium text-ink">
        {label}
        {optional ? <span className="text-[0.78rem] font-normal text-ink-faint">Optional</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8rem] text-alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ProjectInquiryForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    company: false,
    type: false,
    stage: false,
    description: false,
  });
  const [attempted, setAttempted] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const configuredEmail = siteConfig.contact.email;

  const summary = useMemo(() => {
    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company ? `Company / project: ${values.company}` : null,
      `Product type: ${values.type}`,
      `Project stage: ${values.stage}`,
      "",
      "Project description:",
      values.description,
    ].filter((line): line is string => line !== null);
    return lines.join("\n");
  }, [values]);

  const set = (key: FieldKey) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
  };

  const blur = (key: FieldKey) => () => setTouched((t) => ({ ...t, [key]: true }));

  const showError = (key: FieldKey) => (touched[key] || attempted ? errors[key] : undefined);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    const invalid = (Object.keys(errors) as FieldKey[]).filter((key) => errors[key]);
    if (invalid.length > 0) {
      const first = invalid[0];
      requestAnimationFrame(() => document.getElementById(first)?.focus());
      return;
    }

    setTouched({
      name: true,
      email: true,
      company: true,
      type: true,
      stage: true,
      description: true,
    });
    setDone(true);
  };

  const copySummary = async () => {
    let success = false;
    try {
      await navigator.clipboard.writeText(summary);
      success = true;
    } catch {
      // Fallback for contexts where the async clipboard API is unavailable.
      try {
        const helper = document.createElement("textarea");
        helper.value = summary;
        helper.setAttribute("readonly", "");
        helper.style.cssText = "position:fixed;top:0;left:-9999px";
        document.body.appendChild(helper);
        helper.select();
        success = document.execCommand("copy");
        helper.remove();
      } catch {
        success = false;
      }
    }
    setCopied(success);
    if (success) setTimeout(() => setCopied(false), 2500);
  };

  /** Return to the form with every answer intact. */
  const editAnswers = () => setDone(false);

  if (done) {
    return (
      <div
        role="status"
        className="rounded-[16px] border border-line-strong bg-white p-6 shadow-[0_1px_2px_rgba(22,19,29,0.05),0_30px_60px_-40px_rgba(22,19,29,0.5)] sm:p-8"
      >
        <span className="flex size-11 items-center justify-center rounded-full border border-alert/40 bg-alert/10 text-alert">
          <TriangleAlert className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-[1.5rem] leading-snug font-medium tracking-[-0.02em] text-ink">
          This form is a frontend prototype — nothing was sent.
        </h2>
        <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
          This site has no backend, so your inquiry has <strong className="font-semibold text-ink">not</strong>{" "}
          reached the team. Nothing was stored or emailed. Your answers are still here so you can
          copy them and send them through a real channel once one is configured.
        </p>

        <div className="mt-6 rounded-[12px] border border-line bg-paper/70 p-4 sm:p-5">
          <p className="label-mono text-ink-faint">Your inquiry</p>
          <p className="mt-3 text-[0.9rem] leading-relaxed whitespace-pre-wrap text-ink-soft">
            {summary}
          </p>
        </div>

        {configuredEmail ? (
          <div className="mt-6">
            <ButtonLink
              href={`mailto:${configuredEmail}?subject=${encodeURIComponent(`Project inquiry — ${values.company || values.name}`)}&body=${encodeURIComponent(summary)}`}
              variant="primary"
            >
              <Mail className="size-4" aria-hidden="true" />
              Open in your email app
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-6 rounded-[12px] border border-line bg-paper/70 p-4">
            <p className="label-mono text-ink-faint">Configuration notice</p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
              No contact address is configured yet. When one is supplied, it can be added in{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-[0.85rem] text-ink">
                lib/site-config.ts
              </code>{" "}
              and this screen will offer a prefilled email instead.
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copySummary}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-line-strong px-5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet"
          >
            {copied ? <Check className="size-4 text-violet" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy my inquiry"}
          </button>
          <button
            type="button"
            onClick={editAnswers}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet"
          >
            <Pencil className="size-4" aria-hidden="true" />
            Edit my answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-[16px] border border-line-strong bg-white p-6 shadow-[0_1px_2px_rgba(22,19,29,0.05),0_30px_60px_-40px_rgba(22,19,29,0.5)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={showError("name")}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={showError("name") ? "name-error" : undefined}
            className={`${fieldBase} ${showError("name") ? fieldError : fieldOk}`}
          />
        </Field>

        <Field id="email" label="Email" error={showError("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={set("email")}
            onBlur={blur("email")}
            aria-invalid={Boolean(showError("email"))}
            aria-describedby={showError("email") ? "email-error" : undefined}
            className={`${fieldBase} ${showError("email") ? fieldError : fieldOk}`}
          />
        </Field>

        <Field id="company" label="Company or project name" optional error={showError("company")}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme, or a working title"
            value={values.company}
            onChange={set("company")}
            onBlur={blur("company")}
            aria-invalid={Boolean(showError("company"))}
            aria-describedby={showError("company") ? "company-error" : undefined}
            className={`${fieldBase} ${showError("company") ? fieldError : fieldOk}`}
          />
        </Field>

        <Field id="type" label="Type of product" error={showError("type")}>
          <div className="relative">
            <select
              id="type"
              name="type"
              value={values.type}
              onChange={set("type")}
              onBlur={blur("type")}
              aria-invalid={Boolean(showError("type"))}
              aria-describedby={showError("type") ? "type-error" : undefined}
              className={`${fieldBase} appearance-none pr-10 ${showError("type") ? fieldError : fieldOk} ${values.type ? "" : "text-ink-faint"}`}
            >
              <option value="">Choose a product type…</option>
              {productTypes.map((t) => (
                <option key={t} value={t} className="text-ink">
                  {t}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 16 16"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </div>
        </Field>

        <Field id="stage" label="Estimated project stage" error={showError("stage")}>
          <div className="relative">
            <select
              id="stage"
              name="stage"
              value={values.stage}
              onChange={set("stage")}
              onBlur={blur("stage")}
              aria-invalid={Boolean(showError("stage"))}
              aria-describedby={showError("stage") ? "stage-error" : undefined}
              className={`${fieldBase} appearance-none pr-10 ${showError("stage") ? fieldError : fieldOk} ${values.stage ? "" : "text-ink-faint"}`}
            >
              <option value="">Choose your current stage…</option>
              {projectStages.map((s) => (
                <option key={s} value={s} className="text-ink">
                  {s}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 16 16"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </div>
        </Field>

        <Field id="description" label="Project description" error={showError("description")}>
          <textarea
            id="description"
            name="description"
            rows={6}
            placeholder="What are you trying to build, who is it for, and what problem does it solve?"
            value={values.description}
            onChange={set("description")}
            onBlur={blur("description")}
            aria-invalid={Boolean(showError("description"))}
            aria-describedby={showError("description") ? "description-error" : undefined}
            className={`${fieldBase} min-h-[150px] resize-y ${showError("description") ? fieldError : fieldOk}`}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-[10px] border border-violet bg-violet px-7 text-[0.975rem] font-medium text-white shadow-[0_1px_2px_rgba(22,19,29,0.16),0_14px_30px_-18px_rgba(91,50,255,0.85)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-px hover:border-violet-deep hover:bg-violet-deep focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet active:translate-y-0"
        >
          Submit inquiry
        </button>
        <p className="max-w-[330px] text-[0.8rem] leading-relaxed text-ink-faint">
          Frontend prototype — submitting shows a summary screen instead of sending anything.
        </p>
      </div>
    </form>
  );
}
