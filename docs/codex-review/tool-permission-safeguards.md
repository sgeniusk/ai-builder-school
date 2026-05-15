# Codex 검토 — tool-permission-safeguards.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/tool-permission-safeguards.mdx
- 본문 라인 수: 159
- 종합 등급: 🟢

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 위험도 표, 권한 패턴, 산출물 한 장/폴더, footer 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 2개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 159에 "프로덕션 DB 삭제" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | Read-Only/Write/External Side-Effect가 운영자 정리임을 line 11/footer에 고지 |
| 5. 정량 수사 | ✓ | 30초는 예시 타임아웃으로 문제 없음 |
| 6. Cross-reference | ✓ | L06/L28/L30 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

(없음)

## Low / 제안

- "프로덕션 DB를 날렸어요" 도입은 강하지만 footer 가상 사례 라벨이 있어 통과 가능. 민감한 공포 마케팅으로 읽히지 않도록 본문에서 "그래서 겁먹자는 게 아니라 경계를 설계하자는 것" 문장을 추가해도 좋습니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"에이전트가 똑똑해질수록 더 중요한 건 능력이 아니라 권한이에요. 할 수 있는 일과 해도 되는 일을 분리해야 합니다."

learningGoals (5개, verb-led)
- 도구를 Read-Only/Write/External Side-Effect로 분류해요
- Allow-List 방식으로 허용 도구를 명시해요
- 위험 도구 호출에 Human-in-the-Loop 승인을 붙여요
- 샌드박스와 경로 제한의 역할을 설명해요
- 감사 로그로 사후 추적 가능한 정책을 작성해요

coreConcepts (4-5개)
- Tool Permission: 도구별 실행 가능 범위를 제한하는 정책
- Allow-List: 허용한 도구만 실행하게 하는 방식
- Human-in-the-Loop: 위험 동작 전에 사람 승인 지점을 두는 구조
- Sandbox: 코드 실행과 파일 접근을 격리하는 환경
- Audit Log: 도구 호출과 승인/차단 기록을 남기는 로그

reflectionQuestions (3-4개)
- 내 에이전트가 절대 자동 실행하면 안 되는 도구는 무엇인가요?
- 승인 요청에는 어떤 정보가 들어가야 사람이 판단할 수 있나요?
- 사고가 난 뒤 추적하려면 어떤 로그 필드가 필요할까요?

## 결론

가장 큰 문제: 치명 이슈 없음.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟢 여유
