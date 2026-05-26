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

export default function StartPage() {
  const journeys = getJourneys();

  return (
    <>
      <PageHead
        eyebrow={<>Start · 30초 진단</>}
        title={<>지금의 나에게 가장<br />가까운 여정 하나만 골라요.</>}
        lede="여러 개에 해당돼도 괜찮아요. 지금 가장 시간을 많이 쓰는 역할 하나를 고르면, 그 여정의 모험 페이지가 열려요. 도중에 길이 바뀌어도 다시 고르면 돼요."
      />

      <section className="sec">
        <Container>
          <div className="quiz-card">
            <div className="quiz-progress">
              <span className="done" />
              <span />
            </div>
            <h2>지금 나에게 가장 가까운 모습은?</h2>
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
