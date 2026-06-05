// 링크 미리보기(OG·Twitter) 카드 — 빌드 시 1200×630 PNG로 생성된다.
// next/og 기본 폰트는 한글을 렌더하지 못하므로 카드 문구는 라틴 문자만 쓴다.
import { ImageResponse } from "next/og";

// output: export(GitHub Pages) 빌드에서 빌드 타임 정적 생성하도록 강제.
export const dynamic = "force-static";

export const alt = "지음 (Jieum) — 쓰는 사람에서, 짓는 사람으로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f3",
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 9,
            color: "#6b6b6b",
            textTransform: "uppercase",
          }}
        >
          JIEUM
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.08,
            }}
          >
            From AI user,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.08,
            }}
          >
            to AI builder.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 27,
            color: "#4a4a4a",
            borderTop: "2px solid #1a1a1a",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>8 Stages</div>
          <div style={{ display: "flex", color: "#b0ada4" }}>/</div>
          <div style={{ display: "flex" }}>84 Lessons</div>
          <div style={{ display: "flex", color: "#b0ada4" }}>/</div>
          <div style={{ display: "flex" }}>Codex &amp; Claude Code</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
