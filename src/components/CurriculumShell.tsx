// /curriculum 과 /curriculum/[phaseSlug] 의 3-column 셸. 좌 JourneyRail · 본문 children · 우 CurriculumToc.
import type { ReactNode } from "react";
import {
  getJourneys,
  getJourneysByPhaseSlug,
  getLessons,
  getPhases,
  getProjectsByPhaseSlug,
} from "@/lib/content";
import { CurriculumToc } from "./CurriculumToc";
import { JourneyRail } from "./JourneyRail";
import { LessonShellMobile } from "./LessonShellMobile";
import { PersonaScope } from "./PersonaScope";
import type { Lesson } from "@/lib/types";

type Props = {
  children: ReactNode;
  /** 현재 보는 phase id (왼쪽 rail 강조용) */
  currentPhaseId?: string;
  /** 현재 보는 phase slug (우측 toc 의 phase 모드용) */
  currentPhaseSlug?: string;
};

export function CurriculumShell({
  children,
  currentPhaseId = "",
  currentPhaseSlug = "",
}: Props) {
  const phases = getPhases();
  const allLessons = getLessons();
  const journeys = getJourneys();

  // 좌측 JourneyRail 용 — phase 별 lesson 그룹
  const lessonsByPhase: Record<string, Lesson[]> = {};
  for (const p of phases) lessonsByPhase[p.id] = [];
  for (const l of allLessons) {
    const bucket = lessonsByPhase[l.phaseId];
    if (bucket) bucket.push(l);
  }

  // 우측 CurriculumToc 용 — 여정별 추천 lesson 객체 (진행률 계산)
  const recommendedLessonsByJourney: Record<string, Lesson[]> = {};
  for (const j of journeys) {
    recommendedLessonsByJourney[j.id] = j.recommendedLessons
      .map((slug) => allLessons.find((l) => l.slug === slug))
      .filter((l): l is Lesson => Boolean(l));
  }

  // Phase 모드 — 이 phase 의 매칭 여정/프로젝트 (서버에서 사전 계산)
  const matchedJourneys = currentPhaseSlug
    ? getJourneysByPhaseSlug(currentPhaseSlug)
    : [];
  const matchedProjects = currentPhaseSlug
    ? getProjectsByPhaseSlug(currentPhaseSlug)
    : [];

  return (
    <PersonaScope>
      <div className="lesson-shell lesson-shell--curriculum">
        <div id="lesson-rail-drawer" className="lesson-shell__rail">
          <JourneyRail
            phases={phases}
            lessonsByPhase={lessonsByPhase}
            journeys={journeys}
            currentLessonId=""
            currentPhaseId={currentPhaseId}
          />
        </div>
        <main className="lesson-shell__main lesson-shell__main--bare">
          {children}
        </main>
        <div id="lesson-toc-drawer" className="lesson-shell__toc">
          <CurriculumToc
            journeys={journeys}
            recommendedLessonsByJourney={recommendedLessonsByJourney}
            phaseSlug={currentPhaseSlug || undefined}
            matchedJourneys={matchedJourneys}
            matchedProjects={matchedProjects}
          />
        </div>
      </div>
      <LessonShellMobile />
    </PersonaScope>
  );
}
