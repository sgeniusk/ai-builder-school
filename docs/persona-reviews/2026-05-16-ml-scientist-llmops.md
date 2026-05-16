---
persona: 김태성
slug: 2026-05-16-ml-scientist-llmops
journey: Engineer
level: L3
test-days: 10
verdict: "부분 완주"
nps: 5
---

## 1. 페르소나 프로필

김태성, 34세, 판교 중견 IT 데이터 사이언티스트. 이전 직장에서 추천 모델·이상 탐지 ML 파이프라인을 운영했고, 현재 회사에서는 LLM 도입과 LLMOps 셋업 책임. Promptfoo·Langfuse·OpenTelemetry GenAI 같은 도구를 이미 비교 중. 학교를 평가한 동기는 "사내 신입·주니어 데이터 엔지니어에게 추천할 만한 한국어 교재인지" 검토. 끈기 중간 — 본업 일정이 우선이라 학습 시간을 늘 깎인다. 의심 높음 — 본문 한 줄을 실무 인프라(예: IAM·VPC·Secrets Manager)와 매핑 안 되면 즉시 평점이 떨어진다.

## 2. 10일 일지

- Day 1 — /start → Engineer L3, Stage 1~2는 사다리 의도 확인용으로 빠르게 통과
- Day 2 — Stage 3·4까지, 본인 ML 운영 경험과 카피의 거리 메모
- Day 3 — Stage 5 `coding-agent-setup`·`plan-with-ai`, 코딩 에이전트 자체는 본업 보조 도구로 무난
- Day 4 — Stage 6a `connect-ai-api`·`structured-output-handling`, 운영 관점에서 부족한 점 메모(키 회전·시크릿 매니저 매핑 부재)
- Day 5 — Stage 6b 통과, 한국어 임베딩·재랭킹 비교 자료가 본문에 거의 없어 외부 자료로 보완
- Day 6 — Stage 6c `mini-agent-loop`·`tool-permission-safeguards` 학습, 프레임은 좋지만 실제 인프라 매핑 부재
- Day 7 — Stage 7 진입, `evals-for-ai-coded-prs`·`llm-observability-and-regression` 본문에 가장 큰 기대
- Day 8 — 평가·관측 lesson 분량이 9개 중 3개로 적어 본인이 바라는 깊이에 못 미침
- Day 9 — Stage 7 마무리, Stage 8 카드만 보고 사내 적용 우선 도구·트랙을 자체 결정
- Day 10 — 사내 주니어 두 명에게 학교 일부 lesson만 추천(Stage 5·6b 한정), NPS 5

## 3. 진척 결과

10일 차 Stage 7 종료, Stage 8 도입까지. 84 lesson 중 62개 학습. 사이드바 "커리큘럼 0/84 완료" 카운터 62/84. 본업 적용은 `evals-for-ai-coded-prs`의 골든 셋 운영 방식 1건, `llm-observability-and-regression`의 회귀 감지 패턴 1건. 사내 LLMOps 셋업 결정에는 학교 자료보다 Anthropic·OpenAI 공식 문서와 Langfuse 커뮤니티 사례를 더 많이 참조. NPS 5는 "주니어용으로는 좋지만, 운영자 관점은 부재"라는 평.

## 4. 막힌 지점 인용

> "Stage 7 lesson 9개 중 평가·관측이 3개다. 운영 단계의 핵심이 평가와 관측인데 분량이 정책·비용과 동일 비중이면, LLMOps 셋업 책임자한테는 깊이가 한 칸 부족하다. Promptfoo·Langfuse 도구 카드 박스에는 적혀 있는데 본문은 개념 위주에 그친다."

> "Stage 6c L13 `tool-permission-safeguards` 카드 문구 'Read-Only / Write / External Side-Effect 3등급으로 분류하고, Allow-List · Human-in-the-Loop · 샌드박스 · 감사 로그 4축'은 프레임으로 정확하다. 다만 실제 운영에서는 이 4축이 AWS IAM·VPC·Secrets Manager·CloudTrail 같은 인프라 컴포넌트와 매핑돼야 동작한다. 본문에 인프라 매핑이 한 줄도 없어, 사내 보안팀 리뷰에 가져갈 수가 없다."

> "학교 톤이 '빌더 중심'이라는 점은 카피로 일관되지만, 운영자 관점에서 보면 빌드 이후의 사고·롤백·사후 분석 자료가 약하다. '운영 단계로 끌어올린다'고 적어 놓고 실제 운영자 시나리오(예: 회귀 발생 시 트래픽 차단·롤백 절차)는 lesson 본문에 없다."

## 5. UI/UX 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 정보 구조 | 3.6 | 8 Stage·6 Journey·7-step 학습 루프가 명료, 다만 Stage 7 안에서 평가·관측·정책·비용 4축 필터가 없다 |
| 시각 디자인 | 3.5 | 한국어 폰트·코드 블록 가독성 안정, 다이어그램이 한두 장 더 있었으면 좋다 |
| 네비게이션 | 3.3 | "이미 본 lesson을 그룹으로 일괄 완료" 동선이 없어 본인이 수동으로 클릭 |
| 반응 속도 | 4.0 | lesson 전환·검색 응답 일관되게 빠르다 |
| 모바일 대응 | 3.0 | 모바일 미사용에 가까움, 폰으로 본 다이어그램은 깨졌다 |
| 접근성 | 3.2 | 키보드 탐색은 좋지만 도구 사이드바 약어가 hover 풀이 없이 노출됐다 |

평균 3.43, 본인 보고치 3.4와 일치.

## 6. 콘텐츠 평가표

| 항목 | 점수 | 근거 |
|---|---|---|
| 정확성 | 3.8 | 본문 사실 자체는 무난, 다만 LLMOps 도구 비교 부분에서 버전·기능 추적이 한 박자 늦다 |
| 깊이 | 2.8 | 평가·관측 lesson 본문이 개념 위주, 운영자에게 필요한 detail이 부재 |
| 실전성 | 3.0 | RAG·Agent 빌드는 실전적, 운영 시나리오는 카드 무게 대비 본문이 얇다 |
| 톤 | 3.2 | "빌더 중심" 톤이 운영자 시점에는 일부 어긋난다 |
| 한국어 품질 | 3.3 | 한국어는 깔끔, LLMOps 용어가 한국어·영어 혼용이라 사내 추천 시 마찰이 있다 |

평균 3.22, 본인 보고치 3.2와 일치.

## 7. lesson 미시 피드백

| lesson | 점수 | 메모 |
|---|---|---|
| evals-for-ai-coded-prs | 4 | 골든 셋·자동 평가 흐름은 좋고, 운영 골든 셋 버전 관리 박스가 추가되면 더 좋다 |
| llm-observability-and-regression | 4 | 회귀 감지 패턴이 실전적, Langfuse·OpenTelemetry GenAI 매핑 예제가 본문에 부재 |
| ai-output-eval-for-pms | 4 | PM용 평가 흐름이 명료, 운영자용 자동화 버전 lesson과 분리 권장 |
| tool-permission-safeguards | 3 | 4축 프레임 정확, 실제 인프라(IAM·VPC·Secrets Manager·CloudTrail) 매핑 부재 |
| mini-agent-loop | 3 | ReAct 본문은 좋지만 운영 관점의 에이전트 사고 분석·롤백 자료 없음 |
| ai-app-cost-and-usage | 3 | 비용 본문이 단가표 위주, 운영 비용 예산 알림·캡 정책 자료가 빠짐 |

## 8. 종합 의견

학교는 빌더 중심 한국어 교재로서는 사다리·여정·루프가 일관되게 짜여 있고, 사내 주니어 데이터 엔지니어가 "한국어로 LLM 빌드 한 사이클"을 보는 데에는 충분히 추천할 만하다. 다만 LLMOps 셋업 책임자 관점에서 보면 운영 사고 시나리오·인프라 매핑·평가/관측 분량이 한 칸씩 부족해 본인 일에는 직접 가져다 쓰기 어렵다. Stage 7을 운영자용 트랙으로 한 단계 확장하면, 학교의 잠재 독자층이 빌더에서 운영자까지 넓어진다.

## 9. 개선 제안 3가지

1. Stage 7의 9 lesson을 평가/관측 5 lesson, 정책 2 lesson, 비용 2 lesson 비중으로 재조정, 평가·관측 본문에 Promptfoo·Langfuse·OpenTelemetry GenAI 실제 코드 예제 박스 추가
2. Stage 6c `tool-permission-safeguards` 본문에 "4축 → AWS IAM·VPC·Secrets Manager·CloudTrail 매핑" 표 한 장 추가, 운영자용 매핑 자료로 활용
3. 7-step 학습 루프 끝에 "운영자 트랙 — 빌드 이후 사고·롤백·사후 분석" 8번째 step 옵션을 신설, "빌더 중심" 톤 안에서 운영자 관점을 분리 표기
