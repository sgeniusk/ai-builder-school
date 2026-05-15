# Codex 검토 — prompt-injection-defense.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/prompt-injection-defense.mdx
- 본문 라인 수: 198
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 공격 유형, 방어표, 산출물 한 장/폴더, footer 있음 |
| 2. 인용 정확성 | ⚠ | 검증한 URL 2개 / 발견 문제 1개(Anthropic guardrails URL 특정성 부족) |
| 3. 가상 사례 라벨 | ✓ | line 198에 "고객 지원 챗봇" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 4단 방어 전략이 운영자 정리임을 line 135/footer에 고지 |
| 5. 정량 수사 | ✓ | "100% 막는 방법 없음"은 안전한 부정문 |
| 6. Cross-reference | ✗ | 존재하지 않는 `/lessons/grounded-rag-pipeline` 링크 |

## Critical issues (즉시 수정)

### [CROSSREF-BROKEN] src/content/lessons/prompt-injection-defense.mdx:43
quoted: "[Lesson 26](/lessons/grounded-rag-pipeline)"
url: /lessons/grounded-rag-pipeline
verdict: 존재하지 않는 레슨 slug. L26 실제 slug는 `/lessons/grounded-rag-answers`.
suggested-fix: `[Lesson 26](/lessons/grounded-rag-answers)` 로 교체.

## High issues

### [CITATION-URL-SPECIFICITY] src/content/lessons/prompt-injection-defense.mdx:5
quoted: "Anthropic \"Strengthen guardrails\" — https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails"
url: https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails
verdict: 표본 검증에서 특정 문서로 확인한 URL은 `mitigate-jailbreaks` 페이지. 현재 URL은 섹션 루트라 내용 검증이 불안정함.
suggested-fix: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks 로 교체.

### [CITATION-URL-SPECIFICITY] src/content/lessons/prompt-injection-defense.mdx:52
quoted: "Anthropic \"Strengthen guardrails\""
url: https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails
verdict: 위와 동일.
suggested-fix: mitigate-jailbreaks 구체 URL로 교체.

## Medium issues

### [CITATION-URL-SPECIFICITY] src/content/lessons/prompt-injection-defense.mdx:72
quoted: "Anthropic \"Strengthen guardrails\""
url: https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails
verdict: 위와 동일.
suggested-fix: mitigate-jailbreaks 구체 URL로 교체.

## Low / 제안

- Direct/Indirect 구분은 Greshake et al. 논문으로 잘 뒷받침됩니다. 논문 제목·저자·연도는 arXiv에서 확인됨.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"프롬프트 인젝션은 사용자의 질문이 아니라 외부 입력이 에이전트를 조종하는 순간 시작돼요."

learningGoals (5개, verb-led)
- Direct와 Indirect prompt injection을 구분해요
- 외부 문서를 신뢰할 수 없는 데이터로 취급하는 프롬프트를 작성해요
- 역할 고정·권한 분리·입력 검사·출력 검증의 4단 방어를 설계해요
- 공격 패턴 5가지를 테스트 케이스로 바꿔요
- L29의 도구 권한 정책과 인젝션 방어를 연결해요

coreConcepts (4-5개)
- Prompt Injection: 입력이 모델의 원래 지시를 덮어쓰려는 공격
- Indirect Injection: 외부 문서·웹페이지·이메일에 숨은 악성 지시
- Instruction/Data Separation: 지시와 외부 데이터를 역할·태그로 분리하는 방어
- Output Validation: 민감 정보 노출이나 정책 위반을 사후 검사하는 장치
- Defense-in-Depth: 한 방어선에 의존하지 않고 여러 층을 겹치는 전략

reflectionQuestions (3-4개)
- 내 앱이 외부에서 읽어오는 데이터는 무엇이며 얼마나 신뢰할 수 있나요?
- 시스템 프롬프트와 외부 문서를 어떻게 분리해 넣을 건가요?
- 방어가 너무 강해서 정상 요청을 막는 경우를 어떻게 측정할 건가요?

## 결론

가장 큰 문제: L26 slug 오기와 Anthropic guardrails URL 특정성 부족.  
수정 후 예상 등급: 🟡  
Claude 적용 우선순위: 🔥 즉시
