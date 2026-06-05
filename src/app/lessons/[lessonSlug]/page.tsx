import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionChecklist } from "@/components/SectionChecklist";
import { MissionChecklist, type MissionTask } from "@/components/MissionChecklist";
import { ReviewJumps } from "@/components/ReviewJumps";
import { LessonNotes } from "@/components/LessonNotes";
import { LessonPager } from "@/components/LessonPager";
import { Typewriter } from "@/components/Typewriter";
import {
  getLessonBySlug,
  getLessons,
  getStageById,
  getJourneys,
  getSpecialsDeepening,
} from "@/lib/content";
import { getLessonBody } from "@/content/lesson-bodies";
import { mdxElements } from "@/components/mdx-elements";
import { LEVEL_LABEL } from "@/lib/types";
import type { Lesson } from "@/lib/types";

export function generateStaticParams() {
  return getLessons().map((l) => ({ lessonSlug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLessonBySlug(lessonSlug);
  if (!lesson) return { title: "레슨을 찾을 수 없습니다" };
  return {
    title: `${lesson.titleKo} · Lesson`,
    description: lesson.hook ?? lesson.summary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  const lesson = getLessonBySlug(lessonSlug);
  if (!lesson) notFound();

  const stage = lesson.stageId ? getStageById(lesson.stageId) : undefined;
  const all = getLessons();
  const idx = all.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const MdxBody = lesson.hasMdxBody ? getLessonBody(lesson.slug) : null;

  const stageNumStr = stage ? String(stage.order).padStart(2, "0") : "--";
  const lessonNumStr = String(lesson.stageOrdinal ?? idx + 1).padStart(2, "0");
  const missionText = lesson.mission ?? lesson.claudeCodeMission;
  // 미션에 번호 과제(1. 2. 3.)가 있으면 콜아웃 안에서 바로 체크. 없으면 기존 방식 폴백.
  const missionTasks = parseMissionTasks(missionText);
  // 시간 표기 — '최소(개념만 읽기)'와 '권장(미션까지)' 두 가지로.
  const readMinutes = Math.max(3, Math.round(lesson.estimatedMinutes * 0.4));
  // 이 레슨을 deepens로 심화하는 휘발성 특강 (스펙 3 §7)
  const relatedSpecials = getSpecialsDeepening(lesson.slug);

  return (
    <article className="lesson-reader">
        <p className="kicker">
          Stage {stageNumStr} · L{lessonNumStr} · 읽기 ~{readMinutes}분 · 미션까지 {lesson.estimatedMinutes}분 · {LEVEL_LABEL[lesson.level]}
        </p>
        <h1>{lesson.titleKo}</h1>
        <p className="lede">{lesson.hook ?? lesson.summary}</p>

        {/* 산출물 칩 — 처음부터 목표를 보여줌 */}
        {lesson.deliverable?.title && (
          <p
            className="lesson-deliverable-chip"
            style={{
              margin: "18px 0 8px",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              border: "1px solid var(--line)",
              borderLeft: "3px solid var(--ink)",
              borderRadius: "var(--r-sm)",
              background: "var(--paper-2)",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            <span aria-hidden style={{ fontSize: 16 }}>📦</span>
            <span>
              <span style={{ color: "var(--ink-3)" }}>손에 남는 것 — </span>
              <strong style={{ color: "var(--ink)" }}>{lesson.deliverable.title}</strong>
            </span>
          </p>
        )}

        {/* 본문 anchor — ReadingRail이 4단계(본문/빌드/검증/회고)로 추적하기 위한 hidden h2 */}
        <h2
          id="section-body"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            margin: -1,
            padding: 0,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
          aria-hidden="true"
        >
          본문
        </h2>

        {/* 본문 — MDX가 있으면 MDX가 정본, 없으면 problemScenario + coreConcepts fallback */}
        {MdxBody ? (
          <MdxBody components={mdxElements} />
        ) : (
          <>
            <h2 id="section-problem">문제 이해</h2>
            <p style={{ whiteSpace: "pre-line" }}>{lesson.problemScenario}</p>

            <h2 id="section-concepts">최소 개념</h2>
            {lesson.coreConcepts.map((c) => (
              <div key={c.term} style={{ margin: "16px 0" }}>
                <h3 style={{ margin: "12px 0 4px" }}>{c.term}</h3>
                <p style={{ margin: 0 }}>{c.explanation}</p>
              </div>
            ))}
          </>
        )}

        {/* 빌드 단계 — 강사 멘트(buildIntro) → 미션 콜아웃(번호 미션은 인라인 체크) → Codex 참고 */}
        {(lesson.buildSteps.length > 0 || missionTasks) && (
          <>
            <h2 id="section-build">빌드 단계</h2>
            {lesson.buildIntro && (
              <p
                style={{
                  margin: "12px 0 18px",
                  color: "var(--ink-2)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                {lesson.buildIntro}
              </p>
            )}
            <p className="lesson-skip">
              미션까지 할 시간이 빠듯하면 — 개념만 챙기고 넘어가도 괜찮아요. 미션은
              표시해 두고 나중에 돌아와 채우면 돼요
              {next ? (
                <>
                  {" · "}
                  <a href={`/lessons/${next.slug}`}>다음 레슨으로 건너뛰기 →</a>
                </>
              ) : null}
              .
            </p>
            <div className="callout">
              <div className="kicker">Mission · 권장 {lesson.estimatedMinutes}분</div>
              {missionTasks ? (
                <>
                  {missionTasks.intro && (
                    <p className="mission-intro">{missionTasks.intro}</p>
                  )}
                  <MissionChecklist lessonId={lesson.id} tasks={missionTasks.tasks} />
                </>
              ) : (
                <Typewriter text={missionText ?? ""} />
              )}
            </div>
            {lesson.codexNote && (
              <div
                style={{
                  margin: "16px 0",
                  padding: "14px 18px",
                  border: "1px dashed var(--line-2)",
                  borderRadius: "var(--r-sm)",
                  background: "var(--paper-2)",
                }}
              >
                <div className="kicker" style={{ marginBottom: 6 }}>Codex 참고</div>
                <p style={{ margin: 0, fontSize: 14, color: "var(--ink-3)", lineHeight: 1.7 }}>
                  {lesson.codexNote}
                </p>
              </div>
            )}
            {/* 번호 미션이 콜아웃 안에서 바로 체크되므로, 폴백 레슨만 별도 체크리스트 */}
            {!missionTasks && (
              <SectionChecklist
                lessonId={lesson.id}
                section="build"
                items={lesson.buildSteps}
                ordered
              />
            )}
          </>
        )}

        <h2 id="section-verify">검증</h2>
        {/* 검증 = 본문·빌드에서 배운 걸 다시 짚어보는 단계 → 헷갈리면 그 단락으로 바로 점프 */}
        <ReviewJumps />
        <SectionChecklist
          lessonId={lesson.id}
          section="verify"
          items={lesson.verificationChecklist}
        />

        {/* 산출물은 헤더 칩에서 이미 안내. 여기서는 outputs 파일 블록만 (있을 때) */}
        <OutputsBlock lesson={lesson} />

        {/* 나아가기 = 복습이 아니라 더 생각해보기 + 해볼 만한 다음 한 걸음 */}
        <h2 id="section-reflection">나아가기</h2>
        <div className="kicker" style={{ margin: "0 0 10px" }}>생각할 거리</div>
        <SectionChecklist
          lessonId={lesson.id}
          section="reflect"
          items={lesson.reflectionQuestions}
        />

        {lesson.extensionIdeas.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div className="kicker" style={{ marginBottom: 8 }}>다음 한 걸음</div>
            <p style={{ margin: "0 0 8px", color: "var(--ink-3)", fontSize: 15 }}>
              전부 다 할 필요 없어요. 이 중 가장 끌리는 하나만 골라 지금 해보세요.
            </p>
            <ul style={{ marginTop: 0 }}>
              {lesson.extensionIdeas.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        )}

        {lesson.reflectionOutro && (
          <p
            style={{
              margin: "28px 0 8px",
              padding: "16px 20px",
              borderLeft: "3px solid var(--ink)",
              background: "var(--paper-2)",
              color: "var(--ink-2)",
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            {lesson.reflectionOutro}
          </p>
        )}

        {relatedSpecials.length > 0 && (
          <>
            <h2>관련 특강 · 심화</h2>
            <p>
              이 레슨의 원리는 그대로 두고, 최신 제품·버전 동향만 다루는 특강이
              곁에 있습니다. 특강은 검토 시한이 지나면 갱신·교체됩니다.
            </p>
            {relatedSpecials.map((s) => (
              <Link
                key={s.slug}
                href={`/specials/${s.slug}`}
                style={{
                  display: "block",
                  margin: "12px 0",
                  padding: "16px 20px",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r)",
                  background: "var(--card)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="kicker mono"
                  style={{ fontSize: 11, margin: 0, color: "var(--ink-3)" }}
                >
                  특강 · {s.product}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {s.titleKo}
                </div>
              </Link>
            ))}
          </>
        )}

        <LessonNotes slug={lesson.slug} />

        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {stage && (
            <Link href={`/stages/${stage.slug}`} className="btn">
              Stage {stage.order} · {stage.label}로 돌아가기 <span className="arrow">→</span>
            </Link>
          )}
          <Link href="/stages" className="btn ghost">
            전체 커리큘럼
          </Link>
        </div>

        <LessonPager
          journeys={getJourneys()}
          allLessons={all}
          currentSlug={lesson.slug}
          fallbackPrev={prev ? { slug: prev.slug, titleKo: prev.titleKo } : null}
          fallbackNext={next ? { slug: next.slug, titleKo: next.titleKo } : null}
        />
    </article>
  );
}

// 미션 문자열에서 "1. 제목\n설명" 패턴을 파싱 → {intro, tasks[]}.
// 번호 항목이 2개 미만이면 null (이전 형식 레슨은 기존 Typewriter 콜아웃으로 폴백).
function parseMissionTasks(
  mission: string | undefined,
): { intro: string; tasks: MissionTask[] } | null {
  if (!mission) return null;
  const numRe = /^\s*\d+\.\s+(.*)$/;
  const introLines: string[] = [];
  const tasks: { title: string; detail: string[] }[] = [];
  let cur: { title: string; detail: string[] } | null = null;
  for (const line of mission.split("\n")) {
    const m = line.match(numRe);
    if (m) {
      cur = { title: m[1].trim(), detail: [] };
      tasks.push(cur);
    } else if (cur) {
      cur.detail.push(line);
    } else if (line.trim()) {
      introLines.push(line.trim());
    }
  }
  if (tasks.length < 2) return null;
  return {
    intro: introLines.join(" ").trim(),
    tasks: tasks.map((t) => ({ title: t.title, detail: t.detail.join("\n").trim() })),
  };
}

function OutputsBlock({ lesson }: { lesson: Lesson }) {
  if (!lesson.outputs || lesson.outputs.length === 0) return null;
  return (
    <div
      style={{
        margin: "28px 0",
        padding: "24px 28px",
        border: "1px solid var(--line)",
        borderRadius: "var(--r)",
        background: "var(--card)",
      }}
    >
      <div className="kicker">Outputs · 이 레슨이 선적하는 파일</div>
      <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0" }}>
        {lesson.outputs.map((o) => (
          <li
            key={o.filename}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              padding: "12px 14px",
              background: "var(--paper-2)",
              borderRadius: "var(--r-sm)",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <div>
              <div className="kicker" style={{ margin: 0 }}>{o.kind}</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", marginTop: 4 }}>
                {o.title}
              </div>
            </div>
            <code style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--ink-3)", background: "none", padding: 0 }}>
              {o.filename}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}
