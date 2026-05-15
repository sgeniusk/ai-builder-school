# Codex 검토 — github-issue-to-ai-brief.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/github-issue-to-ai-brief.mdx
- 본문 라인 수: 169
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | 구체 Hook, 비교표, 브리프 템플릿, 산출물 폴더, footer 모두 있음 |
| 2. 인용 정확성 | ✓ | 검증한 URL 0개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 169에 "로그인 버그" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 4축 구조가 L05 번역이며 외부 표준명 아님을 footer에 명시 |
| 5. 정량 수사 | ⚠ | "5분이 30분을 아끼는"은 예시로 읽히지만 출처 없는 효과 표현 |
| 6. Cross-reference | ✓ | L05/L06/L15 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/github-issue-to-ai-brief.mdx:147
quoted: "브리프를 쓰는 5분이 30분을 아끼는 투자예요."
verdict: 교육적 예시지만 실제 시간 절감으로 읽힐 수 있음.
suggested-fix: "브리프를 쓰는 몇 분이 되돌리는 시간을 줄여주는 경우가 많아요"로 완화.

## Low / 제안

- 템플릿 내부 H2가 실제 본문 H2로 잡히므로 TOC가 길어질 수 있습니다. MDX 렌더러가 코드블록 내부 헤딩을 무시하는지 확인하면 좋습니다.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 작은 정량 수사 하나.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
