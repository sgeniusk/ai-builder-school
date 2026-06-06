# Top-down P1 실행 체크리스트

> 근거 — [review §5 Data Model · §6 Page개편 · §8 P1](./2026-06-06-topdown-transition-review.md). P0 완료([p0-plan](./2026-06-06-topdown-p0-plan.md), 커밋 `5daf0a3`..`5fbadf8`, push됨).
> 실행 규율 — 태스크마다 `npm run check` 그린 → 커밋. push는 묶어서 승인 후. 정적 export(GitHub Pages) 호환 주의 — 런타임 `searchParams` 금지, 클라이언트 `useSearchParams`+Suspense 사용.

## 결정(기본값)
- **D-a** `/build` 추가 시 홈 히어로 1차 CTA를 `/projects` → `/build`로 옮긴다.
- **D-b** Blocker 모델 = `{ symptom, rescueLesson?, rescueTemplate?, rescueSpecial?, conceptSlug? }` (review §5).
- **D-c** 막힘 토글 = milestone 목록 아래 "여기서 막혔나요?" `<details>` 섹션, `blockers?.length`일 때만.
- **D-d** Stage 재서술 = 카피 + "이 역량을 쓰는 프로젝트" 노출. StageLadder 시각 컴포넌트는 유지(전면 재디자인 별도).

## 태스크
- [x] **P1-1 Stage 사다리 → 지도 재서술** (`b693e53`) — stages 카피 + Stage별 "이 역량으로 짓는 프로젝트"(`getProjectsByStageSlug`).
- [x] **P1-2 데이터 모델 foundation** (`f50eb46`) — `Blocker` + `Project.blockers?`만 추가(YAGNI — conceptDepth·Template·Journey 필드는 쓸 때 추가).
- [x] **P1-3 Project 막힘 토글 + blocker 백필** (`f50eb46`) — "여기서 막혔나요?" 섹션 + 4개 프로젝트 백필. 링크 `?from=` 부착.
- [x] **P1-4 /build 네비게이터** (`027a9db`) — 7 빌드 목표 → 프로젝트. 히어로·헤더·푸터 배선. `.gitignore` `build`→`/build` 수정(라우트가 무시되던 버그).
- [x] **P1-5 ProjectReadiness 톤 완화** — 불필요(no-op). `--locked` 빨강 CSS가 애초에 없음, P0 라벨 변경으로 이미 중립.

## 남김(다음 차례)
- 미사용 CSS 정리(.hero/.usp-*/.principles-* — `.tfoot`·`.cta-box` 등 공유 클래스 주의, per-class 사용 확인 필수)
- Template `projectStepUsage` + milestone 단계별 직접 호출
- `conceptDepth`·`neededWhen` 추가 백필, blocker 전 프로젝트 확대
