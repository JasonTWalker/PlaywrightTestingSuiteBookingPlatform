// Similar to the other dashboard spec, though this will be used for a user that is a member of the lakeview club
// as such, it is a way to show off the storageState functionality - as a clubMember is defined. 

import { test, expect, request } from '@playwright/test';
import uiPages from './utils/uiPages';
import apiPages from './utils/apiPages';
import DashboardPageClubMember from './uiPages/dashboard-page-club-member';
import messages from './utils/messages';
import { bookingStatuses } from './test-data/booking-statuses';



const bookingId = '';

// storageState a logged-in meber of the lakeview club
test.use({ storageState: 'playwright/.auth/clubMember.json' });

// go to the bookings page as a club member directly, no need to test navigation from dashboard
// as that has been tested in the other spec
test.beforeEach(async ({page}) => {
    await page.goto(uiPages.bookingsPage);


});


// these tests assume the rink is in season
test.describe('Booking outside of 24 hours into the future', () => {
    let bookingId: string;

    // create a booking for testing purposes through the API
    test.beforeEach(async ({ request }) => {
        const currentDate = new Date();
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);

        const nextMonthFormatted = nextMonth.toISOString().split('T')[0]; // format as YYYY-MM-DD



        const bookingData = (
            {"date":nextMonthFormatted,"slots":[{"rinkId":"seed-rink-1","timeSlot":"09:00"}]}
        )
    
        const response = await request.post(apiPages.bookings, {
            data: bookingData
        })
        
        const body = await response.json();
        // expect that the request has gone through
        expect(response.ok()).toBeTruthy();

        // expect that the response has status of "REQUESTED"
        expect(body.status).toBe(bookingStatuses.requested);
        // assign bookingId of the response to a variable
        bookingId = body.id;

    


    });
    test('Club member cannot approve their own booking', async({request}) => {
        // reminder that our storage state currently has us as a user. 
            const response = request.patch(apiPages.bookings+`/${bookingId}`, {
                data: {"status": bookingStatuses.approved}
            })

            const res = await response;

            expect(res?.status()).toBe(403);
    });

    test('Club member can cancel their own booking', async({request}) => {
            const response = request.patch(apiPages.bookings+`/${bookingId}`, {
                data: {"status": bookingStatuses.cancelled}
            })

            const res = await response;

            // 200 status ok !
            expect(res?.status()).toBe(200);
    });
});

test.describe('Booking within 24 hours', () => {
    let bookingId: string;

    // create a booking for testing purposes through the API
    test.beforeEach(async ({ request }) => {

        const currentDate = new Date();
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);

        const nextDayFormatted = nextDay.toISOString().split('T')[0]; // format as YYYY-MM-DD

        

        const bookingData = (
            {"date":nextDayFormatted,"slots":[{"rinkId":"seed-rink-1","timeSlot":"09:00"}]}
        )
    
        const response = await request.post(apiPages.bookings, {
            data: bookingData
        })
        
        const body = await response.json();
        // expect that the request has gone through
        expect(response.ok()).toBeTruthy();

        // expect that the response has status of "REQUESTED"
        expect(body.status).toBe(bookingStatuses.requested);
        // assign bookingId of the response to a variable
        bookingId = body.id;

    


    });
    test('Club member cannot cancel their booking', async({request}) => {
        // reminder that our storage state currently has us as a user. 
            const response = request.patch(apiPages.bookings+`/${bookingId}`, {
                data: {"status": bookingStatuses.cancelled}
            })

            const res = await response;

            expect(res?.status()).toBe(400);
            // response json body contains expected error message
            await expect(res?.json()).resolves.toMatchObject({
                error: messages.bookings.cancellationNotAllowed,
            });
    });
});
