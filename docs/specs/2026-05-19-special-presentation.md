# AI Builder School 2.0 — 특강(Special Presentation) 스펙

> 상태 — 작성 2026-05-19 · 범위 1순위 특강 · 베이스 `claude/2.0-foundation-v2`(§0 완료)
> 상위 스펙 — `docs/specs/2026-05-19-builder-school-2.0-architecture.md`(§2~§4가 Special 노드·엣지의 규범)
> 로드맵 — `docs/roadmap.md` §2 "1순위 — 특강"

---

## 0. 배경

§0은 노드·엣지·렌즈 타입과 `ontology.ts`, 그래프 무결성 검증 6규칙을 깔았다. `Special` 노드 타입과 `volatile`·`deepens`·`supersedes` 엣지는 모델로만 존재하고 실체가 없다(`specials.ts`는 빈 배열).

특강은 v2.0의 "휘발성 엣지"를 처음 구체화한다. 제품·버전 종속 정보 — 모델 출시, 컨퍼런스 발표, 신규 서비스 — 를 항구적 레슨(코어)에서 분리한 `volatile` 노드다. 이 스펙은 특강의 콘텐츠 형식·라우트·UI·엣지 사용을 고정한다.

이 단계의 목적은 두 가지다. 첫째, 휘발성 콘텐츠를 코어를 건드리지 않고 운영하는 경로를 만든다. 둘째, §0이 만든 `volatile`·`deepens`·`supersedes`·`archived` 기계장치를 실제 콘텐츠로 end-to-end 검증한다.

---

## 1. Special 노드 모델

`Special` 인터페이스는 §0에서 `types.ts`에 이미 정의됐다 — 변경 없음.

```ts
interface Special extends NodeMeta {
  id: string;
  slug: string;
  titleKo: string;
  titleEn?: string;
  summary: string;
  product: string;              // 다루는 제품·서비스
  format: "interactive-slides";
  estimatedMinutes: number;
  reviewBy: string;             // 항상 volatile → 필수
  tags: string[];
}
```

- 특강은 항상 `volatility: "volatile"`이다. `reviewBy`(ISO 날짜)는 필수이며 검증 규칙 6이 강제한다.
- `status`는 `draft` / `published` / `archived`. 미지정 시 `published`.
- 노드 id는 `special:{slug}`(스펙 §2-5 규칙).

---

## 2. 슬라이드 저작 형식

특강 본문은 인터랙티브 슬라이드다. 저작 형식을 다음으로 고정한다.

- 특강당 MDX 파일 1개 — `src/content/specials/<slug>.mdx`.
- 파일 본문은 `<SlideDeck>` 1개로 감싸고, 그 안에 `<Slide>` 블록을 슬라이드 수만큼 나열한다.
- `<Slide>` 안에는 일반 MDX(헤딩·리스트·표·코드)를 쓴다. 기존 `src/components/mdx-elements.tsx` 매핑이 그대로 적용된다.
- `src/content/special-bodies.ts`가 slug → MDX 컴포넌트를 매핑한다. `lesson-bodies.ts`와 동형이며 `getSpecialBody(slug)`를 export한다.

```mdx
<SlideDeck>
<Slide>
## 첫 슬라이드 제목
- 항목
</Slide>
<Slide>
## 둘째 슬라이드
</Slide>
</SlideDeck>
```

특강 라우트는 `<MdxBody components={{ SlideDeck, Slide, ...mdxElements }} />`로 렌더한다. `<SlideDeck>`·`<Slide>`는 특강 라우트에서만 주입하고 레슨 MDX에는 영향이 없다.

---

## 3. SlideDeck 동작

`src/components/SlideDeck.tsx` — `'use client'` 컴포넌트. 정적 export와 호환된다(서버 의존 없음).

- `<SlideDeck>` — children에서 `<Slide>` 엘리먼트만 추출해 현재 인덱스의 슬라이드 하나만 렌더한다.
- 이동 — 키보드(`←` `→` `Home` `End`), 이전·다음 버튼.
- 표시 — "n / N" 카운터, 진행 점(클릭 시 해당 슬라이드로 점프).
- 레이아웃 — 16:9 계열 카드. 반응형. 색은 CSS 토큰(`var(--*)`)만 써 다크 모드와 호환.
- `<Slide>` — 표시용 `<section className="slide">` 래퍼. 자체 로직 없음. 가시성은 `SlideDeck`이 제어한다.

슬라이드 경계 식별은 `React.Children.toArray(children)`를 `child.type === Slide`로 필터해 처리한다. MDX가 블록 사이에 끼우는 공백 노드는 필터로 제거된다.

---

## 4. 라우트

### 4-1. `/specials` 인덱스

- `status: "published"` 특강을 목록으로 — 제목·`product`·`summary`·`reviewBy`·`estimatedMinutes`.
- `archived` 특강은 기본 목록에서 제외하고 "보관 자료" 토글로만 노출한다(스펙 §2-2).

### 4-2. `/specials/[slug]` 상세

- `generateStaticParams` — 모든 특강을 포함한다. **`archived`도 포함** — `supersedes`로 대체된 옛 특강의 외부 링크가 깨지지 않도록(스펙 §2-2).
- `generateMetadata` — 제목·`summary`.
- 페이지 구성 — 헤더(제목·`product`·소요시간·신선도 표시) → archived 배너(조건부) → 슬라이드 덱 → 푸터(심화 대상 레슨 링크).

### 4-3. archived 배너

`status === "archived"` 특강 페이지는 상단에 배너를 렌더한다.

- 문구 — "이 특강은 최신 버전으로 대체되었습니다".
- `supersedes` 엣지를 따라 대체 노드 링크를 건다(`getOutEdges(nodeId, "supersedes")`의 from 쪽 — 즉 이 특강을 superseding하는 새 특강을 `getInEdges(...,"supersedes")`로 찾는다).
- 첫 특강은 `published`라 배너가 실제로 노출되지 않는다. 배너·라우팅 코드는 미리 구현하되, 실검증은 둘째 특강(`supersedes` 발생 시점)에서 이뤄진다.

### 4-4. 신선도 경고

- `reviewBy` 날짜가 빌드 시점보다 과거이면 페이지에 "검토 시한이 지난 특강" 경고를 표시한다.
- 빌드 타임 계산이다. 정적 사이트라 뷰 시점 실시간 판정은 불가하며, 다음 빌드에서 갱신된다.

---

## 5. 엣지

특강이 쓰는 엣지는 `ontology.ts`에 수동 선언한다(스펙 §9 — `teaches`·`deepens`·`supersedes` 등은 유도되지 않는 수동 관리 대상).

- `deepens` (Special → Lesson) — 특강이 심화하는 항구적 레슨. 첫 특강에 1개 선언. 검증 규칙 2의 타입 제약(`deepens` from `special`·`lesson`, to `lesson`)을 통과한다.
- `supersedes` (Special → Special) — 새 특강이 옛 특강을 대체. 첫 특강은 대체 대상이 없어 사용하지 않는다. 둘째 특강에서 처음 등장한다.
- `demonstrates` (Special → Lesson·Concept) — 선택. 첫 특강에서는 쓰지 않는다.

`deepens` 엣지가 생기면 첫 특강 노드는 검증 규칙 4(고아 노드)의 경고 대상에서 빠진다.

---

## 6. 렌즈 편입 — 범위 한정

스펙 §4-3은 Stage·Journey 렌즈에 Special을 끼울 수 있다고 규정한다. 그러나 그래프 뷰 UI가 아직 없어(로드맵 후속) 렌즈는 가시적 효과가 없다. 따라서 이번 단계는 특강을 렌즈에 편입하지 않는다. 특강의 가시적 노출 경로는 둘이다.

- `/specials` 인덱스·상세 라우트.
- `deepens` 대상 레슨 페이지의 "관련 특강" 역참조 블록(§7).

렌즈 편입은 그래프 뷰 UI 도입 시 후속으로 다룬다.

---

## 7. 레슨 역참조

`deepens` 대상 레슨 페이지에 "관련 특강 · 심화" 블록을 추가한다.

- `content.ts`의 `getSpecialsDeepening(lessonSlug)` — `getInEdges(lessonNodeId, "deepens")`를 따라 그 레슨을 심화하는 특강을 반환한다.
- 결과가 있으면 레슨 페이지 하단에 특강 카드 링크를 렌더한다. 없으면 블록을 렌더하지 않는다.
- 학습자가 보는 것은 "원리(레슨)는 그대로, 최신 적용(특강)이 곁에 붙음"이다.

---

## 8. 수용 계약

- `npm run validate` 그래프 6규칙을 통과한다 — 끊긴 엣지·타입 제약·중복·고아(경고)·`prerequisite` 순환·휘발성 정합.
- 특강은 `volatile`이므로 `reviewBy`가 필수다.
- 모든 특강은 `src/content/specials/<slug>.mdx` 본문 파일을 가지며, 그 역도 성립한다. `validateContent()`는 MDX를 import하지 않으므로(tsx가 MDX를 컴파일하지 못한다) 이 정합 검사는 `npm run validate` 게이트 스크립트가 파일시스템으로 수행한다.
- 콘텐츠 사실관계 — 제품·버전 종속 정보는 사람 검토 게이트에서 사실을 확정한다(아키텍처 스펙 §5-3, §6). 에이전트는 초안만 제안한다.

---

## 9. 구현 범위와 후속

### 이번 범위(1순위 특강)

- `SlideDeck`·`Slide` 컴포넌트 + 슬라이드 스타일.
- `special-bodies.ts`, 첫 특강 MDX 1개.
- `specials.ts` 첫 Special 객체, `ontology.ts` `deepens` 엣지.
- `/specials` 인덱스·상세 라우트 + archived 배너 + 신선도 경고.
- 레슨 역참조 블록, `content.ts` 특강 헬퍼·검증.
- 상단 내비 `/specials` 링크.

### 후속

- `supersedes`·`archived` 실검증 — 둘째 특강 추가 시.
- 특강의 Stage·Journey 렌즈 편입 — 그래프 뷰 UI 도입 시.
- 특강 인덱스의 신선도 정렬·필터 고도화.
