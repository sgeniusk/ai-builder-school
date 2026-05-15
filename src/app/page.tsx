import Link from "next/link";
import { Container } from "@/components/Layout";
import {
  BuilderPrinciples,
  CTASection,
  Hero,
  JourneyPicker,
  LearningLoopSection,
  SectionHeading,
  UspCards,
  WeekPath,
} from "@/components/Sections";
import { JourneyCard } from "@/components/Cards";
import {
  getMvpWeeks,
  getStartingJourneys,
  getJourneys,
} from "@/lib/content";

export default function HomePage() {
  const weeks = getMvpWeeks();
  const startingJourneys = getStartingJourneys();
  const teaserJourneys = getJourneys().slice(0, 3);

  return (
    <>
      <Hero />

      <UspCards />

      <LearningLoopSection />

      <section className="sec">
        <Container>
          <SectionHeading
            eyebrow="8-week path"
            title="8주, 한 주에 하나씩 쌓아요"
            description="Phase 1부터 Capstone까지. 매주 한 가지 산출물이 손에 남으면, 8주 뒤엔 '공부했다'가 아니라 '만들었다'로 끝나요."
          />
          <WeekPath weeks={weeks} />
          <div style={{ marginTop: 28 }}>
            <Link href="/curriculum" className="btn ghost">
              전체 12 Phase 커리큘럼 <span className="arrow">→</span>
            </Link>
          </div>
        </Container>
      </section>

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

      <section className="sec">
        <Container>
          <SectionHeading
            eyebrow="Journeys"
            title="가까이서 본 여정"
            description="각 여정은 '이 길 끝에 손에 남는 것' 한 줄과, 그 길에 필요한 Phase 조합으로 이루어져 있어요."
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

      <BuilderPrinciples />

      <CTASection
        title="한 주 뒤, 당신의 첫 산출물이 있어요."
        description="Codex나 Claude Code, 둘 중 하나만 있어도 충분해요. 어느 여정으로 가도 첫 미션은 오늘 저녁 안에 끝나요."
        primary={{ href: "/start", label: "30초 진단 시작" }}
        secondary={{ href: "/about", label: "우리 학교 이야기" }}
      />
    </>
  );
}
