import type { ComponentType } from "react";
import CommonSkillsBody from "./lessons/common-skills-of-future-proof-people.mdx";
import WhatLlmsBody from "./lessons/what-llms-are-good-and-bad-at.mdx";
import HallucinationVerificationBody from "./lessons/hallucination-verification.mdx";
import ChecksBeforeTrustingBody from "./lessons/checks-before-trusting-ai-output.mdx";
import StructureOfGoodPromptsBody from "./lessons/structure-of-good-prompts.mdx";
import EnforcingOutputFormatBody from "./lessons/enforcing-output-format.mdx";
import FeedingLongDocumentsBody from "./lessons/feeding-long-documents.mdx";
import BuildPersonalPromptLibraryBody from "./lessons/build-personal-prompt-library.mdx";
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

/**
 * slug → MDX body component.
 * 새 레슨도 같은 패턴으로 `src/content/lessons/<slug>.mdx` 생성 + 여기 등록.
 */
export const lessonBodies: Record<string, ComponentType | undefined> = {
  "common-skills-of-future-proof-people": CommonSkillsBody,
  "what-llms-are-good-and-bad-at": WhatLlmsBody,
  "hallucination-verification": HallucinationVerificationBody,
  "checks-before-trusting-ai-output": ChecksBeforeTrustingBody,
  "structure-of-good-prompts": StructureOfGoodPromptsBody,
  "enforcing-output-format": EnforcingOutputFormatBody,
  "feeding-long-documents": FeedingLongDocumentsBody,
  "build-personal-prompt-library": BuildPersonalPromptLibraryBody,
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
};

export function getLessonBody(slug: string): ComponentType | null {
  return lessonBodies[slug] ?? null;
}
