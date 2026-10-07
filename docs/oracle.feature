# Documentation only: no Cucumber runner or step definitions are configured.
# @implemented marks some existing coverage, not a passed execution.
Feature: Bilingual Yes or No Oracle
  Visitors can draw a random fortune and switch between English and Persian.

  @tc-01 @implemented
  Scenario: English is the default language
    Given open the application in a fresh page
    When Open the home page
    Then The title and content are English; html lang is en and direction is ltr; the action reads “Tell me my answer ↗”

  @tc-02 @implemented
  Scenario: Switch to Persian
    Given the home page is open
    When Click فارسی
    Then The page uses Persian text, lang fa and RTL direction; the initial result reads “نیت کردی؟”

  @tc-03 @implemented
  Scenario: Switch back to English
    Given persian is selected; no fortune has been drawn
    When Click English
    Then The initial result reads “Made a wish?” and the page uses English and LTR direction

  @tc-04 @implemented
  Scenario: Draw a Yes fortune
    Given persian is selected; random source is stubbed to 0.1 before page load
    When Click the fortune button
    And Wait for loading to finish
    Then The result is “آره!”; the Yes message appears and the button becomes enabled

  @tc-05 @implemented
  Scenario: Draw a No fortune
    Given persian is selected; random source is stubbed to 0.8 before page load
    When Click the fortune button
    And Wait for loading to finish
    Then The result is “نه!”; the No message appears and the button becomes enabled

  @tc-06 @partial
  Scenario: Loading state and duplicate-click prevention
    Given the action button is enabled
    When Click the action button
    And Attempt additional clicks during the 900 ms loading period
    Then The button is disabled during loading; three dots and the loading message appear; aria-busy is true. Only one draw completes; the button is enabled and aria-busy is removed afterwards

  @tc-07 @implemented
  Scenario: Draw another fortune
    Given a Yes or No fortune has completed; the random source is controlled
    When Click the action button again
    And Wait for the new result
    Then A new loading cycle starts and completes; the controlled answer is displayed and the action remains reusable. Consecutive answers may be identical

  @tc-08 @implemented
  Scenario: Preserve the answer when switching language
    Given english is selected and random source is stubbed to 0.1
    When Draw a fortune and wait for Yes!
    And Click فارسی
    Then The same outcome becomes “آره!” with its Persian message; switching language does not start another draw

  @tc-09 @manual
  Scenario: Switch language during loading
    Given english is selected and no draw is in progress
    When Start a draw
    And Click فارسی before loading finishes
    Then Loading text immediately becomes Persian; the final answer and message are Persian; one draw completes

  @tc-10 @implemented
  Scenario: Keyboard operation
    Given the page is freshly loaded
    When Use Tab to reach the fortune button
    And Press Enter
    And After completion, press Space
    Then Focus is visible; each activation starts a draw; the result is Yes or No in the selected language

  @tc-11 @partial
  Scenario: Reduced motion
    Given the browser emulates prefers-reduced-motion: reduce
    When Open the page
    And Start a draw
    Then The orb, loading dots, star and rings do not animate; the loading text and final result remain usable

  @tc-12 @partial
  Scenario: Responsive layout and visible action
    Given use viewport sizes 320×568, 390×844, 768×1024 and 1440×900
    When Open the page at each size
    And Check both languages and draw a fortune
    Then No horizontal overflow occurs. At default zoom the primary action is visible without scrolling; text does not overlap and the result remains readable

  @tc-13 @manual
  Scenario: Screen-reader announcement
    Given voiceOver or NVDA is enabled
    When Navigate to the fortune action
    And Activate it and wait for the result
    Then The button has a meaningful accessible name; the live region announces the result. Verify actual speech rather than relying only on ARIA attributes

  @tc-14 @manual
  Scenario: Refresh resets the application
    Given persian is selected and a fortune has completed
    When Refresh the page
    Then The application returns to English, the initial prompt appears and the action is enabled. No previous result is persisted

  @tc-15 @manual
  Scenario: Font fallback
    Given block requests to Google Fonts
    When Reload the page
    And Switch languages and draw a fortune
    Then Fallback fonts remain readable; layout and fortune interaction still work

  @unit-01 @implemented
  Scenario: Random boundaries
    Given import getAnswer and inject a deterministic random function
    When Test 0, 0.1, 0.499999, 0.5, 0.75 and 0.999999
    Then Values below 0.5 return yes; values from 0.5 up to but excluding 1 return no

  @unit-02 @implemented
  Scenario: Reject invalid random values
    Given import getAnswer with a stubbed random function
    When Return -1, 1, NaN, Infinity and the string 0.2 in separate calls
    Then Each call throws RangeError

  @unit-03 @implemented
  Scenario: Answer copy is available
    Given import the original answers object
    When Inspect the yes and no entries
    Then Both entries have a nonempty title and message. This existing test does not validate all localized UI copy
