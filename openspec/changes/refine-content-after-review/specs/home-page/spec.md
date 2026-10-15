## MODIFIED Requirements

### Requirement: Hero leads with the owner's name
The hero SHALL show the availability status from the profile config, the owner's full name as a two-line headline on desktop, a professional summary of at most three lines based on the CV, a primary action to view the experience section, the CV download when a CV file exists, and the profile photo. The summary SHALL state in its first sentence that the PT Denso experience was an internship, and SHALL describe the working method in plain language rather than jargon such as "specification-driven development". It SHALL NOT use slogans, greeting emoji, or phrases such as "passionate developer".

#### Scenario: Hero on a small laptop
- **WHEN** the homepage is opened at 1366×768
- **THEN** the name, summary, and primary action are visible without scrolling, and the name occupies exactly two lines

#### Scenario: Internship stated upfront
- **WHEN** a visitor reads the hero summary on the ID or EN homepage
- **THEN** the first sentence says the twelve months at PT Denso Manufacturing Indonesia were an internship ("magang" / "internship") as a Software Developer

### Requirement: Capabilities section
The Capabilities section SHALL list five skill areas taken from the CV, in this order: Backend, Frontend, Database, Testing & Tools, and Data & Automation. Technologies SHALL be grouped by what they are: database engines and ORMs (SQL Server, MySQL, SQLite, Prisma, Eloquent) under Database, and testing or delivery tools (PHPUnit, GitHub Actions CI, OpenSpec, Git) under Testing & Tools. Each area SHALL reveal its technology list and one linked project as proof, and each area SHALL use a different proof project. Areas SHALL NOT carry self-assessed proficiency labels. On devices with a fine pointer, an area SHALL reveal on hover or keyboard focus; on touch devices and screens narrower than 768px, all areas SHALL be revealed by default.

#### Scenario: Hover on desktop
- **WHEN** a desktop visitor hovers the "Database" row
- **THEN** the other rows dim and the Database row shows SQL Server, MySQL, SQLite, Prisma, and Eloquent with a link to its proof project

#### Scenario: ORMs are not testing tools
- **WHEN** the Testing & Tools area is revealed
- **THEN** it does not list Prisma or Eloquent

#### Scenario: Phone
- **WHEN** the section is viewed at 390px width
- **THEN** every area's technologies and proof link are visible without interaction

#### Scenario: Keyboard
- **WHEN** a keyboard user tabs to a proof link inside a collapsed row
- **THEN** that row expands so the focused link is visible

### Requirement: How I Work section
The How I Work section SHALL describe four stages (Specification, Development, Testing, Release) as stacked cards. Each stage SHALL link to concrete evidence from the projects or the build log. Text and evidence labels on the homepage SHALL be understandable to non-technical readers: named tools (such as OpenSpec) SHALL be accompanied by a one-sentence plain explanation, and metrics SHALL be phrased by what they mean rather than as raw counts of internal test units.

#### Scenario: Evidence links
- **WHEN** a visitor reads the Testing stage
- **THEN** it cites a real metric (98 tests in Airline Voucher Seats, with the seat rules tested 250 times per aircraft type) and links to that case study

#### Scenario: No raw assertion count on the homepage
- **WHEN** the homepage text is searched for "assertion"
- **THEN** no match is found, while the Airline Voucher Seats case study still mentions about 16,000 assertions

#### Scenario: OpenSpec explained
- **WHEN** a visitor reads the Specification stage
- **THEN** it explains that requirements are written first as testable scenarios before coding, in plain words alongside the OpenSpec name
