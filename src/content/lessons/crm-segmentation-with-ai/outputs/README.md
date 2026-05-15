# CRM 세그먼트 자동화 가이드

비즈니스 목표에서 세그먼트 규칙을 역설계하고, AI 배치 레이블링으로 자동화하는 워크플로.

## 이 폴더의 파일

| 파일 | 용도 |
|------|------|
| `segment-definitions.md` | 세그먼트 규칙 정의 + 엣지 케이스 |
| `batch-labeling-prompt.md` | 재사용 배치 레이블링 프롬프트 |

## 사용 순서

1. `segment-definitions.md` 에서 세그먼트 기준 업데이트
2. `batch-labeling-prompt.md` 의 `[데이터]` 칸에 CSV 행 붙여넣기
3. AI에게 요청 → 레이블 결과 수령
4. UNKNOWN 비율 확인 → 높으면 규칙 보완
5. 샘플 10행으로 손 검증 후 전체 적용

## UNKNOWN이 많으면

규칙이 불완전하다는 신호. `segment-definitions.md` 로 돌아가 엣지 케이스를 추가한다.
