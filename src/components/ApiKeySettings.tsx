// 전역 AI 키 설정 — /me 대시보드에서 한 번 넣으면 모든 레슨의 '직접 해보기' 연습장이 공유한다.
// useApiKey(localStorage)를 그대로 쓰므로 PromptPlayground 와 같은 키를 본다. 키 값은 화면에 노출하지 않는다.
"use client";

import { useState } from "react";
import { useApiKey } from "@/hooks/useApiKey";

export function ApiKeySettings() {
  const { mounted, hasKey, saveKey, clearKey } = useApiKey();
  const [keyInput, setKeyInput] = useState("");

  if (!mounted) {
    return <section className="dash-card" aria-hidden style={{ minHeight: 90 }} />;
  }

  return (
    <section className="dash-card">
      <div className="dash-card__head">
        <span className="rail-section-label">AI 키 설정 · 프롬프트 연습장</span>
        {hasKey && <span className="mono dash-frac">설정됨 ✓</span>}
      </div>

      {hasKey ? (
        <>
          <p className="dash-note" style={{ margin: "0 0 12px" }}>
            Gemini 키가 이 브라우저에 저장돼 있어요. 모든 레슨의 &lsquo;직접 해보기&rsquo; 연습장이 이 키 하나를 함께 씁니다 — 레슨마다 다시 넣지 않아도 돼요.
          </p>
          <button type="button" className="btn ghost" onClick={clearKey}>
            키 지우기
          </button>
        </>
      ) : (
        <>
          <p className="dash-note" style={{ margin: "0 0 12px" }}>
            여기 한 번만 넣으면 모든 레슨 연습장에서 바로 실습할 수 있어요. 키는 이 브라우저에만 저장되고 우리 서버로 보내지 않아요.{" "}
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
            >
              무료 키 발급 →
            </a>
          </p>
          <form
            className="playground__keyrow"
            onSubmit={(e) => {
              e.preventDefault();
              saveKey(keyInput.trim());
            }}
          >
            <input
              type="password"
              className="playground__input"
              placeholder="Gemini API 키 붙여넣기"
              autoComplete="off"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <button type="submit" className="btn" disabled={!keyInput.trim()}>
              저장
            </button>
          </form>
        </>
      )}
    </section>
  );
}
