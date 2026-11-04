import { test, expect } from './fixtures/registration-fixtures';
import { RegistrationPage } from './uiPages/registration-page';
import uiPages from './utils/uiPages';
import { generateValidEmail}  from './utils/data-generators/valid-email-generator';
import { credentials } from './test-data/credentials';
import messages from './utils/messages';
import { invalidPasswords } from './test-data/invalid-passwords';

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
// Defect - Browser provides different responses
// Errors provided outside of HTML context through popup
test.describe("Registration Page Testing ('/auth/login') Empty Password Rejected", () => {
    test('Empty passwords are rejected', async({ registrationPageWithEmptyPassword }) => {
        await registrationPageWithEmptyPassword.fillPasswordFormField("")
        await registrationPageWithEmptyPassword.clickSubmitRegistration();
        // commented out as error message not accessible in current state
        // await expect(registrationPageWithEmptyPassword.page.getByText(messages.registration.emptyPassword)).toBeVisible();
        await expect(registrationPageWithEmptyPassword.page).toHaveURL(url =>
                    url.pathname === uiPages.registrationPage
            );
    });
});

const invalidPasswordEntries = Object.entries(invalidPasswords)

test.describe("Registration Page Testing ('/auth/login') Weak Passwords Rejected", () => {
for(const [passwordName, password] of invalidPasswordEntries) {
    test(`Password ${passwordName}: ${password}, to be rejected`, async({registrationPageWithEmptyPassword}) => {
        await registrationPageWithEmptyPassword.fillPasswordFormField(password);
        await registrationPageWithEmptyPassword.clickSubmitRegistration();

        // weak password error message not currently defined in HTML context, so cannot be checked for visibility
        // await expect(registrationPageWithEmptyPassword.page.getByText(messages.registration.weakPassword)).toBeVisible();
        
        await expect(registrationPageWithEmptyPassword.page).toHaveURL(url =>
                    url.pathname === uiPages.registrationPage
            );
    })
}});