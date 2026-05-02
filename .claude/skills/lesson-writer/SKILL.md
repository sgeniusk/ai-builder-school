---
name: lesson-writer
description: AI Builder School에 새 레슨을 추가하거나 기존 레슨의 본문을 친근 어조로 작성·수정. 학습자에게 말 거는 어투, 7-step 루프 보존, MDX 본문 + 산출물 템플릿 + lessons.ts 스키마를 모두 채우는 단일 책임 스킬.
---

# Skill · lesson-writer

> Harness · Agent Topology — 레슨 추가/편집은 이 스킬로만.

## 언제 쓰나

- 새 레슨을 추가할 때
- 기존 레슨의 MDX 본문을 친근 어조로 다시 쓸 때
- outputs/ 산출물 템플릿을 만들 때
- `targetJourneys`, `coreConcepts`, `mission` 등 7-step 루프 필드를 다듬을 때

## 언제 안 쓰나

- UI 스타일/컴포넌트 변경 → `ui-stylist` 사용
- 타입·헬퍼·라이브 코드 변경 → 직접 작업 (이 스킬 범위 아님)
- 단순 typo 수정도 이 스킬을 거쳐 톤이 깨지지 않게

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
1. lessons.ts의 TODO를 차례로 채운다 (hook → mission → buildSteps → verificationChecklist → deliverable → reflectionQuestions → outputs)
2. MDX 본문을 친근 어조 700~1200단어로 작성한다 (도입 시나리오 → 핵심 개념 → 오늘 할 일 → 마무리)
3. 다른 레슨 1개 이상에 인터링크 (`[관련 레슨](/lessons/<slug>)`)
4. outputs/ 폴더에 산출물 템플릿 .md 1개 이상
5. `phases.ts` 의 해당 Phase `lessonSlugs`에 새 slug 추가
6. `npm run check` 실행 — exit 0 확인

## 친근 어조 가이드

- ❌ "AI를 업무 OS처럼 다뤄 반복 업무를 줄이고 판단에 시간을 씁니다."
- ✅ "매일 1시간씩 반복되는 일에 AI 한 줄 깔아두면, 그 시간이 손에 돌아와요."

핵심:
- 추상 명사("업무 OS") 대신 구체("매일 1시간씩 반복되는 일")
- 결과 통보(~합니다) 대신 학습자 감각에 다가가는 어조(~돌아와요 / ~돼요)
- 1~2문단 안에 학습자가 공감할 시나리오 1개

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
