import type { ComponentType } from "react";

// Phase 1 — AI Literacy
import CommonSkillsBody from "./lessons/common-skills-of-future-proof-people.mdx";
import WhatLlmsBody from "./lessons/what-llms-are-good-and-bad-at.mdx";
import HallucinationVerificationBody from "./lessons/hallucination-verification.mdx";
import ChecksBeforeTrustingBody from "./lessons/checks-before-trusting-ai-output.mdx";
import CostMonitoringInProductionBody from "./lessons/cost-monitoring-in-production.mdx";
import AiDelegationDecisionBody from "./lessons/ai-delegation-decision.mdx";
import AiCollaborationMindsetBody from "./lessons/ai-collaboration-mindset.mdx";
import ReasoningVsInstructPromptingBody from "./lessons/reasoning-vs-instruct-prompting.mdx";
import PromptDebuggingLoopBody from "./lessons/prompt-debugging-loop.mdx";
import MultimodalPromptingBody from "./lessons/multimodal-prompting.mdx";
import OutputEvaluationRefineBody from "./lessons/output-evaluation-refine.mdx";
import ApiRateLimitingAndBatchingBody from "./lessons/api-rate-limiting-and-batching.mdx";

// Phase 2 — Prompt & Context Engineering
import StructureOfGoodPromptsBody from "./lessons/structure-of-good-prompts.mdx";
import EnforcingOutputFormatBody from "./lessons/enforcing-output-format.mdx";
import FeedingLongDocumentsBody from "./lessons/feeding-long-documents.mdx";
import BuildPersonalPromptLibraryBody from "./lessons/build-personal-prompt-library.mdx";

// Phase 3 — 일상 자동화
import AutomateReportDraftsBody from "./lessons/automate-report-drafts.mdx";
import MeetingNotesPipelineBody from "./lessons/meeting-notes-pipeline.mdx";
import ResearchWorkflowBody from "./lessons/research-workflow.mdx";
import BlogWritingPipelineBody from "./lessons/blog-writing-pipeline.mdx";

// Phase 4 — Coding Agents
import CodingAgentSetupBody from "./lessons/coding-agent-setup.mdx";
import GithubIssueToAiBriefBody from "./lessons/github-issue-to-ai-brief.mdx";
import LettingAiReadCodebaseBody from "./lessons/letting-ai-read-codebase.mdx";
import PlanWithAiBody from "./lessons/plan-with-ai.mdx";
import WriteTestsWithCodingAgentBody from "./lessons/write-tests-with-coding-agent.mdx";
import BugReproductionLoopBody from "./lessons/bug-reproduction-loop.mdx";

// Phase 5 — AI App 개발
import ConnectAiApiBody from "./lessons/connect-ai-api.mdx";
import StreamingResponseUiBody from "./lessons/streaming-response-ui.mdx";
import StructuredOutputHandlingBody from "./lessons/structured-output-handling.mdx";
import ConversationStorageDesignBody from "./lessons/conversation-storage-design.mdx";

// Phase 6 — RAG
import UnderstandingEmbeddingsBody from "./lessons/understanding-embeddings.mdx";
import DocumentChunkingStrategyBody from "./lessons/document-chunking-strategy.mdx";
import VectorSearchBasicsBody from "./lessons/vector-search-basics.mdx";
import GroundedRagAnswersBody from "./lessons/grounded-rag-answers.mdx";

// Phase 7 — Agents & MCP
import FunctionCallingBody from "./lessons/function-calling.mdx";
import MiniAgentLoopBody from "./lessons/mini-agent-loop.mdx";
import ToolPermissionSafeguardsBody from "./lessons/tool-permission-safeguards.mdx";
import PromptInjectionDefenseBody from "./lessons/prompt-injection-defense.mdx";

// Phase 8 — Multimodal & Content
import BlogToShortsPipelineBody from "./lessons/blog-to-shorts-pipeline.mdx";
import DesignVisualPromptSystemBody from "./lessons/design-visual-prompt-system.mdx";
import YoutubeScriptResearchToOutlineBody from "./lessons/youtube-script-research-to-outline.mdx";
import FigmaAiUiVariationWorkflowBody from "./lessons/figma-ai-ui-variation-workflow.mdx";
import ThumbnailAndTitleAbTestBody from "./lessons/thumbnail-and-title-ab-test.mdx";
import LocalBusinessContentCalendarBody from "./lessons/local-business-content-calendar.mdx";

// Phase 0 — AI 학습 환경 세팅
import ZeroCodingOrientationBody from "./lessons/zero-coding-orientation.mdx";
import TerminalFirstDayBody from "./lessons/terminal-first-day.mdx";
import AiToolAccountAndCostBody from "./lessons/ai-tool-account-and-cost.mdx";
import PrivacyAndAcademicEthicsBody from "./lessons/privacy-and-academic-ethics.mdx";

// Phase 10 — Evals, Security & Responsible AI
import EvalsForAiCodedPrsBody from "./lessons/evals-for-ai-coded-prs.mdx";
import LlmObservabilityAndRegressionBody from "./lessons/llm-observability-and-regression.mdx";
import AiOutputEvalForPmsBody from "./lessons/ai-output-eval-for-pms.mdx";
import ResponsibleAiPolicyTemplateBody from "./lessons/responsible-ai-policy-template.mdx";

// Phase 9 — Data Analysis & Decision AI
import SqlWithAiVerificationBody from "./lessons/sql-with-ai-verification.mdx";
import CrmSegmentationWithAiBody from "./lessons/crm-segmentation-with-ai.mdx";
import DashboardNarrativeAndQaBody from "./lessons/dashboard-narrative-and-qa.mdx";
import AbTestDecisionMemoBody from "./lessons/ab-test-decision-memo.mdx";

// Phase 11 — Product
import AiAppCostAndUsageBody from "./lessons/ai-app-cost-and-usage.mdx";
import AiProductBriefBody from "./lessons/ai-product-brief.mdx";
import LandingPageForAiProductBody from "./lessons/landing-page-for-ai-product.mdx";
import PricingAndMonetizationBody from "./lessons/pricing-and-monetization.mdx";

// Phase 12 — Capstone
import CapstonePlanAndLaunchBody from "./lessons/capstone-plan-and-launch.mdx";
import CapstoneScopeSelectionBody from "./lessons/capstone-scope-selection.mdx";
import CapstoneBuildLoopBody from "./lessons/capstone-build-loop.mdx";
import PortfolioAndRetrospectiveBody from "./lessons/portfolio-and-retrospective.mdx";
import AiConceptLearningFrameworkBody from "./lessons/ai-concept-learning-framework.mdx";
import ClaudeMdFourPrinciplesBody from "./lessons/claude-md-four-principles.mdx";
import HarnessEngineeringRoadmapBody from "./lessons/harness-engineering-roadmap.mdx";
import RalphLoopCodexGoalBody from "./lessons/ralph-loop-codex-goal.mdx";
import ClaudeCodeTokenSavingBody from "./lessons/claude-code-token-saving.mdx";

/**
 * slug → MDX body component.
 * 새 레슨도 같은 패턴으로 `src/content/lessons/<slug>.mdx` 생성 + 여기 등록.
 */
export const lessonBodies: Record<string, ComponentType | undefined> = {
  // Phase 1
  "common-skills-of-future-proof-people": CommonSkillsBody,
  "what-llms-are-good-and-bad-at": WhatLlmsBody,
  "hallucination-verification": HallucinationVerificationBody,
  "checks-before-trusting-ai-output": ChecksBeforeTrustingBody,
  // Phase 2
  "structure-of-good-prompts": StructureOfGoodPromptsBody,
  "enforcing-output-format": EnforcingOutputFormatBody,
  "feeding-long-documents": FeedingLongDocumentsBody,
  "build-personal-prompt-library": BuildPersonalPromptLibraryBody,
  // Phase 3
  "automate-report-drafts": AutomateReportDraftsBody,
  "meeting-notes-pipeline": MeetingNotesPipelineBody,
  "research-workflow": ResearchWorkflowBody,
  "blog-writing-pipeline": BlogWritingPipelineBody,
  // Phase 4
  "coding-agent-setup": CodingAgentSetupBody,
  "github-issue-to-ai-brief": GithubIssueToAiBriefBody,
  "letting-ai-read-codebase": LettingAiReadCodebaseBody,
  "plan-with-ai": PlanWithAiBody,
  "write-tests-with-coding-agent": WriteTestsWithCodingAgentBody,
  "bug-reproduction-loop": BugReproductionLoopBody,
  // Phase 5
  "connect-ai-api": ConnectAiApiBody,
  "streaming-response-ui": StreamingResponseUiBody,
  "structured-output-handling": StructuredOutputHandlingBody,
  "conversation-storage-design": ConversationStorageDesignBody,
  // Phase 6
  "understanding-embeddings": UnderstandingEmbeddingsBody,
  "document-chunking-strategy": DocumentChunkingStrategyBody,
  "vector-search-basics": VectorSearchBasicsBody,
  "grounded-rag-answers": GroundedRagAnswersBody,
  // Phase 7
  "function-calling": FunctionCallingBody,
  "mini-agent-loop": MiniAgentLoopBody,
  "tool-permission-safeguards": ToolPermissionSafeguardsBody,
  "prompt-injection-defense": PromptInjectionDefenseBody,
  // Phase 8
  "blog-to-shorts-pipeline": BlogToShortsPipelineBody,
  "design-visual-prompt-system": DesignVisualPromptSystemBody,
  "youtube-script-research-to-outline": YoutubeScriptResearchToOutlineBody,
  "figma-ai-ui-variation-workflow": FigmaAiUiVariationWorkflowBody,
  "thumbnail-and-title-ab-test": ThumbnailAndTitleAbTestBody,
  "local-business-content-calendar": LocalBusinessContentCalendarBody,
  // Phase 0
  "zero-coding-orientation": ZeroCodingOrientationBody,
  "terminal-first-day": TerminalFirstDayBody,
  "ai-tool-account-and-cost": AiToolAccountAndCostBody,
  "privacy-and-academic-ethics": PrivacyAndAcademicEthicsBody,
  // Phase 10
  "evals-for-ai-coded-prs": EvalsForAiCodedPrsBody,
  "llm-observability-and-regression": LlmObservabilityAndRegressionBody,
  "ai-output-eval-for-pms": AiOutputEvalForPmsBody,
  "responsible-ai-policy-template": ResponsibleAiPolicyTemplateBody,
  // Phase 9
  "sql-with-ai-verification": SqlWithAiVerificationBody,
  "crm-segmentation-with-ai": CrmSegmentationWithAiBody,
  "dashboard-narrative-and-qa": DashboardNarrativeAndQaBody,
  "ab-test-decision-memo": AbTestDecisionMemoBody,
  // Phase 11
  "ai-app-cost-and-usage": AiAppCostAndUsageBody,
  "ai-product-brief": AiProductBriefBody,
  "landing-page-for-ai-product": LandingPageForAiProductBody,
  "pricing-and-monetization": PricingAndMonetizationBody,
  // Phase 12
  "capstone-plan-and-launch": CapstonePlanAndLaunchBody,
  "capstone-scope-selection": CapstoneScopeSelectionBody,
  "capstone-build-loop": CapstoneBuildLoopBody,
  "portfolio-and-retrospective": PortfolioAndRetrospectiveBody,
  "ai-concept-learning-framework": AiConceptLearningFrameworkBody,
  "claude-md-four-principles": ClaudeMdFourPrinciplesBody,
  "harness-engineering-roadmap": HarnessEngineeringRoadmapBody,
  "ralph-loop-codex-goal": RalphLoopCodexGoalBody,
  "claude-code-token-saving": ClaudeCodeTokenSavingBody,
  "cost-monitoring-in-production": CostMonitoringInProductionBody,
  "ai-delegation-decision": AiDelegationDecisionBody,
  "ai-collaboration-mindset": AiCollaborationMindsetBody,
  "reasoning-vs-instruct-prompting": ReasoningVsInstructPromptingBody,
  "prompt-debugging-loop": PromptDebuggingLoopBody,
  "multimodal-prompting": MultimodalPromptingBody,
  "output-evaluation-refine": OutputEvaluationRefineBody,
  "api-rate-limiting-and-batching": ApiRateLimitingAndBatchingBody,
};

export function getLessonBody(slug: string): ComponentType | null {
  return lessonBodies[slug] ?? null;
}
