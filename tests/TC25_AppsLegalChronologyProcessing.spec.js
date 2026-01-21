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
  await page.getByRole('textbox', { name: 'Search' }).fill('CHRN 10092025');
  await page.waitForTimeout(2000);
  await page.locator('a').filter({ hasText: 'openCHRN 10092025 - Logy,' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Archie' }).click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('tab', { name: 'Apps' }).click();
  await page.waitForTimeout(8000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('textbox', { name: 'Search apps' }).click();
  await page.waitForTimeout(2000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('textbox', { name: 'Search apps' }).fill('Legal Chronology');
  await page.waitForTimeout(2000);

  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().locator('#widgetContainer')).toContainText('Legal Chronology');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Use App' }).click();

  await page.waitForTimeout(5000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByText('Browse').click();
  await page.waitForTimeout(2000);
  await page.getByText('Contract Signing Project').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Select 1 files' }).click();
  await page.waitForTimeout(3000);
  
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Process' }).click();
  
  await page.waitForTimeout(5000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('heading')).toContainText('Processing...');

  await page.waitForTimeout(30000);



  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByLabel('Chronology Ready')).toContainText('Completed - file processed');
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByLabel('Chronology Ready')).toContainText('Review');
  await page.waitForTimeout(2000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button', { name: 'Review' }).click();
  await page.waitForTimeout(5000);

  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('tablist')).toContainText('Review chronology');
  //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('heading')).toContainText('Legal Chronology (Smokeball)');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('iframe').contentFrame().getByRole('button').filter({ hasText: /^$/ }).nth(1).click();


  await page.waitForTimeout(2000);
  console.log('Archie Apps Legal Chronology File Processing Completed');


  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
