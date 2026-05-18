// 프로젝트 준비도 — keyLessons 완료 비율로 잠김·준비 중·시작 가능을 보여준다.
// 새 추적 장치 없음 — 레슨 진척(localStorage)에서 파생.
"use client";

import {
  useLessonProgress,
  type ProgressLesson,
} from "@/hooks/useLessonProgress";

export function ProjectReadiness({ lessons }: { lessons: ProgressLesson[] }) {
  const { mounted, isLessonComplete } = useLessonProgress();
  const total = lessons.length;
  const done = mounted ? lessons.filter((l) => isLessonComplete(l)).length : 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const state = done === 0 ? "locked" : done >= total ? "ready" : "progress";
  const label =
    total === 0
      ? "준비 레슨 없음"
      : state === "ready"
        ? "시작 가능"
        : state === "locked"
          ? `준비 레슨 0/${total}`
          : `준비 중 ${done}/${total}`;

  return (
    <div className={`proj-readiness proj-readiness--${state}`}>
      <span className="proj-readiness__bar" aria-hidden>
        <span
          className="proj-readiness__fill"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="proj-readiness__label" suppressHydrationWarning>
        {label}
      </span>
    </div>
  );
}
