// 리소스 그리드 — 카테고리별 도구·링크 묶음 (pill 형태)
import type { CSSProperties } from "react";

export interface ResourceGridProps {
  groups: {
    category: string;
    resources: { name: string; url?: string; note?: string }[];
  }[];
}

export function ResourceGridBlock({ groups }: ResourceGridProps) {
  return (
    <div className="sb-resource">
      {groups.map((g, gi) => (
        <div
          key={gi}
          className="sb-resource__group sb-fadein"
          style={{ "--i": gi } as CSSProperties}
        >
          <h3 className="sb-resource__cat">{g.category}</h3>
          <div className="sb-resource__pills">
            {g.resources.map((r, ri) => {
              const inner = (
                <>
                  <span className="sb-resource__name">{r.name}</span>
                  {r.note && <span className="sb-resource__note"> · {r.note}</span>}
                </>
              );
              return r.url ? (
                <a
                  key={ri}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="sb-resource__pill is-link"
                >
                  {inner}
                </a>
              ) : (
                <span key={ri} className="sb-resource__pill">
                  {inner}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
