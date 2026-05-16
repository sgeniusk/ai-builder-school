import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead, SectionHeading } from "@/components/Sections";
import { ProjectCard } from "@/components/Cards";
import { getProjects } from "@/lib/content";
import { LEVEL_LABEL } from "@/lib/types";
import type { Level } from "@/lib/types";

export const metadata: Metadata = {
  title: "프로젝트 · 캡스톤 아이디어",
  description:
    "AI Builder School 학습자가 도전할 수 있는 포트폴리오급 캡스톤 프로젝트 모음. 난이도별로 빌드 단계·전제 레슨·완료 기준까지.",
};

const GROUPS: { level: Level; eyebrow: string; description: string }[] = [
  {
    level: "beginner",
    eyebrow: "Beginner",
    description: "코딩 없이, 1주 안에 첫 산출물을 손에 쥡니다.",
  },
  {
    level: "intermediate",
    eyebrow: "Intermediate",
    description: "API와 RAG로 한 단계 위 — 배포 가능한 앱을 만듭니다.",
  },
  {
    level: "advanced",
    eyebrow: "Advanced",
    description: "운영·평가·런칭까지 갖춘 4주 캡스톤.",
  },
];

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHead
        eyebrow={<>Projects · {projects.length}</>}
        title={<>만든 것이<br />포트폴리오가 됩니다.</>}
        lede="각 프로젝트는 특정 Stage 세트를 전제로 하며, 배포 가능한 결과물이 목표입니다. 카드를 누르면 빌드 단계·전제 레슨·완료 기준이 펼쳐집니다. 입문은 위쪽, 심화는 아래쪽 — 자기 수준에서 시작하세요."
      />

      {GROUPS.map((group) => {
        const items = projects.filter((p) => p.difficulty === group.level);
        if (items.length === 0) return null;
        return (
          <section className="sec" key={group.level}>
            <Container>
              <SectionHeading
                eyebrow={group.eyebrow}
                title={`${LEVEL_LABEL[group.level]} · ${items.length}`}
                description={group.description}
              />
              <div className="proj-grid">
                {items.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
