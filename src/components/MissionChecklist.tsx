// 미션의 1·2·3 과제를 콜아웃 안에서 바로 체크할 수 있게 렌더링하는 컴포넌트.
// page.tsx 가 mission 문자열을 파싱해 {title, detail} 배열로 넘겨주면, build 섹션 진행률과 연동된다.
"use client";

import { useLessonProgress } from "@/hooks/useLessonProgress";

export type MissionTask = { title: string; detail: string };

export function MissionChecklist({
  lessonId,
  tasks,
}: {
  lessonId: string;
  tasks: MissionTask[];
}) {
  const { mounted, getSectionChecks, toggleCheck } = useLessonProgress();
  const checked = mounted
    ? new Set(getSectionChecks(lessonId, "build"))
    : new Set<number>();

  return (
    <ol className="mission-tasks">
      {tasks.map((task, i) => {
        const isOn = checked.has(i);
        return (
          <li key={i} className={isOn ? "mission-tasks__item--done" : undefined}>
            <label>
              <input
                type="checkbox"
                checked={isOn}
                onChange={() => toggleCheck(lessonId, "build", i)}
                suppressHydrationWarning
              />
              <span className="mission-tasks__num mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mission-tasks__body">
                <span className="mission-tasks__title">{task.title}</span>
                {task.detail && (
                  <span className="mission-tasks__detail">{task.detail}</span>
                )}
              </span>
            </label>
          </li>
        );
      })}
    </ol>
  );
}
