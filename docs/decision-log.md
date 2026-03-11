# Decision Log

## 2026-03-11

### D-001: Use `docs` as project memory

- Status: accepted
- Reason: keep requirements, plans, architecture, decisions, and assets in one place for future tasks

### D-002: Start with a simple Todo app scope

- Status: accepted
- Reason: keep the product small and easy to build iteratively with AI assistance

### D-003: Use a minimal purple visual style

- Status: accepted
- Reason: align the Todo UI with a clean modern look using a subtle gradient background and purple accents

### D-004: Use the story map as the MVP backlog source

- Status: accepted
- Reason: keep implementation order aligned with the left-to-right user flow and its grouped requirements

### D-005: Specify backlog features as standalone contracts

- Status: accepted
- Reason: keep each MVP feature independently understandable, implementable, and testable

### D-006: Keep the MVP empty-first and feature-boundary driven

- Status: accepted
- Reason: align the plan, design spec, and feature contracts around the story map without overlapping responsibilities

### D-007: Use a minimal vanilla web stack with built-in test support

- Status: accepted
- Reason: `Vite` + `TypeScript` + plain CSS keeps the app trivial to understand, while `Vitest` and `Playwright` provide the required automated testing with minimal overhead

### D-008: Avoid generated app scaffolding

- Status: accepted
- Reason: a manual setup is cleaner in this existing repo and avoids carrying unused demo files, assets, and example code

### D-009: Keep Playwright browsers inside the project

- Status: accepted
- Reason: local browser installation avoids sandbox cache mismatches and makes the e2e setup reproducible in this repo

### D-010: Keep the starter scaffold feature-neutral

- Status: accepted
- Reason: implementation should begin from neutral app scaffolding so `Application Initialize` remains the first actual product feature
