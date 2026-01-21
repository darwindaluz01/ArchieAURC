import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie AI Model Setting GPT-4o with and without Advance Thinking', async ({ page }) => {
    test.setTimeout(200000);

    const loginPage = new LoginPage(page);
    //const mattersPage = new MattersPage(page);
    const archiePage = new ArchiePage(page);

    // Login
    //await page.setViewportSize({ width: 1536, height: 864 });
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    // // Matters
    // await mattersPage.goto();
    // await mattersPage.searchMatter(matternamecontains);
    // await mattersPage.verifyMenus();
    // await mattersPage.openArchie();


    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('GPT 4.O');
    await page.locator('a').filter({ hasText: 'openGPT 4.O - 4O, GPT -' }).click();

    await page.waitForTimeout(10000);
    await page.getByRole('button', { name: 'Archie' }).click();
    await page.waitForTimeout(8000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Reset to default' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('Archie AI Model Reset to Default');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('checkbox', { name: 'Show AI model options' }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('combobox').click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('option', { name: 'GPT-4o' }).click();
    //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Settings')).toContainText('GPT-4o');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('GPT-4o');
    await page.waitForTimeout(3000);
    console.log('Archie AI Model GPT-4o Selected');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Provide a brief summary of this matter');
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(10000);
    console.log('Ask Archie using AI Model GPT-4o');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('checkbox', { name: 'Use Advanced thinking for' }).click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('Archie AI Model GPT-4o with Advance Thinking Selected');

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('GPT-4o');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Provide a brief summary of this matter');
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
    await page.waitForTimeout(10000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Thought');
    console.log('Ask Archie using AI Model GPT-4o with Advance Thinking');

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();
    await page.waitForTimeout(8000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Settings' }).click();
    await page.waitForTimeout(3000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Reset to default' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    console.log('Archie AI Model Reset to Default');

    await page.waitForTimeout(1000);
    console.log('Archie AI Model GPT-4o Test Completed');


    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
