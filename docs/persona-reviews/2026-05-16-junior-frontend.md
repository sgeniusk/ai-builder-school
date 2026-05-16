---
persona: 오은비
slug: 2026-05-16-junior-frontend
journey: Engineer
level: L2
test-days: 10
verdict: "완주"
nps: 8
---

## 페르소나 프로필

오은비, 26세. 서울 강서구에 살고 종로의 시리즈A 스타트업에서 React 기반 어드민 화면을 1년째 만들고 있다. 점심 30분과 퇴근 후 카페 20분, 하루 50분이 학습 시간이다. 풀스택과 AI 시스템 빌더로 폭을 넓히고 싶다는 동기가 분명했다. "AI를 쓰는 사람에서, AI로 만드는 사람으로"라는 랜딩 카피가 1차로 꽂힌 이유다. 혼합 기기로 접속했고, Stage 5부터는 거의 데스크톱에 붙어 있었다.

## 10일 일지

- D1, 랜딩 → Engineer 여정 → Stage 1 L01·L02. 터미널은 이미 익숙해서 가볍게 통과.
- D2, Stage 1 L03·L04·L05. judgment-checklist.md 작성. "AI는 당신의 능력을 빼앗지 않습니다"라는 문장에서 한 번 멈춤.
- D3, Stage 2~3, 프롬프트·할루시네이션 검증. 회사 업무와 거리 있다고 느낌.
- D4, Stage 4·4a 본인 도구 박스 점검. Cursor 등 추천 도구로 워크플로우 정리.
- D5, Stage 5 진입. 5b `coding-agent-setup`은 만족. 5c `claude-md-four-principles`에서 "Karpathy 65줄" 카드 보고 멈춤.
- D6, Stage 5·L08 `harness-engineering-roadmap`. 6단계 로드맵이 한 lesson에 압축돼 50분 안에 못 끝냄.
- D7, Stage 6·6a `connect-ai-api`. 손에 코드 잡고 진행하는 흐름 회복.
- D8, 6a `conversation-storage-design`, `streaming-response-ui`. 가장 몰입했던 날.
- D9, 6b `structured-output-handling`, `function-calling`. JSON 스키마 검증까지 직접 구현.
- D10, 6c 후반. 미니 에이전트 루프 마무리하며 완주.

## 진척 결과

- 진행률 가중 평균 약 78%, 빌드 50·검증 30·회고 20 가중으로 사이드바 표기 78%.
- 완료 lesson 약 62/84.
- 빌드 산출물 6개(스트리밍 챗 UI, 구조화 출력 핸들러, function calling 데모, 미니 에이전트, RAG 답변 카드, 권한 설계 문서).
- 회고 노트 8개, 검증 체크리스트 4개.

## 막힌 지점 인용(3+)

1. Stage 5·L07 `claude-md-four-principles` 카드 "Karpathy 65줄" — Karpathy가 누구인지, 65줄이 어디서 온 숫자인지 컨텍스트 0. 주니어가 가져갈 게 없어 그냥 다음 카드로 넘김.
2. Stage 5·L08 `harness-engineering-roadmap` "하네스 엔지니어링 6단계" — 한 lesson에 6단계가 통째로 들어가 있어 50분 안에 1단계도 깊게 못 본다.
3. Engineer 여정 추천 lesson 6개에 "AI와 함께 구현 계획 세우기"는 있는데 `streaming-response-ui`처럼 프론트 UX의 핵심이 빠져 있어 여정 페이지만 보고는 본인이 진짜 배워야 할 게 어딘지 안 보인다.
4. Stage 5 도입 "이슈→계획→테스트→PR까지 한 사이클" 문장 다음에 메타 lesson 두 개가 연달아 나와 사이클 체험 흐름이 깨진다.

## UI/UX 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 정보 구조 | 4.2 | Stage 사다리 8단·6 Journey가 머릿속에 그려진다 |
| 시각 디자인 | 4.0 | 카드 위계는 깔끔, 메타 lesson 카드와 빌드 lesson 카드가 톤이 같아 구분 약함 |
| 모바일 반응형 | 3.6 | 사이드바 가중치 표기가 모바일에서 두 줄로 깨짐 |
| 네비게이션 | 4.2 | 사다리 → Stage → lesson 3-depth가 직관적 |
| 진척 표시 | 4.0 | "Stage 01 진행 0/7 레슨" 라벨이 명확, 단 가중 평균 계산식이 처음엔 모호 |
| 로딩·성능 | 4.0 | 카드 전환 빠름, 마크다운 본문 렌더 살짝 지연 |

평균 4.00, 항목 편차 ±0.2 이내(최대 4.2, 최소 3.6은 모바일 한정이라 평균엔 끌어내리는 폭 작음).

## 콘텐츠 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 실용성 | 4.2 | Stage 6·6a~6c는 실무에 바로 이식 가능 |
| 깊이 | 4.0 | function calling·RAG는 입문~중급 사이로 잘 잡힘 |
| 코드 정확성 | 4.0 | 스트리밍 UI 예제 동작 확인, 일부 타입 추론 보강 필요 |
| 학습 순서 | 3.8 | Stage 5에 메타 lesson 두 개가 빌드 흐름을 끊음 |
| 산출물 명확성 | 4.0 | judgment-checklist.md처럼 파일명까지 지정해 좋음 |

평균 4.00.

## lesson 미시 피드백(6+)

- `coding-agent-setup` — 첫 PR을 에이전트와 돌려본 경험이 압권. 회사 레포에서 그대로 응용.
- `streaming-response-ui` — React 훅 예제가 실전적. SSE 끊김 처리 한 단락 더 있으면 완벽.
- `structured-output-handling` — Zod 스키마 결합 흐름이 깔끔.
- `function-calling` — 권한 설계와 묶어서 보여줘 안전 감각이 같이 잡힘.
- `connect-ai-api` — env 분리·요금 알림까지 다뤄 입문 도장이 됐다.
- `claude-md-four-principles` — Karpathy 컨텍스트 부재. 인용 출처 한 줄만 있어도 다르다.
- `harness-engineering-roadmap` — 6단계를 6 lesson으로 쪼개거나, 1 lesson에서는 1단계만 깊게.

## 종합 의견

손에 코드를 잡고 가는 lesson에서는 학교가 약속한 "빌더 중심"이 잘 살아 있다. Stage 6·6a~6c가 학교의 척추다. 문제는 Stage 5다. 도입 카피는 "한 사이클을 돌린다"인데 안에 들어가면 메타·로드맵 lesson이 빌드 흐름을 끊는다. 주니어가 처음 코딩 에이전트와 페어 사이클을 도는 단계에서 65줄·6단계 같은 추상 카드가 끼면, 그 카드가 무게중심이 돼버리고 빌드 lesson이 곁다리가 된다. Engineer 여정 추천에 `streaming-response-ui`가 빠진 것도 같은 맥락에서 아쉽다. 추천 lesson은 "여정 표지판"인데 표지판에 핵심 도착지 하나가 빠져 있는 셈.

## 개선 제안 3개

1. Stage 5에서 `claude-md-four-principles`·`harness-engineering-roadmap`을 Stage 5의 "보너스 트랙"으로 분리하고, 메인 사다리에는 빌드형 lesson만 유지. Karpathy 65줄에는 클릭 가능한 원문 링크와 1줄 요지 추가.
2. Engineer 여정 추천 6 lesson에 `streaming-response-ui` 추가, 6개 → 7개로 확장하되 권한·방어 lesson도 함께 묶어 "프론트엔드 빌더 트랙" 부제를 단다.
3. 사이드바 "빌드 50·검증 30·회고 20" 가중치 계산식을 호버 툴팁으로 한 줄 노출하고, 모바일에서는 두 줄 깨짐 대신 칩 3개로 표기.
