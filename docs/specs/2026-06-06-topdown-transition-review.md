# Top-down 학습 전환 검토 보고서

> 지음(知音, 옛 AI Builder School) 사이트를 Stage-first/Curriculum-first 구조에서 Project-first/Top-down 구조로 전환할 수 있는지, 실제 레포를 읽고 판단한 검토.
> 작성 2026-06-06 · 검토 대상 커밋 `2cbf8dd` (main) · 역할 Product Strategist / Learning Experience Designer / Next.js Content Architect

**읽는 법** — `[확인됨]`은 레포에서 직접 본 사실, `[추정]`은 거기서 끌어낸 판단이다. 파일은 `경로:줄` 형식으로 가리킨다.

---

## 0. 먼저 — 전제와 실제의 차이부터 (사실 정정)

검토 의뢰서의 "현재 사이트 전제"와 레포 실제 상태가 몇 군데 다르다. 전환 판단의 토대라 먼저 바로잡는다.

| 의뢰서 전제 | 레포 실제 | 근거 |
|---|---|---|
| 사이트 이름 "AI Builder School" | **지음(JIEUM·知音)** 으로 리브랜딩 완료 | `src/app/page.tsx:1`, `LandingSections.tsx:38` |
| Stage 6개 | **데이터는 6개** (의뢰서 맞음). 단 표시 카피는 곳곳이 "8단계" | `src/content/stages.ts:1` vs `stages/page.tsx:8` |
| 교육 루프 7단계 | 맞음 — 레슨이 7단계를 세로로 렌더 | `lessons/[lessonSlug]/page.tsx:119‑224` |
| Stage 영문 명칭 | 한글 라벨 사용 (`AI와 만나다` 등) | `stages.ts:11` |
| 메뉴 Specials/Templates 등 | 맞음 + `/me`(진척 대시보드) 추가 존재 | `find src/app` |

→ **핵심 — 의뢰서가 가정한 "6 Stage"는 맞다. 그런데 사이트 표면은 아직 "8단계"라고 말한다.** 데이터(6)와 카피(8)가 어긋난 상태이며, 이건 9번 검토 항목의 1번과 직결된다.

또 하나 중요한 사실. **데이터 모델과 일부 UI는 의뢰서가 가정한 것보다 이미 훨씬 top-down에 가깝다.** 프로젝트 milestone은 이미 `firstStep`(막막함 더는 첫 행동)·`starterPrompt`(복붙 출발 프롬프트)·`fallbackLesson`(막히면 볼 레슨)을 갖고 있고(`types.ts:230‑242`), 2.0 지식 그래프(Concept·Edge·Lens·backlink 순회 API)가 실재한다(`ontology.ts`, `content.ts:514‑548`). 즉 **엔진은 top-down인데 운전석이 curriculum-first다.** 이 보고서 전체의 한 줄 요약이기도 하다.

---

## 1. Executive Summary

### Top-down 적합도 — **58 / 100**

근거. 데이터·그래프 인프라만 보면 ~75점이다(막힘→구조 레슨 구조, Lens, backlink 순회, 노드 교차참조가 이미 있음). 그러나 학습자가 실제로 마주하는 진입 IA·프레이밍·평가는 curriculum-first(~45점)이고, 표면의 "8 vs 6 / 84 vs 89" 불일치가 신뢰를 깎는다. 둘을 합치면 58점. **잠재력은 높고 운전석만 못 바꾼 상태**라는 뜻이다.

### 가장 큰 강점 3

1. **프로젝트가 이미 "막힘 기반"으로 설계돼 있다** `[확인됨]` — 18개 프로젝트 전부 milestone마다 `firstStep`·`starterPrompt`·`fallbackLesson`을 갖는다. 프로젝트 상세 UI도 "먼저 할 것 / 시작 프롬프트 / 막히면 OO 레슨으로"를 이미 렌더한다(`projects/[slug]/page.tsx:119‑139`). Top-down의 가장 어려운 절반(막힘→구제 연결)이 이미 구현돼 있다.
2. **지식 그래프 + 렌즈가 실재한다** `[확인됨]` — Stage는 이미 "경로"가 아니라 그래프 위의 **Lens**로 모델링돼 있다(`types.ts:395`, `ontology.ts:145`). `getBacklinks`·`getOutEdges`·`getProjectsByTemplate` 같은 순회 API도 있다. "Stage as map" 전환에 필요한 토대가 깔려 있다.
3. **컴패니언(知音 되묻기)이 재귀 튜터의 씨앗이다** `[확인됨]` — `companion.ts`가 레슨 맥락+내 메모+여정을 담아 "정답을 받아쓰게 하지 말고 직접 짓도록 한 걸음씩" 프롬프트를 만들어 외부 AI로 넘긴다. 진단·재귀 설명의 출발점이 이미 있다.

### 가장 큰 병목 3

1. **진입 IA가 역할→Stage→레슨이고, 프로젝트는 하류·졸업과제로 격리** `[확인됨]` — 홈에 프로젝트 섹션이 아예 없다(`page.tsx`). 프로젝트 상세는 "이건 캡스톤이에요 … 배운 걸 혼자 적용하는 졸업 과제"라고 명시한다(`projects/[slug]/page.tsx:80‑88`). 만들고 싶은 것에서 출발하는 길이 막혀 있다.
2. **레슨이 자기완결 미니강의라 JIT 카드로 작동하지 않는다** `[확인됨]` — 레슨 하단 CTA가 "Stage로 돌아가기 / 전체 커리큘럼"뿐이고, "이 레슨이 필요한 순간"이나 "프로젝트로 돌아가기"가 없다(`lessons/[lessonSlug]/page.tsx:310‑318`). 레슨이 자신을 호출한 프로젝트를 모른다.
3. **표면 불일치가 신뢰를 깎는다** `[확인됨]` — 데이터는 6 Stage·89 레슨인데 사이트 메타·사이트맵·Stages 페이지·대시보드는 "8 Stage·84 레슨"이라고 말한다(`layout.tsx:8`, `stages/page.tsx:8‑39`, `builderRank.ts:2`).

### 전환의 핵심 한 문장

> **엔진(데이터·그래프·막힘 구조)은 이미 top-down이므로, 전면 재건축이 아니라 "진입로를 프로젝트로 열고, Stage를 사다리에서 지도로 다시 부르고, 레슨에 '왜 지금 이걸 보는가'를 붙이는" 프레이밍·IA 전환으로 충분하다.**

---

## 2. Current Architecture Audit

적합도는 0‑100, "이 영역이 지금 top-down을 얼마나 지원하는가".

| 영역 | 현재 구조 `[확인됨]` | 적합도 | 문제 | 개선 방향 |
|---|---|---:|---|---|
| **Home** | 여정 중심 6섹션(히어로·가치·여정지도·여정카드·방법·CTA). 프로젝트 섹션 없음. CTA는 "30초 진단"+"여섯 단계 둘러보기" (`page.tsx`, `LandingSections.tsx`) | 45 | 만들고 싶은 것에서 출발하는 입구가 없음. "단계 둘러보기"가 두 번째 CTA | "무엇을 지을까" 빌드 진입 섹션 추가. 2차 CTA를 프로젝트 갤러리로 |
| **Start** | 역할 기반 1문항("가장 가까운 모습은?"). 단 각 선택지에 이미 "만들 것"(프로젝트 top‑2) 노출 (`start/page.tsx:62‑71`) | 50 | 첫 질문이 역할(정체성)이지 산출물이 아님 | "무엇을 만들고 싶은가"를 1번 질문으로. 역할은 2번으로 |
| **Stages** | 6장 카드를 "8단계 사다리" 헤드라인 아래 렌더. 수직 진척 사다리로 서술 (`stages/page.tsx`) | 50 | 필수 순서처럼 보임 + 8/6 불일치. 단 내부는 이미 Lens | "역량 지도"로 재명명·재서술. 카운트 동적화 |
| **Journeys** | 6 여정 = 척추. `recommendedStages`·`recommendedLessons`·`capstoneIdeas`·`expectedOutcome` 보유 (`journeys.ts`) | 65 | Stage를 "추천"이라 부르나 사실상 순서로 읽힘. 프로젝트가 capstoneIdeas(문자열)로만 묶임 | `fastStartProject`·`primaryProjects` 추가. Stage는 "선택 역량"으로 |
| **Projects** | 18개. milestone마다 firstStep·starterPrompt·fallbackLesson. 난이도별 그룹. "캡스톤"으로 프레이밍 (`projects.ts`, `projects/[slug]/page.tsx`) | 55 | **데이터는 80점, 프레이밍이 35점.** "졸업 과제·준비 레슨 먼저"가 top-down과 정면 충돌 | "지금 바로 짓기" 입구로 재프레이밍. blockers를 1급 데이터로 |
| **Lessons** | 89개. 7단계 세로 렌더(문제→개념→미션→빌드→검증→산출물→회고). deliverable 칩·스킵 안내·컴패니언 보유 (`lessons/[lessonSlug]/page.tsx`) | 55 | 자기완결 강의. "필요한 순간"·"프로젝트로 복귀" 없음. 개념 깊이 1단(coreConcepts)뿐 | 상단에 JIT 헤더 4종 추가. 개념 깊이 4단 사다리 |
| **Templates** | 25개. 프로젝트에서 templateSlugs로 호출, 상세에 "이 프로젝트에 쓰는 템플릿" 노출. 그러나 `usedWhen` 없음 (`types.ts:279`, `projects/[slug]/page.tsx:192`) | 55 | 자료실 + 프로젝트 레벨 링크는 있으나, 막힘·단계와 직접 연결 안 됨 | `usedWhen`·`relatedBlockers`·`projectStepUsage` 추가. milestone에서 직접 호출 |
| **Specials** | 3개 휘발성 특강. `deepens` 엣지로 레슨 심화 (`specials.ts`, `ontology.ts:130`) | 60 | top-down과 직교(보완재). 문제 없음 | 그대로 유지. 막힘 카드에서 선택적 심화로 노출 |
| **Progress** | 완료 레슨 수로 rank 파생("84 만점"). 레슨 내 build/verify/reflect는 SectionChecklist로 추적 (`builderRank.ts:2`, `BuilderDashboard.tsx`) | 50 | 헤드라인이 완강률. 84 stale. 빌드/검증/회고 신호는 있으나 집계 안 됨 | 산출물·검증 통과·회고를 1급 진척 지표로 승격 |
| **Data Model** | NodeMeta·Edge·Lens·graph 순회 API. milestone 구제 구조. 컴패니언 핸드오프 (`types.ts`, `ontology.ts`, `content.ts:514‑548`) | 75 | top-down 핵심 필드(neededWhen·failureSymptoms·conceptDepth) 부재 | 기존 타입을 **확장**(교체 아님). 약 40%는 이미 존재 |

**가중 평균 ≈ 56‑58.** 데이터 모델만 압도적으로 높고, 학습자 표면이 전부 50대에 머문다 — 정확히 "엔진과 운전석의 격차".

---

## 3. Top-down 전환 원칙 (지음에 맞게 재정의)

| 원칙 | 지음에서의 의미 | 이미 있는 것 | 보태야 할 것 |
|---|---|---|---|
| **Project-first** | "무엇을 지을까"가 첫 화면·첫 질문. 레슨은 짓다가 부른다 | milestone 구제 구조, getProjectsByJourney | 홈 빌드 섹션, Start 1번 질문 교체, 프로젝트 "캡스톤" 탈피 |
| **Just-in-time concept** | 레슨은 코스가 아니라 "막혔을 때 펴는 카드" | deliverable 칩, 스킵 안내 | `neededWhen`·`failureSymptoms`, 상단 JIT 헤더, 프로젝트 복귀 CTA |
| **Blocker-driven navigation** | 막힘 증상을 고르면 레슨·템플릿·특강으로 분기 | milestone.fallbackLesson | 프로젝트 레벨 `blockers[]`, /build 내비게이터 |
| **AI recursive tutor** | 비유→실무→구현→원리로 재귀 설명. 막힘 진단 | 컴패니언 핸드오프(레슨 범위) | 막힘 범위로 확장, 개념 깊이 4단을 프롬프트에 주입 |
| **Build/Verify/Reflect 중심 평가** | 완강률이 아니라 산출물·검증·회고·재사용 루틴 | 레슨 SectionChecklist(verify/reflect), 프로젝트 verification | 산출물 로그, 검증 통과 집계, rank 재정의 |
| **Stage as map, not path** | Stage는 사다리가 아니라 역량 지도. 어디서든 진입 | Stage = Lens (`types.ts:395`) | "사다리/8단계" 카피 제거, 지도형 UI, 진입 자유 |
| **Template as tool, not library** | 템플릿은 실행 중 손에 쥐는 도구 | 프로젝트 상세 템플릿 블록 | `usedWhen`, milestone 단계별 직접 호출 |
| **Concept depth ladder** | 한 개념을 12세 비유→실무→구현→이론 4단으로 | coreConcepts(1단), concepts.ts(요약) | `explainLikeTwelve`·`practicalExplanation`·`implementationNotes`·`deeperTheory` |

---

## 4. Information Architecture 변경안

### 현재 IA `[확인됨]`
```
Home(여정중심) → Start(역할진단) → Journey → Stage(사다리) → Lesson(자기완결)
                                                        Projects(캡스톤, 하류 격리)
```
- 프로젝트는 홈에 없고, 레슨·Stage를 거친 뒤 도달하는 졸업과제로 위치.
- 레슨은 자신을 부른 프로젝트를 모른다(복귀 경로 없음).

### 권장 IA (이중 진입 — 빌드 우선, 사다리는 지도로 잔존)
```
Home ─┬─ [짓기 시작] Build Navigator → Project → (짓다 막힘) → Blocker
      │                                   │                      ├─ Rescue Lesson(JIT) ─┐
      │                                   │                      └─ Template / Special  │
      │                                   └──────────── 다시 Project로 ←────────────────┘
      │                                                 → Verify → Reflect → 산출물 로그
      ├─ [둘러보기] Project Library (난이도·여정·"만들 것" 필터)
      ├─ [내 위치 보기] Stage Map (역량 지도 · 어디서든 진입)
      └─ [길 고르기] Journey (여정 = 추천 프로젝트 + 선택 역량)
```

### 페이지별 역할 재정의

| 페이지 | 현재 역할 | 권장 역할 |
|---|---|---|
| **Home** | 여정 서사 소개 | 첫 화면에서 "무엇을 지을까" 제시. 빌드 내비 + 프로젝트 갤러리가 1급 |
| **Start** | 역할 진단 | "만들고 싶은 것" 1번 → 역할 2번. 결과 = 추천 프로젝트 1개(빠른 출발) + 여정 |
| **/build (신규)** | 없음 | Build Navigator. 산출물 유형/문제에서 프로젝트로 라우팅 |
| **Projects** | 캡스톤 카탈로그 | 학습 시작점. "15분 첫 시도"가 카드에서 바로 보임 |
| **Project Detail** | 졸업과제 가이드 | 작업장. 첫 시도→막힘 선택→구제 레슨→검증→회고의 루프 셸 |
| **Lessons** | 자기완결 강의 | 두 얼굴 — 정주행 가능 + JIT 카드(필요한 순간·프로젝트 복귀) |
| **Stages** | 8단계 사다리 | 역량 지도. "내가 가진/필요한 역량" 좌표. 진입 자유 |
| **Journeys** | 여정 척추 | 빠른 출발 프로젝트 + 선택 역량 묶음. 순서 강제 제거 |
| **Templates** | 자료실 | 실행 도구함. 막힘·단계에서 직접 호출 |
| **/me** | 완강 대시보드 | 산출물 포트폴리오 + 검증·회고 로그 중심 |

---

## 5. Data Model 변경안

원칙 — **기존 타입을 교체하지 않고 옵셔널 필드로 확장한다.** 의뢰서가 제안한 필드의 약 40%는 이름만 다를 뿐 이미 존재한다. 아래 표의 "이미 있음/부분/신규"가 핵심이다.

### Project (`src/lib/types.ts:244`)

| 제안 필드 | 상태 | 매핑·메모 |
|---|---|---|
| `successCriteria` | **이미 있음** | = `verification: string[]` |
| `estimatedBuildWindow` | **이미 있음** | = `estimatedDuration: string` |
| `extensionIdeas` | **이미 있음** | 그대로 |
| `rescueLessons` | **부분** | milestone별 `fallbackLesson` + `keyLessons` 존재. 통합 인덱스만 |
| `aiMissionPrompt` | **부분** | milestone `starterPrompt` 존재. 프로젝트 레벨 킥오프 프롬프트만 추가 |
| `firstAttempt` | **신규** | `{ window: string; prompt: string }` — "15분 첫 시도" 명시(milestone 0에서 승격) |
| `minimumViableScope` | **신규** | 끝낼 수 있는 최소 범위 한 줄(레슨 `capstone-scope-selection` 시드) |
| `blockers` | **신규(핵심)** | `Blocker[]` — 아래 정의 |
| `rescueTemplates` | **신규** | blocker별 템플릿(현재는 프로젝트 레벨 `templateSlugs`만) |
| `conceptCards` | **신규** | 그래프 `teaches` 엣지에서 자동 유도 가능 |
| `reflectionPrompts` | **신규** | 프로젝트 레벨(레슨엔 `reflectionQuestions` 있음) |

```ts
// 신규 — 막힘을 1급 데이터로
export interface Blocker {
  symptom: string;          // "검색이 엉뚱한 청크를 가져와요"
  rescueLesson?: string;    // lesson slug
  rescueTemplate?: string;  // template slug
  rescueSpecial?: string;   // special slug (선택적 심화)
  conceptSlug?: string;     // 개념 깊이 사다리로 점프
}
// Project에 옵셔널 추가
firstAttempt?: { window: string; prompt: string };
minimumViableScope?: string;
blockers?: Blocker[];
reflectionPrompts?: string[];
```

### Lesson (`src/lib/types.ts:160`)

| 제안 필드 | 상태 | 매핑·메모 |
|---|---|---|
| `prerequisiteConcepts` | **부분** | `prerequisites`(레슨 slug) 있음. 개념 단위만 추가 |
| `explain...` 4단 | **부분** | `coreConcepts`(1단) 있음. 3단 더 |
| `relatedTemplates` | **부분** | 프로젝트→템플릿 역참조 가능. 레슨→템플릿 직접 필드만 |
| `neededWhen` | **신규(핵심)** | "이 레슨이 필요한 순간" — JIT 헤더의 본체 |
| `failureSymptoms` | **신규(핵심)** | blocker 매칭 키. "이런 증상이면 이 레슨" |
| `unlocksProjects` | **신규** | projects의 keyLessons/fallbackLesson 역인덱스로 자동 생성 가능 |
| `conceptDepth` | **신규** | 아래 4단 객체 |

```ts
// 신규 — 개념 깊이 4단 사다리(재귀 튜터가 단계별로 읽음)
export interface ConceptDepth {
  explainLikeTwelve: string;     // 쉬운 비유
  practicalExplanation: string;  // 실무 개념
  implementationNotes: string;   // 구현
  deeperTheory?: string;         // 원리
}
// Lesson에 옵셔널 추가
neededWhen?: string;
failureSymptoms?: string[];
unlocksProjects?: string[];   // 빌드 시 역인덱스로 채움
conceptDepth?: ConceptDepth;
relatedTemplates?: string[];
```

### Journey (`src/lib/types.ts:75`)

| 제안 필드 | 상태 | 매핑 |
|---|---|---|
| `optionalStages` | **부분(재명명)** | `recommendedStages` 의미를 "선택 역량"으로 |
| `recommendedConcepts` | **신규** | 여정별 핵심 개념 |
| `primaryProjects` | **신규** | capstoneIdeas(문자열) → 실제 project slug 배열 |
| `fastStartProject` | **신규** | 첫 화면에서 바로 권하는 단 1개(Start가 이미 top‑2 노출 중) |
| `blockerProfile` | **신규** | 이 여정이 흔히 막히는 지점 |

### Template (`src/lib/types.ts:279`)

| 제안 필드 | 상태 | 메모 |
|---|---|---|
| `usedWhen` | **신규** | "이럴 때 꺼내 쓴다" |
| `relatedBlockers` | **신규** | blocker symptom 매칭 |
| `copyContext` | **신규** | 복붙 전 채울 변수 안내 |
| `projectStepUsage` | **신규** | `{ projectSlug, milestoneIndex }[]` — 단계별 호출 |

> **마이그레이션 비용** `[추정]` — 전부 옵셔널이므로 빌드는 깨지지 않는다. `npm run validate`의 무결성 검사만 신규 slug 참조를 따라가도록 보강하면 된다(`content.ts:195` validateContent). 콘텐츠 채움은 점진적 — 프로젝트 5개·레슨 20개부터 시작해도 작동한다.

---

## 6. Page별 개편안

### Home
- **새 hero copy** — 7번 샘플 참조. "쓰는 사람에서 짓는 사람으로"는 유지하되, 부제와 1차 CTA를 빌드로.
- **CTA 우선순위** — 1차 "무엇을 지을지 고르기 → /build", 2차 "30초 진단 → /start", 3차 "역량 지도 → /stages". 현재 2차였던 "여섯 단계 둘러보기"를 3차로 내린다.
- **Stage 표현 수정** — "여섯 단계 둘러보기" → "역량 지도 보기". 사다리 은유 제거.
- **Project-first 섹션 추가** — 여정지도와 여정카드 사이에 "오늘 지을 수 있는 것" 6‑8개 프로젝트 갤러리(난이도·소요·"만들 것"). 데이터는 `getProjects()` 그대로.

### Start
- **질문 순서** — 1번 "무엇을 만들고 싶어요?"(산출물 카테고리 — 자동화/콘텐츠/문서봇/제품/시스템). 2번(선택) "지금 역할은?". 역할 단독 진단도 유지(되돌아갈 수 있게).
- **추천 결과 화면** — 상단에 `fastStartProject` 1개 큰 카드("15분이면 첫 시도 가능") + 그 아래 여정 + "막히면 부를 레슨"을 미리 3개 노출. 지금도 선택지에 "만들 것"을 보여주므로(`start/page.tsx:62`) 데이터는 이미 있다.

### Projects (목록)
- **카드 추가 정보** — `firstAttempt.window`("15분 첫 시도"), 막힘 구제 레슨 수, "만들 것" 한 줄. 난이도는 색이 아니라 "코딩 없이 / API 필요 / 배포 포함" 같은 **요구 역량 라벨**로.
- **문구 교체** — 페이지 타이틀 "캡스톤 아이디어" → "오늘 지을 것". lede "각 프로젝트는 특정 Stage 세트를 전제로 하며" → "바로 시작하고, 막히면 그때 레슨을 부르세요".
- **"준비 레슨" → "막힐 때 보는 레슨"** — `getProjectReadinessRefs`(`content.ts:139`)와 `ProjectReadiness.tsx`의 "준비 레슨 0/N" 라벨을 "구제 레슨 N개 대기 중"으로.

### Project Detail
- **상단 공통 문구 교체** — `capstone-note`("이건 캡스톤이에요 … 졸업 과제") 박스를 **"지금 바로 짓기"** 박스로(7번 샘플). "준비시키는 레슨을 먼저 끝내면"을 삭제.
- **15분 첫 시도** — milestone 0를 `firstAttempt`로 승격해 최상단 단독 블록. "딱 15분, 이것만 돌려보세요" + starterPrompt.
- **막힘 선택** — milestone 사이에 "여기서 막혔나요?" 토글 → `blockers[]`에서 증상 고르면 레슨/템플릿/특강 인라인 노출.
- **AI 미션 프롬프트** — 컴패니언을 프로젝트 범위로. `buildHandoffPrompt`(`companion.ts:21`)에 lesson 대신 project+milestone 컨텍스트를 받는 오버로드.
- **검증 체크리스트** — 기존 `verification` 유지(이미 있음).
- **회고 기록** — 하단에 `reflectionPrompts` + LessonNotes 같은 로컬 노트. 완료 시 /me 산출물 로그로.

### Lesson Detail
상단에 JIT 헤더 4종을 추가한다(본문 위). 정주행 학습자에겐 접힌 상태, 프로젝트에서 온 학습자(`?from=project/슬러그`)에겐 펼친 상태.
- **"이 레슨이 필요한 순간"** — `neededWhen`.
- **"먼저 해볼 것"** — 첫 행동 한 줄(프로젝트 milestone.firstStep 톤).
- **"프로젝트에서 쓰는 법"** — `unlocksProjects` 역인덱스로 "이 레슨을 부르는 프로젝트들".
- **"개념 깊이 4단계"** — `conceptDepth` 아코디언(비유→실무→구현→원리). 컴패니언이 단계별로 읽어 재귀 설명.
- **"다시 프로젝트로 돌아가기" CTA** — `from` 파라미터가 있으면 하단 1차 버튼을 "OO 프로젝트 2단계로 복귀"로(현재는 "Stage로 돌아가기"뿐, `lessons/[lessonSlug]/page.tsx:310`).

### Stage Detail
- **사다리 → 지도** — "8단계 사다리/수직 진척" 카피 제거. "이 Stage는 이런 역량 묶음이고, 다음 프로젝트에서 쓰입니다"로. `nextStageSlug` 화살표 강조를 빼고 "이 역량을 쓰는 프로젝트"를 전면(`getProjectsByStageSlug` 이미 있음, `content.ts:127`).
- **진입 자유 표시** — "1부터 순서대로"가 아니라 "필요한 칸부터". 전제는 강제 아닌 안내.

### Templates
- **단계별 재분류** — 현재 종류(prompt/mission/checklist)별. 여기에 `projectStepUsage`로 "어느 프로젝트 몇 단계에서 쓰는가" 축을 추가해, 프로젝트 실행 중 해당 단계에서 바로 호출.
- **막힘 연결** — `relatedBlockers`로 blocker 카드에서 직접 노출.

---

## 7. 샘플 리라이트 (실제 문구 수준)

### 7‑1. Home hero
**현재** (`LandingSections.tsx:39‑54`)
> 쓰는 사람에서, 짓는 사람으로
> AI와 함께 무엇이든 짓는 법. 나를 알아주는 AI 곁에서 글·서비스·자동화를 한 채씩 지어요.
> [30초 진단 시작] [여섯 단계 둘러보기]

**제안**
> 쓰는 사람에서, 짓는 사람으로
> 만들고 싶은 것 하나를 고르면, 오늘 15분 안에 첫 삽을 뜹니다. 막히는 곳마다 지음(知音)이 딱 필요한 레슨만 꺼내 줘요.
> **[무엇을 지을지 고르기 →]** (1차) · [30초 진단] (2차) · [역량 지도 보기] (3차)
> *선행 지식 0 · 짓다가 배웁니다*

### 7‑2. Start 진단 첫 화면
**현재** (`start/page.tsx:32`) — "지금 나에게 가장 가까운 모습은?" (역할 1문항)

**제안** — 1번 질문을 산출물로.
> **무엇을 만들고 싶어요?**
> 지금 가장 끌리는 것 하나만. 정답 아니어도 돼요 — 도중에 바꿔도 됩니다.
> ☐ 반복 업무를 자동화하고 싶어요 → *주간 보고서 자동 파이프라인*
> ☐ 콘텐츠를 더 빠르게 찍어내고 싶어요 → *블로그→쇼츠 파이프라인*
> ☐ 내 문서에 답하는 봇을 만들고 싶어요 → *문서 Q&A 봇*
> ☐ 작은 AI 제품을 시장에 내놓고 싶어요 → *직군용 GPT 래퍼*
> ☐ 아직 모르겠어요, 내 역할로 골라줘요 → (기존 역할 진단)

### 7‑3. Project Detail 상단 공통 문구
**현재** (`projects/[slug]/page.tsx:79‑88`)
> **이건 캡스톤이에요** — 프로젝트는 레슨처럼 한 줄씩 따라 하는 가이드가 아니라, 배운 걸 혼자 적용하는 졸업 과제예요. 아래 준비시키는 레슨을 먼저 끝내면 훨씬 수월해요. …

**제안**
> **지금 바로 짓기 시작** — 먼저 다 배우고 오지 않아도 돼요. 아래 "15분 첫 시도"를 그대로 돌려 보고, 막히는 곳이 나오면 그때 딱 그 레슨을 꺼내 보세요. 각 단계엔 복붙해 출발하는 시작 프롬프트와, 막혔을 때 펼치는 구제 레슨이 붙어 있어요. 완벽하지 않아도 괜찮아요 — 일단 한 삽.

### 7‑4. Lesson Detail 상단 공통 블록 (신규)
> **⏱ 이 레슨이 필요한 순간** — {neededWhen}
> **▶ 먼저 해볼 것** — {firstStep 한 줄}
> **🔧 프로젝트에서 쓰는 법** — {unlocksProjects → "문서 Q&A 봇 2단계에서 이 검색 품질이 결정돼요"}
> **📐 개념 깊이** — 비유 / 실무 / 구현 / 원리 (필요한 깊이까지만)
> *(프로젝트에서 왔다면)* **↩ 다시 〈문서 Q&A 봇〉 2단계로 돌아가기**

### 7‑5. "문서 Q&A 봇" 프로젝트 — Top-down 버전
실제 데이터(`projects.ts:634`)를 top-down 셸로 재구성.
> **문서 Q&A 봇** · 2‑3주 · *API 필요 · 배포 포함*
> PDF·노트가 쌓였는데 정작 필요할 때 못 찾죠. 내 문서에 자연어로 묻고 출처와 함께 답받는 앱을 만듭니다.
>
> **⏱ 15분 첫 시도** — PDF 한 개를 텍스트로 뽑아 약 500토큰 청크로 나누고, 청크 개수·길이만 콘솔에 찍어 보세요. *(시작 프롬프트 복사)*
> → 여기까지 됐으면 절반은 온 거예요.
>
> **막히는 곳을 고르세요**
> ☐ 청크를 어떻게 나눠야 할지 모르겠어요 → 〈문서 청킹 전략〉 + RAG 체크리스트
> ☐ 검색이 엉뚱한 걸 가져와요 → 〈벡터 검색 기초〉 + "검색된 청크 먼저 띄워보기"
> ☐ 답이 출처 없이 지어내요 → 〈근거 있는 RAG 답변〉 + 출력 검증 체크리스트
> ☐ 배포가 안 돼요 → 지금 상태 그대로 Vercel에 한 번 올리기
>
> **다 됐다는 기준** — 문서 올리면 답한다 · 답마다 출처 스니펫 · 없는 건 모른다고 답함 · 공개 URL 접속.
> **회고** — 검색이 처음 틀렸을 때 무엇을 바꿨나요? 다음 RAG에 가져갈 한 가지는?

### 7‑6. "좋은 프롬프트의 구조" 레슨 — Top-down 버전
실제 데이터(`lessons.ts` lesson-201) 위에 JIT 헤더.
> **⏱ 이 레슨이 필요한 순간** — AI가 같은 요청에 매번 다르게 답해서 결과를 믿기 어려울 때. 프로젝트의 "변환 프롬프트"가 자꾸 흔들릴 때.
> **▶ 먼저 해볼 것** — 지금 막힌 그 프롬프트를 그대로 가져와, 작업·맥락·제약·출력 네 칸으로만 쪼개 다시 써보세요.
> **🔧 프로젝트에서 쓰는 법** — 주간 보고서·회의록 봇·문서 Q&A 봇의 "변환 프롬프트 설계" 단계가 전부 이 4축 위에 섭니다.
> **📐 개념 깊이**
> · *비유* — 프롬프트는 부탁이 아니라 주문서예요. "맛있게"가 아니라 "덜 맵게, 2인분, 15분 안에".
> · *실무* — Task/Context/Constraints/Output 4축 분리.
> · *구현* — 출력 예시·스키마를 프롬프트 안에 박아 재현성 확보.
> · *원리* — 맥락이 빠지면 모델은 가장 흔한 답으로 회귀한다.
> **↩ 막혔던 프로젝트 단계로 돌아가기**

### 7‑7. "GitHub 이슈 → AI 브리프" 레슨 — Top-down 버전
실제 데이터(`lessons.ts` lesson-502) 위에.
> **⏱ 이 레슨이 필요한 순간** — "버그 수정해줘" 한 줄을 코딩 에이전트에 던졌더니 멀쩡한 기능까지 깨졌을 때. 첫 시도가 자꾸 헛나갈 때.
> **▶ 먼저 해볼 것** — 팀 최근 이슈 하나를 골라, 에이전트에게 그대로 줬을 때 "뭘 더 물어볼까"를 적어 보세요. 그게 브리프에 채울 칸이에요.
> **🔧 프로젝트에서 쓰는 법** — 〈팀 협업 코딩 워크플로〉 1단계가 이 변환으로 시작합니다.
> **📐 개념 깊이**
> · *비유* — 이슈는 "어디 아파요", 브리프는 검사·진단·처방이 적힌 차트예요.
> · *실무* — 재현 스텝·수용 조건·영향 범위·검증 명령을 4축으로.
> · *구현* — `gh issue view` → 브리프 변환 → `.github/ISSUE_TEMPLATE/ai-brief.md`.
> · *원리* — 첫 시도 정확도는 모델이 아니라 입력 명세가 결정한다.
> **↩ 워크플로 1단계로 돌아가기**

---

## 8. 구현 우선순위

| 항목 | 영향도 | 난이도 | 리스크 |
|---|---|---|---|
| **P0 — 문구·신뢰·진입 (콘텐츠/카피 위주, 1‑2일)** | | | |
| 8↔6 / 84↔89 불일치 전수 정정 (`layout.tsx`·`sitemap.ts`·`stages/page.tsx`·`builderRank.ts`·MDX) | 높음 | 낮음 | 낮음 |
| 죽은 코드 정리 (`Sections.tsx`의 미사용 `Hero`/`LearningLoopSection`) | 중 | 낮음 | 낮음(미사용 확인됨) |
| Home 1차 CTA를 빌드로 + 프로젝트 갤러리 섹션 | 높음 | 낮음 | 낮음 |
| Project Detail "캡스톤/졸업" → "지금 바로 짓기" 재카피 | 높음 | 낮음 | 낮음 |
| Lesson 상단 JIT 헤더(neededWhen 등) — 우선 카피만, 데이터는 점진 | 높음 | 중 | 낮음 |
| Start 1번 질문을 산출물로 교체 | 높음 | 낮음 | 낮음 |
| **P1 — 데이터·연결·내비 (1‑2주)** | | | |
| 타입 옵셔널 확장(Blocker·conceptDepth·neededWhen·firstAttempt 등) | 높음 | 중 | 중(validate 보강 필요) |
| `blockers[]` 채우기 + Project Detail 막힘 토글 UI | 높음 | 중 | 중 |
| Lesson "프로젝트로 복귀" — `?from=` 라우팅 + unlocksProjects 역인덱스 | 높음 | 중 | 낮음 |
| `/build` 내비게이터 페이지 | 중 | 중 | 중 |
| Stage "사다리 → 지도" 재서술 + 프로젝트 전면화 | 중 | 낮음 | 낮음 |
| Template `usedWhen`/`projectStepUsage` + milestone 직접 호출 | 중 | 중 | 낮음 |
| **P2 — 튜터·평가·포트폴리오 (3‑6주, 일부 백엔드)** | | | |
| 컴패니언을 막힘 범위로 확장 + 개념 깊이 4단 주입 | 높음 | 중 | 중 |
| 진척 모델 재정의(산출물·검증·회고 1급화, rank 재설계) | 중 | 중 | 중(기존 로컬 데이터 호환) |
| 산출물 포트폴리오(/me 개편) | 중 | 중 | 중 |
| 학습 분석 대시보드(막힘 빈도·구제 경로) | 중 | 높음 | 높음(데이터 수집·프라이버시) |
| 실시간 AI 튜터(백엔드·API 키) | 높음 | 높음 | 높음(비용·운영·현재 무백엔드 원칙과 충돌) |

> P0만으로도 적합도는 체감상 58 → ~72로 오른다 `[추정]` — 진입로와 프레이밍이 top-down으로 바뀌고 신뢰 불일치가 사라지므로. 데이터 대공사(P1) 없이도 "엔진을 운전석에 연결"하는 효과.

---

## 9. 리스크와 방어장치

| 위험 | 무엇이 깨지나 | 방어장치 (상당수는 이미 부분 구현) |
|---|---|---|
| **얕은 이해** | 짓기만 하고 원리를 모른 채 통과 | 개념 깊이 4단 사다리 — "비유"에서 멈추지 않게 회고에서 "원리 한 줄"을 요구. 컴패니언이 "왜 됐는지" 되물음 |
| **Vibe coding** | 작동하지만 검증 없는 산출물 | 모든 프로젝트에 `verification`(이미 있음)을 진척의 1급 게이트로. "다 됐다는 기준"을 통과해야 완료 처리 |
| **AI 과의존** | 받아쓰기로 전락 | 컴패니언 프롬프트가 이미 "정답을 받아쓰게 하지 말고 직접 짓도록"(`companion.ts:25`). firstStep을 **사람이 먼저** 하게 설계 |
| **검증 누락** | 출처 없는 답·환각 방치 | RAG·봇 프로젝트의 검증 체크리스트에 "출처 표시·없으면 모른다" 강제(문서 Q&A 봇에 이미 있음). 〈신뢰 전 5분 체크〉 레슨을 구제 경로 상단에 |
| **초보자 압도** | 빈 프로젝트 앞에서 마비 | "15분 첫 시도" + starterPrompt로 백지 제거(데이터 있음). Starter 여정은 사다리 스캐폴딩을 **선택적으로 유지** → 10번 권고의 C 요소 |
| **콘텐츠 노후화** | 도구·버전이 바뀌어 레슨이 틀림 | 이미 `volatility`/`reviewBy`(`types.ts:294`)와 Special(휘발성 특강) 구조 존재. 항구 레슨 = 원리, 특강 = 버전. 막힘 카드에서 특강을 선택 심화로 |
| **프로젝트 실패 이탈** | 끝까지 못 가고 떠남 | `minimumViableScope`로 "여기까지만 해도 성공" 정의. 막힘마다 구제가 대기 → 막다른 길 없음. 회고는 실패도 산출물로 인정 |

---

## 10. 최종 권고안

### 판단 — **B. 기존 Stage 구조 유지 + Project-first 진입로 추가** (rollout에 C 요소 가미)

**이유 (5문장 이내).**
데이터 모델·지식 그래프·프로젝트 막힘 구조는 이미 top-down 엔진이어서, 전면 재건축(A)은 잘 만든 89 레슨·18 프로젝트를 위험하게 버리는 선택이다. 반대로 현 구조 유지(D)는 진입로가 curriculum-first로 막혀 있어 이 보고서의 동기 자체를 외면한다. 실제 병목은 "엔진"이 아니라 "운전석"(진입 IA·프레이밍·평가)이므로, 사다리는 역량 지도로 잔존시키고 프로젝트를 1급 진입점으로 올리는 B가 비용 대비 효과가 가장 크다. 다만 Starter(입문) 여정은 백지 공포가 크므로 사다리 스캐폴딩을 선택적으로 더 남기는 C의 결을 섞는다. 결론 — **전면 전환이 아니라 "프로젝트로 문을 열고, Stage를 지도로 부르고, 레슨에 '왜 지금'을 붙이는" B를, P0 카피·진입 정정부터 즉시 시작한다.**

---

### 부록 A. 10개 필수 확인 항목 — 검증 결과

| # | 확인 질문 | 결과 | 근거 |
|---|---|---|---|
| 1 | "8단계"라면서 실제 6개? | **그렇다(불일치 확인됨)** | 데이터 6 (`stages.ts:1`) vs 카피 8 (`stages/page.tsx:8‑39`, `layout.tsx:8`, `sitemap.ts:1`) |
| 2 | Home 카운터가 데이터와 일치? | **현 홈엔 카운터 없음. 단 메타·Stages·대시보드가 84로 stale** (실제 89) | `layout.tsx:8`, `builderRank.ts:2`, `BuilderDashboard.tsx:202` |
| 3 | 프로젝트가 시작점? 캡스톤? | **명시적 캡스톤·졸업과제** (단 milestone 데이터는 top-down) | `projects.ts:1`, `projects/[slug]/page.tsx:80‑88` |
| 4 | Start가 역할 진단만? 산출물 진단? | **역할 기반. 단 선택지에 "만들 것" 프로젝트 top‑2 노출** | `start/page.tsx:32, 62‑71` |
| 5 | 레슨이 개념 중심? JIT 카드? | **자기완결 7단계 강의. JIT 아님(프로젝트 복귀 없음)** | `lessons/[lessonSlug]/page.tsx:119‑224, 310‑318` |
| 6 | 프로젝트에 blocker→레슨→템플릿? | **부분 — milestone `fallbackLesson` 있음. 템플릿은 프로젝트 레벨만** | `types.ts:230‑242`, `projects/[slug]/page.tsx:131‑139, 192` |
| 7 | 템플릿이 자료실만? 실행 중 호출? | **둘 다 — 라이브러리 + 프로젝트 상세 호출. 단 단계·막힘 직결은 없음** | `projects/[slug]/page.tsx:192‑215`, `types.ts:279` |
| 8 | Stage가 필수 순서? 역량 지도? | **필수 순서(사다리)로 서술. 단 내부 모델은 이미 Lens** | `stages/page.tsx:30`, `types.ts:395` |
| 9 | 진척이 완강률? 빌드/검증/회고? | **완강률(완료 레슨 수) 기반. 단 레슨 내 verify/reflect 체크는 추적** | `builderRank.ts:2`, `lessons/[lessonSlug]/page.tsx:205‑224` |
| 10 | AI 튜터 붙일 데이터 구조 있나? | **그렇다 — 컴패니언 핸드오프 + 그래프 순회 API(getBacklinks·getOutEdges·Lens)** | `companion.ts`, `content.ts:514‑548` |

### 부록 B. 실제 콘텐츠 카운트 `[확인됨]`
Stage 6 · Journey 6 · Project 18 · Lesson 89 · Template 25 · Special 3 · Concept 10.
(표시 카피의 "8 Stage·84 Lesson"은 2026-05-22 6-Stage 통합 이전의 stale 값.)
