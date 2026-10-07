# Test Plan — Yes or No Oracle

## Objective
Verify the bilingual fortune experience and demonstrate QA design, browser automation and continuous integration.

## Specifications
- TEST-CASES.md: detailed cases, priorities, steps, expected results and coverage.
- oracle.feature: matching Given/When/Then scenarios; documentation only.

## Automation
Node tests cover decision boundaries, invalid random values and original Persian answer copy. Playwright covers default English, language switching, deterministic Yes/No, repeat draws, loading attributes, keyboard Enter activation, reduced orb motion and horizontal overflow. Chromium, Firefox, WebKit, emulated mobile and installed Google Chrome projects are configured.

## Execution status
Four unit tests passed during development. All seven browser tests passed on installed Google Chrome in headed mode on macOS. Other browser projects and manual checks have not been executed. GitHub Actions is configured but has not run on GitHub because the project has not been uploaded.

## Manual checks
Complete the cases marked manual or partial in TEST-CASES.md, particularly real screen-reader speech, loading appearance, first-screen action visibility, switching during loading, font fallback and real-device behavior.

## Reporting
Record actual results and attach screenshots or traces for failures. Do not mark a specification as passed without execution. Playwright retains failure screenshots and traces and generates an HTML report.
