// Stage 상세 — 역량 지도의 한 칸. 이 단계의 레슨과, 그 역량으로 짓는 프로젝트를 함께 보여준다.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import { JourneyFilter } from "@/components/JourneyFilter";
import { ProjectCard } from "@/components/Cards";
import {
  getStages,
  getStageBySlug,
  getLessonsByStageId,
  getProjectsByStageSlug,
  getTemplateBySlug,
} from "@/lib/content";
import { getStageBody } from "@/content/stage-bodies";
import { LEVEL_LABEL, JOURNEY_LABEL } from "@/lib/types";
import type { Lesson } from "@/lib/types";

export function generateStaticParams() {
  return getStages().map((s) => ({ stageSlug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stageSlug: string }>;
}): Promise<Metadata> {
  const { stageSlug } = await params;
  const stage = getStageBySlug(stageSlug);
  if (!stage) return { title: "Stage를 찾을 수 없습니다" };
  return {
    title: `${stage.titleKo}`,
    description: stage.shortDescription,
  };
}

// 6 페르소나 여정의 정본 순서. 색은 globals.css의 .p-{id} 토큰을 쓴다.
const JOURNEY_ORDER = [
  "starter",
  "practitioner",
  "creator",
  "founder",
  "engineer",
  "ai-native",
] as const;

function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <li data-journeys={lesson.targetJourneys.join(" ")}>
      <Link href={`/lessons/${lesson.slug}`}>
        <span className="l-num">
          {lesson.stageOrdinal ? String(lesson.stageOrdinal).padStart(2, "0") : "—"}
        </span>
        <div>
          <div className="l-title">{lesson.titleKo}</div>
          <div className="l-deliverable">
            <span className="l-deliverable__tag">남는 것</span>
            <span>{lesson.deliverable.title}</span>
          </div>
        </div>
        <span
          className="l-journeys"
          aria-label="이 레슨이 속한 여정"
        >
          {JOURNEY_ORDER.map((j) => {
            const on = lesson.targetJourneys.includes(j);
            return (
              <span
                key={j}
                className={`l-journey-dot p-${j}${on ? " is-on" : ""}`}
                title={`${JOURNEY_LABEL[j]}${on ? "" : " · 비대상"}`}
              />
            );
          })}
        </span>
        <span className="l-meta">
          {Math.max(3, Math.round(lesson.estimatedMinutes * 0.4))}–
          {lesson.estimatedMinutes}분 · {LEVEL_LABEL[lesson.level].toUpperCase()}
        </span>
      </Link>
    </li>
  );
}

export default async function StageDetailPage({
  params,
}: {
  params: Promise<{ stageSlug: string }>;
}) {
  const { stageSlug } = await params;
  const stage = getStageBySlug(stageSlug);
  if (!stage) notFound();

  const lessons = getLessonsByStageId(stage.id);
  const stageProjects = getProjectsByStageSlug(stage.slug);
  const stagesByOrder = getStages();
  const nextStage = stage.nextStageSlug
    ? getStageBySlug(stage.nextStageSlug)
    : null;
  const prevStage =
    stage.order > 1
      ? stagesByOrder.find((s) => s.order === stage.order - 1) ?? null
      : null;

  const IntroEssay = getStageBody(stage.introEssaySlug);
  const OutroEssay = getStageBody(stage.outroEssaySlug);

  // Layer 3 — Stage 통합 산출물 template 칩. deliverableTemplateSlug가 있을 때만 렌더.
  const deliverableTemplate = stage.deliverableTemplateSlug
    ? getTemplateBySlug(stage.deliverableTemplateSlug)
    : null;

  return (
    <>
      <section className="page-head">
        <Container>
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              fontFamily: "var(--f-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              color: "var(--ink-3)",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <span>STAGE {stage.order}</span>
            <span>·</span>
            <span>{LEVEL_LABEL[stage.level]}</span>
            <span>·</span>
            <span>{stage.estimatedHours}H</span>
          </div>
          <h1>{stage.titleKo}</h1>
          <p className="lede">{stage.shortDescription}</p>

          <div className="phase-meta">
            <div>
              <div className="lbl">학습자 위치</div>
              <div className="val" style={{ fontSize: 15 }}>{stage.positionChange}</div>
            </div>
            <div>
              <div className="lbl">손에 남는 것</div>
              <div className="val" style={{ fontSize: 15 }}>{stage.deliverable}</div>
            </div>
            <div>
              <div className="lbl">Lessons</div>
              <div className="val">{lessons.length}</div>
            </div>
            <div>
              <div className="lbl">Hours</div>
              <div className="val">{stage.estimatedHours}</div>
            </div>
          </div>

          {deliverableTemplate && (
            <Link
              href={`/templates#${deliverableTemplate.slug}`}
              style={{
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 18px",
                border: "1px solid var(--line)",
                borderLeft: "3px solid var(--ink)",
                borderRadius: "var(--r)",
                background: "var(--card)",
                color: "var(--ink)",
                textDecoration: "none",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              <span aria-hidden style={{ fontSize: 18 }}>📋</span>
              <span>
                <strong>이 Stage의 통합 산출물</strong>
                {" — "}
                <span style={{ color: "var(--ink-2)" }}>{deliverableTemplate.title}</span>
                {" "}
                <span style={{ color: "var(--ink-3)", fontSize: 13 }}>· 양식 보기 →</span>
              </span>
            </Link>
          )}
        </Container>
      </section>

      {IntroEssay && (
        <section className="sec">
          <Container>
            <div className="eyebrow" style={{ marginBottom: 12 }}>도입</div>
            <article
              className="prose"
              style={{ maxWidth: "62ch", color: "var(--ink-2)", lineHeight: 1.8 }}
            >
              <IntroEssay />
            </article>
          </Container>
        </section>
      )}

      <section className="sec">
        <Container>
          <div className="two-col">
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>이 단계는</div>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--ink-2)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                  margin: 0,
                  maxWidth: "60ch",
                }}
              >
                {stage.longDescription}
              </p>
            </div>
            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Outcomes</div>
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: 20,
                    margin: 0,
                    color: "var(--ink-2)",
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  {stage.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>다루는 주제</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {stage.topics.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>대상 여정</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {stage.targetJourneys.map((j) => (
                    <span key={j} className="chip">{JOURNEY_LABEL[j]}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>추천 도구</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {stage.recommendedTools.map((t) => (
                    <span key={t} className="chip-mono" style={{ color: "var(--ink-2)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Lessons · {lessons.length}</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>
            이 단계의 레슨
          </h2>
          <JourneyFilter />
          {stage.subGroups ? (
            stage.subGroups.map((sub) => {
              const subLessons = sub.lessonSlugs
                .map((slug) => lessons.find((l) => l.slug === slug))
                .filter((l): l is Lesson => l !== undefined);
              return (
                <div key={sub.id} style={{ marginTop: 40 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 4,
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: 19, letterSpacing: "-0.01em" }}>
                      <span style={{ fontFamily: "var(--f-mono)", color: "var(--ink-3)", marginRight: 8 }}>
                        {sub.id.toUpperCase()}
                      </span>
                      {sub.label}
                    </h3>
                    <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                      → {sub.deliverable}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "0 0 12px" }}>
                    {sub.shortDescription}
                  </p>
                  <ul className="lessons-list">
                    {subLessons.map((lesson) => (
                      <LessonRow key={lesson.id} lesson={lesson} />
                    ))}
                  </ul>
                </div>
              );
            })
          ) : (
            <ul className="lessons-list" style={{ marginTop: 40 }}>
              {lessons.map((lesson) => (
                <LessonRow key={lesson.id} lesson={lesson} />
              ))}
            </ul>
          )}
        </Container>
      </section>

      {stageProjects.length > 0 && (
        <section className="sec">
          <Container>
            <div className="eyebrow" style={{ marginBottom: 12 }}>이 역량으로 짓는 것</div>
            <h2 className="section-title" style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>
              이 단계 역량을 쓰는 프로젝트
            </h2>
            <p className="section-lede" style={{ marginBottom: 24 }}>
              순서대로 다 밟지 않아도 돼요. 아래 프로젝트를 짓다 막히면, 그때 이 단계의 레슨을 꺼내 보세요.
            </p>
            <div className="proj-grid">
              {stageProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {OutroEssay && (
        <section className="sec">
          <Container>
            <div className="eyebrow" style={{ marginBottom: 12 }}>마무리</div>
            <article
              className="prose"
              style={{ maxWidth: "62ch", color: "var(--ink-2)", lineHeight: 1.8 }}
            >
              <OutroEssay />
            </article>
          </Container>
        </section>
      )}

      <section className="sec">
        <Container>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              {prevStage && (
                <Link
                  href={`/stages/${prevStage.slug}`}
                  style={{ fontSize: 14, color: "var(--ink-3)" }}
                >
                  <span className="arrow">←</span> Stage {prevStage.order} · {prevStage.label}
                </Link>
              )}
            </div>
            {nextStage && (
              <div
                style={{
                  padding: 32,
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)",
                  background: "var(--card)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                  flex: "1 1 100%",
                }}
              >
                <div>
                  <div className="eyebrow">Next stage</div>
                  <Link
                    href={`/stages/${nextStage.slug}`}
                    style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)" }}
                  >
                    Stage {nextStage.order} · {nextStage.label}
                  </Link>
                  <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ink-3)" }}>
                    {nextStage.shortDescription}
                  </p>
                </div>
                <Link href={`/stages/${nextStage.slug}`} className="btn">
                  이어서 보기 <span className="arrow">→</span>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
