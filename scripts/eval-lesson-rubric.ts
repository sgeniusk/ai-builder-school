#!/usr/bin/env tsx
/**
 * AI Builder School — 레슨 내용 품질 LLM 루브릭 평가 (advisory)
 *
 * Harness Engineering · Evaluation hook 의 정성(qualitative) 게이트.
 * `validate`(필수)·`eval`(구조 advisory)와 분리된 *내용 품질* 루프.
 * 항상 exit 0 — 차단하지 않는다. 사람이 flag를 보고 우선순위를 정한다.
 *
 * 기준: docs/lesson-quality-rubric.md (런타임에 읽어 프롬프트에 주입 — 단일 소스).
 * 채점 6축: 명료성 · 어조 · 연속성 · 7-step 정합성 · 사실성 · 실행 가능성.
 *
 * 사용법:
 *   ANTHROPIC_API_KEY=sk-... npm run eval:rubric                 # 기본 8개 샘플
 *   ANTHROPIC_API_KEY=sk-... npm run eval:rubric -- --all        # 84개 전부
 *   ANTHROPIC_API_KEY=sk-... npm run eval:rubric -- --stage stage-6
 *   ANTHROPIC_API_KEY=sk-... npm run eval:rubric -- --slug grounded-rag-answers
 *   ANTHROPIC_API_KEY=sk-... npm run eval:rubric -- --limit 20 --model claude-sonnet-4-5
 *
 * 환경변수:
 *   ANTHROPIC_API_KEY — 필수. 없으면 안내만 하고 exit 0.
 *   EVAL_MODEL        — 채점 모델 (기본 claude-3-5-haiku-latest). --model로도 지정.
 *
 * 결과: 콘솔 표 + docs/lesson-rubric-report.md.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { getLessons, getStages } from "../src/lib/content";
import type { Lesson } from "../src/lib/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};
const c = (code: string, t: string) =>
  process.stdout.isTTY ? `${code}${t}${COLORS.reset}` : t;

const AXES = [
  "clarity",
  "tone",
  "continuity",
  "loop",
  "factual",
  "actionability",
] as const;
type Axis = (typeof AXES)[number];
const AXIS_LABEL: Record<Axis, string> = {
  clarity: "명료",
  tone: "어조",
  continuity: "연속",
  loop: "정합",
  factual: "사실",
  actionability: "실행",
};

interface RubricResult {
  slug: string;
  scores: Record<Axis, number>;
  avg: number;
  flags: string[];
  summary: string;
  error?: string;
}

// ── 1. Args ────────────────────────────────────────────────────
const args = process.argv.slice(2);
let slugArg: string | undefined;
let stageArg: string | undefined;
let limitArg: number | undefined;
let allArg = false;
let modelArg: string | undefined;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--all") allArg = true;
  else if (a === "--slug") slugArg = args[++i];
  else if (a === "--stage") stageArg = args[++i];
  else if (a === "--limit") limitArg = parseInt(args[++i] ?? "0", 10);
  else if (a === "--model") modelArg = args[++i];
  else {
    console.error(c(COLORS.red, `알 수 없는 인자: ${a}`));
    process.exit(0);
  }
}

const MODEL =
  modelArg ?? process.env.EVAL_MODEL ?? "claude-3-5-haiku-latest";
const API_KEY = process.env.ANTHROPIC_API_KEY;

console.log(c(COLORS.bold + COLORS.cyan, "AI Builder School — Lesson Rubric Eval (LLM)"));
console.log(c(COLORS.dim, "advisory only · exit 0 보장 · 기준 docs/lesson-quality-rubric.md"));
console.log("");

if (!API_KEY) {
  console.log(c(COLORS.yellow + COLORS.bold, "△ ANTHROPIC_API_KEY 가 없어 LLM 채점을 건너뜁니다."));
  console.log(
    c(
      COLORS.dim,
      "  실행하려면:  ANTHROPIC_API_KEY=sk-... npm run eval:rubric\n" +
        "  이 스크립트는 advisory 입니다 — 키가 없어도 빌드/CI는 막지 않습니다.",
    ),
  );
  process.exit(0);
}

// ── 2. 루브릭 + 레슨 데이터 로드 ────────────────────────────────
const rubricPath = path.join(ROOT, "docs/lesson-quality-rubric.md");
if (!fs.existsSync(rubricPath)) {
  console.error(c(COLORS.red, `루브릭 파일 없음: ${rubricPath}`));
  process.exit(0);
}
const rubricText = fs.readFileSync(rubricPath, "utf-8");

const lessons = getLessons();
const stages = getStages();
const lessonBySlug = new Map(lessons.map((l) => [l.slug, l]));

// stage 안 앞/뒤 레슨 (연속성 판단용)
function neighbors(lesson: Lesson): { prev?: Lesson; next?: Lesson } {
  const stage = stages.find((s) => s.id === lesson.stageId);
  if (!stage) return {};
  const idx = stage.lessonSlugs.indexOf(lesson.slug);
  if (idx < 0) return {};
  return {
    prev: idx > 0 ? lessonBySlug.get(stage.lessonSlugs[idx - 1] ?? "") : undefined,
    next:
      idx < stage.lessonSlugs.length - 1
        ? lessonBySlug.get(stage.lessonSlugs[idx + 1] ?? "")
        : undefined,
  };
}

// 평가 대상 선정
let targets: Lesson[];
if (slugArg) {
  const one = lessonBySlug.get(slugArg);
  if (!one) {
    console.error(c(COLORS.red, `slug 없음: ${slugArg}`));
    process.exit(0);
  }
  targets = [one];
} else if (stageArg) {
  targets = lessons.filter(
    (l) => l.stageId === stageArg || l.stageId === `stage-${stageArg.replace(/\D/g, "")}`,
  );
} else {
  targets = [...lessons];
}
if (!allArg && !slugArg && !stageArg) {
  targets = targets.slice(0, limitArg ?? 8);
} else if (limitArg) {
  targets = targets.slice(0, limitArg);
}

console.log(
  c(COLORS.dim, `대상 ${targets.length}개 레슨 · 모델 ${MODEL}`) +
    (allArg || slugArg || stageArg ? "" : c(COLORS.dim, " (기본 샘플 — 전체는 --all)")),
);
console.log("");

// ── 3. 프롬프트 ────────────────────────────────────────────────
const SYSTEM_PROMPT = `너는 한국어 AI 교육 콘텐츠의 품질 평가자다. 아래 루브릭으로 레슨 하나를 정확하고 엄정하게 채점한다.

${rubricText}

반드시 아래 JSON 객체 하나만 출력한다. 그 외 텍스트·코드펜스 금지.
{
  "scores": { "clarity": 1-5, "tone": 1-5, "continuity": 1-5, "loop": 1-5, "factual": 1-5, "actionability": 1-5 },
  "flags": ["고칠 수 있는 구체적 문제 (없으면 빈 배열)"],
  "summary": "한 줄 총평 (한국어, 콜론으로 끝내지 말 것)"
}
점수는 정수. flags는 실무에서 바로 고칠 수 있는 구체적 항목만 (각 80자 이내).`;

function lessonPayload(lesson: Lesson): string {
  const mdxPath = path.join(ROOT, "src/content/lessons", `${lesson.slug}.mdx`);
  const mdx = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf-8")
    : "(MDX 본문 없음)";
  const { prev, next } = neighbors(lesson);
  const stage = stages.find((s) => s.id === lesson.stageId);
  return [
    `## 평가 대상 레슨`,
    `- slug: ${lesson.slug}`,
    `- 제목: ${lesson.titleKo}`,
    `- 소속: ${stage ? `${stage.label} (${stage.id})` : "(stage 미상)"}`,
    `- 예상 소요: ${lesson.estimatedMinutes}분 · 난이도 ${lesson.level}`,
    ``,
    `### 연속성 컨텍스트 (같은 stage)`,
    `- 앞 레슨: ${prev ? `${prev.titleKo} — ${prev.hook ?? prev.summary}` : "(없음 — stage 첫 레슨)"}`,
    `- 뒤 레슨: ${next ? `${next.titleKo} — ${next.hook ?? next.summary}` : "(없음 — stage 마지막 레슨)"}`,
    ``,
    `### hook`,
    lesson.hook ?? "(없음)",
    ``,
    `### summary`,
    lesson.summary,
    ``,
    `### problemScenario`,
    lesson.problemScenario,
    ``,
    `### coreConcepts`,
    lesson.coreConcepts.map((cc) => `- ${cc.term}: ${cc.explanation}`).join("\n"),
    ``,
    `### mission`,
    lesson.mission ?? lesson.claudeCodeMission ?? "(없음)",
    ``,
    `### buildSteps`,
    lesson.buildSteps.map((s, i) => `${i + 1}. ${s}`).join("\n"),
    ``,
    `### verificationChecklist`,
    lesson.verificationChecklist.map((s) => `- ${s}`).join("\n"),
    ``,
    `### deliverable`,
    `${lesson.deliverable.title} — ${lesson.deliverable.description} (형식: ${lesson.deliverable.format})`,
    ``,
    `### reflectionQuestions`,
    lesson.reflectionQuestions.map((s) => `- ${s}`).join("\n"),
    ``,
    `### MDX 본문`,
    mdx,
  ].join("\n");
}

// ── 4. Anthropic API 호출 ──────────────────────────────────────
async function grade(lesson: Lesson): Promise<RubricResult> {
  const base: RubricResult = {
    slug: lesson.slug,
    scores: { clarity: 0, tone: 0, continuity: 0, loop: 0, factual: 0, actionability: 0 },
    avg: 0,
    flags: [],
    summary: "",
  };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY as string,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: lessonPayload(lesson) }],
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      return { ...base, error: `HTTP ${res.status} — ${txt.slice(0, 160)}` };
    }
    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.find((b) => b.type === "text")?.text ?? "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return { ...base, error: "JSON 파싱 실패" };
    const parsed = JSON.parse(match[0]) as {
      scores?: Partial<Record<Axis, number>>;
      flags?: string[];
      summary?: string;
    };
    const scores = { ...base.scores };
    for (const axis of AXES) {
      const v = parsed.scores?.[axis];
      scores[axis] = typeof v === "number" ? Math.max(1, Math.min(5, v)) : 0;
    }
    const avg =
      AXES.reduce((a, axis) => a + scores[axis], 0) / AXES.length;
    return {
      slug: lesson.slug,
      scores,
      avg: Math.round(avg * 100) / 100,
      flags: Array.isArray(parsed.flags) ? parsed.flags : [],
      summary: parsed.summary ?? "",
    };
  } catch (err) {
    return { ...base, error: String(err).slice(0, 160) };
  }
}

// 동시성 4 풀
async function runPool(items: Lesson[], size: number): Promise<RubricResult[]> {
  const out: RubricResult[] = [];
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const i = cursor++;
      const lesson = items[i] as Lesson;
      process.stdout.write(c(COLORS.dim, `  채점 중 ${i + 1}/${items.length} ${lesson.slug}\n`));
      out[i] = await grade(lesson);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, worker));
  return out;
}

// ── 5. 실행 + 보고 ─────────────────────────────────────────────
function scoreColor(n: number): string {
  if (n === 0) return c(COLORS.dim, "—");
  if (n >= 4) return c(COLORS.green, String(n));
  if (n >= 3) return c(COLORS.yellow, String(n));
  return c(COLORS.red, String(n));
}

async function main(): Promise<void> {
const results = await runPool(targets, 4);

console.log("");
const header = `slug                                  ${AXES.map((a) => AXIS_LABEL[a as Axis]).join("  ")}  avg   flag`;
console.log(header);
console.log("─".repeat(header.length - 30));
for (const r of results) {
  if (r.error) {
    console.log(`${r.slug.padEnd(38)}${c(COLORS.red, "ERROR — " + r.error)}`);
    continue;
  }
  const cells = AXES.map((a) => scoreColor(r.scores[a as Axis])).join("    ");
  const avgCell =
    r.avg >= 4 ? c(COLORS.green, r.avg.toFixed(2)) : r.avg >= 3 ? c(COLORS.yellow, r.avg.toFixed(2)) : c(COLORS.red, r.avg.toFixed(2));
  console.log(`${r.slug.padEnd(38)}${cells}    ${avgCell}  ${r.flags.length}`);
}

const ok = results.filter((r) => !r.error);
const errored = results.filter((r) => r.error);
const overall =
  ok.length > 0 ? ok.reduce((a, r) => a + r.avg, 0) / ok.length : 0;

console.log("");
console.log(
  c(COLORS.bold, `채점 ${ok.length}개 · 평균 ${overall.toFixed(2)}/5`) +
    (errored.length ? c(COLORS.red, ` · 오류 ${errored.length}`) : ""),
);

// ── 6. 리포트 파일 ─────────────────────────────────────────────
const reportPath = path.join(ROOT, "docs/lesson-rubric-report.md");
const sorted = [...ok].sort((a, b) => a.avg - b.avg);
const lines: string[] = [
  "# 레슨 내용 품질 리포트 (LLM 루브릭)",
  "",
  `> \`npm run eval:rubric\` 산출물 · 모델 ${MODEL} · ${new Date().toISOString().slice(0, 10)}`,
  `> 기준 — docs/lesson-quality-rubric.md · advisory (차단하지 않음)`,
  "",
  `채점 ${ok.length}개 · 전체 평균 **${overall.toFixed(2)}/5**` +
    (errored.length ? ` · 오류 ${errored.length}개` : ""),
  "",
  "## 점수 낮은 순 (수정 우선순위)",
  "",
  "| 레슨 | 명료 | 어조 | 연속 | 정합 | 사실 | 실행 | 평균 |",
  "|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|",
];
for (const r of sorted) {
  lines.push(
    `| ${r.slug} | ${AXES.map((a) => r.scores[a as Axis]).join(" | ")} | **${r.avg.toFixed(2)}** |`,
  );
}
lines.push("", "## flag — 고칠 수 있는 구체적 문제", "");
const flagged = sorted.filter((r) => r.flags.length > 0);
if (flagged.length === 0) {
  lines.push("flag 없음.");
} else {
  for (const r of flagged) {
    lines.push(`### ${r.slug} (평균 ${r.avg.toFixed(2)})`);
    lines.push(r.summary ? `${r.summary}` : "");
    for (const f of r.flags) lines.push(`- ${f}`);
    lines.push("");
  }
}
if (errored.length) {
  lines.push("## 오류", "");
  for (const r of errored) lines.push(`- ${r.slug} — ${r.error}`);
  lines.push("");
}
fs.writeFileSync(reportPath, lines.join("\n"), "utf-8");
console.log(c(COLORS.dim, `리포트 — ${path.relative(ROOT, reportPath)}`));
console.log("");
console.log(
  c(
    COLORS.dim,
    "advisory · 이 결과는 막지 않아요. 점수 낮은 레슨의 flag부터 점진적으로 고치세요.",
  ),
);
process.exit(0);
}

void main();
