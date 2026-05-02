import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteFooter, SiteHeader } from "@/components/Layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-builder-school.example.com"),
  title: {
    default: "AI Builder School · AI로 만드는 사람으로",
    template: "%s · AI Builder School",
  },
  description:
    "Codex와 Claude Code로 배우고, 만들고, 검증하고, 배포하는 한국어 기반 AI 실전 학교. 12 Phase 커리큘럼과 32+ 스타터 레슨으로 구성된 MVP.",
  keywords: [
    "AI Builder School",
    "AI 빌더 스쿨",
    "Codex",
    "Claude Code",
    "AI 교육",
    "프롬프트 엔지니어링",
    "RAG",
    "AI Agent",
    "AI 앱 개발",
  ],
  openGraph: {
    title: "AI Builder School",
    description:
      "AI를 쓰는 사람에서 AI로 만드는 사람으로. Codex/Claude Code 기반 한국어 실전 커리큘럼.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className="min-h-screen bg-paper text-ink antialiased"
        suppressHydrationWarning
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
