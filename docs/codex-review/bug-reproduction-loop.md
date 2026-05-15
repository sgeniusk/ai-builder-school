# Codex 검토 — bug-reproduction-loop.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/bug-reproduction-loop.mdx
- 본문 라인 수: 165
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ⚠ | Hook/표/산출물/더 깊이 보기는 있으나 footer 라벨 누락 |
| 2. 인용 정확성 | ⚠ | 검증한 URL 1개 / 발견 문제 1개(BOOK 인용 URL 없음) |
| 3. 가상 사례 라벨 | ✗ | 결제 버그 시나리오 footer 라벨 없음 |
| 4. 운영자 명칭 | ✓ | 5단 루프가 운영자 정리임을 line 122에 고지 |
| 5. 정량 수사 | ✗ | 80%, 총 시간 절반 등 출처 없는 효과 수치 |
| 6. Cross-reference | ✓ | L06/L16/L17 링크 정상 |

## Critical issues (즉시 수정)

### [VIRTUAL-CASE-MISSING]
도입부 시나리오: "\"고쳤는데 또 나왔어요\" 결제 버그"
footer 라벨 누락
suggested-fix: 마지막 섹션에 다음 추가:
```markdown
---

## 더 깊이 보기

> _참고: 본문 도입의 "결제 페이지 버그" 시나리오는 학습 효과를 위한 가상 사례입니다. **5단 루프(재현 → 최소화 → 가설 → 수정 → 회귀)** 명칭은 일반적인 디버깅 관행을 이 학교 운영자가 한국어로 정리한 것이며, 외부 표준명은 아닙니다. 실제 수정 시간과 재발률은 코드베이스·테스트 수준·버그 종류에 따라 달라집니다._
```

## High issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/bug-reproduction-loop.mdx:5
quoted: "\"고쳤는데 또 나오는\" 버그의 80%는 같은 패턴이에요."
verdict: 출처 없는 구체 비율.
suggested-fix: "\"고쳤는데 또 나오는\" 버그는 재현 없이 수정했을 때 자주 생겨요"로 완화.

### [UNVERIFIABLE-RHETORIC] src/content/lessons/bug-reproduction-loop.mdx:132
quoted: "총 시간은 절반입니다."
verdict: 검증 없는 효과 수치.
suggested-fix: "되돌아오는 버그를 다시 보는 시간을 줄일 수 있어요"로 수정.

### [CITATION-INCOMPLETE] src/content/lessons/bug-reproduction-loop.mdx:100
quoted: "Kent Beck \"Test-Driven Development: By Example\" (2002)"
url: 없음
verdict: BOOK 인용에 URL/ISBN 없음.
suggested-fix: ISBN 또는 publisher page를 추가.

## Medium issues

- line 11의 Claude Code overview는 일반 코딩 에이전트 근거로는 약함. "버그 수정 전에 재현" 주장은 Git/테스트 문서나 디버깅 자료가 더 직접적입니다.

## Low / 제안

- 결제/카드사 예시는 민감 도메인이므로 "실제 결제 로직에 바로 적용하지 말고 샌드박스에서 재현" 한 줄을 붙이면 안전합니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"버그 수정의 첫 줄은 코드가 아니라 재현입니다. 재현 없는 수정은 증상을 덮을 뿐이에요."

learningGoals (5개, verb-led)
- 버그 리포트를 재현 가능한 단계로 바꿔요
- Minimal Reproduction을 만들어 원인을 좁혀요
- git bisect가 필요한 상황을 구분해요
- 에이전트가 낸 원인 가설을 검증 방법과 함께 평가해요
- 재현 스텝을 회귀 테스트로 바꿔요

coreConcepts (4-5개)
- Minimal Reproduction: 버그가 유지되는 가장 작은 입력·환경
- git bisect: 깨진 커밋을 이진 탐색으로 찾는 Git 기능
- Hypothesis Loop: 원인 가설과 확인 방법을 짝으로 검증하는 루프
- Regression Test: 같은 버그가 다시 생기지 않도록 막는 테스트
- Stop Point: 수정 전후 사람이 확인해야 하는 중간 정지 지점

reflectionQuestions (3-4개)
- 내가 최근 "고쳤다"고 생각했지만 다시 나온 버그는 무엇인가요?
- 재현 없이 바로 수정한 이유는 시간 압박이었나요, 정보 부족이었나요?
- 다음 버그에서 반드시 테스트로 남길 조건은 무엇인가요?

## 결론

가장 큰 문제: footer 누락과 출처 없는 80%/절반 수사.  
수정 후 예상 등급: 🟡  
Claude 적용 우선순위: 🔥 즉시
