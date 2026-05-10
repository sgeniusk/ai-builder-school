// 레슨 진행률·여정 선택을 localStorage 에 저장하는 클라이언트 훅 (SSR-safe)
"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aibs:progress:v1";

type ProgressState = {
  // lessonId → 체크된 verificationChecklist 인덱스 배열
  checks: Record<string, number[]>;
  // 사용자가 선택한 journey id (없으면 undefined)
  journey?: string;
};

// 디폴트 여정 — 첫 방문 시 자동 설정
const DEFAULT_JOURNEY = "practitioner";
const EMPTY: ProgressState = { checks: {}, journey: DEFAULT_JOURNEY };

function readStorage(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      checks: parsed.checks ?? {},
      journey: parsed.journey ?? DEFAULT_JOURNEY,
    };
  } catch {
    return EMPTY;
  }
}

function writeStorage(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // 용량 초과 등은 조용히 무시
  }
}

export function useLessonProgress() {
  // SSR-safe: 첫 렌더는 항상 EMPTY, 마운트 후 localStorage 값으로 치환
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(readStorage());
    setMounted(true);
    // 다른 탭에서의 변경 동기화
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    writeStorage(next);
  }, []);

  const toggleCheck = useCallback(
    (lessonId: string, index: number) => {
      setState((prev) => {
        const list = prev.checks[lessonId] ?? [];
        const has = list.includes(index);
        const nextList = has
          ? list.filter((i) => i !== index)
          : [...list, index].sort((a, b) => a - b);
        const next: ProgressState = {
          ...prev,
          checks: { ...prev.checks, [lessonId]: nextList },
        };
        writeStorage(next);
        return next;
      });
    },
    [],
  );

  const setJourney = useCallback(
    (journey: string | undefined) => {
      persist({ ...state, journey });
    },
    [state, persist],
  );

  const getLessonChecks = useCallback(
    (lessonId: string): number[] => state.checks[lessonId] ?? [],
    [state.checks],
  );

  // verificationChecklist 가 다 체크되면 "완료"
  const isLessonComplete = useCallback(
    (lessonId: string, totalChecks: number): boolean => {
      if (totalChecks === 0) return false;
      const list = state.checks[lessonId] ?? [];
      return list.length >= totalChecks;
    },
    [state.checks],
  );

  return {
    mounted,
    journey: state.journey,
    setJourney,
    toggleCheck,
    getLessonChecks,
    isLessonComplete,
  };
}
