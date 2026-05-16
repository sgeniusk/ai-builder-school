// 레슨 페이지의 3-컬럼 레이아웃 셸. 좌 JourneyRail · 본문 children · 우 LessonToc.
import type { ReactNode } from "react";
import type { Lesson, Stage } from "@/lib/types";
import { getJourneys, getLessons, getStages } from "@/lib/content";
import { JourneyRail } from "./JourneyRail";
import { LessonShellMobile } from "./LessonShellMobile";
import { LessonToc } from "./LessonToc";
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

  return (
    <PersonaScope>
      <div className="lesson-shell">
        <div
          id="lesson-rail-drawer"
          className="lesson-shell__rail"
        >
          <JourneyRail
            stages={stages}
            lessonsByStage={lessonsByStage}
            journeys={journeys}
            currentLessonId={lesson.id}
            currentStageId={stage?.id ?? ""}
          />
        </div>
        <main className="lesson-shell__main">{children}</main>
        <div
          id="lesson-toc-drawer"
          className="lesson-shell__toc"
        >
          <LessonToc
            currentLesson={lesson}
            currentStage={stage}
            siblingLessons={siblings}
          />
        </div>
      </div>
      <LessonShellMobile />
    </PersonaScope>
  );
}
