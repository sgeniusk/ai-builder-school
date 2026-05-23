// 특강 슬라이드 밀도 휴리스틱 린터 — 한 슬라이드에 콘텐츠가 너무 몰리는 케이스를 자동 경고.
// 슬라이드 stage는 desktop 4:3 (~880×660px) 기준이라, 분량 임계값은 그 안에 시각적으로 들어가도록 잡았다.
// 정규식 휴리스틱이라 100% 정확하진 않지만 — 목적은 "사람이 확인하게 만드는 안전망"이지 fail-gate가 아니다.
// 모든 결과는 severity="warning"으로 push되어 npm run validate는 통과하되 노란 경고로 표시된다.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface DensityIssue {
  kind: string;
  ref: string;
  message: string;
  severity: "warning";
}

/** 임계값 — 실측 기반으로 조정 가능. 초기 안전한 값으로 출발. */
const LIMITS = {
  /** 한 슬라이드의 가시 텍스트 총량 (블록 props 안 모든 문자열 합산) */
  slideTotalChars: 1100,
  /** TwoColumnListBlock left.items + right.items 합산 객체 수 */
  twoColumnItemsTotal: 10,
  /** TwoColumnListBlock 단일 item 텍스트 길이 */
  twoColumnItemLen: 90,
  /** TabsBlock 한 탭 한 컬럼 안 bullets 객체 수 */
  tabsBulletsPerColumn: 5,
  /** TabsBlock 단일 bullet 텍스트 길이 */
  tabsBulletLen: 100,
  /** CardGridBlock c=3 description 길이 */
  cardGrid3DescLen: 120,
  /** CardGridBlock c=2 description 길이 */
  cardGrid2DescLen: 200,
  /** TimelineBlock orientation=horizontal description 길이 */
  timelineHDescLen: 60,
  /** TimelineBlock orientation=vertical description 길이 */
  timelineVDescLen: 120,
  /** AccordionBlock items 개수 */
  accordionItems: 7,
  /** AccordionBlock 단일 answer 길이 */
  accordionAnswerLen: 700,
} as const;

/** 한 글자 정확하게 세려고 Array.from으로 surrogate pair 분리. */
function charLen(s: string): number {
  return Array.from(s).length;
}

/** MDX 텍스트 안 `key: "..."` 형태의 string 리터럴 값들을 추출. escape (\") 처리. */
function extractStringsAfterKey(text: string, key: string): string[] {
  // \"...\"는 escape, 그 외 "...\" 인경우 처리. JSX expression의 string은 모두 큰따옴표 가정.
  const pattern = new RegExp(`${key}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");
  const out: string[] = [];
  for (const m of text.matchAll(pattern)) {
    // \" → ", \\ → \ 등 단순 unescape
    out.push(m[1].replace(/\\(.)/g, "$1"));
  }
  return out;
}

/** `key: [ ... ]` 영역을 lazy-match로 추출 (nested array 없음 가정). */
function extractArrayBlocks(text: string, key: string): string[] {
  const pattern = new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`, "g");
  const out: string[] = [];
  for (const m of text.matchAll(pattern)) out.push(m[1]);
  return out;
}

/** JSX 컴포넌트 본문(`<Block ... />` 또는 `<Block ... > ... </Block>`)을 잡는다. self-closing만 정확. */
function extractBlocks(body: string, blockName: string): string[] {
  // self-closing <Block ... />
  const selfClosing = new RegExp(`<${blockName}([\\s\\S]*?)/>`, "g");
  const out: string[] = [];
  for (const m of body.matchAll(selfClosing)) out.push(m[1]);
  return out;
}

/** 슬라이드 단위로 분리 — `<Slide title="...">...</Slide>` 블록. */
interface SlideChunk {
  index: number;
  title: string;
  body: string;
}
function splitSlides(mdxText: string): SlideChunk[] {
  const slides: SlideChunk[] = [];
  // Slide title은 single-line 큰따옴표 가정
  const slideStart = /<Slide\s+title="((?:[^"\\]|\\.)*)"[^>]*>/g;
  let lastIdx = -1;
  let lastTitle = "";
  let lastStart = -1;
  for (const m of mdxText.matchAll(slideStart)) {
    if (lastIdx >= 0 && lastStart >= 0) {
      // 이전 슬라이드의 종료는 </Slide> 또는 다음 <Slide> 직전까지
      const closeIdx = mdxText.indexOf("</Slide>", lastStart);
      const endIdx = closeIdx >= 0 && closeIdx < m.index! ? closeIdx : m.index!;
      slides.push({
        index: lastIdx,
        title: lastTitle,
        body: mdxText.slice(lastStart, endIdx),
      });
    }
    lastIdx = slides.length;
    lastTitle = m[1];
    lastStart = m.index! + m[0].length;
  }
  // 마지막 슬라이드
  if (lastIdx >= 0 && lastStart >= 0) {
    const closeIdx = mdxText.indexOf("</Slide>", lastStart);
    const endIdx = closeIdx >= 0 ? closeIdx : mdxText.length;
    slides.push({
      index: lastIdx,
      title: lastTitle,
      body: mdxText.slice(lastStart, endIdx),
    });
  }
  return slides;
}

/**
 * 슬라이드 본문에서 "한 번에 시각적으로 보이는" 텍스트 총량 추정.
 * TabsBlock·AccordionBlock은 사용자가 한 번에 한 탭/한 항목만 보는 인터랙티브 컴포넌트이므로
 * 그 내부 텍스트는 슬라이드 총량 카운트에서 제외한다 (그 안의 분량은 컬럼/항목별 임계값으로 별도 검사).
 */
function estimateVisibleTextLength(body: string): number {
  // 인터랙티브 컴포넌트(Tabs/Accordion)의 self-closing JSX 영역을 통째로 제거
  let trimmed = body;
  for (const blockName of ["TabsBlock", "AccordionBlock"]) {
    const re = new RegExp(`<${blockName}[\\s\\S]*?/>`, "g");
    trimmed = trimmed.replace(re, "");
  }
  // 남은 영역에서 "..." 리터럴 합산
  const strLits = trimmed.match(/"((?:[^"\\]|\\.)*)"/g) || [];
  let sum = 0;
  for (const s of strLits) {
    const inner = s.slice(1, -1).replace(/\\(.)/g, "$1");
    sum += charLen(inner);
  }
  // 본문 마크다운 prose(블록 외, JSX 태그 제거 후)도 카운트
  const stripped = trimmed
    .replace(/<[^>]+>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .replace(/^\s*$/gm, "");
  sum += charLen(stripped.replace(/\s+/g, " ").trim());
  return sum;
}

// ─── 블록별 체크 ─────────────────────────────────────────────────

function checkTitleBlock(body: string, slideRef: string, issues: DensityIssue[]): void {
  // chips label만 길이 체크 (단일 단어가 권장)
  for (const props of extractBlocks(body, "TitleBlock")) {
    const labels = extractStringsAfterKey(props, "label");
    for (const lbl of labels) {
      if (charLen(lbl) > 12) {
        issues.push({
          severity: "warning",
          kind: "slide.density.title-chip-long",
          ref: slideRef,
          message: `TitleBlock chip label ${charLen(lbl)}자 (권장 ≤ 12) — "${lbl}"`,
        });
      }
    }
  }
}

function checkTwoColumnList(body: string, slideRef: string, issues: DensityIssue[]): void {
  for (const props of extractBlocks(body, "TwoColumnListBlock")) {
    // items 배열은 left.items와 right.items 두 곳
    const itemBlocks = extractArrayBlocks(props, "items");
    let total = 0;
    for (const arr of itemBlocks) {
      const objs = (arr.match(/\{\s*text\s*:/g) || []).length;
      total += objs;
    }
    if (total > LIMITS.twoColumnItemsTotal) {
      issues.push({
        severity: "warning",
        kind: "slide.density.twocolumn-too-many",
        ref: slideRef,
        message: `TwoColumnListBlock items ${total}개 (left+right 합산, 권장 ≤ ${LIMITS.twoColumnItemsTotal})`,
      });
    }
    // 각 item 텍스트 길이
    const texts = extractStringsAfterKey(props, "text");
    for (const t of texts) {
      if (charLen(t) > LIMITS.twoColumnItemLen) {
        issues.push({
          severity: "warning",
          kind: "slide.density.twocolumn-item-long",
          ref: slideRef,
          message: `TwoColumnListBlock item ${charLen(t)}자 (권장 ≤ ${LIMITS.twoColumnItemLen}) — "${t.slice(0, 30)}…"`,
        });
      }
    }
  }
}

function checkTabs(body: string, slideRef: string, issues: DensityIssue[]): void {
  for (const props of extractBlocks(body, "TabsBlock")) {
    // bullets 배열들 각각 (한 컬럼당 하나)
    const bulletBlocks = extractArrayBlocks(props, "bullets");
    for (const arr of bulletBlocks) {
      const count = (arr.match(/\{\s*text\s*:/g) || []).length;
      if (count > LIMITS.tabsBulletsPerColumn) {
        issues.push({
          severity: "warning",
          kind: "slide.density.tabs-bullets-too-many",
          ref: slideRef,
          message: `TabsBlock 한 컬럼 bullets ${count}개 (권장 ≤ ${LIMITS.tabsBulletsPerColumn})`,
        });
      }
    }
    // 단일 bullet 텍스트 길이
    const texts = extractStringsAfterKey(props, "text");
    for (const t of texts) {
      if (charLen(t) > LIMITS.tabsBulletLen) {
        issues.push({
          severity: "warning",
          kind: "slide.density.tabs-bullet-long",
          ref: slideRef,
          message: `TabsBlock bullet ${charLen(t)}자 (권장 ≤ ${LIMITS.tabsBulletLen}) — "${t.slice(0, 30)}…"`,
        });
      }
    }
  }
}

function checkCardGrid(body: string, slideRef: string, issues: DensityIssue[]): void {
  // CardGridBlock의 columns prop을 보고 c=2/c=3 분기
  const cardBlockRegex = /<CardGridBlock([\s\S]*?)\/>/g;
  for (const m of body.matchAll(cardBlockRegex)) {
    const props = m[1];
    const colMatch = props.match(/columns\s*=\s*\{?\s*(\d+)/);
    const cols = colMatch ? Number(colMatch[1]) : 3;
    const limit = cols === 2 ? LIMITS.cardGrid2DescLen : LIMITS.cardGrid3DescLen;
    const descs = extractStringsAfterKey(props, "description");
    for (const d of descs) {
      if (charLen(d) > limit) {
        issues.push({
          severity: "warning",
          kind: "slide.density.cardgrid-desc-long",
          ref: slideRef,
          message: `CardGridBlock(c=${cols}) description ${charLen(d)}자 (권장 ≤ ${limit}) — "${d.slice(0, 40)}…"`,
        });
      }
    }
  }
}

function checkTimeline(body: string, slideRef: string, issues: DensityIssue[]): void {
  const tlRegex = /<TimelineBlock([\s\S]*?)\/>/g;
  for (const m of body.matchAll(tlRegex)) {
    const props = m[1];
    const isVertical = /orientation\s*=\s*"vertical"/.test(props);
    const limit = isVertical ? LIMITS.timelineVDescLen : LIMITS.timelineHDescLen;
    const descs = extractStringsAfterKey(props, "description");
    for (const d of descs) {
      if (charLen(d) > limit) {
        issues.push({
          severity: "warning",
          kind: "slide.density.timeline-desc-long",
          ref: slideRef,
          message: `TimelineBlock(${isVertical ? "vertical" : "horizontal"}) description ${charLen(d)}자 (권장 ≤ ${limit}) — "${d.slice(0, 40)}…"`,
        });
      }
    }
  }
}

function checkAccordion(body: string, slideRef: string, issues: DensityIssue[]): void {
  for (const props of extractBlocks(body, "AccordionBlock")) {
    const qs = extractStringsAfterKey(props, "question");
    if (qs.length > LIMITS.accordionItems) {
      issues.push({
        severity: "warning",
        kind: "slide.density.accordion-too-many",
        ref: slideRef,
        message: `AccordionBlock items ${qs.length}개 (권장 ≤ ${LIMITS.accordionItems})`,
      });
    }
    const answers = extractStringsAfterKey(props, "answer");
    for (const a of answers) {
      if (charLen(a) > LIMITS.accordionAnswerLen) {
        issues.push({
          severity: "warning",
          kind: "slide.density.accordion-answer-long",
          ref: slideRef,
          message: `AccordionBlock answer ${charLen(a)}자 (권장 ≤ ${LIMITS.accordionAnswerLen})`,
        });
      }
    }
  }
}

function checkSlideTotal(body: string, slideRef: string, issues: DensityIssue[]): void {
  const total = estimateVisibleTextLength(body);
  if (total > LIMITS.slideTotalChars) {
    issues.push({
      severity: "warning",
      kind: "slide.density.slide-overflow",
      ref: slideRef,
      message: `슬라이드 가시 텍스트 ${total}자 (권장 ≤ ${LIMITS.slideTotalChars}) — 분량 분할 검토 필요`,
    });
  }
}

/** 특강 한 편의 MDX 파일을 읽어 슬라이드 밀도 이슈를 반환한다. */
export function checkSpecialSlideDensity(slug: string): DensityIssue[] {
  const path = join("src/content/specials", `${slug}.mdx`);
  let text: string;
  try {
    text = readFileSync(path, "utf-8");
  } catch {
    // MDX 파일이 없으면 다른 단계의 validator가 잡으니 여기선 조용히 패스.
    return [];
  }
  const slides = splitSlides(text);
  const issues: DensityIssue[] = [];
  for (const slide of slides) {
    const slideRef = `${slug} · slide ${slide.index + 1} — ${slide.title}`;
    checkTitleBlock(slide.body, slideRef, issues);
    checkTwoColumnList(slide.body, slideRef, issues);
    checkTabs(slide.body, slideRef, issues);
    checkCardGrid(slide.body, slideRef, issues);
    checkTimeline(slide.body, slideRef, issues);
    checkAccordion(slide.body, slideRef, issues);
    checkSlideTotal(slide.body, slideRef, issues);
  }
  return issues;
}
