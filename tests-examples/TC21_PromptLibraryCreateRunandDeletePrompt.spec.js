import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword } from '../variables/credentials.js';

test('Archie Prompt Library Create Run and Delete a Prompt', async ({ page }) => {
  test.setTimeout(240000);

  const loginPage = new LoginPage(page);
  const mattersPage = new MattersPage(page);
  const archiePage = new ArchiePage(page);

  // Login
  //await page.setViewportSize({ width: 1536, height: 864 });
  await loginPage.goto();
  await loginPage.login(sbusername, sbpassword);

  /*
  // Matters
  await mattersPage.goto();
  await mattersPage.searchMatter(matternamecontains);
  await mattersPage.verifyMenus();
  await mattersPage.openArchie();
  */

  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('PI 10082025');
  await page.locator('a').filter({ hasText: 'openPI 10082025 - Software,' }).click();

  await page.getByRole('button', { name: 'Archie' }).click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Prompt Library' }).click();
  await page.waitForTimeout(5000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Add Prompt' }).click();
  await page.waitForTimeout(5000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="name"]').fill('Client Medical History Overview');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="description"]').fill('This is just a QA Test.');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'example phrase 1 example phrase' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'example phrase 1 example phrase' }).fill('Medical History Overview');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Create' }).click();
  await page.waitForTimeout(5000);

  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="template.actions.0.name"]').click();
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="template.actions.0.name"]').press('ControlOrMeta+a');
  await page.waitForTimeout(5000);

  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('input[name="template.actions.0.name"]').fill('Brief overview of the clients medical history');

  await page.waitForTimeout(5000);

  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="template.actions.0.prompt"]').click();
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="template.actions.0.prompt"]').fill('Using the documents on the Matter. Provide a brief overview of the client\\\'s medical history relevant to the personal injury claim, including treatments received and current condition.');
  await page.waitForTimeout(5000);

  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Test Prompt' }).click();
  await page.waitForTimeout(5000);


  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Edit Prompt' }).click();
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="template.actions.0.prompt"]').click();
  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().locator('textarea[name="template.actions.0.prompt"]').fill('Using the documents on the Matter. Provide a brief overview of the client\\\'s medical history relevant to the personal injury claim, including treatments received and current condition.');
  await page.waitForTimeout(5000);

  await page.getByRole('dialog').filter({ hasText: 'Archie' }).locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Test Prompt' }).click();
  await page.waitForTimeout(15000);

  const frame = page
    .getByRole('dialog')
    .filter({ hasText: 'Archie' })
    .locator('iframe[title="sdkEmbedded"]')
    .contentFrame();

  // Check if "Run Prompt" exists
  if (await frame.getByRole('button', { name: 'Run Prompt' }).isVisible()) {
    await frame.getByRole('button', { name: 'Run Prompt' }).click();
    await page.waitForTimeout(18000);
    console.log("Clicked Run Prompt");
  }
  // Else if "Select a Matter" exists — perform Matter selection flow
  else if (await frame.getByRole('button', { name: 'Select a Matter' }).isVisible()) {
    await frame.getByRole('button', { name: 'Select a Matter' }).click();

    await page.locator('div:nth-child(20) > .ReactModal__Overlay > .ReactModal__Content > .sb-modal-body').click();
    await page.locator('#react-select-3-input').fill('PI 10082025');
    await page.waitForTimeout(5000);
    await page.getByText('PI 10082025 - Software,').click();

    await page.getByRole('button', { name: 'Select' }).nth(1).click();
    await page.locator('div').filter({ hasText: /^Select Matter$/ }).getByRole('button').click();
    await page.waitForTimeout(3000);

    console.log("Selected Matter");
  }

  //await page.getByRole('button', { name: '' }).click();
  await page.locator('button.close-icon').click();

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('searchbox', { name: 'Search' }).fill('Client Medical History Overview');
  await page.waitForTimeout(3000);

  //await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Open menu' }).click();

  // await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.size-full.rounded-\\[inherit\\]').click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('div').filter({ hasText: /^Open menu$/ }).click();
  await page.waitForTimeout(1000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Delete' }).click();
  await page.waitForTimeout(3000);
  //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('paragraph')).toContainText('Prompt deleted successfully');
  console.log("Prompt deleted successfully");


  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
