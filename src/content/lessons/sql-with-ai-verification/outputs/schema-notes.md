# 테이블 스키마 메모

AI SQL 요청 시 이 파일에서 복사해 붙여넣는다. CREATE TABLE 구문 또는 컬럼 목록 형식.

## 사용법

AI 프롬프트에 아래 형식으로 붙인다:

```
[스키마]
<아래 내용 복사 붙여넣기>
```

---

## 주요 테이블

### users

```sql
CREATE TABLE users (
  id          BIGINT PRIMARY KEY,
  email       VARCHAR(255),
  created_at  DATETIME,
  plan_type   VARCHAR(50),   -- 'free', 'pro', 'enterprise'
  status      VARCHAR(20)    -- 'active', 'churned', 'paused'
);
```

### orders

```sql
CREATE TABLE orders (
  id          BIGINT PRIMARY KEY,
  user_id     BIGINT REFERENCES users(id),
  created_at  DATETIME,
  amount      INT,           -- 원 단위
  status      VARCHAR(20)    -- 'completed', 'cancelled', 'refunded'
);
```

### events

```sql
CREATE TABLE events (
  id          BIGINT PRIMARY KEY,
  user_id     BIGINT REFERENCES users(id),
  event_name  VARCHAR(100),  -- 'login', 'page_view', 'feature_click', etc.
  created_at  DATETIME,
  properties  JSON
);
```

---

## 자주 쓰는 인덱스 정보

- `users`: `id`, `email`, `created_at` 인덱스 있음
- `orders`: `user_id`, `created_at` 인덱스 있음
- `events`: `user_id`, `event_name`, `created_at` 복합 인덱스 있음

---

## 추가할 테이블

아래 칸에 프로젝트 고유 테이블을 추가한다.

```sql
-- 추가 테이블
```
