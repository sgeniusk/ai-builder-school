// v2.0 — Lesson slug → Stage 매핑.
// 2026-05-22 — 옛 8 Stage에서 6 Stage로 통합 (S2+S3 → 새 S2, S7+S8 → 새 S6,
// 옛 4→3, 5→4, 6→5 shift). lessons.ts 자체는 그대로, getLessons()가 이 매핑을 머지.
// 매핑 원본: docs/specs/2026-05-22-six-stage-restructure-and-lesson-consolidation.md

export interface LessonStageInfo {
  stageId: string;
  stageOrdinal: number;
  stageSubGroupId?: string;
}

export const lessonStageMapping: Record<string, LessonStageInfo> = {
  // ===== Stage 1 · AI와 만나다 (13, sub 1a/1b/1c — v2.0 확장) =====
  // 1a 원리 (5) — 터미널 켜기 전에 AI 자체를 이해 — 자가진단은 template /templates/ai-strength-self-check 으로 분리
  "what-is-an-llm": { stageId: "stage-1", stageOrdinal: 1, stageSubGroupId: "1a" },
  "tokens-context-and-cost": { stageId: "stage-1", stageOrdinal: 2, stageSubGroupId: "1a" },
  "ai-service-landscape": { stageId: "stage-1", stageOrdinal: 3, stageSubGroupId: "1a" },
  "ai-chat-features-basics": { stageId: "stage-1", stageOrdinal: 4, stageSubGroupId: "1a" },
  "common-skills-of-future-proof-people": { stageId: "stage-1", stageOrdinal: 5, stageSubGroupId: "1a" },
  // 1b 도구·환경 (6) — 손에 잡고 매일 쓰는 도구
  "zero-coding-orientation": { stageId: "stage-1", stageOrdinal: 6, stageSubGroupId: "1b" },
  "terminal-first-day": { stageId: "stage-1", stageOrdinal: 7, stageSubGroupId: "1b" },
  "git-basics-and-terminology": { stageId: "stage-1", stageOrdinal: 8, stageSubGroupId: "1b" },
  "github-essentials": { stageId: "stage-1", stageOrdinal: 9, stageSubGroupId: "1b" },
  "ai-tool-account-and-cost": { stageId: "stage-1", stageOrdinal: 10, stageSubGroupId: "1b" },
  "cost-monitoring-in-production": { stageId: "stage-1", stageOrdinal: 11, stageSubGroupId: "1b" },
  // 1c 함께 일하는 판단 (2)
  "ai-delegation-decision": { stageId: "stage-1", stageOrdinal: 12, stageSubGroupId: "1c" },
  "ai-collaboration-mindset": { stageId: "stage-1", stageOrdinal: 13, stageSubGroupId: "1c" },

  // ===== Stage 2 · 묻고 다듬기 (15 = 옛 S2 10 + S3 5) =====
  // 묻는 면 (옛 Stage 2)
  "structure-of-good-prompts": { stageId: "stage-2", stageOrdinal: 1 },
  "reasoning-vs-instruct-prompting": { stageId: "stage-2", stageOrdinal: 2 },
  "enforcing-output-format": { stageId: "stage-2", stageOrdinal: 3 },
  "prompt-debugging-loop": { stageId: "stage-2", stageOrdinal: 4 },
  "feeding-long-documents": { stageId: "stage-2", stageOrdinal: 5 },
  "multimodal-prompting": { stageId: "stage-2", stageOrdinal: 6 },
  "output-evaluation-refine": { stageId: "stage-2", stageOrdinal: 7 },
  "api-rate-limiting-and-batching": { stageId: "stage-2", stageOrdinal: 8 },
  "build-personal-prompt-library": { stageId: "stage-2", stageOrdinal: 9 },
  "ai-concept-learning-framework": { stageId: "stage-2", stageOrdinal: 10 },
  // 다듬는 면 (옛 Stage 3 흡수)
  "what-llms-are-good-and-bad-at": { stageId: "stage-2", stageOrdinal: 11 },
  "hallucination-verification": { stageId: "stage-2", stageOrdinal: 12 },
  "checks-before-trusting-ai-output": { stageId: "stage-2", stageOrdinal: 13 },
  "fallback-strategy-when-ai-fails": { stageId: "stage-2", stageOrdinal: 14 },
  "privacy-and-academic-ethics": { stageId: "stage-2", stageOrdinal: 15 },

  // ===== Stage 3 · AI와 함께 일하다 (17, sub 3a/3b/3c — 옛 S4 shift) =====
  // 3a 업무 자동화 (7)
  "automate-report-drafts": { stageId: "stage-3", stageOrdinal: 1, stageSubGroupId: "3a" },
  "meeting-notes-pipeline": { stageId: "stage-3", stageOrdinal: 2, stageSubGroupId: "3a" },
  "research-workflow": { stageId: "stage-3", stageOrdinal: 3, stageSubGroupId: "3a" },
  "blog-writing-pipeline": { stageId: "stage-3", stageOrdinal: 4, stageSubGroupId: "3a" },
  "custom-gpt-builder": { stageId: "stage-3", stageOrdinal: 5, stageSubGroupId: "3a" },
  "multi-workflow-orchestration": { stageId: "stage-3", stageOrdinal: 6, stageSubGroupId: "3a" },
  "cost-estimation-and-roi-by-task": { stageId: "stage-3", stageOrdinal: 7, stageSubGroupId: "3a" },
  // 3b 콘텐츠·미디어 (6)
  "blog-to-shorts-pipeline": { stageId: "stage-3", stageOrdinal: 8, stageSubGroupId: "3b" },
  "design-visual-prompt-system": { stageId: "stage-3", stageOrdinal: 9, stageSubGroupId: "3b" },
  "youtube-script-research-to-outline": { stageId: "stage-3", stageOrdinal: 10, stageSubGroupId: "3b" },
  "figma-ai-ui-variation-workflow": { stageId: "stage-3", stageOrdinal: 11, stageSubGroupId: "3b" },
  "thumbnail-and-title-ab-test": { stageId: "stage-3", stageOrdinal: 12, stageSubGroupId: "3b" },
  "local-business-content-calendar": { stageId: "stage-3", stageOrdinal: 13, stageSubGroupId: "3b" },
  // 3c 데이터·분석 (4)
  "sql-with-ai-verification": { stageId: "stage-3", stageOrdinal: 14, stageSubGroupId: "3c" },
  "crm-segmentation-with-ai": { stageId: "stage-3", stageOrdinal: 15, stageSubGroupId: "3c" },
  "dashboard-narrative-and-qa": { stageId: "stage-3", stageOrdinal: 16, stageSubGroupId: "3c" },
  "ab-test-decision-memo": { stageId: "stage-3", stageOrdinal: 17, stageSubGroupId: "3c" },

  // ===== Stage 4 · AI에게 일감을 주다 (11 — 옛 S5 shift) =====
  "coding-agent-setup": { stageId: "stage-4", stageOrdinal: 1 },
  "github-issue-to-ai-brief": { stageId: "stage-4", stageOrdinal: 2 },
  "letting-ai-read-codebase": { stageId: "stage-4", stageOrdinal: 3 },
  "plan-with-ai": { stageId: "stage-4", stageOrdinal: 4 },
  "write-tests-with-coding-agent": { stageId: "stage-4", stageOrdinal: 5 },
  "bug-reproduction-loop": { stageId: "stage-4", stageOrdinal: 6 },
  "pr-review-with-ai": { stageId: "stage-4", stageOrdinal: 7 },
  "claude-md-four-principles": { stageId: "stage-4", stageOrdinal: 8 },
  "agent-hooks-automation": { stageId: "stage-4", stageOrdinal: 9 },
  "subagent-context-design": { stageId: "stage-4", stageOrdinal: 10 },
  "harness-engineering-roadmap": { stageId: "stage-4", stageOrdinal: 11 },

  // ===== Stage 5 · AI 시스템을 만들다 (16, sub 5a/5b/5c — 옛 S6 shift) =====
  // 5a API (6)
  "connect-ai-api": { stageId: "stage-5", stageOrdinal: 1, stageSubGroupId: "5a" },
  "streaming-response-ui": { stageId: "stage-5", stageOrdinal: 2, stageSubGroupId: "5a" },
  "structured-output-handling": { stageId: "stage-5", stageOrdinal: 3, stageSubGroupId: "5a" },
  "conversation-storage-design": { stageId: "stage-5", stageOrdinal: 4, stageSubGroupId: "5a" },
  "auth-and-user-sessions": { stageId: "stage-5", stageOrdinal: 5, stageSubGroupId: "5a" },
  "long-term-memory-state": { stageId: "stage-5", stageOrdinal: 6, stageSubGroupId: "5a" },
  // 5b RAG (4)
  "understanding-embeddings": { stageId: "stage-5", stageOrdinal: 7, stageSubGroupId: "5b" },
  "document-chunking-strategy": { stageId: "stage-5", stageOrdinal: 8, stageSubGroupId: "5b" },
  "vector-search-basics": { stageId: "stage-5", stageOrdinal: 9, stageSubGroupId: "5b" },
  "grounded-rag-answers": { stageId: "stage-5", stageOrdinal: 10, stageSubGroupId: "5b" },
  // 5c Agent (6)
  "function-calling": { stageId: "stage-5", stageOrdinal: 11, stageSubGroupId: "5c" },
  "mini-agent-loop": { stageId: "stage-5", stageOrdinal: 12, stageSubGroupId: "5c" },
  "tool-permission-safeguards": { stageId: "stage-5", stageOrdinal: 13, stageSubGroupId: "5c" },
  "prompt-injection-defense": { stageId: "stage-5", stageOrdinal: 14, stageSubGroupId: "5c" },
  "build-mcp-server": { stageId: "stage-5", stageOrdinal: 15, stageSubGroupId: "5c" },
  "ralph-loop-codex-goal": { stageId: "stage-5", stageOrdinal: 16, stageSubGroupId: "5c" },

  // ===== Stage 6 · 운영·공유 (18 = 옛 S7 9 + S8 9) =====
  // 운영 축 (옛 Stage 7)
  "evals-for-ai-coded-prs": { stageId: "stage-6", stageOrdinal: 1 },
  "llm-observability-and-regression": { stageId: "stage-6", stageOrdinal: 2 },
  "agent-failure-patterns": { stageId: "stage-6", stageOrdinal: 3 },
  "mcp-production-patterns": { stageId: "stage-6", stageOrdinal: 4 },
  "ai-output-eval-for-pms": { stageId: "stage-6", stageOrdinal: 5 },
  "user-feedback-collection-for-ai-products": { stageId: "stage-6", stageOrdinal: 6 },
  "responsible-ai-policy-template": { stageId: "stage-6", stageOrdinal: 7 },
  "ai-app-cost-and-usage": { stageId: "stage-6", stageOrdinal: 8 },
  "claude-code-token-saving": { stageId: "stage-6", stageOrdinal: 9 },
  // 공유 축 (옛 Stage 8)
  "ai-product-brief": { stageId: "stage-6", stageOrdinal: 10 },
  "landing-page-for-ai-product": { stageId: "stage-6", stageOrdinal: 11 },
  "pricing-and-monetization": { stageId: "stage-6", stageOrdinal: 12 },
  "capstone-scope-selection": { stageId: "stage-6", stageOrdinal: 13 },
  "capstone-build-loop": { stageId: "stage-6", stageOrdinal: 14 },
  "capstone-plan-and-launch": { stageId: "stage-6", stageOrdinal: 15 },
  "early-user-recruitment-for-ai-products": { stageId: "stage-6", stageOrdinal: 16 },
  "claude-skills-authoring": { stageId: "stage-6", stageOrdinal: 17 },
  "portfolio-and-retrospective": { stageId: "stage-6", stageOrdinal: 18 },
};

/**
 * Stage 분포 표. v2.0 6 Stage 구조 기준.
 * - 새 Stage 1: 13 (옛 7 + 신규 6 — AI 원리 4 + git/github 2 — 자가진단은 template로 분리)
 * - 새 Stage 2: 15 (옛 S2 10 + S3 5)
 * - 새 Stage 3: 17 (옛 S4 그대로 shift)
 * - 새 Stage 4: 11 (옛 S5 그대로 shift)
 * - 새 Stage 5: 16 (옛 S6 그대로 shift)
 * - 새 Stage 6: 18 (옛 S7 9 + S8 9)
 * - 합 = 90
 */
export const EXPECTED_STAGE_DISTRIBUTION = {
  "stage-1": 13,
  "stage-2": 15,
  "stage-3": 17,
  "stage-4": 11,
  "stage-5": 16,
  "stage-6": 18,
} as const;

export const EXPECTED_TOTAL_LESSONS = 90;
