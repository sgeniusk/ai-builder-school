import { phases } from "@/content/phases";
import { lessons } from "@/content/lessons";
import { journeys } from "@/content/journeys";
import { projects } from "@/content/projects";
import { templates } from "@/content/templates";
import { graphEdges, graphLenses, nodeById } from "@/content/ontology";
import type {
  Journey,
  JourneyId,
  Lesson,
  Phase,
  Project,
  ContentTemplate,
  Edge,
  EdgeType,
  GraphNode,
  Lens,
} from "./types";

export function getPhases(): Phase[] {
  return [...phases].sort((a, b) => a.order - b.order);
}

export function getPhaseBySlug(slug: string): Phase | undefined {
  return phases.find((p) => p.slug === slug);
}

export function getPhaseById(id: string): Phase | undefined {
  return phases.find((p) => p.id === id);
}

export function getLessons(): Lesson[] {
  return lessons;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonsByPhaseId(phaseId: string): Lesson[] {
  return lessons.filter((l) => l.phaseId === phaseId);
}

export function getLessonsByJourney(journeyId: JourneyId): Lesson[] {
  return lessons.filter((l) => l.targetJourneys.includes(journeyId));
}

/**
 * Journey 헬퍼 — 기본은 "출발 5개"를 노출. Explorer는 별도 진입점이라
 * 일반 그리드(홈 / 여정 인덱스)에서는 제외하고 별도 컴포넌트로 다룬다.
 */
export function getJourneys(): Journey[] {
  return journeys;
}

export function getStartingJourneys(): Journey[] {
  return journeys.filter((j) => j.id !== "explorer");
}

export function getExplorerJourney(): Journey | undefined {
  return journeys.find((j) => j.id === "explorer");
}

export function getJourneyBySlug(slug: string): Journey | undefined {
  return journeys.find((j) => j.slug === slug);
}

export function getJourneyById(id: JourneyId): Journey | undefined {
  return journeys.find((j) => j.id === id);
}

export function getProjects(): Project[] {
  return projects;
}

export function getTemplates(): ContentTemplate[] {
  return templates;
}

export function getMvpWeeks(): Array<{ week: number; phase: Phase }> {
  return getPhases()
    .filter((p) => typeof p.weekInMvpPath === "number")
    .map((p) => ({ week: p.weekInMvpPath as number, phase: p }))
    .sort((a, b) => a.week - b.week);
}

export interface ContentIntegrityIssue {
  kind: string;
  ref: string;
  message: string;
}

export function validateContent(): ContentIntegrityIssue[] {
  const issues: ContentIntegrityIssue[] = [];
  const phaseIds = new Set(phases.map((p) => p.id));
  const phaseSlugs = new Set(phases.map((p) => p.slug));
  const lessonSlugs = new Set(lessons.map((l) => l.slug));

  for (const lesson of lessons) {
    if (!phaseIds.has(lesson.phaseId)) {
      issues.push({
        kind: "lesson.phaseId",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" references missing phase "${lesson.phaseId}"`,
      });
    }
  }

  for (const phase of phases) {
    for (const slug of phase.lessonSlugs) {
      if (!lessonSlugs.has(slug)) {
        issues.push({
          kind: "phase.lessonSlug",
          ref: phase.slug,
          message: `Phase "${phase.slug}" references missing lesson "${slug}"`,
        });
      }
    }
    if (phase.nextPhaseSlug && !phaseSlugs.has(phase.nextPhaseSlug)) {
      issues.push({
        kind: "phase.nextPhaseSlug",
        ref: phase.slug,
        message: `Phase "${phase.slug}" references missing next phase "${phase.nextPhaseSlug}"`,
      });
    }
  }

  for (const journey of journeys) {
    for (const slug of journey.recommendedPhases) {
      if (!phaseSlugs.has(slug)) {
        issues.push({
          kind: "journey.phase",
          ref: journey.slug,
          message: `Journey "${journey.slug}" recommends missing phase "${slug}"`,
        });
      }
    }
    for (const slug of journey.recommendedLessons) {
      if (!lessonSlugs.has(slug)) {
        issues.push({
          kind: "journey.lesson",
          ref: journey.slug,
          message: `Journey "${journey.slug}" recommends missing lesson "${slug}"`,
        });
      }
    }
  }

  for (const project of projects) {
    for (const slug of project.requiredPhases) {
      if (!phaseSlugs.has(slug)) {
        issues.push({
          kind: "project.phase",
          ref: project.slug,
          message: `Project "${project.slug}" requires missing phase "${slug}"`,
        });
      }
    }
  }

  return issues;
}

// ── 2.0 그래프 질의 헬퍼 ──────────────────────────────

/** id로 노드 조회 */
export function getNode(id: string): GraphNode | undefined {
  return nodeById.get(id);
}

/** 특정 노드에서 나가는 엣지 (옵션 — 타입 필터) */
export function getOutEdges(nodeIdValue: string, type?: EdgeType): Edge[] {
  return graphEdges.filter(
    (e) => e.from === nodeIdValue && (type ? e.type === type : true),
  );
}

/** 특정 노드로 들어오는 엣지 (옵션 — 타입 필터) */
export function getInEdges(nodeIdValue: string, type?: EdgeType): Edge[] {
  return graphEdges.filter(
    (e) => e.to === nodeIdValue && (type ? e.type === type : true),
  );
}

/**
 * 위키 역참조 — 이 Concept를 가르치는 레슨 노드들.
 * teaches 엣지의 반대 방향.
 */
export function getBacklinks(conceptNodeId: string): GraphNode[] {
  return getInEdges(conceptNodeId, "teaches")
    .map((e) => nodeById.get(e.from))
    .filter((n): n is GraphNode => Boolean(n));
}

/** 렌즈 조회 */
export function getLens(lensId: string): Lens | undefined {
  return graphLenses.find((l) => l.id === lensId);
}

/** 모든 렌즈 */
export function getLenses(): Lens[] {
  return graphLenses;
}
