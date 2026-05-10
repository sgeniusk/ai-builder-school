# MDX 본문 롤아웃 체크리스트

> 한 세션에 끝나지 않는 multi-session 작업. 진행할 때마다 이 파일을 갱신.
> 자세한 작성 가이드는 [`mdx-rollout-context-notes.md`](mdx-rollout-context-notes.md).

## 현황 (2026-05-10 기준)

- 작성 완료 — 8 / 32 (Phase 1, Phase 2)
- 미작성 — 24 / 32

## 작업 단위

각 lesson 1건 = 다음 5가지를 한 번에.

1. `src/content/lessons/<slug>.mdx` 생성 (~250줄, 600~1500 단어)
2. `src/content/lessons/<slug>/outputs/` 폴더에 산출물 템플릿 (.md) 생성
3. `src/content/lesson-bodies.ts` 에 import + registry 등록
4. `src/content/lessons.ts` 의 해당 lesson 객체에 `hasMdxBody: true` 추가
5. `npm run check` 통과

## Phase 별 체크리스트

### Phase 1 — AI Literacy ✓ 완료
- [x] common-skills-of-future-proof-people (Lesson 1.1)
- [x] what-llms-are-good-and-bad-at (Lesson 1.2)
- [x] hallucination-verification (Lesson 1.3)
- [x] checks-before-trusting-ai-output (Lesson 1.4)

### Phase 2 — Prompt & Context Engineering ✓ 완료
- [x] structure-of-good-prompts (Lesson 2.1)
- [x] enforcing-output-format (Lesson 2.2)
- [x] feeding-long-documents (Lesson 2.3)
- [x] build-personal-prompt-library (Lesson 2.4)

### Phase 3 — AI Work OS · 4건
- [ ] automate-report-drafts (Lesson 3.1)
- [ ] meeting-notes-pipeline (Lesson 3.2)
- [ ] research-workflow (Lesson 3.3)
- [ ] blog-writing-pipeline (Lesson 3.4)

### Phase 4 — Codex / Claude Code Workflow · 6건
- [ ] coding-agent-setup (Lesson 4.1)
- [ ] github-issue-to-ai-brief (Lesson 4.2)
- [ ] letting-ai-read-codebase (Lesson 4.3)
- [ ] plan-with-ai (Lesson 4.4)
- [ ] write-tests-with-coding-agent (Lesson 4.5)
- [ ] bug-reproduction-loop (Lesson 4.6)

### Phase 5 — AI App Development · 4건
- [ ] connect-ai-api (Lesson 5.1)
- [ ] streaming-response-ui (Lesson 5.2)
- [ ] structured-output-handling (Lesson 5.3)
- [ ] conversation-storage-design (Lesson 5.4)

### Phase 6 — Data, Embedding & RAG · 4건
- [ ] understanding-embeddings (Lesson 6.1)
- [ ] document-chunking-strategy (Lesson 6.2)
- [ ] vector-search-basics (Lesson 6.3)
- [ ] grounded-rag-answers (Lesson 6.4)

### Phase 7 — Agents & MCP · 4건
- [ ] function-calling (Lesson 7.1)
- [ ] mini-agent-loop (Lesson 7.2)
- [ ] tool-permission-safeguards (Lesson 7.3)
- [ ] prompt-injection-defense (Lesson 7.4)

### Phase 11 — Product · 1건
- [ ] ai-app-cost-and-usage (Lesson 11.1)

### Phase 12 — Capstone · 1건
- [ ] capstone-plan-and-launch (Lesson 12.1)

## 권장 진행 순서

학습자가 가장 많이 진입할 가능성 높은 순.

1. **Phase 2** (Prompt) — 모든 여정의 공통 기반. 4건.
2. **Phase 3** (AI Work OS) — Practitioner / Adopter / Creator 의 핵심. 4건.
3. **Phase 4** (Coding Agents) — Engineer / Founder 의 핵심. 6건.
4. **Phase 5–6** (App Dev + RAG) — Engineer 심화. 8건.
5. **Phase 7** (Agents) — 고급. 4건.
6. **Phase 11–12** (Product + Capstone) — 마무리. 2건.

## 진행 페이스 (제안)

- 한 세션 — 한 Phase 통째로 (4~6건).
- 한 lesson — 약 30~45분 (도입 + 핵심 개념 + 마무리 + 산출물 템플릿 + 검증).
- Phase 1개 끝날 때마다 별도 커밋.
