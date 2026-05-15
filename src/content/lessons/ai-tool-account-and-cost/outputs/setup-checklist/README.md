# 환경 세팅 체크리스트

이 레슨의 산출물. 모든 항목을 완료하면 API 실습을 시작할 준비가 된 것이다.

---

## 체크리스트

### 계정

- [ ] GitHub 계정 생성 완료
- [ ] Anthropic 계정 생성 완료
- [ ] Anthropic Console에서 API 키 발급 완료

### 로컬 환경

- [ ] `my-ai-builder-lab` 폴더 생성
- [ ] `.env` 파일 생성 + API 키 입력
- [ ] `.gitignore` 파일 생성 + `.env` 추가
- [ ] `git status` 실행 — `.env`가 목록에 없는 것 확인

### 비용 관리

- [ ] Anthropic Console → Settings → Limits에서 Monthly spend limit 설정 ($5~$10)

---

## 확인 방법

`.env`가 Git에 추적되지 않는지 확인:

```bash
cd my-ai-builder-lab
git init
git status
```

`.env`가 목록에 보이면 `.gitignore` 설정을 다시 확인한다.

---

## 비용 추정

| 사용 패턴 | 월 예상 비용 |
|----------|------------|
| 학습·실습 (하루 50~100회 호출) | $1~$3 |
| 루프 버그로 수천 회 호출 | $10 이상 가능 |
| spending limit $5 설정 시 | 최대 $5 |

spending limit을 설정하면 한도 초과 시 API가 자동 중단된다.

---

세부 설정 내용은 `accounts-and-cost.md` 참고.
