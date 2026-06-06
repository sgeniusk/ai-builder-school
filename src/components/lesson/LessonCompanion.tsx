// 우측 지음(知音) 컴패니언 — '되묻기 브리지'.
// 내 진도(useLessonProgress)·노트(useNotes)·여정을 알고 맥락 인사를 건네고,
// '되묻기' 칩이 레슨 맥락을 담은 프롬프트를 만들어 내 AI 도구로 복사·전달한다.
"use client";

import { useMemo, useState } from "react";
import type { Journey, Lesson } from "@/lib/types";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useNotes } from "@/hooks/useNotes";
import { JieumMark } from "../brand/JieumMark";
import {
  buildHandoffPrompt,
  buildQuestionChips,
  chatgptUrl,
  claudeUrl,
} from "@/lib/companion";

type Props = { lesson: Lesson; journeys: Journey[] };

function greeting(journeyKo: string | undefined, pct: number, lesson: Lesson, hasNote: boolean): string {
  const j = journeyKo ? `${journeyKo} 여정 · ` : "";
  const m = lesson.deliverable?.title;
  if (hasNote) {
    return `${j}잘 오고 있어요. 적어둔 메모 기억나죠 — 그걸로 ‘${lesson.titleKo}’를 같이 마저 지어볼까요?`;
  }
  if (pct >= 100) {
    return `‘${lesson.titleKo}’ 다 지었네요. 한 번 되짚어볼까요, 아니면 다음 한 채로 갈까요?`;
  }
  if (pct > 0) {
    return `${j}이 레슨 ${pct}%까지 왔어요.${m ? ` 오늘 손에 남길 건 ‘${m}’.` : ""} 어디가 제일 걸려요?`;
  }
  return `${j}‘${lesson.titleKo}’ 시작해요.${m ? ` 오늘 손에 남길 건 ‘${m}’예요.` : ""} 무엇부터 같이 해볼까요?`;
}

export function LessonCompanion({ lesson, journeys }: Props) {
  const { mounted, journey, getWeightedPct } = useLessonProgress();
  const { notes } = useNotes();
  const note = notes[lesson.slug]?.note ?? "";
  const hasNote = note.trim().length > 0;
  const journeyKo =
    (mounted && journeys.find((j) => j.id === journey)?.titleKo) || undefined;
  const pct = mounted ? getWeightedPct(lesson) : 0;

  const chips = useMemo(() => buildQuestionChips(lesson, hasNote), [lesson, hasNote]);
  const [active, setActive] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const prompt = active
    ? buildHandoffPrompt({ lesson, journeyKo, note, question: active })
    : "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // 클립보드 차단 환경 — 미리보기 텍스트를 직접 선택해 복사할 수 있다.
    }
  }

  return (
    <aside className="companion" aria-label="지음 컴패니언">
      <div className="companion__head">
        <span className="companion__avatar" aria-hidden>
          <JieumMark variant="house" size={22} color="#FAF9F6" />
        </span>
        <div className="companion__id">
          <div className="companion__name">
            지음 <span className="companion__hanja">知音</span>
          </div>
          <div className="companion__role mono">나를 알아주는 벗 · 곁에서</div>
        </div>
        <span className="companion__live" aria-hidden />
      </div>

      <div className="companion__body">
        <p className="companion__greet" suppressHydrationWarning>
          {greeting(journeyKo, pct, lesson, hasNote)}
        </p>

        <div className="companion__hint mono">되묻기로 시작해요</div>
        <div className="companion__chips">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              className={"companion__chip" + (active === c ? " is-active" : "")}
              onClick={() => {
                setActive(c);
                setCopied(false);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {active && (
          <div className="companion__handoff">
            <div className="companion__hint mono">지음에게 보낼 말 — 내 AI로 이어가요</div>
            <pre className="companion__prompt">{prompt}</pre>
            <div className="companion__actions">
              <a
                className="companion__btn companion__btn--jic"
                href={claudeUrl(prompt)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={copy}
              >
                Claude로 열기 ↗
              </a>
              <a
                className="companion__btn"
                href={chatgptUrl(prompt)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={copy}
              >
                ChatGPT ↗
              </a>
              <button type="button" className="companion__btn" onClick={copy}>
                {copied ? "복사됨 ✓" : "복사"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="companion__foot mono">
        열면 자동 복사돼요 — 붙여넣기만. 지음은 내 진도·말투·목표를 알아요.
      </div>
    </aside>
  );
}
