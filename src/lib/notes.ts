// 레슨 메모·책갈피 — localStorage에 저장한다 (SSR-safe).
// slug별로 자유 메모 + 책갈피 여부를 보관.
const KEY = "aibs:notes:v1";
export const NOTES_CHANGE = "aibs:notes:change";

export type LessonNote = { note: string; bookmarked: boolean };
export type NotesState = Record<string, LessonNote>;

export function readNotes(): NotesState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as NotesState;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function write(state: NotesState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(NOTES_CHANGE));
  } catch {
    // 용량 초과 등은 조용히 무시
  }
}

function entry(state: NotesState, slug: string): LessonNote {
  return state[slug] ?? { note: "", bookmarked: false };
}

/** 비어 있는(메모 없음·책갈피 안 함) 항목은 저장소에서 지운다. */
function prune(state: NotesState, slug: string): void {
  const e = state[slug];
  if (e && e.note.trim() === "" && !e.bookmarked) delete state[slug];
}

export function setLessonNote(slug: string, note: string): void {
  const state = readNotes();
  state[slug] = { ...entry(state, slug), note };
  prune(state, slug);
  write(state);
}

export function toggleBookmark(slug: string): void {
  const state = readNotes();
  const e = entry(state, slug);
  state[slug] = { ...e, bookmarked: !e.bookmarked };
  prune(state, slug);
  write(state);
}
