// 업적 — 학습 진척에서 파생한다. 별도 이벤트·저장 장치 없음.
// 현재 진척 상태(context)가 조건(test)을 만족하면 그 업적은 달성된 것.

export type AchievementDomain = "활동" | "여정";

/** 업적 판정에 필요한 현재 진척 스냅샷. 클라이언트가 localStorage 진척에서 계산해 넘긴다. */
export type AchievementContext = {
  doneLessons: number;
  completedStages: number;
  bestStreak: number;
  readyProjects: number;
  journeyDone: number;
  journeyTotal: number;
};

export type Achievement = {
  id: string;
  label: string;
  description: string;
  domain: AchievementDomain;
  test: (c: AchievementContext) => boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    label: "첫걸음",
    description: "첫 레슨을 완료했어요.",
    domain: "활동",
    test: (c) => c.doneLessons >= 1,
  },
  {
    id: "lessons-10",
    label: "열 칸 사다리",
    description: "레슨 10개를 완료했어요.",
    domain: "활동",
    test: (c) => c.doneLessons >= 10,
  },
  {
    id: "lessons-30",
    label: "서른 칸 사다리",
    description: "레슨 30개를 완료했어요.",
    domain: "활동",
    test: (c) => c.doneLessons >= 30,
  },
  {
    id: "streak-3",
    label: "사흘의 리듬",
    description: "3일 연속 학습했어요.",
    domain: "활동",
    test: (c) => c.bestStreak >= 3,
  },
  {
    id: "streak-7",
    label: "한 주 완주",
    description: "7일 연속 학습했어요.",
    domain: "활동",
    test: (c) => c.bestStreak >= 7,
  },
  {
    id: "stage-first",
    label: "첫 단계 완주",
    description: "Stage 하나를 끝까지 완주했어요.",
    domain: "활동",
    test: (c) => c.completedStages >= 1,
  },
  {
    id: "stage-all",
    label: "사다리 끝",
    description: "8개 Stage를 모두 완주했어요.",
    domain: "활동",
    test: (c) => c.completedStages >= 8,
  },
  {
    id: "project-ready",
    label: "빌드 준비 완료",
    description: "프로젝트 하나가 '시작 가능'에 도달했어요.",
    domain: "활동",
    test: (c) => c.readyProjects >= 1,
  },
  {
    id: "project-ready-3",
    label: "다재다능",
    description: "프로젝트 3개가 '시작 가능'에 도달했어요.",
    domain: "활동",
    test: (c) => c.readyProjects >= 3,
  },
  {
    id: "journey-sprout",
    label: "여정의 새싹",
    description: "내 여정 추천 레슨 5개를 완료했어요.",
    domain: "여정",
    test: (c) => c.journeyDone >= 5,
  },
  {
    id: "journey-half",
    label: "여정 반환점",
    description: "내 여정의 절반을 지났어요.",
    domain: "여정",
    test: (c) => c.journeyTotal > 0 && c.journeyDone >= c.journeyTotal / 2,
  },
  {
    id: "journey-complete",
    label: "여정 완주",
    description: "내 여정을 끝까지 완주했어요.",
    domain: "여정",
    test: (c) => c.journeyTotal > 0 && c.journeyDone >= c.journeyTotal,
  },
];

/** context 를 만족하는 업적 id 집합. */
export function evaluateAchievements(c: AchievementContext): Set<string> {
  return new Set(
    ACHIEVEMENTS.filter((a) => a.test(c)).map((a) => a.id),
  );
}
