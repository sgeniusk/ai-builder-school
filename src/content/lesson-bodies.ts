import type { ComponentType } from "react";
import WhatIsALoopBody from "./lessons/what-is-a-loop.mdx";
import CommonSkillsBody from "./lessons/common-skills-of-future-proof-people.mdx";
import WhatLlmsBody from "./lessons/what-llms-are-good-and-bad-at.mdx";
import HallucinationVerificationBody from "./lessons/hallucination-verification.mdx";
import ChecksBeforeTrustingBody from "./lessons/checks-before-trusting-ai-output.mdx";
import StructureOfGoodPromptsBody from "./lessons/structure-of-good-prompts.mdx";
import EnforcingOutputFormatBody from "./lessons/enforcing-output-format.mdx";
import FeedingLongDocumentsBody from "./lessons/feeding-long-documents.mdx";
import BuildPersonalPromptLibraryBody from "./lessons/build-personal-prompt-library.mdx";
import MetaPromptingBody from "./lessons/meta-prompting.mdx";
import AutomateReportDraftsBody from "./lessons/automate-report-drafts.mdx";
import MeetingNotesPipelineBody from "./lessons/meeting-notes-pipeline.mdx";
import ResearchWorkflowBody from "./lessons/research-workflow.mdx";
import BlogWritingPipelineBody from "./lessons/blog-writing-pipeline.mdx";
import CodingAgentSetupBody from "./lessons/coding-agent-setup.mdx";
import GithubIssueToAiBriefBody from "./lessons/github-issue-to-ai-brief.mdx";
import LettingAiReadCodebaseBody from "./lessons/letting-ai-read-codebase.mdx";
import PlanWithAiBody from "./lessons/plan-with-ai.mdx";
import WriteTestsWithCodingAgentBody from "./lessons/write-tests-with-coding-agent.mdx";
import BugReproductionLoopBody from "./lessons/bug-reproduction-loop.mdx";
import NightlyLoopPatternBody from "./lessons/nightly-loop-pattern.mdx";
import ConnectAiApiBody from "./lessons/connect-ai-api.mdx";
import StreamingResponseUiBody from "./lessons/streaming-response-ui.mdx";
import StructuredOutputHandlingBody from "./lessons/structured-output-handling.mdx";
import ConversationStorageDesignBody from "./lessons/conversation-storage-design.mdx";
import UnderstandingEmbeddingsBody from "./lessons/understanding-embeddings.mdx";
import DocumentChunkingStrategyBody from "./lessons/document-chunking-strategy.mdx";
import VectorSearchBasicsBody from "./lessons/vector-search-basics.mdx";
import GroundedRagAnswersBody from "./lessons/grounded-rag-answers.mdx";

/**
 * slug → MDX body component.
 * 새 레슨도 같은 패턴으로 `src/content/lessons/<slug>.mdx` 생성 + 여기 등록.
 */
export const lessonBodies: Record<string, ComponentType | undefined> = {
  "what-is-a-loop": WhatIsALoopBody,
  "common-skills-of-future-proof-people": CommonSkillsBody,
  "what-llms-are-good-and-bad-at": WhatLlmsBody,
  "hallucination-verification": HallucinationVerificationBody,
  "checks-before-trusting-ai-output": ChecksBeforeTrustingBody,
  "structure-of-good-prompts": StructureOfGoodPromptsBody,
  "enforcing-output-format": EnforcingOutputFormatBody,
  "feeding-long-documents": FeedingLongDocumentsBody,
  "build-personal-prompt-library": BuildPersonalPromptLibraryBody,
  "meta-prompting": MetaPromptingBody,
  "automate-report-drafts": AutomateReportDraftsBody,
  "meeting-notes-pipeline": MeetingNotesPipelineBody,
  "research-workflow": ResearchWorkflowBody,
  "blog-writing-pipeline": BlogWritingPipelineBody,
  "coding-agent-setup": CodingAgentSetupBody,
  "github-issue-to-ai-brief": GithubIssueToAiBriefBody,
  "letting-ai-read-codebase": LettingAiReadCodebaseBody,
  "plan-with-ai": PlanWithAiBody,
  "write-tests-with-coding-agent": WriteTestsWithCodingAgentBody,
  "bug-reproduction-loop": BugReproductionLoopBody,
  "nightly-loop-pattern": NightlyLoopPatternBody,
  "connect-ai-api": ConnectAiApiBody,
  "streaming-response-ui": StreamingResponseUiBody,
  "structured-output-handling": StructuredOutputHandlingBody,
  "conversation-storage-design": ConversationStorageDesignBody,
  "understanding-embeddings": UnderstandingEmbeddingsBody,
  "document-chunking-strategy": DocumentChunkingStrategyBody,
  "vector-search-basics": VectorSearchBasicsBody,
  "grounded-rag-answers": GroundedRagAnswersBody,
};

export function getLessonBody(slug: string): ComponentType | null {
  return lessonBodies[slug] ?? null;
}
