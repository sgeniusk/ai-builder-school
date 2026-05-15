---
persona: 정민재
slug: senior-dev-skeptic
date: 2026-05-12
verdict: "일부만 듣겠다"
---

# 페르소나 평가 보고서 — 정민재

## 1. 페르소나 자기소개 (1인칭, 1문단)

나는 41살 백엔드 개발자고, Python, Go, Rust로 12년 넘게 서버를 만들었다. 스타트업 CTO도 해봤고, AI 코딩 도구도 꽤 써봤다. 솔직히 말하면 내 기본값은 회의적이다. “AI가 코드를 짜준다”는 말을 들으면 먼저 diff부터 보고, 테스트부터 돌리고, 이상한 추상화부터 의심한다. 내가 이 커리큘럼에서 확인하고 싶은 건 하나다. 이게 코딩 모르는 사람을 위한 트렌드 포장인지, 아니면 시니어 개발자인 나도 일하는 방식을 바꿀 만한 프레임을 주는지.

## 2. 커리큘럼 첫 인상 (스크롤하며 느낀 것)

전체 구조는 생각보다 성실하다. `docs/product-brief.md`의 “과장 금지”와 “학습자의 시간을 아낀다”는 약속은 방향이 맞다. `phases.ts`도 Phase 4, 6, 7이 개발자에게 핵심이라는 걸 알고 있다. 다만 첫 화면에서 내가 바로 느낀 건 “입문자를 위한 사다리와 시니어를 위한 압축 경로가 섞여 있다”는 점이다. `Engineer` 여정이 “평가·보안까지 포함된, 운영 가능한 AI 시스템”을 약속하는데, Phase 10 `Evals, Security & Responsible AI`는 `lessonSlugs: []`다. 이건 나한테 바로 신뢰 하락이다. 고급 엔지니어에게 평가와 보안을 팔 거면 빈 Phase는 안 된다.

## 3. 깊게 읽은 lesson 목록 (왜 이걸 골랐나)

나는 초급 8개를 순서대로 읽지 않았다. 그건 평가가 아니라 숙제 검사다. 먼저 내가 시간을 낼 가능성이 있는 `coding-agent-setup`, `letting-ai-read-codebase`, `plan-with-ai`, `write-tests-with-coding-agent`, `bug-reproduction-loop`를 읽었다. AI 코딩 도구가 내 루틴을 바꿀 수 있는지 보는 구간이다. 그다음 `enforcing-output-format`, `structured-output-handling`, `conversation-storage-design`을 봤다. 실제 앱에서 깨지는 지점이기 때문이다. 마지막으로 `document-chunking-strategy`, `vector-search-basics`, `grounded-rag-answers`, `function-calling`, `mini-agent-loop`, `tool-permission-safeguards`, `prompt-injection-defense`, `harness-engineering-roadmap`, `ralph-loop-codex-goal`, `claude-code-token-saving`, `ai-app-cost-and-usage`를 읽었다. RAG, agent, 비용, 하네스가 진짜 차별점인지 보려고 골랐다.

## 4. 너무 어려운 부분 / 막힌 지점 (구체 인용)

어려워서 닫고 싶은 부분보다, “이렇게 말하면 초보자는 믿고 시니어는 의심한다”는 문장이 많았다. `mini-agent-loop`의 “모델이 Thought를 명시적으로 출력하게 하면 추론 과정이 로그에 남아요”는 위험하다. 요즘 에이전트 디버깅에서 필요한 건 내부 chain-of-thought 원문이 아니라 의사결정 로그, 도구 호출 로그, 상태 전이 로그다. 본문 후반이나 메타에는 조심하라는 취지가 보이는데, MDX 본문만 읽으면 Thought를 그대로 노출해도 되는 것처럼 읽힌다.

`ralph-loop-codex-goal`의 “AI는 5,000번도 시도합니다. 그 결과가 코드로 누적되면 사람의 5일치를 1시간에 만들어내요”도 닫고 싶어지는 문장이다. 이건 1시간 구글링으로 나오는 AI 생산성 과장 문구와 다르지 않다. 실제로는 5,000번의 시도가 테스트를 통과하는지, 설계 부채를 만들지, 비용이 어디까지 가는지가 핵심이다.

`conversation-storage-design`의 “테이블 세 개와 CRUD 네 줄이 전부예요”도 시니어 입장에서는 너무 단순화됐다. 대화 저장은 멀티테넌시, 삭제 정책, summary 재생성, 프롬프트 재현성, 감사 로그가 같이 붙는다. 입문자에게 용기를 주려는 문장인 건 알지만, 운영 경험이 있는 사람에게는 “아, 여기서부터 얕아지나?”라는 신호가 된다.

## 5. 뜬금없는 요소 / "왜 여기 있나?" 부분

가장 뜬금없는 건 `claude-code-token-saving`이 Phase 11 Product & Monetization에 있다는 점이다. 내용은 제품 수익화가 아니라 개발 환경 운영비 절감과 세션 관리다. 이건 Phase 4의 하네스 또는 Phase 10의 운영 품질에 붙어야 한다. 게다가 `targetJourneys`에 `practitioner`가 들어가 있는데, QMD, read-once 훅, 3 에이전트 팀 구조는 일반 실무자에게는 과하다.

두 번째는 `ralph-loop-codex-goal`의 위치다. `phases.ts`에서는 `ralph-loop-codex-goal`이 `tool-permission-safeguards`보다 먼저 나오는데, `lessons.ts`의 prerequisite에는 `tool-permission-safeguards`가 들어간다. 본문도 “다음 레슨에서 도구 권한 가드”라고 말한다. 순서와 전제 조건이 서로 어긋난다. 이런 건 커리큘럼 신뢰를 깎는다.

세 번째는 도구 비교표의 시간성이다. `coding-agent-setup`에 “2025년 기준” 비교표가 나오고 모델명이 박혀 있다. 2026년 5월 12일에 읽는 나는 그 표를 바로 의심한다. 도구 비교를 넣을 거면 “확인일”과 “분기마다 업데이트”를 더 강하게 보여줘야 한다.

## 6. 빠진 부분 / 내가 진짜 알고 싶었던 것

내가 진짜 알고 싶은 건 “AI가 만든 코드의 품질을 어떻게 계량하나?”다. 테스트를 먼저 쓰고, 버그를 재현하고, 권한을 막는 건 좋다. 그런데 시니어에게 필요한 건 팀 단위 운영 기준이다. 예를 들어 AI 생성 PR의 리뷰 체크리스트, 결함 밀도 비교, 재작업률, 테스트 신뢰도, 토큰 비용 대비 리드타임 절감 같은 지표가 없다. `harness-engineering-roadmap`은 좋은 이름을 붙였지만, 진단표가 주관적이다.

또 하나 빠진 건 “기존 레거시 시스템에 어떻게 붙이나?”다. 대부분 예제가 새 `examples/` 폴더를 만든다. 실제 회사 코드는 레거시 인증, 불완전한 테스트, 오래된 DB 마이그레이션, 문서 없는 배치 작업으로 되어 있다. 내가 듣고 싶은 건 깨끗한 미니 앱보다 더러운 코드베이스에서 AI를 어디까지 들여도 되는가다.

## 7. 좋은 부분 / 인상 깊은 lesson

좋았던 건 `write-tests-with-coding-agent`다. “구현을 보고 짠 테스트는 구현의 실수를 같이 복사합니다”는 문장은 정확하다. AI 코딩 시대에 TDD가 오히려 더 중요해진다는 관점은 시니어에게도 설득력이 있다.

`bug-reproduction-loop`도 좋다. “고쳤다고 생각한다”와 “고쳤다는 걸 보여줄 수 있다”의 차이를 재현, 최소화, 가설, 수정, 회귀 테스트로 잡은 건 실무적이다. 이건 신입 교육에도 쓰겠다.

`grounded-rag-answers`의 “검색이 있어도 환각이 생기는 이유”와 Abstain Policy는 괜찮다. RAG를 “문서 넣으면 끝”으로 팔지 않고 검색 실패, 근거 무시, 부분 근거를 나눈 점이 좋다.

가장 시그니처가 될 가능성이 있는 건 `harness-engineering-roadmap`이다. “AI 코딩 잘하는 사람과 못하는 사람의 차이는 IDE가 아닙니다”라는 시작은 마음에 들었다. 이 커리큘럼이 초보자용 프롬프트 강의에서 벗어나는 지점이 여기다. 다만 과장 문구를 줄이고 측정 기준을 붙여야 진짜 시니어용이 된다.

## 8. lesson별 미시 피드백 (최소 8개)

| 슬러그/제목 | 페르소나의 한 줄 평 |
| --- | --- |
| `structure-of-good-prompts` / 좋은 프롬프트의 구조 | 입문자에겐 좋지만, 나는 이건 1시간 구글링이면 안다. |
| `enforcing-output-format` / 출력 형식 강제 | Zod, schema, retry를 한 묶음으로 보여준 건 실용적이다. |
| `coding-agent-setup` / 코딩 에이전트 셋업 | 권한부터 시작하는 건 맞지만, 도구 비교표는 빨리 낡는다. |
| `letting-ai-read-codebase` / AI에게 코드베이스 읽히기 | CLAUDE.md와 계층적 README는 쓸 만하다. 유지 비용 언급도 좋다. |
| `plan-with-ai` / AI와 함께 구현 계획 세우기 | “건드리지 않는 것” 섹션은 강력하다. 이건 팀 룰로 넣을 만하다. |
| `write-tests-with-coding-agent` / Codex / Claude Code로 테스트 만들기 | 이 레슨은 들을 가치가 있다. AI 시대 TDD를 제대로 짚었다. |
| `bug-reproduction-loop` / 버그 재현과 수정 루프 | 가장 현실적이다. “먼저 재현해줘”는 바로 쓸 수 있다. |
| `conversation-storage-design` / 대화 기록 저장 구조 설계 | 시작점은 맞지만 운영 저장소를 너무 가볍게 말한다. |
| `document-chunking-strategy` / 문서 청킹 전략 세우기 | 청킹을 실험 문제로 만든 점은 좋다. 수치 평가는 더 필요하다. |
| `vector-search-basics` / 벡터 검색 기본 | pgvector 선택 기준은 좋지만 “100만 개 밀리초”는 조건을 달아야 한다. |
| `grounded-rag-answers` / 근거가 있는 RAG 답변 만들기 | RAG 환각 경로를 나눈 건 좋다. 이건 고급자도 들을 수 있다. |
| `mini-agent-loop` / 미니 에이전트 루프 만들기 | while문 비유는 좋지만 Thought 로깅 표현은 고쳐야 한다. |
| `tool-permission-safeguards` / 도구 권한과 안전장치 설계하기 | 이 레슨은 커리큘럼의 강점이다. AI 에이전트의 현실적 위험을 본다. |
| `prompt-injection-defense` / Prompt Injection 방어 기초 | 개념은 맞지만 정규식 방어 예시는 장난감 느낌이 강하다. |
| `harness-engineering-roadmap` / 하네스 엔지니어링 6단계 로드맵 | 이 학교가 팔아야 할 핵심이다. 대신 “10배” 같은 말은 빼라. |
| `claude-code-token-saving` / Claude Code 토큰 절약 | 실용적이지만 위치가 이상하다. Product가 아니라 개발 운영 레슨이다. |
| `ralph-loop-codex-goal` / Ralph Loop · Codex /goal | 흥미롭지만 가장 과장되어 있다. 격리와 검증을 먼저 세워야 한다. |

## 9. 종합 의견 + 구체 변경 제안 3개

### 9.1 종합 의견 (verdict 이유 포함)

내 결론은 “일부만 듣겠다”다. Phase 1~2는 시니어 개발자에게는 너무 기본이다. 프롬프트 4축, LLM 강약점, 환각 검증은 중요하지만 새롭지는 않다. 반면 Phase 4의 테스트, 버그 재현, 계획 합의, Phase 6의 grounded RAG, Phase 7의 권한과 인젝션, 그리고 하네스 엔지니어링은 들을 가치가 있다. 이 커리큘럼이 나 같은 사람에게 먹히려면 “초보자도 할 수 있어요”보다 “시니어의 기존 기준을 AI 시대에 어떻게 재설계하나”를 분리해서 보여줘야 한다. 지금은 둘이 한 줄에 섞여 있어서, 좋은 내용도 입문자용 포장에 묻힌다.

### 9.2 변경 제안

1. **파일 — `src/content/phases.ts`, `src/content/lessons.ts`** — *현재* Phase 10 `Evals, Security & Responsible AI`가 고급 약속을 하지만 lesson이 비어 있다. *변경* 최소 2개 lesson을 추가해야 한다. 예를 들면 `evals-for-ai-coded-prs`와 `llm-observability-and-regression` 같은 레슨을 넣고, AI 생성 코드의 결함률, 재작업률, 테스트 신뢰도, 비용 대비 리드타임을 측정하게 만들어야 한다.
2. **파일 — `src/content/phases.ts`, `src/content/lessons.ts`** — *현재* `ralph-loop-codex-goal`은 Phase 7에서 `tool-permission-safeguards`보다 먼저 나오는데 prerequisite은 `tool-permission-safeguards`다. *변경* 순서를 `mini-agent-loop` → `tool-permission-safeguards` → `prompt-injection-defense` → `ralph-loop-codex-goal`로 바꾸거나, Ralph 레슨의 prerequisite과 본문 “다음 레슨” 문장을 맞춰야 한다.
3. **파일 — `src/content/lessons/harness-engineering-roadmap.mdx`, `src/content/lessons/ralph-loop-codex-goal.mdx`, `src/content/lessons/claude-code-token-saving.mdx`** — *현재* “10배의 산출”, “사람의 5일치를 1시간”, “안심하고 켜놓고 잘 수 있어요” 같은 문장이 시니어에게 과장으로 읽힌다. *변경* 각 문장을 측정 가능한 표현으로 바꾸고, 반드시 비교표를 붙여야 한다. 예를 들면 “작업 전 예상 시간, 실제 소요 시간, 토큰 비용, 실패 횟수, 되돌린 diff 라인 수”를 기록하게 만들면 회의적인 개발자도 들을 이유가 생긴다.
