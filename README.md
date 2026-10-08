# Yes or No?

A small bilingual fortune app. Think of a question, click the button, and get a random yes or no. English is the default; Persian is available from the language switch.

Built with HTML, CSS and JavaScript, with Node unit tests and Playwright browser tests.

## Run locally

Requires Node.js 20 or newer.

```sh
npm ci
PORT=4300 npm run dev
```

Open http://127.0.0.1:4300. Keep the terminal running while using the app.

## Run tests

```sh
npm test
```

To watch the browser tests using Google Chrome already installed on your computer:

```sh
npx playwright test --project=chrome --headed --workers=1
```

To use Playwright's downloaded browsers instead:

```sh
npx playwright install
npm run test:e2e
```

The full suite includes Chromium, Firefox, WebKit, a mobile viewport, and installed Chrome. Browser tests use port 4300 and start the local server when needed.

View the HTML report with `npm run test:report`. Failed browser tests retain screenshots and traces. GitHub Actions runs the suite on pushes and pull requests and uploads the report.

## What's tested

Unit tests check the decision boundaries and invalid random values. Browser tests cover both answers, loading, repeat draws, language switching, keyboard access, reduced motion and horizontal overflow. Random values are controlled in tests so both outcomes can be verified reliably.

- [Test plan](docs/TEST-PLAN.md)
- [Detailed test cases](docs/TEST-CASES.md)
- [Gherkin scenarios](docs/oracle.feature)

The Gherkin file is a specification. It does not have a Cucumber runner or step definitions.

## Files

- `index.html`: the single page for both languages.
- `src/app.js`: language switching, loading and fortune interaction.
- `src/oracle.js`: random answer selection.
- `src/locales.js`: English and Persian text.
- `src/style.css`: layout and animations.
- `tests/`: unit and browser tests.
- `.github/workflows/ci.yml`: GitHub Actions workflow.

## Build

```sh
npm run build
```

The static output is written to `dist/`. Relative asset and home links support both a GitHub Pages repository URL and a custom domain. GitHub Actions publishes dist/ after the test suite passes on main.

Google Fonts provides the font; system fonts are used if it cannot load. Questions and results are not stored. Each draw is independent, so the same answer can appear several times in a row.

This is a portfolio project and a bit of fun, not a prediction service.
