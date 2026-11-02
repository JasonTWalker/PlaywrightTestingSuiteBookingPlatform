import { test, expect } from '@playwright/test';
import { DashboardUnsigned } from './uiPages/dashboard-page-unsigned'


let dashboardUnsigned: DashboardUnsigned;

test.beforeEach( async ({page}) => {
    // goto login page url
    await page.goto('http://localhost:3000/');
    dashboardUnsigned = new DashboardUnsigned(page);
})
// smoke test, does login page load - etc.
test.describe("Dashboard Navigation Testing ('/') as Unsigned User", {tag: '@smoke'}, () => {
    test('Dashboard loads', async({page}) => {
            await dashboardUnsigned.checkPageLoaded();
    });

    test('Sign-in button redirects to sign-in page', async ({ page }) => {
        await test.step('Sign-in link visible', async() => {
            await expect(dashboardUnsigned.signInLink).toBeVisible();
        });
        await test.step('Clicking sign-in redirects to login page', async() => {
            await dashboardUnsigned.clickSignInLink();
            await dashboardUnsigned.checkSignInRedirect();
        });
    });

    test('Register button redirects to registration page', async ({ page }) => {
        await test.step('Registration link visible', async() => {
            await expect(dashboardUnsigned.registerLink).toBeVisible();
        });
        await test.step('Clicking Register redirects to registration page', async() => {
            await dashboardUnsigned.clickRegisterLink();
            await dashboardUnsigned.checkRegisterRedirect();
        });
    });

    test('Add club button redirects to join page', async ({ page }) => {
        await test.step("'Add your club' link visible'", async() => {
            await expect(dashboardUnsigned.addClubLink).toBeVisible();
        });
        await test.step("Clicking 'Add your club' redirects to registration page", async() => {
            await dashboardUnsigned.clickAddClubLink();
            await dashboardUnsigned.checkAddClubRedirect();
        });
    });

    test('Browse Clubs/Lakeview Bowls Club redirects to Lakeview club page', async ({ page }) => {
        await test.step("'Lakeview Bowls Club' link visible'", async() => {
            await expect(dashboardUnsigned.lakeviewClubLink).toBeVisible();
        });
        await test.step("Clicking 'Add your club' redirects to registration page", async() => {
            await dashboardUnsigned.clickLakeviewClubLink();
            await dashboardUnsigned.checkLakeviewClubRedirect();
        });
    });
});
