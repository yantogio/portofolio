---
title: HMTI Student Organisation System
summary: "A web app that replaced scattered spreadsheets and personal Drive folders for a student association: members, dues, documents, and a public page in one place."
role: Sole developer (final-year thesis)
period: 2026
stack: [Vue 3, Pinia, NestJS, Prisma, SQLite, Google Drive API, Passport JWT]
repo: https://github.com/yantogio/Project-web-HMTI
highlights: ["Thesis graded A", "84.47% UAT acceptance", "16 OpenSpec changes", "Deployed to a VPS"]
featured: true
order: 1
diagram:
  caption: Document upload and download. Files never sit on the application server.
  nodes:
    - label: Vue 3 SPA
      note: Pinia, admin / member roles
    - label: NestJS API
      note: JWT + Google OAuth, 100 req/min rate limit
    - label: Prisma + SQLite
      note: metadata, index on driveFileId
    - label: Google Drive API
      note: streamed in 64 KB chunks, retried on 429
---

## The problem

The association's records lived in spreadsheets and Google Drive folders owned by different board members. Every handover lost part of the archive; dues were tallied by hand and arrears were hard to track. As the association's treasurer, I lived with this problem myself.

## Approach

I built a single-page application with five modules (**Members, Finance, Documents, Showcase, Profile**) plus a public landing page that needs no login.

Development was spec-first: every change was written as an OpenSpec proposal first (16 archived changes, 25 specs), then implemented with AI assistance and checked against the scenarios in the spec.

## Technical decisions that mattered

- **Files are streamed, not buffered.** Documents and videos live in Google Drive. The API pipes them through in 64 KB chunks, so a 100 MB video costs roughly one chunk of memory per request.
- **Surviving Drive rate limits.** A 429 is retried with exponential backoff (1, 2, 4 seconds, up to five attempts). A 403/404 is not, since a missing file will not fix itself.
- **Automatic dues.** Dues rules are configurable; monthly charges and late fees are generated automatically, with a per-member arrears report.
- **Bulk import.** Members can be imported from an Excel template the app generates.
- **Operational safety.** Per-IP rate limiting, periodic heap logging, and graceful shutdown that closes streams when a client disconnects mid-download.

## Outcome

- Passed black-box testing and User Acceptance Testing with **84.47%** acceptance.
- Defended at the thesis examination with an **A**.
- Deployed to a VPS and used by the HMTI board during the thesis period. The code remains open on GitHub.

## What I learned

The hardest problems came after deployment: API base URLs, JWT configuration in production, and performance on mobile networks. Each fix was recorded as its own change. The history is in the repository's `openspec/` folder.
