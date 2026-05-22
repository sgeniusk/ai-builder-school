// v0.4 — Stage 도입/마무리 에세이 MDX 레지스트리.
// stages.ts의 introEssaySlug·outroEssaySlug가 이 맵의 키를 가리킨다.
// 8 Stage 전부 등록 (2026-05-22 — 누락 5~8 추가).
import type { ComponentType } from "react";

import Stage1Intro from "./stages/stage-1-intro.mdx";
import Stage1Outro from "./stages/stage-1-outro.mdx";
import Stage2Intro from "./stages/stage-2-intro.mdx";
import Stage2Outro from "./stages/stage-2-outro.mdx";
import Stage3Intro from "./stages/stage-3-intro.mdx";
import Stage3Outro from "./stages/stage-3-outro.mdx";
import Stage4Intro from "./stages/stage-4-intro.mdx";
import Stage4Outro from "./stages/stage-4-outro.mdx";
import Stage5Intro from "./stages/stage-5-intro.mdx";
import Stage5Outro from "./stages/stage-5-outro.mdx";
import Stage6Intro from "./stages/stage-6-intro.mdx";
import Stage6Outro from "./stages/stage-6-outro.mdx";
import Stage7Intro from "./stages/stage-7-intro.mdx";
import Stage7Outro from "./stages/stage-7-outro.mdx";
import Stage8Intro from "./stages/stage-8-intro.mdx";
import Stage8Outro from "./stages/stage-8-outro.mdx";

const stageBodies: Record<string, ComponentType> = {
  "stage-1-intro": Stage1Intro,
  "stage-1-outro": Stage1Outro,
  "stage-2-intro": Stage2Intro,
  "stage-2-outro": Stage2Outro,
  "stage-3-intro": Stage3Intro,
  "stage-3-outro": Stage3Outro,
  "stage-4-intro": Stage4Intro,
  "stage-4-outro": Stage4Outro,
  "stage-5-intro": Stage5Intro,
  "stage-5-outro": Stage5Outro,
  "stage-6-intro": Stage6Intro,
  "stage-6-outro": Stage6Outro,
  "stage-7-intro": Stage7Intro,
  "stage-7-outro": Stage7Outro,
  "stage-8-intro": Stage8Intro,
  "stage-8-outro": Stage8Outro,
};

export function getStageBody(slug: string | undefined): ComponentType | null {
  if (!slug) return null;
  return stageBodies[slug] ?? null;
}
