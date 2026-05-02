---
name: content-validator
description: AI Builder School 콘텐츠 무결성 검증 스킬. validateContent() 함수와 npm run validate 스크립트를 실행하여 phase·lesson·journey·project·template 사이의 참조 무결성을 점검하고 결과를 사용자에게 보고. 자동 수정은 절대 하지 않음.
---

# Skill · content-validator

> Harness · Recovery — 검증은 자동, 수정은 사람.

## 언제 쓰나

- 사용자가 "검증해 줘", "validate 돌려 줘"라고 할 때
- 콘텐츠 변경 후 게이트 통과 확인이 필요할 때
- pre-commit/CI 실패 후 원인 진단이 필요할 때

## 언제 안 쓰나

- 콘텐츠를 추가/편집해야 할 때 → `lesson-writer`
- UI 스타일 변경 → `ui-stylist`

## 작업 순서

1. `npm run validate` 실행
2. 결과를 받아 사용자에게 **있는 그대로** 보고:
   - 통과: `phases X · lessons Y · journeys Z` 한 줄
   - 실패: 발견된 이슈 목록을 종류별로 그룹화해 표시
3. **자동 수정 금지.** 대신 복구 옵션 2~3개를 제시:
   - 옵션 A — slug 추가
   - 옵션 B — 잘못된 참조 제거
   - 옵션 C — 다른 데이터 흐름으로 우회
4. 사용자가 옵션을 고르면 그 수정만 정확히 적용

## 출력 형식 (사용자에게)

성공:

```
✓ Content OK
  phases 13 · lessons 32 · journeys 6 · projects 6 · templates 7
```

실패:

```
✗ <N>건 무결성 이슈

[lesson.phaseId]
  hello-world  Lesson "hello-world" references missing phase "phase-99"

복구 옵션:
A. phases.ts에 phase-99 항목 추가
B. lessons.ts에서 hello-world의 phaseId를 기존 Phase로 변경
C. hello-world 레슨 자체를 제거
```

## 절대 하지 말 것

- 자동 수정 (이슈를 보고 임의로 데이터 고치기)
- "안전한 fallback" 같은 데이터 변경
- 사용자 확인 없이 새 slug 생성

## 검증 게이트

이 스킬 자체에는 별도 게이트 없음 (validate가 본질). 결과만 충실히 전달.
