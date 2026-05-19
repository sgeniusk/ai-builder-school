# AI Builder School 2.0 — 다음 세션 인계 노트 (개정)

> 작성 2026-05-19 · §0 구현 후 **브랜치 계보 불일치 발견**으로 전면 개정
> 이 파일은 다음 세션 시작 시 그대로 프롬프트로 붙여 쓰도록 만든 인계 노트다.

---

## ⚠ 가장 먼저 알아야 할 것 — 브랜치 계보 불일치

§0(2.0 아키텍처 토대) 작업은 `claude/recovery-v0.3` 브랜치에서 완료됐다.
그런데 이 브랜치는 **production(`origin/main`, v1.0.1)과 거의 분리된 계보**다.

| | `origin/main` (v1.0.1, production) | `claude/recovery-v0.3` (§0 작업) |
|---|---|---|
| 베이스 | v0.2 Initial commit + PR #1~#67 | v0.2 Initial commit `36dd01b` (PR 0개) |
| 데이터 모델 | **8-Stage** — `stages.ts`·`stage-bodies.ts`·`lesson-stage-mapping.ts` | **13-Phase** — `phases.ts` |
| UI | 빌더 랭크·캐릭터·업적·대시보드(`/me`)·홈 리디자인·여정 히어로 | v0.2 수준 골격 |
| 라우트 | `/stages`·`/me` | `/curriculum`(phase) |

- 두 브랜치의 유일한 공통 조상은 v0.2 Initial commit 하나뿐.
- §0 아키텍처 스펙·구현은 **13-Phase 모델을 전제**한다(스펙 §0·§4-3,
  `ontology.ts`의 `import { phases }`·`phaseLenses`·`Lens.kind="phase"`).
- 진짜 v1.0(main)엔 `phases.ts`가 없다 — "Phase legacy 완전 제거, 8 Stage
  단일 모델로" PR로 삭제됨.
- **결론 — §0 작업을 main 위로 cherry-pick할 수 없다. §0 스펙부터 8-Stage
  기준으로 재검토·재설계해야 한다.**

사용자 확정 — `recovery-v0.3`에서 2.0을 시작한 것은 **단순 착오**다.
의도된 선택이 아니었다. 2.0은 처음부터 `main`(v1.0) 위에 쌓았어야 한다.
다음 세션은 `main`을 베이스로 다시 시작하고, `recovery-v0.3`의 §0
산출물은 참고 자료(특히 모델 비종속 코드)로만 둔다.

---

## 다음 세션 시작 프롬프트 (이 블록을 복사해 붙여라)

```
AI Builder School 2.0 업그레이드를 main 베이스에서 다시 시작한다.

## 배경
- 저장소 — /Users/taewookkim/AI Builder School
- 작업 베이스 브랜치 — origin/main (v1.0.1). 8-Stage 모델.
  stages.ts·stage-bodies.ts·lesson-stage-mapping.ts. phases.ts 없음.
- 2.0의 목표 — "입력으로 자라는 살아있는 지식 그래프". 원리는 항구적 코어,
  제품 종속 정보는 휘발성 엣지로 분리.

## 이전 시도 — claude/recovery-v0.3 (참고용, 베이스로 쓰지 말 것)
- recovery-v0.3 브랜치에 2.0 §0(아키텍처 토대)를 구현했다. 그러나 이
  브랜치를 베이스로 고른 것은 단순 착오였다 — 사용자 확인. 이 브랜치는
  v0.2 Initial commit 기반의 13-Phase 모델이라, production v1.0(8-Stage)과
  데이터 모델이 다르다. §0 작업을 그대로 이식할 수 없다.
- recovery-v0.3에 있는 §0 산출물 (참고 자료) —
  - docs/specs/2026-05-19-builder-school-2.0-architecture.md — 2.0 스펙.
    단 "13 Phase" 전제는 8-Stage로 다시 써야 한다.
  - docs/plans/2026-05-19-builder-school-2.0-foundation.md — §0 구현 계획.
  - src/lib/types.ts — NodeMeta·Volatility·Concept·Special·Edge·GraphNode.
    모델 비종속이라 거의 그대로 재사용 가능 (Lens.kind만 stage로).
  - src/content/concepts.ts·specials.ts — 모델 비종속, 재사용 가능.
  - src/content/ontology.ts — phases 의존. stages 기준으로 재작성 필요.
  - src/lib/content.ts — 그래프 헬퍼·검증 6규칙. 거의 재사용 가능.

## 이번 세션에 할 일
1. main을 새 작업 브랜치로 체크아웃한다 (예 claude/2.0-foundation-v2).
2. main의 실제 데이터 모델을 먼저 읽는다 — stages.ts, lessons.ts,
   journeys.ts, lesson-stage-mapping.ts, types.ts.
3. §0 아키텍처 스펙을 8-Stage 기준으로 다시 쓴다. recovery-v0.3의
   스펙을 참고하되 "Phase 렌즈"를 "Stage 렌즈"로 바꾼다.
4. 스펙 리뷰 후 구현 계획을 만들고, recovery-v0.3의 §0 코드 중 모델
   비종속 부분을 가져와 main 위에 재구현한다.

## 작업 규칙
- 비자명한 변경 전 건드릴 파일·검증 방법을 먼저 정리한다.
- 검증 게이트 — npm run typecheck / validate / check.
- git commit·push, 의존성 추가, 기존 콘텐츠 삭제, next.config.mjs
  distDir 수정, vercel 배포·롤백은 stop point — 진행 전 확인.
- 한국어 출력 시 문장을 콜론(:)으로 끝내지 않는다.
```

---

## Vercel 배포 상태 (2026-05-19 기준)

- 프로젝트 — `ai-builder-school` (Vercel team `gomgomee-s-projects`).
  프로덕션 alias `https://ai-builder-school-henna.vercel.app`.
- **사고 경위** — `vercel deploy --prod`로 `recovery-v0.3`(v0.2 골격 +
  2.0 그래프)가 production에 배포됨(`g1dkkbnix`, Ready). production이
  v1.0.1 화면에서 v0.2 골격으로 회귀했다.
- **롤백** — 12시간 전 v1.0 배포 `jztrql50q`로 되돌려야 한다.
  명령 — `vercel rollback https://ai-builder-school-jztrql50q-gomgomee-s-projects.vercel.app`
- Preview 배포 환경변수 — Preview에 대문자 `USE_DEFAULT_DIST`가 없어
  작업 브랜치 자동 Preview 배포가 Error. `next.config.mjs`는
  `process.env.USE_DEFAULT_DIST`가 truthy면 distDir을 `.next`로 쓴다.
  필요 시 `vercel env add USE_DEFAULT_DIST preview` 값 `1`.

## recovery-v0.3 브랜치의 §0 커밋 (참고용)

`ea7ce5b`(스펙·계획) · `45b6bec`(types) · `da6b6ab`(concepts) ·
`d622924`(specials) · `f0ca214`·`ef66f0f`(ontology) · `a951349`(헬퍼) ·
`511d415`(검증 6규칙) · `f9ca7bc`(about 비전) · `fc05106`(이 인계 노트).
전부 `origin/claude/recovery-v0.3`에 푸시돼 있다. 삭제하지 말 것 —
8-Stage 재설계 시 모델 비종속 코드를 여기서 가져온다.
