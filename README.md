# BookingPlatform Playwright Testing Suite

For database installation instructions see forked repository: https://github.com/vascoferraro-scottlogic/Bookingplatform


### NPM Commands
For ease of use, some tests have been appropriately tagged so that developers can run them in their CLI to ensure changes haven't broken core functionality.

- 'npm run test:smoke' - Runs all tests tagged @smoke, quick sanity check.
- 'npx playwright test' - Runs all tests within playwright-tests folder. Optional args appended '--headed', '--ui', '--debug'.
- 'npx playwright test test-to-run' - Runs tests matching argument.




### Tests Implemented 
<details> <summary> Show Currently Implemented Tests</summary>

- Dashboard Navigation @smoke: User journey for someone who is not signed in.
  - Dashboard Loads
  - Sign-In button has appropriate redirect
  - Register button has appropriate redirect
  - Add club button redirects to join page

 - User login journey @smoke:
   - Login page loads
   - Form fields present
   - Sign-in button present
   - Logging in as seeded user redirects to dashboard



</details>
