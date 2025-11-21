# AGENTS.md

## Purpose of this repository

`das-js` is a **static, client‑side React application** that provides a clean, responsive website for Islamic centres and masājid. The project was originally built with Gatsby, but it has been migrated to **Vite** for faster builds and easier deployment. It uses:

- **React 19** with TypeScript
- **Vite** for bundling and development server
- **Sass/SCSS** with modern `@use` syntax
- **React Router** for client‑side routing
- **React Helmet Async** for managing document head/meta tags
- **GitHub Pages** for static hosting (custom domain via `static/CNAME`)

The repository also contains a small **utility library** (`src/utils`) for Islamic prayer‑time calculations and Hijri date conversion, with a full test suite using `bun test`.

---

## High‑level file structure

```
.
├─ .github/                # GitHub Actions workflows
│   ├─ workflows/          # CI definitions
│   │   ├─ deploy.yml      # Deploy to GitHub Pages (build + gh‑pages)
│   │   └─ ...            # (other removed workflows)
├─ src/                    # Application source code
│   ├─ components/         # React components (App, Hero, Footer, etc.)
│   ├─ context/            # React context (PortfolioProvider)
│   ├─ mock/               # Static data used for the demo site
│   ├─ style/              # SCSS files (abstracts, base, components, sections)
│   ├─ utils/              # Helper modules (calculator, hijri, …) and tests
│   ├─ config.ts           # Site metadata (title, description, etc.)
│   ├─ main.tsx            # Vite entry point (client bootstrap)
│   └─ index.html          # HTML template used by Vite
├─ static/                 # Files that must be copied verbatim to the output
│   └─ CNAME               # Custom domain for GitHub Pages
├─ package.json            # npm/Bun scripts, dependencies, version
├─ tsconfig.json           # TypeScript config with path alias "@/*"
├─ vite.config.ts          # Vite configuration (plugins, alias, static copy)
├─ biome.json              # Linter/formatter configuration
└─ README.md               # Project overview for humans
```

---

## Deployment workflow (GitHub Actions)

The **`deploy.yml`** workflow performs the following steps:

1. **Checkout** the repository with full history (`fetch-depth: 0`).
2. **Configure Git author** (`github-actions[bot]`) so that the commit created by `gh-pages` has a valid identity.
3. **Set up Bun** (latest version) – the runtime used for building and testing.
4. **Install dependencies** (`bun install --frozen-lockfile`).
5. **Run the test suite** (`bun test --coverage`).
6. **Deploy** using the existing `npm` script:
   ```bash
   bun run deploy -- -t $GITHUB_TOKEN
   ```
   This runs `bun run build && gh-pages -d dist -t $GITHUB_TOKEN`, which:
   - Builds the static site with Vite.
   - Copies the `static/` folder (including `CNAME`) into `dist/` via `vite-plugin-static-copy`.
   - Pushes the `dist/` folder to the `gh-pages` branch using the provided token.
7. **Upload coverage** to Codecov (optional).

The workflow requests the `contents: write` permission at both the workflow and job level, which is required for the push.

---

## CI author/committer configuration

The error you previously saw (`could not read Username for 'https://github.com'`) occurs when Git tries to push without authentication. The workflow now:

- Sets the Git user/email globally (`git config --global user.name "github-actions[bot]"` etc.).
- Passes the token explicitly to `gh-pages` via the `-t` flag (`bun run deploy -- -t $GITHUB_TOKEN`).

Both steps guarantee that the push succeeds without needing a separate PAT, as the default `GITHUB_TOKEN` has sufficient rights when `contents: write` is granted.

---

## How AI agents should interact with this repo

- **Reading the repo**: Use the `AGENTS.md` file to quickly understand the purpose, layout, and deployment process.
- **Modifying code**: Follow the existing path alias (`@/…`) conventions; any new files should be placed under `src/` and referenced via the alias.
- **Running locally**:
  ```bash
  bun install
  bun run dev   # start Vite dev server
  bun run test  # run the test suite
  ```
- **Deploying**: Push to the `master` (or `main`) branch; the CI will automatically build and publish to GitHub Pages.
- **Adding new CI steps**: Extend `.github/workflows/deploy.yml` – keep the `git config` step and the `-t $GITHUB_TOKEN` flag when invoking `gh-pages`.

---

## Future maintenance notes

- Keep the `vite-plugin-static-copy` target up‑to‑date if you add more static assets.
- When bumping the version in `package.json`, the `Footer` component will automatically display the new version (imported from `package.json`).
- If you ever switch to a different branch for GitHub Pages, update the `base` field in `vite.config.ts` accordingly (e.g., `base: '/my-branch/'`).

---

*Generated for AI agents to aid future development and automation.*
