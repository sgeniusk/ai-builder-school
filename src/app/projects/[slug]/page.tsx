// 프로젝트 상세 — 빌드 단계·전제 레슨·완료 기준까지 펼치는 캡스톤 가이드.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import {
  getLessonBySlug,
  getProjectBySlug,
  getProjects,
  getStageBySlug,
} from "@/lib/content";
import { JOURNEY_LABEL_KO, LEVEL_LABEL } from "@/lib/types";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };
  return {
    title: `${project.title} · 프로젝트`,
    description: project.hook,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const lessons = project.keyLessons
    .map((s) => getLessonBySlug(s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));
  const stages = project.requiredStages
    .map((s) => getStageBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <Container>
      <article className="lesson-reader" style={{ paddingTop: 48 }}>
        <p className="kicker">
          Project · {LEVEL_LABEL[project.difficulty]} · {project.estimatedDuration}
        </p>
        <h1>{project.title}</h1>
        <p className="lede">{project.hook}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "20px 0 8px" }}>
          {project.targetJourneys.map((j) => (
            <span key={j} className="chip">
              {JOURNEY_LABEL_KO[j]}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-3)", margin: 0 }}>
          {project.targetLearner}
        </p>

        <h2>왜 이 프로젝트인가</h2>
        <p style={{ whiteSpace: "pre-line" }}>{project.problem}</p>
        <p>{project.summary}</p>

        <h2>최종 산출물</h2>
        <div className="callout">
          <div className="kicker">Final output</div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
            {project.finalOutput}
          </p>
        </div>

        <h2>빌드 단계</h2>
        <div style={{ display: "grid", gap: 14, margin: "20px 0" }}>
          {project.milestones.map((m) => (
            <div
              key={m.title}
              style={{ borderLeft: "3px solid var(--ink)", paddingLeft: 16 }}
            >
              <div style={{ fontWeight: 600, color: "var(--ink)" }}>{m.title}</div>
              <p style={{ margin: "4px 0 0", fontSize: 15, color: "var(--ink-2)" }}>
                {m.description}
              </p>
            </div>
          ))}
        </div>

        <h2>완료 기준</h2>
        <ul className="checklist">
          {project.verification.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>

        <h2>이 프로젝트를 준비시키는 레슨</h2>
        <ul className="lessons-list" style={{ marginTop: 16 }}>
          {lessons.map((lesson, idx) => (
            <li key={lesson.id}>
              <Link href={`/lessons/${lesson.slug}`}>
                <span className="l-num">{String(idx + 1).padStart(2, "0")}</span>
                <div>
                  <div className="l-title">{lesson.titleKo}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>
                    {lesson.summary}
                  </div>
                </div>
                <span className="l-meta">{LEVEL_LABEL[lesson.level].toUpperCase()}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2>전제 Stage</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {stages.map((stage) => (
            <Link key={stage.id} href={`/stages/${stage.slug}`} className="chip">
              Stage {stage.order} · {stage.label}
            </Link>
          ))}
        </div>

        <h2>추천 스택</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {project.suggestedStack.map((tech) => (
            <span
              key={tech}
              className="chip-mono"
              style={{ color: "var(--ink-2)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {project.extensionIdeas.length > 0 && (
          <>
            <h2>확장 아이디어</h2>
            <ul>
              {project.extensionIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </>
        )}

        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <Link href="/projects" className="btn ghost">
            ← 전체 프로젝트
          </Link>
          <Link href="/start" className="btn">
            내 여정 정하기 <span className="arrow">→</span>
          </Link>
        </div>
      </article>
    </Container>
  );
}
