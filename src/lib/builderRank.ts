// 빌더 랭크 — 완료한 레슨 수로 결정되는 성장 단계.
// 별도 저장 없이 진척(완료 레슨 수)에서 파생한다. 전체 레슨 완료가 만점.

export type BuilderRank = {
  tier: number; // 0..5
  label: string;
  /** 이 랭크의 상징 이모지 */
  emoji: string;
  /** 다음 랭크까지 남은 레슨 수 (최고 랭크면 0) */
  toNext: number;
  /** 다음 랭크 라벨 (최고 랭크면 null) */
  nextLabel: string | null;
};

// 최고 랭크(🏆)의 임계값은 전체 레슨 수(total)에서 파생한다 — 콘텐츠가 늘어도 만점이 따라간다.
const BASE_TIERS: { min: number; label: string; emoji: string }[] = [
  { min: 0, label: "새싹 빌더", emoji: "🌱" },
  { min: 1, label: "입문 빌더", emoji: "🔰" },
  { min: 10, label: "성장하는 빌더", emoji: "🌿" },
  { min: 30, label: "능숙한 빌더", emoji: "🛠️" },
  { min: 60, label: "베테랑 빌더", emoji: "⚙️" },
];

export function getBuilderRank(done: number, total: number): BuilderRank {
  const tiers = [...BASE_TIERS, { min: total, label: "AI 빌더", emoji: "🏆" }];
  let tier = 0;
  for (let i = 0; i < tiers.length; i += 1) {
    if (done >= (tiers[i] as { min: number }).min) tier = i;
  }
  const current = tiers[tier] as { label: string; emoji: string };
  const next = tiers[tier + 1] as { min: number; label: string } | undefined;
  return {
    tier,
    label: current.label,
    emoji: current.emoji,
    toNext: next ? next.min - done : 0,
    nextLabel: next ? next.label : null,
  };
}
