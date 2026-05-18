// SiteHeader 안에 박히는 서버 래퍼 — content 데이터를 한 번 직렬화해 CharacterShell 로 넘긴다.
import {
  getJourneys,
  getLessons,
  getProjects,
  getProjectReadinessRefs,
  getStages,
} from "@/lib/content";
import type { Lesson } from "@/lib/types";
import { CharacterShell } from "./CharacterShell";

export function CharacterChrome() {
  const stages = getStages();
  const allLessons = getLessons();
  const journeys = getJourneys();

  const lessonsByStage: Record<string, Lesson[]> = {};
  for (const s of stages) {
    lessonsByStage[s.id] = s.lessonSlugs
      .map((slug) => allLessons.find((l) => l.slug === slug))
      .filter((l): l is Lesson => Boolean(l));
  }

  // 프로젝트별 keyLessons 슬림 참조 — 업적 '시작 가능 프로젝트 수' 계산용.
  const projectKeyLessons = getProjects().map((p) =>
    getProjectReadinessRefs(p),
  );

  return (
    <CharacterShell
      stages={stages}
      journeys={journeys}
      lessonsByStage={lessonsByStage}
      projectKeyLessons={projectKeyLessons}
    />
  );
}
