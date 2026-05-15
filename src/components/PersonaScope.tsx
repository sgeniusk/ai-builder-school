// 자식 트리에 .p-{journeyId} 클래스를 적용해 persona 색 변수를 흘려보내는 클라이언트 래퍼.
"use client";

import type { ReactNode } from "react";
import { useLessonProgress } from "@/hooks/useLessonProgress";

const DEFAULT_PERSONA = "practitioner";

export function PersonaScope({ children }: { children: ReactNode }) {
  const { mounted, journey } = useLessonProgress();
  const personaId = mounted ? journey ?? DEFAULT_PERSONA : DEFAULT_PERSONA;
  return <div className={`persona-scope p-${personaId}`}>{children}</div>;
}
