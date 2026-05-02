import type { Metadata } from "next";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Sections";
import { ProjectCard } from "@/components/Cards";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "프로젝트 · 캡스톤 아이디어",
  description:
    "AI Builder School 학습자가 도전할 수 있는 포트폴리오급 캡스톤 프로젝트 모음.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHead
        eyebrow={<>Projects · {projects.length}</>}
        title={<>만든 것이<br />포트폴리오가 됩니다.</>}
        lede="각 프로젝트는 특정 Phase 세트를 전제로 하며, 배포 가능한 결과물이 목표입니다. 여정 완주 증거로 쓸 수 있습니다."
      />

      <section className="sec">
        <Container>
          <div className="proj-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
