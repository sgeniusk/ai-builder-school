import Link from "next/link";
import type { ReactNode } from "react";
import { CharacterChrome } from "./CharacterChrome";
import { ThemeToggle } from "./ThemeToggle";
import { SiteSearch, type SearchItem } from "./SiteSearch";
import {
  getJourneys,
  getLessons,
  getProjects,
  getStages,
  getTemplates,
} from "@/lib/content";

/** 검색 인덱스 — 서버에서 한 번 만들어 SiteSearch 클라이언트로 넘긴다. */
function buildSearchIndex(): SearchItem[] {
  return [
    ...getStages().map((s) => ({
      type: "Stage",
      title: `Stage ${s.order} · ${s.label}`,
      subtitle: s.shortDescription,
      href: `/stages/${s.slug}`,
      keywords:
        `${s.label} ${s.titleKo} ${s.titleEn} ${s.shortDescription} ${s.topics.join(" ")}`.toLowerCase(),
    })),
    ...getLessons().map((l) => ({
      type: "레슨",
      title: l.titleKo,
      subtitle: l.summary,
      href: `/lessons/${l.slug}`,
      keywords:
        `${l.titleKo} ${l.titleEn} ${l.summary} ${l.tags.join(" ")}`.toLowerCase(),
    })),
    ...getProjects().map((p) => ({
      type: "프로젝트",
      title: p.title,
      subtitle: p.hook,
      href: `/projects/${p.slug}`,
      keywords:
        `${p.title} ${p.hook} ${p.summary} ${p.suggestedStack.join(" ")}`.toLowerCase(),
    })),
    ...getJourneys().map((j) => ({
      type: "여정",
      title: j.titleKo,
      subtitle: j.identity,
      href: `/journeys/${j.id}`,
      keywords:
        `${j.titleKo} ${j.title} ${j.identity} ${j.targetLearner}`.toLowerCase(),
    })),
    ...getTemplates().map((t) => ({
      type: "템플릿",
      title: t.title,
      subtitle: t.summary,
      href: "/templates",
      keywords: `${t.title} ${t.summary} ${t.tags.join(" ")}`.toLowerCase(),
    })),
  ];
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`wrap ${className}`}>{children}</div>;
}

const navLinks = [
  { href: "/stages", label: "커리큘럼" },
  { href: "/journeys", label: "여정" },
  { href: "/projects", label: "프로젝트" },
  { href: "/templates", label: "템플릿" },
  { href: "/about", label: "소개" },
];

export function SiteHeader() {
  const searchIndex = buildSearchIndex();
  return (
    <header className="site-header">
      <Container>
        <div className="row">
          <Link href="/" className="brand">
            <span aria-hidden className="brand-mark" />
            <span className="brand-text-hide-sm">AI Builder School</span>
          </Link>
          <nav className="nav" aria-label="주요 메뉴">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="site-header__right">
            <SiteSearch index={searchIndex} />
            <ThemeToggle />
            <Link href="/start" className="btn">
              학습 시작 <span className="arrow">→</span>
            </Link>
            <CharacterChrome />
          </div>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
          }}
          className="footer-cols"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span aria-hidden className="brand-mark" />
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
                AI Builder School
              </span>
            </div>
            <p
              style={{
                marginTop: 16,
                maxWidth: 360,
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--ink-3)",
              }}
            >
              Codex와 Claude Code로 배우고, 만들고, 검증하고, 배포하는 AI 실전 학교.
              한국어 기반, 빌더 중심, 과장 없이.
            </p>
          </div>
          <FooterCol
            title="학습"
            links={[
              { href: "/start", label: "학습 시작" },
              { href: "/stages", label: "커리큘럼" },
              { href: "/journeys", label: "여정" },
              { href: "/projects", label: "프로젝트" },
            ]}
          />
          <FooterCol
            title="자료"
            links={[
              { href: "/templates", label: "템플릿" },
              { href: "/about", label: "소개" },
            ]}
          />
          <FooterCol
            title="원칙"
            links={[
              { href: "/about", label: "빌더 중심" },
              { href: "/about", label: "도구 중립" },
              { href: "/about", label: "과장 금지" },
            ]}
          />
        </div>
        <div
          style={{
            marginTop: 48,
            paddingTop: 20,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: "var(--ink-3)",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span>© {new Date().getFullYear()} AI Builder School</span>
          <span className="mono" style={{ fontSize: 12, color: "var(--ink-4)" }}>
            v0.5 · calm editorial
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h4 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
        {title}
      </h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 10,
          fontSize: 14,
          color: "var(--ink-3)",
        }}
      >
        {links.map((l) => (
          <li key={`${l.href}-${l.label}`}>
            <Link href={l.href} style={{ color: "inherit" }} className="footer-link">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
