// 특강 상세 — 인터랙티브 슬라이드 + archived 배너 + 신선도 경고 (스펙 3 §4-2~4-4)
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SlideDeck, Slide } from "@/components/SlideDeck";
import {
  Icon,
  CopyButton,
  TitleBlock,
  CardGridBlock,
  TimelineBlock,
  TabsBlock,
  AccordionBlock,
  TwoColumnListBlock,
  ResourceGridBlock,
  PromptGeneratorBlock,
} from "@/components/slide-blocks";
import { mdxElements } from "@/components/mdx-elements";
import { getSpecialBody } from "@/content/special-bodies";
import { nodeId } from "@/content/ontology";
import {
  getSpecialBySlug,
  getSpecials,
  getLessonBySlug,
  getInEdges,
  getOutEdges,
} from "@/lib/content";

export function generateStaticParams() {
  // archived 특강도 포함한다 — 외부 링크가 깨지지 않게 (스펙 §2-2).
  return getSpecials().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const special = getSpecialBySlug(slug);
  if (!special) return { title: "특강을 찾을 수 없습니다" };
  return {
    title: `${special.titleKo} · 특강`,
    description: special.summary,
  };
}

export default async function SpecialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const special = getSpecialBySlug(slug);
  if (!special) notFound();

  const Body = getSpecialBody(slug);
  if (!Body) notFound();

  const status = special.status ?? "published";
  const isArchived = status === "archived";
  const isStale = new Date(special.reviewBy).getTime() < Date.now();

  // 이 특강을 supersedes한 새 특강 (archived 배너용)
  const supersededBy = getInEdges(nodeId("special", slug), "supersedes")
    .map((e) => getSpecialBySlug(e.from.replace(/^special:/, "")))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // 이 특강이 deepens하는 항구적 레슨
  const deepenedLessons = getOutEdges(nodeId("special", slug), "deepens")
    .map((e) => getLessonBySlug(e.to.replace(/^lesson:/, "")))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const isExternal = special.kind === "external" && Boolean(special.source);

  return (
    <article className="lesson-reader" style={{ maxWidth: 880 }}>
      <p className="kicker">
        특강 · {isExternal ? "외부 큐레이션" : "내부 강의"} · {special.product}
      </p>
      <h1>{special.titleKo}</h1>
      <p className="lede">{special.summary}</p>
      <p
        className="mono"
        style={{ fontSize: 12, color: "var(--ink-3)", margin: "0 0 8px" }}
      >
        슬라이드 ~{special.estimatedMinutes}분 · 검토 시한 {special.reviewBy}
      </p>

      {isExternal && special.source && (
        <div
          style={{
            marginTop: 18,
            padding: "16px 20px",
            border: "1px solid var(--line)",
            borderLeft: "3px solid var(--ink)",
            borderRadius: "var(--r)",
            background: "var(--card)",
          }}
        >
          <div className="kicker" style={{ marginBottom: 6 }}>
            원전 — {special.source.medium === "video" ? "영상" :
                  special.source.medium === "lecture" ? "강의" :
                  special.source.medium === "paper" ? "논문" :
                  special.source.medium === "blog" ? "블로그" :
                  special.source.medium === "podcast" ? "팟캐스트" :
                  "콘퍼런스"}
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
            <strong>{special.source.author}</strong>
            {special.source.channel ? ` · ${special.source.channel}` : ""}
            {special.source.publishedAt ? ` · ${special.source.publishedAt}` : ""}
            <br />
            <a
              href={special.source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              {special.source.originalTitle}
            </a>
          </p>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 12,
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            이 슬라이드는 빌더 스쿨이 원전을 정리·시각화한 큐레이션입니다. thesis와 표현은 원전 화자의 것을 따릅니다.
          </p>
        </div>
      )}

      {isArchived && (
        <div
          className="callout"
          style={{ borderLeftColor: "var(--ink-3)", marginTop: 20 }}
        >
          <div className="kicker">보관된 특강</div>
          <p style={{ margin: 0 }}>
            이 특강은 최신 버전으로 대체되었습니다.
            {supersededBy.length > 0 && (
              <>
                {" "}
                최신 특강 —{" "}
                {supersededBy.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 && ", "}
                    <Link href={`/specials/${s.slug}`}>{s.titleKo}</Link>
                  </span>
                ))}
                .
              </>
            )}
          </p>
        </div>
      )}

      {!isArchived && isStale && (
        <div
          className="callout"
          style={{ borderLeftColor: "var(--ink-3)", marginTop: 20 }}
        >
          <div className="kicker">검토 시한이 지난 특강</div>
          <p style={{ margin: 0 }}>
            검토 시한({special.reviewBy})이 지났습니다. 제품·버전 정보가 현재
            시점과 다를 수 있어요. 곧 갱신하거나 보관할 예정입니다.
          </p>
        </div>
      )}

      <Body
        components={{
          SlideDeck,
          Slide,
          TitleBlock,
          CardGridBlock,
          TimelineBlock,
          TabsBlock,
          AccordionBlock,
          TwoColumnListBlock,
          ResourceGridBlock,
          PromptGeneratorBlock,
          Icon,
          CopyButton,
          ...mdxElements,
        }}
      />

      {deepenedLessons.length > 0 && (
        <div
          style={{
            marginTop: 36,
            padding: "20px 24px",
            border: "1px solid var(--line)",
            borderRadius: "var(--r)",
            background: "var(--card)",
          }}
        >
          <div className="kicker">이 특강이 심화하는 레슨</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0" }}>
            {deepenedLessons.map((l) => (
              <li key={l.slug} style={{ marginBottom: 6 }}>
                <Link href={`/lessons/${l.slug}`}>{l.titleKo}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          marginTop: 40,
          paddingTop: 28,
          borderTop: "1px solid var(--line)",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <Link href="/specials" className="btn ghost">
          전체 특강
        </Link>
      </div>
    </article>
  );
}
