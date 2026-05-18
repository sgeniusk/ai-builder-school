import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { JourneyCard } from "@/components/Cards";
import { PageHead } from "@/components/Sections";
import { getJourneys } from "@/lib/content";

export const metadata: Metadata = {
  title: "여정 · 6개 학습 경로",
  description:
    "AI Builder School의 6개 여정. 어디서 출발하든 모두 빌더가 됩니다 — 실무자·도입자·크리에이터·파운더·엔지니어·탐험가.",
};

export default function JourneysPage() {
  const journeys = getJourneys();

  return (
    <>
      <PageHead
        eyebrow={<>Journeys · 6</>}
        title={
          <>
            출발점이 어디든,
            <br />
            결국 빌더가 됩니다.
          </>
        }
        lede="여섯 여정 중 하나를 골라요. 카드를 누르면 그 여정의 모험이 시작돼요 — 필요한 Stage·추천 레슨·만들 프로젝트가 한 페이지에 펼쳐집니다. 도중에 길이 바뀌어도 다시 고르면 돼요."
      />

      <section className="sec">
        <Container>
          <div className="track-cards">
            {journeys.map((j) => (
              <JourneyCard key={j.id} journey={j} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
