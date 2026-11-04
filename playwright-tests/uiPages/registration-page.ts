// Class that holds references to the login page of the bowls club application.
// Will contain locators for different fields, methods for typing within them 

import { expect, type Locator, type Page } from "@playwright/test"
import uiPages from "../utils/uiPages"

export class RegistrationPage {

    readonly page:Page;

    readonly submitRegistrationButton: Locator; 
    readonly nameFormField: Locator;
    readonly emailFormField: Locator;
    readonly passwordFormField: Locator;
    readonly clubFormField: Locator;
    readonly signInButton: Locator; // at the bottom of the page "Already have an account? 'Sign in'"
    readonly pageHeader: Locator;
    

    // HTML warning that a form field should have an ID or name attribute for ease of finding in testing/accessibility
    constructor (page: Page) {
        this.page = page;
        this.emailFormField = page.getByPlaceholder("Email");
        this.passwordFormField = page.getByPlaceholder("Password");
        this.nameFormField = page.getByPlaceholder("Name");
        this.clubFormField = page.getByPlaceholder("Club slug (optional)");
        this.pageHeader = page.getByRole( "heading", {name: "Register"});
        this.submitRegistrationButton = page.getByRole('button', { name: 'Register'});
        this.signInButton = page.getByRole('link', {name: "Sign in"});
    }

    async checkPageLoaded() {
        await expect(this.pageHeader).toBeVisible();
    }


    async clickSubmitRegistration() {
        await this.submitRegistrationButton.click();
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

    async fillClubField( text: string) {
        await this.clubFormField.click();
        await this.clubFormField.fill(text);
    }

    async fillNameFormField( text: string) {
        await this.nameFormField.click();
        await this.nameFormField.fill(text);
    }
}


export default RegistrationPage;