# Top-down P2 실행 체크리스트

> **For agentic workers:** 이 레포의 검증 루프는 단위 테스트가 아니라 `npm run check`(lint·typecheck·validate·build) + 시각 확인이다(Harness Contract). writing-plans의 TDD 단계를 그 게이트로 치환했다. 단계는 `- [ ]` 체크박스로 추적한다.
> 근거 — [review §5 Data Model · §6 Page개편 · §8 P2](./2026-06-06-topdown-transition-review.md). P0([p0-plan](./2026-06-06-topdown-p0-plan.md))·P1([p1-checklist](./2026-06-06-topdown-p1-checklist.md)) 완료·push됨.
> 작성 2026-06-07 · 검토 대상 main 최신.

**Goal** — P1 "남김" 세 작업(blocker 전 프로젝트 확대 + Journey 필드 · Template `projectStepUsage` · `conceptDepth` 4단 사다리)을 적용해, top-down 엔진의 마지막 미연결부(막힘 전수화·단계별 도구 호출·개념 깊이)를 운전석에 잇는다.

**Architecture** — 기존 데이터 모델을 교체하지 않고 옵셔널 필드로 확장한다(review §5 원칙). UI는 전부 기존 컴포넌트·CSS 확장(P1-3 막힘 토글, P0 JIT 헤더, 프로젝트 milestone 렌더)이라 새 디자인 위험이 낮다. 콘텐츠는 점진 — blocker는 전수 백필하되, conceptDepth는 타입·UI·컴패니언을 먼저 완성하고 샘플 3개만 채운 뒤 이후 세션에서 백필한다.

**Tech Stack** — Next.js 15 App Router · React 19 · TS5 · 콘텐츠는 `src/content/*.ts` · 검증은 `npm run check`.

**검증 원칙** — 각 태스크는 (1) `npm run check` 그린, (2) `npm run dev`로 해당 화면 시각 확인, (3) 통과 시 독립 커밋. push는 절대 자동으로 하지 않는다 — 매 push가 prod 배포이므로 전체 끝에 사용자 승인이 stop point다.

---

## 결정 사항 (브레인스토밍에서 확정 — 실행 전 뒤집고 싶으면 말해주세요)

| # | 결정 | 채택 | 메모 |
|---|---|---|---|
| D1 | 진행 순서 | **작은 것부터** — 작업 1(blocker+Journey) → 2(projectStepUsage) → 3(conceptDepth) | 독립·저위험부터, 가장 큰 conceptDepth를 마지막에. P0·P1 리듬 |
| D2 | conceptDepth 콘텐츠 범위 | **타입·아코디언·컴패니언 먼저 + 샘플 3개**, 나머지 이후 백필 | review §7-6/§7-7에 샘플 실문안 있음 |
| D3 | conceptDepth 위치 | **`Lesson.conceptDepth?`에 직접** | `concepts.ts`의 10개 Concept 노드는 위키/그래프용 draft라 별개. 나중에 `blocker.conceptSlug`로 연결 |
| D4 | 작업 2 칩 위치 | **milestone 칸 안** 인라인 ("이 단계 양식 →") | 빌드하다 그 자리에서 호출하는 게 top-down 취지 |
| D5 | 작업 1 fastStartProject 노출 | **`/journeys/[journeyId]` 상세에만** | `/start` 연동은 P2 범위 밖(이후 선택) |

---

## File Structure

| 파일 | 동작 | 책임 |
|---|---|---|
| `src/lib/types.ts` | 수정 | `Journey.fastStartProject?`·`primaryProjects?` · `ContentTemplate.projectStepUsage?` · `ConceptDepth` + `Lesson.conceptDepth?` |
| `src/lib/content.ts` | 수정 | `validateContent`에 blocker·journey 신규 slug 참조 검사 추가 · `getTemplatesByProjectStep` 헬퍼 |
| `src/content/journeys.ts` | 수정 | 6개 여정에 `fastStartProject`·`primaryProjects` 백필 |
| `src/content/projects.ts` | 수정 | blocker 없는 14개 프로젝트에 `blockers[]` 백필 (4→18) |
| `src/content/templates.ts` | 수정 | 프로젝트 단계에서 쓰는 템플릿에 `projectStepUsage` 백필 |
| `src/content/lessons.ts` | 수정 | 샘플 3개 레슨에 `conceptDepth` 백필 |
| `src/app/journeys/[journeyId]/page.tsx` | 수정 | fastStartProject 카드 + primaryProjects 목록 노출 |
| `src/app/projects/[slug]/page.tsx` | 수정 | milestone 칸에 "이 단계 양식" 칩 |
| `src/app/lessons/[lessonSlug]/page.tsx` | 수정 | "개념 깊이 4단계" 아코디언 |
| `src/lib/companion.ts` | 수정 | `buildHandoffPrompt`에 conceptDepth 주입 · `buildQuestionChips`에 깊이 칩 |

---

## Task 1 — Journey 필드 + validate 안전망 (스키마·검증 토대)

blocker 14개 백필 전에 **검증부터 깐다** — `validateContent`가 현재 blocker의 `rescueLesson`/`rescueTemplate`/`conceptSlug` slug를 검사하지 않으므로(content.ts grep 0건), 지금 백필하면 오타가 런타임까지 샌다.

**Files:** `src/lib/types.ts` · `src/lib/content.ts` · `src/content/journeys.ts`

- [ ] **Step 1: 타입 확장 — Journey 신규 필드**

`src/lib/types.ts`의 `Journey` 인터페이스에서 `expectedOutcome` 줄 아래에 추가(옵셔널이라 기존 6개 안전):
```ts
  /** 여정 끝났을 때 손에 남는 것 한 줄 */
  expectedOutcome: string;
  /** 이 여정에서 가장 먼저 권하는 단 1개 프로젝트 slug — 상세 상단 "여기서 출발" 카드. */
  fastStartProject?: string;
  /** capstoneIdeas(문자열)를 실제 project slug로 묶은 주력 프로젝트 목록. */
  primaryProjects?: string[];
```

- [ ] **Step 2: validateContent에 blocker·journey 신규 slug 참조 검사 추가**

`src/lib/content.ts`의 `validateContent`(195~509) 끝의 `return issues;` 직전에 블록을 삽입한다. 기존 검사 패턴(`issues.push({ ... })`)을 그대로 따른다 — 우선 기존 issue push 형식을 한 건 확인하고 동일 형태로 맞춘다.

검사 내용:
1. 모든 `project.blockers[].rescueLesson`이 실재 레슨 slug인지 (`getLessonBySlug`)
2. 모든 `project.blockers[].rescueTemplate`이 실재 템플릿 slug인지 (`getTemplateBySlug`)
3. 모든 `project.blockers[].rescueSpecial`이 실재 special slug인지 (`getSpecialBySlug`)
4. 모든 `project.blockers[].conceptSlug`이 실재 concept slug인지 (`concepts`)
5. 모든 `journey.fastStartProject` / `journey.primaryProjects[]`가 실재 project slug인지 (`getProjectBySlug`)

```ts
  // ── Top-down P2 — blocker·journey 신규 slug 참조 무결성 ──
  for (const project of projects) {
    for (const b of project.blockers ?? []) {
      if (b.rescueLesson && !getLessonBySlug(b.rescueLesson)) {
        issues.push({ kind: "broken-ref", node: `project:${project.slug}`, detail: `blocker.rescueLesson "${b.rescueLesson}" 미존재` });
      }
      if (b.rescueTemplate && !getTemplateBySlug(b.rescueTemplate)) {
        issues.push({ kind: "broken-ref", node: `project:${project.slug}`, detail: `blocker.rescueTemplate "${b.rescueTemplate}" 미존재` });
      }
      if (b.rescueSpecial && !getSpecialBySlug(b.rescueSpecial)) {
        issues.push({ kind: "broken-ref", node: `project:${project.slug}`, detail: `blocker.rescueSpecial "${b.rescueSpecial}" 미존재` });
      }
      if (b.conceptSlug && !concepts.some((c) => c.slug === b.conceptSlug)) {
        issues.push({ kind: "broken-ref", node: `project:${project.slug}`, detail: `blocker.conceptSlug "${b.conceptSlug}" 미존재` });
      }
    }
  }
  for (const journey of journeys) {
    const refs = [journey.fastStartProject, ...(journey.primaryProjects ?? [])].filter(Boolean) as string[];
    for (const slug of refs) {
      if (!getProjectBySlug(slug)) {
        issues.push({ kind: "broken-ref", node: `journey:${journey.id}`, detail: `primaryProjects/fastStartProject "${slug}" 미존재` });
      }
    }
  }
```

> 주의 — `ContentIntegrityIssue`의 실제 필드명(`kind`/`node`/`detail`)을 Step 시작 시 `grep "interface ContentIntegrityIssue" src/lib/content.ts`로 확인하고 위 push를 그 형태에 맞춘다. `concepts` import가 없으면 상단 import에 추가. `getSpecialBySlug`·`getTemplateBySlug`·`getProjectBySlug`·`getLessonBySlug`는 동일 파일 export라 직접 호출 가능.

- [ ] **Step 3: Journey 6개 백필**

`src/content/journeys.ts`의 각 여정 객체 `expectedOutcome` 아래에 추가. 매핑은 실재 project slug(검증됨):
```ts
// starter
fastStartProject: "meeting-notes-bot",
primaryProjects: ["meeting-notes-bot", "prompt-library-starter-kit"],

// practitioner
fastStartProject: "weekly-report-autopilot",
primaryProjects: ["weekly-report-autopilot", "meeting-notes-bot", "internal-ai-usage-guideline"],

// creator
fastStartProject: "blog-to-shortform",
primaryProjects: ["blog-to-shortform", "newsletter-ai-desk", "local-shop-content-calendar"],

// founder
fastStartProject: "claude-code-weekend-app",
primaryProjects: ["claude-code-weekend-app", "gpt-wrapper-product", "ai-saas-mvp"],

// engineer
fastStartProject: "document-qa-bot",
primaryProjects: ["document-qa-bot", "rag-with-evals", "team-coding-workflow"],

// ai-native
fastStartProject: "personal-research-agent",
primaryProjects: ["ai-saas-mvp", "personal-research-agent", "rag-with-evals"],
```

- [ ] **Step 4: 게이트 + 커밋**

Run: `npm run check` → 그린. (validate가 신규 검사를 통과 = 6개 여정 매핑 slug 전부 실재 확인)
```bash
git add src/lib/types.ts src/lib/content.ts src/content/journeys.ts
git commit -m "feat(p2): Journey fastStartProject·primaryProjects + validate blocker/journey 참조 검사"
```

---

## Task 2 — blocker 14개 프로젝트 백필 (4→18 전수화)

Task 1의 validate 안전망이 깔린 상태에서 백필 — 오타 slug는 `npm run check`가 잡는다. 형식은 기존 4개와 동일: `{ symptom, rescueLesson?, rescueTemplate?, conceptSlug? }`, 프로젝트당 2~3개.

**Files:** `src/content/projects.ts`

- [ ] **Step 1: 백필 원칙 + slug 풀 확정**

각 프로젝트의 `milestones`·`keyLessons`·`templateSlugs`를 읽어, 그 프로젝트에서 **실제로 막히는 지점**을 symptom으로 뽑는다. rescueLesson은 keyLessons/fallbackLesson 우선, rescueTemplate은 그 프로젝트 templateSlugs 안에서 고른다. concept은 `concepts.ts` 10개(human-in-the-loop·hallucination·prompt-structure·context-engineering·rag·embedding·tool-use·agent-loop·prompt-injection·evals) 중 해당 시만.

대상 14개 — `meeting-notes-bot`·`prompt-library-starter-kit`·`internal-ai-usage-guideline`·`local-shop-content-calendar`·`nano-banana-image-kit`·`blog-to-shortform`·`newsletter-ai-desk`·`midjourney-brand-visuals`·`team-coding-workflow`·`claude-code-weekend-app`·`codex-legacy-refactor`·`personal-research-agent`·`rag-with-evals`·`ai-saas-mvp`.

- [ ] **Step 2: 각 프로젝트에 `blockers[]` 삽입**

각 프로젝트 객체에서 `templateSlugs:` 줄 근처(기존 4개와 같은 위치)에 추가한다. 완성 샘플 3개(나머지 11개도 동일 방식 — 해당 프로젝트의 keyLessons·templateSlugs 안에서만 참조):
```ts
// meeting-notes-bot — keyLessons: structure-of-good-prompts 등 / templateSlugs: meeting-notes-prompt, output-format-prompt, self-check-prompt, prompt-quality-checklist
blockers: [
  { symptom: "녹취·메모를 넣어도 요약이 핵심을 놓쳐요", rescueLesson: "structure-of-good-prompts", rescueTemplate: "meeting-notes-prompt" },
  { symptom: "결정·할 일·담당자가 뒤섞여 나와요", rescueTemplate: "output-format-prompt" },
  { symptom: "요약이 사실과 다를 때가 있어요", rescueLesson: "hallucination-verification", rescueTemplate: "self-check-prompt", conceptSlug: "hallucination" },
],

// blog-to-shortform — templateSlugs: four-axis-prompt, few-shot-prompt, output-format-prompt
blockers: [
  { symptom: "긴 글을 쇼츠 길이로 줄이면 맥락이 깨져요", rescueLesson: "structure-of-good-prompts", rescueTemplate: "four-axis-prompt" },
  { symptom: "톤이 매번 달라져 채널 색이 흔들려요", rescueTemplate: "few-shot-prompt" },
  { symptom: "자막·해시태그 형식이 들쭉날쭉해요", rescueTemplate: "output-format-prompt" },
],

// rag-with-evals — templateSlugs: rag-checklist, output-verification-checklist, ai-cost-checklist
blockers: [
  { symptom: "검색이 엉뚱한 청크를 가져와요", rescueLesson: "document-chunking-strategy", rescueTemplate: "rag-checklist", conceptSlug: "rag" },
  { symptom: "답이 좋아졌는지 나빠졌는지 숫자로 모르겠어요", rescueTemplate: "output-verification-checklist", conceptSlug: "evals" },
  { symptom: "토큰 비용이 예측 안 돼요", rescueTemplate: "ai-cost-checklist" },
],
```

> 나머지 11개는 같은 규칙으로 실행 시 채운다 — **반드시 그 프로젝트의 templateSlugs / 실재 레슨 slug만** 참조. 의심되면 `grep '"<slug>"' src/content/lessons.ts` 로 존재 확인. validate가 최종 게이트.

- [ ] **Step 3: 게이트 + 시각 확인**

Run: `npm run check` → 그린(broken-ref 0). 시각 — 백필한 프로젝트 2~3개 상세에서 "여기서 막혔나요?" 섹션이 자동으로 뜨는지 확인(P1-3 UI 재사용).

- [ ] **Step 4: 커밋**
```bash
git add src/content/projects.ts
git commit -m "content(p2): blocker 전 18개 프로젝트로 확대 (4→18)"
```

---

## Task 3 — Template `projectStepUsage` + 단계별 호출 UI

**Files:** `src/lib/types.ts` · `src/lib/content.ts` · `src/content/templates.ts` · `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: 타입 추가**

`src/lib/types.ts`의 `ContentTemplate`에서 `usedWhen?` 아래에 추가:
```ts
  /** "이럴 때 꺼내 쓴다" — 템플릿을 도구로 만드는 한 줄 맥락. */
  usedWhen?: string;
  /** 어느 프로젝트 몇 단계(0-based milestone index)에서 쓰는가 — 빌드 중 그 자리에서 직접 호출. */
  projectStepUsage?: { projectSlug: string; milestoneIndex: number }[];
```

- [ ] **Step 2: 역인덱스 헬퍼**

`src/lib/content.ts`의 `getTemplateBySlug`(160) 아래에 추가:
```ts
/** 특정 프로젝트의 특정 milestone(0-based)에서 쓰는 템플릿 목록. */
export function getTemplatesByProjectStep(projectSlug: string, milestoneIndex: number): ContentTemplate[] {
  return getTemplates().filter((t) =>
    (t.projectStepUsage ?? []).some(
      (u) => u.projectSlug === projectSlug && u.milestoneIndex === milestoneIndex,
    ),
  );
}
```

- [ ] **Step 3: 템플릿 백필**

`src/content/templates.ts`에서 프로젝트 단계와 직결되는 템플릿에 `projectStepUsage`를 추가한다. 매핑 근거 = 각 프로젝트의 `templateSlugs` + milestone 의미. 완성 샘플(milestoneIndex는 해당 프로젝트 `milestones` 배열의 0-based 위치 — 실행 시 각 프로젝트 milestone 수를 확인하고 부여):
```ts
// four-axis-prompt — 여러 프로젝트의 "프롬프트 설계" 단계
projectStepUsage: [
  { projectSlug: "weekly-report-autopilot", milestoneIndex: 0 },
  { projectSlug: "blog-to-shortform", milestoneIndex: 1 },
],

// rag-checklist — RAG 프로젝트의 "검색 품질" 단계
projectStepUsage: [
  { projectSlug: "document-qa-bot", milestoneIndex: 1 },
  { projectSlug: "rag-with-evals", milestoneIndex: 1 },
],

// output-verification-checklist — 검증 단계
projectStepUsage: [
  { projectSlug: "document-qa-bot", milestoneIndex: 2 },
],
```
> 8~12개 템플릿에 부여하면 충분(전수 아님). milestoneIndex는 추측 금지 — 해당 프로젝트 `milestones` 길이를 보고 실제 단계에 맞춘다.

- [ ] **Step 4: 프로젝트 상세 milestone 칸에 칩 렌더**

`src/app/projects/[slug]/page.tsx`. milestone map(108~)에서 `getTemplatesByProjectStep(project.slug, index)`를 호출해 칩을 그린다. 먼저 import에 헬퍼 추가, map 콜백이 index를 받도록 수정:
```tsx
// import 블록
import { getTemplatesByProjectStep } from "@/lib/content"; // 기존 content import에 합치기

// milestones.map — index 추가
{project.milestones.map((m, index) => {
  const stepTemplates = getTemplatesByProjectStep(project.slug, index);
  return (
    <li key={m.title} className="proj-milestone">
      <h3 className="proj-milestone__title">{m.title}</h3>
      <p className="proj-milestone__desc">{m.description}</p>
      {/* ...기존 firstStep·starterPrompt·fallbackLesson 렌더 유지... */}
      {stepTemplates.length > 0 && (
        <p className="proj-milestone__tools">
          {stepTemplates.map((t) => (
            <Link key={t.slug} href={`/templates/${t.slug}`} className="proj-milestone__tool">
              📋 {t.title} <span className="arrow">→</span>
            </Link>
          ))}
        </p>
      )}
    </li>
  );
})}
```
> map 콜백이 이미 다른 형태면(예: `.map((m) => { ... })`) 시그니처만 `(m, index)`로 바꾸고 본문은 보존. `proj-milestone__tools`/`__tool` CSS는 globals.css에 작은 규칙 추가(기존 칩/링크 스타일 차용 — 별색 배경 + 인라인). `Link` import 존재 확인.

- [ ] **Step 5: 게이트 + 시각 확인 + 커밋**

Run: `npm run check` → 그린. 시각 — `/projects/document-qa-bot`에서 해당 단계 아래 "📋 양식" 칩이 뜨고 `/templates/...`로 가는지 확인.
```bash
git add src/lib/types.ts src/lib/content.ts src/content/templates.ts "src/app/projects/[slug]/page.tsx" src/app/globals.css
git commit -m "feat(p2): Template projectStepUsage — milestone 단계별 양식 직접 호출"
```

---

## Task 4 — conceptDepth 4단 사다리 (타입·아코디언·컴패니언 + 샘플 3개)

**Files:** `src/lib/types.ts` · `src/content/lessons.ts` · `src/app/lessons/[lessonSlug]/page.tsx` · `src/lib/companion.ts` · `src/components/lesson/LessonCompanion.tsx`

- [ ] **Step 1: 타입 추가**

`src/lib/types.ts`. `CoreConcept` 인터페이스 아래(149~152 근처)에 `ConceptDepth`를 정의하고, `Lesson`의 `neededWhen?` 아래에 필드 추가:
```ts
/** 개념 깊이 4단 사다리 — 재귀 튜터가 단계별로 읽어 비유→실무→구현→원리로 설명. */
export interface ConceptDepth {
  /** 12세에게 설명하듯 쉬운 비유 한 단락. */
  explainLikeTwelve: string;
  /** 실무 개념 — 일하면서 쓰는 수준. */
  practicalExplanation: string;
  /** 구현 — 코드·도구로 어떻게 되는가. */
  implementationNotes: string;
  /** 원리 — 왜 그렇게 동작하는가(선택). */
  deeperTheory?: string;
}
```
```ts
  // Lesson 인터페이스, neededWhen? 아래
  neededWhen?: string;
  /** 개념 깊이 4단. 있으면 레슨 상단 아코디언 + 컴패니언 핸드오프에 주입. */
  conceptDepth?: ConceptDepth;
```

- [ ] **Step 2: 샘플 3개 백필**

`src/content/lessons.ts`. review §7-6/§7-7 실문안 기반으로 3개 레슨에 추가(각 레슨 `neededWhen` 근처).
```ts
// structure-of-good-prompts (review §7-6)
conceptDepth: {
  explainLikeTwelve: "프롬프트는 부탁이 아니라 주문서예요. \"맛있게\"가 아니라 \"덜 맵게, 2인분, 15분 안에\"라고 적어야 원하는 게 나와요.",
  practicalExplanation: "작업(Task)·맥락(Context)·제약(Constraints)·출력형식(Output) 네 축을 분리해 적으면, 같은 요청이 매번 같은 품질로 돌아옵니다.",
  implementationNotes: "출력 예시나 스키마를 프롬프트 안에 직접 박아 재현성을 확보합니다. 4축을 섹션 헤더로 명시하면 모델이 빠뜨리지 않아요.",
  deeperTheory: "맥락이 빠지면 모델은 학습 분포의 가장 흔한 답으로 회귀합니다. 명세가 분포를 좁히는 만큼 출력이 안정됩니다.",
},

// grounded-rag-answers
conceptDepth: {
  explainLikeTwelve: "모르는 문제에 아는 척 답하지 말고, 교과서를 펴서 그 쪽을 보고 답하라고 시키는 거예요. 출처 없이 지어내면 0점.",
  practicalExplanation: "질문과 관련된 문서 조각을 먼저 검색해 프롬프트에 넣고, \"준 자료 안에서만, 없으면 모른다고\" 답하게 합니다.",
  implementationNotes: "검색된 청크를 출처 메타와 함께 컨텍스트에 주입하고, 답변에 인용 스니펫을 강제합니다. 근거 없는 문장은 후처리로 거릅니다.",
  deeperTheory: "생성은 검색 품질에 종속됩니다 — 엉뚱한 청크가 들어오면 좋은 모델도 엉뚱하게 답합니다. RAG 품질의 8할은 검색이에요.",
},

// github-issue-to-ai-brief (review §7-7)
conceptDepth: {
  explainLikeTwelve: "이슈는 \"어디 아파요\"이고, 브리프는 검사·진단·처방이 적힌 차트예요. 차트가 있어야 의사(에이전트)가 헛손질을 안 해요.",
  practicalExplanation: "재현 스텝·수용 조건·영향 범위·검증 명령 네 축으로 이슈를 브리프로 변환해 에이전트에 넘깁니다.",
  implementationNotes: "`gh issue view`로 본문을 받아 브리프 형식으로 변환하고, `.github/ISSUE_TEMPLATE/ai-brief.md`로 표준화합니다.",
  deeperTheory: "첫 시도 정확도는 모델 성능이 아니라 입력 명세의 완결성이 결정합니다 — 빠진 칸이 곧 헛나가는 자리예요.",
},
```
> 세 slug가 실재하는지 Step 시작 시 `grep -n 'slug: "structure-of-good-prompts"\|slug: "grounded-rag-answers"\|slug: "github-issue-to-ai-brief"' src/content/lessons.ts`로 확인. 없으면 가장 가까운 실재 slug로 교체(review가 가리킨 lesson-201/502 계열).

- [ ] **Step 3: 레슨 페이지 아코디언 렌더**

`src/app/lessons/[lessonSlug]/page.tsx`. `neededWhen` 헤더 블록(76~92) 바로 아래에 4단 아코디언을 삽입. `?from=project`로 들어온 학습자(`fromProject`가 P0 Task4에서 이미 계산됨)에겐 펼침 기본.
```tsx
{lesson.conceptDepth && (
  <details className="concept-depth" open={Boolean(fromProject)}>
    <summary className="concept-depth__summary">📐 개념 깊이 — 비유 · 실무 · 구현 · 원리</summary>
    <div className="concept-depth__rung">
      <span className="concept-depth__label mono">비유</span>
      <p>{lesson.conceptDepth.explainLikeTwelve}</p>
    </div>
    <div className="concept-depth__rung">
      <span className="concept-depth__label mono">실무</span>
      <p>{lesson.conceptDepth.practicalExplanation}</p>
    </div>
    <div className="concept-depth__rung">
      <span className="concept-depth__label mono">구현</span>
      <p>{lesson.conceptDepth.implementationNotes}</p>
    </div>
    {lesson.conceptDepth.deeperTheory && (
      <div className="concept-depth__rung">
        <span className="concept-depth__label mono">원리</span>
        <p>{lesson.conceptDepth.deeperTheory}</p>
      </div>
    )}
  </details>
)}
```
> `concept-depth*` CSS를 globals.css에 추가(들여쓴 카드 + 라벨 칩, 기존 토큰 `--paper-2`·`--ink-2`·`--accent` 차용). `fromProject` 변수가 스코프에 있는지 확인(P0 Task4에서 `const fromProject = ...` 추가됨).

- [ ] **Step 4: 컴패니언에 conceptDepth 주입**

`src/lib/companion.ts`. `buildHandoffPrompt`에서 mission 라인들 뒤, `[되묻기]` 앞에 4단 요약을 넣는다. 그리고 `buildQuestionChips`에 깊이 칩 1개 추가.
```ts
// buildHandoffPrompt — lines.push("", "[되묻기]", question); 직전에
if (lesson.conceptDepth) {
  const cd = lesson.conceptDepth;
  lines.push(
    "",
    "[개념 깊이 4단 — 내가 막힌 깊이까지 단계별로 풀어줘]",
    `· 비유: ${cd.explainLikeTwelve}`,
    `· 실무: ${cd.practicalExplanation}`,
    `· 구현: ${cd.implementationNotes}`,
  );
  if (cd.deeperTheory) lines.push(`· 원리: ${cd.deeperTheory}`);
}
```
```ts
// buildQuestionChips — "이 레슨, 한마디로 정리해줘" push 근처에 추가
if (lesson.conceptDepth) chips.push("개념을 비유부터 원리까지 단계별로 설명해줘");
```

- [ ] **Step 5: 게이트 + 시각 확인 + 커밋**

Run: `npm run check` → 그린(conceptDepth 없는 레슨에서 아코디언 생략되는지 포함). 시각 — `/lessons/structure-of-good-prompts`(아코디언 접힘) vs `?from=document-qa-bot`(펼침), 컴패니언 칩에 "개념을 비유부터…" 노출 + 클릭 시 프롬프트에 4단 포함 확인.
```bash
git add src/lib/types.ts src/content/lessons.ts "src/app/lessons/[lessonSlug]/page.tsx" src/lib/companion.ts src/components/lesson/LessonCompanion.tsx src/app/globals.css
git commit -m "feat(p2): conceptDepth 4단 사다리 — 아코디언 + 컴패니언 주입 + 샘플 3개"
```

---

## Self-Review

**1. Spec(§8 P2 + P1 남김) 커버리지**
- "blocker 전 프로젝트 확대" → Task 2 (4→18)
- "Journey fastStartProject/primaryProjects" → Task 1
- "Template projectStepUsage" → Task 3
- "conceptDepth 4단 + 아코디언 + 컴패니언" → Task 4
→ P1 "남김" 3항목 + review §5 신규 필드 전부 매핑. (진척 모델 재정의·/me 포트폴리오·실시간 튜터는 review §8 P2의 "백엔드 동반" 항목으로, 무백엔드 원칙상 별도 배치 — 이번 P2 범위 밖, 의도적 제외)

**2. Placeholder 스캔** — 타입·헬퍼·UI·컴패니언은 실제 코드. blocker 11개·projectStepUsage 나머지·conceptDepth 나머지는 "방법 + 후보 풀 + 완성 샘플 3개 + validate 게이트"로 명시(추측 slug 금지 규칙 포함). "적절히"·"TODO" 없음.

**3. 타입 일관성** — `fastStartProject?: string`·`primaryProjects?: string[]`(Task1 정의 → Task1 백필 → Task1 UI). `projectStepUsage?: {projectSlug; milestoneIndex}[]`(Task3 정의 → 헬퍼 `getTemplatesByProjectStep` 동명 사용 → 백필 → UI). `ConceptDepth`/`conceptDepth?`(Task4 정의 → 백필 → 아코디언 → 컴패니언 `lesson.conceptDepth` 동일 접근). 신규 헬퍼·필드명 전 태스크 일치.

**리스크 메모** — Task1 validate 검사는 `ContentIntegrityIssue` 실제 필드명에 맞춰야 함(Step2 주의). Task3 milestoneIndex는 각 프로젝트 milestone 수 확인 필수(추측 금지). 모든 신규 필드 옵셔널 → 기존 콘텐츠·build 안전.

---

## 실행 순서 권장

Task 1 → 2 → 3 → 4 (의존: Task2는 Task1 validate 안전망 뒤). 각 태스크 독립 커밋, 전체 끝 `npm run check` 그린 재확인 후 사용자 승인 시에만 `git push`(= prod 배포).

## 남김(P2 이후 — 백엔드 동반, 무백엔드 원칙과 충돌해 별도 결정 필요)
- 진척 모델 재정의 — 산출물·검증·회고 1급화, rank 재설계 (review §8)
- 산출물 포트폴리오 — /me 개편
- conceptDepth 나머지 레슨 백필 (샘플 3 → 핵심 12 → 전체)
- 실시간 AI 튜터 (백엔드·API 키)
