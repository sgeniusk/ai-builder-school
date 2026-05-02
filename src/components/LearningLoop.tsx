"use client";

import { useEffect, useState } from "react";

interface LoopStep {
  num: string;
  title: string;
  sub: string;
  verb: string;
}

const LOOP_STEPS: LoopStep[] = [
  { num: "01", title: "문제 이해", sub: "왜 지금 이 문제를 푸는가", verb: "PROBLEM" },
  { num: "02", title: "최소 개념", sub: "필요한 만큼만 배운다", verb: "CONCEPT" },
  { num: "03", title: "미션", sub: "Claude Code에게 작업지시", verb: "MISSION" },
  { num: "04", title: "빌드", sub: "작은 것을 만든다", verb: "BUILD" },
  { num: "05", title: "검증", sub: "체크리스트로 확인한다", verb: "VERIFY" },
  { num: "06", title: "배포", sub: "공개하거나 공유한다", verb: "SHIP" },
  { num: "07", title: "회고", sub: "사람과 AI의 역할을 분리해 기록", verb: "REFLECT" },
];

const CYCLE_MS = 2800;

export function LearningLoop() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % LOOP_STEPS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = LOOP_STEPS[active];

  return (
    <div className="loop-wrap">
      <div className="loop-visual" aria-hidden="true">
        <div className="loop-disc">
          <div className="loop-disc-inner">
            <div>
              <span className="big tnum">{current.num}</span>
              <small>{current.verb}</small>
            </div>
          </div>
        </div>
      </div>
      <ol
        className="loop-list"
        onMouseLeave={() => setPaused(false)}
      >
        {LOOP_STEPS.map((step, i) => (
          <li
            key={step.num}
            className={i === active ? "is-active" : undefined}
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
