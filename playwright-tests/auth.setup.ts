import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import uiPages from './utils/uiPages';
import LoginPage from './uiPages/login-page';
import { accountTypes } from './test-data/account-types';

// import dotenv from 'dotenv';
const authFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '../playwright/.auth');



let loginPage: LoginPage;
for (const [role, account] of Object.entries(accountTypes)) {
  setup(`authenticate ${role}`, async ({ page }) => {
    if (!account.email || !account.password) {
      throw new Error(`Credentials for ${role} must be set in your env file`);
    }

    await page.goto(uiPages.loginPage);
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(account.email, account.password);

    await page.waitForURL(account.landingPage);
    await page.context().storageState({ path: path.join(authFile, `${role}.json`) });
  });
}