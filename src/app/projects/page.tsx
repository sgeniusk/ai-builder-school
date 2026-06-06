import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead, SectionHeading } from "@/components/Sections";
import { ProjectCard } from "@/components/Cards";
import { getProjects, getProjectReadinessRefs } from "@/lib/content";
import { LEVEL_LABEL } from "@/lib/types";
import type { Level } from "@/lib/types";

export const metadata: Metadata = {
  title: "프로젝트 · 오늘 지을 것",
  description:
    "지음 학습자가 오늘 바로 시작할 수 있는 프로젝트 모음. 먼저 다 배우지 않아도 돼요 — 만들다 막히면 그때 레슨을 부릅니다.",
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
        title={<>만들고 싶은 것에서<br />시작합니다.</>}
        lede="먼저 다 배우고 오지 않아도 돼요. 만들고 싶은 것 하나를 골라 오늘 첫 삽을 뜨고, 막히는 곳마다 그때 필요한 레슨을 부르세요. 입문은 위쪽, 심화는 아래쪽 — 자기 수준에서 시작하세요."
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
                  <ProjectCard
                    key={project.id}
                    project={project}
                    keyLessonRefs={getProjectReadinessRefs(project)}
                  />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
