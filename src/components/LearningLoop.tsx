// 홈의 7-step 학습 루프 — 컬러 휠 디스크 + 단계 리스트.
// 리스트에 마우스를 올리면 고리 위 점이 그 단계 위치로 돌고, 디스크·배경 색이 그 단계 색으로 옮겨간다.
"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

interface LoopStep {
  num: string;
  title: string;
  sub: string;
  verb: string;
  color: string;
}

const LOOP_STEPS: LoopStep[] = [
  { num: "01", title: "문제 이해", sub: "왜 지금 이 문제를 푸는가", verb: "PROBLEM", color: "oklch(72% 0.19 25)" },
  { num: "02", title: "최소 개념", sub: "필요한 만큼만 배운다", verb: "CONCEPT", color: "oklch(78% 0.17 62)" },
  { num: "03", title: "미션", sub: "Claude Code에게 작업지시", verb: "MISSION", color: "oklch(83% 0.15 110)" },
  { num: "04", title: "빌드", sub: "작은 것을 만든다", verb: "BUILD", color: "oklch(76% 0.16 152)" },
  { num: "05", title: "검증", sub: "체크리스트로 확인한다", verb: "VERIFY", color: "oklch(74% 0.13 212)" },
  { num: "06", title: "배포", sub: "공개하거나 공유한다", verb: "SHIP", color: "oklch(64% 0.18 274)" },
  { num: "07", title: "회고", sub: "사람과 AI의 역할을 분리해 기록", verb: "REFLECT", color: "oklch(68% 0.21 322)" },
];

const CYCLE_MS = 2800;
const STEP_ANGLE = 360 / LOOP_STEPS.length;

export function LearningLoop() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rotation, setRotation] = useState(0);
  const prevActive = useRef(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % LOOP_STEPS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  // active 가 바뀌면 최단 경로로 회전 — 7→6 처럼 뒤로 가면 한 칸만 되돌린다.
  useEffect(() => {
    const n = LOOP_STEPS.length;
    let delta = active - prevActive.current;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    if (delta !== 0) setRotation((r) => r + delta * STEP_ANGLE);
    prevActive.current = active;
  }, [active]);

  const current = LOOP_STEPS[active];

  return (
    <div
      className="loop-wrap"
      style={{ "--loop-color": current.color } as CSSProperties}
    >
      <div className="loop-visual" aria-hidden="true">
        <div className="loop-aura" />
        <div className="loop-disc">
          <div className="loop-disc-inner">
            <div>
              <span className="big tnum">{current.num}</span>
              <small>{current.verb}</small>
            </div>
          </div>
        </div>
        <div
          className="loop-orbit"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <span className="loop-dot" />
        </div>
      </div>
      <ol className="loop-list" onMouseLeave={() => setPaused(false)}>
        {LOOP_STEPS.map((step, i) => (
          <li
            key={step.num}
            className={i === active ? "is-active" : undefined}
            style={{ "--step-color": step.color } as CSSProperties}
            onMouseEnter={() => {
              setActive(i);
              setPaused(true);
            }}
          >
            <span className="n tnum">{step.num}</span>
            <span>
              <strong>{step.title}</strong>
              <small>{step.sub}</small>
            </span>
            <span className="v">{step.verb}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
