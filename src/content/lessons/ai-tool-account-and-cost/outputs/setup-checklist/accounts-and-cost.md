# 계정 및 비용 설정 가이드

환경 세팅에 필요한 계정과 비용 구조를 정리한다.

---

## 계정 목록

| 계정 | 용도 | 가입 주소 |
|------|------|---------|
| GitHub | 코드 저장소, 협업 | github.com |
| Anthropic Console | Claude API 키 발급 | console.anthropic.com |

---

## API 키 보관 방법

### 폴더 구조

```
my-ai-builder-lab/
├── .env          ← API 키 저장 (Git 추적 안 됨)
├── .gitignore    ← .env 제외 설정
└── README.md
```

### `.env` 내용

```
ANTHROPIC_API_KEY=sk-ant-api03-여기에-실제-키-입력
```

### `.gitignore` 내용

```
.env
```

### 코드에서 API 키 불러오기

```python
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("ANTHROPIC_API_KEY")
```

---

## 비용 구조

Claude API는 토큰 단위로 과금된다.

```
Claude 3.5 Sonnet (2025년 기준):
- 입력: $3 / 1M 토큰
- 출력: $15 / 1M 토큰

실습 기준:
- 1회 호출 ≈ $0.003 이하
- 하루 100회 ≈ $0.30
- 한 달 실습 ≈ $3~$5
```

---

## Spending Limit 설정

1. [console.anthropic.com](https://console.anthropic.com) 로그인
2. Settings → Limits
3. Monthly spend limit → `$5` 입력 후 저장

한도에 도달하면 API 호출이 자동 중단된다. 실습 중에는 $5로 충분하다.

---

## 주의사항

- API 키를 코드 안에 직접 쓰지 않는다 (`api_key="sk-ant-..."` 형태)
- `.env` 파일을 GitHub에 올리지 않는다
- `git status`에서 `.env`가 보이면 즉시 `.gitignore`를 확인한다
- 이미 GitHub에 올라간 키는 즉시 Anthropic Console에서 폐기하고 새 키를 발급한다
