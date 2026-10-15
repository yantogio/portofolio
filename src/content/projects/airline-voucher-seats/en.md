---
title: Airline Voucher Seat Assignment
summary: A REST API and UI that assigns three random seats per flight voucher, with no repeated seats and no duplicate vouchers, even under concurrent requests.
role: Sole developer
period: 2026
stack: [Laravel 13, React 19, Vite, SQLite, Eloquent]
repo: https://github.com/yantogio/airline-voucher-seats
highlights: ["98 tests", "~16,000 assertions", "Race-condition safe", "4 OpenSpec changes"]
featured: true
order: 2
diagram:
  caption: The “one voucher per flight per date” guarantee lives in the database, not in application code.
  nodes:
    - label: React 19
      note: date sent as-is (YYYY-MM-DD)
    - label: Form Request
      note: validation → 422
    - label: SeatGeneratorService
      note: draws 3 from the valid seat pool
    - label: SQLite
      note: unique(flight_number, flight_date)
    - label: Response
      note: 201 created · 409 already exists
---

## The problem

A crew member enters flight details, presses **Generate Vouchers**, and the system must assign three random seats valid for that aircraft type, and refuse to create a second voucher for the same flight on the same date.

## Technical decisions

- **Duplicate prevention lives in the database.** The `vouchers` table has a unique constraint on `(flight_number, flight_date)`. The `/api/check` endpoint is only a UI convenience; two concurrent requests can both pass it, and only the constraint stops the second write. The violation is caught narrowly and returned as **409**. Any other database error is re-thrown, and a test enforces that.
- **409, not 422.** Valid input that already exists is not a validation error. Separate status codes let the UI branch without parsing message text.
- **Seats are drawn from a valid pool.** The service enumerates every seat on that aircraft type, then draws three without replacement. An ATR has no B or E column, so a `5B` is impossible: correct by construction, not by a validation step someone has to remember.
- **Dates are locked to ISO.** Because the constraint compares strings, accepting several formats would make `2025-07-12` and `12/07/2025` two different flights. The frontend also never builds a `Date` for the wire value, so timezones cannot shift the day.

## Evidence

**98 tests with about 16,000 assertions.** Seats are random, so a single run could pass by luck. Each seat rule runs 250 times per aircraft type. Tests also cover the full validation matrix, duplicate prevention, the specification's example payloads, and CORS (a CORS break is invisible to every other test and only shows up in a browser).
