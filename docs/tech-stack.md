# Tech Stack And Setup

## Selected Stack

- Platform: web
- App runtime: `Vite` + `TypeScript` + vanilla DOM APIs
- Styling: plain CSS
- Unit tests: `Vitest` + `jsdom` + `@testing-library/dom` + `@testing-library/user-event`
- End-to-end tests: `Playwright`
- Version control: `Git` + `GitHub`
- Editor: `Cursor`

## Why This Stack

- No framework overhead for a small Todo app
- Very small project structure
- Fast local startup and test runs
- Easy to evolve later if the app grows
- Works cleanly with Cursor and GitHub

## Minimal Project Structure

```text
.
├── index.html
├── package.json
├── playwright.config.ts
├── vitest.config.ts
├── src
│   ├── app.css
│   ├── app.ts
│   ├── main.ts
│   └── todos.ts
└── tests
    ├── e2e
    │   └── app.spec.ts
    └── unit
        └── app.test.ts
```

## 1. Install Local Tools

If you do not already have Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install the minimal toolchain:

```bash
brew install git node gh
git --version
node --version
npm --version
gh --version
```

## 2. Connect GitHub

Authenticate once:

```bash
gh auth login
```

If this local repo does not yet have a GitHub remote:

```bash
gh repo create goal --private --source=. --remote=origin --push
```

## 3. Initialize The App Without Scaffolding

Run this in the project root:

```bash
npm init -y
npm install -D vite typescript
npx tsc --init
mkdir -p src tests/unit tests/e2e
```

This keeps the repo free of demo files and template markup.

## 4. Add Test Libraries

```bash
npm install -D vitest jsdom @testing-library/dom @testing-library/user-event @playwright/test
npx playwright install chromium
```

## 5. Use These `package.json` Scripts

Replace the `scripts` section with:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "PLAYWRIGHT_BROWSERS_PATH=0 playwright test",
    "test:e2e:install": "PLAYWRIGHT_BROWSERS_PATH=0 playwright install chromium"
  }
}
```

## 6. Create Only These App Files

Create:

- `index.html`
- `.gitignore`
- `src/main.ts`
- `src/app.ts`
- `src/app.css`
- `src/todos.ts`
- `tsconfig.json`
- `vitest.config.ts`
- `playwright.config.ts`

Minimal `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.ts"]
  }
});
```

Minimal `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:4173"
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true
  }
});
```

## 7. Keep The First Implementation Simple

- Put all app state in one place.
- Keep one render entry point in `src/app.ts`.
- Keep todo data in a tiny in-memory array at first.
- Add persistence only after the MVP works.
- Do not add a component framework, router, CSS framework, or state library.

## 8. Daily Commands

Start development:

```bash
npm run dev
```

Run unit tests:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Install the local Playwright browser once:

```bash
npm run test:e2e:install
```
