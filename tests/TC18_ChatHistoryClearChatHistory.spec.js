import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js';

test('Archie Chat Clear Chat History', async ({ page }) => {
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

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Summarise this matter');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
  await page.waitForTimeout(15000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Tell me about this matter');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
  await page.waitForTimeout(15000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Ask Archie a New Question' }).click();


  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Tell me about this matter');
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Recent Chats');
  await page.waitForTimeout(2000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Chat History' }).click();
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Clear History');
  await page.waitForTimeout(2000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Clear History' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Cancel' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Recent Chats');
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Tell me about this matter');
  await page.waitForTimeout(2000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Clear History' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('heading')).toContainText('Are you absolutely sure?');
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('paragraph')).toContainText('Deleting the chat history cannot be undone, are you sure you want to delete it?');
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Are you absolutely sure?')).toContainText('Cancel');
  await page.waitForTimeout(2000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Are you absolutely sure?')).toContainText('Delete');
  await page.waitForTimeout(2000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Delete' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('No chat history found');
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('No chat history');

  await page.waitForTimeout(2000);
  console.log('Clear Chat History Completed');


  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
