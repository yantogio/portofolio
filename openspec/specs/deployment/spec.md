# deployment Specification

## Purpose
Build statis, deploy otomatis ke Vercel, domain, analytics privat, kepemilikan akun, dan kompatibilitas browser lama.

## Requirements

### Requirement: Static build
The site SHALL build to static files with a single command (`npm run build`) and SHALL NOT require a server, database, or environment secrets at runtime.

#### Scenario: Clean build
- **WHEN** `npm ci && npm run build` runs on a clean checkout
- **THEN** it completes successfully and outputs static HTML for every page in both languages

### Requirement: Continuous deployment on Vercel
The GitHub repository SHALL be connected to a Vercel project on the free Hobby plan so that each push to the main branch deploys production automatically and each other branch gets a preview URL.

#### Scenario: Push to main
- **WHEN** the owner pushes a content change to `main`
- **THEN** the production site shows the change after the Vercel build finishes, with no manual step

### Requirement: Free domain
The production site SHALL be reachable over HTTPS at its `*.vercel.app` URL. A custom free domain (`yantogio.is-a.dev`) MAY be added later; when it is, the `site` setting SHALL be updated to it.

#### Scenario: Vercel URL
- **WHEN** a visitor opens `https://portofolio-steel-beta-47.vercel.app`
- **THEN** the site is served over HTTPS and its canonical links point to that URL

#### Scenario: Custom domain added later
- **WHEN** the owner adds `yantogio.is-a.dev` in Vercel after the is-a.dev registration is merged
- **THEN** the `site` setting is changed to `https://yantogio.is-a.dev` and the canonical links follow it

### Requirement: Private analytics
Visitor analytics SHALL be collected with Vercel Web Analytics and SHALL be visible only in the owner's Vercel dashboard. The site SHALL NOT display visitor counts or any analytics data publicly, and SHALL NOT set tracking cookies that require a consent banner.

#### Scenario: Visitor view
- **WHEN** any page is viewed by a visitor
- **THEN** no visitor statistics are shown and no cookie banner is required

#### Scenario: Owner view
- **WHEN** the owner opens the project's Analytics tab in the Vercel dashboard
- **THEN** page views and top pages are visible there

### Requirement: Account ownership
All accounts (GitHub, Vercel, is-a.dev registration) SHALL be created and owned by the owner. Credentials SHALL never be shared with or stored by the assistant or committed to the repository.

#### Scenario: Repository secrets check
- **WHEN** the repository is scanned before the first push
- **THEN** it contains no passwords, tokens, or `.env` files with secrets

### Requirement: Older browser compatibility
The built CSS SHALL render the site's layout, colors, and typography in browsers that do not support CSS cascade layers or media query range syntax (such as Chrome for Android before version 99 and outdated in-app WebViews), without changing how modern browsers render it. CSS files whose content changes SHALL receive new file names so cached copies are not reused.

#### Scenario: No cascade layers in output
- **WHEN** `npm run build` completes
- **THEN** no CSS file in `dist/` contains `@layer` or `width>=` media queries

#### Scenario: Modern rendering unchanged
- **WHEN** full-page screenshots of the build are compared with the previous build at 390px
- **THEN** they are pixel-identical

#### Scenario: Cached CSS is not reused
- **WHEN** the CSS content changes in a new deploy
- **THEN** the HTML references a CSS file name that differs from the previous deploy
