# AI Builder School — 디자인 외주 프롬프트

이 문서는 AI Builder School 사이트의 디자인 개선을 Claude에게 맡기기 위한 프롬프트다.
아래 **§ 프롬프트** 절을 통째로 복사해 Claude(claude.ai)에 붙여넣는다.

## 외부 링크

- **라이브 사이트** — https://sgeniusk.github.io/ai-builder-school/
- **저장소** — https://github.com/sgeniusk/ai-builder-school
- 디자인 토큰 정의 — `src/styles/globals.css` · `tailwind.config.ts`
- 참고 — `docs/roadmap.md`(제품 로드맵), `docs/design.md`(초기 디자인 핸드오프)

---

## § 프롬프트 (복붙용)

당신은 시니어 프로덕트 디자이너입니다. **AI Builder School**이라는 한국어 AI 학습 웹사이트의 디자인을 검토하고 개선안을 제시해 주세요.

### 제품
- AI Builder School — "AI를 쓰는 사람에서, AI로 만드는 사람으로"를 약속하는 한국어 AI 빌더 커리큘럼 사이트.
- 8단계 Stage 사다리 · 84개 레슨 · 13개 프로젝트 · 6개 학습 여정으로 구성.
- 학습자는 진척을 추적하고(브라우저 localStorage), 빌더 카드를 만들어 공유하고, 캐릭터 랭크로 성장합니다.

### 라이브 사이트
https://sgeniusk.github.io/ai-builder-school/ — 직접 둘러보세요. 주요 화면:
- `/` 홈 — 히어로 + 8단계 계단형 사다리
- `/stages` 커리큘럼 인덱스 · `/stages/[slug]` Stage 상세
- `/lessons/[slug]` 레슨 — 3-컬럼(좌 진척 레일 · 본문 · 우 목차)
- `/journeys` · `/projects` · `/projects/[slug]` · `/templates`
- `/me` 빌더 대시보드 — 진척·스트릭·랭크·책갈피
- 헤더 — 다크 모드 토글, 검색(⌘K) 커맨드 팔레트

### 현재 디자인
- 방향성 — "calm editorial". 차분한 종이(paper)·잉크(ink) 톤, 절제된 여백, 과장 없는 에디토리얼 느낌.
- 폰트 — Pretendard(본문·헤딩), JetBrains Mono(코드·숫자·라벨).
- 라이트/다크 모드 — CSS 변수 토큰(`--ink`, `--ink-2/3/4`, `--paper`, `--paper-2`, `--line`, `--line-2`, `--card`).
- 6개 학습 여정별 OKLCH 액센트 색 — 합쳐지면 무지개 conic 브랜드 마크가 됩니다.
- 기술 — Next.js 15 정적 export, Tailwind CSS + `globals.css`의 CSS 변수.

### 원하는 것
1. **전체 진단** — 첫인상·신뢰도·정보 위계 관점에서 무엇이 강하고 무엇이 약한가.
2. **페이지별 구체 개선안** — 타이포 스케일, 여백 리듬, 색 사용, 컴포넌트(카드·버튼·배지·진척 바) 일관성, 모바일 레이아웃.
3. "calm editorial" 방향을 더 또렷하게 밀어붙이는 안 — 또는 더 나은 방향이 있다면 근거와 함께 제안.
4. **실행 가능한 형태** — 추상적 조언보다 "이 토큰/이 값을 이렇게". CSS 변수·Tailwind로 바꿀 수 있는 토큰 단위 제안을 우선.

### 제약
- **한국어 중심** — 한글 타이포가 깨지거나 어색해지지 않아야 합니다.
- **정적 사이트** — 서버가 없습니다. 인터랙션은 CSS·클라이언트 JS만 가능.
- **다크 모드 유지** — 모든 제안은 라이트·다크 두 테마에서 모두 성립해야 합니다.
- **데이터 주도 콘텐츠** — 레슨·문구 텍스트는 손대지 마세요. 디자인(레이아웃·스타일·모션)만.

### 산출물
- 진단 요약 — 강점 3가지 · 약점 3가지
- 페이지별 개선 목록 — 우선순위(High/Med/Low) 표시
- 토큰·CSS 수준의 구체 제안 — 가능하면 `before → after` 값으로
- **시그니처 무브** 1가지 — 이 사이트를 기억에 남게 할 단 하나의 디자인 결정

질문이 있으면 먼저 묻고, 그다음 위 산출물을 제시해 주세요.
