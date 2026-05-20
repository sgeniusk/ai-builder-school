// 특강 인덱스 — 게시 중인 특강 목록 + 보관 자료 토글 (스펙 3 §4-1)
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Sections";
import { getSpecials } from "@/lib/content";
import type { Special } from "@/lib/types";

export const metadata: Metadata = {
  title: "특강 · 제품·버전 동향",
  description:
    "AI 시장의 제품·버전 동향을 다루는 휘발성 특강. 원리는 레슨에, 빠르게 낡는 정보는 특강에 둡니다.",
};

/** reviewBy가 빌드 시점보다 과거이면 검토 시한이 지난 것이다. */
function isStale(reviewBy: string): boolean {
  return new Date(reviewBy).getTime() < Date.now();
}

function SpecialCard({ special }: { special: Special }) {
  const stale = isStale(special.reviewBy);
  return (
    <Link
      href={`/specials/${special.slug}`}
      className="card"
      style={{ display: "block", padding: "24px 26px", textDecoration: "none" }}
    >
      <div
        className="kicker mono"
        style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--ink-3)" }}
      >
        특강 · {special.product}
      </div>
      <h3
        style={{
          margin: "10px 0 8px",
          fontSize: 19,
          fontWeight: 600,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
        }}
      >
        {special.titleKo}
      </h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "var(--ink-3)" }}>
        {special.summary}
      </p>
      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          fontSize: 12,
        }}
      >
        <span className="chip">슬라이드 · {special.estimatedMinutes}분</span>
        <span className={`chip${stale ? " is-optional" : ""}`}>
          검토 시한 {special.reviewBy}
        </span>
      </div>
    </Link>
  );
}

export default function SpecialsPage() {
  const all = getSpecials();
  const published = all.filter((s) => (s.status ?? "published") !== "archived");
  const archived = all.filter((s) => s.status === "archived");

  return (
    <>
      <PageHead
        eyebrow={<>Specials · {published.length}</>}
        title={
          <>
            빠르게 낡는 건<br />
            특강에 둡니다.
          </>
        }
        lede="모델 출시, 컨퍼런스 발표, 신규 서비스 — 제품·버전에 묶인 정보는 6개월이면 낡습니다. 그래서 항구적 원리(레슨)와 분리해 검토 시한이 붙은 휘발성 특강으로 다룹니다."
      />

      <section className="sec">
        <Container>
          {published.length === 0 ? (
            <p style={{ color: "var(--ink-3)" }}>아직 게시된 특강이 없습니다.</p>
          ) : (
            <div className="proj-grid">
              {published.map((s) => (
                <SpecialCard key={s.id} special={s} />
              ))}
            </div>
          )}

          {archived.length > 0 && (
            <details style={{ marginTop: 40 }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: 14,
                  color: "var(--ink-3)",
                  fontWeight: 500,
                }}
              >
                보관 자료 · {archived.length}
              </summary>
              <div className="proj-grid" style={{ marginTop: 20 }}>
                {archived.map((s) => (
                  <SpecialCard key={s.id} special={s} />
                ))}
              </div>
            </details>
          )}
        </Container>
      </section>
    </>
  );
}
