# 구조화 출력 미니 예제

> 이 파일은 AI Builder School · Lesson 2.2 에서 제공되는 출발 템플릿입니다.
> JSON 스키마 + 호출 + 재시도 루프가 한 페이지 안에 들어 있어요. 자기 도메인으로 복제·수정해서 쓰세요.

## 0. 작업 정의

| 항목 | 값 |
| --- | --- |
| 작업명 | *(예) 회의록 → Action Item JSON* |
| 입력 형태 | 자유 형식 회의록 (한국어 텍스트) |
| 출력 형태 | JSON 배열 (스키마는 아래) |
| 다운스트림 | Notion DB 자동 등록 |

---

## 1. JSON 스키마 — 계약

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["action_items"],
  "properties": {
    "action_items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["assignee", "task", "priority"],
        "properties": {
          "assignee":  { "type": "string", "description": "한국어 이름" },
          "task":      { "type": "string", "maxLength": 50 },
          "due_date":  { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
          "priority":  { "type": "string", "enum": ["high", "medium", "low"] },
          "note":      { "type": "string" }
        }
      }
    }
  }
}
```

핵심 필드 (assignee, task, priority) 는 `required`. 기한·노트는 optional.

---

## 2. 시스템 프롬프트 — 형식 강제

````
너는 회의록을 읽고 Action Item 을 추출하는 도구이다.

규칙:
1. 출력은 위 JSON 스키마를 그대로 따른다.
2. 인삿말, 설명, 마크다운 코드블록 모두 금지. 오직 JSON 만.
3. 기한이 회의록에 없으면 "due_date" 필드를 빼라. 추측 금지.
4. priority 는 회의 분위기 + 기한 임박도로 추정.

출력 예시:
{
  "action_items": [
    { "assignee": "김민지", "task": "캠페인 카피 v2", "due_date": "2026-06-20", "priority": "high" }
  ]
}
````

---

## 3. 호출 + 재시도 루프 (TypeScript 의사 코드)

```ts
const MAX_RETRY = 3;

async function extractActionItems(transcript: string) {
  let prompt = SYSTEM_PROMPT + "\n\n회의록:\n" + transcript;
  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    const raw = await callLLM(prompt);
    try {
      const parsed = JSON.parse(raw);
      validateAgainstSchema(parsed);
      return parsed;
    } catch (err) {
      if (attempt === MAX_RETRY) throw err;
      prompt += `\n\n직전 답이 ${err.message} 로 실패했다. 수정된 JSON 만 반환하라.`;
    }
  }
}
```

---

## 4. 검증 결과 기록

| 시도 | 입력 길이 | 1회 통과 | 재시도 횟수 | 비고 |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

> 5회 호출 중 100% 1회 통과가 목표. 재시도 비율이 30% 넘으면 스키마/프롬프트를 다시 점검.

---

## 5. 회고

- 가장 자주 실패한 필드는?
- 스키마를 더 strict 하게 / soft 하게 가야 할 부분은?
- 다음 자동화 파이프라인 (Phase 3 / Phase 5) 에서 어디에 연결할 것인가?
