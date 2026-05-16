---
persona: 류재훈
slug: 2026-05-16-backend-dev-skeptic
journey: Engineer
level: L3
test-days: 10
verdict: "부분 완주"
nps: 6
---

## 1. 페르소나 프로필

류재훈, 29세, 핀테크 백엔드 개발자 3년차, Java/Spring 메인. 사내 결제 모듈·정산 잡 운영 경험이 있어 캐싱·rate-limit·async batch 같은 시스템 설계 감각은 있다. AI는 본업에서 적용 시점이 다가오는 게 느껴지지만, RAG·Agent 강좌가 시중에 범람해 "어디까지가 진짜고 어디까지가 마케팅인지"가 안 잡혀 학교를 한 번 돌고 직접 판단하기로 했다. 끈기 중간 — 본인 시간을 잘 안 깎는다. 의심 높음 — 카드 카피와 본문이 어긋나면 그 lesson은 평점이 즉시 떨어진다.

## 2. 10일 일지

- Day 1 — 랜딩 "AI로 만드는 사람으로" 카피는 무난, /start → Engineer L3 배정
- Day 2 — Stage 1·2 한 시간 만에 통과, "Engineer L3한테 1~2가 왜 필수인가" 의문 메모
- Day 3 — Stage 3·4 한 시간 만에 통과, "확인하다·함께일하다" 영역은 페어 프로그래밍 경험과 겹침
- Day 4 — Stage 5 `coding-agent-setup`·`plan-with-ai` 본격 진입, Codex/Claude Code 둘 다 사내 PoC로 돌려봄
- Day 5 — Stage 5 `write-tests-with-coding-agent` 본인 Spring 프로젝트에 적용, Junit 생성 품질 검증
- Day 6 — Stage 6a `connect-ai-api`·`structured-output-handling` 통과, Java 예제가 없어 본인이 변환
- Day 7 — Stage 6b `understanding-embeddings`·`grounded-rag-answers` 학습, RAG 본문 만족
- Day 8 — Stage 6b 통과, Stage 6c 카드 미리 보고 "Agent는 운영 리스크 너무 큼" 판단으로 6c 진입 보류
- Day 9 — Stage 6c·7·8 카드만 둘러보고 본인 트랙에는 안 맞는다 결론, 학습 일시 중단
- Day 10 — 사내 동료 한 명에게 학교 보여주고 "Stage 6b까지는 추천, 6c부터는 본인 판단" 인계, NPS 6

## 3. 진척 결과

10일 차 Stage 6b 종료, Stage 6c·7·8 미진입. 84 lesson 중 49개 학습. 사이드바 "커리큘럼 0/84 완료" 카운터 49/84. 본업에 적용한 건 `plan-with-ai`·`write-tests-with-coding-agent`·`grounded-rag-answers` 세 lesson, 사내 사양서 RAG PoC 한 건. Stage 6c·7을 끝까지 안 간 이유는 본인 표현으로 "Agent 운영 리스크 통제 자료가 부족했고, Stage 7도 카드 무게에 비해 9 lesson은 얇아 보였다". NPS 6.

## 4. 막힌 지점 인용

> "Stage 6c L12 `mini-agent-loop` 카드에 'ReAct 스타일 Thought/Action/Observation 루프를 5-15회 반복'이라고만 적혀 있다. 토큰 폭발 통제 코드, 즉 max_steps·token_budget·no_progress 가드가 카드 박스에 한 줄도 안 보인다. Engineer L3한테 카드만으로는 진입 의지가 안 선다."

> "Engineer 여정 추천 lesson 6개에 '구현 계획 · 테스트 · RAG · 미니 에이전트 · 도구 권한 · Prompt Injection 방어'가 들어 있다. 보안 lesson은 있는데 캐싱·rate-limit·async batch 같은 시스템 설계 lesson이 없다. 실제 운영에 들어가면 토큰 단가보다 동시성 폭발이 먼저 터진다."

> "Stage 7 카드에 'Eval·관측·정책·비용 루프를 깔아, 만든 AI 시스템을 운영 단계로 끌어올린다'라고 적혀 있는데, 9 lesson에 네 축을 다 박는 건 무리다. 운영 경험이 있는 사람 입장에서 보면 네 축 중 어느 하나도 9 lesson 분량으로는 안 끝난다."

## 5. UI/UX 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 정보 구조 | 3.8 | 사다리·여정·루프가 좌측에 동시에 보이지만, Engineer L3 진단 후에도 1~4가 강제로 켜져 있다 |
| 시각 디자인 | 3.6 | 카드·코드 블록은 단정하지만 카피와 본문 사이 미스매치가 자주 보였다 |
| 네비게이션 | 3.5 | Stage 간 이동은 좋으나 "이미 아는 lesson 일괄 완료" 단축 동선이 없다 |
| 반응 속도 | 4.2 | 데스크톱에서 lesson 전환·검색 응답 모두 빠르다 |
| 모바일 대응 | 3.0 | 모바일은 거의 안 봤지만 폰으로 본 lesson은 코드 블록 줄바꿈이 어지러웠다 |
| 접근성 | 3.6 | 키보드 탐색·복사 버튼은 좋고, 다만 코드 블록 언어 표시가 일관되지 않았다 |

평균 3.62, 본인 보고치 3.6과 일치.

## 6. 콘텐츠 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 정확성 | 4.0 | 본문 사실 자체에 큰 오류는 없다 |
| 깊이 | 3.2 | Stage 6 16개 lesson 중 절반은 Anthropic/OpenAI SDK 호출 반복, 깊이가 분산돼 있다 |
| 실전성 | 3.5 | RAG는 실전적, Agent와 운영은 카드 무게 대비 본문이 얇다 |
| 톤 | 3.7 | "AI로 만드는 사람으로" 톤은 좋지만 Engineer L3에게는 가끔 가벼워 보인다 |
| 한국어 품질 | 3.6 | 한국어는 깔끔하나 Java/Spring 예제 부재로 본인 환경 매핑에 추가 시간 들어갔다 |

평균 3.60, 본인 보고치 3.6과 일치.

## 7. lesson 미시 피드백

| lesson | 점수 | 메모 |
|---|---|---|
| plan-with-ai | 5 | 계획 분해·검토 패턴이 본인 PR 워크플로에 그대로 적용 가능 |
| write-tests-with-coding-agent | 5 | Junit·Pytest 두 갈래 예제만 있으면 더 좋겠지만 골자는 정확 |
| understanding-embeddings | 4 | 임베딩 개념 본문은 좋고, 벡터 DB 선택 비교는 한 단계 얕다 |
| grounded-rag-answers | 5 | 거절 패턴·근거 표기 흐름은 본업 사양서 RAG에 적용 가능 |
| mini-agent-loop | 3 | 종료 조건 코드 베이스라인이 없어 Engineer L3가 카드만으로 못 진입 |
| tool-permission-safeguards | 3 | "Read-Only / Write / External Side-Effect 3등급" 프레임은 좋으나 실제 IAM/감사 로그 매핑 부재 |

## 8. 종합 의견

학교의 Stage 5·6a·6b는 백엔드 3년차에게도 본업 적용 가치를 만들어 줄 수 있는 수준이다. 다만 Engineer 여정이라고 이름 붙이고 추천 lesson에 캐싱·rate-limit·async batch 같은 시스템 설계 자료를 빼놓은 점은 명백한 누락이다. Stage 6c와 7은 카드 무게에 비해 본문이 따라가지 못하는 영역이라 본인이 진입을 보류한 것이 합리적이라고 판단된다. Engineer L3 진단을 받은 사람한테는 사다리 강제가 아니라 "어디까지 가도 좋다"의 선택지를 정직하게 보여 주는 게 신뢰가 올라간다.

## 9. 개선 제안 3가지

1. Engineer 여정 추천 lesson 6개에 "캐싱·rate-limit·async batch" 시스템 설계 lesson 2~3개 신설, 보안 lesson 일색을 풀기
2. Stage 6c `mini-agent-loop` 카드 박스에 종료 조건 3종(max_steps·token_budget·no_progress) 코드 한 줄씩이라도 노출, 카드 단계에서 통제 감각 제공
3. Stage 7 카드 문구를 "Eval·관측·정책·비용 중 1~2축을 골라 깊게"로 바꾸고, lesson 9개를 네 축 균등 분배가 아니라 축별 트랙으로 재구성
