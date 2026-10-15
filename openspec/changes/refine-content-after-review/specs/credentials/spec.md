## ADDED Requirements

### Requirement: Public CV content
The CV published at `public/cv/CV-Gionova-ID.pdf` SHALL be a public version of the owner's CV. It SHALL contain the same professional content (summary, experience, projects, education, organisation, certifications, skills) and contact details limited to email, LinkedIn, GitHub, and "Bekasi, Indonesia". It SHALL NOT contain the phone number, date or place of birth, gender, religion, marital status, or street-level address, and SHALL NOT claim that a system is still in active use when it is not. The source used to generate the PDF SHALL be kept in the repository so the PDF can be regenerated after CV changes.

#### Scenario: CV button appears
- **WHEN** the homepage is opened after the CV is added
- **THEN** a "Download CV" button is visible in the hero and in the contact section, linking to `/cv/CV-Gionova-ID.pdf`

#### Scenario: English site uses the Indonesian CV
- **WHEN** a visitor on `/en` views the CV button
- **THEN** it links to `/cv/CV-Gionova-ID.pdf` and states that the CV is in Indonesian

#### Scenario: No personal data in the CV
- **WHEN** the text of the published CV PDF is extracted
- **THEN** it contains no phone number, birth date, gender, religion, marital status, or district-level address

#### Scenario: Regenerate after an update
- **WHEN** the owner edits the CV source and runs the documented generate command
- **THEN** `public/cv/CV-Gionova-ID.pdf` is rebuilt from that source
