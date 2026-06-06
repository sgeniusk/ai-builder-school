// 링크 미리보기(OG·Twitter) 카드 — 빌드 시 1200×630 PNG로 생성된다.
// D 시안(무지개 지붕 한옥, 오른쪽)을 배경으로 깔고 왼쪽 여백에 텍스트.
// next/og 기본 폰트는 한글을 못 그리므로 렌더 문구는 라틴 문자만 쓴다(한글은 alt에만).
import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// output: export(GitHub Pages) 빌드에서 빌드 타임 정적 생성하도록 강제.
export const dynamic = "force-static";

export const alt = "지음 (Jieum) — 쓰는 사람에서, 짓는 사람으로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 빌드 타임에 한옥 시안을 인라인(data URI)으로 읽는다.
const ogBg = readFileSync(join(process.cwd(), "public/landing/og-hanok.jpg"));
const ogBgUri = `data:image/jpeg;base64,${ogBg.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", position: "relative", fontFamily: "sans-serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogBgUri}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "60%",
            padding: "74px 78px",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 9, color: "#3A4D6E", textTransform: "uppercase" }}>
            JIEUM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 82, fontWeight: 700, color: "#1B2B47", lineHeight: 1.08 }}>
              From writer,
            </div>
            <div style={{ display: "flex", fontSize: 82, fontWeight: 700, color: "#1B2B47", lineHeight: 1.08 }}>
              to builder.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 25,
              color: "#3A4D6E",
              borderTop: "2px solid #1B2B47",
              paddingTop: 24,
            }}
          >
            <div style={{ display: "flex" }}>Build anything, with AI</div>
            <div style={{ display: "flex", color: "#9FB0CE" }}>·</div>
            <div style={{ display: "flex" }}>Codex &amp; Claude Code</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
