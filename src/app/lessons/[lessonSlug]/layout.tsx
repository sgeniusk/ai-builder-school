// 레슨 페이지의 레이아웃 셸 — 사이드바를 layout 에 두면 lesson 이동 시 클라이언트 상태(여정/펼침)가 보존됨.
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LessonShell } from "@/components/LessonShell";
import { getLessonBySlug, getStageById } from "@/lib/content";

type Props = {
  children: ReactNode;
  params: Promise<{ lessonSlug: string }>;
};

export default async function LessonLayout({ children, params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLessonBySlug(lessonSlug);
  if (!lesson) notFound();
  const stage = lesson.stageId ? getStageById(lesson.stageId) : undefined;

  return (
    <LessonShell lesson={lesson} stage={stage}>
      {children}
    </LessonShell>
  );
}
