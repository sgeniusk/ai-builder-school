import Link from "next/link";
import { Container } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import {
  BuilderPrinciples,
  CTASection,
  Hero,
  JourneyPicker,
  LearningLoopSection,
  SectionHeading,
  StageLadder,
  UspCards,
} from "@/components/Sections";
import { JourneyCard } from "@/components/Cards";
import {
  getStages,
  getStartingJourneys,
  getJourneys,
} from "@/lib/content";

export default function HomePage() {
  const stages = getStages();
  const startingJourneys = getStartingJourneys();
  const teaserJourneys = getJourneys().slice(0, 3);

  return (
    <>
      <Hero />

      <Reveal>
        <UspCards />
      </Reveal>

      <Reveal>
        <LearningLoopSection />
      </Reveal>

      <Reveal>
        <section className="sec">
          <Container>
            <SectionHeading
              eyebrow="8-stage ladder"
              title="8단계 사다리, 한 칸씩 올라요"
              description="AI와 만나고 → 물어보고 → 확인하고 → 함께 일하고 → 일감을 주고 → 시스템을 만들고 → 운영하고 → 공유하기. 한 칸마다 산출물 하나가 손에 남아요."
            />
            <StageLadder stages={stages} />
            <div style={{ marginTop: 28 }}>
              <Link href="/stages" className="btn ghost">
                전체 8단계 커리큘럼 <span className="arrow">→</span>
              </Link>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="sec">
          <Container>
            <SectionHeading
              eyebrow="Start"
              title="당신의 출발점에서 시작해요"
              description="여기엔 한 가지 길이 없어요. 어디서 출발하든, 이 학교의 약속은 똑같아요 — 당신은 결국 빌더가 됩니다."
            />
            <JourneyPicker journeys={startingJourneys} />
            <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/start" className="btn">
                아직 모르겠어요 · 30초 진단 <span className="arrow">→</span>
              </Link>
              <Link href="/journeys" className="btn ghost">
                여섯 여정 자세히 보기
              </Link>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="sec">
          <Container>
            <SectionHeading
              eyebrow="Journeys"
              title="가까이서 본 여정"
              description="각 여정은 '이 길 끝에 손에 남는 것' 한 줄과, 그 길에 필요한 Stage 조합으로 이루어져 있어요."
            />
            <div className="track-cards">
              {teaserJourneys.map((j) => (
                <JourneyCard key={j.id} journey={j} />
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link href="/journeys" className="btn ghost">
                여섯 여정 모두 보기 <span className="arrow">→</span>
              </Link>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <BuilderPrinciples />
      </Reveal>

      <Reveal>
        <CTASection
          title="한 주 뒤, 당신의 첫 산출물이 있어요."
          description="Codex나 Claude Code, 둘 중 하나만 있어도 충분해요. 어느 여정으로 가도 첫 미션은 오늘 저녁 안에 끝나요."
          primary={{ href: "/start", label: "30초 진단 시작" }}
          secondary={{ href: "/about", label: "우리 학교 이야기" }}
        />
      </Reveal>
    </>
  );
}
