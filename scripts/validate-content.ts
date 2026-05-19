#!/usr/bin/env tsx
/**
 * AI Builder School — 콘텐츠 무결성 검증
 *
 * Harness Engineering · Feedback Loop 의 머신측 강제.
 * pre-commit 훅과 CI 에서 동일하게 호출된다.
 *
 * 사용법:
 *   npm run validate
 *
 * 종료 코드:
 *   0 — 모든 검증 통과
 *   1 — 1건 이상 무결성 이슈 발견
 *   2 — 스크립트 자체 실행 오류
 */

import { validateContent } from "../src/lib/content";
import { stages } from "../src/content/stages";
import { lessons } from "../src/content/lessons";
import { journeys } from "../src/content/journeys";
import { projects } from "../src/content/projects";
import { templates } from "../src/content/templates";

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function color(code: string, text: string): string {
  return process.stdout.isTTY ? `${code}${text}${COLORS.reset}` : text;
}

try {
  const issues = validateContent();
  const stats = {
    stages: stages.length,
    lessons: lessons.length,
    journeys: journeys.length,
    projects: projects.length,
    templates: templates.length,
  };

  const summary = Object.entries(stats)
    .map(([k, v]) => `${k} ${v}`)
    .join(" · ");

  // severity 미지정은 error로 간주 (content.ts 계약)
  const errors = issues.filter((i) => i.severity !== "warning");
  const warnings = issues.filter((i) => i.severity === "warning");

  // 종류별 그룹화해 출력
  function printGroup(list: typeof issues): void {
    const byKind = new Map<string, typeof issues>();
    for (const issue of list) {
      const arr = byKind.get(issue.kind) ?? [];
      arr.push(issue);
      byKind.set(issue.kind, arr);
    }
    for (const [kind, items] of byKind) {
      console.log(color(COLORS.yellow + COLORS.bold, `[${kind}]`));
      for (const issue of items) {
        console.log(`  ${color(COLORS.cyan, issue.ref)}  ${issue.message}`);
      }
      console.log("");
    }
  }

  if (errors.length > 0) {
    console.log(
      color(
        COLORS.red + COLORS.bold,
        `✗ ${errors.length}건의 무결성 이슈가 발견되었습니다.`,
      ),
    );
    console.log("");
    printGroup(errors);
  }

  if (warnings.length > 0) {
    console.log(
      color(
        COLORS.yellow + COLORS.bold,
        `⚠ ${warnings.length}건의 경고 (게이트는 통과합니다).`,
      ),
    );
    console.log("");
    printGroup(warnings);
  }

  if (errors.length > 0) {
    console.log(
      color(
        COLORS.dim,
        "복구 힌트:\n" +
          "  - 누락된 slug를 추가하거나, 잘못된 참조를 제거하세요.\n" +
          "  - 자동 수정하지 마세요. 콘텐츠 변경은 사람이 확인 후 커밋합니다.",
      ),
    );
    process.exit(1);
  }

  const okLabel =
    warnings.length > 0
      ? `✓ Content OK (경고 ${warnings.length}건)`
      : "✓ Content OK";
  console.log(color(COLORS.green + COLORS.bold, okLabel));
  console.log(color(COLORS.dim, `  ${summary}`));
  process.exit(0);
} catch (err) {
  console.error(
    color(COLORS.red + COLORS.bold, "✗ Validation script crashed:"),
  );
  console.error(err);
  process.exit(2);
}
