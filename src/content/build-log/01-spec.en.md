---
title: Spec before code
stage: Spec
order: 1
---

Before a single line of code, the site's requirements were written as an OpenSpec change called `build-portfolio-site`: a proposal, eight capability specs, a technical design, and 49 tasks.

A few of the rules, written as testable scenarios:

- **Privacy.** The build output must not contain my phone number, date of birth, religion, marital status, or street address.
- **Conditional buttons.** The Live button only appears when a project has a demo link.
- **Language.** Indonesian at `/`, English at `/en`, and the language switch keeps you on the same page.
- **One theme.** The site does not change colour with the device's dark mode, by my decision.

Case-study content was drafted from each repository's README and `openspec/` folder, then reviewed by me so every number matches its source.
