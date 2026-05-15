# Codex 검토 — letting-ai-read-codebase.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/letting-ai-read-codebase.mdx
- 본문 라인 수: 168
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 방법 비교표, 산출물 한 장, 더 깊이 보기/footer 모두 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 1개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 168에 "파일 200개 프로젝트" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 계층적 README와 3방법이 운영자 정리임을 footer에서 고지 |
| 5. 정량 수사 | ⚠ | "80%만 맞아도 첫 시도 정확도 상승"은 출처 없음 |
| 6. Cross-reference | ✓ | L07/L13/L14 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/letting-ai-read-codebase.mdx:126
quoted: "80%만 맞아도 에이전트의 첫 시도 정확도가 확연히 올라갑니다."
verdict: 출처 없는 비율 + 효과 표현.
suggested-fix: "완벽하지 않아도 에이전트가 첫 시도에서 참고할 기준이 생깁니다"로 완화.

## Medium issues

(없음)

## Low / 제안

- Repomix는 공식 URL을 확인했지만, 사용법이 바뀔 수 있으므로 footer처럼 "버전 확인" 고지가 적절합니다.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 80% 효과 수사.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
