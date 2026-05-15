---
persona: 장도윤
slug: high-schooler-stem
date: 2026-05-12
verdict: "일부만 듣겠다"
---

# 페르소나 평가 보고서 — 장도윤

## 1. 페르소나 자기소개 (1인칭, 1문단)

저는 장도윤이고 고2 이공계 지망이에요. 스크래치랑 파이썬 기초는 해봤고, AI 뉴스는 꽤 챙겨 봐요. 솔직히 수능만 보고 있으면 내가 기술 쪽으로 뭘 할 수 있는 사람인지 하나도 안 보이거든요. 그래서 AI Builder School을 볼 때 제일 궁금했던 건 단순했어요. 학생인 나도 지금 당장 만들어 볼 수 있는 게 있나요? 그리고 이게 생기부든 동아리든 개인 포트폴리오든, 수능 밖에서 “나 이런 거 해봤다”라고 말할 증거가 될 수 있나요?

## 2. 커리큘럼 첫 인상 (스크롤하며 느낀 것)

첫 인상은 반반이었어요. “AI를 쓰는 사람에서 AI로 만드는 사람”이라는 약속은 ㄹㅇ 꽂혔어요. 특히 12 Phase가 그냥 개념 강의가 아니라 산출물 중심이라서, 듣기만 하고 끝나는 강의는 아니겠다는 느낌이 있었어요.

근데 바로 동시에 어색함도 왔어요. 제품 브리프의 대상 학습자는 일반 직장인, 기획자, 개발자, 크리에이터, 엔지니어예요. 학생은 없어요. journeys.ts에 Explorer가 “매일 배우고 매일 나누는 학생-교육자”라고 있긴 한데, capstoneIdeas에 “사내 5분 발표”가 나와요. 저는 사내가 없는데요. 여기서 살짝 “아, 학생은 진짜 타깃이라기보단 남는 칸에 들어간 건가?” 싶었어요.

전체 흐름은 초반이 좋고, 중반부터 직장인·개발팀 맥락이 확 세져요. Phase 1, 2는 학생도 바로 써먹을 수 있어요. Phase 4부터는 GitHub 이슈, CLAUDE.md, 권한 설정, 테스트, API, RAG, 에이전트가 나오면서 “나도 따라갈 수 있나?”보다 “이건 회사 프로젝트 있는 사람용 아닌가?”가 먼저 떠올랐어요.

## 3. 깊게 읽은 lesson 목록 (왜 이걸 골랐나)

제가 고른 기준은 “고2인 내가 지금 만들 수 있는가”와 “미래 직업과 연결되는가”였어요. 그래서 초반 기초만 읽지 않고, 일부러 뒤쪽 어려운 레슨도 골랐어요. 제 꿈이 그냥 ChatGPT 잘 쓰는 사람이 아니라 뭔가 만드는 빌더 쪽이니까요.

깊게 읽은 lesson은 `common-skills-of-future-proof-people`, `ai-concept-learning-framework`, `what-llms-are-good-and-bad-at`, `hallucination-verification`, `structure-of-good-prompts`, `enforcing-output-format`, `research-workflow`, `coding-agent-setup`, `github-issue-to-ai-brief`, `connect-ai-api`, `understanding-embeddings`, `function-calling`, `mini-agent-loop`, `ai-app-cost-and-usage`, `claude-md-four-principles`, `capstone-plan-and-launch`예요.

이 중 앞 5개는 제가 실제로 시작할 수 있을 것 같아서 골랐고, `connect-ai-api`, `understanding-embeddings`, `function-calling`, `mini-agent-loop`은 “AI 빌더면 결국 여기까지 가야 하는 거 아냐?”라는 마음으로 읽었어요. `research-workflow`는 학생 입장에서는 탐구 보고서나 세특 자료 조사에 바로 붙을 수 있을 것 같아서 골랐어요.

## 4. 너무 어려운 부분 / 막힌 지점 (구체 인용)

제일 먼저 닫고 싶어진 건 `enforcing-output-format`이었어요. “OpenAI — `response_format: { type: "json_schema", json_schema: {...} }`”, “TypeScript/JS — Zod”, “Python — Pydantic”이 한 레슨 안에 같이 나와요. 저는 파이썬 기초는 아는데 TypeScript, SDK, JSON Schema, Zod가 동시에 나오면 난이도가 갑자기 3단 점프한 느낌이에요. 제목은 “출력 형식(Output Format)을 강제하는 법”이라서 프롬프트 팁인 줄 알고 들어왔는데, 실제론 자동화 개발자용에 가까웠어요.

`connect-ai-api`도 막혔어요. “Next.js의 App Router라면 `app/api/chat/route.ts` 한 파일이면 됩니다. Python이라면 FastAPI / Flask 엔드포인트 하나면 돼요.” 이 문장은 개발자한테는 친절할 수 있는데, 저한테는 “Next.js App Router가 뭔데요?”부터 시작이에요. 한 파일이면 된다고 하지만 그 한 파일을 어디에 만들고, 로컬에서 어떻게 실행하고, API 키를 어떻게 받아야 하는지 학생용 첫 길이 없어요.

`mini-agent-loop`에서는 “Autonomous Agent의 가장 작은 형태 — 도구 3~5개, 최대 10스텝”이라는 문장이 멋있긴 한데, 제 기준으론 이미 작지 않아요. 도구 3개를 정의하고 while문으로 루프를 돌리고 로그까지 남기는 건 “이게 가능?”이긴 한데, 바로 따라 하기는 무서워요.

그리고 `ai-app-cost-and-usage`의 “Redis 같은 캐시 스토어”, “Helicone이나 Langfuse 같은 도구”는 진짜 실무 냄새가 강했어요. 비용 관리는 중요하지만, 학생인 저는 첫 달 무료 크레딧이 끝나면 뭘 해야 하는지, 신용카드 없이 가능한 루트가 있는지, 학교 프로젝트 수준에서 어느 모델을 써야 하는지가 더 급해요.

## 5. 뜬금없는 요소 / "왜 여기 있나?" 부분

Explorer 여정이 제일 뜬금없었어요. `journeys.ts`에서 Explorer는 “AI를 진지하게 처음 배우는 사람”이고 “학생-교육자”라고 되어 있는데, 추천 capstoneIdeas가 “내가 처음 배운 5개 프롬프트 → 사내 5분 발표”예요. 학생이라고 해놓고 갑자기 사내가 나와요. 이건 누굴 위한 건지 헷갈렸어요.

Phase 3의 `AI Work OS`도 학생한테는 절반만 맞아요. “보고서·회의록·리서치·글쓰기를 AI로 운영한다”는 좋은데, lesson 예시가 보고서 초안, 회의록, 팀 업무 쪽으로 가면 학교 생활이랑 거리가 생겨요. 학생 버전이면 탐구보고서, 수행평가 자료 조사, 동아리 회의록, 발표 대본, 실험 기록 정리 같은 예시가 먼저 나와야 해요.

`github-issue-to-ai-brief`도 배운 원리는 좋지만 상황이 너무 회사예요. “팀 전체의 이슈 품질이 올라가요”라는 문장은 고2한테는 멀어요. 저는 팀 전체보다 “내 동아리 프로젝트에서 버그를 AI에게 설명하는 법”이 더 와닿아요.

## 6. 빠진 부분 / 내가 진짜 알고 싶었던 것

제일 빠진 건 “학생용 시작 프로젝트”예요. 저는 당장 만들 수 있는 걸 알고 싶었어요. 예를 들면 수능 과목별 오답 질문을 분류하는 챗봇, 탐구 보고서 출처 검증 도우미, 생기부 활동 로그 정리기, 동아리 회의록 액션 아이템 봇, 과학 기사 RAG Q&A 같은 거요.

두 번째는 무과금·저비용 루트예요. API 키, Vercel, OpenAI, Anthropic이 계속 나오는데 학생 입장에서는 카드, 예산, 부모님 허락, 학교 네트워크 제한이 현실 문제예요. “무료로 끝까지 가는 최소 루트”나 “API 없이도 가능한 로컬·노코드 버전”이 있으면 훨씬 덜 무서울 것 같아요.

세 번째는 선수 지식 지도예요. 파이썬 기초만 아는 사람이 Phase 5로 가려면 HTML, JS, Git, 터미널, HTTP, API, JSON 중 뭐부터 알아야 하는지 미니 로드맵이 필요해요. 지금은 beginner라고 적혀 있어도 레슨 안에서 갑자기 개발자 단어가 튀어나와요.

## 7. 좋은 부분 / 인상 깊은 lesson

`common-skills-of-future-proof-people`은 진짜 좋았어요. “AI를 쓰는 사람은 AI를 결론으로 데려다주는 엘리베이터로 씁니다. 만드는 사람은 AI를 초안 담당 팀원으로 씁니다.” 이 문장은 제가 왜 이걸 배우려는지 바로 정리해 줬어요.

`what-llms-are-good-and-bad-at`도 좋았어요. “LLM의 능력은 ‘얼마나 똑똑한가’가 아니라 ‘어떤 모양의 일에 강한가’”라는 말은 학생한테도 바로 이해돼요. AI가 수학을 틀리는 이유를 “멍청해서”가 아니라 “문제 모양이 안 맞아서”라고 설명한 게 좋았어요.

`ai-concept-learning-framework`는 AI 뉴스 보는 학생한테 딱이에요. RAG, MCP, Agent가 계속 나오는데 “왜 이런 이름인가”, “기존에는 어떤 문제가 있었나”, “그 문제를 어떻게 해결했나”로 뜯는 방식은 공부법으로도 좋아요.

`research-workflow`는 학교 과제에 바로 붙일 수 있어요. “출처 없으면 말하지 마”보다 “출처 미확인으로 표시해”가 더 잘 먹힌다는 설명은 실전적이에요. 탐구 보고서 쓸 때 이거 하나만 적용해도 퀄리티가 올라갈 것 같아요.

마지막으로 `capstone-plan-and-launch`의 “4주 안에 5명이 써 보는 상태까지”는 좋았어요. 완벽한 앱보다 피드백 받는 URL 하나를 목표로 잡는 게 학생 포트폴리오에도 맞아요. 다만 여기에도 학생용 아이디어가 더 많아야 해요.

## 8. lesson별 미시 피드백 (최소 8개)

| 슬러그/제목 | 페르소나의 한 줄 평 |
| --- | --- |
| `common-skills-of-future-proof-people` / AI 시대에 뒤쳐지지 않는 사람들의 공통 역량 | 처음 입구로 좋고, “AI 팀원” 비유가 제일 빨리 이해됐어요. |
| `ai-concept-learning-framework` / 새 AI 용어 흔들리지 않는 학습법 | AI 뉴스 많이 보는 학생한테 ㄹㅇ 필요한 공부법이에요. |
| `what-llms-are-good-and-bad-at` / LLM이 잘하는 일과 못하는 일 | 수학 틀리는 이유 설명이 좋아서 AI 맹신이 확 줄어요. |
| `hallucination-verification` / 환각을 잡는 검증법 | 탐구 보고서 출처 검증에 바로 쓸 수 있어서 학생용 가치가 커요. |
| `structure-of-good-prompts` / 좋은 프롬프트의 구조 | 4축 구조는 쉽고 강력한데, 학생 예시가 더 있으면 바로 저장할 듯해요. |
| `enforcing-output-format` / 출력 형식을 강제하는 법 | 제목보다 훨씬 개발자용이라 Zod부터 막혀요. |
| `research-workflow` / 리서치 워크플로우 | 수행평가, 탐구, 발표 준비에 붙이면 가장 현실적으로 쓸 수 있어요. |
| `coding-agent-setup` / 코딩 에이전트 셋업 | 안전 얘기는 좋은데 학생 개인 프로젝트 첫 세팅 버전이 따로 필요해요. |
| `github-issue-to-ai-brief` / GitHub 이슈 → AI 브리프 | 원리는 좋은데 “회사 팀 이슈”보다 “동아리 버그 설명서”가 더 맞아요. |
| `connect-ai-api` / AI API 붙이기 | 미래 직업 느낌은 확 오는데, Next.js 전제 때문에 초보 학생은 바로 튕겨요. |
| `understanding-embeddings` / 임베딩 이해하기 | “의미의 좌표” 비유는 좋고, 수학 깊게 안 가서 버틸 수 있어요. |
| `function-calling` / Function Calling 이해하기 | 날씨 예시는 직관적인데 JSON Schema부터는 난이도가 확 올라가요. |
| `mini-agent-loop` / 미니 에이전트 루프 만들기 | 멋있지만 제 기준으론 “미니”가 아니에요. |
| `ai-app-cost-and-usage` / AI 앱 비용·사용량 관리 | 중요하지만 학생용으로는 무료 한도와 예산 상한 예시가 먼저 필요해요. |
| `capstone-plan-and-launch` / Capstone 프로젝트 기획과 배포 | “5명이 써 보기”는 좋고, 학생 포트폴리오 프로젝트 예시가 부족해요. |

## 9. 종합 의견 + 구체 변경 제안 3개

### 9.1 종합 의견 (verdict 이유 포함)

제 결론은 “일부만 듣겠다”예요. Phase 1, Phase 2, `research-workflow`, `capstone-plan-and-launch` 일부는 바로 들을 것 같아요. 특히 AI를 믿는 법보다 의심하는 법, 새 용어 공부법, 프롬프트 구조화는 고등학생한테도 진짜 필요해요.

하지만 전체 경로를 끝까지 듣는 건 아직 부담돼요. 이유는 커리큘럼이 말로는 “출발점이 어디든”이라고 하지만, 실제 예시는 직장인·개발팀·창업자 쪽으로 훨씬 많이 기울어져 있기 때문이에요. 저는 학생이라서 “사내”, “팀 전체”, “대표님”, “회사 슬랙”, “비용 대시보드” 같은 말이 반복되면 내 얘기가 아닌 것 같아요.

그래도 못 듣겠다는 아니에요. 초반 설계가 탄탄하고, 빌더가 되려면 결국 API, RAG, Agent로 가야 한다는 큰 그림은 맞아요. 다만 학생을 진짜 타깃으로 삼으려면 “학생도 지금 당장 만들 수 있는 첫 3개 프로젝트”가 전면에 있어야 해요.

### 9.2 변경 제안

1. **파일 — `src/content/journeys.ts`** — Explorer의 `targetLearner`, `capstoneIdeas`, `expectedOutcome`을 학생에게 맞게 바꿔야 해요. 현재 “사내 5분 발표” 같은 표현이 들어가서 고등학생 맥락이 깨져요. “동아리 5분 발표”, “탐구 보고서 출처 검증 템플릿”, “AI 학습 일지 → 친구 3명에게 공유”처럼 학교 안에서 가능한 산출물로 바꾸면 좋아요.

2. **파일 — `src/content/lessons.ts`와 관련 MDX 3개** — `common-skills-of-future-proof-people`, `structure-of-good-prompts`, `research-workflow`의 mission에 학생용 변형을 추가하면 좋겠어요. 현재 “업무”, “동료”, “보고서” 중심인데, `studentMission`까지 새 필드를 만들 필요는 없고 mission 본문 안에 “학생이라면 수행평가·탐구보고서·동아리 프로젝트로 바꿔서 쓰세요” 블록을 넣으면 충분해요.

3. **파일 — `docs/product-brief.md`와 `docs/curriculum-blueprint.md`** — 대상 학습자와 8주 MVP 경로에 “학생 빌더 빠른 경로”를 명시해야 해요. 예시는 Week 1 AI 판단 체크리스트, Week 2 프롬프트 라이브러리, Week 3 탐구 리서치 워크플로우, Week 4 코딩 에이전트 셋업, Week 5 API 없는 미니 앱 또는 저비용 API 앱, Week 8 학교/동아리용 캡스톤이면 좋겠어요. 지금은 학생이 Explorer에 숨어 있어서, 첫 화면에서 “아 이거 나도 대상이구나”가 바로 안 와요.
