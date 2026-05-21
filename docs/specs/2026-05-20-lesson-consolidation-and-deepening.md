# AI Builder School 2.0 — 레슨 통합·심화 스펙 (v1, 8-Stage 안)

> ⚠ **상태 — SUPERSEDED**. 2026-05-22 검토에서 8 Stage 자체를 6 Stage로 통합하기로 결정.
> 후속 — [`2026-05-22-six-stage-restructure-and-lesson-consolidation.md`](./2026-05-22-six-stage-restructure-and-lesson-consolidation.md) (v2)
> 역사 자료로만 유지. 이 문서의 통합 매핑은 v2에서 그대로 재사용되며, Stage 라벨만 재정렬됨.
>
> ---
>
> 원본 메타 — 초안 · 작성 2026-05-20 · 범위 2순위 레슨 심화(스펙 2)
> 상위 — `docs/specs/2026-05-19-builder-school-2.0-architecture.md` (§0.3 · §10 · §11이 위임)
> 선행 — §0 토대(완료) · 스펙 3 특강(구현됨)
> 베이스 — `claude/2.0-foundation-v2`(머지 후 `main` 기준 재분기)

---

## 0. 배경

v1.0 시점 레슨은 **84개 · 3,965분 · 약 66시간**이다. 8 Stage 사다리는 §0에서 정돈됐지만, 레슨 자체에는 두 가지 묵은 문제가 남는다.

- **잘게 쪼개진 인접 주제** — 같은 능력을 다른 각도로 다루는 레슨이 여러 개로 흩어져 있다. 학습자는 한 능력을 익히려고 3~5개 레슨을 순차 통과해야 한다.
- **얕은 단위 레슨** — 한 레슨이 한 주제를 한 번 짚고 끝난다. 7-step 루프(problem → concepts → mission → build → verify → ship → reflect)가 짧은 분량에 압축돼 각 단계가 표면적이다.

상위 스펙 §0.3이 답을 던졌다. **레슨을 통합·감축하고, 살아남는 레슨은 각각 2배 깊어진다.** 콘텐츠 총량이 아니라 시스템(그래프·특강·파이프라인)에 투자한다.

이 스펙은 그 약속을 실행 가능한 형태로 못박는다. 통합 원칙, 깊이의 정의, Stage별 구체 매핑, 마이그레이션 절차, 검증 게이트.

---

## 1. 목표 수치

| 지표 | v1.0 | v2.0 목표 | 변화 |
|---|---|---|---|
| 레슨 수 | 84 | **~55개** | -35% |
| 총 분량 | 3,965분 (66h) | **~3,000분 (50h)** | -25% |
| 평균 레슨 분량 | 47분 | **~55분** | +17% (각 레슨 깊어짐) |
| Stage 수 | 8 | 8 (유지) | — |
| Journey 수 | 6 | 6 (유지) | — |

목표는 "약" 단위로 둔다. 통합 매핑 검토 과정에서 ±5 레슨 범위 내 조정 가능. 최종 수치는 §6 매핑 승인 시 확정.

---

## 2. 통합 원칙 (5)

각 통합 후보를 다음 5원칙으로 평가한다.

1. **같은 능력을 다른 도구로 다루면 통합** — 도구별 변형은 휘발성이라 본 레슨에 묶고, 특강·템플릿으로 빠지게 한다.
2. **선후 의존이 강하면 통합** — A→B의 흐름이 항상 같이 쓰이면 한 레슨의 두 절(section)로 합친다. prerequisite 엣지가 한 줄짜리 레슨을 자주 가리키면 후보다.
3. **운영·메타 주제는 한 곳에 모은다** — 비용·로깅·평가 같은 운영 주제는 Stage 7로 모은다. Stage 1·4에 흩어진 비용 레슨이 대표적.
4. **자영업·창작 시나리오는 케이스 묶음으로** — 같은 자동화 패턴을 직군별로 변형한 레슨은 한 레슨의 케이스 갤러리로 변환한다.
5. **무엇을 합치지 않는가도 명시** — 코어 원리(예 `what-llms-are-good-and-bad-at`, `mini-agent-loop`)는 **명시적 보존 대상**이다. 특강이 `deepens`로 매다는 항구적 코어이기 때문.

---

## 3. "2배 심화"의 정의 — 깊이 7차원

"2배 심화"는 단순히 분량 2배가 아니다. 다음 7개 차원 중 **최소 4개**에서 추가가 일어나야 "심화"로 인정한다.

| # | 차원 | 무엇이 추가되나 |
|---|---|---|
| D1 | **현실 시나리오** | hook·problemScenario 길이/구체성 — 실패 사례 1개 이상 |
| D2 | **반례·실패 모드** | "이렇게 하면 망한다" 1~2개 — 학습자가 흔히 빠지는 함정 |
| D3 | **수치·근거** | 벤치마크·비용·시간 같은 정량 데이터 (출처 주석 포함) |
| D4 | **3가지 깊이의 미션** | 5분 워밍업 · 30분 본 미션 · 1시간 심화. 시간 빠듯한 학습자도 진입 가능 |
| D5 | **검증 체크리스트 확장** | 단순 "동작했나"에서 "엣지 케이스·롤백·관측까지" |
| D6 | **연결 (그래프)** | `teaches`로 Concept 노드 명시 · `relatedTo`로 인접 레슨 · `deepens` 대상 특강 |
| D7 | **회고 질문 깊이** | "할 수 있는 것 → 못 하는 것 → 다음 학습"의 3단 질문 |

각 레슨의 심화는 위 7차원 체크박스로 추적한다(검증 게이트 — §8). 분량은 **40~80분** 사이로 제한한다. 그 이상은 분할 검토.

---

## 4. 무엇을 보존하는가 — 코어 12개

다음 레슨은 **통합 후보에서 제외**한다. 이유 — 항구적 코어이며 특강이 `deepens`로 매다는 대상이거나, 빌더 정체성의 핵심.

| Stage | 슬러그 | 보존 이유 |
|---|---|---|
| 1 | `common-skills-of-future-proof-people` | 본 사이트 정체성 — 빌더의 공통 역량 |
| 2 | `structure-of-good-prompts` | 프롬프트 코어 |
| 3 | `what-llms-are-good-and-bad-at` | 특강 #1이 `deepens`. 모델 모양별 강약 |
| 5 | `harness-engineering-roadmap` | Harness Engineering 정체성 |
| 5 | `claude-md-four-principles` | Karpathy 65줄, 코어 원칙 |
| 6 | `function-calling` | 도구 사용 원리 |
| 6 | `mini-agent-loop` | 에이전트 원리 |
| 6 | `grounded-rag-answers` | RAG 코어 |
| 6 | `prompt-injection-defense` | 보안 코어 |
| 7 | `evals-for-ai-coded-prs` | 운영 게이트 |
| 7 | `agent-failure-patterns` | 에이전트 운영 코어 |
| 8 | `claude-skills-authoring` | 자산화 — DSS 형제 사이트와 공유 |

---

## 5. AI 문체 교정 원칙

상위 스펙이 같이 위임한 항목. 살아남는 레슨은 모두 다음 문체 점검을 통과한다.

- **한국어 자연성** — `humanizer` 스킬 기반 24개 AI 패턴(쉼표 과다·구조적 단조로움·과도한 대명사 등) 자동 진단.
- **`눈송이 단어` 금지** — "혁신적", "다양한", "효과적으로" 같은 의미 비어 있는 강조어 제거.
- **"본인 / 사용자" → "당신"** — 본 사이트의 페르소나 규칙(공통 캐릭터 = 학습자 본인) 유지.
- **콜론 종결 금지** — 한국어 문장은 `.` `?` `!`로만 끝낸다 (CLAUDE.md 글로벌 룰).
- **출처 주석** — `{/* Source · DOC|PAPER|NEWS · ... — URL */}` 포맷 통일.

검증은 작가가 수동 + `npm run eval:rubric`(opt-in LLM 평가) 보조.

---

## 6. Stage별 통합 제안 (초안) ⚠

**모든 매핑은 사용자 승인 필요.** 이 §은 출발점이며 한 줄 한 줄 검토받고 확정한다.

표 보는 법
- **출**: 통합 전 슬러그 (제거 또는 흡수)
- **신**: 통합 후 슬러그 (이름은 잠정 — 확정은 별도)
- **변동 없음**: 코어 보존 (§4)

### Stage 1 (7 → 5)
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `ai-delegation-decision` + `ai-collaboration-mindset` | `ai-delegation-and-team-adoption` | 둘 다 "AI를 일에 들이는 결정". 위임 판단 → 팀 도입은 자연스러운 흐름 |
| 이동 | `cost-monitoring-in-production` (S1) → Stage 7 | — | 입문 레슨이 갑자기 운영 비용을 다뤄 학습 곡선이 튐 |
| 보존 | 나머지 4 + 신규 1 = 5 | | |

### Stage 2 (10 → 7)
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `prompt-debugging-loop` + `output-evaluation-refine` | `prompt-iteration-loop` | 둘 다 "한 번에 끝내지 않는다". 디버깅·평가는 같은 반복 루프의 두 면 |
| 통합 | `enforcing-output-format` → `structure-of-good-prompts` | (코어에 흡수) | 형식 강제는 좋은 프롬프트의 절(section)로 흡수 |
| 이동 | `api-rate-limiting-and-batching` → Stage 7 | — | 운영 주제 — Stage 7의 비용·관측 라인에 더 적합 |
| 보존 | 나머지 6 + 통합 1 = 7 | | |

### Stage 3 (5 → 4)
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `hallucination-verification` + `checks-before-trusting-ai-output` | `verifying-ai-output` | 환각·신뢰성 검증은 같은 능력. 분리할 이유 약함 |
| 보존 | 나머지 3 + 통합 1 = 4 (특강 #1이 `deepens`하는 `what-llms-are-good-and-bad-at` 포함) | | |

### Stage 4 (17 → 11) — 가장 큰 절감
**4a 자동화 (7 → 4)**
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `automate-report-drafts` + `meeting-notes-pipeline` | `office-document-pipelines` | 둘 다 사무 산출물 자동화 — 같은 패턴의 두 케이스 |
| 통합 | `research-workflow` + `blog-writing-pipeline` | `research-to-writing-pipeline` | 리서치→글쓰기는 한 흐름 |
| 이동 | `cost-estimation-and-roi-by-task` → Stage 7 | — | 운영·의사결정 주제 |
| 보존 | `custom-gpt-builder` · `multi-workflow-orchestration` | | |

**4b 콘텐츠 (6 → 4)**
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `blog-to-shorts-pipeline` + `youtube-script-research-to-outline` | `content-repurposing-pipeline` | 둘 다 롱폼↔숏폼·스크립트 변환 |
| 통합 | `design-visual-prompt-system` + `figma-ai-ui-variation-workflow` | `visual-prompt-and-ui-pipeline` | 디자인 자동화 두 케이스를 한 갤러리로 |
| 보존 | `thumbnail-and-title-ab-test` · `local-business-content-calendar` | | |

**4c 데이터 (4 → 3)**
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `crm-segmentation-with-ai` + `dashboard-narrative-and-qa` | `data-curation-and-narrative` | 둘 다 "AI로 데이터→사람 친화 산출물" |
| 보존 | `sql-with-ai-verification` · `ab-test-decision-memo` | | |

### Stage 5 (11 → 8)
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `write-tests-with-coding-agent` + `bug-reproduction-loop` | `tdd-and-bug-loop-with-agent` | TDD와 버그 재현은 같은 루프의 면 |
| 통합 | `claude-md-four-principles` (보존 코어) + `agent-hooks-automation` | — (별개 유지, 단 `relatedTo` 강한 연결) | claude-md는 코어로 보존, hooks는 별개로 유지. **통합 안 함**. 단 `relatedTo` 엣지로 강하게 묶음 |
| 통합 | `ralph-loop-codex-goal` (S6c) → Stage 5로 이동 | — | "자율 코딩의 진화"는 코딩 에이전트 흐름(S5) |
| 보존 | 나머지 8 = 8 (write-tests+bug-repro 통합 -1, ralph 유입 +1) | | |

### Stage 6 (16 → 11) — 코어 보존 우선
**6a 코어 (6 → 4)**
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `streaming-response-ui` + `structured-output-handling` | `response-handling-streaming-and-structured` | 응답 다루기 두 면 |
| 통합 | `auth-and-user-sessions` + `long-term-memory-state` | `user-and-memory-state` | 사용자·기억 상태는 같은 축 |
| 보존 | `connect-ai-api` · `conversation-storage-design` | | |

**6b RAG (4 → 3)**
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `understanding-embeddings` + `document-chunking-strategy` | `embeddings-and-chunking-for-rag` | RAG 전처리 한 쌍 |
| 보존 | `vector-search-basics` · `grounded-rag-answers` (코어) | | |

**6c 도구·에이전트 (6 → 4)**
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `tool-permission-safeguards` + `prompt-injection-defense` (코어) | — (별개 유지) | 둘 다 보안이지만 prompt-injection은 코어 — **통합 안 함**, 단 relatedTo로 강 연결 |
| 이동 | `ralph-loop-codex-goal` → Stage 5 | — | 위 §Stage 5 참조 |
| 보존 | `function-calling` · `mini-agent-loop` · `tool-permission-safeguards` · `prompt-injection-defense` · `build-mcp-server` = 5. 단 ralph 이동으로 4 | | |

### Stage 7 (9 + 유입 3 → 8)
유입 — `cost-monitoring-in-production`(S1) · `api-rate-limiting-and-batching`(S2) · `cost-estimation-and-roi-by-task`(S4a)

| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `ai-app-cost-and-usage` + `cost-monitoring-in-production`(유입) + `cost-estimation-and-roi-by-task`(유입) | `ai-cost-operations` | 비용 라인 3개 → 1개로 (모니터링·ROI·과금) |
| 통합 | `ai-output-eval-for-pms` + `responsible-ai-policy-template` | `pm-eval-and-policy` | PM 사이드 평가·정책 한 쌍 |
| 통합 | `claude-code-token-saving` + `api-rate-limiting-and-batching`(유입) | `token-and-rate-optimization` | 토큰·rate-limit 절감 한 쌍 |
| 보존 | `evals-for-ai-coded-prs` · `llm-observability-and-regression` · `agent-failure-patterns` · `mcp-production-patterns` · `user-feedback-collection-for-ai-products` | | |

결과 — 5 보존 + 3 통합 = 8

### Stage 8 (9 → 7)
| 변화 | 출 | 신 | 이유 |
|---|---|---|---|
| 통합 | `capstone-scope-selection` + `capstone-build-loop` | `capstone-scope-and-build` | 스코프→빌드는 한 흐름 |
| 통합 | `capstone-plan-and-launch` + `portfolio-and-retrospective` | `capstone-launch-and-retrospective` | 배포→회고는 한 마무리 |
| 보존 | 나머지 5 = 5 | | |

### 합계

| Stage | v1.0 | v2.0 | 변화 |
|---|---|---|---|
| 1 | 7 | 5 | -2 |
| 2 | 10 | 7 | -3 |
| 3 | 5 | 4 | -1 |
| 4 | 17 | 11 | -6 |
| 5 | 11 | 8 | -3 |
| 6 | 16 | 11 | -5 |
| 7 | 9 | 8 | -1 (유입 3 - 통합 4) |
| 8 | 9 | 7 | -2 |
| **합** | **84** | **61** | **-23 (-27%)** |

목표 ~55와 다소 차이. 61 → 55로 더 줄이려면 추가 통합 후보가 필요한데, 코어 보호와 트레이드오프. **61을 1차 목표로 두고 실행하며 조정** 권장.

---

## 7. 마이그레이션 — v1.0 → v2.0 레슨

빌드를 한 번도 깨지 않고 넘어간다.

### 7-1. 단계

1. **스펙 매핑 확정** — 본 문서 §6의 통합표를 사용자가 한 줄씩 승인. 결과는 매핑 YAML 파일로 못박는다 — `docs/migrations/lessons-2.0-mapping.yaml`.
2. **통합 레슨 작성** — Stage 단위로 PR 분할. 한 PR당 한 Stage의 통합 + 깊이 7차원 작업.
3. **`lesson-stage-mapping.ts` 갱신** — 신 슬러그·신 ordinal·sub-group 재배치.
4. **`lessons.ts` 갱신** — 흡수된 레슨 객체 제거, 신 레슨 객체 추가.
5. **`lesson-bodies.ts` + `lessons/<slug>.mdx`** — 신 본문 MDX 작성, 흡수된 MDX 파일 삭제.
6. **그래프 엣지 갱신** — `prerequisites`·`targetJourneys`·`teaches`·`relatedTo`. `ontology.ts`의 수동 엣지(teaches·relatedTo)와 자동 유도 엣지(prerequisite·partOfJourney) 모두 재계산.
7. **외부 링크 보존 — redirect 처리** — 흡수된 slug → 신 slug 영구 리디렉트. 정적 사이트라 Next config의 redirects(server) 또는 빌드 타임 redirect HTML 생성. 자세한 방식은 §7-4.
8. **`/me` 진척도 호환** — 학습자의 localStorage에 옛 slug가 저장돼 있을 수 있다. 한 번의 마이그레이션 코드(클라이언트 부팅 시)가 옛 slug → 신 slug로 키 갱신. **데이터 손실 0** 원칙.
9. **검증 게이트 — §8** 통과 후 머지.

### 7-2. 단위 PR

한 Stage = 한 PR. 8개 Stage × 1 PR + 매핑 확정 PR + 마이그레이션 코드 PR + 정리 PR = **약 11 PR**. 한 PR이 작아야 리뷰 가능.

### 7-3. `Lesson.replacedBy` 옵셔널 필드

스키마에 `replacedBy?: string`(슬러그)를 추가해, 통합 단계에서는 옛 레슨 객체를 *유지하되* `status: "archived"`로 두고 `replacedBy`를 신 슬러그로 가리킨다. 라우트(`/lessons/[slug]`)는 archived 레슨에 redirect를 자동 발급. 충분히 시간이 지난 뒤 객체 제거.

이 방식이 핵심 — **빅뱅 삭제 없이 단계적 정리**. 특강 스펙의 `archived` 패턴과 동형.

### 7-4. Redirect 구현

- 개발·Vercel — `next.config.mjs`의 `redirects()` 함수가 archived 레슨 목록을 읽어 308 redirect 발급.
- GitHub Pages(정적 export) — 빌드 시 `out/lessons/<archived-slug>/index.html`에 `<meta http-equiv="refresh">` + canonical link 생성. 별도 빌드 후처리 스크립트.

### 7-5. 데이터 손실 방지 게이트

`validateContent()`에 다음 추가
- 어떤 archived 레슨도 `replacedBy`를 비울 수 없다.
- `replacedBy`가 가리키는 신 슬러그는 존재해야 한다.
- 새 레슨이 옛 레슨의 `coreConcepts`·`targetJourneys`·`prerequisites`를 **누락하지 않는다** (스키마 + 사람 검토 게이트).

---

## 8. 검증 게이트

기존 `npm run check`(lint·typecheck·validate·build)에 다음 추가.

1. **레슨 분량 검사** — 각 레슨 `estimatedMinutes ∈ [40, 80]`. 벗어나면 경고(통합·분할 후보).
2. **깊이 7차원 체크리스트** — 각 레슨 frontmatter에 `depthAxes: ["D1", "D2", "D4", "D6"]` 같은 배열. 4개 미만이면 검증 실패.
3. **`replacedBy` 정합** — §7-5.
4. **매핑 일치** — `docs/migrations/lessons-2.0-mapping.yaml`의 통합 결과 = 실제 `lessons.ts` 상태.
5. **AI 문체 — opt-in** — `npm run eval:rubric`을 통합 레슨마다 실행 권장 (블로킹은 아님, 자문).

---

## 9. 그래프 기반 개인화 — 짧아지는 필수 경로

통합 후 84→61로 줄어도, Journey별 **필수 경로**는 더 짧아진다.

- 현재 — 모든 Journey가 같은 Stage 사다리를 본다. Adopter도 Engineer 레슨이 노출됨.
- v2.0 — 각 Journey의 `recommendedLessons`가 신 레슨 기준으로 정제된다. 통합 레슨 일부는 한 Journey에서 제외되어 그 학습자에게는 보이지 않는다.

예 — Adopter Journey가 보는 필수 레슨 수 추정
- v1.0 — 약 30개
- v2.0 — 약 18개 (Stage 5·6의 builder-only 레슨이 빠지고, 통합으로 자연 감소)

구체 수치는 `journeys.ts` 매핑을 매핑 YAML 확정 후 재계산.

---

## 10. 실행 순서

| # | 단계 | 산출물 | 소요 |
|---|---|---|---|
| 1 | **본 스펙 승인** + §6 매핑 한 줄씩 확정 | `lessons-2.0-mapping.yaml` | 1세션 |
| 2 | **마이그레이션 인프라** — `replacedBy` 필드 · redirect 발급 · localStorage 마이그 코드 · 분량 검증 | PR 1 | 1세션 |
| 3 | **Stage별 통합·심화** — Stage 1부터 8까지 순차 | PR 8 (Stage당 1) | Stage당 1~2세션 |
| 4 | **정리** — archived 레슨 제거(원하는 시점) · `journeys.ts` 재계산 · 합계 검증 | PR 1 | 1세션 |

총 약 11 PR · 12~16 세션. 1순위 특강(완료) · 2순위 레슨심화(이것) · 3순위 입력 파이프라인의 순서를 유지하며, 2순위는 시간이 가장 길게 든다.

---

## 11. 열린 항목

- §6 매핑은 초안 — 사용자가 한 줄씩 검토해 승인·수정·기각.
- 통합 레슨의 **신 슬러그 이름**은 본 문서에서 가제. 확정은 매핑 승인 시.
- Stage 4·6의 sub-group(4a/4b/4c · 6a/6b/6c)이 신 레슨 수에 맞게 재정렬 필요. 일부 sub-group이 1~2개 레슨만 남는 경우 sub-group 통합 검토.
- `eval:rubric` 자동화를 게이트로 승격할지(현재 advisory) 별도 결정.
- 옛 슬러그 → 신 슬러그의 redirect 전략(308 vs meta-refresh)에서 SEO 영향 — Search Console로 추적.
- `/me` 책갈피·메모의 옛 slug 마이그레이션 — 사용자가 이미 책갈피한 archived 레슨은 redirect 따라가게 할지, 책갈피 자체를 갱신할지.
- 코어 12개(§4) 자체도 깊이 7차원 통과 필요 — "보존"은 통합 면제일 뿐 심화 면제는 아님.

---

## 부록 A — 통합 레슨 작성 템플릿 (참고)

각 신 레슨은 다음 구조를 따른다.

```
1. hook (D1·D2) — 1분 안에 실패 시나리오 1개로 끌어들임
2. why-now — 왜 지금 이게 중요한가 (D1)
3. concepts — 핵심 개념 3~5개 (D6 — Concept 노드와 teaches 엣지)
4. mission — 3-tier (D4)
   4a. 워밍업 5분 (개념만 확인)
   4b. 본 미션 30분
   4c. 심화 60분 (옵션)
5. build — 단계별 빌드 (D3 — 수치·근거 포함)
6. verify — 체크리스트 (D5 — 엣지 케이스 포함)
7. ship/share — 산출물 정의
8. reflect (D7) — 3단 질문
9. related — relatedTo 인접 레슨 · 심화 특강 (D6)
```

분량 — 40~80분. 7차원 중 최소 4개 추가.

---

## 부록 B — 보존 코어 12개의 심화 우선순위

§4 보존 레슨도 심화 대상이다. 우선순위는 학습자 영향이 큰 순.

1. `what-llms-are-good-and-bad-at` (특강 #1과 연동, 가장 자주 참조)
2. `structure-of-good-prompts` (모든 빌더의 출발점)
3. `mini-agent-loop` (Stage 6 코어)
4. `function-calling`
5. `grounded-rag-answers`
6. `harness-engineering-roadmap`
7. `prompt-injection-defense`
8. `evals-for-ai-coded-prs`
9. `agent-failure-patterns`
10. `claude-md-four-principles`
11. `common-skills-of-future-proof-people`
12. `claude-skills-authoring`
