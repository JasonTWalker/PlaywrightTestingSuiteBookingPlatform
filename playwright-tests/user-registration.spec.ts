import { test, expect } from './fixtures/registration-fixtures';
import { RegistrationPage } from './uiPages/registration-page';
import uiPages from './utils/uiPages';
import { generateValidEmail}  from './utils/data-generators/valid-email-generator';
import { credentials } from './test-data/credentials';
import messages from './utils/messages';

// define type of registrationPage
let registrationPage: RegistrationPage;



// smoke test, does login page load - etc.
test.describe("Registration Page Testing ('/auth/login')", () => {
    test('Registration page loads', {tag: "@smoke"}, async ({ registrationPage }) => {
        await registrationPage.checkPageLoaded();
    });

    test('Successful registration with club redirects to login', async({ registrationPage }) => {
        await test.step('Populate form fields', async() => {
            await registrationPage.fillNameFormField(credentials.name);
            await registrationPage.fillEmailFormField(generateValidEmail());
            await registrationPage.fillPasswordFormField(credentials.password);
            await registrationPage.fillClubField(credentials.clubSlug);
        })

        await test.step('Click register button', async() => {
            await registrationPage.clickSubmitRegistration();
        })

        await test.step('Redirects to login page', async() => {
            await expect(registrationPage.page).toHaveURL(url => 
                url.pathname === uiPages.loginPage
            )
        })

        await test.step('Registration successful message shown', async() => {
            await expect(registrationPage.page.getByText(messages.registration.registrationSuccessful)).toBeVisible();
        })
    });
});
// smoke test, does login page load - etc.
test.describe.only("Registration Page Testing ('/auth/login') Weak Passwords Rejected", () => {
    test('Empty passwords are rejected', async({ registrationPageWithEmptyPassword }) => {
        await registrationPageWithEmptyPassword.fillPasswordFormField("")
        await registrationPageWithEmptyPassword.clickSubmitRegistration();
        await expect(registrationPageWithEmptyPassword.page.getByText(messages.registration.emptyPassword)).toBeVisible();
    });
});