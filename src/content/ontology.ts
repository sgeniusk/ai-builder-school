// AI Builder School 2.0 지식 그래프 — 단일 진실 공급원.
// 설계 — docs/specs/2026-05-19-builder-school-2.0-architecture.md
import { lessons } from "./lessons";
import { projects } from "./projects";
import { templates } from "./templates";
import { concepts } from "./concepts";
import { specials } from "./specials";
import { journeys } from "./journeys";
import { stages } from "./stages";
import type {
  Edge,
  GraphNode,
  Lens,
  NodeKind,
  NodeStatus,
  Volatility,
} from "@/lib/types";

/** "{kind}:{slug}" 형식 노드 id를 만든다 (스펙 §2-5) */
export function nodeId(kind: NodeKind, slug: string): string {
  return `${kind}:${slug}`;
}

/** volatility 기본값 — 마이그레이션 시 미지정 노드에 적용 (스펙 §7-1) */
const DEFAULT_VOLATILITY: Volatility = "evolving";

function toGraphNode(
  kind: NodeKind,
  src: {
    slug: string;
    titleKo?: string;
    title?: string;
    volatility?: Volatility;
    status?: NodeStatus;
    reviewBy?: string;
  },
): GraphNode {
  return {
    id: nodeId(kind, src.slug),
    kind,
    slug: src.slug,
    title: src.titleKo ?? src.title ?? src.slug,
    volatility: src.volatility ?? DEFAULT_VOLATILITY,
    status: src.status ?? "published",
    reviewBy: src.reviewBy,
  };
}

/** 그래프의 모든 노드. 콘텐츠 배열에서 정규화해 만든다 — 메타데이터 중복 저장 안 함. */
export const graphNodes: GraphNode[] = [
  ...concepts.map((c) => toGraphNode("concept", c)),
  ...lessons.map((l) => toGraphNode("lesson", l)),
  ...specials.map((s) => toGraphNode("special", s)),
  ...projects.map((p) => toGraphNode("project", p)),
  ...templates.map((t) => toGraphNode("template", t)),
];

/** id → 노드 빠른 조회 */
export const nodeById = new Map<string, GraphNode>(
  graphNodes.map((n) => [n.id, n]),
);

// ── 엣지 ────────────────────────────────────────────────

const lessonSlugSet = new Set(lessons.map((l) => l.slug));

/** prerequisite 엣지 — Lesson.prerequisites(slug 목록)에서 유도 */
const prerequisiteEdges: Edge[] = lessons.flatMap((l) =>
  l.prerequisites
    .filter((slug) => lessonSlugSet.has(slug))
    .map((slug) => ({
      from: nodeId("lesson", slug),
      to: nodeId("lesson", l.slug),
      type: "prerequisite" as const,
    })),
);

/**
 * partOfJourney 엣지 — Lesson·Project의 targetJourneys에서 유도 (읽기 전용 파생물).
 *
 * 주의 — `journey:{slug}` 타깃은 합성 네임스페이스다. Journey는 노드가 아니라
 * 렌즈이므로 이 타깃은 graphNodes에 없고 nodeById로 resolve되지 않는다.
 * 무결성 검증(content.ts §4-4)은 journeyIdSet으로 이 타깃을 별도 확인한다.
 * 렌즈 자체의 id는 `lens:journey:{slug}` 형식으로 따로 있다(graphLenses 참조).
 */
const partOfJourneyEdges: Edge[] = [
  ...lessons.flatMap((l) =>
    l.targetJourneys.map((jid) => ({
      from: nodeId("lesson", l.slug),
      to: `journey:${jid}`,
      type: "partOfJourney" as const,
    })),
  ),
  ...projects.flatMap((p) =>
    p.targetJourneys.map((jid) => ({
      from: nodeId("project", p.slug),
      to: `journey:${jid}`,
      type: "partOfJourney" as const,
    })),
  ),
];

/** teaches 엣지 — Lesson → Concept. 수동 선언 (스펙 §3) */
const teachesEdges: Edge[] = [
  { from: nodeId("lesson", "common-skills-of-future-proof-people"), to: nodeId("concept", "human-in-the-loop"), type: "teaches" },
  { from: nodeId("lesson", "hallucination-verification"), to: nodeId("concept", "hallucination"), type: "teaches" },
  { from: nodeId("lesson", "checks-before-trusting-ai-output"), to: nodeId("concept", "human-in-the-loop"), type: "teaches" },
  { from: nodeId("lesson", "structure-of-good-prompts"), to: nodeId("concept", "prompt-structure"), type: "teaches" },
  { from: nodeId("lesson", "feeding-long-documents"), to: nodeId("concept", "context-engineering"), type: "teaches" },
  { from: nodeId("lesson", "understanding-embeddings"), to: nodeId("concept", "embedding"), type: "teaches" },
  { from: nodeId("lesson", "grounded-rag-answers"), to: nodeId("concept", "rag"), type: "teaches" },
  { from: nodeId("lesson", "function-calling"), to: nodeId("concept", "tool-use"), type: "teaches" },
  { from: nodeId("lesson", "mini-agent-loop"), to: nodeId("concept", "agent-loop"), type: "teaches" },
  { from: nodeId("lesson", "prompt-injection-defense"), to: nodeId("concept", "prompt-injection"), type: "teaches" },
];

/** relatedTo 엣지 — Concept ↔ Concept. 위키식 횡적 연결 */
const relatedToEdges: Edge[] = [
  { from: nodeId("concept", "hallucination"), to: nodeId("concept", "human-in-the-loop"), type: "relatedTo" },
  { from: nodeId("concept", "rag"), to: nodeId("concept", "embedding"), type: "relatedTo" },
  { from: nodeId("concept", "rag"), to: nodeId("concept", "hallucination"), type: "relatedTo" },
  { from: nodeId("concept", "tool-use"), to: nodeId("concept", "agent-loop"), type: "relatedTo" },
  { from: nodeId("concept", "prompt-structure"), to: nodeId("concept", "context-engineering"), type: "relatedTo" },
];

/**
 * deepens 엣지 — Special·Lesson → Lesson. 휘발성 특강이 어느 항구적 레슨을 심화하는가.
 * 수동 선언 (스펙 3 §5). supersedes는 둘째 특강부터 등장한다.
 */
const deepensEdges: Edge[] = [
  { from: nodeId("special", "frontier-ai-landscape-2026-05"), to: nodeId("lesson", "what-llms-are-good-and-bad-at"), type: "deepens" },
];

/** 그래프의 모든 엣지 */
export const graphEdges: Edge[] = [
  ...prerequisiteEdges,
  ...partOfJourneyEdges,
  ...teachesEdges,
  ...relatedToEdges,
  ...deepensEdges,
];

// ── 렌즈 ────────────────────────────────────────────────

/** Stage 렌즈 — stages.ts의 lessonSlugs에서 유도 (Stage 4·6 sub-group은 평탄화) */
const stageLenses: Lens[] = [...stages]
  .sort((a, b) => a.order - b.order)
  .map((s) => ({
    id: `lens:stage:${s.slug}`,
    kind: "stage" as const,
    title: s.titleKo,
    nodeIds: s.lessonSlugs
      .filter((slug) => lessonSlugSet.has(slug))
      .map((slug) => nodeId("lesson", slug)),
  }));

/** Journey 렌즈 — journeys.ts의 recommendedLessons에서 유도 */
const journeyLenses: Lens[] = journeys.map((j) => ({
  id: `lens:journey:${j.slug}`,
  kind: "journey" as const,
  title: j.titleKo,
  nodeIds: j.recommendedLessons
    .filter((slug) => lessonSlugSet.has(slug))
    .map((slug) => nodeId("lesson", slug)),
}));

/** 그래프의 모든 렌즈 */
export const graphLenses: Lens[] = [...stageLenses, ...journeyLenses];
