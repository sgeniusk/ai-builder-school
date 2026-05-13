# AI Builder School — 페르소나 Batch B walkthrough (founder / engineer / explorer · 2026-05-13)

## 0. Batch B 한 장 요약 — TL;DR

이 보고서는 실제 학습자 인터뷰가 아니라, 현재 저장소의 `journeys.ts`, `phases.ts`, `lessons.ts`, 각 lesson MDX 본문, `/tmp/dewey-context-snapshot.md`, 그리고 Batch A 보고서를 기준으로 만든 가상 페르소나 walkthrough예요. Batch B는 founder, engineer, explorer 여정에 속한 6명의 가상 학습자가 자기 recommendedPhases를 phaseSequence처럼 따라간다고 가정했어요.

- 6명 완주 가능성 평균은 **3.42 / 5**예요. FO1, EN1, EX1은 빠르게 자기 목적에 맞게 재조립하며 전진하지만, FO2와 EX2는 시작 세팅과 코드 급경사에서 흔들리고, EN2는 기술 이해보다 운영 근거 부족 때문에 의심이 커져요.
- 이탈 위험 지점 Top 2는 **Phase 0 빈 lessonSlugs로 생기는 시작 불안**과 **`enforcing-output-format`에서 시작해 Phase 5로 이어지는 JSON·TypeScript·앱 구현 급경사**예요. FO2, EX2가 크게 흔들리고, FO1도 제품 검증보다 구현 숙제로 밀리는 감각을 받아요.
- 빛나는 lesson Top 2는 **`coding-agent-setup`**과 **`grounded-rag-answers`**예요. 전자는 FO1, EN1, EN2에게 코딩 에이전트를 “무작정 맡기는 도구”가 아니라 안전한 작업 동료로 바꿔 주고, 후자는 EN1, EN2, FO1에게 신뢰 가능한 AI 시스템의 기준을 선명하게 줘요.
- Batch A와 가장 크게 일치하는 결은 빈 Phase와 `enforcing-output-format` 급경사예요. 갈라지는 결은 Batch B에서는 `ai-app-cost-and-usage`가 founder에게는 꽤 자연스럽고, 오히려 engineer에게 Phase 10 빈칸 다음에 만나는 간접 전제 불일치로 보인다는 점이에요.
- 듀이 1차와 다른 결은 Phase 4의 권한 모델이에요. 듀이는 Phase 4 권한 모델을 어려운 부분으로 봤지만, Batch B의 founder와 engineer에게는 `coding-agent-setup`, `plan-with-ai`, `tool-permission-safeguards`가 오히려 신뢰를 크게 올리는 강점으로 보였어요.

## 1. 페르소나 매트릭스

| Code | journey | 페르소나 | 한 줄 기대 |
|---|---|---|---|
| **FO1** | founder | 27세 · 예비창업 재학생 · 코딩캠프 6개월, 빠른 학습, 자본 부족 (20대 고지능) | 작은 AI 제품을 빠르게 만들고, 비용과 런칭까지 감각을 잡고 싶어 해요. |
| **FO2** | founder | 33세 · 자영업 5년차 (오프→온 전환 시도) · 코딩 X, 시간 부족 (30대 중지능) | 매장 경험을 온라인 AI 상품이나 예약·상담 도구로 바꿀 수 있는 현실적 길을 기대해요. |
| **EN1** | engineer | 24세 · 백엔드 1.5년차 · Py/TS, LLM API 호출 경험 있음 (20대 고지능) | API 호출 경험을 운영 가능한 RAG·Agent·Evals 시스템으로 확장하고 싶어 해요. |
| **EN2** | engineer | 35세 · 데이터분석 7년차 시니어 · R/SQL 베테랑, LLM 첫 진지한 시도, 회의적 (30대 중지능) | 과장 없는 근거와 평가 기준을 보고, LLM 시스템이 실제 분석 업무에 쓸 만한지 판단하려 해요. |
| **EX1** | explorer | 22세 · CS 대학원 1학기 · 학습 매니아, GitHub 기여 시작 (20대 고지능) | 넓게 배우면서 자기 진로가 founder, engineer, creator 중 어디에 가까운지 찾고 싶어 해요. |
| **EX2** | explorer | 31세 · 고시 끝나고 전직 모색 · 학습 의지 강하나 어디부터 막막 (30대 중지능) | AI를 처음부터 체계적으로 배우고, 막막한 전직 방향을 작게 확인하고 싶어 해요. |

## 2. 페르소나 6명 walkthrough

### 2.1 FO1 — 27세, 예비창업 재학생

- **한 줄 기대** — 아이디어를 말로만 검증하지 않고, 코딩 에이전트와 함께 첫 AI 제품을 만들고 비용과 런칭까지 닫고 싶어 해요.

- **여정 동선** — FO1은 founder recommendedPhases를 따라 Phase 0에서 시작해요. Phase 0은 모든 여정의 입구지만 lessonSlugs가 비어 있습니다. 코딩캠프 6개월 경험이 있는 FO1은 Codex, Claude Code, GitHub, API 키라는 단어를 보고 큰 두려움은 느끼지 않아요. 다만 “학교가 어떤 개발 환경을 표준으로 보는지”, “무료 예산으로 어디까지 가능한지”, “자본이 부족한 창업자가 어떤 계정부터 만들어야 하는지”가 빠져 있어요. 그는 검색해서 넘어가겠지만, 첫날부터 학교가 손잡아 주는 느낌은 약해요.

  첫 실제 구간은 Phase 2예요. `structure-of-good-prompts`는 FO1에게 빠르게 흡수됩니다. Task, Context, Constraints, Output 4축은 제품 아이디어를 사용자 문제, 입력 데이터, 금지 범위, 결과 화면으로 바꾸는 데 유용해요. 공감도는 높고 난이도는 낮습니다. 산출물 `four-axis-prompt.md`도 MVP 브리프의 초안처럼 느껴져요. FO1은 “AI에게 좋은 질문을 던지는 법”보다 “AI에게 제품 명세를 주는 법”으로 읽습니다.

  `enforcing-output-format`에서 난이도는 확 올라가지만, FO1은 이탈하지 않습니다. JSON 스키마, `JSON.parse`, 재시도 루프는 코딩캠프 경험으로 이해 가능해요. 오히려 그는 “이게 제품에서 진짜 필요하구나”라고 받아들입니다. 문제는 학습자의 제품 검증 감각보다 구현 감각이 먼저 강해진다는 점이에요. FO1은 자본이 부족한 예비창업자라서 “사용자가 정말 원하는가”를 먼저 알고 싶은데, lesson은 회의록 JSON과 파싱 안정성으로 깊게 들어갑니다. 기술적으로는 좋지만 founder promise의 시장 감각은 아직 덜 살아나요.

  `feeding-long-documents`는 FO1에게 좋은 브릿지예요. 창업 아이디어 검증에는 시장 리포트, 경쟁사 랜딩, 리뷰, 커뮤니티 글을 많이 읽어야 하니까요. Full Context, Map-Reduce, Selective Injection의 비교는 리서치 운영에 바로 붙습니다. 다만 40~60쪽 문서가 기준이라 초기 창업자에게 조금 큽니다. “경쟁사 랜딩 5개와 고객 리뷰 30개로 실험” 같은 founder형 소형 예시가 있으면 더 강했을 거예요.

  `build-personal-prompt-library`는 FO1에게 자산화 감각을 줘요. 고객 인터뷰 질문, 랜딩 카피, 기능 우선순위, 코드 리뷰, 버그 리포트 템플릿을 한 폴더로 모을 수 있습니다. 하지만 Front Matter와 폴더 구조가 길고, 작업량도 실제로는 90분 이상으로 보입니다. FO1은 해낼 수 있지만, 빠른 실험을 원하는 예비창업자에게는 “오늘 템플릿 2개만 저장하면 통과”라는 경량 루트가 필요해요.

  `meta-prompting`은 FO1에게 꽤 빛납니다. 애매한 사업 아이디어를 곧장 구현 요청으로 던지기보다, 먼저 AI에게 좋은 작업지시서를 만들게 하는 방식은 코딩 에이전트 시대의 창업자에게 필요한 습관이에요. Goal, Context, Constraints, Done When 네 칸은 founder가 개발자에게 이슈를 넘길 때도 그대로 쓸 수 있습니다. 이 lesson은 “코드를 조금 아는 비개발 창업자”에게 특히 친절해요.

  Phase 4의 `coding-agent-setup`은 FO1의 첫 번째 큰 회복점입니다. 파일 수정, 터미널 실행, `.env` 접근, 로그를 다루는 불안이 매우 현실적이에요. 코딩캠프에서 배운 기술은 있지만, 혼자 제품을 만들 때 가장 무서운 것은 코드가 아니라 “에이전트가 내 저장소를 망칠 수 있다”는 감각입니다. 이 lesson은 권한, 비밀, 로그를 한 장으로 정리하게 해서 FO1에게 안전한 작업장 느낌을 줘요.

  `github-issue-to-ai-brief`, `letting-ai-read-codebase`, `plan-with-ai`는 FO1에게 개발 협업 루틴을 만들어 줍니다. 이 세 lesson은 founder에게 기술보다 더 중요한 “일을 잘게 자르는 감각”을 가르쳐요. 수용 조건, 재현 스텝, Repo Map, Scout Run, Stop Point는 모두 혼자 제품 만드는 사람에게 필요합니다. 다만 Phase 4 lesson 다수가 Part A 자동 점검에서 단어수 600 미달로 잡힌 만큼, 본문이 압축적이에요. FO1은 빠르게 이해하지만, 예시 코드나 실제 이슈 예제가 조금 더 있었으면 더 안정적으로 적용했을 거예요.

  `write-tests-with-coding-agent`와 `bug-reproduction-loop`는 FO1에게 제품 완성도를 올려 줍니다. 테스트를 먼저 쓰고, 버그를 재현하고, 최소 예제로 줄이는 루틴은 혼자 개발하는 founder의 품질 보험이에요. 그는 이 구간에서 “코딩 에이전트가 속도를 올리는 도구가 아니라, 나를 성급함에서 막는 도구”라고 느낍니다. `nightly-loop-pattern`은 흥미롭지만 위험하게도 매력적이에요. 자본 부족과 시간 부족 때문에 밤새 자동 루프를 돌리고 싶어지지만, lesson이 목표, 검증, 예산, 멈춤 조건을 강조해서 무리한 자동화로 튀지 않게 잡아 줍니다.

  Phase 5의 `connect-ai-api`, `streaming-response-ui`, `structured-output-handling`, `conversation-storage-design`는 FO1의 제품 기대와 가장 직접 맞아요. API 키를 서버에 숨기는 장면, 스트리밍 UI의 신뢰 신호, 스키마 검증, 대화 저장과 요약은 모두 MVP의 실제 뼈대입니다. 난이도는 중상이고, 빌드 실행성은 FO1에게 높습니다. 다만 코딩캠프 6개월 수준에서는 DB 저장과 요약 롤링까지 하루에 끝내기 어렵습니다. 각 lesson이 “설계 문서만 작성해도 통과”인지 “실제 코드까지 구현해야 통과”인지 더 명확하면 좋겠어요.

  Phase 9가 비어 있는 점은 founder에게 꽤 큽니다. 제품을 만들고 난 뒤 데이터 의사결정으로 넘어가야 하는데, `lessonSlugs`가 없습니다. FO1은 초기 사용자 수, 전환율, 리텐션, 비용 대비 행동 같은 지표를 보고 싶어 하지만, 이 구간이 비어 있어 “출시 전 개발 수업은 많은데 출시 후 판단 수업은 아직 없다”고 느껴요.

  Phase 11의 `ai-app-cost-and-usage`는 Batch A와 달리 FO1에게 자연스럽습니다. 친구 10명이 하루 다섯 번 쓰면 얼마냐는 장면은 예비창업자에게 정확히 꽂혀요. Token Accounting, Usage Tracking, Cost Guardrail, Free Tier와 Paid Trigger는 자본 부족 founder가 꼭 알아야 하는 내용이에요. 오히려 이 lesson은 FO1에게 빛나는 지점입니다. 다만 Phase 10 빈칸 뒤에 “Phase 10 다음에 왜 이 레슨인가”라고 시작하기 때문에, 자기가 거치지 않은 안전성 검증 단계를 지나온 듯한 작은 공백은 남습니다.

  마지막 `capstone-plan-and-launch`는 FO1에게 학교의 약속을 닫아 줍니다. 문제를 좁히고, 앞 Phase 산출물을 재료로 고르고, 공개 URL이나 README, 회고 문서로 출시하는 흐름은 좋습니다. 특히 로그인, 결제, 관리자 페이지를 첫 바퀴에서 빼도 된다는 안내가 자본 부족 founder에게 현실적이에요. 다만 Phase 9 데이터 의사결정이 비어 있었기 때문에 런칭 뒤 무엇을 볼지의 지표 감각은 조금 덜 연결돼요.

  > “개발 루틴은 생각보다 든든한데, 사용자 지표를 보는 수업이 빈칸이라 출시 후가 조금 흐릿해요.”

- **이탈 위험 지점** — 첫 번째는 Phase 0 빈칸이에요. FO1은 넘길 수 있지만, 학교 첫날의 표준 세팅과 비용 감각이 없어서 신뢰가 덜 생겨요. 두 번째는 Phase 9 빈칸이에요. founder에게 제품 판단은 구현만큼 중요한데 데이터 의사결정 lesson이 없어서 후반부 약속이 빠집니다.

- **빛나는 지점** — `coding-agent-setup`은 에이전트 협업의 불안을 안전장치로 바꿔 줘요. `ai-app-cost-and-usage`는 Batch A 일부 페르소나와 달리 FO1에게 정확히 founder형 lesson으로 작동합니다.

- **회복 제안** — Phase 0에 “창업자 최소 세팅과 무료 예산 감각” lesson을 먼저 둬요. Phase 9에는 완성 lesson 전이라도 “MVP 첫 10명 지표 노트” 브릿지를 넣어요. Phase 5 lesson마다 “설계 문서 통과”와 “코드 구현 통과”를 분리해 주세요.

- **완주 가능성** — **4.0 / 5**예요. FO1은 거의 완주하지만, 데이터 판단 구간의 빈칸 때문에 출시 후 루프가 덜 닫힙니다.

### 2.2 FO2 — 33세, 자영업 5년차

- **한 줄 기대** — 매장과 오프라인 경험을 온라인 상담, 예약, 고객 응대, 홍보 상품으로 바꾸고 싶지만 코딩과 시간 부족이 가장 큰 걱정이에요.

- **여정 동선** — FO2도 founder phaseSequence를 따라 Phase 0에서 시작합니다. 여기서 바로 큰 불안이 옵니다. `journeys.ts`의 founder targetLearner는 솔로프리뉴어, 인디 해커, 1인 창업자를 말하지만, Phase 0 lesson은 비어 있어요. FO2는 코딩이 없고 하루 대부분을 매장 운영에 씁니다. Codex CLI, Claude Code, GitHub, API 키, VS Code는 단어만으로도 “내가 올 곳이 맞나”라는 신호가 됩니다. 설명은 있지만 실제 lesson이 없으니 설치, 계정, 비용, 터미널 기초를 스스로 해결해야 해요. 이 시작 공백은 FO2에게 실제 이탈 위험입니다.

  Phase 2의 `structure-of-good-prompts`는 FO2를 다시 조금 붙잡습니다. 그는 코딩은 못 하지만 고객 문의, 이벤트 공지, 예약 안내, 메뉴 설명처럼 반복되는 말의 형식은 잘 압니다. Task, Context, Constraints, Output 4축은 “이번 주 이벤트 문구를 3줄로, 가격 오해 없이, 카카오톡 공지 형식으로 써줘”처럼 바꿀 수 있어요. 공감도는 높고 난이도는 낮습니다. 다만 예시가 회의록, Slack, 코드 리뷰 쪽으로 치우쳐 있어 FO2가 자기 매장 언어로 번역해야 합니다.

  `enforcing-output-format`은 FO2에게 가장 큰 벽입니다. JSON 스키마는 “항상 같은 표로 받기” 정도로는 이해할 수 있지만, `JSON.parse`, ParseError, Node.js 또는 TypeScript로 재시도 루프를 짠다는 작업은 자기 일이 아니라고 느껴요. 그는 온라인 전환을 원하지만 개발자가 되고 싶은 것은 아닙니다. 고객 문의를 분류하고 예약 정보를 표로 받는 것은 필요해요. 그러나 코드 구현까지 요구되는 순간, “이건 창업 수업이 아니라 개발자 수업”으로 읽힙니다. Batch A와 같은 급경사가 Batch B의 FO2에게도 강하게 반복됩니다.

  `feeding-long-documents`는 주제 자체는 좋습니다. FO2는 상가 계약서, 정부 지원사업 공고, 프랜차이즈 약관, 고객 리뷰 묶음 같은 긴 문서를 읽어야 해요. Full Context, Map-Reduce, Selective Injection을 “통째로 넣기”, “나눠 요약하기”, “관련 부분만 넣기”로 이해하면 실전성이 큽니다. 하지만 40~60쪽 문서 하나를 고르고 세 전략을 비교하는 미션은 매장 운영자에게 너무 큽니다. “공고문 5쪽으로 20분 실습” 같은 소형 루트가 있어야 해요.

  `build-personal-prompt-library`는 FO2에게 절반만 친절해요. 흩어진 프롬프트를 한 곳에 모으는 장면은 매우 공감됩니다. 카카오톡 공지, 인스타 글, 리뷰 답변, 예약 안내, 환불 안내 템플릿을 모으면 바로 가치가 있어요. 하지만 `prompt-library/`, Front Matter, Git 저장소, README는 낯섭니다. 산출물 만족도는 Notion, Google Docs, 메모장 버전이 있으면 높아지고, Git 폴더 중심이면 낮아져요.

  `meta-prompting`은 FO2에게 의외로 좋은 도구입니다. 그는 좋은 프롬프트를 직접 만들 자신은 없지만, “이 작업을 더 잘 시키기 위한 질문을 만들어 달라”는 방식은 따라 할 수 있어요. 고객 응대 자동화, 블로그 글, 메뉴 설명, 온라인 상담 FAQ 같은 반복 작업을 Goal, Context, Constraints, Done When으로 바꾸는 건 코딩 없이도 됩니다. 다만 코딩 예시가 초반에 나오기 때문에, 비개발 founder에게는 매장 운영 예시가 먼저 나와야 안심할 수 있어요.

  Phase 4의 `coding-agent-setup`에서 FO2는 다시 크게 흔들립니다. 제목부터 코딩 에이전트예요. 그럼에도 내용 중 “무엇을 맡기지 않을지 먼저 정한다”, “비밀 파일을 읽지 않는다”, “마지막 응답에 로그를 남긴다”는 원칙은 매장 운영자에게도 유용합니다. FO2는 이것을 개발 저장소가 아니라 “내 업무 자동화 도우미에게 주는 규칙”으로 번역하면 따라갈 수 있어요. 문제는 lesson이 실제로는 저장소, 파일, 터미널, `.env`를 전제로 하므로, 혼자 번역하기 어렵다는 점입니다.

  `github-issue-to-ai-brief`는 FO2에게 낮은 친숙도를 보입니다. GitHub Issue라는 단어가 낯설어요. 하지만 “고객이 예약 버튼이 안 된다고 말했을 때, 문제 장면, 기대 동작, 실제 동작, 확인 방법을 나눠 적는다”로 바꾸면 매우 유용합니다. `letting-ai-read-codebase`도 Repo Map이 아니라 “내 온라인 도구 지도”로 바꾸면 가능하지만, 현재 본문은 저장소 읽기 중심입니다. `plan-with-ai`는 FO2에게 꽤 중요한 lesson이 될 수 있어요. 개발자에게 외주를 맡기거나 에이전트에게 일을 맡길 때, 변경 파일 대신 변경 범위, 검증, 중단 지점을 합의한다는 원칙은 자영업 온라인 전환에서 사고를 줄여 줍니다.

  `write-tests-with-coding-agent`와 `bug-reproduction-loop`는 직접 코드 테스트로 읽으면 벽입니다. 하지만 “예약 폼이 제대로 작동하는지 실패 입력을 먼저 넣어 본다”, “버그를 재현 가능한 순서로 적는다”는 운영 원칙은 좋습니다. FO2는 테스트 코드를 이해하지 못해도, 테스트 이름과 시나리오를 읽고 원하는 행동인지 확인하면 된다는 문장에 안심해요. 이런 비전공자 안내가 있는 점은 친절합니다. 다만 전체 위치가 founder 필수 동선 안에 있기엔 코드 냄새가 강해요.

  `nightly-loop-pattern`은 FO2에게 거의 심화 예고입니다. 밤새 자동 루프를 돌리는 이야기는 흥미롭지만, 매장 운영자는 먼저 “내일 오전에 확인할 고객 문의 초안 5개 만들기” 정도가 필요합니다. 현재 lesson은 자동화 기준과 예산을 강조해서 위험하지는 않지만, 실전 동기는 낮아요.

  Phase 5는 FO2에게 가장 큰 분기입니다. `connect-ai-api`의 API 키 유출 장면은 무섭지만 중요합니다. 온라인 상담 챗봇이나 예약 FAQ를 만들려면 키를 브라우저에 두면 안 된다는 원칙은 알아야 해요. 그러나 `app/api/chat/route.ts`, 서버 라우트, `fetch("/api/chat")`는 직접 구현 범위 밖입니다. `streaming-response-ui`는 고객이 기다리는 경험을 다루므로 공감도는 높지만, 구현은 어렵습니다. `structured-output-handling`은 예약 정보 카드처럼 필요하지만, 스키마 검증과 서버 코드는 외주 명세로 바뀌어야 해요. `conversation-storage-design`은 FO2에게 매우 현실적입니다. 고객 상담 기록, 개인정보 마스킹, 삭제 정책, 요약 저장은 온라인 전환에서 꼭 필요하니까요. 하지만 직접 DB 설계까지 가면 과합니다.

  Phase 9 빈칸은 FO2에게 아쉽습니다. 오프라인에서 온라인으로 전환하는 사람은 방문자 수, 문의 수, 예약 전환율, 재방문, 광고비 대비 매출 같은 데이터 판단을 가장 원합니다. 그런데 이 Phase에 lesson이 없으면, FO2는 “제품을 만들라는 말은 많은데, 내 장사가 좋아지는지 보는 법은 없다”고 느낄 수 있어요.

  `ai-app-cost-and-usage`는 FO2에게 절반은 맞고 절반은 멉니다. 비용 감각은 매우 중요해요. 무료 체험, 유료 전환, 요청 제한, 월 예산 알림은 매장 사장도 이해합니다. 하지만 토큰 단가, 캐시, 모델 선택, 사용량 로그는 개발자가 구현할 영역으로 보여요. FO2에게는 “한 달 문의 300건이면 AI 상담 비용이 대략 어느 범위인가”, “광고비와 비교해 얼마까지 괜찮은가” 같은 사업자 계산표가 먼저 필요합니다.

  `capstone-plan-and-launch`는 FO2에게 다시 희망을 줍니다. 캡스톤이 거창한 졸업 작품이 아니라 공개 가능한 작은 결과물이라는 설명은 좋아요. 개인 사용, 부업, 사업, 포트폴리오 트랙을 나누는 대목도 현실적입니다. FO2는 “예약 문의를 받아 FAQ와 응답 초안을 만드는 작은 도구” 정도로 좁히면 완주할 수 있어요. 다만 앞선 Phase 4·5를 직접 구현으로 받아들이면 여기까지 오기 전에 지칠 가능성이 큽니다.

  > “고객 상담 도구를 만들고 싶지, 서버 라우트 개발자가 되고 싶은 건 아니에요.”

- **이탈 위험 지점** — 가장 큰 위험은 Phase 0 빈칸이에요. 시작 세팅을 스스로 해야 하는 순간 FO2는 떠날 수 있습니다. 두 번째는 `enforcing-output-format`과 Phase 5 구현 구간이에요. 코드 직접 구현만 제시되면 founder가 아니라 engineer 과정처럼 느껴집니다.

- **빛나는 지점** — `meta-prompting`은 코딩 없이도 FO2의 업무를 더 잘 시키는 질문으로 바꿔 줘요. `conversation-storage-design`은 고객 상담 기록과 개인정보 리스크를 떠올리게 해 실제 사업 감각과 연결됩니다.

- **회복 제안** — founder lesson마다 “직접 구현”, “외주 또는 에이전트에게 넘길 명세”, “노코드로 검증” 루트를 분리해요. Phase 0에는 비개발 founder용 계정, 비용, 도구 선택 lesson이 필요해요. Phase 9에는 매장형 MVP 지표 브릿지를 넣어 주세요.

- **완주 가능성** — **2.5 / 5**예요. 사업 동기는 강하지만 현재 동선은 코딩 직접 구현으로 너무 빨리 밀려요.

### 2.3 EN1 — 24세, 백엔드 1.5년차

- **한 줄 기대** — 이미 LLM API를 호출해 본 백엔드 개발자가 운영 가능한 RAG, Agent, 보안, 캡스톤까지 체계화하고 싶어 해요.

- **여정 동선** — EN1은 engineer recommendedPhases를 따라 Phase 0에서 시작합니다. Phase 0은 lessonSlugs가 비어 있지만 EN1에게는 치명적이지 않아요. Node, Python, GitHub, API 키 관리는 이미 익숙합니다. 다만 학교가 Next.js, Vercel, OpenAI 또는 Anthropic SDK 중 무엇을 기본 실습 환경으로 보는지 명확한 설치 lesson이 없어서 “내 환경으로 해도 되는지”는 궁금해합니다. 빠른 학습자라 넘어가지만, 표준 실습 저장소가 있었다면 더 빠르게 몰입했을 거예요.

  Phase 2의 `structure-of-good-prompts`는 EN1에게 쉬운 입구입니다. 그는 프롬프트를 이미 써봤지만, Task, Context, Constraints, Output으로 분리하는 습관은 API 호출과 테스트 케이스를 안정화하는 데 도움이 됩니다. 특히 Output 축은 이후 구조화 출력, function calling, agent tool schema로 이어져요. EN1은 이 lesson을 “프롬프트 기초”보다 “인터페이스 명세의 시작”으로 읽습니다.

  `enforcing-output-format`은 EN1에게 오히려 반갑습니다. JSON 스키마, 파싱, 재시도 루프, strict와 optional 필드 분리는 백엔드 감각과 맞아요. Batch A와 FO2에게는 급경사였던 lesson이 EN1에게는 제품화의 첫 번째 핵심으로 보입니다. 다만 코드는 의사코드 수준이고, 실제로는 Zod, JSON schema, SDK structured output, retry budget, observability까지 궁금해져요. EN1에게는 “더 깊이 가기” 링크가 있으면 좋고, 비개발자 루트보다 심화 구현 루트가 필요합니다.

  `feeding-long-documents`는 RAG 전 단계로 좋습니다. 100쪽 PDF, Lost in the Middle, Map-Reduce, Selective Injection 설명은 이미 LLM API를 써본 EN1에게 “왜 그냥 긴 컨텍스트로 해결하면 안 되는지”를 잘 납득시켜요. 그는 이 lesson을 Phase 6의 예고로 받아들입니다. 40~60쪽 문서 비교 미션도 해낼 수 있지만, 비용과 토큰 측정까지 포함하면 더 엔지니어답다고 느낄 거예요.

  `build-personal-prompt-library`는 EN1에게 약간 느립니다. 프롬프트 자산화, 변수, version front matter는 이해하지만, Git 기반 템플릿 관리는 이미 할 수 있어요. 그는 이 lesson을 빠르게 통과하며 나중에 사내 prompt registry나 eval set으로 확장하고 싶어 합니다. `meta-prompting`은 개발 작업지시서를 만들 때 유용합니다. 특히 Done When은 테스트 가능 조건으로 읽히기 때문에 EN1이 좋아해요.

  Phase 4의 `coding-agent-setup`은 EN1에게 Batch B 전체에서 가장 강한 lesson 중 하나입니다. 권한, 비밀, 로그, allow와 deny를 문서화하는 접근은 실제 코딩 에이전트 운영과 맞아요. 그는 이미 에이전트에게 코드를 맡겨 봤고, `.env` 노출이나 과한 리팩터링 위험을 압니다. 이 lesson은 경험으로 알던 불안을 구조로 바꿔 줘요.

  `github-issue-to-ai-brief`, `letting-ai-read-codebase`, `plan-with-ai`는 EN1의 업무 루틴을 바로 개선합니다. 수용 조건, 재현 스텝, 영향 범위, Repo Map, Scout Run, Implementation Plan, Stop Point가 연결되는 방식이 좋습니다. 특히 Scout Run은 “고치기 전에 읽기만 한다”는 명령으로 에이전트 폭주를 막아 줘요. EN1은 이 구간에서 학교가 단순 프롬프트 강의가 아니라 실제 협업 루틴을 가르친다고 느낍니다.

  `write-tests-with-coding-agent`와 `bug-reproduction-loop`도 자연스럽습니다. Red → Green을 에이전트와 분리해서 하라는 안내는 실무 초년 개발자에게 매우 유용해요. EN1은 테스트를 구현 뒤에 맞추는 나쁜 습관을 본 적이 있고, “실패 테스트만 작성하고 멈춰 달라”는 프롬프트를 바로 써볼 가능성이 큽니다. `bug-reproduction-loop`의 최소 재현과 근본 원인 메모도 백엔드 장애 대응에 잘 맞습니다.

  `nightly-loop-pattern`은 EN1에게 흥미와 조심스러움을 동시에 줍니다. Ralph Loop, fixed-budget research loop, Codex `/goal`, 검증 조건, 토큰 예산, 시간 한도는 최신 코딩 에이전트 흐름과 잘 맞아요. 다만 Phase 4의 다른 lesson보다 훨씬 고급이고, 실제 실행 환경과 안전장치 예제가 더 필요합니다. 현재는 설계서 수준으로는 좋지만, 잘못 따라 하면 무한 실행이나 비용 폭주가 걱정될 수 있어요.

  Phase 5는 EN1에게 탄탄합니다. `connect-ai-api`는 API 키를 서버에 숨기고 graceful failure를 다루는 기본기를 잘 잡아요. 이미 해본 사람에게도 “사용자용 메시지와 로그용 메시지를 분리한다”는 점이 좋습니다. `streaming-response-ui`는 EN1이 프론트 경험이 적어도 이해할 수 있게 Streaming과 Cancellation을 설명합니다. `structured-output-handling`은 Phase 2의 출력 강제를 서버 검증으로 끌고 와서 매우 자연스럽고, EN1이 가장 실무적으로 좋아할 lesson 중 하나예요. `conversation-storage-design`은 세션, 메시지, 요약, trace를 나누는 설명이 좋아요. EN1은 여기서 처음으로 “AI 앱은 그냥 API 호출이 아니라 상태와 비용과 프라이버시의 문제”라고 느낍니다.

  Phase 6의 RAG 구간은 EN1에게 가장 만족도가 높습니다. `understanding-embeddings`는 수식보다 의미 좌표 감각을 먼저 잡아서 빠르게 들어옵니다. `document-chunking-strategy`는 크기, 경계, 중첩, 메타데이터를 다뤄 실전적이에요. `vector-search-basics`는 Top-K, 필터, 하이브리드 검색, 권한 필터를 언급해서 운영 시스템 냄새가 납니다. `grounded-rag-answers`는 답과 citations, abstain policy를 묶어 “근거 있는 AI”의 기준을 선명하게 줘요. EN1은 이 lesson을 빛나는 지점으로 봅니다.

  Phase 7의 `function-calling`, `mini-agent-loop`, `tool-permission-safeguards`, `prompt-injection-defense`는 engineer promise와 정확히 맞습니다. Function Calling을 구조화 출력의 다음 단계로 설명하는 연결이 좋고, mini-agent-loop에서 Stopping Criteria와 로그를 강조하는 것도 실전적입니다. `tool-permission-safeguards`는 Phase 4의 권한 문서를 제품 에이전트에 다시 적용해 큰 일관성을 줘요. `prompt-injection-defense`는 직접과 간접 인젝션, Content Separation, Policy Gate를 설명해서 EN1의 보안 감각을 깨웁니다.

  Phase 10은 engineer recommendedPhases에 들어 있지만 lessonSlugs가 비어 있습니다. 이것은 EN1에게 꽤 아쉽습니다. Phase 7에서 prompt injection defense까지 배웠다면 다음은 evals, red team, monitoring, regression suite가 와야 합니다. 그런데 빈 Phase를 만나고 바로 Phase 12로 가면 “운영 가능한 AI 시스템”이라는 promise가 마지막 평가 고리에서 끊깁니다.

  `capstone-plan-and-launch`는 EN1에게 포트폴리오 정리로 좋습니다. 앞 Phase 산출물을 재료로 모으고, 실패할 입력 5개를 넣어보고, README와 공개 URL, 회고를 남기라는 안내는 좋습니다. 다만 engineer 캡스톤에는 eval dashboard, trace, injection test suite, RAG citation accuracy 같은 심화 체크가 더 필요해요. 현재 capstone은 모든 journey 공통이라 engineer 전용 졸업 기준은 조금 흐립니다.

  > “RAG와 agent 흐름은 잘 쌓이는데, evals Phase가 비어 있어서 운영 가능한 시스템의 마지막 나사가 빠진 느낌이에요.”

- **이탈 위험 지점** — 첫 번째는 Phase 10 빈칸이에요. EN1은 여기서 이탈한다기보다 완성도 의심이 생깁니다. 두 번째는 `nightly-loop-pattern`이에요. 내용은 매력적이지만 실제 실행 가드가 부족하면 안전하게 따라 하기 어렵습니다.

- **빛나는 지점** — `grounded-rag-answers`는 RAG를 신뢰 가능한 시스템으로 닫아 줍니다. `coding-agent-setup`은 에이전트 협업의 안전 기준을 세워 이후 모든 개발 lesson의 바닥이 됩니다.

- **회복 제안** — Phase 10에 최소한 “eval set 만들기”, “prompt injection regression”, “trace와 비용 모니터링” 브릿지를 넣어요. `nightly-loop-pattern`에는 10분 드라이런 예시와 금지 작업 표를 보강해 주세요. Engineer 캡스톤에는 전용 품질 체크를 추가하면 좋아요.

- **완주 가능성** — **4.2 / 5**예요. EN1은 대부분 완주하지만, Phase 10 빈칸 때문에 “운영 가능”의 마지막 평가 루프가 덜 닫힙니다.

### 2.4 EN2 — 35세, 데이터분석 7년차

- **한 줄 기대** — R과 SQL로 검증 가능한 분석을 해온 시니어가 LLM을 과장 없이 시스템화할 수 있는지 확인하려 해요.

- **여정 동선** — EN2는 engineer 여정으로 들어오지만 일반적인 웹 개발자와 다릅니다. R, SQL, 대시보드, 통계 검증에는 강하지만 TypeScript 앱 개발과 LLM 도구 호출은 낯섭니다. Phase 0이 비어 있는 점은 EN2에게도 불친절해요. 그는 설치 자체를 못 하지는 않겠지만, “이 학교는 데이터분석가도 engineer로 받아들이는가, 아니면 웹 백엔드 엔지니어만 상정하는가”를 초반부터 묻습니다. Phase 0에 개발자 유형별 세팅 분기가 있었다면 신뢰가 올라갔을 거예요.

  Phase 2의 `structure-of-good-prompts`는 EN2에게 나쁘지 않습니다. 그는 분석 요청을 SQL 쿼리 요구사항으로 바꾸는 데 익숙해서 Task, Context, Constraints, Output 4축을 이해합니다. 다만 “공격 도구”라는 표현이나 회의록 예시는 조금 가볍게 느낄 수 있어요. EN2는 정확한 분석 맥락, 데이터 출처, 가정, 결측치 처리, 출력 검증을 더 기대합니다. 그래도 4축은 분석 요청서를 다듬는 기본 틀로 받아들입니다.

  `enforcing-output-format`은 EN2에게 양면적이에요. 구조화 출력의 필요성은 매우 잘 이해합니다. 데이터분석가는 스키마와 타입의 가치를 압니다. 그러나 lesson이 JSON과 Node.js 중심으로 가면서 R/SQL 기반 시니어에게는 “웹앱 개발자 문법”으로 보일 수 있어요. 그는 파싱 실패와 재시도 루프의 개념에는 동의하지만, “그럼 이 출력이 통계적으로 맞는지, 데이터 원본과 일치하는지는 어떻게 보나”라는 질문을 남깁니다. 형식 검증과 사실 검증이 분리되어 있다는 설명이 더 있으면 좋겠습니다.

  `feeding-long-documents`는 EN2에게 꽤 강합니다. 긴 리포트나 정책 문서, 데이터 사전, 분석 요구사항을 다루는 경험이 있어서 Lost in the Middle, Map-Reduce, Selective Injection의 한계를 직관적으로 이해해요. 다만 “비용과 시간 비교 표”만으로는 부족하고, 정보 누락률이나 재현성 지표가 있으면 더 설득될 거예요. 그는 손으로 한 번 비교하는 미션을 할 수 있지만, 결과를 평가하는 기준이 더 엄밀하길 원합니다.

  `build-personal-prompt-library`는 EN2에게 프롬프트 자산 관리보다 분석 템플릿 관리처럼 보입니다. SQL 리뷰, 데이터 품질 점검, 대시보드 설명, 모델 결과 해석 템플릿을 모을 수 있어요. Front Matter, version, last_tested는 마음에 듭니다. 단지 예시 카테고리가 research, reports, reviews 중심이라 데이터 분석 직무의 고유 예시가 부족해요. `meta-prompting`은 EN2에게도 유용합니다. Done When을 “결과가 검증 기준을 통과한다”로 읽을 수 있기 때문이에요.

  Phase 4의 `coding-agent-setup`은 EN2에게 의외로 신뢰를 줍니다. 듀이 1차는 Phase 4 권한 모델을 어려운 부분으로 봤지만, EN2 같은 회의적 시니어에게는 권한, 비밀, 로그를 먼저 정한다는 태도가 오히려 전문적으로 보입니다. 그는 AI에 회의적이기 때문에 “어디까지 맡기지 않을지”를 말하는 lesson을 좋아합니다. 비밀 파일과 로그, 금지 동작을 문서화하는 접근은 데이터 거버넌스 감각과도 맞아요.

  `github-issue-to-ai-brief`는 EN2에게 GitHub Issue 자체보다 수용 조건과 재현 스텝이 중요합니다. 분석 이슈도 “이 지표가 이상해요”로 시작하면 고치기 어렵습니다. 기대값, 실제값, 재현 데이터, 검증 쿼리를 적어야 해요. 이 lesson은 그 구조를 제공합니다. `letting-ai-read-codebase`의 Repo Map과 Scout Run은 EN2가 데이터 파이프라인 저장소를 읽힐 때 유용해요. 다만 웹앱 폴더 예시보다 dbt, notebooks, ETL, dashboards 같은 예시가 있으면 더 잘 맞습니다.

  `plan-with-ai`는 EN2가 강하게 인정하는 lesson입니다. 구현 전 변경 파일, 검증, 롤백, Stop Point를 합의하는 방식은 시니어 분석가의 운영 감각과 맞아요. 그는 “일단 해봐”가 위험하다는 말에 동의합니다. `write-tests-with-coding-agent`도 테스트 이름과 시나리오를 사람이 검토해야 한다는 대목이 좋습니다. 다만 EN2는 단위 테스트보다 데이터 테스트, 샘플 레코드, 기대 집계값, 재현 쿼리 같은 예시를 보고 싶어 합니다.

  `bug-reproduction-loop`는 EN2에게 매우 실전적입니다. 대시보드 숫자가 이상하거나 집계가 어긋날 때, 증상과 원인을 분리하고 최소 재현을 만드는 것은 데이터 분석의 핵심이에요. `nightly-loop-pattern`은 EN2가 가장 회의적으로 읽는 Phase 4 lesson입니다. 자동 루프가 작고 되돌릴 수 있는 실험에만 적합하다는 경고는 좋지만, 시니어는 “누가 결과를 리뷰하고, 실패 로그를 어떻게 감사할 것인가”를 더 묻습니다.

  Phase 5의 `connect-ai-api`는 EN2에게 웹 개발 학습으로 보입니다. API 키를 서버에 숨기고 실패 처리를 나누는 원칙은 중요하지만, Next.js 서버 라우트와 UI 호출은 그의 일상과 거리가 있습니다. `streaming-response-ui`도 제품 경험으로는 이해하지만, 직접 구현 동기는 낮아요. 반대로 `structured-output-handling`은 강하게 공감합니다. LLM이 만든 분석 요약을 카드, 테이블, 경고 레벨로 넣으려면 파싱과 검증이 필요하니까요. `conversation-storage-design`은 분석 로그, 개인정보 마스킹, trace 분리에 연결되어 좋습니다.

  Phase 6의 RAG 구간은 EN2에게 Batch B 최고 구간입니다. `understanding-embeddings`는 수식 대신 의미 좌표로 설명해서 빠르게 들어오지만, EN2는 더 엄밀한 평가를 원합니다. `document-chunking-strategy`의 크기, 경계, 중첩, 메타데이터는 데이터 모델링 감각과 맞아요. `vector-search-basics`의 Top-K, 필터, 하이브리드 검색은 특히 좋습니다. 그는 제품 코드나 에러 메시지처럼 정확 문자열이 중요한 질문에는 키워드 검색이 강하다는 설명을 신뢰합니다. `grounded-rag-answers`는 EN2가 AI를 진지하게 받아들이게 하는 lesson이에요. Citations, abstain policy, missingEvidence는 회의적 분석가에게 필요한 언어입니다.

  Phase 7도 전반적으로 설득력 있습니다. `function-calling`은 실행 책임을 모델과 코드로 분리한다는 점이 좋습니다. `mini-agent-loop`는 최대 스텝 수와 같은 도구 반복 실패 시 사람에게 넘기는 조건이 있어 신뢰를 줍니다. `tool-permission-safeguards`는 권한 설계가 강하고, EN2가 가장 좋아하는 보안 lesson 중 하나예요. `prompt-injection-defense`는 외부 문서와 시스템 지시를 분리하는 원칙이 명확합니다. 다만 EN2는 방어 정책을 “테스트 통과”로 끝내지 않고, 운영 중 탐지와 모니터링까지 보고 싶어 합니다.

  Phase 10 빈칸은 EN2에게 가장 큰 손상입니다. 그는 engineer promise의 “평가·보안까지 포함된 운영 가능한 AI 시스템”을 보고 왔습니다. Phase 7에서 보안 기초를 다룬 뒤 Phase 10에서 evals와 security를 기대하는데 lesson이 없습니다. 회의적인 시니어에게는 이 부재가 단순한 베타 상태가 아니라 “가장 중요한 검증 장이 비어 있다”로 읽힙니다.

  `capstone-plan-and-launch`는 EN2에게 약간 범용적입니다. 공개 URL, README, 회고는 좋지만, 데이터분석 시니어가 기대하는 캡스톤은 모델이 답한 결과의 정량 평가, 샘플링 검수, 실패 케이스 표, 운영 모니터링이 붙은 형태예요. 현재 capstone은 좋은 결말이지만 engineer 고급 학습자의 엄밀함에는 조금 낮습니다.

  > “답하지 않는 정책까지는 좋았어요. 그런데 evals가 빈칸이면 운영 가능하다는 말을 아직 믿기 어렵습니다.”

- **이탈 위험 지점** — 가장 큰 위험은 Phase 10 빈칸이에요. EN2의 회의주의를 설득할 평가와 보안 심화가 없습니다. 두 번째는 Phase 5의 웹앱 구현 편향이에요. 데이터분석가형 engineer에게 R/SQL/파이프라인 예시가 부족합니다.

- **빛나는 지점** — `grounded-rag-answers`는 EN2에게 LLM을 신뢰 가능한 시스템으로 만들 수 있다는 첫 확신을 줘요. `plan-with-ai`와 `tool-permission-safeguards`도 시니어의 운영 감각과 잘 맞습니다.

- **회복 제안** — Phase 10에 eval set, regression, red team, monitoring lesson을 먼저 채워요. Engineer 예시에 웹앱뿐 아니라 데이터 파이프라인, SQL 검증, 대시보드 이상 탐지를 넣어요. Capstone에는 engineer 전용 평가 산출물을 추가해 주세요.

- **완주 가능성** — **3.6 / 5**예요. 내용의 방향은 신뢰하지만, 평가 Phase 부재 때문에 마지막 확신이 약합니다.

### 2.5 EX1 — 22세, CS 대학원 1학기

- **한 줄 기대** — 아직 한 여정에 정착하지 않고, AI 리터러시와 프롬프트, 업무 루프를 넓게 맛본 뒤 자기 방향을 고르고 싶어 해요.

- **여정 동선** — EX1은 explorer recommendedPhases를 따라 Phase 0, 1, 2, 3만 지나갑니다. Phase 0이 비어 있는 점은 아쉽지만 치명적이지 않습니다. CS 대학원생이고 GitHub 기여를 시작했기 때문에 도구 설치는 스스로 할 수 있어요. 다만 explorer는 “어디에 정착할지 아직 모르는 사람”을 위한 메타 입구인데, 시작 세팅 lesson이 없으면 학습 매니아인 EX1도 학교의 표준 실습 환경을 확인하지 못합니다. 그는 넘어가지만, 시작 경험은 덜 의례적입니다.

  Phase 1의 `what-is-a-loop`는 EX1에게 아주 좋은 입구예요. 그는 학습 자체를 좋아하고, 루프라는 개념을 연구 습관, 오픈소스 기여, 논문 읽기, 코드 리뷰에 붙일 수 있습니다. input, process, check, repeat 네 칸은 단순하지만 이후 자동 루프와 agent loop의 씨앗이 됩니다. 특히 Lesson 2.5와 4.7 링크가 나중의 심화 가능성을 보여 줘서 EX1의 호기심을 자극해요.

  `common-skills-of-future-proof-people`는 EX1에게 가치관을 줍니다. “AI를 쓰는 사람”과 “AI로 만드는 사람”의 차이는 대학원생에게 진로 언어가 됩니다. Human-in-the-loop, 근거 요구, AI 사용 회고는 연구와 개발 모두에 필요한 습관입니다. 다만 Part A 자동 점검에서 확인된 5단 구조 위반과 32행 콜론 종결은 EX1 같은 구조 민감 학습자에게 눈에 띌 수 있어요. 내용은 좋지만, 학교가 구조를 강조할수록 문서 구조 오류는 작게라도 신뢰를 깎습니다.

  `what-llms-are-good-and-bad-at`은 EX1에게 매우 잘 맞습니다. 패턴 일반화, 문맥 창, 확률적 생성, Knowledge cutoff 같은 설명은 CS 배경과 맞고, “모델이 똑똑한가”보다 “어떤 모양의 일에 강한가”로 보라는 관점이 좋습니다. 그는 이 lesson을 동아리나 연구실 사람들에게 설명하고 싶어 할 가능성이 큽니다. 미션도 주간 업무 10개 분류라 부담이 낮아요.

  `hallucination-verification`은 EX1에게 중요합니다. 없는 논문 예시는 대학원생에게 매우 현실적이에요. Citation-required, Chain of Verification, Confidence 점수 요청은 논문 탐색과 기술 블로그 작성에 바로 붙습니다. 다만 Part A 자동 점검의 콜론 종결 2곳이 있고, RAG로 근거 못박기 링크가 Phase 6으로 열립니다. Explorer 동선에는 Phase 6이 없으므로 EX1은 “나중에 engineer로 가면 보겠다”고 표시할 수 있지만, EX2에게는 길이 분산될 수 있습니다.

  `checks-before-trusting-ai-output`은 Phase 1을 잘 닫습니다. FOSCB 5축 60초는 연구 노트, 과제, 코드 PR, 발표 자료에 모두 붙어요. EX1은 Fact, Origin, Scope, Confidence, Bias를 자기 학습 루틴으로 받아들입니다. 다만 5단 구조 위반과 88행 콜론 종결이 있고, “매일 같은 시간, 같은 도구에서 부르세요” 이후의 리스트가 형식상 걸립니다. EX1은 이런 디테일을 보며 “콘텐츠 검증을 가르치는 학교라면 자기 문서 검증도 더 엄격해야 한다”고 생각할 수 있어요.

  Phase 2의 `structure-of-good-prompts`는 EX1에게 너무 쉽지만 좋은 공통어예요. 4축 템플릿은 과제 질문, 논문 요약, GitHub issue comment, 코드 리뷰에 바로 쓰입니다. `enforcing-output-format`은 EX1에게 난이도 상승이지만 흥미롭습니다. JSON 스키마와 retry loop는 CS 학생에게 자연스럽고, 그는 오히려 더 엄밀한 parser, validation library, formal grammar가 궁금해져요. Batch A와 FO2에게 위험한 lesson이 EX1에게는 방향성을 주는 lesson으로 바뀝니다.

  `feeding-long-documents`는 논문 읽기와 잘 맞습니다. 40~60쪽 논문이나 백서로 Full Context, Map-Reduce, Selective Injection을 비교하는 과제는 EX1에게 즐거운 실험입니다. 그는 “RAG의 씨앗”이라는 설명을 보고 engineer 여정에 관심이 생길 수 있어요. 산출물 만족도도 높습니다. 다만 explorer 본래 약속은 “어디에 정착할지 고른다”인데, 이 lesson은 engineer 쪽으로 강하게 끌어당깁니다.

  `build-personal-prompt-library`는 EX1이 좋아할 만한 지식관리 lesson입니다. GitHub 기여를 시작한 학생이라 `prompt-library/`, README, Front Matter, version 관리가 낯설지 않아요. 연구 요약, 코드 리뷰, 이슈 작성, 발표 준비 프롬프트를 모을 수 있습니다. 다만 학습 매니아인 EX1은 프롬프트 라이브러리가 곧 eval dataset이나 실험 로그로 발전하는 길을 보고 싶어 합니다.

  `meta-prompting`은 EX1에게 아주 좋습니다. “프롬프트를 만드는 프롬프트”라는 개념은 메타 학습에 관심 있는 대학원생에게 흥미롭고, Goal, Context, Constraints, Done When은 연구 과제, 오픈소스 PR, 논문 리뷰를 구조화합니다. 이 lesson은 explorer에게도 “내가 engineer 쪽인지, researcher 쪽인지”를 생각하게 만들어요.

  Phase 3의 `automate-report-drafts`는 EX1에게 중간 정도예요. 주간 보고서보다 연구 미팅 노트, 실험 로그, 과제 요약으로 바꾸면 유용합니다. Template Grounding과 Draft-Review-Final은 연구실 보고에도 잘 맞지만, 회사 보고서 예시가 중심이라 학생에게는 약간 멀어요. `meeting-notes-pipeline`은 연구실 미팅이나 스터디 기록에 잘 붙습니다. Action Item, Speaker Attribution, Decision Lock은 그룹 프로젝트에서 특히 좋습니다.

  `research-workflow`는 EX1에게 Batch B에서 가장 빛나는 lesson 중 하나입니다. 가짜 출처, 존재하지 않는 URL, 원문에 없는 문장이라는 도입 장면이 대학원생에게 정면으로 꽂혀요. Question Decomposition, Evidence Table, Confidence Floor는 논문 탐색, 시장 리서치, 오픈소스 기술 조사 모두에 유용합니다. EX1은 이 lesson을 “AI를 공부하는 사람에게 필요한 기본 연구 윤리”로 받아들입니다.

  `blog-writing-pipeline`은 EX1에게 의외의 진로 신호입니다. GitHub 기여를 시작한 학생은 배운 것을 블로그나 README로 공유해야 하고, 자기 목소리를 지키며 AI를 쓰는 법이 필요해요. Voice Preservation, Multi-pass Editing, Style Capsule은 creator뿐 아니라 explorer의 학생-교육자 identity와 맞습니다. 다만 Phase 3 끝에서 Phase 4부터 코드 시스템 자동화로 확장된다는 안내는 explorer recommendedPhases 밖입니다. EX1은 더 가고 싶어지지만, explorer 여정은 여기서 끝나요.

  > “Phase 3까지 해보니 engineer로 더 가고 싶은데, explorer가 다음 어디로 갈지 추천해 주면 좋겠어요.”

- **이탈 위험 지점** — EX1의 이탈 위험은 낮지만, 첫 번째 위험은 Phase 0 빈칸으로 인한 표준 환경 부재예요. 두 번째는 explorer 여정 종료 후 다음 선택 가이드 부족입니다. Phase 3 뒤에 founder, engineer, creator 중 어디로 넘어갈지 안내가 더 필요해요.

- **빛나는 지점** — `research-workflow`는 EX1의 연구 습관과 정확히 맞습니다. `meta-prompting`도 메타 학습 성향을 살려 다음 여정 선택에 도움을 줍니다.

- **회복 제안** — Explorer 끝에 “다음 여정 선택 진단”을 넣어요. Phase 0에는 공통 실습 저장소와 도구 체크를 최소 lesson으로 채워 주세요. Phase 1 구조 위반과 콜론 종결 오류는 빠르게 고쳐서 신뢰를 보존해요.

- **완주 가능성** — **4.3 / 5**예요. EX1은 Phase 3까지 즐겁게 완주하고, 이후 engineer 심화로 넘어가고 싶어질 가능성이 큽니다.

### 2.6 EX2 — 31세, 전직 모색

- **한 줄 기대** — AI를 배우고 싶지만 어디부터 시작해야 할지 막막한 사람이, 부담 없는 첫 루프와 자기 방향을 얻고 싶어 해요.

- **여정 동선** — EX2는 explorer 여정으로 들어옵니다. targetLearner가 “AI를 진지하게 처음 배우는 사람, 다섯 여정 중 어디에 정착할지 아직 모르는 호기심형 학습자”라고 되어 있어 자기 이야기처럼 느껴요. 하지만 Phase 0이 비어 있습니다. 이 사람에게 Phase 0 빈칸은 매우 큽니다. 고시를 끝내고 전직을 모색하는 상황에서는 새로운 도구 하나도 심리적 장벽이에요. Codex CLI, Claude Code, GitHub, API 키라는 단어는 아직 의미가 흐리고, lesson이 없으면 “내가 준비가 안 된 상태인가”라는 불안을 만듭니다.

  `what-is-a-loop`는 EX2를 다시 안심시킵니다. 도구를 배우기 전에 내 하루 반복을 네 칸으로 그리는 미션은 부담이 낮아요. 고시 생활도 루프가 많았고, 전직 준비도 정보 수집, 지원서 작성, 회고가 반복됩니다. input, process, check, repeat는 새로운 세계를 작게 만드는 언어예요. 산출물 `loop-card.md`는 파일명은 낯설지만, 본문이 어려운 도구를 요구하지 않아 따라갈 수 있습니다.

  `common-skills-of-future-proof-people`은 EX2에게 좋은 철학을 주지만 약간 부담도 줍니다. “AI를 쓰는 사람”과 “AI로 만드는 사람”의 대비는 동기부여가 되지만, 아직 직무가 없는 EX2에게 “당신 업무”를 3문장으로 설명하라는 미션은 막힐 수 있어요. 그는 현재 업무가 아니라 전직 준비 맥락이 필요합니다. AI에게 맡겨도 되는 일과 위험한 일을 “채용공고 분석, 자기소개서 초안, 직무 탐색, 정보 검증”으로 예시를 바꾸면 훨씬 친절해져요.

  `what-llms-are-good-and-bad-at`은 EX2에게 중요한 안전장치입니다. LLM이 문장 바꾸기와 요약에는 강하지만 수치와 최신 사실에는 약하다는 설명은 전직 정보 탐색에 매우 필요해요. 그는 채용시장 전망, 연봉, 교육 과정 추천 같은 답을 무작정 믿기 쉽습니다. 강함, 보조 가능, 약함 분류는 자기 학습과 진로 탐색을 보호해 줍니다. 다만 주간 업무 10개가 없는 사람에게는 “전직 준비 작업 5개”로 줄여야 해요.

  `hallucination-verification`은 EX2에게 조금 어렵지만 꼭 필요합니다. 없는 논문 예시는 고시생 출신에게 익숙한 “근거 없는 인용” 경계로 다가옵니다. Citation-required와 Confidence 점수 요청은 할 수 있어요. Chain of Verification은 단계가 길어 피로할 수 있습니다. 특히 “내 분야에서 가장 위험한 환각 유형 3개”라는 미션은 아직 분야가 없는 EX2에게 막막합니다. “진로 탐색에서 위험한 환각 3개” 예시가 있으면 좋아요. 예를 들어 존재하지 않는 자격증, 오래된 채용 정보, 부정확한 연봉 범위 같은 것이에요.

  `checks-before-trusting-ai-output`은 EX2에게 실전적입니다. FOSCB 5축 60초는 채용공고, 커리어 조언, 학습 로드맵, 자기소개서 피드백을 검토할 때 쓸 수 있어요. 그러나 도메인 가중 표가 의료, 법, 금융, 마케팅, 데이터 분석, 코드 중심이라 “전직 탐색자”는 자기 칸을 찾지 못합니다. EX2는 쉬운 문장보다 자기 상황을 반영한 예시가 필요합니다. Part A 구조 위반은 직접 알아차리지 못하겠지만, 문서가 약속한 5단 구조를 스스로 어기는 점은 콘텐츠 품질 측면에서 개선 대상입니다.

  Phase 2의 `structure-of-good-prompts`는 EX2가 따라갈 수 있는 첫 기술 lesson입니다. “나에게 맞는 AI 직무 3개를 비교해줘” 같은 모호한 질문을 4축으로 바꾸면 답이 좋아지는 것을 체감할 수 있어요. 하지만 `enforcing-output-format`에 들어가면 다시 위험합니다. JSON, 파서, Node.js, TypeScript는 EX2에게 너무 빠릅니다. 그는 표로 직무 비교를 받거나, Notion 표로 학습 계획을 만드는 정도는 원하지만, 파싱 실패 재시도 루프를 구현할 준비는 없습니다.

  `feeding-long-documents`는 전직 준비와 잘 맞습니다. 교육 과정 소개서, 채용공고 묶음, 직무 설명, 회사 블로그를 비교할 수 있어요. 하지만 40~60쪽 문서 하나를 세 전략으로 비교하는 과제는 부담이 큽니다. EX2에게는 “채용공고 5개를 넣고 공통 요구 역량을 뽑기”가 더 현실적입니다. 개념은 좋지만 미션 크기와 예시가 아직 explorer 초심자에게 큽니다.

  `build-personal-prompt-library`는 EX2에게 장기적으로 좋지만 초반에는 부담입니다. prompt-library 폴더, YAML front matter, Git 저장소는 모두 낯섭니다. 그는 ChatGPT 대화, 메모 앱, Notion 정도를 씁니다. 이 lesson이 “메모장으로 시작해도 된다”고 강하게 말하면 남을 수 있어요. 그렇지 않으면 프롬프트를 관리하기 전에 도구 관리에서 지칩니다.

  `meta-prompting`은 EX2에게 의외로 큰 회복점입니다. “내가 아래 작업을 AI에게 맡기려고 합니다. 더 잘 시키기 위한 정밀 프롬프트를 작성해 주세요”라는 시작 문장은 막막함을 줄여요. 좋은 질문을 못 만드는 사람에게 좋은 질문의 초안을 만들게 하는 방식이기 때문입니다. EX2는 이 lesson에서 “내가 전문가처럼 질문하지 못해도, 질문 만드는 법을 물어볼 수 있구나”라고 느낍니다.

  Phase 3의 `automate-report-drafts`는 EX2에게 직접 업무 예시는 멀지만, 자기소개서 초안이나 학습 회고 보고서로 바꾸면 쓸 수 있습니다. 과거 보고서 3개 대신 과거 자기소개서, 학습 일지, 프로젝트 회고를 넣을 수 있어요. 하지만 본문은 회사 보고서 중심입니다. `meeting-notes-pipeline`은 스터디 모임이나 멘토링 상담 노트에 쓸 수 있지만, 지금 당장 회의가 많은 사람은 아니라 몰입이 낮아요.

  `research-workflow`는 EX2에게도 빛나는 lesson입니다. 전직 준비자는 교육 과정, 부트캠프, 직무 전망, 회사 정보를 많이 검색합니다. 가짜 출처와 오래된 자료에 속지 않는 능력은 매우 중요해요. Question Decomposition, Evidence Table, Confidence Floor는 막막한 진로 탐색을 검증 가능한 하위 질문으로 쪼개 줍니다. 단, 작업 흐름의 검색과 Evidence Table 채움이 30~60분으로 꽤 길어, “오늘은 하위 질문 3개만” 루트가 있으면 더 좋습니다.

  `blog-writing-pipeline`은 EX2에게 전직 포트폴리오 글쓰기 수업으로 바뀔 수 있습니다. 고시 이후 배운 것, AI 학습 일지, 첫 프로젝트 회고를 자기 목소리로 쓰는 데 도움이 돼요. Voice Preservation은 아직 공개 글이 적은 EX2에게 어려울 수 있지만, “내가 쓴 문장 3개”나 “좋아하는 글 3개”로 시작하게 하면 가능합니다. Explorer identity가 학생-교육자라면, 이 lesson은 배운 것을 나누는 첫 발행으로 잘 맞아요.

  Phase 3이 끝나면 EX2는 다음 방향을 정해야 합니다. 그런데 explorer recommendedPhases는 여기서 끝나고, 어떤 신호를 보고 practitioner, creator, founder, engineer로 넘어갈지 안내가 약합니다. EX1은 스스로 engineer로 갈 수 있지만, EX2는 바로 이 지점에서 다시 막막해질 수 있어요. “당신이 만든 산출물을 보고 다음 여정을 고르세요”라는 진단이 필요합니다.

  > “처음엔 할 수 있을 것 같았는데, JSON이 나오면 또 내가 잘못 들어온 건가 싶어요. 그래도 리서치 표는 전직 준비에 바로 쓸 수 있겠어요.”

- **이탈 위험 지점** — 첫 번째는 Phase 0 빈칸이에요. EX2는 시작 세팅의 빈칸을 자기 준비 부족으로 해석할 수 있습니다. 두 번째는 `enforcing-output-format`이에요. JSON과 Node.js는 explorer 초심자에게 너무 빠른 개발자 신호입니다.

- **빛나는 지점** — `what-is-a-loop`는 막막함을 작게 줄이는 좋은 입구입니다. `research-workflow`는 전직 정보 탐색을 검증 가능한 과정으로 바꿔 줍니다.

- **회복 제안** — Explorer용 Phase 0에 “오늘은 ChatGPT와 문서 하나만으로 시작” 같은 초저마찰 루트를 넣어요. `enforcing-output-format`에는 표로 끝내는 explorer 루트를 추가해요. Phase 3 끝에는 다음 journey 선택 진단과 산출물 리뷰 체크를 붙여 주세요.

- **완주 가능성** — **2.9 / 5**예요. Phase 1과 `research-workflow`는 강하지만, 시작 빈칸과 개발자 급경사 때문에 혼자 완주하기는 불안합니다.

## 3. Batch B 종합

### 3.1 Batch B 공통 막힘 — 3명 이상이 같은 lesson 에서 막힌 곳

Batch B에서 3명 이상이 반복해서 막힌 첫 지점은 Phase 0 빈칸이에요. FO1, EN1, EX1은 스스로 넘기지만 “학교의 표준 환경이 무엇인지”를 확인하지 못합니다. FO2, EN2, EX2는 더 직접적으로 흔들려요. FO2는 코딩 없는 founder로서 계정, API 키, GitHub, 비용 감각을 안내받지 못하고, EX2는 시작 빈칸을 자기 준비 부족으로 해석할 수 있습니다. EN2도 설치보다 “데이터분석가형 engineer가 이 학교 안에서 어디에 서는지”를 알고 싶어 해요. Phase 0은 단순 준비물이 아니라 학습자에게 “당신도 이 학교의 대상입니다”라고 말하는 자리입니다.

두 번째 공통 막힘은 `enforcing-output-format`이에요. Batch A와 마찬가지로 JSON, 파싱, Node.js, TypeScript가 비개발자에게 급경사로 작동합니다. Batch B에서는 반응이 더 갈립니다. EN1에게는 좋은 lesson이고, EX1에게는 흥미로운 심화입니다. FO1도 버팁니다. 하지만 FO2와 EX2는 여기서 자기 여정이 개발자 과정으로 바뀌었다고 느껴요. EN2는 개념에는 동의하지만 R/SQL 분석가 관점의 예시 부족을 느낍니다. 따라서 문제는 lesson 자체가 어려운 것이 아니라, 같은 lesson 안에 역할별 실행 경로가 없다는 점이에요.

세 번째 공통 막힘은 빈 Phase 9와 10이에요. FO1과 FO2는 Phase 9 데이터 의사결정이 비어 있어 founder promise의 출시 후 판단이 약해집니다. EN1과 EN2는 Phase 10 evals/security가 비어 있어 engineer promise의 “운영 가능한 AI 시스템”이 닫히지 않습니다. EX1과 EX2는 Phase 9와 10을 직접 지나지는 않지만, explorer 끝에서 다음 여정으로 넘어갈 때 후반부 지도가 비어 있다는 신호를 간접적으로 받습니다.

네 번째 막힘은 Phase 4와 5의 웹앱 중심성입니다. FO1과 EN1에게는 적합하지만, FO2에게는 직접 구현 부담이고 EN2에게는 데이터 파이프라인 예시 부족입니다. `connect-ai-api`, `streaming-response-ui`, `structured-output-handling`, `conversation-storage-design`은 좋은 기본기지만, founder와 engineer 내부에서도 학습자 유형에 따라 “직접 구현”, “명세 작성”, “운영 판단” 경로가 갈라져야 합니다.

### 3.2 Journey 비대칭 — founder/engineer/explorer 중 가장 친절한 journey vs 가장 어려운

가장 친절한 journey는 engineer예요. 이유는 Phase 2, 4, 5, 6, 7이 비교적 선형으로 쌓이기 때문입니다. 좋은 프롬프트에서 구조화 출력으로 가고, 코딩 에이전트 협업 루틴을 세운 뒤, AI API와 저장 구조를 만들고, RAG와 agent를 붙입니다. EN1에게는 거의 자연스러운 성장 경로예요. EN2도 웹앱 편향과 Phase 10 빈칸을 지적하지만, `grounded-rag-answers`, `tool-permission-safeguards`, `prompt-injection-defense` 같은 lesson에서 신뢰를 얻습니다.

가장 어려운 journey는 founder예요. founder는 본질적으로 두 세계를 동시에 지나야 합니다. 하나는 제품을 만드는 기술이고, 다른 하나는 시장, 사용자, 비용, 지표, 출시 판단입니다. 현재 lesson은 기술 루프가 꽤 많고 좋은 편이지만, founder에게 필요한 시장 검증과 데이터 의사결정이 약합니다. FO1은 코딩 경험으로 버티며 `ai-app-cost-and-usage`까지 잘 도달하지만, FO2는 Phase 0과 Phase 5에서 크게 흔들려요. founder 안에서도 예비창업 개발형과 비개발 사업자형의 차이가 큽니다.

Explorer는 중간입니다. Phase 1에서 루프, 판단, LLM 강약점, 환각 검증, 트러스트 체크가 잘 쌓이고, Phase 2와 3의 프롬프트와 리서치 workflow도 넓은 학습자에게 좋습니다. EX1은 매우 잘 맞습니다. 하지만 EX2는 시작과 개발자 급경사에서 흔들리고, Phase 3 이후 “다음에 어디로 가야 하나”가 약합니다. Explorer는 완주 자체보다 다음 여정 선택이 핵심인데, 이 선택 장치가 아직 충분히 보이지 않습니다.

### 3.3 지능대 비대칭 — 20대 고지능 FO1·EN1·EX1 vs 30대 중지능 FO2·EN2·EX2

20대 고지능 그룹은 현재 lesson의 빈칸과 급경사를 스스로 번역합니다. FO1은 founder lesson을 제품 MVP 개발 루틴으로 재조립하고, EN1은 구조화 출력과 RAG, agent를 자기 백엔드 경험에 붙입니다. EX1은 explorer 수업을 학습 지도처럼 소비하고, Phase 3 뒤에 engineer 심화로 갈 준비를 스스로 합니다. 이들은 오류나 빈칸을 만나도 “나중에 보완하면 되겠다”고 읽습니다.

30대 중지능 그룹은 능력이 낮아서가 아니라, 시간과 맥락 전환 비용이 크기 때문에 막힙니다. FO2는 매장 운영 때문에 학습 시간이 짧고, EX2는 전직 불안 때문에 시작 빈칸을 자기 부족으로 해석할 수 있습니다. EN2는 경험이 많아서 오히려 더 엄격합니다. 그는 LLM을 믿기 위해 평가, 보안, 운영 모니터링을 요구합니다. 이 그룹에게 필요한 것은 더 쉬운 말만이 아니라 더 작은 통과 단위와 더 명확한 역할 번역이에요.

개발자 용어에 대한 반응도 다릅니다. FO1, EN1, EX1은 JSON, schema, Front Matter, GitHub, RAG, Function Calling을 학습 대상으로 받아들입니다. FO2와 EX2는 같은 단어를 “내가 아직 들어오면 안 되는 문”으로 읽습니다. EN2는 단어를 이해하지만 자기 전문영역인 R, SQL, 데이터 품질 검증으로 번역되지 않으면 신뢰하지 않습니다. 따라서 같은 lesson 안에 “표로 끝내기”, “명세로 넘기기”, “코드로 구현하기”, “운영 지표로 검증하기” 같은 분기가 필요합니다.

### 3.4 빈 Phase 영향 — Phase 0/8/9/10 에서 6명이 본 반응

Phase 0 빈칸은 Batch B 전원에게 영향을 줍니다. 빠른 학습자는 그냥 넘어가지만, 시작 신뢰는 손상됩니다. FO2와 EX2에게는 가장 직접적인 이탈 위험이에요. 이들은 “무엇을 설치하고 어떤 계정을 만들어야 하는지”보다 먼저 “나는 이 학교를 들어도 되는 사람인가”를 확인하고 싶어 합니다. Phase 0은 그 확인을 해주는 자리여야 합니다.

Phase 8은 Batch B의 recommendedPhases에는 직접 들어오지 않습니다. 그래서 Batch A의 creator처럼 핵심 단절로 작동하지는 않아요. 다만 `capstone-plan-and-launch`에서 Phase 8이 확장 자리로 언급되고, EX1이 다음 여정을 탐색할 때 creator 방향을 볼 수 있으므로 간접 영향은 있습니다. Batch B 기준으로는 Phase 8 빈칸보다 Phase 9와 10이 훨씬 큽니다.

Phase 9 빈칸은 founder에게 큽니다. FO1은 MVP 출시 후 사용자 지표와 전환을 보고 싶어 하고, FO2는 온라인 전환이 실제 매출이나 문의로 이어지는지 확인하고 싶어 합니다. 그런데 데이터 의사결정 lesson이 없으면 제품 만들기에서 사업 판단으로 넘어가는 다리가 끊깁니다.

Phase 10 빈칸은 engineer에게 큽니다. EN1과 EN2 모두 Phase 7에서 security 기초까지 왔기 때문에, 다음에는 evals, monitoring, red team, regression을 기대합니다. lesson이 없으면 engineer promise의 “운영 가능한 AI 시스템”이 마지막 검증에서 멈춰요. 특히 EN2 같은 회의적 시니어에게는 이 빈칸이 가장 큰 신뢰 손상입니다.

### 3.5 Batch A 와의 일치 / 갈라짐 — A 의 핵심 결과 비교 표

| 구분 | Batch A 핵심 결과 | Batch B 관찰 |
|---|---|---|
| 일치 | 완주 가능성 평균이 3점대 초중반이고, 빈 Phase가 여정 단절로 작동했어요. | Batch B 평균도 **3.42 / 5**로 비슷해요. Phase 0은 전원에게, Phase 9는 founder에게, Phase 10은 engineer에게 직접 단절을 만들어요. |
| 일치 | `enforcing-output-format`의 JSON·Node.js 급경사가 가장 큰 이탈 위험이었어요. | FO2와 EX2도 같은 lesson에서 크게 흔들립니다. 다만 EN1과 EX1에게는 오히려 유용한 심화 lesson으로 작동해요. |
| 일치 | 빛나는 lesson은 실전 산출물이 분명하고 검증 루틴이 있는 곳이었어요. | Batch B에서도 `grounded-rag-answers`, `coding-agent-setup`, `research-workflow`처럼 산출물과 안전 기준이 분명한 lesson이 강하게 빛나요. |
| 갈라짐 | Batch A에서는 `ai-app-cost-and-usage`가 adopter와 creator에게 Phase 5·6·7 전제를 갑자기 요구하는 문제로 보였어요. | Batch B의 FO1에게는 이 lesson이 founder promise와 매우 잘 맞습니다. 다만 EN1과 EN2에게는 Phase 10 빈칸 뒤에 오는 운영 비용 lesson이라 평가 전제가 빠진 느낌이 남아요. |
| 갈라짐 | Batch A에서 가장 친절한 journey는 practitioner였고 adopter가 어려웠어요. | Batch B에서는 engineer가 가장 선형적으로 친절하고, founder가 가장 비대칭이 큽니다. founder 안에서 FO1과 FO2의 차이가 특히 커요. |

### 3.6 듀이 1차와의 비교 — `/tmp/dewey-context-snapshot.md` 결 중 동의 / 새로 본 / 다른 시각

| 구분 | 듀이 1차 결 | Batch B 관찰 |
|---|---|---|
| 동의한 것 | Phase 0/8/9/10 부재가 founder·engineer·explorer 여정을 끊는다는 지적 | Batch B에서는 Phase 0, 9, 10의 영향이 특히 컸어요. Phase 8은 직접 동선에는 없지만 capstone과 다음 여정 탐색에서 간접 공백으로 남아요. |
| 동의한 것 | 비개발자에게 `enforcing-output-format`, JSON 스키마, Codex 환경 셋업이 어렵다는 지적 | FO2와 EX2가 정확히 같은 이유로 흔들려요. 이 lesson은 삭제가 아니라 역할별 우회 루트가 필요합니다. |
| 새로 본 것 | 듀이 1차는 Phase 4 권한 모델을 어려운 부분으로 봤어요. | Batch B에서는 `coding-agent-setup`, `plan-with-ai`, `tool-permission-safeguards`가 FO1, EN1, EN2에게 신뢰를 올리는 강점으로 보였어요. 권한 모델은 비개발자에게는 어렵지만 engineer와 기술 founder에게는 핵심 가치예요. |
| 새로 본 것 | 듀이는 시간 가드레일 부족을 언급했어요. | Batch B에서는 시간보다 “통과 방식의 분기”가 더 중요해 보였어요. 같은 50분 lesson이라도 FO2는 명세서로 끝내고, EN1은 코드 구현까지 가고, EN2는 평가 기준을 붙이는 식의 분기가 필요합니다. |
| 다른 시각 | 듀이는 `targetJourneys`가 6개 다 붙은 lesson의 메시지가 흐릿하다고 봤어요. | Batch B에서는 넓은 target 자체보다 “다음 여정 선택 장치” 부족이 더 문제였어요. Explorer는 넓게 배우는 것이 맞지만, Phase 3 뒤에 어디로 갈지 판정해 주는 브릿지가 필요합니다. |

Batch B 내부의 짧은 결론은 이렇습니다. AI Builder School의 현재 35 lesson은 기술 founder와 실무 engineer에게 이미 꽤 강한 뼈대를 갖고 있어요. 특히 Phase 4의 코딩 에이전트 협업 루틴, Phase 6의 RAG 신뢰 구조, Phase 7의 권한과 인젝션 방어는 단순 입문 콘텐츠보다 훨씬 실제적입니다. `coding-agent-setup`과 `grounded-rag-answers`는 이 학교가 말하는 Harness Engineering의 장점을 잘 보여 줘요.

반면 founder와 explorer 안의 비개발자, 또는 전환기 학습자에게는 시작과 분기가 부족합니다. FO2와 EX2는 배우려는 의지가 없어서가 아니라, 첫 세팅과 JSON 급경사를 자기 부적합 신호로 읽기 때문에 흔들립니다. EN2는 반대로 충분히 경험이 많아서, evals와 monitoring이 없는 상태를 쉽게 넘어가지 않습니다. 이 세 사람은 서로 다른 이유로 같은 메시지를 줍니다. “내 상황에 맞는 통과 기준을 보여 달라”는 메시지예요.

따라서 Batch B의 개선 우선순위는 세 가지입니다. 첫째, Phase 0을 모든 여정의 심리적 입구로 채웁니다. 둘째, `enforcing-output-format`과 Phase 5 lesson에 노코드 표 루트, 명세 루트, 구현 루트를 분리합니다. 셋째, Phase 9와 10에 최소 브릿지 lesson을 넣어 founder의 데이터 판단과 engineer의 평가·보안 루프를 끊기지 않게 합니다.

Batch A와 합치지 않고 Batch B 안에서만 보아도, 핵심은 난이도 하향이 아니에요. EN1과 EX1은 더 깊이 가는 길을 원하고, FO2와 EX2는 더 작게 끝나는 길을 원하며, EN2는 더 검증 가능한 길을 원합니다. 이 셋은 서로 충돌하지 않습니다. 같은 lesson 아래에 통과 방식만 분기하면, 여섯 페르소나는 같은 학교 안에서 각자의 속도로 남을 수 있어요.
