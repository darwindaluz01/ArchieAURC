import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Ask Find Summarise Review', async ({ page }) => {
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

    await page.waitForTimeout(5000);

    // await page.getByRole('textbox', { name: 'Search' }).click();
    // await page.getByRole('textbox', { name: 'Search' }).fill('Real Estate');
    // await page.locator('a').filter({ hasText: 'openReal Estate - Estate,' }).click();

     await page.getByRole('button', { name: 'Archie' }).click();
    await page.waitForTimeout(5000);

    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('tab', { name: 'Legal Research' }).click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('new-conversation-button').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('create-matter-dialog-trigger').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('create-matter-region-trigger').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByRole('option', { name: 'Australia > Queensland' }).click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('create-matter-type-trigger').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByText('Employment Law').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByText('Employment Contract').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('create-matter-button').click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('chat-input-textarea').fill('What are the steps involve in applying for temporary financial orders as my client needs some money?');
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('chat-input-actions-ask').click();
    await page.waitForTimeout(50000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('conversation-boost-research-button').click();
    await page.waitForTimeout(10000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('sheet-next-button').click();
    await page.waitForTimeout(8000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('sheet-next-button').click();
    await page.waitForTimeout(8000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByText('Deep Research with Human').click();
    await page.waitForTimeout(8000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe[title="LawY Integration"]').contentFrame().getByTestId('sheet-submit-button').click();
    await page.waitForTimeout(5000);

    console.log('LawY Test Completed');

    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});

