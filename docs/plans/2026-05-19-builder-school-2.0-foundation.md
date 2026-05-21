# AI Builder School 2.0 토대(§0) 구현 계획

> 베이스 — `claude/2.0-foundation-v2` (main v1.0.1에서 분기). 8-Stage 모델.
> 상위 스펙 — `docs/specs/2026-05-19-builder-school-2.0-architecture.md` §0(토대) 범위만 구현한다.
> 상태 — 2026-05-19 구현 완료. `npm run check` 통과. 커밋 미실행(사용자 승인 대기).

**목표** — AI Builder School에 지식 그래프 연결층을 추가한다. 노드·엣지·렌즈 타입, `ontology.ts`, 그래프 무결성 검증, about 페이지 2.0 비전 섹션.

**아키텍처** — 기존 콘텐츠 파일(`lessons.ts`·`stages.ts` 등)은 그대로 두고, 그래프만 새 파일 `src/content/ontology.ts`에 모은다(스펙 접근법 A). 노드 메타데이터(`volatility`·`reviewBy`·`status`)는 각 콘텐츠 타입에 옵셔널 필드로 합쳐 무손상 마이그레이션한다. Stage·Journey는 노드가 아니라 `stages.ts`·`journeys.ts`에서 유도되는 렌즈다.

## 검증 모델

저장소에 단위 테스트 러너가 없다. Vitest 도입은 의존성 추가 = stop point이므로 이 계획은 추가하지 않는다. 기존 품질 게이트를 피드백 루프로 쓴다.

- `npm run typecheck` — `tsc --noEmit`. 타입 정합.
- `npm run validate` — `validateContent()`. 콘텐츠·그래프 무결성.
- `npm run build` — Next.js 정적 빌드 (55 페이지).
- `npm run check` — 위 셋 + lint 전체 게이트.

Task 5(그래프 검증)에서는 규칙 구현 후 **의도적으로 깨진 엣지를 임시 주입해 `validate`가 잡는지 확인**하고 되돌린다.

## 범위 밖

- 레슨 통합·감축, 본문 2배 심화 — 별도 스펙 2.
- Special 노드 *실체*·특강 페이지·인터랙티브 슬라이드 — 별도 스펙 3. 이 계획은 `Special` 타입과 빈 `specials.ts`만.
- `archived` 노드 페이지 배너·라우팅 — 스펙 3. 이 계획은 `status` 필드와 검증만.
- 입력 파이프라인 — 별도 스펙 1.
- 인터랙티브 그래프 뷰 UI.
- Concept 위키 항목 집필 — 이 계획은 영문 slug가 명확한 핵심 개념 ~10개의 **시드**만.

## 커밋 정책

git commit은 stop point다. 모든 Task를 구현하고 `npm run check`를 통과시킨 뒤, 사용자가 커밋 시점을 정한다. 아래 Task별 "커밋 메시지 제안"은 사용자 승인 후 사용할 초안이다.

---

## 파일 구조

| 파일 | 책임 | 신규/수정 |
|---|---|---|
| `src/lib/types.ts` | 그래프 타입 — `NodeMeta`·`Concept`·`Special`·`Edge`·`Lens`·`GraphNode` 등 | 수정 |
| `src/content/concepts.ts` | Concept 노드 시드 (~10) | 신규 |
| `src/content/specials.ts` | Special 노드 배열 (빈 배열) | 신규 |
| `src/content/ontology.ts` | 노드 레지스트리 + 엣지 + 렌즈. 그래프 단일 진실 공급원 | 신규 |
| `src/lib/content.ts` | 그래프 질의 헬퍼 + `validateContent()` 그래프 6규칙 + `ContentIntegrityIssue.severity` | 수정 |
| `scripts/validate-content.ts` | error/warning 분리 출력·종료 코드 (severity 대응) | 수정 |
| `src/app/about/page.tsx` | 2.0 비전 섹션 추가 | 수정 |

---

## Task 1 — `types.ts` 그래프 레이어 타입

- [x] `Lesson`·`Project`·`ContentTemplate` 선언을 `extends NodeMeta`로 변경 (필드 본문 불변).
- [x] 파일 끝에 그래프 타입 블록 추가 — `Volatility`·`NodeStatus`·`NodeMeta`·`NodeKind`·`Concept`·`Special`·`EdgeType`·`Edge`·`Lens`·`GraphNode`. `Lens.kind`는 `"stage" | "journey"`.
- [x] `npm run typecheck` PASS — 옵셔널 필드라 기존 84레슨·프로젝트·템플릿 무영향.
- 커밋 메시지 제안 — `feat(graph): 2.0 지식 그래프 레이어 타입 추가`

## Task 2 — `concepts.ts` Concept 시드

- [x] recovery-v0.3 `concepts.ts`의 영문 핵심 개념 10개 시드를 그대로 이식 (모델 비종속, 스펙 §7-2). 모두 `status: "draft"`.
- [x] `npm run typecheck` PASS.
- 커밋 메시지 제안 — `feat(graph): Concept 노드 시드 10개 추가`

## Task 3 — `specials.ts` (빈 배열)

- [x] `export const specials: Special[] = []` 만. 특강 실체는 스펙 3.
- [x] `npm run typecheck` PASS.
- 커밋 메시지 제안 — `feat(graph): Special 노드 파일 생성 (빈 배열)`

## Task 4 — `ontology.ts` 노드 레지스트리 + 엣지 + 렌즈

- [x] `nodeId(kind, slug)` 헬퍼 + `toGraphNode` 정규화 + `graphNodes`·`nodeById`.
- [x] 파생 엣지 — `prerequisiteEdges`(Lesson.prerequisites), `partOfJourneyEdges`(Lesson.targetJourneys + **Project.targetJourneys** — main의 Project는 이 필드 보유).
- [x] 수동 엣지 — `teachesEdges`(10), `relatedToEdges`(5).
- [x] 렌즈 — `stageLenses`(stages.ts `lessonSlugs`에서 유도), `journeyLenses`(journeys.ts `recommendedLessons`).
- [x] `npm run typecheck && npm run build` PASS.
- 커밋 메시지 제안 — `feat(graph): ontology 노드·엣지·렌즈 추가`

## Task 5 — `content.ts` 그래프 헬퍼 + 검증 6규칙

- [x] import — `graphNodes`·`graphEdges`·`graphLenses`·`nodeById` (`ontology.ts`) + `Edge`·`EdgeType`·`GraphNode`·`Lens` 타입.
- [x] 질의 헬퍼 — `getNode`·`getOutEdges`·`getInEdges`·`getBacklinks`·`getLens`·`getLenses`.
- [x] `validateContent()` `return issues` 직전에 그래프 6규칙 추가 (끊긴 엣지·타입 제약·prerequisite 순환·고아 노드·중복 엣지·휘발성 정합).
- [x] **스펙 대비 추가 — `severity`.** 스펙 §4-4 규칙 4(고아 노드)는 "경고"다. 기존 `validate` 스크립트는 모든 이슈를 exit 1 실패로 처리해 "경고"가 게이트를 깬다. 스펙대로 구현하려면 경고/오류 분리가 필요해, `ContentIntegrityIssue`에 옵셔널 `severity: "error" | "warning"`을 추가하고(미지정=error) `scripts/validate-content.ts`가 둘을 분리 출력·분리 종료한다. 고아 노드 규칙만 `severity: "warning"`.
- [x] `npm run validate` PASS — `graph.*` 오류 0. `graph.orphanNode` 경고 25건(템플릿 24 + `concept:evals` 1)은 게이트를 통과한다. `appliesTo`·`demonstrates` 엣지는 §0 범위 밖(스펙 3)이므로 템플릿이 아직 고아인 것은 예상된 상태다.
- [x] 실패 테스트 — 깨진 엣지 임시 주입 → `validate` exit 1 확인 → 되돌림 → PASS.
- 커밋 메시지 제안 — `feat(graph): content.ts 그래프 헬퍼·무결성 검증 6규칙 추가`

## Task 6 — about 페이지 2.0 비전 섹션

- [x] `visionPillars` 배열 + 비전 `<section>`을 FAQ와 Contribute 섹션 사이에 삽입. `principles-list` 클래스 재사용.
- [x] DSS 링크 — 배포 URL 미확정이므로 단락 생략 (스펙 §8-2 — 깨진 외부 링크 금지).
- [x] `npm run check` PASS — 55 정적 페이지.
- 커밋 메시지 제안 — `feat(about): 2.0 비전 섹션 추가`

---

## 완료 기준 (전부 충족)

- [x] `npm run check` 통과 — lint + typecheck + validate + build, 131 정적 페이지(84 레슨 + 18 프로젝트 + 8 Stage + 6 Journey + 정적 페이지).
- [x] `npm run validate` — `graph.*` 오류 0건. `graph.orphanNode` 경고 25건은 게이트 통과(스펙 §4-4 규칙 4 = 경고).
- [x] `/about`에 2.0 비전 섹션이 보인다.
- [x] 그래프 레이어 존재 — `ontology.ts` 노드·엣지·렌즈, `content.ts` 질의 헬퍼, `validateContent()` 그래프 6규칙.
- [x] 기존 84레슨·프로젝트·템플릿·8Stage·6Journey 데이터 무손상.

## 다음 단계 (이 계획 밖)

진행 순서는 로드맵 검토(2026-05-19)에서 확정 — `docs/roadmap.md` §2.

1. 특강(스펙 3) — Special 실체 + 인터랙티브 슬라이드 + `archived` 페이지 배너.
2. 레슨 통합·심화(스펙 2).
3. 입력 파이프라인(스펙 1).
4. 프롬프트 연습장 — BYO 키, Concept 노드 연결 (기존 v0.9 흡수).
5. 후속 — 그래프 뷰 UI, Concept 위키 항목 집필.
