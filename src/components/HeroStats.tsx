// 히어로 리퀴드 글래스 stat 카드 — 뷰포트에 들어오면 숫자가 카운트업.
// 디자인(B7Qz_… 핸드오프)의 .glass-stat + count-up을 우리 구조로 옮긴 것.
"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; label: string };

const STATS: Stat[] = [
  { value: 8, label: "Stages" },
  { value: 84, label: "Lessons" },
  { value: 6, label: "Journeys" },
  { value: 1, suffix: "개", label: "단계마다 산출물" },
];

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(stat.value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = p * p * (3 - 2 * p);
      setN(Math.round(eased * stat.value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.value]);

  return (
    <div className="glass-stat">
      <div className="hs-num tnum">
        {n}
        {stat.suffix && <span className="hs-sub">{stat.suffix}</span>}
      </div>
      <div className="hs-lbl">{stat.label}</div>
    </div>
  );
}

export function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // 카운트업은 (1) stat 이 뷰포트에 들어오고 (2) 탭이 실제로 보일 때 한 번만 시작한다.
  // 백그라운드 탭에서 로드되면 requestAnimationFrame 이 멈춰 숫자가 0 에 굳으므로,
  // 탭이 보이는 순간(visibilitychange)까지 기다렸다가 시작한다.
  useEffect(() => {
    if (active) return;
    const el = ref.current;
    if (!el) return;

    let inView = false;
    const maybeStart = () => {
      if (inView && !document.hidden) setActive(true);
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                inView = true;
                maybeStart();
              }
            },
            { threshold: 0.4 },
          )
        : null;

    if (io) io.observe(el);
    else inView = true; // IO 미지원 — 바로 후보 처리
    maybeStart();

    document.addEventListener("visibilitychange", maybeStart);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", maybeStart);
    };
  }, [active]);

  return (
    <div className="hero-stats" ref={ref}>
      {STATS.map((s) => (
        <StatCard key={s.label} stat={s} active={active} />
      ))}
    </div>
  );
}
