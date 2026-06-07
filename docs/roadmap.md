# AI Builder School — 로드맵

> 이 저장소의 **단일 로드맵**이다. v1.0까지의 기록과 v2.0 계획을 한 곳에 둔다.
> v2.0 아키텍처 상세는 `docs/specs/2026-05-19-builder-school-2.0-architecture.md`, 구현 계획은 `docs/plans/`를 참조한다.
> (이전 `docs/future-roadmap.md`는 v1.0 이전 잔재라 폐기했고, 그 "하지 않을 것" 목록은 아래 §6으로 옮겼다.)

---

## 1. 한눈에 보는 현재 상태

- **콘텐츠 규모(현재)** — 6 Stage · 6 Journey · 89 lesson · 18 project · 25 template · 3 special · 10 concept.
- **v1.0 정식 공개** — GitHub Pages 상시 배포. https://sgeniusk.github.io/ai-builder-school/
- **v2.0 지식 그래프 토대(§0)** — 노드·엣지·렌즈 레이어 + 그래프 무결성 검증, main 반영 완료.
- **Top-down 전환(P0~P2) 완료** — 빌드-우선 진입 · Stage=지도 · 레슨 JIT 헤더·프로젝트 복귀. 근거 — `docs/specs/2026-06-06-topdown-transition-review.md`.

**제약 — 정적 export 사이트.** 서버·DB가 없다. 모든 인터랙티브 기능은 클라이언트(localStorage·클라이언트 컴포넌트·사용자 본인 API 키)로만 구현한다. v2.0의 입력 파이프라인·정제 에이전트는 런타임 서버가 아니라 빌드·집필 단계 프로세스이므로 이 제약과 무관하다.

---

## 2. v1.0 이후 로드맵 — 두 줄기

v1.0 이후 작업은 독립적인 두 줄기로 나뉜다. 같은 데이터 모델 위에서 공존하며, 둘 다 정적 export 제약(서버·DB 없음) 안에서 움직인다.

### 줄기 A — Top-down 학습 전환 (P0~P2 완료)

운전석(진입 IA·프레이밍·평가)을 curriculum-first에서 project-first로 바꾼다. 엔진(데이터·그래프·막힘 구조)은 이미 top-down이었으므로 전면 재건축이 아니라 프레이밍·IA 전환으로 갔다.
- 검토 보고서 — `docs/specs/2026-06-06-topdown-transition-review.md` (적합도 58 → ~72)
- **P0** 카피·진입·프레이밍 ✅ — 빌드-우선 홈 CTA·프로젝트 갤러리, "캡스톤"→"지금 바로 짓기", 레슨 JIT 헤더, Start 산출물 질문. `docs/specs/2026-06-06-topdown-p0-plan.md`
- **P1** 데이터·연결·내비 ✅ — `Blocker` 모델·막힘 토글, `/build` 내비게이터, Stage 사다리→지도 재서술, Template `usedWhen`. `docs/specs/2026-06-06-topdown-p1-checklist.md`
- **P2** 깊이·도구·전수화 ✅ — blocker 4→18 전수, Journey `fastStartProject`/`primaryProjects`, Template `projectStepUsage`, `conceptDepth` 4단(아코디언+컴패니언+샘플 3). `docs/specs/2026-06-06-topdown-p2-checklist.md`
- **남김(P2 이후)** — `conceptDepth` 백필(3→89)·`neededWhen` 확대(12→) · 진척 모델 재정의(완강률→산출물·검증·회고)·`/me` 포트폴리오 · (백엔드 결정 필요) 실시간 AI 튜터·학습 분석 대시보드.

### 줄기 B — v2.0 살아있는 지식 그래프

v2.0의 한 줄 정의 — **입력으로 자라는 살아있는 지식 그래프.** 원리는 항구적 코어, 제품 종속 정보는 휘발성 엣지로 분리해 급변하는 AI 시장에서 항상성을 유지한다. 진행 순서는 §0이 만든 휘발성·`supersedes` 구조를 특강이 먼저 검증하고, 파이프라인은 그래프가 성숙한 뒤에 깐다.

#### §0 — 아키텍처 토대 ✅ 완료
노드·엣지·렌즈 타입, `ontology.ts`, 그래프 무결성 검증 6규칙, about 2.0 비전 섹션. 기존 콘텐츠 무손상.
- 스펙 — `docs/specs/2026-05-19-builder-school-2.0-architecture.md`
- 계획 — `docs/plans/2026-05-19-builder-school-2.0-foundation.md`

#### 1순위 — 특강(Special Presentation) · 스펙 3 — 구현 완료
제품·버전 종속 휘발성 노드의 첫 실체. 인터랙티브 슬라이드 형식, 첫 특강 제작, `archived` 노드 페이지 배너·라우팅. §0의 `volatile`·`deepens` 기계장치를 검증했다. `supersedes`·`archived` 실노출은 둘째 특강에서 검증된다.
- 스펙 — `docs/specs/2026-05-19-special-presentation.md`
- 계획 — `docs/plans/2026-05-19-special-presentation.md`
- SlideDeck 컴포넌트, `/specials` 라우트, 첫 특강 "프런티어 AI 지형 2026", 레슨 역참조.

#### 2순위 — Stage 재구조(8→6) ✅ 구조 완료 / 레슨 대통합은 축소 실행
8 Stage → **6 Stage 통합 완료**(데이터 6 Stage 확인). 단 스펙 2 v2가 제안한 "84→61 레슨 대통합"은 실행하지 않았고, 더 보수적인 **Stage 1 통합(91→89)**으로 대체했다. 현재 89 레슨 유지.
- 스펙 v2(61 레슨 안 — 부분 보류) — `docs/specs/2026-05-22-six-stage-restructure-and-lesson-consolidation.md`
- 실제 실행 — `docs/specs/2026-05-29-stage-1-consolidation/checklist.md` (Stage 1: 14→10, 총 91→89)
- v1(8-Stage 안) — `docs/specs/2026-05-20-lesson-consolidation-and-deepening.md` (SUPERSEDED, 역사 자료)
- 후속 잔여 — Stage 1 레슨 해요체 전환, 레슨 제목 명사구 스윕(S2~6), git/github 병합 결정.

#### 3순위 — 입력 파이프라인 · 스펙 1
intake 폴더 포맷, 정제·분류 에이전트, 분류 휴리스틱. 새 자료 → 정제 → 노드 등록 → 그래프 전파, 그 사이 항상 사람 검토. 그래프와 노드 타입이 성숙한 뒤에 깔아야 라우팅 대상이 풍부하다.

#### 프롬프트 연습장 — 2.0 인터랙티브 기능
(기존 v0.9 마일스톤을 2.0으로 흡수.) 레슨·개념 안에서 직접 프롬프트를 쓰고 본인 API 키(Gemini/Claude)로 실제 호출한다. 키는 localStorage 저장, 클라이언트 직접 호출 — 정적 사이트 유지. 2.0에서는 단발 기능이 아니라 그래프와 엮는다 — Concept 노드마다 연습을 매달아 "개념 → 즉시 실습"으로 잇는다. 별도 스펙이 필요하며 시점은 그래프가 성숙한 뒤로 잡는다.

#### 후속 (시점 미정)
- 인터랙티브 그래프 뷰 UI — 점진 도입.
- Concept 위키 항목 집필 — §0의 시드 10개를 실제 위키로.
- DSS(Design System School) 형제 사이트 상호 링크 — 배포 URL 확정 후.

v2.0 열린 항목은 스펙 §11을 참조한다.

---

## 3. v0.6 → v1.0 마일스톤 (완료 기록)

### v0.6 — 다듬기·접근성 ✅
- 다크(야간) 모드 (#29) · 모바일 코드블록 wrap 토글 (#30) · 사이트 검색 커맨드 팔레트 (#31)
- 베타 Med 콘텐츠 — Adopter·Creator 추천 lesson 보강, `custom-gpt-builder` 비결제 대안 (#32)
- 후속(Low) — 미션 건너뛰기 경로, 레슨 시간 표기 (#61)

### v0.7 — 빌더 정체성 레이어 ✅
- 빌더 대시보드 `/me` (#35) · 학습 스트릭 (#36) · 빌더 카드 공유 (#37) · 캐릭터 6단계 랭크 (#38)
- 후속 — 캐릭터 동물 6종 + 액세서리 (#46, #58)

### v0.8 — 레슨 경험·모션 ✅
- 레슨 메모·책갈피 (#40) · 스크롤 모션·읽기 레일·타이핑 효과 (#42·#43·#47·#62)
- 콘텐츠·정체성 구조 — 프로젝트↔템플릿 연결·준비도·업적·액세서리·도구별 프로젝트 5개 (#55~#60)

### v1.0 — 마감 ✅
버전 1.0 (package.json·홈·푸터·about) · 전체 `npm run check` 그린 · 정식 공개.

---

## 4. 인터랙티브 기능 — 구현 방식

| 기능 | 마일스톤 | 구현 방식 |
|---|---|---|
| 다크 모드 · 사이트 검색 | v0.6 | CSS 토큰 · 빌드 타임 인덱스 + localStorage |
| 빌더 대시보드 · 공유 카드 · 스트릭 · 캐릭터 | v0.7 | localStorage + canvas 이미지 |
| 레슨 메모·책갈피 · 스크롤 모션 | v0.8 | localStorage · IntersectionObserver |
| 프롬프트 연습장 (BYO 키) | v2.0 | 클라이언트 fetch + localStorage 키 |
| 그래프 뷰 UI | v2.0 후속 | 빌드 타임 `ontology` + 클라이언트 렌더 |

---

## 5. 확정된 결정 (불변)

| 항목 | 결정 |
|---|---|
| 배포 | GitHub Pages(main 상시 정적 export) + Vercel(PR preview) |
| 인터랙티브 | 서버 없이 — localStorage·클라이언트·BYO 키만 |
| 공통 캐릭터 | 가상 인물 없음. 학습자 본인("당신") |
| 콘텐츠 게이트 | `npm run validate`(차단) · `eval`·`eval:rubric`(advisory) |
| PR 분할 | 마일스톤 안에서도 기능별 1 PR |
| Stage 모델 | 6 Stage. 사다리(필수 순서)가 아니라 **역량 지도**(top-down 전환) · 어디서든 진입 |
| v2.0 아키텍처 | 그래프는 연결층 · 항구/휘발 분리 · 노드 메타는 콘텐츠 파일이 정본 |

---

## 6. 하지 않을 것 (Non-goals)

- 일반 AI 뉴스 블로그.
- 강의 판매 중심 LMS.
- 실시간 채팅/DM 커뮤니티 운영.
- 과장된 "30일 AI 전문가" 마케팅.

---

## 7. 진행 로그

- **v0.4 → v0.5** — 8 Stage 전환 · 84 lesson · Phase legacy 제거 · SEO·메타 · project 확장 · 베타 High 반영 · 코드블록 복사 · LLM 루브릭 eval (PR #5~#27)
- **v0.6** — 다크 모드 · wrap 토글 · 사이트 검색 · 베타 Med 콘텐츠 (PR #28~#32)
- **v0.7** — 빌더 대시보드 · 스트릭 · 빌더 카드 · 캐릭터 랭크 (PR #35~#38) · 템플릿 7→24 확장 (#34)
- **v0.8** — 레슨 메모·책갈피 · 홈 리디자인·모션 · 콘텐츠·정체성 구조 · 도구별 프로젝트 (PR #40~#62)
- **v1.0** — 버전 1.0 · `npm run check` 그린 · 정식 공개 (#63~#67)
- **v2.0 §0** — 지식 그래프 토대 (노드·엣지·렌즈 + 무결성 검증, main 반영)
- **v2.0 특강** — 특강 체계 + 첫 특강 "프런티어 AI 지형 2026" (스펙 3)
- **6-Stage 통합** — 8→6 Stage + Stage 1 통합 (91→89 레슨, 2026-05-29)
- **지음 리브랜딩** — 知音 브랜드·콘솔·랜딩 (2026-06-01)
- **Top-down 전환** — P0 카피·진입 → P1 데이터·내비 → P2 깊이·전수화 (2026-06-06~07, 전부 prod 반영)
- **다음** — 줄기 A 남김(`conceptDepth` 백필·평가 모델 재정의) 또는 줄기 B(입력 파이프라인·프롬프트 연습장). 우선순위 미정.
