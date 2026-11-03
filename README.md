# BookingPlatform Playwright Testing Suite

For database installation instructions see forked repository: https://github.com/vascoferraro-scottlogic/Bookingplatform


### NPM Commands
For ease of use, some tests have been appropriately tagged so that developers can run them in their CLI to ensure changes haven't broken core functionality.

- 'npm run test:smoke' - Runs all tests tagged @smoke, quick sanity check.
- 'npx playwright test' - Runs all tests within playwright-tests folder. Optional args appended '--headed', '--ui', '--debug'.
- 'npx playwright test test-to-run' - Runs tests matching argument.



<hr>

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


<hr>

### POM Objects:

Page references with defined locators. Centralised location to update locators if page layout changes and locators break. Can be chained to form more complex journeys. 

For example: 

```
let dashboardUnsigned = new DashboardUnsigned(page);
dashboardUnsigned.clickRegisterLink();
dashboardUnsigned.checkRegisterRedirect();

// 'page' is now on RegistrationPage
let registrationPage = new RegistrationPage(dashboardUnsigned.page);
registrationPage.fillFormFields(email, username, password, club-slug);
registrationPage.doXXXX...

and so on
```

<details> <summary> Show Currently Implemented POMS </summary>


*N.Y.I: Not Yet Implemented*


- LoginPage
  - Locators:
    - Header "Sign In" 
    - "Email" input field
    - "Password" input field
    - "Sign In" submit button
    - "Create account" link N.Y.I
    - "Forgot password?" link N.Y.I
  - Methods:
    - checkPageLoaded()
    - clickImplementedLocators(ifClickable)
    - doLogin(email, password)
    - doValidLogin()
    - checkLoggedIn()
    - checkInvalidCredentials(expectedMessage)

- DashboardUnsigned
  - Locators:
    - Header "Club Management Platform" 
    - "Sign In" link
    - "Register" link
    - "Add your club" link
    - "Lakeview-Bowls" link
    - "View events" link N.Y.I
  - Methods:
    - checkPageLoaded()
    - clickImplementedLocators(ifClickable)
    - checkRedirects();

</details>

<hr>

### Utils

This testing suite provides a 'utils' folder. This is where information that is to be reused across different tests is to be be stored. This promotes extensibility and flexibility of the testing suite. 


Current Utils Scripts:
- environmentBaseUrls, used in combination with .env.ENV to determine the baseUrl Playwright.config points to.
- messages, for storing messages that my change in the future and are used in assertions, e.g. messages.login.invalid = "Invalid email or password".
- uiPages, for storing references to URL suffixes that are appended to baseUrl, e.g. uiPages.loginPage = "/auth/login".

The utils folder is provides helpers, such as data-generators which currently has:
- valid-email-generator
  
