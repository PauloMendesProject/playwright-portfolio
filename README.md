# Playwright QA Automation Portfolio

A QA automation portfolio project built with Playwright and TypeScript.

This repository demonstrates practical UI testing, API testing, Page Object Model usage, custom fixtures, authentication state, network mocking, cross-browser execution, reporting, and CI with GitHub Actions.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Features Demonstrated

- UI automation
- Cross-browser testing
- Page Object Model
- Custom Playwright fixtures
- Authentication with storage state
- Environment variables
- API testing
- GET, POST, PUT and DELETE requests
- Network interception
- Mocked API responses
- Simulated server errors
- Request inspection and header modification
- File uploads and downloads
- Alerts and dialogs
- iFrames
- New tabs and popup windows
- Screenshots
- Video recording
- Trace Viewer
- Visual comparison testing
- Retry configuration
- Timeout handling
- GitHub Actions CI

## Project Structure

    .github/
    └── workflows/
        └── playwright.yml

    fixtures/
    └── testFixtures.ts

    pages/
    ├── LoginPage.ts
    ├── InventoryPage.ts
    └── CartPage.ts

    tests/
    ├── api.spec.ts
    ├── auth.setup.ts
    ├── authenticated.spec.ts
    ├── example.spec.ts
    ├── fixtures.spec.ts
    └── network.spec.ts

    test-files/
    ├── upload-test.txt
    └── upload-test-2.txt

    playwright.config.ts
    package.json
    package-lock.json
    .gitignore

Authentication state is generated locally in:

    auth/user.json

This file is excluded from Git.

## Installation

    npm ci
    npx playwright install

## Environment Variables

Create a `.env` file in the project root:

    SAUCE_USERNAME=standard_user
    SAUCE_PASSWORD=secret_sauce

The `.env` file is excluded from Git.

GitHub Actions uses repository secrets with the same names:

    SAUCE_USERNAME
    SAUCE_PASSWORD

## Running Tests

Run the complete test suite:

    npx playwright test

Run Chromium tests:

    npx playwright test --project=chromium

Run Firefox tests:

    npx playwright test --project=firefox

Run WebKit tests:

    npx playwright test --project=webkit

Run authenticated tests:

    npx playwright test --project=chromium-authenticated

Run a specific test file:

    npx playwright test tests/api.spec.ts

Run tests in UI Mode:

    npx playwright test --ui

Run tests in debug mode:

    npx playwright test --debug

## Reports

Open the Playwright HTML report:

    npx playwright show-report

The project is also configured to record test videos and collect traces for failed retries.

## Page Object Model

The project uses reusable page objects to separate test logic from page interaction logic.

Page objects include:

    LoginPage
    InventoryPage
    CartPage

Example flow:

    Login
    → Add product to cart
    → Open cart
    → Verify product

## Custom Fixtures

Custom Playwright fixtures are used to automatically provide reusable page objects to tests.

This reduces repeated setup and keeps test files cleaner and easier to maintain.

## Authentication

The authentication setup is located in:

    tests/auth.setup.ts

It logs into SauceDemo and saves the authenticated browser state locally.

Authenticated tests run through the dedicated Playwright project:

    chromium-authenticated

## API Testing

Playwright's API request functionality is used for direct API testing.

The API suite covers:

- GET requests
- POST requests
- PUT requests
- DELETE requests
- HTTP status validation
- JSON response validation

JSONPlaceholder is used as the practice API.

## Network Interception and Mocking

The project demonstrates Playwright network control using `page.route()`.

Examples include:

- intercepting requests
- inspecting outgoing requests
- modifying request headers
- replacing real responses with mocked responses
- simulating HTTP 500 server errors

## Test Reliability

The project applies Playwright reliability practices including:

- stable locators
- locator-based auto-waiting
- retrying web assertions
- test isolation
- avoiding unnecessary fixed delays
- correct network wait patterns
- CI retries as a safety net rather than a replacement for fixing flaky tests

## Continuous Integration

GitHub Actions automatically runs the Playwright test suite when code is pushed to the main branch or when pull requests target the main branch.

The workflow:

1. Checks out the repository
2. Installs Node.js
3. Installs project dependencies
4. Installs Playwright browsers
5. Loads credentials from GitHub Secrets
6. Runs the Playwright test suite
7. Uploads the Playwright HTML report as an artifact

## Purpose

This project demonstrates practical QA automation skills using Playwright and TypeScript across UI testing, API testing, authentication, reusable architecture, network mocking, cross-browser execution, reporting, and continuous integration.
