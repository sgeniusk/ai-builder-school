// 레슨 페이지 좌측 사이드바 — 여정 진행률 카드 + stage-group 카드 (시안 option-2 톤).
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Journey, Lesson, Stage } from "@/lib/types";
import { useLessonProgress } from "@/hooks/useLessonProgress";

type Props = {
  stages: Stage[];
  lessonsByStage: Record<string, Lesson[]>;
  journeys: Journey[];
  currentLessonId: string;
  currentStageId: string;
};

export function JourneyRail({
  stages,
  lessonsByStage,
  journeys,
  currentLessonId,
  currentStageId,
}: Props) {
  const { mounted, journey, isLessonComplete } = useLessonProgress();

  // SSR/첫 렌더에선 디폴트 "practitioner" 를 보여서 깜박임 방지.
  // localStorage 가 다른 여정이면 마운트 후 자연스럽게 교체됨.
  const displayJourneyId = mounted ? journey : "practitioner";
  const selectedJourney = journeys.find((j) => j.id === displayJourneyId);
  const recommendedLessonSlugs = new Set(selectedJourney?.recommendedLessons ?? []);
  const recommendedStageSlugs = new Set(selectedJourney?.recommendedStages ?? []);

  const totalLessons = stages.reduce(
    (acc, s) => acc + (lessonsByStage[s.id]?.length ?? 0),
    0,
  );
  const doneLessons = mounted
    ? stages.reduce((acc, s) => {
        const list = lessonsByStage[s.id] ?? [];
        return (
          acc +
          list.filter((l) =>
            isLessonComplete(l),
          ).length
        );
      }, 0)
    : 0;

  // 여정 진행률 — 추천 lesson 기준
  const allLessons = Object.values(lessonsByStage).flat();
  const journeyLessons = allLessons.filter((l) =>
    recommendedLessonSlugs.has(l.slug),
  );
  const journeyTotal = journeyLessons.length;
  const journeyDone = mounted
    ? journeyLessons.filter((l) =>
        isLessonComplete(l),
      ).length
    : 0;
  const journeyPct =
    journeyTotal === 0 ? 0 : Math.round((journeyDone / journeyTotal) * 100);

  return (
    <aside className="journey-rail" aria-label="커리큘럼 네비게이션">
      {/* 여정 카드 — 정보 + 진행률. 스위처는 상단 메뉴의 /journeys 가 담당 */}
      <div className="journey-card">
        <span className="rail-section-label">내 여정</span>
        <div className="journey-display">
          <span className="j-gradient-pill" aria-hidden />
          <div className="journey-display__text">
            <h3 className="journey-display__title">
              <span className="p-text" suppressHydrationWarning>
                {selectedJourney?.titleKo ?? "—"}
              </span>
            </h3>
            <p className="journey-display__sub" suppressHydrationWarning>
              {selectedJourney?.identity ?? ""}
            </p>
          </div>
        </div>
        {selectedJourney && (
          <div className="journey-progress">
            <div className="journey-progress__row">
              <span className="journey-progress__pct tnum" suppressHydrationWarning>
                <span className="p-text">{journeyPct}</span>
                <span className="journey-progress__pct-sym">%</span>
              </span>
              <span className="journey-progress__meta tnum mono" suppressHydrationWarning>
                추천 {journeyDone}/{journeyTotal}
              </span>
            </div>
            <div className="journey-progress__bar" aria-hidden>
              <span
                className="journey-progress__fill"
                style={{ width: `${journeyPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stage 그룹 카드 */}
      <div className="phase-group-card">
        <div className="phase-group-card__header">
          <span className="rail-section-label">커리큘럼</span>
          <span className="phase-group-card__count mono tnum" suppressHydrationWarning>
            {doneLessons}/{totalLessons} 완료
          </span>
        </div>

        {stages.map((stage) => {
          const lessons = lessonsByStage[stage.id] ?? [];
          const isCurrent = stage.id === currentStageId;
          const hasRecommended = recommendedStageSlugs.has(stage.slug);

          return (
            <StageRow
              key={stage.id}
              stage={stage}
              lessons={lessons}
              isCurrent={isCurrent}
              hasRecommended={hasRecommended}
              defaultOpen={isCurrent}
              currentLessonId={currentLessonId}
              recommendedLessonSlugs={recommendedLessonSlugs}
              mounted={mounted}
              isLessonComplete={isLessonComplete}
            />
          );
        })}
      </div>
    </aside>
  );
}

type StageRowProps = {
  stage: Stage;
  lessons: Lesson[];
  isCurrent: boolean;
  hasRecommended: boolean;
  defaultOpen: boolean;
  currentLessonId: string;
  recommendedLessonSlugs: Set<string>;
  mounted: boolean;
  isLessonComplete: (lesson: Lesson) => boolean;
};

function StageRow({
  stage,
  lessons,
  isCurrent,
  hasRecommended,
  defaultOpen,
  currentLessonId,
  recommendedLessonSlugs,
  mounted,
  isLessonComplete,
}: StageRowProps) {
  const [open, setOpen] = useState(defaultOpen);
  const stageNum = String(stage.order).padStart(2, "0");

  return (
    <div className={`phase-row${open ? " phase-row--open" : ""}`}>
      <button
        type="button"
        className={[
          "phase-row__btn",
          isCurrent && "phase-row__btn--current",
          hasRecommended && "phase-row__btn--recommended",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ph-n mono">{stageNum}</span>
        <span className="ph-title">{stage.label}</span>
        <span className="ph-prog-dots" aria-hidden>
          {lessons.map((l) => {
            const done = mounted && isLessonComplete(l);
            const isCurrentLesson = l.id === currentLessonId;
            return (
              <span
                key={l.id}
                className={[
                  "ph-dot",
                  done && "ph-dot--done",
                  isCurrentLesson && "ph-dot--current",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            );
          })}
        </span>
      </button>

      {open && lessons.length > 0 && (
        <ul className="phase-row__lessons">
          {lessons.map((lesson) => {
            const done = mounted && isLessonComplete(lesson);
            const isActive = lesson.id === currentLessonId;
            const isRec = recommendedLessonSlugs.has(lesson.slug);
            return (
              <li
                key={lesson.id}
                className={[
                  "phase-sub-item",
                  isActive && "phase-sub-item--current",
                  isRec && "phase-sub-item--recommended",
                  done && "phase-sub-item--done",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Link href={`/lessons/${lesson.slug}`}>
                  <span className="sub-dot" aria-hidden />
                  <span className="sub-name">{lesson.titleKo}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
