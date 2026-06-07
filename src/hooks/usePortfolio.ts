// 프로젝트 완성 기록(산출물 포트폴리오)을 localStorage 에 저장하는 클라이언트 훅 (SSR-safe).
// projectSlug → { built, url?, note?, builtAt? }. useLessonProgress 와 동일한 동기화 패턴.
"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aibs:portfolio:v1";
const CHANGE_EVENT = "aibs:portfolio:change";

export type BuildEntry = {
  /** 이 프로젝트를 지었는지 */
  built: boolean;
  /** 결과물 링크 (배포 URL 또는 저장소) */
  url?: string;
  /** 한 줄 메모·회고 */
  note?: string;
  /** 완성 기록 시점 (ISO date) */
  builtAt?: string;
};

type PortfolioState = Record<string, BuildEntry>;

const EMPTY: PortfolioState = {};

function readStorage(): PortfolioState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return JSON.parse(raw) as PortfolioState;
  } catch {
    return EMPTY;
  }
}

function writeStorage(state: PortfolioState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // same-tab 동기화 (storage 이벤트는 다른 탭에서만 발화) — 렌더 도중 setState 방지 위해 미룬다.
    const sync = () => window.dispatchEvent(new Event(CHANGE_EVENT));
    if (typeof queueMicrotask === "function") queueMicrotask(sync);
    else setTimeout(sync, 0);
  } catch {
    // 용량 초과 등은 조용히 무시
  }
}

export function usePortfolio() {
  const [state, setState] = useState<PortfolioState>(EMPTY);
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

  const getEntry = useCallback(
    (slug: string): BuildEntry => state[slug] ?? { built: false },
    [state],
  );

  /** 항목 부분 갱신. built 를 true 로 켜는데 builtAt 가 없으면 자동 기록. */
  const setEntry = useCallback((slug: string, patch: Partial<BuildEntry>) => {
    setState((prev) => {
      const cur = prev[slug] ?? { built: false };
      const merged: BuildEntry = { ...cur, ...patch };
      if (merged.built && !merged.builtAt) {
        merged.builtAt = new Date().toISOString();
      }
      const next = { ...prev, [slug]: merged };
      writeStorage(next);
      return next;
    });
  }, []);

  /** 완성한 프로젝트 slug 목록 — builtAt 최근 순. */
  const getBuiltSlugs = useCallback(
    (): string[] =>
      Object.entries(state)
        .filter(([, e]) => e.built)
        .sort((a, b) => (b[1].builtAt ?? "").localeCompare(a[1].builtAt ?? ""))
        .map(([slug]) => slug),
    [state],
  );

  return { mounted, getEntry, setEntry, getBuiltSlugs };
}
