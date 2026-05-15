// v0.4 — Lesson slug → Stage 매핑.
// 매핑 원본: ~/.claude/plans/v0.4-stage-redesign.md (2026-05-16 확정).
// `lessons.ts` 자체는 손대지 않고, `getLessons()` 헬퍼가 이 매핑을 머지해서 반환한다.

export interface LessonStageInfo {
  stageId: string;
  stageOrdinal: number;
  stageSubGroupId?: string;
}

export const lessonStageMapping: Record<string, LessonStageInfo> = {
  // Stage 1 — AI와 만나다 (4)
  "zero-coding-orientation": { stageId: "stage-1", stageOrdinal: 1 },
  "terminal-first-day": { stageId: "stage-1", stageOrdinal: 2 },
  "ai-tool-account-and-cost": { stageId: "stage-1", stageOrdinal: 3 },
  "common-skills-of-future-proof-people": { stageId: "stage-1", stageOrdinal: 4 },

  // Stage 2 — AI에게 물어보다 (5)
  "structure-of-good-prompts": { stageId: "stage-2", stageOrdinal: 1 },
  "enforcing-output-format": { stageId: "stage-2", stageOrdinal: 2 },
  "feeding-long-documents": { stageId: "stage-2", stageOrdinal: 3 },
  "build-personal-prompt-library": { stageId: "stage-2", stageOrdinal: 4 },
  "ai-concept-learning-framework": { stageId: "stage-2", stageOrdinal: 5 },

  // Stage 3 — AI의 답을 확인하다 (4)
  "what-llms-are-good-and-bad-at": { stageId: "stage-3", stageOrdinal: 1 },
  "hallucination-verification": { stageId: "stage-3", stageOrdinal: 2 },
  "checks-before-trusting-ai-output": { stageId: "stage-3", stageOrdinal: 3 },
  "privacy-and-academic-ethics": { stageId: "stage-3", stageOrdinal: 4 },

  // Stage 4 — AI와 함께 일하다 (14, sub 4a/4b/4c)
  // 4a 업무 자동화 (4)
  "automate-report-drafts": { stageId: "stage-4", stageOrdinal: 1, stageSubGroupId: "4a" },
  "meeting-notes-pipeline": { stageId: "stage-4", stageOrdinal: 2, stageSubGroupId: "4a" },
  "research-workflow": { stageId: "stage-4", stageOrdinal: 3, stageSubGroupId: "4a" },
  "blog-writing-pipeline": { stageId: "stage-4", stageOrdinal: 4, stageSubGroupId: "4a" },
  // 4b 콘텐츠·미디어 (6)
  "blog-to-shorts-pipeline": { stageId: "stage-4", stageOrdinal: 5, stageSubGroupId: "4b" },
  "design-visual-prompt-system": { stageId: "stage-4", stageOrdinal: 6, stageSubGroupId: "4b" },
  "youtube-script-research-to-outline": { stageId: "stage-4", stageOrdinal: 7, stageSubGroupId: "4b" },
  "figma-ai-ui-variation-workflow": { stageId: "stage-4", stageOrdinal: 8, stageSubGroupId: "4b" },
  "thumbnail-and-title-ab-test": { stageId: "stage-4", stageOrdinal: 9, stageSubGroupId: "4b" },
  "local-business-content-calendar": { stageId: "stage-4", stageOrdinal: 10, stageSubGroupId: "4b" },
  // 4c 데이터·분석 (4)
  "sql-with-ai-verification": { stageId: "stage-4", stageOrdinal: 11, stageSubGroupId: "4c" },
  "crm-segmentation-with-ai": { stageId: "stage-4", stageOrdinal: 12, stageSubGroupId: "4c" },
  "dashboard-narrative-and-qa": { stageId: "stage-4", stageOrdinal: 13, stageSubGroupId: "4c" },
  "ab-test-decision-memo": { stageId: "stage-4", stageOrdinal: 14, stageSubGroupId: "4c" },

  // Stage 5 — AI에게 일감을 주다 (8)
  "coding-agent-setup": { stageId: "stage-5", stageOrdinal: 1 },
  "github-issue-to-ai-brief": { stageId: "stage-5", stageOrdinal: 2 },
  "letting-ai-read-codebase": { stageId: "stage-5", stageOrdinal: 3 },
  "plan-with-ai": { stageId: "stage-5", stageOrdinal: 4 },
  "write-tests-with-coding-agent": { stageId: "stage-5", stageOrdinal: 5 },
  "bug-reproduction-loop": { stageId: "stage-5", stageOrdinal: 6 },
  "claude-md-four-principles": { stageId: "stage-5", stageOrdinal: 7 },
  "harness-engineering-roadmap": { stageId: "stage-5", stageOrdinal: 8 },

  // Stage 6 — AI 시스템을 만들다 (13, sub 6a/6b/6c)
  // 6a API (4)
  "connect-ai-api": { stageId: "stage-6", stageOrdinal: 1, stageSubGroupId: "6a" },
  "streaming-response-ui": { stageId: "stage-6", stageOrdinal: 2, stageSubGroupId: "6a" },
  "structured-output-handling": { stageId: "stage-6", stageOrdinal: 3, stageSubGroupId: "6a" },
  "conversation-storage-design": { stageId: "stage-6", stageOrdinal: 4, stageSubGroupId: "6a" },
  // 6b RAG (4)
  "understanding-embeddings": { stageId: "stage-6", stageOrdinal: 5, stageSubGroupId: "6b" },
  "document-chunking-strategy": { stageId: "stage-6", stageOrdinal: 6, stageSubGroupId: "6b" },
  "vector-search-basics": { stageId: "stage-6", stageOrdinal: 7, stageSubGroupId: "6b" },
  "grounded-rag-answers": { stageId: "stage-6", stageOrdinal: 8, stageSubGroupId: "6b" },
  // 6c Agent (5)
  "function-calling": { stageId: "stage-6", stageOrdinal: 9, stageSubGroupId: "6c" },
  "mini-agent-loop": { stageId: "stage-6", stageOrdinal: 10, stageSubGroupId: "6c" },
  "tool-permission-safeguards": { stageId: "stage-6", stageOrdinal: 11, stageSubGroupId: "6c" },
  "prompt-injection-defense": { stageId: "stage-6", stageOrdinal: 12, stageSubGroupId: "6c" },
  "ralph-loop-codex-goal": { stageId: "stage-6", stageOrdinal: 13, stageSubGroupId: "6c" },

  // Stage 7 — AI 시스템을 운영하다 (6)
  "evals-for-ai-coded-prs": { stageId: "stage-7", stageOrdinal: 1 },
  "llm-observability-and-regression": { stageId: "stage-7", stageOrdinal: 2 },
  "ai-output-eval-for-pms": { stageId: "stage-7", stageOrdinal: 3 },
  "responsible-ai-policy-template": { stageId: "stage-7", stageOrdinal: 4 },
  "ai-app-cost-and-usage": { stageId: "stage-7", stageOrdinal: 5 },
  "claude-code-token-saving": { stageId: "stage-7", stageOrdinal: 6 },

  // Stage 8 — AI 시스템을 공유하다 (7)
  "ai-product-brief": { stageId: "stage-8", stageOrdinal: 1 },
  "landing-page-for-ai-product": { stageId: "stage-8", stageOrdinal: 2 },
  "pricing-and-monetization": { stageId: "stage-8", stageOrdinal: 3 },
  "capstone-scope-selection": { stageId: "stage-8", stageOrdinal: 4 },
  "capstone-build-loop": { stageId: "stage-8", stageOrdinal: 5 },
  "capstone-plan-and-launch": { stageId: "stage-8", stageOrdinal: 6 },
  "portfolio-and-retrospective": { stageId: "stage-8", stageOrdinal: 7 },
};

/**
 * stage-redesign.md 분포 표: 4-5-4-14-8-13-6-7 = 61.
 * validate 게이트에서 이 상수와 매핑 항목 수를 비교한다.
 */
export const EXPECTED_STAGE_DISTRIBUTION = {
  "stage-1": 4,
  "stage-2": 5,
  "stage-3": 4,
  "stage-4": 14,
  "stage-5": 8,
  "stage-6": 13,
  "stage-7": 6,
  "stage-8": 7,
} as const;

export const EXPECTED_TOTAL_LESSONS = 61;
