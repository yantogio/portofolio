# home-page Specification

## Purpose
Susunan dan isi beranda: hero, keahlian, pengalaman dengan project per periode, metode kerja, kredensial, kontak, foto per bab, dan navigasi.

## Requirements

### Requirement: Homepage sections
The homepage SHALL present, in this order: Hero, Capabilities, Experience (a chronological journey that embeds the projects), How I Work, Credentials, and Contact. Each section SHALL have an anchor id (`capabilities`, `journey`, `process`, `credentials`, `contact`) usable from the navigation.

#### Scenario: Navigate to a section
- **WHEN** a visitor activates the "Kontak" link in the menu
- **THEN** the page scrolls to the contact section and the URL hash becomes `#contact`

### Requirement: Hero leads with the owner's name
The hero SHALL show the availability status from the profile config, the owner's full name as a two-line headline on desktop, a professional summary of at most three lines based on the CV, a primary action to view the experience section, the CV download when a CV file exists, and the profile photo. It SHALL NOT use slogans, greeting emoji, or phrases such as "passionate developer".

#### Scenario: Hero on a small laptop
- **WHEN** the homepage is opened at 1366×768
- **THEN** the name, summary, and primary action are visible without scrolling, and the name occupies exactly two lines

### Requirement: Capabilities section
The Capabilities section SHALL list four skill areas (Backend, Frontend, Data & Automation, Testing & Quality) taken from the CV. Each area SHALL reveal its technology list and one linked project as proof. On devices with a fine pointer, an area SHALL reveal on hover or keyboard focus; on touch devices and screens narrower than 768px, all areas SHALL be revealed by default.

#### Scenario: Hover on desktop
- **WHEN** a desktop visitor hovers the "Backend" row
- **THEN** the other rows dim and the Backend row shows its technologies and a link to the Airline Voucher Seats case study

#### Scenario: Phone
- **WHEN** the section is viewed at 390px width
- **THEN** every area's technologies and proof link are visible without interaction

#### Scenario: Keyboard
- **WHEN** a keyboard user tabs to a proof link inside a collapsed row
- **THEN** that row expands so the focused link is visible

### Requirement: Experience journey with embedded projects
The Experience section SHALL present the career path in chronological order: SMK Teknik Pemesinan (2015-2018), Logistics Staff (2018-2020), Sales Marketing Telkom IndiHome (2020-2022), Informatics Engineering degree with HMTI treasurer role (2022-2026), Software Developer Intern at PT Denso Manufacturing Indonesia (Jan-Dec 2025), and graduation (2026). Each chapter SHALL show its year, title, place, and a factual description. Projects SHALL appear inside the chapter of the period they were built, as configured in the homepage content file; featured projects not assigned to any chapter SHALL appear in the last chapter.

#### Scenario: Projects placed by period
- **WHEN** the Experience section renders
- **THEN** the Denso case study appears in the 2025 chapter and HMTI, Airline Voucher Seats, Smart Wealth Monitor, and Vehicle Registry appear in the 2026 chapter

#### Scenario: New featured project without a chapter
- **WHEN** a new project with `featured: true` is added but not listed in any chapter
- **THEN** it appears in the 2026 chapter after rebuild

### Requirement: Optional chapter photos
Each Experience chapter SHALL display every photo found for its year, either files in `src/assets/journey/` whose name starts with the year (`2025.jpg`, `2025 (2).jpg`, `2025-3.jpg`) or any file in `src/assets/journey/<year>/`, ordered by filename with the bare year first. A chapter with no photos SHALL render without an image. A single photo SHALL render as a plain framed image. Two or more photos SHALL render as a stack that brings the next photo to the front every 5 seconds; the rotation SHALL pause while hovered or focused, while the stack is off-screen, while the tab is hidden, and SHALL not run when the visitor prefers reduced motion. Only the front photo SHALL be focusable, and opening it SHALL show all photos of that chapter in the lightbox with previous/next navigation.

#### Scenario: Add a chapter photo
- **WHEN** the owner adds `src/assets/journey/2015.jpg` and rebuilds
- **THEN** the 2015 chapter shows that photo, optimized, and it opens in the lightbox when clicked

#### Scenario: Several photos in one chapter
- **WHEN** `2025.jpg` and `2025 (2).jpg` exist
- **THEN** the 2025 chapter shows a stack with `2025.jpg` in front, and after 5 seconds `2025 (2).jpg` comes to the front

#### Scenario: Pause on hover
- **WHEN** a visitor hovers the stack
- **THEN** the front photo does not change until the pointer leaves

#### Scenario: Browse in the lightbox
- **WHEN** a visitor opens the front photo of a stack and presses the right arrow key
- **THEN** the lightbox shows the next photo of the same chapter and a "2 / 2" style counter

### Requirement: How I Work section
The How I Work section SHALL describe four stages (Specification, Development, Testing, Release) as stacked cards. Each stage SHALL link to concrete evidence from the projects or the build log.

#### Scenario: Evidence links
- **WHEN** a visitor reads the Testing stage
- **THEN** it cites a real metric (98 tests in Airline Voucher Seats) and links to that case study

### Requirement: Contact without a form
The Contact section SHALL state the roles the owner is open to and provide a mailto email link, LinkedIn, GitHub, and the CV download, and SHALL NOT include a contact form.

#### Scenario: Contact options
- **WHEN** a visitor views the Contact section
- **THEN** they see the email, LinkedIn, GitHub, and CV links and no input fields

### Requirement: Navigation does not cover content
The site header SHALL scroll away with the page. A round menu button SHALL remain available in the top-right corner (always on screens narrower than 1024px; on wider screens only after the header has scrolled out of view) and SHALL open a full-screen menu dialog containing the section links, email, social links, and the language switch. The dialog SHALL close on Escape, on its close button, and when a link is chosen, returning focus to the menu button.

#### Scenario: Desktop before scrolling
- **WHEN** the homepage is opened at 1440px width
- **THEN** the header links are visible and the round menu button is hidden

#### Scenario: Desktop after scrolling
- **WHEN** the visitor scrolls past the header
- **THEN** the round menu button appears and nothing else stays fixed over the content

#### Scenario: Close with Escape
- **WHEN** the menu dialog is open and the visitor presses Escape
- **THEN** the dialog closes and focus returns to the menu button
