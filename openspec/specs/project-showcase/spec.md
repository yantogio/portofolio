# project-showcase Specification

## Purpose
Koleksi project berbasis folder, kartu project, halaman case study, galeri screenshot, diagram arsitektur, dan lightbox foto.

## Requirements

### Requirement: One folder per project
Each project SHALL live in `src/content/projects/<slug>/` containing `id.md` and `en.md` (frontmatter plus case-study body), an optional `cover` image, and an optional `screens/` folder. The frontmatter SHALL be schema-validated with fields: `title`, `summary`, `role`, `period`, `stack` (list), `repo` (URL, optional), `demo` (URL, optional), `highlights` (list of short metric strings), `featured` (boolean), `order` (number), `confidential` (boolean, default false).

#### Scenario: Add a new project
- **WHEN** the owner copies an existing project folder, edits its text and images, and rebuilds
- **THEN** the new project appears in the project list and gets its own detail page with no code change

#### Scenario: Invalid frontmatter
- **WHEN** a project's `repo` value is not a valid URL or `title` is missing
- **THEN** the build fails with a message naming the file and field

### Requirement: Conditional link buttons
A project card and detail page SHALL show a GitHub button only when `repo` is set and the project is not confidential, and a Live button only when `demo` is set. The card title SHALL link to the case study page, and the whole card SHALL be clickable without blocking the GitHub and Live buttons. External links SHALL open in a new tab with `rel="noopener noreferrer"` and an accessible label indicating they leave the site.

#### Scenario: Project without demo
- **WHEN** a project has `repo` but no `demo`
- **THEN** the GitHub button and the title link are shown and no Live button is rendered

#### Scenario: Demo added later
- **WHEN** the owner adds a `demo` URL to a project and rebuilds
- **THEN** a Live button linking to that URL appears

### Requirement: Cover image with diagram fallback
If a project folder contains a `cover` image, it SHALL be used as the card visual. If not, the card SHALL render the project's architecture diagram from its frontmatter, or no visual if the project has no diagram.

#### Scenario: No cover image
- **WHEN** a project folder has no cover image
- **THEN** the card renders the architecture diagram and the page has no broken image

### Requirement: Automatic screenshot gallery
All images in a project's `screens/` folder SHALL be shown on its detail page as a gallery, ordered by filename. Each image SHALL be optimized at build time and SHALL have alt text derived from the filename unless a caption is given in frontmatter.

#### Scenario: Add screenshot
- **WHEN** the owner drops `03-report.png` into `screens/`
- **THEN** it appears third in the gallery after rebuild

#### Scenario: Empty screens folder
- **WHEN** `screens/` is missing or empty
- **THEN** the detail page renders without a gallery section

### Requirement: Architecture diagram support
A case study SHALL be able to include an architecture diagram that is readable without screenshots. Confidential projects (`confidential: true`) SHALL show only diagrams and text, never screenshots or a repo link.

#### Scenario: Denso internship case study
- **WHEN** the Denso facility-reporting case study is viewed
- **THEN** it shows the data flow Microsoft Forms → Power Automate → OneDrive → Python ETL → SQL Server → CodeIgniter 3 web app as a diagram and contains no screenshots or repository link

#### Scenario: Vehicle Registry structure
- **WHEN** the Vehicle Registry case study is viewed
- **THEN** it shows a Controller → Service → Repository diagram

### Requirement: Initial project set
The site SHALL launch with case studies for Project-web-HMTI, smart-wealth-monitor, airline-voucher-seats, vehicle-registry, and the Denso facility-reporting system, each with content based on the corresponding README and `openspec/` folder (or the CV for Denso) and reviewed by the owner. Quoted metrics SHALL match the source (e.g. 98 tests / ±16,000 assertions, 39 tests, 10 OpenSpec capabilities, 5 modules).

#### Scenario: Placement on homepage
- **WHEN** the homepage renders
- **THEN** only projects with `featured: true` appear, each inside the Experience chapter configured for it (see home-page spec)

#### Scenario: Profile link
- **WHEN** a visitor reaches the end of the project list
- **THEN** a link to `https://github.com/yantogio` is shown for viewing all repositories

### Requirement: Image lightbox
Every content photo on the site (hero portrait, Experience chapter photos, project covers, screenshot galleries, and build-log images) SHALL open in a full-screen lightbox when clicked. The lightbox SHALL show the image as large as fits the viewport, its caption, and a link to the original full-size file opening in a new tab. Photos sharing a lightbox group (such as one chapter's photo stack) SHALL be browsable with previous/next buttons and the arrow keys, with a position counter. It SHALL close on Escape, on its close button, and on a click outside the image, returning focus to the photo that opened it (or to the stack's front photo). Modifier-clicks (Ctrl/Cmd/Shift) SHALL keep the browser's default behaviour.

#### Scenario: Open a photo
- **WHEN** a visitor clicks a screenshot in a project gallery
- **THEN** a full-screen lightbox shows that screenshot with its caption and an "Open full size" link

#### Scenario: Close and return focus
- **WHEN** the lightbox is open and the visitor presses Escape
- **THEN** the lightbox closes and focus returns to the clicked photo

#### Scenario: Open in new tab
- **WHEN** a visitor Ctrl-clicks a photo
- **THEN** the image opens in a new tab and no lightbox is shown
