import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Prompt Library Run Suggested Prompt', async ({ page }) => {
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



    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('summarise this matter');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('h2')).toContainText('Prompt Library');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('body')).toContainText('Prompt Library');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('body')).toContainText('Matter Summary - Detailed');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('body')).toContainText('Matter Summary - Recent Communications');
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('body')).toContainText('Matter Summary - Short');
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.h-8.rounded-md.px-2.shrink-0.text-blue-560').first().click();
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('paragraph').filter({ hasText: 'Run "Matter Summary -' }).click();
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('memo');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
