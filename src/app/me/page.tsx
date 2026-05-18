// 빌더 대시보드 /me — 학습자 개인 진척 페이지.
// 서버에서 slim 데이터를 만들어 클라이언트 BuilderDashboard로 넘긴다.
// 실제 진척·캐릭터는 클라이언트가 localStorage에서 읽는다.
import type { Metadata } from "next";
import {
  BuilderDashboard,
  type DashJourney,
  type DashLesson,
  type DashProject,
  type DashStage,
} from "@/components/BuilderDashboard";
import {
  getJourneys,
  getLessons,
  getProjects,
  getProjectReadinessRefs,
  getStages,
} from "@/lib/content";
import { LEVEL_LABEL } from "@/lib/types";

export const metadata: Metadata = {
  title: "내 빌더 대시보드",
  description:
    "내 학습 진척 — Stage별 완주 현황, 여정 진척, 이어서 볼 레슨을 한 화면에.",
};

export default function MePage() {
  const stages = getStages();
  const allLessons = getLessons();

  const dashStages: DashStage[] = stages.map((s) => ({
    id: s.id,
    order: s.order,
    label: s.label,
    slug: s.slug,
  }));

  const lessonsByStage: Record<string, DashLesson[]> = {};
  for (const s of stages) {
    lessonsByStage[s.id] = s.lessonSlugs
      .map((slug) => allLessons.find((l) => l.slug === slug))
      .filter((l): l is NonNullable<typeof l> => Boolean(l))
      .map((l) => ({
        id: l.id,
        slug: l.slug,
        titleKo: l.titleKo,
        buildSteps: l.buildSteps,
        verificationChecklist: l.verificationChecklist,
        reflectionQuestions: l.reflectionQuestions,
      }));
  }

  const dashJourneys: DashJourney[] = getJourneys().map((j) => ({
    id: j.id,
    titleKo: j.titleKo,
    identity: j.identity,
    recommendedLessons: j.recommendedLessons,
  }));

  const dashProjects: DashProject[] = getProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    difficultyLabel: LEVEL_LABEL[p.difficulty],
    targetJourneys: p.targetJourneys,
    keyLessonRefs: getProjectReadinessRefs(p),
  }));

  return (
    <BuilderDashboard
      stages={dashStages}
      lessonsByStage={lessonsByStage}
      journeys={dashJourneys}
      projects={dashProjects}
    />
  );
}
