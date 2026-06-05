// v0.4 — 8-Stage 커리큘럼 인덱스.
import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead, SectionHeading, StageLadder } from "@/components/Sections";
import { getLessons, getStages } from "@/lib/content";

export const metadata: Metadata = {
  title: "커리큘럼 · 8단계 사다리",
  description:
    "지음의 8단계 커리큘럼. AI와 만나는 첫 칸부터 AI 시스템을 공유하는 마지막 칸까지, 한 칸마다 산출물 하나가 손에 남습니다.",
};

export default function StagesPage() {
  const stages = getStages();
  const totalLessons = getLessons().length;

  return (
    <>
      <PageHead
        eyebrow={<>Curriculum · 8 Stages · {totalLessons} Lessons</>}
        title={
          <>
            AI와 만나는 첫 칸부터,
            <br />
            시스템을 공유하는 마지막 칸까지.
          </>
        }
        lede={
          <>
            8단계는 수직 진척의 사다리입니다. 한 칸을 오를 때마다 학습자의 위치가 바뀌고, 손에 산출물 하나가 남습니다. 자기 위치를 늘 알 수 있도록 설계했어요.
          </>
        }
      />

      <section className="sec">
        <Container>
          <SectionHeading
            eyebrow="8-stage ladder"
            title="8단계 사다리"
            description="각 단계의 학습자 위치 변화와 손에 남는 산출물이 카드에 요약되어 있습니다."
          />
          <div style={{ marginTop: 32 }}>
            <StageLadder stages={stages} />
          </div>
        </Container>
      </section>
    </>
  );
}
