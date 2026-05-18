// 현재 여정의 레슨 경로(recommendedLessons)를 풀어, 지금 레슨의 위치·앞뒤·이탈 여부를 계산한다.
// JourneyPathCard(우측 내비)와 LessonPager(본문 앞/뒤)가 공유.
"use client";

import type { Journey, Lesson } from "@/lib/types";
import { useLessonProgress } from "./useLessonProgress";

const DEFAULT_JOURNEY = "practitioner";

export type JourneyPathInfo = {
  mounted: boolean;
  journey: Journey | undefined;
  /** 여정 추천 레슨을 순서대로 푼 것. */
  path: Lesson[];
  /** path 안에서 현재 레슨의 인덱스. 경로 밖이면 -1. */
  currentIndex: number;
  offPath: boolean;
  /** 여정 순서 기준 앞/뒤 레슨. */
  prev: Lesson | null;
  next: Lesson | null;
  /** 경로 밖일 때 여정으로 복귀할 레슨 — 첫 미완료 추천 레슨. */
  resume: Lesson | null;
  isComplete: (lesson: Lesson) => boolean;
};

export function useJourneyPath(
  journeys: Journey[],
  allLessons: Lesson[],
  currentSlug: string,
): JourneyPathInfo {
  const { mounted, journey, isLessonComplete } = useLessonProgress();
  const journeyId = mounted ? (journey ?? DEFAULT_JOURNEY) : DEFAULT_JOURNEY;
  const selected = journeys.find((j) => j.id === journeyId);

  const bySlug = new Map(allLessons.map((l) => [l.slug, l]));
  const path = (selected?.recommendedLessons ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((l): l is Lesson => Boolean(l));

  const currentIndex = path.findIndex((l) => l.slug === currentSlug);
  const offPath = currentIndex < 0;
  const prev = currentIndex > 0 ? (path[currentIndex - 1] ?? null) : null;
  const next =
    currentIndex >= 0 && currentIndex < path.length - 1
      ? (path[currentIndex + 1] ?? null)
      : null;
  const resume = path.find((l) => !isLessonComplete(l)) ?? path[0] ?? null;

  return {
    mounted,
    journey: selected,
    path,
    currentIndex,
    offPath,
    prev,
    next,
    resume,
    isComplete: isLessonComplete,
  };
}
