---
name: special-writer
description: AI Builder School에 특강(Special)을 추가하거나 수정. 내부 특강(빌더 스쿨 자체 thesis) vs 외부 특강(외부 강의·영상 큐레이션) 두 모드를 구분하고, 슬라이드 4:3 stage 안 분량·타이포 위계·기승전결 구조를 강제. 사용자가 이전 세션에서 13가지 피드백으로 정한 룰을 모두 반영한다.
---

# Skill · special-writer

> Harness · Agent Topology — 특강 추가/편집은 이 스킬로만. 레슨(항구적)은 `lesson-writer`로.

## 언제 쓰나

- 새 특강을 추가할 때 (내부·외부 모두)
- 기존 특강의 슬라이드 본문을 수정할 때
- 외부 강의·영상·논문을 빌더 스쿨 슬라이드로 큐레이션할 때
- 특강 카드·인덱스의 메타데이터를 다듬을 때

## 언제 안 쓰나

- 항구적 레슨 → `lesson-writer`
- UI 스타일 → `ui-stylist`
- 슬라이드 블록 컴포넌트 자체의 React 구현 변경 → 직접 작업

## 두 모드 — 작업 시작 전 반드시 선택

| 모드 | thesis 출처 | source 필드 | 표지·헤더 표시 |
|------|------------|-------------|---------------|
| `kind: "internal"` | 빌더 스쿨 | 없음 | "내부 강의 · {product}" |
| `kind: "external"` | 원전 화자 | 필수 (author·title·url·medium·channel?·publishedAt?) | "외부 큐레이션 · {product}" + 출처 박스 자동 렌더 |

**외부 특강 절대 룰** — 원전 화자의 thesis를 따르고 빌더 스쿨의 새 thesis를 위에 얹지 않는다. 큐레이션의 가치는 "압축·시각화·한국어 정리"에서 나오지 새 주장을 내는 게 아니다. 단, 마지막 슬라이드 한 장에서 "빌더 스쿨 학습자가 이 메시지를 어디에 녹일 수 있는지" 짧은 안내는 정당하다.

## 작업 순서 (의무)

### 0. 원전 자료 확보 (외부 특강만)

YouTube 영상이면 NotebookLM MCP로 정수 추출.

```ts
mcp__notebooklm-mcp__notebook_create({ title: "..." })
mcp__notebooklm-mcp__source_add({ notebook_id, source_type: "url", url: "https://youtu.be/...", wait: true })
mcp__notebooklm-mcp__notebook_query({ notebook_id, query: "9가지 꿀팁을 각각 [N] (그룹) 제목 / 핵심 / 예시 / 처방 형식으로..." })
```

인증 만료 시 사용자에게 `nlm login` 안내.

### 1. narrative draft 먼저 (의무)

슬라이드 작성 전에 `docs/specials/<slug>-narrative.md`를 작성. 표·prose·인용을 자유롭게 쓰며 다음 항목을 채운다.

- 원전 정보(외부) 또는 작성 동기(내부)
- **thesis 한 줄** — 슬라이드 전체를 관통하는 메시지
- 핵심 정수 N가지 (각각 핵심·예시·처방)
- 슬라이드 구조 표 (기·승·전·결 단계 + 블록 + 메모)
- 큐레이션 위치 (외부 특강) 또는 빌더 스쿨 thesis 위치 (내부 특강)

**이 단계를 건너뛰면 슬라이드가 뉴스식·설명서식이 된다.** 사용자가 명시적으로 거부한 패턴.

### 2. Special 메타데이터 추가 (`src/content/specials.ts`)

```ts
{
  id: "special-NN",
  slug: "<kebab-slug>",
  titleKo: "...",                  // 길게 OK, thesis 직접 노출 권장
  titleEn: "...",
  summary: "...",                  // 한 문단, thesis가 첫 문장
  product: "...",                  // 다루는 제품·서비스
  format: "interactive-slides",
  estimatedMinutes: 12,            // 슬라이드 7~10장 기준
  reviewBy: "YYYY-MM-DD",          // volatile 필수
  volatility: "volatile",
  status: "published",
  kind: "internal" | "external",   // 모드 명시
  source: {                        // external일 때만
    author: "...",
    originalTitle: "...",
    url: "https://...",
    medium: "video" | "lecture" | "paper" | "blog" | "podcast" | "conference",
    publishedAt: "YYYY-MM",        // 선택
    channel: "...",                // 선택
  },
  tags: [...],
}
```

### 3. MDX 슬라이드 작성 (`src/content/specials/<slug>.mdx`)

기승전결 7장 권장 골격. 사용자가 명시적으로 동의한 구조.

| # | 단계 | 슬라이드 | 권장 블록 |
|---|------|---------|-----------|
| 1 | 기 | 표지 — thesis 한 줄 | `TitleBlock` (bigTitle + subtitle + chips 3~4개) |
| 2 | 기 | 도입 — 왜 이 이야기를 지금 | `TimelineBlock` 또는 짧은 prose |
| 3 | 승 | 첫 번째 전개 | `TabsBlock` 또는 `CardGridBlock` |
| 4 | 승 | 두 번째 전개 | 위와 다른 블록 (단조로움 방지) |
| 5 | 전 | 통찰·반전 | `TwoColumnListBlock` 권장 (대비 구조) |
| 6 | 결 | 행동 자극 | `PromptGeneratorBlock` 또는 체크리스트 |
| 7 | 결 | 항구 메시지 | `TwoColumnListBlock` ("낡는 것 vs 그대로인 것") |

선택 — 부록 `AccordionBlock` FAQ 1장 추가 가능.

### 4. `src/content/special-bodies.ts`에 slug → MDX 매핑 추가

### 5. 검증 게이트

```bash
npm run check  # lint + typecheck + validate + build
```

`validate`는 자동으로 슬라이드 밀도 휴리스틱(`scripts/lib/slide-density.ts`)을 돈다. `slide.density.*` 경고가 뜨면 사용자에게 보고하고 — **자동 수정하지 말 것** — 분량 조정 옵션을 제안한다.

## 사용자가 명시적으로 정한 13가지 룰 (반복 방지)

### 글쓰기 위계

**1. 타이포그래피 위계 — 제목 ≫ 부제 ≫ 본문**
- 제목이 본문보다 짧을 때 본문에 핵심 한 줄 넣으면 부자연스럽다. 그건 본문이 아니라 **부제**로 처리해야 한다.
- `TitleBlock`에서 짧은 핵심 문장은 `subtitle`로, 카드 그리드 아래 본문은 prose로 분리한다.
- 제목 폰트는 본문보다 명확히 커야 한다 (현재 CSS — clamp(38px→60px), 부제 clamp(18px→24px)).

**2. 카드 안 단어 길이와 폰트 크기는 반비례하지 않는다**
- `TitleBlock` chip이 단어 한두 글자(예 "추상화")인데 폰트가 작으면 어색하다. 짧을수록 크게 (현재 17px·600).
- `TimelineBlock`은 반대 — 날짜·모델이 핵심이라 desc는 작아도 OK (현재 12.5px).
- 일반 원칙 — **카드 안 핵심 정보가 가장 크게 보여야 한다.**

**3. "발신"보다 "메시지"**
- "각사의 발신" 같이 행위를 가리키는 단어 대신 내용을 가리키는 단어 사용.
- "Anthropic의 발신" → "Anthropic의 메시지".

**4. 콜론 종결 금지** (한국어 문장)
- 모든 한국어 문장 종결은 `.`, `?`, `!` 셋 중 하나다.
- 다음 줄이 리스트·예시여도 문장은 콜론으로 끝내지 않는다. 코드·키-값 라벨 안의 콜론은 무관.

**5. 표지 슬라이드는 짧고 단단하게**
- `eyebrow`는 거의 안 쓰는 게 깔끔하다 (사용자가 명시적으로 제거 요청).
- 표지의 부제 끝 마침표는 빼는 게 시각적으로 단단하다 ("새 척추다." → "새 척추다").

### 구조

**6. 기승전결 — 발표 리듬**
- 특강은 발표다. 분량 비중이 단계 강도에 맞아야 한다.
- 권장 — 기(2장) · 승(2~3장) · 전(2장) · 결(2장) + 부록(FAQ 1장 선택). 7~10장.
- 두 슬라이드가 같은 메시지를 다른 표현으로 반복하면 텐션이 죽는다 — 합치거나 한쪽을 뺀다.

**7. 메시지 중복 슬라이드 제거**
- frontier-ai 케이스에서 "빌더의 함정"과 "단일 모델 시대는 끝났다"가 같은 결론이라 한 슬라이드를 뺐다. 새 특강 작성 시 같은 점검 필요.

### 분량과 인터랙티브성

**8. 슬라이드 4:3 stage 안에 들어가야 한다**
- desktop 슬라이드 stage는 ~880×660px. 한 화면에 다 보이는 게 원칙.
- `npm run validate`가 휴리스틱으로 검출한다. 임계값은 `scripts/lib/slide-density.ts`의 `LIMITS`.
- TabsBlock·AccordionBlock 내부는 인터랙티브라 한 번에 한 항목만 보임 — 총량 카운트에서 제외된다.
- **세로 Timeline·세로 리스트는 4단계 이하로 제한.** 5~6단계 이상이면 660px 높이에 안 들어가 스크롤이 생긴다. 그 경우 `TwoColumnListBlock`(좌 3 + 우 3)이나 가로 `TimelineBlock`(3단계로 그룹화)으로 바꾼다. (castle-claude-code-6-skills slide 2에서 실측 확인 — 정적 휴리스틱은 이 케이스를 못 잡으니 작성 시 사람이 의식적으로 가른다.)

**9. 한 슬라이드에 몰지 말고 분리한다**
- 큰 표·긴 리스트는 페이지를 나누거나 `TabsBlock`/`AccordionBlock`으로 인터랙티브 분할.

**10. 인터랙티브 요소 필수**
- 단순 설명서식 슬라이드는 안 된다. 사용자가 명시적으로 거부한 패턴.
- `TabsBlock`·`AccordionBlock`·`PromptGeneratorBlock` 중 최소 1개는 들어가는 게 좋다.

### 콘텐츠

**11. 뉴스식·"당연한 거 아니야?" 금지**
- 사실 나열만 하면 뉴스가 된다. thesis가 강해야 한다.
- "당연한 거 아니야?" 느낌이 들면 — 사용자가 이미 아는 결론이라 — 슬라이드의 존재 이유가 없다.
- 매 슬라이드는 "전후를 알 수 있는 사람만 줄 수 있는 메시지"여야 한다.

**12. narrative draft 우선 — 슬라이드는 그 다음**
- 슬라이드부터 짜면 뉴스식이 된다. prose로 thesis와 전개를 먼저 쓰고, 그것을 슬라이드로 옮긴다.

### 메타데이터

**13. volatile 메타데이터는 슬라이드 본문에 노출 X**
- `reviewBy`는 `specials.ts` 메타데이터로만 둔다. 슬라이드 안에 "검토 시한 — YYYY-MM-DD. 그날 이후 새 사실로 다시 씁니다." 같은 줄을 노출하지 않는다.
- 상세 페이지 헤더가 자동으로 검토 시한을 노출한다 — 슬라이드 안에는 중복으로 안 넣는다.

## 외부 특강 큐레이션 워크플로 (NotebookLM 활용)

YouTube·Podcast·긴 블로그의 정수를 빠르게 추출하는 표준 흐름.

```
1. mcp__notebooklm-mcp__server_info       # 인증 확인 (400 → nlm login 안내)
2. mcp__notebooklm-mcp__notebook_create   # 새 노트북
3. mcp__notebooklm-mcp__source_add        # URL 소스, wait: true
4. mcp__notebooklm-mcp__notebook_query    # 1회차 — 정수 N가지 추출
5. mcp__notebooklm-mcp__notebook_query    # 2회차 — 영상 thesis 한 줄 + 강조 메시지 확인
```

쿼리 작성 팁 — 형식을 명확히 지정하면 답이 깔끔해진다. 예시.

> "이 영상에서 발표자가 다룬 N가지 핵심을 정확히 N개로 분리해서 정리해 주세요. 각각에 대해 다음 형식 — [번호] (그룹 라벨) 짧은 제목 / 핵심 메시지 한 줄 / 발표자가 든 구체적 예시 / 발표자가 제시한 실천 방법. 발표자의 표현·뉘앙스를 살려서 한국어로."

## 검증 게이트

작업 끝에 반드시 실행.

```bash
npm run check
```

- `lint` 실패 → 자동 수정 가능
- `typecheck` 실패 → MDX import 누락 또는 special-bodies.ts 등록 누락
- `validate` 실패 → specials.ts와 MDX 슬러그 매칭 확인
- `validate` 경고 (`slide.density.*`) → 사용자 보고 + 분량 조정 옵션 제안. **자동 수정 금지.**
- `build` 실패 → 새 페이지 `generateStaticParams` 호환 확인

## 절대 하지 말 것

- 외부 특강에 빌더 스쿨 자체 thesis 얹기 (큐레이션의 정직성 깨짐)
- 슬라이드에 reviewBy 같은 volatile 메타데이터 노출 (메타에만)
- 검증 경고 자동 수정 — 사용자에게 보고
- 기존 특강 삭제 (Stop point)
- `package.json` dependency 추가 (Stop point)

## 참고 파일

- `src/lib/types.ts` — `Special`, `SpecialKind`, `SpecialSource` 정의
- `src/content/specials.ts` — 메타데이터 배열
- `src/content/special-bodies.ts` — slug → MDX 매핑
- `src/content/specials/*.mdx` — 슬라이드 본문 (`SlideDeck` → `Slide` → 블록)
- `src/components/slide-blocks/` — 사용 가능한 8개 블록 (TitleBlock, CardGridBlock, TimelineBlock, TabsBlock, AccordionBlock, TwoColumnListBlock, ResourceGridBlock, PromptGeneratorBlock)
- `scripts/lib/slide-density.ts` — 휴리스틱 린터 (임계값 조정 시 여기만)
- `docs/specials/*-narrative.md` — narrative draft 사례 (frontier-ai · jay-choi)
