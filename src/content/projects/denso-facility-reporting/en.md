---
title: Facility Complaint Reporting System
summary: A facility complaint channel for every employee at PT Denso Manufacturing Indonesia, built entirely on services the company's IT policy already allowed.
role: Software Developer Intern
period: Jan-Dec 2025
stack: [Microsoft Forms, Power Automate, OneDrive, Python, SQL Server, PHP CodeIgniter 3, Power BI, Power Apps]
highlights: ["12-month internship", "End to end, form to dashboard", "Inside corporate IT policy"]
featured: true
order: 4
confidential: true
diagram:
  caption: How a complaint travels from an employee to the Facility team.
  nodes:
    - label: Microsoft Forms
      note: filled in by employees
    - label: Power Automate
      note: triggers on each report
    - label: OneDrive
      note: raw data landing zone
    - label: Python script (ETL)
      note: cleans & loads data
    - label: SQL Server
    - label: CodeIgniter 3 monitoring app
      note: used by the Facility team
---

## The problem

Employees needed an easy way to report facility issues, and the Facility team needed one place to track and follow them up. The catch: the company's IT security policy was strict, so new services or servers could not simply be installed.

## Approach

Rather than asking for a policy exception, I designed the integration on Microsoft 365 services that were **already approved**, run through the account of the employee responsible for the project, who signed off on the implementation. The flow: Microsoft Forms → Power Automate → OneDrive → Python script (ETL) → SQL Server → a PHP CodeIgniter 3 monitoring web app.

I worked across the whole development cycle: gathering requirements from users, design, build, and deployment.

## Other work during the internship

- **A Power BI dashboard** for the Facility team's daily check sheets. Data flows automatically Microsoft Forms → Power Automate → Excel, so each day's inspection results appear without manual tallying.
- **A barcode scanning app** built with Power Apps, storing data in Microsoft 365 Excel.

## Note

This is an internal company system, so no screenshots or source code are shown. Only the architecture and my role.
