// v0.4 — Stage 도입/마무리 에세이 MDX 레지스트리.
// stages.ts의 introEssaySlug·outroEssaySlug가 이 맵의 키를 가리킨다.
// 아직 책 보완이 안 된 stage(5~8)는 에세이가 없으며, getStageBody가 null을 반환한다.
import type { ComponentType } from "react";

import Stage1Intro from "./stages/stage-1-intro.mdx";
import Stage1Outro from "./stages/stage-1-outro.mdx";
import Stage2Intro from "./stages/stage-2-intro.mdx";
import Stage2Outro from "./stages/stage-2-outro.mdx";
import Stage3Intro from "./stages/stage-3-intro.mdx";
import Stage3Outro from "./stages/stage-3-outro.mdx";
import Stage4Intro from "./stages/stage-4-intro.mdx";
import Stage4Outro from "./stages/stage-4-outro.mdx";

const stageBodies: Record<string, ComponentType> = {
  "stage-1-intro": Stage1Intro,
  "stage-1-outro": Stage1Outro,
  "stage-2-intro": Stage2Intro,
  "stage-2-outro": Stage2Outro,
  "stage-3-intro": Stage3Intro,
  "stage-3-outro": Stage3Outro,
  "stage-4-intro": Stage4Intro,
  "stage-4-outro": Stage4Outro,
};

export function getStageBody(slug: string | undefined): ComponentType | null {
  if (!slug) return null;
  return stageBodies[slug] ?? null;
}
