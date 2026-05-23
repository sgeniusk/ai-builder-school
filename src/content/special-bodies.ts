// 특강 MDX 본문 — slug → 컴포넌트 매핑 (스펙 3)
// 레슨의 lesson-bodies.ts와 동형. 특강 라우트가 <MdxBody components={...}>로 주입한다.
import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

import FrontierAiLandscape202605Body from "./specials/frontier-ai-landscape-2026-05.mdx";
import JayChoiClaudeCode9TipsBody from "./specials/jay-choi-claude-code-9tips.mdx";
import CastleClaudeCode6SkillsBody from "./specials/castle-claude-code-6-skills.mdx";

/** 특강 MDX 본문 컴포넌트가 받는 props — components 매핑 주입용. */
export type SpecialBody = ComponentType<{ components?: MDXComponents }>;

const specialBodies: Record<string, SpecialBody> = {
  "frontier-ai-landscape-2026-05": FrontierAiLandscape202605Body,
  "jay-choi-claude-code-9tips": JayChoiClaudeCode9TipsBody,
  "castle-claude-code-6-skills": CastleClaudeCode6SkillsBody,
};

export function getSpecialBody(slug: string): SpecialBody | null {
  return specialBodies[slug] ?? null;
}
