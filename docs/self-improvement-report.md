# 자체 개선사항 보고서 — AI Builder School

작성: 2026-05-08 · 작성자: Claude (오케스트레이터)
상태 기준: `npm run check` 통과, 32 lessons SSG, Codex 검토 5라운드 패치 완료

---

## TL;DR

현재 빌드 가능 + 모든 페이지 동작 + 콘텐츠 무결성 통과. 그러나 **세 영역**에서 의식적으로 격차가 남아 있어요.

1. **글쓰기 일관성** — 24개 자동 생성 레슨이 1+2의 어조와 미세 차이. AI 패턴(쉼표 과다, "효과적인", 명사 과다) 잔존.
2. **빈 Phase** — Phase 0/8/9/10이 비어 있어 6개 여정 중 founder/engineer/explorer 일부가 끊김.
3. **빌더 후속 지원** — 페이지가 보이는 것까지는 했지만 진도·검색·완료 체크 같은 학습자 지속 장치 부재.

이 보고서는 위 세 영역을 12개 우선순위 액션으로 풀어요.

---

## 1. 글쓰기 일관성 (P0 — 가장 시급)

### 1-1. AI 스타일 잔존

24개 자동 생성 레슨에서 다음 패턴이 빈번히 보여요. gomi-writing Style Polish 모드의 교정 대상과 정확히 일치합니다.

| 패턴 | 영향 레슨 (관찰) | 예시 |
| --- | --- | --- |
| **명사화 과다** | L13, L19, L23 | "안정적인 권한 설계가 필요합니다" → "권한을 안정적으로 설계해야 해요" |
| **AI 유행어** | L09, L11, L19 | "효과적으로", "체계적인", "구조적으로", "지속가능한" 빈출 |
| **쉼표 과다** | 다수 | "이때, 우리는, 여러 측면을, 함께 고려해야, 합니다" 류 |
| **균일한 경어체** | L13~L18 | "~합니다" / "~해요"가 단조롭게 반복 |
| **3박자 리스트** | 다수 | "첫째 둘째 셋째"가 본문에 자주 등장 |
| **대명사 과다** | L21, L26 | "이것은", "그것은", "이러한" 반복 |

**제안 액션**: gomi-writing Style Polish 모드를 24개 신규 레슨(L09-L12, L13-L18, L19-L22, L23-L26, L27-L30, L31-L32)에 일괄 적용. Phase 1+2 (L01-L08)은 이미 사용자 음성으로 다듬어졌으므로 제외.

### 1-2. Hook의 강약 차이

L05/L06/L07/L08의 hook은 한 문장이고 강합니다:
- "프롬프트는 부탁이 아니라 명세예요. ..."
- "사람이 읽을 답은 흔들려도 괜찮지만, 기계가 읽을 답은 99.9% 같은 모양이어야 해요."

자동 생성 레슨의 hook은 같은 형식이지만 강도가 약합니다:
- "AI API 첫 호출의 핵심은 답을 받는 것이 아니라, 키를 숨기고 실패를 다루는 안전한 통로를 만드는 거예요."  ← 길고 평면

**제안 액션**: Hook을 한 문장 + 한 호흡 기준으로 재단. 메타포 / 구체 수치 / 질문형으로 첫 단어가 바뀌게.

### 1-3. 도입부 시나리오의 톤 차이

L01-L08은 hook 후 **3-5줄짜리 미니 시나리오**가 굵게 나옵니다 ("발표 1시간 전, 한 수치가 의심스러워졌어요" 등).

자동 생성 레슨은 시나리오 길이가 들쭉날쭉하고, 어떤 곳은 1줄로 끝나고 어떤 곳은 7-8줄로 길어집니다.

**제안 액션**: 시나리오 4-6줄 + 마지막 줄 "오늘은 X 만들어요" 형태로 통일.

---

## 2. 빈 Phase 및 여정 단절 (P1)

### 2-1. Phase 0/8/9/10 부재

```
Phase 0  · 셋업           — 0 lessons (recommendedPhases에 있지만 빈 인덱스)
Phase 1  · AI 리터러시     — 4 lessons ✅
Phase 2  · 프롬프트 엔지니어링 — 4 lessons ✅
Phase 3  · 일상 자동화      — 4 lessons ✅
Phase 4  · 코딩 에이전트    — 6 lessons ✅
Phase 5  · AI 앱 개발       — 4 lessons ✅
Phase 6  · RAG             — 4 lessons ✅
Phase 7  · Agents & MCP    — 4 lessons ✅
Phase 8  · 멀티모달         — 0 lessons ❌
Phase 9  · 데이터 결정      — 0 lessons ❌ (founder 여정 끊김)
Phase 10 · Evals & 보안    — 0 lessons ❌ (engineer 여정 끊김)
Phase 11 · 제품             — 1 lesson (ai-app-cost-and-usage)
Phase 12 · 캡스톤            — 1 lesson (capstone-plan-and-launch)
```

**여정별 영향:**

| 여정 | 끊긴 Phase | 학습자 경험 |
| --- | --- | --- |
| founder | 9 | "데이터 결정"이 추천이지만 콘텐츠 없음 |
| engineer | 10 | "Evals & 보안"이 핵심인데 비어 있음 |
| explorer | 8 | 멀티모달 호기심 채울 곳 없음 |

**제안 액션 (단계적):**

- **즉시**: 빈 Phase 인덱스 페이지에서 "곧 공개됩니다" UI를 더 친절하게 — 예상 일정·관련 외부 자료 링크 추가.
- **다음 라운드**: Phase 9 우선 (founder 여정 가장 활발), Phase 10 그 다음 (engineer 핵심).
- **장기**: Phase 0 / Phase 8 / Phase 11+12 보강.

### 2-2. 여정-Phase 정합성 잔여 issue

`npm run eval` 결과 잔여 R5 경고:

```
[R5 · founder] phase-3-ai-work-os 추천 흐름에 없음 (lessons에는 founder targetJourney)
[R5 · engineer] phase-11-product 추천 흐름에 없음 (ai-app-cost-and-usage targetJourney)
```

**원인**: 일부 레슨이 founder/engineer를 targetJourney로 가지지만, 그 여정의 recommendedPhases 배열에는 해당 Phase가 없음.

**제안 액션**: 두 가지 중 선택
- (a) 여정 recommendedPhases에 누락 Phase 추가 (이전 phase-1 추가와 같은 패턴)
- (b) 해당 레슨에서 founder/engineer를 targetJourneys에서 제거 (의도적으로 빠뜨린 거라면)

지난 라운드에서 phase-1만 추가한 게 부분 처리였어요. 결정 필요.

---

## 3. 빌더 후속 지원 (P2)

### 3-1. 진도 추적 부재

학습자가 32개 레슨 중 어디까지 왔는지 표시 안 됨. 좌측 사이드바의 "L04 / 04" 같은 Phase 내 위치 표시는 있지만, **전체 진도**·**완료 체크**는 없어요.

**제안 액션:**
- localStorage 기반 lesson completion 토글 (verificationChecklist에 체크박스 활성화)
- Header 또는 /curriculum 페이지에 "X / 32 완료" 진도바
- 7-step 루프 끝의 "다 했어요" 버튼 → 자동 다음 레슨 안내

### 3-2. 검색 부재

32개 레슨 중 "프롬프트 인젝션"을 찾으려면 사이드바 스크롤 또는 URL 추측. cmd-K 검색이 없어요.

**제안 액션**: 클라이언트사이드 fuzzy search (예: cmdk + 32개 레슨 + Phase 인덱스). 제목·hook·tags를 인덱스로.

### 3-3. SEO/공유 메타데이터 약함

각 레슨 페이지에 Open Graph 이미지/title/description 메타 부재. 트위터/슬랙에서 링크 공유하면 빈 카드.

**제안 액션:**
- Next.js 15의 `generateMetadata` 활용해 슬러그별 OG 이미지 생성
- `app/opengraph-image.tsx`로 동적 OG 이미지 (제목 + Phase 번호 + journey 색)
- sitemap.xml 자동 생성

### 3-4. 모바일 반응형 검증 안 됨

`npm run dev` 후 데스크톱에서만 확인했어요. 모바일에서는 좌측 사이드바·우측 TOC가 숨겨지지만, 햄버거 메뉴 같은 대체 UI 없음.

**제안 액션**: 모바일에서도 "이 레슨 안의 7섹션 점프"가 되도록 하단 floating TOC 또는 상단 dropdown.

### 3-5. 코드 블록 UX

MDX 본문의 ` ``` ` 코드 블록에 복사 버튼·언어 라벨·줄 번호 없음. 학습자가 코드 인용할 때 마우스 드래그 필요.

**제안 액션**: rehype-pretty-code 또는 shiki + custom rehype plugin으로 복사 버튼 + 언어 라벨.

---

## 4. 잔여 콘텐츠 정확성 (P3 — 낮은 우선순위)

Codex 검토에서 통과(🟢)된 5개 레슨 외에는 다음 minor issue 잔존:

### 4-1. 정량 권장값 표기

document-chunking-strategy, conversation-storage-design 등에서 "10~20%", "10~20턴", "90일" 같은 권장값이 표 안에 있어요. Round 4에서 일부 완화했지만 여전히 표만 보면 표준처럼 읽힐 수 있음.

**제안 액션**: 각 권장값 표 제목에 일관되게 "(실험 시작점 — 본인 도메인에서 직접 측정)" 부제 추가.

### 4-2. Vercel AI SDK URL 특정성

streaming-response-ui.mdx의 Vercel AI SDK URL이 일반 docs 진입점 (`https://sdk.vercel.ai/docs`)이라 개념별 페이지를 찾기 어려움.

**제안 액션**: `streamText` / `useChat` 등 구체 페이지로 교체.

### 4-3. Anthropic URL 일원화 미완

24개 레슨 중 일부는 `docs.claude.com`, 일부는 `platform.claude.com`. Round 4에서 일부 일원화했지만 잔존.

**제안 액션**: grep으로 모든 `docs.claude.com` 잔존 → `platform.claude.com`으로 일괄 통일 (또는 그 반대).

### 4-4. BOOK 인용 메타 부족

write-tests-with-coding-agent.mdx, bug-reproduction-loop.mdx의 Kent Beck "Test-Driven Development: By Example" (2002) 인용에 ISBN 없음.

**제안 액션**: ISBN 9780321146533 추가. (Anthropic 인용 스타일 표준화 김에)

---

## 5. UX/UI 마이크로 개선 (P3)

### 5-1. 좌측 사이드바 mobile 처리

900px 이하에서 좌측 사이드바가 숨겨짐. 그런데 그 안의 "이전/다음 Phase" 네비게이션이 모바일에서 사라져, 모바일 학습자가 Phase 이동을 못함.

### 5-2. 우측 TOC active state

이미 IntersectionObserver로 active 섹션 표시하지만, Phase 인덱스 페이지의 TOC는 섹션이 적어서(4개) 시각적 강조가 약해 보임.

### 5-3. 다크 모드

calm-editorial 디자인 토큰은 라이트 모드 기준. 시스템 prefers-color-scheme dark 대응 미확인.

### 5-4. 로딩 상태

Next.js App Router의 `loading.tsx` 없음. 페이지 전환 시 스피너 또는 skeleton 미제공.

---

## 6. 우선순위 액션 플랜 (12개)

| 우선 | 액션 | 예상 시간 | 영향 |
| --- | --- | --- | --- |
| 🔥 P0 | gomi-writing Style Polish 24개 레슨 | 2-3시간 | 어조 일관성 ↑↑ |
| 🔥 P0 | Hook 한 문장 / 시나리오 4-6줄 통일 | 1시간 | 첫인상 ↑↑ |
| 🟡 P1 | Phase 9 (founder) 콘텐츠 작성 | 6-8시간 | 여정 무결성 |
| 🟡 P1 | Phase 10 (engineer) 콘텐츠 작성 | 6-8시간 | 여정 무결성 |
| 🟡 P1 | 빈 Phase 인덱스 "곧 공개" UI 친절화 | 30분 | 즉시 효과 |
| 🟡 P1 | 여정-Phase 정합성 잔여 issue 처리 (founder→p3, engineer→p11) | 15분 | eval clean |
| 🟢 P2 | 진도 추적 (localStorage + 진도바) | 2-3시간 | 학습 지속률 ↑ |
| 🟢 P2 | 검색 (cmdk fuzzy) | 1-2시간 | 발견성 ↑ |
| 🟢 P2 | OG 이미지 자동 생성 + sitemap | 1-2시간 | 공유성 ↑ |
| 🔵 P3 | 모바일 햄버거 메뉴 + 하단 TOC | 1-2시간 | 모바일 사용성 |
| 🔵 P3 | 코드 블록 복사 버튼 + shiki | 1시간 | 마이크로 UX |
| 🔵 P3 | URL 일원화 (`docs` ↔ `platform`) + ISBN 추가 | 30분 | 정확성 |

---

## 7. 권장 다음 단계

다음 한 세션에서:

1. **L13, L23 두 레슨에 Style Polish 샘플 적용** (이미 진행 중) — 사용자가 결과 보고 OK 하면
2. **나머지 22개 레슨에 Style Polish 일괄 적용** (병렬 에이전트 또는 순차)
3. **Hook + 도입 시나리오 통일**
4. **여정-Phase 정합성 잔여 처리** (15분 즉시 효과)
5. **빈 Phase 인덱스 친절화**

이 5개로 P0+P1 절반을 끝낼 수 있어요. 그 다음 사용자 피드백으로 P1 나머지 (콘텐츠 추가)와 P2 (학습자 지원) 우선순위를 정합니다.

---

## 8. 미해결 결정 사항 (사용자 입력 필요)

다음은 제가 단독으로 결정할 수 없는 항목입니다.

1. **Phase 9/10 콘텐츠 작성을 다음 세션에 즉시 시작할지** — Anthropic 쿼터 회복 후 또 7개 에이전트 병렬 가능한지?
2. **gomi-writing Style Polish 스타일 강도** — 약하게(자연스러움만 보강) vs 강하게(메타포/수치/질문형까지 적극 변환)?
3. **진도 추적의 영속화** — localStorage(익명) vs 인증 기반(추후 백엔드 필요)?
4. **여정 R5 잔여 처리** — 추가 vs 제거? (founder는 phase-3을 추천에 넣을지? 또는 phase-3 레슨에서 founder 제거할지?)

---

## 부록: 현재 통계

```
총 레슨: 32개 (모두 hasMdxBody: true, hook 보유)
총 Phase: 13 (5개는 빈 상태 — phase-0, 8, 9, 10 + phase-11/12는 1개씩만)
총 여정: 6 (practitioner, adopter, creator, founder, engineer, explorer)
총 프로젝트: 6
총 템플릿: 7
빌드 검증: ✅ npm run check exit 0
정적 페이지: 55+ (32 lessons + 13 phases + 9 일반 = ~54-55개)
```

— 끝 —
