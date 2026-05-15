# Codex 검토 — vector-search-basics.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/vector-search-basics.mdx
- 본문 라인 수: 167
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 비교표, 산출물 폴더, 더 깊이 보기/footer 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 1개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 167에 "JSON 파일에 벡터 500개" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | "미니 벡터 검색"이 운영자 정리임을 footer에 고지 |
| 5. 정량 수사 | ✗ | 500개 10초, ANN 100%, Recall@5 80% 이상 등 검증 없는 수치 |
| 6. Cross-reference | ✓ | L07/L23/L24/L26 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/vector-search-basics.mdx:17
quoted: "ANN은 \"근사\" 검색이라 정확도가 100%는 아닙니다. 하지만 실무에서 그 차이가 의미 있을 만큼 벌어지는 경우는 드물어요."
verdict: ANN 품질은 인덱스·데이터·파라미터에 따라 달라져 일반화 위험.
suggested-fix: "정확도와 속도의 트레이드오프가 있으니 본인 데이터에서 Recall을 측정해야 해요"로 수정.

### [UNVERIFIABLE-GUIDE] src/content/lessons/vector-search-basics.mdx:129
quoted: "Recall@5 | 기대 청크가 Top-5 안에 있는 비율 | 80% 이상"
verdict: 목표값 80%의 근거 없음.
suggested-fix: "팀/도메인별 목표 설정" 또는 "초기 목표 예시: 80% 등"으로 낮추고 직접 측정 고지.

## Medium issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/vector-search-basics.mdx:3
quoted: "500개 넘으니 10초"
verdict: footer에서 가상 사례로 라벨링되어 있으나 도입 수치가 실제 벤치마크처럼 보일 수 있음.
suggested-fix: "느려지기 시작합니다"로 완화하거나 "가상 예시"를 도입부에도 표시.

## Low / 제안

- pgvector/Pinecone/Chroma 비교표는 공식 문서 링크가 있어 좋지만, 가격/무료 티어는 자주 바뀌므로 line 32는 footer 고지와 함께 확인일을 붙이면 더 안전합니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"임베딩한 벡터가 많아지면 파일 검색은 금방 한계에 닿아요. 벡터 DB는 가까운 의미를 빠르게 찾기 위한 검색 엔진입니다."

learningGoals (5개, verb-led)
- 벡터 DB가 벡터 저장소와 검색 인덱스를 함께 제공하는 이유를 설명해요
- pgvector/Pinecone/Chroma의 선택 기준을 비교해요
- Top-K 검색 흐름을 구현 수준으로 설명해요
- 키워드+벡터 하이브리드 검색이 필요한 상황을 구분해요
- Recall@K와 MRR로 검색 품질을 평가해요

coreConcepts (4-5개)
- Vector DB: 벡터와 메타데이터를 저장하고 유사도 검색을 수행하는 저장소
- ANN: 정확도를 조금 양보해 검색 속도를 높이는 근사 최근접 검색
- Top-K: 쿼리와 가장 가까운 K개 결과를 가져오는 방식
- Hybrid Search: BM25 등 키워드 검색과 벡터 검색을 함께 쓰는 방식
- Retrieval Eval: 검색 결과가 기대 근거를 찾았는지 평가하는 절차

reflectionQuestions (3-4개)
- 내 데이터에서 정확한 키워드가 더 중요한 쿼리는 무엇인가요?
- K를 높였을 때 답변 품질과 노이즈는 어떻게 변하나요?
- 검색 품질 목표를 Recall@K와 MRR 중 무엇으로 볼 건가요?

## 결론

가장 큰 문제: 검색 품질/속도 수치가 검증 없이 제시됨.  
수정 후 예상 등급: 🟡  
Claude 적용 우선순위: 🔥 즉시
