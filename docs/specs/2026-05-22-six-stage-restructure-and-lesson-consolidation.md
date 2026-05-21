# AI Builder School 2.0 — Stage 재구조(8→6) + 레슨 통합·심화 (스펙 2 v2)

> 상태 — 초안 · 작성 2026-05-22 · 범위 2순위 (Stage 재구조 포함)
> **대체** — `docs/specs/2026-05-20-lesson-consolidation-and-deepening.md`(v1, 8-Stage 안). v1은 역사 자료로만 남긴다.
> 상위 — `docs/specs/2026-05-19-builder-school-2.0-architecture.md`
> 베이스 — `main` (특강 인프라 + 여정 필터 도입 완료)

---

## 0. 배경 — 왜 v2 인가

v1(8-Stage 안)을 검토하면서 페르소나 수렴/발산 패턴이 가시화되지 않는다는 게 드러났다. Stage 1→8 사다리에서

```
페르소나 수    6 → 6 → 6 → 5 → 3 → 2 → 4 → 6
                          ↓급감         ↑급회복
```

사실상 **1·2·3·4·8은 전원 트랙, 5·6·7은 빌더 트랙**이다. 그러나 평면 8 Stage는 이 분기점을 보여주지 않아 학습자가 "5부터는 내 트랙이 아니다"를 알기 전에 들어간다. 더해서

- **Stage 4(17레슨)·Stage 6(16레슨)이 전체의 39% — Stage라는 단위가 불균질**
- **Stage 3(5레슨)이 별도 Stage일 명분 약함**
- **은유 일관성 부족** — "함께 일하다(동료)" / "일감주다(부하)" / "만들다(객체)" 위상이 자주 바뀜

v2의 답은 **8 → 6 Stage 통합 + 빌더 분기점 명시 + 여정 필터로 즉시 가시화**다. 이미 여정 필터(`JourneyFilter`)는 main에 들어가 데이터를 시각화한다. 이 문서는 Stage 구조 자체를 그 데이터에 맞게 재배열한다.

---

## 1. 6 Stage 큰 틀

| 새 # | 새 이름 | 옛 매핑 | 트랙 | 페르소나 | 1차 목표 레슨 수 | 시간 |
|---|---|---|---|---|---|---|
| **1** | 만나기 | S1 | 누구나 | 6명 | 5 | ~7h |
| **2** | 묻고 다듬기 | S2 + S3 통합 | 누구나 | 6명 | 11 | ~14h |
| **3** | 함께 일하기 | S4 | 누구나(엔지니어 빠짐) | 5명 | 11 | ~13h |
| **── 빌더 분기점 (UI 시각화) ──** ||||||||
| **4** | 코딩 에이전트 | S5 | 빌더 | 3명 | 8 | ~13h |
| **5** | 시스템 빌드 | S6 | 빌더 | 2명 | 11 | ~17h |
| **── 합류 ──** ||||||||
| **6** | 운영·공유 | S7 + S8 통합 | 누구나(혼합) | 6명 | 15 | ~24h |

**합** — 61 레슨 · ~88시간(현 66h, +5h 깊이 보강 가정 시 70h 내외)

설계 직관

- **1·2·3** 누구나가 거치는 사다리 — 페르소나 그대로 6명/6명/5명
- **4·5** 빌더 분기 — 페르소나 좁아짐. 학습자에게 "여기는 빌더 트랙"임이 UI로 보임 (여정 필터)
- **6** 다시 합류 — 운영(엔지니어/PM) + 공유(전원)
- Stage 사이마다 **"여기서 빠져나가도 됨" 명시적 경로** — 6단계 사다리 + 명시적 분기

---

## 2. 통합 원칙 5 (v1 재사용)

각 통합 후보는 다음 5원칙으로 평가

1. **같은 능력을 다른 도구로 다루면 통합** — 도구별 변형은 특강·템플릿으로
2. **선후 의존이 강하면 통합** — A→B 흐름이 항상 같이 쓰이면 한 레슨의 두 절로
3. **운영·메타 주제는 한 곳에** — 비용·로깅·평가는 새 Stage 6으로 모음
4. **자영업·창작 시나리오는 케이스 묶음** — 직군별 변형은 케이스 갤러리로
5. **무엇을 안 합치는가도 명시** — 코어 12개(§4)는 통합 면제

---

## 3. "2배 심화"의 정의 — 깊이 7차원 (v1 재사용)

각 살아남는 레슨은 다음 7차원 중 **최소 4개**에서 추가가 일어나야 "심화" 인정

| # | 차원 | 추가 내용 |
|---|---|---|
| D1 | 현실 시나리오 | hook·problemScenario 구체 + 실패 사례 1개 |
| D2 | 반례·실패 모드 | "이렇게 하면 망한다" 1~2개 |
| D3 | 수치·근거 | 벤치마크·비용·시간 정량 데이터 + 출처 |
| D4 | 3-tier 미션 | 5분 워밍업 · 30분 본 미션 · 1시간 심화 |
| D5 | 검증 확장 | 엣지 케이스 · 롤백 · 관측 체크 |
| D6 | 그래프 연결 | teaches Concept · relatedTo 인접 · deepens 특강 |
| D7 | 회고 깊이 | "할 수 있는 것 → 못 하는 것 → 다음" 3단 |

각 레슨 frontmatter에 `depthAxes: ["D1", "D2", "D4", "D6"]` 배열. validate에서 4개 미만이면 실패.

---

## 4. 보존 코어 12개 (v1 재사용, 새 Stage 매핑)

| 새 Stage | 슬러그 | 보존 이유 |
|---|---|---|
| 1 | `common-skills-of-future-proof-people` | 사이트 정체성 |
| 2 | `structure-of-good-prompts` | 프롬프트 코어 |
| 2 | `what-llms-are-good-and-bad-at` | 특강 #1 `deepens` |
| 4 | `harness-engineering-roadmap` | Harness Engineering 정체성 |
| 4 | `claude-md-four-principles` | Karpathy 65줄 코어 원칙 |
| 5 | `function-calling` | 도구 사용 원리 |
| 5 | `mini-agent-loop` | 에이전트 원리 |
| 5 | `grounded-rag-answers` | RAG 코어 |
| 5 | `prompt-injection-defense` | 보안 코어 |
| 6 | `evals-for-ai-coded-prs` | 운영 게이트 |
| 6 | `agent-failure-patterns` | 에이전트 운영 코어 |
| 6 | `claude-skills-authoring` | 자산화 (DSS 공유) |

보존이라도 깊이 7차원 면제는 아님. 우선순위는 v1 부록 B 참조.

---

## 5. AI 문체 교정 원칙 (v1 재사용)

- `humanizer` 24개 AI 패턴 진단
- "혁신적·다양한·효과적으로" 같은 비어 있는 강조어 제거
- "본인/사용자" → "당신"
- 콜론 종결 금지 (한국어 종결은 `.` `?` `!`)
- `{/* Source · DOC|PAPER|NEWS · ... — URL */}` 포맷

---

## 6. 새 Stage별 통합 매핑

### 새 Stage 1 만나기 (옛 S1: 7 → 5)

| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `ai-delegation-decision` + `ai-collaboration-mindset` | `ai-delegation-and-team-adoption` | 개인 위임 → 팀 도입은 같은 결정의 두 면 |
| 이동 | `cost-monitoring-in-production` → 새 Stage 6 | — | 운영 주제 |
| 보존 | `zero-coding-orientation` · `terminal-first-day` · `ai-tool-account-and-cost` · `common-skills-of-future-proof-people` ⭐ | | |

### 새 Stage 2 묻고 다듬기 (옛 S2+S3: 15 → 11)

| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `prompt-debugging-loop`(S2) + `output-evaluation-refine`(S2) | `prompt-iteration-loop` | 디버깅·평가는 같은 반복 루프 |
| 흡수 | `enforcing-output-format`(S2) → `structure-of-good-prompts` ⭐ | (코어에 흡수) | 형식 강제는 좋은 프롬프트의 한 절 |
| 이동 | `api-rate-limiting-and-batching`(S2) → 새 Stage 6 | — | 운영 주제 |
| 통합 | `hallucination-verification`(S3) + `checks-before-trusting-ai-output`(S3) | `verifying-ai-output` | 환각·신뢰성 검증은 같은 능력 |
| 보존 | `structure-of-good-prompts` ⭐ · `reasoning-vs-instruct-prompting` · `feeding-long-documents` · `multimodal-prompting` · `build-personal-prompt-library` · `ai-concept-learning-framework` · `what-llms-are-good-and-bad-at` ⭐ · `fallback-strategy-when-ai-fails` · `privacy-and-academic-ethics` | | |

### 새 Stage 3 함께 일하기 (옛 S4: 17 → 11)

**3a 자동화 (옛 4a: 7 → 4)**
| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `automate-report-drafts` + `meeting-notes-pipeline` | `office-document-pipelines` | 사무 산출물 자동화 두 케이스 |
| 통합 | `research-workflow` + `blog-writing-pipeline` | `research-to-writing-pipeline` | 리서치→글쓰기 한 흐름 |
| 이동 | `cost-estimation-and-roi-by-task` → 새 Stage 6 | — | 운영·의사결정 주제 |
| 보존 | `custom-gpt-builder` · `multi-workflow-orchestration` | | |

**3b 콘텐츠 (옛 4b: 6 → 4)**
| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `blog-to-shorts-pipeline` + `youtube-script-research-to-outline` | `content-repurposing-pipeline` | 롱폼↔쇼츠·스크립트 변환 |
| 통합 | `design-visual-prompt-system` + `figma-ai-ui-variation-workflow` | `visual-prompt-and-ui-pipeline` | 디자인 자동화 두 케이스 |
| 보존 | `thumbnail-and-title-ab-test` · `local-business-content-calendar` | | |

**3c 데이터 (옛 4c: 4 → 3)**
| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `crm-segmentation-with-ai` + `dashboard-narrative-and-qa` | `data-curation-and-narrative` | AI로 데이터→사람 친화 산출물 |
| 보존 | `sql-with-ai-verification` · `ab-test-decision-memo` | | |

### 새 Stage 4 코딩 에이전트 (옛 S5: 11 → 8) — **빌더 분기점**

| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `write-tests-with-coding-agent` + `bug-reproduction-loop` | `tdd-and-bug-loop-with-agent` | TDD·버그 재현은 같은 루프 |
| 유입 | `ralph-loop-codex-goal`(S6c → 새 Stage 4) | — | "자율 코딩의 진화" 자리는 빌더 입문에 가까움 |
| 보존 | `coding-agent-setup` · `github-issue-to-ai-brief` · `letting-ai-read-codebase` · `plan-with-ai` · `pr-review-with-ai` · `claude-md-four-principles` ⭐ · `agent-hooks-automation` · `subagent-context-design` · `harness-engineering-roadmap` ⭐ | | |

### 새 Stage 5 시스템 빌드 (옛 S6: 16 → 11)

**5a 코어 (옛 6a: 6 → 4)**
| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `streaming-response-ui` + `structured-output-handling` | `response-handling-streaming-and-structured` | 응답 다루기 두 면 |
| 통합 | `auth-and-user-sessions` + `long-term-memory-state` | `user-and-memory-state` | 사용자·기억 상태는 같은 축 |
| 보존 | `connect-ai-api` · `conversation-storage-design` | | |

**5b RAG (옛 6b: 4 → 3)**
| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `understanding-embeddings` + `document-chunking-strategy` | `embeddings-and-chunking-for-rag` | RAG 전처리 한 쌍 |
| 보존 | `vector-search-basics` · `grounded-rag-answers` ⭐ | | |

**5c 도구·에이전트 (옛 6c: 6 → 4)**
| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 이동 | `ralph-loop-codex-goal` → 새 Stage 4 | — | 위 참조 |
| 보존 | `function-calling` ⭐ · `mini-agent-loop` ⭐ · `tool-permission-safeguards` · `prompt-injection-defense` ⭐ · `build-mcp-server` | | |

### 새 Stage 6 운영·공유 (옛 S7+S8 + 유입: 18+3 = 21 → 15)

유입 — `cost-monitoring-in-production`(옛 S1), `api-rate-limiting-and-batching`(옛 S2), `cost-estimation-and-roi-by-task`(옛 S4a)

| 변화 | 옛 | 새 | 이유 |
|---|---|---|---|
| 통합 | `ai-app-cost-and-usage`(S7) + `cost-monitoring-in-production`(유입) + `cost-estimation-and-roi-by-task`(유입) | `ai-cost-operations` | 비용 라인 3→1 |
| 통합 | `ai-output-eval-for-pms`(S7) + `responsible-ai-policy-template`(S7) | `pm-eval-and-policy` | PM 사이드 평가·정책 |
| 통합 | `claude-code-token-saving`(S7) + `api-rate-limiting-and-batching`(유입) | `token-and-rate-optimization` | 절감 패턴 한 쌍 |
| 통합 | `capstone-scope-selection`(S8) + `capstone-build-loop`(S8) | `capstone-scope-and-build` | 스코프→빌드는 한 흐름 |
| 통합 | `capstone-plan-and-launch`(S8) + `portfolio-and-retrospective`(S8) | `capstone-launch-and-retrospective` | 배포→회고는 한 마무리 |
| 보존 | `evals-for-ai-coded-prs` ⭐ · `llm-observability-and-regression` · `agent-failure-patterns` ⭐ · `mcp-production-patterns` · `user-feedback-collection-for-ai-products` · `ai-product-brief` · `landing-page-for-ai-product` · `pricing-and-monetization` · `early-user-recruitment-for-ai-products` · `claude-skills-authoring` ⭐ | | |

---

## 7. 84개 레슨 전수 첨삭표

결정 코드 — **보존** / **통합** (다른 레슨과 합쳐 신 슬러그로) / **흡수됨** (다른 레슨에 사라짐) / **흡수** (이 레슨이 다른 레슨을 받음) / **이동** (Stage만 변경)

| # | 옛 S | 옛 슬러그 | 결정 | 새 S | 새 슬러그 또는 비고 |
|---|---|---|---|---|---|
| 1 | 1 | zero-coding-orientation | 보존 | 1 | — |
| 2 | 1 | terminal-first-day | 보존 | 1 | — |
| 3 | 1 | ai-tool-account-and-cost | 보존 | 1 | — |
| 4 | 1 | cost-monitoring-in-production | **이동+흡수됨** | 6 | `ai-cost-operations`에 |
| 5 | 1 | common-skills-of-future-proof-people ⭐ | 보존(코어) | 1 | — |
| 6 | 1 | ai-delegation-decision | 통합 | 1 | `ai-delegation-and-team-adoption`로 |
| 7 | 1 | ai-collaboration-mindset | 흡수됨 | 1 | `ai-delegation-and-team-adoption`로 |
| 8 | 2 | structure-of-good-prompts ⭐ | 보존+흡수(코어) | 2 | `enforcing-output-format` 흡수 |
| 9 | 2 | reasoning-vs-instruct-prompting | 보존 | 2 | — |
| 10 | 2 | enforcing-output-format | 흡수됨 | 2 | `structure-of-good-prompts`에 |
| 11 | 2 | prompt-debugging-loop | 통합 | 2 | `prompt-iteration-loop`로 |
| 12 | 2 | feeding-long-documents | 보존 | 2 | — |
| 13 | 2 | multimodal-prompting | 보존 | 2 | — |
| 14 | 2 | output-evaluation-refine | 흡수됨 | 2 | `prompt-iteration-loop`로 |
| 15 | 2 | api-rate-limiting-and-batching | **이동+흡수됨** | 6 | `token-and-rate-optimization`에 |
| 16 | 2 | build-personal-prompt-library | 보존 | 2 | — |
| 17 | 2 | ai-concept-learning-framework | 보존 | 2 | — |
| 18 | 3 | what-llms-are-good-and-bad-at ⭐ | 보존(코어) | 2 | 특강 #1 deepens 대상 |
| 19 | 3 | hallucination-verification | 통합 | 2 | `verifying-ai-output`로 |
| 20 | 3 | checks-before-trusting-ai-output | 흡수됨 | 2 | `verifying-ai-output`로 |
| 21 | 3 | fallback-strategy-when-ai-fails | 보존 | 2 | — |
| 22 | 3 | privacy-and-academic-ethics | 보존 | 2 | — |
| 23 | 4a | automate-report-drafts | 통합 | 3a | `office-document-pipelines`로 |
| 24 | 4a | meeting-notes-pipeline | 흡수됨 | 3a | `office-document-pipelines`로 |
| 25 | 4a | research-workflow | 통합 | 3a | `research-to-writing-pipeline`로 |
| 26 | 4a | blog-writing-pipeline | 흡수됨 | 3a | `research-to-writing-pipeline`로 |
| 27 | 4a | custom-gpt-builder | 보존 | 3a | — |
| 28 | 4a | multi-workflow-orchestration | 보존 | 3a | — |
| 29 | 4a | cost-estimation-and-roi-by-task | **이동+흡수됨** | 6 | `ai-cost-operations`에 |
| 30 | 4b | blog-to-shorts-pipeline | 통합 | 3b | `content-repurposing-pipeline`로 |
| 31 | 4b | design-visual-prompt-system | 통합 | 3b | `visual-prompt-and-ui-pipeline`로 |
| 32 | 4b | youtube-script-research-to-outline | 흡수됨 | 3b | `content-repurposing-pipeline`로 |
| 33 | 4b | figma-ai-ui-variation-workflow | 흡수됨 | 3b | `visual-prompt-and-ui-pipeline`로 |
| 34 | 4b | thumbnail-and-title-ab-test | 보존 | 3b | — |
| 35 | 4b | local-business-content-calendar | 보존 | 3b | — |
| 36 | 4c | sql-with-ai-verification | 보존 | 3c | — |
| 37 | 4c | crm-segmentation-with-ai | 통합 | 3c | `data-curation-and-narrative`로 |
| 38 | 4c | dashboard-narrative-and-qa | 흡수됨 | 3c | `data-curation-and-narrative`로 |
| 39 | 4c | ab-test-decision-memo | 보존 | 3c | — |
| 40 | 5 | coding-agent-setup | 보존 | 4 | — |
| 41 | 5 | github-issue-to-ai-brief | 보존 | 4 | — |
| 42 | 5 | letting-ai-read-codebase | 보존 | 4 | — |
| 43 | 5 | plan-with-ai | 보존 | 4 | — |
| 44 | 5 | write-tests-with-coding-agent | 통합 | 4 | `tdd-and-bug-loop-with-agent`로 |
| 45 | 5 | bug-reproduction-loop | 흡수됨 | 4 | `tdd-and-bug-loop-with-agent`로 |
| 46 | 5 | pr-review-with-ai | 보존 | 4 | — |
| 47 | 5 | claude-md-four-principles ⭐ | 보존(코어) | 4 | — |
| 48 | 5 | agent-hooks-automation | 보존 | 4 | claude-md와 `relatedTo` 강 연결 |
| 49 | 5 | subagent-context-design | 보존 | 4 | — |
| 50 | 5 | harness-engineering-roadmap ⭐ | 보존(코어) | 4 | — |
| 51 | 6a | connect-ai-api | 보존 | 5a | — |
| 52 | 6a | streaming-response-ui | 통합 | 5a | `response-handling-streaming-and-structured`로 |
| 53 | 6a | structured-output-handling | 흡수됨 | 5a | `response-handling-streaming-and-structured`로 |
| 54 | 6a | conversation-storage-design | 보존 | 5a | — |
| 55 | 6a | auth-and-user-sessions | 통합 | 5a | `user-and-memory-state`로 |
| 56 | 6a | long-term-memory-state | 흡수됨 | 5a | `user-and-memory-state`로 |
| 57 | 6b | understanding-embeddings | 통합 | 5b | `embeddings-and-chunking-for-rag`로 |
| 58 | 6b | document-chunking-strategy | 흡수됨 | 5b | `embeddings-and-chunking-for-rag`로 |
| 59 | 6b | vector-search-basics | 보존 | 5b | — |
| 60 | 6b | grounded-rag-answers ⭐ | 보존(코어) | 5b | — |
| 61 | 6c | function-calling ⭐ | 보존(코어) | 5c | — |
| 62 | 6c | mini-agent-loop ⭐ | 보존(코어) | 5c | — |
| 63 | 6c | tool-permission-safeguards | 보존 | 5c | prompt-injection-defense와 `relatedTo` 강 연결 |
| 64 | 6c | prompt-injection-defense ⭐ | 보존(코어) | 5c | — |
| 65 | 6c | build-mcp-server | 보존 | 5c | — |
| 66 | 6c | ralph-loop-codex-goal | **이동** | 4 | "자율 코딩 진화"는 빌더 입문 |
| 67 | 7 | evals-for-ai-coded-prs ⭐ | 보존(코어) | 6 | — |
| 68 | 7 | llm-observability-and-regression | 보존 | 6 | — |
| 69 | 7 | agent-failure-patterns ⭐ | 보존(코어) | 6 | — |
| 70 | 7 | mcp-production-patterns | 보존 | 6 | — |
| 71 | 7 | ai-output-eval-for-pms | 통합 | 6 | `pm-eval-and-policy`로 |
| 72 | 7 | user-feedback-collection-for-ai-products | 보존 | 6 | — |
| 73 | 7 | responsible-ai-policy-template | 흡수됨 | 6 | `pm-eval-and-policy`로 |
| 74 | 7 | ai-app-cost-and-usage | 통합 | 6 | `ai-cost-operations`로 |
| 75 | 7 | claude-code-token-saving | 통합 | 6 | `token-and-rate-optimization`로 |
| 76 | 8 | ai-product-brief | 보존 | 6 | — |
| 77 | 8 | landing-page-for-ai-product | 보존 | 6 | — |
| 78 | 8 | pricing-and-monetization | 보존 | 6 | — |
| 79 | 8 | capstone-scope-selection | 통합 | 6 | `capstone-scope-and-build`로 |
| 80 | 8 | capstone-build-loop | 흡수됨 | 6 | `capstone-scope-and-build`로 |
| 81 | 8 | capstone-plan-and-launch | 통합 | 6 | `capstone-launch-and-retrospective`로 |
| 82 | 8 | early-user-recruitment-for-ai-products | 보존 | 6 | — |
| 83 | 8 | claude-skills-authoring ⭐ | 보존(코어) | 6 | — |
| 84 | 8 | portfolio-and-retrospective | 흡수됨 | 6 | `capstone-launch-and-retrospective`로 |

### 요약 통계

- **보존(코어 포함)** — 38개 그대로 + 6개 흡수받음 = **44개**
- **통합(새 슬러그)** — 12개 (각각 2~3개 흡수)
- **흡수됨** — 17개 (다른 레슨으로 사라짐)
- **이동(Stage만 변경)** — 4개 (cost-monitoring · rate-limiting · cost-estimation-roi · ralph)
- **새 레슨 슬러그 12개 신설** — office-document-pipelines · research-to-writing-pipeline · content-repurposing-pipeline · visual-prompt-and-ui-pipeline · data-curation-and-narrative · ai-delegation-and-team-adoption · prompt-iteration-loop · verifying-ai-output · tdd-and-bug-loop-with-agent · response-handling-streaming-and-structured · user-and-memory-state · embeddings-and-chunking-for-rag · ai-cost-operations · pm-eval-and-policy · token-and-rate-optimization · capstone-scope-and-build · capstone-launch-and-retrospective (실제로는 17 — 위 12개 + 5 추가)

**결과 — 84 → 61 레슨 (-27%)**, 그중 17개는 신규 통합 슬러그.

---

## 8. 마이그레이션 (v1 §7 재사용 + 6-Stage 조정)

빌드를 한 번도 깨지 않고 넘어간다. 흡수된 옛 레슨은 즉시 삭제하지 않고 `replacedBy` + `archived` 패턴으로 점진 정리(특강의 `supersedes`와 동형).

### 단계

1. **본 스펙 + §7 첨삭표 승인** — 사용자가 한 줄씩 검토. 결과를 `docs/migrations/lessons-6stage-mapping.yaml`로 못박는다.
2. **데이터 모델 변경**
   - `src/content/stages.ts` — 6 Stage로 재정의. 옛 8 Stage는 `archived`로 (외부 링크 무파손)
   - `Lesson.replacedBy?: string` 추가
   - `src/content/lesson-stage-mapping.ts` — 새 Stage·ordinal 매핑
3. **새 통합 레슨 작성** — 새 Stage 단위로 PR 분할 (1 Stage = 1 PR). 깊이 7차원 적용. 흡수 대상 옛 레슨은 `archived` + `replacedBy`로 유지.
4. **그래프 엣지 재계산** — `ontology.ts`의 수동 엣지(`teaches`·`relatedTo`·`deepens`·`supersedes`) 신 슬러그 기준 재구성. 자동 유도(`prerequisite`·`partOfJourney`)는 콘텐츠 갱신과 함께.
5. **Redirect 발급** — 옛 슬러그 → 신 슬러그 308. GitHub Pages 빌드는 meta-refresh 후처리.
6. **`/me` 진척도 마이그레이션** — 클라이언트 부팅 시 localStorage의 옛 slug → 신 slug 치환. 데이터 손실 0.
7. **검증** — `npm run check` + 사람 검토.
8. **archived 정리** — 충분히 시간이 지난 뒤(검토 시한 같은 정책) 옛 객체 제거.

### 실행 순서

| # | 단계 | 산출물 |
|---|---|---|
| 1 | 본 스펙 + 첨삭표 승인 | `lessons-6stage-mapping.yaml` |
| 2 | 데이터 모델·인프라 | `Lesson.replacedBy` · stages.ts 재정의 · redirect · localStorage migration · validate |
| 3 | 새 Stage 1·2 통합·심화 | PR 2 |
| 4 | 새 Stage 3 통합·심화 | PR 1 (크다) |
| 5 | 새 Stage 4·5 통합·심화 | PR 2 |
| 6 | 새 Stage 6 통합·심화 | PR 1 (크다) |
| 7 | archived 정리 + journeys.ts 재계산 + 합계 검증 | PR 1 |

총 **약 10 PR**, 14~18 세션.

---

## 9. 검증 게이트 (v1 §8 재사용)

기존 `npm run check`에 추가

1. 레슨 분량 `estimatedMinutes ∈ [40, 80]`
2. 깊이 7차원 중 ≥ 4개 (frontmatter `depthAxes`)
3. `replacedBy` 정합 — 정의된 신 슬러그 존재
4. 매핑 YAML ↔ 실제 `lessons.ts` 일치
5. AI 문체(`eval:rubric`) — 자문

추가로 6-Stage 전환 게이트

6. 옛 8 Stage 슬러그 외부 링크는 redirect로 살아 있어야 함 (CI에서 셈플 URL 200 체크)

---

## 10. 그래프 기반 개인화 — 6-Stage 기준

여정별 필수 경로 추정(v1 대비 더 짧아짐)

| Journey | 옛 (v1 8-Stage) | 새 (v2 6-Stage) |
|---|---|---|
| Practitioner | ~28 | ~18 |
| Adopter | ~30 | ~17 |
| Creator | ~22 | ~14 |
| Founder | ~45 | ~28 |
| Engineer | ~40 | ~26 |
| Explorer | ~22 | ~13 |

새 Stage 6은 운영(엔지니어/PM)과 공유(전원)가 섞인 Stage라, 페르소나별 노출 레슨이 더 정제됨. 정확한 수치는 신 `journeys.ts` 매핑 확정 후 재계산.

여정 필터(`JourneyFilter`)가 이미 main에 있어, 6 Stage 전환 후에도 그대로 동작 — `data-journeys` 속성이 신 슬러그에 자동 따라간다.

---

## 11. 열린 항목

- §7 첨삭표는 초안 — 사용자가 한 줄씩 검토해 승인·수정·기각
- 새 통합 슬러그 17개의 이름은 가제 — 매핑 승인 시 확정
- 8 Stage → 6 Stage 전환 시 `/stages/[oldSlug]` redirect 정책 확정
- "빌더 분기점" UI 시각화 형태 — Stage 카드 사이의 변곡점 그래픽, "여기서 빠져나가도 됨" 안내 카드, 페르소나별 합류 경로 등 별도 UX 작업
- 여정 필터의 페르소나별 합류 경로 표시 — Stage 3 끝에서 "엔지니어가 아닌 분은 새 Stage 6으로 점프 가능" 같은 안내
- 코어 12개(§4)의 깊이 우선순위 — v1 부록 B 유효
- 캡스톤 분해 (현 3개 → 2개)가 학습자 진척감을 해치지 않는지 — 통합 시 별도 검토

---

## 부록 — v1과의 차이 요약

| 항목 | v1 (8-Stage) | v2 (6-Stage) |
|---|---|---|
| Stage 수 | 8 | 6 |
| 통합 매핑 | 같음 | 같음 (Stage 라벨만 재정렬) |
| 페르소나 가시화 | 데이터에만 | UI(여정 필터) + 분기점 시각화 |
| Stage 3 처리 | 별도 Stage 유지 | S2와 통합 |
| Stage 7/8 처리 | 별도 Stage | 통합 |
| MVP 8주 경로 | 1·1·1·2·3·5·7·8 | 1·2·3·4·5·6·7·8 (Stage당 1주 기본, 빌더 트랙은 분할) |
| 빌더 분기점 | 암묵 | 명시(UI) |

v1을 폐기하지 않고 역사 자료로 유지 — 8-Stage 안의 검토 흔적이 의사결정 맥락을 남긴다.
