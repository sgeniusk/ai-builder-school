// 레슨 메모·책갈피 — 레슨 페이지 하단에 붙는 클라이언트 블록.
// 자유 메모(자동 저장)와 책갈피 토글. localStorage 기반.
"use client";

import { useEffect, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { setLessonNote, toggleBookmark } from "@/lib/notes";

export function LessonNotes({ slug }: { slug: string }) {
  const { mounted, notes } = useNotes();
  const bookmarked = notes[slug]?.bookmarked ?? false;
  const [draft, setDraft] = useState("");
  const [synced, setSynced] = useState(false);

  // 최초 1회 — 저장된 메모를 입력창에 반영
  useEffect(() => {
    if (mounted && !synced) {
      setDraft(notes[slug]?.note ?? "");
      setSynced(true);
    }
  }, [mounted, synced, notes, slug]);

  // 입력 후 600ms 멈추면 자동 저장
  useEffect(() => {
    if (!synced) return;
    const t = window.setTimeout(() => setLessonNote(slug, draft), 600);
    return () => window.clearTimeout(t);
  }, [draft, synced, slug]);

  if (!mounted) {
    return <div className="lesson-notes" aria-hidden />;
  }

  return (
    <div className="lesson-notes">
      <div className="lesson-notes__head">
        <span className="kicker">내 메모</span>
        <button
          type="button"
          className={`lesson-notes__bm${bookmarked ? " is-on" : ""}`}
          onClick={() => toggleBookmark(slug)}
          aria-pressed={bookmarked}
        >
          {bookmarked ? "★ 책갈피됨" : "☆ 책갈피"}
        </button>
      </div>
      <textarea
        className="lesson-notes__area"
        placeholder="이 레슨에서 기억할 것, 내 맥락에 적용할 점을 적어두세요. 자동 저장됩니다."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => setLessonNote(slug, draft)}
        rows={4}
      />
    </div>
  );
}
