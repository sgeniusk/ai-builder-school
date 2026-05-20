// 아이콘 카드 그리드 — 호버 시 살짝 떠오르는 카드 2~3열
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

export interface CardGridProps {
  columns?: 2 | 3;
  cards: {
    icon: string;
    label?: string;
    title: string;
    description: string;
  }[];
}

export function CardGridBlock({ columns = 3, cards }: CardGridProps) {
  return (
    <div className={`sb-cardgrid sb-cardgrid--c${columns}`}>
      {cards.map((c, i) => (
        <div
          key={i}
          className="sb-cardgrid__item sb-fadein"
          style={{ "--i": i } as CSSProperties}
        >
          <span className="sb-icon-circle sb-icon-circle--lg">
            <Icon name={c.icon} size={22} />
          </span>
          {c.label && <p className="sb-cardgrid__label">{c.label}</p>}
          <h3 className="sb-cardgrid__title">{c.title}</h3>
          <p className="sb-cardgrid__desc">{c.description}</p>
        </div>
      ))}
    </div>
  );
}
