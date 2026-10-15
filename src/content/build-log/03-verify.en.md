---
title: Checked in a real browser
stage: Verification
order: 3
image: ./v2-hero.png
imageAlt: "The second version at 1440 px: a two-line headline with the main button visible without scrolling."
---

Every page was opened with Playwright in both languages, at 360, 390, 1366, and 1440 px wide. The checks:

- **No horizontal scroll** at any width.
- **The hero fits a small laptop** (1366×768): the main button ends at 620 px of 768 px.
- **The language switch** keeps visitors on the same page instead of sending them home.
- **The Live button** only appears on projects that are actually online.
- **Keyboard focus** is visible on every clickable element.
- **Reduced motion:** when the device asks for less animation, all content shows immediately.

These checks caught real problems in both versions. In the first, the hero headline broke into three lines. In the second, with reduced motion on, the two headline lines briefly ran together, and a six-step diagram was too cramped inside its card. Each was fixed and checked again.

An automated privacy check also runs on every build. The build fails if a page contains a phone-number pattern or other personal data.
