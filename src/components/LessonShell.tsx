// 레슨 콘솔 셸 — 상단바 + 3컬럼(좌 커리큘럼 · 본문 children · 우 지음 컴패니언).
// 사이드바를 layout 에 두면 lesson 이동 시 클라이언트 상태(여정/펼침)가 보존됨.
import type { ReactNode } from "react";
import type { Lesson, Stage } from "@/lib/types";
import { getJourneys, getLessons, getStages } from "@/lib/content";
import { JourneyRail } from "./JourneyRail";
import { LessonShellMobile } from "./LessonShellMobile";
import { LessonTopbar } from "./lesson/LessonTopbar";
import { LessonCompanion } from "./lesson/LessonCompanion";
import { PersonaScope } from "./PersonaScope";

type Props = {
  lesson: Lesson;
  stage: Stage | undefined;
  children: ReactNode;
};

export function LessonShell({ lesson, stage, children }: Props) {
  const stages = getStages();
  const allLessons = getLessons();
  const journeys = getJourneys();

  // 한 번 그룹핑해서 JourneyRail 에 직렬화 가능한 형태로 전달.
  // stage.lessonSlugs 순서를 학습 순서로 보존.
  const lessonsByStage: Record<string, Lesson[]> = {};
  for (const s of stages) {
    lessonsByStage[s.id] = s.lessonSlugs
      .map((slug) => allLessons.find((l) => l.slug === slug))
      .filter((l): l is Lesson => Boolean(l));
  }

  const siblings = stage ? lessonsByStage[stage.id] ?? [] : [];
  const ordinal =
    lesson.stageOrdinal ?? (siblings.findIndex((l) => l.id === lesson.id) + 1 || 1);
  const lessonLabel = "L" + String(ordinal).padStart(2, "0");
  const stageLabel = stage ? stage.titleKo : "레슨";

  return (
    <PersonaScope>
      <LessonTopbar
        journeys={journeys}
        stageLabel={stageLabel}
        lessonLabel={lessonLabel}
        siblingLessons={siblings}
      />
      <div className="lesson-shell lesson-shell--console">
        <div id="lesson-rail-drawer" className="lesson-shell__rail">
          <JourneyRail
            stages={stages}
            lessonsByStage={lessonsByStage}
            journeys={journeys}
            currentLessonId={lesson.id}
            currentStageId={stage?.id ?? ""}
          />
        </div>
        <main className="lesson-shell__main">{children}</main>
        <div id="lesson-toc-drawer" className="lesson-shell__toc">
          <LessonCompanion lesson={lesson} journeys={journeys} />
        </div>
      </div>
      <LessonShellMobile />
    </PersonaScope>
  );
}
