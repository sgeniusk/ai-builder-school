# Codex 검토 요약 — 24개 신규 레슨

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 검토한 파일: 24
- WebFetch 검증한 URL: 19개

## 등급 분포
- 🟢 통과: 5개
- 🟡 부분수정: 10개
- 🔴 핵심수정: 9개

## 우선순위 인덱스 (수정 순서)

### 🔥 즉시 수정 (Critical 다수)
1. [blog-writing-pipeline](./blog-writing-pipeline.md) — Critical 0건, High 3건 (70%, 60~70%, 80/20 정량 수사 다수)
2. [plan-with-ai](./plan-with-ai.md) — Critical 0건, High 3건 (실행 시간 절반/5분/3시간 수사)
3. [write-tests-with-coding-agent](./write-tests-with-coding-agent.md) — Critical 1건 (가상 사례 footer 누락, BOOK 인용 메타 부족)
4. [bug-reproduction-loop](./bug-reproduction-loop.md) — Critical 1건, High 3건 (footer 누락, 80%/절반 수사)
5. [connect-ai-api](./connect-ai-api.md) — Critical 1건 (OpenAI API keys URL 오류)
6. [understanding-embeddings](./understanding-embeddings.md) — Critical 1건 (L03 slug 깨짐)
7. [vector-search-basics](./vector-search-basics.md) — Critical 0건, High 2건 (ANN/Recall@5 수치 일반화)
8. [grounded-rag-answers](./grounded-rag-answers.md) — Critical 2건 (L03 slug 깨짐 2곳)
9. [prompt-injection-defense](./prompt-injection-defense.md) — Critical 1건, High 2건 (L26 slug 깨짐, guardrails URL 특정성 부족)

### 🟡 보통
1. [meeting-notes-pipeline](./meeting-notes-pipeline.md) — 5분/5초/눈에 띄게 표현 완화
2. [coding-agent-setup](./coding-agent-setup.md) — 제품 비교표 최신성 재확인
3. [github-issue-to-ai-brief](./github-issue-to-ai-brief.md) — 5분/30분 수사 완화
4. [letting-ai-read-codebase](./letting-ai-read-codebase.md) — 80% 효과 수사 완화
5. [streaming-response-ui](./streaming-response-ui.md) — Vercel AI SDK URL 구체화, 긴 코드 본문 압축
6. [conversation-storage-design](./conversation-storage-design.md) — 10~20턴/90일 권장값을 예시로 낮추기
7. [document-chunking-strategy](./document-chunking-strategy.md) — 10~20%, 500~1500토큰 권장값 고지 강화
8. [function-calling](./function-calling.md) — 4단계 호출 흐름 운영자 disclaimer 추가
9. [ai-app-cost-and-usage](./ai-app-cost-and-usage.md) — Lesson 번호 오기, 가격 수치 최신성 고지
10. [capstone-plan-and-launch](./capstone-plan-and-launch.md) — Lean Startup 직접 인용 정확성 확인

### 🟢 여유
1. [automate-report-drafts](./automate-report-drafts.md) — 치명 이슈 없음
2. [research-workflow](./research-workflow.md) — 치명 이슈 없음
3. [structured-output-handling](./structured-output-handling.md) — 치명 이슈 없음
4. [mini-agent-loop](./mini-agent-loop.md) — 치명 이슈 없음
5. [tool-permission-safeguards](./tool-permission-safeguards.md) — 치명 이슈 없음

## 공통 패턴 발견

- 패턴 A: 정량 수사 잔존. "70%", "절반", "80%", "5분이 30분", "Recall@5 80%" 같은 숫자가 출처 없이 학습 효과처럼 쓰인 파일이 많음.
- 패턴 B: 쿼터 중단 흔적. L17/L18은 기준 레슨과 달리 `---` + 가상 사례 footer가 빠져 있음.
- 패턴 C: slug drift. L23/L26은 L03을 `/lessons/verify-ai-output-hallucination`으로 잘못 참조하고, L30은 L26을 `/lessons/grounded-rag-pipeline`으로 잘못 참조함.
- 패턴 D: Anthropic 문서 URL 이원화. `docs.claude.com` / `docs.anthropic.com` URL이 살아 있더라도 `platform.claude.com` 또는 `code.claude.com`으로 redirect됨. 최종 URL로 정리하면 후속 검증이 쉬움.
- 패턴 E: 운영자 자체 명칭은 대부분 잘 고지됨. 다만 `function-calling`의 "4단계 호출 흐름"은 footer에 단순화/운영자 정리 문장을 추가하는 편이 안전함.
- 패턴 F: bare-bones lessons.ts 메타 보강이 필요함. MDX 본문은 작성됐지만 hook이 없는 14개는 카드/목록 경험이 빈약해질 수 있음.

## bare-bones lessons.ts 14개 (별도 보강 필요)

다음 14개는 lessons.ts 메타가 빈약 (hook 필드 없음):
- lesson-17 write-tests-with-coding-agent — [보강 제안](./write-tests-with-coding-agent.md)
- lesson-18 bug-reproduction-loop — [보강 제안](./bug-reproduction-loop.md)
- lesson-19 connect-ai-api — [보강 제안](./connect-ai-api.md)
- lesson-20 streaming-response-ui — [보강 제안](./streaming-response-ui.md)
- lesson-21 structured-output-handling — [보강 제안](./structured-output-handling.md)
- lesson-22 conversation-storage-design — [보강 제안](./conversation-storage-design.md)
- lesson-23 understanding-embeddings — [보강 제안](./understanding-embeddings.md)
- lesson-24 document-chunking-strategy — [보강 제안](./document-chunking-strategy.md)
- lesson-25 vector-search-basics — [보강 제안](./vector-search-basics.md)
- lesson-26 grounded-rag-answers — [보강 제안](./grounded-rag-answers.md)
- lesson-28 mini-agent-loop — [보강 제안](./mini-agent-loop.md)
- lesson-29 tool-permission-safeguards — [보강 제안](./tool-permission-safeguards.md)
- lesson-30 prompt-injection-defense — [보강 제안](./prompt-injection-defense.md)
- lesson-32 capstone-plan-and-launch — [보강 제안](./capstone-plan-and-launch.md)

각 슬러그의 `docs/codex-review/<slug>.md` 안 "lessons.ts 보강 제안" 섹션 참조.
