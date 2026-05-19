// AI Builder School 2.0 지식 그래프 — 단일 진실 공급원.
// 설계 — docs/specs/2026-05-19-builder-school-2.0-architecture.md
import { lessons } from "./lessons";
import { projects } from "./projects";
import { templates } from "./templates";
import { concepts } from "./concepts";
import { specials } from "./specials";
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
