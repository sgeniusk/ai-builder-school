# 세션 핸드오프 — 콘텐츠 깊이 · 포트폴리오 · 연습장 (2026-06-06~07 작업 · 06-10 작성)

> 다음 세션이 차갑게 이어받기 위한 문서. 현재 상태 + 운영자 할 일 + 다음 후보 + 키 컨텍스트.

## 현재 상태

- **origin/main = prod 라이브.** 마지막 기능 커밋 `ac9a4d1`까지 GitHub Pages(canonical) + Vercel 양쪽 자동 배포, Vercel `vercel ls`로 전부 `● Ready` 확인됨.
- 재개 시 `git rev-list --count origin/main..HEAD`로 미push 커밋부터 확인한다(0이어야 정상).
- `npm run check`(lint·typecheck·validate·build 139p) 그린. validate 경고 28건(orphan 노드)은 기존 것 — 게이트 통과.

## 이번 세션에서 끝낸 것 (8 트랙, 커밋순)

| 커밋 | 내용 |
|---|---|
| `36c3dc1` | docs — roadmap을 두 줄기(A top-down · B 지식그래프)로 통합, P0/P2 "push 대기" 오기 정정 |
| `a564b31` | neededWhen 12→33 — 막힘(blocker)이 보내는 rescueLesson 전수, JIT 헤더 착지 100% |
| `5447116` | conceptDepth 3→12 — concepts.ts 10개 개념 1:1 커버(ontology teaches 엣지 기준) |
| `b3e5e4e` | 산출물 포트폴리오 — `ProjectBuildLog`(완성 기록: 체크+URL+회고) + /me "내가 지은 것" + `usePortfolio`(`aibs:portfolio:v1`) |
| `f133550` | Plausible 운영자 분석 — `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env 게이팅(미설정=추적 0, 무백엔드 유지) + `Project Built` 이벤트 |
| `0556eba` | 프롬프트 연습장 1차 — Gemini BYO 키 인앱 호출(`lib/gemini.ts`·`useApiKey`·`PromptPlayground`), `Lesson.playgroundPrompt` 필드 |
| `fb326d6` | playgroundPrompt 1→6 — 프롬프트 구조·JSON 출력·장문 요약·환각 검증·보고서 초안·이슈 브리프 |
| `ac9a4d1` | 전역 AI 키 설정 — /me `ApiKeySettings`. 키 한 번 저장하면 모든 연습장 공유(레슨마다 재입력 불필요) |

**세션의 핵심 발견** — 진척 `done`은 이미 build·verify·reflect 100% 집계였다(`useLessonProgress.isLessonComplete`). 즉 review §8 P2의 "완강률 → 검증·회고 1급화"는 사실상 구현돼 있었고, 진짜 gap은 산출물 전시 → 포트폴리오로 메움. **실시간 AI 튜터는 제외 확정**(컴패니언 되묻기 브리지로 충분, 한계효용 낮음).

## 운영자(사람) 할 일

1. **Gemini 연습장 실키 테스트** — 배포된 `/me` 맨 아래 "AI 키 설정"에 aistudio.google.com/apikey 무료 키를 한 번 저장 → 아무 연습장 레슨(예 `structure-of-good-prompts`)에서 실행 확인. 코드 검증은 가짜 키의 UI 전환까지만 했고 **실제 Gemini 응답은 미확인**.
2. **Plausible 결정 (보류 중)** — 쓰기로 하면 계정 생성 + 도메인 등록 + `.env.local`과 Vercel env에 `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` 설정. 안 켜면 추적 0으로 무해하게 잠들어 있음.
3. **(이전 세션 잔여) 한지 텍스처 시각 검수** — 미검수 상태로 prod에 있음. `docs/specs/2026-06-01-jieum-rebrand/next-session.md` §1 참조.

## 다음 세션 후보 (우선순위 제안)

1. **운영자 분석 2차** — 막힘 토글·구제 레슨 클릭 커스텀 이벤트. 프로젝트 상세가 서버 컴포넌트라 클라이언트 래퍼 필요. Plausible을 켠 뒤에 의미 있음.
2. **입력 파이프라인 (줄기 B 스펙 1)** — intake 폴더 포맷·정제 에이전트·분류 휴리스틱. 큰 스펙이라 brainstorming부터.
3. 소소한 빚 — conceptDepth 추가 백필(선택) · Stage 1 레슨 해요체 전환 · 레슨 제목 명사구 스윕 · git-basics/github-essentials 병합 결정(`docs/specs/2026-05-29-stage-1-consolidation/checklist.md` 후속).

## 키 컨텍스트 (파일 포인터)

- 단일 로드맵 — `docs/roadmap.md` (§2 두 줄기 구조 · §7 진행 로그)
- 트랙별 진행 로그 — `docs/specs/2026-06-06-topdown-p2-checklist.md`의 "P2 이후 진행 로그"
- 연습장 — `src/lib/gemini.ts`(모델 상수 `gemini-2.0-flash` — 구버전화 시 여기만 교체) · `src/hooks/useApiKey.ts`(`aibs:gemini-key:v1`) · `src/components/PromptPlayground.tsx` · `src/components/ApiKeySettings.tsx`
- 포트폴리오 — `src/hooks/usePortfolio.ts`(`aibs:portfolio:v1`) · `src/components/ProjectBuildLog.tsx` · `src/components/BuilderDashboard.tsx`
- 운영자 분석 — `src/lib/analytics.ts`(`trackEvent`) · `src/app/layout.tsx`(스크립트 env 게이팅) · footer 고지 `src/components/Layout.tsx`

## 재개 방법

```bash
cd "/Users/taewookkim/AI Builder School"
npm install
npm run check                              # 게이트 그린 확인
git rev-list --count origin/main..HEAD     # 미push 확인 (0이어야)
```

- main 직접 작업. **push = GitHub Pages + Vercel prod 자동 배포** → push 전 `npm run check` 그린 + 사용자 승인 필수.
- lefthook이 commit(validate·typecheck)·push(full check) 게이트를 자동 실행한다.
