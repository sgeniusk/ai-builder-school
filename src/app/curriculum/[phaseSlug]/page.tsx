import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonSidebar } from "@/components/LessonSidebar";
import { LessonTOC, type TOCSection } from "@/components/LessonTOC";
import {
  getLessons,
  getLessonsByPhaseId,
  getPhaseBySlug,
  getPhases,
} from "@/lib/content";
import { LEVEL_LABEL, JOURNEY_LABEL } from "@/lib/types";

export function generateStaticParams() {
  return getPhases().map((p) => ({ phaseSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phaseSlug: string }>;
}): Promise<Metadata> {
  const { phaseSlug } = await params;
  const phase = getPhaseBySlug(phaseSlug);
  if (!phase) return { title: "Phase를 찾을 수 없습니다" };
  return {
    title: `${phase.titleKo} · Phase ${phase.order}`,
    description: phase.shortDescription,
  };
}

export default async function PhaseDetailPage({
  params,
}: {
  params: Promise<{ phaseSlug: string }>;
}) {
  const { phaseSlug } = await params;
  const phase = getPhaseBySlug(phaseSlug);
  if (!phase) notFound();

  const lessons = getLessonsByPhaseId(phase.id);
  const allLessons = getLessons();
  const nextPhase = phase.nextPhaseSlug ? getPhaseBySlug(phase.nextPhaseSlug) : null;

  // TOC 섹션 — Phase 페이지 안의 주요 블록
  const tocSections: TOCSection[] = [
    { id: "overview", label: "개요", number: 1 },
    { id: "outcomes", label: "성과·산출물", number: 2 },
    { id: "lessons", label: "레슨", number: 3 },
    ...(nextPhase
      ? [{ id: "next-phase", label: "다음 Phase", number: 4 }]
      : []),
  ];

  // 사이드바·TOC 색 테마는 Phase 의 첫 번째 추천 여정 색
  const primaryJourney = phase.targetJourneys[0];

  return (
    <div className="lesson-layout">
      <LessonSidebar currentPhase={phase} />

      <article className="lesson-reader">
        <p className="kicker">
          Phase {String(phase.order).padStart(2, "0")}
          {phase.weekInMvpPath && <> · Week {String(phase.weekInMvpPath).padStart(2, "0")}</>}
          {" "}· {LEVEL_LABEL[phase.level]} · {phase.estimatedHours}H
        </p>
        <h1>{phase.titleKo}</h1>
        <p className="lede">{phase.shortDescription}</p>

        <div className="phase-meta" style={{ marginTop: 32, marginBottom: 56 }}>
          <div>
            <div className="lbl">Lessons</div>
            <div className="val">{phase.lessonSlugs.length}</div>
          </div>
          <div>
            <div className="lbl">Hours</div>
            <div className="val">{phase.estimatedHours}</div>
          </div>
          <div>
            <div className="lbl">Level</div>
            <div className="val">{LEVEL_LABEL[phase.level]}</div>
          </div>
          <div>
            <div className="lbl">Week</div>
            <div className="val">{phase.weekInMvpPath ? `W${String(phase.weekInMvpPath).padStart(2, "0")}` : "—"}</div>
          </div>
        </div>

        <section id="overview" style={{ scrollMarginTop: 88, marginBottom: 64 }}>
          <h2>개요</h2>
          <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.8, whiteSpace: "pre-line", margin: "16px 0 0" }}>
            {phase.longDescription}
          </p>
        </section>

        <section id="outcomes" style={{ scrollMarginTop: 88, marginBottom: 64 }}>
          <h2>성과·산출물</h2>

          <div style={{ marginTop: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Outcomes</div>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, color: "var(--ink-2)", fontSize: 15, lineHeight: 1.8 }}>
              {phase.outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Deliverables</div>
            <ul className="checklist" style={{ marginTop: 0 }}>
              {phase.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>대상 여정</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {phase.targetJourneys.map((p) => (
                <span key={p} className="chip">{JOURNEY_LABEL[p]}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>추천 도구</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {phase.recommendedTools.map((t) => (
                <span key={t} className="chip-mono" style={{ color: "var(--ink-2)" }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="lessons" style={{ scrollMarginTop: 88, marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Lessons · {lessons.length}</div>
          <h2>이 Phase의 레슨</h2>
          {lessons.length > 0 ? (
            <ul className="lessons-list" style={{ marginTop: 32 }}>
              {lessons.map((lesson) => {
                const globalIndex = allLessons.findIndex((l) => l.id === lesson.id) + 1;
                return (
                  <li key={lesson.id}>
                    <Link href={`/lessons/${lesson.slug}`}>
                      <span className="l-num">L{String(globalIndex).padStart(2, "0")}</span>
                      <div>
                        <div className="l-title">{lesson.titleKo}</div>
                        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>{lesson.summary}</div>
                      </div>
                      <span className="l-meta">{lesson.estimatedMinutes}분 · {LEVEL_LABEL[lesson.level].toUpperCase()}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div style={{ marginTop: 24, padding: 40, border: "1px dashed var(--line-2)", borderRadius: "var(--r)", textAlign: "center", color: "var(--ink-3)", fontSize: 14 }}>
              이 Phase의 레슨은 곧 공개됩니다.
            </div>
          )}
        </section>

        {nextPhase && (
          <section id="next-phase" style={{ scrollMarginTop: 88 }}>
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
              }}
            >
              <div>
                <div className="eyebrow">Next phase</div>
                <Link
                  href={`/curriculum/${nextPhase.slug}`}
                  style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)" }}
                >
                  Phase {nextPhase.order} · {nextPhase.titleKo}
                </Link>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ink-3)" }}>{nextPhase.shortDescription}</p>
              </div>
              <Link href={`/curriculum/${nextPhase.slug}`} className="btn">
                이어서 보기 <span className="arrow">→</span>
              </Link>
            </div>
          </section>
        )}
      </article>

      <LessonTOC sections={tocSections} journeyId={primaryJourney} />
    </div>
  );
}
