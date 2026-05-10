// 검증 체크리스트를 클릭으로 토글하고 진행률을 localStorage 에 저장하는 클라이언트 컴포넌트.
"use client";

import { useLessonProgress } from "@/hooks/useLessonProgress";

type Props = {
  lessonId: string;
  items: string[];
};

export function VerificationChecklist({ lessonId, items }: Props) {
  const { mounted, getLessonChecks, toggleCheck } = useLessonProgress();
  const checked = mounted ? new Set(getLessonChecks(lessonId)) : new Set<number>();

  return (
    <ul className="checklist checklist--interactive">
      {items.map((item, i) => {
        const isOn = checked.has(i);
        return (
          <li
            key={i}
            className={isOn ? "checklist__item--done" : undefined}
          >
            <label>
              <input
                type="checkbox"
                checked={isOn}
                onChange={() => toggleCheck(lessonId, i)}
                suppressHydrationWarning
              />
              <span>{item}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
