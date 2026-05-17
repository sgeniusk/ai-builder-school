// 빌더 카드 공유 버튼 — 진척을 PNG로 그려 공유(모바일) 또는 다운로드.
"use client";

import { useState } from "react";
import { drawBuilderCard, type BuilderCardData } from "@/lib/builderCard";

export function ShareCardButton(props: BuilderCardData) {
  const [status, setStatus] = useState<"idle" | "busy" | "done">("idle");

  async function handleShare() {
    setStatus("busy");
    try {
      // 폰트 로드가 끝난 뒤 그려야 한글이 깨지지 않는다.
      if (document.fonts?.ready) await document.fonts.ready;
      const canvas = document.createElement("canvas");
      drawBuilderCard(canvas, props);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) {
        setStatus("idle");
        return;
      }
      const file = new File([blob], "ai-builder-card.png", {
        type: "image/png",
      });

      // 모바일 — 파일 공유가 가능하면 공유 시트를 띄운다.
      const nav = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean;
      };
      if (nav.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "내 AI Builder 카드",
        });
      } else {
        // 데스크톱 — 다운로드
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ai-builder-card.png";
        a.click();
        URL.revokeObjectURL(url);
      }
      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      // 공유 취소 등은 조용히 무시
      setStatus("idle");
    }
  }

  return (
    <button
      type="button"
      className="btn ghost"
      onClick={handleShare}
      disabled={status === "busy"}
    >
      {status === "busy"
        ? "카드 만드는 중…"
        : status === "done"
          ? "완료 ✓"
          : "빌더 카드 공유"}
    </button>
  );
}
