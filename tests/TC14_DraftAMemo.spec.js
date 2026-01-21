import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, DraftADocument, OpenDocument } from '../variables/credentials.js';

test('Archie Draft - Draft a legal document or clause - Memo', async ({ page }) => {
  test.setTimeout(200000);

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
  await page.waitForTimeout(8000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
  await page.waitForTimeout(1000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Draft' }).click({ force: true });
  await page.waitForTimeout(2000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask', exact: true }).click();
  await page.waitForTimeout(3000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Draft' }).click({ force: true });
  await page.waitForTimeout(3000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Memo' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a memo    key dates for this matter');

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
  await page.waitForTimeout(15000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Length' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Shorter' }).click();
  await page.waitForTimeout(10000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make it more concise');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Create Memo From Draft' }).nth(1).click();
  await page.waitForTimeout(5000);
  await expect(page.locator('sbb-view-matter-memos-route')).toContainText('Key Dates for the Matter');
  await expect(page.locator('sbb-view-matter-memos-route')).toContainText('New Memo');

  await page.getByRole('button', { name: 'Archie' }).click();
  await page.waitForTimeout(10000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Draft' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Memo' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a memo    important tasks list');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
  await page.waitForTimeout(15000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Change Tone' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('menuitem', { name: 'Urgent' }).click();
  await page.waitForTimeout(10000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Please review the previous response and make it clear that it is urgent');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Create Memo From Draft' }).nth(1).click();
  await page.waitForTimeout(10000);
  await expect(page.locator('sbb-view-matter-memos-route')).toContainText('Urgent Tasks List');

  await page.waitForTimeout(2000);
  console.log('Draft > Draft a legal document or clause > Clause Completed');

  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
