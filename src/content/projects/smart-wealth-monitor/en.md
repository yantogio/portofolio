---
title: Smart Wealth Monitor
summary: An investment dashboard for Indonesian stocks and gold that flags assets trading below their 30-day high and simulates dollar-cost-averaging returns.
role: Sole developer
period: 2026
stack: [Laravel 13, PHP 8.3, Blade, Tailwind CSS 4, Chart.js, SQLite]
repo: https://github.com/yantogio/smart-wealth-monitor
highlights: ["39 automated tests", "GitHub Actions CI", "10 specified capabilities", "Runs offline in one minute"]
featured: true
order: 3
diagram:
  caption: Calculations live in services, not in controllers or views.
  nodes:
    - label: Yahoo Finance · metalpriceapi
      note: IDX stocks and gold
    - label: API clients
      note: failures logged, never thrown
    - label: sync:prices
      note: fetches only missing days
    - label: historical_prices
      note: unique(asset, date)
    - label: Momentum, DCA, SMA
      note: calculation services
    - label: Blade dashboard
---

## The problem

I wanted to know when an asset I already wanted to own was trading lower than it had in recent weeks, without opening several apps and doing the maths by hand.

## What it does

- **Discount detection.** Each asset is compared with its trailing 30-day high. When the latest close is more than 5% below it, the asset is flagged *Potensi Diskon* (potential discount).
- **DCA simulator.** Pick an asset, a monthly amount, and a start month. The simulator buys at the first close of each month and reports capital, units, current value, and how many months actually had data. Gaps are shown, not hidden.
- **Dual-source sync.** Stocks from Yahoo Finance, gold from metalpriceapi. Sync is *catch-up*: only days not yet stored are fetched, so it is safe to re-run.

## How I built it

The project was built spec-first with OpenSpec: ten capabilities had written specs with `WHEN … THEN` scenarios before any code, and those scenarios map directly onto tests.

- **39 tests** cover the momentum and DCA calculations, both API clients, the sync and backfill commands, demo seeding, and rendering of every page. They run on in-memory SQLite with no network, so CI needs no service containers.
- **GitHub Actions CI** runs the whole suite on every push.
- **Real demo data.** The repository ships about a year of genuine closing prices; `composer setup` gives a populated dashboard with no API key and no database server. Dates are shifted so the 30-day window never empties, but prices are untouched.

## Deliberate limits

The watchlist is fixed at four assets (BBCA, BBRI, TLKM, gold) and there is no authentication. It is a local, single-user tool, and the README says so plainly. The goal was a focused, well-specified tool rather than a broad one.
