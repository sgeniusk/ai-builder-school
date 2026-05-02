# Harness Engineering — AI Builder School 자체 적용

> 이 문서는 코딩 에이전트(Codex / Claude Code / Cursor Agent 등)에게 그대로 건네는 작업지시서다.
> "학교가 가르치는 Harness Engineering 원리를 학교 자신에게 적용한다." — 즉, 도그푸딩.
> 한 번에 Tier 1 → Tier 2 → Tier 3 까지 진행하되, **각 Tier 끝에 verify 단계를 강제**한다.

---

## 1. Goal

이 레포가 **"학습자가 자기 레포에 그대로 옮길 수 있는 살아있는 harness 예제"**가 되게 만든다.
구체적으로:

- 콘텐츠 무결성이 머신에서 자동 강제된다
- 코딩 에이전트의 권한·역할·복구가 명시적으로 코드화되어 있다
- 새 레슨 추가/UI 수정/검증이 각자 다른 스킬로 분리되어 있다
- CI에서 같은 게이트가 다시 한번 돌아간다

---

## 2. Context

- **프로젝트 루트**: `/Users/taewookkim/Library/Mobile Documents/com~apple~CloudDocs/Creative OS/AI Builder School`
- **스택**: Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind 3 · MDX 3 + remark-gfm
- **콘텐츠 모델**: `src/content/{phases,lessons,journeys,projects,templates}.ts` + `src/content/lessons/<slug>.mdx`
- **무결성 검증 함수**: `src/lib/content.ts`의 `validateContent()` (이미 존재, 자동 호출은 안 됨)
- **빌드 산출물 위치**: `.next.nosync/` (iCloud 동기화 회피용 — 절대 `.next`로 되돌리지 말 것)
- **이미 있는 에이전트 가이드**: `AGENTS.md`, `CLAUDE.md`
- **금지**: 새 외부 서비스, 백엔드, DB, 인증, 결제, CMS. 이 레포는 정적 사이트.

---

## 3. 6 축 갭 분석 (현재 → 목표)

| 축 | 현재 | 이 작업 후 |
|---|---|---|
| Tool layer | 정성적 가이드 | `.claude/settings.json` allow/deny 명시 |
| Feedback loop | 수동 실행 | pre-commit + CI 자동 실행 |
| Recovery | 사람 개입만 | validate 실패 시 명확한 메시지 + 복구 힌트 |
| Constraint | 문서 | pre-commit / CI 강제 |
| Agent topology | 단일 | 3개 sub-skill (writer / validator / stylist) |
| Evaluation hook | `validateContent()` 존재만 | 머신에서 실행, 품질 eval 추가 |

---

## 4. Deliverables — Tier 1 (필수, 안전망)

### 4.1 `scripts/validate-content.ts`
- `validateContent()` 결과를 받아 console에 표 형식으로 출력
- 이슈가 1개라도 있으면 `process.exit(1)`
- 이슈 없으면 `process.exit(0)` 와 함께 `✓ Content OK · phases X · lessons Y · journeys Z` 한 줄

### 4.2 `package.json`
- `"validate": "tsx scripts/validate-content.ts"` 추가
- `"check": "npm run lint && npm run typecheck && npm run validate && npm run build"` 추가
- 필요 시 `tsx`를 devDependency로 추가 (사용자에게 사전 알림)

### 4.3 pre-commit 훅
- **선택**: `lefthook` (가벼움, 권장) 또는 `husky` + `lint-staged`
- 결정은 **사용자에게 물어본 뒤** 진행. 디폴트는 `lefthook`.
- 훅 내용:
  - typecheck (`npm run typecheck`)
  - validate (`npm run validate`)
- 둘 다 통과해야 commit 진행.

### 4.4 `AGENTS.md` / `CLAUDE.md` 업그레이드
다음 섹션을 명시적으로 추가:

```
## Harness 계약 (Harness Contract)
이 레포에서 일하는 모든 코딩 에이전트는 6 축 계약을 따른다:

1. Tool layer — `.claude/settings.json`의 allow/deny에 정의된 명령만 사용
2. Feedback loop — 변경 후 반드시 `npm run check` 통과
3. Recovery — validate 실패 시 자동 수정 시도하지 말고 사람에게 결과 보고
4. Constraint — `## Stop points` 항목은 절대 자동 실행 금지
5. Agent topology — 작업 종류에 맞는 skill 사용 (lesson-writer / content-validator / ui-stylist)
6. Evaluation hook — 새 레슨 추가 시 `npm run new-lesson` 스캐폴더 사용 의무
```

### 4.5 Tier 1 검증
```bash
npm run validate  # exit 0
npm run typecheck # exit 0
npm run build     # 55 정적 페이지 생성
git commit --allow-empty -m "test"  # pre-commit 훅이 실행되는지 확인
```

---

## 5. Deliverables — Tier 2 (역할 분리)

### 5.1 `.claude/settings.json` 권한 프로파일
```jsonc
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(rm -rf .next.nosync)",
      "Bash(find src/**)",
      "Bash(grep *)",
      "Bash(ls *)",
      "Read(*)",
      "Write(src/content/lessons/**)",
      "Write(docs/**)",
      "Edit(src/**)"
    ],
    "deny": [
      "Bash(git push *)",
      "Bash(git commit *)",
      "Bash(rm -rf src)",
      "Bash(rm -rf .git)",
      "Bash(npm publish *)",
      "Write(.env*)",
      "Write(package-lock.json)"
    ]
  }
}
```
*값은 권장이며, 사용자와 합의 후 조정한다.*

### 5.2 `.claude/skills/lesson-writer.md`
- 새 레슨을 추가하는 **단일 책임** 스킬
- 입력: slug, phaseId, titleKo
- 동작:
  1. `npm run new-lesson <slug>` 호출 (5.4 참조)
  2. 생성된 메타 객체에 hook / mission / outputs 채우기
  3. MDX 본문 블로그 어조로 작성 (~900단어, 다른 레슨과 인터링크)
  4. outputs/ 템플릿 작성
  5. `lesson-bodies.ts` 등록
  6. `npm run check` 실행

### 5.3 `.claude/skills/content-validator.md`
- `npm run validate` 실행 + 결과 해석 + 복구 가이드 제시
- 자동 수정 금지. 사람에게 결과만 전달.

### 5.4 `.claude/skills/ui-stylist.md`
- UI/스타일 변경 전용
- `src/content/**`, `src/lib/**` 수정 금지
- `src/styles/globals.css`, `src/components/**`, `tailwind.config.ts`만 허용
- 변경 후 `npm run typecheck && npm run build` 실행

### 5.5 `scripts/new-lesson.ts`
- 사용법: `npm run new-lesson <slug>`
- 동작:
  1. `src/content/lessons.ts`에 빈 메타 객체 추가 (필수 필드 채워진 상태로)
  2. `src/content/lessons/<slug>.mdx` 생성 (블로그 어조 템플릿)
  3. `src/content/lessons/<slug>/outputs/` 폴더 + 빈 `README.md` 생성
  4. `src/content/lesson-bodies.ts` 자동 등록
  5. 콘솔에 다음 단계 안내

### 5.6 Tier 2 검증
```bash
npm run new-lesson test-stub                       # 정상 생성
npm run validate                                   # exit 0
git checkout -- src/content/                       # 되돌리기
ls src/content/lessons/test-stub.mdx 2>/dev/null   # 없어야 정상
```

---

## 6. Deliverables — Tier 3 (품질·CI)

### 6.1 `scripts/eval-lesson-quality.ts`
각 레슨에 대해 다음을 검사:

- [ ] MDX 본문 단어 수 600~1500
- [ ] 7-step 구조: hook · problemScenario · coreConcepts · mission · buildSteps · verificationChecklist · deliverable · reflectionQuestions 모두 채워짐
- [ ] 다른 레슨 인터링크 1개 이상 (`/lessons/...` 패턴)
- [ ] outputs 1개 이상
- [ ] codexNote 또는 mission이 단일화 (둘 다 별도가 아닌)

이슈가 있으면 표로 출력하되 exit 0 (경고만). 사용자가 수동으로 갱신.

### 6.2 `package.json`
- `"eval": "tsx scripts/eval-lesson-quality.ts"` 추가

### 6.3 `.github/workflows/ci.yml`
- `push` / `pull_request` 시 트리거
- Node 22
- `npm ci`
- `npm run check`
- (선택) `npm run eval` — 실패해도 무시

### 6.4 `docs/harness-engineering-spec.md`
**이 문서**가 그 산출물이다. 학습자가 자기 레포에 동일한 패턴을 적용할 수 있게 살아있는 예제로 보존.

### 6.5 Tier 3 검증
```bash
npm run eval                                       # 표 출력
git push 또는 PR                                   # GitHub Actions 그린
```

---

## 7. Constraints (절대 어기지 말 것)

1. 새 의존성은 **사전 합의**. 자동 추가 금지. (예외: `tsx`, `lefthook` — 이 문서에서 합의됨)
2. `src/content/**`의 기존 데이터 **삭제·이동 금지**. 추가만.
3. `src/lib/types.ts`의 기존 타입 변경 금지 (필드 추가는 OK).
4. `next.config.mjs`의 `distDir` 설정은 **건드리지 말 것**.
5. 빌드 산출물은 `.next.nosync/`에만 들어가야 한다 (iCloud 회피).
6. AGENTS.md / CLAUDE.md의 기존 내용은 **추가**만. 삭제 금지.
7. `git commit`, `git push`, `git reset --hard`는 사용자가 명시적으로 요청할 때만.

---

## 8. Acceptance (각 Tier 끝에 강제 통과)

```bash
# Tier 1 acceptance
npm run lint && npm run typecheck && npm run validate && npm run build

# Tier 2 acceptance — 위에 더해
npm run new-lesson test-acceptance && \
  npm run validate && \
  git status # 의도된 변경만 보여야 함

# Tier 3 acceptance — 위에 더해
npm run eval # 표 출력, exit 0
```

---

## 9. 작업 순서 (제안)

```
Tier 1
├── 4.1 validate-content.ts
├── 4.2 package.json scripts (validate, check)
├── 4.3 pre-commit 훅 (사용자에게 lefthook/husky 합의 받기)
├── 4.4 AGENTS.md / CLAUDE.md 업그레이드
└── 4.5 acceptance

Tier 2
├── 5.5 new-lesson 스캐폴더 (skills보다 먼저)
├── 5.1 .claude/settings.json
├── 5.2-5.4 skills 3종
└── 5.6 acceptance

Tier 3
├── 6.1 eval-lesson-quality.ts
├── 6.2 package.json eval script
├── 6.3 ci.yml
└── 6.5 acceptance
```

각 Tier 끝마다 **사용자에게 결과 보고 후 다음 Tier 진입 동의**를 받는다.

---

## 10. 출력 형식 (사용자에게 보고할 때)

각 Tier 끝에:

```
✓ Tier <N> 완료

추가된 파일:
- path/to/file.ts
- ...

수정된 파일:
- path/to/file.md
- ...

검증:
- npm run lint     ✓
- npm run typecheck ✓
- npm run validate ✓
- npm run build    ✓ (55 페이지)

다음 Tier로 진행해도 될까요?
```

---

## 11. 시작 시 필요한 사용자 결정

이 문서를 받은 에이전트가 시작 전 사용자에게 **반드시 물어볼 것**:

1. pre-commit 훅 도구 — `lefthook` (권장) vs `husky + lint-staged` 중 어느 쪽?
2. CI 트리거 — `push` 만 vs `push + pull_request` 둘 다?
3. eval 결과는 CI에서 fail-blocking 으로 갈지, 경고만으로 둘지?

답을 받기 전엔 코드 변경 시작 금지.
