# Repository Guidelines

This document guides contributors working in this repository. Keep changes focused, respect the existing architecture, and validate locally before opening a PR.

## Project Structure & Module Organization
- `app/`: Next.js App Router pages/layouts and global styles (e.g., `app/community/page.tsx`, `app/globals.css`).
- `components/`: Reusable UI components (e.g., `components/Header.tsx`).
- `lib/`: Domain helpers and shared types (e.g., `lib/community.ts`, `lib/types.ts`).
- `src/`: Additional TypeScript types and helpers.
- `public/`: Static assets served from `/` (e.g., `/images/...`).
- `tests/`: Python unit tests (`tests/test_*.py`).

## Build, Test, and Development Commands
- Install deps: `npm install` (Node 18+).
- Dev server: `npx next dev` → http://localhost:3000.
- Build: `npx next build` (production bundle check).
- Start prod build: `npx next start` (after build).
- Lint: `npx eslint .` (Next.js + TypeScript rules).
- Format: `npx prettier --write .`.
- Run tests: `python -m unittest -v`.

## Coding Style & Naming Conventions
- Language: TypeScript with strict settings (`tsconfig.json`).
- Indentation: 2 spaces; avoid trailing whitespace.
- Naming: Components `PascalCase.tsx`; functions/vars `camelCase`; utilities `*.ts`.
- Imports: Prefer `@/...` if configured; otherwise clear relative paths.
- Quality: Fix ESLint and Prettier issues before commit; keep patches minimal.

## Testing Guidelines
- Framework: Python `unittest` with files named `tests/test_*.py`.
- Deterministic: No network calls; avoid time-based flakiness.
- Coverage: Aim ≥ 80% on changed code.
- Run locally: `python -m unittest -v` before submitting PRs.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (e.g., `feat(community): filter by tag`).
- Scope: Keep changes narrowly focused; update docs when behavior changes.
- PRs: Include concise description, linked issues, screenshots for UI changes, and verification steps.
- CI: Must pass lint, format, and tests before merge.

## Architecture Overview
- Runtime: Next.js App Router (`app/**/page.tsx`, `app/**/layout.tsx`).
- Data & Types: Helpers in `lib/`; shared types in `lib/types.ts` and `src/`.
- Assets & Styles: Serve from `public/`; prefer `next/image`; global tokens in `app/globals.css`.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local`; document required vars in `.env.example`.
- If a key is exposed, rotate immediately and redeploy.

## Agent-Specific Notes
- This guide applies repo-wide. Nested `AGENTS.md` files take precedence.
- Follow naming, structure, and style above for any edits.
- Avoid unrelated fixes; provide clear paths/commands in explanations.

