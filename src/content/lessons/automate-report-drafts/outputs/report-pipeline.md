# 보고서 초안 파이프라인

> 이 파일은 AI Builder School · Lesson 3.1 에서 제공되는 출발 템플릿입니다.
> Template Grounding + 3 단 루프 (Draft → Review → Final) 를 한 페이지에 담았어요. 자기 도메인으로 복제·수정해서 쓰세요.

## 0. 보고서 정의

| 항목 | 값 |
| --- | --- |
| 보고서 이름 | *(예) 주간 마케팅 진행 보고* |
| 주기 | 매주 / 매월 |
| 독자 | |
| 발송 자리 | (Slack 채널 / Notion DB / 이메일) |
| 핵심 지표 5~8개 | |

---

## 1. Template Grounding — 과거 보고서 3 편

> 가장 *완성도 높았던* 또는 *상사가 거의 안 고친* 과거 보고서 3 편을 그대로 첨부.

```
[보고서 W-3 원문]
...

[보고서 W-2 원문]
...

[보고서 W-1 원문]
...
```

---

## 2. 입력 슬롯 — 매주 바뀌는 데이터

```yaml
period: "5월 6일~10일"
key_metrics:
  - name: 가입자 증가
    this_week: 234
    last_week: 198
    delta: "+18%"
  - name: 활성 사용자
    this_week: 1820
    last_week: 1812
    delta: "+0.4%"
progress:
  - 신규 캠페인 카피 v2 발송
  - 사이트 A/B 테스트 데이터 수집 1차
blockers:
  - 디자인 리뷰 대기 (수요일 예정)
next_priorities:
  - 캠페인 결과 분석 보고
  - 사이트 카피 변경 PR
risks:
  - 휴가로 의사결정 지연 가능
```

---

## 3. 출력 스키마

```json
{
  "title": "string (W{number} 주간 보고)",
  "summary": "string (3줄 이내)",
  "metrics_table": [
    { "name": "string", "this_week": "string", "last_week": "string", "delta": "string" }
  ],
  "progress": ["string"],
  "blockers": ["string"],
  "next_priorities": ["string"],
  "risks": ["string"]
}
```

---

## 4. 시스템 프롬프트 (Few-shot + 강제)

````
너는 우리 팀의 주간 보고서 작성 도우미다.

규칙:
1. 아래 과거 3 편의 보고서와 *동일한 구조·톤·길이* 로 작성하라.
2. 입력 슬롯의 데이터만 사용하라. 입력에 없는 수치 / 사실은 추가 금지.
3. 위 JSON 스키마를 정확히 따른다. 인삿말·설명·코드블록 출력 금지.
4. 톤: data-heavy, 추측 단어 ("아마", "확실히", "분명") 사용 금지.

[과거 보고서 3 편]

[새 입력]
````

---

## 5. 3 단 루프

| 단계 | 작업 | 누가 | 시간 |
| --- | --- | --- | --- |
| **Draft** | 위 프롬프트로 초안 생성 | AI | 30초 |
| **Review** | "이 답을 5축 (사실·범위·톤·길이·구조) 으로 자기 점검 후 미흡한 점 5개 짚어라" | AI | 30초 |
| **Final** | Lesson 1.4 의 5 분 트러스트 체크 — Fact·Origin 축 집중 | 사람 | 5분 |

---

## 6. 첫 5 회 측정

| 회차 | 1회 통과 (사람 수정 ≤3건) | 사람 수정 건수 | 가장 자주 수정한 섹션 |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

> 통과율 80% 이상이면 자동화 안정.

---

## 7. 저장 약속

- 위치 — `prompt-library/reports/<name>.md`
- Front Matter 에 `purpose`, `version`, `last_tested`, `inputs` 명시 (Lesson 2.4)
- 호출 시점 — 매주 *언제 어디서* (예 — 월요일 오전 9시, Notion 데일리)
