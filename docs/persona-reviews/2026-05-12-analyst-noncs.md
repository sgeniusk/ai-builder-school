---
persona: 윤서영
slug: analyst-noncs
date: 2026-05-12
verdict: "일부만 듣겠다"
---

# 페르소나 평가 보고서 — 윤서영

## 1. 페르소나 자기소개 (1인칭, 1문단)

저는 31살이고 마케팅·CRM 데이터 분석을 4년째 하고 있어요. SQL은 매일 쓰고, Python은 pandas로 전처리하고 간단한 모델링 정도는 하지만 개발자처럼 앱을 만들거나 배포하는 건 아직 부담스럽습니다. Tableau 대시보드, 캠페인 성과 분석, 고객 세그먼트 리포트, A/B 테스트 해석이 제 일상이에요. ChatGPT는 이미 많이 씁니다. SQL 초안, Python 에러 해결, 보고서 문장 다듬기에는 꽤 의존해요. 제가 진짜 궁금한 건 이거예요. 데이터 분석가인 내 일상 업무에 진짜 적용 가능한 사례가 몇 개나 있나요?

## 2. 커리큘럼 첫 인상 (스크롤하며 느낀 것)

첫 인상은 반반이었어요. `docs/product-brief.md`의 “AI를 쓰는 사람에서 AI로 만드는 사람으로”라는 약속은 좋았습니다. 저도 단순히 ChatGPT에 질문하는 사람이 아니라, 분석 업무에 작은 agent나 자동화 루틴을 붙이고 싶거든요. Phase 1과 Phase 2는 꽤 맞았습니다. “LLM이 잘하는 일과 못하는 일”, “좋은 프롬프트의 구조”, “AI 결과를 신뢰하기 전 확인할 것”은 제가 이미 겪는 문제를 정확히 찌릅니다.

그런데 스크롤을 더 내리면 이상해져요. `src/content/phases.ts`에는 Phase 9가 “Data Analysis & Decision AI”이고 설명도 “CSV, 스프레드시트, SQL, 대시보드, 의사결정 메모를 AI와 함께 다룬다”라고 되어 있는데, `lessonSlugs: []`입니다. 데이터 분석가인 저에게 가장 중요한 Phase가 빈칸이에요. 이건 작은 누락이 아니라 신뢰 문제입니다. “분석가도 대상인가?”라고 묻는 순간, 실제 답은 “아직은 아니요”처럼 보였어요.

## 3. 깊게 읽은 lesson 목록 (왜 이걸 골랐나)

제가 고른 기준은 명확했습니다. 첫째, 내 업무에 바로 붙일 수 있는가. 둘째, Python·SQL을 쓰는 비전공 분석가가 개발자 코스로 넘어갈 때 어디서 막히는가. 셋째, AI agent를 분석 업무에 붙이는 길이 보이는가.

깊게 읽은 lesson은 `what-llms-are-good-and-bad-at`, `hallucination-verification`, `checks-before-trusting-ai-output`, `structure-of-good-prompts`, `enforcing-output-format`, `build-personal-prompt-library`, `automate-report-drafts`, `research-workflow`, `coding-agent-setup`, `structured-output-handling`, `understanding-embeddings`, `vector-search-basics`, `function-calling`, `mini-agent-loop`, `ai-app-cost-and-usage`, `ralph-loop-codex-goal`입니다. 8개만 읽으면 실무 레슨 위주로 좋게 볼 것 같아서, 일부러 후반의 어려운 agent/RAG 쪽도 읽었습니다.

## 4. 너무 어려운 부분 / 막힌 지점 (구체 인용)

가장 먼저 닫고 싶어진 지점은 `enforcing-output-format`입니다. “기계가 읽을 답은 99.9% 같은 모양이 나와야 해요. 한 번의 이탈이 전체를 멈춥니다.” 이 문장 자체는 맞습니다. 그런데 바로 이어서 JSON Schema, OpenAI `response_format`, Anthropic `input_schema`, Zod 코드가 나옵니다. 저는 Python 분석가라 Pydantic은 반갑지만, 본문 예제는 TypeScript 중심입니다. 여기서 “아, 이건 앱 개발자용이구나”라고 느꼈어요.

`structured-output-handling`은 더 급격합니다. “모델이 보낸 JSON의 `tags` 필드가 때로 문자열이고 때로 배열이에요. `null`이 올 때도 있어요. 카드 컴포넌트가 `tags.map`을 부르다 `TypeError`”라는 상황은 이해하지만, React 카드 UI가 제 업무의 출발점은 아닙니다. 저는 “LLM이 만든 CSV 분류 결과가 pandas에서 깨졌어요”나 “SQL 생성 결과가 위험한 JOIN을 만들었어요”가 먼저예요.

`vector-search-basics`의 “ANN(Approximate Nearest Neighbor)”, “Recall@5”, “MRR”도 용어 자체는 분석가에게 낯설지 않지만, 왜 이걸 CRM 분석 업무에 붙여야 하는지 다리가 부족합니다. `mini-agent-loop`의 “에이전트 루프 = while문”은 좋은 비유인데, 바로 도구 3~5개, 최대 10스텝, Thought/Action/Observation 로그로 갑니다. 여기서 저는 “내 SQL 분석 플로우를 agent로 바꾸는 예시는 어디 있지?”라고 생각했습니다.

가장 무서웠던 건 `ralph-loop-codex-goal`입니다. “목표만 주면 진짜 스스로 코딩해요”와 “AI는 천재가 아니라 절대 멈추지 않는 노동자다.” 이 표현은 개발자에게는 흥미로울 수 있지만, 비전공 분석가에게는 사고 날 것 같은 느낌이 먼저 듭니다. 특히 “50배가 아니라 보통 5~10배 더 비싼 정도예요”라는 말은 근거가 더 필요합니다. 저는 비용과 리스크를 숫자로 봐야 움직이는 사람이라, “보통”이라는 표현만으로는 부족해요.

## 5. 뜬금없는 요소 / "왜 여기 있나?" 부분

가장 뜬금없는 건 Phase 9가 비어 있다는 점입니다. 커리큘럼 표에는 Data Analysis가 있고, `phases.ts`에도 Python, Jupyter, Excel이 추천 도구로 들어갑니다. 그런데 실제 lesson은 0개예요. 분석가 입장에서는 간판만 있고 강의실이 비어 있는 느낌입니다.

두 번째는 journey입니다. `journeys.ts`에는 Practitioner, Adopter, Creator, Founder, Engineer, Explorer가 있는데 Analyst가 없습니다. 저는 Practitioner에 들어갈 수도 있고 Adopter에 걸칠 수도 있지만, “CRM 분석가”, “BI 분석가”, “마케팅 데이터 분석가”라는 일상 맥락은 어느 문장에도 선명하지 않아요.

세 번째는 개발자용 사례가 너무 빠르게 중심이 되는 점입니다. `coding-agent-setup`은 좋은 안전 교육이지만, `package.json`, `.env`, `git push`, `CLAUDE.md`가 한 번에 나옵니다. 저도 Git은 쓰지만, 분석가 다수가 이 지점에서 “이거 나 말고 개발팀 얘기네” 하고 빠질 겁니다.

## 6. 빠진 부분 / 내가 진짜 알고 싶었던 것

제가 진짜 원했던 건 이런 겁니다. AI가 SQL 쿼리를 짜줄 때 어떤 검증 루틴을 붙일지. JOIN 폭발, 기간 필터 누락, 중복 고객 카운트, `COUNT(*)`와 `COUNT(DISTINCT user_id)` 차이를 어떻게 체크할지. 캠페인 성과 리포트를 만들 때 AI가 해석한 “전환율 상승”이 표본 크기나 시즌성 때문에 착시인지 어떻게 잡을지. Tableau 대시보드 설명문을 자동 생성하되, 숫자는 원본 쿼리와 대조하는 방법. 고객 세그먼트 정의를 AI와 같이 만들 때 개인정보와 편향을 어떻게 막을지.

지금 커리큘럼에는 보고서, 리서치, 프롬프트, RAG 재료는 많습니다. 하지만 “분석가의 하루”가 없습니다. 월요일 CRM 캠페인 성과 확인, 화요일 세그먼트 추출, 수요일 대시보드 QA, 목요일 A/B 테스트 해석, 금요일 임원 보고서 같은 흐름이 lesson으로 보이면 훨씬 설득될 것 같아요.

## 7. 좋은 부분 / 인상 깊은 lesson

`what-llms-are-good-and-bad-at`은 정말 좋았습니다. “엑셀 합계, 환율 환산, 비율 계산 — 모두 LLM이 아니라 계산기가 풀어야 할 문제”라는 문장은 분석가에게 바로 꽂힙니다. 제가 팀원에게 그대로 보여주고 싶어요.

`checks-before-trusting-ai-output`의 도메인별 가중표도 좋았습니다. “데이터 분석 | Confidence 90s | Fact 60s”처럼 분석가를 한 줄이라도 넣은 건 반가웠습니다. 이걸 확장하면 Phase 9의 뼈대가 될 수 있어요.

`automate-report-drafts`는 제 업무에 바로 붙습니다. “1시간 반이 걸리던 일이 30분 안에 끝나고, 남는 시간에 ‘이 수치가 왜 이렇게 나왔는지’를 생각할 수 있어요.” 이건 제가 듣고 싶은 약속입니다. 다만 그 다음 단계가 “수치 검증 자동화”까지 가야 진짜 분석가용이 됩니다.

`research-workflow`의 근거 표도 좋았습니다. “검색 결과를 바로 요약하면 안 돼요. 중간에 근거 표를 두세요.” 이건 분석 리포트에도 그대로 적용됩니다. 사실 이 레슨은 리서치보다 “분석 결과 해석” 쪽으로 조금만 틀면 강력해질 것 같아요.

## 8. lesson별 미시 피드백 (최소 8개)

| 슬러그/제목 | 페르소나의 한 줄 평 |
| --- | --- |
| `what-llms-are-good-and-bad-at` / LLM이 잘하는 일과 못하는 일 | 분석가에게 가장 먼저 보여줄 lesson입니다. 계산은 Python·SQL, 해석 초안은 LLM이라는 경계가 명확해요. |
| `hallucination-verification` / 환각을 잡는 검증법 | 출처 검증은 좋지만, 숫자·쿼리 결과 검증 예시가 더 필요해요. |
| `checks-before-trusting-ai-output` / AI 결과를 신뢰하기 전 확인할 것 | FOSCB는 실무 체크리스트로 쓸 수 있어요. 데이터 분석 가중표를 더 키워 주세요. |
| `structure-of-good-prompts` / 좋은 프롬프트의 구조 | “이 데이터 분석해 줘”를 나쁜 예로 든 건 정확합니다. 분석 프롬프트 템플릿 3개가 있으면 바로 쓰겠어요. |
| `enforcing-output-format` / 출력 형식 강제 | 자동화에는 중요하지만 TypeScript 앱 냄새가 강합니다. Python/Pydantic 경로를 동등하게 둬야 해요. |
| `build-personal-prompt-library` / 개인 프롬프트 라이브러리 만들기 | 팀 분석 템플릿 관리에는 좋습니다. 다만 Notion/Confluence 쪽 예시가 Git보다 앞에 와야 비개발자에게 맞아요. |
| `automate-report-drafts` / 보고서 초안 자동화 | 제 업무에 바로 붙는 핵심 레슨입니다. SQL 결과와 차트 검증까지 들어가면 훨씬 강해져요. |
| `research-workflow` / 리서치 워크플로우 | 근거 표와 반박 근거는 매우 좋습니다. 시장 리서치뿐 아니라 캠페인 성과 해석에도 적용해 주세요. |
| `coding-agent-setup` / 코딩 에이전트 셋업 | 안전 원칙은 좋지만 초반부터 `.env`, allowlist, git push가 나와 겁이 납니다. 분석 노트북 기준 셋업이 필요해요. |
| `structured-output-handling` / 구조화 출력 다루기 | React 카드 UI보다 pandas DataFrame 검증 예시가 먼저였으면 끝까지 읽었을 겁니다. |
| `understanding-embeddings` / 임베딩 이해하기 | “비용 절감”과 “경비 삭감” 예시는 좋습니다. CRM 고객 문의·VOC 검색 사례로 바꾸면 더 와닿아요. |
| `vector-search-basics` / 벡터 검색 기본 | Recall@5, MRR은 분석가에게 익숙해질 수 있지만, 데이터셋 예제가 없어서 추상적으로 느껴져요. |
| `function-calling` / Function Calling 이해하기 | 날씨보다 “SQL 실행 전 dry-run 검사”나 “캠페인 메타데이터 조회” 도구였으면 훨씬 설득됐을 겁니다. |
| `mini-agent-loop` / 미니 에이전트 루프 만들기 | agent 개념은 제가 원하는 방향인데, 여행 일정 예시가 분석 업무와 멀어요. 분석 QA agent 예시가 필요합니다. |
| `ai-app-cost-and-usage` / AI 앱 비용·사용량 관리 | 비용을 데이터로 보자는 태도는 좋습니다. 분석가에게는 토큰 비용보다 “업무 시간 절감 vs 오류 리스크” 계산도 필요해요. |

## 9. 종합 의견 + 구체 변경 제안 3개

### 9.1 종합 의견 (verdict 이유 포함)

제 결론은 “일부만 듣겠다”입니다. Phase 1, Phase 2, Phase 3의 일부는 듣겠습니다. 특히 LLM의 강약점, 검증 루틴, 프롬프트 구조, 보고서·리서치 자동화는 제 업무에 바로 붙습니다. 그런데 “AI agent를 내 분석 업무에 결합해 한 단계 위 분석가가 된다”는 제 동기에는 아직 절반만 답합니다. agent, RAG, structured output은 분명 필요한 길인데, 예시가 앱 개발과 코딩 에이전트 중심으로 급격히 이동합니다. 그리고 결정적으로 Phase 9가 비어 있습니다. 데이터 분석가에게 가장 중요한 증거가 빠져 있으니, 전체를 끝까지 들을 확신은 없습니다.

### 9.2 변경 제안

1. **파일 — `src/content/phases.ts`** — *현재* Phase 9 `lessonSlugs`가 빈 배열이라 데이터 분석가용 약속이 실제 학습으로 이어지지 않습니다. *변경*은 Phase 9에 최소 4개 lesson을 추가하는 겁니다. 예시는 `sql-with-ai-verification`, `crm-segmentation-with-ai`, `dashboard-narrative-and-qa`, `ab-test-decision-memo`입니다. 추천 도구도 Python, Jupyter, SQL, Tableau, Google Sheets 순서로 재정렬하면 분석가가 “내 얘기다”라고 느낍니다.
2. **파일 — `src/content/journeys.ts`** — *현재* Practitioner와 Adopter 설명이 일반 직장인·기획자 중심이라 분석가가 자기 자리를 찾기 어렵습니다. *변경*은 Practitioner `targetLearner`에 “SQL·스프레드시트·대시보드·반복 리포트를 다루는 분석 실무자”를 명시하고, `recommendedLessons`에 Phase 9 신규 lesson과 `automate-report-drafts`, `checks-before-trusting-ai-output`을 넣는 겁니다. 새 Journey를 만들지 않더라도 분석가가 들어갈 문은 보여야 합니다.
3. **파일 — `src/content/lessons/enforcing-output-format.mdx`, `src/content/lessons/structured-output-handling.mdx`** — *현재* 구조화 출력 설명이 TypeScript/Zod/React UI 중심으로 흘러갑니다. *변경*은 각 lesson에 “Python 분석가 경로” 박스를 추가하는 겁니다. 예시는 Pydantic으로 LLM 분류 결과 검증, pandas DataFrame 컬럼 스키마 체크, 깨진 JSON을 재시도해 CSV로 저장하는 흐름입니다. 이렇게만 바꿔도 비전공 분석가가 “앱은 몰라도 내 노트북에서는 할 수 있겠다”라고 느낄 수 있습니다.
