# 지음 리브랜딩 — 다음 세션 핸드오프

> 다음 세션이 차갑게 이어받기 위한 문서. 현재 상태 + 남은 작업 + 키 컨텍스트.

## 현재 상태 (main 푸시 완료 · 프로덕션 배포됨)
최근 커밋 (origin/main).
- `8314085` — OG 이미지(D 한옥 시안) + 한지 텍스처(E)
- `0577f7e` — 콘텐츠 개명·미사용 코드 정리·컴패니언 보강
- `41ff676` — 지음(Jieum) 리브랜딩 + 누적 작업 통합

완료된 것.
- **브랜드** — 쪽빛 잉크(`--jic`)·Hahmlet 명조·무지개 토큰, `JieumMark`(무지개 지붕 한옥 SVG)·`Wordmark`, 사이트 전역 개명, favicon, OG(한옥 시안 + JIEUM 텍스트)
- **레슨 콘솔** — `SiteChrome`(레슨서 전역 헤더 숨김) + `LessonTopbar`, 知音 컴패니언(되묻기 브리지 — 열기 시 프리필 + 자동 클립보드 복사), 좌 레일·본문 정리
- **랜딩** — 7섹션, 히어로(수묵담채 한옥) + 여정 6종(산수화) + 한지 텍스처
- **정리** — 콘텐츠 "AI Builder School"→지음 스윕, 미사용 컴포넌트(`LessonToc`/`ReadingRail`/`JourneyPathCard`) 제거, 구 디자인 핸드오프·시안 사본 삭제

## 남은 작업 (우선순위)

### 1. 한지 텍스처(E) 시각 검수·튜닝 ⚠️
- `globals.css`의 `body::before`(`mix-blend-mode: multiply; opacity: 0.4;` · 라이트 전용)로 적용했으나 Playwright 연결이 끊겨 **렌더 화면 미검수**.
- 라이트 모드 랜딩/콘솔을 직접 보고 — 진하면 `opacity` 0.4→0.25, **얼룩지면**(카드는 깨끗하고 배경만 텍스처) 전역 오버레이 방식(`body::after`, `z-index` 위, `opacity ~0.06`)으로 전환 검토.

### 2. 라이브 프로덕션 스모크
- Vercel 배포본 URL 필요(로컬에 `.vercel` 연결 없음 · canonical은 GitHub Pages `sgeniusk.github.io/ai-builder-school`).
- 헤더 로고·파비콘·OG 미리보기·콘솔·랜딩·되묻기 딥링크(claude.ai/ChatGPT 프리필 실동작) 확인.
- 코드 점검: `localhost` 누수 grep은 0건 확인 완료(코드 이슈 아님).

### 3. C · CTA 밴드 배경 이미지 (선택)
- 미생성. 프롬프트 — `docs/branding/jieum-landing-midjourney-prompts.md`의 **C**(어두운 쪽빛 야경, `--ar 21:9`).
- 생성 후 `public/landing/cta-bg.jpg`로 주면 `.lp-cta` 배경에 배선(지금은 CSS glow로도 충분).

### 4. 컴패니언 실제 AI 연결 (선택 · stop point)
- 현재 되묻기 브리지(백엔드 0). 실제 채팅으로 가려면 API 라우트 + 키 + 비용 — **사용자 결정 필요**.
- 진행 시 Vercel AI Gateway 권장. `src/lib/companion.ts`의 `buildHandoffPrompt` 재사용 가능.

### 5. (선택) 미사용 CSS 잔여 정리
- `.reading-rail*`·`.progress-card`·`.lesson-progress-trio*`·`.lesson-toc` CSS는 죽었지만 무해. **`.ph-prog*`는 활성 `JourneyRail`과 공유라 건드리지 말 것**.
- `src/app/lessons/[lessonSlug]/page.tsx`의 hidden `<h2 id="section-body">`(구 ReadingRail 추적용)도 고아 — 무해.

### 6. design_handoff 삭제 확정 / 복구
- `41ff676`에서 `design_handoff_ai_builder_school/`(구 AIBS 디자인 핸드오프, 추적됨) 제거. 보관하려면 `git checkout f67d6d1 -- design_handoff_ai_builder_school`로 복구.

## 키 컨텍스트 (파일 포인터)
- 결정·이유 — `docs/specs/2026-06-01-jieum-rebrand/context-notes.md`
- 미드저니 프롬프트(A~E) — `docs/branding/jieum-landing-midjourney-prompts.md`
- 브랜드 — `src/components/brand/`(`JieumMark`·`Wordmark`)
- 콘솔 — `src/components/SiteChrome.tsx` · `lesson/LessonTopbar.tsx` · `lesson/LessonCompanion.tsx` · `LessonShell.tsx`
- 랜딩 — `src/components/landing/LandingSections.tsx`(`JCARD_IMG_POS`로 founder 크롭 오버라이드)
- 컴패니언 로직 — `src/lib/companion.ts`
- 이미지 — `public/landing/`(`hero` · `journey-*` · `og-hanok` · `hanji-texture`)
- 토큰·텍스처 CSS — `src/styles/globals.css`

## 재개 방법
```bash
cd "/Users/taewookkim/AI Builder School"
npm install
npm run dev      # localhost:3000
npm run check    # 게이트: lint + typecheck + validate + build
```
- **main 직접 작업.** push = Vercel 프로덕션 자동 배포 → push 전 `npm run check` 그린 확인. lefthook이 commit·push에서 게이트 자동 실행.
