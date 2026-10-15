# credentials Specification

## Purpose
Daftar sertifikat dari folder PDF, ringkasan pendidikan, dan unduhan CV sesuai bahasa aktif.

## Requirements

### Requirement: Certificates from a folder
Certificates SHALL be stored in `src/content/certificates/` as one entry per certificate: a PDF file plus metadata (title, issuer, date, optional thumbnail image). The site SHALL list them newest first, and each entry SHALL link to its PDF opened in a new tab.

#### Scenario: Add a certificate
- **WHEN** the owner adds a PDF and its metadata entry to the folder and rebuilds
- **THEN** the certificate appears in the list in date order, linking to the PDF

#### Scenario: No thumbnail
- **WHEN** a certificate has no thumbnail image
- **THEN** it renders as a text entry (title, issuer, date) without a broken image

#### Scenario: PDF not yet provided
- **WHEN** a certificate's metadata exists but its PDF file is missing
- **THEN** the entry is shown without a link instead of a broken link

### Requirement: Initial certificates
The list SHALL start with the six certificates from the CV: Database Design (Oracle Academy, Mar 2026), Operator Teknis Pilkades Digital Kabupaten Bekasi (PT Bentang Inspirasi Teknologi, 2026), Java Fundamentals (Oracle Academy, Sep 2025), Java Programming (Oracle Academy, Aug 2024), Junior Network Administrator (Digital Talent Scholarship Kominfo VSGA, Feb 2024), and IT Essentials (Cisco Networking Academy, Feb 2023).

#### Scenario: Count on launch
- **WHEN** the credentials section renders at launch
- **THEN** six certificates are listed

### Requirement: Education summary
The credentials section SHALL show S1 Teknik Informatika, Universitas Bani Saleh (2022–2026, GPA 3.58/4.00, thesis graded A) and SMK Teknik Pemesinan, SMK Saraswati Salatiga (2015–2018).

#### Scenario: Education shown
- **WHEN** a visitor views the credentials section
- **THEN** both education entries are shown with years

### Requirement: CV download follows active language
The site SHALL offer `public/cv/CV-Gionova-ID.pdf` on Indonesian pages and `public/cv/CV-Gionova-EN.pdf` on English pages. If the file for the active language is missing, the site SHALL fall back to the other language's file and label it with its language.

#### Scenario: Download on English site
- **WHEN** a visitor on `/en` activates "Download CV"
- **THEN** `CV-Gionova-EN.pdf` is downloaded

#### Scenario: English CV missing
- **WHEN** only the ID CV exists and a visitor on `/en` views the CV button
- **THEN** the button links to the ID CV and says it is in Indonesian
