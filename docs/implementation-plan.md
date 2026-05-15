# AI Builder School — 구현 계획

> 작성일: 2026-04-19 (v0.1) · 2026-05-13 (v0.2 추가) · 언어: Korean-first UI, English code

## 변경 이력 (Changelog)

| 버전 | 일자 | 범위 |
|------|------|------|
| **v0.1** | 2026-04-19 | MVP — 정적 사이트, 12 Phase, 32+ lesson, 5 트랙 |
| **v0.2** | 2026-05-13 | 10 페르소나 평가 기반 reality check 개선 — *§12 참고* |

---

## v0.1 — MVP (2026-04-19)

## 1. 목표 (Goal)

"AI를 쓰는 사람"에서 "AI로 만드는 사람"으로 학습자를 안내하는 **실전형 AI 빌더 스쿨** 웹사이트를 MVP로 구축한다. 수동적인 강의 소비가 아닌, 매 레슨마다 **문제 이해 → 개념 학습 → Codex/Claude 미션 → 빌드 → 검증 → 배포 → 회고**의 러닝 루프를 실행하도록 설계한다.

## 2. MVP 범위 (Scope)

### In-scope
- 정적(Static-first) 컨텐츠 기반 웹사이트 (Next.js App Router, TypeScript, Tailwind)
- 9개 핵심 페이지: `/`, `/start`, `/curriculum`, `/tracks`, `/projects`, `/templates`, `/about`, `/curriculum/[phaseSlug]`, `/lessons/[lessonSlug]`
- 12개 Phase 커리큘럼 데이터 + 8주 MVP 경로
- 32개 이상의 스타터 레슨 데이터
- 5개 학습자 트랙
- 프로젝트/템플릿 카탈로그
- AGENTS.md + CLAUDE.md (코딩 에이전트 중립)
- 기본 SEO 메타데이터, 반응형 UI, 접근성

### Out-of-scope (MVP)
- 로그인/결제/대시보드
- 백엔드 API, DB, CMS
- 비디오/영상 자료, 실제 LLM 연동
- 실시간 커뮤니티/댓글

## 3. 아키텍처 (Architecture)

```
AI Builder School/
├─ AGENTS.md                # 모든 코딩 에이전트 공통 규약
├─ CLAUDE.md                # Claude Code 전용 요약
├─ README.md                # 프로젝트 소개 + 실행법
├─ docs/                    # 제품/콘텐츠 문서
│  ├─ product-brief.md
│  ├─ curriculum-blueprint.md
│  ├─ content-model.md
│  ├─ implementation-plan.md
│  ├─ assumptions.md
│  └─ future-roadmap.md
├─ public/
├─ src/
│  ├─ app/                  # Next.js App Router
│  │  ├─ layout.tsx
│  │  ├─ page.tsx           # /
│  │  ├─ start/page.tsx
│  │  ├─ curriculum/
│  │  │  ├─ page.tsx
│  │  │  └─ [phaseSlug]/page.tsx
│  │  ├─ tracks/page.tsx
│  │  ├─ lessons/[lessonSlug]/page.tsx
│  │  ├─ projects/page.tsx
│  │  ├─ templates/page.tsx
│  │  └─ about/page.tsx
│  ├─ components/           # 재사용 UI 컴포넌트
│  ├─ content/              # 데이터 진입점
│  │  ├─ phases.ts
│  │  ├─ lessons.ts
│  │  ├─ tracks.ts
│  │  ├─ projects.ts
│  │  └─ templates.ts
│  ├─ lib/                  # 유틸/타입
│  └─ styles/globals.css
├─ package.json
├─ tsconfig.json
├─ next.config.mjs
├─ postcss.config.mjs
└─ tailwind.config.ts
```

### 핵심 원칙
1. **Static-first**: `generateStaticParams`로 사전 생성 가능하게 구성
2. **Data-driven content**: 레슨/페이즈/트랙은 TypeScript 데이터 파일. 비개발자가 수정 가능하도록 필드 구조화
3. **Single source of truth**: `src/content/*.ts`가 유일한 컨텐츠 원본. 페이지는 여기서만 데이터를 읽음
4. **Type-safe**: 모든 컨텐츠는 `src/lib/types.ts`의 Zod 또는 TypeScript 타입 기반 (MVP는 순수 TS 인터페이스 사용해 의존성 최소화)

## 4. 기술 스택 (Stack)

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + CSS variables (디자인 토큰)
- **Fonts**: `next/font/google` (Inter, Pretendard는 CSS import)
- **Lint**: ESLint + Next 기본 룰
- **Content**: 순수 `.ts` 데이터 파일 (MDX는 v2에서 도입)
- **Deploy 가정**: Vercel (정적 + 서버 렌더 혼합 가능)

## 5. 데이터 모델 (Content Schema)

`src/lib/types.ts`에 타입 정의:

- `Persona` — 학습자 유형 (office | planner | developer | creator | engineer)
- `Level` — beginner | intermediate | advanced
- `Phase` — 12개 커리큘럼 단계
- `Lesson` — 실제 학습 단위
- `Track` — 페르소나별 경로
- `Project` — 캡스톤/포트폴리오 과제
- `Template` — 프롬프트/체크리스트 재사용 자산

필드 상세는 `docs/content-model.md` 참고.

## 6. 페이지 설계 (Page Blueprint)

| 경로 | 목적 | 주요 섹션 |
|---|---|---|
| `/` | 가치 제안 + 8주 경로 소개 | Hero, 8주 경로, 트랙 요약, 레슨 미리보기, CTA |
| `/start` | 학습자 진단 | 페르소나 선택기, 추천 트랙, 첫 미션 안내 |
| `/curriculum` | 12 Phase 전체 | Phase 타임라인, 각 Phase 요약 카드 |
| `/curriculum/[phaseSlug]` | Phase 상세 | 개요, 산출물, 레슨 목록, 미션 |
| `/lessons/[lessonSlug]` | 레슨 상세 | 문제/개념/미션/빌드/검증/산출물/회고 |
| `/tracks` | 5개 트랙 비교 | 트랙 카드, 대상, 약속, 경로 |
| `/projects` | 캡스톤 아이디어 | 난이도/필요 Phase/최종 출력 |
| `/templates` | 재사용 자산 | 프롬프트/체크리스트 카드 |
| `/about` | 철학과 방향 | 미션, 원칙, 대상, FAQ |

## 7. 컴포넌트 (Component Inventory)

`src/components/`

- 레이아웃: `SiteHeader`, `SiteFooter`, `Container`
- 표시: `Hero`, `CTASection`, `SectionHeading`, `StatList`
- 뱃지: `Badge`, `PersonaBadge`, `DifficultyBadge`, `DeliverableBadge`, `TagPill`
- 카드: `PhaseCard`, `LessonCard`, `TrackCard`, `ProjectCard`, `TemplateCard`
- 커리큘럼: `CurriculumTimeline`, `WeekPath`, `PhaseNav`
- 레슨: `LessonLayout`, `MissionBlock`, `VerificationChecklist`, `ReflectionList`, `StepList`
- 기타: `PersonaPicker`, `CalloutBox`, `LinkButton`

## 8. 구현 단계 (Step-by-Step)

1. **Scaffold** — package.json, tsconfig, next.config, tailwind, globals.css, layout
2. **Types** — `src/lib/types.ts` + helpers (`src/lib/content.ts`)
3. **Content** — phases.ts → lessons.ts → tracks.ts → projects.ts → templates.ts
4. **Components** — 공통 → 뱃지 → 카드 → 섹션 → 레슨 전용
5. **Pages** — 홈 → start → curriculum → tracks → projects → templates → about → dynamic
6. **Agent files** — AGENTS.md, CLAUDE.md, README
7. **Verify** — `npm install`, `npm run lint`, `npm run build`
8. **Summary** — 작업 요약 + 편집 가이드

## 9. 성공 기준 (Acceptance)

- [ ] `npm run build` 성공
- [ ] 9개 페이지가 모두 렌더링되고 상호 링크 유효
- [ ] 32개 이상 레슨이 데이터에 존재하고 동적 라우트로 노출
- [ ] 12 Phase가 커리큘럼 인덱스 및 상세에 모두 표시
- [ ] 5 트랙이 페르소나 매핑과 함께 표시
- [ ] AGENTS.md / CLAUDE.md 존재 및 규약 일치
- [ ] 비개발자가 `src/content/*.ts`의 필드를 수정해 레슨을 추가/편집할 수 있음
- [ ] 모바일/데스크톱 반응형, 시맨틱 HTML, 키보드 포커스 가시성 확보

## 10. 리스크 & 완화

| 리스크 | 완화 |
|---|---|
| iCloud 경로의 공백/유니코드 때문에 일부 CLI가 실패 | 절대경로 + 따옴표 사용, 필요시 심볼릭 링크 고려 |
| Node v25 환경에서 일부 패키지 경고 | Next 15 / React 19 기준 최신 stable 사용 |
| 컨텐츠 규모가 커서 빌드 시간 증가 | 정적 생성 + 증분 지양 → 필요시 다음 반복에서 MDX 분리 |

## 11. 다음 반복 (Post-MVP)

`docs/future-roadmap.md` 참고. 요약하면 MDX 전환, 검색, 진도 저장, 다국어, CMS 연결, 커뮤니티, 실습 샌드박스.

---

# v0.2 — 페르소나 평가 기반 개선 (2026-05-13~)

## 12. 출발점 — 10 페르소나 reality check

2026-05-12에 듀이 워크플로우로 10개 페르소나가 Codex CLI를 통해 1대1로 커리큘럼을 평가했다. 결과는 충격적으로 일관됐다.

**Verdict 분포 — 10/10이 *"일부만 듣겠다"***

| Verdict | 수 |
|---------|---|
| 듣겠다 | 0 |
| 일부만 듣겠다 | **10** |
| 못 듣겠다 | 0 |

상세는 [`docs/persona-reviews/2026-05-12-synthesis.md`](./persona-reviews/2026-05-12-synthesis.md) 참고. v0.2 plan은 이 합본의 *우선순위 3개 즉시 반영 + 별도 plan 필요 4건*을 모두 코드화한다.

## 13. v0.2 — 적용된 즉시 변경 (2026-05-13)

다음 3건은 *데이터 모델 변경 없는 카피·메타 수정*. v0.2 첫 커밋에 포함됨.

### 13.1 깨진 글자 + 잘못된 phase 링크 수정

- `src/content/lessons.ts` 의 9곳 유니코드 깨짐 (`��`) 정상화 — *AI 검증을 가르치는 사이트에서 글자가 깨져 있는 아이러니*를 제거
- 4개 lesson MDX 의 잘못된 phase 슬러그 링크 4건 수정
  - `phase-3-everyday-automation` → `phase-3-ai-work-os`
  - `phase-2-prompt-context-engineering` → `phase-2-prompt-engineering` (2 곳)
  - `phase-4-code-conversation` → `phase-4-coding-agents`

### 13.2 `enforcing-output-format`에 *비개발자 20분 루트* 박스 추가

8/10 페르소나가 이 lesson에서 *닫고 싶다*고 보고. JSON Schema·Zod·Pydantic 이전에 *코드 없이 80% 달성하는 3 단계*(마크다운 표 형식 명시 → Custom GPT/Project 양식 주입 → Notion/Sheets 붙여넣기)를 도입부에 박스로 안내.

### 13.3 `targetJourneys` 범위 좁히기

- `harness-engineering-roadmap` — 5 journey → **`engineer`, `founder`** 만
- `claude-code-token-saving` — `practitioner` 제거 → **`engineer`, `founder`**
- `prompt-injection-defense` — `adopter` 추가 → **`engineer`, `founder`, `adopter`** (PM이 정책·acceptance criteria 책임자)

## 14. v0.2 — 별도 plan으로 진행할 큰 변경

아래 네 Plan은 *데이터 모델 신설·다수 lesson 신규 작성·페이지 신설*이 따른다. 각 Plan 은 별도 implementation session 에서 실행.

### Plan A — 빈 Phase 4개 채우기 (페르소나 지적 최다)

| Phase | 신설 lesson 후보 (각 3-4개) | 근거 페르소나 |
|-------|---------------------------|--------------|
| **Phase 0 (Setup)** | `zero-coding-orientation`, `terminal-first-day`, `ai-tool-account-and-cost`, `privacy-and-academic-ethics` | 김민지 (코딩 0 학생) |
| **Phase 8 (Multimodal/Content)** | `blog-to-shorts-pipeline`, `youtube-script-research-to-outline`, `design-visual-prompt-system`, `figma-ai-ui-variation-workflow`, `thumbnail-and-title-ab-test`, `brand-style-guide-with-ai` | 김태형·최유진·박서연·이정호 (Creator/디자이너/마케터/자영업자) |
| **Phase 9 (Data Analysis)** | `sql-with-ai-verification`, `crm-segmentation-with-ai`, `dashboard-narrative-and-qa`, `ab-test-decision-memo` | 윤서영 (분석가) |
| **Phase 10 (Evals/Security)** | `evals-for-ai-coded-prs`, `llm-observability-and-regression`, `ai-output-eval-for-pms`, `responsible-ai-policy-template` | 정민재·이수민 (시니어·PM) |

**우선순위** — 8 → 9 → 10 → 0 (페르소나 지적 빈도 순). Phase 8 은 8/10 페르소나가 *메인 코스*로 지목.

**작업 단위** — 각 lesson 은 `lesson-writer` 스킬로 작성. `npm run new-lesson <slug>` 스캐폴더 → MDX 본문 700-1200 단어 → outputs 템플릿 → `phases.ts` `lessonSlugs` 등록 → `npm run check`.

**완료 기준** — 4개 phase 모두 `lessonSlugs.length >= 3`, 각 lesson `hasMdxBody: true`, `validate` 통과.

### Plan B — Journey 재정의

- **Adopter 보강** — `recommendedLessons` 에 `plan-with-ai`, `github-issue-to-ai-brief`, `harness-engineering-roadmap` 추가. 각 lesson 본문에 **"PM lane"** 박스 ("PM은 직접 구현자가 아니라 *브리프와 가드레일의 소유자*")
- **Creator 확장** — `targetLearner` 에 *디자이너* + *자영업자/소상공인* 명시. Phase 8 신규 lesson 연결. `capstoneIdeas` 에 디자인·매장 운영 사례 추가
- **Practitioner 명확화** — *분석가* (SQL·대시보드·반복 리포트) 카테고리 명시. Phase 9 신규 lesson 연결
- **Explorer 톤 변경** — *"사내 5분 발표"* capstone → *"동아리 5분 발표 / 탐구 보고서 출처 검증 / 학습 일지"*. `targetLearner`도 학생 맥락 강화
- **Engineer 명료화** — *측정 가능한* 약속 추가 (재작업률, 결함 밀도, 토큰 비용 대비 리드타임). 과장 표현 ("10배", "5,000번") 제거

**파일** — `src/content/journeys.ts`, 그리고 `targetJourneys` 갱신이 필요한 lesson 들.

### Plan C — 비개발자 / 시간 부족 학습자 트랙 명시

- `/` 또는 `/curriculum` 상단에 **"코드 없이 시작하는 2주 빠른 길"** 카드 1개 신설
- 추천 lesson 6-8개 묶음 (Phase 1-3 + Phase 8 신규 일부). 산출물은 *Notion DB / 인스타 캘린더 / 이벤트 문구 라이브러리* 같이 비-코드
- `phases.ts` 의 `Phase` 타입에 `noCodeFriendly: boolean` 필드 추가 (또는 `recommendedFor` 로 확장)
- 홈페이지 Hero 아래에 *"하루 20분, 30일에 빌더되기"* 시간 단가 한 줄 노출

**한지영(워킹맘) 통증 응답** — *"이번 주에 1개만 본다면 뭐?"* 가이드 1개. lesson 카드에 *시간 가드레일* (15분 / 30분 / 50분 버전) 표시 옵션.

### Plan D — lesson 본문에 *분야별 변형 박스*

8/10 페르소나가 *"내 분야 예시가 부족하다"* 지적. 각 핵심 lesson MDX에 다음 박스 추가.

```markdown
:::callout
**📌 분야별로 어떻게 적용하나**
- 디자이너 — ...
- 마케터 — ...
- 자영업자 — ...
- 학생 — ...
- 분석가 — ...
- 크리에이터 — ...
:::
```

대상 lesson — 페르소나 다수가 *호평했지만 분야 예시가 부족*하다고 지적한 것들.

- `structure-of-good-prompts` (TCCO)
- `automate-report-drafts`
- `research-workflow`
- `blog-writing-pipeline`
- `feeding-long-documents`

**완료 기준** — 위 5개 lesson MDX 에 *분야별 변형 박스* 추가, 각 분야 1-2줄.

## 15. v0.2 — 추적 지표

다음 분기(2026-08-13 ±)에 동일한 10 페르소나로 듀이 워크플로우 *재실행*. Verdict 분포가 다음으로 이동했는지 측정.

| Verdict | 현재 (v0.2 시작) | 목표 (v0.2 종료) |
|---------|----------------|----------------|
| 듣겠다 | 0 | **4 이상** |
| 일부만 듣겠다 | 10 | 5 이하 |
| 못 듣겠다 | 0 | 1 이하 |

**측정 방식** — `docs/persona-reviews/2026-08-XX-*.md` (동일 페르소나, 동일 양식) 으로 비교 합본 작성. 변화 폭이 크지 않으면 v0.3 plan 재조정.

## 16. v0.2 — 의도적으로 *하지 않을* 것

페르소나 보고서가 제기했지만 *AI Builder School 의 thesis 와 충돌*하므로 채택하지 않는 항목.

- **"상위 1% 엘리트" 프레이밍** — 우리는 *수평적 입문* 톤. *대체 불가능한 AI Native* 같은 도태 위협 카피 X
- **강사 인물 브랜드 의존** — 우리에게 인물 자산 없음. *콘텐츠/방법론* 으로 권위 확보
- **광범위 호명** ("N만 명을 위한") — 강사 브랜드가 강할 때만 작동. *수신자 한 명을 부르는 톤* 유지
- **AI 도구 종속 강의** — 도구가 바뀌어도 *살아남는 빌더 마인드셋* 이 우리 핵심

---

> **참고**
> - 페르소나 평가 합본 — [docs/persona-reviews/2026-05-12-synthesis.md](./persona-reviews/2026-05-12-synthesis.md)
> - 외부 강의 분석 (듀이) — [docs/dewey/README.md](./dewey/README.md)
> - 듀이 스킬 — [.claude/skills/dewey/SKILL.md](../.claude/skills/dewey/SKILL.md)
