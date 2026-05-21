#!/usr/bin/env tsx
/**
 * 레슨 일람을 Stage 순서로 출력 — v2.0 레슨 통합·심화(스펙 2) 기획 시 빠르게 훑기 위한 유틸.
 *
 * 사용법:
 *   npm run list:lessons
 *   npm run list:lessons -- --json     # JSON 형식
 *   npm run list:lessons -- --csv      # CSV (Excel/Sheets 붙여넣기용)
 */

import { getLessons, getStages, getJourneys } from "../src/lib/content";

const args = new Set(process.argv.slice(2));
const asJson = args.has("--json");
const asCsv = args.has("--csv");

const stages = getStages();
const lessons = getLessons();
const journeys = getJourneys();

type Row = {
  stageOrder: number;
  stageTitle: string;
  ordinal: number | undefined;
  subGroup: string | undefined;
  slug: string;
  titleKo: string;
  minutes: number;
  journeys: string[];
  prereqCount: number;
};

const rows: Row[] = [];
for (const stage of stages) {
  for (const slug of stage.lessonSlugs) {
    const l = lessons.find((x) => x.slug === slug);
    if (!l) continue;
    rows.push({
      stageOrder: stage.order,
      stageTitle: stage.titleKo,
      ordinal: l.stageOrdinal,
      subGroup: l.stageSubGroupId,
      slug: l.slug,
      titleKo: l.titleKo,
      minutes: l.estimatedMinutes,
      journeys: l.targetJourneys,
      prereqCount: l.prerequisites?.length ?? 0,
    });
  }
}

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}

if (asCsv) {
  console.log("stage_order,stage,ordinal,sub_group,slug,title,minutes,journeys,prereqs");
  for (const r of rows) {
    const j = r.journeys.join("|");
    const t = r.titleKo.replace(/"/g, '""');
    console.log(`${r.stageOrder},"${r.stageTitle}",${r.ordinal ?? ""},${r.subGroup ?? ""},${r.slug},"${t}",${r.minutes},"${j}",${r.prereqCount}`);
  }
  process.exit(0);
}

// 기본 — 사람이 읽는 트리 형식
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
};
const c = (code: string, s: string) => (process.stdout.isTTY ? `${code}${s}${C.reset}` : s);

let totalMinutes = 0;
let prevStage = -1;
for (const r of rows) {
  if (r.stageOrder !== prevStage) {
    const stageLessons = rows.filter((x) => x.stageOrder === r.stageOrder);
    const stageMins = stageLessons.reduce((a, b) => a + b.minutes, 0);
    console.log("");
    console.log(
      c(C.bold + C.yellow, `■ Stage ${r.stageOrder} — ${r.stageTitle}`) +
        c(C.dim, `  (${stageLessons.length}개 · ${stageMins}분)`),
    );
    prevStage = r.stageOrder;
  }
  const prefix = r.subGroup ? c(C.dim, `[${r.subGroup}] `) : "";
  const num = c(C.dim, String(r.ordinal ?? "·").padStart(2));
  const mins = c(C.dim, ` (${r.minutes}분)`);
  const journeys = r.journeys.length
    ? c(C.green, ` ·` + r.journeys.map((j) => ` ${j}`).join(""))
    : "";
  const prereq = r.prereqCount ? c(C.dim, ` ←${r.prereqCount}`) : "";
  console.log(`  ${num}. ${prefix}${c(C.cyan, r.slug)}${mins}${prereq}`);
  console.log(`      ${r.titleKo}${journeys}`);
  totalMinutes += r.minutes;
}

console.log("");
console.log(
  c(
    C.bold + C.green,
    `합계 — 레슨 ${rows.length}개 · ${totalMinutes}분 (${Math.round(totalMinutes / 60)}시간) · ${stages.length} Stage · ${journeys.length} Journey`,
  ),
);
