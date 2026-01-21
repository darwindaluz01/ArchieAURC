import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains } from '../variables/credentials.js'; 
import { before, beforeEach } from 'node:test';



test('Archie Elements Validation', async ({ page }) => {
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

  // Archie
  await page.waitForTimeout(15000); // temporary hard wait (replace with smart waits if possible)
  await archiePage.verifyArchieUI();
  await archiePage.startNewChat();

  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});
