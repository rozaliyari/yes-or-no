# Yes or No Oracle — Test Cases

## Scope and execution status

One bilingual index.html, English by default, Persian RTL support, random fortunes, loading feedback, repeat draws and accessibility.

The four existing unit tests passed during development. All seven Playwright tests passed on installed Google Chrome in headed mode on macOS. This verifies the implemented assertions only; manual and partial coverage still require their remaining checks. Manual cases are not executed. Do not interpret an expected result as an observed pass.

Random outcomes are tested with controlled values, not by assuming alternation or measuring a small random sample. Browser automation is configured for Chromium, Firefox, WebKit and an emulated mobile viewport; emulation is not real-device testing.

Gherkin scenarios are documented separately in `oracle.feature`. They are specifications, not runnable Cucumber tests; current executable automation uses Playwright and Node.

## TC-01: English is the default language

**Priority:** High  
**Coverage:** Automated: Playwright  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Open the application in a fresh page.

**Steps:**

1. Open the home page.

**Expected result:** The title and content are English; html lang is en and direction is ltr; the action reads “Tell me my answer ↗”.

**Actual result:** Record after execution.

## TC-02: Switch to Persian

**Priority:** High  
**Coverage:** Automated: Playwright  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** The home page is open.

**Steps:**

1. Click فارسی.

**Expected result:** The page uses Persian text, lang fa and RTL direction; the initial result reads “نیت کردی؟”.

**Actual result:** Record after execution.

## TC-03: Switch back to English

**Priority:** High  
**Coverage:** Automated: Playwright  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Persian is selected; no fortune has been drawn.

**Steps:**

1. Click English.

**Expected result:** The initial result reads “Made a wish?” and the page uses English and LTR direction.

**Actual result:** Record after execution.

## TC-04: Draw a Yes fortune

**Priority:** High  
**Coverage:** Automated: Playwright  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Persian is selected; random source is stubbed to 0.1 before page load.

**Steps:**

1. Click the fortune button.
2. Wait for loading to finish.

**Expected result:** The result is “آره!”; the Yes message appears and the button becomes enabled.

**Actual result:** Record after execution.

## TC-05: Draw a No fortune

**Priority:** High  
**Coverage:** Automated: Playwright  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Persian is selected; random source is stubbed to 0.8 before page load.

**Steps:**

1. Click the fortune button.
2. Wait for loading to finish.

**Expected result:** The result is “نه!”; the No message appears and the button becomes enabled.

**Actual result:** Record after execution.

## TC-06: Loading state and duplicate-click prevention

**Priority:** High  
**Coverage:** Partially automated: disabled state and aria-busy; manual visual and rapid-click checks  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** The action button is enabled.

**Steps:**

1. Click the action button.
2. Attempt additional clicks during the 900 ms loading period.

**Expected result:** The button is disabled during loading; three dots and the loading message appear; aria-busy is true. Only one draw completes; the button is enabled and aria-busy is removed afterwards.

**Actual result:** Record after execution.

## TC-07: Draw another fortune

**Priority:** High  
**Coverage:** Automated: Playwright  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** A Yes or No fortune has completed; the random source is controlled.

**Steps:**

1. Click the action button again.
2. Wait for the new result.

**Expected result:** A new loading cycle starts and completes; the controlled answer is displayed and the action remains reusable. Consecutive answers may be identical.

**Actual result:** Record after execution.

## TC-08: Preserve the answer when switching language

**Priority:** High  
**Coverage:** Automated: Playwright  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** English is selected and random source is stubbed to 0.1.

**Steps:**

1. Draw a fortune and wait for Yes!
2. Click فارسی.

**Expected result:** The same outcome becomes “آره!” with its Persian message; switching language does not start another draw.

**Actual result:** Record after execution.

## TC-09: Switch language during loading

**Priority:** Medium  
**Coverage:** Manual; not automated yet  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** English is selected and no draw is in progress.

**Steps:**

1. Start a draw.
2. Click فارسی before loading finishes.

**Expected result:** Loading text immediately becomes Persian; the final answer and message are Persian; one draw completes.

**Actual result:** Record after execution.

## TC-10: Keyboard operation

**Priority:** High  
**Coverage:** Automated: Playwright for Enter; manual for Space  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** The page is freshly loaded.

**Steps:**

1. Use Tab to reach the fortune button.
2. Press Enter.
3. After completion, press Space.

**Expected result:** Focus is visible; each activation starts a draw; the result is Yes or No in the selected language.

**Actual result:** Record after execution.

## TC-11: Reduced motion

**Priority:** Medium  
**Coverage:** Partially automated: orb animation; manual for dots and rings  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** The browser emulates prefers-reduced-motion: reduce.

**Steps:**

1. Open the page.
2. Start a draw.

**Expected result:** The orb, loading dots, star and rings do not animate; the loading text and final result remain usable.

**Actual result:** Record after execution.

## TC-12: Responsive layout and visible action

**Priority:** High  
**Coverage:** Partially automated: horizontal overflow; manual for first-screen action visibility  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Use viewport sizes 320×568, 390×844, 768×1024 and 1440×900.

**Steps:**

1. Open the page at each size.
2. Check both languages and draw a fortune.

**Expected result:** No horizontal overflow occurs. At default zoom the primary action is visible without scrolling; text does not overlap and the result remains readable.

**Actual result:** Record after execution.

## TC-13: Screen-reader announcement

**Priority:** Medium  
**Coverage:** Manual; not automated yet  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** VoiceOver or NVDA is enabled.

**Steps:**

1. Navigate to the fortune action.
2. Activate it and wait for the result.

**Expected result:** The button has a meaningful accessible name; the live region announces the result. Verify actual speech rather than relying only on ARIA attributes.

**Actual result:** Record after execution.

## TC-14: Refresh resets the application

**Priority:** Medium  
**Coverage:** Manual; not automated yet  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Persian is selected and a fortune has completed.

**Steps:**

1. Refresh the page.

**Expected result:** The application returns to English, the initial prompt appears and the action is enabled. No previous result is persisted.

**Actual result:** Record after execution.

## TC-15: Font fallback

**Priority:** Low  
**Coverage:** Manual; not automated yet  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Block requests to Google Fonts.

**Steps:**

1. Reload the page.
2. Switch languages and draw a fortune.

**Expected result:** Fallback fonts remain readable; layout and fortune interaction still work.

**Actual result:** Record after execution.

## UNIT-01: Random boundaries

**Priority:** High  
**Coverage:** Automated: Node test runner  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Import getAnswer and inject a deterministic random function.

**Steps:**

1. Test 0, 0.1, 0.499999, 0.5, 0.75 and 0.999999.

**Expected result:** Values below 0.5 return yes; values from 0.5 up to but excluding 1 return no.

**Actual result:** Record after execution.

## UNIT-02: Reject invalid random values

**Priority:** Medium  
**Coverage:** Automated: Node test runner  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Import getAnswer with a stubbed random function.

**Steps:**

1. Return -1, 1, NaN, Infinity and the string 0.2 in separate calls.

**Expected result:** Each call throws RangeError.

**Actual result:** Record after execution.

## UNIT-03: Answer copy is available

**Priority:** Medium  
**Coverage:** Automated: Node test runner for the original Persian answer object  
**Execution status:** Not executed for the current bilingual version, unless stated in the unit execution summary above.

**Preconditions:** Import the original answers object.

**Steps:**

1. Inspect the yes and no entries.

**Expected result:** Both entries have a nonempty title and message. This existing test does not validate all localized UI copy.

**Actual result:** Record after execution.
