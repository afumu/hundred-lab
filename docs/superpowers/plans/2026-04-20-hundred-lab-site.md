# Hundred Lab Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Astro-based public site for `hundred-lab` that showcases the repository, external repos, formal content, and Markdown-rendered articles, ready for local preview and GitHub Pages deployment.

**Architecture:** Create a dedicated `site/` Astro app inside the repo. At build time, a small content layer will read `../content/**` from the repo root, normalize projects/products/skills/articles/videos into display data, and generate static pages. Article detail pages will render local Markdown content through a safe React Markdown component inside Astro.

**Tech Stack:** Astro, TypeScript, React integration for Markdown rendering, `react-markdown`, `remark-gfm`, Vitest, GitHub Actions Pages deploy

---

### Task 1: Scaffold The Astro Site And Tooling

**Files:**
- Create: `site/package.json`
- Create: `site/astro.config.mjs`
- Create: `site/tsconfig.json`
- Create: `site/src/env.d.ts`
- Create: `site/public/favicon.svg`
- Create: `.gitignore`
- Test: `site/src/lib/content.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { buildContentIndex } from './content'

describe('buildContentIndex', () => {
  it('loads formal content categories from the repository root', async () => {
    const index = await buildContentIndex()

    expect(index.projects.length).toBeGreaterThan(0)
    expect(index.products.length).toBeGreaterThan(0)
    expect(index.articles.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm test -- --runInBand`
Expected: FAIL because Astro app files and `buildContentIndex` do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create the Astro app shell and test tooling with:

- `astro`, `@astrojs/react`, `react`, `react-dom`
- `typescript`, `vitest`

Set `outDir` to `./dist` and configure `base` from `process.env.SITE_BASE ?? '/hundred-lab/'`.

- [ ] **Step 4: Run test to verify it passes enough to reach the next failure**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm install && npm test -- --runInBand`
Expected: test runner starts and now fails specifically because `buildContentIndex` is not implemented.

- [ ] **Step 5: Commit**

```bash
git add .gitignore site/package.json site/astro.config.mjs site/tsconfig.json site/src/env.d.ts site/public/favicon.svg site/src/lib/content.test.ts
git commit -m "chore: scaffold hundred lab astro site"
```

### Task 2: Build The Repository Content Layer

**Files:**
- Create: `site/src/lib/content.ts`
- Create: `site/src/lib/types.ts`
- Modify: `site/src/lib/content.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it('creates article slugs and reads markdown bodies', async () => {
  const index = await buildContentIndex()
  const article = index.articles.find((entry) => entry.slug === 'remote-control-codex-with-anywhere')

  expect(article).toBeDefined()
  expect(article?.markdown).toContain('Anywhere')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm test -- --runInBand`
Expected: FAIL because repository content parsing is not implemented yet.

- [ ] **Step 3: Write minimal implementation**

Implement `buildContentIndex()` to:

- read `../content/projects`, `../content/products`, `../content/skills`, `../content/articles`, `../content/videos`
- read each child directory’s `README.md`
- parse `meta.yaml` when present
- read `article.md` for articles
- normalize entries into typed collections with `title`, `slug`, `summary`, `repo`, `tags`, and `markdown` where relevant

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm test -- --runInBand`
Expected: PASS for the content loader tests.

- [ ] **Step 5: Commit**

```bash
git add site/src/lib/content.ts site/src/lib/types.ts site/src/lib/content.test.ts
git commit -m "feat: add hundred lab content loader"
```

### Task 3: Create The Site Layout And Landing Page

**Files:**
- Create: `site/src/layouts/BaseLayout.astro`
- Create: `site/src/components/Hero.astro`
- Create: `site/src/components/ContentSection.astro`
- Create: `site/src/components/RepoCard.astro`
- Create: `site/src/styles/global.css`
- Create: `site/src/pages/index.astro`

- [ ] **Step 1: Write the failing test**

Create a smoke test assertion inside `site/src/lib/content.test.ts`:

```ts
it('collects repository cards for formal project entries', async () => {
  const index = await buildContentIndex()

  expect(index.projects.some((entry) => entry.slug === 'openwork')).toBe(true)
  expect(index.projects.some((entry) => entry.slug === 'openlink')).toBe(true)
})
```

- [ ] **Step 2: Run test to verify it fails if data is not wired correctly**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm test -- --runInBand`
Expected: PASS or fail with content mismatch; fix before proceeding.

- [ ] **Step 3: Write minimal implementation**

Build the homepage with:

- strong hero section for 百创计划
- repository cards for `hundred-lab`, `openwork`, `openlink`
- sections for projects, products, skills, articles, videos
- editorial/futuristic atlas visual direction
- responsive layout and accessible contrast

- [ ] **Step 4: Run site locally**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm run build`
Expected: successful static build with generated homepage.

- [ ] **Step 5: Commit**

```bash
git add site/src/layouts/BaseLayout.astro site/src/components/Hero.astro site/src/components/ContentSection.astro site/src/components/RepoCard.astro site/src/styles/global.css site/src/pages/index.astro
git commit -m "feat: add hundred lab landing page"
```

### Task 4: Add Listing Pages And Markdown Article Rendering

**Files:**
- Create: `site/src/components/MarkdownArticle.tsx`
- Create: `site/src/pages/articles/index.astro`
- Create: `site/src/pages/articles/[slug].astro`
- Create: `site/src/pages/projects.astro`
- Create: `site/src/pages/products.astro`
- Create: `site/src/pages/skills.astro`
- Create: `site/src/pages/videos.astro`

- [ ] **Step 1: Write the failing test**

Add a route-data expectation:

```ts
it('builds a navigable article collection', async () => {
  const index = await buildContentIndex()

  expect(index.articles.map((entry) => entry.slug)).toContain('remote-control-codex-with-anywhere')
})
```

- [ ] **Step 2: Run test to verify it fails or confirms the article collection**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm test -- --runInBand`
Expected: PASS for data layer before page implementation.

- [ ] **Step 3: Write minimal implementation**

Use `react-markdown` with `remark-gfm` to render article Markdown inside Astro-generated article detail pages. Add category listing pages that reuse shared section/card styles.

- [ ] **Step 4: Run build to verify static routes**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm run build`
Expected: successful build including `/articles/index.html` and article detail output.

- [ ] **Step 5: Commit**

```bash
git add site/src/components/MarkdownArticle.tsx site/src/pages/articles/index.astro site/src/pages/articles/[slug].astro site/src/pages/projects.astro site/src/pages/products.astro site/src/pages/skills.astro site/src/pages/videos.astro
git commit -m "feat: add content listings and article pages"
```

### Task 5: Add GitHub Pages Deployment And Preview Documentation

**Files:**
- Create: `.github/workflows/deploy-site.yml`
- Modify: `README.md`

- [ ] **Step 1: Write the failing test**

Use a verification checklist instead of a unit test:

```text
Need:
- Astro build passes locally
- workflow uploads `site/dist`
- README explains local preview
```

- [ ] **Step 2: Run build to verify current gap**

Run: `cd /Users/apple/workplace-py/hundred-lab/site && npm run build`
Expected: PASS before deployment wiring; if it fails, fix before workflow creation.

- [ ] **Step 3: Write minimal implementation**

Create a GitHub Pages workflow that:

- checks out the repo
- installs dependencies in `site/`
- builds the site
- uploads `site/dist`
- deploys with Pages actions

Update root `README.md` with local preview commands.

- [ ] **Step 4: Run final verification**

Run:

```bash
cd /Users/apple/workplace-py/hundred-lab/site && npm test -- --runInBand
cd /Users/apple/workplace-py/hundred-lab/site && npm run build
```

Expected: all tests pass and production build succeeds.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/deploy-site.yml README.md
git commit -m "chore: add site deployment workflow"
```
