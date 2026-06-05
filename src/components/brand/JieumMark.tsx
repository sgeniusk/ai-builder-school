// 지음 심볼 — 무지개 지붕 한옥(짓다). 처마 곡선 지붕 = 무지개, 쪽빛 잉크로 짓는 몸체.
// <JieumMark variant="house|build|tier" size={n} mono={false} />
"use client";

import { useId, type CSSProperties } from "react";

export type JieumVariant = "house" | "build" | "tier";

// 한옥 지붕 실루엣 (처마가 위로 들린 곡선 + 용마루)
function roofPath(cx: number, y: number, w: number): string {
  const e = 17;
  const u = 24;
  return [
    `M ${cx - w} ${y + e}`,
    `Q ${cx - w * 0.9} ${y + 4} ${cx - w * 0.4} ${y}`,
    `L ${cx + w * 0.4} ${y}`,
    `Q ${cx + w * 0.9} ${y + 4} ${cx + w} ${y + e}`,
    `Q ${cx + w + 1.5} ${y + e + 4} ${cx + w * 0.84} ${y + u}`,
    `Q ${cx} ${y + u - 8.5} ${cx - w * 0.84} ${y + u}`,
    `Q ${cx - w - 1.5} ${y + e + 4} ${cx - w} ${y + e}`,
    "Z",
  ].join(" ");
}

const RAINBOW_STOPS: Array<[string, string]> = [
  ["0%", "#EF6F63"],
  ["20%", "#E6A94F"],
  ["40%", "#5FB46B"],
  ["60%", "#45B4BD"],
  ["80%", "#5E9BD6"],
  ["100%", "#9A7BE0"],
];

type Props = {
  variant?: JieumVariant;
  size?: number;
  /** 단색(현재색)으로만 그린다 — 지붕도 currentColor. */
  mono?: boolean;
  /** 몸체(currentColor) 색. 기본 쪽빛 잉크. */
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** 주면 <title> 접근성 라벨, 없으면 aria-hidden. */
  title?: string;
};

export function JieumMark({
  variant = "house",
  size = 120,
  mono = false,
  color = "var(--jic)",
  className,
  style,
  title,
}: Props) {
  const gid = "jg-" + useId().replace(/:/g, "");
  const roofFill = mono ? "currentColor" : `url(#${gid})`;
  const svgStyle: CSSProperties = {
    color,
    flexShrink: 0,
    overflow: "visible",
    display: "block",
    ...style,
  };
  const a11y = title
    ? { role: "img" as const }
    : { "aria-hidden": true as const };

  const Defs = mono ? null : (
    <defs>
      <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
        {RAINBOW_STOPS.map(([o, c]) => (
          <stop key={o} offset={o} stopColor={c} />
        ))}
      </linearGradient>
    </defs>
  );

  // ── 변형 2 · 짓는 중 (상량 — 무지개 지붕을 올리는 순간) ──
  if (variant === "build") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={svgStyle} {...a11y}>
        {title && <title>{title}</title>}
        {Defs}
        <path d={roofPath(50, 6, 39)} fill={roofFill} />
        {/* 올리는 결 — 위로 향한 두 결 */}
        <path d="M 36 41 L 41 35 M 64 41 L 59 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />
        <rect x="22" y="44" width="56" height="5.5" rx="2.5" fill="currentColor" />
        <rect x="31" y="49" width="7.5" height="29" rx="2" fill="currentColor" />
        <rect x="61" y="49" width="7.5" height="29" rx="2" fill="currentColor" />
        <rect x="17" y="79" width="66" height="7" rx="2.5" fill="currentColor" />
      </svg>
    );
  }

  // ── 변형 3 · 누각 (처마가 겹친 2층) ──
  if (variant === "tier") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={svgStyle} {...a11y}>
        {title && <title>{title}</title>}
        {Defs}
        {/* 위층 */}
        <path d={roofPath(50, 6, 28)} fill={roofFill} />
        <rect x="32" y="29" width="36" height="4.5" rx="2" fill="currentColor" />
        <rect x="40" y="33" width="6" height="13" rx="2" fill="currentColor" />
        <rect x="54" y="33" width="6" height="13" rx="2" fill="currentColor" />
        {/* 아래층 */}
        <path d={roofPath(50, 44, 44)} fill={roofFill} />
        <rect x="20" y="68" width="60" height="5" rx="2.5" fill="currentColor" />
        <rect x="29" y="73" width="7" height="11" rx="2" fill="currentColor" />
        <rect x="64" y="73" width="7" height="11" rx="2" fill="currentColor" />
        <rect x="16" y="85" width="68" height="6" rx="2.5" fill="currentColor" />
      </svg>
    );
  }

  // ── 변형 1 · 한 채 (지어 선 한옥) ──
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={svgStyle} {...a11y}>
      {title && <title>{title}</title>}
      {Defs}
      <path d={roofPath(50, 15, 43)} fill={roofFill} />
      {/* 창방(보) */}
      <rect x="19" y="42" width="62" height="5.5" rx="2.5" fill="currentColor" />
      {/* 기둥 */}
      <rect x="30" y="47" width="7.5" height="31" rx="2" fill="currentColor" />
      <rect x="62.5" y="47" width="7.5" height="31" rx="2" fill="currentColor" />
      {/* 기단 */}
      <rect x="16" y="79" width="68" height="7" rx="2.5" fill="currentColor" />
    </svg>
  );
}
