// 학습자 캐릭터(핸들·동물) 를 localStorage 에 저장하는 클라이언트 훅 (SSR-safe).
"use client";

import { useCallback, useEffect, useState } from "react";
import type { Accessory } from "@/lib/accessories";

const STORAGE_KEY = "aibs:character:v1";
const CHANGE_EVENT = "aibs:character:change";

export const ANIMALS = [
  "puppy",
  "kitten",
  "dolphin",
  "rabbit",
  "fox",
  "penguin",
] as const;
export type Animal = (typeof ANIMALS)[number];

// 동물 선택 UI 에 쓰는 한국어 라벨.
export const ANIMAL_LABEL: Record<Animal, string> = {
  puppy: "강아지",
  kitten: "고양이",
  dolphin: "돌고래",
  rabbit: "토끼",
  fox: "여우",
  penguin: "펭귄",
};

export type Character = {
  handle: string;
  animal: Animal;
  /** 업적으로 잠금 해제한 액세서리 중 표시 중인 것. 없으면 미착용. */
  accessory?: Accessory;
  createdAt: string; // ISO
};

// 익명 핸들 생성 — 한국어 형용사 + 한 음절 명사
const ADJECTIVES = [
  "푸른", "행복한", "용감한", "다정한", "빠른", "조용한", "슬기로운",
  "신비로운", "총명한", "씩씩한", "느긋한", "포근한", "맑은", "따뜻한",
  "단단한", "유쾌한", "기특한", "순한", "당찬", "재빠른",
];
const NOUNS = ["별", "달", "숲", "들", "꽃", "구름", "바람", "이슬", "산", "강"];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

export function generateHandle(): string {
  return `${pick(ADJECTIVES)}${pick(NOUNS)}`;
}

function readStorage(): Character | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Character;
    if (!parsed.handle || !parsed.animal) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(c: Character) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    // same-tab 안 모든 훅 인스턴스 동기화. (storage event 는 다른 탭에서만 발화하므로 보조 채널.)
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* ignore */
  }
}

export function useCharacter() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCharacter(readStorage());
    setMounted(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setCharacter(readStorage());
    };
    const onChange = () => setCharacter(readStorage());
    window.addEventListener("storage", onStorage);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CHANGE_EVENT, onChange);
    };
  }, []);

  const create = useCallback(
    (next: { handle: string; animal: Animal }) => {
      const c: Character = {
        handle: next.handle,
        animal: next.animal,
        createdAt: new Date().toISOString(),
      };
      writeStorage(c);
      setCharacter(c);
    },
    [],
  );

  const setHandle = useCallback(
    (handle: string) => {
      if (!character) return;
      const next: Character = { ...character, handle };
      writeStorage(next);
      setCharacter(next);
    },
    [character],
  );

  const setAnimal = useCallback(
    (animal: Animal) => {
      if (!character) return;
      const next: Character = { ...character, animal };
      writeStorage(next);
      setCharacter(next);
    },
    [character],
  );

  const setAccessory = useCallback(
    (accessory: Accessory | undefined) => {
      if (!character) return;
      const next: Character = { ...character, accessory };
      writeStorage(next);
      setCharacter(next);
    },
    [character],
  );

  const reset = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      /* ignore */
    }
    setCharacter(null);
  }, []);

  return {
    mounted,
    character,        // null 이면 아직 생성 안 됨 (온보딩 띄울 신호)
    create,
    setHandle,
    setAnimal,
    setAccessory,
    reset,
  };
}
