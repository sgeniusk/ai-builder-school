// 레슨 본문 읽기 진행률 글로우 레일 — 섹션 점·현재 위치 글로우 노드·남은 시간.
// 디자인 핸드오프의 "글로우 내비게이션 스크롤바"를 우리 레슨 구조로 옮긴 것.
// 색은 현재 여정(persona)의 --p-from / --p-to 를 써서 여정별로 다르게 빛난다.
"use client";

import { useCallback, useEffect, useState } from "react";

// h2 id → 짧은 라벨. DOM 에 없는 섹션은 자동으로 빠진다.
const SECTION_LABELS: Record<string, string> = {
  "section-problem": "문제 이해",
  "section-concepts": "최소 개념",
  "section-mission": "미션",
  "section-build": "빌드 단계",
  "section-verify": "검증",
  "section-deliverable": "산출물",
  "section-reflection": "회고",
};

type Mark = { id: string; label: string };

export function ReadingRail({ estimatedMinutes }: { estimatedMinutes: number }) {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [progress, setProgress] = useState(0); // 0-1 본문 읽기 진행률
  const [activeIdx, setActiveIdx] = useState(0);

  // 1. 마운트 후 실제 DOM 에서 섹션 헤딩을 수집한다.
  //    (buildSteps 가 없는 레슨은 section-build 가 렌더되지 않으므로 DOM 기준이 안전)
  useEffect(() => {
    const article = document.querySelector(".lesson-reader");
    if (!article) return;
    const heads = Array.from(
      article.querySelectorAll<HTMLElement>('h2[id^="section-"]'),
    );
    setMarks(
      heads.map((h) => ({
        id: h.id,
        label:
          SECTION_LABELS[h.id] ??
          h.textContent?.replace(/^\s*\d+\.\s*/, "").trim() ??
          h.id,
      })),
    );
  }, []);

  // 2. 스크롤을 추적해 진행률과 현재 섹션을 갱신한다 (rAF 스로틀).
  useEffect(() => {
    if (marks.length === 0) return;
    const article = document.querySelector<HTMLElement>(".lesson-reader");
    if (!article) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = article.getBoundingClientRect();
      const vh = window.innerHeight;
      // 본문 상단이 화면 위로 올라간 만큼 / 본문이 스크롤될 수 있는 총량
      const scrolled = -rect.top;
      const span = rect.height - vh;
      const p =
        span > 0
          ? Math.min(1, Math.max(0, scrolled / span))
          : rect.top < 0
            ? 1
            : 0;
      setProgress(p);

      // 현재 섹션 — 화면 상단 32% 선을 지난 마지막 섹션 헤딩
      const line = vh * 0.32;
      const heads = Array.from(
        article.querySelectorAll<HTMLElement>('h2[id^="section-"]'),
      );
      let idx = 0;
      heads.forEach((h, i) => {
        if (h.getBoundingClientRect().top <= line) idx = i;
      });
      setActiveIdx(idx);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // 백그라운드 탭에서 로드되면 rAF 가 멈춰 진행률이 굳는다 — 탭이 다시 보일 때 갱신.
    document.addEventListener("visibilitychange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [marks.length]);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  // 섹션을 못 찾으면(예: MDX-only 레슨) 아무것도 그리지 않는다.
  if (marks.length === 0) return null;

  const remaining = Math.max(0, Math.round(estimatedMinutes * (1 - progress)));
  const done = progress > 0.985;
  const status = progress < 0.02 ? "곧 시작해요" : done ? "다 읽었어요" : "읽는 중";
  const activeLabel = marks[activeIdx]?.label ?? "";

  return (
    <div className="reading-rail">
      <div className="reading-rail__head">
        <span className="reading-rail__status">{status}</span>
        <span className="reading-rail__time tnum mono" suppressHydrationWarning>
          {done ? "완독" : `약 ${remaining}분 남음`}
        </span>
      </div>

      <div className="reading-rail__body">
        <div className="reading-rail__track" aria-hidden>
          <span
            className="reading-rail__fill"
            style={{ height: `${progress * 100}%` }}
          />
          <span
            className="reading-rail__node"
            style={{ top: `${progress * 100}%` }}
          />
        </div>
        <ul className="reading-rail__list">
          {marks.map((m, i) => {
            const passed = i < activeIdx;
            const active = i === activeIdx;
            return (
              <li
                key={m.id}
                className={[
                  "reading-rail__row",
                  passed && "is-passed",
                  active && "is-active",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button type="button" onClick={() => jumpTo(m.id)}>
                  <span className="reading-rail__dot" aria-hidden />
                  <span className="reading-rail__label">{m.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="reading-rail__foot">
        <span className="reading-rail__chapter p-text" suppressHydrationWarning>
          {activeLabel}
        </span>
        <span className="reading-rail__foot-sub mono tnum" suppressHydrationWarning>
          섹션 {Math.min(activeIdx + 1, marks.length)} / {marks.length}
        </span>
      </p>
    </div>
  );
}
