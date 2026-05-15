# Codex 검토 — document-chunking-strategy.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/document-chunking-strategy.mdx
- 본문 라인 수: 169
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 3전략, 표 다수, 산출물 한 장, footer 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 2개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 169에 "회사 기술 가이드" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 3가지 청킹 전략이 운영자 정리임을 footer에 고지 |
| 5. 정량 수사 | ⚠ | 10~20%, 500~1500토큰 등 권장값은 대략값 고지 필요 |
| 6. Cross-reference | ✓ | L07/L23/L25 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [UNVERIFIABLE-GUIDE] src/content/lessons/document-chunking-strategy.mdx:82
quoted: "오버랩 비율 10~20%는 일반적 관행"
verdict: 공식 표준은 아니라고 고지했지만 "일반적 관행" 출처가 없음.
suggested-fix: "실험 시작점으로 자주 쓰이는 범위"처럼 낮추고 본인 데이터 실험을 강조.

### [UNVERIFIABLE-GUIDE] src/content/lessons/document-chunking-strategy.mdx:127
quoted: "기술 문서 (Markdown) | 헤더 단위 (500~1500토큰)"
verdict: 도메인별 권장표가 표준처럼 보일 수 있음.
suggested-fix: 표 제목을 "실험 시작점 가이드"로 바꾸고 footer 고지를 본문에도 추가.

## Medium issues

(없음)

## Low / 제안

- LangChain RecursiveCharacterTextSplitter URL은 구체 문서라 좋습니다. Contextual Retrieval 출처도 적절합니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"RAG 품질은 모델보다 먼저 청크에서 갈립니다. 무엇을 한 덩어리로 임베딩하느냐가 검색 결과를 바꿔요."

learningGoals (5개, verb-led)
- 청킹이 검색 품질에 미치는 영향을 설명해요
- 고정 크기·구조 기반·의미 기반 청킹을 비교해요
- 오버랩이 필요한 상황과 비용을 판단해요
- Contextual Retrieval의 목적을 설명해요
- 내 문서에 맞는 청킹 실험표를 작성해요

coreConcepts (4-5개)
- Chunking: 문서를 검색 가능한 단위로 자르는 과정
- Fixed-size Chunking: 일정 토큰/문자 수로 자르는 방식
- Structure-aware Chunking: 헤더·조항·함수 같은 구조를 기준으로 자르는 방식
- Semantic Chunking: 의미 전환 지점을 기준으로 나누는 방식
- Overlap: 경계 정보 손실을 줄이기 위해 일부 내용을 겹치는 장치

reflectionQuestions (3-4개)
- 내 문서는 구조가 분명한가, 긴 줄글에 가까운가요?
- 검색 실패가 청킹 때문인지 임베딩 때문인지 어떻게 구분할 건가요?
- 오버랩을 늘렸을 때 비용 대비 품질이 실제로 좋아졌나요?

## 결론

가장 큰 문제: 권장 수치가 표준처럼 보이는 점.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
