// 레슨 페이지 우측 사이드바 — 3개 카드(TOC / 빌드·검증·회고 3-section 진행률 / 형제 lesson).
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lesson, Phase } from "@/lib/types";
import {
  SECTIONS,
  SECTION_WEIGHTS,
  useLessonProgress,
  type Section,
} from "@/hooks/useLessonProgress";

const SECTION_IDS = [
  { id: "section-problem", label: "문제 이해" },
  { id: "section-concepts", label: "최소 개념" },
  { id: "section-mission", label: "미션" },
  { id: "section-build", label: "빌드 단계" },
  { id: "section-verify", label: "검증 체크리스트" },
  { id: "section-deliverable", label: "산출물" },
  { id: "section-reflection", label: "회고" },
] as const;

const SECTION_META: Record<Section, { label: string; anchorId: string }> = {
  build: { label: "빌드", anchorId: "section-build" },
  verify: { label: "검증", anchorId: "section-verify" },
  reflect: { label: "회고", anchorId: "section-reflection" },
};

function sectionItems(lesson: Lesson, section: Section): string[] {
  if (section === "build") return lesson.buildSteps ?? [];
  if (section === "verify") return lesson.verificationChecklist ?? [];
  return lesson.reflectionQuestions ?? [];
}

type Props = {
  currentLesson: Lesson;
  currentPhase: Phase | undefined;
  siblingLessons: Lesson[];
};

export function LessonToc({ currentLesson, currentPhase, siblingLessons }: Props) {
  const { mounted, getSectionPct, getWeightedPct, isLessonComplete } =
    useLessonProgress();
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    SECTION_IDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [currentLesson.id]);

  const activeIndex = SECTION_IDS.findIndex((s) => s.id === activeId);

  const weighted = mounted ? getWeightedPct(currentLesson) : 0;

  // Phase 진행률 (siblings 중 셋 다 완료된 lesson 비율)
  const phaseTotal = siblingLessons.length;
  const phaseDone = mounted
    ? siblingLessons.filter((l) => isLessonComplete(l)).length
    : 0;
  const phasePct =
    phaseTotal === 0 ? 0 : Math.round((phaseDone / phaseTotal) * 100);

  return (
    <aside className="lesson-toc" aria-label="레슨 안 네비게이션">
      {/* 1. TOC 카드 */}
      <div className="toc-card">
        <span className="rail-section-label">이 레슨</span>
        <ul className="toc-list">
          {SECTION_IDS.map(({ id, label }, idx) => {
            const isActive = id === activeId;
            const isPassed = idx < activeIndex;
            return (
              <li
                key={id}
                className={[
                  "toc-row",
                  isActive && "toc-row--active",
                  isPassed && "toc-row--passed",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <a href={`#${id}`}>
                  <span className="toc-step mono">{idx + 1}</span>
                  <span className="toc-bar" aria-hidden />
                  <span className="toc-label">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. 3-section 진행률 카드 */}
      <div className="progress-card">
        <span className="rail-section-label">레슨 진행률</span>

        <ul className="lesson-progress-trio">
          {SECTIONS.map((s) => {
            const items = sectionItems(currentLesson, s);
            const total = items.length;
            const pct = mounted ? getSectionPct(currentLesson.id, s, total) : 0;
            const meta = SECTION_META[s];
            const weightPct = Math.round(SECTION_WEIGHTS[s] * 100);
            return (
              <li key={s} className={`lesson-progress-trio__row pp-${s}`}>
                <a href={`#${meta.anchorId}`}>
                  <span className="lesson-progress-trio__label">
                    {meta.label}
                    <span className="lesson-progress-trio__weight mono">
                      {weightPct}
                    </span>
                  </span>
                  <span className="lesson-progress-trio__bar" aria-hidden>
                    <span
                      className="lesson-progress-trio__fill"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span
                    className="lesson-progress-trio__count tnum mono"
                    suppressHydrationWarning
                  >
                    {Math.round((pct / 100) * total)}/{total}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="prog-meta lesson-progress-trio__weighted">
          <div className="prog-frac tnum">
            <span suppressHydrationWarning>{weighted}</span>
            <span className="prog-frac__sub">% 가중 평균</span>
          </div>
        </div>

        <p className="prog-note">
          빌드 50 · 검증 30 · 회고 20 가중. 셋 다 100% 면 완료.
        </p>

        {currentPhase && phaseTotal > 0 && (
          <div className="ph-prog-wrap">
            <div className="ph-prog-label">
              <span>Phase {String(currentPhase.order).padStart(2, "0")} 진행</span>
              <span className="tnum" suppressHydrationWarning>
                {phaseDone}/{phaseTotal} 레슨
              </span>
            </div>
            <div className="ph-prog-bar" aria-hidden>
              <span
                className="ph-prog-fill"
                style={{ width: `${phasePct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. 형제 lesson 카드 — status box */}
      {siblingLessons.length > 0 && currentPhase && (
        <div className="sibling-card">
          <span className="rail-section-label sibling-card__header">
            Phase {String(currentPhase.order).padStart(2, "0")} 레슨
          </span>
          <ul className="sibling-card__list">
            {siblingLessons.map((sib) => {
              const isDone = mounted && isLessonComplete(sib);
              const isCurrent = sib.id === currentLesson.id;
              return (
                <li
                  key={sib.id}
                  className={[
                    "sib-item",
                    isCurrent && "sib-item--current",
                    isDone && "sib-item--done",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Link href={`/lessons/${sib.slug}`}>
                    <span
                      className={[
                        "sib-status",
                        isDone && "sib-status--done",
                        isCurrent && "sib-status--current",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden
                    />
                    <span className="sib-name">{sib.titleKo}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
}
