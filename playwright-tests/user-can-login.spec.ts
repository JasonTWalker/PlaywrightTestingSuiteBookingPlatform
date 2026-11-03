import { test, expect } from '@playwright/test';
import { LoginPage } from './uiPages/login-page'

const userEmail = process.env.CLUBUSEREMAIL;
const userPassword = process.env.CLUBUSERPASSWORD;

if (!userEmail || !userPassword) {
    throw new Error('CLUBUSEREMAIL and CLUBUSERPASSWORD must be set');
}

// define type of loginPage
let loginPage: LoginPage;



test.beforeEach( async ({page}) => {
    // goto login page url
    await page.goto('/auth/login');
    loginPage = new LoginPage(page);

})
// smoke test, does login page load - etc.
test.describe("Login Page Testing ('/auth/login')", {tag: '@smoke'}, () => {
    test('User can login with valid credentials', async ({ page }) => {
    
        await test.step('Login page loads', async() => {
            await loginPage.checkPageLoaded();
        });

        await test.step("Form fields present", async() => {
            await expect(loginPage.emailFormField).toBeVisible();
            await expect(loginPage.passwordFormField).toBeVisible();
        });

        await test.step("Sign in button present", async() => {
            await expect(loginPage.submitSignInButton).toBeVisible();
        });

        await test.step("Fill form fields and sign in", async() => {
            await loginPage.doLogin(userEmail, userPassword);
        });

        await test.step("Redirects to dashboard", async() => {
            await loginPage.checkLoggedIn();
        })

    });

    test('User with invalid credentials shown error message', async ({ page }) => {
    
        await test.step('Login page loads', async() => {
            await loginPage.checkPageLoaded();
        });

        await test.step("Form fields present", async() => {
            await expect(loginPage.emailFormField).toBeVisible();
            await expect(loginPage.passwordFormField).toBeVisible();
        });

        await test.step("Sign in button present", async() => {
            await expect(loginPage.submitSignInButton).toBeVisible();
        });

        await test.step("Fill form fields with invalid credentials and sign in", async() => {
            await loginPage.doLogin("test@email.com", "unmatchedPassword");
        });

        await test.step("Shows invalid credentials message", async() => {
            await loginPage.checkInvalidCredentials();
        })

    });
});
