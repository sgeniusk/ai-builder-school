# Codex 검토 — understanding-embeddings.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/understanding-embeddings.mdx
- 본문 라인 수: 133
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 비교표, 산출물 한 장, 더 깊이 보기/footer 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 2개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 133에 "사내 위키 500개 문서" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | "의미의 좌표"가 운영자 비유임을 footer에 고지 |
| 5. 정량 수사 | ⚠ | 코사인 유사도 구간표는 footer에서 대략값 고지됨 |
| 6. Cross-reference | ✗ | 존재하지 않는 `/lessons/verify-ai-output-hallucination` 링크 |

## Critical issues (즉시 수정)

### [CROSSREF-BROKEN] src/content/lessons/understanding-embeddings.mdx:96
quoted: "[Lesson 03](/lessons/verify-ai-output-hallucination)"
url: /lessons/verify-ai-output-hallucination
verdict: 존재하지 않는 레슨 slug. L03 실제 slug는 `/lessons/hallucination-verification`.
suggested-fix: `[Lesson 03](/lessons/hallucination-verification)` 로 교체.

## High issues

(없음)

## Medium issues

### [UNVERIFIABLE-GUIDE] src/content/lessons/understanding-embeddings.mdx:28
quoted: "0.9 이상 | 거의 같은 의미"
verdict: footer에서 대략 기준임을 고지했으나 표만 보면 일반 규칙처럼 보임.
suggested-fix: 표 제목에 "예시 구간" 또는 "실험용 감"을 추가.

## Low / 제안

- OpenAI Embeddings 문서는 확인됨. 다만 임베딩 차원 수는 모델마다 바뀌므로 line 16에 "모델에 따라"가 이미 있어 통과 가능.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"키워드가 달라도 뜻이 같으면 가까이 찾을 수 있어요. 임베딩은 텍스트를 의미의 좌표로 바꾸는 첫 단계입니다."

learningGoals (5개, verb-led)
- 토큰과 임베딩의 차이를 설명해요
- 코사인 유사도로 문장 간 의미 거리를 비교해요
- 의미 검색이 키워드 검색보다 나은 상황과 아닌 상황을 구분해요
- 임베딩 모델 선택 기준을 정리해요
- 내 도메인 문장 10개로 유사도 실험을 해요

coreConcepts (4-5개)
- Embedding: 텍스트를 숫자 벡터로 변환한 표현
- Cosine Similarity: 벡터 방향의 가까움을 재는 유사도
- Semantic Search: 단어 일치가 아니라 의미 유사도로 찾는 검색
- Hybrid Search: 키워드와 벡터 검색을 함께 쓰는 방식
- Model Dimension: 벡터 길이와 저장·검색 비용에 영향을 주는 값

reflectionQuestions (3-4개)
- 내 도메인에서 키워드 검색이 놓치는 표현은 무엇인가요?
- 의미는 비슷하지만 사실이 달라 위험한 문장 쌍은 무엇인가요?
- 코사인 유사도 기준을 내 데이터에서 어떻게 정할 건가요?

## 결론

가장 큰 문제: L03 slug 오기.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🔥 즉시
