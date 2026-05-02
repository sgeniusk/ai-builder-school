#!/usr/bin/env tsx
/**
 * AI Builder School — 레슨 품질 평가 (advisory)
 *
 * Harness Engineering · Evaluation hook.
 * validate(필수)와 분리된 advisory 게이트 — exit 0 항상.
 * 결과는 표로 출력해 사용자가 점진적으로 다듬을 수 있게.
 *
 * 검사 항목:
 *   1. MDX 본문 단어 수 (600 ~ 1500 권장)
 *   2. 7-step 루프 필드 모두 존재 (hook · problemScenario · coreConcepts · mission · buildSteps · verificationChecklist · deliverable · reflectionQuestions)
 *   3. MDX 본문에 다른 레슨 인터링크 1개 이상 (`/lessons/...`)
 *   4. outputs 배열 1개 이상
 *   5. mission 통합 권장 (codexMission/claudeCodeMission 와 mission 동시 존재 시 ⚠)
 *
 * 사용법: npm run eval
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { lessons } from "../src/content/lessons";

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

interface CheckResult {
  slug: string;
  mdxWords: number | null;
  hasMdxBody: boolean;
  loopComplete: boolean;
  missingLoopFields: string[];
  hasInterlink: boolean;
  hasOutputs: boolean;
  unifiedMission: boolean;
  warnings: string[];
}

const REQUIRED_LOOP_FIELDS = [
  "hook",
  "problemScenario",
  "coreConcepts",
  "buildSteps",
  "verificationChecklist",
  "deliverable",
  "reflectionQuestions",
] as const;

const WORD_MIN = 600;
const WORD_MAX = 1500;

function countWords(text: string): number {
  // 한글 공백·하이픈·문장부호 분리 — 대략적 단어 수
  const cleaned = text
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // 마크다운 링크 텍스트만
    .replace(/[#*_>~`]/g, " ");
  return cleaned.split(/\s+/).filter(Boolean).length;
}

function checkLesson(lesson: (typeof lessons)[number]): CheckResult {
  const result: CheckResult = {
    slug: lesson.slug,
    mdxWords: null,
    hasMdxBody: lesson.hasMdxBody === true,
    loopComplete: true,
    missingLoopFields: [],
    hasInterlink: false,
    hasOutputs: (lesson.outputs?.length ?? 0) > 0,
    unifiedMission: !!lesson.mission,
    warnings: [],
  };

  // ── 7-step 루프 필드 ─────────────────────────────────────────
  for (const field of REQUIRED_LOOP_FIELDS) {
    const v = (lesson as unknown as Record<string, unknown>)[field];
    const empty =
      v == null ||
      v === "" ||
      (Array.isArray(v) && v.length === 0) ||
      (typeof v === "object" && v !== null && Object.keys(v).length === 0);
    if (empty) {
      result.loopComplete = false;
      result.missingLoopFields.push(field);
    }
  }
  // mission 또는 (codexMission && claudeCodeMission) 둘 중 하나는 있어야 함
  const hasUnified = !!lesson.mission;
  const hasLegacy =
    !!lesson.codexMission && !!lesson.claudeCodeMission;
  if (!hasUnified && !hasLegacy) {
    result.loopComplete = false;
    result.missingLoopFields.push("mission (or codexMission+claudeCodeMission)");
  }
  if (hasUnified && hasLegacy) {
    result.warnings.push(
      "mission 통합 + 레거시 codexMission/claudeCodeMission 동시 존재 — 통합 후 레거시 비워도 됨",
    );
  }

  // ── MDX 본문 ────────────────────────────────────────────────
  if (result.hasMdxBody) {
    const mdxPath = path.join(ROOT, "src/content/lessons", `${lesson.slug}.mdx`);
    if (fs.existsSync(mdxPath)) {
      const raw = fs.readFileSync(mdxPath, "utf-8");
      result.mdxWords = countWords(raw);
      result.hasInterlink = /\/lessons\/[a-z0-9-]+/.test(raw);
    } else {
      result.warnings.push(
        `hasMdxBody=true 인데 ${path.relative(ROOT, mdxPath)} 가 없음`,
      );
    }
  }

  return result;
}

const results = lessons.map(checkLesson);

// ── 보고 출력 ────────────────────────────────────────────────
console.log(
  c(COLORS.bold + COLORS.cyan, "AI Builder School — Lesson Quality Eval"),
);
console.log(c(COLORS.dim, "advisory only · exit 0 보장"));
console.log("");

const headers = [
  "slug",
  "MDX",
  "words",
  "loop",
  "link",
  "out",
  "miss",
  "warn",
];
const rows = results.map((r) => {
  const wordsStr =
    r.mdxWords == null
      ? "—"
      : r.mdxWords < WORD_MIN || r.mdxWords > WORD_MAX
        ? c(COLORS.yellow, String(r.mdxWords))
        : c(COLORS.green, String(r.mdxWords));
  return [
    r.slug.length > 36 ? r.slug.slice(0, 33) + "…" : r.slug,
    r.hasMdxBody ? c(COLORS.green, "✓") : c(COLORS.dim, "·"),
    wordsStr,
    r.loopComplete ? c(COLORS.green, "✓") : c(COLORS.red, "✗"),
    r.hasInterlink
      ? c(COLORS.green, "✓")
      : r.hasMdxBody
        ? c(COLORS.yellow, "·")
        : c(COLORS.dim, "—"),
    r.hasOutputs ? c(COLORS.green, "✓") : c(COLORS.yellow, "·"),
    r.missingLoopFields.length > 0
      ? c(COLORS.red, String(r.missingLoopFields.length))
      : c(COLORS.dim, "0"),
    r.warnings.length > 0
      ? c(COLORS.yellow, String(r.warnings.length))
      : c(COLORS.dim, "0"),
  ];
});

// 단순 폭 정렬 (ANSI escape 제외 길이 계산)
const stripAnsi = (s: string) =>
  // eslint-disable-next-line no-control-regex
  s.replace(/\x1b\[[0-9;]*m/g, "");
const widths = headers.map((h, i) =>
  Math.max(
    h.length,
    ...rows.map((row) => stripAnsi(row[i] ?? "").length),
  ),
);
const padCell = (raw: string, w: number) => {
  const visibleLen = stripAnsi(raw).length;
  return raw + " ".repeat(Math.max(0, w - visibleLen));
};

console.log(
  headers.map((h, i) => padCell(c(COLORS.bold, h), widths[i] ?? 0)).join("  "),
);
console.log(
  c(COLORS.dim, headers.map((_, i) => "─".repeat(widths[i] ?? 0)).join("  ")),
);
for (const row of rows) {
  console.log(row.map((cell, i) => padCell(cell, widths[i] ?? 0)).join("  "));
}

// ── 요약 ─────────────────────────────────────────────────────
const total = results.length;
const withMdx = results.filter((r) => r.hasMdxBody).length;
const loopOk = results.filter((r) => r.loopComplete).length;
const interlinkOk = results.filter((r) => r.hasInterlink).length;
const outputsOk = results.filter((r) => r.hasOutputs).length;
const wordWarn = results.filter(
  (r) => r.mdxWords != null && (r.mdxWords < WORD_MIN || r.mdxWords > WORD_MAX),
).length;

console.log("");
console.log(c(COLORS.bold, "Summary"));
console.log(`  레슨 총 ${total}개`);
console.log(
  `  MDX 본문 작성: ${withMdx}/${total}  · 7-step 완성: ${loopOk}/${total}`,
);
console.log(
  `  인터링크 있음: ${interlinkOk}/${withMdx}  · outputs 있음: ${outputsOk}/${total}`,
);
if (wordWarn > 0) {
  console.log(
    c(
      COLORS.yellow,
      `  단어 수 권장 범위(${WORD_MIN}~${WORD_MAX}) 벗어남: ${wordWarn}건`,
    ),
  );
}

// 경고 상세
const warns = results.filter((r) => r.warnings.length > 0);
if (warns.length > 0) {
  console.log("");
  console.log(c(COLORS.yellow + COLORS.bold, "Warnings"));
  for (const r of warns) {
    for (const w of r.warnings) {
      console.log(`  ${c(COLORS.cyan, r.slug)}  ${w}`);
    }
  }
}

console.log("");
console.log(
  c(
    COLORS.dim,
    "advisory · 이 결과는 막지 않아요. 시간을 두고 점진적으로 채워 가세요.",
  ),
);
process.exit(0);
