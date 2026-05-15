---
persona: 김민지
slug: freshman-zero-coding
date: 2026-05-12
verdict: "일부만 듣겠다"
---

# 페르소나 평가 보고서 — 김민지

## 1. 페르소나 자기소개 (1인칭, 1문단)

저는 김민지이고, 19살 국어국문학과 1학년이에요. 코딩은 진짜 0이고, 터미널이 뭔지도 “검은 화면에 영어 치는 거” 정도로만 알아요. ChatGPT는 과제 주제 잡거나 보고서 문장 다듬을 때 가끔 써봤고, 노트북으로는 워드랑 PPT 정도만 해요. 친구가 “AI로 뭐 만들었다”고 자랑해서 괜히 저도 해보고 싶어진 쪽이에요. 근데 솔직히 제일 궁금한 건 하나예요. 이거 정말 코딩 모르는 나도 끝까지 갈 수 있어요?

## 2. 커리큘럼 첫 인상 (스크롤하며 느낀 것)

처음에는 “AI를 쓰는 사람에서 AI로 만드는 사람”이라는 말이 꽤 설렜어요. 저도 그냥 과제 보조로 쓰는 사람 말고, 뭔가 내 작업 방식을 직접 만드는 사람이 될 수 있나 싶었거든요. `docs/product-brief.md`의 “한 주 단위로 실제 만든 결과물을 쌓고”라는 약속도 좋아요. 강의만 듣고 끝나는 게 아니라 파일 하나, 체크리스트 하나가 남는다는 게 덜 막연했어요.

그런데 `src/content/phases.ts`를 보면서 바로 무서워졌어요. Phase 0 제목이 “AI 학습 환경 세팅”인데 설명에 “Codex CLI 또는 Claude Code”, “GitHub 저장소”, “API 키”가 한꺼번에 나와요. 제 입장에서는 여기부터 이미 수업 전 준비물이 아니라 첫 번째 장벽이에요. 게다가 `lessonSlugs: []`라서, 진짜 초보가 따라갈 실제 레슨이 비어 있는 것처럼 보였어요. “코딩 모르는 사람도 된다”면 Phase 0이 제일 친절해야 할 것 같은데, 오히려 빈칸이라 당황했어요.

journey는 저는 `explorer`가 제일 가까웠어요. “AI를 진지하게 처음 배우는 사람”은 맞아요. 그런데 “매일 배우고 매일 가르치는 학생-교육자”라는 문장은 부담스러웠어요. 저는 아직 누굴 가르치고 싶다기보다, 혼자 안 포기하고 싶어요. 그래서 첫 인상은 반반이에요. Phase 1은 나를 초대하는 느낌이고, Phase 4부터는 개발자 동아리 방에 잘못 들어간 느낌이에요.

## 3. 깊게 읽은 lesson 목록 (왜 이걸 골랐나)

제가 고른 기준은 “진짜 내가 클릭할 것”, “국문과 과제나 글쓰기와 이어질 것”, “읽다가 겁날 것 같은 것” 세 가지였어요. 그래서 `common-skills-of-future-proof-people`, `ai-concept-learning-framework`, `what-llms-are-good-and-bad-at`, `hallucination-verification`, `checks-before-trusting-ai-output`는 초보 입구라서 읽었어요. `structure-of-good-prompts`, `feeding-long-documents`, `build-personal-prompt-library`는 제가 ChatGPT를 과제에 쓰는 방식과 바로 연결돼 보여서 골랐어요. `research-workflow`, `blog-writing-pipeline`은 국문과 학생 입장에서 제일 궁금했어요. 일부러 `enforcing-output-format`, `coding-agent-setup`, `connect-ai-api`, `understanding-embeddings`도 읽었어요. 제가 어디서 닫고 싶어지는지 확인하려고요.

## 4. 너무 어려운 부분 / 막힌 지점 (구체 인용)

제일 먼저 막힌 건 `enforcing-output-format`이에요. 제목은 “출력 형식(Output Format)을 강제하는 법”이라서 처음엔 “아, 답변을 표로 받는 법인가?” 했어요. 그런데 본문에 바로 “`JSON.parse` 가 깨지면서 파이프라인 전체가 멈춰요”가 나오고, 뒤에는 “OpenAI — `response_format: { type: "json_schema", json_schema: {...} }`”, “Zod / Pydantic — 런타임 검증”이 나와요. 이건 제 기준으로 beginner가 아니에요. 여기서 저는 “아, 이 강의는 나 같은 사람 말고 이미 개발하는 사람을 beginner라고 부르는구나”라고 느꼈어요.

`build-personal-prompt-library`도 중간까지는 좋았는데 “변수 치환 — 손이 아니라 도구로”에서 멈칫했어요. “`$ promptlib report/weekly-report --audience="임원 4명"`” 같은 예시는 저한테 갑자기 터미널 숙제처럼 보여요. 프롬프트를 정리하고 싶은 마음은 있는데, 미니 CLI라는 말이 나오면 “나는 Notion 표 만들기도 헷갈리는데?”가 돼요.

`coding-agent-setup`은 도입부터 무서웠어요. “터미널에서 AI가 코드를 짜기 시작했는데, 멈출 수가 없어요”라는 제목은 좋지만, 제 마음에는 “그럼 나는 터미널을 아예 열면 안 되는 거 아닌가?”로 들어왔어요. 본문 중 “직접 파일을 읽고, 명령을 실행하고, 코드를 수정합니다”는 설명은 명확하지만, 초보에게는 매력보다 위험이 먼저 와요.

`connect-ai-api`는 더 심했어요. “Next.js의 App Router라면 `app/api/chat/route.ts` 한 파일이면 됩니다”라는 문장을 읽는 순간 한 파일이면 된다는 말이 위로가 안 됐어요. 저는 `app`도 모르고 `route.ts`도 몰라요. “한 파일”이라는 표현은 개발자에게는 쉽다는 뜻이겠지만, 저한테는 “모르는 단어가 한 줄에 세 개”였어요.

## 5. 뜬금없는 요소 / "왜 여기 있나?" 부분

가장 뜬금없던 건 Phase 흐름이에요. Phase 1, 2, 3은 AI 사용 습관, 프롬프트, 리서치, 글쓰기라서 저도 따라갈 수 있어 보여요. 그런데 8주 MVP 경로에서 Week 4가 바로 “Codex / Claude Code Workflow”예요. 코딩 0인 1학년이 3주 만에 GitHub Issue, diff, 테스트, 버그 재현으로 가는 건 너무 급해요. “나도 한 번 해볼까”로 들어온 사람에게는 “4주차부터 개발자처럼 행동하세요”처럼 느껴져요.

또 `research-workflow`는 본문은 괜찮은데 `src/content/lessons.ts`의 summary가 “질문 분해 / 인용 강제 ��색 → 근��� 표 정리 → 종합 → 사람 검수”처럼 깨져 보여요. `blog-writing-pipeline` 메타에도 “구조 ��토” 같은 글자가 보여요. 사이트 카드에 이게 노출된다면 저는 바로 신뢰가 떨어질 것 같아요. AI 검증을 가르치는 사이트에서 글자가 깨져 있으면 좀 아이러니하더라구요.

## 6. 빠진 부분 / 내가 진짜 알고 싶었던 것

제가 진짜 알고 싶은 건 “오늘 밤 30분만 있으면 뭘 하면 돼요?”예요. 지금 커리큘럼은 결과물 중심이라 좋은데, 시작 전 불안을 달래는 초단기 루틴이 부족해요. 계정은 뭘 만들고, 돈은 드는지, 내 과제 파일을 넣어도 되는지, 학교 이메일과 개인 이메일 중 뭘 써야 하는지, 과제에 AI를 어디까지 써도 되는지 같은 현실 질문이 빠져 있어요.

그리고 “막혔을 때” 레슨이 필요해요. 터미널 에러가 나거나, API 키가 없거나, ChatGPT 답이 이상하거나, 과제 윤리 기준이 걱정될 때 어디로 돌아가야 하는지요. 지금은 잘 따라가는 사람의 길은 있는데, 중간에 겁먹은 사람이 잠깐 앉을 의자가 부족해요.

## 7. 좋은 부분 / 인상 깊은 lesson

좋았던 건 Phase 1의 말투예요. `common-skills-of-future-proof-people`의 “파일 이름에 `.md`가 붙는다고 겁먹지 마세요. Notion 페이지든, 메모장이든 같은 역할을 합니다”는 문장은 진짜 저한테 필요했어요. 이런 식으로 “형식보다 행위가 중요하다”고 말해주면 덜 무서워요.

`hallucination-verification`도 좋았어요. “Smith & Lee (2021)” 가상 인용 사례는 국문과 과제랑 너무 연결돼요. 논문 제목이 그럴듯하면 저도 속을 수 있거든요. “AI는 ‘모른다’라고 말하는 능력이 약합니다”는 문장은 외워두고 싶었어요.

제일 마음에 든 건 `blog-writing-pipeline`이에요. “AI가 글을 ‘잘’ 쓰는 건 맞아요. 하지만 ‘나처럼’ 쓰는 건 다른 문제예요”는 제가 AI 글쓰기에서 느낀 찝찝함을 정확히 말해줬어요. 국문과 학생에게는 “글을 빨리 쓰는 법”보다 “내 목소리를 잃지 않는 법”이 훨씬 중요해요.

## 8. lesson별 미시 피드백 (최소 8개)

| 슬러그/제목 | 페르소나의 한 줄 평 |
| --- | --- |
| `common-skills-of-future-proof-people` / AI 시대에 뒤쳐지지 않는 사람들의 공통 역량 | `.md`를 겁내지 말라는 문장 덕분에 첫 레슨으로는 제일 안심돼요. |
| `ai-concept-learning-framework` / 새 AI 용어 흔들리지 않는 학습법 | RAG, MCP, Agent를 “왜 이름이 붙었나”로 푸는 방식은 좋지만, 예시 용어 자체가 벌써 좀 어렵긴 해요. |
| `what-llms-are-good-and-bad-at` / LLM이 잘하는 일과 못하는 일 | “계산기가 아니라서”라는 설명은 바로 이해됐고, AI를 덜 미워하게 해줘요. |
| `hallucination-verification` / 환각을 잡는 검증법 | 가짜 논문 사례가 과제 쓰는 학생에게 너무 현실적이라 꼭 들어야겠다고 느꼈어요. |
| `checks-before-trusting-ai-output` / AI 결과를 신뢰하기 전 확인할 것 | FOSCB는 이름은 낯설지만 발표 전 5분 체크라는 상황이 좋아요. |
| `structure-of-good-prompts` / 좋은 프롬프트의 구조 | Task, Context, Constraints, Output은 제가 바로 써먹을 수 있는 첫 번째 도구 같아요. |
| `feeding-long-documents` / 긴 문서를 AI에게 먹이는 법 | “컨텍스트 윈도우는 메모리가 아니에요”는 좋지만, 40~60페이지 문서를 준비하라는 미션은 1학년에게 조금 커요. |
| `build-personal-prompt-library` / 개인 프롬프트 라이브러리 만들기 | Notion DB까지는 좋은데 Front Matter, Git, 미니 CLI가 나오면 갑자기 동아리 개발 세미나 같아요. |
| `research-workflow` / 리서치 워크플로우 | 질문 분해와 근거 표는 과제 리서치에 바로 쓸 수 있어서 진짜 유용해요. |
| `blog-writing-pipeline` / 블로그 글쓰기 파이프라인 | “나처럼 쓰는 건 다른 문제”라는 문제의식이 국문과 학생에게 딱 맞아요. |
| `enforcing-output-format` / 출력 형식을 강제하는 법 | 제목은 쉬워 보이는데 실제 내용은 API, JSON Schema, Zod라서 난이도 라벨을 믿기 어려워요. |
| `coding-agent-setup` / 코딩 에이전트 셋업 | 안전 설명은 중요하지만, 코딩 0에게는 사용법보다 사고 사례가 먼저 와서 시작 버튼을 누르기 무서워요. |
| `connect-ai-api` / AI API 붙이기 | “한 파일이면 됩니다”가 전혀 한 파일처럼 안 느껴져요. 그 전에 웹앱이 뭔지부터 필요해요. |
| `understanding-embeddings` / 임베딩 이해하기 | “의미의 좌표” 비유는 좋았고, 수식은 몰라도 된다고 해줘서 겨우 붙잡을 수 있었어요. |

## 9. 종합 의견 + 구체 변경 제안 3개

### 9.1 종합 의견 (verdict 이유 포함)

제 결론은 “일부만 듣겠다”예요. Phase 1부터 Phase 3까지는 듣고 싶어요. 특히 검증, 프롬프트, 리서치, 글쓰기 파이프라인은 국문과 1학년인 저한테도 현실적인 도움이 돼요. 그런데 “AI 빌더”가 곧 “코딩 에이전트와 API를 다루는 사람”으로 너무 빨리 바뀌는 순간, 저는 제 자리가 아닌 것처럼 느껴져요.

그래도 못 듣겠다는 아니에요. 초반 레슨의 친절함은 진짜예요. 다만 현재 버전은 “코딩 모르는 초보자도 끝까지”라기보다 “똑똑한 비개발자가 3주 안에 개발자식 사고로 넘어오면”에 가까워 보여요. 저 같은 사람을 끝까지 데려가려면, 코딩으로 들어가기 전 완충 지대가 꼭 필요해요.

### 9.2 변경 제안

1. **파일 — `src/content/phases.ts`** — *현재* Phase 0이 `lessonSlugs: []`이고, 설명은 Codex CLI, GitHub, API 키를 한 번에 요구해요. *바꾸면 좋은 방향*은 Phase 0에 `zero-coding-orientation`, `terminal-first-day`, `ai-tool-account-and-cost`, `privacy-for-student-work` 같은 초보용 레슨을 실제로 넣는 거예요. “설치”보다 “내가 뭘 건드리면 안 되는지”와 “무료로 어디까지 가능한지”부터 알려줘야 해요.
2. **파일 — `src/content/journeys.ts`** — *현재* `explorer`가 “매일 배우고 매일 가르치는 학생-교육자”라서 처음 온 학생에게 부담이 돼요. *바꾸면 좋은 방향*은 Explorer promise를 “먼저 안전하게 써보고, 나에게 맞는 길을 고릅니다”처럼 낮추고, recommendedLessons에 `blog-writing-pipeline`과 `research-workflow`를 추가하는 거예요. 김민지 같은 학생은 가르치기보다 과제, 글쓰기, 리서치에서 출발해요.
3. **파일 — `src/content/lessons.ts`와 해당 MDX** — *현재* `enforcing-output-format`이 beginner인데 Zod, Pydantic, JSON Schema, API 스키마까지 들어가고, `research-workflow` 등 일부 summary에 깨진 글자가 보여요. *바꾸면 좋은 방향*은 `enforcing-output-format`을 “비개발자용 출력 형식 고정”과 “개발자용 스키마 검증”으로 나누고, 깨진 summary 문자열을 먼저 고치는 거예요. 비개발자용은 “표, 체크리스트, JSON처럼 보이는 템플릿을 ChatGPT에서 안정적으로 받기”까지만 다루면 충분해요.
