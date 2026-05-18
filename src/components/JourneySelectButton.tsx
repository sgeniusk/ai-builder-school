// /journeys 페이지의 "이 여정으로 시작" 버튼 — localStorage 의 현재 여정을 갱신.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLessonProgress } from "@/hooks/useLessonProgress";

type Props = {
  journeyId: string;
  /** 여정 선택 후 이동할 첫 lesson 의 slug. 없으면 페이지 이동 안 함. */
  firstLessonSlug?: string;
};

export function JourneySelectButton({ journeyId, firstLessonSlug }: Props) {
  const { mounted, journey, setJourney } = useLessonProgress();
  const router = useRouter();
  const [justSet, setJustSet] = useState(false);

  const isActive = mounted && journey === journeyId;

  const handleClick = () => {
    setJourney(journeyId);
    setJustSet(true);
    if (firstLessonSlug) {
      router.push(`/lessons/${firstLessonSlug}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn ${isActive ? "" : "ghost"}`.trim()}
      style={{ marginTop: 16 }}
    >
      {justSet
        ? "여정 선택 완료"
        : isActive
          ? "이 여정 이어가기"
          : firstLessonSlug
            ? "이 여정으로 시작"
            : "이 여정 선택"}
      <span className="arrow">→</span>
    </button>
  );
}
