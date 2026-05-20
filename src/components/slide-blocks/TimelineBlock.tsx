// 프로세스 타임라인 — 가로 3열 또는 세로 흐름. 번호가 자동 부여된다.
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

export interface TimelineProps {
  orientation?: "horizontal" | "vertical";
  steps: { icon: string; title: string; description: string }[];
}

export function TimelineBlock({ orientation = "horizontal", steps }: TimelineProps) {
  const vertical = orientation === "vertical";
  return (
    <ol className={`sb-timeline sb-timeline--${vertical ? "v" : "h"}`}>
      {steps.map((s, i) => (
        <li
          key={i}
          className="sb-timeline__item sb-fadein"
          style={{ "--i": i } as CSSProperties}
        >
          <div className="sb-timeline__rail">
            <span className="sb-timeline__num">{String(i + 1).padStart(2, "0")}</span>
            {vertical && i < steps.length - 1 && <span className="sb-timeline__line" />}
          </div>
          <div className="sb-timeline__body">
            <span className="sb-icon-circle">
              <Icon name={s.icon} size={16} />
            </span>
            <h3 className="sb-timeline__title">{s.title}</h3>
            <p className="sb-timeline__desc">{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
