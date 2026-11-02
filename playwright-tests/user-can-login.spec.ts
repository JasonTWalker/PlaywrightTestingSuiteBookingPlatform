import { test, expect } from '@playwright/test';

// seed login, member of seeded 'Lakeview' club
const userEmail = "user@lakeview.club"
const userPassword = "user123"


test.beforeEach( async ({page}) => {
    // goto login page url
    await page.goto('http://localhost:3000/auth/login');
})
// smoke test, does login page load - etc.
test.describe("Login Page Testing ('/auth/login')", {tag: '@smoke'}, () => {
    test('User can login with valid credentials', async ({ page }) => {
    
        await test.step('Login page loads', async() => {
            await expect(page.getByRole( "heading", {name: "Sign In"})).toBeVisible();
        });

        await test.step("Form fields present", async() => {
            await expect(page.getByPlaceholder("Email")).toBeVisible();
            await expect(page.getByPlaceholder("Password")).toBeVisible();
        });

        await test.step("Sign in button present", async() => {
            await expect(page.getByRole("button", {name: "Sign In"})).toBeVisible();
        });

        await test.step("Fill form fields and sign in", async() => {
            // .click() first fixes webkit failing
            await page.getByPlaceholder("Email").click();
            await page.getByPlaceholder("Email").fill(userEmail);
            await page.getByPlaceholder("Password").click();
            await page.getByPlaceholder("Password").fill(userPassword);
            await page.getByRole("button", {name: "Sign In"}).click();
        });

        await test.step("Redirects to dashboard", async() => {
            await expect(page).toHaveURL(/lakeview-bowls/)
        })

    });
});
