// 레슨 페이지의 3-컬럼 레이아웃 셸. 좌 JourneyRail · 본문 children · 우 LessonToc.
import type { ReactNode } from "react";
import type { Lesson, Phase } from "@/lib/types";
import { getJourneys, getLessons, getPhases } from "@/lib/content";
import { JourneyRail } from "./JourneyRail";
import { LessonToc } from "./LessonToc";
import { PersonaScope } from "./PersonaScope";

type Props = {
  lesson: Lesson;
  phase: Phase | undefined;
  children: ReactNode;
};

export function LessonShell({ lesson, phase, children }: Props) {
  const phases = getPhases();
  const allLessons = getLessons();
  const journeys = getJourneys();

  // 한 번 그룹핑해서 JourneyRail 에 직렬화 가능한 형태로 전달
  const lessonsByPhase: Record<string, Lesson[]> = {};
  for (const p of phases) lessonsByPhase[p.id] = [];
  for (const l of allLessons) {
    const bucket = lessonsByPhase[l.phaseId];
    if (bucket) bucket.push(l);
  }

  const siblings = phase ? lessonsByPhase[phase.id] ?? [] : [];

  return (
    <PersonaScope>
      <div className="lesson-shell">
        <div className="lesson-shell__rail">
          <JourneyRail
            phases={phases}
            lessonsByPhase={lessonsByPhase}
            journeys={journeys}
            currentLessonId={lesson.id}
            currentPhaseId={phase?.id ?? ""}
          />
        </div>
        <main className="lesson-shell__main">{children}</main>
        <div className="lesson-shell__toc">
          <LessonToc
            currentLesson={lesson}
            currentPhase={phase}
            siblingLessons={siblings}
          />
        </div>
      </div>
    </PersonaScope>
  );
}
