import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie AI Model Setting Gemini 2.5 Flash with and without Advance Thinking', async ({ page }) => {
    test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    // Login
    //await page.setViewportSize({ width: 1536, height: 864 });
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // Matters
    // await mattersPage.goto();
    // await mattersPage.searchMatter(matternamecontains);
    // await mattersPage.verifyMenus();
    // await mattersPage.openArchie();


    await page.waitForTimeout(8000);
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('Gemini 2.5 Flash');
    await page.locator('a').filter({ hasText: 'openGemini 2.5 Flash - 2.5' }).click();
    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: 'Archie' }).click();
    await page.waitForTimeout(8000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Reset to default' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('Archie AI Model Reset to Default');
    
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('checkbox', { name: 'Show AI model options' }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('combobox').click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('option', { name: 'Gemini 2.5 Flash' }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('Archie AI Model Gemini 2.5 Flash Selected');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Who are the persons involve in this matter');
    //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium').first().click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(8000);
    console.log('Ask Archie using AI Model Gemini 2.5 Flash');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('checkbox', { name: 'Use Advanced thinking for' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('Archie AI Model Gemini 2.5 Flash with Advance Thinking Selected');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Provide a brief overview of this matter');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(15000);
    console.log('Ask Archie using AI Model Gemini 2.5 Flash with Advance Thinking');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Thought');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Reset to default' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    console.log('Archie AI Model Reset to Default');
    await page.waitForTimeout(3000);

    await page.waitForTimeout(1000);
    console.log('Archie AI Model Gemini 2.5 Flash Test Completed');


    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
