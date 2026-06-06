import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Sections";
import { getJourneys, getProjectsByJourney } from "@/lib/content";
import { JOURNEY_LABEL, JOURNEY_LABEL_KO } from "@/lib/types";

export const metadata: Metadata = {
  title: "학습 시작 · 내 여정 찾기",
  description:
    "30초면 충분해요. 6개 여정 중 지금 가장 가까운 하나를 고르면, 그 여정의 모험이 시작돼요.",
};

// 산출물-우선 진단 — "무엇을 만들고 싶은가"에서 바로 프로젝트로. 색은 관련 여정 테마 재사용.
const BUILD_GOALS: { label: string; desc: string; projectSlug: string; color: string }[] = [
  { label: "반복 업무 자동화", desc: "매주 쓰는 보고서·회의록을 AI 파이프라인으로", projectSlug: "weekly-report-autopilot", color: "practitioner" },
  { label: "콘텐츠 더 빠르게", desc: "글 하나를 쇼츠·뉴스레터로 자동 재가공", projectSlug: "blog-to-shortform", color: "creator" },
  { label: "내 문서에 답하는 봇", desc: "PDF·노트에 자연어로 묻고 출처와 함께 답받기", projectSlug: "document-qa-bot", color: "engineer" },
  { label: "작은 AI 제품 출시", desc: "한 직군의 불편을 푸는 GPT 래퍼를 시장에", projectSlug: "gpt-wrapper-product", color: "founder" },
];

export default function StartPage() {
  const journeys = getJourneys();

  return (
    <>
      <PageHead
        eyebrow={<>Start · 30초 진단</>}
        title={<>무엇을 만들지부터,<br />아니면 내 역할부터.</>}
        lede="만들고 싶은 것 하나를 고르면 바로 그 프로젝트에서 출발해요. 아직 모르겠으면 지금 역할로 골라도 돼요. 도중에 길이 바뀌어도 다시 고르면 됩니다."
      />

      <section className="sec">
        <Container>
          <div className="quiz-card">
            <h2>무엇을 만들고 싶어요?</h2>
            <p className="sub">지금 가장 끌리는 것 하나만. 고르면 그 프로젝트에서 바로 출발해요 — 도중에 바꿔도 됩니다.</p>
            <div className="quiz-options">
              {BUILD_GOALS.map((g) => (
                <Link key={g.projectSlug} href={`/projects/${g.projectSlug}`} className={`p-${g.color}`}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span aria-hidden className="p-mark" style={{ width: 22, height: 22 }} />
                    <div>
                      <strong><span className="p-text">{g.label}</span></strong>
                      <small>{g.desc}</small>
                    </div>
                  </div>
                  <span className="arrow mono">→</span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="quiz-card">
            <div className="quiz-progress">
              <span className="done" />
              <span />
            </div>
            <h2>또는, 지금 내 역할로 고르기</h2>
            <p className="sub">한 가지를 고르면 그 여정의 모험 페이지로 가요.</p>
            <div className="quiz-options">
              {journeys.map((j) => {
                return (
                  <Link
                    key={j.id}
                    href={`/journeys/${j.id}`}
                    className={`p-${j.id}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span
                        aria-hidden
                        className="p-mark"
                        style={{ width: 22, height: 22 }}
                      />
                      <div>
                        <strong>
                          <span className="p-text">{JOURNEY_LABEL[j.id]}</span>
                          <span
                            style={{
                              color: "var(--ink-3)",
                              fontWeight: 400,
                              marginLeft: 8,
                            }}
                          >
                            · {JOURNEY_LABEL_KO[j.id]}
                          </span>
                        </strong>
                        <small>{j.identity} — {j.targetLearner}</small>
                        {(() => {
                          const builds = getProjectsByJourney(j.id).slice(0, 2);
                          if (builds.length === 0) return null;
                          return (
                            <small className="quiz-build">
                              <span className="quiz-build__tag">만들 것</span>
                              {builds.map((p) => p.title).join(" · ")}
                            </small>
                          );
                        })()}
                      </div>
                    </div>
                    <span className="arrow mono">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="sec">
        <Container>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Already know?</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
          >
            여정이 이미 정해져 있다면
          </h2>
          <p className="section-lede" style={{ marginBottom: 24 }}>
            여섯 여정의 비교와 추천 Stage는 여정 페이지에서 한눈에 볼 수 있어요.
          </p>
          <Link href="/journeys" className="btn ghost">
            여섯 여정 비교 <span className="arrow">→</span>
          </Link>
        </Container>
      </section>
    </>
  );
}
