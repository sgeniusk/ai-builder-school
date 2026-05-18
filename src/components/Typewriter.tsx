// 프롬프트 타이핑 효과 — 텍스트가 뷰포트에 들어오면 한 글자씩 쳐진다.
// SSR·JS 없음·reduced-motion 일 땐 전체 텍스트를 그대로 (접근성·SEO 보존).
"use client";

import { useEffect, useRef, useState } from "react";

export function Typewriter({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  // SSR·첫 렌더 = 전체 텍스트 → hydration 일치. 뷰포트 진입 시 0부터 다시 친다.
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || text.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    let started = false;
    const total = text.length;
    const per = Math.min(16, 2200 / total); // 전체 ≤ 약 2.2초

    const type = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const n = Math.min(total, Math.floor((now - start) / per));
        setCount(n);
        if (n < total) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (
          !started &&
          !document.hidden &&
          entries.some((e) => e.isIntersecting)
        ) {
          started = true;
          setCount(0);
          type();
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <p
      ref={ref}
      className={className}
      style={{ margin: 0, whiteSpace: "pre-line" }}
      suppressHydrationWarning
    >
      {text.slice(0, count)}
      {count < text.length && <span className="type-caret" aria-hidden />}
    </p>
  );
}
