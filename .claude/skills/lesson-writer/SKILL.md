---
name: lesson-writer
description: AI Builder School에 새 레슨을 추가하거나 기존 레슨의 본문을 친근 어조로 작성·수정. 학습자에게 말 거는 어투, 7-step 루프 보존, MDX 본문 + 산출물 템플릿 + lessons.ts 스키마를 모두 채우는 단일 책임 스킬.
---

# Skill · lesson-writer

> Harness · Agent Topology — 레슨 추가/편집은 이 스킬로만.

## 언제 쓰나

- 새 레슨을 추가할 때
- 기존 레슨의 MDX 본문을 수정할 때 (아래 diff-only 룰 적용)
- outputs/ 산출물 템플릿을 만들 때
- `targetJourneys`, `coreConcepts`, `mission` 등 7-step 루프 필드를 다듬을 때

## 언제 안 쓰나

- UI 스타일/컴포넌트 변경 → `ui-stylist` 사용
- 타입·헬퍼·라이브 코드 변경 → 직접 작업 (이 스킬 범위 아님)
- 단순 typo 수정도 이 스킬을 거쳐 톤이 깨지지 않게

## 기존 레슨 수정 = diff-only (의무)

**기존 레슨의 산문을 통째로 다시 쓰지 않는다.** 수정 요청이 오면 바뀌어야 할 부분(낡은 사실, 깨진 링크, 어긋난 연결문, 지적받은 문장)만 최소 diff로 고치고 나머지 문장은 그대로 둔다.

이유 — AI가 산문을 재생성할 때마다 모델 평균 문체로 회귀한다. "개선" 패스가 반복될수록 AI 특유의 말투가 누적된 것이 이 사이트의 실제 사고 이력이다.

- 전체 재작성은 사용자가 명시적으로 "이 레슨 다시 써"라고 했을 때만. 그때도 `docs/voice/`를 먼저 읽는다.
- 루브릭 flag를 고칠 때도 flag가 가리킨 문장만 고친다. 주변 문단을 "겸사겸사" 다듬지 않는다.

## 목소리 — `docs/voice/`가 단일 기준 (의무)

산문을 쓰거나 고치기 전에 **반드시 `docs/voice/README.md`와 `docs/voice/sample-*.md`(있으면)를 읽는다.** 골든 샘플이 있으면 규칙보다 샘플 모사가 우선이다 — 그 사람이 이 주제를 설명한다면 어떻게 쓸지를 기준으로 쓴다.

- ❌ "AI를 업무 OS처럼 다뤄 반복 업무를 줄이고 판단에 시간을 씁니다."
- ✅ "매일 1시간씩 반복되는 일에 AI 한 줄 깔아두면, 그 시간이 손에 돌아와요."

기본기 — 추상 명사 대신 구체, 결과 통보(~합니다) 대신 말 거는 어조(~돼요), 콜론 종결 금지.

AI-스멜 금지 (전체 목록과 예시는 `docs/voice/README.md`).
- 수사 의문문은 레슨당 최대 1회 ("보이시죠?", "볼까요?")
- 모든 섹션을 펀치라인 한 줄로 끝내지 않는다
- 근거 없는 계량 과장 금지 ("두 단계 위로", "80%가 사라져요")
- em-dash·삼분 병렬·균질한 문단 길이의 반복 주의
- 실제 일화가 필요한 자리는 지어내지 말고 `{/* TODO(운영자): 실제 일화 */}`로 비워 둔다

## 작업 순서 (의무)

```bash
npm run new-lesson <slug> --phase phase-2-prompt-engineering --title "한글 제목"
```

스캐폴더가 만들어 주는 것:
- `src/content/lessons.ts` 끝에 stub 객체 (TODO 마커 가득)
- `src/content/lessons/<slug>.mdx` 본문 템플릿
- `src/content/lessons/<slug>/outputs/README.md`
- `src/content/lesson-bodies.ts` 자동 등록

이후:
1. `docs/voice/README.md` + 골든 샘플을 읽는다 (위 "목소리" 섹션)
2. lessons.ts의 TODO를 차례로 채운다 (hook → mission → buildSteps → verificationChecklist → deliverable → reflectionQuestions → outputs)
3. MDX 본문을 700~1200단어로 작성한다 (도입 시나리오 → 핵심 개념 → 오늘 할 일 → 마무리)
4. 다른 레슨 1개 이상에 인터링크 (`[관련 레슨](/lessons/<slug>)`)
5. outputs/ 폴더에 산출물 템플릿 .md 1개 이상
6. `phases.ts` 의 해당 Phase `lessonSlugs`에 새 slug 추가
7. `npm run check` 실행 — exit 0 확인

## 7-step 루프 (절대 빼지 말 것)

1. `problemScenario` — 학습자가 마주한 구체 상황
2. `coreConcepts` — 최소 개념 2~4개
3. `mission` (또는 codexMission/claudeCodeMission) — Claude Code에게 줄 단일 미션
4. `buildSteps` — 3~5 단계
5. `verificationChecklist` — 5±2 항목
6. `deliverable` — title / description / format
7. `reflectionQuestions` — 3 문항

## 산출물 템플릿(.md) 가이드

학습자의 도메인을 채울 빈칸이 있어야 합니다:

```
# <산출물 이름>

## 0. 내 맥락 (3문장)
- 직군 / 역할:
- 주로 쓰는 산출물 3가지:
- 가장 큰 리스크:

## 1. <섹션 1>
...

## N. 회고
| 항목 | 내용 |
| --- | --- |
| AI가 잘한 것 | |
| 내가 바로잡은 것 | |
| 다음에 바꿀 것 | |
```

## 검증 게이트

작업 끝에 반드시 실행:

```bash
npm run check
```

실패 시:
- `validate` 실패 → lessons.ts와 phases.ts의 slug 매핑 확인
- `typecheck` 실패 → MDX import 누락 또는 lesson-bodies.ts 등록 누락
- `build` 실패 → 새 페이지 생성 시 `generateStaticParams` 호환 확인

## 절대 하지 말 것

- 자동 수정 (`auto-fix`) — `validate` 실패는 사용자에게 보고
- 기존 레슨 삭제 — `Stop point`
- `package.json` dependency 추가 — `Stop point`
- `.env*` 작성 — deny 목록
