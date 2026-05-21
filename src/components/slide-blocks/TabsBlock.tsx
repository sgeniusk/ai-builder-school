"use client";
// 탭 패널 — 한 슬라이드 안에서 탭으로 콘텐츠 전환. 좌우 화살표로도 이동.
import { useRef, useState } from "react";

export interface TabPanelContent {
  heading?: string;
  columns: {
    heading?: string;
    bullets: { text: string; emphasis?: boolean }[];
  }[];
}
export interface TabsProps {
  tabs: { label: string; panel: TabPanelContent }[];
}

export function TabsBlock({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    e.stopPropagation();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const panel = tabs[active]?.panel;
  return (
    <div className="sb-tabs">
      <div role="tablist" aria-label="섹션" onKeyDown={onKeyDown} className="sb-tabs__list">
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`sb-tabs__tab${selected ? " is-active" : ""}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="sb-tabs__panel" key={active}>
        {panel?.heading && <h3 className="sb-tabs__panel-head">{panel.heading}</h3>}
        <div className={panel && panel.columns.length >= 2 ? "sb-tabs__cols" : ""}>
          {panel?.columns.map((col, ci) => (
            <div key={ci}>
              {col.heading && <h4 className="sb-tabs__col-head">{col.heading}</h4>}
              <ul className="sb-tabs__bullets">
                {col.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className={`sb-tabs__bullet${b.emphasis ? " is-emph" : ""}`}
                  >
                    <span className="sb-tabs__dot" />
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
