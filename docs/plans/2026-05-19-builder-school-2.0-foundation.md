# AI Builder School 2.0 토대(§0) 구현 계획

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** AI Builder School에 지식 그래프 연결층을 추가한다 — 노드·엣지·렌즈 타입, `ontology.ts`, 그래프 무결성 검증, about 페이지 2.0 비전 섹션.

**Architecture:** 기존 콘텐츠 파일(`lessons.ts` 등)은 그대로 두고, 그래프만 새 파일 `src/content/ontology.ts`에 모은다(스펙 접근법 A). 노드 메타데이터(`volatility`·`reviewBy`·`status`)는 각 콘텐츠 타입에 옵셔널 필드로 합쳐 무손상으로 마이그레이션한다. Phase·Journey는 노드가 아니라 `phases.ts`·`journeys.ts`에서 유도되는 렌즈다.

**Tech Stack:** Next.js 15 App Router · React 19 · TypeScript 5 · MDX 3 · `tsx` 스크립트

**상위 스펙:** `docs/specs/2026-05-19-builder-school-2.0-architecture.md` — 이 계획은 그 §0(토대) 범위만 구현한다. 입력 파이프라인·레슨 심화·특강은 별도 스펙/계획.

---

## 검증 모델 (중요 — 읽고 시작할 것)

이 저장소에는 단위 테스트 러너가 없다. Vitest 도입은 `package.json` 의존성 추가 = stop point이며, 로드맵 v0.2의 별도 항목이다. **이 계획은 Vitest를 추가하지 않는다.**

대신 저장소의 기존 품질 게이트를 피드백 루프로 쓴다.

- `npm run typecheck` — `tsc --noEmit`. 타입 정합.
- `npm run validate` — `tsx scripts/validate-content.ts` → `validateContent()`. 콘텐츠·그래프 무결성.
- `npm run build` — Next.js 정적 빌드.
- `npm run check` — 위 셋 + lint 전체 게이트.

"실패하는 테스트 먼저"는 이 저장소에서 다음으로 번역된다 — Task 7(그래프 검증)에서는 검증 규칙을 구현한 뒤 **의도적으로 깨진 엣지를 임시 주입해 `npm run validate`가 잡는지 확인**하고, 되돌린 뒤 통과를 확인한다. 나머지 Task는 게이트 명령으로 검증한다.

## 범위 밖 (이 계획에서 하지 않음)

- 레슨 통합·감축, 레슨 본문 2배 심화 — 별도 스펙 2.
- Special 노드 *실체*와 특강 페이지·인터랙티브 슬라이드 — 별도 스펙 3. 이 계획은 `Special` 타입과 빈 `specials.ts`만 만든다.
- `archived` 노드의 페이지 배너·라우팅 — Special 페이지가 생기는 스펙 3에서 구현. 이 계획은 `status` 필드와 검증만.
- 입력 파이프라인 — 별도 스펙 1.
- 인터랙티브 그래프 뷰 UI.
- Concept 위키 항목 집필 — 이 계획은 영문 slug가 명확한 핵심 개념 ~10개의 **시드**만 만든다(아래 7-1 결정 참조).

## 스펙 대비 정제 결정

- **결정 R1 — Concept 시드.** 스펙 §7-2의 "`coreConcepts` 전량 자동 유도"는 한국어 개념어(예 "근거 요구 습관")의 slug 생성이 불안정해 전량 자동화가 불가하다. 본 계획은 `coreConcepts`에 반복 등장하는 **영문 핵심 개념 10개**를 손으로 골라 `concepts.ts` 시드로 만들고, `teaches` 엣지로 연결한다. 한국어 개념어의 전면 위키화는 Concept 위키 콘텐츠 작업(스펙 §11)으로 미룬다.
- **결정 R2 — `Project`의 여정 연결.** `Project` 인터페이스에는 `targetJourneys`가 없다(`requiredPhases`만 있음). 스펙 §9대로, Project는 `partOfJourney` 엣지를 직접 갖지 않고 `requiredPhases`로 간접 연결한다. 이 계획은 Project→Journey 엣지를 만들지 않는다.

---

## 파일 구조

| 파일 | 책임 | 신규/수정 |
|---|---|---|
| `src/lib/types.ts` | 그래프 타입 — `NodeMeta`·`Concept`·`Special`·`Edge`·`Lens`·`GraphNode` 등 | 수정 |
| `src/content/concepts.ts` | Concept 노드 시드 (~10개) | 신규 |
| `src/content/specials.ts` | Special 노드 배열 (초기 빈 배열) | 신규 |
| `src/content/ontology.ts` | 노드 레지스트리 + 엣지 + 렌즈. 그래프 단일 진실 공급원 | 신규 |
| `src/lib/content.ts` | 그래프 질의 헬퍼 + `validateContent()` 그래프 규칙 확장 | 수정 |
| `src/app/about/page.tsx` | 2.0 비전 섹션 추가 | 수정 |

---

## Chunk 1: 그래프 타입 정의

### Task 1: `types.ts`에 그래프 레이어 타입 추가

**Files:**
- Modify: `src/lib/types.ts` (파일 끝에 추가 + `Lesson`·`Project`·`ContentTemplate` 시그니처 수정)

- [ ] **Step 1: 기존 노드 인터페이스를 `NodeMeta` 확장으로 변경**

`src/lib/types.ts`에서 세 인터페이스 선언 줄을 수정한다. `NodeMeta`는 Step 2에서 정의하므로 이 Step과 Step 2는 한 커밋으로 묶는다.

```ts
// 변경 전 → 변경 후
export interface Lesson {            // → export interface Lesson extends NodeMeta {
export interface Project {           // → export interface Project extends NodeMeta {
export interface ContentTemplate {   // → export interface ContentTemplate extends NodeMeta {
```

본문(필드)은 건드리지 않는다. `extends NodeMeta`만 추가한다.

- [ ] **Step 2: 파일 끝에 그래프 타입 블록 추가**

`src/lib/types.ts` 맨 끝에 추가한다.

```ts
// ── 2.0 지식 그래프 레이어 ──────────────────────────────
// 설계 근거 — docs/specs/2026-05-19-builder-school-2.0-architecture.md

/** 노드의 휘발성 — 항상성 장치 (스펙 §2-1) */
export type Volatility = "evergreen" | "evolving" | "volatile";

/** 노드 게시 상태 (스펙 §2-2) */
export type NodeStatus = "draft" | "published" | "archived";

/**
 * 모든 노드 콘텐츠 타입에 옵셔널로 합쳐지는 공통 메타.
 * 각 콘텐츠 객체가 단일 진실 공급원 — ontology 레지스트리는 중복 저장하지 않는다.
 */
export interface NodeMeta {
  /** 미지정 시 마이그레이션 기본값(evolving)이 적용된다 */
  volatility?: Volatility;
  /** ISO 날짜. volatility === "volatile"이면 필수 */
  reviewBy?: string;
  /** 미지정 시 "published"로 간주 */
  status?: NodeStatus;
}

/** 그래프 노드 종류 */
export type NodeKind = "concept" | "lesson" | "special" | "project" | "template";

/** Concept — 원자적 지식 단위, 위키 항목 (스펙 §2 신규 노드) */
export interface Concept extends NodeMeta {
  id: string;
  slug: string;
  titleKo: string;
  titleEn?: string;
  summary: string;
  tags: string[];
}

/** Special — 특강. 제품·버전 종속 휘발성 노드 (스펙 §2 신규 노드) */
export interface Special extends NodeMeta {
  id: string;
  slug: string;
  titleKo: string;
  titleEn?: string;
  summary: string;
  /** 다루는 제품·서비스 (예 "Codex Cloud") */
  product: string;
  format: "interactive-slides";
  estimatedMinutes: number;
  /** Special은 항상 volatile → 필수 */
  reviewBy: string;
  tags: string[];
}

/** 엣지 종류 (스펙 §3) */
export type EdgeType =
  | "prerequisite"
  | "teaches"
  | "demonstrates"
  | "deepens"
  | "appliesTo"
  | "relatedTo"
  | "supersedes"
  | "partOfJourney";

/** 그래프 엣지. from·to는 "{kind}:{slug}" 형식 노드 id (스펙 §2-5) */
export interface Edge {
  from: string;
  to: string;
  type: EdgeType;
}

/** 렌즈 — 그래프를 선형으로 보여주는 뷰 (Phase·Journey) */
export interface Lens {
  id: string;
  kind: "phase" | "journey";
  title: string;
  /** 순서 있는 "{kind}:{slug}" 노드 id 목록 */
  nodeIds: string[];
}

/**
 * 그래프 노드 레지스트리 항목.
 * 콘텐츠 본문은 원본 배열(lessons 등)에 있고, 여기엔 id·kind·메타만 정규화해 담는다.
 */
export interface GraphNode {
  /** "{kind}:{slug}" */
  id: string;
  kind: NodeKind;
  slug: string;
  title: string;
  volatility: Volatility;
  status: NodeStatus;
  reviewBy?: string;
}
```

- [ ] **Step 3: 타입 검사**

Run: `npm run typecheck`
Expected: PASS — 새 타입은 추가만 했고, `extends NodeMeta`는 옵셔널 필드라 기존 61레슨·6프로젝트·7템플릿 객체가 그대로 컴파일된다.

- [ ] **Step 4: 커밋**

```bash
git add src/lib/types.ts
git commit -m "feat(graph): 2.0 지식 그래프 레이어 타입 추가"
```

---

## Chunk 2: 시드 콘텐츠 + ontology.ts

### Task 2: Concept 시드 파일 생성

**Files:**
- Create: `src/content/concepts.ts`

- [ ] **Step 1: `concepts.ts` 작성**

`coreConcepts`에 반복 등장하는 영문 핵심 개념 10개의 시드. 모두 `status: "draft"` — 위키 본문 집필은 별도 작업(결정 R1).

```ts
// AI Builder School 2.0 — Concept 노드 시드.
// 위키 항목 집필은 별도 콘텐츠 작업. 여기선 그래프 연결용 초안 10개만 둔다.
import type { Concept } from "@/lib/types";

export const concepts: Concept[] = [
  {
    id: "concept-human-in-the-loop",
    slug: "human-in-the-loop",
    titleKo: "휴먼 인 더 루프",
    titleEn: "Human-in-the-loop",
    summary: "AI 산출물의 품질은 사람의 검토 지점에서 결정된다. 어디에 사람을 끼울지 미리 정한다.",
    tags: ["literacy", "verification"],
    volatility: "evergreen",
    status: "draft",
  },
  {
    id: "concept-hallucination",
    slug: "hallucination",
    titleKo: "환각",
    titleEn: "Hallucination",
    summary: "LLM이 그럴듯하지만 근거 없는 답을 만들어내는 현상. 검증 습관으로 통제한다.",
    tags: ["literacy", "verification"],
    volatility: "evergreen",
    status: "draft",
  },
  {
    id: "concept-prompt-structure",
    slug: "prompt-structure",
    titleKo: "프롬프트 구조",
    titleEn: "Prompt Structure",
    summary: "작업·맥락·제약·출력 형식을 분리해 쓰는 명세적 프롬프트 작성법.",
    tags: ["prompt"],
    volatility: "evergreen",
    status: "draft",
  },
  {
    id: "concept-context-engineering",
    slug: "context-engineering",
    titleKo: "컨텍스트 엔지니어링",
    titleEn: "Context Engineering",
    summary: "긴 문서·파일을 모델 맥락에 효과적으로 주입·관리하는 설계.",
    tags: ["prompt"],
    volatility: "evolving",
    status: "draft",
  },
  {
    id: "concept-rag",
    slug: "rag",
    titleKo: "검색 증강 생성(RAG)",
    titleEn: "Retrieval-Augmented Generation",
    summary: "외부 문서를 검색해 근거와 함께 답하게 하는 패턴. '근거 있는 AI'의 실용형.",
    tags: ["rag"],
    volatility: "evolving",
    status: "draft",
  },
  {
    id: "concept-embedding",
    slug: "embedding",
    titleKo: "임베딩",
    titleEn: "Embedding",
    summary: "텍스트를 의미 벡터로 바꾼 표현. 벡터 검색의 기반.",
    tags: ["rag"],
    volatility: "evergreen",
    status: "draft",
  },
  {
    id: "concept-tool-use",
    slug: "tool-use",
    titleKo: "도구 사용(Tool Use)",
    titleEn: "Tool Use",
    summary: "모델이 함수·외부 도구를 호출해 작업을 수행하게 하는 메커니즘.",
    tags: ["agents"],
    volatility: "evolving",
    status: "draft",
  },
  {
    id: "concept-agent-loop",
    slug: "agent-loop",
    titleKo: "에이전트 루프",
    titleEn: "Agent Loop",
    summary: "사고·행동·관찰을 반복하며 목표에 도달하는 에이전트의 실행 구조.",
    tags: ["agents"],
    volatility: "evolving",
    status: "draft",
  },
  {
    id: "concept-prompt-injection",
    slug: "prompt-injection",
    titleKo: "프롬프트 인젝션",
    titleEn: "Prompt Injection",
    summary: "외부 입력으로 모델 지시를 탈취하는 공격. 권한 설계와 입력 분리로 방어한다.",
    tags: ["security"],
    volatility: "evergreen",
    status: "draft",
  },
  {
    id: "concept-evals",
    slug: "evals",
    titleKo: "평가(Evals)",
    titleEn: "Evals",
    summary: "AI 출력 품질을 재현 가능하게 측정하는 테스트 세트.",
    tags: ["evals"],
    volatility: "evergreen",
    status: "draft",
  },
];
```

- [ ] **Step 2: 타입 검사**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: 커밋**

```bash
git add src/content/concepts.ts
git commit -m "feat(graph): Concept 노드 시드 10개 추가"
```

### Task 3: Special 노드 파일 생성 (빈 배열)

**Files:**
- Create: `src/content/specials.ts`

- [ ] **Step 1: `specials.ts` 작성**

특강 *실체*는 스펙 3에서 만든다. 지금은 `ontology.ts`가 일관되게 import할 수 있도록 빈 배열만 둔다.

```ts
// AI Builder School 2.0 — Special(특강) 노드.
// 특강 실체와 인터랙티브 슬라이드는 별도 스펙 3에서 추가된다.
import type { Special } from "@/lib/types";

export const specials: Special[] = [];
```

- [ ] **Step 2: 타입 검사 + 커밋**

Run: `npm run typecheck`
Expected: PASS

```bash
git add src/content/specials.ts
git commit -m "feat(graph): Special 노드 파일 생성 (빈 배열)"
```

### Task 4: `ontology.ts` — 노드 레지스트리

**Files:**
- Create: `src/content/ontology.ts`

- [ ] **Step 1: 노드 id 헬퍼 + 노드 레지스트리 작성**

`ontology.ts`를 만들고 아래를 작성한다. 이 Task는 레지스트리까지만, 엣지·렌즈는 Task 5에서 같은 파일에 이어 쓴다.

```ts
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
```

참고 — `Project`·`ContentTemplate`는 `titleKo`가 없고 `title`을 쓴다. `toGraphNode`의 `src.titleKo ?? src.title`이 두 경우를 모두 받는다.

- [ ] **Step 2: 타입 검사**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: 커밋**

```bash
git add src/content/ontology.ts
git commit -m "feat(graph): ontology 노드 레지스트리 추가"
```

### Task 5: `ontology.ts` — 엣지와 렌즈

**Files:**
- Modify: `src/content/ontology.ts` (Task 4 내용 아래에 이어 작성)

- [ ] **Step 1: 파생 엣지 작성**

`ontology.ts` 끝에 추가한다. `prerequisite`와 `partOfJourney`는 기존 콘텐츠 데이터에서 유도한다(스펙 §9 — 정본은 콘텐츠 객체).

```ts
import { journeys } from "./journeys";
import { phases } from "./phases";

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
 * partOfJourney 엣지 — Lesson.targetJourneys에서 유도 (읽기 전용 파생물).
 *
 * 주의 — `journey:{slug}` 타깃은 합성 네임스페이스다. Journey는 노드가 아니라
 * 렌즈이므로 이 타깃은 graphNodes에 없고 nodeById로 resolve되지 않는다.
 * 무결성 검증(content.ts §4-4)은 journeyIdSet으로 이 타깃을 별도 확인한다.
 * 렌즈 자체의 id는 `lens:journey:{slug}` 형식으로 따로 있다(graphLenses 참조).
 */
const partOfJourneyEdges: Edge[] = lessons.flatMap((l) =>
  l.targetJourneys.map((jid) => ({
    from: nodeId("lesson", l.slug),
    to: `journey:${jid}`,
    type: "partOfJourney" as const,
  })),
);
```

- [ ] **Step 2: 수동 선언 엣지 작성**

`teaches`·`relatedTo`는 유도되지 않으므로 직접 선언한다(스펙 §9). Concept 시드 10개에 대응하는 레슨 연결만 둔다. 아래 엣지의 레슨 slug는 모두 실재해야 한다 — Task 7 검증이 끊긴 엣지를 잡는다.

```ts
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

/** 그래프의 모든 엣지 */
export const graphEdges: Edge[] = [
  ...prerequisiteEdges,
  ...partOfJourneyEdges,
  ...teachesEdges,
  ...relatedToEdges,
];
```

> **구현자 주의 — Step 2 실행 전 slug 확인.** `teachesEdges`의 레슨 slug 10개가 `src/content/lessons.ts`에 실재하는지 먼저 확인하라.
> Run: `grep -oE 'slug: "[^"]+"' src/content/lessons.ts | sort` 로 전체 slug 목록을 보고 대조한다.
> 없는 slug가 있으면 의미가 가까운 실재 slug로 교체한다(예 — `function-calling`이 없으면 Phase 7 레슨 목록에서 가장 가까운 것). 끊긴 엣지를 남기지 말 것.

- [ ] **Step 3: 렌즈 작성**

Phase·Journey를 `phases.ts`·`journeys.ts`에서 유도한 렌즈로 만든다(스펙 §4-3).

```ts
/** Phase 렌즈 — phases.ts의 lessonSlugs에서 유도 */
const phaseLenses: Lens[] = [...phases]
  .sort((a, b) => a.order - b.order)
  .map((p) => ({
    id: `lens:phase:${p.slug}`,
    kind: "phase" as const,
    title: p.titleKo,
    nodeIds: p.lessonSlugs
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
export const graphLenses: Lens[] = [...phaseLenses, ...journeyLenses];
```

- [ ] **Step 4: 검증 + 커밋**

Run: `npm run typecheck && npm run build`
Expected: PASS — `ontology.ts`는 아직 어디서도 import되지 않지만 컴파일은 통과해야 한다.

```bash
git add src/content/ontology.ts
git commit -m "feat(graph): ontology 엣지·렌즈 추가"
```

---

## Chunk 3: 그래프 헬퍼 + 무결성 검증

### Task 6: `content.ts`에 그래프 질의 헬퍼 추가

**Files:**
- Modify: `src/lib/content.ts` (import 블록 + 파일 끝)

- [ ] **Step 1: import 추가**

`src/lib/content.ts` 상단 import 블록에 추가한다.

```ts
import { graphNodes, graphEdges, graphLenses, nodeById } from "@/content/ontology";
import type { Edge, EdgeType, GraphNode, Lens } from "./types";
```

(`Edge`·`EdgeType`·`GraphNode`·`Lens`를 기존 `import type { ... } from "./types"` 줄에 합쳐도 된다.)

- [ ] **Step 2: 파일 끝에 질의 헬퍼 추가**

```ts
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
```

- [ ] **Step 3: 검증 + 커밋**

Run: `npm run typecheck`
Expected: PASS

```bash
git add src/lib/content.ts
git commit -m "feat(graph): content.ts 그래프 질의 헬퍼 추가"
```

### Task 7: `validateContent()`에 그래프 무결성 6규칙 추가

**Files:**
- Modify: `src/lib/content.ts` (`validateContent()` 함수 + import)

- [ ] **Step 1: `validateContent()` 안에 그래프 검증 블록 추가**

`validateContent()` 함수의 `return issues;` **바로 위**에 추가한다. 스펙 §4-4의 6규칙이다.

```ts
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
        issues.push({ kind: "graph.orphanNode", ref: n.id, message: `어떤 엣지에도 연결되지 않은 노드입니다 (경고)` });
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
```

import이 필요하다 — Step 1의 `graphNodes`·`graphEdges`는 Task 6에서 이미 import했다. `EdgeType`도 Task 6에서 import했다. 추가 import 없음.

- [ ] **Step 2: 검증 규칙이 깨끗한 데이터를 통과하는지 확인**

Run: `npm run validate`
Expected: PASS — `✓ Content OK`. Task 5의 엣지·노드가 6규칙을 모두 통과해야 한다. 실패하면(`graph.danglingEdge` 등) Task 5의 slug 오류이므로 해당 엣지의 slug를 실재하는 것으로 고친다.

- [ ] **Step 3: 검증 규칙이 깨진 데이터를 잡는지 확인 (실패 테스트)**

`src/content/ontology.ts`의 `teachesEdges` 배열 맨 끝에 **임시로** 깨진 엣지를 추가한다.

```ts
  { from: nodeId("lesson", "this-lesson-does-not-exist"), to: nodeId("concept", "rag"), type: "teaches" },
```

Run: `npm run validate`
Expected: FAIL (exit 1) — `[graph.danglingEdge]` 이슈가 보고되어야 한다.

확인 후 방금 추가한 임시 줄을 **삭제**한다.

Run: `npm run validate`
Expected: PASS — `✓ Content OK`

- [ ] **Step 4: 전체 게이트 + 커밋**

Run: `npm run check`
Expected: PASS — lint + typecheck + validate + build 모두 통과, 55+ 정적 페이지 빌드.

```bash
git add src/lib/content.ts
git commit -m "feat(graph): 그래프 무결성 검증 6규칙 추가"
```

---

## Chunk 4: about 페이지 2.0 비전 섹션

### Task 8: about 페이지에 2.0 비전 섹션 추가

**Files:**
- Modify: `src/app/about/page.tsx` (FAQ 섹션과 Contribute 섹션 사이에 새 `<section>` 삽입)

- [ ] **Step 1: 비전 데이터 배열 추가**

`src/app/about/page.tsx`에서 `const faqs = [...]` 배열 선언 **아래**에 추가한다.

```tsx
const visionPillars = [
  {
    n: "01",
    title: "살아있는 지식 그래프",
    body: "AI Builder School은 정적 커리큘럼이 아니라 입력으로 자라는 지식 그래프입니다. 레슨·개념·특강이 노드로, 관계가 엣지로 이어집니다.",
  },
  {
    n: "02",
    title: "항구적 코어 + 휘발성 엣지",
    body: "원리(레슨·개념)는 변하지 않고, 제품에 묶인 특강만 갈립니다. 그래서 6개월마다 뒤집히는 AI 시장에서도 학교의 코어는 흔들리지 않습니다.",
  },
  {
    n: "03",
    title: "성장 엔진",
    body: "새 강의 자료가 들어오면 정제·분류 후 노드로 등록되고, 그래프가 나머지 페이지로 전파합니다. 그 사이에는 항상 사람의 검토가 있습니다.",
  },
];
```

- [ ] **Step 2: 비전 섹션 JSX 삽입**

FAQ `<section>`이 닫히는 `</section>` **다음**, Contribute `<section>` **앞**에 삽입한다. 기존 `.sec`·`.eyebrow`·`.section-title`·`.section-lede`·`.principles-list` 클래스를 재사용한다.

```tsx
      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 12 }}>2.0 Vision</div>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 40px)" }}>
            급변하는 시장에서 항상성을 지키는 학교
          </h2>
          <p className="section-lede">
            AI Builder School 2.0은 한 번 만들고 끝나는 커리큘럼이 아닙니다. 입력으로 자라고, 원리는 남기고, 낡은 것만 갈아 끼우는 시스템입니다.
          </p>

          <div
            className="principles-list"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 24 }}
          >
            {visionPillars.map((p) => (
              <article key={p.n}>
                <div className="n">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>

          <p style={{ marginTop: 32, fontSize: 14, color: "var(--ink-3)" }}>
            디자인 지식의 형제 학교{" "}
            <a
              href="https://design-system-school.example"
              className="link-reset"
              style={{ textDecoration: "underline" }}
            >
              Design System School
            </a>
            도 같은 그래프 모델 위에 서 있습니다.
          </p>
        </Container>
      </section>
```

> **구현자 주의 — DSS 링크 URL.** `https://design-system-school.example`는 placeholder다. 배포 URL이 확정되지 않았다면 이 단락(`<p>` 전체)을 생략하거나 URL을 사용자에게 확인받는다. 깨진 외부 링크를 남기지 말 것.

- [ ] **Step 3: 시각 확인**

Run: `npm run dev` 후 브라우저에서 `http://localhost:3000/about` 열기
Expected: FAQ 섹션과 Contribute 섹션 사이에 "2.0 Vision" 섹션이 3열 카드로 보인다. 모바일 폭에서 카드가 세로로 쌓이는지도 확인.

- [ ] **Step 4: 전체 게이트 + 커밋**

Run: `npm run check`
Expected: PASS

```bash
git add src/app/about/page.tsx
git commit -m "feat(about): 2.0 비전 섹션 추가"
```

---

## 완료 기준

- `npm run check` 통과 — lint + typecheck + validate + build.
- `npm run validate` 출력에 `graph.*` 이슈 0건.
- `/about` 페이지에 2.0 비전 섹션이 보인다.
- 그래프 레이어가 존재한다 — `ontology.ts`에 노드 레지스트리·엣지·렌즈, `content.ts`에 질의 헬퍼, `validateContent()`에 그래프 6규칙.
- 기존 61레슨·6프로젝트·7템플릿·13Phase·6Journey 데이터는 한 줄도 손상되지 않았다.

## 다음 단계 (이 계획 밖)

- 스펙 1 — 입력 파이프라인.
- 스펙 2 — 레슨 통합·심화.
- 스펙 3 — 특강(Special) 실체 + 인터랙티브 슬라이드 + `archived` 페이지 배너.
- 그래프 뷰 UI, Concept 위키 항목 집필.
