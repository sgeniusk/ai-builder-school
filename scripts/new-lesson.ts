#!/usr/bin/env tsx
/**
 * AI Builder School — 새 레슨 스캐폴더
 *
 * Harness Engineering · Agent Topology · Tool layer 의 일부.
 * 새 레슨을 추가할 때 스키마가 빠짐없이 채워지도록 강제한다.
 *
 * 사용법:
 *   npm run new-lesson <slug> [--stage stage-2-ask] [--sub 4a] [--title "프롬프트 비교 실험"]
 *   npm run new-lesson <slug> [--phase phase-2-prompt-engineering] [--title "..."]   # legacy
 *
 * 예시:
 *   npm run new-lesson prompt-ab-test
 *   npm run new-lesson prompt-ab-test --stage stage-2-ask --title "프롬프트 A/B 비교"
 *   npm run new-lesson rag-eval-loop --stage stage-6-build --sub 6b --title "RAG 평가 루프"
 *
 * v0.4 — `--stage` (선택사항: `--sub`) 권장. `--phase`는 legacy로 작동은 하지만 deprecated 경고가 나온다.
 *
 * 동작:
 *   1. slug 검증 (kebab-case, 3~60자)
 *   2. lessons.ts에 이미 존재하는지 확인
 *   3. lessons.ts 배열 끝에 stub 객체 삽입
 *   4. src/content/lessons/<slug>.mdx 본문 템플릿 생성
 *   5. src/content/lessons/<slug>/outputs/README.md 생성
 *   6. lesson-bodies.ts에 import + registry 항목 추가
 *   7. 다음 단계 안내
 *
 * 종료 코드:
 *   0 — 정상 생성
 *   1 — 검증 실패 / 충돌
 *   2 — 파일 시스템 오류
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

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

function fail(msg: string, code = 1): never {
  console.error(c(COLORS.red + COLORS.bold, "✗ " + msg));
  process.exit(code);
}

// ── 1. Args 파싱 ────────────────────────────────────────────────
const args = process.argv.slice(2);
const slug = args[0];
if (!slug || slug.startsWith("--")) {
  fail(
    "사용법: npm run new-lesson <slug> [--phase <phaseSlug>] [--title <한글 제목>]",
  );
}

let phaseSlugArg = "phase-2-prompt-engineering";
let titleKoArg = "(레슨 제목을 입력하세요)";
let stageSlugArg: string | undefined;
let subGroupArg: string | undefined;
for (let i = 1; i < args.length; i += 2) {
  const flag = args[i];
  const val = args[i + 1];
  if (!val) fail(`${flag} 다음에 값이 와야 합니다.`);
  if (flag === "--phase") phaseSlugArg = val;
  else if (flag === "--title") titleKoArg = val;
  else if (flag === "--stage") stageSlugArg = val;
  else if (flag === "--sub") subGroupArg = val;
  else fail(`알 수 없는 플래그: ${flag}`);
}

// v0.4: stage 정보 결정. --stage가 있으면 stage-aware, 없으면 legacy phase 경고.
let stageId: string | undefined;
let stageOrdinal: number | undefined;
if (stageSlugArg) {
  // "stage-1-meet" → "stage-1"
  const m = stageSlugArg.match(/^(stage-\d+)/);
  if (!m) fail(`--stage 값이 stage-N-* 형식이 아닙니다. 받은 값: "${stageSlugArg}"`);
  stageId = m[1];
  if (subGroupArg && !/^[1-9][a-z]$/.test(subGroupArg)) {
    fail(`--sub 값이 형식에 맞지 않습니다. 예: 4a, 6c. 받은 값: "${subGroupArg}"`);
  }
} else {
  console.warn(
    c(
      COLORS.yellow,
      "⚠ v0.4 — `--stage` 플래그를 권장합니다. `--phase`는 legacy로 작동만 지원됩니다.",
    ),
  );
}

// ── 2. slug 검증 ───────────────────────────────────────────────
const slugPattern = /^[a-z][a-z0-9-]{2,59}$/;
if (!slugPattern.test(slug)) {
  fail(
    `slug는 kebab-case 소문자 + 숫자 + 하이픈, 3~60자여야 합니다.\n받은 값: "${slug}"`,
  );
}

// ── 3. 충돌 확인 ───────────────────────────────────────────────
const lessonsPath = path.join(ROOT, "src/content/lessons.ts");
const lessonBodiesPath = path.join(ROOT, "src/content/lesson-bodies.ts");
const lessonStageMappingPath = path.join(
  ROOT,
  "src/content/lesson-stage-mapping.ts",
);
const mdxPath = path.join(ROOT, `src/content/lessons/${slug}.mdx`);
const outputsDir = path.join(ROOT, `src/content/lessons/${slug}/outputs`);

if (!fs.existsSync(lessonsPath)) fail(`lessons.ts를 찾을 수 없음: ${lessonsPath}`, 2);
if (!fs.existsSync(lessonBodiesPath)) fail(`lesson-bodies.ts를 찾을 수 없음`, 2);

const lessonsRaw = fs.readFileSync(lessonsPath, "utf-8");
if (lessonsRaw.includes(`slug: "${slug}"`)) {
  fail(`이미 존재하는 slug: "${slug}". 다른 이름을 쓰세요.`);
}
if (fs.existsSync(mdxPath)) {
  fail(`MDX 파일이 이미 존재: ${mdxPath}`);
}

// ── 4. 다음 lesson id 결정 ─────────────────────────────────────
const idMatches = [...lessonsRaw.matchAll(/id:\s*"lesson-(\d+)"/g)].map((m) =>
  parseInt(m[1] ?? "0", 10),
);
const maxId = idMatches.length ? Math.max(...idMatches) : 0;
const nextId = String(maxId + 1).padStart(2, "0");
const newId = `lesson-${nextId}`;

// ── 4.5 stage ordinal 계산 (v0.4) ──────────────────────────────
let mappingRaw = "";
if (stageId) {
  if (!fs.existsSync(lessonStageMappingPath)) {
    fail(
      `lesson-stage-mapping.ts를 찾을 수 없음: ${lessonStageMappingPath}`,
      2,
    );
  }
  mappingRaw = fs.readFileSync(lessonStageMappingPath, "utf-8");
  if (mappingRaw.includes(`"${slug}":`)) {
    fail(`이미 매핑된 slug: "${slug}". lesson-stage-mapping.ts에 존재.`);
  }
  // 해당 stage의 ordinal 최댓값 찾기
  const ordinalPattern = new RegExp(
    `stageId:\\s*"${stageId}",\\s*stageOrdinal:\\s*(\\d+)`,
    "g",
  );
  const ordinals = [...mappingRaw.matchAll(ordinalPattern)].map((m) =>
    parseInt(m[1] ?? "0", 10),
  );
  stageOrdinal = ordinals.length ? Math.max(...ordinals) + 1 : 1;
}

// ── 5. lessons.ts 배열에 stub 삽입 ─────────────────────────────
// phase slug → phase id 변환:  "phase-2-prompt-engineering" → "phase-2"
const phaseId = phaseSlugArg.match(/^(phase-\d+)/)?.[1];
if (!phaseId) {
  fail(
    `--phase 값이 phase-N-* 형식이 아닙니다. 받은 값: "${phaseSlugArg}"`,
  );
}
const stub = `  {
    id: "${newId}",
    slug: "${slug}",
    phaseId: "${phaseId}",
    titleKo: "${titleKoArg}",
    titleEn: "TODO — English title",
    hook: "TODO — 한 문장으로, 학습자에게 말 거는 어조로.",
    summary: "TODO — 1~2문장 요약 (이 레슨이 무엇을 만드는가).",
    level: "beginner",
    estimatedMinutes: 45,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: [],
    learningGoals: [
      "TODO — 학습 목표 1",
      "TODO — 학습 목표 2",
      "TODO — 학습 목표 3",
    ],
    problemScenario:
      "TODO — 학습자가 공감할 만한 구체 시나리오 2~3문장.",
    coreConcepts: [
      { term: "TODO 개념 A", explanation: "TODO 1~2문장 설명." },
      { term: "TODO 개념 B", explanation: "TODO 1~2문장 설명." },
    ],
    codexMission: "TODO — Codex 미션 (back-compat용, 가능하면 비워두고 mission만 사용).",
    claudeCodeMission: "TODO — Claude Code 미션 (back-compat용).",
    mission:
      "Claude Code에게 아래 작업을 맡깁니다. 45분 안에 끝내는 걸 목표로 하세요.\\n\\nTODO — 통합 미션 본문.",
    codexNote: "TODO — Codex CLI에서 다른 부분만 1~2문장.",
    buildSteps: [
      "TODO — 단계 1",
      "TODO — 단계 2",
      "TODO — 단계 3",
    ],
    verificationChecklist: [
      "TODO — 검증 항목 1",
      "TODO — 검증 항목 2",
      "TODO — 검증 항목 3",
    ],
    deliverable: {
      title: "TODO — 산출물 제목",
      description: "TODO — 산출물 설명.",
      format: "Markdown 파일(.md)",
    },
    reflectionQuestions: [
      "TODO — 회고 질문 1",
      "TODO — 회고 질문 2",
      "TODO — 회고 질문 3",
    ],
    extensionIdeas: [
      "TODO — 확장 아이디어 1",
      "TODO — 확장 아이디어 2",
    ],
    tags: ["TODO"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "TODO.md",
        title: "TODO — 산출물 템플릿 제목",
        kind: "checklist",
      },
    ],
  },
];
`;

const closingPattern = /\n\];\s*$/;
if (!closingPattern.test(lessonsRaw)) {
  fail(
    "lessons.ts의 끝 패턴이 예상과 달라 자동 삽입 실패. 수동으로 추가하세요.",
    2,
  );
}
const newLessonsRaw = lessonsRaw.replace(closingPattern, "\n" + stub);

// ── 6. MDX 템플릿 생성 ────────────────────────────────────────
const mdxTemplate = `## 도입 — 학습자에게 말 거는 한 장면

(여기에 학습자가 자기 일에서 마주칠 법한 구체 시나리오 1~2 문단을 적습니다. 어조는 친근하게, "~해요" 위주로.)

## 왜 이 레슨인가

(이 레슨이 어떤 빈 자리를 채우는지, 그래서 오늘 어떤 한 가지를 만들 건지를 한 문단으로.)

## 핵심 개념 — 빠르게 짚고 갑니다

(coreConcepts와 같은 개념을 풀어 말합니다. 학습자가 이미 lessons.ts에서 보는 것보다 더 살아있는 톤으로.)

### 개념 A
설명...

### 개념 B
설명...

## 그래서 오늘 할 일

(deliverable로 가는 다리. "오늘 만들 한 장은 〇〇〇입니다." 식으로.)

[관련 레슨](/lessons/common-skills-of-future-proof-people)에서 만든 X와 합쳐지면 ___.

## 마무리

(7-step 루프 회고로 자연스럽게 넘어가는 한 문단.)
`;

const outputsReadme = `# Outputs — ${slug}

이 폴더에는 학습자가 다운로드하거나 복사해 쓰는 템플릿 파일이 들어갑니다.
\`lessons.ts\`의 \`outputs[]\` 배열과 일치하는 파일명을 사용하세요.

예시:
- \`TODO.md\` — 위 lessons.ts에 등록된 첫 산출물

작성 가이드:
- 학습자의 도메인을 채울 수 있는 빈칸 + 예시
- "0. 내 맥락 → 1. 본문 → N. 회고" 구조 권장
- 한 페이지 안에 들어가는 분량이면 충분
`;

// ── 7. lesson-bodies.ts 갱신 ──────────────────────────────────
const importVarName = slug
  .split("-")
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join("") + "Body";

const bodiesRaw = fs.readFileSync(lessonBodiesPath, "utf-8");

const importLine = `import ${importVarName} from "./lessons/${slug}.mdx";\n`;
const registryLine = `  "${slug}": ${importVarName},\n`;

// 마지막 import 뒤에 새 import 삽입
const importInsertPattern = /(import [^;]+\.mdx";\n)(?!import)/;
let newBodiesRaw: string;
if (importInsertPattern.test(bodiesRaw)) {
  newBodiesRaw = bodiesRaw.replace(importInsertPattern, "$1" + importLine);
} else {
  fail(
    "lesson-bodies.ts에 기존 import 패턴을 찾지 못했습니다. 수동 수정 필요.",
    2,
  );
}

// registry 객체 안에 새 항목 삽입 (마지막 항목 뒤)
const registryInsertPattern = /(\s+"[a-z0-9-]+": [A-Za-z0-9]+,\n)(\};)/;
if (registryInsertPattern.test(newBodiesRaw)) {
  newBodiesRaw = newBodiesRaw.replace(
    registryInsertPattern,
    "$1" + registryLine + "$2",
  );
} else {
  fail(
    "lesson-bodies.ts의 registry 끝을 찾지 못했습니다. 수동 수정 필요.",
    2,
  );
}

// ── 7.5 lesson-stage-mapping.ts 갱신 (v0.4) ────────────────────
let newMappingRaw: string | undefined;
if (stageId && mappingRaw) {
  const subSnippet = subGroupArg
    ? `, stageSubGroupId: "${subGroupArg}"`
    : "";
  const mappingLine = `  "${slug}": { stageId: "${stageId}", stageOrdinal: ${stageOrdinal}${subSnippet} },\n`;
  // 매핑 객체 닫는 `};` 직전에 삽입
  const mappingClosePattern = /\n\};\s*\n\s*\/\*\*/;
  if (!mappingClosePattern.test(mappingRaw)) {
    fail(
      "lesson-stage-mapping.ts 닫는 패턴(`};` + 분포 상수 주석)을 찾지 못함. 수동 추가 필요.",
      2,
    );
  }
  newMappingRaw = mappingRaw.replace(mappingClosePattern, "\n" + mappingLine + "};\n\n/**");
}

// ── 8. 파일 시스템 쓰기 (트랜잭셔널 흉내) ────────────────────
try {
  fs.mkdirSync(path.dirname(mdxPath), { recursive: true });
  fs.mkdirSync(outputsDir, { recursive: true });
  fs.writeFileSync(mdxPath, mdxTemplate, "utf-8");
  fs.writeFileSync(path.join(outputsDir, "README.md"), outputsReadme, "utf-8");
  fs.writeFileSync(lessonsPath, newLessonsRaw, "utf-8");
  fs.writeFileSync(lessonBodiesPath, newBodiesRaw, "utf-8");
  if (newMappingRaw) {
    fs.writeFileSync(lessonStageMappingPath, newMappingRaw, "utf-8");
  }
} catch (err) {
  console.error(c(COLORS.red, "파일 쓰기 중 오류"), err);
  process.exit(2);
}

// ── 9. 결과 보고 ───────────────────────────────────────────────
console.log(c(COLORS.green + COLORS.bold, `✓ 새 레슨 스캐폴드 완료: ${slug}`));
console.log("");
console.log(c(COLORS.dim, "추가된 파일:"));
console.log(`  ${path.relative(ROOT, mdxPath)}`);
console.log(`  ${path.relative(ROOT, path.join(outputsDir, "README.md"))}`);
console.log(c(COLORS.dim, "수정된 파일:"));
console.log(`  src/content/lessons.ts (lesson id: ${newId})`);
console.log(`  src/content/lesson-bodies.ts (registered ${importVarName})`);
if (stageId) {
  console.log(
    `  src/content/lesson-stage-mapping.ts (${stageId} / ordinal ${stageOrdinal}${
      subGroupArg ? ` / sub ${subGroupArg}` : ""
    })`,
  );
}
console.log("");
console.log(c(COLORS.yellow + COLORS.bold, "다음 단계:"));
console.log("  1. lessons.ts 새 객체에서 TODO 항목을 채웁니다.");
console.log(`  2. ${path.relative(ROOT, mdxPath)} 본문을 친근 어조로 작성합니다.`);
console.log("  3. outputs 폴더에 산출물 템플릿(.md)을 만듭니다.");
if (stageId) {
  console.log(
    `  4. src/content/stages.ts의 stageId="${stageId}" 객체에 lessonSlugs로 "${slug}" 추가 (subGroup 있으면 해당 subGroup에도).`,
  );
  console.log("  5. v0.4 — phases.ts는 legacy. stages.ts만 갱신해도 PR D 이후엔 충분합니다.");
} else {
  console.log(`  4. phases.ts의 phaseId="${phaseSlugArg}"에 lessonSlugs로 "${slug}" 추가.`);
}
console.log("  6. npm run check 통과 확인.");
process.exit(0);
