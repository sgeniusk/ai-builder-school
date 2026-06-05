// 검증 섹션에서 본문 개념 단락으로 바로 점프해 복습하는 칩 목록.
// 마운트 후 .lesson-reader 안의 본문 h2(구조 섹션 section-* 제외)를 읽어 링크로 만든다.
"use client";

import { useEffect, useState } from "react";

type Jump = { id: string; text: string };

export function ReviewJumps() {
  const [jumps, setJumps] = useState<Jump[]>([]);

  useEffect(() => {
    const found = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".lesson-reader h2[id]"),
    )
      .filter((h) => h.id && !h.id.startsWith("section-"))
      .map((h) => ({ id: h.id, text: (h.textContent ?? "").trim() }))
      .filter((j) => j.text.length > 0);
    setJumps(found);
  }, []);

  if (jumps.length === 0) return null;

  return (
    <nav className="review-jumps" aria-label="본문 다시 보기">
      <span className="review-jumps__label">헷갈리면 다시 보기</span>
      <span className="review-jumps__chips">
        {jumps.map((j) => (
          <a key={j.id} className="review-jumps__chip" href={`#${j.id}`}>
            {j.text}
          </a>
        ))}
      </span>
    </nav>
  );
}
