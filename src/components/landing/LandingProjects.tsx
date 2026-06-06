// 랜딩 — "오늘 지을 것" 프로젝트 갤러리. 빌드-우선 진입로의 핵심 섹션.
import Link from "next/link";
import { ProjectCard } from "@/components/Cards";
import type { Project } from "@/lib/types";

export function LandingProjects({ projects }: { projects: Project[] }) {
  // 난이도 오름차순(입문 먼저)에서 6개를 추려 첫 화면 부담을 줄인다.
  const picks = projects.slice(0, 6);
  return (
    <section className="lp-section lp-section--tint">
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 12 }}>오늘 지을 것</div>
        <h2 className="lp-h2">무엇을 만들고 싶어요?</h2>
        <p className="lp-journeymap__sub" style={{ marginBottom: 28 }}>
          먼저 다 배우지 않아도 돼요. 만들고 싶은 것 하나를 골라 오늘 첫 삽을 뜨고, 막히면 그때 레슨을 부르세요.
        </p>
        <div className="proj-grid">
          {picks.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <Link href="/projects" className="btn ghost">
            프로젝트 전체 보기 <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
