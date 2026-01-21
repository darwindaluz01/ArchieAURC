import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Browse Analyse or review a document - Multiple Files', async ({ page }) => {
  test.setTimeout(200000);

  const loginPage = new LoginPage(page);
  const mattersPage = new MattersPage(page);
  const archiePage = new ArchiePage(page);

  //Reusable references
  const sdkFrame = page.locator('iframe[title="sdkEmbedded"]').contentFrame();
  const Typeyourquestionhere = sdkFrame.getByRole('textbox', { name: 'Type your question here' });
  const AskArchie = sdkFrame.locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8');

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

  await sdkFrame.getByRole('button', { name: 'Browse' }).click();
  await page.locator('div:nth-child(2) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
  await page.waitForTimeout(2000);

  await page.locator('div:nth-child(4) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Select 2 files' }).click();
  await page.waitForTimeout(2000);

  await Typeyourquestionhere.click();
  await Typeyourquestionhere.fill('Review these documents');
  await AskArchie.click();

  await page.waitForTimeout(20000);
  console.log('Archie Responded Successfully - Review these documents');

  await sdkFrame.getByRole('button', { name: 'Ask Archie a New Question' }).click();
  await sdkFrame.getByRole('button', { name: 'Browse' }).click();

  await page.locator('div:nth-child(2) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
  await page.waitForTimeout(2000);
  await page.locator('div:nth-child(3) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
  await page.waitForTimeout(2000);
  await page.locator('div:nth-child(4) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
  await page.waitForTimeout(2000);
  await page.locator('div:nth-child(5) > div > .Modal-module__align-center___2eMPo > .row-checkbox').check();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Select 4 files' }).click();

  await Typeyourquestionhere.click();
  await Typeyourquestionhere.fill('Compare these documents, give a short answer');
  await AskArchie.click();
  await page.waitForTimeout(12000);
  console.log('Archie Responded Successfully - Compare these documents, give a short answer');

  await Typeyourquestionhere.click();
  await Typeyourquestionhere.fill('Analyse the content of the email');
  await AskArchie.click();
  await page.waitForTimeout(12000);

  console.log('Archie Responded Successfully - Analyse the content of the email');


  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
