// 본문의 빌드 / 검증 / 회고 섹션을 인터랙티브 체크박스로 렌더링하는 제네릭 컴포넌트.
"use client";

import type { Section } from "@/hooks/useLessonProgress";
import { useLessonProgress } from "@/hooks/useLessonProgress";

type Props = {
  lessonId: string;
  section: Section;
  items: string[];
  /** 항목 앞에 표시할 카운트 양식 (ol or ul). 기본 ul. */
  ordered?: boolean;
};

export function SectionChecklist({
  lessonId,
  section,
  items,
  ordered = false,
}: Props) {
  const { mounted, getSectionChecks, toggleCheck } = useLessonProgress();
  const checked = mounted
    ? new Set(getSectionChecks(lessonId, section))
    : new Set<number>();

  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag className={`checklist--interactive checklist--${section}`}>
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
                onChange={() => toggleCheck(lessonId, section, i)}
                suppressHydrationWarning
              />
              {ordered && (
                <span className="checklist--interactive__num mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span>{item}</span>
            </label>
          </li>
        );
      })}
    </Tag>
  );
}
