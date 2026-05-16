# CLAUDE.md — Claude Code operating guide

> This is a focused version of `AGENTS.md` for Claude Code. Read `AGENTS.md` for full context. This file prioritizes commands, rhythm, stop points, and the **Harness Contract** so you move fast without surprising the user.

## Quick facts

- Project: **AI Builder School** (Korean-first AI builder curriculum site)
- Stack: Next.js 15 App Router · React 19 · TypeScript 5 · Tailwind 3 · MDX 3 + remark-gfm
- Content is data-driven. All phases/lessons/journeys/projects/templates live in `src/content/*.ts`.
- Lesson long-form bodies are MDX in `src/content/lessons/<slug>.mdx`, registered in `src/content/lesson-bodies.ts`.
- Build dir is `.next.nosync/` (iCloud sync workaround — do **not** revert to `.next`).
- UI copy: Korean. Code / variable names / file names: English.

## Commands you may run

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run typecheck # tsc --noEmit
npm run validate  # content integrity (validateContent + stats)
npm run build
npm run check     # lint + typecheck + validate + build  (FULL gate)
```

Always use `npm` (no pnpm). Paths contain spaces — quote them.

## Harness Contract (6 axes)

This repo enforces the Harness Engineering principles it teaches. Every coding agent working here follows the 6-axis contract:

1. **Tool layer** — Use only commands from `.claude/settings.json` allow-list. Never run `git push`, `npm publish`, or destroy `src/`.
2. **Feedback loop** — After every non-trivial change, run `npm run check`. Never claim "done" before it passes.
3. **Recovery** — When `validate` fails, do NOT auto-fix. Surface the report to the user and propose options. The user decides.
4. **Constraint** — The list under "Stop points" below is machine- or human-enforced. Never bypass.
5. **Agent topology** — Use the right skill for the job:
   - **lesson-writer** (`.claude/skills/lesson-writer.md`) — adding/editing lessons. Wraps `npm run new-lesson`.
   - **content-validator** (`.claude/skills/content-validator.md`) — runs `npm run validate` and reports.
   - **ui-stylist** (`.claude/skills/ui-stylist.md`) — UI / styling only; never touches `src/content/**` or `src/lib/**`.
6. **Evaluation hook** — `npm run validate` is the gate. `npm run eval` (Tier 3) gives structural quality warnings but is non-blocking by design. `npm run eval:rubric` is the *qualitative* loop — LLM grades lesson prose against `docs/lesson-quality-rubric.md` (needs `GEMINI_API_KEY` or `ANTHROPIC_API_KEY`, advisory, opt-in).

## Workflow expectations

1. **Plan before editing.** For any non-trivial change, list files you will touch and the verification you will run.
2. **Use the content layer.** Copy lives in `src/content/*.ts` or `src/content/lessons/*.mdx`, never in components.
3. **Schema integrity.** If you must extend `src/lib/types.ts`, also update `src/lib/content.ts`, `docs/content-model.md`, and the relevant content files in the same change.
4. **Preserve the 7-step loop** for every lesson: problem → concepts → mission → build → verify → ship → reflect.
5. **`mission` is the unified field.** Use it for new lessons. Older lessons may still carry `codexMission` / `claudeCodeMission` for back-compat — don't delete.
6. **`npm run check` must pass** before reporting "done."

## Branch policy

- `main` = production reference. 직접 push 금지. PR로만 머지.
- 모든 작업은 `claude/v<version>-<topic>` feature branch에서 진행.
- 새 워크트리는 `main`이 아니라 작업 중인 feature branch에서 분기.
- lefthook이 commit/push 시점에 typecheck·validate·build 자동 게이트.
- push 후 GitHub Actions CI + Vercel preview URL 자동 생성.

## Stop points (ask before proceeding)

- Introducing a new framework, runtime, database, backend route, or external service.
- Removing an existing lesson, phase, journey, project, or template.
- Renaming any file in `src/content/` or `src/lib/`.
- Modifying `next.config.mjs` `distDir` (it must stay `.next.nosync` for iCloud safety).
- Modifying `package.json` dependencies (add/remove/upgrade).
- Running git operations: `commit`, `push`, `branch -D`, `reset --hard`.
- Editing `.env*` files.

## Detailed rules

Curriculum and content schema:
- `docs/curriculum-blueprint.md` — 12-phase design
- `docs/content-model.md` — field-by-field schema
- `docs/implementation-plan.md` — MVP plan
- `docs/assumptions.md` — open decisions
- `docs/harness-engineering-spec.md` — full Harness Engineering spec for this repo

Content data sources:
- `src/content/phases.ts`
- `src/content/lessons.ts` (+ `src/content/lessons/<slug>.mdx`)
- `src/content/journeys.ts`
- `src/content/projects.ts`
- `src/content/templates.ts`
- `src/content/lesson-bodies.ts` — slug → MDX component map

## Default behavior for common asks

- **"Add a lesson about X"** → use the **lesson-writer** skill. It runs `npm run new-lesson <slug>` then walks through hook / mission / outputs / MDX. Don't hand-edit `lessons.ts` for a new lesson — the scaffolder ensures schema completeness.
- **"Improve the homepage copy"** → edit `src/app/page.tsx` and/or `Hero` / `LearningLoopSection` in `src/components/Sections.tsx`. Keep friendly Korean copy.
- **"Fix a typo"** → edit the data file. Do not touch component JSX if the text originates from content.
- **"Add a new journey"** → append to `src/content/journeys.ts`; ensure referenced phases exist; rerun `npm run validate`.
- **"Polish UI"** → use the **ui-stylist** skill. It is forbidden to edit content/lib files.

## What "done" looks like

- Changed files listed back to the user.
- `npm run check` (lint + typecheck + validate + build) all pass.
- 55+ static pages built (current expected: 55).
- No new runtime dependencies without explicit user approval.
- No uncommitted secrets, no edits to `.env*`.
- For lesson additions: MDX body present, outputs/ folder created, lesson-bodies.ts updated.
