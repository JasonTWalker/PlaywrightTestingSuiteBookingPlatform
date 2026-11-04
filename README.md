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
  
 - User Registration @smoke:
   - Registration Page loads
   - Empty password rejected
   - Weak passwords rejected



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

- RegistrationPage
  - Locators:
     - Button "Submit Registration"
     - "Name" input field
     - "Email" input field
     - "Password" input field
     - "Club Slug" input field
     - Button "Sign In"
     - Header "Registration"
  - Methods:
     - checkPageLoad()
     - fillFormField()
     - submitRegistration()
    
</details>

<hr>

### Utils

This testing suite provides a 'utils' folder. This is where information that is to be reused across different tests is to be be stored. This promotes extensibility and flexibility of the testing suite. 


Current Utils Scripts:
- environmentBaseUrls, used in combination with .env.ENV to determine the baseUrl Playwright.config points to.
   <img width="352" height="132" alt="image" src="https://github.com/user-attachments/assets/2f1365d7-a8e1-41f9-bfd7-0e3c938e0b05" />

- messages, for storing messages that my change in the future and are used in assertions, e.g. messages.login.invalid = "Invalid email or password".
<img width="598" height="169" alt="image" src="https://github.com/user-attachments/assets/44805ae5-1f6a-40a0-a04b-08b60a432d44" />

- uiPages, for storing references to URL suffixes that are appended to baseUrl, e.g. uiPages.loginPage = "/auth/login".
<img width="314" height="109" alt="image" src="https://github.com/user-attachments/assets/f3b42d7d-fd19-4443-b29e-af0cabe0950a" />

- test-data, subdirectory where test-data is to be held. e.g. reusable data across multiple tests

<img width="339" height="125" alt="image" src="https://github.com/user-attachments/assets/6e8e979e-6df9-423b-836e-94f2d69508dd" />

<img width="409" height="231" alt="image" src="https://github.com/user-attachments/assets/9ab0c7c9-afad-404f-97b3-e1e31fb48b72" />

The utils folder is provides helpers, such as data-generators which currently has:
- valid-email-generator, for generating a "unique" valid email address to use for testing registration.


  
