import Link from "next/link";
import { Container } from "@/components/Layout";

export default function NotFound() {
  return (
    <section className="sec" style={{ textAlign: "center" }}>
      <Container>
        <p className="eyebrow">404</p>
        <h1
          style={{
            marginTop: 8,
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
          }}
        >
          해당 페이지를 찾지 못했습니다.
        </h1>
        <p style={{ marginTop: 12, fontSize: 15, color: "var(--ink-3)" }}>
          URL이 오래되었거나 콘텐츠가 이동했을 수 있습니다.
        </p>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href="/" className="btn">
            홈으로 <span className="arrow">→</span>
          </Link>
          <Link href="/stages" className="btn ghost">
            커리큘럼 보기
          </Link>
        </div>
      </Container>
    </section>
  );
}
