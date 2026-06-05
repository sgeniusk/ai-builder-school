// '지음' 워드마크 + 락업 — 심볼 · 워드마크 · 로마자 'Jieum' 조합.
// Wordmark: treatment 'sans' | 'serif' | 'brush'. Lockup: 가로(H)·세로(V).
import type { CSSProperties } from "react";
import { JieumMark, type JieumVariant } from "./JieumMark";

type WordmarkProps = {
  treatment?: "sans" | "serif" | "brush";
  size?: number;
  color?: string;
};

export function Wordmark({ treatment = "sans", size = 64, color = "var(--jic)" }: WordmarkProps) {
  const common: CSSProperties = {
    color,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontSize: size,
    display: "inline-block",
  };
  if (treatment === "serif") {
    return (
      <span style={{ ...common, fontFamily: "var(--f-serif)", fontWeight: 600, letterSpacing: "-0.02em" }}>
        지음
      </span>
    );
  }
  if (treatment === "brush") {
    // 절제된 손맛 — '음' 받침 아래 한 획만 붓결 악센트
    return (
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={{ ...common, fontFamily: "var(--f-body)", fontWeight: 700 }}>지음</span>
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: "52%",
            bottom: -size * 0.07,
            width: size * 0.46,
            height: Math.max(2, size * 0.05),
            borderRadius: 999,
            background: "var(--rainbow-line)",
            transform: "rotate(-1.5deg)",
          }}
        />
      </span>
    );
  }
  return <span style={{ ...common, fontFamily: "var(--f-body)", fontWeight: 700 }}>지음</span>;
}

export function Roman({ size = 13, color = "var(--ink-3)", weight = 500 }: { size?: number; color?: string; weight?: number }) {
  return (
    <span
      style={{
        fontFamily: "var(--f-mono)",
        fontSize: size,
        fontWeight: weight,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
      }}
    >
      Jieum
    </span>
  );
}

type LockupProps = {
  variant?: JieumVariant;
  treatment?: "sans" | "serif" | "brush";
  scale?: number;
  showRoman?: boolean;
  color?: string;
  /** 심볼 몸체 색(다크 칩 위 등에서 밝게). 기본은 color 와 동일 톤. */
  markColor?: string;
};

// 가로형 락업 — 심볼 · 지음 · (옵션) Jieum 보조
export function LockupH({ variant = "house", treatment = "sans", scale = 1, showRoman = true, color = "var(--jic)", markColor }: LockupProps) {
  const m = 52 * scale;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 * scale }}>
      <JieumMark variant={variant} size={m} color={markColor} title="지음" />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 * scale }}>
        <Wordmark treatment={treatment} size={42 * scale} color={color} />
        {showRoman && <Roman size={11 * scale} />}
      </div>
    </div>
  );
}

// 세로형 락업
export function LockupV({ variant = "house", treatment = "sans", scale = 1, showRoman = true, color = "var(--jic)", markColor }: LockupProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 * scale }}>
      <JieumMark variant={variant} size={60 * scale} color={markColor} title="지음" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 * scale }}>
        <Wordmark treatment={treatment} size={40 * scale} color={color} />
        {showRoman && <Roman size={11 * scale} />}
      </div>
    </div>
  );
}
