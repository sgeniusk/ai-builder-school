// SiteHeader 안에 박히는 서버 래퍼 — content 데이터를 한 번 직렬화해 CharacterShell 로 넘긴다.
import { getJourneys, getLessons, getPhases } from "@/lib/content";
import type { Lesson } from "@/lib/types";
import { CharacterShell } from "./CharacterShell";

export function CharacterChrome() {
  const phases = getPhases();
  const allLessons = getLessons();
  const journeys = getJourneys();

  const lessonsByPhase: Record<string, Lesson[]> = {};
  for (const p of phases) lessonsByPhase[p.id] = [];
  for (const l of allLessons) {
    const bucket = lessonsByPhase[l.phaseId];
    if (bucket) bucket.push(l);
  }

  return (
    <CharacterShell
      phases={phases}
      journeys={journeys}
      lessonsByPhase={lessonsByPhase}
    />
  );
}
