# Codex 검토 — grounded-rag-answers.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/grounded-rag-answers.mdx
- 본문 라인 수: 183
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 표, End-to-End 조립, 산출물 폴더, footer 모두 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 2개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 183에 "환불 정책 Q&A" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | Abstain Policy가 운영자 정리임을 line 75/footer에서 고지 |
| 5. 정량 수사 | ⚠ | 정확도/비용 비교가 정성값이나 footer에서 대략값 고지 |
| 6. Cross-reference | ✗ | L03 slug가 존재하지 않는 `/verify-ai-output-hallucination`으로 연결됨 |

## Critical issues (즉시 수정)

### [CROSSREF-BROKEN] src/content/lessons/grounded-rag-answers.mdx:5
quoted: "[Lesson 03](/lessons/verify-ai-output-hallucination)"
url: /lessons/verify-ai-output-hallucination
verdict: 존재하지 않는 레슨 slug.
suggested-fix: `[Lesson 03](/lessons/hallucination-verification)` 로 교체.

### [CROSSREF-BROKEN] src/content/lessons/grounded-rag-answers.mdx:179
quoted: "[Lesson 03 — 환각 검증](/lessons/verify-ai-output-hallucination)"
url: /lessons/verify-ai-output-hallucination
verdict: 존재하지 않는 레슨 slug.
suggested-fix: `[Lesson 03 — 환각 검증](/lessons/hallucination-verification)` 로 교체.

## High issues

(없음)

## Medium issues

### [UNVERIFIABLE-GUIDE] src/content/lessons/grounded-rag-answers.mdx:109
quoted: "정확도 | 높음 / 가장 높음 / 최고"
verdict: 비용·정확도 비교가 정성 표기지만 실제 근거 없이 순위를 단정.
suggested-fix: "검증 부담" 또는 "기대 효과"로 완화하고 직접 측정 필요를 표 제목에 추가.

## Low / 제안

- Anthropic Citations API URL은 확인됨. 다만 `docs.anthropic.com`에서 `platform.claude.com`으로 redirect되므로 최종 URL 정리가 좋습니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"RAG의 목표는 그럴듯한 답이 아니라, 근거를 따라가면 다시 확인할 수 있는 답이에요."

learningGoals (5개, verb-led)
- RAG에서도 환각이 생기는 세 경로를 설명해요
- 인용 강제 시스템 프롬프트를 작성해요
- 근거가 없을 때 답을 거절하는 정책을 설계해요
- 검색-청킹-임베딩-답변 파이프라인을 조립해요
- 답변의 인용 정확도를 평가하는 표를 만들어요

coreConcepts (4-5개)
- Grounded Answer: 제공된 근거 안에서만 답하는 응답
- Citation Enforcement: 주장과 근거 청크를 함께 표시하게 하는 규칙
- Abstain Policy: 근거가 부족하면 답을 거절하는 기준
- RAG Hallucination: 검색이 있어도 근거와 다른 답을 만드는 실패
- Citation Eval: 답의 문장이 실제 근거와 일치하는지 확인하는 평가

reflectionQuestions (3-4개)
- 내 RAG 앱에서 "근거 없음"으로 거절해야 하는 질문은 무엇인가요?
- 사용자가 인용을 클릭했을 때 확인해야 할 최소 정보는 무엇인가요?
- 검색 실패와 답변 생성 실패를 로그에서 어떻게 구분할 건가요?

## 결론

가장 큰 문제: L03 slug 오기 2건.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🔥 즉시
