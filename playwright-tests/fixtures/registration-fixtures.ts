import { test as base } from "@playwright/test";
import RegistrationPage from "../uiPages/registration-page";
import uiPages from "../utils/uiPages";
import  { credentials } from "../test-data/credentials";
import {generateValidEmail} from "../utils/data-generators/valid-email-generator"

type RegistrationFixtures = {
    registrationPage: RegistrationPage;
    registrationPageWithEmptyPassword: RegistrationPage;
}

export const test = base.extend<RegistrationFixtures>( {
    // fills all form fields with valid credentials, leaving password field blank
    registrationPageWithEmptyPassword: async ({ page }, use) => {
        await page.goto(uiPages.registrationPage);
        const registrationPagePom = new RegistrationPage(page);

        // fill form fields
        await registrationPagePom.fillEmailFormField(generateValidEmail());
        await registrationPagePom.fillNameFormField(credentials.name);
        await registrationPagePom.fillClubField(credentials.clubSlug);
    
        await use(registrationPagePom);
      },

    registrationPage: async({page}, use) => {
        await page.goto(uiPages.registrationPage);
        const registrationPagePom = new RegistrationPage(page);

        await use(registrationPagePom);
    }

});

export {expect} from '@playwright/test'