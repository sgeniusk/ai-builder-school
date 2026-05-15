"use client";

import { useEffect, useState } from "react";

export interface TOCSection {
  id: string;
  label: string;
  /** 섹션 번호 (1-7). 없으면 보조 섹션. */
  number?: number;
}

/**
 * 우측 TOC — 현재 레슨의 7-step 섹션 + 보조 블록.
 *
 * 동작:
 *   - IntersectionObserver 로 현재 viewport 에 보이는 섹션을 감지
 *   - active 섹션은 글로우 그라디언트로 강조 (페르소나 색 활용)
 *   - hover 시 진행률 ("3/N 섹션 통과")이 우측 상단에 표시
 *
 * 상태는 가벼운 client-side 만 사용 (localStorage 미연동 — 향후 진도 저장 시 확장).
 */
export function LessonTOC({
  sections,
  journeyId,
}: {
  sections: TOCSection[];
  /** 현재 레슨이 가장 많이 추천되는 여정 — TOC 색 테마. 없으면 ink 톤. */
  journeyId?: string;
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // 가장 위에 있는, 화면에 들어온 섹션을 active로
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // sticky 헤더(88px) 바로 아래부터 active 밴드 시작.
        // TOC 링크 클릭 시 섹션 헤딩이 100px 근처에 도달하므로 즉시 active 처리됨.
        rootMargin: "-100px 0px -55% 0px",
        threshold: 0,
      },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId),
  );
  const passedCount = activeIndex + 1;
  const total = sections.length;
  const percent = total === 0 ? 0 : Math.round((passedCount / total) * 100);

  const journeyClass = journeyId ? `p-${journeyId}` : "";

  return (
    <aside
      className={`lesson-toc ${journeyClass}`}
      aria-label="레슨 섹션 네비게이션"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ltoc-header">
        <span className="eyebrow">On this page</span>
        <span
          className="ltoc-progress"
          aria-hidden={!hovered}
          data-visible={hovered ? "true" : "false"}
        >
          {passedCount}/{total} · {percent}%
        </span>
      </div>
      <ol className="ltoc-list">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <li
              key={s.id}
              className={isActive ? "is-active" : undefined}
            >
              <a href={`#${s.id}`} aria-current={isActive ? "true" : undefined}>
                {typeof s.number === "number" && (
                  <span className="ltoc-num">
                    {String(s.number).padStart(2, "0")}
                  </span>
                )}
                <span className="ltoc-label">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
