# Codex 검토 — connect-ai-api.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/connect-ai-api.mdx
- 본문 라인 수: 209
- 종합 등급: 🔴

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ⚠ | 구조는 완성형이나 200라인대로 기준보다 긴 편 |
| 2. 인용 정확성 | ✗ | 검증한 URL 1개 / 발견 문제 1개(OpenAI API keys URL 불확실/대체 필요) |
| 3. 가상 사례 라벨 | ✓ | line 209에 "API 키 노출" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | Server Route 패턴이 운영자 정리임을 footer에 고지 |
| 5. 정량 수사 | ⚠ | "평균 2~10초, 길면 30초 이상" 출처 없음 |
| 6. Cross-reference | ✓ | L05/L06/L20 링크 정상 |

## Critical issues (즉시 수정)

### [CITATION-FAKE] src/content/lessons/connect-ai-api.mdx:9
quoted: "{/* Source · DOC · OpenAI \"API keys best practices\" — https://developers.openai.com/api/docs/api-keys */}"
url: https://developers.openai.com/api/docs/api-keys
verdict: WebFetch 표본 검증에서 해당 URL을 공식 문서로 확인하지 못함. OpenAI Help Center의 API key safety 문서가 실제 확인됨.
suggested-fix: 인용 URL을 https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety 로 교체.

## High issues

### [UNVERIFIABLE-RHETORIC] src/content/lessons/connect-ai-api.mdx:109
quoted: "AI API는 평균 2~10초, 길면 30초 이상 걸립니다."
verdict: 모델·입력·리전·벤더에 따라 크게 달라지는 수치이며 출처 없음.
suggested-fix: "AI API는 입력 길이와 모델 상태에 따라 몇 초 이상 걸릴 수 있어요"로 완화.

## Medium issues

- line 172의 "## 그래서 오늘 만들 폴더"는 기준 표현인 "한 폴더"와 미세하게 다름. 강제는 아니지만 일관성을 맞추려면 "## 그래서 오늘 만들 한 폴더" 권장.

## Low / 제안

- 실제 코드 블록이 긴 편이라 학습자에게 필요한 최소 흐름과 전체 예제를 분리하면 가독성이 좋아집니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"AI API 첫 호출의 핵심은 답을 받는 것이 아니라, 키를 숨기고 실패를 다루는 안전한 통로를 만드는 거예요."

learningGoals (5개, verb-led)
- 브라우저에서 API 키를 직접 노출하면 안 되는 이유를 설명해요
- `.env.local`과 서버 라우트로 키를 숨겨요
- OpenAI/Anthropic 첫 호출 코드를 비교해요
- 타임아웃·리트라이·에러 분리를 구현해요
- Rate Limit과 사용자별 제한의 기본 구조를 설계해요

coreConcepts (4-5개)
- Server Route: 브라우저 대신 서버가 벤더 API를 호출하는 프록시 패턴
- Environment Variable: 비밀 값을 코드 밖에서 주입하는 설정
- Timeout: 응답 대기 시간에 상한을 두는 장치
- Retry: 일시 장애를 조건부로 다시 시도하는 흐름
- Rate Limit: 요청 횟수와 비용 폭주를 막는 제한

reflectionQuestions (3-4개)
- 내 앱에서 API 키가 브라우저로 새어 나갈 가능성은 어디에 있나요?
- 사용자에게 보여줄 에러와 로그에만 남길 에러를 어떻게 나눌 건가요?
- 리트라이하면 안 되는 요청은 무엇인가요?

## 결론

가장 큰 문제: OpenAI API key 인용 URL 오류와 응답 시간 수치.  
수정 후 예상 등급: 🟡  
Claude 적용 우선순위: 🔥 즉시
