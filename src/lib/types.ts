/**
 * 6개의 출발 여정 (Journeys).
 * Builder는 학교의 도착점이지 여정이 아닙니다 — 어느 출발점에서든 모두 빌더가 됩니다.
 *
 * 구조 — 입문(Starter) → 특화 4(Practitioner/Creator/Founder/Engineer) → 마스터(AI Native)
 *
 * 2026-05-24 — "Native" 의미 정리. 옛 Native(입문)는 Starter로 명확화하고,
 * "AI 모국어 수준"의 마스터 정체성을 AI Native로 신설. 종착점이 명시되어
 * "어디서 출발하든 빌더가 된다"가 시각·여정 양쪽으로 완결.
 */
export type JourneyId =
  | "starter"
  | "practitioner"
  | "creator"
  | "founder"
  | "engineer"
  | "ai-native";

export type Level = "beginner" | "intermediate" | "advanced";

export const JOURNEY_LABEL: Record<JourneyId, string> = {
  starter: "Starter",
  practitioner: "Practitioner",
  creator: "Creator",
  founder: "Founder",
  engineer: "Engineer",
  "ai-native": "AI Native",
};

export const JOURNEY_LABEL_KO: Record<JourneyId, string> = {
  starter: "스타터",
  practitioner: "실무자",
  creator: "크리에이터",
  founder: "파운더",
  engineer: "엔지니어",
  "ai-native": "AI 네이티브",
};

export const JOURNEY_IDENTITY: Record<JourneyId, string> = {
  starter: "AI 빌더 여정에 처음 들어서는 사람",
  practitioner: "일과 조직에 AI를 붙이는 사람",
  creator: "AI로 콘텐츠를 만드는 사람",
  founder: "AI로 제품·사업을 띄우는 사람",
  engineer: "AI 시스템을 깊게 짓는 사람",
  "ai-native": "AI 빌더 생태계 전체를 모국어처럼 다루는 마스터 빌더",
};

/**
 * 여정별 색 테마. 6 여정의 색이 모이면 brand 무지개 conic 마크가 됩니다.
 * Starter(라임→포레스트, 새싹) 와 AI Native(라일락→딥 바이올렛, 큰 나무)가
 * 시각적으로 호응 — 씨앗이 자라 나무가 된다.
 */
export const JOURNEY_COLORS: Record<
  JourneyId,
  { from: string; to: string; label: string }
> = {
  starter:      { from: "oklch(72% 0.18 140)", to: "oklch(48% 0.16 150)", label: "라임→포레스트" },
  practitioner: { from: "oklch(82% 0.10 230)", to: "oklch(58% 0.18 250)", label: "하늘→파랑" },
  creator:      { from: "oklch(78% 0.16 20)",  to: "oklch(65% 0.22 0)",   label: "코랄→로즈" },
  founder:      { from: "oklch(85% 0.14 85)",  to: "oklch(70% 0.18 55)",  label: "샌드→앰버" },
  engineer:     { from: "oklch(75% 0.12 195)", to: "oklch(45% 0.06 230)", label: "사이안→슬레이트" },
  "ai-native":  { from: "oklch(72% 0.18 290)", to: "oklch(45% 0.20 305)", label: "라일락→딥 바이올렛" },
};

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "심화",
};

/**
 * Journey — 학습자가 출발점에서 도착점까지 걷는 길.
 * 이전 모델의 Persona + Track을 합친 단일 개념.
 */
export interface Journey {
  id: JourneyId;
  /** URL slug — id와 동일 ("practitioner" 등) */
  slug: JourneyId;
  /** 영문 라벨 ("Practitioner") */
  title: string;
  /** 한글 라벨 ("실무자") */
  titleKo: string;
  /** 한 줄 정체성 ("일에 AI를 붙이는 사람") */
  identity: string;
  /** 학습자 묘사 (이 여정이 누구를 위한 길인가) */
  targetLearner: string;
  /** 한 줄 약속 */
  promise: string;
  /**
   * v0.4 Stage 모델 — 추천 Stage slug 목록.
   */
  recommendedStages: string[];
  /** 추천 레슨 slug 목록 */
  recommendedLessons: string[];
  /** 캡스톤 아이디어 (포트폴리오 후보) */
  capstoneIdeas: string[];
  /** 여정 끝났을 때 손에 남는 것 한 줄 */
  expectedOutcome: string;
}

/**
 * Stage 내부의 sub-group (Stage 4·6에서만 사용).
 * 학습자에게 노출되는 명시적 분류 — 예: Stage 4의 4a/4b/4c.
 */
export interface StageSubGroup {
  id: string; // "4a" | "4b" | "4c" | "6a" | "6b" | "6c"
  label: string; // "업무 자동화", "AI에게 지식 주기 — RAG" 등
  shortDescription: string;
  deliverable: string; // "반복 업무 1개 자동화"
  lessonSlugs: string[];
}

/**
 * Stage — 학습자 수직 진척의 한 단계.
 * 8개 stage가 만나다 → 물어보다 → 확인하다 → 함께일하다 → 일감주다 → 시스템만들다 → 운영하다 → 공유하다 의 사다리를 이룬다.
 * Stage 4·6은 내부에 `subGroups`로 sub-group을 가진다 (학습자 노출).
 */
export interface Stage {
  id: string; // "stage-1" .. "stage-8"
  slug: string; // "stage-1-meet" 등 URL 친화 slug
  order: number; // 1..8
  label: string; // "AI와 만나다" — 짧은 라벨
  titleKo: string; // 헤딩용 풀 제목
  titleEn: string;
  positionChange: string; // "AI 도구 켜고 첫 대화" — 학습자 위치 변화 한 줄
  deliverable: string; // "매일 쓰는 AI 도구 1개" — stage 완료 산출물
  shortDescription: string;
  longDescription: string;
  level: Level;
  estimatedHours: number;
  targetJourneys: JourneyId[];
  outcomes: string[];
  topics: string[];
  lessonSlugs: string[]; // stage 전체 lesson — 학습 순서 보장
  subGroups?: StageSubGroup[]; // Stage 4·6에서만 정의
  recommendedTools: string[];
  nextStageSlug?: string | null;
  weekInMvpPath?: number | null;
  introEssaySlug?: string; // 도입부 에세이 (D-content-scaffold에서 채움)
  outroEssaySlug?: string; // 마무리 에세이
  /**
   * 이 Stage의 통합 산출물에 해당하는 template slug.
   * 있으면 Stage 페이지 hero에 "📋 통합 산출물 → 양식 보기" 칩이 노출되고,
   * intro/outro에서 마크다운 링크로 함께 참조한다.
   */
  deliverableTemplateSlug?: string;
}

export interface CoreConcept {
  term: string;
  explanation: string;
}

export interface LessonDeliverable {
  title: string;
  description: string;
  format: string;
}

export interface Lesson extends NodeMeta {
  id: string;
  slug: string;
  /**
   * v0.4 Stage 모델 — 이 lesson이 속한 stage (예: "stage-1"). `lesson-stage-mapping.ts`에서 `getLessons()`가 주입.
   */
  stageId?: string;
  /**
   * Stage 4·6의 sub-group ID (예: "4a", "6b"). Stage 4·6 lesson만 가짐.
   */
  stageSubGroupId?: string;
  /**
   * Stage 내 순서 — 새 ID 체계의 XX 부분 (101의 01). PR E에서 lesson.id 재번호 시 사용.
   */
  stageOrdinal?: number;
  titleKo: string;
  titleEn: string;
  summary: string;
  level: Level;
  estimatedMinutes: number;
  targetJourneys: JourneyId[];
  prerequisites: string[];
  learningGoals: string[];
  problemScenario: string;
  coreConcepts: CoreConcept[];
  codexMission?: string;
  claudeCodeMission?: string;
  /**
   * Unified mission — Claude Code 기준으로 작성된 단일 미션 프롬프트.
   * 파일럿 이후 lessons가 순차적으로 이 필드로 이관된다. 존재하면 이것이 우선 표시됨.
   */
  mission?: string;
  /**
   * 통합 미션 사용 시 Codex에서 달라지는 부분만 주석으로 기록.
   */
  codexNote?: string;
  /**
   * 빌드 단계 들어가기 전 한 단락 강사 멘트. 본문(MDX) → 체크리스트(빌드) 사이의 호흡.
   * 없으면 생략.
   */
  buildIntro?: string;
  buildSteps: string[];
  verificationChecklist: string[];
  deliverable: LessonDeliverable;
  reflectionQuestions: string[];
  extensionIdeas: string[];
  /**
   * 회고·다음 시도 끝에 다는 강사 마무리 한 단락. 강의를 따뜻하게 닫는 자리.
   * 없으면 생략.
   */
  reflectionOutro?: string;
  tags: string[];
  /**
   * true이면 src/content/lessons/[slug].mdx 본문을 가져와 함께 렌더링.
   */
  hasMdxBody?: boolean;
  /**
   * 1-문장 훅. lede 자리에 들어가는 감정/맥락 문장.
   */
  hook?: string;
  /**
   * JIT 헤더 — "이 레슨이 필요한 순간". 프로젝트에서 막혀 들어온 학습자에게
   * 왜 지금 이걸 보는지 한 줄로 알려준다. 없으면 헤더 생략.
   */
  neededWhen?: string;
  /**
   * outputs/ 폴더에 함께 제공되는 파일들. 학습자가 다운로드하거나 복사할 수 있음.
   */
  outputs?: Array<{
    filename: string;
    title: string;
    kind: "prompt" | "checklist" | "skill" | "mission" | "note";
  }>;
}

/** 프로젝트 빌드 단계 한 칸 — /projects/[slug] 상세에서 마일스톤으로 표시. */
export interface ProjectMilestone {
  /** "1단계 — 범위 정의" 같은 짧은 라벨. */
  title: string;
  /** 그 단계에서 무엇을 하는지 1~2문장. */
  description: string;
  /** 막막함을 더는 구체적 첫 행동 한 가지 — 학습자에게 거는 말투. */
  firstStep: string;
  /** 복붙해서 출발할 수 있는 시작 프롬프트나 명령. 없으면 생략. */
  starterPrompt?: string;
  /** 이 단계에서 막히면 다시 볼 lesson slug. 없으면 생략. */
  fallbackLesson?: string;
}

/** 프로젝트에서 자주 막히는 지점 → 구제 레슨·템플릿으로 잇는 1급 데이터 (Top-down §5). */
export interface Blocker {
  /** 학습자가 겪는 증상 한 줄 ("검색이 엉뚱한 청크를 가져와요"). */
  symptom: string;
  /** 막혔을 때 펴 볼 lesson slug. */
  rescueLesson?: string;
  /** 그 자리에서 복사해 쓰는 template slug. */
  rescueTemplate?: string;
  /** 선택적 심화 special slug. */
  rescueSpecial?: string;
  /** 개념 위키로 점프할 concept slug. */
  conceptSlug?: string;
}

export interface Project extends NodeMeta {
  id: string;
  slug: string;
  title: string;
  /** 1-문장 훅 — 학습자에게 말 거는 어조. 카드·상세 상단에 노출. */
  hook: string;
  targetLearner: string;
  /** 이 프로젝트가 잘 맞는 여정. /journeys 페이지에서 매핑된 카드를 노출. */
  targetJourneys: JourneyId[];
  difficulty: Level;
  /** 권장 소요 기간 — "2주", "4주" 등. */
  estimatedDuration: string;
  /**
   * v0.4 Stage 모델 — 이 프로젝트가 전제하는 Stage slug 목록.
   */
  requiredStages: string[];
  /** 이 프로젝트를 준비시키는 핵심 lesson slug 목록. 상세에서 링크로 노출. */
  keyLessons: string[];
  /** 이 프로젝트를 실행할 때 쓰는 템플릿 slug 목록. */
  templateSlugs: string[];
  /** 자주 막히는 지점 → 구제 레슨·템플릿. 있으면 상세에 "여기서 막혔나요?" 노출. */
  blockers?: Blocker[];
  summary: string;
  /** 왜 이걸 만드나 — 어떤 빈자리를 채우는가. 2~3문장. */
  problem: string;
  finalOutput: string;
  suggestedStack: string[];
  /** 빌드 단계 — 3~5개 마일스톤. */
  milestones: ProjectMilestone[];
  /** "완료 기준" 체크리스트. */
  verification: string[];
  /** 확장 아이디어. */
  extensionIdeas: string[];
}

export type TemplateKind = "prompt" | "mission" | "checklist";

export interface ContentTemplate extends NodeMeta {
  id: string;
  slug: string;
  title: string;
  kind: TemplateKind;
  targetJourneys: JourneyId[];
  summary: string;
  /** "이럴 때 꺼내 쓴다" — 템플릿을 도구로 만드는 한 줄 맥락. */
  usedWhen?: string;
  body: string;
  tags: string[];
}

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

/**
 * Special의 출처 분류.
 * - "internal" — 빌더 스쿨이 직접 작성한 thesis·narrative 기반 특강
 * - "external" — 외부 강의·영상·논문·블로그를 큐레이션한 특강 (원전 화자의 thesis를 따름)
 */
export type SpecialKind = "internal" | "external";

/** 외부 원전의 매체 분류. */
export type SpecialSourceMedium =
  | "lecture"
  | "video"
  | "paper"
  | "blog"
  | "podcast"
  | "conference";

/** 외부 특강(kind === "external")의 원전 메타데이터. */
export interface SpecialSource {
  /** 원전 화자·저자 이름 (예 "Jay Choi", "Andrej Karpathy") */
  author: string;
  /** 원전 제목 (한국어든 영어든 원문 그대로) */
  originalTitle: string;
  /** 원전 URL (YouTube·블로그·논문 등) */
  url: string;
  /** 원전 매체 분류 */
  medium: SpecialSourceMedium;
  /** 원전 게시일 (YYYY-MM-DD 또는 YYYY-MM, 선택) */
  publishedAt?: string;
  /** 원전 발신처·채널명 (예 "인디해커 라이프", "Latent Space Podcast", 선택) */
  channel?: string;
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
  /** 출처 분류 — internal(자체 thesis) vs external(외부 큐레이션). 생략 시 internal로 간주. */
  kind?: SpecialKind;
  /** kind === "external"일 때만 채운다. 표지 아래 출처 박스로 자동 렌더링된다. */
  source?: SpecialSource;
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

/** 렌즈 — 그래프를 선형으로 보여주는 뷰 (Stage·Journey) */
export interface Lens {
  id: string;
  kind: "stage" | "journey";
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
