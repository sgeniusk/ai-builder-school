// 레슨 메모·책갈피를 읽는 클라이언트 훅 (SSR-safe).
"use client";

import { useEffect, useState } from "react";
import { NOTES_CHANGE, readNotes, type NotesState } from "@/lib/notes";

export function useNotes(): { mounted: boolean; notes: NotesState } {
  const [notes, setNotes] = useState<NotesState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const update = () => setNotes(readNotes());
    update();
    setMounted(true);
    window.addEventListener(NOTES_CHANGE, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(NOTES_CHANGE, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return { mounted, notes };
}
