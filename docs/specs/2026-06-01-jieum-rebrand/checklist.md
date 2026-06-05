# 지음(Jieum) 리브랜딩 + 레슨 콘솔 재설계 — 체크리스트

핸드오프 시안(`docs/branding/jieum-shomi-ref/`)을 실제 코드로 옮기는 작업. 진행 상황을 세션 간 이어가기 위한 체크리스트.

## Phase 1 — 브랜드 기반
- [x] `globals.css` 토큰 추가 — `--jic`/`--jic-soft`/`--jic-tint`(라/다), `--f-serif`(Hahmlet), `--rainbow`/`--rainbow-line`
- [x] Hahmlet `@import` 추가 (CDN, 런타임 의존성 0)
- [x] `components/brand/JieumMark.tsx` — 무지개 지붕 한옥 SVG (house/build/tier)
- [x] `components/brand/Wordmark.tsx` — Wordmark/Roman/LockupH/LockupV
- [x] `lib/site.ts` — SITE_NAME "지음", SITE_TAGLINE "쓰는 사람에서, 짓는 사람으로" (SITE_URL/basePath 불변)
- [x] `components/Layout.tsx` 헤더·푸터 락업 교체 + 카피라이트
- [x] `app/layout.tsx` 메타데이터(title/template/keywords/OG/twitter)
- [x] 하위 페이지 메타(stages·projects·about·journeys·templates) + Sections·CharacterOnboarding 문자열
- [x] `app/icon.svg` 파비콘 한옥 마크
- [x] `app/opengraph-image.tsx` — alt 한글 / 카드 텍스트는 라틴(JIEUM)

## Phase 2 — 레슨 콘솔
- [x] `components/SiteChrome.tsx` — `/lessons/*`에서 전역 헤더·푸터 숨김 (usePathname)
- [x] `app/layout.tsx` — SiteChrome 적용
- [x] `components/lesson/LessonTopbar.tsx` — 락업·브레드크럼·모듈 진행·테마
- [x] `components/LessonShell.tsx` — 상단바 + `lesson-shell--console` + 컴패니언 스왑
- [x] 좌측 레일 쪽빛 현재-하이라이트 (CSS, JourneyRail 데이터 유지)
- [x] 본문 콘솔 정리 — Hahmlet 쪽빛 h1, sticky 오프셋, scroll-margin
- [x] `lib/companion.ts` — 프롬프트 빌더 + claude.ai/ChatGPT 딥링크
- [x] `components/lesson/LessonCompanion.tsx` — 知音 되묻기 브리지
- [x] `components/LessonShellMobile.tsx` — 우측 드로어 라벨 "지음"
- [x] 콘솔 CSS(`globals.css`) — topbar·companion·console 오프셋
- [x] 데스크톱/모바일 수동 확인 (되묻기 복사·열기, 0 콘솔 에러)

## Phase 3 — 랜딩
- [x] `components/landing/LandingSections.tsx` — 히어로·왜지음·여정지도·여섯여정·어떻게배우나·CTA
- [x] `app/page.tsx` — 새 섹션 조립
- [x] 랜딩 CSS(`globals.css`) — lp-* + 반응형
- [x] 라이트/다크 + 모바일 렌더 확인

## 마무리
- [x] `npm run check` 그린 — lint+typecheck+validate+build 성공 (정적 빌드, 레슨 89 + 여정·스테이지·프로젝트·특강)
- [x] `context-notes.md` 결정 기록
- [x] 임시 스크린샷 정리
- [ ] (후속) 콘텐츠 `.ts`/MDX 본문 잔여 "AI Builder School" 문자열 스윕
- [ ] (후속) 미사용화된 `LessonToc`/`ReadingRail`/`JourneyPathCard` 정리 판단
