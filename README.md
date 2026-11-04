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


<hr>

## Problems Encountered

In this section I am going to cover issues that arose whilst implementing this testing suite, considerations that have been made, and persistent issues that are proving to be a challenge. 

#### Different Account Types

So far through experimentation I have encountered different account types, these being:
- Platform Admin
- Club Admin
- Club Member
- NonClubMember (User who isn't part of a club)
- Non-Signed User (User who isn't logged in)

Each of these account types have different journeys - in the interest of time and what I'm able to cover I have been heavily focusing on Club Members and Non-Signed Users.

Another issue stems from the number of account types, and that's dynamic redirects

Each account type is directed to a different landing page after login.
- PlatformAdmin -> Redirected to /dashboard
- ClubAdmin -> Redirected to /dashboard -> Redirected to /lakeview-bowls
- ClubMember -> Redirected to /dashboard -> Redirected to /lakeview-bowls
- NonClubMember -> Redirected to /dashboard (bugged)

The dashboard is also different for each, but this is to be expected. For testing, this has been ameliorated somewhat through test-data; define these account types with their credentials and expected landing page after login - and assert against this for navigation. 
  
```
export const accountTypes  = {
    clubMember: {
        email: process.env.CLUBUSEREMAIL,
        password: process.env.CLUBUSERPASSWORD,
        landingPage: uiPages.lakeviewClubPage
    },
    clubAdmin: {
        email: process.env.CLUBADMINEMAIL,
        password: process.env.CLUBADMINPASSWORD,
        landingPage: uiPages.lakeviewClubPage
    },

```



Though defining a different POM for each Page dependant on the account type that is accessing it seems out of scope for this project - I understand this is also valuable to do, if not quite time-consuming.


#### Browser Independent Assertions

This is caused by input fields in HTML having the parameter 'required type', shown below. 


<img width="684" height="36" alt="image" src="https://github.com/user-attachments/assets/0a49e2fb-34c9-4c94-ba3f-f4d71acd7f23" />


That's all well and good, but each browser handles this differently. 

See Chromium:


<img width="413" height="495" alt="image" src="https://github.com/user-attachments/assets/b640e18a-9fd5-4e1d-8fde-5a428a0bb669" />


See Webkit:

<img width="443" height="512" alt="image" src="https://github.com/user-attachments/assets/3ae2b11d-79b6-49e3-b7a9-f2ec9c065204" />

See Firefox:

<img width="417" height="484" alt="image" src="https://github.com/user-attachments/assets/991c7729-8ab5-42e0-94a7-412f4080dc9b" />


This isn't a direct issue exactly, it's just behaviour that I can't seem to find a consistent way to test against, as the popups are not visible to Playwright (I think, anyways). The workaround for this is to assert that the page hasn't left the registration page. Further assertions should be done, such as verifying no account has been created and a suitable error message has been displayed aside from this popup.




