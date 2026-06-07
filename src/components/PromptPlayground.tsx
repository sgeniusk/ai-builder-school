// 프롬프트 연습장 — 레슨 안에서 본인 Gemini 키로 프롬프트를 직접 호출해보는 인앱 실습 블록.
// 키 없으면 발급 안내 + 입력, 있으면 프롬프트(프리필 가능) 호출 → 응답. 무백엔드·BYO 키.
"use client";

import { useState } from "react";
import { useApiKey } from "@/hooks/useApiKey";
import { callGemini, type GeminiResult } from "@/lib/gemini";
import { trackEvent } from "@/lib/analytics";

export function PromptPlayground({
  initialPrompt = "",
}: {
  initialPrompt?: string;
}) {
  const { mounted, key, saveKey, clearKey, hasKey } = useApiKey();
  const [keyInput, setKeyInput] = useState("");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [result, setResult] = useState<GeminiResult | null>(null);
  const [loading, setLoading] = useState(false);

  if (!mounted) {
    return <div className="playground playground--skeleton" aria-hidden />;
  }

  const run = async () => {
    setLoading(true);
    setResult(null);
    trackEvent("Prompt Run");
    const r = await callGemini(key, prompt);
    setResult(r);
    setLoading(false);
  };

  return (
    <div className="playground">
      <div className="playground__head">
        <span className="playground__tag">⚡ 직접 해보기</span>
        <span className="playground__model mono">Gemini</span>
      </div>

      {!hasKey ? (
        <div className="playground__keysetup">
          <p className="playground__hint">
            본인 Gemini API 키로 실제 호출해봐요. 키는 이 브라우저에만 저장되고 우리 서버로 보내지 않아요.{" "}
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
        </div>
      ) : (
        <>
          <textarea
            className="playground__prompt"
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="프롬프트를 입력하거나 위 예시를 다듬어보세요."
          />
          <div className="playground__actions">
            <button
              type="button"
              className="btn"
              onClick={run}
              disabled={loading || !prompt.trim()}
            >
              {loading ? "생성 중…" : "실행"}
            </button>
            <button type="button" className="btn ghost" onClick={clearKey}>
              키 지우기
            </button>
          </div>
          {result && (
            <div
              className={`playground__result${result.ok ? "" : " is-error"}`}
            >
              {result.ok ? result.text : result.error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
