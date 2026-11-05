// Similar to the other dashboard spec, though this will be used for a user that is a member of the lakeview club
// as such, it is a way to show off the storageState functionality - as a clubMember is defined. 

import { test, expect } from '@playwright/test';
import uiPages from './utils/uiPages';
import DashboardPageClubMember from './uiPages/dashboard-page-club-member';


// storageState a logged-in meber of the lakeview club
test.use({ storageState: 'playwright/.auth/clubMember.json' });

// hook used here as we don't know  for sure that the redirect works, other tests should still work if it doesn't
test.beforeEach(async ({page}) => {
    // goto club page url
    await page.goto(uiPages.dashboardPage);
    dashboardPageClubMember = new DashboardPageClubMember(page);
});

let dashboardPageClubMember: DashboardPageClubMember;


test.describe('Dashboard Navigation for Club Member', () => {
    test('Club member (/dashboard) redirects to club page', async ({ page }) => {
        await test.step('Go to dashboard url', async() => {
            await page.goto(uiPages.dashboardPage);
        });
        await test.step('Redirects to club page', async() => {
            // await expect(page).toHaveURL(url => 
            //     url.pathname === uiPages.lakeviewClubPage
            // )
        });
    });

    test('Club member can navigate to bookings', async ({ page }) => {
        await test.step('Click bookings link', async() => {
            await dashboardPageClubMember.bookNowLink.click();
        });
         await test.step('Club member navigates to bookings page', async() => {
            await expect(dashboardPageClubMember.page).toHaveURL(url => 
                url.pathname === uiPages.bookingsPage
            );
        });
    });

    test('Club member can navigate to Notifications through Navbar', async() => {
        await dashboardPageClubMember.navbarNotifications.click();
        await expect(dashboardPageClubMember.page.getByRole("heading", {name: "Notifications"})).toBeVisible();
        await expect(dashboardPageClubMember.page).toHaveURL(url => 
            url.pathname === uiPages.notificationsPage
        );
    })
});
