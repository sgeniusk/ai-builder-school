import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import {
  CurriculumTimeline,
  PageHead,
  SectionHeading,
  WeekPath,
} from "@/components/Sections";
import { getLessons, getMvpWeeks, getPhases } from "@/lib/content";

export const metadata: Metadata = {
  title: "커리큘럼 · 12 Phase 로드맵",
  description:
    "AI Builder School의 12 Phase 커리큘럼 전체. 각 Phase는 하나의 실제 산출물로 끝납니다.",
};

export default function CurriculumPage() {
  const phases = getPhases();
  const weeks = getMvpWeeks();
  const totalLessons = getLessons().length;

  return (
    <>
      <PageHead
        eyebrow={<>Curriculum · 12 Phases · {totalLessons} Lessons</>}
        title={
          <>
            기초부터 Capstone까지,
            <br />
            12개의 Phase.
          </>
        }
        lede={
          <>
            각 Phase는 레슨 3–6개와 하나의 산출물로 구성됩니다. 8주 MVP 경로는 Phase 1–7 + 12로 구성된 최소 루트입니다.
          </>
        }
      />

      <section className="sec">
        <Container>
          <SectionHeading
            eyebrow="8-week path"
            title="8주 MVP 경로"
            description="이미 잘하는 Phase는 건너뛰고, 약한 Phase에 시간을 더 씁니다."
          />
          <WeekPath weeks={weeks} />
        </Container>
      </section>

      <section className="sec">
        <Container>
          <SectionHeading
            eyebrow="All phases"
            title="12 Phase 로드맵"
            description="각 Phase의 목표, 대상 여정, 주요 산출물이 카드에 요약되어 있습니다."
          />
          <CurriculumTimeline phases={phases} />
        </Container>
      </section>
    </>
  );
}
