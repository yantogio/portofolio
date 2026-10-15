## MODIFIED Requirements

### Requirement: Personal data privacy
The site SHALL NOT publish the owner's phone number, date or place of birth, religion, marital status, gender field, or street-level address, in its pages or in the CV PDF it serves. The location SHALL be shown only as "Bekasi, Indonesia".

#### Scenario: Audit built output
- **WHEN** `npm run build` runs `scripts/check-privacy.mjs` over the built HTML
- **THEN** no phone-number pattern or labelled birth date, religion, marital status, or gender field is found, and the build fails if one is

#### Scenario: Audit the CV PDF
- **WHEN** `npm run build` runs `scripts/check-privacy.mjs` and a PDF exists in `public/cv/`
- **THEN** the text extracted from that PDF is checked with the same patterns, and the build fails if a match is found
