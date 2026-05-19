import { lessons as rawLessons } from "@/content/lessons";
import { journeys } from "@/content/journeys";
import { projects } from "@/content/projects";
import { templates } from "@/content/templates";
import { stages } from "@/content/stages";
import {
  lessonStageMapping,
  EXPECTED_STAGE_DISTRIBUTION,
  EXPECTED_TOTAL_LESSONS,
} from "@/content/lesson-stage-mapping";
import {
  graphNodes,
  graphEdges,
  graphLenses,
  nodeById,
} from "@/content/ontology";
import type {
  Journey,
  JourneyId,
  Lesson,
  Project,
  Stage,
  ContentTemplate,
  Edge,
  EdgeType,
  GraphNode,
  Lens,
} from "./types";

/**
 * `lessons.ts` 원본에 `lesson-stage-mapping.ts`를 머지해 stage 필드가 채워진 lesson 배열을 반환.
 * 매핑이 없는 lesson은 stage 필드가 비어 있어 validate 게이트에서 잡힌다.
 */
const lessons: Lesson[] = rawLessons.map((lesson) => {
  const mapping = lessonStageMapping[lesson.slug];
  if (!mapping) return lesson;
  return {
    ...lesson,
    stageId: mapping.stageId,
    stageOrdinal: mapping.stageOrdinal,
    stageSubGroupId: mapping.stageSubGroupId,
  };
});

export function getLessons(): Lesson[] {
  return lessons;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonsByJourney(journeyId: JourneyId): Lesson[] {
  return lessons.filter((l) => l.targetJourneys.includes(journeyId));
}

// ─── Stage 헬퍼 (v0.4) ──────────────────────────────────────────

export function getStages(): Stage[] {
  return [...stages].sort((a, b) => a.order - b.order);
}

export function getStageBySlug(slug: string): Stage | undefined {
  return stages.find((s) => s.slug === slug);
}

export function getStageById(id: string): Stage | undefined {
  return stages.find((s) => s.id === id);
}

export function getLessonsByStageId(stageId: string): Lesson[] {
  const stage = getStageById(stageId);
  if (!stage) return [];
  // stage.lessonSlugs 순서를 그대로 유지해 학습 순서를 보존.
  return stage.lessonSlugs
    .map((slug) => lessons.find((l) => l.slug === slug))
    .filter((l): l is Lesson => l !== undefined);
}

export function getLessonsByStageSubGroup(
  stageId: string,
  subGroupId: string,
): Lesson[] {
  const stage = getStageById(stageId);
  const sub = stage?.subGroups?.find((g) => g.id === subGroupId);
  if (!sub) return [];
  return sub.lessonSlugs
    .map((slug) => lessons.find((l) => l.slug === slug))
    .filter((l): l is Lesson => l !== undefined);
}

export function getJourneysByStageSlug(slug: string): Journey[] {
  return journeys.filter((j) => j.recommendedStages?.includes(slug) ?? false);
}

/**
 * Journey 헬퍼 — 기본은 "출발 5개"를 노출. Explorer는 별도 진입점이라
 * 일반 그리드(홈 / 여정 인덱스)에서는 제외하고 별도 컴포넌트로 다룬다.
 */
export function getJourneys(): Journey[] {
  return journeys;
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

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByJourney(journeyId: JourneyId): Project[] {
  return projects.filter((p) => p.targetJourneys.includes(journeyId));
}

export function getProjectsByStageSlug(slug: string): Project[] {
  return projects.filter((p) => p.requiredStages.includes(slug));
}

export function getProjectsByTemplate(slug: string): Project[] {
  return projects.filter((p) => p.templateSlugs.includes(slug));
}

/**
 * 프로젝트 준비도 계산용 — keyLessons 를 진척 체크에 필요한 슬림 형태로.
 * 준비도 = 완료한 keyLessons / 전체 keyLessons (완료 여부는 클라이언트가 판정).
 */
export function getProjectReadinessRefs(project: Project): {
  id: string;
  buildSteps: string[];
  verificationChecklist: string[];
  reflectionQuestions: string[];
}[] {
  return project.keyLessons
    .map((slug) => getLessonBySlug(slug))
    .filter((l): l is Lesson => Boolean(l))
    .map((l) => ({
      id: l.id,
      buildSteps: l.buildSteps,
      verificationChecklist: l.verificationChecklist,
      reflectionQuestions: l.reflectionQuestions,
    }));
}

export function getTemplates(): ContentTemplate[] {
  return templates;
}

export function getTemplateBySlug(slug: string): ContentTemplate | undefined {
  return templates.find((t) => t.slug === slug);
}

export interface ContentIntegrityIssue {
  kind: string;
  ref: string;
  message: string;
  /** 미지정 시 "error"로 간주 — validate 게이트를 실패시킨다. "warning"은 보고만 하고 게이트를 통과시킨다. */
  severity?: "error" | "warning";
}

export function validateContent(): ContentIntegrityIssue[] {
  const issues: ContentIntegrityIssue[] = [];
  const lessonSlugs = new Set(lessons.map((l) => l.slug));

  for (const journey of journeys) {
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

  // ─── v0.4 Stage 모델 검증 ──────────────────────────────────────
  const stageIds = new Set(stages.map((s) => s.id));
  const stageSlugs = new Set(stages.map((s) => s.slug));

  // 1) 모든 lesson에 stageId가 부여됐는지 (매핑 커버리지)
  for (const lesson of lessons) {
    if (!lesson.stageId) {
      issues.push({
        kind: "lesson.stageId.missing",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" has no stage mapping in lesson-stage-mapping.ts`,
      });
      continue;
    }
    if (!stageIds.has(lesson.stageId)) {
      issues.push({
        kind: "lesson.stageId.invalid",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" references unknown stage "${lesson.stageId}"`,
      });
    }
  }

  // 2) Stage.lessonSlugs ↔ lesson.slug 양방향 일치
  const lessonSlugList = new Set(lessons.map((l) => l.slug));
  for (const stage of stages) {
    for (const slug of stage.lessonSlugs) {
      if (!lessonSlugList.has(slug)) {
        issues.push({
          kind: "stage.lessonSlug.missing",
          ref: stage.slug,
          message: `Stage "${stage.slug}" references missing lesson "${slug}"`,
        });
      }
    }
    if (stage.nextStageSlug && !stageSlugs.has(stage.nextStageSlug)) {
      issues.push({
        kind: "stage.nextStageSlug",
        ref: stage.slug,
        message: `Stage "${stage.slug}" references missing next stage "${stage.nextStageSlug}"`,
      });
    }

    // 3) Stage 4·6 subGroups[].lessonSlugs 합 = stage.lessonSlugs (set equality)
    if (stage.subGroups) {
      const subUnion = new Set<string>();
      for (const sub of stage.subGroups) {
        for (const slug of sub.lessonSlugs) {
          if (subUnion.has(slug)) {
            issues.push({
              kind: "stage.subGroup.duplicate",
              ref: `${stage.slug}/${sub.id}`,
              message: `Lesson "${slug}" appears in multiple sub-groups of stage "${stage.slug}"`,
            });
          }
          subUnion.add(slug);
        }
      }
      const stageSet = new Set(stage.lessonSlugs);
      for (const slug of subUnion) {
        if (!stageSet.has(slug)) {
          issues.push({
            kind: "stage.subGroup.outsideStage",
            ref: stage.slug,
            message: `Lesson "${slug}" in sub-group but not in stage.lessonSlugs`,
          });
        }
      }
      for (const slug of stageSet) {
        if (!subUnion.has(slug)) {
          issues.push({
            kind: "stage.subGroup.uncovered",
            ref: stage.slug,
            message: `Lesson "${slug}" in stage but not assigned to any sub-group`,
          });
        }
      }
    }
  }

  // 4) lesson.stageId ↔ stage.lessonSlugs 양방향
  for (const lesson of lessons) {
    if (!lesson.stageId) continue;
    const stage = stages.find((s) => s.id === lesson.stageId);
    if (stage && !stage.lessonSlugs.includes(lesson.slug)) {
      issues.push({
        kind: "lesson.stageId.notInStageList",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" claims stageId "${lesson.stageId}" but stage does not list it`,
      });
    }
  }

  // 5) lesson.stageSubGroupId가 실제 stage.subGroups에 있는지
  for (const lesson of lessons) {
    if (!lesson.stageSubGroupId) continue;
    const stage = stages.find((s) => s.id === lesson.stageId);
    const sub = stage?.subGroups?.find((g) => g.id === lesson.stageSubGroupId);
    if (!sub) {
      issues.push({
        kind: "lesson.stageSubGroupId.invalid",
        ref: lesson.slug,
        message: `Lesson "${lesson.slug}" references unknown sub-group "${lesson.stageSubGroupId}" in stage "${lesson.stageId}"`,
      });
    }
  }

  // 6) 분포 표 일치 (7-10-5-17-11-16-9-9 = 84)
  for (const [stageId, expected] of Object.entries(EXPECTED_STAGE_DISTRIBUTION)) {
    const actual = lessons.filter((l) => l.stageId === stageId).length;
    if (actual !== expected) {
      issues.push({
        kind: "stage.distribution",
        ref: stageId,
        message: `Stage "${stageId}" expected ${expected} lessons, found ${actual}`,
      });
    }
  }
  if (lessons.length !== EXPECTED_TOTAL_LESSONS) {
    issues.push({
      kind: "stage.distribution.total",
      ref: "lessons",
      message: `Expected ${EXPECTED_TOTAL_LESSONS} total lessons, found ${lessons.length}`,
    });
  }

  // 7) journey.recommendedStages가 실제 stage를 가리키는지
  for (const journey of journeys) {
    for (const slug of journey.recommendedStages) {
      if (!stageSlugs.has(slug)) {
        issues.push({
          kind: "journey.stage",
          ref: journey.slug,
          message: `Journey "${journey.slug}" recommends missing stage "${slug}"`,
        });
      }
    }
  }

  // 8) project.requiredStages가 실제 stage를 가리키는지
  for (const project of projects) {
    for (const slug of project.requiredStages) {
      if (!stageSlugs.has(slug)) {
        issues.push({
          kind: "project.stage",
          ref: project.slug,
          message: `Project "${project.slug}" requires missing stage "${slug}"`,
        });
      }
    }
  }

  // 9) project.keyLessons가 실제 lesson을 가리키는지
  for (const project of projects) {
    for (const slug of project.keyLessons) {
      if (!lessonSlugs.has(slug)) {
        issues.push({
          kind: "project.keyLesson",
          ref: project.slug,
          message: `Project "${project.slug}" references missing lesson "${slug}"`,
        });
      }
    }
  }

  // 10) project.milestones[].fallbackLesson가 실제 lesson을 가리키는지
  for (const project of projects) {
    for (const m of project.milestones) {
      if (m.fallbackLesson && !lessonSlugs.has(m.fallbackLesson)) {
        issues.push({
          kind: "project.milestone.fallbackLesson",
          ref: project.slug,
          message: `Project "${project.slug}" milestone "${m.title}" references missing lesson "${m.fallbackLesson}"`,
        });
      }
    }
  }

  // 11) project.templateSlugs가 실제 template을 가리키는지
  const templateSlugSet = new Set(templates.map((t) => t.slug));
  for (const project of projects) {
    for (const slug of project.templateSlugs) {
      if (!templateSlugSet.has(slug)) {
        issues.push({
          kind: "project.templateSlug",
          ref: project.slug,
          message: `Project "${project.slug}" references missing template "${slug}"`,
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
    partOfJourney: { from: ["lesson", "special", "project"], to: ["journey"] },
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
