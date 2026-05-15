# LLM 로그 스키마 정의

LLM 호출마다 기록할 필드. `prompt_version` 이 핵심.

---

## 최소 스키마 (JSON)

```json
{
  "log_id": "uuid-v4",
  "timestamp": "ISO8601",
  "feature": "기능 이름 (예: review_summary, crm_label)",
  "prompt_version": "v1.3",
  "model": "claude-3-5-sonnet-20241022",
  "temperature": 0.3,
  "input": {},
  "output": "",
  "latency_ms": 1240,
  "tokens": {
    "input": 180,
    "output": 42
  }
}
```

---

## 필드 설명

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `log_id` | string | ✅ | UUID — 로그 고유 식별자 |
| `timestamp` | string | ✅ | ISO 8601 (2025-05-13T14:23:00Z) |
| `feature` | string | ✅ | 어떤 기능에서 호출했는지 |
| `prompt_version` | string | ✅ | 현재 프롬프트 버전 (필수!) |
| `model` | string | ✅ | 사용한 모델 전체 이름 |
| `temperature` | float | ✅ | 생성 파라미터 |
| `input` | object | ✅ | 프롬프트에 삽입된 실제 입력값 |
| `output` | string | ✅ | LLM 원본 출력 |
| `latency_ms` | int | 권장 | 응답 시간 (성능 추적) |
| `tokens` | object | 권장 | input/output 토큰 수 (비용 추적) |
| `eval_score` | float | 선택 | LLM-as-Judge 점수 (자동화 시) |
| `user_feedback` | string | 선택 | 사용자 피드백 (thumbs up/down) |

---

## 프롬프트 버전 관리 규칙

```
v1.0   — 최초 배포
v1.1   — 마이너 수정 (표현 변경, 지시 추가)
v2.0   — 구조적 변경 (섹션 추가/삭제, 목적 변경)
```

`prompt_version` 변경 시 `CHANGELOG.md` 에 변경 이유 기록.

---

## 저장 방법 (선택)

| 방법 | 장단점 |
|------|--------|
| JSON 파일 (`logs/YYYY-MM-DD.jsonl`) | 간단, 코드 없이 검색 가능 |
| SQLite DB | 집계 쿼리 가능, 로컬 운영 적합 |
| Langfuse (무료 티어) | 대시보드 제공, 팀 공유 편리 |
| 자체 Postgres | 프로덕션 규모 |
