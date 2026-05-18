// 캐릭터 액세서리 — 업적을 달성하면 잠금 해제된다. 동물(6종) 위에 합성되는 작은 픽셀 소품.
// 6 동물 × 6 액세서리 = 한 번씩만 그리면 36 조합을 공짜로 얻는다.

export const ACCESSORIES = [
  "sprout",
  "glasses",
  "flame",
  "wrench",
  "crown",
  "star",
] as const;
export type Accessory = (typeof ACCESSORIES)[number];

export const ACCESSORY_LABEL: Record<Accessory, string> = {
  sprout: "새싹",
  glasses: "안경",
  flame: "불꽃",
  wrench: "렌치",
  crown: "왕관",
  star: "별",
};

// 액세서리 → 잠금 해제하는 업적 id (achievements.ts).
export const ACCESSORY_UNLOCK: Record<Accessory, string> = {
  sprout: "first-step",
  glasses: "lessons-30",
  flame: "streak-7",
  wrench: "project-ready",
  crown: "stage-all",
  star: "journey-complete",
};
