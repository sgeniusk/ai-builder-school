# 지음 리브랜딩 — 컨텍스트 노트 (결정과 이유)

claude.ai/design 핸드오프 시안을 구현하며 내린 결정을 기록한다. 다음 세션이 배경 없이 이어갈 수 있도록.

## 범위
사용자 확정 — 레슨 콘솔 재설계 + 랜딩 재설계 + 사이트 전체 개명 전부. 레슨·여정·스테이지·스키마는 손대지 않고, 진행률·노트·체크리스트 같은 기존 기능은 표현만 정리한다.

## 핵심 결정

### 1. 배포 경로(SITE_URL/basePath) 유지
`lib/site.ts`의 `SITE_NAME`/`SITE_TAGLINE`만 바꾸고 `SITE_URL`(`/ai-builder-school`)·`SITE_ORIGIN`은 그대로 뒀다. basePath 변경은 GitHub Pages 배포 경로를 깨뜨리는 별도 결정이다. 푸터 카피는 "지음 (Jieum) — formerly AI Builder School"로 과도기를 표기.

### 2. 컴패니언 = 되묻기 브리지 (백엔드 없음)
사용자가 실제 AI 채팅 백엔드 대신 "다른 방식"을 원해 선택. 사이트가 이미 로컬에 가진 데이터(`useLessonProgress` 키 `aibs:progress:v2`, `useNotes` 키 `aibs:notes:v1`, 여정)로 학습자를 "알아주고", `lib/companion.ts`의 `buildHandoffPrompt`가 레슨 맥락을 담은 프롬프트를 만들어 `claude.ai/new?q=` · `chatgpt.com/?q=`로 열거나 클립보드 복사한다. 복사가 보장 경로(딥링크 prefill 파라미터는 변할 수 있음). "AI에 잘 맡기기"는 학교가 가르치는 스킬이라 브랜드와 맞는다.

### 3. 레슨 경로에서 전역 헤더 숨김
시안의 레슨 화면은 자체 상단바를 가진 풀-콘솔이다. `components/SiteChrome.tsx`(클라이언트, `usePathname`)가 `/lessons/*`에서 전역 `SiteHeader`/`SiteFooter`를 렌더하지 않고, `LessonTopbar`가 콘솔 크롬이 된다. 서버 컴포넌트(SiteHeader/Footer)를 클라이언트 게이트에 prop으로 넘기는 패턴.

### 4. 진행률은 잃지 않고 재배치
산만하던 우측 카드 3개(읽기 글로우 레일 + 가중평균 트리오 + 여정 경로)를 컴패니언으로 대체하되, 진행률 자체는 상단바 "모듈 진행 %"와 좌측 레일 푸터로 흡수했다. `LessonToc`/`ReadingRail`/`JourneyPathCard` 파일은 삭제하지 않고 보류(다른 경로 미사용 확인 후 별도 정리 — 삭제는 stop point).

### 5. 심볼은 client 컴포넌트
`JieumMark`는 인스턴스마다 고유 그라데이션 id가 필요해 `useId`를 쓴다 → "use client". 서버인 헤더/푸터 안에서 렌더되어도 정상(클라이언트 컴포넌트를 서버가 렌더). `Wordmark`는 훅이 없어 서버-렌더 가능하며 내부에서 `JieumMark`를 부른다.

### 6. 폰트·OG 제약
Hahmlet는 Google Fonts `@import`로 추가(런타임 npm 의존성 0). `opengraph-image.tsx`는 `next/og` 기본 폰트가 한글을 못 그려 카드 텍스트는 라틴(JIEUM)만, alt만 한글.

### 7. 히어로 이미지 확정 — 수묵담채(단청 read)
랜딩 히어로 `.lp-emblem`의 SVG 마크를 미드저니 수묵담채 한옥 그림으로 교체(`LandingSections.tsx`, `next/image` — `Figure.tsx` 선례). 위→아래로 완성되는 "그리는 중" 구도. 무지개는 그림에서 단청으로 읽혀 약하므로, 사용자가 옵션②(그림 채택)를 고르며 그림 아래 `--rainbow-line` 가는 라인 + 6색 점 + 헤더 로고(무지개 지붕 마크)로 무지개 브랜드 신호를 보강하기로 결정. 에셋은 `public/landing/hero.jpg` 960×1200 — 원본 1.47MB PNG를 `sips` JPEG q92 308KB로 최적화(WebP는 이 macOS `sips` 미지원, cwebp 부재). MJ 원본은 사용자 보관. Vercel은 `next/image`로 추가 최적화, GitHub Pages는 `images.unoptimized`로 이 jpg를 그대로 서빙. 프롬프트 기록은 `docs/branding/jieum-landing-midjourney-prompts.md`(A1 채택).

### 8. 여정 이미지 = 산수화(집 아님)
사용자(교육자) 관점 — 여정은 'AI 정복을 향한 첫걸음', 먼 산·먼 바다다. 그래서 여정 6종은 한옥이 아니라 같은 수묵담채로 그린 **산수화 원정**으로 재설계(스타터=먼 산 앞 첫걸음 → 실무자=강 건너 → 크리에이터=꽃핀 골 → 파운더=먼 바다 출항 → 엔지니어=깊은 협곡 → 마스터=운해 정상에서 먼 한옥). 히어로 한옥은 '끝내 짓는 목적지'로 유지해 내러티브가 길→집으로 닫힌다. 각 카드는 페르소나 색 1색만 담채로 색-코딩. 프롬프트 `docs/branding/jieum-landing-midjourney-prompts.md` B 섹션(`--ar 1:1`). → 6장 생성·`journey-<id>.jpg`(800², sips q88, 68~148KB)로 최적화해 `.lp-jcard` 상단 배너(`next/image`, height 140 cover)에 배선 완료. MJ 원본 파일명은 프롬프트 첫 구절 기준으로 id 매핑. 초기 배선이 '붙여넣은 직사각형'처럼 부자연스러웠다(순백 `--card` vs 한지색 그림 + 하드 보텀 엣지) → `.lp-jcard` 배경을 `--card`(흰색)→`--paper`(한지색)로 바꾸고 배너에 `mask-image: linear-gradient(to bottom,#000 68%,transparent)` 소프트 페이드를 줘 그림이 종이에 번지듯 통합. 라이트·다크 둘 다 확인(다크에선 밝은 그림이 페이드로 어둠에 스며들어 '빛나는 두루마리'처럼 읽힘). 파운더 그림은 콘텐츠가 하단(먼 바다 — 위는 빈 하늘)에 몰려 가운데 크롭이 비어 보여 → `LandingSections.tsx`의 `JCARD_IMG_POS` 맵으로 founder만 `object-position: center 85%` 오버라이드(다른 카드는 기본 center). 비슷한 하단-편중 그림이 생기면 이 맵에 추가.

## 검증
- 콘솔·랜딩 라이트/다크 + 모바일을 Playwright로 확인, 콘솔 에러 0.
- `Reveal`은 뷰포트 진입 시 `.reveal.is-visible`로 드러나므로, 풀페이지 스크린샷은 강제 노출 후 촬영.
- 게이트는 `npm run check`(lint+typecheck+validate+build, 정적 55+).

## 시안 원본
원본 시안(tokens.css·lib-symbol·lib-wordmark·cv-lesson·cv-landing·시안.html)은 `claude.ai/design` 핸드오프에 있음. 구현 완료 후 repo 내 사본(`docs/branding/jieum-shomi-ref/`)과 리브랜딩 전 구브랜드 디자인 핸드오프(`design_handoff_ai_builder_school/`)는 '원서 정리'로 삭제함(필요 시 git 히스토리·claude.ai/design에서 복구).
