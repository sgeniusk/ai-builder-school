# AGENTS.md — AI Builder School

> Contract for **any coding agent** (Codex CLI, Claude Code, Cursor Agent, Aider, OpenHands, etc.) working in this repo.
> This repo applies the same **Harness Engineering** principles it teaches — read this file before touching anything.

---

## 1. Project overview

- **Name**: AI Builder School (`ai-builder-school`)
- **Mission**: A Korean-first practical AI learning platform that takes builders from "AI user" → "AI maker."
- **Stack**: Next.js 15 App Router · React 19 · TypeScript 5 · Tailwind 3 · MDX 3 + remark-gfm
- **Content model**: Data-driven. All content (`phases / lessons / journeys / projects / templates`) lives as TypeScript arrays in `src/content/*.ts`. Lesson long-form bodies are MDX in `src/content/lessons/<slug>.mdx`, registered in `src/content/lesson-bodies.ts`.
- **Build dir**: `.next.nosync/` (iCloud Drive sync workaround — must NOT be reverted to `.next`).
- **Language**:
  - UI copy: Korean.
  - Code / file names / variables: English.
  - Agent-facing docs (this file, CLAUDE.md, docs/harness-engineering-spec.md): English OK.
  - Product docs in `docs/`: Korean by default.

---

## 2. Harness Contract (6 axes)

This repo enforces the principles it teaches. Every coding agent honors the 6-axis contract.

### Axis 1 · Tool layer
Use only commands in `.claude/settings.json` allow-list. Never:
- `git push`, `git commit` (without explicit user request)
- `npm publish`
- `rm -rf src` / `rm -rf .git`
- writes to `.env*`, `package-lock.json`

### Axis 2 · Feedback loop
After every non-trivial change, run:
```bash
npm run check  # lint + typecheck + validate + build
```
Never claim "done" before this passes.

### Axis 3 · Recovery
When `validate` fails, do **not** auto-fix.
Surface the report verbatim to the user, propose 2–3 options, let the user decide.

### Axis 4 · Constraint
The "Stop points" list in §8 is hard. Don't bypass.

### Axis 5 · Agent topology
Pick the right skill:
- **`lesson-writer`** (`.claude/skills/lesson-writer.md`) — adding/editing lessons. Wraps `npm run new-lesson`.
- **`content-validator`** (`.claude/skills/content-validator.md`) — validates and reports.
- **`ui-stylist`** (`.claude/skills/ui-stylist.md`) — UI / styling only; never touches `src/content/**` or `src/lib/**`.

### Axis 6 · Evaluation hook
- `npm run validate` — schema integrity, MUST pass (blocks `check`).
- `npm run eval` — lesson quality, advisory only (warnings, non-blocking).

---

## 3. Setup

```bash
node -v          # 20+ required, 25 tested
npm install      # installs deps + auto-runs `lefthook install` via prepare script
```

Daily commands:
```bash
npm run dev       # http://localhost:3000
npm run lint
npm run typecheck
npm run validate  # content integrity
npm run build
npm run check     # FULL gate (lint + typecheck + validate + build)
npm run eval      # lesson quality, advisory  (Tier 3)
```

If git is initialized, `lefthook` runs:
- `pre-commit` → typecheck + validate (parallel)
- `pre-push` → full `check`

The repo path on macOS contains spaces — always quote.

---

## 4. Architecture

```
src/
  app/                     # Next.js App Router
    layout.tsx
    page.tsx               # /
    start/page.tsx
    curriculum/
      page.tsx
      [phaseSlug]/page.tsx
    lessons/[lessonSlug]/page.tsx
    journeys/page.tsx
    projects/page.tsx
    templates/page.tsx
    about/page.tsx
    not-found.tsx
  components/              # Layout, Cards, Sections, Badges, LearningLoop, LessonPieces
  content/                 # data + MDX bodies
    phases.ts
    lessons.ts
    lessons/<slug>.mdx
    lessons/<slug>/outputs/*.md
    lesson-bodies.ts       # slug → MDX component
    journeys.ts
    projects.ts
    templates.ts
  lib/
    types.ts
    content.ts             # helpers + validateContent()
  styles/globals.css
  mdx-components.tsx
docs/                      # product / curriculum / harness docs
scripts/                   # Node tasks (validate, new-lesson, eval)
.claude/                   # agent permission profile + skills
lefthook.yml               # Harness · Feedback Loop config
```

- All dynamic routes use `generateStaticParams` (full static export).
- Imports use the `@/` alias (`@/components/...`, `@/content/...`, `@/lib/...`).

---

## 5. Content rules

- Lessons live in `src/content/lessons.ts` + `src/content/lessons/<slug>.mdx` for narrative body.
- Each lesson must have:
  - unique `slug`
  - valid `phaseId` (matches one in `phases.ts`)
  - `targetJourneys: JourneyId[]` (subset of 6: `practitioner / adopter / creator / founder / engineer / explorer`)
  - 7-step loop fields: `problemScenario · coreConcepts · mission (or codexMission+claudeCodeMission) · buildSteps · verificationChecklist · deliverable · reflectionQuestions`
- Phases live in `src/content/phases.ts` with `order`, `slug`, `lessonSlugs`.
- Journeys (one concept replacing former Persona+Track) live in `src/content/journeys.ts`. 6 entries: 5 starting + 1 explorer (meta).
- User-visible Korean copy must use the **friendly tone** (e.g. `~합니다` 대신 `~해요`/`~돼요` mix).
- `validateContent()` enforces cross-references; do not bypass it.

### Adding a new lesson
1. **Use the scaffolder**: `npm run new-lesson <slug>`. It creates the metadata stub, MDX body template, outputs/ folder, and registers `lesson-bodies.ts`.
2. Fill in: `hook`, `mission`, learning goals, 4 core concepts, build steps, verification, deliverable, reflection, outputs.
3. Write the MDX body in friendly tone (~700–1200 words). Include 1+ inter-link to another lesson.
4. Run `npm run check`.

---

## 6. Code style

- TypeScript strict.
- React Server Components by default. Add `"use client"` only when needed.
- Tailwind utility-first; design tokens in `tailwind.config.ts` + CSS variables in `src/styles/globals.css` (calm-editorial: `ink`, `paper`, `line`).
- Persona color themes via `.p-{journeyId}` classes set CSS variables `--p-from`, `--p-to`. Add new keys to Tailwind `safelist`.
- Avoid inline styles for large structures; prefer CSS classes.

---

## 7. Verification (definition of done)

Required before reporting "done":
```bash
npm run check
```

For content changes, the gate also runs:
- `validateContent()` — every `phaseId`, `lessonSlugs`, `recommendedPhases`, `recommendedLessons` resolved
- Build succeeds: 55+ static pages

For lesson additions, also confirm:
- MDX body compiled without errors
- `outputs/` folder + at least one template file
- `lesson-bodies.ts` registers the new slug
- The lesson card appears at `/lessons/<slug>` and on the parent Phase page

---

## 8. Stop points (always ask before)

- Introducing a new framework, runtime, DB, backend route, external service.
- Removing an existing lesson, phase, journey, project, or template.
- Renaming any file in `src/content/` or `src/lib/`.
- Modifying `next.config.mjs` `distDir` (must remain `.next.nosync`).
- Changing `package.json` dependencies.
- Running git operations: `commit`, `push`, `branch -D`, `reset --hard`.
- Editing `.env*`.

---

## 9. Do-not list

- Do not split each lesson into a separate metadata file — `lessons.ts` is centralized on purpose.
- Do not introduce analytics, auth, feature flags, or i18n libs.
- Do not add runtime fetches for static content.
- Do not auto-fix `validate` failures — surface them.
- Do not rename `src/content/*.ts` files.

---

## 10. Where to learn more

- `docs/product-brief.md` — product thesis
- `docs/curriculum-blueprint.md` — 12-phase design
- `docs/content-model.md` — schema field reference
- `docs/harness-engineering-spec.md` — full Harness Engineering spec for this repo
- `docs/implementation-plan.md` — MVP plan
- `docs/assumptions.md` — open decisions
- `docs/roadmap.md` — single roadmap (v1.0 record + 2.0 plan)
- `docs/specs/` · `docs/plans/` — 2.0 architecture spec & implementation plans
