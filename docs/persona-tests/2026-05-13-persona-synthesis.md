# AI Builder School — 페르소나 12명 통합 synthesis (2026-05-13)

이 문서는 같은 폴더의 두 batch 보고서 — [Batch A (practitioner/adopter/creator)](./2026-05-13-codex-persona-batch-a.md) 와 [Batch B (founder/engineer/explorer)](./2026-05-13-codex-persona-batch-b.md) — 의 cross-인사이트와 우선순위 액션을 묶은 통합 합본이에요. Batch 보고서는 코덱스가 작성했고, 이 통합 합본은 Claude 가 두 보고서의 신호와 듀이 1차 결과(`/tmp/dewey-context-snapshot.md` 스냅샷)를 함께 보고 합성했습니다.

평가 기준 — 우리 브랜치(`claude/infallible-cray-0abc4e`) 의 35 lesson commit 직후 상태. 듀이가 main 워크트리에서 보강 중인 신규 23 lesson + 메타데이터 확장 작업은 이번 평가 대상이 *아닙니다*.

## 0. 한 장 요약 — TL;DR

- **12 페르소나 완주 가능성 평균 — 3.34 / 5**. Batch A 3.25, Batch B 3.42. 후반 journey 가 약간 친절했지만 차이는 작아요.
- **가장 큰 결 — 지능대 비대칭**. 20대 고지능 6명 평균 **3.92** vs 30대 중지능 6명 평균 **2.92**. **격차 1.0 점**. 같은 lesson 을 두고 한 그룹은 *심화* 로 받고, 한 그룹은 *내 길이 아니다* 로 읽어요.
- **핵심 진단** — 난이도 하향 문제가 아니에요. **같은 lesson 안에서 역할별 통과 경로가 없다** 가 진짜 문제. 빠른 학습자는 더 멀리 가고 싶어 하고, 바쁜 학습자는 더 작게 끝나고 싶어 하고, 회의적 시니어는 더 검증된 길을 원해요. 세 욕구는 충돌하지 않아요. 같은 lesson 아래에 "표 루트 / 명세 루트 / 코드 루트 / 운영 루트" 분기만 있으면 셋 다 같은 학교에 남아요.
- **가장 위험한 lesson — `enforcing-output-format`**. 9 페르소나가 이탈 위험을 보였어요. 비개발자에게 JSON·Node.js 가 너무 빨리 등장.
- **빈 Phase 영향 — 모든 journey 가 영향받음**. Phase 0 보편, Phase 8 creator, Phase 9 founder·practitioner, Phase 10 engineer·adopter.
- **즉시 권고 P0 3건** — Phase 0 채우기 / `enforcing-output-format` 다중 루트 / Phase 8·9·10 브릿지. 듀이가 main 에서 *이미 일부 작업 중*.

## 1. 페르소나 12명 종합 점수표

| code | journey | 페르소나 | 지능·연령 | 완주 가능성 |
|---|---|---|---|---|
| PA1 | practitioner | 26세, 대기업 신입 PM | 20대 고지능 | **4.0** |
| PA2 | practitioner | 34세, 중소기업 회계 7년차 | 30대 중지능 | 3.0 |
| AD1 | adopter | 28세, B2C 스타트업 PM 2년차 | 20대 고지능 | 3.5 |
| AD2 | adopter | 36세, 제조 중간관리자 | 30대 중지능 | **2.5** |
| CR1 | creator | 25세, 유튜브 N년차 | 20대 고지능 | 3.5 |
| CR2 | creator | 38세, 동네 카페 사장 8년차 | 30대 중지능 | 3.0 |
| FO1 | founder | 27세, 예비창업 재학생 | 20대 고지능 | **4.0** |
| FO2 | founder | 33세, 자영업 5년차 (오프→온) | 30대 중지능 | **2.5** |
| EN1 | engineer | 24세, 백엔드 1.5년차 | 20대 고지능 | **4.2** |
| EN2 | engineer | 35세, 데이터분석 7년차 시니어 | 30대 중지능 | 3.6 |
| EX1 | explorer | 22세, CS 대학원 1학기 | 20대 고지능 | **4.3** |
| EX2 | explorer | 31세, 고시 끝나고 전직 모색 | 30대 중지능 | 2.9 |

- **고지능 6명 평균 3.92** — 한 명도 3.5 미만 없음. 가장 위(EX1 4.3)와 가장 아래(AD1·CR1 3.5)의 격차도 0.8 점에 머묾.
- **중지능 6명 평균 2.92** — 둘이 2.5 (AD2·FO2), 셋이 3.0 안팎. EN2 만 3.6 으로 *경험에서 끌어올림*.
- **격차 1.0 점** — 같은 학교가 두 그룹에 두 다른 인상을 줘요.

## 2. Cross-인사이트 — 5가지 발견

### 2.1 지능대 비대칭 — 1.0 점 격차의 정체

차이는 *능력* 이 아니에요. **시간 · 맥락 전환 비용 · 영어/개발자 용어 첫 반응** 의 차이입니다.

- 20대 고지능 — JSON, schema, Front Matter, GitHub, RAG, Function Calling 을 *학습 대상* 으로 읽음. lesson 이 완벽하지 않아도 자기 목적에 맞게 재조립
- 30대 중지능 — 같은 단어가 *"내가 들어오면 안 되는 문"* 으로 읽힘. 친절한 한국어 설명이 본문에 있어도 *첫 인상* 이 이미 갈라짐. PA2 의 가족 케어 / FO2 의 매장 운영 / EX2 의 전직 불안 — 이들에게 필요한 건 더 쉬운 설명이 아니라 *더 작은 완료 단위*

**시사점** — 난이도를 낮추면 EN1·EX1 이 떠나고, 그대로 두면 FO2·EX2 가 떠나요. 분기만이 답이에요.

### 2.2 Journey 친절도 순위 — engineer > practitioner > explorer > creator > adopter > founder

| journey | 평균 | 평가 |
|---|---|---|
| engineer (EN1·EN2) | **3.90** | 가장 선형적으로 친절. `coding-agent-setup`·`grounded-rag-answers`·`tool-permission-safeguards` 가 신뢰의 뼈대. 단 Phase 10 빈칸으로 EN2 가 멈춤 |
| practitioner (PA1·PA2) | 3.50 | Phase 1~3 이 강함. 1.4 트러스트 체크 · 3.x 자동화 파이프라인이 실무 직결 |
| explorer (EX1·EX2) | 3.60 | EX1 4.3 이 끌어올림. EX2 2.9 가 *Phase 3 뒤에 어디 가야 할지* 막힘 — *다음 여정 선택 장치* 부재 |
| creator (CR1·CR2) | 3.25 | `blog-writing-pipeline` 강점이 있지만 Phase 8 부재가 *멀티모달 promise* 를 정면으로 흔듦 |
| adopter (AD1·AD2) | 3.00 | AD2 가 보안·승인·검증·팀 전파에서 계속 흔들림. *조직 도입* promise 와 lesson 의 *개인 빌더* 톤이 어긋남 |
| founder (FO1·FO2) | **3.25 (격차 1.5 가장 큼)** | FO1 4.0 vs FO2 2.5. 한 journey 안에서 가장 큰 비대칭. 코딩 founder 와 비개발 founder 가 같은 길을 걷는 가정이 무리 |

### 2.3 가장 위험한 lesson — `enforcing-output-format`

12 페르소나 중 **9명** 이 이 한 lesson 에서 이탈 위험 또는 큰 흔들림을 보였어요. 듀이도 1차에서 같은 결을 잡았어요.

| 페르소나 반응 | 코드 |
|---|---|
| 직접 이탈 위험 — *"내 길이 아니다"* | PA2 · AD2 · CR2 · FO2 · EX2 |
| 이해는 하나 *"내 journey 중심인가?"* 의문 | PA1 · AD1 · CR1 |
| 좋은 심화 / 흥미로움 | EN1 · EX1 |
| 개념 OK 단 *R/SQL 분석가 예시 없음* | EN2 |
| `journey` 와 적합 | FO1 |

**문제는 주제가 아니라 실행 경로의 폭** — 구조화 출력은 모두에게 필요하지만, 본문은 *"자동화 시스템을 만드는 사람"* 톤. practitioner 는 Excel/Sheets/Markdown 표 루트, adopter 는 *개발자에게 넘길 명세* 루트, creator 는 Notion/콘텐츠 캘린더 표 루트, engineer 는 직접 구현 루트, 데이터분석가는 SQL/R 컬럼 매핑 루트로 갈라져야 해요.

### 2.4 빛나는 lesson Top 5

| lesson | 빛난 페르소나 | 왜 빛났나 |
|---|---|---|
| `coding-agent-setup` | FO1·EN1·EN2 | 코딩 에이전트를 *"무작정 맡기는 도구"* 에서 *"안전한 작업 동료"* 로 바꿔주는 권한·범위 정의 |
| `grounded-rag-answers` | EN1·EN2·FO1 | 신뢰 가능한 AI 시스템의 *근거 기준* 을 선명하게 줌. Phase 6 의 capstone 답게 작동 |
| `research-workflow` | PA1·AD1·AD2 | AI 속도와 *근거 검증* 을 함께 잡는 모범. 실무 신뢰의 첫 lesson |
| `blog-writing-pipeline` | CR1·CR2 | *"AI 가 내 일을 침범하는 게 아니라 보조한다"* 는 감각. creator 친화 lesson 의 표본 |
| `what-is-a-loop` | EX1·EX2·CR1·PA1 | 모든 journey 가 공유할 수 있는 *학교의 첫 출발선*. 루프 어휘가 다른 lesson 의 해석 도구가 됨 |

**공통 패턴** — 빛난 lesson 은 ① 도입 시나리오가 *학습자의 일상* 에 가깝고 ② 산출물이 *한 장* 으로 끝나고 ③ 이전·다음 lesson 과의 *역할* 이 본문에 명시되어 있어요.

### 2.5 빈 Phase 의 실제 영향

| Phase | 비어 있는 영향 | 가장 흔들리는 페르소나 |
|---|---|---|
| **Phase 0** (오리엔테이션) | *시작 신뢰* 손상. 모든 journey 가 추천하는데 lesson 0개 — 학습자가 *"내가 이 학교 대상인가"* 를 스스로 판정해야 함 | FO2·AD2·CR2·PA2·EX2 (중지능 5명) |
| **Phase 8** (멀티모달) | creator promise 를 정면으로 흔듦. 텍스트 lesson 만으로는 *영상·이미지 creator* 가 반쪽으로 느낌 | CR1·CR2 |
| **Phase 9** (데이터 의사결정) | 출시 후 *측정* 단절. founder MVP 와 practitioner 실무 판단 다리 끊김 | FO1·FO2·PA1·PA2 |
| **Phase 10** (Eval·Security) | engineer promise *"운영 가능"* 마지막 검증 없음. 회의적 시니어가 마지막 신뢰 못 얻음 | EN2·AD2·EN1 |

듀이가 main 에서 **Phase 0 신규 4 lesson (`zero-coding-orientation` · `terminal-first-day` · `ai-tool-account-and-cost` · `privacy-and-academic-ethics`)** 를 이미 만들고 있다는 사실 — 이번 페르소나 신호와 **정확히 일치**. 우리 평가가 듀이 직관을 *데이터로 뒷받침* 함.

## 3. 듀이 1차 결과와의 종합 비교

| 영역 | 듀이 1차 결 | 페르소나 12명 결 | 판정 |
|---|---|---|---|
| `enforcing-output-format` 급경사 | 어렵다 — 비개발자 우회 박스 필요 | 9 페르소나가 흔들림. *역할별 4 루트* 권고로 더 구체화 | **🟢 강력 동의** |
| Phase 0·8·9·10 빈칸 | 부재로 여정 단절 | 페르소나별 *어느 Phase 가 누구를 끊는지* 매핑 완료 | **🟢 강력 동의 + 데이터** |
| 글쓰기 일관성 (P0) | 명사화·"효과적인"·쉼표 과다 | walkthrough 톤은 *Phase 1~3 따뜻함 vs Phase 4~7 압축적* 격차 확인 | **🟢 동의** |
| `targetJourneys` 6개 다 붙음 | 메시지 흐릿 | walkthrough 결: 넓은 target 보다 *"도메인 예시 부족"* 이 더 큰 문제 (`blog-writing-pipeline` 처럼 넓어도 핵심 불안 찌르면 친절함) | **🟡 시각 다름** |
| 시간 가드레일 부족 | 45분이 진짜 45분인지 | walkthrough 결: 시간보다 *"통과 방식의 분기"* 가 더 핵심. 같은 50분이라도 *명세로 끝/코드까지/평가까지* 가 달라야 함 | **🟡 시각 다름** |
| Phase 4 권한 모델 | 어렵다 | walkthrough 결: FO1·EN1·EN2 에게는 **신뢰를 올리는 강점**. 듀이 직관과 반대 | **🔴 충돌** |
| `ai-app-cost-and-usage` | 1차에서는 큰 결 없음 | adopter·creator 에는 전제 불일치 / founder 에는 잘 맞음 / engineer 에는 Phase 10 빈칸 뒤라 운영 평가 빠진 느낌 | **🆕 새 발견** |
| 다음 여정 선택 장치 | 명시 안 됨 | EX2 같은 explorer 가 Phase 3 뒤 *어디로 가야 할지* 막힘 | **🆕 새 발견** |
| founder journey 내부 비대칭 | 명시 안 됨 | FO1 4.0 vs FO2 2.5 — *코딩 founder 와 비개발 founder* 가 한 길을 걷는 가정이 무리 | **🆕 새 발견** |

**종합** — 큰 결 (P0 글쓰기·빈 Phase·`enforcing-output-format`) 은 듀이와 강력 동의. Phase 4 권한 모델은 *대상 페르소나에 따라 정반대 신호* — 단일 평가가 아닌 *역할별 평가* 가 필요함이 드러남. 새 발견 3건 (`ai-app-cost-and-usage` 전제 / 다음 여정 선택 / founder 내부 비대칭) 은 듀이 다음 사이클의 작업 후보.

## 4. 우선순위 액션 12건

### P0 — 즉시 (Q2 안에)

**A1. `enforcing-output-format` 에 *역할별 4 루트* 박스 추가** *(M)*
- 근거 — 12명 중 9명 이탈 위험 (PA2·AD2·CR2·FO2·EX2 직접 / PA1·AD1·CR1 약함 / EN2 도메인 예시 부족)
- 제안 — 본문 끝에 박스 4개: ① *표로 끝내기* (practitioner·creator·비개발 founder) ② *명세서로 넘기기* (adopter) ③ *직접 구현* (engineer·기술 founder) ④ *SQL/R 컬럼 매핑* (EN2 형 데이터분석가)
- 효과 — 단일 lesson 한 곳만 손봐도 5명 페르소나의 흔들림이 줄어듦

**A2. Phase 0 채우기** *(L — 듀이가 이미 진행 중)*
- 근거 — 30대 중지능 5명이 시작 신뢰 잃음. 모든 journey 가 추천하는데 lesson 0개
- 제안 — 듀이가 main 에서 작업 중인 `zero-coding-orientation` · `terminal-first-day` · `ai-tool-account-and-cost` · `privacy-and-academic-ethics` 4 lesson 의 *비개발자 입구 톤* 검증 후 머지
- 효과 — PA2·AD2·CR2·FO2·EX2 의 *완주 가능성 + 0.4~0.7 점* 추정

**A3. Phase 8·9·10 *브릿지 노트* 1건씩** *(S — 완성 lesson 전 가교)*
- 근거 — Phase 8 creator / Phase 9 founder·practitioner / Phase 10 engineer·adopter promise 가 끊김
- 제안 — 각 Phase 첫 화면에 *"이 Phase 의 lesson 은 추후 추가됩니다. 지금까지 만든 산출물을 이렇게 합치세요"* 식의 1~2 단락 브릿지. 빈칸에 *학교의 의도* 한 줄 + *현재 학습자가 할 일* 한 줄
- 효과 — *완성 전* 에도 완주 동기 유지

### P1 — 다음 사이클 (Q3 안에)

**B1. journey 끝에 *포트폴리오 조립 가이드*** *(S)*
- 근거 — Batch A 페르소나들이 *"파일은 많이 생겼는데 어디에 모으나"* 막힘
- 제안 — 6 journey 각 페이지 끝에 *"지금까지 만든 산출물 N 개를 이 순서로 합치면 [practitioner: AI 업무 플레이북 / adopter: 팀 도입 플레이북 / creator: 콘텐츠 제작 OS / founder: 출시 플랜 / engineer: 시스템 카드 / explorer: 학습 지도]" 가 됩니다* 체크리스트
- 효과 — *완주감* 강화. 새 lesson 없이 효과 큼

**B2. `ai-app-cost-and-usage` 본문 입구 분기** *(M)*
- 근거 — Batch A 의 새 발견. adopter·creator 가 Phase 5·6·7 전제 갑자기 만남
- 제안 — 도입 한 단락 뒤에 *"AI 앱을 직접 만든 사람이 아니라도 비용 감각은 필요해요"* 라며 ① *직접 만든 사람* (Phase 5~7 거친 founder·engineer) ② *AI 도구를 도입하는 사람* (adopter — 사내 사용량·승인) ③ *AI 도구로 콘텐츠를 만드는 사람* (creator — 제작 툴 비용·콘텐츠 ROI) 3 분기
- 효과 — Phase 11 의 학습자 적합 폭이 *2 → 6 journey* 로 확장

**B3. `explorer` journey 끝에 *다음 여정 라우터*** *(S)*
- 근거 — EX2 가 Phase 3 뒤 *"어디로 가야 할지"* 막힘. explorer promise 의 *"매일 배우고 매일 가르치는 빌더"* 가 *"다음 단계 모름"* 으로 약화
- 제안 — explorer 마지막 lesson 에 *"여기까지 왔으면 다음 갈림길은 이렇게 4개입니다"* 안내. practitioner / adopter / creator / engineer 로 가는 *4 트랙 카드* + 각 트랙 첫 lesson 링크
- 효과 — EX2 같은 *전환기 학습자* 완주 동기 + 0.5 점

**B4. founder journey 내부 *코딩 / 비개발 분기*** *(M)*
- 근거 — FO1 4.0 vs FO2 2.5 — founder 안에서 격차가 가장 큼 (1.5 점)
- 제안 — founder journey 페이지에 진입 시 *"당신의 founder 타입은?"* — ① *코딩 founder* (기존 phaseSequence) ② *비개발 founder* (Phase 5·6 우회 + adopter/creator 일부 차용)
- 효과 — FO2 같은 페르소나가 *"이 학교는 코딩 캠프인가"* 의문에서 빠져나옴

### P2 — 그다음 (Q4 안에)

**C1. `common-skills-of-future-proof-people` / `checks-before-trusting-ai-output` 5단 구조 복원** *(S)*
- 근거 — Part A 자동 점검 — 전자 ## 4개 (1단 부족) / 후자 ## 6개 (1단 초과)
- 제안 — 5단 구조 (도입·왜·핵심·그래서·마무리) 복원. 학습자가 의식적으로 파악 X 단 메인터너 일관성 ↑

**C2. 4 lesson 콜론 종결 정리** *(S)*
- 근거 — Part A 검사 — `common-skills…:32` / `checks-before…:88` / `hallucination-verification:19, 75` 진짜 한국어 문장이 `:` 로 끝남
- 제안 — 4 줄을 `.` 로 변경

**C3. Phase 4 lesson 5건 단어수 검토** *(S/M)*
- 근거 — Part A — 488~520 단어 (가이드 600~900 미달)
- 제안 — 페르소나가 *체감 부족* 으로 보지 않았으면 압축 의도로 보고 *명시적 short note* 표기. 체감 부족이면 보강

**C4. `targetJourneys` 도메인 예시 보강** *(M)*
- 근거 — 듀이 1차는 *target 넓음* 을 문제로 봤지만 walkthrough 는 *도메인 예시 부족* 이 진짜 결이라 봄
- 제안 — 6 journey 가 다 붙은 lesson 의 본문에 *journey 별 한 예시 줄* 추가 (예 — "practitioner 는 이렇게 / adopter 는 이렇게 / creator 는 이렇게")

### P3 — 장기 / 시스템 (Q4+)

**D1. 진도 추적 · 검색 · SEO** — 듀이 1차의 P2. 페르소나 walkthrough 도 *"파일 어디 모으나"* 와 부분 일치

**D2. 모바일 반응형 검증** — 학습 환경 시간이 짧은 PA2·CR2·FO2 에게 모바일 학습 비중 큼

## 5. 부록 — 페르소나 12명 → lesson 핫스팟

| lesson | 빛난 페르소나 (코드) | 흔들린 페르소나 (코드) |
|---|---|---|
| `what-is-a-loop` | EX1·EX2·CR1·PA1 | — |
| `checks-before-trusting-ai-output` | PA1·AD1·EN2 | — |
| `enforcing-output-format` | EN1·EX1 (심화) · FO1 | PA2·AD2·CR2·FO2·EX2 (이탈) · PA1·AD1·CR1·EN2 (의문) |
| `feeding-long-documents` | EN1·EX1 | FO2 (양 과다) |
| `automate-report-drafts` | PA1·PA2·AD1 | — |
| `research-workflow` | PA1·AD1·AD2·EX1 | — |
| `blog-writing-pipeline` | CR1·CR2 | — |
| `coding-agent-setup` | FO1·EN1·EN2·EX1 | FO2·EX2 (개발자 진입) |
| `plan-with-ai` | EN1·EN2·FO1 | — |
| `connect-ai-api` (Phase 5.1) | EN1 | FO2·EX2 |
| `grounded-rag-answers` | EN1·EN2·FO1·AD1 | — |
| `tool-permission-safeguards` | EN1·EN2·FO1 | — |
| `ai-app-cost-and-usage` | FO1 | AD1·AD2·CR1·CR2 (전제 불일치) · EN1·EN2 (Phase 10 후 운영 평가 빠짐) |
| `capstone-plan-and-launch` | EX1·FO1 | EX2 (다음 여정 안내 약함) |

---

**한 줄 결론** — 이 학교는 *이미 좋은 톤과 구조* 를 가지고 있어요. 가장 큰 일은 *전부 다시 쓰기* 가 아니라, **같은 lesson 안에 역할별 통과 경로를 분기하는 것** 입니다. 그렇게 하면 빠른 학습자와 바쁜 학습자, 회의적 시니어가 같은 학교에 남아요. 듀이가 main 에서 진행 중인 Phase 0 신규 4 lesson 과 메타데이터 보강은 이 방향과 정확히 일치해요.
