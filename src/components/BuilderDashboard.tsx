// 빌더 대시보드 (클라이언트) — localStorage 진척·캐릭터를 읽어 시각화한다.
// /me 페이지 본문. 전체·여정·Stage별 진척 + 이어서 볼 레슨.
"use client";

import Link from "next/link";
import { Container } from "@/components/Layout";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { useCharacter } from "@/hooks/useCharacter";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useStreak } from "@/hooks/useStreak";

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

type Props = {
  stages: DashStage[];
  lessonsByStage: Record<string, DashLesson[]>;
  journeys: DashJourney[];
};

export function BuilderDashboard({ stages, lessonsByStage, journeys }: Props) {
  const { mounted: pMounted, journey, isLessonComplete } = useLessonProgress();
  const { mounted: cMounted, character } = useCharacter();
  const streak = useStreak();
  const mounted = pMounted && cMounted;

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

  const allLessons = stages.flatMap((s) => lessonsByStage[s.id] ?? []);
  const total = allLessons.length;
  const done = allLessons.filter((l) => isLessonComplete(l)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

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
          </div>
        </header>

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
              84 레슨 중 <strong>{done}</strong>개 완료 · 8 Stage 중{" "}
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
              🎉 84개 레슨을 모두 완료했어요. 이제 당신은 빌더입니다.
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

        {/* Stage별 진척 */}
        <section className="dash-card">
          <div className="dash-card__head">
            <span className="rail-section-label">Stage별 진척</span>
            <span className="mono dash-frac">{completedStages}/8 완주</span>
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

        <p className="dash-note">
          진척은 이 브라우저에만 저장돼요. 레슨의 빌드·검증·회고를 모두 체크하면
          그 레슨이 완료로 집계됩니다.
        </p>
      </div>
    </Container>
  );
}
