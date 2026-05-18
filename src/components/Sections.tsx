import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Container } from "./Layout";
import { LearningLoop } from "./LearningLoop";
import { HeroStats } from "./HeroStats";
import type { Journey, Stage } from "@/lib/types";

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

/* ---------------- HERO ---------------- */

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-orbs" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <Container>
        <p className="eyebrow">AI Builder School · v1.0</p>
        <h1 className="hero-h">
          AI를 쓰는 사람에서,
          <br />
          <span className="grad-text">AI로 만드는 사람</span>으로.
        </h1>
        <p className="hero-lede">
          8단계 사다리를 한 칸씩 오르면, 직접 만든 결과물 한 가지가 손에 들어옵니다.
          <br className="only-d" />
          뉴스로 끝나지 않는 학교 — Codex랑 Claude Code로, 한국어로.
        </p>
        <div className="hero-ctas">
          <Link href="/start" className="btn">
            30초 진단 시작 <span className="arrow">→</span>
          </Link>
          <Link href="/stages" className="btn ghost">
            8단계 커리큘럼 둘러보기
          </Link>
        </div>

        <HeroStats />
      </Container>
    </section>
  );
}

/* ---------------- USP 4 axes (placed under Hero) ---------------- */
// 듀이가 권한 4축 USP — 다른 사이트의 4 카드 패턴을 우리 정체성으로 옮긴 것.
// (참조: docs/dewey-applied-2026-05-12.md C 항목, docs/curriculum-blueprint.md §0.1)

const USP_AXES: Array<{ label: string; title: string; desc: string }> = [
  {
    label: "핵심 01",
    title: "코딩 0, 프롬프트 0이라도 OK",
    desc: "사전지식을 가정하지 않습니다. 초보가 빌더 입문자, 그리고 첫 산출물까지의 동선을 끊김 없이.",
  },
  {
    label: "핵심 02",
    title: "한국어로 말 거는 어조",
    desc: "UI·예시·레슨 본문 모두 한국어 어조. 격식 X, 학습자 한 명한테 말 거는 톤으로.",
  },
  {
    label: "핵심 03",
    title: "7-step 학습 루프",
    desc: "문제 → 개념 → 미션 → 빌드 → 검증 → 산출물 → 회고. 매 레슨이 같은 리듬으로 돌아요.",
  },
  {
    label: "핵심 04",
    title: "단계마다 손에 남는 산출물",
    desc: "8단계 사다리를 한 칸 오를 때마다 포트폴리오로 쓸 결과물 1개. 강의가 아니라 빌더 작업장이에요.",
  },
];

export function UspCards() {
  return (
    <section className="sec usp-section">
      <Container>
        <ul className="usp-grid">
          {USP_AXES.map((axis) => (
            <li key={axis.label} className="usp-card">
              <span className="kicker">{axis.label}</span>
              <h3 className="usp-card__title">{axis.title}</h3>
              <p className="usp-card__desc">{axis.desc}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------------- Learning loop section (wrapper) ---------------- */

export function LearningLoopSection() {
  return (
    <section className="sec">
      <Container>
        <SectionHeading
          eyebrow="Learning loop"
          title="모든 레슨이 따라가는 7단계"
          description="매주 같은 리듬으로 돌아요. 문제를 이해하고, 개념을 배우고, AI에게 맡기고, 만들고, 확인하고, 공유하고, 회고하고. 이 7단계가 한 바퀴 돌면 한 가지가 손에 남아요."
        />
        <LearningLoop />
      </Container>
    </section>
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

/* ---------------- Journey picker ---------------- */

export function JourneyPicker({
  journeys,
}: {
  journeys: Journey[];
}) {
  return (
    <div className="track-cards">
      {journeys.map((j) => (
        <Link
          key={j.id}
          href={`/journeys/${j.id}`}
          className={`p-${j.id}`}
          style={{
            position: "relative",
            paddingTop: 28,
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: "linear-gradient(90deg, var(--p-from), var(--p-to))",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              aria-hidden
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--p-from), var(--p-to))",
                flexShrink: 0,
                boxShadow: "0 2px 8px -2px color-mix(in oklch, var(--p-to) 60%, transparent)",
              }}
            />
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              {j.titleKo}
            </div>
          </div>
          <h3
            style={{
              marginTop: 14,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              background: "linear-gradient(94deg, var(--p-from), var(--p-to))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {j.title}
          </h3>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            {j.identity}
          </p>
          <div className="tfoot">
            <span>자세히 보기</span>
            <span className="arrow mono">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ---------------- Builder principles (3-pillar) ---------------- */

interface BuilderPrinciple {
  number: string;
  subtitle: string;
  title: string;
  description: string;
  items: Array<{ term: string; gloss: string }>;
}

const BUILDER_PRINCIPLES: BuilderPrinciple[] = [
  {
    number: "01",
    subtitle: "무엇을 지을지 고르는 감각",
    title: "보는 법",
    description:
      "잘 보지 못하면 잘못된 것을 잘 지어냅니다. 시작점이 어긋나면 이후의 모든 기술은 잘못된 방향으로 증폭됩니다.",
    items: [
      { term: "문제에서 출발하는 습관", gloss: "도구가 아니라 짜증에서 시작합니다. 유행은 답을 들고 문제를 찾아 헤매게 합니다." },
      { term: "도메인 지식의 역설", gloss: "AI가 강해질수록 AI가 접근 못하는 비대체 지식의 값이 오릅니다. 대체로 현장에만 있습니다." },
      { term: "심미안", gloss: "AI-convergent한 첫 결과를 걷어내는 눈. 차별화 비용은 낭비가 아닙니다." },
    ],
  },
  {
    number: "02",
    subtitle: "모델이 아니라 시스템을 설계",
    title: "짓는 법",
    description:
      "\"좋은 프롬프트 하나면 된다\"는 착각을 벗어야 합니다. 결과는 모델이 아니라 그것을 둘러싼 설계에서 나옵니다.",
    items: [
      { term: "Context Engineering", gloss: "Persistent / Session / Just-in-time — 무엇을 어디에 둘지를 결정합니다." },
      { term: "Harness Engineering", gloss: "배우에게 대본을 주는 것이 아니라, 무대·조명·상대 배우까지 준비합니다." },
      { term: "파이프라인 사고", gloss: "복잡한 작업은 쪼갭니다. 단일 호출로 풀린다면 원래 복잡하지 않았던 것입니다." },
      { term: "Verification 내장", gloss: "Hallucination은 버그가 아니라 본질. 생성만큼 검증을 설계합니다." },
    ],
  },
  {
    number: "03",
    subtitle: "도구 주기를 넘어 오래 남는 태도",
    title: "버티는 법",
    description:
      "AI 도구는 6개월마다 뒤집힙니다. 이 속도에서 소진되지 않고 계속 쌓아갈 수 있는 사람이 결국 이깁니다.",
    items: [
      { term: "폐기할 수 있는 용기", gloss: "생산성 = 아키텍처 판단 × 폐기·재생성 속도. 첫 버전에 감정을 갖지 않습니다." },
      { term: "First Principles 학습", gloss: "테크닉은 사라집니다. 원리는 남습니다. 새 도구를 볼 때 원리로 매핑합니다." },
      { term: "배포하는 습관", gloss: "완벽한 80%보다 거친 30%. 사용자의 5분이 책상 위 100시간보다 많이 가르칩니다." },
    ],
  },
];

export function BuilderPrinciples() {
  return (
    <section className="sec">
      <Container>
        <SectionHeading
          eyebrow="Principles"
          title="좋은 AI 빌더가 되기 위한 세 가지 층위"
          description="같은 Claude Code, 같은 Cursor를 쓰는데 누군가는 의미 있는 것을 만들고 누군가는 기술 데모에서 멈춥니다. 도구가 아니었습니다."
        />

        <div className="principles-list">
          {BUILDER_PRINCIPLES.map((p) => (
            <article key={p.number}>
              <div className="n">{p.number} · {p.subtitle}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <ul
                style={{
                  listStyle: "none",
                  padding: "16px 0 0",
                  margin: "20px 0 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                {p.items.map((item) => (
                  <li key={item.term} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{item.term}</div>
                    <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.6, margin: "4px 0 0" }}>
                      {item.gloss}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p
          style={{
            marginTop: 40,
            maxWidth: "72ch",
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--ink-3)",
          }}
        >
          이 조건들에는 공통점이 있습니다. <strong style={{ color: "var(--ink-2)" }}>어느 것도 AI가 대체하지 못하는 것</strong>이라는 점입니다.
          판단, 취향, 설계 감각, 용기, 의심, 책임감. AI가 강해질수록 인간 빌더에게 요구되는 것은 더 <strong style={{ color: "var(--ink-2)" }}>인간적인 능력들</strong>입니다.
          AI Builder School의 모든 레슨은 이 세 층위 중 하나를 단단하게 만드는 작업입니다.
        </p>
      </Container>
    </section>
  );
}

/* ---------------- CTA ---------------- */

export function CTASection({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="sec" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <Container>
        <div className="cta-box">
          <h2 className="cta-h">{title}</h2>
          {description && <p className="cta-sub">{description}</p>}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href={primary.href} className="btn">
              {primary.label} <span className="arrow">→</span>
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn ghost">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Responsive tweak for principles grid — injected via utility class name */
/* stacking handled via Tailwind in CSS above */

export function StatList({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            padding: 20,
            border: "1px solid var(--line)",
            borderRadius: "var(--r)",
            background: "var(--card)",
          }}
        >
          <div className="eyebrow">{it.label}</div>
          <div style={{ marginTop: 6, fontSize: 22, fontWeight: 600, color: "var(--ink)" }}>{it.value}</div>
        </div>
      ))}
    </div>
  );
}
