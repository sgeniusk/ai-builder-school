// 여정 히어로 — "산을 바라보며 출발선에 선" 장면. 여정을 시작하는 순간의 모험감.
// 풍경(산·길·하늘)은 여정 색, 캐릭터는 학습자가 고른 동물의 뒷모습.
"use client";

import type { Journey } from "@/lib/types";
import { useCharacter } from "@/hooks/useCharacter";
import { AnimalBack } from "./AnimalBack";
import { JourneySelectButton } from "./JourneySelectButton";

export function JourneyHero({ journey }: { journey: Journey }) {
  const { mounted, character } = useCharacter();
  const animal = mounted && character ? character.animal : "puppy";
  const skyId = `journey-sky-${journey.id}`;

  return (
    <section className={`journey-hero p-${journey.id}`}>
      <div className="journey-hero__scene" aria-hidden>
        <svg
          className="journey-hero__land"
          viewBox="0 0 800 360"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--p-from)" stopOpacity="0.5" />
              <stop offset="0.7" stopColor="var(--p-from)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* 하늘 */}
          <rect x="0" y="0" width="800" height="360" fill={`url(#${skyId})`} />
          {/* 떠오르는 해 */}
          <circle cx="556" cy="126" r="48" fill="var(--p-from)" opacity="0.4" />
          <circle cx="556" cy="126" r="27" fill="var(--p-from)" opacity="0.6" />
          {/* 먼 산 */}
          <polygon points="-20,252 170,118 350,252" fill="var(--p-from)" opacity="0.34" />
          <polygon points="240,252 450,86 660,252" fill="var(--p-from)" opacity="0.42" />
          <polygon points="520,252 690,140 840,252" fill="var(--p-from)" opacity="0.34" />
          {/* 가까운 산 */}
          <polygon points="-60,310 210,168 470,310" fill="var(--p-to)" opacity="0.5" />
          <polygon points="380,310 630,156 880,310" fill="var(--p-to)" opacity="0.55" />
          {/* 땅 */}
          <rect x="0" y="286" width="800" height="74" fill="var(--p-to)" opacity="0.16" />
          {/* 출발선에서 산으로 향하는 길 (원근) */}
          <polygon
            points="366,360 434,360 412,288 388,288"
            fill="var(--p-to)"
            opacity="0.32"
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
