# BookingPlatform Playwright Testing Suite

For database installation instructions see forked repository: https://github.com/vascoferraro-scottlogic/Bookingplatform


### NPM Commands
For ease of use, some tests have been appropriately tagged so that developers can run them in their CLI to ensure changes haven't broken core functionality.

- 'npm run test:smoke' - Runs all tests tagged @smoke, quick sanity check.
- 'npx playwright test' - Runs all tests within playwright-tests folder. Optional args appended '--headed', '--ui', '--debug'.
- 'npx playwright test test-to-run' - Runs tests matching argument.
- 'npm run test:defect' - Runs all known defect tests to verify fixes.

- When running tests through playwright directly, set workers to 1 with optional flag --workers=1, this is due to some tests failing with parallelisation. 

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

  - Club Member Dashboard
    - /dashboard redirects to club page
    - Club member can navigate to bookings
    - Club member can navigate to notifications



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
- DashboardPageCubMember
  - Locators:
    - Header "Lakeview Bowls Club' 
    - "Sign Out" link
    - "Book Now" link
    - "View All Notifications" link
    - "View All Upcoming Bookings" link
    - NavBar Bookings Link
    - NavBar Notifications Link
  - Methods:
    - checkPageLoaded()
    
</details>

<hr>

### Utils

This testing suite provides a 'utils' folder. This is where information that is to be reused across different tests is to be be stored. This promotes extensibility and flexibility of the testing suite. 

<details> <summary> Show Utils Details </summary>
Current Utils Scripts:
- environmentBaseUrls, used in combination with .env.ENV to determine the baseUrl Playwright.config points to.
   <img width="352" height="132" alt="image" src="https://github.com/user-attachments/assets/2f1365d7-a8e1-41f9-bfd7-0e3c938e0b05" />

- messages, for storing messages that my change in the future and are used in assertions, e.g. messages.login.invalid = "Invalid email or password".
<img width="598" height="169" alt="image" src="https://github.com/user-attachments/assets/44805ae5-1f6a-40a0-a04b-08b60a432d44" />

- uiPages, for storing references to URL suffixes that are appended to baseUrl, e.g. uiPages.loginPage = "/auth/login".
<img width="314" height="109" alt="image" src="https://github.com/user-attachments/assets/f3b42d7d-fd19-4443-b29e-af0cabe0950a" />

The utils folder is provides helpers, such as data-generators which currently has:
- valid-email-generator, for generating a "unique" valid email address to use for testing registration.


</details>
<hr>

### Test Data

Consistent data for testing.

<details><summary> Show Test Data Details </summary>
Current Test-Data Files:
  
- credentials, valid credentials for registration - password should always be valid, as is name and club.

<img width="339" height="125" alt="image" src="https://github.com/user-attachments/assets/6e8e979e-6df9-423b-836e-94f2d69508dd" />


- invalid-passwords, a combination of invalid passwords to test against - all should be rejected.

<img width="409" height="231" alt="image" src="https://github.com/user-attachments/assets/9ab0c7c9-afad-404f-97b3-e1e31fb48b72" />

- accountTypes, different account types available (non-exhaustive currently) with their expected landing page (redirect after login)

<img width="427" height="338" alt="image" src="https://github.com/user-attachments/assets/14ead2aa-beb9-4754-9bc7-2ea6a2d6bfd0" />

</details>


<hr>

## Fixtures !
Fixtures are reusable setup components that prepare the test environment. In the current iteration of this testing suite, one example fixtures has been created that I will explain here. Fixtures are a way to wrap the {page} object with a POM and perform setup steps. The example used is for password strength validation on the Registration page. As we are testing the password form field, we can autofill the other field with valid credentials - though why don't we do this in beforeEach ? - because we are testing other things within the same spec that don't require this setup.

### Implementation:

Use Inheritance to extend the base 'test' class provided by playwright with our desired fixtures and export this as test, expect.

```
import { test as base } from "@playwright/test";
import RegistrationPage from "../uiPages/registration-page";
import uiPages from "../utils/uiPages";
import  { credentials } from "../test-data/credentials";
import {generateValidEmail} from "../utils/data-generators/valid-email-generator"

type RegistrationFixtures = {
    registrationPage: RegistrationPage;
    registrationPageWithEmptyPassword: RegistrationPage;
}

export const test = base.extend<RegistrationFixtures>( {
    // fills all form fields with valid credentials, leaving password field blank
    registrationPageWithEmptyPassword: async ({ page }, use) => {
        await page.goto(uiPages.registrationPage);
        const registrationPagePom = new RegistrationPage(page);

        // fill form fields
        await registrationPagePom.fillEmailFormField(generateValidEmail());
        await registrationPagePom.fillNameFormField(credentials.name);
        await registrationPagePom.fillClubField(credentials.clubSlug);
        


        await use(registrationPagePom);
      },

    registrationPage: async({page}, use) => {
        await page.goto(uiPages.registrationPage);
        const registrationPagePom = new RegistrationPage(page);

        await use(registrationPagePom);
    }

});

export {expect} from '@playwright/test'
```

Now, where we want to use this fixture we import from this fixtures file and use it in plage of async({ page }) in our testing:
```
import { test, expect } from './fixtures/registration-fixtures';
```

```

test.describe("Registration Page Testing ('/auth/login') Weak Passwords Rejected", () => {
for(const [passwordName, password] of invalidPasswordEntries) {
    test.fail(`Password ${passwordName}: ${password}, to be rejected`, 
        {tag: "@defect",
            annotation: { type: 'defect', description: 'DEF-004 User password validation non-existet'}
        },
        async({registrationPageWithEmptyPassword}) => {
            await registrationPageWithEmptyPassword.fillPasswordFormField(password);
            await registrationPageWithEmptyPassword.clickSubmitRegistration();

            // weak password error message not currently defined in HTML context, so cannot be checked for visibility
            await expect(registrationPageWithEmptyPassword.page.getByText(messages.registration.weakPassword)).toBeVisible();
            
            // even if redirect happens, not a good assertion as before redirect it will still be on registraton page
            await expect(registrationPageWithEmptyPassword.page).toHaveURL(url =>
                        url.pathname === uiPages.registrationPage
            );
        })
}});
```


<hr>

## Known Defect Testing

How to write cases for tests that we know will fail. In this suite the practice will be to append .fail to the known defect test - this way we get 'test passed' in the report, and when it is fixed we will get 'expected to fail, but passed' so that we know the defect has been fixed and the .fail clause can be removed. Hoever - every defect test must have an @defect tag for filtering and tracing, with an annotation pointing to the defect log:

<details> <summary>Show example defect testing</summary>

```

test.describe("Registration Page Testing ('/auth/login') Weak Passwords Rejected", () => {
for(const [passwordName, password] of invalidPasswordEntries) {
    test.fail(`Password ${passwordName}: ${password}, to be rejected`, 
        {tag: "@defect",
            annotation: { type: 'defect', description: 'DEF-004 User password validation non-existet'}
        },
        async({registrationPageWithEmptyPassword}) => {
            await registrationPageWithEmptyPassword.fillPasswordFormField(password);
            await registrationPageWithEmptyPassword.clickSubmitRegistration();

            // weak password error message not currently defined in HTML context, so cannot be checked for visibility
            await expect(registrationPageWithEmptyPassword.page.getByText(messages.registration.weakPassword)).toBeVisible();
            
            // even if redirect happens, not a good assertion as before redirect it will still be on registraton page
            await expect(registrationPageWithEmptyPassword.page).toHaveURL(url =>
                        url.pathname === uiPages.registrationPage
            );
        })
}});
```

</details>

<hr>

## State Storage
State storage is essential for speeding up test suite runtimes. Once we've already smoke checked our login journey - we know it's stable. Every time we want to test a user journey for a logged-in account (of which there are many types) we don't want to login through the UI before each test. That's where state storage comes in.

In the Playwright config, you will find a setup script that runs before all tests - this performs the UI login journey once for each account type and stores the session data for reusability where needed. 

```
  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/},

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
       },
      dependencies: ['setup'],
    },
```

We have the dependency of 'setup' on all our browsers - so it will run before any tests on that browser are conducted - but what does the setup file look like?

For starters, it reads from our accountTypes file - with credentials set from the private ENV.

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

    platformAdmin: {
        email: process.env.PLATFORMADMINEMAIL,
        password: process.env.PLATFORMADMINPASSWORD,
        landingPage: uiPages.landingAdmin
    },
}
```

Then, these account types are iterated over and their session context is stored in an appropriately named .json file. 

```
let loginPage: LoginPage;
for (const [role, account] of Object.entries(accountTypes)) {
  setup(`authenticate ${role}`, async ({ page }) => {
    if (!account.email || !account.password) {
      throw new Error(`Credentials for ${role} must be set in your env file`);
    }

    await page.goto(uiPages.loginPage);
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(account.email, account.password);

    await page.waitForURL(account.landingPage);
    await page.context().storageState({ path: path.join(authFile, `${role}.json`) });
  });
}
```
By default, none of these files are used. Unchanged - tests will run as if they are a fresh user that hasn't logged in. In our ClubMember dashboard navigation test, we need to act as a ClubMember user type:

```
test.use({ storageState: 'playwright/.auth/clubMember.json' });
```
The same would apply if we want to act as platformAdmin, clubAdmin, etc.

NOTE: there is also account type of user who is logged in and is NOT a member of a club. This has not yet been implemented due to an account of this type not beeing in the seeded database.

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




