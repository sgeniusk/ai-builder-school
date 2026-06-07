# Top-down P0 묶음 구현 계획

> **For agentic workers:** 이 레포의 검증 루프는 단위 테스트가 아니라 `npm run check`(lint·typecheck·validate·build) + 시각 확인이다(Harness Contract). writing-plans의 TDD 단계를 그 게이트로 치환했다. 단계는 `- [ ]` 체크박스로 추적한다.
> 근거 보고서 — [2026-06-06-topdown-transition-review.md](./2026-06-06-topdown-transition-review.md) §8 P0
>
> ✅ **실행 완료 · push 완료** 2026-06-06 — Task 0~5 전부 커밋(`5daf0a3`..`9329242`). 로컬 `npm run check` + GitHub Pages export 빌드 모두 그린. **origin/main 반영됨 — prod 라이브.**

**Goal** — Top-down 전환의 P0(카피·진입·프레이밍·죽은 코드)를 적용해, 데이터 대공사 없이 적합도 58 → ~72로 끌어올린다.

**Architecture** — 기존 데이터 모델은 거의 손대지 않는다. 진입 IA를 빌드-우선으로 열고(Home·Start), 프로젝트를 "캡스톤"에서 "지금 바로 짓기"로 재프레이밍하고, 레슨에 "왜 지금"과 "프로젝트로 복귀"를 붙인다. 죽은 구홈 코드를 제거한다.

**Tech Stack** — Next.js 15 App Router · React 19 · TS5 · 콘텐츠는 `src/content/*.ts` · 검증은 `npm run check`.

**검증 원칙** — 각 태스크는 (1) `npm run check` 그린, (2) `npm run dev`로 해당 화면 시각 확인(가능하면 Playwright 스냅샷), (3) 통과 시 커밋. push는 절대 자동으로 하지 않는다 — 매 push가 Vercel/GitHub Pages prod 배포이므로 사용자 승인이 stop point다.

---

## 결정 사항 (기본값 채택 — 실행 전 뒤집고 싶으면 말해주세요)

세 가지 범위 결정에 보고서 권고를 기본값으로 박았다. 그대로 가면 아래 태스크대로 실행한다.

| # | 결정 | 채택(기본) | 대안 |
|---|---|---|---|
| D1 | P0에 데이터 모델 변경 포함? | **Lesson에 `neededWhen?` 옵셔널 1개만 추가**(Task 4). 전부 옵셔널이라 validate·build 안 깨짐 | 순수 카피만(필드 0) — JIT 헤더가 일반 문구로 약해짐 / 또는 P1로 미룸 |
| D2 | Home 진입 변경 범위 | **CTA 우선순위 변경 + 프로젝트 갤러리 섹션**(새 라우트 없음, Task 2) | `/build` 네비게이터 페이지까지(→ P1로 둠) |
| D3 | Start 개편 강도 | **출발 질문을 1번으로 추가, 역할 진단 유지**(Task 5) | 역할 진단을 산출물 진단으로 완전 교체 |

---

## File Structure

| 파일 | 동작 | 책임 |
|---|---|---|
| `src/components/Sections.tsx` | 수정(삭제) | 죽은 구홈 컴포넌트 7종 + 미사용 import 제거 |
| `src/components/landing/LandingProjects.tsx` | **생성** | 랜딩 "오늘 지을 것" 프로젝트 갤러리 |
| `src/components/landing/LandingSections.tsx` | 수정 | Hero CTA 우선순위(빌드-우선) |
| `src/app/page.tsx` | 수정 | LandingProjects 섹션 삽입 |
| `src/app/projects/page.tsx` | 수정 | "캡스톤" → "오늘 지을 것" 재카피 |
| `src/app/projects/[slug]/page.tsx` | 수정 | capstone-note → "지금 바로 짓기" 재카피 |
| `src/components/ProjectReadiness.tsx` | 수정 | "준비 레슨" → "막힐 때 보는 레슨" 라벨 |
| `src/lib/types.ts` | 수정 | `Lesson.neededWhen?` 추가 |
| `src/content/lessons.ts` | 수정 | 핵심 레슨 6개에 `neededWhen` 백필 |
| `src/app/lessons/[lessonSlug]/page.tsx` | 수정 | JIT 헤더 렌더 + `?from=` 프로젝트 복귀 CTA |

> 미사용 CSS(`.hero`, `.usp-*`, `.principles-*` 등) 정리는 공유 위험이 있어 P0에서 제외 — 별도 정리 패스(P1)로 둔다.

---

## Task 0 — 카운트·브랜드 정정 ✅ 완료

2026-06-06 이번 세션에서 완료(커밋 대기). `8→6`/`84→89`를 `getStages().length`/`getLessons().length` 동적 파생으로 전환, `builderRank` 최고 티어 임계값을 `total` 인자화, 공유 카드 리브랜딩 누락분(`AI BUILDER SCHOOL`→`지음 · 知音`, 옛 태그라인→`SITE_TAGLINE`) 수정. `npm run check` 그린.
- [x] 완료 — 커밋만 남음(사용자 승인 시): `git commit -m "fix: stale stage/lesson 카운트 동적화 + 공유카드 리브랜딩"`

---

## Task 1 — 죽은 구홈 코드 제거

**Files:**
- Modify: `src/components/Sections.tsx`

미사용 확정(전체 src 0-사용, globals.css 주석 1건 제외) — `Hero`, `UspCards`, `LearningLoopSection`, `JourneyPicker`, `BuilderPrinciples`, `CTASection`, `StatList`. 현 홈은 `landing/LandingSections.tsx`를 쓴다. 살아 있는 export는 `PageHead`·`SectionHeading`·`StageLadder` 셋뿐.

- [ ] **Step 1: 제거 직전 0-사용 재확인**

Run:
```bash
cd "/Users/taewookkim/AI Builder School" && for c in Hero UspCards LearningLoopSection JourneyPicker BuilderPrinciples CTASection StatList; do echo "$c: $(grep -rn "<$c\b\|\b$c(" src/app src/components | grep -v "Sections.tsx" | wc -l | tr -d ' ')"; done
```
Expected: 모두 `0`.

- [ ] **Step 2: 죽은 컴포넌트 + 미사용 import 삭제**

`Sections.tsx`에서 다음을 제거한다 — 함수 `Hero`, `UspCards`(+ 상수 `USP_AXES`), `LearningLoopSection`, `JourneyPicker`, `BuilderPrinciples`(+ 인터페이스 `BuilderPrinciple`, 상수 `BUILDER_PRINCIPLES`), `CTASection`, `StatList`. 그리고 더 이상 안 쓰는 상단 import 2줄을 지운다.

제거할 import:
```ts
import { LearningLoop } from "./LearningLoop";
import { HeroStats } from "./HeroStats";
```
남길 import — `Link`(StageLadder·JourneyPicker 중 StageLadder만 남으므로 Link 사용 여부 확인 후 유지), `CSSProperties`(StageLadder가 사용 → 유지), `Container`, `Journey`/`Stage` 타입(StageLadder가 Stage 사용). `ReactNode`는 PageHead/SectionHeading이 사용 → 유지.

> 주의 — `Journey` 타입은 JourneyPicker 제거 후 미사용이 될 수 있다. tsc(strict)가 미사용 import를 에러로 막지는 않지만, eslint가 잡으면 `Journey`를 import에서 빼라. Step 3에서 확인된다.

- [ ] **Step 3: 게이트 + 홈 시각 확인**

Run: `npm run check`
Expected: `✔ No ESLint warnings or errors` · tsc 통과 · build 그린. eslint가 미사용 심볼을 지적하면 해당 import만 정리하고 재실행.

홈 확인:
```bash
npm run dev  # http://localhost:3000 — 히어로·여정 섹션 정상 렌더(죽은 코드는 원래 안 보였으므로 변화 없어야 정상)
```

- [ ] **Step 4: 커밋**
```bash
git add src/components/Sections.tsx
git commit -m "chore: remove dead pre-rebrand home components from Sections.tsx"
```

---

## Task 2 — Home 빌드-우선 진입 (CTA + 프로젝트 갤러리)

**Files:**
- Create: `src/components/landing/LandingProjects.tsx`
- Modify: `src/components/landing/LandingSections.tsx` (Hero CTA)
- Modify: `src/app/page.tsx` (섹션 삽입)

- [ ] **Step 1: 프로젝트 갤러리 컴포넌트 생성**

기존 `ProjectCard`(`Cards.tsx`)와 `proj-grid` 스타일을 재사용해 위험을 줄인다. 준비도 막대(`keyLessonRefs`)는 빌드-우선 톤에 안 맞으니 넘기지 않는다.

Create `src/components/landing/LandingProjects.tsx`:
```tsx
// 랜딩 — "오늘 지을 것" 프로젝트 갤러리. 빌드-우선 진입로의 핵심 섹션.
import Link from "next/link";
import { ProjectCard } from "@/components/Cards";
import type { Project } from "@/lib/types";

export function LandingProjects({ projects }: { projects: Project[] }) {
  // 난이도 오름차순(입문 먼저)에서 6개를 추려 첫 화면 부담을 줄인다.
  const picks = projects.slice(0, 6);
  return (
    <section className="lp-section lp-section--tint">
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 12 }}>오늘 지을 것</div>
        <h2 className="lp-h2">무엇을 만들고 싶어요?</h2>
        <p className="lp-journeymap__sub" style={{ marginBottom: 28 }}>
          먼저 다 배우지 않아도 돼요. 만들고 싶은 것 하나를 골라 오늘 첫 삽을 뜨고, 막히면 그때 레슨을 부르세요.
        </p>
        <div className="proj-grid">
          {picks.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <Link href="/projects" className="btn ghost">
            프로젝트 전체 보기 <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Hero CTA를 빌드-우선으로**

`src/components/landing/LandingSections.tsx`의 `LandingHero` CTA 블록을 교체한다.

old:
```tsx
            <div className="lp-hero__ctas">
              <Link href="/start" className="btn">
                30초 진단 시작 <span className="arrow">→</span>
              </Link>
              <Link href="/stages" className="btn ghost">
                여섯 단계 둘러보기
              </Link>
            </div>
```
new:
```tsx
            <div className="lp-hero__ctas">
              <Link href="/projects" className="btn">
                무엇을 지을지 고르기 <span className="arrow">→</span>
              </Link>
              <Link href="/start" className="btn ghost">
                30초 진단으로 길 찾기
              </Link>
            </div>
```
또한 히어로 하단 캡션을 빌드-우선 톤으로(선택).
old: `선행 지식 0 · 입문에서 마스터까지 한 길`
new: `선행 지식 0 · 짓다가 배웁니다`

- [ ] **Step 3: 홈에 갤러리 섹션 삽입**

`src/app/page.tsx`를 수정한다 — `getProjects`를 가져와 여정 지도와 여정 카드 사이에 갤러리를 넣는다(빌드 진입을 여정 서사보다 앞쪽에 둔다).

old:
```tsx
import { getJourneys } from "@/lib/content";

export default function HomePage() {
  const journeys = getJourneys();

  return (
    <>
      <LandingHero journeys={journeys} />
      <Reveal>
        <LandingValue />
      </Reveal>
      <Reveal>
        <LandingJourneyMap journeys={journeys} />
      </Reveal>
      <Reveal>
        <LandingJourneyCards journeys={journeys} />
      </Reveal>
```
new:
```tsx
import { getJourneys, getProjects } from "@/lib/content";
import { LandingProjects } from "@/components/landing/LandingProjects";

export default function HomePage() {
  const journeys = getJourneys();
  const projects = getProjects();

  return (
    <>
      <LandingHero journeys={journeys} />
      <Reveal>
        <LandingValue />
      </Reveal>
      <Reveal>
        <LandingProjects projects={projects} />
      </Reveal>
      <Reveal>
        <LandingJourneyMap journeys={journeys} />
      </Reveal>
      <Reveal>
        <LandingJourneyCards journeys={journeys} />
      </Reveal>
```

- [ ] **Step 4: 게이트 + 시각 확인**

Run: `npm run check`
Expected: 그린.
시각 — `npm run dev` → 홈에서 "오늘 지을 것" 갤러리가 6개 카드로 뜨고, 히어로 1차 버튼이 `/projects`로 가는지 확인. (Playwright 사용 시) `mcp__plugin_playwright_playwright__browser_navigate` http://localhost:3000 → `browser_snapshot`로 섹션·버튼 확인.

- [ ] **Step 5: 커밋**
```bash
git add src/components/landing/LandingProjects.tsx src/components/landing/LandingSections.tsx src/app/page.tsx
git commit -m "feat(landing): build-first 진입 — 프로젝트 갤러리 + 히어로 CTA 재배치"
```

---

## Task 3 — 프로젝트 "캡스톤" → "지금 바로 짓기" 재프레이밍

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/components/ProjectReadiness.tsx`

- [ ] **Step 1: 목록 페이지 카피 교체**

`src/app/projects/page.tsx`.

metadata old:
```tsx
  title: "프로젝트 · 캡스톤 아이디어",
  description:
    "지음 학습자가 도전할 수 있는 포트폴리오급 캡스톤 프로젝트 모음. 난이도별로 빌드 단계·전제 레슨·완료 기준까지.",
```
new:
```tsx
  title: "프로젝트 · 오늘 지을 것",
  description:
    "지음 학습자가 오늘 바로 시작할 수 있는 프로젝트 모음. 먼저 다 배우지 않아도 돼요 — 만들다 막히면 그때 레슨을 부릅니다.",
```

PageHead old:
```tsx
        title={<>만든 것이<br />포트폴리오가 됩니다.</>}
        lede="각 프로젝트는 특정 Stage 세트를 전제로 하며, 배포 가능한 결과물이 목표입니다. 카드를 누르면 빌드 단계·전제 레슨·완료 기준이 펼쳐집니다. 입문은 위쪽, 심화는 아래쪽 — 자기 수준에서 시작하세요."
```
new:
```tsx
        title={<>만들고 싶은 것에서<br />시작합니다.</>}
        lede="먼저 다 배우고 오지 않아도 돼요. 만들고 싶은 것 하나를 골라 오늘 첫 삽을 뜨고, 막히는 곳마다 그때 필요한 레슨을 부르세요. 입문은 위쪽, 심화는 아래쪽 — 자기 수준에서 시작하세요."
```

- [ ] **Step 2: 상세 페이지 capstone-note 교체**

`src/app/projects/[slug]/page.tsx`의 `capstone-note` 블록을 교체한다.

old:
```tsx
        <div className="capstone-note">
          <div className="capstone-note__tag">이건 캡스톤이에요</div>
          <p>
            프로젝트는 레슨처럼 한 줄씩 따라 하는 가이드가 아니라, 배운 걸 혼자
            적용하는 졸업 과제예요. 아래 <strong>준비시키는 레슨</strong>을 먼저
            끝내면 훨씬 수월해요. 각 빌드 단계에는 막막함을 덜어 줄{" "}
            <strong>먼저 할 것</strong>과 복사해 쓰는{" "}
            <strong>시작 프롬프트</strong>가 있어요 — 거기서 출발해 당신의 상황에
            맞게 키워 가세요.
          </p>
        </div>
```
new:
```tsx
        <div className="capstone-note">
          <div className="capstone-note__tag">지금 바로 짓기 시작</div>
          <p>
            먼저 다 배우고 오지 않아도 돼요. 아래 첫 빌드 단계의{" "}
            <strong>먼저 할 것</strong>과 복사해 쓰는 <strong>시작 프롬프트</strong>로
            오늘 첫 삽을 뜨고, 막히는 곳이 나오면 그때 딱 그 레슨을 펴 보세요. 각
            단계엔 막혔을 때 펼치는 <strong>구제 레슨</strong>이 붙어 있어요 — 완벽하지
            않아도 괜찮아요, 일단 한 삽.
          </p>
        </div>
```

또한 상세 하단의 "이 프로젝트를 준비시키는 레슨" 헤딩을 막힘-톤으로(선택, 데이터·링크는 동일).
old: `<h2>이 프로젝트를 준비시키는 레슨</h2>`
new: `<h2>막힐 때 펴 보는 레슨</h2>`

> 주석도 함께 — 파일 1행 `// 프로젝트 상세 — ... 펼치는 캡스톤 가이드.` → `// 프로젝트 상세 — 빌드 단계·구제 레슨·완료 기준까지 펼치는 작업장.`

- [ ] **Step 3: ProjectReadiness 라벨 교체**

`src/components/ProjectReadiness.tsx`.
old:
```tsx
      ? "준비 레슨 없음"
```
```tsx
          ? `준비 레슨 0/${total}`
```
new(각각):
```tsx
      ? "구제 레슨 없음"
```
```tsx
          ? `구제 레슨 0/${total}`
```
> `ProjectReadiness`의 다른 "준비" 문구가 있으면 같은 톤("막힐 때 보는 레슨")으로 맞춘다 — Step 4 게이트 전에 `grep -n "준비" src/components/ProjectReadiness.tsx`로 잔여 확인.

- [ ] **Step 4: 게이트 + 시각 확인**

Run: `npm run check` → 그린.
시각 — `/projects`와 임의 상세(`/projects/document-qa-bot`)에서 새 카피 확인.

- [ ] **Step 5: 커밋**
```bash
git add src/app/projects/page.tsx "src/app/projects/[slug]/page.tsx" src/components/ProjectReadiness.tsx
git commit -m "content(projects): 캡스톤·졸업 프레이밍 → 지금 바로 짓기(빌드-우선)"
```

---

## Task 4 — 레슨 JIT 헤더 + "프로젝트로 복귀" CTA

**Files:**
- Modify: `src/lib/types.ts` (`Lesson.neededWhen?`)
- Modify: `src/content/lessons.ts` (6개 백필)
- Modify: `src/app/lessons/[lessonSlug]/page.tsx` (헤더 + `?from=`)

- [ ] **Step 1: 타입에 옵셔널 필드 추가**

`src/lib/types.ts`의 `Lesson` 인터페이스에 추가(옵셔널이라 기존 레슨·validate 안전).
`hook?: string;` 정의 바로 아래에 삽입:
```ts
  /**
   * JIT 헤더 — "이 레슨이 필요한 순간". 프로젝트에서 막혀 들어온 학습자에게
   * 왜 지금 이걸 보는지 한 줄로 알려준다. 없으면 헤더 생략.
   */
  neededWhen?: string;
```

- [ ] **Step 2: 핵심 레슨 6개 백필**

`src/content/lessons.ts`에서 아래 6개 레슨 객체에 `neededWhen`을 추가한다(각 레슨의 `hook:` 줄 근처에). 실제 카피:

```ts
// structure-of-good-prompts
neededWhen: "AI가 같은 요청에 매번 다르게 답해서 결과를 믿기 어려울 때. 프로젝트의 변환 프롬프트가 자꾸 흔들릴 때.",

// github-issue-to-ai-brief
neededWhen: "\"버그 수정해줘\" 한 줄 이슈를 에이전트에 던졌더니 멀쩡한 기능까지 깨졌을 때. 첫 시도가 자꾸 헛나갈 때.",

// grounded-rag-answers
neededWhen: "봇이 출처 없이 그럴듯하게 지어낼 때. 문서 Q&A 봇이 \"문서에 없는 말\"을 할 때.",

// document-chunking-strategy
neededWhen: "RAG 검색이 엉뚱한 조각을 가져올 때. 문서를 어떻게 잘라 넣어야 할지 막혔을 때.",

// connect-ai-api
neededWhen: "채팅창을 넘어 내 앱에서 AI를 부르려는데 어디서 시작할지 막혔을 때. GPT 래퍼 제품의 핵심 흐름을 처음 붙일 때.",

// hallucination-verification
neededWhen: "AI 답을 어디까지 믿어야 할지 불안할 때. 발행·제출 전에 환각을 걸러내는 마지막 관문이 필요할 때.",
```

- [ ] **Step 3: 레슨 페이지에 JIT 헤더 + 복귀 CTA 렌더**

`src/app/lessons/[lessonSlug]/page.tsx`.

(a) 시그니처에 `searchParams` 추가 — 함수 인자를 수정:
old:
```tsx
export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  const lesson = getLessonBySlug(lessonSlug);
  if (!lesson) notFound();
```
new:
```tsx
export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonSlug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { lessonSlug } = await params;
  const { from } = await searchParams;
  const lesson = getLessonBySlug(lessonSlug);
  if (!lesson) notFound();
  const fromProject = from ? getProjectBySlug(from) : undefined;
```
그리고 상단 import에 `getProjectBySlug` 추가:
old: `  getStageById,` (import 블록 내)
new:
```tsx
  getProjectBySlug,
  getStageById,
```

(b) JIT 헤더 — `<p className="lede">` 바로 아래, deliverable 칩 위에 삽입:
```tsx
        {lesson.neededWhen && (
          <p className="lesson-needed-when" style={{
            margin: "16px 0 0", padding: "12px 16px",
            borderLeft: "3px solid var(--accent, var(--ink))",
            background: "var(--paper-2)", fontSize: 14, lineHeight: 1.6,
            color: "var(--ink-2)",
          }}>
            <span style={{ color: "var(--ink-3)" }}>⏱ 이 레슨이 필요한 순간 — </span>
            {lesson.neededWhen}
          </p>
        )}
```

(c) 프로젝트 복귀 CTA — 하단 CTA 블록(현재 "Stage로 돌아가기" + "전체 커리큘럼")에서, `fromProject`가 있으면 1차 버튼을 복귀로:
old:
```tsx
          {stage && (
            <Link href={`/stages/${stage.slug}`} className="btn">
              Stage {stage.order} · {stage.label}로 돌아가기 <span className="arrow">→</span>
            </Link>
          )}
          <Link href="/stages" className="btn ghost">
            전체 커리큘럼
          </Link>
```
new:
```tsx
          {fromProject ? (
            <Link href={`/projects/${fromProject.slug}`} className="btn">
              ↩ 〈{fromProject.title}〉로 돌아가기
            </Link>
          ) : stage ? (
            <Link href={`/stages/${stage.slug}`} className="btn">
              Stage {stage.order} · {stage.label}로 돌아가기 <span className="arrow">→</span>
            </Link>
          ) : null}
          <Link href="/stages" className="btn ghost">
            전체 커리큘럼
          </Link>
```

(d) (선택) 프로젝트 상세의 구제 레슨 링크에 `?from=` 부착 — `projects/[slug]/page.tsx`의 `fallback` 링크를 `href={`/lessons/${fallback.slug}?from=${project.slug}`}`로. 이러면 막혀서 들어간 레슨이 복귀 버튼을 띄운다.

- [ ] **Step 4: 게이트 + 시각 확인**

Run: `npm run check` → 그린(validate가 neededWhen 미지정 레슨을 문제 삼지 않는지 포함 확인).
시각 — `/lessons/structure-of-good-prompts`(헤더 보임) vs `/lessons/structure-of-good-prompts?from=document-qa-bot`(상·하단 복귀 CTA 보임).

- [ ] **Step 5: 커밋**
```bash
git add src/lib/types.ts src/content/lessons.ts "src/app/lessons/[lessonSlug]/page.tsx" "src/app/projects/[slug]/page.tsx"
git commit -m "feat(lessons): JIT '필요한 순간' 헤더 + 프로젝트 복귀(?from=) CTA"
```

---

## Task 5 — Start 출발-질문 우선

**Files:**
- Modify: `src/app/start/page.tsx`

역할 진단(기존 quiz)은 그대로 두고, 그 **위에** "무엇을 만들고 싶어요?" 산출물 진단을 1번으로 얹는다. 산출물 → 실제 프로젝트 slug로 직결.

- [ ] **Step 1: 산출물 매핑 상수 + 1번 섹션 추가**

`src/app/start/page.tsx` 상단(컴포넌트 밖)에 매핑을 둔다. slug는 실재 프로젝트(검증됨)다.
```tsx
const BUILD_GOALS: { label: string; desc: string; projectSlug: string }[] = [
  { label: "반복 업무 자동화", desc: "매주 쓰는 보고서·회의록을 AI 파이프라인으로", projectSlug: "weekly-report-autopilot" },
  { label: "콘텐츠 더 빠르게", desc: "글 하나를 쇼츠·뉴스레터로 자동 재가공", projectSlug: "blog-to-shortform" },
  { label: "내 문서에 답하는 봇", desc: "PDF·노트에 자연어로 묻고 출처와 함께 답받기", projectSlug: "document-qa-bot" },
  { label: "작은 AI 제품 출시", desc: "한 직군의 불편을 푸는 GPT 래퍼를 시장에", projectSlug: "gpt-wrapper-product" },
];
```
그리고 기존 `<PageHead .../>` 바로 아래, 역할 quiz 섹션 위에 새 섹션을 삽입:
```tsx
      <section className="sec">
        <Container>
          <div className="quiz-card">
            <h2>무엇을 만들고 싶어요?</h2>
            <p className="sub">지금 가장 끌리는 것 하나만. 고르면 그 프로젝트에서 바로 출발해요 — 도중에 바꿔도 됩니다.</p>
            <div className="quiz-options">
              {BUILD_GOALS.map((g) => (
                <Link key={g.projectSlug} href={`/projects/${g.projectSlug}`}>
                  <div>
                    <strong><span className="p-text">{g.label}</span></strong>
                    <small>{g.desc}</small>
                  </div>
                  <span className="arrow mono">→</span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
```

- [ ] **Step 2: 역할 섹션을 2번으로 강등(라벨만)**

기존 역할 quiz 섹션의 헤딩 위 안내를 "또는, 역할로 고르기"로 바꾼다.
old: `<h2>지금 나에게 가장 가까운 모습은?</h2>`
new: `<h2>또는, 지금 내 역할로 고르기</h2>`
> PageHead의 lede도 산출물-우선으로 살짝 손볼 수 있으나 P0에선 생략 가능.

- [ ] **Step 3: 게이트 + 시각 확인**

Run: `npm run check` → 그린.
시각 — `/start`에서 "무엇을 만들고 싶어요?"가 1번, 역할 진단이 2번으로 뜨고, 산출물 카드가 해당 프로젝트로 이동하는지 확인.

- [ ] **Step 4: 커밋**
```bash
git add src/app/start/page.tsx
git commit -m "feat(start): 산출물 진단을 1번으로 — 역할 진단은 2번으로 유지"
```

---

## Self-Review

**1. Spec(§8 P0) 커버리지**
- "문구 불일치 수정" → Task 0 ✅
- "죽은 코드 정리" → Task 1
- "Home CTA 변경 + Project-first 카피" → Task 2
- "Lesson 상단 블록 추가" → Task 4
- "Start 질문 순서 변경" → Task 5
- (보너스) "프로젝트 캡스톤 재프레이밍" → Task 3
→ §8 P0 전 항목 매핑됨. 누락 없음.

**2. Placeholder 스캔** — 모든 코드/카피 단계에 실제 내용 포함. "적절히"·"TODO"·"비슷하게" 없음. Task 4 백필 6개는 실제 문장으로 명시.

**3. 타입 일관성** — `neededWhen?: string`을 Task 4 Step 1에서 정의하고 Step 2(백필)·Step 3(렌더)에서 동일 이름 사용. `LandingProjects`는 `{ projects: Project[] }`로 정의(Task 2 Step 1)하고 호출(Step 3)에서 동일 prop. `getProjectBySlug`·`getProjects`는 `content.ts` 기존 export(검증됨).

**리스크 메모** — Task 1(죽은 코드)은 strict+eslint가 미사용 import를 잡을 수 있으니 Step 3 게이트에서 정리. Task 2 갤러리는 기존 `ProjectCard`+`proj-grid` 재사용이라 새 CSS 위험 낮음. 모든 데이터 변경(Task 4)은 옵셔널이라 validate·기존 콘텐츠 안전.

---

## 실행 순서 권장

Task 1 → 2 → 3 → 4 → 5 (의존도 낮은 것부터, 각 태스크 독립 커밋). 전체 끝나면 `npm run check` 한 번 더 그린 확인 후, 사용자 승인 시에만 `git push`(= prod 배포).
