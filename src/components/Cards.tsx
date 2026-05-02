import Link from "next/link";
import { JOURNEY_LABEL, LEVEL_LABEL } from "@/lib/types";
import type {
  ContentTemplate,
  Journey,
  Lesson,
  Phase,
  Project,
} from "@/lib/types";

/* Phase card — used only where the older generic card was needed. For curriculum grid use the CurriculumTimeline in Sections.tsx which uses .phase-card directly. */
export function PhaseCard({ phase }: { phase: Phase }) {
  return (
    <Link href={`/curriculum/${phase.slug}`} className="phase-card">
      <div>
        <div className="ph-top">
          <span className="ph-num">PHASE {String(phase.order).padStart(2, "0")}</span>
          {phase.weekInMvpPath && (
            <span className="ph-wk">WEEK {String(phase.weekInMvpPath).padStart(2, "0")}</span>
          )}
        </div>
        <h3>{phase.titleKo}</h3>
        <p>{phase.shortDescription}</p>
      </div>
      <div className="ph-meta">
        <span>{phase.estimatedHours}h</span>
        <span>·</span>
        <span>{LEVEL_LABEL[phase.level]}</span>
        <span>·</span>
        <span>{phase.lessonSlugs.length} 레슨</span>
      </div>
    </Link>
  );
}

/* Lesson card — compact list-style card used on home's preview grid and inside phase detail. */
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
    <Link href={`/journeys#${journey.slug}`} className={`p-${journey.id}`}>
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

/* Project card — styled via .proj-card (inside .proj-grid parent) */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="proj-card">
      <div className="tag-row">
        <span className="chip">{LEVEL_LABEL[project.difficulty]}</span>
        <span className="chip">{project.targetLearner}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--paper-2)", borderRadius: "var(--r-sm)", borderLeft: "3px solid var(--ink)", fontSize: 13, color: "var(--ink-2)" }}>
        <strong style={{ color: "var(--ink)" }}>최종 산출물 · </strong>{project.finalOutput}
      </div>
      <div className="stack">
        {project.suggestedStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  );
}

/* Template card — styled via .proj-card (inside .proj-grid parent) */
export function TemplateCard({ template }: { template: ContentTemplate }) {
  const kindLabel =
    template.kind === "prompt" ? "프롬프트" : template.kind === "mission" ? "미션" : "체크리스트";
  return (
    <article className="proj-card">
      <div className="tag-row">
        <span className="chip">{kindLabel}</span>
        {template.tags.slice(0, 2).map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
      <h3>{template.title}</h3>
      <p>{template.summary}</p>
      <pre style={{ marginTop: 20, maxHeight: 240, overflow: "auto", fontSize: 12 }}>
        <code>{template.body}</code>
      </pre>
    </article>
  );
}
