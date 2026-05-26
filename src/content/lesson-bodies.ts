import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

/** MDX 본문 컴포넌트가 받는 props — components 매핑 주입용. */
export type MdxBody = ComponentType<{ components?: MDXComponents }>;

// AI Literacy
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
import FallbackStrategyWhenAiFailsBody from "./lessons/fallback-strategy-when-ai-fails.mdx";
import CustomGptBuilderBody from "./lessons/custom-gpt-builder.mdx";
import MultiWorkflowOrchestrationBody from "./lessons/multi-workflow-orchestration.mdx";
import CostEstimationAndRoiByTaskBody from "./lessons/cost-estimation-and-roi-by-task.mdx";
import PrReviewWithAiBody from "./lessons/pr-review-with-ai.mdx";
import AgentHooksAutomationBody from "./lessons/agent-hooks-automation.mdx";
import SubagentContextDesignBody from "./lessons/subagent-context-design.mdx";
import AuthAndUserSessionsBody from "./lessons/auth-and-user-sessions.mdx";
import LongTermMemoryStateBody from "./lessons/long-term-memory-state.mdx";
import BuildMcpServerBody from "./lessons/build-mcp-server.mdx";
import AgentFailurePatternsBody from "./lessons/agent-failure-patterns.mdx";
import McpProductionPatternsBody from "./lessons/mcp-production-patterns.mdx";
import UserFeedbackCollectionForAiProductsBody from "./lessons/user-feedback-collection-for-ai-products.mdx";
import EarlyUserRecruitmentForAiProductsBody from "./lessons/early-user-recruitment-for-ai-products.mdx";
import ClaudeSkillsAuthoringBody from "./lessons/claude-skills-authoring.mdx";

// Prompt & Context Engineering
import StructureOfGoodPromptsBody from "./lessons/structure-of-good-prompts.mdx";
import EnforcingOutputFormatBody from "./lessons/enforcing-output-format.mdx";
import FeedingLongDocumentsBody from "./lessons/feeding-long-documents.mdx";
import BuildPersonalPromptLibraryBody from "./lessons/build-personal-prompt-library.mdx";

// 일상 자동화
import AutomateReportDraftsBody from "./lessons/automate-report-drafts.mdx";
import MeetingNotesPipelineBody from "./lessons/meeting-notes-pipeline.mdx";
import ResearchWorkflowBody from "./lessons/research-workflow.mdx";
import BlogWritingPipelineBody from "./lessons/blog-writing-pipeline.mdx";

// Coding Agents
import CodingAgentSetupBody from "./lessons/coding-agent-setup.mdx";
import GithubIssueToAiBriefBody from "./lessons/github-issue-to-ai-brief.mdx";
import LettingAiReadCodebaseBody from "./lessons/letting-ai-read-codebase.mdx";
import PlanWithAiBody from "./lessons/plan-with-ai.mdx";
import WriteTestsWithCodingAgentBody from "./lessons/write-tests-with-coding-agent.mdx";
import BugReproductionLoopBody from "./lessons/bug-reproduction-loop.mdx";

// AI App 개발
import ConnectAiApiBody from "./lessons/connect-ai-api.mdx";
import StreamingResponseUiBody from "./lessons/streaming-response-ui.mdx";
import StructuredOutputHandlingBody from "./lessons/structured-output-handling.mdx";
import ConversationStorageDesignBody from "./lessons/conversation-storage-design.mdx";

// RAG
import UnderstandingEmbeddingsBody from "./lessons/understanding-embeddings.mdx";
import DocumentChunkingStrategyBody from "./lessons/document-chunking-strategy.mdx";
import VectorSearchBasicsBody from "./lessons/vector-search-basics.mdx";
import GroundedRagAnswersBody from "./lessons/grounded-rag-answers.mdx";

// Agents & MCP
import FunctionCallingBody from "./lessons/function-calling.mdx";
import MiniAgentLoopBody from "./lessons/mini-agent-loop.mdx";
import ToolPermissionSafeguardsBody from "./lessons/tool-permission-safeguards.mdx";
import PromptInjectionDefenseBody from "./lessons/prompt-injection-defense.mdx";

// Multimodal & Content
import BlogToShortsPipelineBody from "./lessons/blog-to-shorts-pipeline.mdx";
import DesignVisualPromptSystemBody from "./lessons/design-visual-prompt-system.mdx";
import YoutubeScriptResearchToOutlineBody from "./lessons/youtube-script-research-to-outline.mdx";
import FigmaAiUiVariationWorkflowBody from "./lessons/figma-ai-ui-variation-workflow.mdx";
import ThumbnailAndTitleAbTestBody from "./lessons/thumbnail-and-title-ab-test.mdx";
import LocalBusinessContentCalendarBody from "./lessons/local-business-content-calendar.mdx";

// AI 학습 환경 세팅
import ZeroCodingOrientationBody from "./lessons/zero-coding-orientation.mdx";
import TerminalFirstDayBody from "./lessons/terminal-first-day.mdx";
import AiToolAccountAndCostBody from "./lessons/ai-tool-account-and-cost.mdx";
import PrivacyAndAcademicEthicsBody from "./lessons/privacy-and-academic-ethics.mdx";

// Stage 1 — AI 원리 & 도구 (v2.0 신규)
import WhatIsAnLlmBody from "./lessons/what-is-an-llm.mdx";
import TokensContextAndCostBody from "./lessons/tokens-context-and-cost.mdx";
import AiServiceLandscapeBody from "./lessons/ai-service-landscape.mdx";
import AiChatFeaturesBasicsBody from "./lessons/ai-chat-features-basics.mdx";
import GitBasicsAndTerminologyBody from "./lessons/git-basics-and-terminology.mdx";
import GithubEssentialsBody from "./lessons/github-essentials.mdx";

// Evals, Security & Responsible AI
import EvalsForAiCodedPrsBody from "./lessons/evals-for-ai-coded-prs.mdx";
import LlmObservabilityAndRegressionBody from "./lessons/llm-observability-and-regression.mdx";
import AiOutputEvalForPmsBody from "./lessons/ai-output-eval-for-pms.mdx";
import ResponsibleAiPolicyTemplateBody from "./lessons/responsible-ai-policy-template.mdx";

// Data Analysis & Decision AI
import SqlWithAiVerificationBody from "./lessons/sql-with-ai-verification.mdx";
import CrmSegmentationWithAiBody from "./lessons/crm-segmentation-with-ai.mdx";
import DashboardNarrativeAndQaBody from "./lessons/dashboard-narrative-and-qa.mdx";
import AbTestDecisionMemoBody from "./lessons/ab-test-decision-memo.mdx";

// Product
import AiAppCostAndUsageBody from "./lessons/ai-app-cost-and-usage.mdx";
import AiProductBriefBody from "./lessons/ai-product-brief.mdx";
import LandingPageForAiProductBody from "./lessons/landing-page-for-ai-product.mdx";
import PricingAndMonetizationBody from "./lessons/pricing-and-monetization.mdx";

// Capstone
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
export const lessonBodies: Record<string, MdxBody | undefined> = {
  // AI Literacy
  "common-skills-of-future-proof-people": CommonSkillsBody,
  "what-llms-are-good-and-bad-at": WhatLlmsBody,
  "hallucination-verification": HallucinationVerificationBody,
  "checks-before-trusting-ai-output": ChecksBeforeTrustingBody,
  // Prompt & Context Engineering
  "structure-of-good-prompts": StructureOfGoodPromptsBody,
  "enforcing-output-format": EnforcingOutputFormatBody,
  "feeding-long-documents": FeedingLongDocumentsBody,
  "build-personal-prompt-library": BuildPersonalPromptLibraryBody,
  // 일상 자동화
  "automate-report-drafts": AutomateReportDraftsBody,
  "meeting-notes-pipeline": MeetingNotesPipelineBody,
  "research-workflow": ResearchWorkflowBody,
  "blog-writing-pipeline": BlogWritingPipelineBody,
  // Coding Agents
  "coding-agent-setup": CodingAgentSetupBody,
  "github-issue-to-ai-brief": GithubIssueToAiBriefBody,
  "letting-ai-read-codebase": LettingAiReadCodebaseBody,
  "plan-with-ai": PlanWithAiBody,
  "write-tests-with-coding-agent": WriteTestsWithCodingAgentBody,
  "bug-reproduction-loop": BugReproductionLoopBody,
  // AI App 개발
  "connect-ai-api": ConnectAiApiBody,
  "streaming-response-ui": StreamingResponseUiBody,
  "structured-output-handling": StructuredOutputHandlingBody,
  "conversation-storage-design": ConversationStorageDesignBody,
  // RAG
  "understanding-embeddings": UnderstandingEmbeddingsBody,
  "document-chunking-strategy": DocumentChunkingStrategyBody,
  "vector-search-basics": VectorSearchBasicsBody,
  "grounded-rag-answers": GroundedRagAnswersBody,
  // Agents & MCP
  "function-calling": FunctionCallingBody,
  "mini-agent-loop": MiniAgentLoopBody,
  "tool-permission-safeguards": ToolPermissionSafeguardsBody,
  "prompt-injection-defense": PromptInjectionDefenseBody,
  // Multimodal & Content
  "blog-to-shorts-pipeline": BlogToShortsPipelineBody,
  "design-visual-prompt-system": DesignVisualPromptSystemBody,
  "youtube-script-research-to-outline": YoutubeScriptResearchToOutlineBody,
  "figma-ai-ui-variation-workflow": FigmaAiUiVariationWorkflowBody,
  "thumbnail-and-title-ab-test": ThumbnailAndTitleAbTestBody,
  "local-business-content-calendar": LocalBusinessContentCalendarBody,
  // AI 학습 환경 세팅
  "zero-coding-orientation": ZeroCodingOrientationBody,
  "terminal-first-day": TerminalFirstDayBody,
  "ai-tool-account-and-cost": AiToolAccountAndCostBody,
  "privacy-and-academic-ethics": PrivacyAndAcademicEthicsBody,
  // Evals, Security & Responsible AI
  "evals-for-ai-coded-prs": EvalsForAiCodedPrsBody,
  "llm-observability-and-regression": LlmObservabilityAndRegressionBody,
  "ai-output-eval-for-pms": AiOutputEvalForPmsBody,
  "responsible-ai-policy-template": ResponsibleAiPolicyTemplateBody,
  // Data Analysis & Decision AI
  "sql-with-ai-verification": SqlWithAiVerificationBody,
  "crm-segmentation-with-ai": CrmSegmentationWithAiBody,
  "dashboard-narrative-and-qa": DashboardNarrativeAndQaBody,
  "ab-test-decision-memo": AbTestDecisionMemoBody,
  // Product
  "ai-app-cost-and-usage": AiAppCostAndUsageBody,
  "ai-product-brief": AiProductBriefBody,
  "landing-page-for-ai-product": LandingPageForAiProductBody,
  "pricing-and-monetization": PricingAndMonetizationBody,
  // Capstone
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
  "fallback-strategy-when-ai-fails": FallbackStrategyWhenAiFailsBody,
  "custom-gpt-builder": CustomGptBuilderBody,
  "multi-workflow-orchestration": MultiWorkflowOrchestrationBody,
  "cost-estimation-and-roi-by-task": CostEstimationAndRoiByTaskBody,
  "pr-review-with-ai": PrReviewWithAiBody,
  "agent-hooks-automation": AgentHooksAutomationBody,
  "subagent-context-design": SubagentContextDesignBody,
  "auth-and-user-sessions": AuthAndUserSessionsBody,
  "long-term-memory-state": LongTermMemoryStateBody,
  "build-mcp-server": BuildMcpServerBody,
  "agent-failure-patterns": AgentFailurePatternsBody,
  "mcp-production-patterns": McpProductionPatternsBody,
  "user-feedback-collection-for-ai-products": UserFeedbackCollectionForAiProductsBody,
  "early-user-recruitment-for-ai-products": EarlyUserRecruitmentForAiProductsBody,
  "claude-skills-authoring": ClaudeSkillsAuthoringBody,
  // Stage 1 — AI 원리 & 도구 (v2.0 신규)
  "what-is-an-llm": WhatIsAnLlmBody,
  "tokens-context-and-cost": TokensContextAndCostBody,
  "ai-service-landscape": AiServiceLandscapeBody,
  "ai-chat-features-basics": AiChatFeaturesBasicsBody,
  "git-basics-and-terminology": GitBasicsAndTerminologyBody,
  "github-essentials": GithubEssentialsBody,
};

export function getLessonBody(slug: string): MdxBody | null {
  return lessonBodies[slug] ?? null;
}
