# Top-down P1 실행 체크리스트

> 근거 — [review §5 Data Model · §6 Page개편 · §8 P1](./2026-06-06-topdown-transition-review.md). P0 완료([p0-plan](./2026-06-06-topdown-p0-plan.md), 커밋 `5daf0a3`..`5fbadf8`, push됨).
> 실행 규율 — 태스크마다 `npm run check` 그린 → 커밋. push는 묶어서 승인 후. 정적 export(GitHub Pages) 호환 주의 — 런타임 `searchParams` 금지, 클라이언트 `useSearchParams`+Suspense 사용.

## 결정(기본값)
- **D-a** `/build` 추가 시 홈 히어로 1차 CTA를 `/projects` → `/build`로 옮긴다.
- **D-b** Blocker 모델 = `{ symptom, rescueLesson?, rescueTemplate?, rescueSpecial?, conceptSlug? }` (review §5).
- **D-c** 막힘 토글 = milestone 목록 아래 "여기서 막혔나요?" `<details>` 섹션, `blockers?.length`일 때만.
- **D-d** Stage 재서술 = 카피 + "이 역량을 쓰는 프로젝트" 노출. StageLadder 시각 컴포넌트는 유지(전면 재디자인 별도).

## 태스크
- [ ] **P1-1 Stage 사다리 → 지도 재서술** — `stages/page.tsx` lede + `stages/[stageSlug]/page.tsx`에 `getProjectsByStageSlug` 프로젝트 노출. 데이터 변경 없음.
- [ ] **P1-2 데이터 모델 foundation** — `types.ts`: `Blocker`, `Project.blockers?`, `Lesson.conceptDepth?`, `Template.usedWhen?/relatedBlockers?`, `Journey.fastStartProject?/primaryProjects?` (전부 옵셔널, validate 안전).
- [ ] **P1-3 Project 막힘 토글 + blocker 백필** — `projects/[slug]/page.tsx`에 "여기서 막혔나요?" 섹션. blockers 백필 3~4개(document-qa-bot·gpt-wrapper-product·team-onboarding-bot·weekly-report-autopilot). 링크에 `?from=` 부착.
- [ ] **P1-4 /build 네비게이터** — `app/build/page.tsx` 신규. 산출물 카테고리 → 프로젝트 라우팅(Start BUILD_GOALS 확장). 홈 히어로 CTA → `/build`.
- [ ] **P1-5 ProjectReadiness 톤 완화** — `--locked` 빨강/잠금 인상 제거(중립 진척 색).

## 남김(다음 차례)
- 미사용 CSS 정리(.hero/.usp-*/.principles-* — `.tfoot`·`.cta-box` 등 공유 클래스 주의, per-class 사용 확인 필수)
- Template `projectStepUsage` + milestone 단계별 직접 호출
- `conceptDepth`·`neededWhen` 추가 백필, blocker 전 프로젝트 확대
