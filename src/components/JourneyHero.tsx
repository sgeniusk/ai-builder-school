// 여정 히어로 — "산을 바라보며 출발선에 선" 장면. 여정마다 산 능선이 다르다.
// 풍경(능선·하늘·해)은 여정 색, 캐릭터는 학습자가 고른 동물의 뒷모습.
"use client";

import type { Journey } from "@/lib/types";
import { useCharacter } from "@/hooks/useCharacter";
import { AnimalBack } from "./AnimalBack";
import { JourneySelectButton } from "./JourneySelectButton";

// 여정별 먼 능선 봉우리 높이 프로필 (0~1) — 여정마다 다른 스카이라인을 만든다.
const JOURNEY_PEAKS: Record<string, number[]> = {
  practitioner: [0.44, 0.62, 0.48, 0.7, 0.5, 0.64, 0.46], // 꾸준한 능선
  adopter: [0.5, 0.5, 0.74, 0.72, 0.56, 0.78, 0.54], // 단계적 고원
  creator: [0.55, 0.88, 0.4, 0.96, 0.46, 0.82, 0.58], // 극적인 변주
  founder: [0.34, 0.5, 0.72, 1.0, 0.6, 0.42, 0.3], // 하나의 정상
  engineer: [0.62, 0.8, 0.66, 0.92, 0.7, 0.86, 0.6], // 날카롭고 높게
  explorer: [0.72, 0.44, 0.84, 0.5, 0.7, 0.4, 0.78, 0.48], // 흩어진 봉우리들
};
const NEAR_PEAKS = [0.52, 0.34, 0.6, 0.4, 0.56, 0.36, 0.5];
const DEFAULT_PEAKS = JOURNEY_PEAKS.practitioner as number[];

/** 봉우리 높이 배열을 능선 폴리곤 점들로. baseY 바닥, [topY,bottomY]가 봉우리 범위. */
function ridge(heights: number[], baseY: number, topY: number, bottomY: number) {
  const span = 880; // viewBox 800 + 좌우 40 여유
  const pts = [`-40,${baseY}`];
  heights.forEach((h, i) => {
    const x = Math.round(-40 + (i / (heights.length - 1)) * span);
    const y = Math.round(bottomY - h * (bottomY - topY));
    pts.push(`${x},${y}`);
  });
  pts.push(`840,${baseY}`);
  return pts.join(" ");
}

export function JourneyHero({ journey }: { journey: Journey }) {
  const { mounted, character } = useCharacter();
  const animal = mounted && character ? character.animal : "puppy";
  const skyId = `journey-sky-${journey.id}`;
  const peaks = JOURNEY_PEAKS[journey.id] ?? DEFAULT_PEAKS;

  return (
    <section className={`journey-hero p-${journey.id}`}>
      <div className="journey-hero__scene" aria-hidden>
        <svg
          className="journey-hero__land"
          viewBox="0 0 800 340"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--p-from)" stopOpacity="0.46" />
              <stop offset="0.78" stopColor="var(--p-from)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* 하늘 */}
          <rect x="0" y="0" width="800" height="340" fill={`url(#${skyId})`} />
          {/* 떠오르는 해 */}
          <circle cx="612" cy="84" r="46" fill="var(--p-from)" opacity="0.34" />
          <circle cx="612" cy="84" r="26" fill="var(--p-from)" opacity="0.58" />
          {/* 구름 */}
          <ellipse cx="180" cy="78" rx="46" ry="13" fill="#FFFFFF" opacity="0.45" />
          <ellipse cx="210" cy="70" rx="30" ry="11" fill="#FFFFFF" opacity="0.4" />
          <ellipse cx="470" cy="116" rx="38" ry="11" fill="#FFFFFF" opacity="0.34" />
          {/* 먼 능선 — 여정마다 다른 스카이라인 */}
          <polygon
            points={ridge(peaks, 322, 72, 212)}
            fill="var(--p-from)"
            opacity="0.5"
          />
          {/* 가까운 능선 */}
          <polygon
            points={ridge(NEAR_PEAKS, 340, 176, 262)}
            fill="var(--p-to)"
            opacity="0.66"
          />
          {/* 출발선에서 산으로 향하는 길 (원근) */}
          <polygon
            points="372,340 428,340 410,250 390,250"
            fill="var(--paper)"
            opacity="0.5"
          />
        </svg>
        <div className="journey-hero__char">
          <AnimalBack animal={animal} />
        </div>
      </div>

      <div className="journey-hero__copy">
        <span className="journey-hero__eyebrow p-text">여정 시작</span>
        <h1 className="journey-hero__title">{journey.titleKo}의 여정</h1>
        <p className="journey-hero__identity">{journey.identity}</p>
        <p className="journey-hero__promise">{journey.promise}</p>
        <div className="journey-hero__cta">
          <JourneySelectButton
            journeyId={journey.id}
            firstLessonSlug={journey.recommendedLessons[0]}
          />
        </div>
      </div>
    </section>
  );
}
