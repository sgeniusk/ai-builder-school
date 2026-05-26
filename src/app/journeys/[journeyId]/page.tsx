// 여정별 상세 페이지 — 모험 히어로 + 그 여정의 Stage·추천 레슨·프로젝트 소개.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import { JourneyHero } from "@/components/JourneyHero";
import { ProjectCard } from "@/components/Cards";
import {
  getJourneys,
  getLessonBySlug,
  getStageBySlug,
  getProjectsByJourney,
  getProjectReadinessRefs,
} from "@/lib/content";

export function generateStaticParams() {
  return getJourneys().map((j) => ({ journeyId: j.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ journeyId: string }>;
}): Promise<Metadata> {
  const { journeyId } = await params;
  const journey = getJourneys().find((j) => j.id === journeyId);
  if (!journey) return { title: "여정을 찾을 수 없습니다" };
  return {
    title: `${journey.titleKo}의 여정`,
    description: journey.promise,
  };
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ journeyId: string }>;
}) {
  const { journeyId } = await params;
  const journey = getJourneys().find((j) => j.id === journeyId);
  if (!journey) notFound();

  const stages = (journey.recommendedStages ?? [])
    .map((slug) => getStageBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const lessons = journey.recommendedLessons
    .map((slug) => getLessonBySlug(slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));
  const projects = getProjectsByJourney(journey.id);

  return (
    <>
      <JourneyHero journey={journey} />

      <section className={`sec p-${journey.id}`}>
        <Container>
          <div className="journey-detail">
            <div className="eyebrow">이 여정은</div>
            <p className="journey-detail__lead">{journey.targetLearner}</p>
            <p className="journey-detail__promise">약속 · {journey.promise}</p>

            {stages.length > 0 && (
              <div className="journey-detail__block">
                <div className="eyebrow">전제 Stage</div>
                <div className="ph-list">
                  {stages.map((s) => (
                    <Link
                      key={s.id}
                      href={`/stages/${s.slug}`}
                      className="chip chip-mono"
                    >
                      Stage {s.order} · {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {lessons.length > 0 && (
              <div className="journey-detail__block">
                <div className="eyebrow">추천 레슨 · {lessons.length}</div>
                <ul className="journey-detail__lessons">
                  {lessons.map((l, i) => (
                    <li key={l.id}>
                      <Link href={`/lessons/${l.slug}`}>
                        <span className="jd-num mono">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="jd-title">{l.titleKo}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {projects.length > 0 && (
              <div className="journey-detail__block">
                <div className="eyebrow">이 여정으로 만들게 될 것</div>
                <div className="proj-grid">
                  {projects.map((p) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      keyLessonRefs={getProjectReadinessRefs(p)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="journey-detail__outcome">
              <strong>이 여정 끝에 손에 남는 것 · </strong>
              {journey.expectedOutcome}
            </div>

            <div className="journey-detail__foot">
              <Link href="/journeys" className="btn ghost">
                ← 여섯 여정 모두 보기
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
