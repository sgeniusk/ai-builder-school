// 히어로 리퀴드 글래스 stat 카드 — 뷰포트에 들어오면 숫자가 카운트업.
// 디자인(B7Qz_… 핸드오프)의 .glass-stat + count-up을 우리 구조로 옮긴 것.
"use client";

import { useEffect, useState } from "react";

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
  const [active, setActive] = useState(false);

  // 히어로는 페이지 최상단 — 마운트 직후 카운트업을 시작한다.
  useEffect(() => {
    const t = window.setTimeout(() => setActive(true), 250);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="hero-stats">
      {STATS.map((s) => (
        <StatCard key={s.label} stat={s} active={active} />
      ))}
    </div>
  );
}
