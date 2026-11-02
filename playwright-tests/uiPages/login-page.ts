// Class that holds references to the login page of the bowls club application.
// Will contain locators for different fields, methods for typing within them 

import { expect, type Locator, type Page } from "@playwright/test"


export class LoginPage {

    readonly page:Page;
    // the actual button that submits the form of login details.
    // in the current iteration it has text "Sign In"
    readonly submitSignInButton: Locator; 
    readonly emailFormField: Locator;
    readonly passwordFormField: Locator;
    readonly pageHeader: Locator;

    private clubMemberEmail = "user@lakeview.club"
    private clubMemberPassword = "user123"

    // HTML warning that a form field should have an ID or name attribute for ease of finding in testing/accessibility
    constructor (page: Page) {
        this.page = page;
        this.submitSignInButton = page.getByRole('button', { name: 'Sign In'})
        this.emailFormField = page.getByPlaceholder("Email")
        this.passwordFormField = page.getByPlaceholder("Password")
        this.pageHeader = page.getByRole( "heading", {name: "Sign In"});
    }

    async checkPageLoaded() {
        await expect(this.pageHeader).toBeVisible();
    }


    async clickSubmitLogin() {
        await this.submitSignInButton.click();
    }

    async fillEmailFormField( text: string ) {
        // click first to avoid webkit issues
        await this.emailFormField.click();
        await this.emailFormField.fill(text);
    }

    async fillPasswordFormField( text: string ) {
        await this.passwordFormField.click();
        await this.passwordFormField.fill(text);
    }

    // login as member of Lakeview-Bowls club
    async doLogin(email: string, password: string) {
        await this.fillEmailFormField(email);
        await this.fillPasswordFormField(password);
        await this.clickSubmitLogin();

    }

    async checkLoggedIn() {
        this.page.waitForURL(/lakeview-bowls/)
        await expect(this.page).toHaveURL(/lakeview-bowls/)
    }

    // Error message visible on the page.
    async checkInvalidCredentials() {
        await expect(this.page.getByText("Invalid email or password")).toBeVisible();
        // assert that the page has stayed on the login page
        await expect(this.page).toHaveURL(/login/)
    }

    async doValidLogin() {
        await this.doLogin(this.clubMemberEmail, this.clubMemberPassword);
    }
}


export default LoginPage;