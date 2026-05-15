---
persona: 한지영
slug: working-mom-time-poor
date: 2026-05-12
verdict: "일부만 듣겠다"
---

# 페르소나 평가 보고서 — 한지영

## 1. 페르소나 자기소개 (1인칭, 1문단)

저는 39살 재택 PM이고, 세 살 아이를 키우면서 회의, 문서, 일정, 집안일 사이를 계속 전환하며 삽니다. 노션은 익숙하고 ChatGPT랑 Claude도 회의록 정리, 기획안 초안, 메일 다듬기에 매일 써요. 제가 원하는 건 거창한 AI 앱이 아니라 아주 작아도 확실히 시간을 돌려주는 자동화예요. 한 줄짜리 프롬프트라도 좋아요. 다만 한 lesson이 50분이고 준비물이 많으면 그 순간 저는 이미 못 듣습니다. 제 기준은 단순해요. 이걸 30분 안에 익혀서 이번 주에 1시간 절약하나요?

## 2. 커리큘럼 첫 인상 (스크롤하며 느낀 것)

첫 인상은 양면적이었어요. 제품 브리프의 “학습자의 시간을 아낀다”는 말은 저한테 정확히 꽂혔고, `practitioner` 여정의 “AI를 자기 일에 깔아 시간을 되찾고 싶은 사람”도 거의 제 소개처럼 보였어요. 그런데 12 Phase 전체를 보면 바로 부담이 올라옵니다. Phase 0부터 “Codex / Claude Code / GitHub / API 키”가 나오고, 8주 MVP 경로는 Week 4부터 코딩 에이전트로 넘어가요. 저는 AI 빌더가 되고 싶지만, 매주 4시간씩 새 환경을 세팅할 여유가 있는 사람은 아니에요.

또 하나는 완성도 신호예요. `phases.ts`에서 Phase 8, 9, 10은 설명은 큰데 `lessonSlugs`가 비어 있었어요. 학습자 화면에서 어떻게 보일지 모르겠지만, 제 눈에는 “아직 비어 있는 진열장”처럼 느껴집니다. 바쁜 사람은 빈칸을 보면 기대보다 불안이 먼저 와요.

## 3. 깊게 읽은 lesson 목록 (왜 이걸 골랐나)

제가 고른 기준은 “이번 주에 하나만 본다면 바로 쓸 수 있나”였어요. 그래서 먼저 `common-skills-of-future-proof-people`, `what-llms-are-good-and-bad-at`, `checks-before-trusting-ai-output`, `structure-of-good-prompts`를 읽었습니다. 기초지만 제 업무 판단을 줄여줄 수 있는지 보려고요.

그다음은 직접 시간 절약과 연결되는 `automate-report-drafts`, `meeting-notes-pipeline`, `research-workflow`를 읽었어요. 이 셋이 제 생활비 같은 lesson입니다. 마지막으로 제가 어려워할 지점을 일부러 확인하려고 `enforcing-output-format`, `feeding-long-documents`, `build-personal-prompt-library`, `coding-agent-setup`, `claude-code-token-saving`, `ai-concept-learning-framework`까지 봤습니다. 특히 `enforcing-output-format`과 `coding-agent-setup`은 “나 같은 사람도 가야 하는 길인가?”를 확인하려고 읽었어요.

## 4. 너무 어려운 부분 / 막힌 지점 (구체 인용)

제일 먼저 닫고 싶어진 곳은 `enforcing-output-format`입니다. 초반 문제 상황은 좋아요. “AI가 회의록을 받아 Action Item JSON을 뱉으면 그걸 Notion API에 그대로 던지는 흐름”은 제가 원하는 자동화와 가까워요. 그런데 곧바로 “OpenAI — `response_format: { type: "json_schema", json_schema: {...} }`”, “Zod / Pydantic”, `callWithRetry(prompt: string, schema: ZodSchema...)`가 나옵니다. 여기서 저는 멈춰요. 저는 Notion DB는 만들 수 있지만 TypeScript 스키마는 못 만듭니다. 이 lesson이 제 추천 경로에 가까운 Phase 2에 있고, 심지어 `meeting-notes-pipeline`의 선수처럼 작동하면 부담이 커요.

`build-personal-prompt-library`도 반쯤 좋고 반쯤 과합니다. “Git이냐 Notion이냐 — 어디에 둘까”에서 Notion 선택지를 준 건 좋았어요. 그런데 곧 `Front Matter`, YAML, `promptlib report/weekly-report --audience="임원 4명"` 같은 CLI 예시가 나와요. 저는 프롬프트를 잃어버리는 문제에는 공감하지만, 그걸 해결하려고 작은 개발자 도구까지 갖추는 건 제 시간 단가와 안 맞습니다.

`coding-agent-setup`은 더 솔직히 말하면 무서웠어요. “터미널에서 AI가 코드를 짜기 시작했는데, 멈출 수가 없어요”는 흥미로운 도입이지만, 이어서 `.claude/settings.json`, `.env`, `git push`, `rm -rf`가 나오면 저는 ‘이건 개발자 안전교육 아닌가?’ 싶습니다. `lessons.ts`에서 이 lesson의 `targetJourneys`에 `practitioner`가 들어간 것도 어색했어요. 재택 PM에게 이건 선택 심화여야지, 실무자 경로의 자연스러운 다음 발판은 아니라고 봅니다.

## 5. 뜬금없는 요소 / "왜 여기 있나?" 부분

가장 뜬금없는 건 “모든 길이 결국 코딩 에이전트로 빨려 들어가는 느낌”이에요. 제품은 코딩 모르는 초보자도 AI 빌더로 키운다고 말하지만, Phase 0의 기본 세팅이 이미 GitHub와 API 키이고, Phase 4가 Week 4 MVP에 들어옵니다. 저는 PM이라 팀과 개발자 사이에서 일하지만, 제 첫 효율은 코드가 아니라 회의록, 보고서, 리서치예요.

또 링크와 명칭이 살짝 삐끗한 곳이 있어요. `build-personal-prompt-library`는 다음 Phase를 `/curriculum/phase-3-everyday-automation`으로 안내하지만 실제 Phase slug는 `phase-3-ai-work-os`였어요. `automate-report-drafts`도 `/curriculum/phase-2-prompt-context-engineering`을 가리키는데 실제 slug는 `phase-2-prompt-engineering`입니다. 바쁜 학습자는 이런 작은 불일치에서 “관리 안 되는 강의인가?”라고 바로 의심합니다.

## 6. 빠진 부분 / 내가 진짜 알고 싶었던 것

제가 제일 알고 싶었던 건 “이번 주에 하나만 들으면 뭐가 제일 이득인가요?”예요. `practitioner` 추천 lesson은 있지만, 시간 부족 모드의 우선순위가 없어요. 15분 버전, 30분 버전, 50분 버전이 나뉘면 좋겠습니다.

또 실제 연결 도구가 더 필요해요. 회의록 lesson은 JSON과 Notion API까지 말하지만, 저는 “Claude 결과를 Notion 표에 붙이는 가장 쉬운 방법”, “Slack에 공유할 복붙 템플릿”, “Google Docs에서 바로 쓰는 프롬프트”가 먼저 필요합니다. 개발자식 자동화 이전에 노코드 수동 반자동 레벨이 빠져 있어요.

마지막으로 중단과 재개 설계가 없어요. 아이가 깨면 lesson은 끊깁니다. “여기까지만 해도 산출물 60% 완성”, “다음에 이어 할 체크포인트” 같은 장치가 있으면 완주 확률이 훨씬 올라갈 거예요.

## 7. 좋은 부분 / 인상 깊은 lesson

`meeting-notes-pipeline`은 제가 이번 주 하나만 고르라면 고를 lesson입니다. “누가, 언제까지, 무엇을”이라는 표현이 정확해요. PM의 회의록은 예쁜 요약이 아니라 후속 행동을 남기는 일이니까요. “회의 직후 5분 안에 공유”라는 목표도 좋았습니다. 저는 이걸 45분 투자해서 매주 1시간 이상 아낄 가능성이 있다고 봐요.

`automate-report-drafts`도 좋았어요. “1시간 반이 걸리던 일이 30분 안에 끝나고”라는 문장은 제 기준의 언어입니다. 다만 여기서 바로 `report-pipeline/` 폴더를 만들기보다, Notion 페이지 하나로 시작하는 초간단 루트가 앞에 있으면 더 좋겠어요.

`what-llms-are-good-and-bad-at`는 기대보다 실용적이었어요. “강함 / 보조 가능 / 약함”으로 주간 업무 10개를 분류하는 건 제 머릿속 잡음을 줄여줍니다. `checks-before-trusting-ai-output`의 “5분, 끝.”도 좋아요. 다만 실제로는 5축을 매일 다 보기는 어렵고, 보고서 발송 전 같은 고위험 순간에만 쓰게 될 것 같습니다.

## 8. lesson별 미시 피드백 (최소 8개)

| 슬러그/제목 | 페르소나의 한 줄 평 |
| --- | --- |
| `common-skills-of-future-proof-people` / AI 시대에 뒤쳐지지 않는 사람들의 공통 역량 | “파일 이름에 `.md`가 붙는다고 겁먹지 마세요”가 좋아요. Notion으로 해도 된다는 말이 저를 붙잡았습니다. |
| `what-llms-are-good-and-bad-at` / LLM이 잘하는 일과 못하는 일 | 제 업무 10개를 분류하는 산출물이 명확해서 들을 가치가 있어요. |
| `ai-concept-learning-framework` / 새 AI 용어 흔들리지 않는 학습법 | RAG, MCP, Agent 설명은 깔끔하지만 지금 제 급한 불은 용어 학습이 아니라 시간 회수예요. |
| `checks-before-trusting-ai-output` / AI 결과를 신뢰하기 전 확인할 것 | “5분, 끝.”은 강력합니다. 단, 매일 루틴보다 고위험 발송 전 루틴으로 포지셔닝하면 더 현실적이에요. |
| `structure-of-good-prompts` / 좋은 프롬프트의 구조 | Task, Context, Constraints, Output은 바로 써먹겠습니다. 이건 초보 PM에게도 맞아요. |
| `enforcing-output-format` / 출력 형식을 강제하는 법 | 문제는 제 문제인데 해결 방식이 갑자기 개발자 방식입니다. 비개발자 루트가 먼저 필요해요. |
| `feeding-long-documents` / 긴 문서를 AI에게 먹이는 법 | Full, Map-Reduce, Selective 구분은 유용하지만 40~60페이지 실습은 주말 과제처럼 느껴집니다. |
| `build-personal-prompt-library` / 개인 프롬프트 라이브러리 만들기 | Notion DB 버전으로 축소하면 듣겠고, CLI와 Front Matter가 중심이면 미루겠습니다. |
| `automate-report-drafts` / 보고서 초안 자동화 | 시간 절약 약속이 가장 선명합니다. 저한테는 Phase 3의 핵심 lesson이에요. |
| `meeting-notes-pipeline` / 회의록 → Action Item 파이프라인 | 이번 주 하나만 고르라면 이걸 고릅니다. PM의 진짜 통증을 찌릅니다. |
| `research-workflow` / 리서치 워크플로우 | “출처 미확인으로 표시해”는 실제로 써먹을 문장입니다. 다만 50분은 길어요. |
| `coding-agent-setup` / 코딩 에이전트 셋업 | 배워야 하는 이유는 알겠지만 제 경로에서는 너무 이릅니다. 선택 심화로 빼주세요. |
| `claude-code-token-saving` / Claude Code 토큰 절약 | 돈과 시간 얘기라 흥미롭지만 Claude Code를 쓰기 전인 사람에게는 순서가 앞서갔어요. |

## 9. 종합 의견 + 구체 변경 제안 3개

### 9.1 종합 의견 (verdict 이유 포함)

저는 “일부만 듣겠다”입니다. Phase 1에서 3까지, 특히 `structure-of-good-prompts`, `automate-report-drafts`, `meeting-notes-pipeline`, `research-workflow`는 제 업무 시간을 실제로 줄일 가능성이 있어요. 하지만 전체 커리큘럼을 그대로 따라가라고 하면 못 갑니다. 40~60분 lesson이 계속 이어지고, 중간에 API, GitHub, JSON Schema, Zod가 끼어드는 순간 제 뇌는 “이건 내 일이 아니다”라고 판단해요.

한지영 같은 사람에게 이 커리큘럼은 “AI 빌더가 되는 학교”라기보다 “업무 시간을 되찾는 빠른 길”로 먼저 보여야 합니다. 그 다음에 코딩 에이전트나 앱 개발로 확장하면 듣겠습니다. 지금은 좋은 재료가 많은데, 시간 부족한 실무자에게는 입구가 너무 넓고 깊어요.

### 9.2 변경 제안

1. **파일 — `src/content/journeys.ts`** — 현재 `practitioner.recommendedLessons`는 기초부터 차례로 가는 느낌입니다. `meeting-notes-pipeline`과 `automate-report-drafts`를 “이번 주 1개만 볼 때” 빠른 승리로 명시하고, `expectedOutcome`에 “첫 30분 산출물” 문장을 추가해 주세요.
2. **파일 — `src/content/lessons/enforcing-output-format.mdx`** — 현재는 JSON Schema, TypeScript, Zod가 본문 중심에 있어 비개발자가 닫고 싶어집니다. 앞부분에 “비개발자 20분 루트”를 추가해 Markdown 표, Notion DB 붙여넣기, 순수 JSON 프롬프트까지만 먼저 완성하게 하고, API 스키마와 Zod는 “개발자 확장” 섹션으로 내려 주세요.
3. **파일 — `src/content/lessons/build-personal-prompt-library.mdx`, `src/content/lessons/automate-report-drafts.mdx`** — 현재 다음 Phase 링크가 실제 slug와 어긋납니다. `phase-3-everyday-automation`은 `phase-3-ai-work-os`로, `phase-2-prompt-context-engineering`은 `phase-2-prompt-engineering`으로 고쳐 주세요. 이런 작은 링크 불일치는 바쁜 학습자에게 신뢰 누수로 보입니다.
