import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { SiteFooter, SiteHeader } from "@/components/Layout";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE_NAME, SITE_ORIGIN, SITE_URL } from "@/lib/site";
import { getLessons, getStages } from "@/lib/content";

// 카운트는 콘텐츠에서 파생한다 — Stage·레슨 수가 바뀌어도 메타 설명이 자동으로 맞춰진다.
const DESCRIPTION = `Codex와 Claude Code로 배우고, 만들고, 검증하고, 배포하는 한국어 기반 AI 실전 학교. ${getStages().length} Stage 역량 커리큘럼과 ${getLessons().length}개 레슨으로 구성됩니다.`;

export const metadata: Metadata = {
  // metadataBase는 호스트만 — basePath(/ai-builder-school)가 서브경로를 붙인다.
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "지음 · 쓰는 사람에서, 짓는 사람으로",
    template: "%s · 지음",
  },
  description: DESCRIPTION,
  keywords: [
    "지음",
    "Jieum",
    "지음 AI",
    "AI 빌더",
    "Codex",
    "Claude Code",
    "AI 교육",
    "프롬프트 엔지니어링",
    "RAG",
    "AI Agent",
    "AI 앱 개발",
  ],
  openGraph: {
    title: "지음 · 쓰는 사람에서, 짓는 사람으로",
    description:
      "쓰는 사람에서, 짓는 사람으로. 나를 알아주는 AI 곁에서 글·서비스·자동화를 한 채씩 짓는 한국어 실전 학교.",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "지음 · 쓰는 사람에서, 짓는 사람으로",
    description:
      "쓰는 사람에서, 짓는 사람으로. 나를 알아주는 AI 곁에서 글·서비스·자동화를 한 채씩 짓는 한국어 실전 학교.",
  },
};

// 운영자 학습 분석 — 도메인 env 가 설정됐을 때만 Plausible 을 켠다(미설정이면 추적 0, 무백엔드 유지).
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

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
        {/* 운영자 학습 분석 — Plausible (도메인 env 설정 시에만 활성, 쿠키리스·익명) */}
        {PLAUSIBLE_DOMAIN && (
          <>
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
            </Script>
            <Script
              defer
              data-domain={PLAUSIBLE_DOMAIN}
              src="https://plausible.io/js/script.js"
              strategy="afterInteractive"
            />
          </>
        )}
        <SiteChrome header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
