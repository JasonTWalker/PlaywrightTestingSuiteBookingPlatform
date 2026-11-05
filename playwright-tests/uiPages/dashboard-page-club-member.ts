import { expect, type Locator, type Page } from "@playwright/test"
import uiPages from "../utils/uiPages"

export class DashboardPageClubMember {

    readonly page: Page;

    readonly signOutButton: Locator; 
    readonly pageHeader: Locator;
    readonly bookNowLink: Locator; //visually a button
    readonly viewAllUpcomingBookings: Locator;
    readonly viewAllNotifications: Locator;

    // navbar locators
    readonly navbarBookings: Locator;
    readonly navbarNotifications: Locator;
    readonly navbarMaintenance: Locator;
    readonly navbarSignOut: Locator;


    constructor (page: Page) {
        this.page = page;
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.pageHeader = page.getByRole('heading', { name: 'Lakeview Bowls Club' });
        this.bookNowLink = page.getByRole('link', { name: 'Book Now' });
        this.viewAllUpcomingBookings = page.getByRole('link', { name: 'View all →' }).first();
        this.viewAllNotifications = page.getByRole('link', { name: 'View all →' }).nth(1);

        this.navbarBookings = page.getByRole('link', { name: 'Bookings' });
        this.navbarNotifications = page.getByRole('link', { name: 'Notifications' });
        this.navbarMaintenance = page.getByRole('link', { name: 'Maintenance' })
        this.navbarSignOut = page.getByRole('button', { name: 'Sign Out' })
    }

    async checkPageLoaded() {
        await expect(this.pageHeader).toBeVisible();
    }
}
export default DashboardPageClubMember;