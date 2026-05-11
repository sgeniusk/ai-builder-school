# 회의록 자동 정리 파이프라인

> 이 파일은 AI Builder School · Lesson 3.2 에서 제공되는 출발 템플릿입니다.
> 녹취 / 메모 → 구조화 JSON → 배포까지의 전 단계를 한 페이지에 정리.

## 0. 적용 회의

| 항목 | 값 |
| --- | --- |
| 회의 종류 | *(예) 마케팅 주간 회의* |
| 입력 형태 | 녹취 텍스트 / 메모 / 화이트보드 스캔 |
| 평균 길이 | (예) 30분 / 약 3,000자 |
| 배포 자리 | (예) Notion DB "회의록" |

---

## 1. JSON 스키마 — 출력 계약

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["decisions", "action_items", "open_issues"],
  "properties": {
    "decisions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["topic", "outcome"],
        "properties": {
          "topic": { "type": "string" },
          "outcome": { "type": "string" },
          "trigger": {
            "type": "string",
            "description": "결정으로 판단한 근거 발언 (\"OK\", \"가자\", \"확정\" 등)"
          }
        }
      }
    },
    "action_items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["task", "status"],
        "properties": {
          "assignee": { "type": ["string", "null"] },
          "task": { "type": "string" },
          "due_date": { "type": ["string", "null"], "pattern": "^\\d{4}-\\d{2}-\\d{2}$" },
          "deliverable": { "type": "string" },
          "status": { "type": "string", "enum": ["complete", "incomplete"] }
        }
      }
    },
    "open_issues": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "topic": { "type": "string" },
          "next_step": { "type": "string" }
        }
      }
    }
  }
}
```

> **status: "incomplete"** — 담당자·기한·deliverable 셋 중 하나라도 빠지면 자동 설정.

---

## 2. 시스템 프롬프트

````
너는 회의록을 정리하는 도구이다.

원문에서 다음 3 종을 추출하라.

1. **decisions** — 명시적 결정. trigger 단어 (OK, 가자, 확정, do it, 결정,
   합의) 가 있어야만 결정으로 분류. 토론·고민은 open_issues 로.
2. **action_items** — 누가·언제까지·무엇을. 셋 중 하나 빠지면 status:
   incomplete. 추측 금지.
3. **open_issues** — 결정되지 않은 채 끝난 주제.

규칙:
- 출력은 위 JSON 스키마만. 인삿말·설명·코드블록 금지.
- 발화자가 명시되지 않은 곳은 assignee: null.
- 기한이 "다음 주", "곧" 처럼 모호하면 due_date: null + deliverable 에
  원문 그대로 표기.

[회의 원문]
````

---

## 3. 재시도 루프 (TypeScript 의사 코드)

```ts
const MAX_RETRY = 3;

async function structureMeeting(transcript: string) {
  let prompt = SYSTEM_PROMPT + "\n\n" + transcript;
  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    const raw = await callLLM(prompt);
    try {
      const parsed = JSON.parse(raw);
      validateAgainstSchema(parsed);
      return parsed;
    } catch (err) {
      if (attempt === MAX_RETRY) throw err;
      prompt += `\n\n직전 답이 ${err.message} 로 실패. 수정된 JSON 만 반환.`;
    }
  }
}
```

---

## 4. 검증 5축 — 회의록 한정

| 축 | 점검 항목 |
| --- | --- |
| Fact | 결정 / Action 의 *발언자* 가 원문에 실제로 있는가 |
| Origin | 모든 결정에 trigger 단어가 있는가 |
| Scope | 일반 토론 / 의견을 결정으로 잘못 분류하지 않았는가 |
| Confidence | incomplete status 인데 complete 로 잡지 않았는가 |
| Bias | 특정 참석자 발언만 과대 인용되지 않았는가 |

---

## 5. 배포 자리

| 자리 | 어떻게 |
| --- | --- |
| Slack 자기 DM | Webhook 으로 마크다운 자동 전송 |
| Notion DB | API 로 row 1 개 생성 (decisions / actions / issues 컬럼) |
| GitHub Issues | 각 incomplete Action 을 Issue 로 자동 변환 |
| Email 본인 | 가장 단순. 매주 같은 시간 |

→ 한 자리 골라서 *매번 같은 자리* 로.

---

## 6. 첫 5 회 측정

| 회차 | 회의 길이 | 결정 수 | Action 수 (complete/incomplete) | 1회 통과 | 비고 |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

> 통과율 80%+ 이고 incomplete 비율 30% 미만이면 안정.

---

## 7. 저장 약속

- 위치 — `prompt-library/work-os/meeting-notes.md`
- 호출 시점 — 회의 종료 5 분 안 (캘린더 이벤트 끝과 동시에)
