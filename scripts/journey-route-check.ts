#!/usr/bin/env tsx
/**
 * AI Builder School — 여정 루트 최적성 검증 (advisory)
 *
 * Harness · Evaluation hook 의 보조 게이트.
 * `validate`(필수)는 참조 무결성만 본다. 이 검사는 한 단계 더 들어간 *흐름* 검증이다.
 *
 * 검사 항목:
 *   R1. 여정의 recommendedPhases 가 phase.order 오름차순인가
 *   R2. 추천 레슨 각각의 prerequisites 가 같은 여정의 학습 흐름 안에 있는가
 *   R3. 추천 Phase 마다 그 여정에 targetJourneys 로 매핑된 레슨이 1개 이상 있는가
 *   R4. 추천 레슨이 모두 추천 Phase 안에 속하는가 (orphan 레슨 없음)
 *   R5. targetJourneys 에는 포함됐지만 여정의 어떤 Phase 에도 속하지 않은 레슨 (sponsor 없음)
 *
 * 모두 advisory — exit 0. 사용자가 점진적으로 다듬는다.
 *
 * 사용법: npm run eval 또는 npx tsx scripts/journey-route-check.ts
 */

import { lessons } from "../src/content/lessons";
import { phases } from "../src/content/phases";
import { journeys } from "../src/content/journeys";
import type { JourneyId } from "../src/lib/types";

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

interface Issue {
  rule: "R1" | "R2" | "R3" | "R4" | "R5";
  journey: JourneyId | "—";
  message: string;
}

const issues: Issue[] = [];

const phaseBySlug = new Map(phases.map((p) => [p.slug, p]));
const phaseById = new Map(phases.map((p) => [p.id, p]));
const lessonBySlug = new Map(lessons.map((l) => [l.slug, l]));

// ── R1: 추천 Phase 순서 오름차순 ─────────────────────────────
for (const j of journeys) {
  const orders = j.recommendedPhases
    .map((slug) => phaseBySlug.get(slug)?.order)
    .filter((o): o is number => typeof o === "number");

  for (let i = 1; i < orders.length; i++) {
    const prevOrder = orders[i - 1] ?? 0;
    const curOrder = orders[i] ?? 0;
    if (curOrder < prevOrder) {
      issues.push({
        rule: "R1",
        journey: j.id,
        message: `recommendedPhases가 오름차순이 아님: phase ${prevOrder} 다음에 phase ${curOrder}`,
      });
      break;
    }
  }
}

// ── R2: 추천 레슨의 prerequisites 가 흐름 안에 있는가 ────────
for (const j of journeys) {
  const journeyPhaseIds = new Set(
    j.recommendedPhases
      .map((slug) => phaseBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id)),
  );
  const explicitLessonSlugs = new Set(j.recommendedLessons);

  for (const lessonSlug of j.recommendedLessons) {
    const lesson = lessonBySlug.get(lessonSlug);
    if (!lesson) continue;
    for (const prereq of lesson.prerequisites) {
      const prereqLesson = lessonBySlug.get(prereq);
      if (!prereqLesson) continue; // validateContent가 별도로 검출
      // 사전 조건이 같은 여정 흐름에 있는지: 명시적 추천 OR 그 Phase가 추천에 포함됨 + 레슨이 그 여정을 target
      const inExplicit = explicitLessonSlugs.has(prereq);
      const inImplicitPhase =
        journeyPhaseIds.has(prereqLesson.phaseId) &&
        prereqLesson.targetJourneys.includes(j.id);
      if (!inExplicit && !inImplicitPhase) {
        issues.push({
          rule: "R2",
          journey: j.id,
          message: `추천 레슨 "${lessonSlug}"의 사전 조건 "${prereq}"가 이 여정 흐름에 없음`,
        });
      }
    }
  }
}

// ── R3: 추천 Phase 안에 그 여정 매칭 레슨이 1+ ────────────
for (const j of journeys) {
  for (const phaseSlug of j.recommendedPhases) {
    const phase = phaseBySlug.get(phaseSlug);
    if (!phase) continue;
    const matchingLessons = lessons.filter(
      (l) =>
        l.phaseId === phase.id && l.targetJourneys.includes(j.id),
    );
    if (matchingLessons.length === 0) {
      issues.push({
        rule: "R3",
        journey: j.id,
        message: `Phase "${phaseSlug}"가 추천되지만 이 여정에 매칭되는 레슨이 1개도 없음 (Phase 콘텐츠 미작성 또는 targetJourneys 누락)`,
      });
    }
  }
}

// ── R4: 추천 레슨이 추천 Phase 안에 속하는가 ────────────────
for (const j of journeys) {
  const journeyPhaseIds = new Set(
    j.recommendedPhases
      .map((slug) => phaseBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id)),
  );
  for (const lessonSlug of j.recommendedLessons) {
    const lesson = lessonBySlug.get(lessonSlug);
    if (!lesson) continue;
    if (!journeyPhaseIds.has(lesson.phaseId)) {
      const phase = phaseById.get(lesson.phaseId);
      issues.push({
        rule: "R4",
        journey: j.id,
        message: `추천 레슨 "${lessonSlug}"는 Phase "${phase?.slug ?? lesson.phaseId}"에 속하는데, 그 Phase가 이 여정의 recommendedPhases 에 없음`,
      });
    }
  }
}

// ── R5: targetJourneys 만 포함하고 여정 흐름에선 배제된 레슨 ──
for (const j of journeys) {
  const journeyPhaseIds = new Set(
    j.recommendedPhases
      .map((slug) => phaseBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id)),
  );
  for (const lesson of lessons) {
    if (!lesson.targetJourneys.includes(j.id)) continue;
    if (!journeyPhaseIds.has(lesson.phaseId)) {
      const phase = phaseById.get(lesson.phaseId);
      issues.push({
        rule: "R5",
        journey: j.id,
        message: `레슨 "${lesson.slug}"는 이 여정을 targetJourneys 로 가지지만 그 Phase "${phase?.slug ?? lesson.phaseId}"가 추천 흐름에 없음 (sponsor 없는 레슨)`,
      });
    }
  }
}

// ── 보고 ────────────────────────────────────────────────────
console.log(
  c(COLORS.bold + COLORS.cyan, "AI Builder School — Journey Route Check"),
);
console.log(c(COLORS.dim, "advisory only · exit 0 보장"));
console.log("");

if (issues.length === 0) {
  console.log(
    c(
      COLORS.green + COLORS.bold,
      "✓ 모든 여정 루트가 R1~R5 에서 깔끔합니다.",
    ),
  );
  console.log(
    c(
      COLORS.dim,
      `  journeys ${journeys.length} · phases ${phases.length} · lessons ${lessons.length}`,
    ),
  );
  process.exit(0);
}

// rule × journey 매트릭스
const RULE_TITLES: Record<Issue["rule"], string> = {
  R1: "추천 Phase 순서 오름차순",
  R2: "사전 조건 흐름 충족",
  R3: "Phase 안 매칭 레슨 ≥1",
  R4: "추천 레슨이 추천 Phase 내",
  R5: "여정 sponsor 누락 없음",
};

const grouped = new Map<string, Issue[]>();
for (const issue of issues) {
  const key = `${issue.rule} · ${issue.journey}`;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key)?.push(issue);
}

console.log(
  c(COLORS.yellow + COLORS.bold, `△ ${issues.length}건의 흐름 권고`),
);
console.log("");

for (const [key, list] of grouped) {
  const sample = list[0];
  if (!sample) continue;
  const title = RULE_TITLES[sample.rule];
  console.log(
    c(COLORS.yellow + COLORS.bold, `[${key}] ${title}`),
  );
  for (const issue of list) {
    console.log(`  · ${issue.message}`);
  }
  console.log("");
}

console.log(
  c(
    COLORS.dim,
    "advisory · 흐름 권고는 막지 않아요. 점진적으로 다듬어 가세요.\n" +
      "복구 옵션:\n" +
      "  R1 → journeys.ts 의 recommendedPhases 재배열\n" +
      "  R2 → 사전 조건 레슨을 같은 여정 추천에 추가\n" +
      "  R3 → 그 Phase 의 새 레슨 추가 시 targetJourneys 포함\n" +
      "  R4 → recommendedLessons 에서 빼거나 recommendedPhases 에 그 Phase 추가\n" +
      "  R5 → targetJourneys 에서 그 여정 제거 또는 recommendedPhases 에 그 Phase 추가",
  ),
);
process.exit(0);
