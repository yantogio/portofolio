---
title: Vehicle Registry
summary: A Spring Boot CRUD application for vehicle records with a layered architecture, server-side validation, and centralised error handling.
role: Sole developer
period: 2026
stack: [Java 17, Spring Boot 3.2, Spring Data JPA, Bean Validation, H2, Bootstrap 5, jQuery]
repo: https://github.com/yantogio/vehicle-registry
highlights: ["Controller → Service → Repository", "Centralised error handler", "Server-side validation", "8 documented assumptions"]
featured: true
order: 5
diagram:
  caption: Each layer has one job; errors from anywhere come back in the same shape.
  nodes:
    - label: KendaraanController
      note: REST /api/vehicles
    - label: KendaraanService
      note: business rules, year validation
    - label: KendaraanRepository
      note: Spring Data JPA
    - label: Kendaraan entity
      note: file-mode H2, MySQL-ready
---

## The problem

Build a motor-vehicle registry (a monitoring page with search and pagination, add/edit/detail forms, and deletion with confirmation) from a written specification and its mockups.

## Structure

The code is split into **Controller → Service → Repository → Entity**, with separate request/response DTOs and a single `@RestControllerAdvice` as the central error handler. Every error (400 validation, 404, 409 duplicate registration number, and 500) uses the same body shape, so the frontend handles one format.

- **Validation on the server**, not just HTML attributes. The upper bound of the manufacturing year follows the current year; since Bean Validation annotations only accept constants, that bound is checked in the service and reported in exactly the same error format.
- **PUT uses the registration number from the path**, not the body, so an edit can never create a new row.
- **Deterministic ordering.** Without an explicit `ORDER BY` the database does not guarantee order, so a row could appear on two pages. Records are sorted by registration number.

## When the specification contradicted itself

The requirements table listed *Vehicle Colour* as text and *Fuel* as a dropdown of Red, Black, Blue, Grey, while the mockup showed the opposite. I followed the mockup, for three written reasons: the dropdown values are clearly colour names, the mockup placeholders follow the dropdown pattern, and the required seed data (Fuel = "Bensin") could not be saved if that list were applied to Fuel.

Eight assumptions like this are documented in the README, including what was deliberately **not** built.
