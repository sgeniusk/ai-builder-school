// v2.0 — Stage 도입/마무리 에세이 MDX 레지스트리. 6 Stage 기준.
// 2026-05-22 — 옛 8 Stage에서 6 Stage로 통합 시 stage-2/6 intro는 새 통합 콘텐츠로
// 덮어쓰고, stage-3/4/5 intro는 옛 stage-4/5/6 콘텐츠를 shift. 옛 stage-7/8 intro/outro는
// 더 이상 가리키는 stage가 없어 등록에서 제거 (파일은 stages/ 폴더에 남음).
// 옛 stage-2~6 outro 콘텐츠는 옛 stage 번호 기준이라 Phase A2에서 다시 작성될 TODO.
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
};

export function getStageBody(slug: string | undefined): ComponentType | null {
  if (!slug) return null;
  return stageBodies[slug] ?? null;
}
