# AI Builder School — MVP 구현 계획

> 작성일: 2026-04-19 · 대상: MVP v0.1 · 언어: Korean-first UI, English code

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
