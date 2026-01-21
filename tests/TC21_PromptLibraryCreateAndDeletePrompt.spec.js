import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Prompt Library Create Run and Delete a Prompt', async ({ page }) => {
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

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Prompt Library' }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Add Prompt' }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').fill('Client Medical History Overview');
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').fill('Client Medical History Overview');
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'example phrase 1 example phrase' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'example phrase 1 example phrase' }).fill('Client Medical History Overview');
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Create' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="template.actions.0.name"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="template.actions.0.name"]').press('ControlOrMeta+a');
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="template.actions.0.name"]').fill('Client Medical History Overview');
  await page.waitForTimeout(1000);

  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div').filter({ hasText: /^PromptImprove prompt$/ }).getByRole('textbox').click();
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Client Medical History' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').click();
  await page.waitForTimeout(1000);
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').fill('Client Medical History Overview Update');
  await page.waitForTimeout(1000);
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Update' }).click();
  await page.waitForTimeout(1000);
  //await page.getByRole('button', { name: '' }).click();
  await page.locator('button.close-icon').click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'New Chat' }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Prompt Library' }).click();
  await page.waitForTimeout(1000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).fill('Client Medical History Overview');
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

  console.log("Prompt deleted successfully");


  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
