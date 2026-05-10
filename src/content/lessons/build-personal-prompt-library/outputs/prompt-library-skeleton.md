# 개인 프롬프트 라이브러리 — 스켈레톤

> 이 파일은 AI Builder School · Lesson 2.4 에서 제공되는 출발 템플릿입니다.
> 폴더 구조 + Front Matter 표준 + 첫 템플릿 예시가 한 페이지에 들어 있어요. 그대로 복제해 자기 라이브러리로 쓰세요.

## 0. 권장 폴더 구조

```
prompt-library/
├── README.md                  # 이 라이브러리는 어떻게 쓰나
├── research/
│   ├── literature-review.md
│   └── topic-explainer.md
├── reports/
│   ├── weekly-status.md
│   └── action-items-from-meeting.md
└── reviews/
    ├── code-review.md
    └── design-feedback.md
```

카테고리는 *내 일* 의 분포에 맞춰. 너무 많이 만들지 말고 3~4 개에서 시작.

---

## 1. README.md — 첫 페이지

```markdown
# Prompt Library

내가 매일 쓰는 프롬프트의 정본 위치.

## 카테고리

| 폴더 | 언제 쓰나 |
| --- | --- |
| research/ | 새 주제·논문·시장 조사 시 |
| reports/ | 매주·매월 정기 보고 작성 시 |
| reviews/ | 코드/디자인/문서 리뷰 시 |

## 사용 규칙

1. 한 번에 한 템플릿만 호출하고 변수 채워서 실행.
2. 결과가 좋지 않으면 템플릿 자체를 수정 (대화에서만 수정 금지).
3. 수정 시 version 을 올린다 (1.3 → 1.4).
4. 새 템플릿은 PR/커밋으로만 추가.

## 다음 단계

- Phase 3 자동화 파이프라인에서 이 라이브러리를 직접 호출
```

---

## 2. 템플릿 Front Matter — 표준

각 `.md` 파일 상단에 항상 다음 YAML 블록.

```yaml
---
purpose: "(이 템플릿이 무엇을 만드는가, 한 문장)"
version: "1.0"
last_tested: 2026-05-10
inputs:
  - topic        # 자유 텍스트
  - audience     # ["임원", "팀", "외부 클라이언트"] 중
  - tone         # ["formal", "friendly", "data-heavy"] 중
output_format: "Markdown — 4 섹션 (서론/핵심/근거/결론)"
related_lessons:
  - lesson-2.1
  - lesson-2.2
---
```

---

## 3. 첫 템플릿 예시 — `weekly-status.md`

```markdown
---
purpose: "주간 업무 상태 보고서 초안"
version: "1.2"
last_tested: 2026-05-10
inputs:
  - period       # 예 "5월 6일~10일"
  - key_metrics  # 표 형태
  - blockers     # 글머리표
output_format: "Markdown — 4 섹션"
---

# 작업 (Task)
{period} 기간의 주간 업무 보고서 초안을 작성하라.

# 맥락 (Context)
- 독자: 팀 리더 + 부서장
- 회사: 한국 B2B SaaS, 주간 단위 리뷰 문화
- 가정: 실무진은 이미 알고 있는 디테일은 생략

# 제약 (Constraints)
- 8줄 이내
- 각 섹션은 헤더 + 1~2 줄
- 추측·의견 금지 — 입력에서 명시된 것만
- 톤: data-heavy

# 출력 (Output)
다음 4 섹션 마크다운으로 출력하라.

## 1. 핵심 지표
| 지표 | 이번 주 | 지난 주 | Δ |
| --- | --- | --- | --- |
| (key_metrics 채움) | | | |

## 2. 진행
- (period 동안 끝난 일 3개)

## 3. 막힌 곳 (Blockers)
- (blockers 채움)

## 4. 다음 주 우선순위
- (3개)
```

---

## 4. 변수 치환 — 두 가지 방법

### 방법 A — 손으로 (시작은 이걸로)
- `{period}`, `{key_metrics}` 자리를 직접 텍스트 치환 후 ChatGPT/Claude 에 붙여넣기.

### 방법 B — 미니 CLI (Phase 3·4 가서)
- Node.js / Python 스크립트로 `prompt-library/<file>.md` 읽고 변수 치환 후 모델 호출.
- 이건 Phase 4 (Codex / Claude Code Workflow) 에서 자연스럽게 만들게 됩니다.

---

## 5. 이관 체크리스트

- [ ] 흩어진 프롬프트 전수 조사 (Slack, Notion, ChatGPT, 메모장)
- [ ] 카테고리 3~4개 결정
- [ ] 폴더 구조 생성
- [ ] Front Matter 표준 정의 (위 양식 사용)
- [ ] 5개 템플릿 이관 (4축 구조 + Front Matter)
- [ ] README 작성
- [ ] Git 또는 Notion DB 에 올림

---

## 6. 회고

- 가장 자주 호출될 템플릿은?
- 가장 망가지기 쉬운 템플릿은? (변수가 많거나 도메인이 자주 바뀌는 것)
- 팀에 공유한다면 누가 가장 많이 쓸까?
