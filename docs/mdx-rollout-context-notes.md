# MDX 본문 롤아웃 — Context Notes

> [`mdx-rollout-checklist.md`](mdx-rollout-checklist.md) 와 함께 본다.
> 새 세션에서 이어 작업할 때 처음 5분에 이 파일을 읽고 시작.

## 어조 결정 (확정)

- 어말 어미는 **`~예요 / ~해요`** 위주. 학습자에게 말 거는 친근한 톤.
- 한국어 출력에 콜론 종결 금지 (CLAUDE.md 글로벌 규칙 #1). 모든 한국어 문장은 `.`, `?`, `!` 로 끝.
- 영어 문서로 학습된 LLM 의 콜론 습관이 새지 않도록 의식적으로 잡는다.

## 본문 구조 (확정)

기존 Phase 1 의 4 개 MDX 가 표준. 새 본문도 같은 5 단 구조.

```
## 도입 — 학습자에게 말 거는 한 장면
(학습자가 자기 일에서 마주칠 법한 구체 시나리오 1~2 문단)

## 왜 이 레슨인가
(이 레슨이 어떤 빈 자리를 채우는지, 그래서 오늘 어떤 한 가지를 만들 건지)

## 핵심 개념 — 빠르게 짚고 갑니다
(coreConcepts 와 같은 개념을 풀어 말함. lessons.ts 보다 살아있는 톤)

## 그래서 오늘 할 일
(deliverable 로 가는 다리. "오늘 만들 한 장은 ~~~ 입니다." 식)

## 마무리
(7-step 루프 회고로 자연스럽게 넘어가는 한 문단)
```

레퍼런스, [`src/content/lessons/checks-before-trusting-ai-output.mdx`](../src/content/lessons/checks-before-trusting-ai-output.mdx).

## 길이 / 단어 수

- 권장 600~1500 단어 (eval 가이드).
- Phase 1 평균 — 528 / 623 / 614 / 643. 첫 lesson 만 약간 짧음.
- 너무 길면 스킵당하고, 너무 짧으면 도구로서 가치 약함.

## 인터링크 (다른 레슨 참조)

- 형식 — `[Lesson X.Y](/lessons/<slug>)` (Phase.순서 표기, 100단위 ID 도입 후 결정됨).
- 가능하면 **이전 lesson 산출물을 호출**하는 패턴 강조 ("Lesson 1.3 에서 만든 verify-loop 를 여기서 호출하세요").
- Phase 1 4 lesson 사이에 이미 인터링크 7곳 들어가 있음. 새 lesson 도 최소 1~2곳 권장.

## 산출물 템플릿 (`outputs/`)

각 lesson 의 `outputs/<filename>.md` 는 학습자가 다운로드해 쓸 출발점.

- `lessons.ts` 의 `outputs[]` 배열과 파일명이 일치해야 함.
- 구조 — "0. 내 맥락 → 1. 본문 → N. 회고" 권장.
- 빈칸 + 예시 한두 줄.
- 한 페이지 분량.

레퍼런스, [`src/content/lessons/checks-before-trusting-ai-output/outputs/trust-check.md`](../src/content/lessons/checks-before-trusting-ai-output/outputs/trust-check.md).

## 한 lesson 작업 시 체크리스트

1. `src/content/lessons.ts` 에서 해당 lesson 객체 확인 (slug, hook, summary, mission, outputs[] 다 있어야 함)
2. `src/content/lessons/<slug>.mdx` 작성 — 위 5 단 구조
3. `src/content/lessons/<slug>/outputs/<filename>.md` 작성 (lessons.ts 의 outputs[] 와 매칭)
4. `src/content/lesson-bodies.ts` 에 import + registry 추가
5. `src/content/lessons.ts` 해당 객체에 `hasMdxBody: true` 추가
6. `npm run check` 통과
7. 가능하면 dev 서버에서 페이지 직접 확인

## 자동화 보조

- 새 lesson 추가 (스키마 자체가 없는 상태) — `npm run new-lesson <slug>` 사용
- 기존 lesson 의 본문만 추가 — 위 7단계를 수동으로

## 안 하는 것 (CLAUDE.md 글로벌 규칙)

- `codexMission` / `claudeCodeMission` 레거시 필드 **삭제 금지** (back-compat 유지).
- 콘텐츠 데이터 (`src/content/**`) 는 `lesson-writer` 또는 직접 편집. `ui-stylist` 는 절대 못 만짐.
- MDX 안에 마크다운 외 컴포넌트 import 금지 (단순 마크다운 + GFM 만).

## 작업 진척 시 갱신

- [`mdx-rollout-checklist.md`](mdx-rollout-checklist.md) 의 체크박스 켜기.
- Phase 단위 커밋 (예: `Phase 2 MDX 본문 4 lesson 추가`).
- 작업 중 새 결정 (어조 미세 변경 등) 이 생기면 이 파일에 추가.

## 다음 세션 진입 1줄

> "MDX 본문 롤아웃 작업 이어서. checklist 어디까지 됐는지 확인하고 다음 Phase 시작."
