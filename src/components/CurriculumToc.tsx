// /curriculum 페이지의 우측 사이드바 — 여정 진행률 + (phaseSlug 모드면) 이 phase 의 여정·프로젝트.
"use client";

import Link from "next/link";
import type { Journey, Lesson, Project } from "@/lib/types";
import { useLessonProgress } from "@/hooks/useLessonProgress";

type Props = {
  /** 모든 여정 (server 에서 직렬화 가능한 형태로 전달) */
  journeys: Journey[];
  /** 각 여정의 추천 lesson 객체 (진행률 계산용) */
  recommendedLessonsByJourney: Record<string, Lesson[]>;
  /** 현재 보는 phase slug. 없으면 index 모드. */
  phaseSlug?: string;
  /** phaseSlug 모드에서 — 이 phase 가 추천된 여정 */
  matchedJourneys?: Journey[];
  /** phaseSlug 모드에서 — 이 phase 를 사용하는 프로젝트 */
  matchedProjects?: Project[];
};

export function CurriculumToc({
  journeys,
  recommendedLessonsByJourney,
  phaseSlug,
  matchedJourneys = [],
  matchedProjects = [],
}: Props) {
  const { mounted, isLessonComplete, journey: currentJourney } =
    useLessonProgress();

  return (
    <aside className="curriculum-toc" aria-label="여정 진행 사이드바">
      {/* 1. 여정 진행률 카드 — 항상 표시 */}
      <div className="progress-card">
        <span className="rail-section-label">여정 진행률</span>
        <ul className="curriculum-toc__journeys">
          {journeys.map((j) => {
            const list = recommendedLessonsByJourney[j.id] ?? [];
            const total = list.length;
            const done = mounted
              ? list.filter((l) => isLessonComplete(l)).length
              : 0;
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);
            const isActive = j.id === currentJourney;
            return (
              <li
                key={j.id}
                className={[
                  "curriculum-toc__journey",
                  `p-${j.id}`,
                  isActive && "curriculum-toc__journey--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Link href={`/journeys#${j.slug}`}>
                  <span className="curriculum-toc__j-pill" aria-hidden />
                  <span className="curriculum-toc__j-text">
                    <span className="curriculum-toc__j-title">{j.titleKo}</span>
                    <span className="curriculum-toc__j-meta tnum">
                      <span suppressHydrationWarning>
                        {done}/{total}
                      </span>
                      <span className="curriculum-toc__j-sep">·</span>
                      <span suppressHydrationWarning>{pct}%</span>
                    </span>
                  </span>
                  <span className="curriculum-toc__j-bar" aria-hidden>
                    <span
                      className="curriculum-toc__j-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. Phase 모드일 때 — 이 phase 가 속한 여정 */}
      {phaseSlug && matchedJourneys.length > 0 && (
        <div className="progress-card">
          <span className="rail-section-label">이 Phase 의 여정</span>
          <div className="curriculum-toc__chips">
            {matchedJourneys.map((j) => (
              <Link
                key={j.id}
                href={`/journeys#${j.slug}`}
                className={`chip p-${j.id} curriculum-toc__chip`}
              >
                <span className="curriculum-toc__chip-pill" aria-hidden />
                {j.titleKo}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. Phase 모드일 때 — 이 phase 의 프로젝트 */}
      {phaseSlug && matchedProjects.length > 0 && (
        <div className="sibling-card">
          <span className="rail-section-label sibling-card__header">
            이 Phase 의 프로젝트
          </span>
          <ul className="sibling-card__list">
            {matchedProjects.map((p) => (
              <li key={p.id} className="sib-item">
                <Link href={`/projects#${p.slug}`}>
                  <span className="sib-status" aria-hidden />
                  <span className="sib-name">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
