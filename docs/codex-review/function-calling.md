# Codex 검토 — function-calling.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/function-calling.mdx
- 본문 라인 수: 153
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 4단계 표, 비교표, 산출물 한 장/폴더, footer 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 3개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 153에 "서울 날씨" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ⚠ | 호출 흐름 4단계는 자체 정리처럼 보이나 footer disclaimer가 없음 |
| 5. 정량 수사 | ✓ | "100%"는 부정문/주의문맥이라 허용 가능 |
| 6. Cross-reference | ✓ | L06/L28 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

### [OPERATOR-DISCLAIMER-MISSING] src/content/lessons/function-calling.mdx:12
quoted: "호출 흐름 한눈에 — 4단계"
verdict: Anthropic/OpenAI 공식 용어를 조합한 운영자 설명으로 보이며 외부 표준명 아님 고지가 없음.
suggested-fix: footer에 "본문의 4단계 호출 흐름은 공식 API 동작을 학습용으로 단순화한 운영자 정리"라는 문장을 추가.

## Low / 제안

- Anthropic/OpenAI 비교표의 필드명은 SDK/API 버전에 따라 바뀔 수 있고 footer에서 이미 고지되어 있어 좋습니다.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 4단계 호출 흐름 disclaimer 약함.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
