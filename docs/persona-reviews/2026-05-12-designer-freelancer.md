---
persona: 최유진
slug: designer-freelancer
date: 2026-05-12
verdict: "일부만 듣겠다"
---

# 페르소나 평가 보고서 — 최유진

## 1. 페르소나 자기소개 (1인칭, 1문단)

저는 28살 디자인 프리랜서 최유진입니다. 브랜드 아이덴티티, 웹 디자인, 랜딩페이지, 간단한 앱 UI를 주로 만들고 Figma, Photoshop, Illustrator는 제 손처럼 써요. Midjourney랑 Runway도 이미 작업에 붙여 쓰고 있어서 AI 자체가 낯설진 않은데, 터미널, git, API 키, CLI 같은 단어가 나오면 화면이 갑자기 회색 개발자 모드로 바뀌는 느낌이라 숨이 턱 막혀요. 제가 이 커리큘럼에서 진짜 묻고 싶은 건 하나예요. 디자이너인 내가 여기서 내 작업물에 직접 쓸 수 있는 걸 만들 수 있나요?

## 2. 커리큘럼 첫 인상 (스크롤하며 느낀 것)

첫 인상은 좋았어요. 제품 브리프의 “AI를 쓰는 사람에서 AI로 만드는 사람으로”는 디자이너한테도 통하는 말입니다. 저도 Midjourney 이미지를 뽑는 사람에서, 클라이언트에게 팔 수 있는 AI 워크플로우를 설계하는 사람으로 가고 싶거든요. `Phase 1`, `Phase 2`, `Phase 3`은 화면 구성이 차분한 편집물처럼 느껴졌고, “한 장”, “한 폴더”, “체크리스트”로 산출물이 잡히는 점도 좋았습니다.

그런데 Phase를 끝까지 스크롤하면 기대가 빠르게 새요. `Creator` 여정은 “AI로 콘텐츠를 만드는 사람”이라고 해놓고 추천 Phase에 `phase-8-multimodal`이 들어가 있는데, `src/content/phases.ts`에서 그 Phase의 `lessonSlugs`가 빈 배열이에요. 제일 보고 싶은 방이 문패만 있고 안은 공실인 느낌입니다. 반대로 `phase-4-coding-agents`, `phase-5-ai-app-dev`, `phase-6-rag`, `phase-7-agents-mcp`는 방이 꽉 차 있어요. 커리큘럼의 실제 무게중심은 디자이너보다 개발자 쪽에 훨씬 가 있습니다.

## 3. 깊게 읽은 lesson 목록 (왜 이걸 골랐나)

제가 고른 기준은 단순했어요. 첫째, 내 디자인 작업에 바로 붙을 수 있는가. 둘째, 내가 도망갈 만한 코딩 장벽이 어디서 시작되는가. 셋째, Creator라고 부르는 사람이 실제로 존중받는가.

깊게 읽은 레슨은 `common-skills-of-future-proof-people`, `ai-concept-learning-framework`, `structure-of-good-prompts`, `enforcing-output-format`, `feeding-long-documents`, `build-personal-prompt-library`, `research-workflow`, `blog-writing-pipeline`, `coding-agent-setup`, `streaming-response-ui`, `harness-engineering-roadmap`, `capstone-plan-and-launch`입니다. 일부러 `blog-writing-pipeline`처럼 제 일과 가까운 것도 읽었고, `coding-agent-setup`, `streaming-response-ui`, `harness-engineering-roadmap`처럼 무서울 것 같은 것도 읽었습니다. 제가 진짜 듣게 될지 보려면 편한 레슨만 보면 안 되니까요.

## 4. 너무 어려운 부분 / 막힌 지점 (구체 인용)

가장 먼저 닫고 싶어진 건 `enforcing-output-format`입니다. 제목은 “출력 형식(Output Format)을 강제하는 법”이라 프롬프트 결과를 일정하게 받는 실무 팁처럼 보였어요. 그런데 본문이 “**API 호출 자체에 JSON Schema를 첨부합니다**”, “`response_format: { type: "json_schema", json_schema: {...} }`”, “**Zod / Pydantic — 런타임 검증을 같이 깔자**”로 넘어가자마자 제 화면에서는 디자인 레이어가 전부 잠긴 것처럼 느껴졌습니다. 자동화 안정성이 왜 중요한지는 알겠는데, 코드 모르는 사람에게는 설명보다 구현 코드가 먼저 덮쳐요.

`coding-agent-setup`도 마찬가지예요. 도입부의 “**터미널에서 AI가 코드를 짜기 시작했는데, 멈출 수가 없어요**”는 공포를 정확히 찌릅니다. 문제는 그 다음이 바로 `.claude/settings.json`, `git push`, `.env`, `CLAUDE.md`예요. 겁먹은 사람에게 안전벨트를 설명하는 건 좋은데, 안전벨트가 어떻게 생겼는지보다 자동차 엔진룸을 먼저 열어 보여주는 느낌입니다.

`streaming-response-ui`는 제가 앱 UI에 관심이 있어서 기대했는데, 본문이 “**SSE (Server-Sent Events)**”, “`ReadableStream`으로 감싸서 중계”, “`AbortController`”로 빠르게 들어갑니다. UX 포인트인 “10초 동안 빈 화면만 보고 있었어요”는 완전 공감했어요. 하지만 디자이너인 제게 필요한 건 먼저 로딩 상태, 중단 버튼, 자동 스크롤, 에러 상태의 화면 패턴입니다. 지금은 그 와이어프레임을 건너뛰고 TypeScript 코드 파일을 바로 던지는 구조예요.

## 5. 뜬금없는 요소 / "왜 여기 있나?" 부분

가장 뜬금없는 건 `harness-engineering-roadmap`이 `creator`까지 타겟으로 잡힌 점입니다. 본문은 “**AI 코딩 잘하는 사람과 못하는 사람의 차이는 IDE가 아닙니다**”로 시작하고, 하네스 6단계, CLAUDE.md, MCP 서버, `.claudeignore`, lint, typecheck, test로 이어집니다. 이건 좋은 내용일 수 있지만 저 같은 디자인 프리랜서에게 “크리에이터용”이라고 붙이면 오히려 신뢰가 떨어져요. 마치 패키지 디자인 수업이라고 들어갔는데 첫 시간부터 인쇄소 서버 보안 정책을 설명하는 느낌입니다.

`build-personal-prompt-library` 안의 “**미니 CLI 또는 슬래시 명령으로 자동화합니다**”도 갑자기 튑니다. 앞부분의 Front Matter와 카테고리 폴더는 Notion DB나 Figma 컴포넌트 라이브러리처럼 이해할 수 있어요. 그런데 미니 CLI가 등장하면 비개발자용 길이 끊깁니다. 여기에는 “코드 없이 Notion으로만 하는 버전”이 같이 있어야 합니다.

## 6. 빠진 부분 / 내가 진짜 알고 싶었던 것

제가 제일 기대한 건 디자인 산출물입니다. 예를 들면 브랜드 무드보드 자동 생성, 클라이언트 리서치에서 시각 키워드 뽑기, Figma 컴포넌트 변형 아이디어 만들기, Midjourney 프롬프트를 브랜드 톤에 맞게 관리하기, Runway로 짧은 모션 시안 만들기, 랜딩페이지 카피와 와이어프레임을 같이 뽑기 같은 것들이요. 그런데 `Creator` 여정의 추천 레슨은 `structure-of-good-prompts`, `blog-writing-pipeline`, `research-workflow` 정도입니다. 글과 리서치에는 강하지만 시각 작업이 비어 있어요.

특히 `phase-8-multimodal` 설명에는 “이미지 프롬프트, 음성/자막, 블로그→쇼츠 파이프라인”이 적혀 있는데 실제 레슨이 없습니다. 저한테는 여기가 메인 전시장이어야 해요. 지금은 전시장 포스터만 붙어 있고 작품은 아직 안 걸린 상태입니다.

## 7. 좋은 부분 / 인상 깊은 lesson

`blog-writing-pipeline`은 정말 잘 맞았습니다. “**AI가 글을 "잘" 쓰는 건 맞아요. 하지만 "나처럼" 쓰는 건 다른 문제예요**” 이 문장은 디자이너에게도 그대로 들어와요. “나처럼 쓰기”를 “내 브랜드처럼 보이기”로 바꾸면 바로 제 작업입니다. “내 글 중 가장 "나다운" 글 2~3개를 골라 컨텍스트에 넣습니다”도 디자인 포트폴리오나 브랜드 가이드 샘플에 적용할 수 있어요.

`structure-of-good-prompts`의 4축도 좋았습니다. Task, Context, Constraints, Output은 디자인 브리프의 골격과 닮았어요. 특히 “**프롬프트는 부탁이 아니라 명세(Spec)다**”는 말은 클라이언트가 “고급스럽게 해주세요”라고 할 때 왜 결과가 흔들리는지 설명해주는 문장 같았습니다.

`research-workflow`의 근거 표도 좋았어요. 디자이너는 리서치를 감으로 포장하기 쉬운데, “하위 질문”, “출처”, “핵심 인용”, “신뢰도”를 표로 놓으면 클라이언트 설득력이 올라갑니다. 이건 브랜드 전략 제안서 앞단에 바로 쓸 수 있습니다.

## 8. lesson별 미시 피드백 (최소 8개)

| 슬러그/제목 | 페르소나의 한 줄 평 |
| --- | --- |
| `common-skills-of-future-proof-people` / AI 시대에 뒤쳐지지 않는 사람들의 공통 역량 | “AI를 초안 담당 팀원으로 쓴다”는 비유가 좋아서 첫 장벽은 낮아요. |
| `ai-concept-learning-framework` / 새 AI 용어 흔들리지 않는 학습법 | RAG, MCP, Agent를 한 장으로 접는 방식은 좋은데, 디자이너용 예시가 하나도 없어 아쉬워요. |
| `structure-of-good-prompts` / 좋은 프롬프트의 구조 | 디자인 브리프 만들듯 이해돼서 제일 입문용으로 좋았어요. |
| `enforcing-output-format` / 출력 형식(Output Format)을 강제하는 법 | 자동화 이유는 알겠지만 Zod, Pydantic, JSON Schema가 너무 빨리 나와서 닫고 싶어져요. |
| `feeding-long-documents` / 긴 문서를 AI에게 먹이는 법 | 긴 브랜드 리서치 PDF를 다룰 때 쓸 수 있어 좋지만 토큰 표는 조금 개발자 냄새가 강해요. |
| `build-personal-prompt-library` / 개인 프롬프트 라이브러리 만들기 | 프롬프트를 자산처럼 관리한다는 발상은 좋은데 Git/CLI보다 Notion/Figma 버전이 먼저 필요해요. |
| `research-workflow` / 리서치 워크플로우 | 클라이언트 제안서 근거를 단단하게 만드는 레슨이라 실무성이 높아요. |
| `blog-writing-pipeline` / 블로그 글쓰기 파이프라인 | “내 목소리 유지”를 “내 브랜드 시각 언어 유지”로 확장하면 디자이너 핵심 레슨이 될 수 있어요. |
| `coding-agent-setup` / 코딩 에이전트 셋업 | 겁나는 포인트를 잘 짚지만, 비개발자용 안전한 첫 화면이 없어서 입구가 차갑습니다. |
| `streaming-response-ui` / 스트리밍 응답 UI 만들기 | UX 문제의식은 좋지만 코드 전에 상태별 UI 패턴과 Figma 컴포넌트가 필요해요. |
| `harness-engineering-roadmap` / 하네스 엔지니어링 6단계 로드맵 | creator 태그가 붙어 있는 건 과합니다. 이건 거의 엔지니어링 운영 레슨이에요. |
| `capstone-plan-and-launch` / Capstone 프로젝트 기획과 배포 | “많이 배웠는데 보여줄 게 없어요”는 정확한데, 캡스톤 아이디어가 개발자 앱 위주라 디자인 포트폴리오 루트가 비어 있어요. |

## 9. 종합 의견 + 구체 변경 제안 3개

### 9.1 종합 의견 (verdict 이유 포함)

제 결론은 “일부만 듣겠다”입니다. Phase 1~3의 프롬프트, 리서치, 글쓰기 파이프라인은 디자이너 프리랜서에게 바로 쓸 수 있습니다. 특히 제안서 리서치, 브랜드 톤 가이드, 콘텐츠 초안, 클라이언트 커뮤니케이션에는 충분히 돈값을 할 것 같아요.

하지만 “Creator”라고 불러놓고 실제 creator 전용 시각·모션·디자인 레슨이 비어 있는 건 큰 구멍입니다. 지금 커리큘럼은 말로는 “출발점이 어디든 빌더”라고 하지만, 실제로는 개발자로 가는 레일이 가장 선명합니다. 저는 그 레일 옆에서 몇 정거장만 타다가, 터미널 안내 방송이 길어지는 순간 내릴 가능성이 높아요.

### 9.2 변경 제안

1. **파일 — `src/content/phases.ts`** — *현재* `phase-8-multimodal`의 `lessonSlugs`가 빈 배열이라 Creator 여정의 핵심 약속이 비어 있습니다. *변경*은 Phase 8에 최소 4개 레슨을 실제로 추가하는 쪽이 좋아요. 예시는 `design-visual-prompt-system`, `figma-ai-ui-variation-workflow`, `brand-style-guide-with-ai`, `runway-motion-prototype-pipeline`입니다.
2. **파일 — `src/content/journeys.ts`** — *현재* Creator의 `targetLearner`가 블로그·뉴스레터·유튜브·숏폼 운영자 중심이라 디자이너가 빠져 있습니다. *변경*은 “브랜드·웹·콘텐츠 디자인 작업을 하며 AI로 시각 산출물과 작업 속도를 확장하려는 디자이너”를 명시하고, 추천 레슨에 Phase 8 신규 디자인 레슨과 `capstone-plan-and-launch`의 디자인 루트를 연결해야 합니다.
3. **파일 — `src/content/lessons/capstone-plan-and-launch.mdx`** — *현재* 캡스톤 아이디어 표가 사내 Q&A 봇, Action Item 자동화, 프롬프트 라이브러리 앱, 코드 리뷰 어시스턴트, 비용 대시보드로 개발자 앱에 치우쳐 있습니다. *변경*은 디자인 포트폴리오형 캡스톤을 추가하는 것입니다. 예시는 “AI 브랜드 콘셉트 제너레이터”, “랜딩페이지 카피+와이어프레임 생성기”, “브랜드 톤 기반 Midjourney 프롬프트 라이브러리”, “Runway 숏폼 모션 시안 파이프라인”입니다.
