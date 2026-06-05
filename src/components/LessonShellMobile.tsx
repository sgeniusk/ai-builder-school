// 모바일·태블릿(≤1279px) 에서 좌·우 사이드바를 drawer 로 띄우는 토글 버튼·오버레이.
"use client";

import { useEffect, useState } from "react";

type Mode = null | "rail" | "toc";

const RAIL_CLASS = "lesson-drawer-rail";
const TOC_CLASS = "lesson-drawer-toc";

export function LessonShellMobile() {
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const cls = document.body.classList;
    cls.remove(RAIL_CLASS, TOC_CLASS);
    if (mode === "rail") cls.add(RAIL_CLASS);
    else if (mode === "toc") cls.add(TOC_CLASS);
    return () => {
      cls.remove(RAIL_CLASS, TOC_CLASS);
    };
  }, [mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setMode(null);

  return (
    <>
      <div className="lesson-drawer-toggles" role="toolbar" aria-label="모바일 사이드바">
        <button
          type="button"
          className={`lesson-drawer-toggle${mode === "rail" ? " lesson-drawer-toggle--active" : ""}`}
          onClick={() => setMode(mode === "rail" ? null : "rail")}
          aria-expanded={mode === "rail"}
          aria-controls="lesson-rail-drawer"
        >
          <span aria-hidden>☰</span>
          <span>커리큘럼</span>
        </button>
        <button
          type="button"
          className={`lesson-drawer-toggle${mode === "toc" ? " lesson-drawer-toggle--active" : ""}`}
          onClick={() => setMode(mode === "toc" ? null : "toc")}
          aria-expanded={mode === "toc"}
          aria-controls="lesson-toc-drawer"
        >
          <span aria-hidden>知</span>
          <span>지음</span>
        </button>
      </div>

      {mode && (
        <button
          type="button"
          className="lesson-drawer-overlay"
          onClick={close}
          aria-label="사이드바 닫기"
        />
      )}
    </>
  );
}
