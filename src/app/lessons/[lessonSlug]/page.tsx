import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionChecklist } from "@/components/SectionChecklist";
import {
  getLessonBySlug,
  getLessons,
  getStageById,
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

  return (
    <article className="lesson-reader">
        <p className="kicker">
          Stage {stageNumStr} · L{lessonNumStr} · {lesson.estimatedMinutes}분 · {LEVEL_LABEL[lesson.level]}
        </p>
        <h1>{lesson.titleKo}</h1>
        <p className="lede">{lesson.hook ?? lesson.summary}</p>

        {MdxBody && <MdxBody components={mdxElements} />}

        <h2 id="section-problem">1. 문제 이해</h2>
        <p style={{ whiteSpace: "pre-line" }}>{lesson.problemScenario}</p>

        <h2 id="section-concepts">2. 최소 개념</h2>
        {lesson.coreConcepts.map((c) => (
          <div key={c.term} style={{ margin: "16px 0" }}>
            <h3 style={{ margin: "12px 0 4px" }}>{c.term}</h3>
            <p style={{ margin: 0 }}>{c.explanation}</p>
          </div>
        ))}

        <h2 id="section-mission">3. 미션</h2>
        <div className="callout">
          <div className="kicker">Mission · {lesson.estimatedMinutes}분</div>
          <p style={{ margin: 0, whiteSpace: "pre-line" }}>{missionText}</p>
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

        {lesson.buildSteps.length > 0 && (
          <>
            <h2 id="section-build">4. 빌드 단계</h2>
            <SectionChecklist
              lessonId={lesson.id}
              section="build"
              items={lesson.buildSteps}
              ordered
            />
          </>
        )}

        <h2 id="section-verify">5. 검증 체크리스트</h2>
        <SectionChecklist
          lessonId={lesson.id}
          section="verify"
          items={lesson.verificationChecklist}
        />

        <h2 id="section-deliverable">6. 산출물</h2>
        <div className="callout">
          <div className="kicker">Deliverable</div>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--ink)" }}>
            {lesson.deliverable.title}
          </p>
          <p style={{ margin: "6px 0 0" }}>{lesson.deliverable.description}</p>
          <p style={{ margin: "8px 0 0", fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--ink-3)" }}>
            형식: {lesson.deliverable.format}
          </p>
        </div>

        <OutputsBlock lesson={lesson} />

        <h2 id="section-reflection">7. 회고 (3문)</h2>
        <SectionChecklist
          lessonId={lesson.id}
          section="reflect"
          items={lesson.reflectionQuestions}
        />

        {lesson.extensionIdeas.length > 0 && (
          <>
            <h2>확장 아이디어</h2>
            <ul>
              {lesson.extensionIdeas.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </>
        )}

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

        <nav
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "var(--ink-3)",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {prev ? (
            <Link href={`/lessons/${prev.slug}`} style={{ color: "inherit" }}>
              ← {prev.titleKo}
            </Link>
          ) : <span style={{ color: "var(--ink-4)" }}>첫 레슨입니다</span>}
          {next ? (
            <Link href={`/lessons/${next.slug}`} style={{ color: "inherit" }}>
              {next.titleKo} →
            </Link>
          ) : <span style={{ color: "var(--ink-4)" }}>마지막 레슨입니다</span>}
        </nav>
    </article>
  );
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
