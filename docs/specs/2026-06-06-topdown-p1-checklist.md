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
- [x] **P1-6 neededWhen 확대** (`65b146f`) — blocker 구제 레슨 6개 추가 → 총 12개. 모든 막힘 링크가 JIT 헤더 있는 레슨으로 착지.
- [x] **P1-7 죽은 CSS·파일 정리** (`527bb96`) — globals.css −334줄 + HeroStats·LearningLoop 파일 삭제. 살아있는 클래스 전수 보존.
- [x] **P1-8 Template usedWhen** (`1883168`) — "이럴 때 꺼내 쓴다" 8개 백필 + TemplateCard 노출.

## 남김(다음 차례 — 큰 작업, 별도 배치)
- **Template `projectStepUsage`** — 템플릿을 milestone 단계에 바인딩해 빌드 중 그 자리에서 직접 호출(UI 개편 포함). usedWhen(P1-8)은 끝남.
- **`conceptDepth` 4단 사다리** — 비유→실무→구현→원리 콘텐츠 작성 + 레슨 아코디언 UI + 컴패니언 연동(가장 큼).
- **blocker 전 프로젝트 확대** — 현재 4개 → 18개 + Journey `fastStartProject`/`primaryProjects` 필드.
