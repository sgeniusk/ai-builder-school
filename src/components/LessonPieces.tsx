import type { ReactNode } from "react";
import { Badge } from "./Badges";

export function CalloutBox({
  tone = "default",
  title,
  children,
}: {
  tone?: "default" | "brand" | "accent" | "warning";
  title?: string;
  children: ReactNode;
}) {
  const toneCls =
    tone === "brand"
      ? "border-brand-100 bg-brand-50 text-brand-900"
      : tone === "accent"
        ? "border-accent-500/40 bg-accent-500/10 text-ink-800"
        : tone === "warning"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-ink-100 bg-surface-muted text-ink-800";
  return (
    <aside className={`rounded-2xl border p-5 ${toneCls}`}>
      {title && <div className="mb-1 text-sm font-semibold">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  );
}

export function SectionBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      {eyebrow && (
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 prose-ko">{children}</div>
    </section>
  );
}

export function MissionBlock({
  tool,
  body,
}: {
  tool: "codex" | "claude";
  body: string;
}) {
  const label = tool === "codex" ? "Codex 미션" : "Claude Code 미션";
  const dotCls = tool === "codex" ? "bg-emerald-500" : "bg-brand-600";
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dotCls}`} />
        <div className="text-sm font-semibold text-ink-900">{label}</div>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-700">{body}</p>
    </div>
  );
}

export function VerificationChecklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm"
        >
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border border-ink-200 text-[11px] text-ink-400"
          >
            ✓
          </span>
          <span className="text-ink-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm">
          <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink-900 text-[11px] font-semibold text-white">
            {i + 1}
          </span>
          <span className="text-ink-700">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function KeyConcepts({
  items,
}: {
  items: Array<{ term: string; explanation: string }>;
}) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((c) => (
        <div
          key={c.term}
          className="rounded-2xl border border-ink-100 bg-white p-5"
        >
          <dt className="text-sm font-semibold text-ink-900">{c.term}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink-500">
            {c.explanation}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ReflectionList({ questions }: { questions: string[] }) {
  return (
    <ol className="space-y-2">
      {questions.map((q, i) => (
        <li
          key={i}
          className="rounded-xl border border-ink-100 bg-surface-muted px-4 py-3 text-sm leading-relaxed text-ink-700"
        >
          <span className="mr-2 font-mono text-xs text-ink-400">Q{i + 1}.</span>
          {q}
        </li>
      ))}
    </ol>
  );
}

export function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge key={tag} tone="muted">
          #{tag}
        </Badge>
      ))}
    </div>
  );
}
