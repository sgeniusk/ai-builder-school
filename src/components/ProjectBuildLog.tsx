// 프로젝트 완성 기록 — "지었어요" 체크 + 결과물 링크 + 한 줄 회고. usePortfolio 에 저장돼 /me 포트폴리오에 전시.
"use client";

import { useEffect, useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";

export function ProjectBuildLog({ slug }: { slug: string }) {
  const { mounted, getEntry, setEntry } = usePortfolio();
  const entry = getEntry(slug);
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  // 저장된 값이 로드되면 입력 필드를 동기화 (원시값 deps라 무한 루프 없음)
  useEffect(() => {
    setUrl(entry.url ?? "");
    setNote(entry.note ?? "");
  }, [entry.url, entry.note]);

  if (!mounted) {
    return <div className="build-log build-log--skeleton" aria-hidden />;
  }

  return (
    <div className={`build-log${entry.built ? " is-built" : ""}`}>
      <label className="build-log__toggle">
        <input
          type="checkbox"
          checked={entry.built}
          onChange={(e) => setEntry(slug, { built: e.target.checked })}
          suppressHydrationWarning
        />
        <span>이 프로젝트, 지었어요</span>
      </label>

      {entry.built && (
        <div className="build-log__fields">
          <label className="build-log__field">
            <span className="build-log__label">결과물 링크 (배포 URL 또는 저장소)</span>
            <input
              type="url"
              className="build-log__input"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => setEntry(slug, { url: url.trim() || undefined })}
            />
          </label>
          <label className="build-log__field">
            <span className="build-log__label">한 줄 회고 (선택)</span>
            <input
              type="text"
              className="build-log__input"
              placeholder="만들며 배운 것, 다음에 가져갈 것"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => setEntry(slug, { note: note.trim() || undefined })}
            />
          </label>
          {entry.builtAt && (
            <p className="build-log__date">
              {entry.builtAt.slice(0, 10)} 완성 기록 · /me 포트폴리오에 전시됩니다
            </p>
          )}
        </div>
      )}
    </div>
  );
}
