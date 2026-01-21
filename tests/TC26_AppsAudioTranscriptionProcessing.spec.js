import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword } from '../variables/credentials.js';

test('Archie Apps Audio Transcription - File Processing', async ({ page }) => {
    test.setTimeout(200000);

    const loginPage = new LoginPage(page);

    const archiePage = new ArchiePage(page);

    // Login
    //await page.setViewportSize({ width: 1536, height: 864 });
    await loginPage.goto();
    await loginPage.login(sbusername, sbpassword);

    await page.waitForTimeout(5000);
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('AUDT 10292025');
    await page.waitForTimeout(3000);
    await page.locator('a').filter({ hasText: 'openAUDT 10292025 -' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Archie' }).click();
    await page.waitForTimeout(10000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('tab', { name: 'Apps' }).click();
    await page.waitForTimeout(5000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('textbox', { name: 'Search apps' }).click();
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('textbox', { name: 'Search apps' }).fill('Audio Transcription');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Use App' }).click();
    await page.waitForTimeout(8000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByText('Browse').click();
    await page.waitForTimeout(1000);
    await page.getByText('Phone call with Simon Smith').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Select 1 files' }).click();
    await page.waitForTimeout(3000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Process' }).click();
    await page.waitForTimeout(20000);
    // await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByLabel('Transcription Ready')).toContainText('Completed - file processed');
    // await page.waitForTimeout(1000);
    // await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button')).toContainText('Play transcription');
    // await page.waitForTimeout(1000);

    // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Play transcription' }).click();
    // await page.waitForTimeout(10000);


    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByLabel('Transcription Ready')).toContainText('Completed - file processed');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'View transcription' }).click();
    await page.waitForTimeout(1000);

    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('navigation')).toContainText('Edit speaker names');
    await page.waitForTimeout(1000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('navigation')).toContainText('Download transcript');
    await page.waitForTimeout(1000);
    await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('navigation')).toContainText('Download audio file');
    await page.waitForTimeout(1000);
    await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Close this app' }).click();

    await page.waitForTimeout(2000);
    console.log('Archie Apps Audio Transcription - File Processing Completed');


    // Logout
    await page.locator('#main-menu-icon').click();
    await page.getByText('Logout').click();
    console.log("Logout of Smoke Ball");

    await page.close();
    console.log("Close Browser");

});
