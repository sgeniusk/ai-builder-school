# Codex 검토 — mini-agent-loop.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/mini-agent-loop.mdx
- 본문 라인 수: 155
- 종합 등급: 🟢

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, ReAct 표, 종료 조건, 산출물 한 장/폴더, footer 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 2개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 155에 "여행 일정" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | ReAct는 공식 논문명, 오케스트레이션 분류는 Anthropic 기반이라고 고지 |
| 5. 정량 수사 | ✓ | maxIterations 5~15는 예시 범위이며 직접 측정 문맥 |
| 6. Cross-reference | ✓ | L27/L29/L30 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

(없음)

## Low / 제안

- ReAct 논문에서는 reasoning trace 표현이 민감할 수 있으므로, 실제 제품 구현에서는 사용자에게 internal chain-of-thought를 노출하지 않는다는 주석을 추가해도 좋습니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"도구 호출 한 번으로 끝나지 않는 작업은 루프가 필요해요. 에이전트는 생각하고, 행동하고, 관찰한 뒤 다시 결정합니다."

learningGoals (5개, verb-led)
- 단발 function calling과 에이전트 루프의 차이를 설명해요
- Thought/Action/Observation 흐름을 로그로 남겨요
- 종료 조건과 최대 반복 횟수를 설계해요
- Prompt Chaining/Routing/Autonomous Agent를 비교해요
- 미니 에이전트 실행 로그를 읽고 디버깅해요

coreConcepts (4-5개)
- Agent Loop: 모델이 상태를 보고 다음 행동을 반복 결정하는 구조
- ReAct: 추론과 행동을 번갈아 사용하는 에이전트 패턴
- Observation: 도구 실행 결과를 다음 판단에 반영하는 입력
- Termination Condition: 루프가 끝나는 조건
- Orchestration Pattern: 여러 호출과 도구를 어떤 흐름으로 엮을지 정하는 방식

reflectionQuestions (3-4개)
- 내 작업은 고정 파이프라인인가, 자율 루프가 필요한가요?
- 루프가 멈춰야 하는 성공/실패 신호는 무엇인가요?
- 에이전트 로그에서 사람이 반드시 검토해야 할 지점은 어디인가요?

## 결론

가장 큰 문제: 치명 이슈 없음.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟢 여유
