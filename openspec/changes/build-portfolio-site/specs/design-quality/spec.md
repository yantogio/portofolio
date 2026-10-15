## ADDED Requirements

### Requirement: Single fixed theme
The site SHALL use one fixed warm dark color theme defined as design tokens (see design-direction.md), with no dark/light toggle and no automatic switch based on `prefers-color-scheme`.

#### Scenario: OS in light mode
- **WHEN** a visitor whose OS is set to light mode opens the site
- **THEN** the site shows the same dark theme as for a dark-mode visitor

### Requirement: Anti AI-slop rules
The design and copy SHALL NOT include percentage skill bars, a grid of technology logos, purple-blue default gradients, glassmorphism cards, decorative blobs, generic phrases ("passionate", "crafting digital experiences"), or placeholder text. Skills SHALL be shown in the context of the projects that use them, and project claims SHALL use real metrics.

#### Scenario: Pre-release review
- **WHEN** the site is reviewed before release
- **THEN** none of the listed patterns are present in any page

### Requirement: Design direction is documented
Before page implementation, a design direction (typography, color tokens, spacing scale, layout grid, motion rules, photo treatment) SHALL be chosen with the design-taste-frontend skill, informed by section reference images from the image-to-code workflow where image generation is available, and recorded in the change's design notes. Directions rejected by the owner SHALL be noted in the same document.

#### Scenario: Direction recorded
- **WHEN** implementation of pages starts
- **THEN** the design direction document exists and the tokens in code match it

### Requirement: Responsive layout
Every page SHALL work without horizontal scrolling at widths from 360px to 1920px.

#### Scenario: Phone width
- **WHEN** any page is rendered at 360px width
- **THEN** there is no horizontal scroll and all text is readable without zoom

### Requirement: Accessibility
Pages SHALL meet WCAG 2.2 AA for color contrast, have a logical heading order, visible keyboard focus, a skip link, alt text for images, and SHALL respect `prefers-reduced-motion` by disabling non-essential animation.

#### Scenario: Keyboard navigation
- **WHEN** a visitor tabs through the homepage
- **THEN** every interactive element receives a visible focus indicator in a logical order

#### Scenario: Reduced motion
- **WHEN** the visitor's system requests reduced motion
- **THEN** scroll and entrance animations are disabled

### Requirement: Verification and audit
Before release, every page in both languages SHALL be screenshotted with Playwright at mobile (390px) and desktop (1440px) widths, and the UI SHALL be audited with the web-design-guidelines skill. All high-severity findings SHALL be fixed before release.

#### Scenario: Release gate
- **WHEN** preparing to deploy
- **THEN** screenshots for all pages and both widths exist and the audit shows no open high-severity findings

### Requirement: Performance
The homepage SHALL ship no client-side JavaScript framework runtime unless a component needs interactivity, and SHALL score at least 90 on Lighthouse Performance, Accessibility, Best Practices, and SEO (mobile).

#### Scenario: Lighthouse run
- **WHEN** Lighthouse mobile is run against the deployed homepage
- **THEN** all four categories score 90 or higher
