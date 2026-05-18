# Content Model — AI Builder School

> 콘텐츠를 코드가 아닌 데이터로 다룬다. 모든 페이지는 `src/content/*.ts`를 유일한 진실 원본으로 사용한다.

## 1. 타입 개요

```ts
// src/lib/types.ts (요약)
export type Persona = 'office' | 'planner' | 'developer' | 'creator' | 'engineer';
export type Level = 'beginner' | 'intermediate' | 'advanced';
```

## 2. Stage (v0.4 — 권장)

학습자의 수직 진척을 8개로 나눈 사다리. 13개 Phase를 8개 Stage로 재편하면서 "학습자가 자기 위치를 안다"를 1순위로 둔다. Stage 4·6은 내부 `subGroups`로 학습자에게 노출되는 sub-그룹(4a/4b/4c, 6a/6b/6c)을 가진다.

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | `string` | `"stage-1"` .. `"stage-8"`. |
| `slug` | `string` | URL slug. `"stage-1-meet"`, `"stage-6-build"` 등. |
| `order` | `number` | 1..8. |
| `label` | `string` | 짧은 라벨. `"AI와 만나다"`. |
| `titleKo` / `titleEn` | `string` | 풀 제목. |
| `positionChange` | `string` | 학습자 위치 변화 한 줄. `"AI 도구 켜고 첫 대화"`. |
| `deliverable` | `string` | stage 완료 시 손에 남는 것. |
| `shortDescription` / `longDescription` | `string` | 카드/페이지용. |
| `lessonSlugs` | `string[]` | stage 전체 lesson — 학습 순서 보장. |
| `subGroups?` | `StageSubGroup[]` | Stage 4·6에서만. 각 sub-그룹이 `id`/`label`/`deliverable`/`lessonSlugs`를 가짐. |
| `nextStageSlug?` | `string \| null` | 다음 stage. |
| `weekInMvpPath?` | `number \| null` | 8주 MVP 경로 위치. |
| `introEssaySlug?` / `outroEssaySlug?` | `string` | 도입/마무리 에세이 slug (PR D-content-scaffold에서 채움). |

Lesson은 v0.4부터 `stageId?`, `stageOrdinal?`, `stageSubGroupId?` 옵셔널 필드를 갖는다. 실제 매핑은 lessons.ts가 아니라 별도 `src/content/lesson-stage-mapping.ts`에 두고, `getLessons()` 헬퍼가 머지한다 — diff 최소화 + 롤백 용이.

Journey는 v0.4부터 `recommendedStages?` (slug 배열) 옵셔널 필드를 갖는다.

Phase / `phaseId` / `recommendedPhases` / `requiredPhases`는 **legacy로 보존**되며 PR E에서 제거된다. 새 작업은 stage 필드를 기준으로 쓴다.

## 2-legacy. Phase (@deprecated, PR E에서 제거)

하나의 학습 단계. 13개 존재.

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

캡스톤/포트폴리오 프로젝트. 레슨처럼 한 줄씩 손잡아 주는 가이드가 아니라, 배운 걸 혼자 적용하는 졸업 과제.

| 필드 | 타입 |
|---|---|
| `id` | `string` |
| `slug` | `string` |
| `title` | `string` |
| `hook` | `string` — 1문장 훅 |
| `targetLearner` | `string` |
| `targetJourneys` | `JourneyId[]` |
| `difficulty` | `Level` |
| `estimatedDuration` | `string` — "1주", "4주" 등 |
| `requiredStages` | `string[]` — stage slug |
| `keyLessons` | `string[]` — lesson slug |
| `templateSlugs` | `string[]` — 이 프로젝트가 쓰는 template slug |
| `summary` | `string` |
| `problem` | `string` — 왜 만드나 |
| `finalOutput` | `string` |
| `suggestedStack` | `string[]` |
| `milestones` | `ProjectMilestone[]` — 빌드 단계 |
| `verification` | `string[]` — 완료 기준 체크리스트 |
| `extensionIdeas` | `string[]` |

### 5-1. ProjectMilestone

빌드 단계 하나. `firstStep`·`starterPrompt`가 "그냥 알아서 해보라"는 막막함을 줄인다.

| 필드 | 타입 |
|---|---|
| `title` | `string` — "1단계 — 범위 정의" 같은 라벨 |
| `description` | `string` — 단계 설명 1~2문장 |
| `firstStep` | `string` — 막막함을 더는 구체적 첫 행동 |
| `starterPrompt` | `string?` — 복붙해 출발하는 시작 프롬프트 |
| `fallbackLesson` | `string?` — 막히면 다시 볼 lesson slug |

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

Legacy (Phase):
- 모든 `lesson.phaseId`는 반드시 존재하는 `Phase.id`.
- 모든 `journey.recommendedPhases`는 반드시 존재하는 `Phase.slug`.
- 모든 `project.requiredPhases`는 반드시 존재하는 `Phase.slug`.
- `lesson.slug`, `phase.slug`, `journey.slug`, `project.slug`, `template.slug`는 전역 유일.

v0.4 (Stage):
- 모든 lesson은 `lesson-stage-mapping.ts`에 매핑이 있어야 한다 — `getLessons()`가 머지한 결과로 `lesson.stageId`가 존재해야 한다.
- 모든 `lesson.stageId`는 반드시 존재하는 `Stage.id`.
- 각 stage의 `lessonSlugs`와 그 lesson들의 `stageId`는 양방향 일치.
- 모든 `project.requiredStages`는 반드시 존재하는 `Stage.slug`.
- 모든 `project.keyLessons`는 반드시 존재하는 `Lesson.slug`.
- 모든 `project.milestones[].fallbackLesson`(존재 시)은 반드시 존재하는 `Lesson.slug`.
- 모든 `project.templateSlugs`는 반드시 존재하는 `ContentTemplate.slug`.
- Stage 4·6의 `subGroups[].lessonSlugs` 합 = `stage.lessonSlugs` (어느 sub-그룹에도 빠지지 않고, 중복도 없음).
- Lesson 분포는 stage-redesign.md 매핑 그대로 — 4-5-4-14-8-13-6-7 = 61.
- 모든 `journey.recommendedStages`는 반드시 존재하는 `Stage.slug`.

빌드 시 헬퍼(`src/lib/content.ts`의 `validateContent`)가 위 규칙을 모두 검사하고 무결성 이슈를 반환한다. `npm run validate`로 호출.

## 8. 새 레슨 추가하기

권장: `scripts/new-lesson.ts` 사용. lessons.ts/lesson-bodies.ts/lesson-stage-mapping.ts/MDX 본문/outputs README 전부를 한 번에 스캐폴드한다.

```bash
npm run new-lesson <slug> --stage <stage-slug> [--sub <subId>] --title "한글 제목"

# 예시
npm run new-lesson prompt-debugging-loop --stage stage-2-ask --title "프롬프트 실패 진단"
npm run new-lesson auth-and-user-sessions --stage stage-6-build --sub 6a --title "사용자 인증과 세션"
```

스크립트가 자동으로:
1. `src/content/lessons.ts`에 stub 삽입 (lesson-NN id 자동 부여)
2. `src/content/lesson-stage-mapping.ts`에 stage 매핑 추가 (stageOrdinal은 stage 내 다음 빈 번호)
3. `src/content/lessons/<slug>.mdx` 본문 템플릿 생성
4. `src/content/lessons/<slug>/outputs/README.md` 생성
5. `src/content/lesson-bodies.ts`에 import + 등록

이후 수동으로:
1. lessons.ts 새 객체의 TODO 항목 채우기
2. MDX 본문 작성 (친근 어조, "당신"으로 학습자 호명)
3. outputs 폴더에 산출물 템플릿(.md) 작성
4. `src/content/stages.ts`의 해당 stage `lessonSlugs`에 slug 추가 (subGroup이면 해당 subGroup에도)
5. `npm run check` 통과 확인

레거시 `--phase` 플래그도 작동하지만 deprecated 경고가 나온다 — v0.4 stage 모델 기준으로 작성.

## 9. 로컬라이제이션

MVP는 한국어 고정. 필드 `titleEn`은 SEO/검색을 위한 보조. v0.2에서 다국어 분리 예정.
