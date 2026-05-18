// 레슨 우측 사이드바 — 내 여정 경로 내비게이션. 현재 레슨 주변만 창으로 보여주고
// 전체는 /journeys 로 링크. 스테이지가 아니라 여정 추천 레슨 순서를 따른다.
"use client";

import Link from "next/link";
import type { Journey, Lesson } from "@/lib/types";
import { useJourneyPath } from "@/hooks/useJourneyPath";

type Props = {
  journeys: Journey[];
  allLessons: Lesson[];
  currentSlug: string;
};

// 현재(또는 복귀 지점) 기준 앞 1 · 뒤 3 만 보여준다.
const WINDOW_BEHIND = 1;
const WINDOW_AHEAD = 3;

export function JourneyPathCard({ journeys, allLessons, currentSlug }: Props) {
  const { mounted, journey, path, currentIndex, offPath, resume, isComplete } =
    useJourneyPath(journeys, allLessons, currentSlug);

  // 마운트 전엔 헤더만 — 여정은 클라이언트 상태라 SSR 불일치를 피한다.
  if (!mounted || !journey) {
    return (
      <aside className="journey-path-card" aria-label="내 여정 경로">
        <span className="rail-section-label">내 여정 경로</span>
      </aside>
    );
  }
  if (path.length === 0) return null;

  const anchor = offPath
    ? Math.max(0, path.findIndex((l) => l.slug === resume?.slug))
    : currentIndex;
  const start = Math.max(0, anchor - WINDOW_BEHIND);
  const end = Math.min(path.length, anchor + WINDOW_AHEAD + 1);
  const windowed = path.slice(start, end);

  return (
    <aside className="journey-path-card" aria-label="내 여정 경로">
      <div className="journey-path-card__head">
        <span className="rail-section-label">내 여정 경로</span>
        <span className="journey-path-card__name p-text">{journey.titleKo}</span>
      </div>

      {offPath && (
        <p className="journey-path-card__off">
          이 레슨은 여정 추천 밖이에요.
          {resume && (
            <>
              {" "}
              <Link href={`/lessons/${resume.slug}`}>여정으로 돌아가기 →</Link>
            </>
          )}
        </p>
      )}

      <ol className="journey-path-list">
        {start > 0 && (
          <li className="journey-path-list__more">⋯ 앞 {start}개</li>
        )}
        {windowed.map((l) => {
          const done = isComplete(l);
          const isCur = l.slug === currentSlug;
          return (
            <li
              key={l.slug}
              className={[
                "jp-item",
                isCur && "jp-item--current",
                done && "jp-item--done",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Link href={`/lessons/${l.slug}`}>
                <span className="jp-dot" aria-hidden />
                <span className="jp-name">{l.titleKo}</span>
              </Link>
            </li>
          );
        })}
        {end < path.length && (
          <li className="journey-path-list__more">
            ⋯ 다음 {path.length - end}개
          </li>
        )}
      </ol>

      <Link
        href={`/journeys#${journey.slug}`}
        className="journey-path-card__full"
      >
        전체 여정 보기 <span className="arrow">→</span>
      </Link>
    </aside>
  );
}
