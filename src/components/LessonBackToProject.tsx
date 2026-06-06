// 레슨 → 프로젝트 복귀 CTA. ?from=<projectSlug>를 클라이언트에서 읽어(정적 export 호환)
// 막혀서 들어온 프로젝트로 돌아가는 길을 띄운다. Suspense로 감싸 사용한다.
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getProjectBySlug } from "@/lib/content";

export function LessonBackToProject() {
  const from = useSearchParams().get("from");
  const project = from ? getProjectBySlug(from) : undefined;
  if (!project) return null;
  return (
    <Link href={`/projects/${project.slug}`} className="btn">
      ↩ 〈{project.title}〉로 돌아가기
    </Link>
  );
}
