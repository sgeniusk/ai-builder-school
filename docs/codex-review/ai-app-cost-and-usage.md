# Codex 검토 — ai-app-cost-and-usage.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/ai-app-cost-and-usage.mdx
- 본문 라인 수: 167
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 가격 구조, 전략 표, 산출물 폴더, footer 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 2개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 167에 "API 청구서가 월급보다 커졌다" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 4가지 비용 최적화 전략이 운영자 정리임을 line 53/footer에 고지 |
| 5. 정량 수사 | ⚠ | 10배, 2~5배, $0.30→$15 등 시나리오/가격 예시가 많음 |
| 6. Cross-reference | ⚠ | line 140에서 streaming UI를 Lesson 21이라고 표기하지만 실제 L20 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [CROSSREF-NUMBER-MISMATCH] src/content/lessons/ai-app-cost-and-usage.mdx:140
quoted: "[Lesson 21](/lessons/streaming-response-ui)"
url: /lessons/streaming-response-ui
verdict: slug는 정상이나 lesson number가 잘못됨. streaming-response-ui는 L20.
suggested-fix: `[Lesson 20](/lessons/streaming-response-ui)` 로 교체.

### [UNVERIFIABLE-RHETORIC] src/content/lessons/ai-app-cost-and-usage.mdx:8
quoted: "사용자가 10배 될 때 갑자기 보입니다"
verdict: 도입 사례와 연결된 표현이지만 일반 효과처럼 보일 수 있음.
suggested-fix: "사용량이 늘어날 때 갑자기 보입니다"로 완화.

## Medium issues

### [TEMPORAL-SPEC] src/content/lessons/ai-app-cost-and-usage.mdx:23
quoted: "아웃풋 토큰이 인풋 대비 2~5배 비싼 모델이 많음"
verdict: pricing은 매우 자주 바뀌므로 확인일이 필요.
suggested-fix: "2026-05 기준 일부 모델에서는..."처럼 날짜를 붙이거나 pricing 파일에서 직접 계산하게 유도.

## Low / 제안

- line 3의 $0.30/$15/$450은 footer에서 가상 사례로 라벨링되어 있어 통과 가능하지만, 도입부에도 "예를 들어"를 붙이면 더 안전합니다.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: Lesson 번호 오기와 시간 민감 가격 표현.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
