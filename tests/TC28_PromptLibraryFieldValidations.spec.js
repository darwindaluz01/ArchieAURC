import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Prompt Library - Verify Fields validations', async ({ page }) => {
    test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    //Reusable references
    const sdkFrame = page.frameLocator('iframe[title="sdkEmbedded"]');
    const AskArchie = sdkFrame.locator(
        '.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8'
    );

    // Login
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // Matters
    await mattersPage.goto();
    await mattersPage.searchMatter(matternamecontains);
    await mattersPage.verifyMenus();
    await mattersPage.openArchie();

    await page.getByRole('button', { name: 'Archie' }).click();
    await page.waitForTimeout(5000);


    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Prompt Library' }).click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Add Prompt' }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').press('ControlOrMeta+a');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').fill('');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Create' }).click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('form')).toContainText('Invalid input');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Cancel' }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Add Prompt' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').fill('Prompt UI Validation Test');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').fill('QA Test Prompt');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'example phrase 1 example phrase' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'example phrase 1 example phrase' }).fill('Prompt UI Validation Test');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Create' }).click();
    await page.waitForTimeout(8000);


    await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Edit', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Add step' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox').nth(1).click();
    await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox').nth(1).press('ControlOrMeta+a');
    await page.waitForTimeout(1000);
    await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox').nth(1).fill('Prompt');
    await page.waitForTimeout(1000);
    await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('main')).toContainText('Action names must be unique within a template');
    await page.waitForTimeout(1000);
    await page.locator('button.close-icon').click();
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'New Chat' }).click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Prompt Library' }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).fill('Prompt UI Validation Test');
    await page.waitForTimeout(1000);

    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Open menu' }).click();

    // This single command handles both cases safely
    await page.locator('iframe[title="sdkEmbedded"]')
        .contentFrame()
        .locator('div')
        .filter({ hasText: /^Open menu$/ })
        .first() // This handles both 1 and 1+ matches
        .click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Open menu').getByText('Delete').click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(1000);

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");
});
