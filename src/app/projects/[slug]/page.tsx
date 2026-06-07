// 프로젝트 상세 — 빌드 단계·구제 레슨·완료 기준까지 펼치는 작업장.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";
import { ProjectBuildLog } from "@/components/ProjectBuildLog";
import {
  getLessonBySlug,
  getProjectBySlug,
  getProjects,
  getStageBySlug,
  getTemplateBySlug,
  getTemplatesByProjectStep,
} from "@/lib/content";
import { JOURNEY_LABEL_KO, LEVEL_LABEL } from "@/lib/types";

const TEMPLATE_KIND_LABEL = {
  prompt: "프롬프트",
  mission: "미션",
  checklist: "체크리스트",
} as const;

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
  const projectTemplates = project.templateSlugs
    .map((s) => getTemplateBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

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

        <div className="capstone-note">
          <div className="capstone-note__tag">지금 바로 짓기 시작</div>
          <p>
            먼저 다 배우고 오지 않아도 돼요. 아래 첫 빌드 단계의{" "}
            <strong>먼저 할 것</strong>과 복사해 쓰는 <strong>시작 프롬프트</strong>로
            오늘 첫 삽을 뜨고, 막히는 곳이 나오면 그때 딱 그 레슨을 펴 보세요. 각
            단계엔 막혔을 때 펼치는 <strong>구제 레슨</strong>이 붙어 있어요 — 완벽하지
            않아도 괜찮아요, 일단 한 삽.
          </p>
        </div>

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
        <p className="proj-ms-intro">
          각 단계는 정답 스크립트가 아니라 출발점이에요. &lsquo;먼저 할 것&rsquo;으로
          막막함을 깨고, &lsquo;시작 프롬프트&rsquo;를 복사해 당신의 상황에 맞게
          바꿔 가세요.
        </p>
        <ol className="proj-milestones">
          {project.milestones.map((m, index) => {
            const fallback = m.fallbackLesson
              ? getLessonBySlug(m.fallbackLesson)
              : undefined;
            const stepTemplates = getTemplatesByProjectStep(project.slug, index);
            return (
              <li key={m.title} className="proj-milestone">
                <h3 className="proj-milestone__title">{m.title}</h3>
                <p className="proj-milestone__desc">{m.description}</p>

                <div className="proj-ms-first">
                  <span className="proj-ms-tag">먼저 할 것</span>
                  <p>{m.firstStep}</p>
                </div>

                {m.starterPrompt && (
                  <div className="proj-ms-prompt">
                    <span className="proj-ms-tag">시작 프롬프트</span>
                    <CodeBlock>{m.starterPrompt}</CodeBlock>
                  </div>
                )}

                {fallback && (
                  <p className="proj-ms-fallback">
                    <span aria-hidden>↩</span> 막히면{" "}
                    <Link href={`/lessons/${fallback.slug}?from=${project.slug}`}>
                      {fallback.titleKo}
                    </Link>{" "}
                    레슨으로
                  </p>
                )}

                {stepTemplates.length > 0 && (
                  <div className="proj-ms-tools">
                    <span className="proj-ms-tag">이 단계 양식</span>
                    <div className="proj-ms-tools__list">
                      {stepTemplates.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/templates/${t.slug}`}
                          className="proj-ms-tool"
                        >
                          📋 {t.title} <span className="arrow">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {project.blockers && project.blockers.length > 0 && (
          <>
            <h2>여기서 막혔나요?</h2>
            <p className="proj-ms-intro">
              자주 막히는 지점이에요. 증상에 맞는 레슨·양식을 바로 펴 보세요.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "grid", gap: 10 }}>
              {project.blockers.map((b) => {
                const bl = b.rescueLesson ? getLessonBySlug(b.rescueLesson) : undefined;
                const bt = b.rescueTemplate ? getTemplateBySlug(b.rescueTemplate) : undefined;
                return (
                  <li
                    key={b.symptom}
                    style={{
                      padding: "14px 16px",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-sm)",
                      background: "var(--paper-2)",
                    }}
                  >
                    <div style={{ fontSize: 15, color: "var(--ink)", marginBottom: 8 }}>
                      &ldquo;{b.symptom}&rdquo;
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 14 }}>
                      {bl && (
                        <Link href={`/lessons/${bl.slug}?from=${project.slug}`}>
                          📘 {bl.titleKo}
                        </Link>
                      )}
                      {bt && (
                        <Link href={`/templates#${bt.slug}`}>📋 {bt.title}</Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <h2>완료 기준</h2>
        <ul className="checklist">
          {project.verification.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>

        <h2>완성 기록</h2>
        <p className="proj-ms-intro">
          위 완료 기준을 채웠다면 여기 기록하세요. 결과물 링크를 남기면{" "}
          <Link href="/me">내 빌더 대시보드</Link>의 포트폴리오에 모입니다.
        </p>
        <ProjectBuildLog slug={project.slug} />

        <h2>막힐 때 펴 보는 레슨</h2>
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

        {projectTemplates.length > 0 && (
          <>
            <h2>이 프로젝트에 쓰는 템플릿</h2>
            <p className="proj-templates__intro">
              각 단계를 실행할 때 그대로 복사해 쓰는 재사용 자산이에요.
            </p>
            <ul className="proj-templates">
              {projectTemplates.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/templates#${t.slug}`}
                    className="proj-templates__link"
                  >
                    <span className="proj-templates__kind">
                      {TEMPLATE_KIND_LABEL[t.kind]}
                    </span>
                    <span className="proj-templates__title">{t.title}</span>
                    <span className="arrow mono">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

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
