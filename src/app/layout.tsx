import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteFooter, SiteHeader } from "@/components/Layout";
import { SITE_NAME, SITE_ORIGIN, SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Codex와 Claude Code로 배우고, 만들고, 검증하고, 배포하는 한국어 기반 AI 실전 학교. 8 Stage 사다리 커리큘럼과 84개 레슨으로 구성됩니다.";

export const metadata: Metadata = {
  // metadataBase는 호스트만 — basePath(/ai-builder-school)가 서브경로를 붙인다.
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "AI Builder School · AI로 만드는 사람으로",
    template: "%s · AI Builder School",
  },
  description: DESCRIPTION,
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
    title: "AI Builder School · AI로 만드는 사람으로",
    description:
      "AI를 쓰는 사람에서 AI로 만드는 사람으로. Codex/Claude Code 기반 한국어 실전 커리큘럼.",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Builder School · AI로 만드는 사람으로",
    description:
      "AI를 쓰는 사람에서 AI로 만드는 사람으로. Codex/Claude Code 기반 한국어 실전 커리큘럼.",
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
        {/* no-FOUC — paint 전에 테마를 결정해 깜박임을 막는다. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();",
          }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
