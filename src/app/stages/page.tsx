// 커리큘럼 인덱스 — Stage·레슨 수는 콘텐츠에서 파생한다.
import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead, SectionHeading, StageLadder } from "@/components/Sections";
import { getLessons, getStages } from "@/lib/content";

const STAGE_COUNT = getStages().length;

export const metadata: Metadata = {
  title: `커리큘럼 · ${STAGE_COUNT}단계 사다리`,
  description: `지음의 ${STAGE_COUNT}단계 커리큘럼. AI와 만나는 첫 칸부터 AI 시스템을 공유하는 마지막 칸까지, 한 칸마다 산출물 하나가 손에 남습니다.`,
};

export default function StagesPage() {
  const stages = getStages();
  const totalLessons = getLessons().length;

  return (
    <>
      <PageHead
        eyebrow={<>Curriculum · {STAGE_COUNT} Stages · {totalLessons} Lessons</>}
        title={
          <>
            AI와 만나는 첫 칸부터,
            <br />
            시스템을 공유하는 마지막 칸까지.
          </>
        }
        lede={
          <>
            {STAGE_COUNT}단계는 순서가 아니라 역량 지도예요. 필요한 칸부터 들어가도 되고, 프로젝트를 짓다 막히면 그 칸의 레슨을 꺼내 씁니다. 한 칸을 오를 때마다 손에 산출물 하나가 남아요.
          </>
        }
      />

      <section className="sec">
        <Container>
          <SectionHeading
            eyebrow={`${STAGE_COUNT}-stage map`}
            title={`${STAGE_COUNT}단계 역량 지도`}
            description="순서가 아니라 지도예요. 필요한 칸부터 들어가도 되고, 각 칸엔 학습자 위치 변화와 손에 남는 산출물이 요약돼 있어요."
          />
          <div style={{ marginTop: 32 }}>
            <StageLadder stages={stages} />
          </div>
        </Container>
      </section>
    </>
  );
}
