## ADDED Requirements

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
The production site SHALL be reachable at `yantogio.is-a.dev` over HTTPS once the is-a.dev registration is approved, and at its `*.vercel.app` URL in the meantime.

#### Scenario: Before is-a.dev approval
- **WHEN** the is-a.dev pull request is not yet merged
- **THEN** the site is still reachable at its `*.vercel.app` URL

#### Scenario: After approval
- **WHEN** the is-a.dev record is live and the domain is added in Vercel
- **THEN** `https://yantogio.is-a.dev` serves the site with a valid certificate

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
