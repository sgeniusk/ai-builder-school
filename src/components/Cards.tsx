import Link from "next/link";
import { JOURNEY_LABEL, LEVEL_LABEL } from "@/lib/types";
import type {
  ContentTemplate,
  Journey,
  Lesson,
  Project,
} from "@/lib/types";
import { getProjectsByTemplate } from "@/lib/content";
import type { ProgressLesson } from "@/hooks/useLessonProgress";
import { CodeBlock } from "./CodeBlock";
import { ProjectReadiness } from "./ProjectReadiness";

/* Lesson card — compact list-style card used on home's preview grid and inside stage detail. */
export function LessonCard({ lesson, index }: { lesson: Lesson; index?: number }) {
  const num = typeof index === "number" ? String(index).padStart(2, "0") : lesson.id.replace(/[^0-9]/g, "").padStart(2, "0");
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="phase-card"
      style={{ minHeight: 160 }}
    >
      <div>
        <div className="ph-top">
          <span className="ph-num">L{num}</span>
          <span className="ph-wk">{LEVEL_LABEL[lesson.level].toUpperCase()}</span>
        </div>
        <h3>{lesson.titleKo}</h3>
        <p>{lesson.summary}</p>
      </div>
      <div className="ph-meta">
        <span>{lesson.estimatedMinutes}분</span>
        <span>·</span>
        <span>{lesson.deliverable.title}</span>
      </div>
    </Link>
  );
}

/* Journey card — 6 출발 여정 카드, 홈/여정 인덱스에서 사용 */
export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link href={`/journeys/${journey.id}`} className={`p-${journey.id}`}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span aria-hidden className="p-mark" />
        <div className="tper">{journey.titleKo}</div>
      </div>
      <h3 style={{ marginTop: 12 }}>
        <span className="p-text">{JOURNEY_LABEL[journey.id]}</span>
        <span> · {journey.titleKo}의 여정</span>
      </h3>
      <p>{journey.identity}</p>
      <p style={{ color: "var(--ink-2)", fontWeight: 500 }}>{journey.promise}</p>
      <div className="tfoot">
        <span>자세히 보기</span>
        <span className="arrow mono">→</span>
      </div>
    </Link>
  );
}

/* Project card — /projects/[slug] 상세로 연결되는 링크 카드 (.proj-card).
   keyLessonRefs 를 주면 준비도 막대를 함께 보여준다. */
export function ProjectCard({
  project,
  keyLessonRefs,
}: {
  project: Project;
  keyLessonRefs?: ProgressLesson[];
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="proj-card">
      <div className="tag-row">
        <span className="chip">{LEVEL_LABEL[project.difficulty]}</span>
        <span className="chip">{project.estimatedDuration}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.hook}</p>
      <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", borderLeft: "3px solid var(--ink)", fontSize: 13, color: "var(--ink-2)" }}>
        <strong style={{ color: "var(--ink)" }}>최종 산출물 · </strong>{project.finalOutput}
      </div>
      {keyLessonRefs && <ProjectReadiness lessons={keyLessonRefs} />}
      <div className="tfoot" style={{ marginTop: 16 }}>
        <span>빌드 가이드 보기</span>
        <span className="arrow mono">→</span>
      </div>
    </Link>
  );
}

/* Template card — styled via .proj-card (inside .proj-grid parent) */
export function TemplateCard({ template }: { template: ContentTemplate }) {
  const kindLabel =
    template.kind === "prompt" ? "프롬프트" : template.kind === "mission" ? "미션" : "체크리스트";
  // 역방향 연결 — 이 템플릿을 쓰는 프로젝트
  const usedBy = getProjectsByTemplate(template.slug);
  return (
    <article className="proj-card" id={template.slug} style={{ scrollMarginTop: 96 }}>
      <div className="tag-row">
        <span className="chip">{kindLabel}</span>
        {template.tags.slice(0, 2).map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
      <h3>{template.title}</h3>
      <p>{template.summary}</p>
      {template.usedWhen && (
        <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "-4px 0 4px" }}>
          <span style={{ color: "var(--ink-3)" }}>이럴 때 — </span>
          {template.usedWhen}
        </p>
      )}
      <CodeBlock style={{ marginTop: 20, maxHeight: 240, overflow: "auto", fontSize: 12 }}>
        {template.body}
      </CodeBlock>
      {usedBy.length > 0 && (
        <div className="tmpl-usedby">
          <span className="tmpl-usedby__tag">쓰는 프로젝트</span>
          {usedBy.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
