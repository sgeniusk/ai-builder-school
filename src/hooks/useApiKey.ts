// 프롬프트 연습장용 Gemini API 키를 localStorage 에 저장하는 클라이언트 훅 (SSR-safe).
// 키는 학습자 본인 것 — 이 브라우저에만 저장되고 우리 서버로는 전송되지 않는다(무백엔드·BYO 키).
"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aibs:gemini-key:v1";
const CHANGE_EVENT = "aibs:gemini-key:change";

function read(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function useApiKey() {
  const [key, setKey] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setKey(read());
    setMounted(true);
    const onChange = () => setKey(read());
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const saveKey = useCallback((k: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, k);
      setKey(k);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // 저장 실패는 조용히 무시
    }
  }, []);

  const clearKey = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setKey("");
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // 무시
    }
  }, []);

  return { mounted, key, saveKey, clearKey, hasKey: key.trim().length > 0 };
}
