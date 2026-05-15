# Codex 검토 — coding-agent-setup.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/coding-agent-setup.mdx
- 본문 라인 수: 157
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 비교표, 산출물 한 장, 더 깊이 보기/footer 모두 있음 |
| 2. 인용 정확성 | ⚠ | 검증한 URL 3개 / 발견 문제 1개(일부 제품 비교값 최신성 위험) |
| 3. 가상 사례 라벨 | ✓ | line 157에 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 비교표의 기준일 고지 있음 |
| 5. 정량 수사 | ✓ | 검증 불가 수치 주장은 거의 없음 |
| 6. Cross-reference | ✓ | L05/L08/L14 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [CITATION-STALENESS] src/content/lessons/coding-agent-setup.mdx:31
quoted: "GPT-4.1/o3/o4-mini", "MCP 지원 | 제한적"
url: https://github.com/openai/codex
verdict: 제품 비교표는 2025년 5월 기준이라고 고지되어 있으나, 2026년 현재 Codex/Claude/Cursor 기능과 모델명이 바뀌었을 가능성이 높음.
suggested-fix: 표를 "예시"로 낮추거나 공식 문서 확인일을 2026-05-07로 다시 검증.

## Medium issues

### [STYLE] src/content/lessons/coding-agent-setup.mdx:111
quoted: "## 금지"
verdict: H2 제목이 기준점의 설명형 섹션보다 짧고 명령문처럼 보임.
suggested-fix: "## 절대 하지 말아야 할 것" 정도로 해요체 흐름에 맞추기.

## Low / 제안

- Cursor 공식 문서 URL은 `https://docs.cursor.com`에서 `https://cursor.com/docs`로 redirect됨. 인용 주석에 최종 URL을 반영하면 나중 검증이 쉬움.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 제품 비교표의 최신성 리스크.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
