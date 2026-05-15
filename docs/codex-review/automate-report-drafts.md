# Codex 검토 — automate-report-drafts.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/automate-report-drafts.mdx
- 본문 라인 수: 130
- 종합 등급: 🟢

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook 시나리오, 7개 H2, 비교표, 산출물 폴더, 더 깊이 보기/footer 모두 기준과 잘 맞음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 1개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 130 footer에 "금요일 오후 4시 보고서" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | Template Grounding이 외부 표준명 아님을 line 22와 footer에서 고지 |
| 5. 정량 수사 | ⚠ | "상당 부분"은 정량은 아니지만 효과 표현이 조금 강함 |
| 6. Cross-reference | ✓ | L05/L06/L07/L08/L10 링크 모두 존재 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

### [RHETORIC-SOFTEN] src/content/lessons/automate-report-drafts.mdx:53
quoted: "1단계에서 빠뜨린 것의 상당 부분이 잡힙니다."
verdict: 정량 수치는 아니지만 검증된 효과처럼 읽힐 수 있음.
suggested-fix: "빠뜨린 항목을 다시 볼 기회를 만듭니다"처럼 실천 효과 중심으로 완화.

## Low / 제안

- line 41의 "보고서 3개면 보통 3000~6000 토큰"은 footer에서 직접 측정하라고 보강되어 있어 통과 가능하지만, "문서 길이에 따라 다름"을 본문에도 한 번 붙이면 더 안전합니다.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 치명 이슈 없음.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟢 여유
