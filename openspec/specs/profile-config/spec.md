# profile-config Specification

## Purpose
Satu sumber data identitas pemilik (nama, headline, status open-to-work, kontak, foto) beserta aturan privasi data pribadi.

## Requirements

### Requirement: Single profile configuration file
The site SHALL read the owner's identity data from one configuration file: full name, short name ("Yanto"), headline (ID and EN), location label, email, LinkedIn URL, GitHub URL, and the open-to-work status.

#### Scenario: Change headline
- **WHEN** the owner edits the headline in the profile file and rebuilds
- **THEN** every page that shows the headline displays the new text, with no other file changed

### Requirement: Open-to-work status toggle
The profile file SHALL contain an `openToWork` boolean and a status text in both languages. When `openToWork` is true the site SHALL show an availability indicator with that text. When it is false the site SHALL show the alternative status text (for example the current job) or nothing if that text is empty.

#### Scenario: Open to work
- **WHEN** `openToWork` is `true` with text "Terbuka untuk peran Software Developer · Bekasi / Remote"
- **THEN** the hero shows that text as an availability indicator on the ID site and the English text on the EN site

#### Scenario: Employed
- **WHEN** the owner sets `openToWork` to `false` and fills the current-status text
- **THEN** the availability indicator is no longer shown and the current-status text appears instead

### Requirement: Profile photo from folder
The site SHALL use `src/assets/me/portrait.jpg` as the profile photo in the hero. It SHALL be optimized at build time, SHALL have meaningful alt text in the active language, and SHALL open in the lightbox when clicked.

#### Scenario: Replace photo
- **WHEN** the owner overwrites `portrait.jpg` with a new file and rebuilds
- **THEN** the new photo appears, resized and compressed, with no code change

#### Scenario: Photo missing
- **WHEN** `portrait.jpg` does not exist
- **THEN** the build succeeds and the hero shows a neutral placeholder instead of a broken image

### Requirement: Personal data privacy
The site SHALL NOT publish the owner's phone number, date or place of birth, religion, marital status, gender field, or street-level address. The location SHALL be shown only as "Bekasi, Indonesia".

#### Scenario: Audit built output
- **WHEN** `npm run build` runs `scripts/check-privacy.mjs` over the built HTML
- **THEN** no phone-number pattern or labelled birth date, religion, marital status, or gender field is found, and the build fails if one is
