import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Prompt Library Search and Run Prompt', async ({ page }) => {
    test.setTimeout(240000);

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
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'New Chat' }).click();
    await page.waitForTimeout(3000);


    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Prompt Library' }).click();
    await page.waitForTimeout(3000);
    console.log("Click Prompt Library");


    /*
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('combobox').filter({ hasText: 'NSW' }).click();
    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('combobox').first().click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByText('All states').click();
    await page.waitForTimeout(2000);
    

    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Animal Cruelty' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Animal Cruelty' }).first().click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('option', { name: 'All Matter Types' }).click();
    await page.waitForTimeout(2000);
    */

    const frame = page.frameLocator('iframe[title="sdkEmbedded"]').first();

    // Helper: Get text of a dropdown (combobox/button/element)
    async function getElementText(locator) {
        return (await locator.textContent())?.trim() || '';
    }

    //1ST COMBO BOX — If "All States", do nothing
    const firstCombo = frame.getByRole('combobox').nth(0); // Adjust index if needed
    const firstValue = await getElementText(firstCombo);
    console.log('First Combo Value:', firstValue);
    // No action required based on your rule
    await page.waitForTimeout(2000);

    //2ND COMBO BOX — If "NSW", change to "All States"
    const secondCombo = frame.getByRole('combobox').nth(1);
    const secondValue = await getElementText(secondCombo);
    console.log('Second Combo Value:', secondValue);

    if (secondValue.includes('NSW')) {
        await secondCombo.click();
        await frame.getByText('All states', { exact: true }).click();
    }
    await page.waitForTimeout(2000);

    //3RD DROPDOWN — If "Animal Cruelty", change to "All Matter Types"
    /*
    const thirdCombo = frame.getByRole('button').filter({ hasText: 'Animal Cruelty' }).first();
    const thirdValue = await getElementText(thirdCombo);
    console.log('Third Combo Value:', thirdValue);

    if (thirdValue.includes('Animal Cruelty')) {
        await thirdCombo.click();
        await frame.getByRole('option', { name: 'All Matter Types' }).click();
    }
    await page.waitForTimeout(2000);
    */
    const matterTypeButton = frame.getByRole('button', { name: /Animal Cruelty|All Matter Types/ }).first();

    // Get current text of the dropdown
    const currentMatterType = (await matterTypeButton.textContent())?.trim();

    console.log('Current Matter Type:', currentMatterType);

    //Conditional behavior
    if (currentMatterType === 'Animal Cruelty') {
        console.log('Switching to All Matter Types');
        await matterTypeButton.click();
        await frame.getByRole('option', { name: 'All Matter Types' }).click();
    } else {
        console.log('Already All Matter Types — doing nothing');
    }
    await page.waitForTimeout(2000);
    console.log("Filter Prompt Library");
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).fill('Matter Summary - Detailed');
    await page.waitForTimeout(2000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('tbody')).toContainText('Matter Summary - Detailed');
    console.log("Search an existing Prompt");

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div').filter({ hasText: /^Open menu$/ }).locator('div').getByRole('img').click();
    await page.waitForTimeout(25000);
    console.log("Run an existing Prompt");
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Run "Matter Summary - Detailed" prompt');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('memo');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Create Memo From Draft');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
