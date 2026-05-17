// 학습 스트릭 — 연속 학습일을 localStorage에 기록한다.
// 레슨 체크박스를 토글하는 "학습 행동"이 일어난 날을 하루로 센다.
const KEY = "aibs:streak:v1";
export const STREAK_CHANGE = "aibs:streak:change";

type StreakState = { lastDay: string; current: number; best: number };

/** 대시보드 표시용 — 끊긴 스트릭은 current 0으로 본다. */
export type StreakView = {
  current: number;
  best: number;
  studiedToday: boolean;
};

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function dayBefore(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function read(): StreakState {
  if (typeof window === "undefined") return { lastDay: "", current: 0, best: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { lastDay: "", current: 0, best: 0 };
    const p = JSON.parse(raw) as Partial<StreakState>;
    return {
      lastDay: p.lastDay ?? "",
      current: p.current ?? 0,
      best: p.best ?? 0,
    };
  } catch {
    return { lastDay: "", current: 0, best: 0 };
  }
}

/** 학습 행동이 일어났을 때 호출 — 오늘을 학습일로 기록한다. */
export function recordStudyDay(): void {
  if (typeof window === "undefined") return;
  const s = read();
  const t = todayISO();
  if (s.lastDay === t) return; // 오늘 이미 카운트됨
  const current = s.lastDay === dayBefore(t) ? s.current + 1 : 1;
  const best = Math.max(s.best, current);
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ lastDay: t, current, best }),
    );
    window.dispatchEvent(new Event(STREAK_CHANGE));
  } catch {
    // 용량 초과 등은 조용히 무시
  }
}

export function readStreakView(): StreakView {
  const s = read();
  const t = todayISO();
  const alive = s.lastDay === t || s.lastDay === dayBefore(t);
  return {
    current: alive ? s.current : 0,
    best: s.best,
    studiedToday: s.lastDay === t,
  };
}
