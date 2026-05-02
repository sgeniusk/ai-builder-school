# Content Model — AI Builder School

> 콘텐츠를 코드가 아닌 데이터로 다룬다. 모든 페이지는 `src/content/*.ts`를 유일한 진실 원본으로 사용한다.

## 1. 타입 개요

```ts
// src/lib/types.ts (요약)
export type Persona = 'office' | 'planner' | 'developer' | 'creator' | 'engineer';
export type Level = 'beginner' | 'intermediate' | 'advanced';
```

## 2. Phase

하나의 학습 단계. 12개 존재.

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | `string` | 내부 식별자. 예: `"phase-1"`. |
| `slug` | `string` | URL. 예: `"phase-1-ai-literacy"`. |
| `titleKo` | `string` | 한국어 타이틀. |
| `titleEn` | `string` | 영문 타이틀 (보조). |
| `shortDescription` | `string` | 카드용 1줄 요약. |
| `longDescription` | `string` | Phase 상세 페이지 본문. 줄바꿈은 `\n\n`. |
| `level` | `Level` | 난이도. |
| `estimatedHours` | `number` | 예상 시간(시간 단위). |
| `targetPersonas` | `Persona[]` | 주 대상. |
| `outcomes` | `string[]` | 학습자가 얻게 되는 능력. |
| `topics` | `string[]` | 다루는 주제. |
| `deliverables` | `string[]` | 이 Phase 끝에 남는 산출물. |
| `lessonSlugs` | `string[]` | 소속 레슨 slug 목록 (렌더링 편의용). |
| `recommendedTools` | `string[]` | 추천 도구. 예: `"Claude Code"`, `"Codex CLI"`. |
| `nextPhaseSlug?` | `string \| null` | 자연스러운 다음 단계. |
| `weekInMvpPath?` | `number \| null` | 8주 경로에서의 위치. |

## 3. Lesson

7-step 러닝 루프의 구체 구현.

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | `string` | `"lesson-03"` 등. |
| `slug` | `string` | URL. `"hallucination-verification"`. |
| `phaseId` | `string` | 소속 Phase. |
| `titleKo` | `string` | 한국어 제목. |
| `titleEn` | `string` | 영문 병기. |
| `summary` | `string` | 1~2 문장 요약. |
| `level` | `Level` | 난이도. |
| `estimatedMinutes` | `number` | 예상 소요 시간(분). |
| `targetPersonas` | `Persona[]` | 이 레슨이 특히 유용한 페르소나. |
| `prerequisites` | `string[]` | 사전 지식 또는 이전 레슨 slug. |
| `learningGoals` | `string[]` | 구체 학습 목표 3~5개. |
| `problemScenario` | `string` | "이런 상황"이 왜 문제인지 설명. |
| `coreConcepts` | `{ term: string; explanation: string; }[]` | 최소 개념. |
| `codexMission` | `string` | Codex용 미션 프롬프트. |
| `claudeCodeMission` | `string` | Claude Code용 미션 프롬프트. |
| `buildSteps` | `string[]` | 실행 단계(순서 보장). |
| `verificationChecklist` | `string[]` | 학습자가 스스로 체크. 5~8개. |
| `deliverable` | `{ title: string; description: string; format: string; }` | 최종 산출물. |
| `reflectionQuestions` | `string[]` | 회고 질문 3개. |
| `extensionIdeas` | `string[]` | 다음 주 확장 아이디어. |
| `tags` | `string[]` | 검색/필터용. |

## 4. Track

페르소나 기반 추천 경로.

| 필드 | 타입 |
|---|---|
| `id` | `string` |
| `slug` | `string` |
| `title` | `string` |
| `targetLearner` | `string` — 자연어 설명 |
| `promise` | `string` — 트랙이 주는 약속 |
| `recommendedPhases` | `string[]` — phase slug |
| `recommendedLessons` | `string[]` — lesson slug |
| `capstoneIdeas` | `string[]` |
| `expectedOutcome` | `string` |
| `persona` | `Persona` |

## 5. Project

캡스톤/포트폴리오 아이디어.

| 필드 | 타입 |
|---|---|
| `id` | `string` |
| `slug` | `string` |
| `title` | `string` |
| `targetLearner` | `string` |
| `difficulty` | `Level` |
| `requiredPhases` | `string[]` — phase slug |
| `finalOutput` | `string` |
| `suggestedStack` | `string[]` |
| `summary` | `string` |

## 6. Template

재사용 자산(프롬프트/체크리스트).

| 필드 | 타입 |
|---|---|
| `id` | `string` |
| `slug` | `string` |
| `title` | `string` |
| `kind` | `"prompt" \| "mission" \| "checklist"` |
| `targetPersonas` | `Persona[]` |
| `summary` | `string` |
| `body` | `string` — 실제 템플릿 본문 |
| `tags` | `string[]` |

## 7. 불변 규칙 (Invariants)

- 모든 `lesson.phaseId`는 반드시 존재하는 `Phase.id`.
- 모든 `track.recommendedPhases`는 반드시 존재하는 `Phase.slug`.
- 모든 `project.requiredPhases`는 반드시 존재하는 `Phase.slug`.
- `lesson.slug`, `phase.slug`, `track.slug`, `project.slug`, `template.slug`는 전역 유일.
- 빌드 시 헬퍼(`src/lib/content.ts`)가 무결성을 검증하고 오류를 던진다.

## 8. 새 레슨 추가하기 (Non-engineer)

1. `src/content/lessons.ts` 열기
2. 배열 맨 아래에 기존 객체를 복사해 붙여넣기
3. 필드를 수정 (특히 `slug`, `phaseId`, `titleKo`)
4. 저장 → 자동으로 `/lessons/{slug}`이 노출됨
5. Phase 페이지에도 자동 표시되려면 `phases.ts`의 해당 Phase `lessonSlugs`에 slug 추가

## 9. 로컬라이제이션

MVP는 한국어 고정. 필드 `titleEn`은 SEO/검색을 위한 보조. v0.2에서 다국어 분리 예정.
