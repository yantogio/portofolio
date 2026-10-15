# site-i18n Specification

## Purpose
Routing dua bahasa (Indonesia default di `/`, English di `/en`), pengalih bahasa yang menjaga halaman aktif, dan string UI terjemahan.

## Requirements

### Requirement: Indonesian is the default language
The site SHALL serve Bahasa Indonesia content at unprefixed routes (`/`, `/projects/<slug>`, `/how-i-built-this`) and English content under the `/en` prefix (`/en`, `/en/projects/<slug>`, `/en/how-i-built-this`).

#### Scenario: Visitor opens root URL
- **WHEN** a visitor opens `/`
- **THEN** the homepage is rendered in Bahasa Indonesia with `<html lang="id">`

#### Scenario: Visitor opens English URL
- **WHEN** a visitor opens `/en`
- **THEN** the homepage is rendered in English with `<html lang="en">`

#### Scenario: No automatic redirect
- **WHEN** a visitor whose browser language is English opens `/`
- **THEN** the site SHALL NOT redirect automatically and SHALL show Bahasa Indonesia content

### Requirement: Language switcher preserves the current page
Every page SHALL show a language switcher that links to the equivalent page in the other language.

#### Scenario: Switch on a project page
- **WHEN** a visitor on `/projects/smart-wealth-monitor` activates the switcher
- **THEN** they are taken to `/en/projects/smart-wealth-monitor`

#### Scenario: Switch back to Indonesian
- **WHEN** a visitor on `/en/how-i-built-this` activates the switcher
- **THEN** they are taken to `/how-i-built-this`

### Requirement: UI strings are translated in one place
All fixed UI text (navigation, section titles, button labels, status labels) SHALL come from a single translation dictionary with `id` and `en` entries, and the build SHALL fail if a key exists in one language but not in the other.

#### Scenario: Missing translation key
- **WHEN** a key is added to the `id` dictionary but not to `en`
- **THEN** the type check or build reports an error

### Requirement: Alternate language metadata
Each page SHALL declare `hreflang` alternate links for `id` and `en` and a canonical URL.

#### Scenario: Inspect page head
- **WHEN** the head of `/projects/vehicle-registry` is inspected
- **THEN** it contains `<link rel="alternate" hreflang="id">` pointing to `/projects/vehicle-registry` and `hreflang="en"` pointing to `/en/projects/vehicle-registry`
