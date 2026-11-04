import { test, expect } from '@playwright/test';
import { RegistrationPage } from './uiPages/registration-page'
import uiPages from './utils/uiPages';
import { generateValidEmail}  from './utils/data-generators/valid-email-generator'
import { credentials } from './test-data/credentials'
import messages from './utils/messages';
// define type of registrationPage
let registrationPage: RegistrationPage;



test.beforeEach( async ({page}) => {
    // goto login page url
    await page.goto(uiPages.registrationPage);
    registrationPage = new RegistrationPage(page);

})
// smoke test, does login page load - etc.
test.describe.only("Registration Page Testing ('/auth/login')", () => {
    test('Registration page loads', {tag: "@smoke"}, async ({ page }) => {
        await registrationPage.checkPageLoaded();
    });

    test('Successful registration with club redirects to login', async({ page }) => {
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
            await expect(page.getByText(messages.registration.registrationSuccessful)).toBeVisible();
        })
    });
});
