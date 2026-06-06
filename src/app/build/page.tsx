// 빌드 네비게이터 — "무엇을 만들고 싶은가"에서 프로젝트로. 빌드-우선 진입의 허브.
import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead, SectionHeading } from "@/components/Sections";
import { ProjectCard } from "@/components/Cards";
import { getProjectBySlug } from "@/lib/content";
import type { Project } from "@/lib/types";

export const metadata: Metadata = {
  title: "무엇을 지을까 · Build",
  description:
    "만들고 싶은 것에서 출발하세요. 목표를 고르면 바로 시작할 프로젝트로 이어집니다.",
};

// 산출물 목표 → 실제 프로젝트. slug는 projects.ts 정본(검증됨).
const BUILD_NAV: { goal: string; desc: string; projectSlugs: string[] }[] = [
  {
    goal: "반복 업무를 자동화하고 싶어요",
    desc: "보고서·회의록 같은 매주 반복을 AI 파이프라인으로",
    projectSlugs: ["weekly-report-autopilot", "meeting-notes-bot"],
  },
  {
    goal: "콘텐츠를 더 빠르게 찍어내고 싶어요",
    desc: "글 하나를 여러 채널 포맷으로, 정기 발행을 시스템으로",
    projectSlugs: ["blog-to-shortform", "newsletter-ai-desk"],
  },
  {
    goal: "이미지·비주얼을 일관되게 만들고 싶어요",
    desc: "톤이 흔들리지 않는 재사용 이미지 키트",
    projectSlugs: ["nano-banana-image-kit", "midjourney-brand-visuals"],
  },
  {
    goal: "내 문서에 답하는 봇을 만들고 싶어요",
    desc: "출처와 함께 답하는 RAG 앱",
    projectSlugs: ["document-qa-bot", "team-onboarding-bot"],
  },
  {
    goal: "작은 AI 제품을 시장에 내놓고 싶어요",
    desc: "랜딩·배포·첫 사용자까지",
    projectSlugs: ["gpt-wrapper-product"],
  },
  {
    goal: "팀 코딩 흐름에 AI를 끼우고 싶어요",
    desc: "이슈→브리프, PR→AI 리뷰",
    projectSlugs: ["team-coding-workflow"],
  },
  {
    goal: "프롬프트·가이드를 자산으로 만들고 싶어요",
    desc: "팀이 바로 쓰는 라이브러리·가이드라인",
    projectSlugs: ["prompt-library-starter-kit", "internal-ai-usage-guideline"],
  },
];

export default function BuildPage() {
  return (
    <>
      <PageHead
        eyebrow={<>Build · 빌드 네비게이터</>}
        title={<>무엇을 만들고 싶어요?</>}
        lede="먼저 다 배우지 않아도 돼요. 목표 하나를 고르면 바로 시작할 프로젝트로 이어집니다. 짓다 막히면 그때 레슨을 부르세요."
      />
      {BUILD_NAV.map((group) => {
        const projects = group.projectSlugs
          .map((s) => getProjectBySlug(s))
          .filter((p): p is Project => Boolean(p));
        if (projects.length === 0) return null;
        return (
          <section className="sec" key={group.goal}>
            <Container>
              <SectionHeading title={group.goal} description={group.desc} />
              <div className="proj-grid" style={{ marginTop: 20 }}>
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
