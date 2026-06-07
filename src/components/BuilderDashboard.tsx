// 빌더 대시보드 (클라이언트) — localStorage 진척·캐릭터를 읽어 시각화한다.
// /me 페이지 본문. 전체·여정·Stage별 진척 + 이어서 볼 레슨.
"use client";

import Link from "next/link";
import { Container } from "@/components/Layout";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { ShareCardButton } from "@/components/ShareCardButton";
import { getBuilderRank } from "@/lib/builderRank";
import { useCharacter } from "@/hooks/useCharacter";
import {
  useLessonProgress,
  type ProgressLesson,
} from "@/hooks/useLessonProgress";
import { useNotes } from "@/hooks/useNotes";
import { useStreak } from "@/hooks/useStreak";
import { usePortfolio } from "@/hooks/usePortfolio";
import { ProjectReadiness } from "@/components/ProjectReadiness";
import { ApiKeySettings } from "@/components/ApiKeySettings";

export type DashStage = {
  id: string;
  order: number;
  label: string;
  slug: string;
};

export type DashLesson = {
  id: string;
  slug: string;
  titleKo: string;
  buildSteps: string[];
  verificationChecklist: string[];
  reflectionQuestions: string[];
};

export type DashJourney = {
  id: string;
  titleKo: string;
  identity: string;
  recommendedLessons: string[];
};

export type DashProject = {
  slug: string;
  title: string;
  difficultyLabel: string;
  targetJourneys: string[];
  keyLessonRefs: ProgressLesson[];
};

type Props = {
  stages: DashStage[];
  lessonsByStage: Record<string, DashLesson[]>;
  journeys: DashJourney[];
  projects: DashProject[];
};

export function BuilderDashboard({
  stages,
  lessonsByStage,
  journeys,
  projects,
}: Props) {
  const { mounted: pMounted, journey, isLessonComplete } = useLessonProgress();
  const { mounted: cMounted, character } = useCharacter();
  const { mounted: poMounted, getBuiltSlugs, getEntry } = usePortfolio();
  const streak = useStreak();
  const { notes } = useNotes();
  const mounted = pMounted && cMounted && poMounted;

  // SSR/첫 렌더 — 자리만 잡아 hydration mismatch 방지
  if (!mounted) {
    return (
      <Container>
        <div className="dash" aria-hidden>
          <div className="dash-skeleton" />
        </div>
      </Container>
    );
  }

  const builtSlugs = getBuiltSlugs();
  const builtProjects = builtSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is DashProject => Boolean(p));

  const allLessons = stages.flatMap((s) => lessonsByStage[s.id] ?? []);
  const total = allLessons.length;
  const done = allLessons.filter((l) => isLessonComplete(l)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const rank = getBuilderRank(done, total);

  const stageStats = stages.map((s) => {
    const list = lessonsByStage[s.id] ?? [];
    const d = list.filter((l) => isLessonComplete(l)).length;
    return {
      ...s,
      total: list.length,
      done: d,
      complete: list.length > 0 && d === list.length,
    };
  });
  const completedStages = stageStats.filter((s) => s.complete).length;

  const myJourney = journeys.find((j) => j.id === journey);
  const recSet = new Set(myJourney?.recommendedLessons ?? []);
  const recLessons = allLessons.filter((l) => recSet.has(l.slug));
  const recDone = recLessons.filter((l) => isLessonComplete(l)).length;
  const recPct =
    recLessons.length === 0
      ? 0
      : Math.round((recDone / recLessons.length) * 100);

  const nextLesson = allLessons.find((l) => !isLessonComplete(l));
  const bookmarked = allLessons.filter((l) => notes[l.slug]?.bookmarked);
  const createdStr = character
    ? new Date(character.createdAt).toISOString().slice(0, 10)
    : null;

  return (
    <Container>
      <div className="dash">
        {/* 헤더 — 캐릭터 + 핸들 */}
        <header className="dash-head">
          <CharacterAvatar size={64} ariaLabel="내 캐릭터" />
          <div>
            <p className="kicker">내 빌더 대시보드</p>
            <h1 className="dash-handle">
              {character ? character.handle : "이름 없는 빌더"}
            </h1>
            <p className="dash-sub">
              {myJourney ? `${myJourney.titleKo} 여정` : "여정 미정"}
              {createdStr ? ` · ${createdStr} 시작` : ""}
            </p>
            <p className="dash-rank">
              <span className="dash-rank__badge">
                <span aria-hidden>{rank.emoji}</span> {rank.label}
              </span>
              {rank.nextLabel && (
                <span className="dash-rank__next">
                  다음 ‘{rank.nextLabel}’까지 {rank.toNext}개
                </span>
              )}
            </p>
          </div>
          <ShareCardButton
            handle={character ? character.handle : "이름 없는 빌더"}
            journeyLabel={myJourney ? `${myJourney.titleKo} 여정` : "AI Builder"}
            pct={pct}
            done={done}
            total={total}
            completedStages={completedStages}
            totalStages={stageStats.length}
            streak={streak?.current ?? 0}
          />
        </header>

        {/* 내가 지은 것 — 산출물 포트폴리오 */}
        <section className="dash-card dash-portfolio">
          <div className="dash-card__head">
            <span className="rail-section-label">내가 지은 것</span>
            <span className="mono dash-frac">{builtProjects.length}</span>
          </div>
          {builtProjects.length > 0 ? (
            <ul className="dash-portfolio__grid">
              {builtProjects.map((p) => {
                const e = getEntry(p.slug);
                const safeUrl =
                  e.url && /^https?:\/\//i.test(e.url) ? e.url : undefined;
                return (
                  <li key={p.slug} className="dash-portfolio__item">
                    <div className="dash-portfolio__top">
                      <span className="chip">{p.difficultyLabel}</span>
                      {e.builtAt && (
                        <span className="dash-portfolio__date mono">
                          {e.builtAt.slice(0, 10)}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="dash-portfolio__title"
                    >
                      {p.title}
                    </Link>
                    {e.note && <p className="dash-portfolio__note">{e.note}</p>}
                    {safeUrl && (
                      <a
                        href={safeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dash-portfolio__link"
                      >
                        결과물 보기 <span className="arrow">→</span>
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="dash-portfolio__empty">
              아직 완성 기록이 없어요.{" "}
              <Link href="/projects">프로젝트 하나를 골라</Link> 첫 삽을 뜨고, 다
              지으면 상세 페이지에서 기록하세요.
            </p>
          )}
        </section>

        {/* 전체 진척 */}
        <section className="dash-card dash-overall">
          <div className="dash-overall__num">
            <span className="dash-overall__pct">{pct}</span>
            <span className="dash-overall__sym">%</span>
          </div>
          <div className="dash-overall__meta">
            <div className="dash-bar">
              <span className="dash-bar__fill" style={{ width: `${pct}%` }} />
            </div>
            <p className="dash-overall__line">
              {total} 레슨 중 <strong>{done}</strong>개 완료 · {stageStats.length} Stage 중{" "}
              <strong>{completedStages}</strong>개 완주
            </p>
          </div>
        </section>

        {/* 학습 스트릭 */}
        {streak && (
          <section className="dash-card dash-streak">
            <div className="dash-streak__main">
              <span className="dash-streak__flame" aria-hidden>
                🔥
              </span>
              <span className="dash-streak__num">{streak.current}</span>
              <span className="dash-streak__unit">일 연속 학습</span>
            </div>
            <div className="dash-streak__meta">
              <span>최고 {streak.best}일</span>
              <span
                className={`dash-streak__today${streak.studiedToday ? " is-done" : ""}`}
              >
                {streak.studiedToday ? "오늘 학습 완료 ✓" : "오늘 아직 — 1레슨으로 이어가요"}
              </span>
            </div>
          </section>
        )}

        {/* 이어서 학습 */}
        <section className="dash-card dash-next">
          {nextLesson ? (
            <>
              <div>
                <p className="kicker">이어서 학습</p>
                <p className="dash-next__title">{nextLesson.titleKo}</p>
              </div>
              <Link href={`/lessons/${nextLesson.slug}`} className="btn">
                계속하기 <span className="arrow">→</span>
              </Link>
            </>
          ) : (
            <p className="dash-next__done">
              🎉 {total}개 레슨을 모두 완료했어요. 이제 당신은 빌더입니다.
            </p>
          )}
        </section>

        {/* 여정 진척 */}
        {myJourney && recLessons.length > 0 && (
          <section className="dash-card">
            <div className="dash-card__head">
              <span className="rail-section-label">내 여정 추천 진척</span>
              <span className="mono dash-frac">
                {recDone}/{recLessons.length}
              </span>
            </div>
            <p className="dash-journey-id">{myJourney.identity}</p>
            <div className="dash-bar">
              <span
                className="dash-bar__fill"
                style={{ width: `${recPct}%` }}
              />
            </div>
          </section>
        )}

        {/* 내 프로젝트 — keyLessons 진척에서 파생한 준비도 */}
        {(() => {
          const mine = journey
            ? projects.filter((p) => p.targetJourneys.includes(journey))
            : projects;
          if (mine.length === 0) return null;
          const readiness = (p: DashProject) =>
            p.keyLessonRefs.length === 0
              ? 0
              : p.keyLessonRefs.filter((l) => isLessonComplete(l)).length /
                p.keyLessonRefs.length;
          const ranked = [...mine].sort((a, b) => readiness(b) - readiness(a));
          return (
            <section className="dash-card">
              <div className="dash-card__head">
                <span className="rail-section-label">내 프로젝트</span>
                <Link href="/projects" className="dash-card__link">
                  전체 프로젝트 →
                </Link>
              </div>
              <p className="dash-projects__note">
                준비 레슨을 끝낼수록 프로젝트가 열려요. &lsquo;시작 가능&rsquo;이면
                지금 만들 수 있어요.
              </p>
              <ul className="dash-projects">
                {ranked.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="dash-project"
                    >
                      <div className="dash-project__top">
                        <span className="chip">{p.difficultyLabel}</span>
                        <span className="dash-project__title">{p.title}</span>
                      </div>
                      <ProjectReadiness lessons={p.keyLessonRefs} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}

        {/* Stage별 진척 */}
        <section className="dash-card">
          <div className="dash-card__head">
            <span className="rail-section-label">Stage별 진척</span>
            <span className="mono dash-frac">{completedStages}/{stageStats.length} 완주</span>
          </div>
          <ul className="dash-stages">
            {stageStats.map((s) => {
              const sPct =
                s.total === 0 ? 0 : Math.round((s.done / s.total) * 100);
              return (
                <li key={s.id}>
                  <Link href={`/stages/${s.slug}`} className="dash-stage">
                    <span className="dash-stage__n mono">
                      {String(s.order).padStart(2, "0")}
                    </span>
                    <span className="dash-stage__body">
                      <span className="dash-stage__label">
                        {s.label}
                        {s.complete && (
                          <span
                            className="dash-stage__check"
                            aria-label="완주"
                          >
                            ✓
                          </span>
                        )}
                      </span>
                      <span className="dash-bar dash-bar--sm">
                        <span
                          className="dash-bar__fill"
                          style={{ width: `${sPct}%` }}
                        />
                      </span>
                    </span>
                    <span className="dash-stage__frac mono tnum">
                      {s.done}/{s.total}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 책갈피한 레슨 */}
        {bookmarked.length > 0 && (
          <section className="dash-card">
            <div className="dash-card__head">
              <span className="rail-section-label">책갈피한 레슨</span>
              <span className="mono dash-frac">{bookmarked.length}</span>
            </div>
            <ul className="dash-bookmarks">
              {bookmarked.map((l) => (
                <li key={l.id}>
                  <Link href={`/lessons/${l.slug}`} className="dash-bookmark">
                    <span aria-hidden>★</span>
                    <span>{l.titleKo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ApiKeySettings />

        <p className="dash-note">
          진척·메모는 이 브라우저에만 저장돼요. 레슨의 빌드·검증·회고를 모두
          체크하면 그 레슨이 완료로 집계됩니다.
        </p>
      </div>
    </Container>
  );
}
