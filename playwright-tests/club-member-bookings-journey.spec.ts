// Similar to the other dashboard spec, though this will be used for a user that is a member of the lakeview club
// as such, it is a way to show off the storageState functionality - as a clubMember is defined. 

import { test, expect } from '@playwright/test';
import uiPages from './utils/uiPages';
import apiPages from './utils/apiPages';
import DashboardPageClubMember from './uiPages/dashboard-page-club-member';
import messages from './utils/messages';


// storageState a logged-in meber of the lakeview club
test.use({ storageState: 'playwright/.auth/clubMember.json' });

// go to the bookings page as a club member directly, no need to test navigation from dashboard
// as that has been tested in the other spec
test.beforeEach(async ({page}) => {
    await page.goto(uiPages.bookingsPage);
});


// these tests assume the rink is in season
test.describe.only('Club member can request a booking', () => {
    test('Bookings page loads', async ({ page }) => {
        await expect(page.getByRole("heading", {name: "Bookings", exact: true})).toBeVisible();
    })

    test('Club member can request a booking', async ({ page }) => {
        await test.step('Club member selects an available rink', async() => {
            await page.getByText("Open").first().click();
        });
        await test.step('Book rink popup appears', async() => {
            await expect(page.getByRole("heading", {name: "Book Rink"})).toBeVisible();
        
        });

        // https://www.thegreenreport.blog/articles/tracking-ui-to-api-connections-with-playwright/tracking-ui-to-api-connections-with-playwright.html
        await test.step('API POST request sent after requesting booking with expected time slot', async() => {
            // store the currently selected combobox value,
            // this is the time slot for the rink booking
            const selectedValue = await page.getByRole("combobox").inputValue();
            console.log("Selected value: " + selectedValue);


            // wait for the API request to be sent and the response to be received
            const [request] = await Promise.all([
                // set up a listener for the API request that is sent when the user clicks the "Request Booking" button
                page.waitForRequest(request => request.url().includes(apiPages.bookings) && request.method() === 'POST'),
                page.getByRole("button", {name: "Request Booking"}).click()
            ]);
            const response = await request.response();


            // response code 201 for CREATED
            expect(response?.status()).toBe(201);

            // response body json contains expected time slot requested
            await expect(response?.json()).resolves.toMatchObject({
                slots: expect.arrayContaining([
                    expect.objectContaining({ timeSlot: selectedValue }),
                ]),
            });
        });

        await test.step('Booking request successful message shown', async() => {
            await expect(page.getByText(messages.bookings.rinkBookingRequestSuccessful)).toBeVisible();
        });

    });
})





