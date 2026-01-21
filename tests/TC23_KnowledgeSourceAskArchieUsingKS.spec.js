import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, OpeninWord } from '../variables/credentials.js';
import path from 'path';

test('Archie Knowledge Source - Add Knowledge Source and Ask Achie using the KS', async ({ page }) => {
    test.setTimeout(300000);

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
    await page.waitForTimeout(8000);


    // This single command safely finds the first element whose ID starts with 'radix-'
    // within the iframe and clicks it.
    await page.locator('iframe[title="sdkEmbedded"]')
        .contentFrame()
        .locator('[id^="radix-"]')
        .first() // Ensures only one element is selected and clicked
        .click();
    await page.waitForTimeout(1000);


    // await page.locator('iframe[title="sdkEmbedded"]')
    // .contentFrame()
    // // Target any <button> element whose ID starts with 'radix-'
    // .locator('button[id^="radix-"]')
    // .first()
    // .click();
    // await page.waitForTimeout(1000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Select Knowledge Sources').click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('Animal Cruelty KS').click();
    await page.waitForTimeout(2000);

    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click({ force: true });
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.waitForTimeout(2000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('What are the details of the animal cruelty knowledge source?');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(15000);

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
