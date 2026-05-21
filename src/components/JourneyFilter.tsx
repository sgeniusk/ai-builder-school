"use client";
// 여정 필터 — 페르소나 1개를 선택하면 그 여정에 속하지 않는 레슨이 흐려진다.
// 상태는 body[data-active-journey]에 부착해 CSS 속성 선택자로 dim 처리.
// localStorage에 영구 저장해 페이지를 넘나들어도 유지.
import { useEffect, useState } from "react";

const STORAGE_KEY = "abs:active-journey";

const JOURNEYS = [
  { id: "practitioner", label: "실무자" },
  { id: "adopter", label: "도입자" },
  { id: "creator", label: "크리에이터" },
  { id: "founder", label: "파운더" },
  { id: "engineer", label: "엔지니어" },
  { id: "explorer", label: "탐험가" },
] as const;

type JourneyId = (typeof JOURNEYS)[number]["id"];

function applyToBody(j: JourneyId | null) {
  if (typeof document === "undefined") return;
  if (j) {
    document.body.dataset.activeJourney = j;
  } else {
    delete document.body.dataset.activeJourney;
  }
}

export function JourneyFilter() {
  const [active, setActive] = useState<JourneyId | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && JOURNEYS.some((j) => j.id === saved)) {
      setActive(saved as JourneyId);
      applyToBody(saved as JourneyId);
    }
    setMounted(true);
  }, []);

  const pick = (j: JourneyId) => {
    const next = active === j ? null : j;
    setActive(next);
    if (next) localStorage.setItem(STORAGE_KEY, next);
    else localStorage.removeItem(STORAGE_KEY);
    applyToBody(next);
  };

  const clear = () => {
    setActive(null);
    localStorage.removeItem(STORAGE_KEY);
    applyToBody(null);
  };

  // SSR 직후 깜빡임을 줄이려 첫 렌더는 빈 상태로
  return (
    <div className="journey-filter" data-mounted={mounted ? "1" : "0"}>
      <div className="journey-filter__head">
        <span className="journey-filter__label">내 여정으로 보기</span>
        {active && (
          <button
            type="button"
            className="journey-filter__clear"
            onClick={clear}
            aria-label="여정 필터 해제"
          >
            전체 보기 ✕
          </button>
        )}
      </div>
      <div className="journey-filter__buttons">
        {JOURNEYS.map((j) => (
          <button
            key={j.id}
            type="button"
            className={`journey-filter__btn p-${j.id}${active === j.id ? " is-active" : ""}`}
            onClick={() => pick(j.id)}
            aria-pressed={active === j.id}
          >
            <span className="journey-filter__dot" aria-hidden="true" />
            <span>{j.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
