---
persona: 김태형
slug: creator-side-hustler
date: 2026-05-12
verdict: "일부만 듣겠다"
---

# 페르소나 평가 보고서 — 김태형

## 1. 페르소나 자기소개 (1인칭, 1문단)

저는 32살 콘텐츠 크리에이터 김태형입니다. 유튜브 구독자 5만 명 정도 있고, 본업 말고 콘텐츠로 월 200만 원 정도 벌어요. Premiere, CapCut, Photoshop은 손에 익었고 ChatGPT, Midjourney, Suno도 이미 씁니다. 그래서 저는 “AI가 신기해요” 단계가 아니에요. 제 질문은 딱 하나예요. 이 강의가 제 콘텐츠 기획, 촬영, 편집, 재가공, 발행, 제휴, 상품 판매 파이프라인에 직접 꽂히나요? 저는 시간 3배 절약과 수익화 연결을 보러 왔지, 멋진 토이 프로젝트를 구경하러 온 게 아닙니다.

## 2. 커리큘럼 첫 인상 (스크롤하며 느낀 것)

첫 인상은 반반입니다. 제품 브리프의 “AI를 쓰는 사람에서 AI로 만드는 사람으로”와 “매 주마다 하나의 문제를 이해하고 산출물을 만든다”는 약속은 좋았어요. 크리에이터 여정도 “블로그·뉴스레터·유튜브·숏폼 등을 운영하며 AI로 표현력과 속도를 키우려는 크리에이터”라고 되어 있어서 저를 부르는 느낌이 있었습니다.

그런데 `src/content/phases.ts`를 보다가 바로 식었어요. Phase 8 제목은 “텍스트·이미지·오디오·비디오를 잇는 파이프라인을 만든다”인데 `lessonSlugs`가 비어 있습니다. 이건 저 같은 사람에게 제일 중요한 메인 코스가 메뉴판에만 있고 주방에는 아직 없는 상태로 보여요. 반대로 Phase 4, 5, 7은 코딩 에이전트, API, 에이전트 루프가 꽉 차 있습니다. 학교의 정체성은 빌더 쪽으로 강한데, 크리에이터의 돈 버는 워크플로우는 아직 주변부에 있습니다.

## 3. 깊게 읽은 lesson 목록 (왜 이걸 골랐나)

저는 첫 8개를 순서대로 읽지 않았습니다. 제가 실제로 돈과 시간을 아낄 가능성이 있는 것부터 골랐어요. `structure-of-good-prompts`는 모든 자동화의 기본이라 봤고, `build-personal-prompt-library`는 반복 콘텐츠 제작에 필요해 보였습니다. `feeding-long-documents`와 `research-workflow`는 영상 소재 리서치에 바로 연결될 수 있어서 골랐습니다. `blog-writing-pipeline`은 크리에이터 추천 레슨이라 깊게 봤고, `hallucination-verification`은 잘못된 정보로 영상 만들면 신뢰가 깨지니까 읽었습니다. 수익화 관점에서는 `ai-app-cost-and-usage`와 `capstone-plan-and-launch`를 골랐고, 이 강의가 저를 얼마나 개발 쪽으로 밀어 넣는지 보려고 `connect-ai-api`, `mini-agent-loop`, `prompt-injection-defense`, `harness-engineering-roadmap`도 읽었습니다.

## 4. 너무 어려운 부분 / 막힌 지점 (구체 인용)

가장 먼저 닫고 싶어진 건 `connect-ai-api`입니다. “Next.js의 App Router라면 `app/api/chat/route.ts` 한 파일이면 됩니다.”라는 문장에서 이미 저는 강의 창을 줄일 것 같아요. 개발자에게는 “한 파일이면 된다”지만, 제게는 Next.js, App Router, route.ts가 전부 새 장벽입니다. 저는 콘텐츠 파이프라인을 자동화하러 왔는데 갑자기 서버 라우트와 환경변수, SDK 예제가 나옵니다.

`mini-agent-loop`의 “에이전트 루프 = while문”도 비슷했습니다. 자동화라는 말은 끌리는데, while문과 `MAX_CONSECUTIVE_ERRORS`가 나오면 제 머릿속에서는 “이거 내가 직접 유지보수해야 하나?”가 먼저 떠요. `harness-engineering-roadmap`의 “하네스는 6가지 축으로 이루어집니다.”도 마찬가지입니다. 이 레슨은 좋은 내용일 수 있지만 제 입장에서는 크리에이터 과정 중간에 갑자기 개발팀 운영 매뉴얼을 읽는 느낌이에요.

`build-personal-prompt-library`도 중간부터 난이도가 튑니다. “Front Matter — 모든 템플릿에 메타데이터”, “미니 CLI 또는 슬래시 명령”은 실용적이긴 한데, 제가 원하는 건 유튜브 기획안, 썸네일 프롬프트, 쇼츠 스크립트, 협찬 제안서 템플릿을 빨리 찾는 시스템입니다. YAML과 CLI가 먼저 나오면 “이거 콘텐츠 만드는 사람 말고 개발 조직용 아닌가?”라는 생각이 들어요.

## 5. 뜬금없는 요소 / "왜 여기 있나?" 부분

제일 뜬금없는 건 Creator 여정에 `harness-engineering-roadmap`이 걸쳐 있는 점입니다. 레슨 자체의 `targetJourneys`에 creator가 들어가 있는데, 본문은 CLAUDE.md, MCP, `.claudeignore`, 멀티 에이전트, 검증 파이프라인 얘기입니다. “좋은 하네스가 깔린 사람은 같은 도구로 10배의 산출을 냅니다.”라는 문장은 멋있지만, 제 채널 운영에는 바로 번역이 안 됩니다. 제가 듣고 싶은 건 좋은 하네스가 아니라 좋은 콘텐츠 제작 공장입니다.

또 하나는 수익화 Phase 11입니다. 제목은 “AI Product & Monetization”인데 실제 레슨은 `ai-app-cost-and-usage`와 `claude-code-token-saving`입니다. 이건 AI 앱 만드는 사람에게는 중요하지만, 제게 수익화는 광고, 협찬, 멤버십, 강의, 템플릿 판매, 뉴스레터, 리드마그넷, 퍼널입니다. 비용 관리는 필요하지만 매출 동선이 빠져 있어요.

## 6. 빠진 부분 / 내가 진짜 알고 싶었던 것

제가 진짜 알고 싶은 건 “콘텐츠 하나가 돈으로 이어지는 파이프라인”입니다. 예를 들면 롱폼 영상 하나를 블로그, 쇼츠 5개, 뉴스레터, 인스타 카드뉴스, 커뮤니티 글, 유료 템플릿으로 쪼개는 루프요. 그리고 각 채널에서 어떤 지표를 보고 다음 콘텐츠를 고를지, 협찬 제안서와 상품 판매 페이지로 어떻게 연결할지 알고 싶습니다.

지금 커리큘럼에는 `blog-writing-pipeline`처럼 좋은 조각이 있지만, 유튜브 중심 크리에이터 입장에서는 영상 스크립트, B-roll 프롬프트, 썸네일 A/B, 쇼츠 훅 10개 생성, 댓글 분석, 영상별 수익성 판단, 협찬 메일 자동화가 빠져 있습니다. Phase 8이 바로 그걸 해야 하는데 아직 비어 있어서 아쉽습니다.

## 7. 좋은 부분 / 인상 깊은 lesson

`blog-writing-pipeline`은 정말 잘 만들었습니다. “AI가 쓴 글, 읽어보면 다 '그런 글'이에요”는 제가 매일 느끼는 문제예요. “내 글 중 가장 '나다운' 글 2~3개를 골라 컨텍스트에 넣습니다.”도 바로 실행 가능합니다. 이건 글뿐 아니라 제 영상 오프닝 멘트, 자막 톤, 커뮤니티 글에도 응용할 수 있어요.

`research-workflow`도 좋았습니다. “출처 없으면 말하지 마”와 근거 표 방식은 콘텐츠 신뢰도를 지키는 데 필요합니다. 특히 AI가 준 시장 수치로 영상 만들었다가 틀리면 채널 신뢰가 날아가니까요. `hallucination-verification`의 “AI는 '모른다'라고 말하는 능력이 약합니다.”도 크리에이터에게 꼭 필요한 경고입니다.

`structure-of-good-prompts`는 기본기 레슨으로 좋았습니다. “프롬프트는 부탁이 아니라 명세”라는 한 줄은 기억에 남아요. 다만 예시가 B2B SaaS 보고서 쪽이라, 크리에이터 버전 예시가 같이 있었으면 훨씬 빨리 붙었을 겁니다.

## 8. lesson별 미시 피드백 (최소 8개)

| 슬러그/제목 | 페르소나의 한 줄 평 |
| --- | --- |
| `structure-of-good-prompts` / 좋은 프롬프트의 구조 | 기본기는 좋지만 예시가 직장인 보고서 쪽이라 유튜브 기획안 예시가 필요해요. |
| `build-personal-prompt-library` / 개인 프롬프트 라이브러리 만들기 | 반복 작업에는 딱인데 YAML, Git, CLI보다 Notion, Drive, 콘텐츠 캘린더 예시가 먼저였으면 해요. |
| `feeding-long-documents` / 긴 문서를 AI에게 먹이는 법 | 긴 리포트 읽고 영상 소재 뽑는 데 바로 쓸 수 있어서 실용적이에요. |
| `research-workflow` / 리서치 워크플로우 | 근거 표와 반박 근거는 콘텐츠 신뢰도 때문에 꼭 배워야겠다고 느꼈어요. |
| `blog-writing-pipeline` / 블로그 글쓰기 파이프라인 | 지금까지 읽은 것 중 제일 제 일에 꽂혔고, 영상 대본 버전으로 확장하면 강력해요. |
| `hallucination-verification` / 환각을 잡는 검증법 | 콘텐츠 크리에이터에게 보험 같은 레슨인데, 유튜브 논란 사례로 바꾸면 더 몰입돼요. |
| `connect-ai-api` / AI API 붙이기 | 중요하겠지만 제게는 갑자기 개발자 코스가 시작된 느낌이라 중간 브릿지가 필요해요. |
| `mini-agent-loop` / 미니 에이전트 루프 만들기 | 자동화 욕망은 자극하지만 while문이 나오는 순간 “내가 이걸 왜 직접 짜지?”가 됩니다. |
| `prompt-injection-defense` / Prompt Injection 방어 기초 | 공개 챗봇 만들 사람에겐 중요하지만, 크리에이터 코어 경로에서는 우선순위가 낮아요. |
| `ai-app-cost-and-usage` / AI 앱 비용·사용량 관리 | 수익화 레슨인 줄 기대했는데 API 비용 관리라서 제 매출 퍼널 질문에는 답이 부족해요. |
| `capstone-plan-and-launch` / Capstone 프로젝트 기획과 배포 | “4주 안에 5명이 써 보는 상태”는 좋지만 크리에이터 캡스톤 아이디어가 너무 앱 중심이에요. |
| `harness-engineering-roadmap` / 하네스 엔지니어링 6단계 로드맵 | 학교의 시그니처인 건 알겠는데 제게는 개발팀 운영론처럼 느껴져요. |

## 9. 종합 의견 + 구체 변경 제안 3개

### 9.1 종합 의견 (verdict 이유 포함)

제 결론은 “일부만 듣겠다”입니다. Phase 1, 2, 3의 리서치와 글쓰기 레슨은 듣겠습니다. 특히 프롬프트 구조, 장문 처리, 리서치, 블로그 파이프라인은 제 콘텐츠 제작 시간을 줄일 가능성이 큽니다. 하지만 지금 상태로 전체 커리큘럼을 완주하라고 하면 망설입니다. 크리에이터 전용 Phase 8이 비어 있고, 수익화 Phase 11이 매출보다 API 비용 쪽에 치우쳐 있어서요.

이 강의가 제 질문에 답하려면 “AI로 만드는 사람”을 “AI 앱 만드는 사람”으로만 해석하면 안 됩니다. 저 같은 사람에게 빌더는 콘텐츠 자산, 배포 시스템, 수익 퍼널을 만드는 사람입니다. 지금은 그 가능성은 보이는데, 아직 직접 꽂히지는 않습니다.

### 9.2 변경 제안

1. **파일 — `src/content/phases.ts`** — Phase 8의 `lessonSlugs`가 현재 빈 배열이라 크리에이터 핵심 약속이 비어 보여요. `blog-to-shorts-pipeline`, `youtube-script-research-to-outline`, `thumbnail-and-title-ab-test`, `content-revenue-funnel` 같은 레슨을 실제로 연결하고, deliverable도 “콘텐츠 자동화 파이프라인 1개”보다 “롱폼 1개 → 쇼츠 5개 → 뉴스레터 1개 → 판매 CTA 1개”처럼 구체화해야 해요.
2. **파일 — `src/content/journeys.ts`** — Creator의 `recommendedLessons`가 현재 `structure-of-good-prompts`, `blog-writing-pipeline`, `research-workflow` 세 개뿐이라 너무 얇아요. 기존 `feeding-long-documents`, `hallucination-verification`를 추가하고, 새 Phase 8 레슨과 수익 퍼널 레슨을 넣어 “발행 빈도 2배”뿐 아니라 “콘텐츠에서 수익 실험까지”로 expectedOutcome을 바꿔야 해요.
3. **파일 — `src/content/lessons.ts`와 `src/content/lessons/capstone-plan-and-launch.mdx`** — 캡스톤 아이디어가 사내 Q&A 봇, 프롬프트 라이브러리 앱, 비용 대시보드처럼 앱 중심이에요. 크리에이터용 캡스톤으로 “유튜브 롱폼 재가공 시스템”, “협찬 제안서 자동 생성 + 브랜드 리스트 리서치”, “유료 템플릿 판매 랜딩 + 콘텐츠 CTA 실험”을 추가해야 해요. 그래야 제가 “이거 돈 되나?”를 물었을 때 강의가 바로 대답합니다.
