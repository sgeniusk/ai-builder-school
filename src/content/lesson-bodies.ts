import type { ComponentType } from "react";
import CommonSkillsBody from "./lessons/common-skills-of-future-proof-people.mdx";
import WhatLlmsBody from "./lessons/what-llms-are-good-and-bad-at.mdx";
import HallucinationVerificationBody from "./lessons/hallucination-verification.mdx";
import ChecksBeforeTrustingBody from "./lessons/checks-before-trusting-ai-output.mdx";
import StructureOfGoodPromptsBody from "./lessons/structure-of-good-prompts.mdx";
import EnforcingOutputFormatBody from "./lessons/enforcing-output-format.mdx";
import FeedingLongDocumentsBody from "./lessons/feeding-long-documents.mdx";
import BuildPersonalPromptLibraryBody from "./lessons/build-personal-prompt-library.mdx";

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
};

export function getLessonBody(slug: string): ComponentType | null {
  return lessonBodies[slug] ?? null;
}
