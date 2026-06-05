// 지음 랜딩 — 시안(cv-landing.jsx) 7섹션. 헤더·푸터는 전역 크롬 재사용.
import { Reveal } from "@/components/Reveal";
import {
  LandingCta,
  LandingHero,
  LandingHow,
  LandingJourneyCards,
  LandingJourneyMap,
  LandingValue,
} from "@/components/landing/LandingSections";
import { getJourneys } from "@/lib/content";

export default function HomePage() {
  const journeys = getJourneys();

  return (
    <>
      <LandingHero journeys={journeys} />
      <Reveal>
        <LandingValue />
      </Reveal>
      <Reveal>
        <LandingJourneyMap journeys={journeys} />
      </Reveal>
      <Reveal>
        <LandingJourneyCards journeys={journeys} />
      </Reveal>
      <Reveal>
        <LandingHow />
      </Reveal>
      <Reveal>
        <LandingCta />
      </Reveal>
    </>
  );
}
