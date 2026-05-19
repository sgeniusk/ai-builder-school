import { phases } from "@/content/phases";
import { lessons } from "@/content/lessons";
import { journeys } from "@/content/journeys";
import { projects } from "@/content/projects";
import { templates } from "@/content/templates";
import { graphNodes, graphEdges, graphLenses, nodeById } from "@/content/ontology";
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
  /** 미지정 시 "error"로 간주된다 — validate 게이트를 실패시킨다 (스펙 §4-4) */
  severity?: "error" | "warning";
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

  // ── 2.0 그래프 무결성 (스펙 §4-4) ──────────────────────
  const nodeIdSet = new Set(graphNodes.map((n) => n.id));
  // partOfJourney 엣지의 합성 타깃 `journey:{slug}` 확인용. j.slug를 쓴다
  // — 렌즈 유도(ontology.ts)도 j.slug 기준이라 일관성을 맞춘다.
  const journeyIdSet = new Set(journeys.map((j) => `journey:${j.slug}`));

  // 엣지 타입별 from/to 허용 종류 (스펙 §3 표)
  const edgeRules: Record<EdgeType, { from: string[]; to: string[] }> = {
    prerequisite: { from: ["concept", "lesson", "special", "project", "template"], to: ["concept", "lesson", "special", "project", "template"] },
    teaches: { from: ["lesson"], to: ["concept"] },
    demonstrates: { from: ["project", "special"], to: ["lesson", "concept"] },
    deepens: { from: ["special", "lesson"], to: ["lesson"] },
    appliesTo: { from: ["template"], to: ["lesson", "special"] },
    relatedTo: { from: ["concept"], to: ["concept"] },
    supersedes: { from: ["special"], to: ["special"] },
    partOfJourney: { from: ["lesson", "special"], to: ["journey"] },
  };

  const kindOf = (id: string): string => id.split(":")[0] ?? "";
  const seenEdges = new Set<string>();

  for (const edge of graphEdges) {
    const ref = `${edge.from} -[${edge.type}]-> ${edge.to}`;

    // 규칙 1 — 끊긴 엣지 (journey: 가짜 노드는 journeyIdSet으로 별도 확인)
    const fromOk = nodeIdSet.has(edge.from) || journeyIdSet.has(edge.from);
    const toOk = nodeIdSet.has(edge.to) || journeyIdSet.has(edge.to);
    if (!fromOk) {
      issues.push({ kind: "graph.danglingEdge", ref, message: `Edge from "${edge.from}" 노드가 존재하지 않습니다` });
    }
    if (!toOk) {
      issues.push({ kind: "graph.danglingEdge", ref, message: `Edge to "${edge.to}" 노드가 존재하지 않습니다` });
    }

    // 규칙 2 — 엣지 타입 제약
    const rule = edgeRules[edge.type];
    if (rule) {
      if (fromOk && !rule.from.includes(kindOf(edge.from))) {
        issues.push({ kind: "graph.edgeTypeConstraint", ref, message: `"${edge.type}" 엣지의 from은 ${rule.from.join("/")} 여야 합니다` });
      }
      if (toOk && !rule.to.includes(kindOf(edge.to))) {
        issues.push({ kind: "graph.edgeTypeConstraint", ref, message: `"${edge.type}" 엣지의 to는 ${rule.to.join("/")} 여야 합니다` });
      }
    }

    // 규칙 5 — 중복 엣지
    const sig = `${edge.from}|${edge.to}|${edge.type}`;
    if (seenEdges.has(sig)) {
      issues.push({ kind: "graph.duplicateEdge", ref, message: `중복 엣지입니다` });
    }
    seenEdges.add(sig);
  }

  // 규칙 3 — prerequisite 순환 검출 (DFS)
  {
    const adj = new Map<string, string[]>();
    for (const e of graphEdges) {
      if (e.type !== "prerequisite") continue;
      const arr = adj.get(e.from) ?? [];
      arr.push(e.to);
      adj.set(e.from, arr);
    }
    const WHITE = 0, GRAY = 1, BLACK = 2;
    const colorMap = new Map<string, number>();
    let cycleFound = false;
    const dfs = (n: string): void => {
      if (cycleFound) return;
      colorMap.set(n, GRAY);
      for (const next of adj.get(n) ?? []) {
        const c = colorMap.get(next) ?? WHITE;
        if (c === GRAY) {
          cycleFound = true;
          issues.push({ kind: "graph.prerequisiteCycle", ref: `${n} -> ${next}`, message: `prerequisite 엣지에 순환이 있습니다` });
          return;
        }
        if (c === WHITE) dfs(next);
      }
      colorMap.set(n, BLACK);
    };
    for (const n of adj.keys()) {
      if ((colorMap.get(n) ?? WHITE) === WHITE) dfs(n);
    }
  }

  // 규칙 4 — 고아 노드 (인바운드·아웃바운드 엣지가 하나도 없는 노드) → 경고
  {
    const connected = new Set<string>();
    for (const e of graphEdges) {
      connected.add(e.from);
      connected.add(e.to);
    }
    for (const n of graphNodes) {
      if (!connected.has(n.id)) {
        issues.push({ kind: "graph.orphanNode", ref: n.id, message: `어떤 엣지에도 연결되지 않은 노드입니다`, severity: "warning" });
      }
    }
  }

  // 규칙 6 — 휘발성 정합
  for (const n of graphNodes) {
    if (n.volatility === "volatile" && !n.reviewBy) {
      issues.push({ kind: "graph.volatileNoReviewBy", ref: n.id, message: `volatile 노드는 reviewBy가 필수입니다` });
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
