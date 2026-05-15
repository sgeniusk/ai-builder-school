import Link from "next/link";
import {
  getLessonBySlug,
  getPhases,
} from "@/lib/content";
import { JOURNEY_LABEL_KO } from "@/lib/types";
import type { Lesson, Phase } from "@/lib/types";

/**
 * 좌측 사이드바 — Phase 컨텍스트 + 같은 Phase 의 레슨 리스트.
 * 학습자에게 "전체 중 어디쯤" 위치 감각을 준다.
 *
 * 여정 색채를 활용: 현재 레슨(or Phase)의 targetJourneys 를 작은 색 dot row로 표현.
 *
 * `currentLesson` 이 없는 경우(= Phase 인덱스 페이지)도 같은 레이아웃을 유지해
 * 사이드바가 끊기지 않게 한다.
 */
export function LessonSidebar({
  currentPhase,
  currentLesson,
}: {
  currentPhase: Phase;
  currentLesson?: Lesson;
}) {
  // phase.lessonSlugs 순서를 진짜 학습 순서로 사용
  const lessonsInPhase = currentPhase.lessonSlugs
    .map((slug) => getLessonBySlug(slug))
    .filter((l): l is Lesson => Boolean(l));

  const allPhases = getPhases();
  const phaseIdx = allPhases.findIndex((p) => p.id === currentPhase.id);
  const prevPhase = phaseIdx > 0 ? allPhases[phaseIdx - 1] : null;
  const nextPhase =
    phaseIdx >= 0 && phaseIdx < allPhases.length - 1
      ? allPhases[phaseIdx + 1]
      : null;

  // Phase 이동 시 가능하면 그 Phase 의 첫 레슨으로 보낸다 (레슨 레이아웃 유지).
  // 레슨이 없는 Phase 만 index 페이지로 fallback.
  const phaseNavHref = (phase: Phase): string => {
    const firstLessonSlug = phase.lessonSlugs.find(
      (slug) => Boolean(getLessonBySlug(slug)),
    );
    return firstLessonSlug
      ? `/lessons/${firstLessonSlug}`
      : `/curriculum/${phase.slug}`;
  };

  const lessonIdx = currentLesson
    ? lessonsInPhase.findIndex((l) => l.slug === currentLesson.slug)
    : -1;

  // 여정 색 dot row — 현재 레슨이 있으면 그 레슨 기준, 없으면 Phase 자체의 대상 여정
  const journeysForDots = currentLesson
    ? currentLesson.targetJourneys
    : currentPhase.targetJourneys;

  return (
    <aside className="lesson-sidebar" aria-label="여정 진행 상황">
      {/* Phase 헤더 */}
      <div className="ls-phase">
        <div className="eyebrow">Phase {currentPhase.order} · {currentPhase.titleEn || currentPhase.titleKo}</div>
        <Link
          href={`/curriculum/${currentPhase.slug}`}
          className="ls-phase-title"
        >
          {currentPhase.titleKo}
        </Link>
        {lessonsInPhase.length > 0 && lessonIdx >= 0 && (
          <div className="ls-progress">
            <span className="ls-progress-num">
              {String(lessonIdx + 1).padStart(2, "0")}
            </span>
            <span className="ls-progress-sep">/</span>
            <span className="ls-progress-total">
              {String(lessonsInPhase.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* 이 레슨(or Phase) 이 속한 여정 dot row — 색채 표현 */}
      {journeysForDots.length > 0 && (
        <div className="ls-journeys">
          <div className="ls-journeys-label">
            {currentLesson ? "이 레슨이 추천되는 여정" : "이 Phase 가 추천되는 여정"}
          </div>
          <div className="ls-journeys-dots">
            {journeysForDots.map((j) => (
              <span
                key={j}
                className={`p-${j} ls-journey-dot`}
                title={JOURNEY_LABEL_KO[j]}
                aria-label={JOURNEY_LABEL_KO[j]}
              />
            ))}
          </div>
        </div>
      )}

      {/* Phase 안 레슨 리스트 */}
      {lessonsInPhase.length > 0 && (
        <ol className="ls-lesson-list">
          {lessonsInPhase.map((lesson, idx) => {
            const isCurrent = currentLesson?.slug === lesson.slug;
            return (
              <li key={lesson.id}>
                <Link
                  href={`/lessons/${lesson.slug}`}
                  className={isCurrent ? "is-current" : undefined}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <span className="ls-num">
                    L{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="ls-title">{lesson.titleKo}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}

      {/* Phase 이동 — 가능하면 그 Phase 의 첫 레슨으로, 레슨 없으면 Phase 인덱스로 */}
      <nav className="ls-phase-nav" aria-label="Phase 이동">
        {prevPhase ? (
          <Link
            href={phaseNavHref(prevPhase)}
            className="ls-phase-link"
          >
            <span className="ls-phase-link-arrow">←</span>
            <span>
              <span className="eyebrow">Phase {prevPhase.order}</span>
              <span className="ls-phase-link-title">{prevPhase.titleKo}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextPhase && (
          <Link
            href={phaseNavHref(nextPhase)}
            className="ls-phase-link is-next"
          >
            <span>
              <span className="eyebrow">Phase {nextPhase.order}</span>
              <span className="ls-phase-link-title">{nextPhase.titleKo}</span>
            </span>
            <span className="ls-phase-link-arrow">→</span>
          </Link>
        )}
      </nav>
    </aside>
  );
}
