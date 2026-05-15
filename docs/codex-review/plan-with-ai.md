# Codex 검토 — plan-with-ai.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/plan-with-ai.mdx
- 본문 라인 수: 161
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 비교표, 산출물 한 장, 더 깊이 보기/footer 있음 |
| 2. 인용 정확성 | ⚠ | 검증한 URL 2개 / 발견 문제 0개, 단 Plan Mode 세부는 최신 문서 섹션 확인 필요 |
| 3. 가상 사례 라벨 | ✓ | line 161에 "비밀번호 찾기 버튼" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | implementation-plan.md와 Stop Points가 외부 표준명 아님을 footer에 명시 |
| 5. 정량 수사 | ✗ | 실행 시간 절반, 5분 계획, 3시간 삽질 등 효과 수치가 반복 |
| 6. Cross-reference | ✓ | L05/L14 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/plan-with-ai.mdx:9
quoted: "이 의식 하나가 실행 시간을 절반으로 줄여줍니다."
verdict: 출처 없는 효과 수치.
suggested-fix: "되돌리는 시간을 줄이는 데 도움이 됩니다"로 완화.

### [UNVERIFIABLE-RHETORIC] src/content/lessons/plan-with-ai.mdx:15
quoted: "실행 시간의 절반 이상은 되돌리기에 쓰입니다."
verdict: 일반화된 정량 주장.
suggested-fix: "실행 시간의 상당 부분이 되돌리기에 쓰이는 경우가 많습니다"로 수정.

### [UNVERIFIABLE-RHETORIC] src/content/lessons/plan-with-ai.mdx:149
quoted: "5분 계획이 3시간 삽질을 막아요."
verdict: 강한 수사이며 출처 없음.
suggested-fix: "짧은 계획이 큰 되돌림을 줄여줘요"로 수정.

## Medium issues

- `docs.claude.com` 계열 URL은 실제로 `platform.claude.com` 또는 `code.claude.com`으로 redirect됩니다. 최종 URL로 주석을 정리하면 좋습니다.

## Low / 제안

- 본문에서 `git reset --hard`가 등장합니다. 가상 사례로 footer에 라벨은 있지만, 이 repo의 Stop Point와 충돌하지 않도록 "되돌리기"로 순화하는 선택도 가능해요.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 검증되지 않은 시간 절감 수사가 핵심 메시지에 박혀 있음.  
수정 후 예상 등급: 🟡  
Claude 적용 우선순위: 🔥 즉시
