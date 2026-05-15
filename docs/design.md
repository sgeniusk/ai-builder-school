# AI Builder School — Design System (design.md)

> 다른 도구(Codex / Cursor / Antigravity) 또는 새 Claude 세션에서 톤을 빠르게 재현하기 위한 디자인 사양 한 장. 실제 구현은 `src/styles/globals.css` + `src/components/**` 에 있다. 이 문서가 정본의 *요약* 이지 정본은 아니다.

---

## 1. 정체성 한 줄

**Calm Editorial — Korean-first, builder-centric.** 차분한 출판물 톤. 한국어 가독성·재현성·과장 없음이 모든 결정의 우선순위. 무지개·네온·과한 그림자·hype 톤 모두 금기.

원칙,
- 빌더 중심 (학습자 = 만드는 사람)
- 도구 중립 (Codex / Claude Code / 다른 도구 동등 취급)
- 과장 금지 (마케팅 톤 ❌, 기능 사실 ✓)

---

## 2. 색 토큰

### 그레이스케일 (4단 잉크 + 2단 라인 + 2단 페이퍼 + 카드)

```css
--ink:    #0D0D0D;   /* 본문 헤딩, 강조 */
--ink-2:  #2A2A2A;   /* 본문 */
--ink-3:  #6B6B6B;   /* 부 정보, 캡션 */
--ink-4:  #A8A8A8;   /* 비활성, 메타 */

--line:   #E6E4DE;   /* 기본 보더 */
--line-2: #D4D1C8;   /* 강한 보더, 입력 필드 */

--paper:  #FAF9F6;   /* 페이지 배경 — 워밍 톤의 거의 흰색 */
--paper-2:#F2F0EA;   /* 카드 위 강조, 입력·드롭존 배경 */
--card:   #FFFFFF;   /* 카드 표면 */
```

페이퍼 컬러는 *옐로우잉 된 거의 흰색* 이지 그레이가 아님. 차가운 흰 (#FFFFFF) 은 카드 표면에서만 등장.

### 페르소나 6색 (oklch)

각 여정마다 from/to 그라디언트 한 쌍.

```css
--persona-practitioner-from: oklch(82% 0.10 230);   /* 밝은 블루 */
--persona-practitioner-to:   oklch(58% 0.18 250);   /* 진한 인디고 */

--persona-adopter-from:      oklch(72% 0.16 290);   /* 라일락 */
--persona-adopter-to:        oklch(52% 0.20 275);   /* 진한 보라 */

--persona-creator-from:      oklch(78% 0.16 20);    /* 살구 */
--persona-creator-to:        oklch(65% 0.22 0);     /* 코랄·핑크 */

--persona-founder-from:      oklch(85% 0.14 85);    /* 머스타드 */
--persona-founder-to:        oklch(70% 0.18 55);    /* 호박색 */

--persona-engineer-from:     oklch(75% 0.12 195);   /* 슬레이트 청록 */
--persona-engineer-to:       oklch(45% 0.06 230);   /* 짙은 블루그레이 */

--persona-explorer-from:     oklch(82% 0.12 165);   /* 민트 */
--persona-explorer-to:       oklch(60% 0.10 150);   /* 세이지 */
```

### 페르소나 적용 패턴

페르소나 색은 *직접 사용하지 않는다*. 부모 요소에 `.p-{journeyId}` 클래스를 붙이면 자식들이 `--p-from / --p-to` 변수를 통해 색을 받는다.

```css
.p-practitioner { --p-from: var(--persona-practitioner-from); --p-to: var(--persona-practitioner-to); }
/* 6개 모두 동일 패턴 */
```

자식 컴포넌트의 사용 클래스,
- `.p-mark` — 18px 원형 그라디언트 (작은 마커)
- `.p-bar` — 4px 세로 그라디언트 (좌측 액센트 바)
- `.p-text` — `background-clip: text` 그라디언트 글자
- `.p-tint` — `color-mix(--p-from 18%, --paper)` 옅은 배경
- `.p-glow` — radial blur 배경 (페이지 한 점에 한정)

레슨/커리큘럼 페이지는 `<PersonaScope>` 래퍼가 트리 전체에 `.p-{journeyId}` 클래스를 흘려보내, 모든 사이드 카드 테두리·진행 막대·도트가 자동으로 그 색을 받음.

### 무지개 그라디언트 — *극히 제한*

`brand-mark` (사이트 로고), `grad-ai`, `grad-text` 영역에서만 사용. 다른 곳에 무지개 conic / linear 사용 **절대 금지**. AI 톤을 가장 빠르게 깨는 요소.

```css
.brand-mark { /* 작은 conic-gradient 원형 */ }
.grad-text  { /* 한 페이지에 최대 1번, 핵심 헤딩 한 줄에만 */ }
```

---

## 3. 타이포그래피

### 폰트

```css
--f-head: 'Pretendard Variable', 'Apple SD Gothic Neo', system-ui, sans-serif;
--f-body: 'Pretendard Variable', 'Apple SD Gothic Neo', system-ui, sans-serif;
--f-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
```

`Pretendard Variable` 은 CDN (`jsdelivr.net/gh/orioncactus/pretendard`) 에서 로드. 한국어/영어 모두 같은 폰트 사용 — 톤 일관성.

### 크기 스케일

| 클래스/용도 | 크기 | 굵기 | letter-spacing |
| --- | --- | --- | --- |
| `.section-title` (대제목) | `clamp(32px, 4.4vw, 56px)` | 600 | -0.03em |
| `h1` (페이지 제목) | 26~40px (clamp) | 600 | -0.03em |
| `h2` | ~24px | 600 | -0.025em |
| 본문 | 16px | 400 | 0 |
| `.lede` (리드 문장) | 17px | 400 | 0 |
| 카드 안 본문 | 14px | 400 | 0 |
| `.kicker` (라벨) | 11~12px | 500 | 0.13em |
| `.eyebrow` | 12px | 500 | 0.14em uppercase |
| 사이드바 라벨 (`.rail-section-label`) | 10px | 500 | 0.12em uppercase |
| `.mono` | 11~12px | 500 | -0.005em |

### 한국어 타이포 규칙 (필수)

```css
body {
  word-break: keep-all;       /* 어절 단위로 줄바꿈 (한 단어 안 깨짐) */
  overflow-wrap: break-word;  /* 매우 긴 단어는 허용 */
  text-wrap: pretty;          /* 마지막 줄 외톨 단어 방지 */
  line-height: 1.55;
}
```

이 세 줄이 한국어 사이트의 디폴트. **새 컴포넌트도 모두 상속받아야 함**.

---

## 4. 도형·여백 토큰

```css
--r:    12px;     /* 기본 라운드 */
--r-sm: 8px;      /* 작은 카드, 칩, 인풋 */
--r-lg: 20px;     /* 큰 카드, 모달 */
--ease: cubic-bezier(0.2, 0.7, 0.2, 1);   /* 모든 transition */
```

여백·gap 은 자유. 자주 쓰는 값,
- 컨테이너 패딩 — 24~32px (data dense), 40~44px (본문)
- 카드 사이 gap — 16~24px
- 인라인 gap — 6~10px

---

## 5. 레이아웃 — Lesson Shell (3-column)

`/lessons/[slug]` 와 `/curriculum/*` 페이지에서 사용.

```
┌────────┬────────────────┬────────┐
│  Rail  │      Main      │  Toc   │
│ 280px  │   minmax 0 1fr │ 300px  │
└────────┴────────────────┴────────┘
gap 24px · max-width 1440px · padding 24/28
```

CSS,
```css
.lesson-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 28px 64px;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 300px;
  gap: 24px;
  align-items: start;
}
.lesson-shell__rail, .lesson-shell__toc {
  position: sticky;
  top: 92px;
  align-self: start;
  max-height: calc(100vh - 112px);
  overflow-y: auto;
  display: flex; flex-direction: column;
  gap: 24px;
}
```

### 반응형

| 폭 | 레이아웃 |
| --- | --- |
| ≥1280px | 3-column inline |
| 901~1279px | 1-column + 좌·우 사이드바가 fixed drawer 로. 하단 가운데 floating 토글 |
| ≤900px | 1-column + 양쪽 drawer 모두 |

drawer 는 body 의 `.lesson-drawer-rail` / `.lesson-drawer-toc` 클래스로 슬라이드 인.

### Curriculum 변형

`/curriculum/*` 에선 `.lesson-shell--curriculum` modifier 가 `__main` 의 카드 chrome (border, padding, background) 을 제거. 본문이 자체 PageHead / section 을 가지므로.

---

## 6. 핵심 컴포넌트

### Journey Card (좌측 사이드바 상단)

```
┌────────────────────────────────┐
│ ━━━ Practitioner               │   ← 22px persona gradient text
│     일에 AI를 붙이는 사람        │   ← 12px ink-3
│ ─────────────────────────────── │
│  0%       추천 1/5              │   ← 32px persona gradient %
│ ▓▓▓▓░░░░░░░░░░░                │   ← 6px persona gradient bar
└────────────────────────────────┘
```

- 카드 테두리 자체가 persona gradient (`border-image` trick)
- 우상단 corner 에 radial glow (`color-mix p-from 14%`)
- 제목은 `.p-text` 그라디언트 텍스트
- % 도 `.p-text` 그라디언트

### Phase Group Card (좌측 사이드바 중간)

13 개 phase 가 **한 카드 안** 행으로 들어감 (각 phase 별 개별 카드 X).

- 헤더 — "커리큘럼" 라벨 + 총 완료 카운트 "X/Y"
- 각 행 — `[00] phase 제목  •••○○ (도트 띠)`
- 현재 phase 만 펼쳐짐 (개인 useState 로 토글)
- 펼쳐진 행 안에 하위 lesson — sub-dot + 제목
- 추천 lesson 은 sub-dot 이 persona gradient

### Lesson TOC (우측 사이드바)

3 개 카드를 24px gap 으로 스택.

1. **TOC 카드** — 7 단계 anchor 점프 (toc-step + toc-bar + toc-label). 현재 active 행 persona tint.
2. **진행률 카드** — *3-section trio*,
   - 빌드 (가중 50) · 검증 (30) · 회고 (20) 미니 막대
   - 큰 가중 % (큰 글자)
   - 본문 5번 체크리스트와 연동 안내
   - 하단 Phase 진행 (sibling lesson 완료 비율)
3. **형제 lesson 카드** — Phase 안 lesson 목록. status box,
   - 빈 ☐ = 미완
   - ▶ = 현재
   - ✓ + persona gradient bg = 완료 (셋 모두 100%)

### Curriculum TOC (우측 사이드바, /curriculum 전용)

- **여정 진행률** — 6 여정 mini 막대 (각자의 persona 색)
- (Phase 페이지만) **이 Phase 의 여정** 칩 + **이 Phase 의 프로젝트** 카드

### Character Avatar + 모달

헤더 우측에 32px 픽셀 강아지 SVG. 클릭하면 프로필 모달 (React Portal 로 body 마운트 — backdrop-filter containing block 회피).

- 강아지 목줄·태그가 PersonaScope 안에선 persona 색
- 프로필 모달 — 큰 % + 진행 막대 + 완주 phase 배지 + 핸들 inline 편집 + "캐릭터 초기화"

---

## 7. 인터랙티브 체크리스트

본문 4번 (빌드) · 5번 (검증) · 7번 (회고) 모두 `<SectionChecklist>` 컴포넌트. 클릭 시 localStorage 의 `aibs:progress:v2` 갱신.

```
┌──────────────────────────────────┐
│ ☐  01   회의록 원문 준비          │   ← ordered (build)
├──────────────────────────────────┤
│ ☐       모든 Action Item 에 담당자  │   ← unordered (verify/reflect)
└──────────────────────────────────┘
```

완료 상태일 때 `color-mix(--p-from 8%, --card)` 페르소나 옅은 배경. `text-decoration: line-through`.

체크박스는 항상 **세로 가운데** 정렬 (text 가 여러 줄이어도).

---

## 8. 버튼

```css
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 20px;
  border-radius: 999px;       /* 알약 모양 */
  background: var(--ink); color: var(--paper);
  font-size: 14px; font-weight: 500;
  border: 1px solid var(--ink);
}
.btn.ghost { background: transparent; color: var(--ink); border-color: var(--line-2); }
```

기본 primary 는 **검은 알약**. ghost 는 *outlined*. 컬러풀한 버튼·그라디언트 버튼 사용 안 함.

화살표 (`.arrow`) 는 `→` 글자, mono 폰트, hover 시 `translateX(3px)`.

---

## 9. 모달

- 백드롭 — `rgba(0, 0, 0, 0.5)` + `backdrop-filter: blur(4px)`
- 백드롭 자체가 `overflow-y: auto; align-items: flex-start; padding: 5vh 20px` (긴 모달 스크롤 가능)
- 모달 박스 — `var(--card)` + `var(--r-lg)` + `box-shadow: 0 20px 60px rgba(0,0,0,0.18)`
- React Portal 로 `document.body` 에 마운트 (sticky 헤더의 `backdrop-filter` containing block 회피)
- 닫기 — × 우상단 + 백드롭 클릭 + ESC

---

## 10. 데이터 / 상태 / 영속화

| Key | 무엇 | 비고 |
| --- | --- | --- |
| `aibs:progress:v2` | section 별 체크 상태 + 여정 선택 | 변경 시 `aibs:progress:change` 이벤트 발화 (same-tab 동기화) |
| `aibs:character:v1` | 캐릭터 (핸들 + 동물 + createdAt) | 변경 시 `aibs:character:change` 이벤트 발화 |

같은 탭 안 여러 컴포넌트가 같은 훅을 쓸 때 cross-component 동기화를 위해 **custom event** 패턴. localStorage 의 `storage` 이벤트는 다른 탭에서만 발화하기 때문.

진행률 정의,
- 한 lesson "완료" = build 100% + verify 100% + reflect 100%
- 가중 % = `build_pct × 0.5 + verify_pct × 0.3 + reflect_pct × 0.2`

---

## 11. 사이트 헤더 / 푸터

### 헤더

```
┌────────────────────────────────────────────────────────────┐
│ 🌈 AI Builder School    커리큘럼 여정 프로젝트 템플릿 소개   [학습 시작 →]  🐕 │
└────────────────────────────────────────────────────────────┘
```

- sticky top, 높이 68px
- `background: color-mix(in srgb, var(--paper) 92%, transparent)` + `backdrop-filter: blur(10px)`
- 좌 brand mark (conic-gradient 무지개) + 사이트명
- 가운데 nav (메뉴 5개)
- 우측 — 검은 알약 CTA + 32px 캐릭터 아바타

### 푸터

- `var(--paper-2)` 배경
- 4-col grid (브랜드 + 학습 + 자료 + 원칙)
- 하단 © + version + "calm editorial" 명시

---

## 12. 페이지 패턴 (사용자가 만나는 화면)

| 페이지 | 셸 | 본문 패턴 |
| --- | --- | --- |
| `/` (홈) | 일반 Container | Hero + LearningLoop + Sections |
| `/curriculum` | CurriculumShell (좌 JourneyRail + 우 CurriculumToc) | PageHead + WeekPath + Timeline |
| `/curriculum/[phase]` | CurriculumShell (현재 phase 강조) | PageHead + 본문 + Lesson 리스트 |
| `/lessons/[slug]` | LessonShell (3-col, layout.tsx 셸) | 1.문제 → 2.개념 → 3.미션 → 4.빌드 → 5.검증 → 6.산출물 → 7.회고 |
| `/journeys` | 일반 Container | 6 여정 카드 + 각 카드에 ProjectCard 매핑 + "이 여정으로 시작" |
| `/projects` | 일반 Container | 2-col proj-grid |

---

## 13. 금지 사항 (자주 깨지는 톤)

`ui-stylist` 스킬 (`.claude/skills/ui-stylist/SKILL.md`) 의 금지 사항을 그대로 반영.

- ❌ 무지개 그라디언트 (brand-mark 외 영역)
- ❌ 과도한 그림자 (drop-shadow 3 단 이상)
- ❌ 컬러풀한 primary 버튼
- ❌ 한국어에 `word-break: break-all` 또는 default(`normal`) — 항상 `keep-all`
- ❌ `paper-2` 위에 또 `paper-2` 카드 (배경 구분 사라짐)
- ❌ 마케팅 hype 톤 (*"혁신적인"*, *"독창적인"*, *"세계 최초"*)
- ❌ Stock illustration / 3D 캐릭터 (픽셀 강아지가 마스코트)
- ❌ Dark theme (color-scheme: light 고정)

---

## 14. 외부에서 이 디자인을 빠르게 재현하려면

1. Pretendard Variable + JetBrains Mono 폰트 로드
2. 위 토큰 `:root` 그대로 복사
3. `color-scheme: light`, body 에 keep-all + pretty wrap
4. 카드는 `var(--card) + var(--r) + var(--line) border`
5. 페르소나 색을 쓸 때만 `.p-{journeyId}` 부모 클래스 + 자식의 `var(--p-from / --p-to)`
6. 무지개는 brand-mark 한 점만
7. 모달은 Portal + 백드롭 스크롤
8. 한국어 타이포 규칙 절대 깨지 않기

---

## 15. 변경 기록

| 날짜 | 무엇 |
| --- | --- |
| 2026-05-12 | design.md 신규 — 현재 상태 (v0.2.x + 캐릭터 M1) 의 한 장 요약 |
