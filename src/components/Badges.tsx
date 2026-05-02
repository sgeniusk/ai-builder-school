import type { ReactNode } from "react";
import { LEVEL_LABEL, type Level } from "@/lib/types";

type Tone = "default" | "brand" | "accent" | "muted" | "success" | "warning";

const toneClass: Record<Tone, string> = {
  default: "bg-ink-100 text-ink-700 border-ink-200",
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  accent: "bg-accent-500/15 text-accent-600 border-accent-500/30",
  muted: "bg-surface-muted text-ink-500 border-ink-100",
  success: "bg-emerald-50 text-emerald-700 border-emerald-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
};

export function Badge({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ level }: { level: Level }) {
  const tone = level === "beginner" ? "success" : level === "intermediate" ? "accent" : "warning";
  return <Badge tone={tone}>{LEVEL_LABEL[level]}</Badge>;
}

export function DeliverableBadge({ children }: { children: ReactNode }) {
  return <Badge tone="muted">산출물 · {children}</Badge>;
}

export function WeekBadge({ week }: { week: number }) {
  return <Badge tone="accent">Week {week}</Badge>;
}

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-500">
      {children}
    </span>
  );
}
