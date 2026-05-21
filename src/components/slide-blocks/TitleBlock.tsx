// 표지 블록 — 큰 타이틀 + eyebrow + 칩 행. 특강의 첫 슬라이드용.
import { Icon } from "./Icon";

export interface TitleBlockProps {
  eyebrow?: string;
  bigTitle: string;
  subtitle?: string;
  chips?: { icon: string; label: string }[];
}

export function TitleBlock({ eyebrow, bigTitle, subtitle, chips }: TitleBlockProps) {
  return (
    <div className="sb-title">
      {eyebrow && <p className="sb-title__eyebrow">{eyebrow}</p>}
      <h2 className="sb-title__head">{bigTitle}</h2>
      {subtitle && <p className="sb-title__sub">{subtitle}</p>}
      {chips && chips.length > 0 && (
        <div className="sb-title__chips">
          {chips.map((c, i) => (
            <div
              key={i}
              className="sb-title__chip sb-fadein"
              style={{ ["--i" as string]: i }}
            >
              <span className="sb-icon-circle">
                <Icon name={c.icon} size={18} />
              </span>
              <span className="sb-title__chip-label">{c.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
