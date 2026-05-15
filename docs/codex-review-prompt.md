# Codex 검토 프롬프트 — AI Builder School 24개 신규 레슨

이 문서를 그대로 Codex CLI / Codex 웹에 paste 해서 돌리세요.

**핵심 흐름:**
1. Codex가 24개 레슨을 6축으로 검토
2. 결과를 **레슨 1개당 1개 md 파일**로 `docs/codex-review/<slug>.md` 에 저장
3. Claude가 그 md 파일들을 차례로 읽어 patch 적용

---

## 검토 대상 (붙여넣기 시작)

너는 AI Builder School 커리큘럼의 외부 검토자다. 직전에 다른 AI 에이전트 7개가 병렬로 24개의 신규 레슨 MDX 본문을 작성했다. Anthropic 쿼터 한도로 작업이 중간에 종료된 부분이 있어 **품질·일관성·할루시네이션이 의심된다**. 너의 임무는 6가지 축으로 검토 후 **레슨별 evaluation md 파일**을 생성하는 것이다.

수정은 하지 마라 — **md 리포트만** 만들면 된다. 다른 에이전트(Claude)가 그 md 파일들을 읽어서 patch를 적용한다.

## 프로젝트 위치

```
/Users/taewookkim/Library/Mobile Documents/com~apple~CloudDocs/Creative OS/AI Builder School/
```

경로에 공백 있음 — 따옴표 처리.

## 출력 위치

`docs/codex-review/` 폴더를 생성하고 (없으면), 그 안에 다음 25개 파일을 저장한다:

```
docs/codex-review/
├── _summary.md                              # 전체 요약 + 우선순위 인덱스
├── automate-report-drafts.md
├── meeting-notes-pipeline.md
├── research-workflow.md
├── blog-writing-pipeline.md
├── coding-agent-setup.md
├── github-issue-to-ai-brief.md
├── letting-ai-read-codebase.md
├── plan-with-ai.md
├── write-tests-with-coding-agent.md
├── bug-reproduction-loop.md
├── connect-ai-api.md
├── streaming-response-ui.md
├── structured-output-handling.md
├── conversation-storage-design.md
├── understanding-embeddings.md
├── document-chunking-strategy.md
├── vector-search-basics.md
├── grounded-rag-answers.md
├── function-calling.md
├── mini-agent-loop.md
├── tool-permission-safeguards.md
├── prompt-injection-defense.md
├── ai-app-cost-and-usage.md
└── capstone-plan-and-launch.md
```

각 파일은 **레슨 슬러그.md**로 저장 — Claude가 차례로 읽어 patch할 때 매핑이 쉬움.

## 검토 대상 24개 MDX 파일

`src/content/lessons/<slug>.mdx` 위치. 위 슬러그 그대로 매칭.

## 스타일 기준 — 이 8개와 매칭되어야 함

다음 8개는 검증된 기준점이다. 본격 검토 전 **최소 4개를 정독**해 어조·구조를 내재화해라:

```
src/content/lessons/common-skills-of-future-proof-people.mdx (L01)
src/content/lessons/what-llms-are-good-and-bad-at.mdx (L02)
src/content/lessons/hallucination-verification.mdx (L03)
src/content/lessons/checks-before-trusting-ai-output.mdx (L04)
src/content/lessons/structure-of-good-prompts.mdx (L05)
src/content/lessons/enforcing-output-format.mdx (L06)
src/content/lessons/feeding-long-documents.mdx (L07)
src/content/lessons/build-personal-prompt-library.mdx (L08)
```

## 6축 검토 항목

각 레슨에 대해 다음 6축을 평가:

### 1. 스타일 일관성 (Style)
- 한국어 해요체 (반말·격식체 혼재 금지)
- Hook-driven 구체 시나리오 도입부 (`## "..."` 형태)
- 5-7개 H2 섹션
- 비교 표 1개 이상
- "## 그래서 오늘 만들 한 장/폴더" 산출물 섹션
- `---` + "## 더 깊이 보기" + 가상 사례 footer

### 2. 인용 정확성 (Citation accuracy) — **가장 중요**
본문의 `{/* Source · DOC · ... — URL */}` 또는 `{/* Source · PAPER · ... — URL */}` 인용 전체를 추출해서:
- **URL이 실재하는가** — WebFetch 또는 curl로 200 응답 확인. 5-10개 표본 검증.
- **저자/연도/제목 정확성** — 가짜 논문/문서 색출.
- **인용 주장이 그 출처에 실제로 있는가** — 무리한 일반화 색출.

### 3. 가상 사례 라벨 (Virtual case)
도입부에 구체 시나리오가 있는데 footer에 다음 패턴이 없으면 위반:
```
> _참고: 본문 도입의 "[scenario summary]" 시나리오는 학습 효과를 위한 가상 사례입니다. ..._
```

### 4. 운영자 명칭 disclaimer
새로 만든 명칭(예: "3단 방어선", "FOSCB" 같은 운영자 자체 작명)에 다음 주석 누락 색출:
```
{/* Note: ... 외부 표준명 아님 */}
```

### 5. 정량 수사 잔존 (Unverifiable rhetoric)
다음 같은 검증 안 되는 표현:
- "70% 줄어듭니다" / "10배 빠릅니다" / "1000마디 설명보다 강함"
- 출처 없는 구체 수치

정성 표현 ("눈에 띄게", "결과를 단단하게")으로 완화되거나 출처 인용으로 뒷받침되어야 함.

### 6. Cross-reference 정확성
- `[Lesson XX](/lessons/<slug>)` 슬러그·번호 매핑 정확
- 깨진 마크다운 링크 문법
- 존재하지 않는 레슨 참조

레슨 매핑 (참고):
- L01 common-skills-of-future-proof-people
- L02 what-llms-are-good-and-bad-at
- L03 hallucination-verification
- L04 checks-before-trusting-ai-output
- L05 structure-of-good-prompts
- L06 enforcing-output-format
- L07 feeding-long-documents
- L08 build-personal-prompt-library

## 레슨별 md 파일 형식 (template)

각 `docs/codex-review/<slug>.md`는 정확히 이 구조로:

```markdown
# Codex 검토 — <slug>.mdx

## 메타
- 검토 시각: <ISO8601>
- 파일 경로: src/content/lessons/<slug>.mdx
- 본문 라인 수: NN
- 종합 등급: 🟢 / 🟡 / 🔴 (각각 통과 / 부분수정 필요 / 핵심수정 필요)

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ / ⚠ / ✗ | 한 줄 요약 |
| 2. 인용 정확성 | ✓ / ⚠ / ✗ | 검증한 URL 개수 / 발견 문제 수 |
| 3. 가상 사례 라벨 | ✓ / ⚠ / ✗ | 누락 위치 |
| 4. 운영자 명칭 | ✓ / ⚠ / ✗ | 누락 disclaimer 명칭 목록 |
| 5. 정량 수사 | ✓ / ⚠ / ✗ | 위반 표현 인용 |
| 6. Cross-reference | ✓ / ⚠ / ✗ | 깨진 링크 |

## Critical issues (즉시 수정)

### [CITATION-FAKE] line NN
quoted: "..."
url: https://...
verdict: URL 404 / 논문 존재 안 함 / 무관한 페이지
suggested-fix: 인용 제거 또는 검증 가능한 다른 출처 ([URL]) 로 교체

### [VIRTUAL-CASE-MISSING]
도입부 시나리오: "..."
footer 라벨 누락
suggested-fix: 마지막 섹션에 다음 추가:
```markdown
> _참고: 본문 도입의 "..." 시나리오는 학습 효과를 위한 가상 사례입니다. ..._
```

## High issues

(중간 우선순위 — 정량 수사, 운영자 명칭 disclaimer 등)

## Medium issues

(스타일·구조의 약한 일관성, 사소한 cross-ref 오류)

## Low / 제안

(개선 제안 — 강제는 아님)

## lessons.ts 보강 제안 (해당 시만)

이 레슨이 lessons.ts에서 bare-bones 상태라면 (hook 필드 없음) 다음을 제안:

### hook (한 줄)
"..."

### learningGoals (5개, verb-led)
- ...
- ...

### coreConcepts (4-5개)
- **<term>**: <1-line explanation>
- ...

### reflectionQuestions (3-4개)
- ...

(MDX 본문에서 추출 가능한 것 기반으로 작성)

## 결론

- 가장 큰 문제: ...
- 수정 후 예상 등급: 🟢 / 🟡
- Claude 적용 우선순위: 🔥 즉시 / 🟡 보통 / 🟢 여유
```

## `_summary.md` 형식

전체 인덱스 파일:

```markdown
# Codex 검토 요약 — 24개 신규 레슨

## 메타
- 검토 시각: <ISO8601>
- 검토한 파일: 24
- WebFetch 검증한 URL: NN개

## 등급 분포
- 🟢 통과: NN개
- 🟡 부분수정: NN개
- 🔴 핵심수정: NN개

## 우선순위 인덱스 (수정 순서)

### 🔥 즉시 수정 (Critical 다수)
1. [<slug>](./<slug>.md) — Critical N건 (이유 한 줄)
2. ...

### 🟡 보통
1. ...

### 🟢 여유
1. ...

## 공통 패턴 발견
(여러 파일에 반복되는 문제 — Claude가 일괄 처리할 만한 것)

- 패턴 A: ...
- 패턴 B: ...

## bare-bones lessons.ts 14개 (별도 보강 필요)

다음 14개는 lessons.ts 메타가 빈약 (hook 필드 없음):

- lesson-17 write-tests-with-coding-agent
- lesson-18 bug-reproduction-loop
- lesson-19 connect-ai-api
- lesson-20 streaming-response-ui
- lesson-21 structured-output-handling
- lesson-22 conversation-storage-design
- lesson-23 understanding-embeddings
- lesson-24 document-chunking-strategy
- lesson-25 vector-search-basics
- lesson-26 grounded-rag-answers
- lesson-28 mini-agent-loop
- lesson-29 tool-permission-safeguards
- lesson-30 prompt-injection-defense
- lesson-32 capstone-plan-and-launch

각 슬러그의 `docs/codex-review/<slug>.md` 안 "lessons.ts 보강 제안" 섹션 참조.
```

## 작업 가이드

- **WebFetch 적극 활용** — 인용 URL 5-10개 무작위 표본 검증.
- 본문 라인 번호는 `<file>:<line>` 형태.
- 의심스러우면 "verdict: 의심" 으로 표시하고 단정하지 말 것.
- 24개 본문 + 8개 기준점 = 32개 다 정독 안 해도 됨. 12-15개 본문 깊게, 나머지는 헤딩·인용 추출 수준.
- 한국어로. 코드/URL/필드명만 영어.
- **반드시 25개 md 파일을 모두 생성**. 검토 끝나면 `docs/codex-review/` 폴더에 25개 파일이 있어야 함.

## 종료 조건

`docs/codex-review/` 안에 25개 md 파일 (24개 레슨별 + `_summary.md`) 생성하면 끝. 후속 patch는 Claude가 한다.

---

## (붙여넣기 끝)

## 사용법

1. 위 "검토 대상 (붙여넣기 시작)" 부터 "(붙여넣기 끝)" 직전까지 복사
2. Codex CLI: `codex` 새 세션에 paste, 또는 웹 Codex에 paste
3. Codex가 `docs/codex-review/` 폴더에 25개 md 파일 생성하면 완료
4. Claude에게 "codex 검토 끝났어" 한 마디 — Claude가 `_summary.md` 부터 읽고 우선순위 순으로 patch 적용

## 예상 결과 폴더

```
docs/codex-review/
├── _summary.md                       ← 전체 인덱스 + 우선순위
├── automate-report-drafts.md         ← 레슨별 평가 + 수정안
├── meeting-notes-pipeline.md
├── research-workflow.md
├── ... (총 24개 레슨별 + 1개 요약 = 25개)
```

각 레슨별 md는:
- 6축 평가표
- Critical / High / Medium / Low 분류된 issue
- bare-bones 14개에 한해 lessons.ts 보강 제안 (hook · learningGoals · coreConcepts · reflectionQuestions)

이 구조로 받으면 Claude가 한 파일씩 처리해 patch 적용 → 다음 파일로 이동하는 사이클로 깔끔하게 돌릴 수 있어요.
