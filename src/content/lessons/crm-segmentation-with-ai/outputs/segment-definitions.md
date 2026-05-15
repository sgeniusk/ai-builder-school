# 세그먼트 규칙 정의서

## 0. 세그먼트 목적

| 세그먼트 | 비즈니스 목적 |
|---------|------------|
| ACTIVE | 로열티 프로그램 대상 |
| DORMANT | 재활성화 캠페인 대상 |
| CHURNED | 이탈 분석 대상 (캠페인 제외) |
| NEW | 온보딩 캠페인 대상 |
| UNKNOWN | 규칙 적용 불가 — 수동 검토 |

---

## 1. 사용 데이터 컬럼

```
last_login_date         : 마지막 로그인 날짜
last_purchase_date      : 마지막 구매 날짜 (없으면 NULL)
email_open_rate_30d     : 최근 30일 이메일 오픈율 (0.0 ~ 1.0)
total_purchases         : 누적 구매 횟수
created_at              : 가입일
```

---

## 2. 세그먼트 불리언 조건

```
NEW:
  created_at >= 현재일 - 14일

ACTIVE:
  last_login_date < 현재일 - 14일  (최근 14일 이내 로그인)
  AND NOT NEW

DORMANT:
  last_login_date >= 현재일 - 60일  (60일 이상 미로그인)
  AND last_purchase_date IS NULL
    OR last_purchase_date >= 현재일 - 90일

CHURNED:
  last_login_date >= 현재일 - 180일  (180일 이상 미로그인)

UNKNOWN:
  위 조건 해당 없음
  OR last_login_date IS NULL
```

> **우선순위:** NEW > CHURNED > ACTIVE > DORMANT > UNKNOWN

---

## 3. 엣지 케이스

| 케이스 설명 | 예시 데이터 | 올바른 세그먼트 | 이유 |
|------------|-----------|--------------|------|
| 최근 로그인, 오래 전 구매 | login=3일, purchase=120일 | ACTIVE | 로그인 기준 우선 |
| 로그인 없음, 이메일만 열어봄 | login=NULL, open_rate=0.4 | UNKNOWN | 로그인 데이터 없음 |
| 가입 5일, 구매 없음 | created_at=5일, purchase=NULL | NEW | 가입 14일 이내 |
| 60일 미로그인, 구매 많음 | login=65일, total_purchases=20 | DORMANT | 로그인 기준 적용 |
| 모든 날짜 NULL | login=NULL, purchase=NULL | UNKNOWN | 데이터 누락 |

---

## 4. 버전 기록

| 날짜 | 변경 내용 |
|------|---------|
| YYYY-MM-DD | 최초 작성 |
