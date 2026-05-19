# AI Builder School 2.0 — 다음 세션 인계 노트

> 작성 2026-05-19 · §0(아키텍처 토대) 구현 완료 직후 작성
> 이 파일은 다음 세션 시작 시 그대로 프롬프트로 붙여 쓰도록 만든 인계 노트다.

---

## 다음 세션 시작 프롬프트 (이 블록을 복사해 붙여라)

```
AI Builder School 2.0 업그레이드 작업을 이어간다.

## 배경
- 저장소 — /Users/taewookkim/AI Builder School (브랜치 claude/recovery-v0.3)
- 2.0의 목표 — "입력으로 자라는 살아있는 지식 그래프". 원리는 항구적 코어,
  제품 종속 정보는 휘발성 엣지로 분리해 급변하는 AI 시장에서 항상성 유지.
- 1.0은 13 Phase 사다리 · 61 레슨 · 6 Journey의 선형 커리큘럼.

## 이미 끝난 것 — §0 아키텍처 토대 (이번에 이어가지 않음)
- docs/specs/2026-05-19-builder-school-2.0-architecture.md — 2.0 아키텍처 스펙.
- docs/plans/2026-05-19-builder-school-2.0-foundation.md — §0 구현 계획.
- §0 구현 완료. 커밋 8개(45b6bec~f9ca7bc) origin에 푸시됨. 내용 —
  - src/lib/types.ts — NodeMeta·Concept·Special·Edge·Lens·GraphNode 타입.
  - src/content/concepts.ts — Concept 시드 10개.
  - src/content/specials.ts — Special 빈 배열.
  - src/content/ontology.ts — 노드 레지스트리 84 + 엣지 + 렌즈.
  - src/lib/content.ts — 그래프 질의 헬퍼 + 무결성 검증 6규칙.
  - scripts/validate-content.ts — ContentIntegrityIssue에 severity 추가,
    error 등급만 게이트로 삼음(경고는 비차단).
  - src/app/about/page.tsx — 2.0 비전 섹션.
- npm run check 통과. 84 정적 페이지. validate error 0건.

## 이번 세션에 할 일 — 아래 중 하나를 사용자와 정해 시작한다
로드맵 5개 하위 시스템 중 §0만 끝났다. 다음은 각각 별도 스펙이 필요하다.
1. 스펙 1 — 입력 파이프라인. 강의·자료·GitHub를 정제해 노드로 반영하는
   성장 엔진. 정제·분류 에이전트, intake 폴더 포맷, 분류 휴리스틱.
2. 스펙 2 — 레슨 통합·심화. 61레슨 통합·감축, 각 2배 심화, AI 문체 교정.
   통합 매핑(어느 레슨을 합칠지)을 이 스펙에서 확정한다.
3. 스펙 3 — 특강(Special) 시스템. Special 노드 실체 + 인터랙티브 슬라이드 +
   archived 노드 페이지 배너·라우팅.
스펙을 먼저 쓰고 리뷰를 거친 뒤 구현 계획을 만든다(§0과 같은 흐름).

## 작업 규칙
- 비자명한 변경 전 건드릴 파일·검증 방법을 먼저 정리한다.
- 검증 게이트 — npm run typecheck / validate / check. 단위 테스트 러너 없음.
- git commit·push, 의존성 추가, 기존 콘텐츠 삭제는 stop point — 진행 전 확인.
- next.config.mjs의 distDir 수정도 stop point(.next.nosync 유지).
- 커밋 메시지 끝에 Co-Authored-By 줄. lefthook이 pre-commit 검증 + 자동 푸시.
- 한국어 출력 시 문장을 콜론(:)으로 끝내지 않는다.

## 미해결 항목 (다음 세션이 인지할 것)
- Vercel Preview 배포 — Preview 환경에 대문자 USE_DEFAULT_DIST 변수가 없어
  작업 브랜치 자동 Preview 배포가 전부 Error. 아래 "Vercel 배포 상태" 참조.
- 고아 노드 경고 14건 — project 6·template 7·concept evals 1. demonstrates·
  appliesTo 엣지가 아직 없어서. 스펙 2·3에서 채워진다. 비차단 경고.
- DSS 상호 링크 — about 페이지의 Design System School 안내는 배포 URL
  미확정이라 링크 없이 텍스트로만 있음. URL 확정 시 링크 추가.
- 미커밋 변경 — design_handoff_ai_builder_school/ 삭제(D)와
  docs/persona-reviews/ 추가(미추적), home.jpeg는 §0과 무관해 손대지 않음.
  의도를 사용자에게 확인할 것.
```

---

## Vercel 배포 상태 (2026-05-19 기준)

- 프로젝트 — `ai-builder-school` (Vercel team `gomgomee-s-projects`).
  프로덕션 URL `https://ai-builder-school-henna.vercel.app`.
- **문제** — 최근 1~3시간 Preview 배포가 전부 Error. 원인은 빌드 실패가
  아니라(빌드는 84페이지까지 성공) 출력 디렉터리 불일치다.
  - `next.config.mjs`는 `process.env.USE_DEFAULT_DIST`가 truthy면 distDir을
    `.next`, 아니면 `.next.nosync`(iCloud 회피용)로 쓴다.
  - Vercel은 `.next/routes-manifest.json`을 기대한다.
  - Vercel 환경변수 — Production·Development에는 대문자 `USE_DEFAULT_DIST`가
    있으나 **Preview 환경에는 없다**(소문자 `use_default_dist`만 존재).
    환경변수는 대소문자를 구분하므로 Preview 빌드는 distDir이 `.next.nosync`가
    되어 Vercel이 산출물을 못 찾는다.
- **해결책 (사용자 승인 필요 — 자동 모드에서 차단됨)**
  1. Vercel Preview 환경에 `USE_DEFAULT_DIST=1` 추가 —
     `vercel env add USE_DEFAULT_DIST preview` 후 값 `1`.
     이러면 작업 브랜치 push마다 Preview 배포가 정상화된다.
  2. Production 배포는 `vercel deploy --prod` — Production 환경엔 대문자
     변수가 이미 있어 빌드가 성공한다.
  3. 부수 정리 — 소문자 `use_default_dist` 변수는 오타·중복이므로 제거 권장.
