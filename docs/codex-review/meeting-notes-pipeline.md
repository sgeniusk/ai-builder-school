# Codex 검토 — meeting-notes-pipeline.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/meeting-notes-pipeline.mdx
- 본문 라인 수: 153
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 표, 산출물 폴더, 더 깊이 보기, footer 모두 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 0개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 153에 "월요일 스탠드업" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 3섹션 분류가 외부 표준명 아님을 line 34와 footer에서 고지 |
| 5. 정량 수사 | ⚠ | 5분/5초, "눈에 띄게" 표현이 출처 없이 남아 있음 |
| 6. Cross-reference | ✓ | L05/L06/L09/L11 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/meeting-notes-pipeline.mdx:128
quoted: "회의 직후 5분 안에 구조화된 회의록이 나옵니다. \"누가 뭐 하기로 했지?\"에 5초 안에 답하는 팀"
verdict: 검증 없는 구체 시간 효과.
suggested-fix: "회의 직후 바로 구조화된 회의록을 만들고, 담당자·마감 질문에 빠르게 답할 수 있어요"로 완화.

## Medium issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/meeting-notes-pipeline.mdx:67
quoted: "답이 표 형태로 나올 확률이 눈에 띄게 올라가요."
verdict: "눈에 띄게"는 사용자 기준 금지 예시에 가까움.
suggested-fix: "표 형태를 유지하기 쉬워져요"로 수정.

## Low / 제안

- line 75~79의 발화자 귀속 표에서 "정확도" 대신 "신뢰도"나 "검토 부담"으로 표현하면 실제 수치가 없는 비교임이 더 분명합니다.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 검증되지 않은 시간 절감 표현.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
