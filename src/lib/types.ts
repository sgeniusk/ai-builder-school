/**
 * 6개의 출발 여정 (Journeys).
 * Builder는 학교의 도착점이지 여정이 아닙니다 — 어느 출발점에서든 모두 빌더가 됩니다.
 *
 * 페르소나·트랙으로 분리되어 있던 이전 모델을 통합한 결과:
 *   Journey = (학습자 정체성) + (그 정체성에 맞춘 학습 경로)
 */
export type JourneyId =
  | "practitioner"
  | "adopter"
  | "creator"
  | "founder"
  | "engineer"
  | "explorer";

export type Level = "beginner" | "intermediate" | "advanced";

export const JOURNEY_LABEL: Record<JourneyId, string> = {
  practitioner: "Practitioner",
  adopter: "Adopter",
  creator: "Creator",
  founder: "Founder",
  engineer: "Engineer",
  explorer: "Explorer",
};

export const JOURNEY_LABEL_KO: Record<JourneyId, string> = {
  practitioner: "실무자",
  adopter: "도입자",
  creator: "크리에이터",
  founder: "파운더",
  engineer: "엔지니어",
  explorer: "탐험가",
};

export const JOURNEY_IDENTITY: Record<JourneyId, string> = {
  practitioner: "일에 AI를 붙이는 사람",
  adopter: "조직에 AI를 들여오는 사람",
  creator: "AI로 콘텐츠를 만드는 사람",
  founder: "AI로 제품·사업을 띄우는 사람",
  engineer: "AI 시스템을 깊게 짓는 사람",
  explorer: "매일 배우고 매일 나누는 학생-교육자",
};

/**
 * 여정별 색 테마. 6 여정의 색이 합쳐지면 brand 무지개 conic 마크가 됩니다.
 */
export const JOURNEY_COLORS: Record<
  JourneyId,
  { from: string; to: string; label: string }
> = {
  practitioner: { from: "oklch(82% 0.10 230)", to: "oklch(58% 0.18 250)", label: "하늘→파랑" },
  adopter:      { from: "oklch(72% 0.16 290)", to: "oklch(52% 0.20 275)", label: "라벤더→인디고" },
  creator:      { from: "oklch(78% 0.16 20)",  to: "oklch(65% 0.22 0)",   label: "코랄→로즈" },
  founder:      { from: "oklch(85% 0.14 85)",  to: "oklch(70% 0.18 55)",  label: "샌드→앰버" },
  engineer:     { from: "oklch(75% 0.12 195)", to: "oklch(45% 0.06 230)", label: "사이안→슬레이트" },
  explorer:     { from: "oklch(82% 0.12 165)", to: "oklch(60% 0.10 150)", label: "민트→세이지" },
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
  /** 필수/추천 Phase slug 목록 */
  recommendedPhases: string[];
  /** 추천 레슨 slug 목록 */
  recommendedLessons: string[];
  /** 캡스톤 아이디어 (포트폴리오 후보) */
  capstoneIdeas: string[];
  /** 여정 끝났을 때 손에 남는 것 한 줄 */
  expectedOutcome: string;
}

export interface Phase {
  id: string;
  slug: string;
  order: number;
  titleKo: string;
  titleEn: string;
  shortDescription: string;
  longDescription: string;
  level: Level;
  estimatedHours: number;
  targetJourneys: JourneyId[];
  outcomes: string[];
  topics: string[];
  deliverables: string[];
  lessonSlugs: string[];
  recommendedTools: string[];
  nextPhaseSlug?: string | null;
  weekInMvpPath?: number | null;
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

export interface Lesson {
  id: string;
  slug: string;
  phaseId: string;
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
  codexMission: string;
  claudeCodeMission: string;
  /**
   * Unified mission — Claude Code 기준으로 작성된 단일 미션 프롬프트.
   * 파일럿 이후 lessons가 순차적으로 이 필드로 이관된다. 존재하면 이것이 우선 표시됨.
   */
  mission?: string;
  /**
   * 통합 미션 사용 시 Codex에서 달라지는 부분만 주석으로 기록.
   */
  codexNote?: string;
  buildSteps: string[];
  verificationChecklist: string[];
  deliverable: LessonDeliverable;
  reflectionQuestions: string[];
  extensionIdeas: string[];
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
   * outputs/ 폴더에 함께 제공되는 파일들. 학습자가 다운로드하거나 복사할 수 있음.
   */
  outputs?: Array<{
    filename: string;
    title: string;
    kind: "prompt" | "checklist" | "skill" | "mission" | "note";
  }>;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  targetLearner: string;
  /** 이 프로젝트가 잘 맞는 여정. /journeys 페이지에서 매핑된 카드를 노출. */
  targetJourneys: JourneyId[];
  difficulty: Level;
  requiredPhases: string[];
  finalOutput: string;
  suggestedStack: string[];
  summary: string;
}

export type TemplateKind = "prompt" | "mission" | "checklist";

export interface ContentTemplate {
  id: string;
  slug: string;
  title: string;
  kind: TemplateKind;
  targetJourneys: JourneyId[];
  summary: string;
  body: string;
  tags: string[];
}
