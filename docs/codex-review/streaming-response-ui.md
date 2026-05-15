# Codex 검토 — streaming-response-ui.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/streaming-response-ui.mdx
- 본문 라인 수: 212
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ⚠ | 구성은 완성형이나 기준보다 길고 코드 설명 비중이 큼 |
| 2. 인용 정확성 | ✓ | 검증한 URL 1개 / 발견 문제 0개(Vercel AI SDK URL redirect 확인) |
| 3. 가상 사례 라벨 | ✓ | line 212에 "10초 빈 화면" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 필수 외부 표준명으로 오해될 자체 명칭 없음 |
| 5. 정량 수사 | ⚠ | 도입부 10초/8초는 사례로 라벨링되어 있으나 본문 효과 수치로 읽힐 수 있음 |
| 6. Cross-reference | ✓ | L19/L21 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

### [CITATION-AMBIGUOUS] src/content/lessons/streaming-response-ui.mdx:28
quoted: "Vercel AI SDK \"Streaming\" — https://sdk.vercel.ai/docs"
url: https://sdk.vercel.ai/docs
verdict: URL은 살아 있으나 `https://ai-sdk.dev/docs/introduction`으로 redirect되고, 특정 Streaming/useChat 페이지가 아님.
suggested-fix: 가능하면 `streamText` 또는 `useChat`의 구체 페이지 URL로 교체.

### [STYLE-LENGTH] src/content/lessons/streaming-response-ui.mdx:1
quoted: "본문 라인 수: 212"
verdict: 기준 레슨보다 길어 초보 레슨치고 코드 구현 부담이 큼.
suggested-fix: 코드 블록을 산출물 템플릿으로 넘기고 본문은 핵심 흐름 중심으로 압축.

## Low / 제안

- "JSON은 스트리밍과 안 맞는다"는 설명은 좋은 연결점입니다. L21에서 다룰 내용을 한 문장만 더 구체화하면 cross-phase 연결이 더 좋아져요.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"스트리밍은 모델을 빠르게 만드는 기술이 아니라, 기다리는 시간을 사용자가 이해할 수 있게 만드는 UI 기술이에요."

learningGoals (5개, verb-led)
- SSE와 토큰 단위 전송의 기본 흐름을 설명해요
- 서버 라우트에서 스트리밍 응답을 중계해요
- React 클라이언트에서 토큰을 누적 렌더링해요
- AbortController로 중단 버튼을 구현해요
- 자동 스크롤과 사용자의 수동 스크롤을 구분해요

coreConcepts (4-5개)
- Server-Sent Events: 서버가 브라우저로 이벤트를 연속 전송하는 방식
- ReadableStream: 응답을 조각 단위로 읽고 전달하는 스트림 인터페이스
- Token Streaming: 모델 출력 조각을 생성되는 즉시 UI에 표시하는 패턴
- AbortController: 진행 중인 요청을 사용자가 중단하는 브라우저 API
- Auto-scroll Guard: 새 토큰과 사용자의 읽기 행동을 조화시키는 UI 규칙

reflectionQuestions (3-4개)
- 내 앱에서 스트리밍이 실제로 필요한 응답은 무엇인가요?
- 사용자가 중단 버튼을 누르면 서버와 로그는 어떻게 처리해야 하나요?
- JSON처럼 완성본이 필요한 응답은 일반 호출과 어떻게 나눌 건가요?

## 결론

가장 큰 문제: 특정성이 약한 Vercel AI SDK 인용과 긴 구현 본문.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
