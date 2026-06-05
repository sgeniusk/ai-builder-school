// 지음 컴패니언 — '되묻기 브리지'. 레슨 맥락(+ 내 진도·노트·여정)을 담은 프롬프트를
// 만들어 학습자의 AI 도구(claude.ai / ChatGPT)로 복사·전달한다. 백엔드·API 키 없음.
import type { Lesson } from "@/lib/types";

export type HandoffInput = {
  lesson: Lesson;
  journeyKo?: string;
  note?: string;
  question: string;
};

function firstLine(s: string): string {
  const t = s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)[0];
  return (t ?? s).replace(/^\d+\.\s*/, "").slice(0, 200);
}

/** 외부 AI가 '지음'처럼 나를 알고 함께 짓도록 만드는 한국어 프롬프트. */
export function buildHandoffPrompt({ lesson, journeyKo, note, question }: HandoffInput): string {
  const mission = lesson.mission ?? lesson.claudeCodeMission;
  const lines: string[] = [
    "너는 '지음(知音)'이야 — 나를 알아주는 학습 짝꿍.",
    "지금 아래 레슨을 나와 함께 보고 있어. 정답을 받아쓰게 하지 말고, 내가 직접 짓도록 한 걸음씩 같이 가줘. 짧고 단단하게, 한국어로.",
    "",
    "[레슨]",
    `· 제목: ${lesson.titleKo}`,
  ];
  if (lesson.hook || lesson.summary) lines.push(`· 한 줄: ${lesson.hook ?? lesson.summary}`);
  if (journeyKo) lines.push(`· 내 여정: ${journeyKo}`);
  if (mission) lines.push(`· 오늘 미션: ${firstLine(mission)}`);
  if (lesson.deliverable?.title) lines.push(`· 손에 남길 것: ${lesson.deliverable.title}`);
  if (note && note.trim()) {
    lines.push("", "[내가 적어둔 메모]", note.trim());
  }
  lines.push("", "[되묻기]", question);
  return lines.join("\n");
}

/** 레슨에서 '되묻기' 칩 후보를 만든다 (내 노트 유무에 따라 가감). */
export function buildQuestionChips(lesson: Lesson, hasNote: boolean): string[] {
  const chips: string[] = [];
  if (lesson.deliverable?.title) chips.push(`오늘 미션 같이 시작하자`);
  for (const q of (lesson.reflectionQuestions ?? []).slice(0, 2)) chips.push(q);
  if (hasNote) chips.push("내 메모 이어서 다듬자");
  chips.push("이 레슨, 한마디로 정리해줘");
  chips.push("내가 약한 곳부터 짚어줘");
  // 중복 제거 + 최대 5개
  return Array.from(new Set(chips)).slice(0, 5);
}

export function claudeUrl(prompt: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}

export function chatgptUrl(prompt: string): string {
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}
