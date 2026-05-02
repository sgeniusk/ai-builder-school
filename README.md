# AI Builder School

> Codex와 Claude Code로 배우고, 만들고, 검증하고, 배포하는 **한국어 기반 AI 실전 학교**의 MVP 저장소입니다.

## 빠른 시작

```bash
npm install
npm run dev
# http://localhost:3000
```

필요한 Node 버전: **20 이상** (25에서 테스트됨). pnpm은 사용하지 않고 npm만 씁니다.

## 스크립트

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (Next.js) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint (Next 기본 프리셋) |
| `npm run typecheck` | `tsc --noEmit` 타입 검사 |

## 페이지 맵

- `/` 홈 (Hero · 8주 경로 · 페르소나 · 트랙 · 레슨 미리보기)
- `/start` 학습자 진단과 첫 미션 안내
- `/curriculum` 12 Phase 커리큘럼
- `/curriculum/[phaseSlug]` Phase 상세
- `/lessons/[lessonSlug]` 7-step 학습 루프
- `/tracks` 페르소나별 트랙
- `/projects` 캡스톤 아이디어
- `/templates` 프롬프트 / 미션 / 체크리스트
- `/about` 철학과 기여 방법

## 콘텐츠 구조

모든 레슨·Phase·트랙·프로젝트·템플릿은 TypeScript 데이터 파일로 관리됩니다.

```
src/content/
  phases.ts      # 12 Phase
  lessons.ts     # 32+ 레슨 (7-step 루프)
  tracks.ts      # 5 페르소나 트랙
  projects.ts    # 캡스톤 아이디어
  templates.ts   # 프롬프트 / 미션 / 체크리스트
src/lib/
  types.ts       # 콘텐츠 타입
  content.ts     # 조회 + 무결성 검증 유틸
```

### 새 레슨 추가

1. `src/content/lessons.ts`에서 기존 레슨 객체를 복사합니다.
2. `id`, `slug`, `phaseId`, `titleKo` 등을 수정합니다.
3. `src/content/phases.ts`에서 해당 Phase의 `lessonSlugs` 배열에 slug를 추가합니다.
4. `npm run build`로 라우트 생성과 무결성을 확인합니다.

필드 상세: [`docs/content-model.md`](docs/content-model.md)

## 코딩 에이전트

이 저장소는 도구 중립적입니다. Codex, Claude Code, Cursor Agent 어느 쪽에서도 작동합니다. 에이전트가 반드시 읽어야 할 규약:

- [`AGENTS.md`](AGENTS.md) — 모든 코딩 에이전트 공통 규약 (영문)
- [`CLAUDE.md`](CLAUDE.md) — Claude Code 전용 요약 (영문)

## 문서

제품/커리큘럼/구현/로드맵 문서는 [`docs/`](docs/)에 한국어로 보관합니다.

- `docs/product-brief.md`
- `docs/curriculum-blueprint.md`
- `docs/content-model.md`
- `docs/implementation-plan.md`
- `docs/assumptions.md`
- `docs/future-roadmap.md`

## 디자인 방향

- 빌더 중심, 과장 금지, 한국어 우선.
- 카드 · 뱃지 · 타임라인 · 체크리스트를 핵심 패턴으로 사용.
- 어두운 톤의 `ink` 스케일과 파란색 `brand` 스케일 (`tailwind.config.ts` 참조).

## 라이선스

MVP 단계로 아직 라이선스를 확정하지 않았습니다. 학습 목적의 참조는 자유이며, 상업적 사용은 추후 결정됩니다.
