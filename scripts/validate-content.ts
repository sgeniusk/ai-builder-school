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
 *   0 — error 0건 (warning은 출력하되 게이트를 막지 않는다 — 스펙 §4-4)
 *   1 — error 1건 이상 발견
 *   2 — 스크립트 자체 실행 오류
 */

import { validateContent, type ContentIntegrityIssue } from "../src/lib/content";
import { phases } from "../src/content/phases";
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

/** 종류별로 그룹화해 출력한다 */
function printGrouped(issues: ContentIntegrityIssue[]): void {
  const byKind = new Map<string, ContentIntegrityIssue[]>();
  for (const issue of issues) {
    const arr = byKind.get(issue.kind) ?? [];
    arr.push(issue);
    byKind.set(issue.kind, arr);
  }
  for (const [kind, list] of byKind) {
    console.log(color(COLORS.yellow + COLORS.bold, `[${kind}]`));
    for (const issue of list) {
      console.log(`  ${color(COLORS.cyan, issue.ref)}  ${issue.message}`);
    }
    console.log("");
  }
}

try {
  const issues = validateContent();
  const errors = issues.filter((i) => i.severity !== "warning");
  const warnings = issues.filter((i) => i.severity === "warning");

  const stats = {
    phases: phases.length,
    lessons: lessons.length,
    journeys: journeys.length,
    projects: projects.length,
    templates: templates.length,
  };

  if (errors.length === 0) {
    const summary = Object.entries(stats)
      .map(([k, v]) => `${k} ${v}`)
      .join(" · ");
    console.log(color(COLORS.green + COLORS.bold, "✓ Content OK"));
    console.log(color(COLORS.dim, `  ${summary}`));

    if (warnings.length > 0) {
      console.log("");
      console.log(
        color(
          COLORS.yellow + COLORS.bold,
          `⚠ ${warnings.length}건의 경고 (비차단 — 게이트를 막지 않습니다)`,
        ),
      );
      console.log("");
      printGrouped(warnings);
    }
    process.exit(0);
  }

  console.log(
    color(
      COLORS.red + COLORS.bold,
      `✗ ${errors.length}건의 무결성 오류가 발견되었습니다.`,
    ),
  );
  console.log("");
  printGrouped(errors);

  if (warnings.length > 0) {
    console.log(
      color(COLORS.yellow + COLORS.bold, `⚠ 추가로 ${warnings.length}건의 경고:`),
    );
    console.log("");
    printGrouped(warnings);
  }

  console.log(
    color(
      COLORS.dim,
      "복구 힌트:\n" +
        "  - 누락된 slug를 추가하거나, 잘못된 참조를 제거하세요.\n" +
        "  - 자동 수정하지 마세요. 콘텐츠 변경은 사람이 확인 후 커밋합니다.",
    ),
  );

  process.exit(1);
} catch (err) {
  console.error(
    color(COLORS.red + COLORS.bold, "✗ Validation script crashed:"),
  );
  console.error(err);
  process.exit(2);
}
