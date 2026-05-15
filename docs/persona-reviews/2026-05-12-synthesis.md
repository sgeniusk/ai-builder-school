# 10 페르소나 평가 합본 — AI Builder School v0.2 Reality Check

> **분석일** — 2026-05-12 (듀이 워크플로우)
> **방법** — 10개 페르소나가 Codex CLI로 1대1 시뮬레이션, 각각 깊은 평가 보고서 작성. 본 문서는 10개 보고서의 *합본·교차 분석·우선순위*.

---

## Executive Summary

**Verdict 분포** — 10명 *전원이 "일부만 듣겠다"*. 아무도 "듣겠다"라고 단정하지 못했고, 아무도 "못 듣겠다"라고 거부하지 않았다.

| Verdict | 수 |
|---------|---|
| 듣겠다 | 0 / 10 |
| 일부만 듣겠다 | **10 / 10** |
| 못 듣겠다 | 0 / 10 |

**한 줄 결론** — *thesis와 Phase 1-3은 거의 모든 페르소나에게 통했지만*, **Phase 4 이후 갑작스러운 개발자 모드 점프**와 **비어 있는 Phase 8·9·10**이 모든 페르소나의 이탈 지점이다. 커리큘럼 정체성("코딩 모르는 초보자가 빌더로")과 실제 무게중심(개발자 트랙)이 어긋난다.

**우선 처리 (이번 주)** — 안전한 3건 즉시 반영. ① `lessons.ts` 깨진 글자 + lesson MDX 내 phase 링크 4건 수정 ② `enforcing-output-format`에 *비개발자 lane* 박스 추가 ③ `harness-engineering-roadmap`·`claude-code-token-saving`의 `targetJourneys` 좁히기.

**별도 plan 필요** — Phase 0/8/9/10 신규 lesson 12개, Journey 재정의 (Analyst·Designer·Student·Adopter), 비개발자 트랙 명시.

---

## 1. 통증 패턴 — 페르소나 교차 분석

### 1.1 너무 어려운 부분 Top 5

| 순위 | lesson | 지적한 페르소나 | 핵심 통증 |
|------|--------|----------------|----------|
| **1** | `enforcing-output-format` | **김민지·박서연·이정호·최유진·한지영·장도윤·윤서영·이수민 (8/10)** | "beginner 라벨인데 Zod·Pydantic·JSON Schema·API가 한꺼번에" — 비개발자 이탈 #1 |
| 2 | `coding-agent-setup` | 김민지·박서연·이정호·최유진·한지영·장도윤·윤서영·이수민 (8/10) | `.claude/settings.json`·`git push`·`.env`가 첫 화면. 안전 교육인데 *공포 체험*처럼 읽힘 |
| 3 | `connect-ai-api` | 김민지·장도윤·김태형 (3) + 한지영·이정호 우려 표시 | "Next.js App Router 한 파일이면 됩니다" — *한 파일도 한 파일이 아님* |
| 4 | `build-personal-prompt-library` | 김민지·박서연·이정호·최유진·한지영·김태형 (6) | Notion DB까지는 OK, `$ promptlib ...` CLI 예시에서 이탈 |
| 5 | `mini-agent-loop` / `ralph-loop-codex-goal` | 정민재·윤서영·김태형·장도윤 (4) | "AI 5,000번 시도" 같은 과장 + while문·MAX_RETRY가 *작지 않음* |
| 보너스 | `structured-output-handling` | 윤서영·정민재 | React 카드 UI 가정. Python 분석가/시니어용 예시 부재 |
| 보너스 | `harness-engineering-roadmap` | 박서연·최유진·김태형 | targetJourneys가 너무 넓어 creator·practitioner까지 끌어들임 |

### 1.2 뜬금없는 요소 Top 5

| 순위 | 항목 | 지적한 페르소나 | 본질 |
|------|------|----------------|------|
| **1** | **Phase 8 (Multimodal & Content) `lessonSlugs: []`** | **김민지·박서연·이정호·최유진·한지영·김태형·윤서영·이수민 (8/10)** | Creator·자영업자·디자이너에게 가장 중요한 메인 코스가 *문패만 있고 빈 방* |
| 2 | **Phase 9 (Data Analysis) `lessonSlugs: []`** | 윤서영·이수민·한지영·정민재 (4) | 분석가에게 가장 중요한 Phase가 비어 있음. 분석가는 "내 자리 없다" 인식 |
| 3 | **Phase 10 (Evals, Security) `lessonSlugs: []`** | 정민재·이수민·한지영 (3) | 시니어·PM이 *반드시* 보고 싶은 운영 품질 Phase가 비어 있음 |
| 4 | **lesson MDX 내 phase 링크 4건 깨짐** | 박서연·한지영 (2) | `phase-3-everyday-automation` (실제 `phase-3-ai-work-os`), `phase-2-prompt-context-engineering` (실제 `phase-2-prompt-engineering`), `phase-4-code-conversation` (실제 `phase-4-coding-agents`). 작은 링크 하나가 *커리큘럼 전체 신뢰* 깎음 |
| 5 | **`lessons.ts` summary 글자 깨짐** | 김민지 (1, 하지만 직격) | "구조 ��토", "인용 강제 ��색" 깨진 글자. *AI 검증을 가르치는 사이트에서 글자가 깨져 있는 아이러니* |
| 보너스 | `harness-engineering-roadmap`·`claude-code-token-saving` 의 `targetJourneys` 과대 포함 | 박서연·최유진·김태형·정민재 (4) | creator·practitioner 까지 끌어들이면 *길이 흐려짐* |
| 보너스 | `claude-code-token-saving` 위치 = Phase 11 (Product/Monetization) | 정민재 | 실제로는 *개발 운영* 레슨. Phase 4 또는 Phase 10이 맞음 |
| 보너스 | `ralph-loop-codex-goal` 의 순서·prerequisite 어긋남 | 정민재 | `tool-permission-safeguards` 보다 *먼저* 나오는데 prerequisite은 그것 |
| 보너스 | Explorer journey의 "사내 5분 발표" capstone | 김민지·장도윤 | 학생 페르소나에 "사내"는 *내 얘기 아님* |
| 보너스 | Phase 0 `lessonSlugs: []` | 김민지 | "코딩 모르는 사람도"라면서 *Phase 0이 가장 친절해야 하는데* 빈칸 |

### 1.3 빠진 부분 Top 5

| 순위 | 빠진 것 | 지적한 페르소나 | 채우는 방향 |
|------|--------|----------------|-----------|
| **1** | **비개발자/노코드 트랙** | 김민지·박서연·이정호·한지영·윤서영·이수민·김태형 (7/10) | API/Git/CLI 없이 Notion·Sheets·Zapier·Make 만으로 끝까지 가는 2주 루트 |
| 2 | **페르소나별 도메인 예시** | 거의 모든 페르소나 | 디자이너용 시각 작업, 마케터용 캠페인, 자영업자용 매장, 학생용 학교, 분석가용 SQL/대시보드, 크리에이터용 영상/수익화 |
| 3 | **AI 도입 리더 경로 (비개발 PM)** | 이수민 | "직접 빌더 안 되면서 팀에 AI 도입 리드" 경로. 우선순위 매트릭스, 파일럿 로드맵, 정책 템플릿 |
| 4 | **시간 가드레일 (15/30/50분 버전)** | 한지영·김민지 | "이번 주 1개만 본다면 뭐?" 빠른 승리 지표 |
| 5 | **무과금·저비용 루트 + 시작 전 안내** | 김민지·장도윤 | 카드 없는 학생/완전 초보의 첫 30분. 계정·비용·이메일·윤리 |
| 보너스 | **수익화 동선** (광고/협찬/멤버십/판매) | 김태형 | Phase 11 이 *비용 관리*뿐. *매출 퍼널*이 빠짐 |
| 보너스 | **레거시 코드베이스 통합** | 정민재 | 깨끗한 새 프로젝트가 아닌 *기존 더러운 코드*에 AI 붙이기 |
| 보너스 | **막혔을 때 의자** | 김민지 | 에러·API 키 누락·과제 윤리 우려 시 *어디로 돌아가나* |

---

## 2. 인정 받은 부분 (강점)

10명이 **공통으로 호평**한 lesson — 이건 *유지·확장*해야 한다.

| Lesson | 호평 페르소나 수 | 호평 포인트 |
|--------|-----------------|-----------|
| `what-llms-are-good-and-bad-at` | **10/10** | "계산기가 아니라서" 비유, 강·보조·약 분류 |
| `checks-before-trusting-ai-output` | 9/10 | FOSCB 5분 루틴, 도메인별 가중표 |
| `hallucination-verification` | 8/10 | 가짜 논문 사례, "모른다 말하는 능력이 약함" |
| `structure-of-good-prompts` | 9/10 | TCCO (Task/Context/Constraints/Output) — *팀 교육자료 그대로* |
| `automate-report-drafts` | 7/10 | "1시간 반이 30분" — 시간 절약 약속 선명 |
| `meeting-notes-pipeline` | 6/10 | 담당자/마감/산출물 3 필드 |
| `research-workflow` | 9/10 | 근거 표 + "출처 미확인으로 표시해" |
| `blog-writing-pipeline` | 8/10 | "AI가 잘 쓰는 건 맞아요. 하지만 나처럼 쓰는 건 다른 문제" — *디자이너·자영업자도 변형 가능* |
| `write-tests-with-coding-agent` | 시니어 인정 | "구현 보고 짠 테스트는 구현의 실수를 복사" |
| `bug-reproduction-loop` | 시니어 인정 | "고쳤다고 생각한다 vs 고쳤다는 걸 보여줄 수 있다" |
| `plan-with-ai` | 시니어·PM 인정 | "건드리지 않는 것" 섹션 |
| `tool-permission-safeguards` | 시니어 인정 | 실제 위험을 본다 |

**관찰** — Phase 1-3의 *개념·판단·검증 레슨*과 *Phase 3의 실무 자동화 레슨*은 거의 모든 페르소나가 호평. 문제는 *Phase 4 이후의 진입 장벽*과 *빈 Phase*.

---

## 3. 페르소나별 핵심 통증 (10명 × 1줄)

| 페르소나 | 핵심 통증 한 줄 |
|---------|---------------|
| **김민지** (인문대 1학년) | "Phase 1은 나를 초대하지만 Phase 4부터 개발자 동아리 방에 잘못 들어간 느낌" |
| **박서연** (30대 마케터) | "비개발자도 된다면서 실제로는 개발자 루트로 끌고 가는 게 아닌지 의심. 게다가 Phase 8이 비어 있다" |
| **이정호** (50대 카페 사장) | "좋은 학교인데 입구에 작은 가게 주인을 위한 안내 데스크가 아직 없다" |
| **최유진** (디자이너) | "Creator라고 부르면서 디자이너용 시각·모션 lesson이 비어 있다 — Phase 8이 메인 전시장이어야 하는데 포스터만" |
| **한지영** (워킹맘 PM) | "입구가 너무 넓고 깊다. AI 빌더 학교라기보다 *업무 시간 되찾는 빠른 길*로 먼저 보여야 한다" |
| **장도윤** (고2 이공계) | "Explorer가 학생이라면서 capstone은 *사내* 5분 발표 — 내가 진짜 타겟이긴 한가?" |
| **정민재** (시니어 백엔드) | "Phase 10 (Evals/Security) 이 빈 칸으로 약속한 건 시니어에게 *바로 신뢰 하락*" |
| **윤서영** (분석가) | "Phase 9 (Data Analysis) 가 비어 있다. 분석가에게 자리 있는지 아직 모르겠다" |
| **김태형** (크리에이터) | "Phase 8 비고, Phase 11이 *매출 퍼널*이 아닌 *API 비용 관리*라 수익화 동선이 없다" |
| **이수민** (비개발 PM) | "Adopter 경로의 약속은 큰데 실제 lesson 연결이 빈약. PM은 *도입 리더*인데 *직접 빌더*로 밀어붙임" |

---

## 4. 즉시 반영 가능한 우선순위 3건

각 항목은 *카피·메타 수정 수준*이며 데이터 모델 변경 없음. 즉시 실행 가능.

### 우선 #1 — 깨진 글자 + lesson MDX 내 phase 링크 4건 수정

**파일**
- `src/content/lessons.ts` — summary 깨진 글자 ("구조 ��토", "인용 강제 ��색" 등)
- `src/content/lessons/build-personal-prompt-library.mdx` — `/curriculum/phase-3-everyday-automation` → `/curriculum/phase-3-ai-work-os`
- `src/content/lessons/automate-report-drafts.mdx` — `/curriculum/phase-2-prompt-context-engineering` → `/curriculum/phase-2-prompt-engineering`
- `src/content/lessons/blog-writing-pipeline.mdx` — `/curriculum/phase-4-code-conversation` → `/curriculum/phase-4-coding-agents`

**근거** — 박서연·한지영·김민지가 직접 지적. 김민지의 *"AI 검증을 가르치는 사이트에서 글자가 깨져 있으면 좀 아이러니"* 라는 한 줄이 핵심. 위신 손실이 가장 큰 *값싼* 결함.

**비용** — 5분 이내. 실행 즉시 가능.

### 우선 #2 — `enforcing-output-format`에 "비개발자 20분 루트" 박스 추가

**파일** — `src/content/lessons/enforcing-output-format.mdx`

**변경** — lesson 본문 도입부에 다음 박스를 추가.

> 📌 **비개발자라면 여기까지만 — 20분 루트**
>
> 코드 없이도 *출력 형식 강제*의 80%는 달성됩니다.
>
> 1. 프롬프트 끝에 *마크다운 표 형식* 명시 — "다음 형식으로 답하세요. | 항목 | 내용 |" 식
> 2. ChatGPT/Claude의 *Custom GPT 또는 Project*에 항상 같은 출력 양식 지시문을 주입
> 3. 결과를 그대로 Notion DB 또는 Google Sheets에 붙여넣기
>
> JSON Schema·Zod·Pydantic은 *기계가 다음 단계를 자동 실행*해야 할 때만 필요합니다. 그 단계는 아래 *개발자 lane*에서 다룹니다. 지금은 위 3단계만으로 충분합니다.

그 다음 기존 본문에 `---` + **🔧 개발자 lane — JSON Schema·Zod·API** 헤더를 박고 기존 코드 예제를 그 아래로 묶음.

**근거** — 10명 중 8명이 이 lesson에서 이탈을 보고. 비개발자 페르소나 6명 모두 *"JSON Schema·Zod가 나오면 닫고 싶다"* 라고 직접 인용. 이 lesson은 모든 페르소나의 *블록 포인트*다.

**비용** — 15-20분. 단일 MDX 편집.

### 우선 #3 — `targetJourneys` 좁히기 (lessons.ts)

**파일** — `src/content/lessons.ts`

**변경**
- `harness-engineering-roadmap` — `targetJourneys` 에서 `creator`, `practitioner` 제거 → **`engineer`, `founder` 만**
- `claude-code-token-saving` — `targetJourneys` 에서 `practitioner` 제거 → **`engineer`, `founder` 만**. 추가로 *Phase 11 → Phase 4 또는 Phase 10* 으로 이동 검토 (별도 plan으로 분리)
- `prompt-injection-defense` — `targetJourneys` 에 `adopter` *추가* (이수민이 *PM도 알아야 한다*고 지적). 단 본문은 별도 변경 필요 (#5 plan으로)

**근거** — 박서연·최유진·김태형·정민재 4명이 *과대 포함*을 지적. *creator인데 하네스 엔지니어링이 추천 lesson에 끼면 길이 흐려진다*. Journey 신뢰의 첫 보호 장치.

**비용** — 5분 이내. lessons.ts 메타 한 줄씩 편집.

---

## 5. 별도 implementation plan 필요한 큰 변경

아래는 *반드시* 해야 하지만 *데이터 모델·신규 lesson·페이지 신설*이 따르므로 별도 plan으로 분리.

### Plan A — Phase 0/8/9/10 신규 lesson 12개 작성

| Phase | 신설 후보 lesson (각 phase 3-4개) | 근거 |
|-------|-------------------------------|------|
| Phase 0 | `zero-coding-orientation`, `terminal-first-day`, `ai-tool-account-and-cost`, `privacy-and-academic-ethics` | 김민지 |
| Phase 8 (Multimodal/Content) | `blog-to-shorts-pipeline`, `youtube-script-research-to-outline`, `design-visual-prompt-system`, `figma-ai-ui-variation-workflow`, `thumbnail-and-title-ab-test`, `brand-style-guide-with-ai` | 김태형·최유진·박서연·이정호 |
| Phase 9 (Data Analysis) | `sql-with-ai-verification`, `crm-segmentation-with-ai`, `dashboard-narrative-and-qa`, `ab-test-decision-memo` | 윤서영 |
| Phase 10 (Evals/Security) | `evals-for-ai-coded-prs`, `llm-observability-and-regression`, `ai-output-eval-for-pms`, `responsible-ai-policy-template` | 정민재·이수민 |

**우선순위** — Phase 8 → 9 → 10 → 0 (페르소나 지적 빈도 순). Phase 8은 4명 이상이 *메인 코스*로 지목.

### Plan B — Journey 재정의

- **Adopter 보강** — `plan-with-ai`, `github-issue-to-ai-brief`, `harness-engineering-roadmap` 추가. 본문에 "PM lane" 명시
- **Creator 확장** — 디자이너·자영업자 명시. Phase 8 신규 lesson 연결
- **Practitioner 명확화** — *분석가* 카테고리 명시 (SQL·대시보드·반복 리포트)
- **Explorer 톤 변경** — *학생*에게 *"사내 5분 발표"* 가 아닌 *"동아리 발표 / 탐구 보고서"* capstone
- **Engineer 명료화** — 시니어용 *측정 가능한* 약속 (재작업률·결함밀도)

### Plan C — 비개발자 트랙 명시

홈페이지 또는 `/curriculum` 상단에 **"코드 없이 시작하는 2주 빠른 길"** 카드 1개 신설. 추천 lesson 6-8개 묶음 (Phase 1-3 + Phase 8 신규 일부). 산출물은 *Notion DB + 인스타 캘린더 + 이벤트 문구 라이브러리* 같이 비-코드 산출물.

### Plan D — 시간 가드레일·페르소나별 도메인 예시

- `lessons.ts` 의 `mission` 필드에 *15/30/50분 버전* 분기
- 각 핵심 lesson MDX에 **"분야별 변형 박스"** 추가 (디자이너·자영업자·학생·분석가·크리에이터 각 1-2줄)

---

## 6. 다음 단계 권장

1. **이번 세션** — 우선 #1, #2, #3 안전 적용 (사용자 확인 후)
2. **다음 세션** — Plan A의 Phase 8 lesson 6개 lesson-writer 스킬로 작성 시작
3. **그 다음 세션** — Plan B (Journey 재정의)와 Plan C (비개발자 트랙) 동시 진행
4. **분기 단위** — 듀이 워크플로우 재실행. 같은 10 페르소나에게 *개선 후* 재평가시켜 verdict 분포가 *듣겠다 4+/일부만 5/못 듣겠다 1-* 로 이동했는지 측정

---

## 7. 부록 — 보고서 파일 인덱스

| 페르소나 | 파일 | 길이 |
|---------|------|------|
| 김민지 (인문대 1학년) | [2026-05-12-freshman-zero-coding.md](./2026-05-12-freshman-zero-coding.md) | 13 KB |
| 박서연 (30대 마케터) | [2026-05-12-marketer-30s.md](./2026-05-12-marketer-30s.md) | 16 KB |
| 이정호 (50대 카페 사장) | [2026-05-12-cafe-owner-50s.md](./2026-05-12-cafe-owner-50s.md) | 14 KB |
| 최유진 (디자이너) | [2026-05-12-designer-freelancer.md](./2026-05-12-designer-freelancer.md) | 13 KB |
| 한지영 (워킹맘 PM) | [2026-05-12-working-mom-time-poor.md](./2026-05-12-working-mom-time-poor.md) | 12 KB |
| 장도윤 (고2 이공계) | [2026-05-12-high-schooler-stem.md](./2026-05-12-high-schooler-stem.md) | 14 KB |
| 정민재 (시니어 백엔드) | [2026-05-12-senior-dev-skeptic.md](./2026-05-12-senior-dev-skeptic.md) | 12 KB |
| 윤서영 (분석가) | [2026-05-12-analyst-noncs.md](./2026-05-12-analyst-noncs.md) | 14 KB |
| 김태형 (크리에이터) | [2026-05-12-creator-side-hustler.md](./2026-05-12-creator-side-hustler.md) | 12 KB |
| 이수민 (비개발 PM) | [2026-05-12-nondev-pm.md](./2026-05-12-nondev-pm.md) | 14 KB |
| 합본 (본 문서) | `2026-05-12-synthesis.md` | — |
