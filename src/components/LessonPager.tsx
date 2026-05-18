// 레슨 본문 맨 아래 앞/뒤 내비 — 여정에 올라 있으면 여정 순서로, 아니면 전체 레슨 순서로.
// SSR·마운트 전엔 fallback(전체 순서)을 그려 hydration 을 맞추고, 마운트 후 여정 순서로 교체.
"use client";

import Link from "next/link";
import type { Journey, Lesson } from "@/lib/types";
import { useJourneyPath } from "@/hooks/useJourneyPath";

type Stub = { slug: string; titleKo: string } | null;

type Props = {
  journeys: Journey[];
  allLessons: Lesson[];
  currentSlug: string;
  fallbackPrev: Stub;
  fallbackNext: Stub;
};

export function LessonPager({
  journeys,
  allLessons,
  currentSlug,
  fallbackPrev,
  fallbackNext,
}: Props) {
  const { mounted, offPath, prev, next } = useJourneyPath(
    journeys,
    allLessons,
    currentSlug,
  );
  const onJourney = mounted && !offPath;
  const prevL: Stub = onJourney ? prev : fallbackPrev;
  const nextL: Stub = onJourney ? next : fallbackNext;

  return (
    <div className="lesson-pager">
      {onJourney && <span className="lesson-pager__tag">여정 경로</span>}
      <nav className="lesson-pager__nav">
        {prevL ? (
          <Link
            href={`/lessons/${prevL.slug}`}
            className="lesson-pager__link"
          >
            <span className="lesson-pager__dir">← 이전</span>
            <span className="lesson-pager__title">{prevL.titleKo}</span>
          </Link>
        ) : (
          <span className="lesson-pager__empty">첫 레슨이에요</span>
        )}
        {nextL ? (
          <Link
            href={`/lessons/${nextL.slug}`}
            className="lesson-pager__link lesson-pager__link--next"
          >
            <span className="lesson-pager__dir">다음 →</span>
            <span className="lesson-pager__title">{nextL.titleKo}</span>
          </Link>
        ) : (
          <span className="lesson-pager__empty">
            {onJourney ? "여정의 마지막 레슨" : "마지막 레슨이에요"}
          </span>
        )}
      </nav>
    </div>
  );
}
