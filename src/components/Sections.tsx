// 페이지 공통 조각 — PageHead·SectionHeading·StageLadder.
// 2026-06-06 — 리브랜딩 전 구홈 컴포넌트(Hero·UspCards·LearningLoopSection·
// JourneyPicker·BuilderPrinciples·CTASection·StatList)는 미사용이라 제거. 현 홈은 landing/LandingSections.
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Container } from "./Layout";
import type { Stage } from "@/lib/types";

/* ---------------- Reusable PageHead ---------------- */

export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="page-head">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </Container>
    </section>
  );
}

/* ---------------- Section heading (within sections) ---------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-lede">{description}</p>}
    </>
  );
}

/* ---------------- Stage ladder (v0.4 — 계단형 staircase) ---------------- */

export function StageLadder({ stages }: { stages: Stage[] }) {
  const ordered = [...stages].sort((a, b) => a.order - b.order);
  return (
    <ol className="stage-stair">
      {ordered.map((stage, i) => (
        <li
          key={stage.id}
          className="stage-step"
          style={{ "--step": i } as CSSProperties}
        >
          <span className="stage-step__num">{stage.order}</span>
          <Link href={`/stages/${stage.slug}`} className="stage-step__card">
            <div className="stage-step__body">
              <div className="stage-step__head">
                <span className="stage-step__label">{stage.label}</span>
                <span className="stage-step__pos">{stage.positionChange}</span>
              </div>
              <p className="stage-step__desc">{stage.shortDescription}</p>
              <div className="stage-step__meta">
                <span>{stage.lessonSlugs.length} 레슨</span>
                <span>·</span>
                <span>{stage.estimatedHours}h</span>
                <span>·</span>
                <span className="stage-step__deliv">→ {stage.deliverable}</span>
              </div>
            </div>
            <span className="stage-step__go" aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
