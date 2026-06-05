// 전역 사이트 크롬 게이트 — 레슨 콘솔(/lessons/*)에서는 헤더·푸터를 숨겨
// 레슨 전용 상단바가 풀-콘솔로 자리잡게 한다. 그 외 경로는 평소대로.
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isConsole = pathname?.startsWith("/lessons/") ?? false;
  return (
    <>
      {!isConsole && header}
      <main>{children}</main>
      {!isConsole && footer}
    </>
  );
}
