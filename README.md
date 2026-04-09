# DOU Salaries Test

A Playwright automation test written as a QA Automation task in 2025. It verifies the salary data displayed on the [DOU Jobs](https://jobs.dou.ua/salaries/) website for QA/QC/SDET specialists with 2+ years of experience.

## What it tests

The test navigates to the DOU salaries page, filters by **QA/QC/SDET** specialty and **2+ years** of experience, then hovers over the latest data point on the salary chart. It asserts that:

- The main median value (heading) is a valid positive number
- The graph tooltip median value is a valid positive number

## Project structure

```
dou-tests/
├── tests/
│   └── dou.spec.ts       # Test spec
├── pages/
│   └── SalariesPage.ts   # Page Object for the salaries page
└── playwright.config.ts  # Playwright configuration
```

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Running tests

```bash
# Headless (default)
npm test

# Headed (visible browser)
npm run test:headed
```

## Tech stack

- [Playwright](https://playwright.dev/) v1.56+
- TypeScript
- Page Object Model pattern
