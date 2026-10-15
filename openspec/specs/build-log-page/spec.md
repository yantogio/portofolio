# build-log-page Specification

## Purpose
Halaman `/how-i-built-this` yang mendokumentasikan proses pembuatan situs.

## Requirements

### Requirement: How-I-built-this page
The site SHALL have a page at `/how-i-built-this` (and `/en/how-i-built-this`) describing how this portfolio was built: the OpenSpec proposal, the chosen design direction and why, the build process with the design skills, audit findings and how they were fixed, and before/after screenshots captured with Playwright.

#### Scenario: Visit the page
- **WHEN** a visitor opens `/how-i-built-this`
- **THEN** they see the stages spec → design direction → build → verify → audit, each with at least one concrete artifact (excerpt, screenshot, or finding)

### Requirement: Build-log content is file-based
The page content SHALL come from Markdown files and images in a dedicated content folder so new entries can be added without code changes.

#### Scenario: Add a log entry
- **WHEN** the owner adds a new Markdown entry and image to the build-log folder
- **THEN** it appears on the page after rebuild

### Requirement: Link from the main site
The page SHALL be reachable from the How I Work section and from the footer.

#### Scenario: Footer link
- **WHEN** a visitor views the footer of any page
- **THEN** a link to the build-log page in the active language is present
