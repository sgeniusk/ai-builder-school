# Codex 검토 — structured-output-handling.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/structured-output-handling.mdx
- 본문 라인 수: 178
- 종합 등급: 🟢

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, L06 연결, 비교표, 미니 앱 산출물, footer 모두 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 1개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 178에 "카드 UI 깨짐" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | "4번째 벽"이 운영자 비유임을 line 23과 footer에서 고지 |
| 5. 정량 수사 | ✓ | 출처 없는 수치 효과 없음 |
| 6. Cross-reference | ✓ | L05/L06/L22 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

(없음)

## Low / 제안

- line 23의 "4번째 벽"은 연극 용어와 충돌할 수 있으나 footer에서 비유임을 잘 고지했습니다. Claude가 유지해도 됩니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"JSON이 왔다고 끝이 아니에요. 앱 안에서는 스키마 검증을 통과한 데이터만 UI 상태가 될 수 있어요."

learningGoals (5개, verb-led)
- L06의 구조화 출력 방어선을 앱 상태 경계로 확장해요
- Zod 스키마로 서버와 클라이언트 타입을 공유해요
- `safeParse`로 깨진 응답을 사용자 경험 안에서 처리해요
- fallback UI와 재생성 흐름을 설계해요
- 스키마 변경 시 버전 관리 전략을 설명해요

coreConcepts (4-5개)
- Runtime Validation: 실행 시점에 데이터 형태를 검증하는 장치
- safeParse: 예외 대신 성공/실패 객체로 파싱 결과를 받는 패턴
- Shared Schema: 서버·클라이언트가 같은 스키마를 쓰는 단일 소스
- Fallback UI: 데이터가 깨졌을 때 앱이 무너지지 않게 보여주는 대체 경로
- Schema Evolution: 필드 변경과 버전 관리를 다루는 방법

reflectionQuestions (3-4개)
- 내 앱에서 AI 출력이 UI를 깨뜨릴 수 있는 지점은 어디인가요?
- 기본값으로 채워도 되는 필드와 반드시 실패시켜야 하는 필드는 무엇인가요?
- 스키마가 바뀔 때 이전 데이터를 어떻게 마이그레이션할 건가요?

## 결론

가장 큰 문제: 치명 이슈 없음.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟢 여유
