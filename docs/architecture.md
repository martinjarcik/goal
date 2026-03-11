# Architecture

## Current State

The application codebase includes the first product feature: a centered Todo shell card with title, gradient background, and initial entrance styling. Unit and Playwright test setup are working.

## Selected Stack

- Platform: web
- Tooling: `Vite` + `TypeScript`
- UI approach: vanilla DOM APIs
- Styling: plain CSS
- Unit tests: `Vitest` + `jsdom` + DOM Testing Library
- End-to-end tests: `Playwright`
- Version control: `Git` + `GitHub`

## MVP Boundaries

- One screen only
- One state owner for the todo list
- Feature boundaries should stay separate:
  - app shell
  - todo display
  - add todo input
  - complete todo action
  - delete todo action
- Default initial state is an empty list
- Persistence is not required for the first implementation pass
- No framework, router, CSS framework, or state library

## Minimal Structure

- `index.html`: single page entry
- `src/main.ts`: bootstrap only
- `src/app.ts`: render a neutral application root
- `src/app.css`: base styles only
- `src/todos.ts`: tiny todo state helper
- `tests/unit`: unit tests
- `tests/e2e`: Playwright tests

## Pending Decisions

- Storage model
- Deployment target
