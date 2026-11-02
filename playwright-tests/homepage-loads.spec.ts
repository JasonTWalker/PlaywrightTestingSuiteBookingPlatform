// Smoke test to check if the homepage loads successfully
import { test, expect } from '@playwright/test';

test.describe("Bowls Club App Homepage ('/') Loads", () => {
    test('Has title and heading', async ({ page }) => {
        // open bowls application at index (empty url '/')
        await page.goto('http://localhost:3000/');
        
        await test.step('Homepage has title "Club Management Platform', async () => {
            await expect(page).toHaveTitle("Club Management Platform")
        });

        await test.step('Homepage contains header with "Club Management Platform', async () => {
            await expect(page.getByRole("heading", { name : 'Club Management Platform'})).toBeVisible();
        });
    });
});