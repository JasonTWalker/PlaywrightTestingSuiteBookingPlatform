// POM for the dashboard when a user is not signed in
// Class that holds references to the login page of the bowls club application.
// Will contain locators for different fields, methods for typing within them 

import { expect, type Locator, type Page } from "@playwright/test"


export class DashboardUnsigned {

    readonly page: Page;

    readonly signInLink: Locator; 
    readonly registerLink: Locator;
    readonly addClubLink: Locator;
    readonly pageHeader: Locator;
    readonly lakeviewClubLink: Locator;

    constructor (page: Page) {
        this.page = page;
        this.pageHeader = page.getByRole( "heading", {name: "Club Management Platform"});
        this.signInLink = page.getByRole('link', { name: 'Sign In' });
        this.registerLink = page.getByRole('link', { name: 'Register' })
        this.addClubLink = page.getByRole('link', {name: "Add your club"})
        this.lakeviewClubLink = page.getByRole('link', { name: 'L Lakeview Bowls Club' })


    }

    async checkPageLoaded() {
        await expect(this.pageHeader).toBeVisible();
    }


    async clickSignInLink() {
        await this.signInLink.click();
    }

    // could maybe later update these checks to load the page into a POM for that page?
    // e.g. import login-page then use the checkLoaded method of that page, means chnging how we assert that login-page has loaded
    // updates across the project. 
    async checkSignInRedirect() {
        await expect(this.page).toHaveURL(/login/)
        //or:
        // loginPage = new LoginPage(this.page)
        // loginPage.checkLoaded(); ?
    }

    async clickRegisterLink() {
        await this.registerLink.click();
    }

    async checkRegisterRedirect() {
        await this.page.waitForURL(/register/)
        await expect(this.page).toHaveURL(/register/);
    }

    async clickAddClubLink() {
        await this.addClubLink.click();
    }

    async checkAddClubRedirect() {
        await this.page.waitForURL(/join/)
        await expect(this.page).toHaveURL(/join/);
    }

    async clickLakeviewClubLink() {
        await this.lakeviewClubLink.click();
    }

    async checkLakeviewClubRedirect() {
        await this.page.waitForURL(/lakeview-bowls/);
        await expect(this.page).toHaveURL(/lakeview-bowls/);
    }

}
export default DashboardUnsigned;