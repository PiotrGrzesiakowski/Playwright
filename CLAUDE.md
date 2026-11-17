# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Learning/practice project for Playwright Test (TypeScript). There is no application code — only test specs in `tests/` that hit public demo sites:
- `playwright.dev` (UI navigation),
- `saucedemo.com` (login flows; credentials `standard_user` / `secret_sauce`),
- `jsonplaceholder.typicode.com` (API tests via the `request` fixture).

Tests therefore need internet access, and failures may come from those external sites rather than the code.

## Commands

No npm scripts are defined; use `npx` directly.

- Install: `npm ci` then `npx playwright install --with-deps`
- Run all tests: `npx playwright test`
- Single file: `npx playwright test "tests/Testy Logowania.spec.ts"` (filenames contain spaces — quote them)
- Single test by name: `npx playwright test -g "błędne hasło"`
- Single browser: `npx playwright test --project=chromium`
- UI mode / headed: `npx playwright test --ui` / `--headed`
- Report: `npx playwright show-report`

There is no build or lint step (Playwright transpiles TS itself; no tsconfig).

## Configuration notes

- `playwright.config.ts`: every test runs in three projects (chromium, firefox, webkit), so test counts are multiplied by 3. `fullyParallel: true`, HTML reporter, no `baseURL` (specs use absolute URLs).
- On CI (`process.env.CI`): 2 retries, 1 worker, `test.only` forbidden, trace collected on first retry.
- GitHub Actions (`.github/workflows/playwright.yml`) runs the full suite on push/PR to `main`/`master` and uploads `playwright-report/`.

## Conventions

- Spec files use Polish names and Polish test titles; code is heavily commented in Polish explaining each Playwright API (marking `AKCJA` = action, `ASERCJA` = assertion). Keep this style when adding or editing tests.
- Preferred locators: `getByRole`, `getByPlaceholder`, then `locator()` with CSS / `[data-test=...]` attributes.

## Zasady dla testów

- Uruchamianie: npx playwright test --project=chromium
- Lokatory: najpierw getByRole, getByLabel, getByPlaceholder; CSS tylko w ostateczności
- Nigdy waitForTimeout
- Każdy test kończy się asercją, każda asercja z await
- Nazwy testów po polsku, krótkie komentarze po polsku
- Nie usuwaj plików i nie rób git push