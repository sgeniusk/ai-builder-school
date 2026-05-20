# 특강(Special Presentation) 구현 계획

> 스펙 — `docs/specs/2026-05-19-special-presentation.md`
> 베이스 — `claude/2.0-foundation-v2`(§0 완료)

§0과 동일하게 빌드를 한 번도 깨지 않고 진행한다. 각 단계 끝에 `npm run check`가 통과해야 한다.

## 단계

1. **SlideDeck·Slide 컴포넌트** — `src/components/SlideDeck.tsx` 신설(`'use client'`). 키보드·버튼 이동, 카운터, 진행 점. `src/styles/globals.css`에 슬라이드 스타일.
2. **특강 콘텐츠** — `src/content/specials/<slug>.mdx` 1개. `<SlideDeck>` + `<Slide>` 블록. `src/content/special-bodies.ts` 신설(slug→MDX 맵). 콘텐츠 사실관계는 WebSearch 수집 후 사람 검토.
3. **데이터·엣지** — `src/content/specials.ts`에 첫 Special 객체. `src/content/ontology.ts`에 `deepens` 엣지.
4. **라우트** — `src/app/specials/page.tsx`(인덱스), `src/app/specials/[slug]/page.tsx`(상세 + archived 배너 + 신선도 경고).
5. **레슨 역참조·헬퍼** — `src/lib/content.ts`에 `getSpecials`·`getSpecialBySlug`·`getSpecialsDeepening` + 특강↔본문 정합 검사. 레슨 페이지에 "관련 특강" 블록.
6. **내비게이션** — `src/components/Layout.tsx`의 `navLinks`에 `/specials` 추가.
7. **검증** — `npm run check`.

## 검증

- `npm run check` — lint·typecheck·validate·build 그린.
- `validate` — `deepens` 엣지 타입 제약 통과, 첫 특강 노드 고아 아님, `volatile` 특강 `reviewBy` 보유.
- `npm run dev` — `/specials` 인덱스·상세, 키보드 이동, 카운터·진행 점.
- 심화 대상 레슨 페이지의 "관련 특강" 블록 노출.

## 후속

- `supersedes`·`archived` 실검증은 둘째 특강 추가 시.
- 특강의 Stage·Journey 렌즈 편입은 그래프 뷰 UI 도입 시.
