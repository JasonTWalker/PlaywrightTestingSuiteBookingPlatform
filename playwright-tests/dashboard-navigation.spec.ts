import { test, expect } from '@playwright/test';

// seed login, member of seeded 'Lakeview' club
const userEmail = "user@lakeview.club"
const userPassword = "user123"


test.beforeEach( async ({page}) => {
    // goto login page url
    await page.goto('http://localhost:3000/');
})
// smoke test, does login page load - etc.
test.describe("Dashboard Navigation Testing ('/') as Unsigned User", {tag: '@smoke'}, () => {
    test('Dashboard loads', async({page}) => {
            await expect(page.getByRole( "heading", {name: "Club Management Platform"})).toBeVisible();
    });

    test('Sign-in button redirects to sign-in page', async ({ page }) => {
        await test.step('Sign-in link visible', async() => {
            await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
        });
        await test.step('Clicking sign-in redirects to login page', async() => {
            await page.getByRole('link', { name: 'Sign In' }).click();
            await expect(page).toHaveURL(/login/)
        });
    });

    test('Register button redirects to registration page', async ({ page }) => {
        await test.step('Registration link visible', async() => {
            await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
        });
        await test.step('Clicking Register redirects to registration page', async() => {
            await page.getByRole('link', { name: 'Register' }).click();
            await expect(page).toHaveURL(/register/)
        });
    });

    test('Add club button redirects to join page', async ({ page }) => {
        await test.step("'Add your club' link visible'", async() => {
            await expect(page.getByRole('link', {name: "Add your club"})).toBeVisible();
        });
        await test.step("Clicking 'Add your club' redirects to registration page", async() => {
            await page.getByRole('link', {name: "Add your club"}).click();
            await expect(page).toHaveURL(/join/)
        });
    });

    // always fails as there's two non-distinct links to Lakeview Bowls Club, with same href, name, etc.
    // need to update application with better element targeting
    test.fail('Browse Clubs/Lakeview Bowls Club redirects to Lakeview club page', async ({ page }) => {
        await test.step("'Lakeview Bowls Club' link visible'", async() => {
            await expect(page.getByRole('link', { name: 'Lakeview Bowls Club' })).toBeVisible();
        });
        await test.step("Clicking 'Add your club' redirects to registration page", async() => {
            await page.getByRole('link', { name: 'Lakeview Bowls Club' }).click();
            await expect(page).toHaveURL(/lakeview-bowls/)
        });
    });
});
