import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Layout";
import { ProjectCard } from "@/components/Cards";
import { JourneySelectButton } from "@/components/JourneySelectButton";
import { PageHead } from "@/components/Sections";
import {
  getJourneys,
  getLessonBySlug,
  getStageBySlug,
  getProjectsByJourney,
} from "@/lib/content";
import { JOURNEY_LABEL, JOURNEY_LABEL_KO } from "@/lib/types";

export const metadata: Metadata = {
  title: "여정 · 6개 학습 경로",
  description:
    "AI Builder School의 6개 여정. 어디서 출발하든 모두 빌더가 됩니다 — 실무자·도입자·크리에이터·파운더·엔지니어·탐험가.",
};

export default function JourneysPage() {
  const journeys = getJourneys();

  return (
    <>
      <PageHead
        eyebrow={<>Journeys · 6</>}
        title={<>출발점이 어디든,<br />결국 빌더가 됩니다.</>}
        lede="여섯 여정 중 하나를 골라요. 필요한 Stage와 추천 레슨이 자동으로 묶이고, 6–10주 안에 완주할 수 있게 짜여 있어요. 도중에 길이 바뀌어도 괜찮아요 — 다시 고르면 돼요."
      />

      <section className="sec">
        <Container>
          {journeys.map((j) => (
            <article
              key={j.id}
              id={j.slug}
              className={`track-full p-${j.id}`}
              style={{ scrollMarginTop: 96 }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <span aria-hidden className="p-mark" />
                  <div className="persona">{JOURNEY_LABEL[j.id]}</div>
                </div>
                <h2>
                  <span className="p-text">{JOURNEY_LABEL[j.id]}</span>
                  <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                    {" "}· {JOURNEY_LABEL_KO[j.id]}의 여정
                  </span>
                </h2>
                <p className="meta" style={{ marginTop: 8 }}>
                  {j.identity}
                </p>
                <p className="meta">
                  {(j.recommendedStages ?? []).length} Stage · {j.recommendedLessons.length} 레슨
                </p>
              </div>
              <div>
                <p className="desc">{j.targetLearner}</p>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink)",
                    fontWeight: 500,
                    marginTop: 12,
                  }}
                >
                  약속 · {j.promise}
                </p>

                <div className="ph-list">
                  {(j.recommendedStages ?? []).map((slug) => {
                    const s = getStageBySlug(slug);
                    return (
                      <Link
                        key={slug}
                        href={`/stages/${slug}`}
                        className="chip chip-mono"
                      >
                        Stage {s?.order ?? "?"} · {s?.label ?? slug}
                      </Link>
                    );
                  })}
                </div>

                {j.recommendedLessons.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div className="eyebrow" style={{ marginBottom: 12 }}>
                      추천 레슨
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gap: 8,
                      }}
                    >
                      {j.recommendedLessons.map((slug) => {
                        const l = getLessonBySlug(slug);
                        return (
                          <li key={slug}>
                            <Link
                              href={`/lessons/${slug}`}
                              style={{
                                color: "var(--ink-2)",
                                fontSize: 14,
                                textDecoration: "underline",
                                textDecorationColor: "var(--ink-4)",
                                textUnderlineOffset: 3,
                              }}
                            >
                              {l?.titleKo ?? slug}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {(() => {
                  const matchedProjects = getProjectsByJourney(j.id);
                  if (matchedProjects.length === 0) return null;
                  return (
                    <div style={{ marginTop: 24 }}>
                      <div className="eyebrow" style={{ marginBottom: 12 }}>
                        이 여정에 잘 맞는 프로젝트
                      </div>
                      <div className="proj-grid">
                        {matchedProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                <div className="outcome">
                  <strong>이 여정 끝에 손에 남는 것 · </strong>
                  {j.expectedOutcome}
                </div>

                <JourneySelectButton
                  journeyId={j.id}
                  firstLessonSlug={j.recommendedLessons[0]}
                />
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
