import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword } from '../variables/credentials.js';

test('Archie Apps Bank Statement Analyser - File Processing', async ({ page }) => {
  test.setTimeout(200000);

  const loginPage = new LoginPage(page);

  const archiePage = new ArchiePage(page);

  // Login
  //await page.setViewportSize({ width: 1536, height: 864 });
  await loginPage.goto();
  await loginPage.login(sbusername, sbpassword);


  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('BSA 10092025');
  await page.waitForTimeout(2000);
  await page.locator('a').filter({ hasText: 'openBSA 10092025 - Analyser,' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Archie' }).click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('tab', { name: 'Apps' }).click();
  await page.waitForTimeout(8000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().locator('#widgetContainer')).toContainText('Bank Statements Analyser');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Use App' }).first().click();
  await page.waitForTimeout(3000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByText('Browse').click();
  await page.waitForTimeout(3000);
  await page.getByText('Bank Statement Global Harbour Bank (GHB) - Business Accounts - 6').click();
  await page.getByRole('button', { name: 'Select 1 files' }).click();
  await page.waitForTimeout(3000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Analyse statements' }).click();
  await page.waitForTimeout(3000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('heading')).toContainText('Processing...');

  await page.waitForTimeout(48000);

  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByLabel('Statements Ready')).toContainText('Completed - file processed');
  await page.waitForTimeout(3000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByLabel('Statements Ready')).toContainText('Review');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Review' }).click();
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('heading')).toContainText('Bank Statements Analyser');
  await page.waitForTimeout(3000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().locator('div').filter({ hasText: /^Add bank statements$/ }).getByRole('button').nth(1).click();


  await page.waitForTimeout(2000);
  console.log('Archie Apps Bank Statement Analyser File Processing Completed');


  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
