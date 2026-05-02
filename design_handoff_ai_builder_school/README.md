# Handoff: AI Builder School — Marketing Site

## Overview
AI Builder School는 Codex와 Claude Code로 "배우고·만들고·검증하고·배포·회고"하는 실전 AI 빌더 스쿨입니다. 이 핸드오프는 한국어권 학습자 대상 **마케팅·콘텐츠 사이트** (홈, 커리큘럼, 트랙, 프로젝트, 템플릿, 학습 시작, Phase 상세, 레슨 뷰어, 소개)의 디자인 레퍼런스를 담고 있습니다.

## About the Design Files
이 번들의 파일들은 **HTML로 만든 디자인 레퍼런스**입니다 — 의도한 룩앤필과 인터랙션을 보여주는 프로토타입이며, 그대로 production에 복사해 쓰는 코드가 아닙니다. 과제는 이 디자인을 **대상 코드베이스(Next.js / React / Vue / 기타)의 기존 패턴과 라이브러리로 재구현** 하는 것입니다. 현재 코드베이스가 없다면, 프로젝트에 가장 적합한 프레임워크(권장: Next.js 14 App Router + Tailwind CSS)를 선택해 구현하세요.

## Fidelity
**High-fidelity (hifi)**. 실제 색상·타이포그래피·간격·인터랙션이 모두 최종 의도를 반영합니다. 개발자는 코드베이스의 기존 컴포넌트와 디자인 토큰을 사용하되, 이 레퍼런스의 시각적 결과와 동일하게 재현해 주세요.

## Design Philosophy
**Calm editorial** — OpenAI의 한국어 홈페이지(openai.com/ko-KR/)에서 영감. 넉넉한 여백, 단정한 그리드, 도시적 타이포. AI의 상징인 **무지개 그라디언트**는 단 한 포인트(히어로 히든 워드, 브랜드 마크, 러닝 루프 디스크, CTA 박스 글로우)에만 사용합니다.

---

## Design Tokens

### Colors (light theme — 기본)
```
--ink       #0D0D0D   // 주 텍스트, primary 버튼 배경
--ink-2     #2A2A2A   // 본문 강조 텍스트
--ink-3     #6B6B6B   // 보조 텍스트, meta
--ink-4     #A8A8A8   // 매우 약한 텍스트
--line      #E6E4DE   // 구분선, 카드 경계
--line-2    #D4D1C8   // 더 진한 경계
--paper     #FAF9F6   // 페이지 배경 (오프-화이트, off-white)
--paper-2   #F2F0EA   // 2차 배경 (필터 바, callout)
--card      #FFFFFF   // 카드 배경
```

### AI Rainbow Gradient (signature — 절제 사용)
**Conic** (for rounded shapes, marks, disc)
```css
background: conic-gradient(from 210deg at 50% 50%,
  oklch(72% 0.18 25),
  oklch(80% 0.17 60),
  oklch(82% 0.16 135),
  oklch(75% 0.17 205),
  oklch(65% 0.2 280),
  oklch(70% 0.22 335),
  oklch(72% 0.18 25));
```

**Linear** (for text gradients)
```css
background: linear-gradient(94deg,
  oklch(65% 0.22 25),
  oklch(72% 0.2 60),
  oklch(70% 0.17 155),
  oklch(62% 0.2 230),
  oklch(58% 0.23 285),
  oklch(65% 0.24 335));
-webkit-background-clip: text;
color: transparent;
```

### Typography
- **UI + Body**: `Pretendard Variable` (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css`)
- **Mono**: `JetBrains Mono` (Google Fonts, weights 400 / 500)
- Base: 16px / line-height 1.55
- `word-break: keep-all`, `overflow-wrap: break-word` — 한국어 줄바꿈 최적화
- `text-wrap: pretty` 권장

### Typography Scale
| Token | Size | Weight | Letter-spacing | Use |
|---|---|---|---|---|
| Display | clamp(44px, 7vw, 96px) | 600 | -0.04em | Home hero h1 |
| H1 Page | clamp(40px, 6vw, 80px) | 600 | -0.035em | Inner page head |
| H2 Section | clamp(32px, 4.4vw, 56px) | 600 | -0.03em | `.section-title` |
| H2 Sub | 28–32px | 600 | -0.025em | Quiz, track |
| H3 | 18–22px | 600 | -0.02em | Card titles |
| Lede | clamp(17px, 1.6vw, 20px) | 400 | default | Page description |
| Body | 15–16px | 400 | default | Prose |
| Eyebrow | 11–13px | 500 | 0.14em uppercase | Section labels (mono 권장) |
| Stat num | clamp(40px, 5vw, 64px) | 500 | -0.035em | tabular-nums |

### Spacing & Radius
```
--r        12px   // 기본 카드 / 버튼 내부
--r-sm     8px
--r-lg     20px   // CTA 박스, quiz card
```
- Section padding: 80–96px vertical (mobile 72px)
- Page wrap max-width: 1280px, horizontal padding 32px (mobile 20px)

### Shadows
단 1개 — CTA/hover용만:
```
box-shadow: 0 20px 60px -20px rgba(0,0,0,0.2);
```

### Easing
```
--ease: cubic-bezier(.2, .7, .2, 1);
```

---

## Screens / Views

### 1. Home (`index.html`)
**Purpose**: 첫 인상, 학습 시작 유도.

**Sections (top → bottom)**:
1. **Sticky header** — `brand mark (24px 무지개 원)` + nav + 작은 primary CTA
2. **Hero** (`padding: 80px 0 96px`) — eyebrow → 거대 h1 with one gradient word → lede → CTA pair → 4-column stats (12 Phases / 32+ Lessons / 5 Tracks / 8주 MVP)
3. **Learning loop** — 2-column: 왼쪽에 회전하는 무지개 conic-gradient 원(가운데 현재 step 번호/verb), 오른쪽에 클릭/hover로 singular active되는 7단계 리스트
4. **8-week path** — 4-column grid, 카드별 WEEK 번호 + Phase 제목 + 첫 deliverable. 마지막(WEEK 08 Capstone) 카드는 inverted (dark bg)
5. **Tracks teaser** — 첫 3개 트랙 카드
6. **Principles** — 2×2 grid, 1px 라인으로 분할
7. **CTA** — rounded 20px 박스, 배경에 conic-gradient 블러(0.22 opacity)로 signature 그라디언트 포인트, 중앙 정렬

**Key behaviors**:
- Loop: 2.8초 interval로 자동 순환. 사용자가 리스트에 hover하면 정지+그 항목 활성.
- Loop disc: 24초 linear spin. 내부 원(콘텐츠)은 역방향 spin (텍스트는 반대로 돌아서 수직 유지).
- 모든 카드: hover시 border-color → `--ink`, translateY(-2px).

### 2. About (`about.html`)
Page head + 2-column mission/why + 4-cell principles + FAQ (`<details>` 아코디언, summary에 +/− mono 토글).

### 3. Curriculum (`curriculum.html`)
Filter bar (pill tabs: 전체 / 입문 / 중급 / 심화 / 8주 MVP만) + 3-column phase grid. 각 카드는 Phase 번호, WEEK 라벨, 제목, 요약, hours · level 메타.

### 4. Tracks (`tracks.html`)
5개 트랙을 vertical 스택, 각 트랙은 2-column (persona/title | description + phase chips + outcome callout). phase chip: `chip` (필수, solid border) vs `chip.is-optional` (점선 border, paper-2 배경).

### 5. Projects / Templates (`projects.html`, `templates.html`)
Filter bar + 2-column card grid. 각 카드: tag row (difficulty/persona 또는 kind/personas), h3, description, stack chips(mono).

### 6. Start (`start.html`) — 페르소나 진단
2-step quiz. Step별 `<div class="quiz-progress">` 3-pill progress bar. 옵션 버튼: 큰 터치 타겟 (padding 20/24), text left + arrow right, hover 시 border → ink.
결과 카드: dark header (inverted with blurred rainbow), 3-stat row, roadmap list(주차별 Phase), CTA 3개 (첫 Phase 시작 / 트랙 보기 / 다시 진단).

### 7. Phase detail (`phase.html?slug=...`)
Phase hero (nums meta row → title → lede → 4-cell meta table) + lessons list (grid-template-columns: 72px 1fr auto, hover 시 padding-left 12px으로 살짝 밀림) + deliverables 체크리스트.

### 8. Lesson (`lesson.html?slug=...`)
중앙 정렬 720px 컬럼. kicker → h1 → lede → 각 섹션 (1. 문제 이해 / 2. 최소 개념 / 3. 미션 callout / 4. 프롬프트 코드블록 / 5. 검증 체크리스트 / 6. 산출물 / 7. 회고). `.callout`: paper-2 배경 + left-border ink. `<pre>`: ink(#0D0D0D) 배경.

---

## Content Source
모든 콘텐츠는 `assets/content.js`의 `window.ABS_CONTENT` 객체에서 단일 소스로 관리:
- `phases` (13개: Phase 0~12)
- `lessons` (32개)
- `tracks` (5개 persona)
- `projects` (6개)
- `templates` (8개)
- `loop` (7단계 러닝 루프)
- `personas` (5개)

**권장 마이그레이션**: `src/content/*.ts`로 TypeScript 객체로 옮기고, Next.js라면 각각을 dynamic route로 — `/curriculum/[slug]`, `/lessons/[slug]`, `/tracks#[slug]`. 현재 reference 파일은 query param(`?slug=`)을 쓰지만 실제 구현은 반드시 path param으로.

---

## Interactions & Behavior

### Navigation
- Header sticky, `backdrop-filter: blur(10px)`, `color-mix(in srgb, var(--paper) 92%, transparent)` 배경
- Nav items: pill hover (`background: var(--paper-2)`)
- `aria-current="page"`로 현재 페이지 표시

### Animations
| Target | Properties | Duration | Easing |
|---|---|---|---|
| Buttons | background, transform | 0.2s / 0.15s | `--ease` |
| Card hover | border-color, translateY(-2px) | 0.2s | `--ease` |
| List item hover (loop, lessons) | padding-left +8–12px | 0.2s | `--ease` |
| Loop disc | rotate 360° | 24s linear | infinite |
| Loop step cycle | interval | 2.8s | — |

### Form / Quiz
- 클라이언트 전용 state
- Step 완료 시 다음 step 자동 렌더
- 결과는 `answers.persona` → `tracks.find(t.persona === ...)`로 매칭, `answers.pace`로 weeks 조정(+2 / 기본 / -2, min 6)

### Responsive
- 960px 이하: header nav 숨김 (추후 모바일 메뉴 필요)
- 900px 이하: 3-column → 2-column, 2-column → 1-column
- 700px 이하: section padding 72px, hero stats 2-column
- 600px 이하: phase grid 1-column
- `.btn` 은 `white-space: nowrap` 필수

---

## State Management
- **ABS_CONTENT**: 전역 정적 데이터 (원본은 JS object, 이식시 typed module로)
- **Quiz state**: `step`(number), `answers`({persona, pace}) — 세션 메모리만
- **Filter state**: `data-f` 활성 버튼, 클릭 시 re-render

## Assets
- 외부 폰트만 (Pretendard Variable, JetBrains Mono) — 이미지 자산 없음
- 브랜드 "mark"는 CSS conic-gradient로 그림 (24×24 원)

## Files in `reference/`
```
index.html         — 홈
about.html         — 소개 + 원칙 + FAQ
curriculum.html    — 12 Phase 리스트 + 필터
tracks.html        — 5 트랙 상세
projects.html      — 프로젝트 필터
templates.html     — 템플릿 필터
start.html         — 페르소나 진단
phase.html         — Phase 상세 (query ?slug=)
lesson.html        — 레슨 뷰어 (query ?slug=)
assets/theme.css   — 디자인 토큰 + 유틸 + 헤더/푸터 chrome
assets/layout.css  — (현재 빈 파일, reserved)
assets/pages.css   — 공통 페이지 컴포넌트
assets/home.css    — 홈 전용 (hero, loop, weekpath, principles, CTA)
assets/home.js     — 홈 인터랙션 (loop cycle, weekpath/track render)
assets/layout.js   — 헤더/푸터 마운트
assets/content.js  — 단일 소스 콘텐츠 데이터
```

## Screenshots in `screenshots/`
```
01-home.png        — 홈 상단 스크린
02-about.png       — 소개
03-curriculum.png  — 12 Phase 그리드
04-tracks.png      — 5 트랙 상세
05-start.png       — 페르소나 진단 Step 1
06-projects.png    — 프로젝트
07-templates.png   — 템플릿
08-phase.png       — Phase 1 상세
09-lesson.png      — 레슨 뷰어 샘플
```

## Implementation Checklist (권장 순서)
1. **디자인 토큰** → `tailwind.config.ts` or `app/globals.css` CSS variables로 포팅
2. **Pretendard Variable + JetBrains Mono** 로드 (`next/font` 권장)
3. **콘텐츠 모듈** (`src/content/{phases,lessons,tracks,projects,templates}.ts`) — `ABS_CONTENT`를 TypeScript로 이식
4. **공통 레이아웃** — `app/layout.tsx`에 Header/Footer
5. **Home** — 가장 복잡. Loop 컴포넌트 (useState + useEffect interval) 클라이언트 전용
6. **나머지 정적 페이지** (about / tracks / templates / projects) — SSG
7. **Dynamic routes** — `/curriculum/[slug]` (phase detail), `/lessons/[slug]`, `/tracks#anchor`
8. **Start quiz** — 클라이언트 컴포넌트, `useState` 기반 2-step
9. **Accessibility** — focus-visible outline, aria-current, `<details>` 키보드 내비게이션, CTA 대비 확인
10. **SEO** — 각 페이지 metadata

## Out of Scope
- 결제 / 인증
- 실제 레슨 본문 콘텐츠 (레퍼런스의 lesson.html은 샘플 하나뿐)
- 진도 추적 / 배지
- CMS 연동

---

_브랜드 무지개 그라디언트는 "AI의 아이덴티티"를 상징합니다. 과용하면 페이지의 단정함(calm editorial)이 깨지니 **한 페이지에 1–2개 포인트** 원칙을 지켜 주세요._
