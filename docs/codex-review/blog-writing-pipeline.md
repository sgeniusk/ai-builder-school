# Codex 검토 — blog-writing-pipeline.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/blog-writing-pipeline.mdx
- 본문 라인 수: 179
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ⚠ | 구조는 좋지만 H2가 많고 일부 섹션이 기준보다 장황함 |
| 2. 인용 정확성 | ✓ | 검증한 URL 0개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 179에 "AI가 쓴 글" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 4단 편집 루틴 disclaimer 있음 |
| 5. 정량 수사 | ✗ | 70%, 60~70%, 80/20 효과 표현이 출처 없이 반복 |
| 6. Cross-reference | ✓ | L05/L08/L09/L10/L11 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/blog-writing-pipeline.mdx:59
quoted: "1단계: 아웃라인 — 여기서 70%가 결정됩니다"
verdict: 출처 없는 구체 비율.
suggested-fix: "아웃라인 — 방향이 크게 결정됩니다"로 완화.

### [UNVERIFIABLE-RHETORIC] src/content/lessons/blog-writing-pipeline.mdx:102
quoted: "이 초안은 60~70% 완성도예요."
verdict: 측정 기준 없는 완성도 수치.
suggested-fix: "이 초안은 출발점에 가까워요" 또는 "구조는 갖췄지만 사람의 편집이 필요해요"로 수정.

### [UNVERIFIABLE-RHETORIC] src/content/lessons/blog-writing-pipeline.mdx:145
quoted: "글쓰기의 80%를 AI가 가속하면서도 나머지 20%에서 내 목소리가 살아 있는 글"
verdict: 출처 없는 80/20 효과 주장.
suggested-fix: "반복 작업은 AI가 덜어주고, 마지막 판단에서 내 목소리를 살릴 수 있어요"로 완화.

## Medium issues

### [STYLE-TONE] src/content/lessons/blog-writing-pipeline.mdx:18
quoted: "| \"~합니다\" 체 일관 | 체를 섞어 쓰기도 |"
verdict: 본문 자체는 해요체 기준인데, 예시 표가 "체를 섞어 쓰기도"를 긍정처럼 읽힐 수 있음.
suggested-fix: "개인 문체의 리듬" 정도로 바꿔 제품 톤 기준과 충돌을 줄이기.

## Low / 제안

- AI 글이 "다 비슷하다"는 강한 일반화는 학습자 공감에는 좋지만, 본문 중간에 "그렇게 느껴지는 경우가 많아요" 정도로 낮추면 안전합니다.

## lessons.ts 보강 제안 (해당 시만)

해당 없음.

## 결론

가장 큰 문제: 출처 없는 정량 수사가 여러 곳에 남음.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🔥 즉시
