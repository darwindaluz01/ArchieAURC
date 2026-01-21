import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Browse Analyse or review a document - Invalid File JPG', async ({ page }) => {
  test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    // Login
    //await page.setViewportSize({ width: 1536, height: 864 });
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // Matters
    await mattersPage.goto();
    await mattersPage.searchMatter(matternamecontains);
    await mattersPage.verifyMenus();
    await mattersPage.openArchie();

    await page.getByRole('button', { name: 'Archie' }).click();

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Browse' }).click();
    await page.waitForTimeout(2000);
    await page.getByText('Invalid JPG File').click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Select 1 files' }).click();
    await page.waitForTimeout(5000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Archie cannot answer')).toBeVisible();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('dialog')).toContainText('Archie cannot answer questions on .jpg files. Please choose another file to proceed.');
    await page.waitForTimeout(5000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'OK' }).click();


    await page.waitForTimeout(2000);
    console.log('Archie Responded Successfully - Archie cannot answer questions on .jpg files. Please choose another file to proceed.');


    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
