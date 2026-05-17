// 학습 스트릭을 읽는 클라이언트 훅 (SSR-safe).
"use client";

import { useEffect, useState } from "react";
import { readStreakView, STREAK_CHANGE, type StreakView } from "@/lib/streak";

export function useStreak(): StreakView | null {
  // null = 아직 마운트 안 됨 (hydration mismatch 방지)
  const [view, setView] = useState<StreakView | null>(null);

  useEffect(() => {
    const update = () => setView(readStreakView());
    update();
    window.addEventListener(STREAK_CHANGE, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(STREAK_CHANGE, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return view;
}
