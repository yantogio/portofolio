## MODIFIED Requirements

### Requirement: Free domain
The production site SHALL be served over HTTPS at `https://yantogio.vercel.app`, and the `site` setting SHALL be that URL so canonical, hreflang, and Open Graph URLs point to it. Previous Vercel URLs SHALL redirect to it. No other custom domain is planned.

#### Scenario: Canonical points to the final domain
- **WHEN** the head of any page on `https://yantogio.vercel.app` is inspected
- **THEN** its canonical, hreflang, and `og:url` links start with `https://yantogio.vercel.app`

#### Scenario: Old URL redirects
- **WHEN** a visitor opens `https://portofolio-steel-beta-47.vercel.app`
- **THEN** they are redirected to `https://yantogio.vercel.app`
