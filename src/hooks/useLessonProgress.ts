// 레슨 진행률·여정 선택을 localStorage 에 저장하는 클라이언트 훅 (SSR-safe).
// section 3종 (build / verify / reflect) 을 각각 추적하고 가중 % 를 산출한다.
"use client";

import { useCallback, useEffect, useState } from "react";
import { recordStudyDay } from "@/lib/streak";

const STORAGE_KEY = "aibs:progress:v2";
const CHANGE_EVENT = "aibs:progress:change";

export const SECTIONS = ["build", "verify", "reflect"] as const;
export type Section = (typeof SECTIONS)[number];

/** 가중치 — 빌드 0.5 · 검증 0.3 · 회고 0.2 (합 1.0) */
export const SECTION_WEIGHTS: Record<Section, number> = {
  build: 0.5,
  verify: 0.3,
  reflect: 0.2,
};

type LessonChecks = Partial<Record<Section, number[]>>;
type ProgressState = {
  // lessonId → section → 체크된 항목 인덱스 배열
  checks: Record<string, LessonChecks>;
  // 사용자가 선택한 journey id (없으면 디폴트 적용)
  journey?: string;
};

const DEFAULT_JOURNEY = "practitioner";
const EMPTY: ProgressState = { checks: {}, journey: DEFAULT_JOURNEY };

/** 진행률 계산에 필요한 lesson 정보 */
export type ProgressLesson = {
  id: string;
  buildSteps?: string[];
  verificationChecklist?: string[];
  reflectionQuestions?: string[];
};

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
    // same-tab 안 모든 훅 인스턴스 동기화. (storage event 는 다른 탭에서만 발화.)
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // 용량 초과 등은 조용히 무시
  }
}

function sectionTotal(lesson: ProgressLesson, section: Section): number {
  if (section === "build") return lesson.buildSteps?.length ?? 0;
  if (section === "verify") return lesson.verificationChecklist?.length ?? 0;
  return lesson.reflectionQuestions?.length ?? 0;
}

export function useLessonProgress() {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(readStorage());
    setMounted(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readStorage());
    };
    const onChange = () => setState(readStorage());
    window.addEventListener("storage", onStorage);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CHANGE_EVENT, onChange);
    };
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    writeStorage(next);
  }, []);

  const toggleCheck = useCallback(
    (lessonId: string, section: Section, index: number) => {
      setState((prev) => {
        const lessonChecks = prev.checks[lessonId] ?? {};
        const list = lessonChecks[section] ?? [];
        const has = list.includes(index);
        const nextList = has
          ? list.filter((i) => i !== index)
          : [...list, index].sort((a, b) => a - b);
        const next: ProgressState = {
          ...prev,
          checks: {
            ...prev.checks,
            [lessonId]: { ...lessonChecks, [section]: nextList },
          },
        };
        writeStorage(next);
        // 체크박스 토글 = 학습 행동 → 오늘을 스트릭에 기록
        recordStudyDay();
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

  const getSectionChecks = useCallback(
    (lessonId: string, section: Section): number[] =>
      state.checks[lessonId]?.[section] ?? [],
    [state.checks],
  );

  /** 단일 section 의 진행 비율 (0~100) */
  const getSectionPct = useCallback(
    (lessonId: string, section: Section, total: number): number => {
      if (total === 0) return 0;
      const done = (state.checks[lessonId]?.[section] ?? []).length;
      return Math.round((done / total) * 100);
    },
    [state.checks],
  );

  /** 가중 평균 진행률 (0~100). 빌드 50 + 검증 30 + 회고 20. */
  const getWeightedPct = useCallback(
    (lesson: ProgressLesson): number => {
      let weighted = 0;
      for (const s of SECTIONS) {
        const total = sectionTotal(lesson, s);
        if (total === 0) continue;
        const done = (state.checks[lesson.id]?.[s] ?? []).length;
        const pct = (done / total) * 100;
        weighted += pct * SECTION_WEIGHTS[s];
      }
      return Math.round(weighted);
    },
    [state.checks],
  );

  /** 세 section 모두 100% 완료된 경우 true */
  const isLessonComplete = useCallback(
    (lesson: ProgressLesson): boolean => {
      for (const s of SECTIONS) {
        const total = sectionTotal(lesson, s);
        if (total === 0) continue; // 데이터 없는 section 은 스킵
        const done = (state.checks[lesson.id]?.[s] ?? []).length;
        if (done < total) return false;
      }
      return true;
    },
    [state.checks],
  );

  return {
    mounted,
    journey: state.journey,
    setJourney,
    toggleCheck,
    getSectionChecks,
    getSectionPct,
    getWeightedPct,
    isLessonComplete,
  };
}
