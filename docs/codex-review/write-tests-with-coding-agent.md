# Codex 검토 — write-tests-with-coding-agent.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/write-tests-with-coding-agent.mdx
- 본문 라인 수: 151
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ⚠ | Hook/표/산출물/더 깊이 보기는 있으나 footer 가상 사례 라벨 없음 |
| 2. 인용 정확성 | ⚠ | 검증한 URL 0개 / 발견 문제 1개(BOOK 인용에 URL/ISBN 없음) |
| 3. 가상 사례 라벨 | ✗ | line 1~5 테스트 시나리오 footer 라벨 누락 |
| 4. 운영자 명칭 | ✓ | "의도 주석"은 line 80에 운영자 정리 고지 있음 |
| 5. 정량 수사 | ⚠ | "커버리지 100%"는 예제 맥락이지만 오해 여지 있음 |
| 6. Cross-reference | ✓ | L02/L16 링크 정상 |

## Critical issues (즉시 수정)

### [VIRTUAL-CASE-MISSING]
도입부 시나리오: "\"테스트요? 나중에 짤게요\""
footer 라벨 누락
suggested-fix: 마지막 섹션에 다음 추가:
```markdown
---

## 더 깊이 보기

> _참고: 본문 도입의 "테스트요? 나중에 짤게요" 시나리오는 학습 효과를 위한 가상 사례입니다. **의도 주석** 패턴은 일반적인 테스트 작성 관행을 이 학교 운영자가 한국어로 정리한 것이며, 외부 표준명은 아닙니다. 테스트 품질은 커버리지 수치보다 실패해야 할 때 실패하는지로 확인하세요._
```

## High issues

### [CITATION-INCOMPLETE] src/content/lessons/write-tests-with-coding-agent.mdx:7
quoted: "{/* Source · BOOK · Kent Beck \"Test-Driven Development: By Example\" (2002) · Red-Green-Refactor 사이클의 원전 */}"
url: 없음
verdict: BOOK 인용에 ISBN/출판사/URL이 없어 Claude가 후속 검증하기 어려움.
suggested-fix: ISBN 또는 publisher page를 추가. 예: Addison-Wesley, ISBN 9780321146533.

## Medium issues

### [STYLE-FOOTER] src/content/lessons/write-tests-with-coding-agent.mdx:138
quoted: "## 더 깊이 보기"
verdict: 기준 레슨처럼 `---` 구분선과 footer 라벨이 필요.
suggested-fix: 위 Critical suggested-fix 참고.

## Low / 제안

- line 11의 "AI가 테스트 짜기에 강한가"는 좋은 교육 포인트지만, L02 근거를 다시 짧게 인용하면 연결이 더 튼튼해집니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"테스트는 나중에 쓰는 보험이 아니라, AI에게 구현을 맡기기 전 방향을 고정하는 계약서예요."

learningGoals (5개, verb-led)
- 테스트 의도를 자연어로 먼저 정의해요
- Golden Path와 Edge Case를 분리해 에이전트에게 요청해요
- Red-Green-Refactor 루프에서 사람과 AI의 역할을 나눠요
- 커버리지 수치와 테스트 신뢰도의 차이를 설명해요
- 실패해야 할 때 실패하는 테스트인지 확인해요

coreConcepts (4-5개)
- Red-Green-Refactor: 실패 테스트를 먼저 만들고 최소 구현 후 정리하는 루프
- Golden Path: 가장 정상적인 성공 흐름을 확인하는 테스트
- Edge Case: 빈 값·경계값·잘못된 입력처럼 깨지기 쉬운 조건
- 의도 주석: 테스트가 무엇을 보장하는지 자연어로 남기는 주석
- Coverage Trap: 실행된 줄 수가 높아도 검증력이 낮을 수 있는 함정

reflectionQuestions (3-4개)
- 내가 지금 테스트 없이 AI에게 맡기고 있는 가장 위험한 함수는 무엇인가요?
- 커버리지는 높은데 실제로는 버그를 못 잡는 테스트가 있나요?
- 에이전트가 만든 테스트 중 내가 반드시 직접 읽어야 할 부분은 어디인가요?

## 결론

가장 큰 문제: footer 가상 사례 라벨과 BOOK 인용 메타 누락.  
수정 후 예상 등급: 🟡  
Claude 적용 우선순위: 🔥 즉시
