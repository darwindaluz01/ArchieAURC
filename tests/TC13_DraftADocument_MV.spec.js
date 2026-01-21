import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MattersPage } from '../pages/mattersPage.js';
import { ArchiePage } from '../pages/archiePage.js';
import { sbusername, sbpassword, matternamecontains, DraftADocument, OpenDocument } from '../variables/credentials.js';

test('Archie Draft - Draft a legal document or clause - Document', async ({ page }) => {
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

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Document' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a    table about the contacts of this matter');

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
  await page.waitForTimeout(8000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button').first().click();
  await page.waitForTimeout(2000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button').first().click();
  await page.waitForTimeout(2000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button').first().click();
  await page.waitForTimeout(2000);
  console.log("Click Good Response");
  //await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Why did you choose this rating? (optional)');
  //await page.waitForTimeout(2000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).click();
  await page.waitForTimeout(2000);
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Provide additional feedback..' }).fill('This is just a test.');
  await page.waitForTimeout(2000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByLabel('Chat & Draft')).toContainText('Thanks for your feedback!');
  await page.waitForTimeout(2000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).click();
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().getByRole('textbox', { name: 'Type your question here' }).fill('Draft a contract for the client');
  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.hover\\:cursor-pointer.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.size-8').click();
  await page.waitForTimeout(20000);

  await page.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button:nth-child(5)').click();
  await page.waitForTimeout(15000);


  /*
  async function handlePopup(page, linkName, autoClose = true) {
    // Wait for a popup triggered by a click
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: linkName }).click(),
    ]);

    console.log(`Popup opened for: ${linkName}`);
    await page.waitForTimeout(10000);
    if (autoClose) {
      await popup.close();
      console.log(`Popup closed for: ${linkName}`);
    }

    return popup; // return the popup if needed for further actions
  }
    */


  async function handlePopup(page, linkName, autoClose = true) {
    const link = page.getByRole('link', { name: linkName }).first();
    await link.waitFor({ state: 'visible' });

    const popupPromise = page.waitForEvent('popup', { once: true });
    await link.click();
    const popup = await popupPromise;

    console.log(`Popup opened for: ${linkName}`);

    await page.waitForTimeout(15000);

    if (autoClose && popup) {
      await popup.close();
      console.log(`Popup closed for: ${linkName}`);
    }

    return popup;
  }

  await page.screenshot({
    path: DraftADocument,
    fullPage: true
  });

  // Usage example:
  const popup = await handlePopup(page, 'External link Open Document');
  await page.screenshot({
    path: OpenDocument,
    fullPage: true
  });

  await page.waitForTimeout(2000);

  //await page.getByRole('button', { name: '' }).click();
  await page.locator('button.close-icon').click();


  await page.waitForTimeout(2000);
  console.log('Draft > Draft a legal document or clause > Document Completed');

  // Logout
  await page.locator('#main-menu-icon').click();
  await page.getByText('Logout').click();
  console.log("Logout of Smoke Ball");

  await page.close();
  console.log("Close Browser");

});

/*
const page5Promise = page4.waitForEvent('popup');
  await page4.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button:nth-child(5)').click();
  const page5 = await page5Promise;
await page5.goto('https://smokeballus-my.sharepoint.com/:w:/r/personal/darwin_daluz_smokeball_com/_layouts/15/Doc.aspx?sourcedoc=%7B58662F1D-AEBA-4EDE-B692-67871F1604DA%7D&file=Document23.docx&action=default&mobileredirect=true');
await page5.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('tab', { name: 'Smokeball - Staging' }).click();
await page5.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('button', { name: 'Show Details' }).click();
await page4.getByRole('button', { name: '' }).click();
const page6Promise = page4.waitForEvent('popup');
  await page4.locator('iframe[title="sdkEmbedded"]').contentFrame().locator('.transition-opacity.duration-100.opacity-100 > .flex > button:nth-child(5)').click();
  const page6 = await page6Promise;
await page6.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('tab', { name: 'Smokeball - Staging' }).click();
await page6.locator('iframe[name="WacFrame_Word_0"]').contentFrame().getByRole('button', { name: 'Show Details' }).click();
await expect(page6.locator('iframe[name="WacFrame_Word_0"]').contentFrame().locator('#AppForOfficePanel0TaskPaneTitle')).toContainText('Smokeball - Staging');
*/