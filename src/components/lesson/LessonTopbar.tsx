// 레슨 콘솔 상단바 — 로고 락업 · 브레드크럼(여정/모듈/Lxx) · 모듈 진행 · 테마.
// 전역 헤더가 /lessons/* 에서 숨겨지므로 이 바가 콘솔의 크롬이 된다.
"use client";

import Link from "next/link";
import type { Journey, Lesson } from "@/lib/types";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { LockupH } from "../brand/Wordmark";
import { ThemeToggle } from "../ThemeToggle";

type Props = {
  journeys: Journey[];
  stageLabel: string;
  lessonLabel: string;
  /** 현재 모듈(스테이지)의 레슨들 — 모듈 진행 % 계산용. */
  siblingLessons: Lesson[];
};

export function LessonTopbar({ journeys, stageLabel, lessonLabel, siblingLessons }: Props) {
  const { mounted, journey, isLessonComplete } = useLessonProgress();
  const journeyKo =
    (mounted && journeys.find((j) => j.id === journey)?.titleKo) || "여정";
  const total = siblingLessons.length;
  const done = mounted ? siblingLessons.filter((l) => isLessonComplete(l)).length : 0;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <header className="lesson-topbar">
      <Link href="/" className="lesson-topbar__home" aria-label="지음 홈">
        <LockupH variant="house" treatment="sans" scale={0.46} showRoman={false} color="var(--ink)" />
      </Link>
      <span className="lesson-topbar__sep" aria-hidden />
      <nav className="lesson-topbar__crumb" aria-label="현재 위치">
        <span className="lesson-topbar__crumb-j" suppressHydrationWarning>
          {journeyKo}
        </span>
        <span className="lesson-topbar__crumb-d" aria-hidden>/</span>
        <span className="lesson-topbar__crumb-s">{stageLabel}</span>
        <span className="lesson-topbar__crumb-d" aria-hidden>/</span>
        <span className="lesson-topbar__crumb-cur">{lessonLabel}</span>
      </nav>
      <div className="lesson-topbar__right">
        <div className="lesson-topbar__prog" title={`모듈 진행 ${pct}%`}>
          <span className="mono lesson-topbar__prog-label" suppressHydrationWarning>
            모듈 진행 {pct}%
          </span>
          <span className="lesson-topbar__bar" aria-hidden>
            <span className="lesson-topbar__bar-fill" style={{ width: `${pct}%` }} />
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
