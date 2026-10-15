---
title: Audited against interface guidelines
stage: Audit
order: 4
image: ./v2-project.png
imageAlt: "A case-study page in the second version, with an architecture diagram generated from data."
---

The interface code was audited against Vercel's Web Interface Guidelines. There were no severe findings. What was fixed:

- certificate months now use `Intl.DateTimeFormat` instead of hand-written month names,
- technology names and code identifiers carry `translate="no"` so browser auto-translation does not mangle them,
- the main font is preloaded to reduce text shifting on load,
- long code tokens can wrap on phone screens,
- the status indicator stops pulsing after a few beats,
- English button labels use Title Case.

A final anti-slop pass scanned the build output: no em-dashes, no generic phrases, and every number traces back to a repository or my CV.
