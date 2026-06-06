// 프로젝트의 구제 레슨(keyLessons) 중 몇 개를 이미 봤는지 보여준다 (막대 색으로 상태 표시).
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
  // 빌드-우선 — keyLessons는 "막힐 때 보는 구제 레슨". 잠금·시작가능 프레이밍을 걷어내고
  // 몇 개를 이미 봤는지만 보여준다(상태는 막대 색으로만 남긴다).
  const label =
    total === 0 ? "구제 레슨 없음" : `구제 레슨 ${done}/${total}`;

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
