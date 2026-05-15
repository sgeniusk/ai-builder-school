# 배치 레이블링 프롬프트

매달 새 데이터를 `[데이터]` 칸에 붙여넣고 AI에게 요청한다.

---

## 프롬프트 (복사해서 사용)

```
[세그먼트 규칙]
기준일: <오늘 날짜 입력>

NEW: created_at >= 기준일 - 14일
ACTIVE: last_login_date < 기준일 - 14일 AND NOT NEW
DORMANT: last_login_date >= 기준일 - 60일 AND (last_purchase_date IS NULL OR last_purchase_date >= 기준일 - 90일)
CHURNED: last_login_date >= 기준일 - 180일
UNKNOWN: 위 조건 해당 없음 또는 필수 데이터 누락

우선순위: NEW > CHURNED > ACTIVE > DORMANT > UNKNOWN

[엣지 케이스 예시]
- login=3일, purchase=120일 → ACTIVE (로그인 기준 우선)
- login=NULL → UNKNOWN (필수 데이터 없음)
- created_at=5일, purchase=NULL → NEW (가입 14일 이내)

[레이블링 지시]
아래 고객 데이터를 위 규칙으로 레이블링하세요.
- 출력 형식: user_id, segment (다른 컬럼 없이 두 컬럼만)
- 규칙에 해당 없으면 반드시 UNKNOWN으로 표시하세요
- 이유를 추측하지 마세요. 규칙에 맞는 것만 레이블링하세요

[데이터]
user_id, last_login_date, last_purchase_date, email_open_rate_30d, total_purchases, created_at
<여기에 CSV 행 붙여넣기>
```

---

## 결과 검증 체크리스트

배치 결과를 받은 후 확인:

- [ ] UNKNOWN 비율이 10% 이하인가 (높으면 규칙 보완 필요)
- [ ] 샘플 10행의 레이블을 손 계산과 비교했는가
- [ ] NEW 세그먼트가 가입일 기준으로 정확히 분류됐는가
- [ ] CHURNED 가 ACTIVE 보다 많다면 이상치 신호 — 원인 확인

---

## UNKNOWN 비율 높을 때 처리

1. UNKNOWN 행의 데이터 패턴을 확인한다
2. 반복되는 패턴이 있으면 `segment-definitions.md` 에 새 세그먼트 또는 엣지 케이스 추가
3. 프롬프트 업데이트 후 재실행
